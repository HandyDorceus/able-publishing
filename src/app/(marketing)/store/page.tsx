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
  const products = await getAllProducts()

  return (
    <>
      <StoreHero />

      <Section>
        <Grid>
          <Col span={4} mdSpan={8} lgSpan={12}>
            <StoreClient initialProducts={products} />
          </Col>
        </Grid>
      </Section>
    </>
  )
}
