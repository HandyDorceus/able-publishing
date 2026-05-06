'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Store',    href: '/store'    },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about'    },
  { label: 'Contact',  href: '/contact'  },
] as const

// ─── Icons (inline SVG — no icon library dependency) ─────────────────────────

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeaderProps {
  cartCount?: number
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Header({ cartCount = 0 }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-dark/10">

      {/* ── Main bar ── */}
      <div className="flex items-center justify-between px-4 md:px-10 lg:px-20 h-16 lg:h-[140px] w-full max-w-screen-2xl mx-auto">

        {/* Logo */}
        <Link href="/" aria-label="ABLE Publishing — home" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">
          <span className="block bg-brand-cream">
            <Image
              src="/logos/able-publishing/AP2.jpg"
              alt="ABLE Publishing"
              width={480}
              height={180}
              className="h-14 lg:h-[120px] w-auto object-contain mix-blend-multiply"
              priority
            />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-body-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm',
                pathname === href
                  ? 'text-brand-gold'
                  : 'text-brand-dark hover:text-brand-gold'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions: cart + mobile menu */}
        <div className="flex items-center gap-2">

          {/* Cart icon + badge */}
          <Link
            href="/store"
            className="relative p-2 text-brand-dark hover:text-brand-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            aria-label={cartCount > 0 ? `Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}` : 'Cart'}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-brand-dark text-caption font-bold leading-none"
                aria-hidden="true"
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 text-brand-dark hover:text-brand-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

        </div>
      </div>

      {/* ── Mobile nav drawer ── */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-brand-dark/10 bg-brand-cream"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col px-4 py-3">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'block py-3 text-body-md border-b border-brand-dark/8 transition-colors duration-150 last:border-0',
                    pathname === href
                      ? 'text-brand-gold font-medium'
                      : 'text-brand-dark'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

    </header>
  )
}
