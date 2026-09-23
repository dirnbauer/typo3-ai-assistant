<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Http;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RuntimeException;
use Webconsulting\WebconAiAssistant\Chat\Http\ServerSentEventStream;
use Webconsulting\WebconAiAssistant\Chat\Http\SseEvent;
use Webconsulting\WebconAiAssistant\Chat\Http\TurnEventSink;

/**
 * The wire format, which fails silently: a frame missing its blank line is
 * buffered by the browser, a newline inside a value ends the frame early.
 */
final class ServerSentEventStreamTest extends TestCase
{
    #[Test]
    public function aFrameNamesItsEventAndEndsWithABlankLine(): void
    {
        self::assertSame("event: run.started\ndata: {\"runUuid\":\"abc\"}\n\n", new SseEvent('run.started', ['runUuid' => 'abc'])->encode());
    }

    #[Test]
    public function anIdIsWrittenBeforeTheEventName(): void
    {
        self::assertStringStartsWith("id: 4\nevent: step.llm\n", new SseEvent('step.llm', ['round' => 1], 4)->encode());
    }

    #[Test]
    public function aRawNewlineInTheDataIsSplitIntoSeveralDataLines(): void
    {
        self::assertSame("event: report\ndata: first\ndata: second\n\n", SseEvent::frame('report', "first\r\nsecond"));
    }

    #[Test]
    public function aNewlineInAPayloadIsEscapedRatherThanSplittingTheFrame(): void
    {
        $frame = new SseEvent('message.final', ['content' => "line one\nline two"])->encode();

        self::assertSame(1, substr_count($frame, 'data: '));
        self::assertStringEndsWith("\n\n", $frame);
    }

    #[Test]
    public function anUnencodablePayloadStillProducesAValidFrame(): void
    {
        $frame = new SseEvent('step.tool.result', ['preview' => "\xB1\x31"])->encode();

        self::assertStringEndsWith("\n\n", $frame);
        self::assertStringContainsString('event: step.tool.result', $frame);
    }

    #[Test]
    public function theSinkCollectsEveryEventForTheJsonTransport(): void
    {
        $sink = new TurnEventSink();
        $emit = $sink->emitter();
        $emit('run.started', ['runUuid' => 'r1']);
        $emit('run.finished', ['outcome' => 'completed']);

        self::assertSame(['run.started', 'run.finished'], array_column($sink->collected(), 'event'));
    }

    #[Test]
    public function theSinkReportsAnAbortAndRunsTheCallbackOnce(): void
    {
        $aborts = 0;
        $sink = new TurnEventSink(
            writer: static function (SseEvent $event): void {},
            abortCheck: static fn(): bool => true,
            onAbort: static function () use (&$aborts): void {
                ++$aborts;
            },
        );

        $sink->emit('run.started');
        $sink->emit('step.llm');

        self::assertTrue($sink->isAborted());
        self::assertSame(1, $aborts);
    }

    #[Test]
    public function theStreamAnnouncesTheHeadersThatMakeStreamingWork(): void
    {
        $headers = ServerSentEventStream::headers();

        self::assertSame('text/event-stream; charset=utf-8', $headers['Content-Type']);
        self::assertSame('no', $headers['X-Accel-Buffering']);
    }

    #[Test]
    public function theStreamEmitsAnOpeningPingBeforeTheProducerRuns(): void
    {
        $stream = new ServerSentEventStream(static function (TurnEventSink $sink): void {
            $sink->emit('run.finished', ['outcome' => 'completed']);
        });
        $written = [];
        $stream->produce(new TurnEventSink(writer: static function (SseEvent $event) use (&$written): void {
            $written[] = $event->name;
        }));

        self::assertSame(['ping', 'run.finished'], $written);
    }

    #[Test]
    public function theStreamIsSelfEmittableAndRefusesEveryOtherOperation(): void
    {
        $stream = new ServerSentEventStream(static function (TurnEventSink $sink): void {});

        self::assertFalse($stream->isSeekable());
        self::assertFalse($stream->isReadable());
        self::assertFalse($stream->isWritable());

        $this->expectException(RuntimeException::class);
        $stream->getContents();
    }
}
