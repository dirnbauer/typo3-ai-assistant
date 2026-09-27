<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Chat\Turn;

use Hn\McpServer\Service\ToolResultNormalizer;
use Mcp\Types\CallToolResult;
use Mcp\Types\TextContent;
use Netresearch\NrLlm\Domain\Enum\ToolEffect;
use Netresearch\NrLlm\Domain\Model\CompletionResponse;
use Netresearch\NrLlm\Domain\Model\UsageStatistics;
use Netresearch\NrLlm\Service\Tool\RunTrace;
use PHPUnit\Framework\Attributes\Test;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\Message;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRepository;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolEffectLookup;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolResultConverter;
use Webconsulting\WebconAiAssistant\Chat\Turn\TranscriptWriter;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;

/**
 * The rows a reopened conversation is rebuilt from, written from the steps
 * nr-llm records for an approved write — against this installation's own tool
 * catalogue, so "is this tool a write?" gets the answer the chat gets.
 */
final class TranscriptWriterTest extends AbstractChatTestCase
{
    #[Test]
    public function anApprovedWriteIsStoredWithTheRecordItChanged(): void
    {
        self::assertTrue($this->get(ToolEffectLookup::class)->effectOf('typo3_WriteTable')->isWrite(), 'The catalogue offers WriteTable as a write.');
        $conversation = $this->get(ConversationRepository::class)->create(self::BE_USER_UID, 'Rename', '', '', 0);

        // The resumed segment: the approved call, the record nr-llm names on a
        // step of its own, and the model's closing words.
        $trace = new RunTrace();
        $trace->recordToolResult(2, 12.5, 'typo3_WriteTable', ['action' => 'update', 'table' => 'pages', 'uid' => 1070], $this->get(ToolResultConverter::class)->convert(
            new ToolResultNormalizer()->normalize(new CallToolResult([new TextContent('{"action":"update","table":"pages","uid":1070}')])),
            'typo3_WriteTable',
            ToolEffect::NON_IDEMPOTENT_WRITE,
        ));
        $trace->recordLlmCall(3, 20.0, new CompletionResponse('Page 1070 is renamed.', 'scripted-1', new UsageStatistics(11, 7, 18)));

        $this->get(TranscriptWriter::class)->persistSteps(
            $conversation,
            $trace->getSteps(),
            'run-1',
            ['calls' => [['callId' => 'call-1', 'name' => 'typo3_WriteTable']]],
        );

        $reopened = array_map(
            static fn(Message $message): array => $message->toArray(),
            $this->get(MessageRepository::class)->findByConversation($conversation->uid),
        );
        self::assertSame(['tool', 'assistant'], array_column($reopened, 'role'), 'The tool_write step is no row of its own.');
        self::assertSame('call-1', $reopened[0]['toolCallId'] ?? null);
        self::assertSame([['table' => 'pages', 'uid' => 1070, 'kind' => 'updated']], $reopened[0]['writeTargets'] ?? null);
        self::assertArrayNotHasKey('writeTargets', $reopened[1]);
    }
}
