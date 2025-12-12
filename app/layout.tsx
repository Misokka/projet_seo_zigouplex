import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import SchemaScript from './components/SchemaScript'
import ClientLayout from './components/ClientLayout'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Salon de coiffure Patricia Osores - Liège',
  description:
    'Découvrez le salon de coiffure Patricia Osores à Liège. Un espace chaleureux et élégant dédié à la beauté et au bien-être capillaire.',
  openGraph: {
    title: 'Salon de coiffure Patricia Osores - Liège',
    description:
      'Un salon chic et accueillant à Liège, où élégance et savoir-faire se rencontrent pour sublimer vos cheveux.',
    url: 'https://patricia-osores.fr',
    siteName: 'Salon Patricia Osores',
    images: [
      {
        url: '/images/og-patricia.jpg',
        width: 800,
        height: 600,
        alt: 'Salon Patricia Osores Liège',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <SchemaScript />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://patricia-osores.fr" />
      </head>

      <body className="bg-light text-dark font-base antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
