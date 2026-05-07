import { CONTACT } from '@/lib/contact'

// ─── Card data ────────────────────────────────────────────────────────────────

const CARDS = [
  {
    label:       'General',
    description: 'Questions about ABLE Publishing, the platform, or anything else.',
    email:       CONTACT.general,
  },
  {
    label:       'Publishing & Services',
    description: 'Ready to publish? Inquire about our literature, music, or poetry services.',
    email:       CONTACT.publishing,
  },
  {
    label:       'Orders',
    description: 'Questions about a purchase, download, or pre-order confirmation.',
    email:       CONTACT.orders,
  },
  {
    label:       'Support',
    description: 'Need help with your account, a product, or the site?',
    email:       CONTACT.support,
  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CARDS.map(({ label, description, email }) => (
        <div
          key={email}
          className="flex flex-col gap-3 p-6 rounded-xl border border-brand-dark/10 bg-brand-cream"
        >
          <p className="text-heading-sm text-brand-dark">{label}</p>
          <p className="text-body-sm text-brand-dark/60 flex-1">{description}</p>
          <a
            href={`mailto:${email}`}
            className="btn-ghost self-start"
          >
            {email}
          </a>
        </div>
      ))}
    </div>
  )
}
