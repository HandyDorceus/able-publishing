// ─── Shopify Storefront API — raw GraphQL response types ─────────────────────

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyMoneyV2 {
  amount: string
  currencyCode: string
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoneyV2
  maxVariantPrice: ShopifyMoneyV2
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable: number
  priceV2: ShopifyMoneyV2
  compareAtPriceV2: ShopifyMoneyV2 | null
  selectedOptions: { name: string; value: string }[]
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  productType: string
  tags: string[]
  availableForSale: boolean
  priceRange: ShopifyPriceRange
  images: { edges: { node: ShopifyImage }[] }
  variants: { edges: { node: ShopifyProductVariant }[] }
  sellingPlanGroups: { edges: unknown[] }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    edges: {
      node: {
        id: string
        quantity: number
        merchandise: {
          id: string
          title: string
          priceV2: ShopifyMoneyV2
          product: Pick<ShopifyProduct, 'title' | 'handle' | 'images'>
        }
      }
    }[]
  }
  cost: {
    subtotalAmount: ShopifyMoneyV2
    totalAmount: ShopifyMoneyV2
    totalTaxAmount: ShopifyMoneyV2 | null
  }
}

// ─── Derived helper types used by components ──────────────────────────────────

export interface Product {
  id: string
  title: string
  handle: string
  description: string
  productType: 'Music' | 'Book' | 'Print' | 'Bundle' | string
  tags: string[]
  isPreorder: boolean
  availableForSale: boolean
  price: string
  compareAtPrice: string | null
  currencyCode: string
  image: ShopifyImage | null
  images: ShopifyImage[]
  variants: ShopifyProductVariant[]
  hasSellingPlan: boolean
}

export interface CartItem {
  lineId: string
  quantity: number
  variantId: string
  title: string
  price: string
  currencyCode: string
  image: ShopifyImage | null
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  items: CartItem[]
  subtotal: string
  total: string
  currencyCode: string
}

export type ProductFilter = 'All' | 'Music' | 'Book' | 'Print' | 'Bundle'
