import Link from 'next/link'
import { cn } from '@/lib/utils'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ServiceTierProps {
  eyebrow?: string
  title: string
  /** Numeric price — ignored when isCustom is true */
  price?: number
  /** Label shown beneath the price — e.g. "per project", "starting at" */
  priceLabel?: string
  /** When true, replaces the price with "Let's Talk" */
  isCustom?: boolean
  features: readonly string[]
  cta: { label: string; href: string }
  /** Visually highlights this tier as the recommended option */
  highlighted?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ServiceTier({
  eyebrow,
  title,
  price,
  priceLabel = 'per project',
  isCustom = false,
  features,
  cta,
  highlighted = false,
}: ServiceTierProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-6 rounded-xl p-8 border transition-shadow',
        highlighted
          ? 'bg-brand-dark text-brand-cream border-brand-dark shadow-xl'
          : 'bg-brand-cream text-brand-dark border-brand-dark/10 hover:shadow-md',
      )}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <span className={cn(
          'text-heading-sm',
          highlighted ? 'text-brand-gold' : 'text-brand-gold',
        )}>
          {eyebrow}
        </span>
      )}

      {/* Title */}
      <h3 className={cn(
        'text-display-md',
        highlighted ? 'text-brand-cream' : 'text-brand-dark',
      )}>
        {title}
      </h3>

      {/* Price */}
      <div className="flex flex-col gap-1">
        {isCustom ? (
          <p className={cn(
            'text-heading-lg',
            highlighted ? 'text-brand-gold' : 'text-brand-gold',
          )}>
            Let&apos;s Talk
          </p>
        ) : (
          <>
            <p className={cn(
              'text-display-md',
              highlighted ? 'text-brand-cream' : 'text-brand-dark',
            )}>
              ${price?.toLocaleString()}
            </p>
            <p className={cn(
              'text-body-sm',
              highlighted ? 'text-brand-cream/60' : 'text-brand-dark/50',
            )}>
              {priceLabel}
            </p>
          </>
        )}
      </div>

      {/* Divider */}
      <hr className={cn(
        'border-t',
        highlighted ? 'border-brand-cream/15' : 'border-brand-dark/10',
      )} />

      {/* Features list */}
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            {/* Checkmark */}
            <svg
              className={cn('mt-0.5 shrink-0', highlighted ? 'text-brand-gold' : 'text-brand-gold')}
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3" />
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={cn(
              'text-body-sm',
              highlighted ? 'text-brand-cream/80' : 'text-brand-dark/70',
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={cta.href}
        className={cn(
          'mt-2 text-center',
          highlighted ? 'btn-primary bg-brand-gold text-brand-dark hover:bg-brand-cream hover:text-brand-dark border-transparent' : 'btn-secondary',
        )}
      >
        {cta.label}
      </Link>

    </article>
  )
}
