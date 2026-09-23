<?php

declare(strict_types=1);

use Webconsulting\WebconAiAssistant\Chat\Api\AttachmentController;
use Webconsulting\WebconAiAssistant\Chat\Api\ConversationController;
use Webconsulting\WebconAiAssistant\Chat\Api\StatusController;
use Webconsulting\WebconAiAssistant\Chat\Api\TurnController;

/**
 * The chat API. The route ids are what the JavaScript reads from
 * `TYPO3.settings.ajaxUrls`, so they are the contract.
 *
 * Every route that changes something is POST — backend AJAX routes carry CSRF
 * protection, and a state change reachable by GET is reachable from an <img>
 * tag on any page a signed-in editor visits. `conversations/turn`, `/approval`
 * and `/input` answer with server-sent events when asked for
 * `text/event-stream`, and with one JSON document otherwise.
 */
return [
    'webcon_ai_assistant_status' => [
        'path' => '/ai-assistant/status',
        'target' => StatusController::class . '::status',
        'methods' => ['GET'],
    ],
    'webcon_ai_assistant_conversations' => [
        'path' => '/ai-assistant/conversations',
        'target' => ConversationController::class . '::list',
        'methods' => ['GET'],
    ],
    'webcon_ai_assistant_conversation_get' => [
        'path' => '/ai-assistant/conversations/get',
        'target' => ConversationController::class . '::get',
        'methods' => ['GET'],
    ],
    'webcon_ai_assistant_conversation_events' => [
        'path' => '/ai-assistant/conversations/events',
        'target' => TurnController::class . '::events',
        'methods' => ['GET'],
    ],
    'webcon_ai_assistant_file_info' => [
        'path' => '/ai-assistant/files/info',
        'target' => AttachmentController::class . '::info',
        'methods' => ['GET'],
    ],
    'webcon_ai_assistant_conversation_create' => [
        'path' => '/ai-assistant/conversations/create',
        'target' => ConversationController::class . '::create',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_conversation_turn' => [
        'path' => '/ai-assistant/conversations/turn',
        'target' => TurnController::class . '::turn',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_conversation_approval' => [
        'path' => '/ai-assistant/conversations/approval',
        'target' => TurnController::class . '::approval',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_conversation_input' => [
        'path' => '/ai-assistant/conversations/input',
        'target' => TurnController::class . '::input',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_conversation_cancel' => [
        'path' => '/ai-assistant/conversations/cancel',
        'target' => TurnController::class . '::cancel',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_conversation_archive' => [
        'path' => '/ai-assistant/conversations/archive',
        'target' => ConversationController::class . '::archive',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_conversation_pin' => [
        'path' => '/ai-assistant/conversations/pin',
        'target' => ConversationController::class . '::pin',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_conversation_rename' => [
        'path' => '/ai-assistant/conversations/rename',
        'target' => ConversationController::class . '::rename',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_conversation_delete' => [
        'path' => '/ai-assistant/conversations/delete',
        'target' => ConversationController::class . '::delete',
        'methods' => ['POST'],
    ],
    'webcon_ai_assistant_file_upload' => [
        'path' => '/ai-assistant/files/upload',
        'target' => AttachmentController::class . '::upload',
        'methods' => ['POST'],
    ],
];
