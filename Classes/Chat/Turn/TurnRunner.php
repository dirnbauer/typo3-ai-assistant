<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Turn;

use Closure;
use Netresearch\NrLlm\Domain\Enum\AgentRunOutcome;
use Netresearch\NrLlm\Domain\ValueObject\RunStep;
use Netresearch\NrLlm\Service\Agent\AgentRunRequest;
use Netresearch\NrLlm\Service\Agent\AgentRunResult;
use Netresearch\NrLlm\Service\Agent\AgentRuntimeInterface;
use Netresearch\NrLlm\Service\Agent\ApprovalDecision;
use Netresearch\NrLlm\Service\Agent\Exception\AgentRuntimeException;
use Netresearch\NrLlm\Service\Agent\InputSubmission;
use Netresearch\NrLlm\Service\Option\ToolOptions;
use Throwable;
use Webconsulting\ShadcnUi\Chat\ChatException;
use Webconsulting\ShadcnUi\Chat\Domain\Conversation;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationStatus;
use Webconsulting\ShadcnUi\Chat\Domain\InstructionRepository;
use Webconsulting\ShadcnUi\Chat\Domain\MessageRepository;
use Webconsulting\ShadcnUi\Chat\Domain\MessageRole;
use Webconsulting\ShadcnUi\Chat\ErrorMessageSanitizer;
use Webconsulting\ShadcnUi\Chat\Security\BackendUserContext;
use Webconsulting\ShadcnUi\Chat\Security\ToolAccess;
use Webconsulting\ShadcnUi\Chat\Tool\ToolEffectLookup;
use Webconsulting\ShadcnUi\Configuration\ExtensionSettings;

/**
 * The one pipeline every turn goes through.
 *
 * A turn has three entry points — a new message, a decision on a write, an
 * answer to a question — and one body: claim the conversation, drive the
 * runtime, turn the recorded steps into rows and events, settle the
 * conversation into the state the outcome demands. The entry points differ only
 * in what they check first and which runtime call they make.
 *
 * SYNCHRONOUS, always. The MCP tools read the ambient backend user and the
 * projection refuses to run when that user is not the run's actor; a queue
 * worker has no ambient user, so a queued turn would fail closed on every call.
 */
final readonly class TurnRunner
{
    private const MAX_ITERATIONS = 8;

    /** Auto-approval is a convenience, not a loop: a turn may skip this many pauses, then it asks. */
    private const MAX_AUTO_APPROVALS = 5;

    public function __construct(
        private AgentRuntimeInterface $runtime,
        private ChatConfigurationResolver $configuration,
        private ToolAccess $toolAccess,
        private InstructionRepository $instructions,
        private PromptBuilder $prompt,
        private ToolEffectLookup $effectLookup,
        private WriteLedger $writeLedger,
        private TranscriptWriter $writer,
        private Suspension $suspension,
        private RunOutcomeMapper $outcomes,
        private ConversationRepository $conversations,
        private MessageRepository $messages,
        private BackendUserContext $backendUser,
        private ExtensionSettings $settings,
    ) {}

    /**
     * Append the user's message and run one turn.
     *
     * @param list<array<string, mixed>>                   $attachments
     * @param Closure(string, array<string, mixed>): void $emit
     *
     * @throws ChatException when the chat is not configured or the conversation is busy
     */
    public function start(Conversation $conversation, string $text, array $attachments, ChatContext $context, Closure $emit): TurnResult
    {
        $actor = $this->backendUser->actor();
        $configuration = $this->configuration->resolve($actor);

        // The claim IS the per-conversation lock, taken before anything is
        // spent. The runtime's own uuid replaces the token once the run exists.
        $runToken = 'pending-' . bin2hex(random_bytes(16));
        $this->claim($conversation, [ConversationStatus::Idle, ConversationStatus::Failed], $runToken, 'This conversation is busy. Wait for the current turn to finish.');

        if ($context->appName !== '' || $context->pageId > 0) {
            $this->conversations->patch($conversation->uid, $conversation->beUser, ['app_name' => $context->appName, 'page_id' => $context->pageId]);
        }

        $userMessage = $this->writer->appendUserMessage($conversation, $text, $attachments, $runToken);
        $emit('run.started', ['runUuid' => $runToken, 'userMessageUid' => $userMessage->uid]);

        $request = new AgentRunRequest(
            configuration: $configuration,
            messages: $this->prompt->build(
                $this->messages->findTail($conversation->uid, PromptBuilder::WINDOW),
                $this->instructions->findActiveFor($this->backendUser->groupIds()),
                $conversation->systemPrompt,
                $context->toSystemPrompt(),
            ),
            actor: $actor,
            allowedToolNames: $this->toolAccess->allowedToolNames(),
            options: (new ToolOptions(beUserUid: $this->backendUser->uid()))->withCallerSource('shadcn_ui', 'turn'),
            maxIterations: self::MAX_ITERATIONS,
        );

        return $this->drive(
            $conversation,
            $runToken,
            fn(Closure $onStep): AgentRunResult => $this->runtime->run($request, $onStep),
            $emit,
        );
    }

    /**
     * Decide the pause a write tool caused.
     *
     * @param Closure(string, array<string, mixed>): void $emit
     */
    public function approve(Conversation $conversation, bool $approved, string $turnDigest, Closure $emit): TurnResult
    {
        $runUuid = $this->suspendedRun($conversation, ConversationStatus::AwaitingApproval, $turnDigest, 'an approval');
        $this->claim($conversation, [ConversationStatus::AwaitingApproval], $runUuid, 'This approval has already been decided.');
        $emit('run.started', ['runUuid' => $runUuid, 'userMessageUid' => 0]);

        $decision = new ApprovalDecision($approved, $this->backendUser->uid(), $turnDigest);

        return $this->drive(
            $conversation,
            $runUuid,
            fn(Closure $onStep): AgentRunResult => $this->runtime->approve($this->backendUser->actor(), $runUuid, $decision, $onStep),
            $emit,
            TranscriptWriter::resumedCalls($conversation->pendingApproval),
            fn() => $this->conversations->settle($conversation->uid, $conversation->beUser, ConversationStatus::AwaitingApproval, $runUuid, pendingApproval: $conversation->pendingApproval),
        );
    }

    /**
     * Answer the question the model asked.
     *
     * @param Closure(string, array<string, mixed>): void $emit
     */
    public function answer(Conversation $conversation, string $answer, string $turnDigest, Closure $emit): TurnResult
    {
        $runUuid = $this->suspendedRun($conversation, ConversationStatus::AwaitingInput, $turnDigest, 'an answer');
        $this->claim($conversation, [ConversationStatus::AwaitingInput], $runUuid, 'This question has already been answered.');
        $emit('run.started', ['runUuid' => $runUuid, 'userMessageUid' => 0]);

        $submission = new InputSubmission(['answer' => $answer], $this->backendUser->uid(), $turnDigest);

        return $this->drive(
            $conversation,
            $runUuid,
            fn(Closure $onStep): AgentRunResult => $this->runtime->submitInput($this->backendUser->actor(), $runUuid, $submission, $onStep),
            $emit,
            TranscriptWriter::resumedCalls($conversation->pendingInput),
            fn() => $this->conversations->settle($conversation->uid, $conversation->beUser, ConversationStatus::AwaitingInput, $runUuid, pendingInput: $conversation->pendingInput),
        );
    }

    /**
     * Stop a run that is still in flight. Cooperative in nr-llm — the loop
     * notices at its next step boundary — so this returns whether the cancel
     * won the transition, not whether anything has stopped yet.
     */
    public function cancel(Conversation $conversation): bool
    {
        $cancelled = false;
        if ($conversation->runUuid !== '') {
            try {
                $cancelled = $this->runtime->cancel($this->backendUser->actor(), $conversation->runUuid);
            } catch (Throwable) {
                $cancelled = false;
            }
        }

        $this->conversations->settle($conversation->uid, $conversation->beUser, ConversationStatus::Idle);

        return $cancelled;
    }

    /**
     * The body every entry point shares.
     *
     * @param Closure(Closure(RunStep): void): AgentRunResult $driver       the runtime call
     * @param Closure(string, array<string, mixed>): void    $emit
     * @param list<array{id: string, name: string}>          $resumedCalls
     * @param (Closure(): void)|null                          $restore      puts the conversation back into
     *                                                                       its pause when the runtime refuses
     *                                                                       the decision before executing anything
     */
    private function drive(
        Conversation $conversation,
        string $runUuid,
        Closure $driver,
        Closure $emit,
        array $resumedCalls = [],
        ?Closure $restore = null,
    ): TurnResult {
        $recorder = new StepRecorder($this->effectLookup, $this->writeLedger);
        $recorder->seedOpenCalls($resumedCalls);
        $onStep = static function (RunStep $step) use ($recorder, $emit): void {
            $recorder->record($step);
            foreach ($recorder->drainEvents() as [$name, $payload]) {
                $emit($name, $payload);
            }
        };

        try {
            $result = $driver($onStep);
            $result = $this->autoApprove($conversation, $result, $recorder, $onStep);
        } catch (AgentRuntimeException $exception) {
            if ($restore !== null) {
                // Refused BEFORE executing anything: a stale digest, a run that
                // moved on. The pending decision is still pending.
                $restore();

                throw new ChatException(ErrorMessageSanitizer::sanitize($exception->getMessage()), 1795000205, $exception);
            }

            return $this->failHard($conversation, $runUuid, $exception, $emit);
        } catch (Throwable $exception) {
            // The runtime does not throw for a run OUTCOME, so this is
            // infrastructure. The conversation must not stay claimed for it.
            return $this->failHard($conversation, $runUuid, $exception, $emit);
        }

        // A run driven without a live emitter still has steps to replay.
        $recorder->recordAll($result->steps);

        return $this->settle($conversation, $runUuid, $result, $recorder, $emit, $resumedCalls);
    }

    /**
     * Skip the approval pause when the conversation asked to AND the
     * installation allows it. Still an approval in nr-llm's eyes — recorded
     * against this user — just one they gave in advance.
     *
     * @param Closure(RunStep): void $onStep
     */
    private function autoApprove(Conversation $conversation, AgentRunResult $result, StepRecorder $recorder, Closure $onStep): AgentRunResult
    {
        if (!$conversation->autoApproveTools || !$this->settings->allowWrites()) {
            return $result;
        }

        for ($i = 0; $i < self::MAX_AUTO_APPROVALS; ++$i) {
            if ($result->outcome !== AgentRunOutcome::AWAITING_APPROVAL || $result->suspendedState === null || $result->runUuid === '') {
                return $result;
            }

            $card = $this->suspension->approval($result->runUuid, $result->suspendedState);
            $recorder->recordAll($result->steps);
            $recorder->seedOpenCalls(TranscriptWriter::resumedCalls($card));

            $result = $this->runtime->approve(
                $this->backendUser->actor(),
                $result->runUuid,
                new ApprovalDecision(true, $this->backendUser->uid(), $card['turnDigest']),
                $onStep,
            );
        }

        return $result;
    }

    /**
     * @param Closure(string, array<string, mixed>): void $emit
     * @param list<array{id: string, name: string}>       $resumedCalls
     */
    private function settle(Conversation $conversation, string $claimedRunUuid, AgentRunResult $result, StepRecorder $recorder, Closure $emit, array $resumedCalls): TurnResult
    {
        $runUuid = $result->runUuid !== '' ? $result->runUuid : $claimedRunUuid;
        $outcome = $this->outcomes->map($result);

        $persisted = $this->writer->persistSteps($conversation, $recorder->steps(), $runUuid, $resumedCalls);
        foreach ($persisted as $message) {
            if ($message->role === MessageRole::Assistant && $message->toolCalls === []) {
                $emit('message.final', ['messageUid' => $message->uid, 'content' => $message->content]);
            }
        }

        $pendingApproval = [];
        $pendingInput = [];
        if ($result->suspendedState !== null && $outcome->status === ConversationStatus::AwaitingApproval) {
            $pendingApproval = $this->suspension->approval($runUuid, $result->suspendedState);
            $emit('approval.required', $pendingApproval);
        }
        if ($result->suspendedState !== null && $outcome->status === ConversationStatus::AwaitingInput) {
            $pendingInput = $this->suspension->input($runUuid, $result->suspendedState);
            $emit('input.required', $pendingInput);
        }

        if ($outcome->settles) {
            $this->conversations->settle(
                $conversation->uid,
                $conversation->beUser,
                $outcome->status,
                $outcome->finished ? '' : $runUuid,
                $outcome->isFailure() ? $outcome->message : '',
                $pendingApproval,
                $pendingInput,
            );
        }

        $usage = TranscriptWriter::usage($result);
        $emit('run.finished', ['outcome' => $outcome->outcome, 'usage' => $usage]);

        return new TurnResult($runUuid, $outcome, $persisted, $pendingApproval, $pendingInput, $usage);
    }

    /**
     * @param Closure(string, array<string, mixed>): void $emit
     */
    private function failHard(Conversation $conversation, string $runUuid, Throwable $exception, Closure $emit): TurnResult
    {
        $message = ErrorMessageSanitizer::sanitize($exception->getMessage());
        $this->conversations->settle($conversation->uid, $conversation->beUser, ConversationStatus::Failed, '', $message);
        $emit('run.error', ['message' => $message]);

        return new TurnResult(
            $runUuid,
            new TurnOutcome(ConversationStatus::Failed, true, 'failed', $message),
            [],
            [],
            [],
            ['promptTokens' => 0, 'completionTokens' => 0, 'totalTokens' => 0],
        );
    }

    /**
     * @param list<ConversationStatus> $from
     */
    private function claim(Conversation $conversation, array $from, string $runUuid, string $refusal): void
    {
        if (!$this->conversations->claimForTurn($conversation->uid, $conversation->beUser, $from, $runUuid)) {
            throw new ChatException($refusal, 1795000201);
        }
    }

    /**
     * The run a suspended conversation is waiting on, after the checks both
     * decisions share.
     */
    private function suspendedRun(Conversation $conversation, ConversationStatus $expected, string $turnDigest, string $what): string
    {
        if ($conversation->status !== $expected) {
            throw new ChatException(sprintf('This conversation is not waiting for %s.', $what), 1795000202);
        }
        if ($conversation->runUuid === '') {
            throw new ChatException('This conversation has no run to continue.', 1795000203);
        }
        if (trim($turnDigest) === '') {
            throw new ChatException(sprintf('%s must name the turn it belongs to. Reload the conversation and try again.', ucfirst($what)), 1795000204);
        }

        return $conversation->runUuid;
    }
}
