import { useEffect, useCallback } from 'react';
import { heroData } from '../../data/heroData';

/**
 * CVModal — Premium glassmorphism CV preview modal.
 *
 * Props:
 *  isOpen  — boolean, controls visibility
 *  onClose — function, called to close modal
 *
 * TODO: Replace heroData.cvPdfPath with the real uploaded PDF path.
 */

const cvContent = {
  profile:
    'Creative professional helping brands, creators, and businesses build a stronger visual presence through video editing, graphic design, and social media content.',
  skills: [
    'Video Editing',
    'Graphic Design',
    'Social Media Management',
    'Content Strategy',
    'Ads Creatives',
  ],
  tools: [
    'Premiere Pro',
    'After Effects',
    'Photoshop',
    'Illustrator',
    'Canva',
    'Meta Business Suite',
  ],
  contact: {
    email: 'hello@example.com',
    whatsapp: '+00 000 0000000',
    fiverr: 'fiverr.com/yourusername',
  },
};

export default function CVModal({ isOpen, onClose }) {
  // Close on Escape key
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: 'var(--color-glass)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="CV Preview"
    >
      {/* Modal panel — stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'var(--color-glass)',
          border: '1px solid var(--color-border)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 24px 80px var(--color-shadow), 0 0 40px var(--color-glow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header bar ── */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 rounded-t-2xl"
          style={{
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div>
            <h2
              className="gradient-text font-bold leading-none"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem' }}
            >
              Ikram Raza
            </h2>
            <p
              className="mt-1"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-muted)',
                fontSize: '0.72rem',
                letterSpacing: '0.06em',
              }}
            >
              Video Editor • Graphic Designer • Social Media Manager
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close CV modal"
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
              background: 'var(--color-glass)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-muted)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-8 py-6 space-y-6">

          {/* Profile */}
          <section>
            <SectionLabel>Profile</SectionLabel>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.75 }}>
              {cvContent.profile}
            </p>
          </section>

          {/* Core Skills */}
          <section>
            <SectionLabel>Core Skills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {cvContent.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.22)',
                    color: '#F59E0B',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section>
            <SectionLabel>Tools</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {cvContent.tools.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.22)',
                    color: '#818CF8',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <SectionLabel>Contact</SectionLabel>
            <div className="space-y-1.5">
              <ContactRow icon="✉" label="Email" value={cvContent.contact.email} />
              <ContactRow icon="💬" label="WhatsApp" value={cvContent.contact.whatsapp} />
              <ContactRow icon="🎯" label="Fiverr" value={cvContent.contact.fiverr} />
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--color-border), transparent)' }} />

          {/* Download button */}
          {/* TODO: Replace heroData.cvPdfPath with the real uploaded PDF path when ready */}
          <div className="flex justify-center pb-2">
            <a
              href={heroData.cvPdfPath}
              download="Ikram_Raza_CV.pdf"
              className="group relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 btn-primary"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-bg)',
                boxShadow: '0 4px 24px var(--color-glow)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 36px var(--color-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px var(--color-glow)';
              }}
            >
              {/* Shine sweep */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              <span className="relative z-10">Download PDF</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Small helper components ── */

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <p
        className="font-semibold uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontSize: '0.7rem' }}
      >
        {children}
      </p>
      <div className="flex-1" style={{ height: '1px', background: 'var(--color-border)' }} />
    </div>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span style={{ fontSize: '0.8rem' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.78rem', minWidth: '72px' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', fontSize: '0.82rem' }}>
        {value}
      </span>
    </div>
  );
}
