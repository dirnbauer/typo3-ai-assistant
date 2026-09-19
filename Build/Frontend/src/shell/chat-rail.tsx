import { useCallback, useRef } from 'react';
import { MessageSquareTextIcon, PanelLeftCloseIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChatSurface } from '@/chat/chat-surface';
import { useChatController } from '@/chat/chat-provider';
import { readNumber, writeSetting } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { ResizeHandle } from '@/shell/resize-handle';
import { useDragResize } from '@/shell/use-drag-resize';
import type { TurnContext } from '@/state/types';

/**
 * The chat, as the left column of a module.
 *
 * Resizable between 320 and 480px and collapsible to a strip; both are
 * remembered, because a rail the user narrowed once should still be that
 * narrow in the next module. The strip keeps one signal alive: a dot when the
 * run is waiting for the user, so a collapsed rail cannot hide a question.
 */
export const RAIL_MIN = 320;
export const RAIL_MAX = 480;
export const RAIL_DEFAULT = 380;
const WIDTH_KEY = 'rail.width';

export type ChatRailProps = {
  collapsed: boolean;
  onToggle: () => void;
  context: TurnContext;
};

export function ChatRail({ collapsed, onToggle, context }: ChatRailProps) {
  const chat = useChatController();
  const asideRef = useRef<HTMLElement | null>(null);

  const resize = useDragResize({
    initial: readNumber(WIDTH_KEY, RAIL_DEFAULT),
    min: RAIL_MIN,
    max: useCallback(() => Math.max(RAIL_MIN, Math.min(RAIL_MAX, Math.round(window.innerWidth * 0.6))), []),
    fromPointer: useCallback((event: PointerEvent) => {
      const left = asideRef.current?.getBoundingClientRect().left ?? 0;

      return event.clientX - left;
    }, []),
    growKey: 'ArrowRight',
    onSettle: useCallback((value: number) => writeSetting(WIDTH_KEY, String(value)), []),
  });

  const waiting = chat.thread.phase === 'awaiting_approval' || chat.thread.phase === 'awaiting_input';

  if (collapsed) {
    return (
      <aside aria-label="AI chat, collapsed" className="flex w-11 shrink-0 flex-col items-center border-e bg-background py-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-label="Open the chat" className="relative" onClick={onToggle} size="icon-sm" variant="ghost">
              <MessageSquareTextIcon aria-hidden="true" />
              {waiting ? (
                <span aria-hidden="true" className="absolute end-1 top-1 size-2 rounded-full bg-warning ring-2 ring-background" />
              ) : null}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{waiting ? 'The chat is waiting for you' : 'Open the chat'}</TooltipContent>
        </Tooltip>
      </aside>
    );
  }

  return (
    <aside
      aria-label="AI chat"
      className={cn('relative shrink-0 border-e', resize.dragging ? 'select-none' : 'transition-[width] duration-150 ease-out')}
      ref={asideRef}
      style={{ width: `${resize.size}px` }}
    >
      <ChatSurface
        actions={
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Collapse the chat" onClick={onToggle} size="icon-sm" variant="ghost">
                <PanelLeftCloseIcon aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Collapse</TooltipContent>
          </Tooltip>
        }
        context={context}
        emptyDescription="Ask a question about this installation, or describe a change. Every write asks for your approval first."
      />
      <ResizeHandle edge="end" label="Resize the chat" resize={resize} />
    </aside>
  );
}
