'use server'

import { CONTACT } from '@/lib/contact'

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

  // TODO: ALAN — Send email via Resend / SendGrid / similar:
  //   await resend.emails.send({
  //     from:    'website@ablepublishing.art',
  //     to:      recipient,
  //     subject: subject || `New message from ${name}`,
  //     text:    `Name: ${name}\nEmail: ${email}\nDepartment: ${department}\n\n${message}`,
  //   })

  void recipient // referenced above — remove this line when email sending is wired

  return { success: true }
}
