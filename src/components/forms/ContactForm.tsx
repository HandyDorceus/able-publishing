'use client'

import { useActionState } from 'react'
import { cn } from '@/lib/utils'
import { submitContact, type ContactState } from '@/lib/actions/contact'

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label text-brand-dark">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-caption text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = cn(
  'w-full rounded-lg border border-brand-dark/20 bg-white px-4 py-3',
  'text-body-sm text-brand-dark placeholder:text-brand-dark/30',
  'transition-colors duration-150',
  'focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent',
)

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactState | null, FormData>(
    submitContact,
    null,
  )

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center rounded-xl border border-brand-gold/30 bg-brand-gold/5">
        <p className="text-display-md text-brand-dark">Message sent!</p>
        <p className="text-body-md text-brand-dark/70 max-w-sm">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">

      {/* Honeypot — hidden from real users, traps bots */}
      <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />

      {/* Generic error */}
      {state?.error && !state.fieldErrors && (
        <p className="text-body-sm text-red-600 rounded-lg border border-red-200 bg-red-50 px-4 py-3" role="alert">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name" id="name" error={state?.fieldErrors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={cn(inputClass, state?.fieldErrors?.name && 'border-red-400 focus:ring-red-400')}
            aria-invalid={!!state?.fieldErrors?.name}
          />
        </Field>

        <Field label="Email" id="email" error={state?.fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(inputClass, state?.fieldErrors?.email && 'border-red-400 focus:ring-red-400')}
            aria-invalid={!!state?.fieldErrors?.email}
          />
        </Field>
      </div>

      <Field label="Subject" id="subject" error={state?.fieldErrors?.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What's this about?"
          className={inputClass}
        />
      </Field>

      <Field label="Message" id="message" error={state?.fieldErrors?.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="How can we help?"
          className={cn(inputClass, 'resize-y min-h-36', state?.fieldErrors?.message && 'border-red-400 focus:ring-red-400')}
          aria-invalid={!!state?.fieldErrors?.message}
        />
      </Field>

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary self-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Sending…' : 'Send Message'}
      </button>

    </form>
  )
}
