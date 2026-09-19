<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Domain;

use RuntimeException;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;

/**
 * Conversation rows, through the QueryBuilder.
 *
 * Every read a user can reach is scoped by `be_user`, so a guessed uid never
 * opens somebody else's conversation.
 */
final readonly class ConversationRepository
{
    public const TABLE = 'tx_shadcnui_conversation';

    /**
     * The columns a client may change directly. Anything else goes through a
     * method that knows what the change means.
     */
    private const PATCHABLE = ['title', 'archived', 'pinned', 'auto_approve_tools', 'deleted', 'app_name', 'page_id'];

    public function __construct(
        private ConnectionPool $connectionPool,
    ) {}

    public function findByUid(int $uid): ?Conversation
    {
        return $this->findOne(['uid' => $uid]);
    }

    public function findOneByUidAndBeUser(int $uid, int $beUserUid): ?Conversation
    {
        if ($uid <= 0 || $beUserUid <= 0) {
            return null;
        }

        return $this->findOne(['uid' => $uid, 'be_user' => $beUserUid]);
    }

    /**
     * @return list<Conversation>
     */
    public function findByBeUser(int $beUserUid, bool $includeArchived = false): array
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $queryBuilder->select('*')
            ->from(self::TABLE)
            ->where(
                $queryBuilder->expr()->eq('be_user', $queryBuilder->createNamedParameter($beUserUid, Connection::PARAM_INT)),
                $queryBuilder->expr()->eq('deleted', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)),
            )
            ->orderBy('pinned', 'DESC')
            ->addOrderBy('last_message_at', 'DESC')
            ->addOrderBy('uid', 'DESC');

        if (!$includeArchived) {
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('archived', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)),
            );
        }

        return array_map(Conversation::fromRow(...), $queryBuilder->executeQuery()->fetchAllAssociative());
    }

    public function create(int $beUserUid, string $title, string $systemPrompt, string $appName, int $pageId): Conversation
    {
        $connection = $this->connectionPool->getConnectionForTable(self::TABLE);
        $now = time();
        $connection->insert(self::TABLE, [
            'pid' => 0,
            'be_user' => $beUserUid,
            'title' => mb_substr(trim($title), 0, 255),
            'status' => ConversationStatus::Idle->value,
            'system_prompt' => mb_substr($systemPrompt, 0, 10000),
            'app_name' => mb_substr($appName, 0, 128),
            'page_id' => max(0, $pageId),
            'last_message_at' => $now,
            'tstamp' => $now,
            'crdate' => $now,
        ]);

        $created = $this->findByUid((int)$connection->lastInsertId());
        if (!$created instanceof Conversation) {
            throw new RuntimeException('The conversation row could not be read back after insert.', 1795000001);
        }

        return $created;
    }

    /**
     * Claim the conversation for one turn — the single-in-flight-turn lock.
     *
     * A compare-and-swap: two tabs pressing send at the same moment must not
     * both start a run against the same transcript. The loser is told the
     * conversation is busy instead of silently interleaving with the winner.
     *
     * @param list<ConversationStatus> $expected the states a turn may start from
     */
    public function claimForTurn(int $uid, int $beUserUid, array $expected, string $runUuid): bool
    {
        if ($expected === []) {
            return false;
        }

        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $affected = $queryBuilder->update(self::TABLE)
            ->set('status', ConversationStatus::Processing->value)
            ->set('run_uuid', mb_substr($runUuid, 0, 64))
            ->set('error_message', '')
            ->set('tstamp', time())
            ->where(
                $queryBuilder->expr()->eq('uid', $queryBuilder->createNamedParameter($uid, Connection::PARAM_INT)),
                $queryBuilder->expr()->eq('be_user', $queryBuilder->createNamedParameter($beUserUid, Connection::PARAM_INT)),
                $queryBuilder->expr()->eq('deleted', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)),
                $queryBuilder->expr()->in('status', $queryBuilder->createNamedParameter(
                    array_map(static fn(ConversationStatus $status): string => $status->value, $expected),
                    Connection::PARAM_STR_ARRAY,
                )),
            )
            ->executeStatement();

        return $affected > 0;
    }

    /**
     * Release the claim, settling the conversation into its post-turn state.
     *
     * Both pending columns are written on every settle: a decided approval and
     * an answered question must not linger on a conversation that moved on.
     *
     * @param array<string, mixed> $pendingApproval
     * @param array<string, mixed> $pendingInput
     */
    public function settle(
        int $uid,
        int $beUserUid,
        ConversationStatus $status,
        string $runUuid = '',
        string $errorMessage = '',
        array $pendingApproval = [],
        array $pendingInput = [],
    ): void {
        $this->connectionPool->getConnectionForTable(self::TABLE)->update(
            self::TABLE,
            [
                'status' => $status->value,
                'run_uuid' => mb_substr($runUuid, 0, 64),
                'error_message' => $errorMessage,
                'pending_approval' => self::encode($pendingApproval),
                'pending_input' => self::encode($pendingInput),
                'tstamp' => time(),
            ],
            ['uid' => $uid, 'be_user' => $beUserUid],
        );
    }

    /**
     * Write back the counters a turn produced, without touching the lifecycle.
     */
    public function touchMessages(int $uid, int $messageCount, ?string $title = null): void
    {
        $data = ['message_count' => $messageCount, 'last_message_at' => time(), 'tstamp' => time()];
        if ($title !== null && $title !== '') {
            $data['title'] = mb_substr($title, 0, 255);
        }

        $this->connectionPool->getConnectionForTable(self::TABLE)->update(self::TABLE, $data, ['uid' => $uid]);
    }

    /**
     * Change one or more client-editable columns of the user's own row.
     *
     * @param array<string, int|string> $columns
     */
    public function patch(int $uid, int $beUserUid, array $columns): void
    {
        $data = array_intersect_key($columns, array_flip(self::PATCHABLE));
        if ($data === []) {
            return;
        }
        $data['tstamp'] = time();

        $this->connectionPool->getConnectionForTable(self::TABLE)
            ->update(self::TABLE, $data, ['uid' => $uid, 'be_user' => $beUserUid]);
    }

    public function countActiveByBeUser(int $beUserUid): int
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $count = $queryBuilder->count('uid')
            ->from(self::TABLE)
            ->where(
                $queryBuilder->expr()->eq('be_user', $queryBuilder->createNamedParameter($beUserUid, Connection::PARAM_INT)),
                $queryBuilder->expr()->in('status', $queryBuilder->createNamedParameter(
                    [
                        ConversationStatus::Processing->value,
                        ConversationStatus::AwaitingApproval->value,
                        ConversationStatus::AwaitingInput->value,
                    ],
                    Connection::PARAM_STR_ARRAY,
                )),
                $queryBuilder->expr()->eq('deleted', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)),
            )
            ->executeQuery()
            ->fetchOne();

        return is_numeric($count) ? (int)$count : 0;
    }

    /**
     * @param array<string, int> $where
     */
    private function findOne(array $where): ?Conversation
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $queryBuilder->select('*')
            ->from(self::TABLE)
            ->where($queryBuilder->expr()->eq('deleted', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)));
        foreach ($where as $column => $value) {
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq($column, $queryBuilder->createNamedParameter($value, Connection::PARAM_INT)),
            );
        }

        $row = $queryBuilder->executeQuery()->fetchAssociative();

        return $row !== false ? Conversation::fromRow($row) : null;
    }

    /**
     * @param array<string, mixed> $value
     */
    private static function encode(array $value): string
    {
        if ($value === []) {
            return '';
        }
        $json = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);

        return is_string($json) ? $json : '';
    }
}
