'use client'

import { useState } from 'react'
import { FilterBar }   from '@/components/commerce/FilterBar'
import { ProductGrid } from '@/components/commerce/ProductGrid'
import type { Product, ProductFilter } from '@/types/shopify'

// ─── Props ────────────────────────────────────────────────────────────────────

interface StoreClientProps {
  initialProducts: Product[]
}

// ─── Component ────────────────────────────────────────────────────────────────
// Server-rendered initial product data (good for SEO) with client-side
// filtering so filter changes don't trigger a loading spinner.

export function StoreClient({ initialProducts }: StoreClientProps) {
  const [filter, setFilter] = useState<ProductFilter>('All')

  const filtered =
    filter === 'All'
      ? initialProducts
      : initialProducts.filter((p) => p.productType === filter)

  return (
    <div className="flex flex-col gap-10">
      <FilterBar active={filter} onChange={setFilter} />
      <ProductGrid products={filtered} />
    </div>
  )
}
