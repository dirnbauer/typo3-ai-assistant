import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ChatProvider } from '@/chat/chat-provider';
import { PortalContainerProvider } from '@/lib/portal';
import { readBoolean, writeBoolean } from '@/lib/storage';
import type { Theme } from '@/lib/theme';
import { ajaxUrls, backendLanguage, backendUser, currentPageId } from '@/lib/typo3';
import { AppOutlet } from '@/shell/app-outlet';
import { ChatRail } from '@/shell/chat-rail';
import { CommandPalette } from '@/shell/command-palette';
import { FloatingPanel } from '@/shell/floating-panel';
import { ShellProvider, Typo3Provider, type ShellApi, type ShellLayout, type Typo3Context } from '@/shell/shell-context';
import type { TurnContext } from '@/state/types';

/**
 * The React tree under `<shadcn-ui-shell>`.
 *
 * Two variants and one implementation: `layout` is a module (chat rail on the
 * left, the app on the right, or the app alone), `panel` is the floating chat in
 * the top document. Both get the same providers, the same palette and the same
 * keyboard handling; the variant changes what is arranged, not how it behaves.
 */
export const OPEN_CHAT_EVENT = 'shadcn-ui:open-chat';

const RAIL_COLLAPSED_KEY = 'rail.collapsed';
const PANEL_MINIMIZED_KEY = 'panel.minimized';

export type ShellProps = {
  variant: 'layout' | 'panel';
  layout: ShellLayout;
  appName: string;
  appProps: Record<string, unknown>;
  initialConversation: number;
  theme: Theme;
  /** The in-shadow node Radix portals render into. */
  portal: HTMLElement | null;
  /** Where keyboard shortcuts are heard: the shadow root. */
  root: ShadowRoot | Document | null;
  onClose: () => void;
};

export function Shell({ variant, layout, appName, appProps, initialConversation, theme, portal, root, onClose }: ShellProps) {
  const [railCollapsed, setRailCollapsed] = useState(() => readBoolean(RAIL_COLLAPSED_KEY, false));
  const [panelMinimized, setPanelMinimized] = useState(() => readBoolean(PANEL_MINIMIZED_KEY, false));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const appContext = useRef<Record<string, unknown>>({});

  const hasChat = variant === 'panel' || layout === 'chat-left';
  const chatOpen = variant === 'panel' ? !panelMinimized : layout === 'chat-left' && !railCollapsed;

  const setRail = useCallback((collapsed: boolean) => {
    setRailCollapsed(collapsed);
    writeBoolean(RAIL_COLLAPSED_KEY, collapsed);
  }, []);
  const setPanel = useCallback((minimized: boolean) => {
    setPanelMinimized(minimized);
    writeBoolean(PANEL_MINIMIZED_KEY, minimized);
  }, []);

  const openChat = useCallback(() => {
    if (variant === 'panel') {
      setPanel(false);
    } else if (layout === 'chat-left') {
      setRail(false);
    } else {
      // A full-width module has no rail; ask the top document for the floating panel.
      try {
        (window.top ?? window).document.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
      } catch {
        // Cross-origin top frame: nothing to open.
      }
    }
  }, [layout, setPanel, setRail, variant]);

  const closeChat = useCallback(() => {
    if (variant === 'panel') {
      setPanel(true);
    } else {
      setRail(true);
    }
  }, [setPanel, setRail, variant]);

  const focusComposer = useCallback(() => {
    requestAnimationFrame(() => root?.querySelector<HTMLTextAreaElement>('textarea[name="message"]')?.focus());
  }, [root]);

  const shell = useMemo<ShellApi>(
    () => ({
      layout,
      chatOpen,
      openChat,
      closeChat,
      toggleChat: () => (chatOpen ? closeChat() : openChat()),
      setContext: (context) => {
        appContext.current = context;
      },
      openCommandPalette: () => setPaletteOpen(true),
      focusComposer,
    }),
    [chatOpen, closeChat, focusComposer, layout, openChat],
  );

  const typo3 = useMemo<Typo3Context>(
    () => ({ ajaxUrls: ajaxUrls(), lang: backendLanguage(), theme, user: backendUser() }),
    [theme],
  );

  // What every turn carries. Read at send time, so `setContext()` needs no re-render.
  const turnContext = useCallback((): TurnContext => {
    const pageId = currentPageId();

    return {
      ...(variant === 'panel' ? {} : { appName }),
      ...(Object.keys(appContext.current).length > 0 ? { appContext: appContext.current } : {}),
      ...(pageId === undefined ? {} : { pageId }),
    };
  }, [appName, variant]);
  // What the composer's context chip SHOWS. Only the two facts the user can
  // check for themselves: the app's own context object is sent but not
  // displayed, and reading it here would mean reading a ref during render.
  const visibleContext = useMemo<TurnContext>(() => {
    const pageId = currentPageId();

    return {
      ...(variant === 'panel' ? {} : { appName }),
      ...(pageId === undefined ? {} : { pageId }),
    };
  }, [appName, variant]);

  // ⌘K / Ctrl+K opens the palette while focus is inside the shell. TYPO3's own
  // live search owns the same keys outside it, which is the right split.
  useEffect(() => {
    if (root === null) {
      return;
    }
    const onKeyDown = (event: Event) => {
      if (!(event instanceof KeyboardEvent) || event.defaultPrevented) {
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        event.stopPropagation();
        setPaletteOpen((open) => !open);
      } else if (event.key === 'Escape' && variant === 'panel' && !paletteOpen) {
        // A dialog inside the panel owns Escape first; Radix stops propagation
        // while one is open, so reaching here means nothing else wanted it.
        onClose();
      }
    };
    root.addEventListener('keydown', onKeyDown);

    return () => root.removeEventListener('keydown', onKeyDown);
  }, [onClose, paletteOpen, root, variant]);

  const body =
    variant === 'panel' ? (
      <FloatingPanel context={visibleContext} minimized={panelMinimized} onClose={onClose} onMinimize={setPanel} />
    ) : (
      <div className="sui-root flex h-full min-h-0 w-full">
        {layout === 'chat-left' ? <ChatRail collapsed={railCollapsed} context={visibleContext} onToggle={() => setRail(!railCollapsed)} /> : null}
        <main className="min-h-0 min-w-0 flex-1 overflow-auto">
          <AppOutlet appName={appName} props={appProps} shell={shell} />
        </main>
      </div>
    );

  const tree = (
    <>
      {body}
      <CommandPalette onOpenChange={setPaletteOpen} open={paletteOpen} shell={shell} />
      <Toaster position={variant === 'panel' ? 'bottom-center' : 'bottom-right'} theme={theme} />
    </>
  );

  return (
    <Typo3Provider value={typo3}>
      <PortalContainerProvider container={portal}>
        <TooltipProvider delayDuration={400}>
          <ShellProvider value={shell}>
            {hasChat ? (
              <ChatProvider context={turnContext} initialConversation={initialConversation}>
                {tree}
              </ChatProvider>
            ) : (
              tree
            )}
          </ShellProvider>
        </TooltipProvider>
      </PortalContainerProvider>
    </Typo3Provider>
  );
}
