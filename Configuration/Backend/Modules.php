<?php

declare(strict_types=1);

use Webconsulting\WebconAiAssistant\Backend\Controller\ChatModuleController;
use Webconsulting\WebconAiAssistant\Backend\Controller\InstructionModuleController;

/**
 * Administration → AI Assistant, with two third-level modules the doc header's
 * module menu switches between: the chat every permitted user sees, and the
 * instruction records only administrators manage.
 *
 * The container module has no route of its own. TYPO3 forwards it to the last
 * submodule the user opened, or the first one they may reach, and hides it from
 * the module menu when neither submodule is accessible.
 */
return [
    'tools_webconaiassistant' => [
        'parent' => 'admin',
        'position' => ['after' => '*'],
        'access' => 'user',
        'path' => '/module/tools/ai-assistant',
        'iconIdentifier' => 'webcon-ai-assistant-module',
        'labels' => 'webcon_ai_assistant.modules.assistant',
        'appearance' => [
            'dependsOnSubmodules' => true,
        ],
    ],
    'tools_webconaiassistant_chat' => [
        'parent' => 'tools_webconaiassistant',
        'access' => 'user',
        'path' => '/module/tools/ai-assistant/chat',
        'iconIdentifier' => 'webcon-ai-assistant-module',
        'labels' => 'webcon_ai_assistant.modules.chat',
        'routes' => [
            '_default' => [
                'target' => ChatModuleController::class . '::index',
            ],
        ],
    ],
    'tools_webconaiassistant_instructions' => [
        'parent' => 'tools_webconaiassistant',
        'position' => ['after' => 'tools_webconaiassistant_chat'],
        'access' => 'admin',
        'path' => '/module/tools/ai-assistant/instructions',
        'iconIdentifier' => 'webcon-ai-assistant-record-instruction',
        'labels' => 'webcon_ai_assistant.modules.instructions',
        'routes' => [
            '_default' => [
                'target' => InstructionModuleController::class . '::index',
            ],
        ],
    ],
];
