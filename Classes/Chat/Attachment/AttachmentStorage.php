<?php

declare(strict_types=1);

namespace Webconsulting\WebconAiAssistant\Chat\Attachment;

use finfo;
use Psr\Http\Message\UploadedFileInterface;
use Throwable;
use TYPO3\CMS\Core\Resource\Exception\FolderDoesNotExistException;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\Core\Resource\StorageRepository;
use Webconsulting\WebconAiAssistant\Chat\Attachment\Document\DocumentExtractorRegistry;
use Webconsulting\WebconAiAssistant\Chat\Domain\Message;
use Webconsulting\WebconAiAssistant\Configuration\ExtensionSettings;

/**
 * Chat attachments: `<attachmentStorage>/<be_user>/<conversation>/`.
 *
 * Per user and per conversation because both halves are needed later:
 * retention deletes one conversation's files without touching another's, and
 * an administrator can tell whose an upload was from the path alone.
 */
final readonly class AttachmentStorage
{
    /** How much of a document's text is stored on the message and shown to the model. */
    public const int MAX_TEXT_CHARS = 40000;

    public function __construct(
        private StorageRepository $storageRepository,
        private ResourceFactory $resourceFactory,
        private DocumentExtractorRegistry $extractors,
        private ExtensionSettings $settings,
    ) {}

    /**
     * Accept an upload: the type is detected from the bytes — the client's
     * Content-Type is a claim — then checked against the allowlist and its size
     * cap, opened once to prove it is readable, and stored.
     *
     * @return array{fileUid: int, fileName: string, fileMimeType: string, fileSize: int}
     *
     * @throws AttachmentRejectedException for anything about the file itself
     */
    public function storeUpload(UploadedFileInterface $upload, int $beUserUid, int $conversationUid): array
    {
        if ($upload->getError() !== UPLOAD_ERR_OK) {
            throw new AttachmentRejectedException('No file was uploaded.', 1795000450);
        }
        $uri = $upload->getStream()->getMetadata('uri');
        $path = is_string($uri) ? $uri : '';
        if ($path === '' || !is_file($path)) {
            throw new AttachmentRejectedException('The upload could not be read.', 1795000451);
        }

        $mimeType = new finfo(FILEINFO_MIME_TYPE)->file($path);
        if (!is_string($mimeType) || !$this->extractors->canExtract($mimeType)) {
            $accepted = implode(', ', $this->extractors->extensions());

            throw new AttachmentRejectedException(
                sprintf('This file type is not supported. Accepted: %s.', $accepted),
                1795000452,
                arguments: ['accepted' => $accepted],
            );
        }

        $maxBytes = $this->extractors->maxBytes($mimeType);
        $size = $upload->getSize() ?? (int)filesize($path);
        if ($size > $maxBytes) {
            $megabytes = intdiv($maxBytes, 1024 * 1024);

            throw new AttachmentRejectedException(
                sprintf('The file is larger than %d MB.', $megabytes),
                1795000453,
                arguments: ['megabytes' => $megabytes],
            );
        }

        $this->extractors->validate($path, $mimeType);

        $folder = $this->folderFor($beUserUid, $conversationUid);
        $file = $folder->getStorage()->addFile($path, $folder, $upload->getClientFilename() ?? 'upload');

        return $this->describe($file);
    }

    /**
     * The files a turn names, as the message stores them: described, permission
     * checked, and carrying their extracted text.
     *
     * A uid in a request body is a claim about a file, not permission to read
     * it, so unreadable and unknown uids are dropped rather than trusted.
     *
     * @param list<mixed> $raw the client's `attachments` list
     *
     * @return list<array<string, mixed>>
     */
    public function resolve(array $raw): array
    {
        $attachments = [];
        foreach ($raw as $entry) {
            $fileUid = is_array($entry) && is_numeric($entry['fileUid'] ?? null) ? (int)$entry['fileUid'] : 0;
            $file = $this->readableFile($fileUid);
            if ($file === null) {
                continue;
            }

            $attachments[] = $this->describe($file) + [Message::ATTACHMENT_TEXT_KEY => $this->textOf($file)];
        }

        return $attachments;
    }

    /**
     * @return array{fileUid: int, fileName: string, fileMimeType: string, fileSize: int}|null
     */
    public function describeUid(int $fileUid): ?array
    {
        $file = $this->readableFile($fileUid);

        return $file === null ? null : $this->describe($file);
    }

    /**
     * @return array{fileUid: int, fileName: string, fileMimeType: string, fileSize: int}
     */
    public function describe(File $file): array
    {
        return [
            'fileUid' => $file->getUid(),
            'fileName' => $file->getName(),
            'fileMimeType' => $file->getMimeType(),
            'fileSize' => $file->getSize(),
        ];
    }

    /**
     * Delete a conversation's files and folder. Best effort: retention must not
     * stall on one unreachable file.
     */
    public function deleteConversationFiles(int $beUserUid, int $conversationUid): int
    {
        try {
            [$storage, $basePath] = $this->base();
            $path = $basePath . '/' . $beUserUid . '/' . $conversationUid;
            if (!$storage->hasFolder($path)) {
                return 0;
            }
            $folder = $storage->getFolder($path);
            $count = count($folder->getFiles());
            $storage->deleteFolder($folder, true);

            return $count;
        } catch (Throwable) {
            return 0;
        }
    }

    private function readableFile(int $fileUid): ?File
    {
        if ($fileUid <= 0) {
            return null;
        }
        try {
            $file = $this->resourceFactory->getFileObject($fileUid);
        } catch (Throwable) {
            return null;
        }

        return $file->checkActionPermission('read') ? $file : null;
    }

    private function textOf(File $file): string
    {
        try {
            $text = $this->extractors->extract($file->getForLocalProcessing(false), $file->getMimeType());
        } catch (Throwable) {
            return '';
        }

        return mb_substr(trim($text), 0, self::MAX_TEXT_CHARS);
    }

    private function folderFor(int $beUserUid, int $conversationUid): Folder
    {
        [$storage, $basePath] = $this->base();

        $folder = $storage->getRootLevelFolder();
        foreach (explode('/', trim($basePath . '/' . $beUserUid . '/' . $conversationUid, '/')) as $segment) {
            if ($segment === '') {
                continue;
            }
            $folder = $folder->hasFolder($segment) ? $folder->getSubfolder($segment) : $storage->createFolder($segment, $folder);
        }

        return $folder;
    }

    /**
     * @return array{0: ResourceStorage, 1: string}
     */
    private function base(): array
    {
        $configured = $this->settings->attachmentStorage();
        [$storageUid, $path] = str_contains($configured, ':') ? explode(':', $configured, 2) : ['0', $configured];

        $storage = (int)$storageUid > 0
            ? $this->storageRepository->findByUid((int)$storageUid)
            : $this->storageRepository->getDefaultStorage();
        if (!$storage instanceof ResourceStorage) {
            throw new FolderDoesNotExistException(sprintf('The attachment storage "%s" does not exist.', $configured), 1795000460);
        }

        return [$storage, '/' . trim($path, '/')];
    }
}
