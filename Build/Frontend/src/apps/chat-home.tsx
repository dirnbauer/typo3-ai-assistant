import { useEffect } from 'react';
import { ActivityRail } from '@/chat/activity-rail';
import { useChatController } from '@/chat/chat-provider';
import { ConversationSidebar } from '@/chat/conversation-sidebar';
import type { AppProps } from '@/shell/registry';

/**
 * The AI Chat module's right-hand side: `shadcn_ui/chat-home`.
 *
 * The chat itself is the rail on the left, like in every shadcn module. What
 * the module adds is room: every conversation, and what the current one did.
 * `props.conversation` (from `?conversation=` on the module URL) opens a
 * conversation the toolbar panel handed over.
 */
export function ChatHome({ props }: AppProps) {
  const chat = useChatController();
  const requested = typeof props.conversation === 'number' ? props.conversation : Number(props.conversation ?? 0);

  useEffect(() => {
    if (Number.isFinite(requested) && requested > 0) {
      chat.select(requested);
    }
    // Only the conversation the URL asked for, once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requested]);

  return (
    <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]">
      <div className="min-h-0 border-e">
        <ConversationSidebar
          activeUid={chat.conversationUid}
          conversations={chat.conversations.conversations}
          includeArchived={chat.conversations.includeArchived}
          onArchive={(uid, archived) => void chat.conversations.setArchived(uid, archived)}
          onCreate={() => void chat.startNew()}
          onDelete={(uid) => void chat.conversations.remove(uid)}
          onIncludeArchived={chat.conversations.setIncludeArchived}
          onPin={(uid, pinned) => void chat.conversations.setPinned(uid, pinned)}
          onRename={(uid, title) => void chat.conversations.rename(uid, title)}
          onSelect={chat.select}
        />
      </div>
      <div className="hidden min-h-0 md:block">
        <ActivityRail status={chat.status} thread={chat.thread} />
      </div>
    </div>
  );
}
