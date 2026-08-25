import type { Metadata } from 'next'
import { Section, Grid, Col } from '@/components/layout/Grid'
import { ServiceTier }        from '@/components/content/ServiceTier'
import { InquiryForm }        from '@/components/forms/InquiryForm'

export const metadata: Metadata = {
  title:       'Services — ABLE Publishing',
  description: 'Publishing, distribution, and creative services for independent authors and musicians.',
}

// TODO: ALAN — Replace with Keystatic reads (step 10) from the services collection.
const SERVICES = [
  {
    eyebrow:    'Book Publishing Essential',
    title:      'Self-Publishing Starter',
    price:      499,
    priceLabel: 'per project',
    isCustom:   false,
    features: [
      'ISBN registration',
      'Print-on-demand setup',
      'Basic cover design consultation',
      'Author copy review',
    ],
    cta: { label: 'Get Started', href: '#inquiry' },
    highlighted: false,
  },
  {
    eyebrow:    'Music Publishing Essential',
    title:      'Independant Music Starter',
    price:      499,
    priceLabel: 'per project',
    isCustom:   false,
    features: [
      'Song registration & publishing',
      'Administration setup',
      'Copyright registration guidance',
      'PRO registration/setup (ASCAP, BMI, SESAC, etc.)',
      'Digital music publisher',
      'Administration',
      'Royalty collection',
      'Basic metadata & split-sheet review',
      'Songwriter/publisher account setup',
    ],
    cta: { label: 'Get Started', href: '#inquiry' },
    highlighted: true,
  },
  // {
  //   eyebrow:    'Full Service',
  //   title:      'ABLE Partner',
  //   isCustom:   true,
  //   features: [
  //     'Everything in Creative Launch',
  //     'Dedicated project manager',
  //     'Custom marketing strategy',
  //     'Media & press outreach',
  //     'Revenue reporting & analytics',
  //     'Ongoing catalogue management',
  //   ],
  //   cta: { label: 'Contact Us', href: '#inquiry' },
  //   highlighted: false,
  // },
] as const

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <Section flush className="py-16 md:py-20 bg-brand-cream border-b border-brand-dark/10">
        <Grid>
          <Col span={4} mdSpan={8} lgSpan={8} start={3} className="flex flex-col gap-3 text-center">
            <span className="text-heading-sm text-brand-gold">What We Offer</span>
            <h1 className="text-display-lg text-brand-dark">Services</h1>
            <p className="text-body-lg text-brand-dark/60">
              From first draft to final release, choose the level of support that&apos;s right for your project.
            </p>
          </Col>
        </Grid>
      </Section>

      {/* Service tiers */}
      <Section>
        <Grid className="gap-y-8">
          <Col span={4} mdSpan={8} lgSpan={12} className="flex flex-col gap-2">
            <h2 className="text-display-md text-brand-dark">Choose Your Path</h2>
          </Col>

          {SERVICES.map((service, i) => (
            <Col key={service.title} span={4} mdSpan={4} lgSpan={5} start={i === 0 ? 2 : 7}>
              <ServiceTier {...service} />
            </Col>
          ))}
        </Grid>
      </Section>

      {/* Inquiry form */}
      <Section id="inquiry" className="bg-brand-cream/50">
        <Grid>
          <Col span={4} mdSpan={8} lgSpan={8} start={3}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-heading-sm text-brand-gold">Work With Us</span>
                <h2 className="text-display-md text-brand-dark">Start Your Project</h2>
                <p className="text-body-md text-brand-dark/60">
                  Tell us about your project and we&apos;ll get back to you within 2 business days.
                </p>
              </div>
              <InquiryForm />
            </div>
          </Col>
        </Grid>
      </Section>
    </>
  )
}
