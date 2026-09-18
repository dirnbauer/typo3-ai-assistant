<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Api;

use Closure;
use Netresearch\NrLlm\Domain\ValueObject\AgentRunEvent;
use Netresearch\NrLlm\Service\Agent\AgentRuntimeInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentStorage;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationStatus;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;
use Webconsulting\ShadcnUi\Chat\Security\TurnRateLimiter;
use Webconsulting\ShadcnUi\Chat\Turn\ChatContextFactory;
use Webconsulting\ShadcnUi\Chat\Turn\TurnResult;
use Webconsulting\ShadcnUi\Chat\Turn\TurnRunner;

/**
 * The routes that drive a run: a message, a decision, an answer, a cancel — and
 * the trace read back from nr-llm.
 */
final readonly class TurnController extends AbstractApiController
{
    public const MAX_MESSAGE_LENGTH = 10000;

    public function __construct(
        BackendUserContext $backendUser,
        ConversationRepository $conversations,
        private TurnRunner $turns,
        private TurnRateLimiter $rateLimiter,
        private ChatContextFactory $contextFactory,
        private AttachmentStorage $attachments,
        private AgentRuntimeInterface $agentRuntime,
    ) {
        parent::__construct($backendUser, $conversations);
    }

    public function turn(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);

            $content = trim($api->string('content'));
            if ($content === '') {
                throw new ApiException('A message cannot be empty.', 400);
            }
            if (mb_strlen($content) > self::MAX_MESSAGE_LENGTH) {
                throw new ApiException(sprintf('A message may be at most %d characters long.', self::MAX_MESSAGE_LENGTH), 400);
            }
            if (!$this->rateLimiter->consume($this->backendUser->uid())) {
                throw new ApiException(sprintf('You have started too many turns. The limit is %d per hour.', $this->rateLimiter->limit()), 429);
            }

            $attachments = $this->attachments->resolve($api->list('attachments'));
            $context = $this->contextFactory->fromClient($api->object('context'));

            return TurnResponder::respond(
                $api,
                fn(Closure $emit): TurnResult => $this->turns->start($conversation, $content, $attachments, $context, $emit),
                fn(): bool => $this->turns->cancel($conversation),
            );
        });
    }

    public function approval(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);
            $approved = $api->bool('approved') === true;
            $digest = $api->string('turnDigest');

            return TurnResponder::respond(
                $api,
                fn(Closure $emit): TurnResult => $this->turns->approve($conversation, $approved, $digest, $emit),
                fn(): bool => $this->turns->cancel($conversation),
            );
        });
    }

    public function input(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);
            $answer = trim($api->string('answer'));
            if ($answer === '') {
                throw new ApiException('An answer cannot be empty.', 400);
            }
            $digest = $api->string('turnDigest');

            return TurnResponder::respond(
                $api,
                fn(Closure $emit): TurnResult => $this->turns->answer($conversation, $answer, $digest, $emit),
                fn(): bool => $this->turns->cancel($conversation),
            );
        });
    }

    public function cancel(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, fn(ApiRequest $api): ResponseInterface => self::json([
            'cancelled' => $this->turns->cancel($this->conversation($api)),
            'status' => ConversationStatus::Idle->value,
        ]));
    }

    /**
     * The run's execution trace, straight from nr-llm under the caller's own
     * actor — which is also what stops a guessed run uuid from opening
     * somebody else's run. This extension keeps no copy of it.
     */
    public function events(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);
            $runUuid = $api->string('runUuid', $conversation->runUuid);
            if ($runUuid === '') {
                return self::json(['runUuid' => '', 'events' => []]);
            }

            $events = $this->agentRuntime->events($this->backendUser->actor(), $runUuid, $api->int('after', -1));

            return self::json([
                'runUuid' => $runUuid,
                'events' => array_map(static fn(AgentRunEvent $event): array => [
                    'sequence' => $event->sequence,
                    'kind' => $event->kind,
                    'round' => $event->round,
                    'durationMs' => $event->durationMs,
                    'payload' => $event->payload,
                    'createdAt' => $event->crdate,
                ], $events),
            ]);
        });
    }
}
