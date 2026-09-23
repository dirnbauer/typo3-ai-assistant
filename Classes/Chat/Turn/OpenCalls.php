<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

/**
 * The tool calls an assistant turn asked for and no tool turn has answered yet.
 *
 * A tool step names its tool but not the call it answers. Within a round the
 * agent loop executes the requested calls in the order they were asked for, so
 * a queue per tool name reunites them — and both consumers of a run's steps
 * (the live recorder and the transcript writer) need exactly that queue. They
 * each hold their own, because each walks the steps once and consumes as it
 * goes.
 */
final class OpenCalls
{
    /** @var list<array{id: string, name: string}> oldest first */
    private array $calls = [];

    /**
     * The calls a stored approval or input card names — the calls requested in
     * an EARLIER segment of the same run. Without them a resumed run's tool
     * steps would arrive with no call id and be dropped.
     *
     * @param array<string, mixed> $card
     */
    public function pushCard(array $card): void
    {
        foreach (is_array($card['calls'] ?? null) ? $card['calls'] : [] as $call) {
            if (!is_array($call)) {
                continue;
            }
            $this->push(
                is_string($call['callId'] ?? null) ? $call['callId'] : '',
                is_string($call['name'] ?? null) ? $call['name'] : '',
            );
        }
    }

    /** An unnamed or uncorrelatable call is not remembered: nothing could answer it. */
    public function push(string $id, string $name): void
    {
        if ($id !== '' && $name !== '') {
            $this->calls[] = ['id' => $id, 'name' => $name];
        }
    }

    /**
     * The id of the oldest unanswered call for this tool, consuming it.
     *
     * @return string empty when this tool has no open call
     */
    public function take(string $toolName): string
    {
        $remaining = [];
        $taken = '';
        foreach ($this->calls as $call) {
            if ($taken === '' && $call['name'] === $toolName) {
                $taken = $call['id'];

                continue;
            }
            $remaining[] = $call;
        }
        $this->calls = $remaining;

        return $taken;
    }
}
