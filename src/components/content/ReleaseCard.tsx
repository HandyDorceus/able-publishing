import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type ReleaseType = 'book' | 'album' | 'single'

interface ReleaseCardProps {
  title: string
  type: ReleaseType
  description: string
  coverImage: { src: string; alt: string }
  releaseDate: string   // ISO date string — e.g. "2026-04-24"
  cta: { label: string; href: string }
  isPreorder?: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<ReleaseType, string> = {
  book:   'Book',
  album:  'Album',
  single: 'Single',
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  return date.toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ReleaseCard({
  title,
  type,
  description,
  coverImage,
  releaseDate,
  cta,
  isPreorder = false,
}: ReleaseCardProps) {
  return (
    <article className="flex flex-col gap-4 group">

      {/* Cover image */}
      <Link
        href={cta.href}
        className="block relative overflow-hidden rounded-md bg-brand-dark/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        aria-label={`View ${title}`}
        tabIndex={-1}
      >
        {/* Aspect ratio: portrait for books, square for music */}
        <div className={cn(
          'relative w-full',
          type === 'book' ? 'aspect-[2/3]' : 'aspect-square',
        )}>
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Meta row — type eyebrow + pre-order badge */}
      <div className="flex items-center gap-3">
        <span className="flex items-center text-heading-sm text-brand-gold">
          {(type === 'book' || type === 'single') && (
            <Image
              src="/logos/the-store/Pen_Icon.jpg"
              alt=""
              width={16}
              height={16}
              className="inline-block w-4 h-4 object-contain mr-1.5 opacity-70"
              aria-hidden="true"
            />
          )}
          {TYPE_LABEL[type]}
        </span>

        {isPreorder && (
          <span className="text-heading-sm text-brand-cream bg-brand-dark px-2 py-0.5 rounded-full">
            Pre-order
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-display-md text-brand-dark">
        <Link
          href={cta.href}
          className="hover:text-brand-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
        >
          {title}
        </Link>
      </h3>

      {/* Description */}
      <p className="text-body-sm text-brand-dark/70 line-clamp-3">
        {description}
      </p>

      {/* Release date */}
      <p className="text-caption text-brand-dark/50">
        <time dateTime={releaseDate}>{formatDate(releaseDate)}</time>
      </p>

      {/* CTA */}
      <Link href={cta.href} className="btn-ghost self-start">
        {cta.label}
      </Link>

    </article>
  )
}
