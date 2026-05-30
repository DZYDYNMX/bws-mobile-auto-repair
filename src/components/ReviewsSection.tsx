import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { Footer } from './Footer';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const MECHANIC_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Jamman Cliff',
    rating: 5,
    text: "Dylan did an excellent job on my alternator. Highly recommend him he's kind respectful in very polite, in knows how to get the job done."
  },
  {
    id: 2,
    name: 'Sarah M.',
    rating: 5,
    text: "If you need mechanic work done I highly recommend giving him a call. He came to my driveway and fixed my brakes the same day."
  },
  {
    id: 3,
    name: 'Mark T.',
    rating: 5,
    text: "Nicest best mobile mechanic there is very knowledgeable great service. Also, his prices are very reasonable compared to the dealership."
  },
  {
    id: 4,
    name: 'David R.',
    rating: 5,
    text: "Fast and professional. Diagnosed my check engine light and replaced the faulty sensor in no time. Great to have a reliable mechanic who comes to you."
  }
];

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % MECHANIC_REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + MECHANIC_REVIEWS.length) % MECHANIC_REVIEWS.length);
  };

  const currentReview = MECHANIC_REVIEWS[currentIndex];

  return (
    <div className="scroll-container">
      {/* Header */}
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--navy)' }}>
          Real Reviews
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.5', margin: 0 }}>
          Read what our customers are saying. 14 perfect 5-star reviews on Google Maps.
        </p>
      </div>

      {/* Trust Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
          <div style={{ display: 'flex', color: 'var(--accent-orange)' }}>
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1 }}>5.0</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Google Maps Average</div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
          <ShieldCheck size={20} color="var(--success)" />
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1 }}>14+</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Verified Reviews</div>
          </div>
        </div>
      </div>

      {/* Review Card Carousel */}
      <div style={{ position: 'relative', width: '100%', height: '280px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)' }}>{currentReview.name}</div>
                <div style={{ display: 'flex', color: 'var(--accent-orange)', marginTop: '4px' }}>
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
              </div>
              <MessageSquare size={20} color="var(--border-color)" />
            </div>

            <p style={{
              color: 'var(--text-primary)',
              fontSize: '15px',
              lineHeight: '1.6',
              flex: 1,
              fontStyle: 'italic',
              margin: 0
            }}>
              "{currentReview.text}"
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Review {currentIndex + 1} of {MECHANIC_REVIEWS.length}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={prevReview}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'var(--bg-secondary)', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--navy)', cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextReview}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'var(--bg-secondary)', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--navy)', cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};
