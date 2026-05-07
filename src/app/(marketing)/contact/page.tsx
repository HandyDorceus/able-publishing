import type { Metadata } from 'next'
import { Section, Grid, Col } from '@/components/layout/Grid'
import { ContactInfo }        from '@/components/content/ContactInfo'
import { ContactForm }        from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title:       'Contact | ABLE Publishing',
  description: 'Reach the ABLE Publishing team for general inquiries, publishing services, order support, or general support.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <Section flush className="py-16 md:py-20 bg-brand-cream border-b border-brand-dark/10">
        <Grid>
          <Col span={4} mdSpan={8} lgSpan={8} start={3} className="flex flex-col gap-3 text-center">
            <h1 className="text-display-lg text-brand-dark">Get in Touch</h1>
            <p className="text-body-lg text-brand-dark/60">
              Reach our team directly — every message goes to the right inbox.
            </p>
          </Col>
        </Grid>
      </Section>

      {/* Contact category cards */}
      <Section>
        <Grid>
          <Col span={4} mdSpan={8} lgSpan={12}>
            <ContactInfo />
          </Col>
        </Grid>
      </Section>

      {/* Contact form */}
      <Section flush className="pb-24">
        <Grid>
          <Col span={4} mdSpan={8} lgSpan={8} start={3}>
            <ContactForm />
          </Col>
        </Grid>
      </Section>
    </>
  )
}
