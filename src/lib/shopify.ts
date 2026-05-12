/*
 * SHOPIFY INTEGRATION — MOCK/LIVE TOGGLE
 *
 * Currently running in MOCK mode (NEXT_PUBLIC_SHOPIFY_USE_MOCK=true)
 * Store: 3jksq9-px.myshopify.com (theothersideofthepen.com)
 * Status: Awaiting plan activation from client (Alan Mack)
 *
 * TO GO LIVE:
 * 1. Get Storefront API token from Shopify Admin → Apps → ABLE Storefront
 * 2. Set NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local
 * 3. Set NEXT_PUBLIC_SHOPIFY_USE_MOCK=false in .env.local
 * 4. Restart dev server and verify /store page loads real products
 */

import type {
  Product,
  Cart,
  CartItem,
  ProductFilter,
  ShopifyProduct,
  ShopifyCart,
} from '@/types/shopify'
import { MOCK_PRODUCTS, MOCK_CART } from './shopify.mock'
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from './shopify.queries'

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!
const API_VERSION  = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? '2024-01'
const USE_MOCK     = process.env.NEXT_PUBLIC_SHOPIFY_USE_MOCK !== 'false'

const endpoint = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`

// ── Raw GraphQL fetcher (live only) ───────────────────────────────────────────

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${json.errors[0].message}`)
  }

  return json.data as T
}

// ── Normalizers ───────────────────────────────────────────────────────────────

// Derive productType from tags when Shopify's productType field is empty.
// Alan will set productType in Shopify admin; once set it takes precedence.
function inferProductType(productType: string, tags: string[]): string {
  if (productType) return productType
  if (tags.some((t) => t === 'Bundle')) return 'Bundle'
  if (tags.some((t) => t === 'Print')) return 'Print'
  if (tags.some((t) => t === 'Album' || t === 'Record')) return 'Music'
  if (tags.some((t) => t === 'Book' || t === 'Audiobook' || t === 'eBook')) return 'Book'
  return productType
}

function normalizeProduct(raw: ShopifyProduct): Product {
  const firstImage = raw.images.edges[0]?.node ?? null
  return {
    id:               raw.id,
    title:            raw.title,
    handle:           raw.handle,
    description:      raw.description,
    productType:      inferProductType(raw.productType, raw.tags),
    tags:             raw.tags,
    isPreorder:       raw.tags.some((t) => t.toLowerCase() === 'preorder'),
    availableForSale: raw.availableForSale,
    price:            raw.priceRange.minVariantPrice.amount,
    compareAtPrice:   raw.variants.edges[0]?.node.compareAtPriceV2?.amount ?? null,
    currencyCode:     raw.priceRange.minVariantPrice.currencyCode,
    image:            firstImage,
    images:           raw.images.edges.map((e) => e.node),
    variants:         raw.variants.edges.map((e) => e.node),
    hasSellingPlan:   raw.sellingPlanGroups.edges.length > 0,
  }
}

function normalizeCart(raw: ShopifyCart): Cart {
  const items: CartItem[] = raw.lines.edges.map(({ node }) => ({
    lineId:      node.id,
    quantity:    node.quantity,
    variantId:   node.merchandise.id,
    title:       node.merchandise.product.title,
    price:       node.merchandise.priceV2.amount,
    currencyCode: node.merchandise.priceV2.currencyCode,
    image:       node.merchandise.product.images.edges[0]?.node ?? null,
  }))

  return {
    id:            raw.id,
    checkoutUrl:   raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    items,
    subtotal:      raw.cost.subtotalAmount.amount,
    total:         raw.cost.totalAmount.amount,
    currencyCode:  raw.cost.subtotalAmount.currencyCode,
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getAllProducts(filter?: ProductFilter): Promise<Product[]> {
  if (USE_MOCK) {
    if (!filter || filter === 'All') return MOCK_PRODUCTS
    return MOCK_PRODUCTS.filter((p) => p.productType === filter)
  }

  const query =
    filter && filter !== 'All' ? `product_type:${filter}` : undefined

  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] }
  }>(PRODUCTS_QUERY, { first: 50, query })

  return data.products.edges.map((e) => normalizeProduct(e.node))
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (USE_MOCK) {
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null
  }

  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  )

  return data.productByHandle ? normalizeProduct(data.productByHandle) : null
}

export async function createCart(): Promise<Cart> {
  if (USE_MOCK) return { ...MOCK_CART, id: `mock-cart-${Date.now()}` }

  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    CREATE_CART_MUTATION,
  )

  return normalizeCart(data.cartCreate.cart)
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<Cart> {
  if (USE_MOCK) {
    // Mock add — return cart with item added for UI testing
    return MOCK_CART
  }

  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    ADD_TO_CART_MUTATION,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  )

  return normalizeCart(data.cartLinesAdd.cart)
}

export async function removeFromCart(
  cartId: string,
  lineId: string,
): Promise<Cart> {
  if (USE_MOCK) return MOCK_CART

  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    REMOVE_FROM_CART_MUTATION,
    { cartId, lineIds: [lineId] },
  )

  return normalizeCart(data.cartLinesRemove.cart)
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (USE_MOCK) return MOCK_CART

  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
    GET_CART_QUERY,
    { cartId },
  )

  return data.cart ? normalizeCart(data.cart) : null
}

// Re-export types for components that still import from @/lib/shopify
export type { Product, Cart, CartItem, ProductFilter } from '@/types/shopify'
