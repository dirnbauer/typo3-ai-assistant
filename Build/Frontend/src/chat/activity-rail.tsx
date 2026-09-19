import { ActivityIcon, BookOpenTextIcon, GaugeIcon, ShieldQuestionMarkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChangeList } from '@/chat/changes';
import { EffectBadge } from '@/chat/effect-badge';
import { cn, formatDuration, formatNumber, toolDisplayName } from '@/lib/utils';
import type { ThreadState } from '@/state/reducer';
import type { ChatStatus } from '@/state/types';

/**
 * What the run did, what it is waiting for, and what it cost.
 *
 * The thread answers "what did it say"; this answers "what did it touch". The
 * changes come first because they are the consequence an editor is
 * accountable for; the tool calls below are how they came about.
 */
export type ActivityRailProps = {
  thread: ThreadState;
  status: ChatStatus | null;
};

export function ActivityRail({ thread, status }: ActivityRailProps) {
  const configuration = status?.configuration ?? null;
  const calls = thread.items.filter((item) => item.kind === 'tool');
  const writes = calls.filter((item) => item.kind === 'tool' && item.call.effect !== 'read_only').length;

  return (
    <Tabs className="flex h-full min-h-0 flex-col bg-background" defaultValue="activity">
      <TabsList className="m-2">
        <TabsTrigger value="activity">
          <ActivityIcon aria-hidden="true" />
          Activity
        </TabsTrigger>
        <TabsTrigger value="usage">
          <GaugeIcon aria-hidden="true" />
          Usage
        </TabsTrigger>
        <TabsTrigger value="setup">
          <BookOpenTextIcon aria-hidden="true" />
          Setup
        </TabsTrigger>
      </TabsList>

      <TabsContent className="min-h-0 flex-1" value="activity">
        <ScrollArea className="h-full">
          <div className="space-y-4 px-3 pb-4">
            {thread.pendingApproval === null ? null : (
              <section className="rounded-md border border-warning/50 bg-warning/5 px-2.5 py-2">
                <h3 className="flex items-center gap-1.5 font-semibold">
                  <ShieldQuestionMarkIcon aria-hidden="true" className="size-3.5 text-warning" />
                  Waiting for you
                </h3>
                <p className="mt-0.5 text-muted-foreground">
                  {thread.pendingApproval.calls.length} {thread.pendingApproval.calls.length === 1 ? 'call is' : 'calls are'} held
                  in the thread until you approve or deny.
                </p>
              </section>
            )}

            <section>
              <h3 className="font-semibold">Changes in this conversation</h3>
              <div className="mt-1.5">
                <ChangeList changes={thread.changes} />
              </div>
            </section>

            <section>
              <h3 className="font-semibold">Tool calls</h3>
              {calls.length === 0 ? (
                <p className="mt-1 text-muted-foreground">No tools have run in this conversation.</p>
              ) : (
                <ol className="mt-1.5 space-y-1.5">
                  {calls.map((item) =>
                    item.kind !== 'tool' ? null : (
                      <li className={cn('effect-spine rounded-sm bg-muted/60 px-2 py-1.5', `effect-${item.call.effect}`)} key={item.key}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-mono">{toolDisplayName(item.call.name)}</span>
                          <EffectBadge effect={item.call.effect} />
                        </div>
                        <p className="mt-0.5 text-muted-foreground">
                          Round {item.call.round}
                          {item.call.result === undefined
                            ? ' · running'
                            : ` · ${formatDuration(item.call.result.durationMs)}${item.call.result.isError ? ' · failed' : ''}`}
                        </p>
                      </li>
                    ),
                  )}
                </ol>
              )}
              {writes > 0 ? (
                <p className="mt-2 text-muted-foreground">
                  {writes} of {calls.length} calls changed this installation.
                </p>
              ) : null}
            </section>
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent className="min-h-0 flex-1" value="usage">
        <ScrollArea className="h-full">
          <div className="space-y-3 px-3 pb-4">
            <section>
              <h3 className="font-semibold">This turn</h3>
              <dl className="mt-1.5 space-y-1">
                <Row label="Prompt tokens" value={formatNumber(thread.usage.promptTokens)} />
                <Row label="Completion tokens" value={formatNumber(thread.usage.completionTokens)} />
                <Row label="Total" value={formatNumber(thread.usage.totalTokens)} />
              </dl>
            </section>
            <Separator />
            <section>
              <h3 className="font-semibold">Budget</h3>
              {status === null ? (
                <p className="mt-1 text-muted-foreground">Checking…</p>
              ) : status.budget.allowed ? (
                <p className="mt-1 text-muted-foreground">Within budget.{status.budget.reason === null ? '' : ` ${status.budget.reason}`}</p>
              ) : (
                <p className="mt-1 text-destructive">{status.budget.reason ?? 'The spend budget for this period is used up.'}</p>
              )}
            </section>
            <Separator />
            <section>
              <h3 className="font-semibold">Limits</h3>
              {status === null ? null : (
                <dl className="mt-1.5 space-y-1">
                  <Row
                    label="Turns left this hour"
                    value={
                      status.limits.turnsPerHour === 0
                        ? 'No limit'
                        : `${status.limits.turnsRemaining} of ${status.limits.turnsPerHour}`
                    }
                  />
                  <Row label="Running conversations" value={formatNumber(status.limits.activeConversations)} />
                  <Row label="Rounds per turn" value={String(status.limits.maxIterations)} />
                  <Row label="Message length" value={`${formatNumber(status.limits.maxMessageLength)} characters`} />
                  <Row label="Writes" value={status.features.writes ? 'Allowed with approval' : 'Every write asks'} />
                </dl>
              )}
            </section>
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent className="min-h-0 flex-1" value="setup">
        <ScrollArea className="h-full">
          <div className="space-y-3 px-3 pb-4">
            <section>
              <h3 className="font-semibold">Model</h3>
              {configuration === null ? (
                <p className="mt-1 text-muted-foreground">Not configured.</p>
              ) : (
                <p className="mt-1 text-muted-foreground">
                  {configuration.name} · {configuration.provider} · <span className="font-mono">{configuration.model}</span>
                </p>
              )}
            </section>
            <Separator />
            <section>
              <h3 className="font-semibold">
                Instructions{' '}
                <Badge className="rounded-full px-1.5 font-normal" variant="outline">
                  {status?.instructions.length ?? 0}
                </Badge>
              </h3>
              {status === null || status.instructions.length === 0 ? (
                <p className="mt-1 text-muted-foreground">No agent instructions are active for your groups.</p>
              ) : (
                <ul className="mt-1.5 space-y-1">
                  {status.instructions.map((instruction) => (
                    <li className="truncate" key={instruction.uid}>
                      {instruction.title}
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <Separator />
            <section>
              <h3 className="font-semibold">
                Tools{' '}
                <Badge className="rounded-full px-1.5 font-normal" variant="outline">
                  {status?.tools.length ?? 0}
                </Badge>
              </h3>
              <ul className="mt-1.5 space-y-1">
                {(status?.tools ?? []).map((tool) => (
                  <li className="flex items-center justify-between gap-2" key={tool.name}>
                    <span className="truncate font-mono">{toolDisplayName(tool.name)}</span>
                    <span className="flex shrink-0 items-center gap-1">
                      {tool.requiresApproval ? (
                        <Badge className="rounded-full px-1.5 font-normal" variant="secondary">
                          Asks first
                        </Badge>
                      ) : null}
                      <EffectBadge effect={tool.effect} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono">{value}</dd>
    </div>
  );
}
