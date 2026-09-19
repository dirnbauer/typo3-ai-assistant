import { useState } from 'react';
import {
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  EyeOffIcon,
  PencilIcon,
  RefreshCwIcon,
  Trash2Icon,
  ZapIcon,
} from 'lucide-react';
import { ui } from '@webconsulting/shadcn-ui/runtime.js';
import { Example, Section, type SectionProps } from '../frame';

const {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Kbd,
  KbdGroup,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  toast,
} = ui;

export function ActionsSection({ group }: SectionProps) {
  const [clearing, setClearing] = useState(false);

  const clearCaches = () => {
    setClearing(true);
    setTimeout(() => {
      setClearing(false);
      toast.success('Caches cleared', { description: 'Page and frontend caches for all sites.' });
    }, 900);
  };

  return (
    <Section group={group}>
      <Example title="Variants and sizes">
        <div className="flex flex-wrap items-center gap-2">
          <Button>Save</Button>
          <Button variant="secondary">Save and close</Button>
          <Button variant="outline">Preview</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="link">View page</Button>
          <Button variant="destructive">Delete page</Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button aria-label="Edit" size="icon">
            <PencilIcon />
          </Button>
          <Button aria-label="More" size="icon-sm" variant="outline">
            <EllipsisIcon />
          </Button>
        </div>
      </Example>

      <Example title="Busy and disabled">
        <div className="flex flex-wrap items-center gap-2">
          <Button disabled={clearing} onClick={clearCaches} variant="outline">
            {clearing ? <Spinner /> : <RefreshCwIcon />}
            {clearing ? 'Clearing…' : 'Clear all caches'}
          </Button>
          <Button disabled>
            <ZapIcon />
            Publish workspace
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                Why disabled?
              </Button>
            </TooltipTrigger>
            <TooltipContent>Publishing needs the reviewer stage to be complete.</TooltipContent>
          </Tooltip>
        </div>
      </Example>

      <Example title="Badges for states">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Live</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">Workspace: Autumn</Badge>
          <Badge variant="destructive">Hidden</Badge>
          <Badge className="border-warning/50 bg-warning/10 text-warning-foreground" variant="outline">
            Needs review
          </Badge>
          <Badge className="border-success/50 bg-success/10" variant="outline">
            Published
          </Badge>
        </div>
      </Example>

      <Example title="Keyboard hints">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            Command palette
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </span>
          <span className="flex items-center gap-2">
            Send message <Kbd>Enter</Kbd>
          </span>
          <span className="flex items-center gap-2">
            New line
            <KbdGroup>
              <Kbd>Shift</Kbd>
              <Kbd>Enter</Kbd>
            </KbdGroup>
          </span>
        </div>
      </Example>

      <Example title="Record actions menu" wide>
        <div className="flex items-center justify-between rounded-md border px-3 py-2">
          <span>
            <span className="font-medium">About us</span> <span className="font-mono text-muted-foreground">#12</span>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Actions for About us" size="icon-sm" variant="ghost">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Page 12</DropdownMenuLabel>
              <DropdownMenuItem>
                <PencilIcon />
                Edit
                <DropdownMenuShortcut>E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLinkIcon />
                View in frontend
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CopyIcon />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EyeOffIcon />
                Hide
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Example>
    </Section>
  );
}
