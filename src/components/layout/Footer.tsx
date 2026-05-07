import Image from 'next/image'
import Link from 'next/link'
import { Grid, Col, Section } from '@/components/layout/Grid'
import { CONTACT, SOCIAL } from '@/lib/contact'

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Store',    href: '/store'    },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about'    },
  { label: 'Contact',  href: '/contact'  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-brand-cream mt-auto">

      {/* ── Main content ── */}
      <Section>
        <Grid>

          {/* Brand column — logo, tagline, Instagram */}
          <Col span={4} mdSpan={8} lgSpan={4} className="flex flex-col gap-6">
            <div>
              <Link
                href="/"
                className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
              >
                <Image
                  src="/logos/able-publishing/AP2.jpg"
                  alt="ABLE Publishing"
                  width={420}
                  height={156}
                  className="h-14 lg:h-[120px] w-auto object-contain invert mix-blend-screen"
                />
              </Link>
              <p className="text-body-sm text-brand-cream/60 mt-2">
                Achieving Beyond Limits &amp; Expectations.
                Empowering independent creators of literature,
                music, and poetry.
              </p>
            </div>

            <a
              href={SOCIAL.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL.instagram.label}
              className="inline-flex items-center gap-2 text-brand-cream/60 hover:text-brand-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              {SOCIAL.instagram.handle}
            </a>
          </Col>

          {/* Contact column */}
          <Col span={4} mdSpan={4} lgSpan={3} start={6} className="flex flex-col gap-3">
            <p className="text-heading-sm text-brand-cream/40">Contact</p>
            <ul className="flex flex-col gap-3">
              <li className="flex flex-col gap-0.5">
                <span className="text-caption text-brand-cream/40">General</span>
                <a
                  href={`mailto:${CONTACT.general}`}
                  className="text-body-sm text-brand-cream/70 hover:text-brand-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
                >
                  {CONTACT.general}
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-caption text-brand-cream/40">Publishing &amp; Services</span>
                <a
                  href={`mailto:${CONTACT.publishing}`}
                  className="text-body-sm text-brand-cream/70 hover:text-brand-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
                >
                  {CONTACT.publishing}
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-caption text-brand-cream/40">Orders</span>
                <a
                  href={`mailto:${CONTACT.orders}`}
                  className="text-body-sm text-brand-cream/70 hover:text-brand-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
                >
                  {CONTACT.orders}
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-caption text-brand-cream/40">Support</span>
                <a
                  href={`mailto:${CONTACT.support}`}
                  className="text-body-sm text-brand-cream/70 hover:text-brand-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
                >
                  {CONTACT.support}
                </a>
              </li>
            </ul>
          </Col>

          {/* Nav column */}
          <Col span={4} mdSpan={4} lgSpan={3} start={10} className="flex flex-col gap-3">
            <p className="text-heading-sm text-brand-cream/40">Navigate</p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-body-sm text-brand-cream/70 hover:text-brand-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Col>

        </Grid>
      </Section>

      {/* ── Copyright bar ── */}
      <div className="border-t border-brand-cream/10">
        <div className="flex items-center justify-between px-[var(--page-px)] py-5 w-full max-w-screen-2xl mx-auto">
          <p className="text-caption text-brand-cream/40">
            &copy; {year} ABLE Publishing LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Image
              src="/logos/able-publishing/ABLE_Records-copy.png"
              alt="ABLE Records"
              width={48}
              height={48}
              className="h-10 w-10 object-contain opacity-80"
            />
            <p className="text-caption text-brand-cream/30">
              ablepublishing.art
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}
