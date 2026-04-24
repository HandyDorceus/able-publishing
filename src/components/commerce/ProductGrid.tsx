import { Grid, Col } from '@/components/layout/Grid'
import { ProductCard } from '@/components/commerce/ProductCard'
import type { Product } from '@/lib/shopify'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  onAddToCart?: (productId: string) => void
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="aspect-[2/3] w-full rounded-md bg-brand-dark/8" />
      <div className="h-3 w-16 rounded bg-brand-dark/8" />
      <div className="h-5 w-3/4 rounded bg-brand-dark/8" />
      <div className="h-4 w-1/4 rounded bg-brand-dark/8" />
      <div className="h-10 w-full rounded-full bg-brand-dark/8" />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductGrid({ products, isLoading = false, onAddToCart }: ProductGridProps) {
  // Loading state — 6 skeleton cards
  if (isLoading) {
    return (
      <Grid className="gap-y-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <Col key={i} span={4} mdSpan={4} lgSpan={4}>
            <SkeletonCard />
          </Col>
        ))}
      </Grid>
    )
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
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
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Col>
      ))}
    </Grid>
  )
}
