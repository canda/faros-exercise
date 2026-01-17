import { type ReactNode, useEffect, useRef } from 'react';

import { cn } from '../lib/utils';

export function Popover({
  open,
  onOpenChange,
  align = 'left',
  trigger,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  align?: 'left' | 'right';
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') onOpenChange(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (!open) return;
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      onOpenChange(false);
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, onOpenChange]);

  return (
    <div className='relative inline-block' ref={rootRef}>
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>
      {open ? (
        <div
          className={cn(
            'absolute z-50 mt-2 w-[260px] rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-900/5',
            align === 'right' ? 'right-0' : 'left-0',
            className,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
