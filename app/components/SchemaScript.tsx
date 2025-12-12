import Script from 'next/script'

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Salon de coiffure Patricia Osores",
  "image": "/images/hero-coiffure.jpg",
  "description": "Le salon de coiffure Patricia Osores à Liège vous accueille dans une ambiance chaleureuse et élégante pour sublimer vos cheveux. Spécialiste en coupe, coloration et soins capillaires.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1 Place République Française 34",
    "addressLocality": "Liège",
    "postalCode": "4000",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.633,
    "longitude": 5.567
  },
  "url": "https://patricia-osores.fr",
  "telephone": "+32496714115",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday"],
      "opens": "10:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "€€",
  "sameAs": [
    "https://www.facebook.com/salon.de.coiffure.patricia",
  ]
}

export default function SchemaScript() {
  return (
    <Script
      id="schema-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd)
      }}
    />
  )
}
