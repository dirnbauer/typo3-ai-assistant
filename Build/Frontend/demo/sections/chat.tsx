import { useState } from 'react';
import { FileTextIcon, PencilIcon, SearchIcon, XIcon } from 'lucide-react';
import { ui } from '@webconsulting/shadcn-ui/runtime.js';
import { Example, Section, type SectionProps } from '../frame';
import { TRANSCRIPT } from '../fixtures';

const {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  Bubble,
  BubbleContent,
  Markdown,
  Marker,
  MarkerContent,
  MarkerIcon,
  Message,
  MessageContent,
  MessageHeader,
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
  Shimmer,
  Suggestion,
  Suggestions,
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} = ui;

/**
 * The components the chat rail is made of, shown standing still.
 *
 * An extension building its own assistant surface gets the same set from the
 * runtime; this is what each part looks like on its own.
 */
export function ChatSection({ group }: SectionProps) {
  const [suggestion, setSuggestion] = useState('');

  return (
    <Section group={group}>
      <Example title="A transcript" wide>
        <div className="space-y-4">
          {TRANSCRIPT.map((turn, index) => (
            <Message align={turn.role === 'user' ? 'end' : 'start'} key={index}>
              <MessageContent>
                {turn.role === 'user' ? null : (
                  <MessageHeader className="px-0">
                    <span>Assistant</span>
                    <span className="ms-2">09:14</span>
                  </MessageHeader>
                )}
                <Bubble align={turn.role === 'user' ? 'end' : 'start'} variant={turn.role === 'user' ? 'default' : 'ghost'}>
                  <BubbleContent>
                    {turn.role === 'user' ? <p className="whitespace-pre-wrap">{turn.text}</p> : <Markdown>{turn.text}</Markdown>}
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          ))}
          <Marker aria-live="polite" role="status">
            <MarkerIcon>
              <PencilIcon />
            </MarkerIcon>
            <MarkerContent>
              <Shimmer>Updating two links…</Shimmer>
            </MarkerContent>
          </Marker>
        </div>
      </Example>

      <Example title="A tool call">
        <Tool defaultOpen>
          <ToolHeader state="completed" title="Search" />
          <ToolContent>
            <ToolInput input={{ query: '/old-team', tables: ['tt_content'] }} />
            <ToolOutput isError={false} output="2 hits in tt_content (uid 388, uid 412)." />
          </ToolContent>
        </Tool>
      </Example>

      <Example title="Reasoning, collapsed by default">
        <Reasoning>
          <ReasoningTrigger label="Reasoning · round 2" />
          <ReasoningContent>
            The link appears in two content elements. Both point at the old slug, so both need the same replacement.
          </ReasoningContent>
        </Reasoning>
      </Example>

      <Example title="Attachments">
        <AttachmentGroup>
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Redirect-plan.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 412 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove Redirect-plan.pdf">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="uploading">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Sitemap.xlsx</AttachmentTitle>
              <AttachmentDescription>Uploading…</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </AttachmentGroup>
      </Example>

      <Example title="Openers" wide>
        <Suggestions>
          {['Show me the page tree below the site root.', 'Which pages link to /old-team?', 'What errors were logged today?'].map(
            (text) => (
              <Suggestion key={text} onClick={setSuggestion} suggestion={text} />
            ),
          )}
        </Suggestions>
        <p className="mt-3 text-muted-foreground">
          {suggestion === '' ? 'Pick one to see what the composer would receive.' : `Composer would receive: ${suggestion}`}
        </p>
      </Example>

      <Example title="Status rows">
        <div className="space-y-3">
          <Marker variant="separator">
            <MarkerContent>New conversation</MarkerContent>
          </Marker>
          <Marker>
            <MarkerIcon>
              <SearchIcon />
            </MarkerIcon>
            <MarkerContent>
              <Shimmer>Running Search…</Shimmer>
            </MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerContent>The turn was cancelled.</MarkerContent>
          </Marker>
        </div>
      </Example>
    </Section>
  );
}
