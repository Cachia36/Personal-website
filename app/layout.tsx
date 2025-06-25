import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kyle Cachia | Freelance Web Designer & Deverloper Malta',
  icons: {
    icon: '/icon.png'
  },
  description: 'Custom websites for entrepreneurs, professionals, and businesses.',
  robots: 'index, follow',
  keywords: ['Web Developer Malta',
            'Freelance Web Developer Malta',
            'Web Designer Malta',
            'Freelance Web Designer Malta',
            'Custom Websites Malta',
            'SEO Web Design Malta',
            'Responsive Web Design Malta',
            'Website Development Malta',
          ],
  authors: [{ name: 'Kyle Cachia' }],
  generator: 'Next.js',
  metadataBase: new URL('https://v0-kyle-s-landing-page.vercel.app'),
  openGraph: {
    title: 'Kyle Cachia | Freelance Web Developer',
    description: 'Professional websites tailored for businesses and entrepreneurs.',
    url: 'https://v0-kyle-s-landing-page.vercel.app',
    siteName: 'Kyle Cachia Portfolio',
    images: [
      {
        url: '/logo_black.png', // place this in /public
        width: 1200,
        height: 630,
        alt: 'Kyle Cachia Freelance Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyle Cachia | Freelance Web Developer',
    description: 'I build custom, SEO-friendly websites for professionals.',
    images: ['/og-image.png'],
  },
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
