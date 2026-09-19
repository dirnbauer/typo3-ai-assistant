import { useState } from 'react';
import { CalendarIcon, FileIcon, LayoutGridIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { ui } from '@webconsulting/shadcn-ui/runtime.js';
import { Example, Section, type SectionProps } from '../frame';
import { PAGES } from '../fixtures';

const {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Textarea,
  toast,
} = ui;

export function OverlaysSection({ group }: SectionProps) {
  const [deleted, setDeleted] = useState(false);

  return (
    <Section group={group}>
      <Example title="Confirm a deletion">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2Icon />
              Delete page “Team”
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this page?</DialogTitle>
              <DialogDescription>
                “Team” (14) and its 6 content elements move to the recycler. Two pages link here; the links will break.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button
                onClick={() => {
                  setDeleted(true);
                  toast('Page deleted', {
                    description: 'Team (14) is in the recycler.',
                    action: { label: 'Undo', onClick: () => setDeleted(false) },
                  });
                }}
                variant="destructive"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {deleted ? <p className="mt-2 text-muted-foreground">Deleted (in this demo only).</p> : null}
      </Example>

      <Example title="Edit in a sheet">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Edit “About us”</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>About us</SheetTitle>
              <SheetDescription>Page 12 · quick edit</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 px-4">
              <div className="grid gap-2">
                <Label htmlFor="sheet-title">Title</Label>
                <Input defaultValue="About us" id="sheet-title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sheet-nav">Navigation title</Label>
                <Input defaultValue="About" id="sheet-nav" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sheet-abstract">Abstract</Label>
                <Textarea defaultValue="Who we are and what we stand for." id="sheet-abstract" />
              </div>
            </div>
            <SheetFooter>
              <Button onClick={() => toast.success('Saved', { description: 'About us (12)' })}>Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Example>

      <Example title="Popover">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon />
              Publish on…
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 space-y-3">
            <div className="space-y-1">
              <p className="font-medium">Schedule publication</p>
              <p className="text-muted-foreground">The page goes live at this time in the site's timezone.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pop-date">Date and time</Label>
              <Input defaultValue="2026-10-01T09:00" id="pop-date" type="datetime-local" />
            </div>
            <Button className="w-full" size="sm">
              Schedule
            </Button>
          </PopoverContent>
        </Popover>
      </Example>

      <Example title="Toasts">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => toast('Indexing started', { description: '412 pages queued for Solr.' })} variant="outline">
            Default
          </Button>
          <Button onClick={() => toast.success('Published', { description: 'Workspace “Autumn” is live.' })} variant="outline">
            Success
          </Button>
          <Button onClick={() => toast.warning('Cache is stale', { description: 'Clear it after the deploy.' })} variant="outline">
            Warning
          </Button>
          <Button onClick={() => toast.error('Upload failed', { description: 'The file exceeds 20 MB.' })} variant="outline">
            Error
          </Button>
        </div>
      </Example>

      <Example className="p-0" title="Command (inline, also behind ⌘K)" wide>
        <Command className="rounded-lg border-0">
          <CommandInput placeholder="Go to a page or module…" />
          <CommandList>
            <CommandEmpty>Nothing matches.</CommandEmpty>
            <CommandGroup heading="Pages">
              {PAGES.slice(0, 4).map((page) => (
                <CommandItem key={page.uid} value={`${page.title} ${page.slug}`}>
                  <FileIcon />
                  {page.title}
                  <CommandShortcut>{page.slug}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Modules">
              <CommandItem>
                <LayoutGridIcon />
                Page
              </CommandItem>
              <CommandItem>
                <SearchIcon />
                Redirects
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Example>
    </Section>
  );
}
