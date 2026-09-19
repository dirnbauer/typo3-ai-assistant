<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Api;

use Netresearch\NrLlm\Domain\Model\LlmConfiguration;
use Netresearch\NrLlm\Service\BudgetServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Webconsulting\ShadcnUi\Chat\Attachment\Document\DocumentExtractorRegistry;
use Webconsulting\ShadcnUi\Chat\ChatException;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\Domain\InstructionRepository;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;
use Webconsulting\ShadcnUi\Chat\Security\ToolAccess;
use Webconsulting\ShadcnUi\Chat\Security\TurnRateLimiter;
use Webconsulting\ShadcnUi\Chat\Tool\McpCatalogTool;
use Webconsulting\ShadcnUi\Chat\Tool\ToolEffectLookup;
use Webconsulting\ShadcnUi\Chat\Turn\ChatConfigurationResolver;
use Webconsulting\ShadcnUi\Chat\Turn\ChatContextFactory;
use Webconsulting\ShadcnUi\Chat\Turn\TurnRunner;
use Webconsulting\ShadcnUi\Configuration\ExtensionSettings;

/**
 * Everything a client needs before it renders anything: whether the chat works
 * at all, what it runs on, which tools it may reach, what it may spend, and
 * where the user is standing.
 */
final readonly class StatusController extends AbstractApiController
{
    /**
     * Openers the chat can honestly offer, given the tools this user may reach.
     * Suggesting an action whose tool is disabled teaches the user to distrust
     * every suggestion after it.
     */
    private const SUGGESTIONS = [
        'GetPageTree' => 'Show me the page tree below the site root.',
        'Search' => 'Find every page that mentions our old product name.',
        'GetPage' => 'Summarise the content elements on this page.',
        'ReadTable' => 'List the ten most recently changed news records.',
        'GetSystemLog' => 'What errors has this installation logged today?',
    ];

    public function __construct(
        BackendUserContext $backendUser,
        ConversationRepository $conversations,
        private ChatConfigurationResolver $configuration,
        private ToolAccess $toolAccess,
        private ToolEffectLookup $effectLookup,
        private TurnRateLimiter $rateLimiter,
        private BudgetServiceInterface $budgetService,
        private InstructionRepository $instructions,
        private ChatContextFactory $contextFactory,
        private DocumentExtractorRegistry $extractors,
        private ExtensionSettings $settings,
    ) {
        parent::__construct($backendUser, $conversations);
    }

    public function status(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $issues = [];
            $configuration = null;
            try {
                $configuration = $this->configuration->resolve($this->backendUser->actor());
            } catch (ChatException $exception) {
                $issues[] = $exception->getMessage();
            }

            $tools = $this->toolAccess->allowedToolNames();
            if ($configuration instanceof LlmConfiguration && $tools === []) {
                $issues[] = 'No tools are enabled for you. The chat can answer questions but cannot inspect or change this installation.';
            }

            $uid = $this->backendUser->uid();
            $budget = $this->budgetService->check($uid, 0.0, $configuration);

            return self::json([
                'available' => $configuration instanceof LlmConfiguration,
                'issues' => $issues,
                'configuration' => $configuration instanceof LlmConfiguration ? ChatConfigurationResolver::describe($configuration) : null,
                'tools' => $this->effectLookup->describe($tools),
                'budget' => ['allowed' => $budget->allowed, 'reason' => $budget->reason],
                'limits' => [
                    'maxMessageLength' => TurnController::MAX_MESSAGE_LENGTH,
                    'maxIterations' => TurnRunner::MAX_ITERATIONS,
                    'turnsPerHour' => $this->rateLimiter->limit(),
                    'turnsRemaining' => $this->rateLimiter->remaining($uid),
                    'activeConversations' => $this->conversations->countActiveByBeUser($uid),
                ],
                'suggestions' => self::suggestions($tools),
                'features' => [
                    'sse' => true,
                    'approvals' => true,
                    'input' => true,
                    'attachments' => true,
                    'writes' => $this->settings->allowWrites(),
                ],
                'attachments' => [
                    'extensions' => $this->extractors->extensions(),
                    'mimeTypes' => $this->extractors->mimeTypes(),
                ],
                'instructions' => array_map(
                    static fn(array $instruction): array => ['uid' => $instruction['uid'], 'title' => $instruction['title']],
                    $this->instructions->findActiveFor($this->backendUser->groupIds()),
                ),
                'context' => $this->contextFactory->fromClient([
                    'appName' => $api->string('appName'),
                    'pageId' => $api->int('pageId'),
                ])->toArray(),
                'user' => ['uid' => $uid, 'admin' => $this->backendUser->isAdmin()],
            ]);
        });
    }

    /**
     * @param list<string> $toolNames
     *
     * @return list<string>
     */
    private static function suggestions(array $toolNames): array
    {
        $mcpNames = array_filter(array_map(McpCatalogTool::mcpName(...), $toolNames));

        return array_values(array_intersect_key(self::SUGGESTIONS, array_flip($mcpNames)));
    }
}
