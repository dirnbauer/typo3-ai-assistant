<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Api;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use Webconsulting\WebconAiAssistant\Chat\Attachment\AttachmentStorage;
use Webconsulting\WebconAiAssistant\Chat\Domain\ConversationRepository;
use Webconsulting\WebconAiAssistant\Chat\Security\BackendUserContext;

/**
 * Files a message may carry: upload into the conversation's folder, describe
 * one the user already has.
 */
#[AsController]
final readonly class AttachmentController extends AbstractApiController
{
    public function __construct(
        BackendUserContext $backendUser,
        ConversationRepository $conversations,
        private AttachmentStorage $attachments,
    ) {
        parent::__construct($backendUser, $conversations);
    }

    public function upload(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $conversation = $this->conversation($api);
            $upload = $api->uploadedFile('file') ?? throw new ApiException('No file was uploaded.', 400, 1795000604);

            return self::json($this->attachments->storeUpload($upload, $conversation->beUser, $conversation->uid), 201);
        });
    }

    public function info(ServerRequestInterface $request): ResponseInterface
    {
        return $this->handle($request, function (ApiRequest $api): ResponseInterface {
            $fileUid = $api->int('fileUid');
            if ($fileUid <= 0) {
                throw new ApiException('A file uid is required.', 400, 1795000605);
            }

            return self::json(
                $this->attachments->describeUid($fileUid) ?? throw new ApiException('File not found.', 404, 1795000606),
            );
        });
    }
}
