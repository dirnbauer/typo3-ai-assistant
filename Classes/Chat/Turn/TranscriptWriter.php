<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Turn;

use Netresearch\NrLlm\Domain\ValueObject\RecordReference;
use Netresearch\NrLlm\Domain\ValueObject\RunStep;
use Netresearch\NrLlm\Domain\ValueObject\ToolCall;
use Netresearch\NrLlm\Service\Agent\AgentRunResult;
use Webconsulting\ShadcnUi\Chat\Domain\Conversation;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\Domain\Message;
use Webconsulting\ShadcnUi\Chat\Domain\MessageRepository;
use Webconsulting\ShadcnUi\Chat\Domain\MessageRole;

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
    /**
     * Tool output is fed back to the model in full but stored bounded: a
     * megabyte of JSON would make the conversation unloadable forever, to keep a
     * payload nr-llm already has.
     */
    private const MAX_TOOL_CONTENT = 20000;

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
     * @param list<RunStep>                         $steps
     * @param list<array{id: string, name: string}> $resumedCalls calls requested in an EARLIER
     *                                                            segment of the same run
     *
     * @return list<Message>
     */
    public function persistSteps(Conversation $conversation, array $steps, string $runUuid, array $resumedCalls = []): array
    {
        $openCalls = $resumedCalls;
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
     * The calls named by a stored approval card, in the shape the recorder and
     * the writer correlate against.
     *
     * @param array<string, mixed> $pending
     *
     * @return list<array{id: string, name: string}>
     */
    public static function resumedCalls(array $pending): array
    {
        $calls = [];
        foreach (is_array($pending['calls'] ?? null) ? $pending['calls'] : [] as $call) {
            if (!is_array($call)) {
                continue;
            }
            $name = is_string($call['name'] ?? null) ? $call['name'] : '';
            $id = is_string($call['callId'] ?? null) ? $call['callId'] : '';
            if ($name !== '' && $id !== '') {
                $calls[] = ['id' => $id, 'name' => $name];
            }
        }

        return $calls;
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

    /**
     * @param list<array{id: string, name: string}> $openCalls
     */
    private function assistantRow(Conversation $conversation, RunStep $step, string $runUuid, array &$openCalls): ?Message
    {
        $wireCalls = [];
        foreach (StepRecorder::requestedCalls($step) as $call) {
            if ($call['id'] === '') {
                continue;
            }
            $openCalls[] = ['id' => $call['id'], 'name' => $call['name']];
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

    /**
     * @param list<array{id: string, name: string}> $openCalls
     */
    private function toolRow(Conversation $conversation, RunStep $step, string $runUuid, array &$openCalls): ?Message
    {
        $callId = '';
        foreach ($openCalls as $index => $call) {
            if ($call['name'] === ($step->toolName ?? '')) {
                $callId = $call['id'];
                unset($openCalls[$index]);
                $openCalls = array_values($openCalls);
                break;
            }
        }
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
            content: self::bounded($step->toolResult ?? ''),
            toolCallId: $callId,
            writeTargets: $step->writeTarget instanceof RecordReference ? [$this->writeLedger->describe($step->writeTarget)] : [],
            runUuid: $runUuid,
        );
    }

    private static function bounded(string $content): string
    {
        return mb_strlen($content) > self::MAX_TOOL_CONTENT
            ? mb_substr($content, 0, self::MAX_TOOL_CONTENT) . "\u{2026} [truncated]"
            : $content;
    }

    private static function titleFrom(string $content): string
    {
        $normalised = trim(preg_replace('/\s+/u', ' ', $content) ?? $content);

        return mb_strlen($normalised) > 80 ? mb_substr($normalised, 0, 79) . "\u{2026}" : $normalised;
    }
}
