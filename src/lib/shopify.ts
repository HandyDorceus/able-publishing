// ─── Shopify Storefront API client ────────────────────────────────────────────
// TODO: ALAN — Connect Shopify store domain and token in .env.local
//   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=
//   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=
//
// Full implementation in step 11 (npm install @shopify/hydrogen-react).
// Types are defined here now so components can import them before step 11.

export interface ProductImage {
  url: string
  altText: string | null
}

export interface MoneyV2 {
  amount: string
  currencyCode: string
}

export interface Product {
  id: string
  title: string
  handle: string
  /** Maps to Shopify productType — expected values: 'Books' | 'Music' | 'Digital' */
  productType: string
  tags: string[]
  priceRange: {
    minVariantPrice: MoneyV2
  }
  images: ProductImage[]
  /** Derived from tags — true when product has a 'preorder' tag */
  isPreorder: boolean
}

export type ProductFilter = 'Books' | 'Music' | 'Digital'

// ─── Stub implementations — replaced in step 11 ──────────────────────────────

export async function getAllProducts(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _filter?: ProductFilter,
): Promise<Product[]> {
  return []
}

export async function getProductByHandle(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _handle: string,
): Promise<Product | null> {
  return null
}
