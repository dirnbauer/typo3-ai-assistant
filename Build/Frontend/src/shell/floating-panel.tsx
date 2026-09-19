import { useCallback, useRef } from 'react';
import { ChevronUpIcon, MaximizeIcon, MinusIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChatSurface } from '@/chat/chat-surface';
import { useChatController } from '@/chat/chat-provider';
import { readNumber, writeSetting } from '@/lib/storage';
import { MODULES, openModule } from '@/lib/typo3';
import { cn } from '@/lib/utils';
import { ResizeHandle } from '@/shell/resize-handle';
import { useDragResize } from '@/shell/use-drag-resize';
import type { TurnContext } from '@/state/types';

/**
 * The toolbar surface: a card in the bottom-right corner of the backend.
 *
 * It lives in the TOP document, which is what lets it survive module
 * navigation. Minimised, it folds to its title bar so a running turn stays in
 * reach without covering the work. Width and height are remembered.
 */
const WIDTH = { key: 'panel.width', initial: 420, min: 360 };
const HEIGHT = { key: 'panel.height', initial: 640, min: 420 };

export type FloatingPanelProps = {
  minimized: boolean;
  onMinimize: (minimized: boolean) => void;
  onClose: () => void;
  context: TurnContext;
};

export function FloatingPanel({ minimized, onMinimize, onClose, context }: FloatingPanelProps) {
  const chat = useChatController();
  const panelRef = useRef<HTMLElement | null>(null);

  const width = useDragResize({
    initial: readNumber(WIDTH.key, WIDTH.initial),
    min: WIDTH.min,
    max: useCallback(() => Math.max(WIDTH.min, Math.round(window.innerWidth * 0.8)), []),
    fromPointer: useCallback((event: PointerEvent) => {
      const right = panelRef.current?.getBoundingClientRect().right ?? window.innerWidth;

      return right - event.clientX;
    }, []),
    growKey: 'ArrowLeft',
    onSettle: useCallback((value: number) => writeSetting(WIDTH.key, String(value)), []),
  });

  const height = useDragResize({
    initial: readNumber(HEIGHT.key, HEIGHT.initial),
    min: HEIGHT.min,
    max: useCallback(() => Math.max(HEIGHT.min, Math.round(window.innerHeight * 0.9)), []),
    fromPointer: useCallback((event: PointerEvent) => {
      const bottom = panelRef.current?.getBoundingClientRect().bottom ?? window.innerHeight;

      return bottom - event.clientY;
    }, []),
    growKey: 'ArrowUp',
    onSettle: useCallback((value: number) => writeSetting(HEIGHT.key, String(value)), []),
  });

  const title = chat.thread.conversation?.title || 'AI Chat';
  const waiting = chat.thread.phase === 'awaiting_approval' || chat.thread.phase === 'awaiting_input';
  const dragging = width.dragging || height.dragging;

  if (minimized) {
    return (
      <section
        aria-label="AI chat, minimised"
        className="sui-root sui-enter fixed end-4 bottom-4 z-(--z-panel) flex w-72 items-center gap-1 rounded-lg border bg-card p-1.5 shadow-lg"
      >
        <button
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1 text-start hover:bg-accent/60"
          onClick={() => onMinimize(false)}
          type="button"
        >
          {waiting || chat.thread.running ? (
            <span
              aria-hidden="true"
              className={cn('size-2 shrink-0 rounded-full', waiting ? 'bg-warning' : 'animate-pulse bg-primary')}
            />
          ) : null}
          <span className="truncate font-medium">{title}</span>
          <ChevronUpIcon aria-hidden="true" className="ms-auto size-4 shrink-0 text-muted-foreground" />
        </button>
        <Button aria-label="Close the chat" onClick={onClose} size="icon-sm" variant="ghost">
          <XIcon aria-hidden="true" />
        </Button>
      </section>
    );
  }

  return (
    <section
      aria-label="AI chat"
      className={cn(
        'sui-root sui-enter fixed end-4 bottom-4 z-(--z-panel) flex max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border bg-card shadow-2xl',
        dragging && 'select-none',
      )}
      ref={panelRef}
      style={{ width: `${width.size}px`, height: `${height.size}px` }}
    >
      <ResizeHandle edge="start" label="Resize the chat panel width" resize={width} />
      <ResizeHandle edge="top" label="Resize the chat panel height" resize={height} />
      <ChatSurface
        actions={
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Open in the AI Chat module"
                  onClick={() => {
                    if (openModule(MODULES.chat, chat.conversationUid > 0 ? `conversation=${chat.conversationUid}` : '')) {
                      onMinimize(true);
                    }
                  }}
                  size="icon-sm"
                  variant="ghost"
                >
                  <MaximizeIcon aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open in the AI Chat module</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label="Minimise the chat" onClick={() => onMinimize(true)} size="icon-sm" variant="ghost">
                  <MinusIcon aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Minimise</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label="Close the chat" onClick={onClose} size="icon-sm" variant="ghost">
                  <XIcon aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close</TooltipContent>
            </Tooltip>
          </>
        }
        context={context}
        emptyDescription="This chat can read and change this TYPO3 installation. Writes always ask first."
      />
    </section>
  );
}
