import { cn } from '@/lib/utils';
import type { DragResize } from '@/shell/use-drag-resize';

/**
 * A 6px grab strip with a 1px line in it, keyboard-operable as a separator.
 * Placed on the edge of the thing it resizes; `edge` says which.
 */
export function ResizeHandle({
  resize,
  edge,
  label,
}: {
  resize: DragResize;
  edge: 'start' | 'end' | 'top';
  label: string;
}) {
  const vertical = edge !== 'top';

  return (
    <div
      aria-label={label}
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      className={cn(
        'group absolute z-10 touch-none',
        vertical ? 'inset-y-0 w-1.5 cursor-ew-resize' : 'inset-x-0 h-1.5 cursor-ns-resize',
        edge === 'start' && 'start-0 -translate-x-1/2',
        edge === 'end' && 'end-0 translate-x-1/2',
        edge === 'top' && 'top-0 -translate-y-1/2',
      )}
      role="separator"
      tabIndex={0}
      {...resize.handleProps}
    >
      <span
        className={cn(
          'absolute bg-border transition-colors group-hover:bg-primary group-focus-visible:bg-primary',
          vertical ? 'inset-y-0 start-1/2 w-px -translate-x-1/2' : 'inset-x-0 top-1/2 h-px -translate-y-1/2',
          resize.dragging && 'bg-primary',
        )}
      />
    </div>
  );
}
