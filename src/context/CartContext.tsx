'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { Cart } from '@/types/shopify'
import { addToCart, createCart, getCart, removeFromCart } from '@/lib/shopify'

const CART_ID_KEY = 'able-cart-id'

// ── Context shape ─────────────────────────────────────────────────────────────

interface CartContextValue {
  cart: Cart | null
  cartOpen: boolean
  totalQuantity: number
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart]         = useState<Cart | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Restore or create cart on mount
  useEffect(() => {
    async function initCart() {
      const savedId = localStorage.getItem(CART_ID_KEY)

      if (savedId) {
        const existing = await getCart(savedId)
        if (existing) {
          setCart(existing)
          return
        }
      }

      const fresh = await createCart()
      localStorage.setItem(CART_ID_KEY, fresh.id)
      setCart(fresh)
    }

    initCart().catch(console.error)
  }, [])

  const openCart  = useCallback(() => setCartOpen(true),  [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      if (!cart) return
      setIsLoading(true)
      try {
        const updated = await addToCart(cart.id, variantId, quantity)
        setCart(updated)
        setCartOpen(true)
      } finally {
        setIsLoading(false)
      }
    },
    [cart],
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return
      setIsLoading(true)
      try {
        const updated = await removeFromCart(cart.id, lineId)
        setCart(updated)
      } finally {
        setIsLoading(false)
      }
    },
    [cart],
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        totalQuantity: cart?.totalQuantity ?? 0,
        openCart,
        closeCart,
        addItem,
        removeItem,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
