<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Domain;

use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Agent instructions: editable records an administrator writes into the
 * system prompt of every conversation.
 *
 * A record may be restricted to backend groups; an empty restriction applies to
 * everyone. The restriction is a SCOPE, not a permission — an administrator who
 * is not in the named group does not receive the instruction either, because
 * "editors must never delete pages" is about editors.
 */
final readonly class InstructionRepository
{
    public const TABLE = 'tx_shadcnui_instruction';

    public function __construct(
        private ConnectionPool $connectionPool,
    ) {}

    /**
     * The active instructions that apply to a user with these groups, in
     * sorting order.
     *
     * @param list<int> $groupIds
     *
     * @return list<array{uid: int, title: string, body: string}>
     */
    public function findActiveFor(array $groupIds): array
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        $rows = $queryBuilder->select('uid', 'title', 'body', 'be_groups')
            ->from(self::TABLE)
            ->where(
                $queryBuilder->expr()->eq('deleted', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)),
                $queryBuilder->expr()->eq('hidden', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)),
            )
            ->orderBy('sorting', 'ASC')
            ->addOrderBy('uid', 'ASC')
            ->executeQuery()
            ->fetchAllAssociative();

        $instructions = [];
        foreach ($rows as $row) {
            $restrictedTo = GeneralUtility::intExplode(',', Row::string($row, 'be_groups'), true);
            if ($restrictedTo !== [] && array_intersect($restrictedTo, $groupIds) === []) {
                continue;
            }

            $body = trim(Row::string($row, 'body'));
            if ($body === '') {
                continue;
            }

            $instructions[] = [
                'uid' => Row::int($row, 'uid'),
                'title' => Row::string($row, 'title'),
                'body' => $body,
            ];
        }

        return $instructions;
    }
}
