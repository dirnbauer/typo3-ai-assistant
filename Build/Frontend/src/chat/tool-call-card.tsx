import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput, type ToolState } from '@/components/ai/tool';
import { EffectBadge } from '@/chat/effect-badge';
import { ChangeRow } from '@/chat/changes';
import { cn, formatDuration, toolDisplayName } from '@/lib/utils';
import type { ToolCallEntry } from '@/state/reducer';

/**
 * One tool call, as it happens and after it happened. Collapsed by default:
 * the interesting fact is the name and what the call will do. The result is a
 * PREVIEW — the server sends a few hundred characters on purpose.
 */
export function ToolCallCard({ call }: { call: ToolCallEntry }) {
  const state: ToolState = call.result === undefined ? 'running' : call.result.isError ? 'error' : 'completed';

  return (
    <Tool className={cn('effect-spine', `effect-${call.effect}`)}>
      <ToolHeader meta={<EffectBadge effect={call.effect} />} state={state} title={toolDisplayName(call.name)} />
      <ToolContent>
        <ToolInput input={call.arguments} />
        {call.result === undefined ? null : (
          <>
            <ToolOutput isError={call.result.isError} output={call.result.preview} />
            {call.result.writeTarget === null ? null : (
              <ul>
                <ChangeRow change={{ ...call.result.writeTarget, toolName: '' }} compact />
              </ul>
            )}
            <p className="text-muted-foreground">
              Round {call.round} · {formatDuration(call.result.durationMs)}
            </p>
          </>
        )}
      </ToolContent>
    </Tool>
  );
}
