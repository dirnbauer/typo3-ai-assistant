import { FileTextIcon, XIcon } from 'lucide-react';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment';
import type { PromptAttachment } from '@/components/ai/prompt-input';
import { formatBytes } from '@/lib/utils';
import type { AttachmentInfo } from '@/state/types';

/** Files that were sent with a message. Read-only: the upload already happened. */
export function AttachmentList({ attachments }: { attachments: AttachmentInfo[] }) {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <AttachmentGroup>
      {attachments.map((file) => (
        <Attachment key={file.fileUid} size="sm">
          <AttachmentMedia>
            <FileTextIcon aria-hidden="true" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.fileName}</AttachmentTitle>
            <AttachmentDescription>{formatBytes(file.fileSize)}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}

/** Files staged in the composer: uploading shimmers, ready is quiet, an error says what the server said. */
export function ComposerAttachments({
  attachments,
  onRemove,
}: {
  attachments: PromptAttachment[];
  onRemove: (id: string) => void;
}) {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <AttachmentGroup>
      {attachments.map((attachment) => (
        <Attachment
          key={attachment.id}
          size="sm"
          state={attachment.status === 'ready' ? 'done' : attachment.status === 'error' ? 'error' : 'uploading'}
        >
          <AttachmentMedia>
            <FileTextIcon aria-hidden="true" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{attachment.file.name}</AttachmentTitle>
            <AttachmentDescription>
              {attachment.status === 'error' ? (attachment.error ?? 'Upload failed.') : formatBytes(attachment.file.size)}
            </AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${attachment.file.name}`} onClick={() => onRemove(attachment.id)} type="button">
              <XIcon aria-hidden="true" />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}
