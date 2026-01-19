import { type ReactNode, useEffect, useRef } from 'react';
import * as S from './Popover.styled';

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
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
    <S.PopoverWrapper ref={rootRef}>
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>
      {open ? <S.Popover>{children}</S.Popover> : null}
    </S.PopoverWrapper>
  );
}
