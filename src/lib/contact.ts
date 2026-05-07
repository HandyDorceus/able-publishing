export const CONTACT = {
  general:    'info@ablepublishing.art',
  publishing: 'publishing@ablepublishing.art',
  orders:     'orders@ablepublishing.art',
  support:    'support@ablepublishing.art',
} as const

export const SOCIAL = {
  instagram: {
    href:   'https://www.instagram.com/theothersideofthepen?igsh=a3pnY3BvcmpwNWd2',
    handle: '@theothersideofthepen',
    label:  'Follow The Other Side of the Pen on Instagram',
  },
} as const

export type ContactKey = keyof typeof CONTACT
export type SocialKey  = keyof typeof SOCIAL
