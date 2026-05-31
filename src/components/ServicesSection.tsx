"use client";
import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Footer } from './Footer';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

const services = [
  { id: 'diagnostics', title: 'Electrical & Diagnostics', tagline: 'Check Engine Lights & Power Issues', shortDesc: 'We diagnose and repair check engine lights, dead batteries, faulty alternators, starters, and complex electrical shorts right in your driveway.' },
  { id: 'brakes', title: 'Brakes & Suspension', tagline: 'Safety & Ride Quality', shortDesc: 'Complete brake jobs including pads, rotors, and calipers. We also handle shocks, struts, control arms, and other suspension components.' },
  { id: 'engine', title: 'Engine & Cooling', tagline: 'Belts, Pumps & Radiators', shortDesc: 'Serpentine belts, timing belts, water pumps, radiators, and cooling fans. We keep your engine running at the right temperature.' },
  { id: 'maintenance', title: 'Preventative Maintenance', tagline: 'Fluids & Tune-ups', shortDesc: 'Mobile oil changes, transmission fluid service, coolant flushes, spark plugs, and ignition coils to keep your vehicle reliable.' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 28 } }
  };

  return (
    <motion.div className="scroll-container" variants={containerVariants} initial="hidden" animate="visible">
      <div style={{ padding: '4px 0 8px 0' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px', color: 'var(--navy)' }}>Our Mechanic Services</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Tap any service category to learn more about the common repairs we perform on-site.
        </p>
      </div>

      <div className="responsive-grid-2">
        {services.map((service) => (
          <motion.a
            key={service.id}
            href={`/services/${service.id}`}
            className="service-card"
            variants={cardVariants}
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', `/services/${service.id}`);
              onSelectService(service.id);
            }}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
            whileTap={{ scale: 0.99 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--navy)', fontWeight: 800, lineHeight: 1.2, margin: 0 }}>{service.title}</h3>
            </div>

            <p style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              {service.tagline}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '18px', flex: 1 }}>
              {service.shortDesc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--navy)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>View Service Details</span>
              <ChevronRight size={16} />
            </div>
          </motion.a>
        ))}
      </div>
      
      {/* Pre-purchase Inspection Callout */}
      <motion.div
        variants={cardVariants}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '19px', color: 'var(--navy)', fontWeight: 800 }}>Pre-Purchase Used Car Inspections</h4>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
          Buying a used car? Have us come out and inspect it before you hand over the cash. We'll check the engine, transmission, brakes, and scan the computer for hidden codes so you know exactly what you're buying. Protect your investment with a professional second opinion.
        </p>
      </motion.div>
      <Footer />
    </motion.div>
  );
};
