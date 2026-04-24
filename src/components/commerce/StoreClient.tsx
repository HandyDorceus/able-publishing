'use client'

import { useState } from 'react'
import { FilterBar }   from '@/components/commerce/FilterBar'
import { ProductGrid } from '@/components/commerce/ProductGrid'
import type { Product, ProductFilter } from '@/lib/shopify'

// ─── Props ────────────────────────────────────────────────────────────────────

interface StoreClientProps {
  products: Product[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StoreClient({ products }: StoreClientProps) {
  const [filter, setFilter] = useState<ProductFilter | null>(null)

  const filtered = filter
    ? products.filter((p) => p.productType === filter)
    : products

  return (
    <div className="flex flex-col gap-10">
      <FilterBar value={filter} onChange={setFilter} />
      <ProductGrid
        products={filtered}
        // TODO: wire onAddToCart to useCart() hook (step 11)
      />
    </div>
  )
}
