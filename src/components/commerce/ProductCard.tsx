'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/shopify'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { id, title, handle, productType, priceRange, images, isPreorder } = product
  const image    = images[0] ?? null
  const price    = priceRange.minVariantPrice
  const href     = `/store/${handle}`

  return (
    <article className="relative flex flex-col gap-4 group">

      {/* ABLE Records badge — music products only */}
      {productType === 'Music' && (
        <div className="absolute top-3 right-3 z-10">
          <Image
            src="/logos/able-publishing/ABLE_Records-copy.png"
            alt="ABLE Records"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        </div>
      )}

      {/* Cover image */}
      <Link
        href={href}
        className="block relative overflow-hidden rounded-md bg-brand-dark/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        aria-label={`View ${title}`}
        tabIndex={-1}
      >
        <div className={cn(
          'relative w-full',
          productType === 'Books' ? 'aspect-[2/3]' : 'aspect-square',
        )}>
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            /* Placeholder when no image is set */
            <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/5">
              <span className="text-heading-sm text-brand-dark/30">{productType}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Type badge + pre-order */}
      <div className="flex items-center gap-3">
        <span className="text-heading-sm text-brand-gold">{productType}</span>
        {isPreorder && (
          <span className="text-heading-sm text-brand-cream bg-brand-dark px-2 py-0.5 rounded-full">
            Pre-order
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-heading-md text-brand-dark">
        <Link
          href={href}
          className="hover:text-brand-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
        >
          {title}
        </Link>
      </h3>

      {/* Price */}
      <p className="text-body-sm text-brand-dark font-medium">
        {formatPrice(price.amount, price.currencyCode)}
      </p>

      {/* Add to Cart / Pre-order CTA */}
      <button
        className="btn-primary w-full"
        onClick={() => onAddToCart?.(id)}
        aria-label={isPreorder ? `Pre-order ${title}` : `Add ${title} to cart`}
      >
        {isPreorder ? 'Pre-order' : 'Add to Cart'}
      </button>

    </article>
  )
}
