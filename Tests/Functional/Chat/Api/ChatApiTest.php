<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Chat\Api;

use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Core\Http\ServerRequest;
use Webconsulting\WebconAiAssistant\Chat\Api\ConversationController;
use Webconsulting\WebconAiAssistant\Chat\Api\StatusController;
use Webconsulting\WebconAiAssistant\Chat\Api\TurnController;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;
use Webconsulting\WebconAiAssistant\Chat\Turn\TurnRunner;
use Webconsulting\WebconAiAssistant\Testing\ScriptedProvider;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;

/**
 * The JSON contract the frontend is written against, exercised through the
 * controllers the AJAX routes point at.
 */
final class ChatApiTest extends AbstractChatTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->importCSVDataSet(__DIR__ . '/../../Fixtures/llm_configuration.csv');
        ScriptedProvider::reset();
    }

    protected function tearDown(): void
    {
        ScriptedProvider::reset();
        parent::tearDown();
    }

    #[Test]
    public function statusReportsTheConfigurationTheInstructionsAndTheContext(): void
    {
        $this->importCSVDataSet(__DIR__ . '/../../Fixtures/instructions.csv');

        $status = $this->decode($this->get(StatusController::class)->status($this->request(['appName' => 'my_ext/dashboard'])));

        self::assertTrue($status['available'], 'A resolvable configuration means the chat works.');
        self::assertSame('backend-assistant', $status['configuration']['identifier']);
        self::assertSame('scripted-1', $status['configuration']['model']);
        self::assertSame([], $status['issues']);
        self::assertContains('ask_user', array_column($status['tools'], 'name'));
        self::assertSame(['House style', 'Never delete'], array_column($status['instructions'], 'title'));
        self::assertSame('my_ext/dashboard', $status['context']['appName']);
    }

    /**
     * The status payload is the one place where the PHP and the TypeScript
     * describe the same object, and the frontend reads every key below by name.
     */
    #[Test]
    public function statusCarriesExactlyTheLimitsAndFeatureFlagsTheClientReads(): void
    {
        $status = $this->decode($this->get(StatusController::class)->status($this->request()));

        self::assertSame(
            ['maxMessageLength', 'maxIterations', 'turnsPerHour', 'turnsRemaining', 'activeConversations'],
            array_keys($status['limits']),
        );
        self::assertSame(TurnController::MAX_MESSAGE_LENGTH, $status['limits']['maxMessageLength']);
        self::assertSame(TurnRunner::MAX_ITERATIONS, $status['limits']['maxIterations']);
        self::assertSame(['sse', 'approvals', 'input', 'attachments', 'writes'], array_keys($status['features']));
        self::assertFalse($status['features']['writes'], 'allowWrites defaults to off.');
        self::assertSame(['extensions', 'mimeTypes', 'maxBytes'], array_keys($status['attachments']));
        self::assertSame(20 * 1024 * 1024, $status['attachments']['maxBytes']['pdf'] ?? null, 'The client checks sizes on the same numbers.');
    }

    #[Test]
    public function aRefusalReachesTheUserInTheirLanguage(): void
    {
        $this->moduleRequest('tools_webconaiassistant_chat', [], 'de');
        $uid = $this->conversation();

        $response = $this->get(ConversationController::class)->rename($this->request(['conversation' => $uid, 'title' => ' ']));
        self::assertSame('Ein Titel darf nicht leer sein.', $this->decode($response, 400)['error']);

        $response = $this->get(TurnController::class)->turn($this->request(['conversation' => $uid, 'content' => str_repeat('x', TurnController::MAX_MESSAGE_LENGTH + 1)]));
        self::assertSame('Eine Nachricht darf höchstens 10.000 Zeichen lang sein.', $this->decode($response, 400)['error']);
    }

    #[Test]
    public function statusSaysWhyTheChatIsUnavailableInsteadOfFailing(): void
    {
        $this->getConnectionPool()
            ->getConnectionForTable('tx_nrllm_configuration')
            ->update('tx_nrllm_configuration', ['is_active' => 0], ['uid' => 1]);

        $status = $this->decode($this->get(StatusController::class)->status($this->request()));

        self::assertFalse($status['available']);
        self::assertNotSame([], $status['issues']);
        self::assertStringContainsString('backend-assistant', $status['issues'][0]);
    }

    #[Test]
    public function aConversationIsCreatedListedRenamedPinnedAndSoftDeleted(): void
    {
        $controller = $this->get(ConversationController::class);

        $created = $this->decode($controller->create($this->request(['title' => 'Redirects', 'appName' => 'my_ext/dashboard'])), 201);
        $uid = $created['conversation']['uid'];
        self::assertSame('Redirects', $created['conversation']['title']);
        self::assertSame(ConversationStatus::Idle->value, $created['conversation']['status']);

        self::assertSame(['Redirects'], array_column($this->decode($controller->list($this->request()))['conversations'], 'title'));

        self::assertSame('Renamed', $this->decode($controller->rename($this->request(['conversation' => $uid, 'title' => '  Renamed  '])))['title']);
        self::assertTrue($this->decode($controller->pin($this->request(['conversation' => $uid])))['pinned']);
        self::assertTrue($this->decode($controller->archive($this->request(['conversation' => $uid])))['archived']);

        self::assertSame([], $this->decode($controller->list($this->request()))['conversations']);
        self::assertSame(['Renamed'], array_column($this->decode($controller->list($this->request(['archived' => '1'])))['conversations'], 'title'));

        self::assertTrue($this->decode($controller->delete($this->request(['conversation' => $uid])))['deleted']);
        self::assertSame([], $this->decode($controller->list($this->request(['archived' => '1'])))['conversations']);
    }

    #[Test]
    public function anEmptyTitleIsRefused(): void
    {
        $uid = $this->conversation();

        $response = $this->get(ConversationController::class)->rename($this->request(['conversation' => $uid, 'title' => '   ']));

        self::assertSame(400, $response->getStatusCode());
        self::assertSame('A title cannot be empty.', $this->decode($response, 400)['error']);
    }

    #[Test]
    public function somebodyElsesConversationSimplyDoesNotExist(): void
    {
        $mine = $this->conversation();
        $this->setUpBackendUser(self::EDITOR_UID);

        $response = $this->get(ConversationController::class)->get($this->request(['conversation' => $mine]));

        self::assertSame(404, $response->getStatusCode());
        self::assertSame('Conversation not found.', $this->decode($response, 404)['error']);
    }

    #[Test]
    public function anEmptyMessageNeverReachesAProvider(): void
    {
        $uid = $this->conversation();

        $response = $this->get(TurnController::class)->turn($this->request(['conversation' => $uid, 'content' => "  \n "]));

        self::assertSame(400, $response->getStatusCode());
        self::assertSame('A message cannot be empty.', $this->decode($response, 400)['error']);
    }

    #[Test]
    public function aTurnAnswersWithTheMessagesItProducedAndTheStateItLeftBehind(): void
    {
        ScriptedProvider::script([['content' => 'There are three redirects.']]);
        $uid = $this->conversation();

        $payload = $this->decode($this->get(TurnController::class)->turn($this->request([
            'conversation' => $uid,
            'content' => 'How many redirects are there?',
        ])));

        self::assertSame('completed', $payload['outcome']);
        self::assertSame(ConversationStatus::Idle->value, $payload['status']);
        self::assertSame([], $payload['pendingApproval']);
        self::assertSame(
            ['run.started', 'step.llm', 'message.final', 'run.finished'],
            array_column($payload['events'], 'event'),
            'A non-streaming client is handed the same events a streaming one would have seen.',
        );
        // `messages` is what the TURN produced. The user's own message is
        // already on screen when the request is made; its uid arrives with
        // run.started so the client can reconcile its optimistic row.
        self::assertSame(['There are three redirects.'], array_column($payload['messages'], 'content'));
        self::assertGreaterThan(0, $payload['events'][0]['data']['userMessageUid']);
        self::assertGreaterThan(0, $payload['usage']['totalTokens']);
    }

    #[Test]
    public function theTranscriptIsReadBackWithTheConversation(): void
    {
        ScriptedProvider::script([['content' => 'Noted.']]);
        $uid = $this->conversation();
        $this->get(TurnController::class)->turn($this->request(['conversation' => $uid, 'content' => 'Remember this.']));

        $payload = $this->decode($this->get(ConversationController::class)->get($this->request(['conversation' => $uid])));

        self::assertSame(2, $payload['conversation']['messageCount']);
        self::assertSame(['user', 'assistant'], array_column($payload['messages'], 'role'));
        self::assertArrayNotHasKey(
            'attachments',
            $payload['messages'][0],
            'A message with nothing attached says nothing about attachments.',
        );
    }

    #[Test]
    public function cancellingAConversationThatIsNotRunningIsStillAnAnswer(): void
    {
        $payload = $this->decode($this->get(TurnController::class)->cancel($this->request(['conversation' => $this->conversation()])));

        self::assertFalse($payload['cancelled']);
        self::assertSame(ConversationStatus::Idle->value, $payload['status']);
    }

    private function conversation(string $title = 'Test'): int
    {
        return $this->get(ConversationRepository::class)->create(self::BE_USER_UID, $title, '', '', 0)->uid;
    }

    /**
     * @param array<string, mixed> $body
     */
    private function request(array $body = []): ServerRequest
    {
        return (new ServerRequest('https://typo3-testing.local/typo3/ajax/ai-assistant/', 'POST'))
            ->withQueryParams($body)
            ->withParsedBody($body);
    }

    /**
     * @return array<string, mixed>
     */
    private function decode(ResponseInterface $response, int $expectedStatus = 200): array
    {
        self::assertSame($expectedStatus, $response->getStatusCode(), (string)$response->getBody());
        $payload = json_decode((string)$response->getBody(), true);
        self::assertIsArray($payload);

        return $payload;
    }
}
