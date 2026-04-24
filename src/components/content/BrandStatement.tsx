import Link from 'next/link'
import { Section, Grid, Col } from '@/components/layout/Grid'

// ─── Props ────────────────────────────────────────────────────────────────────

interface BrandStatementProps {
  /** Primary mission statement — large display text */
  statement: string
  /** Optional supporting body copy beneath the statement */
  body?: string
  /** Optional CTA */
  cta?: { label: string; href: string }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BrandStatement({ statement, body, cta }: BrandStatementProps) {
  return (
    <Section className="bg-brand-dark">
      <Grid>
        <Col
          span={4}
          mdSpan={6}
          mdStart={2}
          lgSpan={8}
          start={3}
          className="flex flex-col items-center gap-8 text-center"
        >
          {/* Eyebrow */}
          <span className="text-heading-sm text-brand-gold">Our Mission</span>

          {/* Statement */}
          <h2 className="text-display-lg text-brand-cream">{statement}</h2>

          {/* Supporting copy */}
          {body && (
            <p className="text-body-lg text-brand-cream/70 max-w-prose">
              {body}
            </p>
          )}

          {/* CTA */}
          {cta && (
            <Link
              href={cta.href}
              className="btn-secondary border-brand-cream/40 text-brand-cream hover:bg-brand-cream hover:text-brand-dark hover:border-brand-cream"
            >
              {cta.label}
            </Link>
          )}
        </Col>
      </Grid>
    </Section>
  )
}
