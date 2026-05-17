import { useState, useMemo, useEffect, useRef } from 'react';
import { heroData } from '../../data/heroData';
import CVModal from '../ui/CVModal';
import gsap from 'gsap';

// ── Orbit tool card configurations ──────────────────────────────────────────
const TOOLS_ORBIT_CONFIG = [
  { angle: 0,   duration: '46s', color: '#60A5FA', rgb: '96,165,250' },  // PR
  { angle: 60,  duration: '46s', color: '#A78BFA', rgb: '167,139,250' }, // AE
  { angle: 120, duration: '46s', color: '#38BDF8', rgb: '56,189,248' },  // PS
  { angle: 180, duration: '46s', color: '#FB923C', rgb: '251,146,60' },  // AI
  { angle: 240, duration: '46s', color: '#22D3EE', rgb: '34,211,238' },  // Canva
  { angle: 300, duration: '46s', color: '#3B82F6', rgb: '59,130,246' },  // Meta
];

// Local CountUp Animation Component
function CountUp({ end, suffix = '', duration = 1200, start = false, delay = 0 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setCount(end);
      return;
    }

    if (!start) return;

    let startTimestamp = null;
    let animationFrame;
    let timeout;

    const startAnimation = () => {
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutCubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      
      animationFrame = requestAnimationFrame(step);
    };

    if (delay > 0) {
      timeout = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, start, delay]);

  return <>{count}{suffix}</>;
}



// Typing Animation Component
function TitleLine({ line }) {
  const parts = line.split('•').map((s) => s.trim());
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  // Respect prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let timer;
    const currentWord = parts[loopNum % parts.length];
    
    if (isDeleting) {
      // Deleting state: 35-50ms per character
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, 35 + Math.random() * 15);
      
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        // Pause before typing next word (simulated by skipping a cycle or just letting next render handle it instantly)
      }
    } else {
      // Typing state
      if (text === currentWord) {
        // Pause at end of word: 1200-1600ms
        timer = setTimeout(() => setIsDeleting(true), 1200 + Math.random() * 400);
      } else {
        // Typing: 70-90ms per character
        // If just starting a word, add a small 250ms pause
        const pause = text === '' ? 250 : 70 + Math.random() * 20;
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, pause);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, parts, reducedMotion]);

  if (reducedMotion) {
    // Static fallback for accessibility
    return (
      <p
        className="mb-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {parts.map((part, i) => (
          <span key={part} className="flex items-center gap-2">
            <span
              className={i === 0 ? 'gradient-text font-semibold' : ''}
              style={{
                color: i === 0 ? undefined : 'var(--color-muted)',
                fontWeight: i === 0 ? 600 : 500,
                fontSize: 'clamp(0.82rem, 1.6vw, 1rem)',
                whiteSpace: 'nowrap',
              }}
            >
              {part}
            </span>
            {i < parts.length - 1 && (
              <span style={{ color: 'var(--color-primary)', opacity: 0.45, fontSize: '0.85rem' }}>•</span>
            )}
          </span>
        ))}
      </p>
    );
  }

  // Find the longest word to reserve layout space and prevent jumps
  const longestWord = parts.reduce((a, b) => a.length > b.length ? a : b, '');

  return (
    <p
      className="mb-6 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 lg:whitespace-nowrap"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <span className="whitespace-nowrap" style={{ color: 'var(--color-muted)', fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)', fontWeight: 500 }}>
        Building brands through
      </span>
      <span
        className="font-bold relative inline-flex items-center"
        style={{ fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)' }}
      >
        {/* Invisible spacer to prevent layout jump. Uses the longest word + cursor width */}
        <span className="invisible pointer-events-none select-none" aria-hidden="true">
          {longestWord}|
        </span>
        
        {/* Visible animated text */}
        <span className="absolute inset-0 flex items-center justify-center lg:justify-start whitespace-nowrap gradient-text" aria-live="polite">
          {text}
          <span 
            aria-hidden="true" 
            style={{ 
              color: 'var(--color-primary)',
              animation: 'heroCursorBlink 1s step-end infinite' 
            }}
          >
            |
          </span>
        </span>
      </span>
    </p>
  );
}

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);
  const { intro, firstName, lastName, titleLine, description, cta, stats, tools } = heroData;

  const heroRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setStartCount(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set('.hero-intro', { opacity: 0, y: -18 });
      gsap.set('.hero-name', { opacity: 0, y: 34, filter: 'blur(10px)' });
      gsap.set('.hero-titleline', { opacity: 0, y: 20 });
      gsap.set('.hero-desc', { opacity: 0, y: 22 });
      gsap.set('.hero-btn', { opacity: 0, y: 18, scale: 0.96 });
      gsap.set('.hero-stat', { opacity: 0, y: 20 });
      gsap.set('.hero-orbit', { opacity: 0, scale: 0.92, rotation: -3, filter: 'blur(8px)' });

      tl.to('.hero-intro', { opacity: 1, y: 0, duration: 0.7 })
        .to('.hero-name', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, "-=0.4")
        .to('.hero-titleline', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to('.hero-btn', { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12 }, "-=0.6")
        .to('.hero-stat', { 
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
          onComplete: () => setStartCount(true)
        }, "-=0.6")
        .to('.hero-orbit', { opacity: 1, scale: 1, rotation: 0, filter: 'blur(0px)', duration: 1.1 }, "-=0.8");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Generate particles only once
  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      const size = Math.random() * 3 + 2; // 2px to 5px
      const left = Math.random() * 100; // 0% to 100%
      const delay = Math.random() * 10; // 0s to 10s
      const duration = Math.random() * 7 + 7; // 7s to 14s
      const isRose = Math.random() > 0.85;
      const rgb = isRose ? 'var(--particle-rose)' : 'var(--particle-amber)';
      return { id: i, size, left, delay, duration, rgb };
    });
  }, []);

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: '140px', paddingBottom: '100px' }}
      >
        {/* ── Background Particles (Hero Specific) ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          {particles.map(p => (
            <div
              key={p.id}
              className={`absolute rounded-full hero-particle ${p.rgb.includes('rose') ? 'hero-particle-rose' : 'hero-particle-amber'}`}
              style={{
                left: `${p.left}%`,
                bottom: '-20px',
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: `rgba(${p.rgb}, 0.8)`,
                boxShadow: `0 0 ${p.size * 2}px rgba(${p.rgb}, 0.5)`,
                animation: `heroParticleUp ${p.duration}s linear ${p.delay}s infinite`,
                opacity: 0, // starts invisible, handled by keyframes
              }}
            />
          ))}
        </div>

        {/* ── Local ambient glows (hero-only, low opacity) ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-10%', left: '-5%', background: 'radial-gradient(circle, var(--hero-glow-1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute rounded-full" style={{ width: '500px', height: '500px', bottom: '-5%', right: '10%', background: 'radial-gradient(circle, var(--hero-glow-2) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute rounded-full" style={{ width: '400px', height: '400px', top: '30%', right: '25%', background: 'radial-gradient(circle, var(--hero-glow-3) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-14 lg:gap-10 xl:gap-16">

            {/* ══════════════════════════════════════
                LEFT COLUMN — Text Content
            ══════════════════════════════════════ */}
            <div className="w-full text-center lg:text-left mx-auto lg:mx-0 max-w-[600px] lg:max-w-none">
              {/* Intro */}
              <div className="hero-intro">
                <p
                  className="text-sm sm:text-base font-medium tracking-widest uppercase mb-3"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
                >
                  {intro}
                </p>
              </div>

              {/* ── Name: Ikram Raza — one line on desktop ── */}
              <div className="hero-name">
                <h1
                  className="leading-none mb-5 lg:whitespace-nowrap flex flex-wrap justify-center lg:justify-start gap-x-3 sm:gap-x-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                <span
                  style={{
                    color: 'var(--color-text)',
                    fontSize: 'clamp(2.4rem, 9vw, 5.5rem)',
                    fontWeight: 700,
                  }}
                >
                  {firstName}
                </span>
                <span className="relative inline-block">
                  <span
                    className="gradient-text"
                    style={{ fontSize: 'clamp(2.4rem, 9vw, 5.5rem)', fontWeight: 700 }}
                  >
                    {lastName}
                  </span>
                </span>
                </h1>
              </div>

              {/* ── Combined roles line ── */}
              <div className="hero-titleline">
                <TitleLine line={titleLine} />
              </div>

              {/* Description */}
              <div className="hero-desc">
                <p
                  className="mb-8 mx-auto lg:mx-0 px-2 sm:px-0"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-muted)',
                    fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)',
                    lineHeight: 1.65,
                    maxWidth: '540px',
                  }}
                >
                  {description}
                </p>
              </div>

              {/* ── CTA Buttons ── */}
              <div 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 mb-12 w-full sm:w-auto px-4 sm:px-0"
              >
                {/* Primary — VIEW MY WORK */}
                <a
                  href="#portfolio"
                  className="hero-btn w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[11px] tracking-[0.22em] uppercase overflow-hidden transition-all duration-300 select-none btn-primary shadow-[0_8px_24px_rgba(245,158,11,0.2)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 hover:scale-[1.02]"
                  style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                  />
                  <span className="relative z-10">{cta.primary}</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 6h10M7 2l4 4-4 4" />
                    </svg>
                  </span>
                </a>

                {/* Secondary — DOWNLOAD CV */}
                <button
                  onClick={() => setCvOpen(true)}
                  className="hero-btn w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[11px] tracking-[0.22em] uppercase overflow-hidden transition-all duration-300 select-none bg-(--color-glass) border border-(--color-border) text-(--color-heading) backdrop-blur-sm hover:border-(--color-primary) hover:shadow-[0_8px_24px_var(--color-glow)] hover:-translate-y-0.5 hover:scale-[1.02]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                  />
                  <svg
                    className="relative z-10"
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  <span className="relative z-10">{cta.secondary}</span>
                </button>
              </div>

              {/* ── Stats ── */}
              <div className="grid grid-cols-3 max-w-xl mx-auto lg:mx-0">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className="hero-stat flex flex-col items-center lg:items-start gap-1 px-2 sm:px-5 lg:px-8 border-r border-(--color-border) last:border-r-0 first:pl-0 last:pr-0"
                  >
                    <span
                      className="font-bold leading-none"
                      style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
                        background: 'var(--gradient-brand)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      <CountUp 
                        end={parseInt(stat.value, 10)} 
                        suffix={stat.value.replace(/[0-9]/g, '')} 
                        start={startCount}
                        delay={index * 90}
                      />
                    </span>
                    <span
                      className="font-medium tracking-wide uppercase text-center lg:text-left leading-tight"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: 'clamp(0.65rem, 2vw, 0.75rem)' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════════
                RIGHT COLUMN — Animated Orbit Visual
            ══════════════════════════════════════ */}
            <div
              className="hero-orbit w-full flex flex-col items-center justify-center mt-4 lg:mt-0"
            >
              <div
                className="relative shrink-0 hero-orbit-shell w-[250px] h-[250px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] xl:w-[540px] xl:h-[540px]"
              >
                {/* ── Orbit rings (Moved closer to center) ── */}

                {/* Outer ring — amber CW, 34s */}
                <div
                  aria-hidden="true"
                  className="absolute rounded-full"
                  style={{ inset: '16%', border: '1px solid var(--orbit-ring-1)', animation: 'heroOrbitSpin 34s linear infinite' }}
                >
                  <div className="absolute rounded-full" style={{ width: '6px', height: '6px', top: '-3px', left: '20%', background: '#F59E0B', boxShadow: '0 0 10px 3px rgba(245,158,11,0.5)' }} />
                </div>

                {/* Middle ring — rose CCW, 26s */}
                <div
                  aria-hidden="true"
                  className="absolute rounded-full"
                  style={{ inset: '22%', border: '1px solid var(--orbit-ring-2)', animation: 'heroOrbitSpinRev 26s linear infinite' }}
                >
                  <div className="absolute rounded-full" style={{ width: '5px', height: '5px', bottom: '-2.5px', right: '30%', background: '#FB7185', boxShadow: '0 0 8px 3px rgba(251,113,133,0.4)' }} />
                </div>

                {/* Inner ring — indigo dotted CW, 20s */}
                <div
                  aria-hidden="true"
                  className="absolute rounded-full"
                  style={{ inset: '28%', border: '1px dashed var(--orbit-ring-3)', animation: 'heroOrbitSpin 20s linear infinite' }}
                >
                  <div className="absolute rounded-full" style={{ width: '4px', height: '4px', top: '50%', left: '-2px', background: '#6366F1', boxShadow: '0 0 8px 2px rgba(99,102,241,0.4)' }} />
                </div>

                {/* ── IR. Center Card ── */}
                <div
                  className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full z-10 hero-orbit-center"
                  style={{
                    width: '38%', height: '38%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 60px var(--color-glow), inset 0 2px 15px rgba(255,255,255,0.08)',
                  }}
                >

                  <span 
                    className="absolute font-bold select-none pointer-events-none"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2.8rem, 6.5vw, 4.5rem)',
                      letterSpacing: '0.02em',
                      color: 'transparent',
                      textShadow: '0 0 30px rgba(245,158,11,0.75)'
                    }}
                  >
                    IR.
                  </span>
                  <span
                    className="font-bold select-none relative z-10"
                    style={{ 
                      fontFamily: 'var(--font-heading)', 
                      fontSize: 'clamp(2.8rem, 6.5vw, 4.5rem)', 
                      letterSpacing: '0.02em',
                      background: 'var(--gradient-text)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    IR.
                  </span>
                </div>

                {/* ── Tool cards Orbiting ── */}
                {tools.map((tool, i) => {
                  const cfg = TOOLS_ORBIT_CONFIG[i];
                  return (
                    <div
                      key={tool.code}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {/* 1. Initial Angle Setter */}
                      <div className="absolute inset-0" style={{ transform: `rotate(${cfg.angle}deg)` }}>
                        {/* 2. Main Rotation */}
                        <div className="absolute inset-0" style={{ animation: `heroOrbitSpin ${cfg.duration} linear infinite` }}>
                          {/* 3. Orbit Radius (inset controls how far they are from center) */}
                          <div className="absolute" style={{ inset: '8%' }}>
                            {/* 4. Placement at top center edge */}
                            <div className="absolute top-0 left-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
                              {/* 5. Counter Rotation */}
                              <div style={{ animation: `heroOrbitSpinRev ${cfg.duration} linear infinite` }}>
                                {/* 6. Cancel Initial Angle (Upright alignment) */}
                                <div style={{ transform: `rotate(-${cfg.angle}deg)` }}>
                                  
                                  {/* ── Actual Tool Card ── */}
                                  <div
                                    className="group flex flex-col items-center justify-center rounded-xl cursor-default pointer-events-auto text-center"
                                    title={`${tool.code} - ${tool.name}`}
                                    style={{
                                      width: 'clamp(66px, 10vw, 102px)',
                                      height: 'clamp(38px, 6vw, 58px)',
                                      padding: '6px 4px',
                                      background: 'var(--color-glass)',
                                      border: `1px solid rgba(${cfg.rgb}, 0.25)`,
                                      backdropFilter: 'blur(12px)',
                                      boxShadow: `var(--orbit-card-shadow), 0 0 12px rgba(${cfg.rgb}, 0.1)`,
                                      transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = `scale(1.05)`;
                                      e.currentTarget.style.boxShadow = `0 12px 32px var(--color-shadow), 0 0 20px rgba(${cfg.rgb}, 0.3)`;
                                      e.currentTarget.style.borderColor = `rgba(${cfg.rgb}, 0.5)`;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = '';
                                      e.currentTarget.style.boxShadow = `var(--orbit-card-shadow), 0 0 12px rgba(${cfg.rgb}, 0.1)`;
                                      e.currentTarget.style.borderColor = `rgba(${cfg.rgb}, 0.25)`;
                                    }}
                                  >
                                    <span 
                                      className="font-[800] leading-none transition-transform duration-300 group-hover:scale-105" 
                                      style={{ 
                                        color: cfg.color, 
                                        fontFamily: 'var(--font-body)', 
                                        fontSize: 'clamp(11px, 1.8vw, 17px)',
                                        letterSpacing: '0.02em',
                                      }}
                                    >
                                      {tool.code}
                                    </span>
                                    <span 
                                      className="font-medium leading-[1.1] transition-transform duration-300 group-hover:scale-105" 
                                      style={{ 
                                        color: 'var(--color-muted)', 
                                        fontFamily: 'var(--font-body)', 
                                        fontSize: 'clamp(6px, 1vw, 10px)',
                                        marginTop: '3px',
                                        wordBreak: 'break-word',
                                        maxWidth: '100%'
                                      }}
                                    >
                                      {tool.name}
                                    </span>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CV Modal (portal-like, rendered at section level) ── */}
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
