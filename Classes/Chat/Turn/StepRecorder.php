<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Turn;

use Netresearch\NrLlm\Domain\ValueObject\RecordReference;
use Netresearch\NrLlm\Domain\ValueObject\RunStep;
use Webconsulting\ShadcnUi\Chat\Tool\ToolEffectLookup;

/**
 * Collects the steps of one run and turns them into client events.
 *
 * Two jobs that belong together. DEDUPLICATION: steps arrive twice — live
 * through the runtime's `$onStep` callback and again in the settled result —
 * and identity is the object, so the second sighting is free to recognise.
 * CALL CORRELATION: a tool step names its tool but not the call it answers;
 * within a round the loop executes calls in the order they were asked for, so
 * a queue per name reunites them.
 */
final class StepRecorder
{
    /** @var list<RunStep> */
    private array $steps = [];

    /** @var array<int, true> */
    private array $seen = [];

    /** @var list<array{0: string, 1: array<string, mixed>}> */
    private array $pendingEvents = [];

    private OpenCalls $openCalls;

    public function __construct(
        private readonly ToolEffectLookup $effectLookup,
        private readonly WriteLedger $writeLedger,
    ) {
        $this->openCalls = new OpenCalls();
    }

    /**
     * Adopt the calls a stored approval or input card names — a run resumed
     * after an approval or an answer starts a fresh step list, and without the
     * seed every resumed result would arrive with no call id.
     *
     * @param array<string, mixed> $card
     */
    public function seedOpenCalls(array $card): void
    {
        $this->openCalls->pushCard($card);
    }

    public function record(RunStep $step): void
    {
        $id = spl_object_id($step);
        if (isset($this->seen[$id])) {
            return;
        }
        $this->seen[$id] = true;
        $this->steps[] = $step;

        match ($step->kind) {
            RunStep::KIND_LLM => $this->emitLlm($step),
            RunStep::KIND_TOOL => $this->emitTool($step),
            default => null,
        };
    }

    /**
     * @param list<RunStep> $steps
     */
    public function recordAll(array $steps): void
    {
        foreach ($steps as $step) {
            $this->record($step);
        }
    }

    /**
     * @return list<RunStep>
     */
    public function steps(): array
    {
        return $this->steps;
    }

    /**
     * The events recorded since the last drain, in order.
     *
     * @return list<array{0: string, 1: array<string, mixed>}>
     */
    public function drainEvents(): array
    {
        $events = $this->pendingEvents;
        $this->pendingEvents = [];

        return $events;
    }

    /**
     * The requested calls of an LLM step, as `{id, name, arguments}`.
     *
     * @return list<array{id: string, name: string, arguments: array<string, mixed>}>
     */
    public static function requestedCalls(RunStep $step): array
    {
        $calls = [];
        foreach ($step->requestedToolCalls ?? [] as $call) {
            if (!is_array($call)) {
                continue;
            }
            $name = is_string($call['name'] ?? null) ? $call['name'] : '';
            if ($name === '') {
                continue;
            }
            $arguments = [];
            foreach (is_array($call['arguments'] ?? null) ? $call['arguments'] : [] as $key => $value) {
                if (is_string($key)) {
                    $arguments[$key] = $value;
                }
            }
            $calls[] = [
                'id' => is_string($call['id'] ?? null) ? $call['id'] : '',
                'name' => $name,
                'arguments' => $arguments,
            ];
        }

        return $calls;
    }

    private function emitLlm(RunStep $step): void
    {
        $payload = [
            'round' => $step->round,
            'tokens' => [
                'prompt' => $step->promptTokens ?? 0,
                'completion' => $step->completionTokens ?? 0,
                'total' => $step->totalTokens ?? 0,
            ],
        ];
        if (is_string($step->content) && $step->content !== '') {
            $payload['content'] = $step->content;
        }
        if (is_string($step->thinking) && $step->thinking !== '') {
            $payload['thinking'] = $step->thinking;
        }
        $this->pendingEvents[] = ['step.llm', $payload];

        foreach (self::requestedCalls($step) as $call) {
            $this->openCalls->push($call['id'], $call['name']);
            $this->pendingEvents[] = ['step.tool.call', [
                'round' => $step->round,
                'callId' => $call['id'],
                'name' => $call['name'],
                'arguments' => $call['arguments'],
                'effect' => $this->effectLookup->effectOf($call['name'])->value,
            ]];
        }
    }

    private function emitTool(RunStep $step): void
    {
        $name = $step->toolName ?? '';
        $payload = [
            'callId' => $this->openCalls->take($name),
            'name' => $name,
            'isError' => $step->toolIsError ?? false,
            'preview' => self::preview($step->toolResult ?? ''),
            'durationMs' => round($step->durationMs, 2),
        ];
        if ($step->writeTarget instanceof RecordReference) {
            $payload['writeTarget'] = $this->writeLedger->describe($step->writeTarget);
        }

        $this->pendingEvents[] = ['step.tool.result', $payload];
    }

    /**
     * The stream carries a preview, not the payload: the full text is already
     * in the model's context and in nr-llm's persisted run.
     */
    private static function preview(string $result): string
    {
        $normalised = trim(preg_replace('/\s+/u', ' ', $result) ?? $result);

        return mb_strlen($normalised) > 280 ? mb_substr($normalised, 0, 279) . "\u{2026}" : $normalised;
    }
}
