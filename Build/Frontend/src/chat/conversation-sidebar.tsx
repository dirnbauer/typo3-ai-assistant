import { useMemo, useState } from 'react';
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  EllipsisVerticalIcon,
  PinIcon,
  PinOffIcon,
  PlusIcon,
  SearchIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, formatTimestamp } from '@/lib/utils';
import type { ConversationSummary } from '@/state/types';

/**
 * Every conversation this user owns: pinned first, then newest activity, with
 * a filter for when the list outgrows a screen. Archived rows are hidden until
 * asked for — "archive" is how a conversation gets out of the way.
 */
export type ConversationSidebarProps = {
  conversations: ConversationSummary[];
  activeUid: number;
  includeArchived: boolean;
  onSelect: (uid: number) => void;
  onCreate: () => void;
  onRename: (uid: number, title: string) => void;
  onPin: (uid: number, pinned: boolean) => void;
  onArchive: (uid: number, archived: boolean) => void;
  onDelete: (uid: number) => void;
  onIncludeArchived: (include: boolean) => void;
};

export function ConversationSidebar({
  conversations,
  activeUid,
  includeArchived,
  onSelect,
  onCreate,
  onRename,
  onPin,
  onArchive,
  onDelete,
  onIncludeArchived,
}: ConversationSidebarProps) {
  const [query, setQuery] = useState('');
  const [deleting, setDeleting] = useState<ConversationSummary | null>(null);
  // The rename dialog's subject and its draft title are one thing: opening the
  // dialog IS seeding the field, so there is nothing left to synchronise.
  const [renaming, setRenaming] = useState<{ uid: number; title: string } | null>(null);

  const ordered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return [...conversations]
      .filter((conversation) => needle === '' || (conversation.title || 'Untitled conversation').toLowerCase().includes(needle))
      .sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return a.pinned ? -1 : 1;
        }

        return (b.lastMessageAt || b.createdAt) - (a.lastMessageAt || a.createdAt);
      });
  }, [conversations, query]);

  const commitRename = () => {
    const title = renaming?.title.trim() ?? '';
    if (renaming !== null && title !== '') {
      onRename(renaming.uid, title);
    }
    setRenaming(null);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex items-center justify-between gap-2 border-b px-2.5 py-2">
        <h2 className="font-semibold">Conversations</h2>
        <Button aria-label="New conversation" onClick={onCreate} size="icon-sm" variant="ghost">
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>

      <div className="border-b px-2.5 py-2">
        <InputGroup className="h-8">
          <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Filter conversations"
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Filter…"
            value={query}
          />
        </InputGroup>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <ul className="p-1.5">
          {ordered.length === 0 ? (
            <li className="px-2 py-6 text-center text-muted-foreground">
              {query === '' ? 'No conversations yet.' : 'Nothing matches.'}
            </li>
          ) : null}
          {ordered.map((conversation) => (
            <li key={conversation.uid}>
              <div
                className={cn(
                  'group flex items-start gap-1 rounded-md px-2 py-1.5 transition-colors',
                  conversation.uid === activeUid ? 'bg-accent' : 'hover:bg-accent/60',
                )}
              >
                <button
                  aria-current={conversation.uid === activeUid ? 'true' : undefined}
                  className="min-w-0 flex-1 text-start"
                  onClick={() => onSelect(conversation.uid)}
                  type="button"
                >
                  <span className="flex items-center gap-1.5">
                    {conversation.pinned ? <PinIcon aria-label="Pinned" className="size-3 shrink-0 text-muted-foreground" /> : null}
                    <span className="truncate font-medium">{conversation.title || 'Untitled conversation'}</span>
                  </span>
                  <span className="mt-0.5 flex min-w-0 items-center gap-1.5 text-muted-foreground">
                    <span className="truncate whitespace-nowrap">
                      {formatTimestamp(conversation.lastMessageAt || conversation.createdAt)} · {conversation.messageCount}
                    </span>
                    <StatusBadge status={conversation.status} />
                    {conversation.archived ? (
                      <Badge className="shrink-0 rounded-full px-1.5 font-normal" variant="outline">
                        Archived
                      </Badge>
                    ) : null}
                  </span>
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-label={`Actions for ${conversation.title || 'this conversation'}`}
                      className="opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100"
                      size="icon-sm"
                      variant="ghost"
                    >
                      <EllipsisVerticalIcon aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setRenaming({ uid: conversation.uid, title: conversation.title })}>
                      <SquarePenIcon aria-hidden="true" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onPin(conversation.uid, !conversation.pinned)}>
                      {conversation.pinned ? <PinOffIcon aria-hidden="true" /> : <PinIcon aria-hidden="true" />}
                      {conversation.pinned ? 'Unpin' : 'Pin'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onArchive(conversation.uid, !conversation.archived)}>
                      {conversation.archived ? <ArchiveRestoreIcon aria-hidden="true" /> : <ArchiveIcon aria-hidden="true" />}
                      {conversation.archived ? 'Restore' : 'Archive'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setDeleting(conversation)} variant="destructive">
                      <Trash2Icon aria-hidden="true" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>

      <div className="border-t px-2.5 py-2">
        <Label className="gap-2 font-normal text-muted-foreground">
          <Checkbox checked={includeArchived} onCheckedChange={(checked) => onIncludeArchived(checked === true)} />
          Show archived
        </Label>
      </div>

      <Dialog onOpenChange={(open) => !open && setRenaming(null)} open={renaming !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename conversation</DialogTitle>
            <DialogDescription>The title is how you will find this conversation again.</DialogDescription>
          </DialogHeader>
          <Input
            aria-label="Conversation title"
            maxLength={255}
            onChange={(event) => {
              const title = event.currentTarget.value;
              setRenaming((current) => (current === null ? null : { ...current, title }));
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                commitRename();
              }
            }}
            value={renaming?.title ?? ''}
          />
          <DialogFooter>
            <Button onClick={() => setRenaming(null)} variant="outline">
              Cancel
            </Button>
            <Button disabled={(renaming?.title.trim() ?? '') === ''} onClick={commitRename}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog onOpenChange={(open) => !open && setDeleting(null)} open={deleting !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this conversation?</DialogTitle>
            <DialogDescription>
              “{deleting?.title || 'Untitled conversation'}” and its messages are removed from your list now and purged
              when retention passes. This cannot be undone here.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDeleting(null)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (deleting !== null) {
                  onDelete(deleting.uid);
                }
                setDeleting(null);
              }}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({ status }: { status: ConversationSummary['status'] }) {
  if (status === 'idle') {
    return null;
  }
  const label =
    status === 'processing'
      ? 'Running'
      : status === 'awaiting_approval'
        ? 'Needs approval'
        : status === 'awaiting_input'
          ? 'Has a question'
          : 'Failed';

  return (
    <Badge className="shrink-0 rounded-full px-1.5 font-normal whitespace-nowrap" variant={status === 'failed' ? 'destructive' : 'secondary'}>
      {label}
    </Badge>
  );
}
