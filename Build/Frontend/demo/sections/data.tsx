import { useEffect, useState } from 'react';
import { EyeOffIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { ui } from '@webconsulting/shadcn-ui/runtime.js';
import { Example, Section, type SectionProps } from '../frame';
import { PAGES } from '../fixtures';

const {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Checkbox,
  Progress,
  Skeleton,
  Spinner,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} = ui;

export function DataSection({ group }: SectionProps) {
  const [progress, setProgress] = useState(64);
  const [selected, setSelected] = useState<number[]>([12]);

  useEffect(() => {
    const timer = setInterval(() => setProgress((value) => (value >= 100 ? 8 : value + 4)), 900);

    return () => clearInterval(timer);
  }, []);

  const toggle = (uid: number) =>
    setSelected((current) => (current.includes(uid) ? current.filter((entry) => entry !== uid) : [...current, uid]));

  return (
    <Section group={group}>
      <Example className="p-0" title="Pages" wide>
        <Table>
          <TableCaption>{selected.length} of {PAGES.length} pages selected</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <span className="sr-only">Select</span>
              </TableHead>
              <TableHead className="w-14">uid</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead className="text-end">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAGES.map((page) => (
              <TableRow data-state={selected.includes(page.uid) ? 'selected' : undefined} key={page.uid}>
                <TableCell>
                  <Checkbox aria-label={`Select ${page.title}`} checked={selected.includes(page.uid)} onCheckedChange={() => toggle(page.uid)} />
                </TableCell>
                <TableCell className="font-mono text-muted-foreground">{page.uid}</TableCell>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell className="font-mono">{page.slug}</TableCell>
                <TableCell>{page.doktype}</TableCell>
                <TableCell>
                  {page.hidden ? (
                    <Badge className="gap-1" variant="outline">
                      <EyeOffIcon />
                      Hidden
                    </Badge>
                  ) : (
                    <Badge className="border-success/50 bg-success/10" variant="outline">
                      Visible
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-end text-muted-foreground">{page.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Example>

      <Example title="Progress">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Indexing site “Main”</span>
            <span className="font-mono text-muted-foreground">{progress}%</span>
          </div>
          <Progress aria-label="Indexing progress" value={progress} />
          <p className="text-muted-foreground">{Math.round((412 * progress) / 100)} of 412 pages sent to Solr.</p>
        </div>
        <div className="mt-6 flex items-center gap-2 text-muted-foreground">
          <Spinner />
          Waiting for the scheduler…
        </div>
      </Example>

      <Example title="Skeleton while loading">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </Example>

      <Example title="Alerts" wide>
        <div className="grid gap-3 md:grid-cols-2">
          <Alert>
            <InfoIcon />
            <AlertTitle>You are in workspace “Autumn”</AlertTitle>
            <AlertDescription>Changes are staged for review and are not visible to visitors until published.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>The Solr core is unreachable</AlertTitle>
            <AlertDescription>Search results may be stale. The index queue keeps the changes until the connection is back.</AlertDescription>
          </Alert>
        </div>
      </Example>
    </Section>
  );
}
