"use client";

import { usePathname } from 'next/navigation';
import { Header } from '../components/Header';
import { BottomNav, SectionType } from '../components/BottomNav';
import { LegalSheet } from '../components/LegalSheet';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showLegalSheet, setShowLegalSheet] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handleOpenLegal = (e: CustomEvent) => {
      setShowLegalSheet(e.detail);
    };
    window.addEventListener('open-legal-sheet', handleOpenLegal as EventListener);
    return () => window.removeEventListener('open-legal-sheet', handleOpenLegal as EventListener);
  }, []);

  const activeSection: SectionType = pathname.includes('/contact') ? 'contact' : pathname.includes('/services') ? 'services' : 'home';

  const getBaseRoute = (path: string) => {
    if (path.startsWith('/services')) return '/services';
    if (path.startsWith('/contact')) return '/contact';
    return '/';
  };
  const baseRoute = getBaseRoute(pathname);

  return (
    <>
      <Header activeSection={activeSection} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div
            key={baseRoute}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflowY: 'auto' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav activeSection={activeSection} />
      <AnimatePresence>
        <LegalSheet type={showLegalSheet} onClose={() => setShowLegalSheet(null)} />
      </AnimatePresence>
    </>
  );
}
