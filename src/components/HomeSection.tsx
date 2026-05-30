import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import { Footer } from './Footer';

interface HomeSectionProps {
  onNavigate: (section: 'services' | 'contact') => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 28 } }
  };

  return (
    <motion.div
      className="scroll-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingTop: 'var(--header-height)', paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
    >
      {/* Brand Hero Welcome - Full Bleed Overlay */}
      <motion.div 
        variants={itemVariants} 
        style={{
          position: 'relative',
          width: '100%',
          height: '420px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '24px'
        }}
      >
        <img 
          src="/hero.png" 
          alt="Mechanic working on a car in a driveway" 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0) 0%, rgba(13,27,42,0.6) 50%, rgba(13,27,42,0.95) 100%)', zIndex: 1 }} />
        
        <div style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center', padding: '0 20px 32px 20px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#ffffff', margin: '0 0 4px 0', lineHeight: 1.05, textTransform: 'uppercase' }}>
            YOUR MECHANIC.<br />YOUR DRIVEWAY.
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            margin: '0 0 16px 0',
            fontWeight: 500
          }}>
            No tow trucks. No waiting rooms.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', color: '#f07230' }}>
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>5.0 (14 Google Reviews)</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div style={{ padding: '0 16px 32px 16px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* Main Hero Actions */}
        <motion.div
          variants={itemVariants}
          className="service-card"
          style={{
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <h3 style={{ fontSize: '20px', color: 'var(--navy)', fontWeight: 800, margin: 0 }}>Need repairs right now?</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
            Tell us your vehicle make, model, and symptoms. We'll give you an honest quote and come directly to your location.
          </p>
          <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '4px' }}>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-orange"
              style={{ flex: 1, fontSize: '15px', padding: '14px 16px' }}
            >
              <span>Request Service</span>
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="btn-outline"
              style={{ flex: 1, fontSize: '15px', padding: '14px 16px' }}
            >
              <span>View Repairs</span>
            </button>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          variants={itemVariants}
          className="service-card"
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <div>
            <h3 style={{ fontSize: '20px', color: 'var(--navy)', margin: 0, fontWeight: 800 }}>Honest Prices. Real Experience.</h3>
            <span style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>Serving the Virginia Peninsula</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
            Dealerships overcharge and shops make you wait for weeks. We bring professional mechanic services straight to your home, office, or roadside breakdown. Get dealership-quality repairs with transparent pricing and no surprises.
          </p>
        </motion.div>

        {/* Badges */}
        <motion.div variants={itemVariants} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Identifies As</div>
              <div style={{ fontSize: '15px', color: 'var(--navy)', fontWeight: 800 }}>Veteran-Owned</div>
            </div>
          </div>
          <div style={{ width: '1px', height: '48px', background: 'var(--border-color)', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Service Area</div>
              <div style={{ fontSize: '15px', color: 'var(--navy)', fontWeight: 800 }}>Hampton, VA</div>
            </div>
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div variants={itemVariants} className="service-card">
          <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--navy)', margin: 0, fontWeight: 800 }}>Business Hours</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '15px' }}>Monday - Sunday</span>
            <span style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '15px' }}>8:00 AM - 8:00 PM</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '12px 0 0 0', lineHeight: 1.4 }}>
            * Same-day and emergency roadside appointments are available depending on schedule availability.
          </p>
        </motion.div>

        {/* Payment Options */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', padding: '10px 0 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accepted Payments</span>
          </div>
          <div className="payment-logo-grid" style={{ justifyContent: 'center', gap: '10px' }}>
            {['Cash', 'Credit/Debit', 'CashApp', 'Zelle'].map((payment) => (
              <span key={payment} className="payment-pill" style={{ padding: '8px 16px', fontSize: '13px' }}>{payment}</span>
            ))}
          </div>
        </motion.div>

      </div>
      <Footer />
    </motion.div>
  );
};
