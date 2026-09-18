<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Api;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Webconsulting\ShadcnUi\Chat\Domain\Conversation;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\Domain\Message;
use Webconsulting\ShadcnUi\Chat\Domain\MessageRepository;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;

/**
 * The conversation list and the row itself: create, read, archive, pin,
 * rename, delete. Nothing here starts a run.
 */
final readonly class ConversationController extends AbstractApiController
{
    public function __construct(
        BackendUserContext $backendUser,
        ConversationRepository $conversations,
        private MessageRepository $messages,
    ) {
        parent::__construct($backendUser, $conversations);
    }

    public function list(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, fn(ApiRequest $api): ResponseInterface => self::json([
            'conversations' => array_map(
                static fn(Conversation $conversation): array => $conversation->toArray(),
                $this->conversations->findByBeUser($this->backendUser->uid(), $api->string('archived') === '1'),
            ),
        ]));
    }

    public function get(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);

            return self::json([
                'conversation' => $conversation->toArray(),
                'messages' => array_map(
                    static fn(Message $message): array => $message->toArray(),
                    $this->messages->findByConversation($conversation->uid, $api->int('after')),
                ),
            ]);
        });
    }

    public function create(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, fn(ApiRequest $api): ResponseInterface => self::json([
            'conversation' => $this->conversations->create(
                $this->backendUser->uid(),
                $api->string('title'),
                $api->string('systemPrompt'),
                $api->string('appName'),
                $api->int('pageId'),
            )->toArray(),
        ], 201));
    }

    public function archive(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);
            $archived = $api->bool('archived') ?? true;
            $this->conversations->patch($conversation->uid, $conversation->beUser, ['archived' => (int)$archived]);

            return self::json(['archived' => $archived]);
        });
    }

    public function pin(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);
            $pinned = $api->bool('pinned') ?? !$conversation->pinned;
            $this->conversations->patch($conversation->uid, $conversation->beUser, ['pinned' => (int)$pinned]);

            return self::json(['pinned' => $pinned]);
        });
    }

    public function rename(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);
            $title = mb_substr(trim($api->string('title')), 0, 255);
            if ($title === '') {
                throw new ApiException('A title cannot be empty.', 400);
            }

            $columns = ['title' => $title];
            $autoApprove = $api->bool('autoApproveTools');
            if ($autoApprove !== null) {
                $columns['auto_approve_tools'] = (int)$autoApprove;
            }
            $this->conversations->patch($conversation->uid, $conversation->beUser, $columns);

            return self::json(['title' => $title]);
        });
    }

    /**
     * Soft-delete: the row survives for the cleanup command, which removes it
     * with its messages and its files once retention has passed.
     */
    public function delete(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);
            $this->conversations->patch($conversation->uid, $conversation->beUser, ['deleted' => 1]);

            return self::json(['deleted' => true]);
        });
    }
}
