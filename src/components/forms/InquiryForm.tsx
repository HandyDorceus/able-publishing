'use client'

import { useActionState } from 'react'
import { cn } from '@/lib/utils'
import { submitInquiry, type InquiryState } from '@/lib/actions/inquiry'
import { CONTACT } from '@/lib/contact'

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

export function InquiryForm() {
  const [state, formAction, isPending] = useActionState<InquiryState | null, FormData>(
    submitInquiry,
    null,
  )

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center rounded-xl border border-brand-gold/30 bg-brand-gold/5">
        <p className="text-display-md text-brand-dark">Thank you!</p>
        <p className="text-body-md text-brand-dark/70 max-w-sm">
          We&apos;ve received your inquiry and will be in touch within 2 business days.
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
            aria-describedby={state?.fieldErrors?.name ? 'name-error' : undefined}
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

      <Field label="Service Type" id="serviceType" error={state?.fieldErrors?.serviceType}>
        <select
          id="serviceType"
          name="serviceType"
          className={cn(inputClass, state?.fieldErrors?.serviceType && 'border-red-400 focus:ring-red-400')}
          aria-invalid={!!state?.fieldErrors?.serviceType}
          defaultValue=""
        >
          <option value="" disabled>Select a service…</option>
          <option value="Book Publishing">Book Publishing</option>
          <option value="Music Release">Music Release</option>
          <option value="Digital Distribution">Digital Distribution</option>
          <option value="Other">Other</option>
        </select>
      </Field>

      <Field label="Message" id="message" error={state?.fieldErrors?.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your project…"
          className={cn(inputClass, 'resize-y min-h-32', state?.fieldErrors?.message && 'border-red-400 focus:ring-red-400')}
          aria-invalid={!!state?.fieldErrors?.message}
        />
      </Field>

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary self-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Sending…' : 'Send Inquiry'}
      </button>

      <p className="text-caption text-brand-dark/50 text-center mt-3">
        Your message will be sent to {CONTACT.publishing}
      </p>

    </form>
  )
}
