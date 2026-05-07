'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CartDrawer() {
  const { cart, cartOpen, closeCart, removeItem, isLoading, totalQuantity } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark/40 transition-opacity duration-300 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-brand-cream shadow-2xl transition-transform duration-300 ease-in-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-brand-cream/70">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-dark border-t-transparent" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-dark/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-heading-lg text-brand-dark">Your Cart</h2>
            {totalQuantity > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark text-caption font-bold text-brand-cream">
                {totalQuantity > 9 ? '9+' : totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1 text-brand-dark/60 hover:text-brand-dark transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 pt-16 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark/20" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-body-md text-brand-dark/50">Your cart is empty</p>
              <button onClick={closeCart} className="btn-ghost">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {cart.items.map((item) => (
                <li key={item.lineId} className="flex gap-4">
                  {/* Image */}
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md bg-brand-dark/5">
                    {item.image ? (
                      <Image
                        src={item.image.url}
                        alt={item.image.altText ?? item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-brand-dark/10" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-body-sm font-medium text-brand-dark leading-snug">{item.title}</p>
                    <p className="text-body-sm text-brand-dark/60">
                      {formatPrice(item.price, item.currencyCode)} × {item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(item.lineId)}
                      aria-label={`Remove ${item.title} from cart`}
                      className="mt-1 self-start text-caption text-brand-dark/40 hover:text-brand-dark underline underline-offset-2 transition-colors duration-150"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {cart && cart.items.length > 0 && (
          <div className="border-t border-brand-dark/10 px-6 py-4 flex flex-col gap-3">
            <div className="flex justify-between text-body-sm text-brand-dark/60">
              <span>Subtotal</span>
              <span>{formatPrice(cart.subtotal, cart.currencyCode)}</span>
            </div>
            <div className="flex justify-between text-body-md font-medium text-brand-dark">
              <span>Total</span>
              <span>{formatPrice(cart.total, cart.currencyCode)}</span>
            </div>
            <Link
              href={cart.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center mt-1"
              onClick={closeCart}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
