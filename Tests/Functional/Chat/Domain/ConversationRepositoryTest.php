<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Functional\Chat\Domain;

use PHPUnit\Framework\Attributes\Test;
use Webconsulting\ShadcnUi\Chat\Domain\Conversation;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationStatus;
use Webconsulting\ShadcnUi\Tests\Functional\AbstractChatTestCase;

final class ConversationRepositoryTest extends AbstractChatTestCase
{
    private ConversationRepository $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->subject = $this->get(ConversationRepository::class);
    }

    #[Test]
    public function aCreatedConversationIsReadBackWithItsDefaults(): void
    {
        $conversation = $this->subject->create(self::BE_USER_UID, '  Rename the team page  ', 'Be brief.', 'my_ext/dashboard', 12);

        self::assertGreaterThan(0, $conversation->uid);
        self::assertSame('Rename the team page', $conversation->title);
        self::assertSame(ConversationStatus::Idle, $conversation->status);
        self::assertSame('Be brief.', $conversation->systemPrompt);
        self::assertSame('my_ext/dashboard', $conversation->appName);
        self::assertSame(12, $conversation->pageId);
        self::assertSame([], $conversation->pendingApproval);
        self::assertFalse($conversation->autoApproveTools);
    }

    #[Test]
    public function aConversationBelongsToOneUserAndNobodyElseCanReadIt(): void
    {
        $conversation = $this->subject->create(self::BE_USER_UID, 'Mine', '', '', 0);

        self::assertInstanceOf(
            Conversation::class,
            $this->subject->findOneByUidAndBeUser($conversation->uid, self::BE_USER_UID),
        );
        self::assertNull($this->subject->findOneByUidAndBeUser($conversation->uid, self::EDITOR_UID));
        self::assertNull($this->subject->findOneByUidAndBeUser($conversation->uid, 0));
        self::assertNull($this->subject->findOneByUidAndBeUser(0, self::BE_USER_UID));
    }

    #[Test]
    public function onlyTheFirstOfTwoClaimsOnTheSameConversationWins(): void
    {
        $conversation = $this->subject->create(self::BE_USER_UID, 'Busy', '', '', 0);
        $from = [ConversationStatus::Idle, ConversationStatus::Failed];

        self::assertTrue($this->subject->claimForTurn($conversation->uid, self::BE_USER_UID, $from, 'run-first'));
        self::assertFalse(
            $this->subject->claimForTurn($conversation->uid, self::BE_USER_UID, $from, 'run-second'),
            'A second tab must not start a turn on a transcript that already has one.',
        );

        $claimed = $this->subject->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $claimed);
        self::assertSame(ConversationStatus::Processing, $claimed->status);
        self::assertSame('run-first', $claimed->runUuid);
    }

    #[Test]
    public function aClaimNeverCrossesTheOwnerBoundaryAndNeverStartsFromAnUnlistedState(): void
    {
        $conversation = $this->subject->create(self::BE_USER_UID, 'Mine', '', '', 0);

        self::assertFalse($this->subject->claimForTurn($conversation->uid, self::EDITOR_UID, [ConversationStatus::Idle], 'run-x'));
        self::assertFalse($this->subject->claimForTurn($conversation->uid, self::BE_USER_UID, [], 'run-x'));
        self::assertFalse($this->subject->claimForTurn($conversation->uid, self::BE_USER_UID, [ConversationStatus::AwaitingInput], 'run-x'));
    }

    #[Test]
    public function settlingClearsBothPendingCardsAndTheRunItReleases(): void
    {
        $conversation = $this->subject->create(self::BE_USER_UID, 'Pending', '', '', 0);
        $this->subject->settle(
            $conversation->uid,
            self::BE_USER_UID,
            ConversationStatus::AwaitingApproval,
            'run-1',
            '',
            ['turnDigest' => 'abc', 'calls' => [['callId' => 'c1', 'name' => 'typo3_WriteTable']]],
        );

        $waiting = $this->subject->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $waiting);
        self::assertSame(ConversationStatus::AwaitingApproval, $waiting->status);
        self::assertSame('abc', $waiting->pendingApproval['turnDigest'] ?? null);

        $this->subject->settle($conversation->uid, self::BE_USER_UID, ConversationStatus::Idle);

        $settled = $this->subject->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $settled);
        self::assertSame([], $settled->pendingApproval, 'A decided approval must not linger.');
        self::assertSame([], $settled->pendingInput);
        self::assertSame('', $settled->runUuid);
    }

    #[Test]
    public function patchWritesTheClientEditableColumnsAndIgnoresEverythingElse(): void
    {
        $conversation = $this->subject->create(self::BE_USER_UID, 'Draft', '', '', 0);

        $this->subject->patch($conversation->uid, self::BE_USER_UID, [
            'title' => 'Renamed',
            'pinned' => 1,
            'status' => ConversationStatus::Processing->value,
            'run_uuid' => 'forged',
            'be_user' => self::EDITOR_UID,
        ]);

        $patched = $this->subject->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $patched);
        self::assertSame('Renamed', $patched->title);
        self::assertTrue($patched->pinned);
        self::assertSame(ConversationStatus::Idle, $patched->status, 'The lifecycle is not the client\'s to set.');
        self::assertSame('', $patched->runUuid);
        self::assertSame(self::BE_USER_UID, $patched->beUser);
    }

    #[Test]
    public function patchOnSomebodyElsesConversationChangesNothing(): void
    {
        $conversation = $this->subject->create(self::BE_USER_UID, 'Mine', '', '', 0);

        $this->subject->patch($conversation->uid, self::EDITOR_UID, ['title' => 'Stolen']);

        $untouched = $this->subject->findByUid($conversation->uid);
        self::assertInstanceOf(Conversation::class, $untouched);
        self::assertSame('Mine', $untouched->title);
    }

    #[Test]
    public function theListIsPinnedFirstThenMostRecentAndHidesArchivedAndDeleted(): void
    {
        $old = $this->subject->create(self::BE_USER_UID, 'Old', '', '', 0);
        $recent = $this->subject->create(self::BE_USER_UID, 'Recent', '', '', 0);
        $pinned = $this->subject->create(self::BE_USER_UID, 'Pinned', '', '', 0);
        $archived = $this->subject->create(self::BE_USER_UID, 'Archived', '', '', 0);
        $removed = $this->subject->create(self::BE_USER_UID, 'Removed', '', '', 0);
        $this->subject->create(self::EDITOR_UID, 'Somebody else', '', '', 0);

        $this->subject->patch($pinned->uid, self::BE_USER_UID, ['pinned' => 1]);
        $this->subject->patch($archived->uid, self::BE_USER_UID, ['archived' => 1]);
        $this->subject->patch($removed->uid, self::BE_USER_UID, ['deleted' => 1]);
        // last_message_at has one-second resolution, so the order is made explicit.
        $this->subject->touchMessages($old->uid, 1);
        $this->subject->touchMessages($recent->uid, 1);
        $this->getConnectionPool()->getConnectionForTable(ConversationRepository::TABLE)->update(
            ConversationRepository::TABLE,
            ['last_message_at' => time() - 3600],
            ['uid' => $old->uid],
        );

        $titles = array_map(static fn(Conversation $c): string => $c->title, $this->subject->findByBeUser(self::BE_USER_UID));
        self::assertSame(['Pinned', 'Recent', 'Old'], $titles);

        $withArchived = array_map(static fn(Conversation $c): string => $c->title, $this->subject->findByBeUser(self::BE_USER_UID, true));
        self::assertContains('Archived', $withArchived);
        self::assertNotContains('Removed', $withArchived, 'A deleted conversation is gone from every list.');
    }

    #[Test]
    public function theActiveCountIsTheConversationsThatStillOweTheUserAnAnswer(): void
    {
        $idle = $this->subject->create(self::BE_USER_UID, 'Idle', '', '', 0);
        $running = $this->subject->create(self::BE_USER_UID, 'Running', '', '', 0);
        $asking = $this->subject->create(self::BE_USER_UID, 'Asking', '', '', 0);

        $this->subject->claimForTurn($running->uid, self::BE_USER_UID, [ConversationStatus::Idle], 'run-1');
        $this->subject->settle($asking->uid, self::BE_USER_UID, ConversationStatus::AwaitingInput, 'run-2');

        self::assertSame(2, $this->subject->countActiveByBeUser(self::BE_USER_UID));
        self::assertSame(0, $this->subject->countActiveByBeUser(self::EDITOR_UID));
        self::assertGreaterThan(0, $idle->uid);
    }
}
