<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Tool;

use Netresearch\NrLlm\Domain\Enum\ToolDataClass;
use Netresearch\NrLlm\Domain\ValueObject\ToolResult;
use Netresearch\NrLlm\Domain\ValueObject\ToolSpec;
use Netresearch\NrLlm\Service\Tool\RequiresInputInterface;
use Netresearch\NrLlm\Service\Tool\ToolDataClassInterface;
use Netresearch\NrLlm\Service\Tool\ToolExecutionContext;
use Netresearch\NrLlm\Service\Tool\ToolInterface;

/**
 * The clarifying question.
 *
 * When the model needs something only the user knows — which of two pages,
 * whether to overwrite — it calls this tool. nr-llm sees
 * {@see RequiresInputInterface} and suspends the run WAITING_FOR_INPUT before
 * anything executes; the chat shows the question as a card; the answer travels
 * back through `AgentRuntime::submitInput()`, is overlaid onto this call's
 * arguments as `answer`, and the tool returns it to the model as text.
 *
 * Read-only by nature and in nr-llm's eyes: it changes nothing but the
 * conversation.
 */
final readonly class AskUserTool implements ToolInterface, RequiresInputInterface, ToolDataClassInterface
{
    public const NAME = 'ask_user';

    public const GROUP = 'shadcn_ui';

    public function getSpec(): ToolSpec
    {
        return new ToolSpec(
            name: self::NAME,
            description: 'Ask the user one clarifying question and wait for the answer. Use it when the request is '
                . 'ambiguous or a choice only the user can make is needed. Offer options when the sensible answers are known.',
            parameters: [
                'type' => 'object',
                'properties' => [
                    'question' => ['type' => 'string', 'description' => 'The question, in the user\'s language.'],
                    'options' => [
                        'type' => 'array',
                        'items' => ['type' => 'string'],
                        'description' => 'Short answers the user can pick from. Optional.',
                    ],
                    'allowFreeText' => [
                        'type' => 'boolean',
                        'description' => 'Whether the user may also type an answer of their own. Defaults to true.',
                    ],
                ],
                'required' => ['question'],
            ],
        );
    }

    /**
     * What the user supplies; nr-llm validates the submission against it before
     * the run is claimed.
     *
     * @return array<string, mixed>
     */
    public function getInputSchema(): array
    {
        return [
            'type' => 'object',
            'properties' => ['answer' => ['type' => 'string', 'minLength' => 1]],
            'required' => ['answer'],
        ];
    }

    /**
     * @param array<string, mixed> $arguments
     */
    public function execute(array $arguments, ToolExecutionContext $context): ToolResult
    {
        $answer = $arguments['answer'] ?? null;
        if (!is_string($answer) || trim($answer) === '') {
            return ToolResult::error('The user did not answer the question.');
        }

        return ToolResult::text('The user answered: ' . trim($answer));
    }

    public function getDataClass(): ToolDataClass
    {
        return ToolDataClass::EDITOR_CONTENT;
    }

    public function getGroup(): string
    {
        return self::GROUP;
    }

    public function isEnabledByDefault(): bool
    {
        return true;
    }

    public function requiresAdmin(): bool
    {
        return false;
    }

    /**
     * The card the chat renders, read from the call the run suspended on.
     *
     * @param array<string, mixed> $arguments
     *
     * @return array{question: string, options: list<string>, allowFreeText: bool}
     */
    public static function question(array $arguments): array
    {
        $options = [];
        foreach (is_array($arguments['options'] ?? null) ? $arguments['options'] : [] as $option) {
            if (is_string($option) && trim($option) !== '') {
                $options[] = trim($option);
            }
        }

        return [
            'question' => is_string($arguments['question'] ?? null) ? trim($arguments['question']) : '',
            'options' => $options,
            'allowFreeText' => ($arguments['allowFreeText'] ?? true) !== false,
        ];
    }
}
