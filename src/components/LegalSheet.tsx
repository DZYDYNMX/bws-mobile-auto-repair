import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, X } from 'lucide-react';

interface LegalSheetProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalSheet: React.FC<LegalSheetProps> = ({ type, onClose }) => {
  useEffect(() => {
    let scrollY = window.scrollY;
    
    if (type) {
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    }
    
    return () => {
      if (type) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      }
    };
  }, [type]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isPrivacy ? <ShieldCheck size={20} color="var(--accent-orange)" /> : <FileText size={20} color="var(--accent-orange)" />}
              <h2 style={{ fontSize: '20px', color: 'var(--navy)', margin: 0, fontWeight: 800 }}>
                {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
            </div>
            <button onClick={onClose} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={15} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '20px 24px 32px 24px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            {isPrivacy ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--navy)', fontWeight: 700, marginBottom: '6px' }}>1. Information We Collect</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                    We collect information you provide directly to us when requesting a service quote, including your name, phone number, location, and vehicle details. This information is used solely to provide accurate estimates and dispatch our mechanics to your location.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--navy)', fontWeight: 700, marginBottom: '6px' }}>2. How We Use Your Information</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                    Your information is used to communicate with you regarding your service requests, schedule appointments, and provide customer support. We do not sell or share your personal data with third parties for marketing purposes.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--navy)', fontWeight: 700, marginBottom: '6px' }}>3. Data Security</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                    We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--navy)', fontWeight: 700, marginBottom: '6px' }}>1. Service Agreement</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                    By requesting service from BWS Mobile Auto Repair, you agree to allow our technicians to inspect, diagnose, and repair your vehicle at the provided location. You must have authorization to authorize repairs for the vehicle.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--navy)', fontWeight: 700, marginBottom: '6px' }}>2. Pricing and Estimates</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                    All estimates provided are based on the initial information given. Final pricing may adjust if additional parts or labor are required upon physical inspection of the vehicle. We will always obtain your approval before proceeding with additional work.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--navy)', fontWeight: 700, marginBottom: '6px' }}>3. Liability and Warranties</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                    We guarantee our labor for the specific repairs performed. Parts warranties are subject to the manufacturer's terms. We are not liable for pre-existing conditions or subsequent damage unrelated to the performed repairs.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
