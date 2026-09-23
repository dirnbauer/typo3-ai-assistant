<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Turn;

use Netresearch\NrLlm\Domain\Enum\WriteKind;
use Netresearch\NrLlm\Domain\ValueObject\RecordReference;
use Netresearch\NrLlm\Event\AfterAiRecordWrittenEvent;
use TYPO3\CMS\Core\Attribute\AsEventListener;

/**
 * Remembers, for the duration of one request, which records a run wrote and
 * whether each was created or updated.
 *
 * A {@see \Netresearch\NrLlm\Domain\ValueObject\RunStep} carries the record a
 * tool wrote but not the kind of write; nr-llm reports the kind through
 * {@see AfterAiRecordWrittenEvent} instead. A turn runs synchronously inside
 * the request that asked for it, so the events of a run and the steps of the
 * same run always meet in one process — this ledger is where.
 */
final class WriteLedger
{
    /** @var array<string, WriteKind> keyed by `table:uid` */
    private array $kinds = [];

    #[AsEventListener]
    public function record(AfterAiRecordWrittenEvent $event): void
    {
        $this->kinds[(string)$event->record] = $event->kind;
    }

    public function kindOf(RecordReference $record): WriteKind
    {
        return $this->kinds[(string)$record] ?? WriteKind::UPDATED;
    }

    /**
     * The client-facing shape of one write target.
     *
     * @return array{table: string, uid: int, kind: string}
     */
    public function describe(RecordReference $record): array
    {
        return ['table' => $record->table, 'uid' => $record->uid, 'kind' => $this->kindOf($record)->value];
    }
}
