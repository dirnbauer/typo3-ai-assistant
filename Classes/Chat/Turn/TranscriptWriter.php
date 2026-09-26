<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

use Netresearch\NrLlm\Domain\ValueObject\RecordReference;
use Netresearch\NrLlm\Domain\ValueObject\RunStep;
use Netresearch\NrLlm\Domain\ValueObject\ToolCall;
use Netresearch\NrLlm\Service\Agent\AgentRunResult;
use Webconsulting\WebconAiAssistant\Chat\Domain\Conversation;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\Message;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRole;

/**
 * Writes what a run produced back into the transcript.
 *
 * Persisted: the user's message, the assistant turns, the tool turns answering
 * them — the transcript the NEXT turn replays, and a provider rejects a tool
 * turn whose assistant tool-call turn is missing. Not persisted: the trace
 * proper (arguments in full, durations, artifacts), which nr-llm holds against
 * the run uuid.
 */
final readonly class TranscriptWriter
{
    public function __construct(
        private MessageRepository $messages,
        private ConversationRepository $conversations,
        private WriteLedger $writeLedger,
    ) {}

    /**
     * @param list<array<string, mixed>> $attachments
     */
    public function appendUserMessage(Conversation $conversation, string $content, array $attachments, string $runUuid): Message
    {
        $message = $this->messages->append(new Message(
            uid: 0,
            conversation: $conversation->uid,
            sequence: 0,
            role: MessageRole::User,
            content: $content,
            attachments: $attachments,
            runUuid: $runUuid,
        ));

        // The first thing a user says is the best title anyone will write for
        // the conversation, and it is available now rather than after a
        // round-trip that may fail.
        $this->refreshCounters($conversation, $conversation->title === '' ? self::titleFrom($content) : null);

        return $message;
    }

    /**
     * Turn the recorded steps into message rows.
     *
     * @param list<RunStep>        $steps
     * @param array<string, mixed> $resumedCard the approval or input card a resumed run
     *                                          was waiting on, naming the calls its
     *                                          earlier segment requested
     *
     * @return list<Message>
     */
    public function persistSteps(Conversation $conversation, array $steps, string $runUuid, array $resumedCard = []): array
    {
        $openCalls = new OpenCalls();
        $openCalls->pushCard($resumedCard);
        $persisted = [];

        foreach ($steps as $step) {
            $message = match ($step->kind) {
                RunStep::KIND_LLM => $this->assistantRow($conversation, $step, $runUuid, $openCalls),
                RunStep::KIND_TOOL => $this->toolRow($conversation, $step, $runUuid, $openCalls),
                default => null,
            };
            if ($message !== null) {
                $persisted[] = $this->messages->append($message);
            }
        }

        if ($persisted !== []) {
            $this->refreshCounters($conversation);
        }

        return $persisted;
    }

    /**
     * @return array{promptTokens: int, completionTokens: int, totalTokens: int}
     */
    public static function usage(AgentRunResult $result): array
    {
        $usage = $result->loopResult?->usage;
        if ($usage !== null) {
            return [
                'promptTokens' => $usage->promptTokens,
                'completionTokens' => $usage->completionTokens,
                'totalTokens' => $usage->totalTokens,
            ];
        }

        // A suspended or failed run has no loop result, but its steps were paid
        // for — summing them is the only honest number available.
        $prompt = 0;
        $completion = 0;
        foreach ($result->steps as $step) {
            $prompt += $step->promptTokens ?? 0;
            $completion += $step->completionTokens ?? 0;
        }

        return ['promptTokens' => $prompt, 'completionTokens' => $completion, 'totalTokens' => $prompt + $completion];
    }

    public function refreshCounters(Conversation $conversation, ?string $title = null): void
    {
        $this->conversations->touchMessages(
            $conversation->uid,
            $this->messages->countByConversation($conversation->uid),
            $title,
        );
    }

    private function assistantRow(Conversation $conversation, RunStep $step, string $runUuid, OpenCalls $openCalls): ?Message
    {
        $wireCalls = [];
        foreach (StepRecorder::requestedCalls($step) as $call) {
            if ($call['id'] === '') {
                continue;
            }
            $openCalls->push($call['id'], $call['name']);
            $wireCalls[] = ToolCall::function($call['id'], $call['name'], $call['arguments'])->toArray();
        }

        $content = is_string($step->content) ? trim($step->content) : '';
        if ($wireCalls === [] && $content === '') {
            return null;
        }

        return new Message(
            uid: 0,
            conversation: $conversation->uid,
            sequence: 0,
            role: MessageRole::Assistant,
            content: $content,
            toolCalls: $wireCalls,
            runUuid: $runUuid,
            promptTokens: $step->promptTokens ?? 0,
            completionTokens: $step->completionTokens ?? 0,
        );
    }

    private function toolRow(Conversation $conversation, RunStep $step, string $runUuid, OpenCalls $openCalls): ?Message
    {
        $callId = $openCalls->take($step->toolName ?? '');
        if ($callId === '') {
            // A tool message with no call to answer is rejected by every
            // provider; dropping it keeps the transcript replayable. The full
            // step is still in nr-llm.
            return null;
        }

        return new Message(
            uid: 0,
            conversation: $conversation->uid,
            sequence: 0,
            role: MessageRole::Tool,
            content: ToolResultText::bounded($step->toolResult ?? ''),
            toolCallId: $callId,
            writeTargets: $step->writeTarget instanceof RecordReference ? [$this->writeLedger->describe($step->writeTarget)] : [],
            runUuid: $runUuid,
        );
    }

    private static function titleFrom(string $content): string
    {
        $normalised = trim(preg_replace('/\s+/u', ' ', $content) ?? $content);

        return mb_strlen($normalised) > 80 ? mb_substr($normalised, 0, 79) . "\u{2026}" : $normalised;
    }
}
