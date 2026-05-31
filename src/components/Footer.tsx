import React from 'react';

export const Footer: React.FC = () => {
  const openLegal = (type: string) => {
    window.dispatchEvent(new CustomEvent('open-legal-sheet', { detail: type }));
  };

  return (
    <footer className="footer-clears-nav" style={{
      padding: '24px 16px calc(var(--nav-height) + 40px) 16px',
      textAlign: 'center',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>
        BWS Mobile Auto Repair
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0' }}>
        Mobile mechanic services operating in Prince George, Hopewell, Petersburg, and Colonial Heights. We bring the repair shop directly to your driveway.
      </p>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        <a href="tel:8048946591" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          804-894-6591
        </a>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <button onClick={() => openLegal('privacy')} style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Privacy Policy</button>
        <span>|</span>
        <button onClick={() => openLegal('terms')} style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Terms of Service</button>
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
        © 2026 BWS Mobile Auto Repair. All Rights Reserved.
      </div>
    </footer>
  );
};
