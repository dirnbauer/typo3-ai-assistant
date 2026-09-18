<?php

declare(strict_types=1);

namespace Webconsulting\ShadcnUi\Chat\Turn;

use Netresearch\NrLlm\Domain\Model\LlmConfiguration;
use Netresearch\NrLlm\Domain\ValueObject\AiActorContext;
use Netresearch\NrLlm\Domain\ValueObject\ConfigurationIdentifier;
use Netresearch\NrLlm\Service\ConfigurationResolver;
use Throwable;
use Webconsulting\ShadcnUi\Chat\ChatException;
use Webconsulting\ShadcnUi\Chat\ErrorMessageSanitizer;
use Webconsulting\ShadcnUi\Configuration\ExtensionSettings;

/**
 * The nr-llm configuration the chat runs under, resolved for the acting user.
 *
 * Resolved for an ACTOR rather than globally: a configuration restricted to
 * backend groups is evaluated against the person asking, which is what nr-llm's
 * access rule means.
 */
final readonly class ChatConfigurationResolver
{
    public function __construct(
        private ConfigurationResolver $configurationResolver,
        private ExtensionSettings $settings,
    ) {}

    /**
     * @throws ChatException when no usable configuration exists for this actor
     */
    public function resolve(AiActorContext $actor): LlmConfiguration
    {
        $identifier = $this->settings->llmConfiguration();

        try {
            return $this->configurationResolver->getActiveByIdentifierForActor(
                new ConfigurationIdentifier($identifier),
                $actor,
            );
        } catch (Throwable $exception) {
            throw new ChatException(sprintf(
                'The chat is not available: the nr-llm configuration "%s" set as "llmConfiguration" in the '
                . 'extension configuration could not be used (%s).',
                $identifier,
                ErrorMessageSanitizer::sanitize($exception->getMessage(), 200),
            ), 1795000101, $exception);
        }
    }

    /**
     * @return array{identifier: string, name: string, provider: string, model: string}
     */
    public static function describe(LlmConfiguration $configuration): array
    {
        return [
            'identifier' => $configuration->getIdentifier(),
            'name' => $configuration->getName(),
            'provider' => $configuration->getProviderType(),
            'model' => $configuration->getModelId(),
        ];
    }
}
