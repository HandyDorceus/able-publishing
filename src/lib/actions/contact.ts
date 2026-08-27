'use server'

import { Resend } from 'resend'
import { CONTACT } from '@/lib/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactState {
  success: boolean
  error?: string
  fieldErrors?: Partial<Record<'name' | 'email' | 'department' | 'subject' | 'message', string>>
}

const DEPARTMENTS = ['general', 'publishing', 'orders', 'support'] as const
type Department = typeof DEPARTMENTS[number]

// ─── Action ───────────────────────────────────────────────────────────────────

export async function submitContact(
  _prevState: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill this hidden field; humans leave it empty
  if (formData.get('_gotcha')) return { success: false, error: 'Submission rejected.' }

  const name       = String(formData.get('name')       ?? '').trim()
  const email      = String(formData.get('email')      ?? '').trim()
  const department = String(formData.get('department') ?? 'general').trim() as Department
  const subject    = String(formData.get('subject')    ?? '').trim()
  const message    = String(formData.get('message')    ?? '').trim()

  // Field validation
  const fieldErrors: ContactState['fieldErrors'] = {}
  if (!name)                                                             fieldErrors.name    = 'Name is required.'
  if (!email)                                                            fieldErrors.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))                   fieldErrors.email   = 'Enter a valid email address.'
  if (!DEPARTMENTS.includes(department as Department))                   fieldErrors.department = 'Please select a department.'
  if (!message)                                                          fieldErrors.message = 'Message is required.'
  else if (message.length < 20)                                          fieldErrors.message = 'Please provide a bit more detail (20+ characters).'

  if (Object.keys(fieldErrors).length > 0) return { success: false, fieldErrors }

  const recipient = CONTACT[DEPARTMENTS.includes(department as Department) ? department : 'general']

  const { error } = await resend.emails.send({
    from:    'ABLE Publishing <no-reply@ablepublishing.art>',
    to:      recipient,
    replyTo: email,
    subject: subject || `New ${department} inquiry from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Department:</strong> ${department}</p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      <hr />
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return { success: false, error: 'Failed to send your message. Please try again or email us directly.' }
  }

  return { success: true }
}
