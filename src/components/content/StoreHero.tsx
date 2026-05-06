import Image from 'next/image'
import { Section, Grid, Col } from '@/components/layout/Grid'

// ─── Component ────────────────────────────────────────────────────────────────

export function StoreHero() {
  return (
    <Section flush>
      <Grid>
        <Col span={4} mdSpan={8} lgSpan={12}>
          <div className="flex flex-col items-center text-center py-16 lg:py-24">

            {/* Primary store logo */}
            <Image
              src="/logos/the-store/TheOtherSideOfThePen_v2-copy.png"
              alt="The Other Side of the Pen"
              width={900}
              height={60}
              className="w-full max-w-4xl h-auto object-contain mb-6 mix-blend-multiply"
              priority
            />

            <p className="text-body-lg text-brand-dark/70 max-w-xl">
              Poetry. Music. Digital downloads.
            </p>
          </div>
        </Col>
      </Grid>
    </Section>
  )
}
