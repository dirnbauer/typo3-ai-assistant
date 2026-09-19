<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Functional;

use TYPO3\CMS\Core\Database\Connection;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

/**
 * What every functional test of the chat needs: the extension, its
 * dependencies, and a backend user that owns the rows under test.
 */
abstract class AbstractChatTestCase extends FunctionalTestCase
{
    protected const BE_USER_UID = 1;

    protected const EDITOR_UID = 2;

    protected array $coreExtensionsToLoad = ['backend', 'workspaces'];

    protected array $testExtensionsToLoad = [
        'abilities',
        'mcp_server',
        'nr_vault',
        'nr_llm',
        'shadcn_ui',
    ];

    protected function setUp(): void
    {
        parent::setUp();
        $this->importCSVDataSet(__DIR__ . '/Fixtures/be_users.csv');
        $this->setUpBackendUser(self::BE_USER_UID);
    }

    protected function tearDown(): void
    {
        unset($GLOBALS['BE_USER']);
        parent::tearDown();
    }

    /**
     * @return array<string, mixed>
     */
    protected function row(string $table, int $uid): array
    {
        $row = $this->getConnectionPool()
            ->getConnectionForTable($table)
            ->select(['*'], $table, ['uid' => $uid])
            ->fetchAssociative();
        self::assertIsArray($row, sprintf('%s row %d exists', $table, $uid));

        return $row;
    }

    protected function countRows(string $table, string $column, int|string $value): int
    {
        $queryBuilder = $this->getConnectionPool()->getQueryBuilderForTable($table);

        return (int)$queryBuilder->count('uid')
            ->from($table)
            ->where($queryBuilder->expr()->eq($column, $queryBuilder->createNamedParameter(
                $value,
                is_int($value) ? Connection::PARAM_INT : Connection::PARAM_STR,
            )))
            ->executeQuery()
            ->fetchOne();
    }
}
