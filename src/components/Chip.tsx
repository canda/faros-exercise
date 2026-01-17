import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/utils'
import { IconX } from './Icons'

export function Chip({
  children,
  onRemove,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { onRemove?: () => void }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-sm text-slate-700 hover:bg-slate-100',
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {onRemove ? (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded hover:bg-slate-200"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
        >
          <IconX className="h-3.5 w-3.5 text-slate-500" />
        </span>
      ) : null}
    </button>
  )
}

