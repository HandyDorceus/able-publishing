import Link from 'next/link'
import { Grid, Col, Section } from '@/components/layout/Grid'

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Store',    href: '/store'    },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about'    },
  { label: 'Contact',  href: '/contact'  },
] as const

// ─── Social links (URLs are placeholders — wired to Keystatic site_settings) ──

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    // TODO: ALAN — Replace with confirmed Instagram URL from Keystatic site_settings
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    // TODO: ALAN — Replace with confirmed Twitter/X URL from Keystatic site_settings
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    // TODO: ALAN — Replace with confirmed Spotify URL from Keystatic site_settings
    href: 'https://spotify.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 11.5c2.5-1 5.5-1 8 0" />
        <path d="M8.5 14.5c2-0.8 4.5-0.8 6.5 0" />
        <path d="M9 8.5c2.8-1.2 6-1.2 8.5 0" />
      </svg>
    ),
  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-brand-cream mt-auto">

      {/* ── Main content ── */}
      <Section>
        <Grid>

          {/* Brand column — logo, tagline, social icons */}
          <Col span={4} mdSpan={8} lgSpan={4} className="flex flex-col gap-6">
            <div>
              {/* TODO: ALAN — Add logo file to /public and update this import path */}
              <Link
                href="/"
                className="text-heading-lg text-brand-cream hover:text-brand-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
              >
                ABLE Publishing
              </Link>
              <p className="text-body-sm text-brand-cream/60 mt-2">
                Achieving Beyond Limits &amp; Expectations
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cream/60 hover:text-brand-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </Col>

          {/* Nav column */}
          <Col span={4} mdSpan={4} lgSpan={3} start={6} className="flex flex-col gap-3">
            <p className="text-heading-sm text-brand-cream/40">Navigation</p>
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

          {/* Contact column */}
          <Col span={4} mdSpan={4} lgSpan={3} start={10} className="flex flex-col gap-3">
            <p className="text-heading-sm text-brand-cream/40">Get in Touch</p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:info@ablepublishing.art"
                className="text-body-sm text-brand-cream/70 hover:text-brand-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
              >
                {/* TODO: ALAN — Replace with confirmed contact email from Keystatic site_settings */}
                info@ablepublishing.art
              </a>
            </div>
          </Col>

        </Grid>
      </Section>

      {/* ── Copyright bar ── */}
      <div className="border-t border-brand-cream/10">
        <div className="flex items-center justify-between px-4 md:px-10 lg:px-20 py-5 w-full max-w-screen-2xl mx-auto">
          <p className="text-caption text-brand-cream/40">
            &copy; {year} ABLE Publishing LLC. All rights reserved.
          </p>
          <p className="text-caption text-brand-cream/30">
            ablepublishing.art
          </p>
        </div>
      </div>

    </footer>
  )
}
