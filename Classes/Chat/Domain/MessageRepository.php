<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Domain;

use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;

/**
 * Transcript rows, one per message.
 *
 * The sequence is assigned here, and the table's UNIQUE (conversation,
 * sequence) is what makes that safe: two writers racing for the same number
 * cannot both win.
 */
final readonly class MessageRepository
{
    public const string TABLE = 'tx_webconaiassistant_message';

    public function __construct(
        private ConnectionPool $connectionPool,
    ) {}

    /**
     * @return list<Message>
     */
    public function findByConversation(int $conversationUid, int $afterSequence = 0): array
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $rows = $queryBuilder->select('*')
            ->from(self::TABLE)
            ->where(
                $queryBuilder->expr()->eq('conversation', $queryBuilder->createNamedParameter($conversationUid, Connection::PARAM_INT)),
                $queryBuilder->expr()->gt('sequence', $queryBuilder->createNamedParameter($afterSequence, Connection::PARAM_INT)),
            )
            ->orderBy('sequence', 'ASC')
            ->executeQuery()
            ->fetchAllAssociative();

        return array_map(Message::fromRow(...), $rows);
    }

    /**
     * The last `$limit` rows, oldest first — what the model is shown.
     *
     * @return list<Message>
     */
    public function findTail(int $conversationUid, int $limit): array
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $rows = $queryBuilder->select('*')
            ->from(self::TABLE)
            ->where(
                $queryBuilder->expr()->eq('conversation', $queryBuilder->createNamedParameter($conversationUid, Connection::PARAM_INT)),
            )
            ->orderBy('sequence', 'DESC')
            ->setMaxResults(max(1, $limit))
            ->executeQuery()
            ->fetchAllAssociative();

        return array_map(Message::fromRow(...), array_reverse($rows));
    }

    /**
     * Append one message and return it with its assigned uid and sequence.
     */
    public function append(Message $message): Message
    {
        $connection = $this->connectionPool->getConnectionForTable(self::TABLE);
        $sequence = $this->nextSequence($message->conversation);
        $crdate = time();

        $row = $message->toRow();
        $row['sequence'] = $sequence;
        $row['crdate'] = $crdate;
        // The JSON columns carry arrays: the connection reads the column types
        // from the schema and encodes them, so handing it pre-encoded strings
        // would double-encode.
        $connection->insert(self::TABLE, $row);

        return new Message(
            uid: (int)$connection->lastInsertId(),
            conversation: $message->conversation,
            sequence: $sequence,
            role: $message->role,
            content: $message->content,
            toolCalls: $message->toolCalls,
            toolCallId: $message->toolCallId,
            attachments: $message->attachments,
            writeTargets: $message->writeTargets,
            runUuid: $message->runUuid,
            promptTokens: $message->promptTokens,
            completionTokens: $message->completionTokens,
            crdate: $crdate,
        );
    }

    public function countByConversation(int $conversationUid): int
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $count = $queryBuilder->count('uid')
            ->from(self::TABLE)
            ->where(
                $queryBuilder->expr()->eq('conversation', $queryBuilder->createNamedParameter($conversationUid, Connection::PARAM_INT)),
            )
            ->executeQuery()
            ->fetchOne();

        return is_numeric($count) ? (int)$count : 0;
    }

    /**
     * @param list<int> $conversationUids
     */
    public function deleteByConversations(array $conversationUids): int
    {
        if ($conversationUids === []) {
            return 0;
        }

        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);

        return (int)$queryBuilder->delete(self::TABLE)
            ->where(
                $queryBuilder->expr()->in(
                    'conversation',
                    $queryBuilder->createNamedParameter($conversationUids, Connection::PARAM_INT_ARRAY),
                ),
            )
            ->executeStatement();
    }

    private function nextSequence(int $conversationUid): int
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $max = $queryBuilder->selectLiteral('MAX(' . $queryBuilder->quoteIdentifier('sequence') . ')')
            ->from(self::TABLE)
            ->where(
                $queryBuilder->expr()->eq('conversation', $queryBuilder->createNamedParameter($conversationUid, Connection::PARAM_INT)),
            )
            ->executeQuery()
            ->fetchOne();

        return (is_numeric($max) ? (int)$max : 0) + 1;
    }
}
