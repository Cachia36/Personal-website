import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kyle | Freelance Web Developer',
  description: 'Custom websites for entrepreneur, professionals, and businesses.',
  generator: 'v0.dev',
  verification: {
    google: 'ODbmiq3jx1AAEfIkie2FEhL4-W1KjzkOZE9_vfBK3qU',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
