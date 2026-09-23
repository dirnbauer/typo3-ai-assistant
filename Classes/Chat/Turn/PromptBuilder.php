<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

use Netresearch\NrLlm\Domain\ValueObject\ChatMessage;
use Netresearch\NrLlm\Domain\ValueObject\ToolCall;
use Webconsulting\WebconAiAssistant\Chat\Domain\Message;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRole;
use Webconsulting\WebconAiAssistant\Chat\Domain\Row;

/**
 * Turns persisted rows into the message list one agent run is given.
 *
 * The configuration's own system prompt is NOT here: nr-llm's loop injects it
 * first. What this adds, in order from general to specific, are the
 * administrators' instruction records, the conversation's own prompt and the
 * "where the user is standing" snippet — then the replayable tail of the
 * transcript.
 *
 * The tail is a truncation, and a truncation in the middle of a tool round-trip
 * produces a transcript no provider accepts: a `tool` turn whose assistant
 * tool-call turn fell off the front is an answer to a question never asked. So
 * orphaned tool turns are dropped from the front until the first surviving
 * message stands on its own.
 */
final readonly class PromptBuilder
{
    /**
     * A ceiling on rows loaded, not a token budget — nr-llm does that
     * accounting against the model's window.
     */
    public const int WINDOW = 60;

    /**
     * @param list<Message>                                    $rows         the conversation's rows, oldest first
     * @param list<array{uid: int, title: string, body: string}> $instructions
     *
     * @return list<ChatMessage>
     */
    public function build(
        array $rows,
        array $instructions = [],
        string $conversationPrompt = '',
        string $contextPrompt = '',
        int $window = self::WINDOW,
    ): array {
        $transcript = [];
        foreach ([self::instructionsPrompt($instructions), $conversationPrompt, $contextPrompt] as $systemText) {
            $systemText = trim($systemText);
            if ($systemText !== '') {
                $transcript[] = ChatMessage::system($systemText);
            }
        }

        foreach ($this->window($rows, $window) as $row) {
            $message = $this->toChatMessage($row);
            if ($message !== null) {
                $transcript[] = $message;
            }
        }

        return $transcript;
    }

    /**
     * The replayable tail: the last `$window` rows, minus any leading tool turn
     * whose assistant tool-call turn is no longer present.
     *
     * @param list<Message> $rows
     *
     * @return list<Message>
     */
    public function window(array $rows, int $window = self::WINDOW): array
    {
        $tail = $window > 0 && count($rows) > $window ? array_slice($rows, -$window) : $rows;

        $known = [];
        $result = [];
        foreach ($tail as $row) {
            if ($row->role === MessageRole::Assistant) {
                foreach ($row->toolCalls as $call) {
                    $id = $call['id'] ?? null;
                    if (is_string($id) && $id !== '') {
                        $known[$id] = true;
                    }
                }
            }
            if ($row->role === MessageRole::Tool && !isset($known[$row->toolCallId])) {
                continue;
            }
            $result[] = $row;
        }

        return $result;
    }

    /**
     * @param list<array{uid: int, title: string, body: string}> $instructions
     */
    private static function instructionsPrompt(array $instructions): string
    {
        if ($instructions === []) {
            return '';
        }

        $blocks = array_map(
            static fn(array $instruction): string => ($instruction['title'] !== '' ? '## ' . $instruction['title'] . "\n" : '') . $instruction['body'],
            $instructions,
        );

        return "Instructions from the administrators of this installation. Follow them.\n\n" . implode("\n\n", $blocks);
    }

    private function toChatMessage(Message $row): ?ChatMessage
    {
        return match ($row->role) {
            MessageRole::System => $row->content === '' ? null : ChatMessage::system($row->content),
            MessageRole::User => ChatMessage::user(self::userContent($row)),
            MessageRole::Assistant => $this->assistantMessage($row),
            MessageRole::Tool => $row->toolCallId === '' ? null : ChatMessage::toolResult($row->toolCallId, $row->content),
        };
    }

    private function assistantMessage(Message $row): ?ChatMessage
    {
        $calls = [];
        foreach ($row->toolCalls as $raw) {
            $call = ToolCall::tryFromArray($raw);
            if ($call instanceof ToolCall) {
                $calls[] = $call;
            }
        }
        if ($calls !== []) {
            return ChatMessage::assistantToolCalls($calls, $row->content);
        }

        return $row->content === '' ? null : ChatMessage::assistant($row->content);
    }

    /**
     * Attachments are named in the text and their extracted text follows: the
     * model cannot open a FAL uid, so "summarise the attached PDF" needs both.
     */
    private static function userContent(Message $row): string
    {
        $parts = [$row->content];
        foreach ($row->attachments as $attachment) {
            $name = Row::string($attachment, 'fileName');
            if ($name === '') {
                continue;
            }
            $text = trim(Row::string($attachment, Message::ATTACHMENT_TEXT_KEY));
            $parts[] = $text === ''
                ? sprintf('[Attached: %s]', $name)
                : sprintf("[Attached: %s]\n%s\n[End of %s]", $name, $text, $name);
        }

        return trim(implode("\n\n", $parts));
    }
}
