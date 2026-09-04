import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Image             from 'next/image'
import { Section, Grid, Col } from '@/components/layout/Grid'
import { getProductByHandle, getAllProducts } from '@/lib/shopify'
import { ProductDetailClient } from '@/components/commerce/ProductDetailClient'

// ─── Static params (pre-render known handles) ─────────────────────────────────

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ handle: p.handle }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProductByHandle(handle)
  if (!product) return {}
  return {
    title:       `${product.title} — ABLE Publishing`,
    description: product.description,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getProductByHandle(handle)
  if (!product) notFound()

  const image = product.image

  return (
    <Section className="py-16 md:py-24">
      <Grid className="gap-y-12">

        {/* Image */}
        <Col span={4} mdSpan={4} lgSpan={5}>
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-brand-dark/5">
            {image ? (
              <Image
                src={image.url}
                alt={image.altText ?? product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-heading-sm text-brand-dark/30">{product.productType}</span>
              </div>
            )}
          </div>
        </Col>

        {/* Details */}
        <Col span={4} mdSpan={4} lgSpan={6} start={7}>
          <ProductDetailClient product={product} />
        </Col>

      </Grid>
    </Section>
  )
}
