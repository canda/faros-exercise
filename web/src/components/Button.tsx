import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

export function Button({
  className,
  variant = 'secondary',
  size = 'md',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        size === 'sm' ? 'h-8 px-3' : 'h-9 px-3.5',
        variant === 'primary' &&
          'border-sky-700 bg-sky-800 text-white hover:bg-sky-700 hover:border-sky-600',
        variant === 'secondary' &&
          'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300',
        variant === 'ghost' && 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100',
        className,
      )}
      {...props}
    />
  )
}

