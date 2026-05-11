'use client'

import { cn } from '@/lib/utils'
import type { ProductFilter } from '@/types/shopify'

// ─── Props ────────────────────────────────────────────────────────────────────

interface FilterBarProps {
  active: ProductFilter
  onChange: (filter: ProductFilter) => void
}

const FILTERS: { label: string; value: ProductFilter }[] = [
  { label: 'All',    value: 'All'    },
  { label: 'Music',  value: 'Music'  },
  { label: 'Book',   value: 'Book'   },
  { label: 'Print',  value: 'Print'  },
  { label: 'Bundle', value: 'Bundle' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <nav aria-label="Filter products by type">
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={cn(
              'text-heading-sm px-4 py-2 rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
              active === f.value
                ? 'bg-brand-dark text-brand-cream border-brand-dark'
                : 'bg-transparent text-brand-dark border-brand-dark/30 hover:border-brand-dark',
            )}
            aria-pressed={active === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
