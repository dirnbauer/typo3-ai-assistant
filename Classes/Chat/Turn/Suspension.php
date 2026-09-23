<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

use Netresearch\NrLlm\Domain\ValueObject\SuspendedRunState;
use Netresearch\NrLlm\Service\Agent\PendingTurnDigest;
use Webconsulting\WebconAiAssistant\Chat\Tool\AskUserTool;

/**
 * The two cards a suspended run turns into.
 *
 * The digest is the load-bearing part of both. nr-llm recomputes it from the
 * freshly claimed state and refuses a mismatch, so a stale tab cannot authorise
 * calls nobody looked at, or feed an answer into a question nobody was shown.
 * Echoing it to the client is what lets the client prove which turn it saw.
 *
 * Both cards also name the calls the run is suspended on. That list is what
 * {@see OpenCalls} correlates the resumed run's tool steps against: without it
 * the tool turn answering the pause has no call id, and a transcript whose
 * assistant tool-call turn is unanswered is one every provider rejects.
 */
final readonly class Suspension
{
    public function __construct(
        private PendingTurnDigest $digest,
    ) {}

    /**
     * The approval card: which calls are pending, and the digest that binds a
     * decision to THIS turn.
     *
     * @return array{runUuid: string, turnDigest: string, calls: list<array{index: int, callId: string, name: string, arguments: array<string, mixed>}>}
     */
    public function approval(string $runUuid, SuspendedRunState $state): array
    {
        return [
            'runUuid' => $runUuid,
            'turnDigest' => $this->digest->forState($state),
            'calls' => self::calls($state),
        ];
    }

    /**
     * The clarifying question: what the model asked, read off the pending call
     * to the ask-user tool.
     *
     * @return array{runUuid: string, turnDigest: string, calls: list<array{index: int, callId: string, name: string, arguments: array<string, mixed>}>, question: string, options: list<string>, allowFreeText: bool}
     */
    public function input(string $runUuid, SuspendedRunState $state): array
    {
        $calls = self::calls($state);
        $arguments = [];
        foreach ($calls as $call) {
            if ($call['name'] === $state->inputToolName) {
                $arguments = $call['arguments'];
                break;
            }
        }

        return [
            'runUuid' => $runUuid,
            'turnDigest' => $this->digest->forInputState($state),
            'calls' => $calls,
            ...AskUserTool::question($arguments),
        ];
    }

    /**
     * @return list<array{index: int, callId: string, name: string, arguments: array<string, mixed>}>
     */
    private static function calls(SuspendedRunState $state): array
    {
        $calls = [];
        foreach ($state->toolCalls() as $index => $call) {
            $calls[] = ['index' => $index, 'callId' => $call->id, 'name' => $call->name, 'arguments' => $call->arguments];
        }

        return $calls;
    }
}
