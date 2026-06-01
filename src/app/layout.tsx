import type { Metadata } from 'next';
import '../index.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'BWS Mobile Auto Repair | Mechanic in Prince George, VA',
  description: 'Your trusted mobile mechanic serving Prince George, Hopewell, and Petersburg areas in Virginia. We come directly to your driveway for auto repair, check engine light diagnostics, and routine maintenance.',
  openGraph: {
    title: 'BWS Mobile Auto Repair | Mechanic in Prince George, VA',
    description: 'Your trusted mobile mechanic serving Prince George, Hopewell, and Petersburg. We come directly to your driveway for professional auto repair.',
    url: 'https://bwsmobileautorepair.com',
    siteName: 'BWS Mobile Auto Repair',
    images: [{ url: '/hero.webp', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BWS Mobile Auto Repair | Mechanic in Prince George, VA',
    description: 'Your trusted mobile mechanic serving Prince George, Hopewell, and Petersburg. We come directly to your driveway for professional auto repair.',
    images: ['/hero.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'BWS Mobile Auto Repair',
    image: 'https://bwsmobileautorepair.com/hero.webp',
    description: 'Your trusted mobile mechanic in Prince George, Virginia. We come to you for brakes, diagnostics, maintenance, and pre-purchase inspections.',
    url: 'https://bwsmobileautorepair.com',
    telephone: '+1-804-894-6591',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 37.2185,
        longitude: -77.2831
      },
      geoRadius: 40000
    },
    priceRange: '$$'
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
