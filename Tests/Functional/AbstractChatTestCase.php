<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional;

use TYPO3\CMS\Backend\Module\ModuleProvider;
use TYPO3\CMS\Backend\Routing\Route;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Core\SystemEnvironmentBuilder;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Http\NormalizedParams;
use TYPO3\CMS\Core\Http\ServerRequest;
use TYPO3\CMS\Core\Localization\LanguageServiceFactory;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

/**
 * What every functional test of the chat needs: the extension, its
 * dependencies, and a backend user that owns the rows under test.
 */
abstract class AbstractChatTestCase extends FunctionalTestCase
{
    protected const int BE_USER_UID = 1;

    protected const int EDITOR_UID = 2;

    protected array $coreExtensionsToLoad = ['backend', 'workspaces'];

    protected array $testExtensionsToLoad = [
        'abilities',
        'mcp_server',
        'nr_vault',
        'nr_llm',
        'webcon_ai_assistant',
    ];

    protected function setUp(): void
    {
        parent::setUp();
        $this->importCSVDataSet(__DIR__ . '/Fixtures/be_users.csv');
        $this->setUpBackendUser(self::BE_USER_UID);
    }

    protected function tearDown(): void
    {
        unset($GLOBALS['BE_USER'], $GLOBALS['LANG'], $GLOBALS['TYPO3_REQUEST']);
        parent::tearDown();
    }

    /**
     * A backend request for a module, as the routing would have built it —
     * enough for a controller to render its module through the core's own
     * module template.
     *
     * @param array<string, mixed> $query
     */
    protected function moduleRequest(string $moduleIdentifier, array $query = [], string $language = 'default'): ServerRequest
    {
        $module = $this->get(ModuleProvider::class)->getModule($moduleIdentifier);
        self::assertNotNull($module, sprintf('The module "%s" is registered.', $moduleIdentifier));
        $route = new Route($module->getPath(), [
            '_identifier' => $moduleIdentifier,
            'module' => $module,
            'packageName' => 'webconsulting/typo3-ai-assistant',
        ]);

        $backendUser = $GLOBALS['BE_USER'] ?? null;
        self::assertInstanceOf(BackendUserAuthentication::class, $backendUser);
        $backendUser->user['lang'] = $language;
        $GLOBALS['LANG'] = $this->get(LanguageServiceFactory::class)->createFromUserPreferences($backendUser);

        $serverParams = ['HTTP_HOST' => 'typo3-testing.local', 'HTTPS' => 'on', 'SCRIPT_NAME' => '/typo3/index.php', 'REQUEST_URI' => '/typo3' . $module->getPath()];
        $request = new ServerRequest('https://typo3-testing.local/typo3' . $module->getPath(), 'GET', null, [], $serverParams)
            ->withQueryParams($query)
            ->withAttribute('applicationType', SystemEnvironmentBuilder::REQUESTTYPE_BE)
            ->withAttribute('normalizedParams', NormalizedParams::createFromServerParams($serverParams))
            ->withAttribute('route', $route)
            ->withAttribute('module', $module);
        $GLOBALS['TYPO3_REQUEST'] = $request;

        return $request;
    }

    /**
     * @return array<string, mixed>
     */
    protected function row(string $table, int $uid): array
    {
        // Straight from the table: Connection::select() would apply the TCA's
        // enable columns and hide exactly the switched-off rows a test checks.
        $queryBuilder = $this->getConnectionPool()->getQueryBuilderForTable($table);
        $queryBuilder->getRestrictions()->removeAll();
        $row = $queryBuilder->select('*')
            ->from($table)
            ->where($queryBuilder->expr()->eq('uid', $queryBuilder->createNamedParameter($uid, Connection::PARAM_INT)))
            ->executeQuery()
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
