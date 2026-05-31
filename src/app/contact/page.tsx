import { Metadata } from 'next';
import { ContactClient } from '../../components/ContactClient';

export const metadata: Metadata = {
  title: 'Book a Mobile Mechanic | Peninsula Mobile Mechanic',
  description: 'Request a free quote or book an onsite mobile mechanic directly to your driveway. Fast, transparent pricing and reliable service.',
};

export default function ContactPage() {
  return <ContactClient />;
}
