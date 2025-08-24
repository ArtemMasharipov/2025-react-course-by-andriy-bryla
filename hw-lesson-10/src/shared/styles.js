// Centralized Tailwind class snippets to reduce repetition
// Keep it simple to avoid over-engineering.

export const CARD_BASE =
  'w-full text-left rounded-md border px-4 py-3 text-sm transition-colors group focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900'

export const CARD_VARIANTS = {
  bus: {
    active:
      'border-blue-500 bg-blue-50 text-neutral-900 dark:border-blue-400 dark:bg-blue-900/50 dark:text-neutral-100',
    idle: 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800/60 hover:border-blue-400 hover:bg-blue-50/60 dark:hover:border-blue-400 dark:hover:bg-blue-900/30 text-neutral-800 dark:text-neutral-200',
  },
  hotel: {
    active:
      'border-emerald-600 bg-emerald-50 text-neutral-900 dark:border-emerald-400 dark:bg-emerald-900/50 dark:text-neutral-100',
    idle: 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800/60 hover:border-emerald-500 hover:bg-emerald-50/60 dark:hover:border-emerald-400 dark:hover:bg-emerald-900/30 text-neutral-800 dark:text-neutral-200',
  },
  summary: {
    bus: 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-200/60 dark:border-blue-800/50 text-neutral-900 dark:text-neutral-100',
    hotel:
      'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-200/60 dark:border-emerald-800/50 text-neutral-900 dark:text-neutral-100',
  },
}

export const BADGE_BASE =
  'text-[10px] tracking-wide uppercase px-2 py-0.5 rounded shadow-sm'
export const BADGE_VARIANTS = {
  bus: 'bg-blue-600/90 dark:bg-blue-500 text-white',
  hotel: 'bg-emerald-600/90 dark:bg-emerald-500 text-white',
}

export const SECONDARY_TEXT =
  'text-xs mt-1 text-neutral-600 dark:text-neutral-400'

export function clsx(...parts) {
  return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
}
