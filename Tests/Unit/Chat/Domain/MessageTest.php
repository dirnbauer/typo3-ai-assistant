<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Domain;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\WebconAiAssistant\Chat\Domain\Conversation;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;
use Webconsulting\WebconAiAssistant\Chat\Domain\Message;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRole;

/**
 * Rows in, API shapes out — including the two places the shape is deliberately
 * NOT the row: extracted attachment text stays server-side, and JSON columns
 * are accepted decoded or as text.
 */
final class MessageTest extends TestCase
{
    #[Test]
    public function jsonColumnsAreAcceptedDecodedOrAsText(): void
    {
        $decoded = Message::fromRow(['uid' => 1, 'role' => 'tool', 'write_targets' => [['table' => 'pages', 'uid' => '5', 'kind' => 'created']]]);
        $text = Message::fromRow(['uid' => 1, 'role' => 'tool', 'write_targets' => '[{"table":"pages","uid":5}]']);

        self::assertSame([['table' => 'pages', 'uid' => 5, 'kind' => 'created']], $decoded->writeTargets);
        self::assertSame([['table' => 'pages', 'uid' => 5, 'kind' => 'updated']], $text->writeTargets, 'A missing kind defaults to updated.');
    }

    #[Test]
    public function extractedTextNeverReachesTheClient(): void
    {
        $message = new Message(1, 1, 1, MessageRole::User, 'Read this', attachments: [
            ['fileUid' => 9, 'fileName' => 'a.pdf', 'text' => 'secret body'],
        ]);

        $array = $message->toArray();

        self::assertSame([['fileUid' => 9, 'fileName' => 'a.pdf']], $array['attachments']);
        self::assertStringContainsString('secret body', json_encode($message->toRow(), JSON_THROW_ON_ERROR), 'It IS persisted.');
    }

    #[Test]
    public function optionalFieldsAreOmittedWhenEmpty(): void
    {
        $array = new Message(1, 1, 1, MessageRole::Assistant, 'Hi')->toArray();

        self::assertSame(['uid', 'sequence', 'role', 'content', 'createdAt'], array_keys($array));
    }

    #[Test]
    public function aConversationRowHydratesItsPendingStateAndStatus(): void
    {
        $conversation = Conversation::fromRow([
            'uid' => '3',
            'be_user' => '1',
            'status' => 'awaiting_input',
            'pending_input' => '{"question":"Which page?","turnDigest":"abc"}',
            'pending_approval' => '',
            'auto_approve_tools' => '1',
        ]);

        self::assertSame(ConversationStatus::AwaitingInput, $conversation->status);
        self::assertTrue($conversation->status->isSuspended());
        self::assertSame('Which page?', $conversation->pendingInput['question']);
        self::assertSame([], $conversation->pendingApproval);
        self::assertTrue($conversation->autoApproveTools);
        self::assertSame('awaiting_input', $conversation->toArray()['status']);
    }

    #[Test]
    public function anUnknownStatusFallsBackToIdle(): void
    {
        self::assertSame(ConversationStatus::Idle, Conversation::fromRow(['status' => 'weird'])->status);
    }
}
