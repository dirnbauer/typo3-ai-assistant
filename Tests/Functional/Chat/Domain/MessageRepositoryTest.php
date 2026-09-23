<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Chat\Domain;

use PHPUnit\Framework\Attributes\Test;
use Webconsulting\WebconAiAssistant\Chat\Domain\Message;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRole;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;

final class MessageRepositoryTest extends AbstractChatTestCase
{
    private MessageRepository $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->subject = $this->get(MessageRepository::class);
    }

    #[Test]
    public function appendNumbersTheTranscriptPerConversation(): void
    {
        $this->append(1, MessageRole::User, 'First');
        $second = $this->append(1, MessageRole::Assistant, 'Second');
        $other = $this->append(2, MessageRole::User, 'Another conversation');

        self::assertSame(2, $second->sequence);
        self::assertSame(1, $other->sequence, 'Every conversation counts from one.');
        self::assertGreaterThan(0, $second->uid);
        self::assertSame(2, $this->subject->countByConversation(1));
    }

    #[Test]
    public function theJsonColumnsSurviveTheRoundTrip(): void
    {
        $this->subject->append(new Message(
            uid: 0,
            conversation: 1,
            sequence: 0,
            role: MessageRole::Tool,
            content: 'Renamed.',
            toolCallId: 'call-1',
            writeTargets: [['table' => 'pages', 'uid' => 42, 'kind' => 'updated']],
            runUuid: 'run-1',
        ));
        $this->subject->append(new Message(
            uid: 0,
            conversation: 1,
            sequence: 0,
            role: MessageRole::Assistant,
            content: '',
            toolCalls: [['id' => 'call-1', 'type' => 'function', 'function' => ['name' => 'typo3_WriteTable', 'arguments' => '{}']]],
        ));

        [$tool, $assistant] = $this->subject->findByConversation(1);

        self::assertSame([['table' => 'pages', 'uid' => 42, 'kind' => 'updated']], $tool->writeTargets);
        self::assertSame('call-1', $tool->toolCallId);
        self::assertSame('typo3_WriteTable', $assistant->toolCalls[0]['function']['name'] ?? null);
    }

    #[Test]
    public function theTailIsTheLastMessagesInReadingOrder(): void
    {
        foreach (range(1, 5) as $number) {
            $this->append(1, MessageRole::User, 'Message ' . $number);
        }

        $tail = array_map(static fn(Message $message): string => $message->content, $this->subject->findTail(1, 3));

        self::assertSame(['Message 3', 'Message 4', 'Message 5'], $tail);
    }

    #[Test]
    public function findByConversationCanResumeAfterASequence(): void
    {
        $this->append(1, MessageRole::User, 'One');
        $this->append(1, MessageRole::Assistant, 'Two');
        $this->append(1, MessageRole::User, 'Three');

        $later = array_map(static fn(Message $message): string => $message->content, $this->subject->findByConversation(1, 1));

        self::assertSame(['Two', 'Three'], $later);
    }

    #[Test]
    public function deletingByConversationTakesOnlyThoseRows(): void
    {
        $this->append(1, MessageRole::User, 'Doomed');
        $this->append(1, MessageRole::Assistant, 'Doomed too');
        $this->append(2, MessageRole::User, 'Untouched');

        self::assertSame(2, $this->subject->deleteByConversations([1]));
        self::assertSame(0, $this->subject->deleteByConversations([]));
        self::assertSame(0, $this->subject->countByConversation(1));
        self::assertSame(1, $this->subject->countByConversation(2));
    }

    private function append(int $conversation, MessageRole $role, string $content): Message
    {
        return $this->subject->append(new Message(
            uid: 0,
            conversation: $conversation,
            sequence: 0,
            role: $role,
            content: $content,
        ));
    }
}
