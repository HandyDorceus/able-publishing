import { Grid, Col } from '@/components/layout/Grid'
import { ProductCard } from '@/components/commerce/ProductCard'
import type { Product } from '@/types/shopify'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="aspect-[3/4] w-full rounded-md bg-brand-dark/8" />
      <div className="h-3 w-16 rounded bg-brand-dark/8" />
      <div className="h-5 w-3/4 rounded bg-brand-dark/8" />
      <div className="h-4 w-1/4 rounded bg-brand-dark/8" />
      <div className="h-10 w-full rounded-full bg-brand-dark/8" />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <Grid className="gap-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <Col key={i} span={4} mdSpan={4} lgSpan={4}>
            <SkeletonCard />
          </Col>
        ))}
      </Grid>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-dark/20"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
        <p className="text-display-md text-brand-dark/20">No products found</p>
        <p className="text-body-md text-brand-dark/50">
          Check back soon — new releases are on the way.
        </p>
      </div>
    )
  }

  return (
    <Grid className="gap-y-12">
      {products.map((product) => (
        <Col key={product.id} span={4} mdSpan={4} lgSpan={4}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Grid>
  )
}
