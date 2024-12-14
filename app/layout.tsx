import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SchemaScript from './components/SchemaScript';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zigouplex - Boulangerie Artisanale à Paris',
  description:
    'Découvrez Zigouplex, votre boulangerie artisanale à Paris. Des pains et viennoiseries faits maison avec des ingrédients locaux.',
  openGraph: {
    title: 'Zigouplex - Boulangerie Artisanale à Paris',
    description:
      'Découvrez Zigouplex, votre boulangerie artisanale à Paris. Des pains et viennoiseries faits maison avec des ingrédients locaux.',
    url: 'https://zigouplex.fr',
    siteName: 'Zigouplex',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Zigouplex Boulangerie',
      },
    ],
  },
};

export default function Layout({ children }) {
  return (
    <html lang="fr">
      <head>
        <SchemaScript />
        <meta name="google-site-verification" content="fg-39JP0ljmWHHZDFQ1ZICjkfnL32608bf7yGJIhOnM" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.zigouplex.site/" />
      </head>

      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-brown">Zigouplex</h1>

            {/* Navigation */}
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="/#home"
                    className="text-gray-700 hover:text-brown font-medium transition"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="/#about"
                    className="text-gray-700 hover:text-brown font-medium transition"
                  >
                    À propos
                  </a>
                </li>
                <li>
                  <a
                    href="/#products"
                    className="text-gray-700 hover:text-brown font-medium transition"
                  >
                    Produits
                  </a>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="text-gray-700 hover:text-brown font-medium transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
