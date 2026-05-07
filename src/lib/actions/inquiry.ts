'use server'

import { CONTACT } from '@/lib/contact'

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

  const recipient = CONTACT.publishing

  // TODO: ALAN — Send email via Resend / SendGrid / similar:
  //   await resend.emails.send({
  //     from:    'website@ablepublishing.art',
  //     to:      recipient,
  //     subject: `New inquiry — ${serviceType}`,
  //     text:    `Name: ${name}\nEmail: ${email}\nService: ${serviceType}\n\n${message}`,
  //   })

  void recipient // referenced above — remove this line when email sending is wired

  return { success: true }
}
