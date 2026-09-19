<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Unit\Chat\Turn;

use Netresearch\NrLlm\Domain\ValueObject\ToolCall;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\ShadcnUi\Chat\Domain\Message;
use Webconsulting\ShadcnUi\Chat\Domain\MessageRole;
use Webconsulting\ShadcnUi\Chat\Turn\PromptBuilder;

/**
 * The failure the builder exists to prevent is not a wrong answer but a
 * REJECTED request: a tool turn whose assistant tool-call turn fell out of the
 * window is an answer to a question never asked, and OpenAI refuses the call.
 */
final class PromptBuilderTest extends TestCase
{
    #[Test]
    public function systemLayersGoGeneralBeforeSpecific(): void
    {
        $transcript = (new PromptBuilder())->build(
            [self::user('Hello')],
            [['uid' => 1, 'title' => 'Tone', 'body' => 'Be brief.']],
            'Always answer in German.',
            'The user is currently looking at page 42.',
        );

        self::assertCount(4, $transcript);
        self::assertSame('system', $transcript[0]->role);
        self::assertStringContainsString('## Tone', $transcript[0]->content);
        self::assertStringContainsString('Be brief.', $transcript[0]->content);
        self::assertSame('Always answer in German.', $transcript[1]->content);
        self::assertSame('The user is currently looking at page 42.', $transcript[2]->content);
        self::assertSame('user', $transcript[3]->role);
    }

    #[Test]
    public function emptySystemLayersAreOmitted(): void
    {
        $transcript = (new PromptBuilder())->build([self::user('Hello')], [], '   ', '');

        self::assertCount(1, $transcript);
        self::assertSame('user', $transcript[0]->role);
    }

    #[Test]
    public function aToolRoundTripSurvivesAsAPair(): void
    {
        $transcript = (new PromptBuilder())->build([
            self::user('What is on page 42?'),
            self::assistantCalling('call-1', 'typo3_GetPage', ['uid' => 42]),
            self::toolResult('call-1', '{"title":"Home"}'),
            self::assistant('Page 42 is called Home.'),
        ]);

        self::assertCount(4, $transcript);
        self::assertSame('assistant', $transcript[1]->role);
        self::assertNotNull($transcript[1]->toolCalls);
        self::assertSame('typo3_GetPage', $transcript[1]->toolCalls[0]->name);
        self::assertSame('tool', $transcript[2]->role);
        self::assertSame('call-1', $transcript[2]->toolCallId);
    }

    #[Test]
    public function anOrphanedToolTurnIsDroppedRatherThanSentAlone(): void
    {
        $transcript = (new PromptBuilder())->build([
            self::assistantCalling('call-1', 'typo3_GetPage', ['uid' => 42]),
            self::toolResult('call-1', '{"title":"Home"}'),
            self::user('And page 43?'),
            self::assistant('Let me look.'),
        ], window: 3);

        foreach ($transcript as $message) {
            self::assertNotSame('tool', $message->role);
        }
        self::assertCount(2, $transcript);
    }

    #[Test]
    public function aToolTurnWhoseCallIsStillInTheWindowSurvivesTheCut(): void
    {
        $transcript = (new PromptBuilder())->build([
            self::user('old'),
            self::user('older'),
            self::assistantCalling('call-1', 'typo3_GetPage', ['uid' => 42]),
            self::toolResult('call-1', '{"title":"Home"}'),
        ], window: 2);

        self::assertCount(2, $transcript);
        self::assertSame('assistant', $transcript[0]->role);
        self::assertSame('tool', $transcript[1]->role);
    }

    #[Test]
    public function attachmentsAreNamedAndTheirTextFollows(): void
    {
        $message = new Message(0, 1, 0, MessageRole::User, 'Summarise this.', attachments: [
            ['fileUid' => 9, 'fileName' => 'report.pdf', 'text' => 'Quarterly numbers went up.'],
            ['fileUid' => 10, 'fileName' => 'notes.txt'],
        ]);

        $transcript = (new PromptBuilder())->build([$message]);

        self::assertStringContainsString('Summarise this.', $transcript[0]->content);
        self::assertStringContainsString("[Attached: report.pdf]\nQuarterly numbers went up.", $transcript[0]->content);
        self::assertStringContainsString('[Attached: notes.txt]', $transcript[0]->content);
    }

    #[Test]
    public function anEmptyAssistantTurnWithoutToolCallsIsNotReplayed(): void
    {
        self::assertCount(1, (new PromptBuilder())->build([self::user('Hello'), self::assistant('')]));
    }

    #[Test]
    public function theWindowKeepsTheTail(): void
    {
        $rows = [];
        for ($i = 1; $i <= 10; ++$i) {
            $rows[] = self::user('message ' . $i);
        }

        $transcript = (new PromptBuilder())->build($rows, window: 3);

        self::assertCount(3, $transcript);
        self::assertSame('message 8', $transcript[0]->content);
        self::assertSame('message 10', $transcript[2]->content);
    }

    private static function user(string $content): Message
    {
        return new Message(0, 1, 0, MessageRole::User, $content);
    }

    private static function assistant(string $content): Message
    {
        return new Message(0, 1, 0, MessageRole::Assistant, $content);
    }

    /**
     * @param array<string, mixed> $arguments
     */
    private static function assistantCalling(string $callId, string $name, array $arguments): Message
    {
        return new Message(0, 1, 0, MessageRole::Assistant, '', toolCalls: [ToolCall::function($callId, $name, $arguments)->toArray()]);
    }

    private static function toolResult(string $callId, string $content): Message
    {
        return new Message(0, 1, 0, MessageRole::Tool, $content, toolCallId: $callId);
    }
}
