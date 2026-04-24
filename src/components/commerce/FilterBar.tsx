'use client'

import { cn } from '@/lib/utils'
import type { ProductFilter } from '@/lib/shopify'

// ─── Props ────────────────────────────────────────────────────────────────────

interface FilterBarProps {
  value: ProductFilter | null
  onChange: (filter: ProductFilter | null) => void
}

const FILTERS: { label: string; value: ProductFilter }[] = [
  { label: 'Books',   value: 'Books'   },
  { label: 'Music',   value: 'Music'   },
  { label: 'Digital', value: 'Digital' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter products">

      {/* All — clears the active filter */}
      <button
        onClick={() => onChange(null)}
        className={cn(
          'text-heading-sm px-4 py-2 rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
          value === null
            ? 'bg-brand-dark text-brand-cream border-brand-dark'
            : 'bg-transparent text-brand-dark border-brand-dark/30 hover:border-brand-dark',
        )}
        aria-pressed={value === null}
      >
        All
      </button>

      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value === value ? null : f.value)}
          className={cn(
            'text-heading-sm px-4 py-2 rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
            value === f.value
              ? 'bg-brand-dark text-brand-cream border-brand-dark'
              : 'bg-transparent text-brand-dark border-brand-dark/30 hover:border-brand-dark',
          )}
          aria-pressed={value === f.value}
        >
          {f.label}
        </button>
      ))}

    </div>
  )
}
