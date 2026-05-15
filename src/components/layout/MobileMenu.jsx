import React from 'react';
import { navigationLinks } from '../../data/navigationData';
import Button from '../ui/Button';

/* ── icons ── */
const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 6h10M7 2l4 4-4 4" />
  </svg>
);

const SunIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const MobileMenu = ({ isOpen, onClose, isDark, onToggleTheme }) => {
  return (
    <div
      className={`fixed inset-0 z-60 transition-all duration-500
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-[320px] flex flex-col
          bg-[var(--color-surface)]/98 backdrop-blur-2xl border-l border-[var(--color-border)]
          transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* decorative glows */}
        <div className="absolute top-1/4 right-0 w-48 h-48 bg-[var(--color-primary)]/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 -left-10 w-48 h-48 bg-[var(--color-secondary)]/5 blur-[80px] rounded-full pointer-events-none" />

        {/* ── Header row ── */}
        <div className="relative z-10 flex items-center justify-between px-7 pt-7 pb-5 border-b border-[var(--color-border)]">
          <a href="#home" onClick={onClose} className="flex items-center gap-0">
            <span className="font-logo text-lg font-bold text-[var(--color-heading)] uppercase tracking-[0.22em]">IKRAM</span>
            <span className="w-1.5 h-1.5 rounded-full gradient-bg mt-1.5 ml-[3px] shadow-[0_0_10px_var(--color-glow)]" />
          </a>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-muted)] hover:text-[var(--color-heading)] hover:border-[var(--color-border-strong)] transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Nav links ── */}
        <nav className="relative z-10 flex flex-col px-7 pt-8 gap-0.5">
          {navigationLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              style={{
                transitionDelay: isOpen ? `${80 + i * 55}ms` : '0ms',
              }}
              className={`group flex items-center justify-between py-3.5 border-b border-[var(--color-border)] text-[12px] uppercase tracking-[0.2em] font-semibold transition-all duration-500
                ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}
                ${link.label === 'Home' ? 'text-[var(--color-heading)]' : 'text-[var(--color-muted)] hover:text-[var(--color-heading)]'}`}
            >
              <span>{link.label}</span>
              <svg
                className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
            </a>
          ))}
        </nav>

        {/* ── Bottom actions ── */}
        <div className="relative z-10 mt-auto px-7 pb-9 flex flex-col gap-4">
          {/* CTA */}
          <Button href="#contact" variant="primary" icon={<ArrowRight />} className="w-full justify-center py-4 mt-2">
            Book a Call
          </Button>

          {/* Theme row */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] font-medium">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            {/* Custom Premium Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="group/theme relative w-12 h-10 flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-[0_0_18px_var(--color-glow)] transition-all duration-400 overflow-hidden"
            >
              {/* soft gradient bg on hover */}
              <span className="absolute inset-0 rounded-xl bg-linear-to-br from-[var(--color-primary)]/0 to-[var(--color-secondary)]/0 group-hover/theme:from-[var(--color-primary)]/10 group-hover/theme:to-[var(--color-secondary)]/10 transition-all duration-500 pointer-events-none" />
              <span className={`relative z-10 transition-all duration-500 ${isDark ? 'group-hover/theme:rotate-45' : 'group-hover/theme:-rotate-12'}`}>
                {isDark ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
