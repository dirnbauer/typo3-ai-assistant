import { LayoutGridIcon, MessageSquarePlusIcon, MessagesSquareIcon, PanelLeftIcon, SquareIcon, TextCursorInputIcon } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useOptionalChatController } from '@/chat/chat-provider';
import { MODULES, openModule } from '@/lib/typo3';
import { formatTimestamp } from '@/lib/utils';
import type { ShellApi } from '@/shell/shell-context';

/**
 * ⌘K. Everything the shell can do without a mouse, in one searchable list:
 * start or switch a conversation, show or hide the chat, stop a run, jump to a
 * module. Available in every layout; the chat entries appear when there is a chat.
 */
export function CommandPalette({ open, onOpenChange, shell }: { open: boolean; onOpenChange: (open: boolean) => void; shell: ShellApi }) {
  const chat = useOptionalChatController();

  const run = (action: () => void) => () => {
    onOpenChange(false);
    action();
  };

  return (
    <CommandDialog description="Type to search commands and conversations" onOpenChange={onOpenChange} open={open} title="Command palette">
      <CommandInput placeholder="What do you want to do?" />
      <CommandList>
        <CommandEmpty>Nothing matches.</CommandEmpty>

        <CommandGroup heading="Chat">
          {chat === null ? (
            <CommandItem onSelect={run(shell.openChat)}>
              <MessagesSquareIcon aria-hidden="true" />
              Open the chat
            </CommandItem>
          ) : (
            <>
              <CommandItem onSelect={run(() => void chat.startNew())}>
                <MessageSquarePlusIcon aria-hidden="true" />
                New conversation
              </CommandItem>
              <CommandItem onSelect={run(shell.toggleChat)}>
                <PanelLeftIcon aria-hidden="true" />
                {shell.chatOpen ? 'Hide the chat' : 'Show the chat'}
              </CommandItem>
              <CommandItem onSelect={run(() => { shell.openChat(); shell.focusComposer(); })}>
                <TextCursorInputIcon aria-hidden="true" />
                Write a message
                <CommandShortcut>Enter sends</CommandShortcut>
              </CommandItem>
              {chat.thread.phase === 'streaming' ? (
                <CommandItem onSelect={run(chat.stop)}>
                  <SquareIcon aria-hidden="true" />
                  Stop the running turn
                  <CommandShortcut>Esc</CommandShortcut>
                </CommandItem>
              ) : null}
            </>
          )}
        </CommandGroup>

        {chat !== null && chat.conversations.conversations.length > 0 ? (
          <>
            <CommandSeparator />
            <CommandGroup heading="Switch to">
              {chat.conversations.conversations.slice(0, 12).map((conversation) => (
                <CommandItem
                  key={conversation.uid}
                  onSelect={run(() => {
                    chat.select(conversation.uid);
                    shell.openChat();
                  })}
                  value={`${conversation.title || 'Untitled conversation'} ${conversation.uid}`}
                >
                  <MessagesSquareIcon aria-hidden="true" />
                  <span className="truncate">{conversation.title || 'Untitled conversation'}</span>
                  <CommandShortcut>{formatTimestamp(conversation.lastMessageAt || conversation.createdAt)}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        ) : null}

        <CommandSeparator />
        <CommandGroup heading="Modules">
          <CommandItem onSelect={run(() => openModule(MODULES.chat))}>
            <LayoutGridIcon aria-hidden="true" />
            Open AI Chat
          </CommandItem>
          <CommandItem onSelect={run(() => openModule(MODULES.components))}>
            <LayoutGridIcon aria-hidden="true" />
            Open shadcn/ui Components
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
