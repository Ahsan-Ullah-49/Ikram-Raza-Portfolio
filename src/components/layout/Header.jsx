import React, { useState, useEffect, useRef } from 'react';
import { navigationLinks, allSectionIds, sectionNavMap } from '../../data/navigationData';
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
    className={`group/theme relative w-10 h-10 flex items-center justify-center rounded-xl border border-(--color-border) bg-(--color-glass) text-(--color-muted) hover:text-(--color-primary) hover:border-(--color-primary) hover:shadow-[0_0_18px_var(--color-glow)] transition-all duration-400 overflow-hidden ${className}`}
  >
    <span className="absolute inset-0 rounded-xl bg-linear-to-br from-(--color-primary)/0 to-(--color-secondary)/0 group-hover/theme:from-(--color-primary)/10 group-hover/theme:to-(--color-secondary)/10 transition-all duration-500 pointer-events-none" />
    <span className={`relative z-10 transition-all duration-500 ${isDark ? 'group-hover/theme:rotate-45' : 'group-hover/theme:-rotate-12'}`}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </span>
  </button>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  // activeNav tracks which nav *label href* (e.g. "about") is highlighted
  const [activeNav, setActiveNav] = useState('home');

  // ── Theme ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  // ── Robust Scrollspy (Position based) ───────────────────────────────────
  const activeNavRef = useRef('home');
  const sectionsCacheRef = useRef([]);

  useEffect(() => {
    let ticking = false;

    const updateSectionsCache = () => {
      sectionsCacheRef.current = allSectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const headerOffset = 140;
          const scrollPosition = window.scrollY + headerOffset + window.innerHeight * 0.18;

          let currentId = "home";

          for (const section of sectionsCacheRef.current) {
            if (section.offsetTop <= scrollPosition) {
              currentId = section.id;
            }
          }

          if (window.scrollY < 120) {
            currentId = "home";
          }

          const navTarget = sectionNavMap[currentId] ?? currentId;
          
          if (navTarget !== activeNavRef.current) {
            activeNavRef.current = navTarget;
            setActiveNav(navTarget);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const onResize = () => {
      updateSectionsCache();
      onScroll();
    };

    updateSectionsCache();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    // Initial calculation on mount
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // ── Nav click ────────────────────────────────────────────────────────────
  const handleNavClick = (navLabel) => {
    activeNavRef.current = navLabel;
    setActiveNav(navLabel);
  };

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

          <nav className="relative z-10 flex items-center justify-between gap-4" aria-label="Main navigation">

            {/* ── Logo ── */}
            <div className="shrink-0">
              <a href="#home" onClick={() => handleNavClick('home')} className="group/logo flex items-center gap-0" aria-label="Ikram Raza – Back to top">
                <span className="font-logo text-xl md:text-2xl font-bold text-(--color-heading) uppercase tracking-[0.06em] md:tracking-[0.08em] whitespace-nowrap transition-all duration-500 group-hover/logo:tracking-[0.12em]">
                  IKRAM
                </span>
                <span className="w-1.5 h-1.5 rounded-full gradient-bg mt-1.5 ml-[3px] shrink-0 shadow-[0_0_12px_var(--color-glow)] group-hover/logo:scale-150 transition-all duration-500" aria-hidden="true" />
              </a>
            </div>

            {/* ── Desktop Nav ── */}
            <div className="hidden xl:flex items-center gap-8 xl:gap-10">
              {navigationLinks.map((link) => {
                const navId = link.href.slice(1);
                const isActive = activeNav === navId;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => handleNavClick(navId)}
                    className={`text-[12px] uppercase tracking-[0.18em] font-medium relative group/link transition-colors duration-300
                      ${isActive ? 'text-(--color-heading)' : 'text-(--color-muted) hover:text-(--color-heading)'}`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* centered underline */}
                    <span
                      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px gradient-bg transition-all duration-500
                        ${isActive ? 'w-1/2' : 'w-0 group-hover/link:w-1/2'}`}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>

            {/* ── Desktop Right ── */}
            <div className="hidden xl:flex items-center gap-4 shrink-0">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <Button href="#contact" onClick={() => handleNavClick('contact')} variant="primary" icon={<ArrowRight />}>
                Book a Call
              </Button>
            </div>

            {/* ── Mobile Right ── */}
            <div className="xl:hidden flex items-center gap-2.5">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} className="hidden md:flex" />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-(--color-border) bg-(--color-glass) text-(--color-heading) hover:text-(--color-primary) transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true">
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
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />
    </>
  );
};

export default Header;
