<?php

declare(strict_types=1);

use Webconsulting\ShadcnUi\Backend\Controller\ComponentsModuleController;
use Webconsulting\ShadcnUi\Chat\Controller\ChatModuleController;

return [
    'tools_shadcnui_chat' => [
        'parent' => 'tools',
        'position' => ['after' => '*'],
        'access' => 'user',
        'path' => '/module/tools/shadcn-ui-chat',
        'iconIdentifier' => 'shadcn-ui-module-chat',
        'labels' => 'LLL:EXT:shadcn_ui/Resources/Private/Language/locallang_mod_chat.xlf',
        'routes' => [
            '_default' => [
                'target' => ChatModuleController::class . '::index',
            ],
        ],
    ],
    'tools_shadcnui_components' => [
        'parent' => 'tools',
        'position' => ['after' => 'tools_shadcnui_chat'],
        'access' => 'user',
        'path' => '/module/tools/shadcn-ui-components',
        'iconIdentifier' => 'shadcn-ui-module-components',
        'labels' => 'LLL:EXT:shadcn_ui/Resources/Private/Language/locallang_mod_components.xlf',
        'routes' => [
            '_default' => [
                'target' => ComponentsModuleController::class . '::index',
            ],
        ],
    ],
];
