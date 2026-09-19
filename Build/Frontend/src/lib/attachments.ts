/**
 * What may be attached to a message, and how large each kind may be.
 *
 * The server extracts text from these formats (plain text, PDF, DOCX, XLSX) and
 * nothing else, so the picker offers nothing else. The caps are per kind
 * because a 20 MB spreadsheet is a different proposition from a 20 MB PDF.
 */

const MB = 1024 * 1024;

export interface AttachmentKind {
  id: 'text' | 'pdf' | 'docx' | 'xlsx';
  label: string;
  mimes: readonly string[];
  extensions: readonly string[];
  maxBytes: number;
}

export const ATTACHMENT_KINDS: readonly AttachmentKind[] = [
  {
    id: 'text',
    label: 'Text',
    mimes: ['text/plain', 'text/markdown', 'text/csv'],
    extensions: ['.txt', '.md', '.csv'],
    maxBytes: 2 * MB,
  },
  { id: 'pdf', label: 'PDF', mimes: ['application/pdf'], extensions: ['.pdf'], maxBytes: 20 * MB },
  {
    id: 'docx',
    label: 'Word',
    mimes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    extensions: ['.docx'],
    maxBytes: 15 * MB,
  },
  {
    id: 'xlsx',
    label: 'Excel',
    mimes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    extensions: ['.xlsx'],
    maxBytes: 15 * MB,
  },
];

/** The `accept` attribute for the file picker. */
export function acceptAttribute(): string {
  return ATTACHMENT_KINDS.flatMap((kind) => [...kind.extensions, ...kind.mimes]).join(',');
}

export function kindOf(file: File): AttachmentKind | null {
  const name = file.name.toLowerCase();

  return (
    ATTACHMENT_KINDS.find(
      (kind) => kind.mimes.includes(file.type) || kind.extensions.some((extension) => name.endsWith(extension)),
    ) ?? null
  );
}

export type FileCheck = { ok: true; kind: AttachmentKind } | { ok: false; reason: string };

export function checkFile(file: File): FileCheck {
  const kind = kindOf(file);
  if (kind === null) {
    return {
      ok: false,
      reason: `${file.name} is not a supported file. Attach text, PDF, Word or Excel files.`,
    };
  }
  if (file.size > kind.maxBytes) {
    return { ok: false, reason: `${kind.label} files can be up to ${Math.round(kind.maxBytes / MB)} MB.` };
  }

  return { ok: true, kind };
}
