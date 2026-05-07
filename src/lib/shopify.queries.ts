// ─── Shared cart fields fragment ──────────────────────────────────────────────

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            priceV2 { amount currencyCode }
            product {
              title
              handle
              images(first: 1) {
                edges { node { url altText width height } }
              }
            }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
`

// ─── Product queries ──────────────────────────────────────────────────────────

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          productType
          tags
          availableForSale
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          images(first: 5) {
            edges { node { url altText width height } }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                priceV2 { amount currencyCode }
                compareAtPriceV2 { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
          sellingPlanGroups(first: 1) {
            edges { node { name } }
          }
        }
      }
    }
  }
`

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      tags
      availableForSale
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      images(first: 5) {
        edges { node { url altText width height } }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            priceV2 { amount currencyCode }
            compareAtPriceV2 { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
      sellingPlanGroups(first: 1) {
        edges { node { name } }
      }
    }
  }
`

// ─── Cart mutations & queries ─────────────────────────────────────────────────

export const CREATE_CART_MUTATION = `
  mutation CreateCart {
    cartCreate {
      cart { ${CART_FIELDS} }
    }
  }
`

export const ADD_TO_CART_MUTATION = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
    }
  }
`

export const REMOVE_FROM_CART_MUTATION = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
    }
  }
`

export const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ${CART_FIELDS} }
  }
`
