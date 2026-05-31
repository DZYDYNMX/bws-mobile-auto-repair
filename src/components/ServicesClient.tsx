"use client";
import { useState, useEffect } from 'react';
import { ServicesSection } from './ServicesSection';
import { ServiceDetailSheet } from './ServiceDetailSheet';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const ServicesClient = ({ initialServiceId = null }: { initialServiceId?: string | null }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialServiceId);
  const router = useRouter();

  // Sync sheet state with back button (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/services') {
        setSelectedServiceId(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleBook = (id: string) => {
    router.push(`/contact?service=${id}`);
  };

  return (
    <>
      <ServicesSection onSelectService={(id) => setSelectedServiceId(id)} />
      <AnimatePresence>
        {selectedServiceId && (
          <ServiceDetailSheet
            serviceId={selectedServiceId}
            onClose={() => {
              window.history.pushState(null, '', '/services');
              setSelectedServiceId(null);
            }}
            onBook={handleBook}
          />
        )}
      </AnimatePresence>
    </>
  );
};
