<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Upgrades;

use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;
use Webconsulting\WebconAiAssistant\Chat\Domain\InstructionRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRepository;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;
use Webconsulting\WebconAiAssistant\Upgrades\MigrateFromShadcnUiWizard;

/**
 * An installation of the predecessor, carried over: its tables as the old
 * extension left them, its configuration, and the permissions, TSconfig and
 * bookmarks that named its modules.
 */
final class MigrateFromShadcnUiWizardTest extends AbstractChatTestCase
{
    /**
     * The predecessor's tables in the smallest SQL both SQLite and MariaDB read.
     *
     * @var array<string, string>
     */
    private const array PREDECESSOR_TABLES = [
        'tx_shadcnui_conversation' => '(uid INT NOT NULL, pid INT DEFAULT 0 NOT NULL, deleted SMALLINT DEFAULT 0 NOT NULL,
            be_user INT DEFAULT 0 NOT NULL, title VARCHAR(255) DEFAULT \'\' NOT NULL, message_count INT DEFAULT 0 NOT NULL,
            status VARCHAR(20) DEFAULT \'idle\' NOT NULL, run_uuid VARCHAR(64) DEFAULT \'\' NOT NULL, pending_approval TEXT,
            pending_input TEXT, system_prompt TEXT, auto_approve_tools SMALLINT DEFAULT 0 NOT NULL,
            archived SMALLINT DEFAULT 0 NOT NULL, pinned SMALLINT DEFAULT 0 NOT NULL, error_message TEXT,
            app_name VARCHAR(128) DEFAULT \'\' NOT NULL, page_id INT DEFAULT 0 NOT NULL, last_message_at INT DEFAULT 0 NOT NULL,
            tstamp INT DEFAULT 0 NOT NULL, crdate INT DEFAULT 0 NOT NULL, PRIMARY KEY (uid))',
        'tx_shadcnui_message' => '(uid INT NOT NULL, pid INT DEFAULT 0 NOT NULL, conversation INT DEFAULT 0 NOT NULL,
            sequence INT DEFAULT 0 NOT NULL, role VARCHAR(16) DEFAULT \'\' NOT NULL, content TEXT, tool_calls TEXT,
            tool_call_id VARCHAR(64) DEFAULT \'\' NOT NULL, attachments TEXT, write_targets TEXT,
            run_uuid VARCHAR(64) DEFAULT \'\' NOT NULL, prompt_tokens INT DEFAULT 0 NOT NULL,
            completion_tokens INT DEFAULT 0 NOT NULL, crdate INT DEFAULT 0 NOT NULL, PRIMARY KEY (uid))',
        'tx_shadcnui_instruction' => '(uid INT NOT NULL, pid INT DEFAULT 0 NOT NULL, tstamp INT DEFAULT 0 NOT NULL,
            crdate INT DEFAULT 0 NOT NULL, deleted SMALLINT DEFAULT 0 NOT NULL, hidden SMALLINT DEFAULT 0 NOT NULL,
            sorting INT DEFAULT 0 NOT NULL, title VARCHAR(255) DEFAULT \'\' NOT NULL, body TEXT,
            be_groups VARCHAR(255) DEFAULT \'\' NOT NULL, description TEXT, PRIMARY KEY (uid))',
    ];

    private MigrateFromShadcnUiWizard $wizard;

    protected function setUp(): void
    {
        parent::setUp();
        $this->wizard = $this->get(MigrateFromShadcnUiWizard::class);
    }

    protected function tearDown(): void
    {
        foreach (array_keys(self::PREDECESSOR_TABLES) as $table) {
            foreach ([$table, 'zzz_deleted_' . $table] as $name) {
                $this->getConnectionPool()->getConnectionByName('Default')->executeStatement('DROP TABLE IF EXISTS ' . $name);
            }
        }
        unset($GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['shadcn_ui']);
        parent::tearDown();
    }

    #[Test]
    public function withoutAPredecessorThereIsNothingToDo(): void
    {
        self::assertFalse($this->wizard->updateNecessary());
    }

    #[Test]
    public function conversationsMessagesAndInstructionsKeepTheirUids(): void
    {
        $this->createPredecessorTables();
        $this->seedPredecessor();

        self::assertTrue($this->wizard->updateNecessary());
        self::assertTrue($this->wizard->executeUpdate());

        $conversation = $this->get(ConversationRepository::class)->findByUid(7);
        self::assertNotNull($conversation);
        self::assertSame('Redirects', $conversation->title);
        self::assertSame(ConversationStatus::AwaitingInput, $conversation->status);
        self::assertSame('Which one?', $conversation->pendingInput['question'] ?? null);

        $messages = $this->get(MessageRepository::class)->findByConversation(7);
        self::assertSame([31, 32], array_map(static fn($message): int => $message->uid, $messages));
        self::assertSame(
            'typo3_GetPage',
            $messages[1]->toolCalls[0]['function']['name'] ?? null,
            'A JSON column arrives as the structure it was, not as a JSON string inside JSON.',
        );
        self::assertSame([['table' => 'pages', 'uid' => 42, 'kind' => 'updated']], $messages[1]->writeTargets);

        $instruction = $this->row(InstructionRepository::TABLE, 5);
        self::assertSame('House style', $instruction['title']);
        self::assertSame(1, (int)$instruction['hidden'], 'A switched-off instruction stays switched off.');

        self::assertFalse($this->wizard->updateNecessary(), 'Everything is across.');
    }

    #[Test]
    public function runningAgainCopiesOnlyWhatIsMissingAndOverwritesNothing(): void
    {
        $this->createPredecessorTables();
        $this->seedPredecessor();
        $this->wizard->executeUpdate();
        $this->get(ConversationRepository::class)->patch(7, self::BE_USER_UID, ['title' => 'Renamed since']);
        $this->insert('tx_shadcnui_conversation', ['uid' => 8, 'be_user' => self::BE_USER_UID, 'title' => 'Started in the old chat']);

        self::assertTrue($this->wizard->updateNecessary());
        $this->wizard->executeUpdate();

        self::assertSame('Renamed since', $this->row(ConversationRepository::TABLE, 7)['title']);
        self::assertSame('Started in the old chat', $this->row(ConversationRepository::TABLE, 8)['title']);
    }

    #[Test]
    public function tablesTheDatabaseAnalyserRenamedAreStillFound(): void
    {
        $this->createPredecessorTables('zzz_deleted_');
        $this->insert('zzz_deleted_tx_shadcnui_instruction', ['uid' => 9, 'title' => 'Recovered', 'body' => 'Still valid.']);

        self::assertTrue($this->wizard->updateNecessary());
        $this->wizard->executeUpdate();

        self::assertSame('Recovered', $this->row(InstructionRepository::TABLE, 9)['title']);
    }

    #[Test]
    public function modulePermissionsTsConfigAndBookmarksFollowTheModules(): void
    {
        $this->importCSVDataSet(__DIR__ . '/../Fixtures/predecessor_permissions.csv');

        self::assertTrue($this->wizard->updateNecessary());
        $this->wizard->executeUpdate();

        self::assertSame(
            'web_layout,tools_webconaiassistant,tools_webconaiassistant_chat',
            $this->row('be_groups', 1)['groupMods'],
            'The chat and its container replace the old chat; the removed Components module is gone.',
        );
        self::assertSame('web_layout', $this->row('be_groups', 2)['groupMods']);
        self::assertSame('tools_webconaiassistant,tools_webconaiassistant_chat', $this->row('be_users', 3)['userMods']);
        self::assertSame('tx_webconaiassistant.tools.deny = typo3_WriteTable', $this->row('be_groups', 1)['TSconfig']);
        self::assertSame('tx_webconaiassistant.tools.allow = typo3_GetPage', $this->row('be_users', 3)['TSconfig']);
        self::assertSame('tools_webconaiassistant_chat', $this->row('sys_be_shortcuts', 1)['route']);
        self::assertSame('web_layout', $this->row('sys_be_shortcuts', 2)['route']);
        self::assertFalse($this->wizard->updateNecessary());
    }

    #[Test]
    public function thePredecessorsConfigurationIsCopiedWhileThisOneIsUntouched(): void
    {
        $GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['shadcn_ui'] = [
            'llmConfiguration' => 'team-assistant',
            'allowWrites' => '1',
            'maxTurnsPerHour' => '20',
            'attachmentStorage' => '1:/shadcn_ui/',
            'panelEnabled' => '0',
        ];

        self::assertTrue($this->wizard->updateNecessary());
        $this->wizard->executeUpdate();

        $configuration = $this->get(ExtensionConfiguration::class)->get('webcon_ai_assistant');
        self::assertIsArray($configuration);
        self::assertSame('team-assistant', $configuration['llmConfiguration'] ?? null);
        self::assertSame('1', $configuration['allowWrites'] ?? null);
        self::assertSame('20', $configuration['maxTurnsPerHour'] ?? null);
        self::assertSame('1:/shadcn_ui/', $configuration['attachmentStorage'] ?? null, 'Existing attachments stay where they are.');
        self::assertSame('0', $configuration['panelEnabled'] ?? null);
        self::assertFalse($this->wizard->updateNecessary());
    }

    #[Test]
    public function aConfigurationSomebodyAlreadyChangedIsNotOverwritten(): void
    {
        $GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['shadcn_ui'] = ['llmConfiguration' => 'team-assistant'];
        $GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['webcon_ai_assistant'] = ['llmConfiguration' => 'chosen-deliberately'];

        self::assertFalse($this->wizard->updateNecessary());
    }

    private function createPredecessorTables(string $prefix = ''): void
    {
        $connection = $this->getConnectionPool()->getConnectionByName('Default');
        foreach (self::PREDECESSOR_TABLES as $table => $definition) {
            $connection->executeStatement('CREATE TABLE ' . $prefix . $table . ' ' . $definition);
        }
    }

    private function seedPredecessor(): void
    {
        $this->insert('tx_shadcnui_conversation', [
            'uid' => 7,
            'be_user' => self::BE_USER_UID,
            'title' => 'Redirects',
            'status' => 'awaiting_input',
            'run_uuid' => 'run-7',
            'pending_input' => '{"question":"Which one?","turnDigest":"d7"}',
            'message_count' => 2,
        ]);
        $this->insert('tx_shadcnui_message', ['uid' => 31, 'conversation' => 7, 'sequence' => 1, 'role' => 'user', 'content' => 'Fix the redirects.']);
        $this->insert('tx_shadcnui_message', [
            'uid' => 32,
            'conversation' => 7,
            'sequence' => 2,
            'role' => 'assistant',
            'content' => '',
            'tool_calls' => '[{"id":"call-1","type":"function","function":{"name":"typo3_GetPage","arguments":"{}"}}]',
            'write_targets' => '[{"table":"pages","uid":42,"kind":"updated"}]',
        ]);
        $this->insert('tx_shadcnui_instruction', ['uid' => 5, 'title' => 'House style', 'body' => 'Write briefly.', 'hidden' => 1]);
    }

    /**
     * @param array<string, int|string> $row
     */
    private function insert(string $table, array $row): void
    {
        $this->getConnectionPool()->getConnectionByName('Default')->insert($table, $row);
    }
}
