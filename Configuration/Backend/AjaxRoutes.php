<?php

declare(strict_types=1);

use Webconsulting\ShadcnUi\Chat\Api\AttachmentController;
use Webconsulting\ShadcnUi\Chat\Api\ConversationController;
use Webconsulting\ShadcnUi\Chat\Api\StatusController;
use Webconsulting\ShadcnUi\Chat\Api\TurnController;

/**
 * The chat API. The route ids are what the frontend reads from
 * `TYPO3.settings.ajaxUrls`, so they are the contract.
 *
 * Every route that changes something is POST — backend AJAX routes carry CSRF
 * protection, and a state change reachable by GET is reachable from an <img>
 * tag on any page a signed-in editor visits. `conversations/turn`, `/approval`
 * and `/input` answer with server-sent events when asked for
 * `text/event-stream`, and with one JSON document otherwise.
 */
return [
    'shadcn_ui_chat_status' => [
        'path' => '/shadcn-ui/chat/status',
        'target' => StatusController::class . '::status',
        'methods' => ['GET'],
    ],
    'shadcn_ui_chat_conversations' => [
        'path' => '/shadcn-ui/chat/conversations',
        'target' => ConversationController::class . '::list',
        'methods' => ['GET'],
    ],
    'shadcn_ui_chat_conversation_get' => [
        'path' => '/shadcn-ui/chat/conversations/get',
        'target' => ConversationController::class . '::get',
        'methods' => ['GET'],
    ],
    'shadcn_ui_chat_conversation_events' => [
        'path' => '/shadcn-ui/chat/conversations/events',
        'target' => TurnController::class . '::events',
        'methods' => ['GET'],
    ],
    'shadcn_ui_chat_file_info' => [
        'path' => '/shadcn-ui/chat/files/info',
        'target' => AttachmentController::class . '::info',
        'methods' => ['GET'],
    ],
    'shadcn_ui_chat_conversation_create' => [
        'path' => '/shadcn-ui/chat/conversations/create',
        'target' => ConversationController::class . '::create',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_conversation_turn' => [
        'path' => '/shadcn-ui/chat/conversations/turn',
        'target' => TurnController::class . '::turn',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_conversation_approval' => [
        'path' => '/shadcn-ui/chat/conversations/approval',
        'target' => TurnController::class . '::approval',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_conversation_input' => [
        'path' => '/shadcn-ui/chat/conversations/input',
        'target' => TurnController::class . '::input',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_conversation_cancel' => [
        'path' => '/shadcn-ui/chat/conversations/cancel',
        'target' => TurnController::class . '::cancel',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_conversation_archive' => [
        'path' => '/shadcn-ui/chat/conversations/archive',
        'target' => ConversationController::class . '::archive',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_conversation_pin' => [
        'path' => '/shadcn-ui/chat/conversations/pin',
        'target' => ConversationController::class . '::pin',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_conversation_rename' => [
        'path' => '/shadcn-ui/chat/conversations/rename',
        'target' => ConversationController::class . '::rename',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_conversation_delete' => [
        'path' => '/shadcn-ui/chat/conversations/delete',
        'target' => ConversationController::class . '::delete',
        'methods' => ['POST'],
    ],
    'shadcn_ui_chat_file_upload' => [
        'path' => '/shadcn-ui/chat/files/upload',
        'target' => AttachmentController::class . '::upload',
        'methods' => ['POST'],
    ],
];
