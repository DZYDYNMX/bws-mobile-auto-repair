import { Metadata } from 'next';
import { ServicesClient } from '../../components/ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | Peninsula Mobile Mechanic',
  description: 'View our full list of mobile auto repair services including brakes, diagnostics, alternators, and general maintenance.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
