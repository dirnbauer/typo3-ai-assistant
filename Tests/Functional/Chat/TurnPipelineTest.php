<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Chat;

use PHPUnit\Framework\Attributes\Test;
use Webconsulting\WebconAiAssistant\Chat\Domain\Conversation;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;
use Webconsulting\WebconAiAssistant\Chat\Domain\Message;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRole;
use Webconsulting\WebconAiAssistant\Chat\Turn\ChatContext;
use Webconsulting\WebconAiAssistant\Chat\Turn\Outcome;
use Webconsulting\WebconAiAssistant\Chat\Turn\TurnResult;
use Webconsulting\WebconAiAssistant\Chat\Turn\TurnRunner;
use Webconsulting\WebconAiAssistant\Testing\ScriptedProvider;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;

/**
 * One turn, end to end, against an LLM that says what the test told it to.
 *
 * Everything below the provider is real: nr-llm's agent runtime, the
 * suspension for a clarifying question, the transcript rows, the conversation
 * lock. What is asserted is the contract the client depends on — the event
 * stream, the persisted transcript, and the state the conversation lands in.
 */
final class TurnPipelineTest extends AbstractChatTestCase
{
    private TurnRunner $turns;

    private ConversationRepository $conversations;

    private MessageRepository $messages;

    protected function setUp(): void
    {
        parent::setUp();
        $this->importCSVDataSet(__DIR__ . '/../Fixtures/llm_configuration.csv');
        ScriptedProvider::reset();

        $this->turns = $this->get(TurnRunner::class);
        $this->conversations = $this->get(ConversationRepository::class);
        $this->messages = $this->get(MessageRepository::class);
    }

    protected function tearDown(): void
    {
        ScriptedProvider::reset();
        parent::tearDown();
    }

    #[Test]
    public function aPlainAnswerIsStreamedPersistedAndLeavesTheConversationIdle(): void
    {
        ScriptedProvider::script([['content' => 'The start page is page 1.']]);
        $conversation = $this->conversations->create(self::BE_USER_UID, '', '', '', 0);

        $events = [];
        $result = $this->turns->start(
            $conversation,
            'Which page is the start page?',
            [],
            new ChatContext(appName: 'web_layout', pageId: 1),
            static function (string $name, array $payload) use (&$events): void {
                $events[] = [$name, $payload];
            },
        );

        self::assertSame(Outcome::Completed, $result->outcome->outcome);
        self::assertSame(ConversationStatus::Idle, $result->outcome->status);
        self::assertSame(
            ['run.started', 'step.llm', 'message.final', 'run.finished'],
            array_column($events, 0),
        );

        $transcript = $this->messages->findByConversation($conversation->uid);
        self::assertSame([MessageRole::User, MessageRole::Assistant], array_map(
            static fn(Message $message): MessageRole => $message->role,
            $transcript,
        ));
        self::assertSame('The start page is page 1.', $transcript[1]->content);

        $settled = $this->conversations->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $settled);
        self::assertSame(ConversationStatus::Idle, $settled->status);
        self::assertSame('', $settled->runUuid, 'A finished turn releases the conversation.');
        self::assertSame(2, $settled->messageCount);
        self::assertSame(
            'Which page is the start page?',
            $settled->title,
            'The first thing the user says titles the conversation.',
        );
    }

    #[Test]
    public function theUsageOfATurnIsReportedAndStoredOnTheAssistantRow(): void
    {
        ScriptedProvider::script([['content' => 'Done.']]);
        $conversation = $this->conversations->create(self::BE_USER_UID, '', '', '', 0);

        $result = $this->startTurn($conversation, 'Anything.');

        self::assertGreaterThan(0, $result->usage['promptTokens']);
        self::assertGreaterThan(0, $result->usage['totalTokens']);

        $assistant = $this->messages->findByConversation($conversation->uid)[1];
        self::assertSame(MessageRole::Assistant, $assistant->role);
        self::assertGreaterThan(0, $assistant->promptTokens);
    }

    #[Test]
    public function aClarifyingQuestionSuspendsTheRunAndTheAnswerResumesIt(): void
    {
        ScriptedProvider::script([
            ['toolCalls' => [['id' => 'call-1', 'name' => 'ask_user', 'arguments' => [
                'question' => 'Which team page do you mean?',
                'options' => ['/about/team', '/team'],
            ]]]],
            ['content' => 'Renamed /about/team.'],
        ]);
        $conversation = $this->conversations->create(self::BE_USER_UID, 'Rename', '', '', 0);

        $asking = $this->startTurn($conversation, 'Rename the team page.');

        self::assertSame(Outcome::AwaitingInput, $asking->outcome->outcome);
        self::assertSame(ConversationStatus::AwaitingInput, $asking->outcome->status);
        self::assertSame('Which team page do you mean?', $asking->pendingInput['question'] ?? null);
        self::assertSame(['/about/team', '/team'], $asking->pendingInput['options'] ?? null);

        $waiting = $this->conversations->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $waiting);
        self::assertSame(ConversationStatus::AwaitingInput, $waiting->status);
        self::assertNotSame('', $waiting->runUuid, 'A suspended run keeps the conversation bound to it.');

        $digest = $waiting->pendingInput['turnDigest'];
        self::assertIsString($digest);

        $answered = $this->turns->answer($waiting, '/about/team', $digest, static function (): void {});

        self::assertSame(Outcome::Completed, $answered->outcome->outcome);

        $roles = array_map(
            static fn(Message $message): string => $message->role->value,
            $this->messages->findByConversation($conversation->uid),
        );
        self::assertSame(['user', 'assistant', 'tool', 'assistant'], $roles, 'A tool turn must follow the assistant turn that asked for it.');

        $done = $this->conversations->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $done);
        self::assertSame(ConversationStatus::Idle, $done->status);
        self::assertSame([], $done->pendingInput, 'An answered question does not linger.');
    }

    #[Test]
    public function aSecondTurnCannotStartWhileOneIsStillWaiting(): void
    {
        ScriptedProvider::script([
            ['toolCalls' => [['id' => 'call-1', 'name' => 'ask_user', 'arguments' => ['question' => 'Which one?']]]],
        ]);
        $conversation = $this->conversations->create(self::BE_USER_UID, 'Busy', '', '', 0);
        $this->startTurn($conversation, 'Do the thing.');

        $waiting = $this->conversations->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $waiting);

        $this->expectExceptionMessage('This conversation is busy.');
        $this->startTurn($waiting, 'Actually, do something else.');
    }

    #[Test]
    public function anAnswerToAQuestionNobodyAskedIsRefusedWithoutSpendingATurn(): void
    {
        $conversation = $this->conversations->create(self::BE_USER_UID, 'Idle', '', '', 0);

        $this->expectExceptionMessage('This conversation is not waiting for an answer.');
        $this->turns->answer($conversation, 'Yes', 'some-digest', static function (): void {});
    }

    #[Test]
    public function cancellingReleasesTheConversationEvenWhenNothingIsRunning(): void
    {
        $conversation = $this->conversations->create(self::BE_USER_UID, 'Stuck', '', '', 0);
        $this->conversations->claimForTurn($conversation->uid, self::BE_USER_UID, [ConversationStatus::Idle], 'run-lost');

        $claimed = $this->conversations->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $claimed);
        $this->turns->cancel($claimed);

        $released = $this->conversations->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $released);
        self::assertSame(ConversationStatus::Idle, $released->status);
    }

    private function startTurn(Conversation $conversation, string $text): TurnResult
    {
        return $this->turns->start($conversation, $text, [], new ChatContext(), static function (): void {});
    }
}
