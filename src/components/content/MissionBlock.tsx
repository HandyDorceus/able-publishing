import Image from 'next/image'
import { Section, Grid, Col } from '@/components/layout/Grid'

// ─── Props ────────────────────────────────────────────────────────────────────

interface MissionBlockProps {
  headline: string
  /** Body copy — supports multiple paragraphs via \n\n */
  body: string
  image?: { src: string; alt: string }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MissionBlock({ headline, body, image }: MissionBlockProps) {
  const paragraphs = body.split('\n\n').filter(Boolean)

  return (
    <Section flush className="py-16 md:py-24 lg:py-32 bg-brand-cream">
      <Grid className="items-center gap-y-12 lg:gap-y-0">

        {/* Text column
            With image:    6 cols desktop
            Without image: 8 cols desktop centered */}
        <Col
          span={4}
          mdSpan={8}
          lgSpan={image ? 6 : 8}
          start={image ? undefined : 3}
          className="flex flex-col gap-6"
        >
          <span className="text-heading-sm text-brand-gold">About ABLE</span>

          <h1 className="text-display-lg text-brand-dark">{headline}</h1>

          <div className="flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-body-lg text-brand-dark/70">
                {p}
              </p>
            ))}
          </div>
        </Col>

        {/* Image column */}
        {image && (
          <Col
            span={4}
            mdSpan={8}
            lgSpan={5}
            start={8}
            className="flex items-center justify-center"
          >
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Col>
        )}

      </Grid>
    </Section>
  )
}
