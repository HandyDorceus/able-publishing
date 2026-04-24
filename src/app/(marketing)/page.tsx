import type { Metadata } from 'next'
import { HeroSection }      from '@/components/content/HeroSection'
import { FeaturedRelease }  from '@/components/content/FeaturedRelease'
import { BrandStatement }   from '@/components/content/BrandStatement'

// ─── Metadata ─────────────────────────────────────────────────────────────────
// TODO: pull title / description / ogImage from Keystatic site_settings singleton
// once Keystatic is installed (step 10).

export const metadata: Metadata = {
  title:       'ABLE Publishing — Achieving Beyond Limits & Expectations',
  description: 'ABLE Publishing is an independent creative house for literature, music, and poetry. Discover new releases, explore our services, and bring your vision to life.',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  // TODO: ALAN — Replace placeholder data with Keystatic reads (step 10).
  //
  // When Keystatic is installed, fetch like this:
  //   const config    = await reader.singletons.homepage.read()
  //   const releases  = await Promise.all(
  //     (config?.featured_release_ids ?? []).map(id =>
  //       reader.collections.releases.read(id)
  //     )
  //   )

  return (
    <>
      {/* ── Hero ── */}
      {/* TODO: ALAN — Update copy in Keystatic at /admin → homepage singleton */}
      <HeroSection
        headline="Achieving Beyond Limits & Expectations"
        subheadline="ABLE Publishing is an independent creative house for literature, music, and poetry — built for artists who refuse to be overlooked."
        primaryCta={{ label: 'Shop Now',      href: '/store'    }}
        secondaryCta={{ label: 'Our Services', href: '/services' }}
      />

      {/* ── Featured releases ── */}
      {/* TODO: ALAN — Add first release in Keystatic at /admin → releases collection.
          Pass the returned release objects here once Keystatic is wired up.
          FeaturedRelease renders nothing when the array is empty. */}
      <FeaturedRelease
        heading="New Releases"
        releases={[]}
      />

      {/* ── Brand statement ── */}
      {/* TODO: ALAN — Update copy in Keystatic at /admin → homepage singleton */}
      <BrandStatement
        statement="We exist to give every story, every song, and every poem the platform it deserves."
        body="From first draft to final release, ABLE Publishing partners with independent creators to produce, publish, and promote work that moves people."
        cta={{ label: 'Learn About Us', href: '/about' }}
      />
    </>
  )
}
