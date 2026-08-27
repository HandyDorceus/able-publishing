'use server'

import { Resend } from 'resend'
import { CONTACT } from '@/lib/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InquiryState {
  success: boolean
  error?: string
  fieldErrors?: Partial<Record<'name' | 'email' | 'serviceType' | 'message', string>>
}

const SERVICE_TYPES = ['Book Publishing', 'Music Release', 'Digital Distribution', 'Other'] as const

// ─── Action ───────────────────────────────────────────────────────────────────

export async function submitInquiry(
  _prevState: InquiryState | null,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot — bots fill this hidden field; humans leave it empty
  if (formData.get('_gotcha')) return { success: false, error: 'Submission rejected.' }

  const name        = String(formData.get('name')        ?? '').trim()
  const email       = String(formData.get('email')       ?? '').trim()
  const serviceType = String(formData.get('serviceType') ?? '').trim()
  const message     = String(formData.get('message')     ?? '').trim()

  // Field validation
  const fieldErrors: InquiryState['fieldErrors'] = {}
  if (!name)                                   fieldErrors.name = 'Name is required.'
  if (!email)                                  fieldErrors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = 'Enter a valid email address.'
  if (!serviceType || !SERVICE_TYPES.includes(serviceType as typeof SERVICE_TYPES[number]))
                                               fieldErrors.serviceType = 'Please select a service type.'
  if (!message)                                fieldErrors.message = 'Message is required.'
  else if (message.length < 20)               fieldErrors.message = 'Please provide a bit more detail (20+ characters).'

  if (Object.keys(fieldErrors).length > 0) return { success: false, fieldErrors }

  const { error } = await resend.emails.send({
    from:    'ABLE Publishing <no-reply@ablepublishing.art>',
    to:      CONTACT.publishing,
    replyTo: email,
    subject: `New ${serviceType} inquiry from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service Type:</strong> ${serviceType}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
  })

  if (error) {
    console.error('[inquiry] Resend error:', error)
    return { success: false, error: 'Failed to send your inquiry. Please try again or email us directly.' }
  }

  return { success: true }
}
