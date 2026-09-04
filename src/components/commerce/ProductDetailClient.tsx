'use client'

import Link        from 'next/link'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types/shopify'

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { title, productType, description, price, compareAtPrice, currencyCode, isPreorder, availableForSale, variants } = product
  const firstVariant = variants[0]

  async function handleAddToCart() {
    if (!firstVariant) return
    await addItem(firstVariant.id)
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-2">
        <span className="text-heading-sm text-brand-gold">{productType}</span>
        {isPreorder && (
          <span className="text-heading-sm text-brand-cream bg-brand-gold px-2 py-0.5 rounded-full self-start">
            Pre-order
          </span>
        )}
        <h1 className="text-display-lg text-brand-dark">{title}</h1>
      </div>

      <p className="text-body-lg text-brand-dark font-medium flex items-center gap-3">
        <span>{formatPrice(price, currencyCode)}</span>
        {compareAtPrice && (
          <span className="line-through text-brand-dark/40 text-body-md">
            {formatPrice(compareAtPrice, currencyCode)}
          </span>
        )}
      </p>

      {description && (
        <p className="text-body-md text-brand-dark/70 max-w-prose">{description}</p>
      )}

      {availableForSale ? (
        <button
          className="btn-primary self-start"
          onClick={handleAddToCart}
          aria-label={isPreorder ? `Pre-order ${title}` : `Add ${title} to cart`}
        >
          {isPreorder ? 'Pre-order Now' : 'Add to Cart'}
        </button>
      ) : (
        <button className="btn-secondary self-start" disabled>
          Out of Stock
        </button>
      )}

      <Link href="/store" className="text-body-sm text-brand-dark/50 hover:text-brand-dark transition-colors">
        ← Back to Store
      </Link>

    </div>
  )
}
