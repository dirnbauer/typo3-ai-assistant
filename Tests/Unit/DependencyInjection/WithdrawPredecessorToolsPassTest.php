<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Tests\Unit\DependencyInjection;

use Netresearch\NrLlm\Service\Tool\ToolInterface;
use Netresearch\NrLlm\Service\Tool\ToolProviderInterface;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use stdClass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Webconsulting\WebconAiAssistant\Chat\Tool\AskUserTool;
use Webconsulting\WebconAiAssistant\DependencyInjection\WithdrawPredecessorToolsPass;

/**
 * Installed side by side, the predecessor would register `ask_user` a second
 * time — and nr-llm refuses a duplicate builtin tool name while it builds its
 * registry, on every backend page that builds it.
 */
final class WithdrawPredecessorToolsPassTest extends TestCase
{
    #[Test]
    public function thePredecessorsRegistrationsLeaveNrLlm(): void
    {
        $container = new ContainerBuilder();
        foreach (WithdrawPredecessorToolsPass::PREDECESSOR_REGISTRATIONS as $serviceId => $tag) {
            $container->setDefinition($serviceId, new Definition(stdClass::class))->addTag($tag)->addTag('kept.tag');
        }
        $container->setDefinition(AskUserTool::class, new Definition(AskUserTool::class))->addTag(ToolInterface::TAG_NAME);

        new WithdrawPredecessorToolsPass()->process($container);

        self::assertSame(
            [AskUserTool::class => [[]]],
            $container->findTaggedServiceIds(ToolInterface::TAG_NAME),
            'Only this extension\'s ask_user tool is left for nr-llm.',
        );
        self::assertSame([], $container->findTaggedServiceIds(ToolProviderInterface::TAG_NAME));
        self::assertCount(2, $container->findTaggedServiceIds('kept.tag'), 'Only the nr-llm tags are withdrawn.');
    }

    #[Test]
    public function withoutThePredecessorNothingChanges(): void
    {
        $container = new ContainerBuilder();
        $container->setDefinition(AskUserTool::class, new Definition(AskUserTool::class))->addTag(ToolInterface::TAG_NAME);

        new WithdrawPredecessorToolsPass()->process($container);

        self::assertSame([AskUserTool::class => [[]]], $container->findTaggedServiceIds(ToolInterface::TAG_NAME));
    }
}
