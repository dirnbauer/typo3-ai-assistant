import { useId, useState } from 'react';
import { ShieldQuestionMarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { EffectBadge } from '@/chat/effect-badge';
import { cn, toolDisplayName } from '@/lib/utils';
import type { PendingApproval, ToolDescription, ToolEffect } from '@/state/types';

/**
 * The decision.
 *
 * Shaped by one property of the protocol: the `turnDigest` travels back
 * UNCHANGED. nr-llm recomputes it from the run's live state and refuses a
 * mismatch, which stops a tab left open since yesterday from authorising calls
 * it is no longer showing. The calls are listed in full with arguments one
 * click away, because "approve" means "write to this installation".
 */
export type ApprovalCardProps = {
  approval: PendingApproval;
  tools: ToolDescription[];
  busy: boolean;
  /** `remember` asks for this conversation's auto-approve flag to be set. */
  onDecide: (approved: boolean, remember: boolean) => void;
};

export function ApprovalCard({ approval, tools, busy, onDecide }: ApprovalCardProps) {
  const [remember, setRemember] = useState(false);
  const rememberId = useId();
  const headingId = useId();

  const effectOf = (name: string): ToolEffect =>
    tools.find((tool) => tool.name === name)?.effect ?? 'non_idempotent_write';
  const count = approval.calls.length;

  return (
    <section aria-labelledby={headingId} className="sui-enter rounded-md border border-warning/50 bg-warning/5">
      <header className="flex items-start gap-2 px-3 py-2.5">
        <ShieldQuestionMarkIcon className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
        <div className="min-w-0">
          <h3 className="font-semibold" id={headingId}>
            {count} tool {count === 1 ? 'call needs' : 'calls need'} your approval
          </h3>
          <p className="mt-0.5 text-muted-foreground">The run is paused until you decide. Nothing has been written yet.</p>
        </div>
      </header>

      <Separator />

      <ul className="divide-y">
        {approval.calls.map((call) => {
          const effect = effectOf(call.name);

          return (
            <li className={cn('effect-spine px-3 py-2', `effect-${effect}`)} key={`${call.index}-${call.callId}`}>
              <Collapsible>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate font-mono font-medium">{toolDisplayName(call.name)}</span>
                    <EffectBadge effect={effect} />
                  </span>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost">
                      Arguments
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <pre className="mt-1.5 max-h-48 overflow-auto rounded-sm bg-muted px-2 py-1.5 font-mono text-[0.6875rem] leading-relaxed">
                    {JSON.stringify(call.arguments, null, 2)}
                  </pre>
                </CollapsibleContent>
              </Collapsible>
            </li>
          );
        })}
      </ul>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5">
        <Label className="gap-2 font-normal text-muted-foreground" htmlFor={rememberId}>
          <Checkbox
            checked={remember}
            disabled={busy}
            id={rememberId}
            onCheckedChange={(checked) => setRemember(checked === true)}
          />
          Remember these tools for this conversation
        </Label>
        <div className="flex items-center gap-2">
          <Button disabled={busy} onClick={() => onDecide(false, false)} size="sm" variant="outline">
            Deny
          </Button>
          <Button disabled={busy} onClick={() => onDecide(true, remember)} size="sm">
            {count === 1 ? 'Approve' : `Approve all ${count}`}
          </Button>
        </div>
      </div>
    </section>
  );
}
