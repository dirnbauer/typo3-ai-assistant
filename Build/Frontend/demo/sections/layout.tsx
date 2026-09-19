import { ChevronRightIcon, FileIcon, FolderIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import { ui } from '@webconsulting/shadcn-ui/runtime.js';
import { Example, Section, type SectionProps } from '../frame';
import { EDITORS, RECENT_RECORDS } from '../fixtures';

const {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  ScrollArea,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} = ui;

export function LayoutSection({ group }: SectionProps) {
  return (
    <Section group={group}>
      <Example title="Card with tabs">
        <Card>
          <CardHeader>
            <CardTitle>About us</CardTitle>
            <CardDescription>Page 12 · /about · English</CardDescription>
            <CardAction>
              <Badge variant="secondary">Draft</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="access">Access</TabsTrigger>
              </TabsList>
              <TabsContent className="pt-3 text-muted-foreground" value="general">
                Title, navigation title and the page type. Changes here show on the next publish.
              </TabsContent>
              <TabsContent className="pt-3 text-muted-foreground" value="seo">
                Meta description is 148 characters; canonical follows the page.
              </TabsContent>
              <TabsContent className="pt-3 text-muted-foreground" value="access">
                Visible to everyone. Not scheduled.
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Save</Button>
            <Button size="sm" variant="ghost">
              Discard
            </Button>
          </CardFooter>
        </Card>
      </Example>

      <Example title="Recent records">
        <ItemGroup className="rounded-md border">
          {RECENT_RECORDS.map((record, index) => (
            <div key={`${record.table}-${record.uid}`}>
              {index > 0 ? <ItemSeparator /> : null}
              <Item size="sm">
                <ItemMedia variant="icon">{record.table === 'pages' ? <FileIcon /> : <FolderIcon />}</ItemMedia>
                <ItemContent>
                  <ItemTitle>{record.title}</ItemTitle>
                  <ItemDescription>
                    {record.table} <span className="font-mono">#{record.uid}</span> · {record.action} {record.when}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button size="icon-sm" variant="ghost">
                    <ChevronRightIcon />
                  </Button>
                </ItemActions>
              </Item>
            </div>
          ))}
        </ItemGroup>
      </Example>

      <Example title="Breadcrumb and avatars">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#layout">Site</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#layout">About us</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Team</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator className="my-4" />
        <ul className="space-y-2">
          {EDITORS.map((editor) => (
            <li className="flex items-center gap-3" key={editor.name}>
              <Avatar className="size-8">
                <AvatarFallback>{editor.initials}</AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{editor.name}</span>
                <span className="block text-muted-foreground">{editor.role}</span>
              </span>
              <span className={`size-2 rounded-full ${editor.online ? 'bg-success' : 'bg-border-strong'}`} title={editor.online ? 'Online' : 'Offline'} />
            </li>
          ))}
        </ul>
      </Example>

      <Example title="Accordion and collapsible">
        <Accordion collapsible defaultValue="routing" type="single">
          <AccordionItem value="routing">
            <AccordionTrigger>Routing</AccordionTrigger>
            <AccordionContent>Slugs are generated from the title. Two route enhancers are active: news and the site search.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="languages">
            <AccordionTrigger>Languages</AccordionTrigger>
            <AccordionContent>English is the default. German and French fall back to English for untranslated content.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="errors">
            <AccordionTrigger>Error handling</AccordionTrigger>
            <AccordionContent>404 and 403 show page 40 (Imprint) until a dedicated error page exists.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator className="my-4" />
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button size="sm" variant="outline">
              <SettingsIcon />
              Advanced settings
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 rounded-md border bg-muted/40 p-3 text-muted-foreground">
            Base variants, entry points per environment, and the Solr core the site indexes into.
          </CollapsibleContent>
        </Collapsible>
      </Example>

      <Example title="Empty state">
        <Empty className="border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon />
            </EmptyMedia>
            <EmptyTitle>No redirects yet</EmptyTitle>
            <EmptyDescription>Redirects send visitors from an old URL to a new one. Create the first one, or import a list.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button size="sm">
                <PlusIcon />
                Create redirect
              </Button>
              <Button size="sm" variant="outline">
                Import CSV
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </Example>

      <Example className="p-0" title="Scroll area">
        <ScrollArea className="h-48">
          <ul className="divide-y">
            {Array.from({ length: 24 }, (_, index) => (
              <li className="flex items-center justify-between px-4 py-2" key={index}>
                <span>
                  Content element <span className="font-mono text-muted-foreground">#{380 + index}</span>
                </span>
                <span className="text-muted-foreground">{index % 3 === 0 ? 'Text & media' : index % 3 === 1 ? 'Header' : 'Image'}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </Example>
    </Section>
  );
}
