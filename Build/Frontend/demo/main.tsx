import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { defineShadcnApp, ui, type AppProps } from '@webconsulting/shadcn-ui/runtime.js';
import type { DemoGroup, SectionProps } from './frame';
import { ActionsSection } from './sections/actions';
import { ChatSection } from './sections/chat';
import { DataSection } from './sections/data';
import { FormsSection } from './sections/forms';
import { LayoutSection } from './sections/layout';
import { OverlaysSection } from './sections/overlays';

/**
 * `shadcn_ui/components` — the showcase, and the reference implementation of an
 * app built on the base.
 *
 * It is built by `vite.demo.config.ts` exactly the way a third-party extension
 * builds: React, ReactDOM and every component are imported from
 * `@webconsulting/shadcn-ui/runtime.js` and none of them are bundled here. If
 * this module renders, the contract in CONTRACT.md holds.
 */

const { Badge, Button, ScrollArea, Toaster } = ui;

const SECTIONS: Record<string, ComponentType<SectionProps>> = {
  actions: ActionsSection,
  layout: LayoutSection,
  forms: FormsSection,
  data: DataSection,
  overlays: OverlaysSection,
  chat: ChatSection,
};

function ComponentsApp({ props, shell }: AppProps) {
  const groups = useMemo(() => readGroups(props.groups), [props.groups]);
  const [active, setActive] = useState(groups[0]?.id ?? '');

  // The chat rail shares the module with this app; telling it what is on
  // screen is the whole point of `shell.setContext()`.
  useEffect(() => {
    shell.setContext({ view: 'components', section: active });
  }, [shell, active]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-3">
        <h1 className="text-base font-semibold">shadcn/ui components</h1>
        <Badge variant="secondary">{countComponents(groups)} components</Badge>
        <p className="text-muted-foreground">Every component the runtime ships, in a TYPO3 backend module.</p>
        <Button className="ms-auto" onClick={shell.openChat} size="sm" variant="outline">
          Ask the assistant
        </Button>
      </header>

      <div className="flex min-h-0 flex-1">
        <nav aria-label="Sections" className="hidden w-44 shrink-0 border-e p-3 md:block">
          <ul className="space-y-0.5">
            {groups.map((group) => (
              <li key={group.id}>
                <a
                  aria-current={active === group.id ? 'true' : undefined}
                  className="block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-[current]:bg-accent aria-[current]:text-accent-foreground"
                  href={`#${group.id}`}
                  onClick={() => setActive(group.id)}
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ScrollArea className="min-w-0 flex-1">
          <div className="space-y-10 p-4 pb-16">
            {groups.length === 0 ? (
              <p className="text-muted-foreground">This module was rendered without any groups.</p>
            ) : (
              groups.map((group) => {
                const Section = SECTIONS[group.id];

                return Section === undefined ? null : <Section group={group} key={group.id} />;
              })
            )}
          </div>
        </ScrollArea>
      </div>

      <Toaster />
    </div>
  );
}

/**
 * `props` crosses a JSON boundary, so it arrives as `unknown` and is read once,
 * here. A group the app has no section for is dropped rather than rendered
 * empty.
 */
function readGroups(value: unknown): DemoGroup[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const groups: DemoGroup[] = [];
  for (const entry of value) {
    if (typeof entry !== 'object' || entry === null) {
      continue;
    }
    const group = entry as Record<string, unknown>;
    const id = typeof group.id === 'string' ? group.id : '';
    if (!(id in SECTIONS)) {
      continue;
    }
    groups.push({
      id,
      title: typeof group.title === 'string' ? group.title : id,
      description: typeof group.description === 'string' ? group.description : '',
      components: Array.isArray(group.components) ? group.components.filter((name): name is string => typeof name === 'string') : [],
    });
  }

  return groups;
}

function countComponents(groups: DemoGroup[]): number {
  return new Set(groups.flatMap((group) => group.components)).size;
}

defineShadcnApp('shadcn_ui/components', ComponentsApp);
