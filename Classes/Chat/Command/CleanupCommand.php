<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Command;

use Closure;
use Override;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\QueryBuilder;
use Webconsulting\WebconAiAssistant\Chat\Attachment\AttachmentStorage;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationStatus;
use Webconsulting\WebconAiAssistant\Chat\Domain\MessageRepository;

/**
 * Retention and stuck-run recovery, in the order the passes depend on each other.
 *
 * 1. UNSTICK: a turn runs inside a request, so a request that died leaves a
 *    conversation claimed forever. Nothing else releases that lock.
 * 2. ARCHIVE conversations nobody touched for `--archive-after` days.
 * 3. DELETE archived and soft-deleted conversations older than `--delete-after`
 *    days, with their messages and their files — files first, because a
 *    surviving row with missing files is visible and fixable, the reverse is not.
 * 4. SWEEP message rows whose conversation no longer exists.
 */
#[AsCommand(
    name: 'ai-assistant:chat:cleanup',
    description: 'Release stuck chat conversations and apply retention',
)]
final class CleanupCommand extends Command
{
    /** Longer than any request PHP allows to finish, so a slow-but-alive turn is never stolen. */
    private const int STUCK_AFTER_SECONDS = 900;

    public function __construct(
        private readonly ConnectionPool $connectionPool,
        private readonly MessageRepository $messages,
        private readonly AttachmentStorage $attachments,
    ) {
        parent::__construct();
    }

    #[Override]
    protected function configure(): void
    {
        $this
            ->addOption('archive-after', null, InputOption::VALUE_REQUIRED, 'Archive idle conversations after this many days (0 = never)', '30')
            ->addOption('delete-after', null, InputOption::VALUE_REQUIRED, 'Delete archived and deleted conversations after this many days (0 = never)', '90')
            ->addOption('dry-run', null, InputOption::VALUE_NONE, 'Report what would happen without changing anything');
    }

    #[Override]
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $dryRun = $input->getOption('dry-run') === true;
        $archiveAfter = self::days($input->getOption('archive-after'));
        $deleteAfter = self::days($input->getOption('delete-after'));

        $released = $this->releaseStuck($dryRun);
        $archived = $archiveAfter > 0 ? $this->archiveIdle($archiveAfter, $dryRun) : 0;
        [$deleted, $deletedMessages, $deletedFiles] = $deleteAfter > 0 ? $this->deleteExpired($deleteAfter, $dryRun) : [0, 0, 0];
        $orphans = $this->deleteOrphanedMessages($dryRun);

        $output->writeln($dryRun ? '<comment>Dry run — nothing was changed.</comment>' : '<info>Cleanup done.</info>');
        $output->writeln(sprintf('  Released stuck conversations: %d', $released));
        $output->writeln(sprintf('  Archived conversations:       %d', $archived));
        $output->writeln(sprintf('  Deleted conversations:        %d', $deleted));
        $output->writeln(sprintf('  Deleted messages:             %d', $deletedMessages));
        $output->writeln(sprintf('  Deleted attachment files:     %d', $deletedFiles));
        $output->writeln(sprintf('  Deleted orphaned messages:    %d', $orphans));

        return Command::SUCCESS;
    }

    private function releaseStuck(bool $dryRun): int
    {
        $cutoff = time() - self::STUCK_AFTER_SECONDS;
        $where = static fn(QueryBuilder $qb): array => [
            $qb->expr()->eq('status', $qb->createNamedParameter(ConversationStatus::Processing->value)),
            $qb->expr()->lt('tstamp', $qb->createNamedParameter($cutoff, Connection::PARAM_INT)),
            $qb->expr()->eq('deleted', $qb->createNamedParameter(0, Connection::PARAM_INT)),
        ];
        if ($dryRun) {
            return $this->count(ConversationRepository::TABLE, $where);
        }

        $qb = $this->connectionPool->getQueryBuilderForTable(ConversationRepository::TABLE);

        return (int)$qb->update(ConversationRepository::TABLE)
            ->set('status', ConversationStatus::Failed->value)
            ->set('run_uuid', '')
            ->set('error_message', 'The turn did not finish. Its request ended before the run could settle.')
            ->where(...$where($qb))
            ->executeStatement();
    }

    private function archiveIdle(int $days, bool $dryRun): int
    {
        $cutoff = time() - $days * 86400;
        $where = static fn(QueryBuilder $qb): array => [
            $qb->expr()->eq('status', $qb->createNamedParameter(ConversationStatus::Idle->value)),
            $qb->expr()->eq('archived', $qb->createNamedParameter(0, Connection::PARAM_INT)),
            $qb->expr()->eq('deleted', $qb->createNamedParameter(0, Connection::PARAM_INT)),
            $qb->expr()->lt('tstamp', $qb->createNamedParameter($cutoff, Connection::PARAM_INT)),
        ];
        if ($dryRun) {
            return $this->count(ConversationRepository::TABLE, $where);
        }

        $qb = $this->connectionPool->getQueryBuilderForTable(ConversationRepository::TABLE);

        return (int)$qb->update(ConversationRepository::TABLE)->set('archived', 1)->where(...$where($qb))->executeStatement();
    }

    /**
     * @return array{0: int, 1: int, 2: int} conversations, messages, files
     */
    private function deleteExpired(int $days, bool $dryRun): array
    {
        $cutoff = time() - $days * 86400;
        $qb = $this->connectionPool->getQueryBuilderForTable(ConversationRepository::TABLE);
        $rows = $qb->select('uid', 'be_user')
            ->from(ConversationRepository::TABLE)
            ->where(
                $qb->expr()->or(
                    $qb->expr()->eq('archived', $qb->createNamedParameter(1, Connection::PARAM_INT)),
                    $qb->expr()->eq('deleted', $qb->createNamedParameter(1, Connection::PARAM_INT)),
                ),
                $qb->expr()->lt('tstamp', $qb->createNamedParameter($cutoff, Connection::PARAM_INT)),
            )
            ->executeQuery()
            ->fetchAllAssociative();

        $owners = [];
        foreach ($rows as $row) {
            if (is_numeric($row['uid'] ?? null)) {
                $owners[(int)$row['uid']] = is_numeric($row['be_user'] ?? null) ? (int)$row['be_user'] : 0;
            }
        }
        $uids = array_keys($owners);
        if ($uids === []) {
            return [0, 0, 0];
        }
        if ($dryRun) {
            return [count($uids), $this->count(MessageRepository::TABLE, static fn(QueryBuilder $qb): array => [
                $qb->expr()->in('conversation', $qb->createNamedParameter($uids, Connection::PARAM_INT_ARRAY)),
            ]), 0];
        }

        $files = 0;
        foreach ($owners as $uid => $owner) {
            $files += $this->attachments->deleteConversationFiles($owner, $uid);
        }
        $messages = $this->messages->deleteByConversations($uids);

        $delete = $this->connectionPool->getQueryBuilderForTable(ConversationRepository::TABLE);
        $deleted = (int)$delete->delete(ConversationRepository::TABLE)
            ->where($delete->expr()->in('uid', $delete->createNamedParameter($uids, Connection::PARAM_INT_ARRAY)))
            ->executeStatement();

        return [$deleted, $messages, $files];
    }

    private function deleteOrphanedMessages(bool $dryRun): int
    {
        $qb = $this->connectionPool->getQueryBuilderForTable(ConversationRepository::TABLE);
        $existing = array_values(array_map(intval(...), array_filter(
            $qb->select('uid')->from(ConversationRepository::TABLE)->executeQuery()->fetchFirstColumn(),
            is_numeric(...),
        )));

        $where = static fn(QueryBuilder $qb): array => $existing === []
            ? [$qb->expr()->gt('conversation', $qb->createNamedParameter(-1, Connection::PARAM_INT))]
            : [$qb->expr()->notIn('conversation', $qb->createNamedParameter($existing, Connection::PARAM_INT_ARRAY))];
        if ($dryRun) {
            return $this->count(MessageRepository::TABLE, $where);
        }

        $delete = $this->connectionPool->getQueryBuilderForTable(MessageRepository::TABLE);

        return (int)$delete->delete(MessageRepository::TABLE)->where(...$where($delete))->executeStatement();
    }

    /**
     * @param Closure(QueryBuilder): list<string> $where
     */
    private function count(string $table, Closure $where): int
    {
        $qb = $this->connectionPool->getQueryBuilderForTable($table);
        $count = $qb->count('uid')->from($table)->where(...$where($qb))->executeQuery()->fetchOne();

        return is_numeric($count) ? (int)$count : 0;
    }

    private static function days(mixed $option): int
    {
        return is_numeric($option) ? max(0, (int)$option) : 0;
    }
}
