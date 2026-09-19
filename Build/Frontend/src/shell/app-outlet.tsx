import { Component, createElement, useEffect, useState, type ErrorInfo, type ReactNode } from 'react';
import { PackageOpenIcon, TriangleAlertIcon } from 'lucide-react';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Kbd } from '@/components/ui/kbd';
import { Skeleton } from '@/components/ui/skeleton';
import { registeredApps, useShadcnApp } from '@/shell/registry';
import type { ShellApi } from '@/shell/shell-context';

/**
 * The right-hand side of a module: whatever app the shell was asked for.
 *
 * Three states. The app is registered — render it, fenced so a throwing app
 * takes down its own pane and not the chat. It is not registered yet — a quiet
 * skeleton, because its module may still be loading through the import map.
 * It is still not registered after a moment — say so, name the module that
 * should have called `defineShadcnApp()`, and list the apps that did register,
 * because the most common cause is a typo in one of the two names.
 */
export function AppOutlet({ appName, props, shell }: { appName: string; props: Record<string, unknown>; shell: ShellApi }) {
  const App = useShadcnApp(appName);
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    if (App !== undefined) {
      return;
    }
    const timer = setTimeout(() => setWaited(true), 1500);

    return () => clearTimeout(timer);
  }, [App]);

  if (App === undefined) {
    return waited ? <NotRegistered appName={appName} /> : <Loading />;
  }

  // `createElement` rather than `<App/>`: the component type is looked up in
  // the registry at runtime, and writing it as JSX reads as a component
  // DEFINED during this render — which is a genuine bug elsewhere, and what
  // the rules of hooks flag here.
  return <AppErrorBoundary appName={appName}>{createElement(App, { props, shell })}</AppErrorBoundary>;
}

function Loading() {
  return (
    <div aria-busy="true" className="space-y-3 p-6">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

function NotRegistered({ appName }: { appName: string }) {
  const others = registeredApps();

  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No app is registered as “{appName}”</EmptyTitle>
        <EmptyDescription>
          The shell renders the component that calls{' '}
          <code className="rounded bg-muted px-1 py-px font-mono">defineShadcnApp(&apos;{appName}&apos;, App)</code>. Either that
          module has not been loaded — check that <code className="font-mono">ShadcnApp::$jsModule</code> names an import-map
          specifier this page loads — or the two names differ.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {others.length === 0 ? (
          <p className="text-muted-foreground">No apps have registered on this page yet.</p>
        ) : (
          <p className="flex flex-wrap items-center justify-center gap-1 text-muted-foreground">
            Registered:
            {others.map((name) => (
              <Kbd className="font-mono normal-case" key={name}>
                {name}
              </Kbd>
            ))}
          </p>
        )}
      </EmptyContent>
    </Empty>
  );
}

interface BoundaryState {
  error: Error | null;
}

class AppErrorBoundary extends Component<{ appName: string; children: ReactNode }, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[shadcn_ui] The app "${this.props.appName}" threw while rendering.`, error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.error === null) {
      return this.props.children;
    }

    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia className="text-destructive" variant="icon">
            <TriangleAlertIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>“{this.props.appName}” stopped rendering</EmptyTitle>
          <EmptyDescription>
            <span className="font-mono">{this.state.error.message}</span>
            <br />
            The chat keeps working. Details are in the browser console.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
}
