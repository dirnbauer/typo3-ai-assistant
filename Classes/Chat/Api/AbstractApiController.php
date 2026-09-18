<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Api;

use Closure;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;
use TYPO3\CMS\Core\Http\JsonResponse;
use Webconsulting\ShadcnUi\Chat\Attachment\AttachmentRejectedException;
use Webconsulting\ShadcnUi\Chat\ChatException;
use Webconsulting\ShadcnUi\Chat\Domain\Conversation;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\ErrorMessageSanitizer;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;

/**
 * What every chat route does before and after its own work: require a signed-in
 * backend user, wrap the request, turn the exceptions the layers below throw
 * into the status codes the client understands.
 *
 * The mapping is the whole error contract: 400 and 404 are this layer's own
 * refusals, 409 is a {@see ChatException} (the conversation is not in the state
 * the request assumes), 422 is a file the chat will not take, 500 is anything
 * nobody expected — sanitized, because it may quote a provider.
 */
abstract readonly class AbstractApiController
{
    public function __construct(
        protected BackendUserContext $backendUser,
        protected ConversationRepository $conversations,
    ) {}

    /**
     * @param Closure(ApiRequest): ResponseInterface $action
     */
    protected function handle(ServerRequestInterface $request, Closure $action): ResponseInterface
    {
        if (!$this->backendUser->isAuthenticated()) {
            return self::error('You must be signed in to the backend.', 403);
        }

        try {
            return $action(new ApiRequest($request));
        } catch (ApiException $exception) {
            return self::error($exception->getMessage(), $exception->status);
        } catch (ChatException $exception) {
            return self::error($exception->getMessage(), 409);
        } catch (AttachmentRejectedException $exception) {
            return self::error($exception->getMessage(), 422);
        } catch (Throwable $exception) {
            return self::error(ErrorMessageSanitizer::sanitize($exception->getMessage()), 500);
        }
    }

    /**
     * The conversation the request names, if it belongs to this user. A
     * stranger gets 404, not 403 — they learn nothing about what exists.
     */
    protected function conversation(ApiRequest $api): Conversation
    {
        return $this->conversations->findOneByUidAndBeUser($api->conversationUid(), $this->backendUser->uid())
            ?? throw new ApiException('Conversation not found.', 404);
    }

    /**
     * @param array<string, mixed> $data
     */
    protected static function json(array $data, int $status = 200): JsonResponse
    {
        return new JsonResponse($data, $status);
    }

    protected static function error(string $message, int $status): JsonResponse
    {
        return new JsonResponse(['error' => $message], $status);
    }
}
