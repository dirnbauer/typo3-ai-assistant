<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

use Netresearch\NrLlm\Domain\ValueObject\RecordReference;
use Netresearch\NrLlm\Domain\ValueObject\RunStep;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolEffectLookup;
use Webconsulting\WebconAiAssistant\Chat\Tool\ToolResultConverter;

/**
 * The record a tool step wrote, for its result frame and its transcript row.
 *
 * nr-llm does not name the record on the tool step. Its run trace adds a step
 * of its own kind for it (`tool_write`, ADR-182) after the tool step, so it
 * arrives once the result frame has gone out, and not at all when the run is
 * stopped at the tool step. Both the frame and the row are built from the tool
 * step, which does carry the tool's own answer — and a writing tool names its
 * record there. {@see ToolResultConverter} reads it from that answer as it did
 * when the tool returned.
 *
 * Only a successful step of a tool that declares a write effect names a
 * record: a read never claims one, and neither does a failed or refused call.
 */
final readonly class WriteTargetResolver
{
    public function __construct(
        private ToolEffectLookup $effectLookup,
        private ToolResultConverter $converter,
        private WriteLedger $writeLedger,
    ) {}

    /**
     * The record as the client lists it, or null when the step wrote none.
     *
     * @return array{table: string, uid: int, kind: string}|null
     */
    public function describe(RunStep $step): ?array
    {
        $record = $this->recordWrittenBy($step);

        return $record === null ? null : $this->writeLedger->describe($record);
    }

    private function recordWrittenBy(RunStep $step): ?RecordReference
    {
        if ($step->kind !== RunStep::KIND_TOOL || $step->toolIsError === true) {
            return null;
        }
        if (!$this->effectLookup->effectOf($step->toolName ?? '')->isWrite()) {
            return null;
        }

        return $step->writeTarget ?? $this->converter->writeTargetOfText($step->toolResult ?? '');
    }
}
