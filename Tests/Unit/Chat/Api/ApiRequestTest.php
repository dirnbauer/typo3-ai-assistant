<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Unit\Chat\Api;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Http\ServerRequest;
use TYPO3\CMS\Core\Http\Stream;
use Webconsulting\ShadcnUi\Chat\Api\ApiRequest;

final class ApiRequestTest extends TestCase
{
    #[Test]
    public function aJsonBodyIsReadWhenNothingWasParsed(): void
    {
        $body = new Stream('php://temp', 'rw');
        $body->write('{"conversation":"12","content":"Hi","approved":true,"context":{"pageId":3},"attachments":[{"fileUid":9}]}');
        $api = new ApiRequest((new ServerRequest('https://example.com/x', 'POST'))->withBody($body));

        self::assertSame(12, $api->conversationUid());
        self::assertSame('Hi', $api->string('content'));
        self::assertTrue($api->bool('approved'));
        self::assertSame(['pageId' => 3], $api->object('context'));
        self::assertSame([['fileUid' => 9]], $api->list('attachments'));
    }

    #[Test]
    public function aParsedBodyWinsOverTheQueryAndFormBooleansAreUnderstood(): void
    {
        $api = new ApiRequest((new ServerRequest('https://example.com/x', 'POST'))
            ->withQueryParams(['conversation' => '1', 'archived' => '1'])
            ->withParsedBody(['conversation' => 2, 'pinned' => 'true']));

        self::assertSame(2, $api->conversationUid());
        self::assertTrue($api->bool('archived'), 'The query is consulted when the body has nothing.');
        self::assertTrue($api->bool('pinned'));
        self::assertNull($api->bool('missing'), 'Absent is different from false.');
        self::assertFalse($api->has('missing'));
    }

    #[Test]
    public function streamingIsNegotiatedByTheAcceptHeader(): void
    {
        $plain = new ApiRequest(new ServerRequest('https://example.com/x', 'POST'));
        $stream = new ApiRequest((new ServerRequest('https://example.com/x', 'POST'))->withHeader('Accept', 'text/event-stream'));

        self::assertFalse($plain->wantsEventStream());
        self::assertTrue($stream->wantsEventStream());
    }
}
