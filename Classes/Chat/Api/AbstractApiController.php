<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Api;

use Closure;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;
use TYPO3\CMS\Core\Http\JsonResponse;
use Webconsulting\WebconAiAssistant\Chat\Attachment\AttachmentRejectedException;
use Webconsulting\WebconAiAssistant\Chat\ChatException;
use Webconsulting\WebconAiAssistant\Chat\Domain\Conversation;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\ErrorMessageSanitizer;
use Webconsulting\WebconAiAssistant\Chat\LocalizableException;
use Webconsulting\WebconAiAssistant\Chat\Security\BackendUserContext;
use Webconsulting\WebconAiAssistant\Chat\UserMessages;

/**
 * What every chat route does before and after its own work: require a signed-in
 * backend user, wrap the request, turn the exceptions the layers below throw
 * into the status codes the client understands.
 *
 * The mapping is the whole error contract: 400 and 404 are this layer's own
 * refusals, 409 is a {@see ChatException} (the conversation is not in the state
 * the request assumes), 422 is a file the chat will not take, 500 is anything
 * nobody expected — sanitized, because it may quote a provider. The message is
 * the one the user reads, in their backend language ({@see UserMessages}).
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
            return self::failure(new ApiException('You must be signed in to the backend.', 403, 1795000601), 403);
        }

        try {
            return $action(new ApiRequest($request));
        } catch (ApiException $exception) {
            return self::failure($exception, $exception->status);
        } catch (ChatException $exception) {
            return self::failure($exception, 409);
        } catch (AttachmentRejectedException $exception) {
            return self::failure($exception, 422);
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
            ?? throw new ApiException('Conversation not found.', 404, 1795000602);
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

    private static function failure(LocalizableException $exception, int $status): JsonResponse
    {
        return self::error(UserMessages::of($exception), $status);
    }
}
