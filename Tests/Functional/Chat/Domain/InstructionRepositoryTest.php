<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Functional\Chat\Domain;

use PHPUnit\Framework\Attributes\Test;
use Webconsulting\WebconAiAssistant\Chat\Domain\InstructionRepository;
use Webconsulting\WebconAiAssistant\Tests\Functional\AbstractChatTestCase;

final class InstructionRepositoryTest extends AbstractChatTestCase
{
    private InstructionRepository $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->importCSVDataSet(__DIR__ . '/../../Fixtures/instructions.csv');
        $this->subject = $this->get(InstructionRepository::class);
    }

    #[Test]
    public function anUnrestrictedInstructionReachesEverybodyInSortingOrder(): void
    {
        $titles = array_column($this->subject->findActiveFor([]), 'title');

        self::assertSame(['House style', 'Never delete'], $titles);
    }

    #[Test]
    public function aGroupRestrictionScopesTheInstructionToThatGroup(): void
    {
        $forEditors = array_column($this->subject->findActiveFor([1]), 'title');
        $forOthers = array_column($this->subject->findActiveFor([9]), 'title');

        self::assertSame(['House style', 'Never delete', 'Editors only'], $forEditors);
        self::assertNotContains('Editors only', $forOthers);
    }

    #[Test]
    public function hiddenDeletedAndEmptyInstructionsAreNotInstructions(): void
    {
        $titles = array_column($this->subject->findActiveFor([1, 2, 3]), 'title');

        self::assertNotContains('Hidden', $titles);
        self::assertNotContains('Deleted', $titles);
        self::assertNotContains('Blank body', $titles, 'An instruction with nothing to say adds noise to every prompt.');
    }

    #[Test]
    public function theBodyIsTrimmedAndCarriedWithItsUid(): void
    {
        $first = $this->subject->findActiveFor([])[0];

        self::assertSame(1, $first['uid']);
        self::assertSame('Write in the second person.', $first['body']);
    }
}
