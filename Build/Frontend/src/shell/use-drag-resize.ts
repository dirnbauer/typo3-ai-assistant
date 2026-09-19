import { useCallback, useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';

/**
 * A size the user can drag or arrow-key, kept inside bounds.
 *
 * The drag is tracked on the window rather than the handle: a pointer moving
 * faster than the browser repaints leaves a 6px handle behind, and a resize
 * that stops when the cursor slips off it feels broken.
 */
export interface DragResizeOptions {
  initial: number;
  min: number;
  max: () => number;
  /** Turns the pointer position into the new size. */
  fromPointer: (event: PointerEvent) => number;
  /** Arrow key that grows the size; its opposite shrinks it. */
  growKey: 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';
  onSettle?: (value: number) => void;
}

export interface DragResize {
  size: number;
  dragging: boolean;
  setSize: (value: number) => void;
  handleProps: {
    onPointerDown: (event: React.PointerEvent) => void;
    onKeyDown: (event: ReactKeyboardEvent) => void;
    'aria-valuenow': number;
    'aria-valuemin': number;
    'aria-valuemax': number;
  };
}

const OPPOSITE: Record<DragResizeOptions['growKey'], string> = {
  ArrowLeft: 'ArrowRight',
  ArrowRight: 'ArrowLeft',
  ArrowUp: 'ArrowDown',
  ArrowDown: 'ArrowUp',
};

export function useDragResize({ initial, min, max, fromPointer, growKey, onSettle }: DragResizeOptions): DragResize {
  const clamp = useCallback((value: number) => Math.min(max(), Math.max(min, Math.round(value))), [max, min]);
  const [size, setSizeState] = useState(() => clamp(initial));
  const [dragging, setDragging] = useState(false);

  const setSize = useCallback((value: number) => setSizeState(clamp(value)), [clamp]);

  useEffect(() => {
    if (!dragging) {
      return;
    }
    const move = (event: PointerEvent) => {
      event.preventDefault();
      setSizeState(clamp(fromPointer(event)));
    };
    const stop = () => setDragging(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
  }, [clamp, dragging, fromPointer]);

  useEffect(() => {
    if (!dragging) {
      onSettle?.(size);
    }
  }, [dragging, onSettle, size]);

  useEffect(() => {
    const onResize = () => setSizeState((current) => clamp(current));
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [clamp]);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent) => {
      const step = event.shiftKey ? 48 : 16;
      if (event.key === growKey) {
        event.preventDefault();
        setSizeState((current) => clamp(current + step));
      } else if (event.key === OPPOSITE[growKey]) {
        event.preventDefault();
        setSizeState((current) => clamp(current - step));
      } else if (event.key === 'Home') {
        event.preventDefault();
        setSizeState(clamp(initial));
      }
    },
    [clamp, growKey, initial],
  );

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  return {
    size,
    dragging,
    setSize,
    handleProps: { onPointerDown, onKeyDown, 'aria-valuenow': size, 'aria-valuemin': min, 'aria-valuemax': max() },
  };
}
