'use server'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactState {
  success: boolean
  error?: string
  fieldErrors?: Partial<Record<'name' | 'email' | 'subject' | 'message', string>>
}

// ─── Action ───────────────────────────────────────────────────────────────────

export async function submitContact(
  _prevState: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill this hidden field; humans leave it empty
  if (formData.get('_gotcha')) return { success: false, error: 'Submission rejected.' }

  const name    = String(formData.get('name')    ?? '').trim()
  const email   = String(formData.get('email')   ?? '').trim()
  const subject = String(formData.get('subject') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  // Field validation
  const fieldErrors: ContactState['fieldErrors'] = {}
  if (!name)                                   fieldErrors.name = 'Name is required.'
  if (!email)                                  fieldErrors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = 'Enter a valid email address.'
  if (!message)                                fieldErrors.message = 'Message is required.'
  else if (message.length < 20)               fieldErrors.message = 'Please provide a bit more detail (20+ characters).'

  if (Object.keys(fieldErrors).length > 0) return { success: false, fieldErrors }

  // TODO: ALAN — Send email via Resend / SendGrid / similar:
  //   await resend.emails.send({
  //     from: 'website@ablepublishing.art',
  //     to:   'info@ablepublishing.art',  // from Keystatic site_settings
  //     subject: subject || `New message from ${name}`,
  //     text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  //   })

  return { success: true }
}
