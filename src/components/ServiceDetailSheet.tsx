"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Timer, Calendar, ShieldAlert } from 'lucide-react';

interface ServiceDetailSheetProps {
  serviceId: string | null;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export const ServiceDetailSheet: React.FC<ServiceDetailSheetProps> = ({ serviceId, onClose, onBook }) => {
  useEffect(() => {
    // Bulletproof scroll lock (especially for iOS Safari)
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  if (!serviceId) return null;

  const detailsMap: Record<string, {
    title: string;
    duration: string;
    description: string;
    seoContent?: string;
    servicesIncluded: string[];
    signsYouNeedThis?: string[];
    warnings?: string[];
  }> = {
    'diagnostics': {
      title: 'Electrical & Diagnostics',
      duration: 'On-Site Diagnostic Scan',
      description: 'Modern vehicles rely heavily on complex electrical systems. We bring advanced dealership-level diagnostic scanners directly to your driveway to accurately identify the root cause of check engine lights or starting issues.',
      seoContent: 'When your check engine light illuminates in Prince George or Hopewell, ignoring it can lead to expensive engine damage. Our mobile diagnostic service utilizes state-of-the-art OBD2 scanners to pull error codes, check live sensor data, and perform electrical load testing right in your driveway. From faulty oxygen sensors and loose gas caps to complex wiring issues and dead alternators, our expert mobile mechanics quickly pinpoint the exact cause of your vehicle\'s problem so you can get back on the road safely and affordably.',
      servicesIncluded: [
        'Full OBD2 computer system scan',
        'Battery load and health testing',
        'Alternator voltage and output test',
        'Starter amp draw test',
        'Visual wiring and fuse inspection'
      ],
      signsYouNeedThis: [
        'Check Engine Light is illuminated or flashing',
        'Car struggles to start or clicks when turning the key',
        'Headlights dim when accelerating',
        'Battery dies frequently'
      ],
      warnings: [
        'If your check engine light is flashing red, pull over safely and turn off the engine immediately to prevent severe damage.'
      ]
    },
    'brakes': {
      title: 'Brakes & Suspension',
      duration: 'Safety Critical Repair',
      description: 'Your braking and suspension systems are the most important safety features on your vehicle. We handle complete brake jobs and suspension replacements safely and cleanly right where your car is parked.',
      seoContent: 'Don\'t take chances with worn-out brakes in Central Virginia. Our mobile brake repair service in Prince George and Petersburg provides dealership-quality pad replacements and rotor resurfacing without the hassle of a traditional repair shop. If you hear squealing when you stop, feel a vibration in your steering wheel, or notice your brake pedal feels soft, it\'s time for an immediate inspection. We use premium ceramic or semi-metallic pads and high-quality rotors to ensure smooth, quiet, and reliable stopping power. We handle the entire repair safely in your driveway or office parking lot.',
      servicesIncluded: [
        'Premium ceramic or semi-metallic pad installation',
        'Rotor resurfacing or replacement',
        'Caliper inspection and slide pin lubrication',
        'Brake fluid condition check and top-off',
        'Inspection of shocks, struts, and control arms'
      ],
      signsYouNeedThis: [
        'Squeaking, squealing, or grinding noises when braking',
        'Steering wheel shakes or vibrates when slowing down',
        'Brake pedal feels soft or goes to the floor',
        'Vehicle pulls to one side when braking'
      ],
      warnings: [
        'We always recommend replacing brake pads and rotors in pairs (front or rear) to ensure even braking performance and safety.'
      ]
    },
    'engine': {
      title: 'Engine & Cooling Systems',
      duration: 'Component Replacement',
      description: 'An overheating engine can destroy a motor in minutes. We provide mobile replacement of critical cooling system components and drive belts to keep your engine running at the optimal temperature.',
      seoContent: 'An overheating engine or a snapped serpentine belt can leave you stranded. Our mobile mechanics specialize in critical cooling system and belt repairs across Prince George, Hopewell, and Petersburg. Whether you have a leaking water pump, a cracked radiator, a stuck thermostat, or a squealing drive belt, we arrive fully equipped to replace the faulty components on-site. We perform thorough pressure tests to locate hidden coolant leaks and ensure your engine maintains its optimal operating temperature, protecting you from catastrophic engine failure.',
      servicesIncluded: [
        'Serpentine and drive belt replacement',
        'Water pump replacement',
        'Radiator and cooling fan installation',
        'Coolant system pressure testing for leaks',
        'Thermostat replacement'
      ],
      signsYouNeedThis: [
        'Temperature gauge reads high or in the red zone',
        'Sweet-smelling steam coming from under the hood',
        'High-pitched squealing from belts upon start-up',
        'Puddles of green, pink, or orange fluid under the car'
      ],
      warnings: [
        'Never attempt to open a radiator cap while the engine is hot. Pressurized boiling coolant can cause severe burns.'
      ]
    },
    'maintenance': {
      title: 'Preventative Maintenance',
      duration: 'Routine Upkeep',
      description: 'The best way to avoid expensive breakdowns is regular maintenance. We perform the same scheduled maintenance as the dealership, but we do it at your convenience without the waiting room.',
      seoContent: 'Routine maintenance is the key to extending the life of your vehicle and maximizing fuel economy. BWS Mobile Auto Repair offers comprehensive mobile preventative maintenance in Prince George, bringing essential services like full synthetic oil changes, spark plug replacements, and fluid top-offs directly to you. Instead of wasting your Saturday in a dealership waiting room, let our expert mechanics perform your scheduled service while you relax at home or work. We use premium filters, high-grade fluids, and OEM-quality parts to keep your car running like new.',
      servicesIncluded: [
        'Full synthetic and conventional oil changes',
        'Spark plug and ignition coil replacement (Tune-Up)',
        'Transmission fluid drain and fill',
        'Engine air filter and cabin air filter replacement',
        'Comprehensive fluid level checks and top-offs'
      ],
      signsYouNeedThis: [
        'Reaching your vehicle\'s scheduled mileage interval',
        'Maintenance Required light is illuminated',
        'Rough idling or poor fuel economy',
        'Transmission shifting feels harsh or delayed'
      ]
    }
  };

  const details = detailsMap[serviceId] || detailsMap['diagnostics'];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          zIndex: 300,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 400 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '88vh',
            background: 'var(--bg-card)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderTop: '1px solid var(--border-color)',
            borderLeft: '1px solid var(--border-color)',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >

          <div style={{
            width: '100%',
            height: '180px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img 
              src={`/services/${serviceId}.webp`} 
              alt={details.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)' }} />
            <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
              <X size={15} />
            </button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 20px 14px 20px',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div>
              <h2 style={{ fontSize: '22px', color: 'var(--navy)', margin: 0 }}>{details.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-orange)', fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>
                <Timer size={14} />
                <span>{details.duration}</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '20px 20px 0 20px', display: 'flex', gap: '12px' }}>
            <a 
              href="tel:8048946591"
              className="btn-outline"
              style={{ flex: 1, fontSize: '15px', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}
            >
              <span>Call Us</span>
            </a>
            <motion.button
              className="btn-orange"
              style={{ flex: 1, fontSize: '15px', padding: '12px 16px', borderRadius: '12px' }}
              onClick={() => onBook(serviceId)}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar size={18} />
              <span>Request</span>
            </motion.button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '20px 20px 32px 20px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              {details.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '24px' }}>
              {details.signsYouNeedThis && (
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px' }}>
                  <h3 style={{ fontSize: '14px', color: 'var(--navy)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 800 }}>Common Symptoms</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {details.signsYouNeedThis.map(item => (
                      <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-orange)', marginTop: '8px', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.5', fontWeight: 500 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '14px', color: 'var(--navy)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 800 }}>Services We Perform</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {details.servicesIncluded.map(item => (
                    <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <Check size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.4' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {details.warnings && (
              <div style={{ background: 'rgba(224, 92, 26, 0.05)', border: '1px solid rgba(224, 92, 26, 0.15)', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {details.warnings.map((w, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <ShieldAlert size={16} style={{ color: 'var(--accent-orange)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--navy)', fontSize: '14px', lineHeight: '1.5', fontWeight: 600 }}>{w}</span>
                  </div>
                ))}
              </div>
            )}

            {details.seoContent && (
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  {details.seoContent}
                </p>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
