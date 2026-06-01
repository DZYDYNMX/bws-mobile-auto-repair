import { Metadata } from 'next';
import App from '../../page';

export const runtime = 'edge';

export function generateStaticParams() {
  return [
    { city: 'prince-george' },
    { city: 'hopewell' },
    { city: 'petersburg' },
    { city: 'colonial-heights' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  
  // Format city name from "san-mateo" to "San Mateo"
  const formattedCity = city
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Mobile Mechanic in ${formattedCity} | BWS Mobile Auto Repair`,
    description: `Expert mobile auto repair serving ${formattedCity}. We bring the repair shop to your driveway. Check engine light diagnostics, brake pad replacement, and preventative maintenance.`,
    openGraph: {
      title: `Mobile Mechanic in ${formattedCity} | BWS Mobile Auto Repair`,
      description: `Expert mobile auto repair serving ${formattedCity}. We bring the repair shop to your driveway. Check engine light diagnostics, brake pad replacement, and preventative maintenance.`,
      url: `https://bwsmobileautorepair.com/locations/${city}`,
    }
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  // For locations, we just render the main homepage, but Google sees the highly targeted metadata above.
  return <App />;
}
