import { useMemo, useState } from 'react';

import { cn } from '../lib/utils';

export function Avatar({
  name,
  src,
  size = 28,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);
  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '?';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';
    return `${first}${last}`.toUpperCase();
  }, [name]);

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-[11px] font-semibold text-slate-600',
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={name}
    >
      {!broken && src ? (
        <img
          src={src}
          alt=''
          className='h-full w-full object-cover'
          onError={() => setBroken(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
}
