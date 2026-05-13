import React, { useState, useEffect } from 'react';
import { navigationLinks } from '../../data/navigationData';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';

/* ── small arrow icon ── */
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

const ThemeToggle = ({ isDark, onToggle, className = '' }) => (
  <button
    onClick={onToggle}
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    className={`group/theme relative w-10 h-10 flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-white/4 backdrop-blur-sm text-slate-400 hover:text-amber-400 hover:border-amber-500/30 hover:shadow-[0_0_18px_rgba(245,158,11,0.15)] transition-all duration-400 overflow-hidden ${className}`}
  >
    <span className="absolute inset-0 rounded-xl bg-linear-to-br from-amber-500/0 to-rose-500/0 group-hover/theme:from-amber-500/10 group-hover/theme:to-rose-500/10 transition-all duration-500 pointer-events-none" />
    <span className={`relative z-10 transition-all duration-500 ${isDark ? 'group-hover/theme:rotate-45' : 'group-hover/theme:-rotate-12'}`}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </span>
  </button>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 px-4 md:px-6
          ${isScrolled ? 'pt-3 md:pt-4' : 'pt-5 md:pt-8'}`}
      >
        <div
          className={`max-w-[1280px] mx-auto bg-glass relative group/header overflow-hidden
            transition-all duration-700
            ${isScrolled
              ? 'px-5 py-3 rounded-full'
              : 'px-6 md:px-10 py-4 md:py-5 rounded-2xl'
            }`}
        >
          {/* ambient hover glow */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/4 to-transparent opacity-0 group-hover/header:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <nav className="relative z-10 flex items-center justify-between gap-4">

            {/* ── Logo ── */}
            <div className="shrink-0">
              <a href="#home" className="group/logo flex items-center gap-0">
                <span className="font-logo text-xl md:text-2xl font-bold text-white uppercase tracking-[0.06em] md:tracking-[0.08em] whitespace-nowrap transition-all duration-500 group-hover/logo:tracking-[0.12em]">
                  IKRAM
                </span>
                <span className="w-1.5 h-1.5 rounded-full gradient-bg mt-1.5 ml-[3px] shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.55)] group-hover/logo:scale-150 transition-all duration-500" />
              </a>
            </div>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[12px] uppercase tracking-[0.18em] font-medium relative group/link transition-colors duration-300
                    ${link.label === 'Home' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* centered underline */}
                  <span
                    className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px gradient-bg transition-all duration-500
                      ${link.label === 'Home' ? 'w-1/2' : 'w-0 group-hover/link:w-1/2'}`}
                  />
                </a>
              ))}
            </div>

            {/* ── Desktop Right ── */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <Button href="#contact" variant="primary" icon={<ArrowRight />}>
                Book a Call
              </Button>
            </div>

            {/* ── Mobile Right ── */}
            <div className="lg:hidden flex items-center gap-2.5">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} className="hidden md:flex" />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/4 text-white hover:text-amber-400 hover:border-amber-500/25 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </svg>
              </button>
            </div>

          </nav>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    </>
  );
};

export default Header;
