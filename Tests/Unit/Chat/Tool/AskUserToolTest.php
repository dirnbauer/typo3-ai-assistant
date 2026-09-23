<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\Chat\Tool;

use Netresearch\NrLlm\Domain\ValueObject\AiActorContext;
use Netresearch\NrLlm\Service\Tool\InputSchema;
use Netresearch\NrLlm\Service\Tool\ToolApprovalRule;
use Netresearch\NrLlm\Service\Tool\ToolExecutionContext;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Webconsulting\WebconAiAssistant\Chat\Tool\AskUserTool;

final class AskUserToolTest extends TestCase
{
    #[Test]
    public function itIsAnInputToolWithAUsableSchemaAndNeverNeedsApproval(): void
    {
        $tool = new AskUserTool();

        self::assertTrue(InputSchema::isUsable($tool->getInputSchema()), 'nr-llm refuses to suspend on a degenerate schema.');
        self::assertFalse(ToolApprovalRule::requiresApproval($tool), 'A question must not also be an approval pause.');
        self::assertTrue($tool->isEnabledByDefault());
        self::assertSame(AskUserTool::NAME, $tool->getSpec()->name);
        self::assertContains('question', $tool->getSpec()->parameters['required']);
    }

    #[Test]
    public function theAnswerIsReturnedToTheModel(): void
    {
        $result = new AskUserTool()->execute(
            ['question' => 'Which page?', 'answer' => '  The start page  '],
            new ToolExecutionContext(AiActorContext::backendUser(1)),
        );

        self::assertFalse($result->isError);
        self::assertSame('The user answered: The start page', $result->content);
    }

    #[Test]
    public function aMissingAnswerIsAnError(): void
    {
        $result = new AskUserTool()->execute(['question' => 'Which page?'], new ToolExecutionContext(AiActorContext::backendUser(1)));

        self::assertTrue($result->isError);
    }

    #[Test]
    public function theQuestionCardIsReadOffTheCallArguments(): void
    {
        $card = AskUserTool::question([
            'question' => ' Overwrite the title? ',
            'options' => ['Yes', ' No ', '', 7],
            'allowFreeText' => false,
        ]);

        self::assertSame(['question' => 'Overwrite the title?', 'options' => ['Yes', 'No'], 'allowFreeText' => false], $card);
        self::assertTrue(AskUserTool::question(['question' => 'x'])['allowFreeText'], 'Free text is the default.');
    }
}
