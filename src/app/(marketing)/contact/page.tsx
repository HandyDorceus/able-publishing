import type { Metadata } from 'next'
import { Section, Grid, Col } from '@/components/layout/Grid'
import { ContactForm }        from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title:       'Contact — ABLE Publishing',
  description: 'Get in touch with ABLE Publishing. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <Section flush className="py-16 md:py-24 bg-brand-cream">
      <Grid className="gap-y-12 lg:gap-y-0 items-start">

        {/* Contact info */}
        <Col span={4} mdSpan={8} lgSpan={4} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-heading-sm text-brand-gold">Reach Out</span>
            <h1 className="text-display-lg text-brand-dark">Contact Us</h1>
            <p className="text-body-lg text-brand-dark/60">
              Have a question, a project in mind, or just want to say hello? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <p className="text-label text-brand-dark/50">Email</p>
              {/* TODO: ALAN — Replace with confirmed contact email from Keystatic site_settings */}
              <a
                href="mailto:info@ablepublishing.art"
                className="text-body-md text-brand-dark hover:text-brand-gold transition-colors duration-150"
              >
                info@ablepublishing.art
              </a>
            </div>

            {/* Response time */}
            <div className="flex flex-col gap-1">
              <p className="text-label text-brand-dark/50">Response Time</p>
              <p className="text-body-md text-brand-dark/70">Within 2 business days</p>
            </div>
          </div>
        </Col>

        {/* Form */}
        <Col span={4} mdSpan={8} lgSpan={7} start={6}>
          <ContactForm />
        </Col>

      </Grid>
    </Section>
  )
}
