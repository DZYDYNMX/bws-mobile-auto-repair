import React from 'react';
import { Home, Wrench, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

import Link from 'next/link';

export type SectionType = 'home' | 'services' | 'contact';

interface BottomNavProps {
  activeSection: SectionType;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeSection }) => {
  const tabs = [
    { id: 'home' as SectionType, label: 'Home', icon: Home, href: '/' },
    { id: 'services' as SectionType, label: 'Services', icon: Wrench, href: '/services' },
    { id: 'contact' as SectionType, label: 'Book', icon: Calendar, href: '/contact' },
  ];

  return (
    <nav className="app-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer',
              position: 'relative',
              padding: '8px 12px',
              borderRadius: '16px',
              flex: 1,
              outline: 'none',
              zIndex: 1,
              textDecoration: 'none',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBg"
                style={{
                  position: 'absolute',
                  top: 2,
                  left: 12,
                  right: 12,
                  bottom: 2,
                  background: 'var(--accent-orange-glow)',
                  border: '1px solid rgba(224, 92, 26, 0.2)',
                  borderRadius: '12px',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            
            <motion.div
              animate={{
                scale: isActive ? 1.15 : 1,
                color: isActive ? 'var(--accent-orange)' : 'var(--text-secondary)'
              }}
              transition={{ duration: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon size={20} />
            </motion.div>

            <span
              style={{
                fontSize: '10px',
                fontWeight: isActive ? 700 : 600,
                color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)',
                letterSpacing: '0.2px',
                transition: 'color 0.3s ease',
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
