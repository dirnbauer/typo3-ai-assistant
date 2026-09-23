<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Domain;

use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\Restriction\DeletedRestriction;
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
    public const string TABLE = 'tx_webconaiassistant_instruction';

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
        $instructions = [];
        foreach ($this->rows(includeHidden: false) as $row) {
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

    /**
     * Every instruction record, switched off or not, as the Instructions
     * module lists them: in sorting order, with the titles of the groups each
     * one is scoped to. A group that no longer exists is listed by its uid: an
     * instruction scoped to it reaches nobody, and "everyone" would be a lie.
     *
     * @return list<array{uid: int, title: string, body: string, hidden: bool, description: string, groups: list<string>}>
     */
    public function findAllForAdministration(): array
    {
        $rows = $this->rows(includeHidden: true);
        $groupIds = [];
        foreach ($rows as $row) {
            $groupIds = [...$groupIds, ...GeneralUtility::intExplode(',', Row::string($row, 'be_groups'), true)];
        }
        $groupTitles = $this->groupTitles(array_values(array_unique($groupIds)));

        return array_map(static fn(array $row): array => [
            'uid' => Row::int($row, 'uid'),
            'title' => Row::string($row, 'title'),
            'body' => trim(Row::string($row, 'body')),
            'hidden' => Row::bool($row, 'hidden'),
            'description' => trim(Row::string($row, 'description')),
            'groups' => array_map(
                static fn(int $uid): string => $groupTitles[$uid] ?? '#' . $uid,
                GeneralUtility::intExplode(',', Row::string($row, 'be_groups'), true),
            ),
        ], $rows);
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function rows(bool $includeHidden): array
    {
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable(self::TABLE);
        // The TCA's enable columns would hide switched-off records from the
        // administration list too; this repository states its own filter.
        $queryBuilder->getRestrictions()->removeAll()->add(new DeletedRestriction());
        $queryBuilder->select('uid', 'title', 'body', 'be_groups', 'hidden', 'description')
            ->from(self::TABLE)
            ->orderBy('sorting', 'ASC')
            ->addOrderBy('uid', 'ASC');
        if (!$includeHidden) {
            $queryBuilder->where(
                $queryBuilder->expr()->eq('hidden', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)),
            );
        }

        return array_map(Row::stringKeyed(...), $queryBuilder->executeQuery()->fetchAllAssociative());
    }

    /**
     * @param list<int> $uids
     *
     * @return array<int, string>
     */
    private function groupTitles(array $uids): array
    {
        if ($uids === []) {
            return [];
        }

        $queryBuilder = $this->connectionPool->getQueryBuilderForTable('be_groups');
        $queryBuilder->getRestrictions()->removeAll()->add(new DeletedRestriction());
        $rows = $queryBuilder->select('uid', 'title')
            ->from('be_groups')
            ->where($queryBuilder->expr()->in('uid', $queryBuilder->createNamedParameter($uids, Connection::PARAM_INT_ARRAY)))
            ->executeQuery()
            ->fetchAllAssociative();

        $titles = [];
        foreach ($rows as $row) {
            $titles[Row::int($row, 'uid')] = Row::string($row, 'title');
        }

        return $titles;
    }
}
