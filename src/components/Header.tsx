import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SectionType } from './BottomNav';

interface HeaderProps {
  activeSection?: SectionType;
  setActiveSection?: (section: SectionType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const tabs = [
    { id: 'home' as SectionType, label: 'Home' },
    { id: 'services' as SectionType, label: 'Services' },
    { id: 'reviews' as SectionType, label: 'Reviews' },
    { id: 'contact' as SectionType, label: 'Book Mechanic' },
  ];

  return (
    <header className="app-header">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', lineHeight: 1 }}>
        <span style={{ fontSize: '14px', color: 'var(--accent-orange)', fontWeight: 800, letterSpacing: '0.36em', textTransform: 'uppercase', paddingLeft: '0.18em' }}>
          Peninsula
        </span>
        <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 700, letterSpacing: '0.02em', color: '#ffffff', textTransform: 'uppercase' }}>
          Mobile Mechanic
        </h1>
      </div>

      {/* Desktop Horizontal Navigation Links */}
      <div className="desktop-nav-links">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection && setActiveSection(tab.id)}
            className={`desktop-nav-link ${activeSection === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.a
          href="tel:6418402842"
          style={{
            background: 'var(--accent-orange)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: 'var(--shadow-orange)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone size={14} />
          <span>Call Us</span>
        </motion.a>
      </div>
    </header>
  );
};
