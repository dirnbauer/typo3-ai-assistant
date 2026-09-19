import type { ReactNode } from 'react';
import { HistoryIcon, PlusIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChangeList } from '@/chat/changes';
import { useChatController } from '@/chat/chat-provider';
import { Composer } from '@/chat/composer';
import { ErrorBanner } from '@/chat/error-banner';
import { Thread } from '@/chat/thread';
import { MODULES, openModule } from '@/lib/typo3';
import { formatTimestamp } from '@/lib/utils';
import type { TurnContext } from '@/state/types';

/**
 * The chat, wherever it is placed.
 *
 * The rail, the floating panel and (through the module) the AI Chat module all
 * render this: a header with the conversation's title and the two actions a
 * chat always needs (new, switch), the banners, the thread and the composer.
 * Containers add their own chrome around it — collapse, close, resize — and
 * nothing else, so the three placements cannot drift apart.
 */
export type ChatSurfaceProps = {
  context: TurnContext;
  /** Rendered at the end of the header, after the built-in actions. */
  actions?: ReactNode;
  emptyDescription: string;
};

export function ChatSurface({ context, actions, emptyDescription }: ChatSurfaceProps) {
  const chat = useChatController();
  const title = chat.thread.conversation?.title || 'AI Chat';
  const changes = chat.thread.changes.length;

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <header className="flex items-center gap-1 border-b px-2.5 py-2">
        <h2 className="min-w-0 flex-1 truncate font-semibold" title={title}>
          {title}
        </h2>

        {changes === 0 ? null : (
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button aria-label={`${changes} changes in this conversation`} className="h-7 gap-1 px-1.5" size="sm" variant="ghost">
                    <Badge className="rounded-full px-1.5 font-normal" variant="secondary">
                      {changes}
                    </Badge>
                    <span className="text-muted-foreground">changed</span>
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Records this conversation changed</TooltipContent>
            </Tooltip>
            <PopoverContent align="end" className="w-80 p-2">
              <p className="mb-1.5 px-2 font-semibold">Changes in this conversation</p>
              <ChangeList changes={chat.thread.changes} />
            </PopoverContent>
          </Popover>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-label="New conversation" onClick={() => void chat.startNew()} size="icon-sm" variant="ghost">
              <PlusIcon aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>New conversation</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button aria-label="Switch conversation" size="icon-sm" variant="ghost">
                  <HistoryIcon aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Recent conversations</TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Recent conversations</DropdownMenuLabel>
            {chat.conversations.conversations.length === 0 ? (
              <DropdownMenuItem disabled>No conversations yet</DropdownMenuItem>
            ) : (
              chat.conversations.conversations.slice(0, 8).map((conversation) => (
                <DropdownMenuItem
                  className="flex-col items-start gap-0"
                  key={conversation.uid}
                  onSelect={() => chat.select(conversation.uid)}
                >
                  <span className="w-full truncate font-medium">{conversation.title || 'Untitled conversation'}</span>
                  <span className="text-muted-foreground">
                    {formatTimestamp(conversation.lastMessageAt || conversation.createdAt)} · {conversation.messageCount} messages
                  </span>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => openModule(MODULES.chat, chat.conversationUid > 0 ? `conversation=${chat.conversationUid}` : '')}>
              All conversations…
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {actions}
      </header>

      {chat.statusError === null ? null : <ErrorBanner message={chat.statusError} />}
      {chat.thread.error === null ? null : <ErrorBanner message={chat.thread.error} onDismiss={chat.dismissError} />}
      {(chat.status?.issues ?? []).map((issue) => (
        <ErrorBanner key={issue} message={issue} />
      ))}

      <Thread
        busy={chat.busy}
        emptyDescription={emptyDescription}
        onAnswer={chat.answer}
        onDecide={chat.decide}
        thread={chat.thread}
        tools={chat.status?.tools ?? []}
      />

      <Composer
        attachments={chat.attachments}
        busy={chat.busy}
        context={context}
        onAddFiles={chat.addFiles}
        onRemoveFile={chat.removeFile}
        onSend={chat.send}
        onStop={chat.stop}
        phase={chat.thread.phase}
        showSuggestions={chat.thread.items.length === 0}
        status={chat.status}
      />
    </div>
  );
}
