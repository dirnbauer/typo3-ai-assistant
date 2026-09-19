import { createContext, useContext, type ReactNode } from 'react';

/**
 * Where Radix may put a floating layer.
 *
 * Every Radix portal defaults to `document.body`, which is OUTSIDE the shadow
 * root and outside this bundle's stylesheet: an unstyled menu floating over the
 * backend. The shell hands every portal a node inside its own shadow root, and
 * this context is how that node reaches the components. `null` means "no
 * container", which is what a unit test rendering one component gets.
 */
const PortalContainerContext = createContext<HTMLElement | null>(null);

export function PortalContainerProvider({
  container,
  children,
}: {
  container: HTMLElement | null;
  children: ReactNode;
}) {
  return <PortalContainerContext.Provider value={container}>{children}</PortalContainerContext.Provider>;
}

export function usePortalContainer(): HTMLElement | undefined {
  return useContext(PortalContainerContext) ?? undefined;
}
