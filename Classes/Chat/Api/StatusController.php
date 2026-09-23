<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Api;

use Netresearch\NrLlm\Domain\Model\LlmConfiguration;
use Netresearch\NrLlm\Service\BudgetServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use Webconsulting\WebconAiAssistant\Chat\Attachment\Document\DocumentExtractorRegistry;
use Webconsulting\WebconAiAssistant\Chat\ChatException;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\InstructionRepository;
use Webconsulting\WebconAiAssistant\Chat\Security\BackendUserContext;
use Webconsulting\WebconAiAssistant\Chat\Security\ToolAccess;
use Webconsulting\WebconAiAssistant\Chat\Security\TurnRateLimiter;
use Webconsulting\WebconAiAssistant\Chat\Tool\McpCatalogTool;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolEffectLookup;
use Webconsulting\WebconAiAssistant\Chat\Turn\ChatConfigurationResolver;
use Webconsulting\WebconAiAssistant\Chat\Turn\ChatContextFactory;
use Webconsulting\WebconAiAssistant\Chat\Turn\TurnRunner;
use Webconsulting\WebconAiAssistant\Chat\UserMessages;
use Webconsulting\WebconAiAssistant\Configuration\ExtensionSettings;

/**
 * Everything a client needs before it renders anything: whether the chat works
 * at all, what it runs on, which tools it may reach, what it may spend, and
 * where the user is standing.
 */
#[AsController]
final readonly class StatusController extends AbstractApiController
{
    /**
     * Openers the chat can honestly offer, given the tools this user may reach.
     * Suggesting an action whose tool is disabled teaches the user to distrust
     * every suggestion after it. Each is labelled `suggestion.<MCP tool name>`;
     * the English text here is what a request without a language service gets.
     *
     * @var array<string, string>
     */
    private const array SUGGESTIONS = [
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
                $issues[] = UserMessages::of($exception);
            }

            $tools = $this->toolAccess->allowedToolNames();
            if ($configuration instanceof LlmConfiguration && $tools === []) {
                $issues[] = UserMessages::label('status.noTools')
                    ?? 'No tools are enabled for you. The chat can answer questions but cannot inspect or change this installation.';
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
                    'maxBytes' => $this->extractors->maxBytesByExtension(),
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
        $reachable = array_flip(array_filter(array_map(McpCatalogTool::mcpName(...), $toolNames)));
        $suggestions = [];
        foreach (self::SUGGESTIONS as $mcpName => $english) {
            if (isset($reachable[$mcpName])) {
                $suggestions[] = UserMessages::label('suggestion.' . $mcpName) ?? $english;
            }
        }

        return $suggestions;
    }
}
