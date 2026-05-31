import { Metadata } from 'next';
import { ServicesClient } from '../../../components/ServicesClient';

export function generateStaticParams() {
  return [
    { id: 'diagnostics' },
    { id: 'brakes' },
    { id: 'engine' },
    { id: 'maintenance' },
    { id: 'inspection' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  const serviceNames: Record<string, string> = {
    diagnostics: 'Check Engine Light & Diagnostics',
    brakes: 'Mobile Brake Repair & Pad Replacement',
    engine: 'Engine Cooling & Belt Replacement',
    maintenance: 'Mobile Oil Changes & Tune-Ups',
    inspection: 'Pre-Purchase Used Car Inspections',
  };

  const title = serviceNames[id] || 'Mobile Mechanic Services';
  
  return {
    title: `${title} | BWS Mobile Auto Repair`,
    description: `Professional, on-site ${title.toLowerCase()} right in your driveway. Transparent pricing and expert service in Prince George, Virginia.`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Renders the services grid and immediately opens the correct bottom sheet
  return <ServicesClient initialServiceId={id} />;
}
