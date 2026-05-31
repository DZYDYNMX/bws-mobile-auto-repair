import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface CalculatorSectionProps {
  onEstimateChange?: (estimateDetails: {
    packageName: string;
    vehicleSize: string;
    addOns: string[];
    totalPrice: number;
  }) => void;
  onEstimateSubmit?: (estimateDetails: {
    packageName: string;
    vehicleSize: string;
    addOns: string[];
    totalPrice: number;
  }) => void;
  /** When true, renders without a scroll-container wrapper (for embedding inside other layouts) */
  inlineMode?: boolean;
  hideCTA?: boolean;
  initialPackage?: 'full' | 'interior' | 'express';
  initialVehicleSize?: 'sedan' | 'midsize' | 'large' | 'xl';
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onEstimateSubmit, onEstimateChange, inlineMode, hideCTA, initialPackage, initialVehicleSize }) => {
  const [activePackage, setActivePackage] = useState<'full' | 'interior' | 'express'>(initialPackage || 'full');
  const [vehicleSize, setVehicleSize] = useState<'sedan' | 'midsize' | 'large' | 'xl'>(initialVehicleSize || 'sedan');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(260);

  // Pricing definitions based on original content
  const basePrices = {
    full: { sedan: 260, midsize: 280, large: 300, xl: 340 },
    interior: { sedan: 160, midsize: 180, large: 190, xl: 220 },
    express: { sedan: 100, midsize: 125, large: 135, xl: 230 }, // xl represents truck/trailers or average xl price
  };

  const addOnsList = [
    { id: 'headlight', name: 'Headlight Restoration', price: 95 },
    { id: 'sealant', name: 'Paint Sealant', price: 50 },
    { id: 'carseat', name: 'Kid Car Seat Sanitize', price: 25 },
    { id: 'rainx', name: 'Rain-X Treatment', price: 20 },
    { id: 'pethair', name: 'Pet Hair Fee (Severe)', price: 50 },
  ];

  const pkgLabels = { full: 'Full Detail', interior: 'Interior Detail', express: 'Express Detail' };
  const sizeLabels = {
    sedan: 'Coupe / Sedan',
    midsize: 'Midsize Truck/SUV',
    large: 'Large Truck / 3-Row SUV',
    xl: 'Extra Large Truck / Van / RV'
  };

  // Recalculate price whenever inputs change
  useEffect(() => {
    let base = basePrices[activePackage][vehicleSize];
    let addonsCost = selectedAddOns.reduce((sum, addOnId) => {
      const match = addOnsList.find(a => a.id === addOnId);
      return sum + (match ? match.price : 0);
    }, 0);
    const newTotal = base + addonsCost;
    setTotalPrice(newTotal);

    if (onEstimateChange) {
      const selectedAddOnNames = selectedAddOns.map(id => {
        const match = addOnsList.find(a => a.id === id);
        return match ? match.name : id;
      });

      onEstimateChange({
        packageName: pkgLabels[activePackage],
        vehicleSize: sizeLabels[vehicleSize],
        addOns: selectedAddOnNames,
        totalPrice: newTotal
      });
    }
  }, [activePackage, vehicleSize, selectedAddOns]);

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleBook = () => {
    const selectedAddOnNames = selectedAddOns.map(id => {
      const match = addOnsList.find(a => a.id === id);
      return match ? match.name : id;
    });

    if (onEstimateSubmit) {
      onEstimateSubmit({
        packageName: pkgLabels[activePackage],
        vehicleSize: sizeLabels[vehicleSize],
        addOns: selectedAddOnNames,
        totalPrice
      });
    }
  };

  const inner = (
    <div className="calculator-container">
      {/* Step 1: Package Selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Detailing Package
        </label>
        <div className="segmented-control" style={{ gap: '4px' }}>
          <button
            onClick={() => setActivePackage('full')}
            className={`segment-btn ${activePackage === 'full' ? 'active' : ''}`}
          >
            Full Detail
          </button>
          <button
            onClick={() => setActivePackage('interior')}
            className={`segment-btn ${activePackage === 'interior' ? 'active' : ''}`}
          >
            Interior
          </button>
          <button
            onClick={() => setActivePackage('express')}
            className={`segment-btn ${activePackage === 'express' ? 'active' : ''}`}
          >
            Express
          </button>
        </div>
      </div>

      {/* Step 2: Vehicle Size */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Vehicle Size
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { id: 'sedan', label: 'Coupe / Sedan' },
            { id: 'midsize', label: 'Midsize SUV' },
            { id: 'large', label: 'Large SUV (3-row)' },
            { id: 'xl', label: 'Extra Large / Truck' }
          ].map((size) => (
            <motion.button
              key={size.id}
              onClick={() => setVehicleSize(size.id as any)}
              style={{
                background: vehicleSize === size.id ? 'var(--accent-red-glow)' : 'var(--bg-card)',
                border: vehicleSize === size.id ? '1px solid var(--accent-red)' : '1px solid var(--border-color)',
                color: vehicleSize === size.id ? 'var(--accent-red)' : 'var(--text-secondary)',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center'
              }}
              whileTap={{ scale: 0.97 }}
            >
              {size.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Step 3: Add-ons checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Optional Enhancements
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {addOnsList.map((addon) => {
            const isChecked = selectedAddOns.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                style={{
                  background: isChecked ? 'var(--accent-red-glow)' : 'var(--bg-card)',
                  border: isChecked ? '1px solid rgba(212, 43, 43, 0.3)' : '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isChecked ? 'none' : '1.5px solid var(--text-muted)',
                    background: isChecked ? 'var(--accent-red)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    transition: 'all 0.15s ease'
                  }}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 500 }}>
                    {addon.name}
                  </span>
                </div>
                <span style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '13px' }}>
                  +${addon.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline price display - only show in standalone mode */}
      {!inlineMode && (
        <>
          <div className="price-display-box" style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Estimated Mobile Quote
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px', margin: '4px 0' }}>
              <span style={{ fontSize: '36px', fontWeight: 900, color: 'var(--accent-red)' }}>
                ${totalPrice}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>&amp; up</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              <ShieldCheck size={12} style={{ color: 'var(--success)' }} />
              <span>Includes 100% mobile service at your location</span>
            </div>
          </div>

          <div style={{
            background: 'rgba(212, 43, 43, 0.05)',
            border: '1px solid rgba(212, 43, 43, 0.15)',
            borderRadius: '12px',
            padding: '14px 16px',
            marginTop: '16px',
            marginBottom: '16px'
          }}>
            <h4 style={{ fontSize: '12px', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: 700 }}>After You Request Booking</h4>
            {[
              'Your specs are sent directly to Ronnie',
              'She reviews and calls you to confirm pricing',
              'You pick a time, and she comes to your location'
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 2 ? '8px' : 0 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-red)', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{step}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Final CTA Button */}
      {!hideCTA && (
        <motion.button
          className="btn-red"
          style={{ width: '100%', marginTop: inlineMode ? '0' : undefined }}
          onClick={handleBook}
          whileTap={{ scale: 0.98 }}
        >
          <span>Request Booking with these Specs</span>
          <ArrowRight size={16} />
        </motion.button>
      )}
    </div>
  );

  if (inlineMode) return inner;
  return <div className="scroll-container">{inner}</div>;
};
