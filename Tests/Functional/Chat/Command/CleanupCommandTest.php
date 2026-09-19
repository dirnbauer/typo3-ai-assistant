<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Tests\Functional\Chat\Command;

use PHPUnit\Framework\Attributes\Test;
use Symfony\Component\Console\Tester\CommandTester;
use Webconsulting\ShadcnUi\Chat\Command\CleanupCommand;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationRepository;
use Webconsulting\ShadcnUi\Chat\Domain\ConversationStatus;
use Webconsulting\ShadcnUi\Chat\Domain\Message;
use Webconsulting\ShadcnUi\Chat\Domain\MessageRepository;
use Webconsulting\ShadcnUi\Chat\Domain\MessageRole;
use Webconsulting\ShadcnUi\Tests\Functional\AbstractChatTestCase;

final class CleanupCommandTest extends AbstractChatTestCase
{
    private const DAY = 86400;

    private CommandTester $command;

    private ConversationRepository $conversations;

    protected function setUp(): void
    {
        parent::setUp();
        $this->command = new CommandTester($this->get(CleanupCommand::class));
        $this->conversations = $this->get(ConversationRepository::class);
    }

    #[Test]
    public function aConversationLeftClaimedByADeadRequestIsReleasedAsFailed(): void
    {
        $stuck = $this->conversations->create(self::BE_USER_UID, 'Stuck', '', '', 0);
        $running = $this->conversations->create(self::BE_USER_UID, 'Still running', '', '', 0);
        foreach ([$stuck->uid, $running->uid] as $uid) {
            $this->conversations->claimForTurn($uid, self::BE_USER_UID, [ConversationStatus::Idle], 'run-' . $uid);
        }
        $this->age($stuck->uid, 3600);

        $this->command->execute([]);

        self::assertSame(ConversationStatus::Failed, $this->statusOf($stuck->uid));
        self::assertSame('', $this->row(ConversationRepository::TABLE, $stuck->uid)['run_uuid']);
        self::assertSame(
            ConversationStatus::Processing,
            $this->statusOf($running->uid),
            'A turn that only takes a while must not be stolen from its request.',
        );
        self::assertStringContainsString('Released stuck conversations: 1', $this->command->getDisplay());
    }

    #[Test]
    public function idleConversationsAreArchivedAfterTheRetentionWindow(): void
    {
        $old = $this->conversations->create(self::BE_USER_UID, 'Old', '', '', 0);
        $fresh = $this->conversations->create(self::BE_USER_UID, 'Fresh', '', '', 0);
        $this->age($old->uid, 31 * self::DAY);

        $this->command->execute(['--archive-after' => '30', '--delete-after' => '0']);

        self::assertSame(1, (int)$this->row(ConversationRepository::TABLE, $old->uid)['archived']);
        self::assertSame(0, (int)$this->row(ConversationRepository::TABLE, $fresh->uid)['archived']);
    }

    #[Test]
    public function archivedAndDeletedConversationsAreRemovedWithTheirMessages(): void
    {
        $expired = $this->conversations->create(self::BE_USER_UID, 'Expired', '', '', 0);
        $keep = $this->conversations->create(self::BE_USER_UID, 'Keep', '', '', 0);
        $this->message($expired->uid);
        $this->message($keep->uid);
        $this->conversations->patch($expired->uid, self::BE_USER_UID, ['archived' => 1]);
        $this->age($expired->uid, 91 * self::DAY);

        $this->command->execute(['--archive-after' => '0', '--delete-after' => '90']);

        self::assertSame(0, $this->countRows(ConversationRepository::TABLE, 'uid', $expired->uid));
        self::assertSame(0, $this->countRows(MessageRepository::TABLE, 'conversation', $expired->uid));
        self::assertSame(1, $this->countRows(ConversationRepository::TABLE, 'uid', $keep->uid));
        self::assertSame(1, $this->countRows(MessageRepository::TABLE, 'conversation', $keep->uid));
    }

    #[Test]
    public function messagesWhoseConversationIsGoneAreSweptUp(): void
    {
        $this->message(9999);

        $this->command->execute([]);

        self::assertSame(0, $this->countRows(MessageRepository::TABLE, 'conversation', 9999));
    }

    #[Test]
    public function aDryRunCountsWhatItWouldDoAndChangesNothing(): void
    {
        $stuck = $this->conversations->create(self::BE_USER_UID, 'Stuck', '', '', 0);
        $this->conversations->claimForTurn($stuck->uid, self::BE_USER_UID, [ConversationStatus::Idle], 'run-1');
        $this->age($stuck->uid, 3600);

        $this->command->execute(['--dry-run' => true]);

        self::assertStringContainsString('Dry run', $this->command->getDisplay());
        self::assertStringContainsString('Released stuck conversations: 1', $this->command->getDisplay());
        self::assertSame(ConversationStatus::Processing, $this->statusOf($stuck->uid));
    }

    private function statusOf(int $uid): ConversationStatus
    {
        $conversation = $this->conversations->findByUid($uid);
        self::assertNotNull($conversation);

        return $conversation->status;
    }

    private function message(int $conversation): void
    {
        $this->get(MessageRepository::class)->append(new Message(
            uid: 0,
            conversation: $conversation,
            sequence: 0,
            role: MessageRole::User,
            content: 'Hello',
        ));
    }

    /**
     * Backdate a row: retention is measured from `tstamp`, and a test cannot
     * wait a month for it.
     */
    private function age(int $uid, int $seconds): void
    {
        $this->getConnectionPool()->getConnectionForTable(ConversationRepository::TABLE)->update(
            ConversationRepository::TABLE,
            ['tstamp' => time() - $seconds],
            ['uid' => $uid],
        );
    }
}
