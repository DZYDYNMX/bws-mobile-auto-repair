"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ContactSection } from './ContactSection';

const ContactContent = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  
  let initialPackage = undefined;
  if (serviceId) {
    const titleMap: Record<string, string> = {
      'diagnostics': 'Electrical & Diagnostics',
      'brakes': 'Brakes & Suspension',
      'engine': 'Engine & Drivetrain',
      'maintenance': 'Oil & Fluid Maintenance',
      'inspection': 'Pre-Purchase Inspection',
      'general': 'General Repair / Other'
    };
    initialPackage = titleMap[serviceId] || serviceId;
  }

  return <ContactSection initialPackage={initialPackage} />;
};

export const ContactClient = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
};
