import Link from 'next/link'
import { Section, Grid, Col } from '@/components/layout/Grid'

// ─── Props ────────────────────────────────────────────────────────────────────

interface CtaProps {
  label: string
  href: string
}

interface HeroSectionProps {
  headline: string
  subheadline: string
  primaryCta: CtaProps
  secondaryCta: CtaProps
  /** Optional right-column media slot — image, video, or illustration */
  media?: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  media,
}: HeroSectionProps) {
  return (
    <Section flush className="py-16 md:py-24 lg:py-32 bg-brand-cream">
      <Grid className="items-center gap-y-12 lg:gap-y-0">

        {/* Text column
            With media:    6 cols desktop, full width mobile/tablet
            Without media: 8 cols desktop centered (start 3) */}
        <Col
          span={4}
          mdSpan={8}
          lgSpan={media ? 6 : 8}
          start={media ? undefined : 3}
          className="flex flex-col gap-6"
        >
          <h1 className="text-display-xl text-brand-dark">{headline}</h1>

          <p className="text-body-lg text-brand-dark/70 max-w-prose">
            {subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={primaryCta.href} className="btn-primary">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="btn-ghost">
              {secondaryCta.label}
            </Link>
          </div>
        </Col>

        {/* Media column — only rendered when media is provided */}
        {media && (
          <Col
            span={4}
            mdSpan={8}
            lgSpan={5}
            start={8}
            className="flex items-center justify-center"
          >
            {media}
          </Col>
        )}

      </Grid>
    </Section>
  )
}
