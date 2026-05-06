import type { Metadata } from 'next'
import { Section, Grid, Col } from '@/components/layout/Grid'
import { StoreClient }        from '@/components/commerce/StoreClient'
import { StoreHero }          from '@/components/content/StoreHero'
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
      <StoreHero />

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
