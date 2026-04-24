import type { Metadata } from 'next'
import { MissionBlock } from '@/components/content/MissionBlock'
import { ValuesGrid }   from '@/components/content/ValuesGrid'
import { BrandStatement } from '@/components/content/BrandStatement'

export const metadata: Metadata = {
  title:       'About — ABLE Publishing',
  description: 'ABLE Publishing is an independent creative house built for artists who refuse to be overlooked.',
}

// TODO: ALAN — Replace with Keystatic reads (step 10) from team / singletons.

const VALUES = [
  {
    title:       'Independence',
    description: 'We believe creators should own their work and their story. Every service we offer is designed to keep you in control.',
  },
  {
    title:       'Excellence',
    description: 'Achieving beyond limits means holding every project to the highest standard — from cover design to distribution.',
  },
  {
    title:       'Community',
    description: 'We are stronger together. ABLE Publishing is a home for artists who lift each other up.',
  },
  {
    title:       'Authenticity',
    description: 'We don\'t chase trends. We help you make the work that only you can make, then put it in front of the people who need it.',
  },
  {
    title:       'Access',
    description: 'Professional publishing should not be reserved for the well-connected. We open doors that have historically been closed.',
  },
  {
    title:       'Legacy',
    description: 'Great work deserves to last. We publish with permanence in mind — building catalogues that endure.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Mission / hero */}
      {/* TODO: ALAN — Update copy in Keystatic at /admin → homepage or team singleton */}
      <MissionBlock
        headline="Built for Creators Who Refuse to Be Overlooked"
        body={
          'ABLE Publishing was founded on a simple belief: every story, every song, and every poem deserves the platform it needs to reach the people who need it.\n\n' +
          'We partner with independent authors, musicians, and poets to produce, publish, and promote work with the care and professionalism it deserves — without asking you to give up ownership or control.\n\n' +
          'Achieving Beyond Limits & Expectations is not just a tagline. It is our operating principle.'
        }
      />

      {/* Values */}
      <ValuesGrid
        heading="What We Stand For"
        values={VALUES}
      />

      {/* Closing statement */}
      <BrandStatement
        statement="Every voice deserves to be heard. We are here to make sure yours is."
        cta={{ label: 'Work With Us', href: '/services' }}
      />
    </>
  )
}
