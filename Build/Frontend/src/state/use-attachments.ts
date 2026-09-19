import { useCallback, useMemo, useState } from 'react';
import { describeError, uploadFile } from '@/lib/api';
import { checkFile } from '@/lib/attachments';
import type { PromptAttachment } from '@/components/ai/prompt-input';
import type { AttachmentInfo } from '@/state/types';

/**
 * Files staged in the composer, uploaded the moment they are picked.
 *
 * The server needs a FAL uid before the turn starts, and doing the upload at
 * send time would put a 20 MB transfer between pressing Enter and anything
 * happening. So each file is checked against its kind's cap, uploaded at once,
 * and shown in one of three states: uploading, ready, or failed with the reason.
 */
export type StagedAttachment = PromptAttachment;

export interface AttachmentsApi {
  attachments: StagedAttachment[];
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clear: () => void;
  /** The uploads a turn may reference right now. */
  ready: () => { info: AttachmentInfo[]; refs: { fileUid: number }[] };
}

let sequence = 0;

export function useAttachments(
  ensureConversation: () => Promise<number>,
  onRejected: (reason: string) => void,
): AttachmentsApi {
  const [attachments, setAttachments] = useState<StagedAttachment[]>([]);

  const patch = useCallback((id: string, changes: Partial<StagedAttachment>) => {
    setAttachments((current) => current.map((entry) => (entry.id === id ? { ...entry, ...changes } : entry)));
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      const accepted: File[] = [];
      for (const file of files) {
        const check = checkFile(file);
        if (check.ok) {
          accepted.push(file);
        } else {
          onRejected(check.reason);
        }
      }
      if (accepted.length === 0) {
        return;
      }

      void (async () => {
        let uid: number;
        try {
          uid = await ensureConversation();
        } catch (error) {
          onRejected(describeError(error));

          return;
        }

        await Promise.all(
          accepted.map(async (file) => {
            sequence += 1;
            const id = `a${sequence}`;
            setAttachments((current) => [...current, { id, file, status: 'uploading' }]);
            try {
              const info = await uploadFile(uid, file);
              patch(id, { status: 'ready', fileUid: info.fileUid });
            } catch (error) {
              patch(id, { status: 'error', error: describeError(error) });
            }
          }),
        );
      })();
    },
    [ensureConversation, onRejected, patch],
  );

  const removeFile = useCallback((id: string) => {
    setAttachments((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const clear = useCallback(() => setAttachments([]), []);

  const ready = useCallback(() => {
    const done = attachments.filter(
      (entry): entry is StagedAttachment & { fileUid: number } => entry.status === 'ready' && entry.fileUid !== undefined,
    );

    return {
      info: done.map((entry) => ({
        fileUid: entry.fileUid,
        fileName: entry.file.name,
        fileMimeType: entry.file.type,
        fileSize: entry.file.size,
      })),
      refs: done.map((entry) => ({ fileUid: entry.fileUid })),
    };
  }, [attachments]);

  return useMemo(() => ({ attachments, addFiles, removeFile, clear, ready }), [addFiles, attachments, clear, ready, removeFile]);
}
