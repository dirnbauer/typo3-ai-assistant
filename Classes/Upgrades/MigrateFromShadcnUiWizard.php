<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Upgrades;

use Doctrine\DBAL\Exception\TableNotFoundException;
use Doctrine\DBAL\Platforms\PostgreSQLPlatform;
use Netresearch\NrLlm\Service\Tool\ToolGroupStateRepository;
use Override;
use Symfony\Component\Console\Output\OutputInterface;
use Throwable;
use TYPO3\CMS\Core\Attribute\UpgradeWizard;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Upgrades\ChattyInterface;
use TYPO3\CMS\Core\Upgrades\DatabaseUpdatedPrerequisite;
use TYPO3\CMS\Core\Upgrades\RepeatableInterface;
use TYPO3\CMS\Core\Upgrades\UpgradeWizardInterface;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\InstructionRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\Row;
use Webconsulting\WebconAiAssistant\Chat\Tool\AskUserTool;
use Webconsulting\WebconAiAssistant\Configuration\ExtensionSettings;

/**
 * Carries an installation over from `webconsulting/typo3-shadcn-ui` (extension
 * key `shadcn_ui`), the package this one replaces.
 *
 * - Conversations, messages and instruction records are copied from the
 *   `tx_shadcnui_*` tables — or their `zzz_deleted_` remains, when the database
 *   analyser renamed them after the old extension was removed — keeping their
 *   uids, so a message still belongs to its conversation and an attachment
 *   folder (`<storage>/<be_user>/<conversation>/`) still belongs to its
 *   conversation. A row whose uid already exists is left alone, so the wizard
 *   can run again safely.
 * - The `shadcn_ui` extension configuration is copied, key for key, as long as
 *   this extension's own configuration is still at its defaults.
 * - Module permissions (`be_groups.groupMods`, `be_users.userMods`) move from
 *   `tools_shadcnui_chat` to the chat module and its container; the removed
 *   Components module is dropped from them.
 * - User TSconfig stored in the database (`be_users` and `be_groups`) moves from
 *   `tx_shadcnui.` to `tx_webconaiassistant.`, and bookmarks of the old chat
 *   module point to the new one.
 * - An administrator's switch of the `ask_user` tool group in nr-llm's Tools
 *   module (`shadcn_ui`) carries over to its new group name.
 *
 * Repeatable: while the predecessor is still installed it may create rows, and
 * each run copies only what is missing.
 */
#[UpgradeWizard(MigrateFromShadcnUiWizard::IDENTIFIER)]
final class MigrateFromShadcnUiWizard implements UpgradeWizardInterface, RepeatableInterface, ChattyInterface
{
    public const string IDENTIFIER = 'webconAiAssistantMigrateFromShadcnUi';

    public const string PREDECESSOR_EXTENSION = 'shadcn_ui';

    /**
     * Old table => new table, and the columns both share. The column lists are
     * explicit: what is copied is exactly what this extension's schema holds.
     *
     * @var array<string, array{0: string, 1: list<string>}>
     */
    private const array TABLES = [
        'tx_shadcnui_conversation' => [ConversationRepository::TABLE, [
            'uid', 'pid', 'deleted', 'be_user', 'title', 'message_count', 'status', 'run_uuid', 'pending_approval',
            'pending_input', 'system_prompt', 'auto_approve_tools', 'archived', 'pinned', 'error_message', 'app_name',
            'page_id', 'last_message_at', 'tstamp', 'crdate',
        ]],
        'tx_shadcnui_message' => [MessageRepository::TABLE, [
            'uid', 'pid', 'conversation', 'sequence', 'role', 'content', 'tool_calls', 'tool_call_id', 'attachments',
            'write_targets', 'run_uuid', 'prompt_tokens', 'completion_tokens', 'crdate',
        ]],
        'tx_shadcnui_instruction' => [InstructionRepository::TABLE, [
            'uid', 'pid', 'tstamp', 'crdate', 'deleted', 'hidden', 'sorting', 'title', 'body', 'be_groups', 'description',
        ]],
    ];

    /**
     * Columns of the `json` type. The connection encodes what it is handed for
     * these, so a JSON string read from the old table is decoded first —
     * otherwise it would be stored as a JSON string literal.
     *
     * @var list<string>
     */
    private const array JSON_COLUMNS = ['tool_calls', 'attachments', 'write_targets'];

    /** @var array<string, list<string>> old module identifier => the modules that replace it */
    private const array MODULES = [
        'tools_shadcnui_chat' => ['tools_webconaiassistant', 'tools_webconaiassistant_chat'],
        'tools_shadcnui_components' => [],
    ];

    /** @var array<string, string> */
    private const array PERMISSION_FIELDS = ['be_groups' => 'groupMods', 'be_users' => 'userMods'];

    private const string OLD_TSCONFIG_KEY = 'tx_shadcnui.';

    private const string NEW_TSCONFIG_KEY = 'tx_webconaiassistant.';

    /** The nr-llm tool group the predecessor's `ask_user` tool belonged to. */
    private const string OLD_TOOL_GROUP = 'shadcn_ui';

    private ?OutputInterface $output = null;

    public function __construct(
        private readonly ConnectionPool $connectionPool,
        private readonly ExtensionConfiguration $extensionConfiguration,
        private readonly ToolGroupStateRepository $toolGroupStates,
    ) {}

    #[Override]
    public function setOutput(OutputInterface $output): void
    {
        $this->output = $output;
    }

    #[Override]
    public function getTitle(): string
    {
        return 'AI Assistant: migrate from shadcn/ui (shadcn_ui)';
    }

    #[Override]
    public function getDescription(): string
    {
        return 'Copies conversations, messages and instruction records from the tx_shadcnui_* tables, the shadcn_ui '
            . 'extension configuration, module permissions, database TSconfig (tx_shadcnui.tools), bookmarks of the '
            . 'old AI Chat module and the nr-llm switch of its tool group over to the AI Assistant (webcon_ai_assistant).';
    }

    /**
     * @return list<class-string>
     */
    #[Override]
    public function getPrerequisites(): array
    {
        return [DatabaseUpdatedPrerequisite::class];
    }

    #[Override]
    public function updateNecessary(): bool
    {
        foreach (array_keys(self::TABLES) as $oldTable) {
            if ($this->missingRows($oldTable) > 0) {
                return true;
            }
        }

        return $this->configurationToCopy() !== null
            || $this->toolGroupSwitchToCopy() !== null
            || $this->migratePermissions(dryRun: true) > 0
            || $this->migrateTsConfig(dryRun: true) > 0
            || $this->migrateBookmarks(dryRun: true) > 0;
    }

    #[Override]
    public function executeUpdate(): bool
    {
        foreach (array_keys(self::TABLES) as $oldTable) {
            $copied = $this->copyTable($oldTable);
            $this->say(sprintf('%s: %d row(s) copied.', $oldTable, $copied));
        }

        $configuration = $this->configurationToCopy();
        if ($configuration !== null) {
            $this->extensionConfiguration->set(ExtensionSettings::EXTENSION_KEY, $configuration);
            $this->say('Extension configuration copied from shadcn_ui.');
        }

        $toolGroupEnabled = $this->toolGroupSwitchToCopy();
        if ($toolGroupEnabled !== null) {
            $this->toolGroupStates->setEnabled(AskUserTool::GROUP, $toolGroupEnabled);
            $this->say(sprintf('nr-llm tool group "%s" %s, as "%s" was.', AskUserTool::GROUP, $toolGroupEnabled ? 'enabled' : 'disabled', self::OLD_TOOL_GROUP));
        }

        $this->say(sprintf('Module permissions updated on %d record(s).', $this->migratePermissions(dryRun: false)));
        $this->say(sprintf('TSconfig updated on %d record(s).', $this->migrateTsConfig(dryRun: false)));
        $this->say(sprintf('Bookmarks updated: %d.', $this->migrateBookmarks(dryRun: false)));

        return true;
    }

    // ------------------------------------------------------------- tables

    /**
     * The predecessor's table under its own name, or its `zzz_deleted_`
     * remains; null when neither exists.
     */
    private function sourceTable(string $oldTable): ?string
    {
        foreach ([$oldTable, 'zzz_deleted_' . $oldTable] as $candidate) {
            if ($this->tableExists($candidate)) {
                return $candidate;
            }
        }

        return null;
    }

    private function tableExists(string $table): bool
    {
        try {
            $this->connectionPool->getConnectionForTable($table)->createQueryBuilder()
                ->select('uid')
                ->from($table)
                ->setMaxResults(1)
                ->executeQuery()
                ->free();
        } catch (TableNotFoundException) {
            return false;
        }

        return true;
    }

    private function missingRows(string $oldTable): int
    {
        $source = $this->sourceTable($oldTable);
        if ($source === null) {
            return 0;
        }
        $existing = $this->uids(self::TABLES[$oldTable][0]);

        return count(array_diff_key(array_flip($this->uids($source)), array_flip($existing)));
    }

    private function copyTable(string $oldTable): int
    {
        $source = $this->sourceTable($oldTable);
        if ($source === null) {
            return 0;
        }
        [$target, $columns] = self::TABLES[$oldTable];
        $existing = array_flip($this->uids($target));

        $queryBuilder = $this->connectionPool->getConnectionForTable($source)->createQueryBuilder();
        $queryBuilder->getRestrictions()->removeAll();
        $rows = $queryBuilder->select('*')->from($source)->orderBy('uid')->executeQuery();

        $connection = $this->connectionPool->getConnectionForTable($target);
        $copied = 0;
        while (($row = $rows->fetchAssociative()) !== false) {
            $uid = Row::int($row, 'uid');
            if ($uid <= 0 || isset($existing[$uid])) {
                continue;
            }
            $connection->insert($target, $this->projection($row, $columns));
            ++$copied;
        }

        if ($copied > 0 && $connection->getDatabasePlatform() instanceof PostgreSQLPlatform) {
            // Explicit uids do not advance a PostgreSQL sequence; the next
            // insert would collide with a copied row.
            $connection->executeStatement(sprintf(
                "SELECT setval(pg_get_serial_sequence('%1\$s', 'uid'), (SELECT MAX(uid) FROM %1\$s))",
                $target,
            ));
        }

        return $copied;
    }

    /**
     * @param array<string, mixed> $row
     * @param list<string>         $columns
     *
     * @return array<string, mixed>
     */
    private function projection(array $row, array $columns): array
    {
        $projected = [];
        foreach ($columns as $column) {
            if (!array_key_exists($column, $row)) {
                continue;
            }
            $value = $row[$column];
            if (in_array($column, self::JSON_COLUMNS, true)) {
                $value = is_string($value) && $value !== '' ? json_decode($value, true) : $value;
                $value = is_array($value) ? $value : null;
            }
            $projected[$column] = $value;
        }

        return $projected;
    }

    /**
     * @return list<int>
     */
    private function uids(string $table): array
    {
        $queryBuilder = $this->connectionPool->getConnectionForTable($table)->createQueryBuilder();
        $queryBuilder->getRestrictions()->removeAll();

        return array_values(array_map(intval(...), array_filter(
            $queryBuilder->select('uid')->from($table)->executeQuery()->fetchFirstColumn(),
            is_numeric(...),
        )));
    }

    // ------------------------------------------------------------- configuration

    /**
     * The predecessor's configuration, when there is one worth copying and this
     * extension's own has not been changed from its defaults.
     *
     * @return array<string, string>|null
     */
    private function configurationToCopy(): ?array
    {
        $old = $this->configuration(self::PREDECESSOR_EXTENSION);
        if ($old === []) {
            return null;
        }
        $current = $this->configuration(ExtensionSettings::EXTENSION_KEY);
        $defaults = $this->defaults();
        foreach ($current as $key => $value) {
            if (($defaults[$key] ?? $value) !== $value) {
                // Somebody configured this extension already; theirs wins.
                return null;
            }
        }

        $merged = $defaults;
        foreach (ExtensionSettings::KEYS as $key) {
            if (array_key_exists($key, $old)) {
                $merged[$key] = $old[$key];
            }
        }

        return $merged === array_replace($defaults, $current) ? null : $merged;
    }

    /**
     * @return array<string, string>
     */
    private function configuration(string $extensionKey): array
    {
        try {
            $raw = $this->extensionConfiguration->get($extensionKey);
        } catch (Throwable) {
            return [];
        }
        if (!is_array($raw)) {
            return [];
        }

        $values = [];
        foreach (ExtensionSettings::KEYS as $key) {
            if (array_key_exists($key, $raw) && is_scalar($raw[$key])) {
                $values[$key] = (string)$raw[$key];
            }
        }

        return $values;
    }

    /**
     * What `ext_conf_template.txt` declares.
     *
     * @return array<string, string>
     */
    private function defaults(): array
    {
        return [
            'llmConfiguration' => 'backend-assistant',
            'allowWrites' => '0',
            'maxTurnsPerHour' => '60',
            'attachmentStorage' => '1:/webcon_ai_assistant/',
            'panelEnabled' => '1',
        ];
    }

    // ------------------------------------------------------------- nr-llm tool group

    /**
     * The predecessor's tool-group switch, when an administrator set one and
     * none is set for the new group yet. A group nobody toggled is enabled in
     * nr-llm, so there is nothing to carry over then.
     */
    private function toolGroupSwitchToCopy(): ?bool
    {
        $overrides = $this->toolGroupStates->overrides();
        if (!array_key_exists(self::OLD_TOOL_GROUP, $overrides) || array_key_exists(AskUserTool::GROUP, $overrides)) {
            return null;
        }

        return $overrides[self::OLD_TOOL_GROUP];
    }

    // ------------------------------------------------------------- permissions, TSconfig, bookmarks

    private function migratePermissions(bool $dryRun): int
    {
        $changed = 0;
        foreach (self::PERMISSION_FIELDS as $table => $field) {
            foreach ($this->rowsContaining($table, $field, 'tools_shadcnui_') as $uid => $value) {
                $modules = [];
                foreach (array_filter(array_map(trim(...), explode(',', $value)), static fn(string $module): bool => $module !== '') as $module) {
                    foreach (self::MODULES[$module] ?? [$module] as $replacement) {
                        $modules[$replacement] = true;
                    }
                }
                $migrated = implode(',', array_keys($modules));
                if ($migrated === $value) {
                    continue;
                }
                ++$changed;
                if (!$dryRun) {
                    $this->connectionPool->getConnectionForTable($table)->update($table, [$field => $migrated], ['uid' => $uid]);
                }
            }
        }

        return $changed;
    }

    private function migrateTsConfig(bool $dryRun): int
    {
        $changed = 0;
        foreach (array_keys(self::PERMISSION_FIELDS) as $table) {
            foreach ($this->rowsContaining($table, 'TSconfig', self::OLD_TSCONFIG_KEY) as $uid => $value) {
                ++$changed;
                if (!$dryRun) {
                    $this->connectionPool->getConnectionForTable($table)->update(
                        $table,
                        ['TSconfig' => str_replace(self::OLD_TSCONFIG_KEY, self::NEW_TSCONFIG_KEY, $value)],
                        ['uid' => $uid],
                    );
                }
            }
        }

        return $changed;
    }

    private function migrateBookmarks(bool $dryRun): int
    {
        $table = 'sys_be_shortcuts';
        if (!$this->tableExists($table)) {
            return 0;
        }
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable($table);
        $queryBuilder->getRestrictions()->removeAll();
        $count = $queryBuilder->count('uid')
            ->from($table)
            ->where($queryBuilder->expr()->eq('route', $queryBuilder->createNamedParameter('tools_shadcnui_chat')))
            ->executeQuery()
            ->fetchOne();
        $count = is_numeric($count) ? (int)$count : 0;
        if ($dryRun || $count === 0) {
            return $count;
        }

        return (int)$this->connectionPool->getConnectionForTable($table)->update(
            $table,
            ['route' => 'tools_webconaiassistant_chat'],
            ['route' => 'tools_shadcnui_chat'],
        );
    }

    /**
     * @return array<int, string> uid => the column's value, for every row whose column contains the needle
     */
    private function rowsContaining(string $table, string $column, string $needle): array
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable($table);
        $queryBuilder->getRestrictions()->removeAll();
        $rows = $queryBuilder->select('uid', $column)
            ->from($table)
            ->where($queryBuilder->expr()->like(
                $column,
                $queryBuilder->createNamedParameter('%' . $queryBuilder->escapeLikeWildcards($needle) . '%', Connection::PARAM_STR),
            ))
            ->executeQuery()
            ->fetchAllAssociative();

        $found = [];
        foreach ($rows as $row) {
            $found[Row::int($row, 'uid')] = Row::string($row, $column);
        }

        return $found;
    }

    private function say(string $message): void
    {
        $this->output?->writeln($message);
    }
}
