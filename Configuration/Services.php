<?php

declare(strict_types=1);

use Netresearch\NrLlm\Provider\ProviderAdapterRegistry;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use TYPO3\CMS\Core\Core\Environment;
use Webconsulting\ShadcnUi\Testing\ScriptedProvider;

/**
 * The one thing Services.yaml cannot express: a service that must exist ONLY
 * where it is safe.
 *
 * {@see ScriptedProvider} is an LLM that says whatever a file tells it to say.
 * Reachable in production it would be a way to put words in the assistant's
 * mouth, so it is registered behind TWO independent conditions — a
 * non-production application context AND an explicit environment flag.
 */
return static function (ContainerConfigurator $configurator, ContainerBuilder $container): void {
    $context = Environment::getContext();
    if (getenv(ScriptedProvider::ENV_FLAG) !== '1' || !($context->isDevelopment() || $context->isTesting())) {
        return;
    }

    $configurator->services()
        ->set(ScriptedProvider::class)
        ->autowire()
        ->autoconfigure();

    // nr-llm's one seam for a new adapter type: the registry's overrides. A NEW
    // key rather than a replaced built-in, so a provider record has to name
    // "scripted" explicitly to reach it.
    if ($container->hasDefinition(ProviderAdapterRegistry::class)) {
        $container->getDefinition(ProviderAdapterRegistry::class)
            ->setArgument('$adapterOverrides', [ScriptedProvider::ADAPTER_TYPE => ScriptedProvider::class]);
    }
};
