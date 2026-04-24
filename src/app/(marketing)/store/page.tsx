import type { Metadata } from 'next'
import { Section, Grid, Col } from '@/components/layout/Grid'
import { StoreClient }        from '@/components/commerce/StoreClient'
import { getAllProducts }      from '@/lib/shopify'

export const metadata: Metadata = {
  title:       'Store — ABLE Publishing',
  description: 'Browse books, music, and digital releases from ABLE Publishing.',
}

export default async function StorePage() {
  // TODO: ALAN — Connect Shopify (step 11). getAllProducts() returns [] until then.
  const products = await getAllProducts()

  return (
    <>
      {/* Page header */}
      <Section flush className="py-16 md:py-20 bg-brand-cream border-b border-brand-dark/10">
        <Grid>
          <Col span={4} mdSpan={8} lgSpan={8} start={3} className="flex flex-col gap-3 text-center">
            <span className="text-heading-sm text-brand-gold">Our Catalogue</span>
            <h1 className="text-display-lg text-brand-dark">Store</h1>
            <p className="text-body-lg text-brand-dark/60">
              Books, music, and digital releases from our family of independent artists.
            </p>
          </Col>
        </Grid>
      </Section>

      {/* Products */}
      <Section>
        <Grid>
          <Col span={4} mdSpan={8} lgSpan={12}>
            <StoreClient products={products} />
          </Col>
        </Grid>
      </Section>
    </>
  )
}
