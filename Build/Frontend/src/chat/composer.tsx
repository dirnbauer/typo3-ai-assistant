import { useId } from 'react';
import { FileIcon, InfoIcon, LayoutPanelTopIcon } from 'lucide-react';
import {
  PromptInput,
  PromptInputAttachButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptAttachment,
  type PromptInputStatus,
} from '@/components/ai/prompt-input';
import { Suggestion, Suggestions } from '@/components/ai/suggestion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ComposerAttachments } from '@/chat/attachment-list';
import { acceptAttribute } from '@/lib/attachments';
import { composerState, type TurnPhase } from '@/state/reducer';
import type { ChatStatus, TurnContext } from '@/state/types';

/**
 * Where a turn starts.
 *
 * Enter sends, Shift+Enter is a newline, Escape cancels a running turn. When the
 * composer cannot accept a message it says why where the message would have
 * gone. The context chip in the footer says what "this page" will mean to the
 * model — the one fact about a turn the user cannot otherwise see.
 */
export type ComposerProps = {
  status: ChatStatus | null;
  phase: TurnPhase;
  busy: boolean;
  attachments: PromptAttachment[];
  context: TurnContext;
  onSend: (text: string) => void;
  onStop: () => void;
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  /** Shown only when the thread is empty. */
  showSuggestions: boolean;
};

export function Composer({
  status,
  phase,
  busy,
  attachments,
  context,
  onSend,
  onStop,
  onAddFiles,
  onRemoveFile,
  showSuggestions,
}: ComposerProps) {
  const hintId = useId();
  const { disabled, reason } = composerState(
    phase,
    status?.budget.allowed ?? true,
    status?.budget.reason ?? null,
    status?.available ?? true,
  );
  const submitStatus: PromptInputStatus = phase === 'streaming' ? 'streaming' : phase === 'error' ? 'error' : 'ready';
  const suggestions = showSuggestions && !disabled ? (status?.suggestions ?? []) : [];
  const maxLength = status?.limits.maxMessageLength ?? 0;
  const attachmentsEnabled = status?.features.attachments ?? true;

  return (
    <div className="border-t bg-background px-3 py-2.5">
      {suggestions.length > 0 ? (
        <Suggestions className="mb-2 w-full flex-wrap">
          {suggestions.map((suggestion) => (
            <Suggestion key={suggestion} onClick={onSend} suggestion={suggestion} />
          ))}
        </Suggestions>
      ) : null}

      <PromptInput
        accept={acceptAttribute()}
        attachments={attachments}
        onAddFiles={onAddFiles}
        onRemoveFile={onRemoveFile}
        onSubmit={(message) => onSend(message.text)}
      >
        {attachments.length > 0 ? (
          <PromptInputHeader>
            <ComposerAttachments attachments={attachments} onRemove={onRemoveFile} />
          </PromptInputHeader>
        ) : null}

        <PromptInputTextarea
          aria-describedby={reason === '' ? undefined : hintId}
          aria-label="Message"
          disabled={disabled}
          {...(maxLength > 0 ? { maxLength } : {})}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && phase === 'streaming') {
              event.preventDefault();
              onStop();
            }
          }}
          placeholder={disabled ? '' : 'Ask about this installation, or tell it what to change…'}
        />

        <PromptInputFooter>
          <PromptInputTools>
            {attachmentsEnabled ? <PromptInputAttachButton disabled={disabled} /> : null}
            <ContextChip context={context} status={status} />
          </PromptInputTools>
          <PromptInputSubmit disabled={disabled && phase !== 'streaming'} onStop={onStop} status={submitStatus} />
        </PromptInputFooter>
      </PromptInput>

      {reason === '' ? null : (
        <p className="mt-1.5 flex items-start gap-1.5 text-muted-foreground" id={hintId}>
          <InfoIcon className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          {reason}
        </p>
      )}

      {busy && phase === 'streaming' ? (
        <p className="sr-only" role="status">
          A turn is running.
        </p>
      ) : null}
    </div>
  );
}

/** What the model will be told about where the user is. Quiet, but visible. */
function ContextChip({ context, status }: { context: TurnContext; status: ChatStatus | null }) {
  const pageId = context.pageId ?? (status?.context.pageId || undefined);
  const pageTitle = status?.context.pageId === pageId ? status?.context.pageTitle : '';
  const parts: { icon: typeof FileIcon; label: string; title: string }[] = [];
  if (pageId !== undefined) {
    parts.push({ icon: FileIcon, label: pageTitle ? `${pageTitle} · ${pageId}` : `Page ${pageId}`, title: 'The page you are on is sent with your message.' });
  }
  if (context.appName !== undefined && context.appName !== '' && !context.appName.startsWith('shadcn_ui/')) {
    parts.push({ icon: LayoutPanelTopIcon, label: context.appName, title: 'This module and what it is showing are sent with your message.' });
  }
  if (parts.length === 0) {
    return null;
  }

  return (
    <span className="flex min-w-0 items-center gap-1 ps-1">
      {parts.map((part) => (
        <Tooltip key={part.label}>
          <TooltipTrigger asChild>
            <span className="inline-flex max-w-40 items-center gap-1 truncate rounded-full border px-1.5 py-px text-[0.6875rem] text-muted-foreground">
              <part.icon className="size-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{part.label}</span>
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-56">{part.title}</TooltipContent>
        </Tooltip>
      ))}
    </span>
  );
}
