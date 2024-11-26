import Script from 'next/script'

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Zigouplex",
  "image": "/images/bakery-hero.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue de la Boulangerie",
    "addressLocality": "Paris",
    "postalCode": "75001",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8566,
    "longitude": 2.3522
  },
  "url": "https://zigouplex.fr",
  "telephone": "+33123456789",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "€€"
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