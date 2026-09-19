import type { ReactNode } from 'react';
import { cn, ui } from '@webconsulting/shadcn-ui/runtime.js';

const { Badge } = ui;

/**
 * A section of the showcase, as the PHP module describes it.
 *
 * The headings are NOT written here: they arrive in `props.groups` from
 * ComponentsModuleController, which is the point of the module — it is the
 * reference implementation of props travelling from a PHP controller into a
 * shadcn app, and a table of contents is a thing PHP can honestly own.
 */
export interface DemoGroup {
  id: string;
  title: string;
  description: string;
  components: string[];
}

export interface SectionProps {
  group: DemoGroup;
}

export function Section({ group, children }: SectionProps & { children: ReactNode }) {
  return (
    <section aria-labelledby={`${group.id}-title`} className="scroll-mt-4 space-y-4" id={group.id}>
      <header className="space-y-1.5">
        <h2 className="text-base font-semibold" id={`${group.id}-title`}>
          {group.title}
        </h2>
        <p className="max-w-prose text-muted-foreground">{group.description}</p>
        <p className="flex flex-wrap gap-1">
          {group.components.map((name) => (
            <Badge className="font-mono font-normal" key={name} variant="outline">
              {name}
            </Badge>
          ))}
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

export function Example({
  title,
  className,
  wide = false,
  children,
}: {
  title: string;
  className?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className={cn('min-w-0 rounded-lg border bg-card', wide && 'md:col-span-2')}>
      <figcaption className="border-b px-3 py-1.5 text-muted-foreground">{title}</figcaption>
      <div className={cn('p-4', className)}>{children}</div>
    </figure>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="max-h-96 overflow-auto rounded-md bg-muted p-3 font-mono text-[0.6875rem] leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}
