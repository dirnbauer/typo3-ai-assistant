<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Cache\Backend\Typo3DatabaseBackend;
use TYPO3\CMS\Core\Cache\Frontend\VariableFrontend;

defined('TYPO3') or die();

// The MCP catalogue projection (name, description, JSON schema, effect) only
// changes when code or the capability manifest changes, so it is resolved once
// per cache lifetime rather than on every agent run. Cleared by a normal
// "flush system caches".
$GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['webcon_ai_assistant_tools'] ??= [
    'frontend' => VariableFrontend::class,
    'backend' => Typo3DatabaseBackend::class,
    'options' => ['defaultLifetime' => 3600],
    'groups' => ['system'],
];
