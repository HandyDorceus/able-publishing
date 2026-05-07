'use client'

import { useEffect, useState } from 'react'
import { getAllProducts } from '@/lib/shopify'
import type { Product, ProductFilter } from '@/types/shopify'
export { useCart } from '@/context/CartContext'

// ── useProducts ───────────────────────────────────────────────────────────────
// Use this hook only when client-side filtering/refetching is needed.
// For the store page, prefer fetching getAllProducts() directly in a
// React Server Component and passing products as props to StoreClient.

export function useProducts(filter?: ProductFilter) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    getAllProducts(filter)
      .then((data) => { if (!cancelled) setProducts(data) })
      .catch((err) => { if (!cancelled) setError(err) })
      .finally(() => { if (!cancelled) setIsLoading(false) })

    return () => { cancelled = true }
  }, [filter])

  return { products, isLoading, error }
}
