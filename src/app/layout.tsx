import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Able Publishing',
  description: 'Achieving Beyond Limits & Expectations',
  icons: {
    icon: '/favicon.ico',
    apple: '/logos/able-publishing/Pen_Icon.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
