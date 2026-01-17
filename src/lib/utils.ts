import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function stableHash(input: string) {
  let hash = 2166136261
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function pickDeterministic<T>(key: string, options: readonly T[]) {
  if (options.length === 0) throw new Error('options must not be empty')
  const index = stableHash(key) % options.length
  return options[index]!
}

