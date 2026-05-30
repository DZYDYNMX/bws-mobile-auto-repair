import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import type { SectionType } from './components/BottomNav';
import { HomeSection } from './components/HomeSection';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { ServiceDetailSheet } from './components/ServiceDetailSheet';
import { LegalSheet } from './components/LegalSheet';

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [showLegalSheet, setShowLegalSheet] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handleOpenLegal = (e: CustomEvent) => {
      setShowLegalSheet(e.detail);
    };
    window.addEventListener('open-legal-sheet', handleOpenLegal as EventListener);
    return () => window.removeEventListener('open-legal-sheet', handleOpenLegal as EventListener);
  }, []);
  
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  // Drawer detail booking click
  const handleDetailBooking = (serviceId: string) => {
    setSelectedServiceId(null); // Close sheet
    
    const titleMap: Record<string, string> = {
      'diagnostics': 'Electrical & Diagnostics',
      'brakes': 'Brakes & Suspension',
      'engine': 'Engine & Drivetrain',
      'maintenance': 'Oil & Fluid Maintenance',
      'inspection': 'Pre-Purchase Inspection',
      'general': 'General Repair / Other'
    };
    setSelectedPackage(titleMap[serviceId] || serviceId);
    setActiveSection('contact');
  };

  const handleNavigation = (section: SectionType | string) => {
    setActiveSection(section as SectionType);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection onNavigate={handleNavigation} />;
      case 'services':
        return <ServicesSection onSelectService={(id) => setSelectedServiceId(id)} />;
      case 'reviews':
        return <ReviewsSection />;
      case 'contact':
        return (
          <ContactSection
            initialPackage={selectedPackage}
            onNavigate={handleNavigation}
          />
        );
      default:
        return <HomeSection onNavigate={handleNavigation} />;
    }
  };

  return (
    <>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Section Content Wrapper with Animating Transitions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
          {/* Hack to pass down onOpenLegal without prop-drilling into 10 layers, but I can actually just define it globally or pass it down via a Context... Actually, I'll just keep it simple and pass it to Footer via Context if needed, or wait, I already pass onNavigate. I will add a window.dispatchEvent hack or context for simplicity. Let's just create a context for Footer actions. */}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Sheets */}
      <AnimatePresence>
        {selectedServiceId && (
          <ServiceDetailSheet
            serviceId={selectedServiceId}
            onClose={() => setSelectedServiceId(null)}
            onBook={handleDetailBooking}
          />
        )}
        <LegalSheet 
          type={showLegalSheet}
          onClose={() => setShowLegalSheet(null)}
        />
      </AnimatePresence>
    </>
  );
}

export default App;
