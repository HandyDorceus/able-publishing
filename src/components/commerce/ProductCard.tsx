'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types/shopify'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductCard({ product }: ProductCardProps) {
  const {
    title,
    handle,
    productType,
    price,
    compareAtPrice,
    currencyCode,
    image,
    isPreorder,
    availableForSale,
    variants,
  } = product

  const { addItem } = useCart()
  const href         = `/store/${handle}`
  const firstVariant = variants[0]

  async function handleAddToCart() {
    if (!firstVariant) return
    await addItem(firstVariant.id)
  }

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
        className="block relative overflow-hidden rounded-md bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        aria-label={`View ${title}`}
        tabIndex={-1}
      >
        <div className={cn(
          'relative w-full',
          productType === 'Book' ? 'aspect-[3/4]' : 'aspect-square',
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
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-heading-sm text-brand-cream/30">{productType}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Type eyebrow + pre-order badge */}
      <div className="flex items-center gap-3">
        <span className="text-heading-sm text-brand-gold">{productType}</span>
        {isPreorder && (
          <span className="text-heading-sm text-brand-cream bg-brand-gold px-2 py-0.5 rounded-full">
            Pre-order
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-display-md text-brand-dark line-clamp-2">
        <Link
          href={href}
          className="hover:text-brand-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
        >
          {title}
        </Link>
      </h3>

      {/* Price */}
      <p className="text-body-sm text-brand-dark font-medium flex items-center gap-2">
        <span>{formatPrice(price, currencyCode)}</span>
        {compareAtPrice && (
          <span className="line-through text-brand-dark/40">
            {formatPrice(compareAtPrice, currencyCode)}
          </span>
        )}
      </p>

      {/* CTA */}
      {availableForSale ? (
        <button
          className="btn-primary w-full"
          onClick={handleAddToCart}
          aria-label={isPreorder ? `Pre-order ${title}` : `Add ${title} to cart`}
        >
          {isPreorder ? 'Pre-order Now' : 'Add to Cart'}
        </button>
      ) : (
        <button
          className="btn-secondary w-full"
          disabled
          aria-label={`${title} is out of stock`}
        >
          Out of Stock
        </button>
      )}

    </article>
  )
}
