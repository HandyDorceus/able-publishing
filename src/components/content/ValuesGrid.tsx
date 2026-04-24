import { Section, Grid, Col } from '@/components/layout/Grid'

// ─── Props ────────────────────────────────────────────────────────────────────

interface Value {
  title: string
  description: string
}

interface ValuesGridProps {
  heading?: string
  values: Value[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ValuesGrid({ heading = 'What We Stand For', values }: ValuesGridProps) {
  if (values.length === 0) return null

  return (
    <Section className="bg-brand-cream">
      <Grid className="gap-y-12">

        {/* Section heading */}
        <Col span={4} mdSpan={8} lgSpan={12} className="flex flex-col gap-2">
          <span className="text-heading-sm text-brand-gold">Our Values</span>
          <h2 className="text-display-lg text-brand-dark">{heading}</h2>
        </Col>

        {/* Value cards — 1 col mobile, 2 cols tablet, 3 cols desktop, wraps naturally */}
        {values.map((value) => (
          <Col
            key={value.title}
            span={4}
            mdSpan={4}
            lgSpan={4}
          >
            <div className="flex flex-col gap-3 p-6 rounded-xl border border-brand-dark/10 h-full">
              {/* Decorative accent */}
              <div className="w-8 h-0.5 bg-brand-gold" aria-hidden="true" />
              <h3 className="text-heading-md text-brand-dark">{value.title}</h3>
              <p className="text-body-sm text-brand-dark/70">{value.description}</p>
            </div>
          </Col>
        ))}

      </Grid>
    </Section>
  )
}
