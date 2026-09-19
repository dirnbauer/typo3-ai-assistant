import { createContext, useCallback, useContext, type ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { useChat, type ChatController } from '@/state/use-chat';
import type { TurnContext } from '@/state/types';

/**
 * One chat controller for every surface in a shell.
 *
 * The rail and the app on the right (the chat-home app, say) both read this:
 * selecting a conversation in one switches the thread in the other, because
 * there is one thread.
 */
const ChatContext = createContext<ChatController | null>(null);

export function ChatProvider({
  initialConversation,
  context,
  children,
}: {
  initialConversation: number;
  context: () => TurnContext;
  children: ReactNode;
}) {
  const notify = useCallback((message: string) => {
    toast.error(message);
  }, []);
  const chat = useChat({ initialConversation, context, notify });

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export function useChatController(): ChatController {
  const chat = useContext(ChatContext);
  if (chat === null) {
    throw new Error('useChatController() needs a shell with a chat: layout="chat-left" or variant="panel".');
  }

  return chat;
}

export function useOptionalChatController(): ChatController | null {
  return useContext(ChatContext);
}
