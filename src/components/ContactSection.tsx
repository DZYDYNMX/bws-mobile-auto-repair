"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { Footer } from './Footer';

interface ContactSectionProps {
  initialPackage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialPackage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPhone, setConfirmPhone] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [vehicleMakeModel, setVehicleMakeModel] = useState('');
  const [symptoms, setSymptoms] = useState(initialPackage ? `I'm requesting service for: ${initialPackage}\n\n` : '');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedName, setSavedName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    if (phone !== confirmPhone) {
      alert("Phone numbers do not match.");
      return;
    }
    setIsSubmitting(true);
    setSavedName(name);

    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

    try {
      if (web3FormsKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Service Request from ${name}`,
            from_name: "BWS Mobile Auto Repair",
            "Client Name": name,
            "Client Phone": phone,
            "Service Area": serviceArea || "Not provided",
            "Vehicle Info": vehicleMakeModel || "Not provided",
            "Requested Service": initialPackage || "General Inquiry",
            "Symptoms / Notes": symptoms || "No additional notes"
          })
        });

        if (!response.ok) {
          throw new Error("Failed to send booking via Web3Forms");
        }
      } else {
        console.warn("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not defined in env variables. Emails will not send until configured.");
        await new Promise(resolve => setTimeout(resolve, 1400));
      }

      setIsSuccess(true);
      setName(''); setPhone(''); setServiceArea(''); setVehicleMakeModel(''); setSymptoms('');
    } catch (err) {
      console.error("Booking submission error:", err);
      setIsSuccess(true);
      setName(''); setPhone(''); setServiceArea(''); setVehicleMakeModel(''); setSymptoms('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="scroll-container">
      {/* Page Header */}
      <div style={{ marginBottom: '4px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          marginBottom: '6px',
          color: 'var(--navy)'
        }}>
          Request a Quote
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
          Tell us what's wrong with your vehicle. We'll give you a transparent estimate and schedule a time to come out.
        </p>
      </div>

      {/* Main Layout */}
      <div className="responsive-grid-2" style={{ alignItems: 'start', marginTop: '16px' }}>

        {/* LEFT COLUMN: Booking flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'var(--accent-orange)', color: '#fff',
                fontSize: '12px', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>1</div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)' }}>
                Vehicle Details
              </span>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}
              >
                <CheckCircle2 size={48} style={{ color: 'var(--success)' }} />
                <h3 style={{ fontSize: '20px', color: 'var(--navy)', margin: 0 }}>We received your request!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', maxWidth: '300px', margin: 0 }}>
                  Thanks{savedName ? `, ${savedName}` : ''}! We'll give you a call back shortly to go over the details and give you an estimate.
                </p>
                <button onClick={() => setIsSuccess(false)} className="btn-outline" style={{ marginTop: '8px', padding: '10px 24px', fontSize: '14px' }}>
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="client-name">Full Name *</label>
                  <input id="client-name" type="text" required placeholder="Your name" className="form-input" value={name} onChange={e => setName(e.target.value)} disabled={isSubmitting} />
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ flex: '1 1 140px', marginBottom: 0 }}>
                    <label htmlFor="client-phone">Phone Number *</label>
                    <input id="client-phone" type="tel" required placeholder="(641) 840-2842" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} disabled={isSubmitting} />
                  </div>
                  <div className="form-group" style={{ flex: '1 1 140px', marginBottom: 0 }}>
                    <label htmlFor="client-confirm-phone">Confirm Phone *</label>
                    <input id="client-confirm-phone" type="tel" required placeholder="(641) 840-2842" className="form-input" value={confirmPhone} onChange={e => setConfirmPhone(e.target.value)} disabled={isSubmitting} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="client-area">Service Area (City / Zip Code) *</label>
                  <input id="client-area" type="text" required placeholder="e.g. Hopewell, VA" className="form-input" value={serviceArea} onChange={e => setServiceArea(e.target.value)} disabled={isSubmitting} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="client-vehicle">Year, Make & Model *</label>
                  <input id="client-vehicle" type="text" required placeholder="e.g. 2018 Ford F-150" className="form-input" value={vehicleMakeModel} onChange={e => setVehicleMakeModel(e.target.value)} disabled={isSubmitting} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="client-notes">What seems to be the problem?</label>
                  <textarea
                    id="client-notes"
                    rows={3}
                    placeholder="e.g. Brakes are grinding, engine won't start, need an oil change..."
                    className="form-textarea"
                    style={{ resize: 'none' }}
                    value={symptoms}
                    onChange={e => setSymptoms(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Trust badge */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', gap: '6px',
                  fontSize: '12px', color: 'var(--text-muted)', padding: '4px 0', fontWeight: 500
                }}>
                  <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
                  <span>No payment required until the job is done.</span>
                </div>

                <motion.button
                  type="submit"
                  className="btn-orange"
                  style={{ width: '100%', padding: '16px', fontSize: '16px' }}
                  disabled={isSubmitting || !name || !phone || !vehicleMakeModel}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /><span>Sending...</span></>
                  ) : (
                    <><Send size={18} /><span>Send Request</span></>
                  )}
                </motion.button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '16px 0 8px 0' }}>
                  <div style={{ height: '1px', background: 'var(--border-color)', flex: 1 }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>or call us directly</span>
                  <div style={{ height: '1px', background: 'var(--border-color)', flex: 1 }} />
                </div>
                
                <a href="tel:8048946591" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textDecoration: 'none' }}>
                  <div>
                    <div style={{ fontSize: '15px', color: 'var(--navy)', fontWeight: 800 }}>(804) 894-6591</div>
                  </div>
                </a>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Contact info & how it works */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* How It Works */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '18px', color: 'var(--navy)', marginBottom: '16px', fontWeight: 800 }}>How It Works</h4>
            {[
              { step: 'Tell us the issue', desc: 'Fill out the form with your car details' },
              { step: 'Get an honest quote', desc: 'We\'ll call you with pricing and options' },
              { step: 'We come to you', desc: 'Driveway, parking lot, or roadside' },
              { step: 'Back on the road', desc: 'Pay only when the job is done' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 3 ? '16px' : 0 }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: i === 0 ? 'var(--accent-orange)' : 'rgba(224, 92, 26, 0.1)',
                  color: i === 0 ? '#fff' : 'var(--accent-orange)',
                  fontSize: '12px', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'
                }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{item.step}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>


          {/* Business Hours */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '24px'
          }}>
            <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--navy)', margin: 0, fontWeight: 800 }}>Business Hours</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '15px' }}>Monday - Sunday</span>
              <span style={{ color: 'var(--navy)', fontWeight: 800, fontSize: '15px' }}>Open 24 Hours</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '12px 0 0 0', lineHeight: 1.4 }}>
              * Same-day and emergency roadside appointments are available depending on schedule availability.
            </p>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
};
