import { ArrowUpRightIcon, DatabaseIcon, FilePlus2Icon, FilePenLineIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { navigateContentFrame, recordEditUrl } from '@/lib/typo3';
import { cn, toolDisplayName } from '@/lib/utils';
import type { ChangeEntry } from '@/state/reducer';
import type { WriteKind } from '@/state/types';

/**
 * "Changes in this conversation": the records the assistant touched.
 *
 * Derived from tool results that carried a write target, never from what the
 * model SAID it did. Each row opens the record in FormEngine when the backend
 * published its URL — the shortest path from "the assistant changed page 42"
 * to seeing page 42.
 */

const KINDS: Record<WriteKind, { label: string; icon: typeof FilePlus2Icon; className: string }> = {
  created: { label: 'Created', icon: FilePlus2Icon, className: 'border-success/50 bg-success/10 text-success-foreground' },
  updated: { label: 'Updated', icon: FilePenLineIcon, className: 'border-warning/50 bg-warning/10 text-warning-foreground' },
  other: { label: 'Changed', icon: DatabaseIcon, className: 'border-border text-muted-foreground' },
};

/** `tt_content` reads as "Content element", `pages` as "Page". */
const TABLE_LABELS: Record<string, string> = {
  pages: 'Page',
  tt_content: 'Content element',
  sys_file: 'File',
  sys_file_reference: 'File reference',
  sys_category: 'Category',
  sys_redirect: 'Redirect',
  be_users: 'Backend user',
  be_groups: 'Backend group',
  fe_users: 'Website user',
};

export function tableLabel(table: string): string {
  return TABLE_LABELS[table] ?? table;
}

export function ChangeRow({ change, compact = false }: { change: ChangeEntry; compact?: boolean }) {
  const kind = KINDS[change.kind];
  const url = recordEditUrl(change.table, change.uid);

  return (
    <li className={cn('flex items-center gap-2 rounded-sm px-2 py-1.5', !compact && 'bg-muted/60')}>
      <kind.icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">
          {tableLabel(change.table)} <span className="font-mono text-muted-foreground">#{change.uid}</span>
        </span>
        {compact || change.toolName === '' ? null : (
          <span className="block truncate text-muted-foreground">by {toolDisplayName(change.toolName)}</span>
        )}
      </span>
      <Badge className={cn('shrink-0 rounded-full px-1.5 font-normal', kind.className)} variant="outline">
        {kind.label}
      </Badge>
      {url === null ? null : (
        <Button
          aria-label={`Open ${tableLabel(change.table)} ${change.uid}`}
          onClick={() => navigateContentFrame(url)}
          size="icon-xs"
          variant="ghost"
        >
          <ArrowUpRightIcon aria-hidden="true" />
        </Button>
      )}
    </li>
  );
}

export function ChangeList({ changes, compact = false }: { changes: ChangeEntry[]; compact?: boolean }) {
  if (changes.length === 0) {
    return (
      <Empty className="border-0 p-4">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <DatabaseIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle className="text-sm">Nothing changed yet</EmptyTitle>
          <EmptyDescription className="text-xs">
            Records the assistant creates or updates in this conversation appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <ol className={cn('space-y-1', compact && 'space-y-0')}>
      {changes.map((change) => (
        <ChangeRow change={change} compact={compact} key={`${change.table}:${change.uid}:${change.kind}`} />
      ))}
    </ol>
  );
}
