import Link from 'next/link'
import { Section, Grid, Col } from '@/components/layout/Grid'
import { ReleaseCard } from '@/components/content/ReleaseCard'

// ─── Types ────────────────────────────────────────────────────────────────────

type ReleaseType = 'book' | 'album' | 'single'

interface Release {
  id: string
  title: string
  type: ReleaseType
  description: string
  coverImage: { src: string; alt: string }
  releaseDate: string
  cta: { label: string; href: string }
  isPreorder?: boolean
}

interface FeaturedReleaseProps {
  /** Section heading — defaults to "New Releases" */
  heading?: string
  /** Up to 2 releases, fed from Keystatic featured_release_ids */
  releases: Release[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FeaturedRelease({
  heading = 'New Releases',
  releases,
}: FeaturedReleaseProps) {
  if (releases.length === 0) return null

  const isSingle = releases.length === 1

  return (
    <Section>
      <Grid className="gap-y-12">

        {/* Section header row */}
        <Col span={4} mdSpan={8} lgSpan={12} className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-heading-sm text-brand-gold">Featured</span>
            <h2 className="text-display-lg text-brand-dark">{heading}</h2>
          </div>
          <Link
            href="/store"
            className="btn-ghost shrink-0 self-end mb-1"
          >
            View All
          </Link>
        </Col>

        {/* Release cards
            Single release: centered 8-col block on desktop
            Two releases:   side-by-side, each 5 cols with 1-col outer margin */}
        {isSingle ? (
          <Col span={4} mdSpan={8} lgSpan={8} start={3}>
            <ReleaseCard {...releases[0]} />
          </Col>
        ) : (
          <>
            <Col span={4} mdSpan={4} lgSpan={5} start={2}>
              <ReleaseCard {...releases[0]} />
            </Col>
            <Col span={4} mdSpan={4} lgSpan={5} start={8}>
              <ReleaseCard {...releases[1]} />
            </Col>
          </>
        )}

      </Grid>
    </Section>
  )
}
