<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;

return [
    'webcon-ai-assistant-module' => [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:webcon_ai_assistant/Resources/Public/Icons/module-assistant.svg',
    ],
    'webcon-ai-assistant-toolbar' => [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:webcon_ai_assistant/Resources/Public/Icons/toolbar-assistant.svg',
    ],
    'webcon-ai-assistant-record-instruction' => [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:webcon_ai_assistant/Resources/Public/Icons/record-instruction.svg',
    ],
];
