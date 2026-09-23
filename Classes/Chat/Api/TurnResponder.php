<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Api;

use Closure;
use Psr\Http\Message\ResponseInterface;
use Throwable;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Http\Response;
use Webconsulting\WebconAiAssistant\Chat\ChatException;
use Webconsulting\WebconAiAssistant\Chat\ErrorMessageSanitizer;
use Webconsulting\WebconAiAssistant\Chat\Http\ServerSentEventStream;
use Webconsulting\WebconAiAssistant\Chat\Http\TurnEventSink;
use Webconsulting\WebconAiAssistant\Chat\Turn\TurnResult;
use Webconsulting\WebconAiAssistant\Chat\UserMessages;

/**
 * One producer, two transports.
 *
 * The client asks for `text/event-stream` when it wants the turn as it happens
 * and gets the same events as one JSON document when it does not. Content
 * negotiation rather than two routes, so the transports cannot drift into
 * disagreeing about what happened.
 */
final readonly class TurnResponder
{
    /**
     * @param Closure(Closure(string, array<string, mixed>): void): TurnResult $producer runs the turn, emitting into the callback
     * @param Closure(): mixed                                                  $onAbort  called when a streaming client goes away
     */
    public static function respond(ApiRequest $api, Closure $producer, Closure $onAbort): ResponseInterface
    {
        if ($api->wantsEventStream()) {
            $stream = new ServerSentEventStream(
                producer: static function (TurnEventSink $sink) use ($producer): void {
                    try {
                        $producer($sink->emitter());
                    } catch (ChatException $exception) {
                        $sink->emit('run.error', ['message' => UserMessages::of($exception)]);
                    } catch (Throwable $exception) {
                        $sink->emit('run.error', ['message' => ErrorMessageSanitizer::sanitize($exception->getMessage())]);
                    }
                },
                onAbort: static function () use ($onAbort): void {
                    $onAbort();
                },
            );

            return new Response($stream, 200, ServerSentEventStream::headers());
        }

        $sink = new TurnEventSink();
        $result = $producer($sink->emitter());

        return new JsonResponse($result->toArray() + ['events' => $sink->collected()]);
    }
}
