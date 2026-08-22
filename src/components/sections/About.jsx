import React, { useEffect, useRef, useState } from 'react';
import { aboutData } from '../../data/aboutData';
import aboutImage from '../../assets/aboutnew.png';
import SectionBackdrop from '../ui/SectionBackdrop';
import premiereLogo from '../../assets/logos/premiere.svg';
import afterEffectsLogo from '../../assets/logos/after-effects.svg';
import photoshopLogo from '../../assets/logos/photoshop.svg';
import illustratorLogo from '../../assets/logos/illustrator.svg';
import davinciLogo from '../../assets/logos/icons8-davinci-resolve-480.svg';
import finalCutLogo from '../../assets/logos/icons8-final-cut-pro-x-480.svg';
import canvaLogo from '../../assets/logos/canva-icon.svg';
import metaLogo from '../../assets/logos/meta-color.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const toolIcons = {
  premiere: premiereLogo,
  afterEffects: afterEffectsLogo,
  photoshop: photoshopLogo,
  illustrator: illustratorLogo,
  davinci: davinciLogo,
  finalCut: finalCutLogo,
  canva: canvaLogo,
  meta: metaLogo
};
const logoStyles = {
  premiere: { width: '32px', height: '32px' },
  afterEffects: { width: '32px', height: '32px' },
  photoshop: { width: '32px', height: '32px' },
  illustrator: { width: '32px', height: '32px' },
  davinci: { width: '34px', height: '34px' },
  finalCut: { maxWidth: '36px', maxHeight: '32px' },
  canva: { maxWidth: '36px', maxHeight: '28px' },
  meta: { maxWidth: '34px', maxHeight: '28px' }
};

gsap.registerPlugin(ScrollTrigger);

/* ── Reusable Section Label ── */
export const SectionLabel = ({ text, centered = false }) => (
  <div className={`flex items-center gap-3 mb-6 ${centered ? 'justify-center' : 'justify-center lg:justify-start'}`}>
    <span
      className="h-0.5 w-6 sm:w-8 rounded-full"
      style={{ background: 'linear-gradient(90deg, transparent, #F59E0B)' }}
    />
    <span
      className="text-[0.75rem] sm:text-[0.8rem] font-bold tracking-[0.28em] uppercase"
      style={{
        background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </span>
      <div className="flex items-center gap-1.5">
      <span className="h-0.5 w-4 sm:w-6 rounded-full" style={{ background: 'linear-gradient(90deg, #FB7185, transparent)' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_#6366F1]" />
    </div>
  </div>
);

/* ── Progress Bar Component ── */
const ProgressBar = ({ label, value, visible, index }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (visible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [visible, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    
    // Check for reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 1400; // 1.4s
    const fps = 60;
    const increment = value / (duration / (1000 / fps));
    const delay = 300 + index * 150;
    
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / fps);
      return () => clearInterval(timer);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [hasAnimated, value, index]);

  return (
    <div className="mindset-bar-item group flex flex-col mb-6">
      <div className="flex justify-between mb-2.5 items-center">
        <span className="text-[0.9rem] font-bold text-(--color-heading) tracking-wide transition-colors duration-300 group-hover:text-(--color-primary)">
          {label}
        </span>
        <span 
          className="text-[0.85rem] font-bold transition-colors duration-300"
          style={{ 
            color: count === value ? 'var(--color-primary)' : 'var(--color-muted)',
            textShadow: count === value ? '0 0 10px rgba(245,158,11,0.3)' : 'none'
          }}
        >
          {count}%
        </span>
      </div>
      <div
        className="h-1 w-full rounded-full relative"
        style={{ background: 'var(--color-border)' }}
      >
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all ease-out group-hover:brightness-110 group-hover:shadow-[0_0_15px_rgba(251,113,133,0.6)]"
          style={{
            width: hasAnimated ? `${value}%` : '0%',
            background: 'linear-gradient(90deg, #F59E0B, #FB7185)',
            boxShadow: '0 0 8px rgba(245,158,11,0.4)',
            transitionDuration: '1.4s',
            transitionDelay: `${400 + index * 150}ms`
          }}
        >
          {/* Glow Dot */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-0 transition-opacity duration-500"
            style={{ 
              boxShadow: '0 0 10px 2px rgba(251,113,133,0.8)',
              opacity: hasAnimated ? 1 : 0,
              transitionDelay: `${1500 + index * 150}ms`
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ToolCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const progressRef = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let ctx = gsap.context(() => {
      if (reducedMotion) {
        setVal(item.percent);
        gsap.set(progressRef.current, { width: `${item.percent}%` });
        gsap.set(cardRef.current, { opacity: 1, scale: 1, rotationY: 0, rotationZ: 0, y: 0 });
        return;
      }

      // Pre-set states to avoid flash before scrollTrigger fires
      gsap.set(cardRef.current, { opacity: 0, scale: 0.5, rotationY: 15, rotationZ: -2, y: 60 });
      gsap.set(progressRef.current, { width: "0%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(cardRef.current, { 
        opacity: 1, 
        scale: 1, 
        rotationY: 0, 
        rotationZ: 0, 
        y: 0, 
        duration: 0.8, 
        ease: "back.out(1.7)",
        delay: (index % 4) * 0.1,
        onComplete: () => {
          // Use CSS animation instead of GSAP repeat for better performance
          if (cardRef.current) cardRef.current.classList.add('tool-card-float');
        }
      });

      const obj = { v: 0 };
      tl.to(obj, {
        v: item.percent,
        duration: 1.5,
        ease: "power3.out",
        onUpdate: () => setVal(Math.round(obj.v)),
      }, "-=0.1");

      tl.to(progressRef.current, { 
        width: `${item.percent}%`, 
        duration: 1.5, 
        ease: "power3.out" 
      }, "<");

    }, cardRef);

    return () => ctx.revert();
  }, [item.percent, index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.04,
      duration: 0.4,
      ease: "power2.out",
      borderColor: `${item.color}55`,
      boxShadow: `0 14px 42px -12px ${item.color}65`
    });

    gsap.to(glowRef.current, {
      opacity: 0.22,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(cardRef.current.querySelector('.icon-box'), {
      scale: 1.10,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      borderColor: "var(--color-border)",
      boxShadow: "none"
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(cardRef.current.querySelector('.icon-box'), {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={cardRef} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 rounded-3xl flex flex-col gap-5 overflow-hidden group cursor-default"
      style={{
        background: 'var(--color-glass)',
        backdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid var(--color-border)',
        willChange: 'transform',
      }}
    >
      {/* 1. Glow Layer */}
      <div 
        ref={glowRef}
        className="absolute inset-0 pointer-events-none rounded-3xl z-0"
        style={{
          background: `radial-gradient(circle at center, ${item.color}, transparent)`,
          opacity: 0,
          mixBlendMode: 'screen',
        }}
      />

      {/* 2. Top Row: Icon Box & Percent */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div 
          className="icon-box w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${item.color}22, rgba(255,255,255,0.03))`,
            border: `1px solid ${item.color}66`,
            boxShadow: `0 0 24px ${item.color}30, inset 0 0 18px rgba(255,255,255,0.03)`,
          }}
        >
          {item.icon ? (
            <img 
              src={toolIcons[item.icon]} 
              alt={item.name} 
              className="object-contain block m-auto transition-transform duration-500"
              style={{ ...logoStyles[item.icon] }}
            />
          ) : (
            <span className="text-sm font-bold text-(--color-heading)">
              {item.name.substring(0,2)}
            </span>
          )}
        </div>
        
        <div 
          className="font-mono font-bold text-3xl leading-none pt-0.5"
          style={{
            color: item.color,
            textShadow: `0 0 18px ${item.color}70, 0 0 34px ${item.color}35`
          }}
        >
          {val}<span className="text-sm opacity-50 ml-0.5">%</span>
        </div>
      </div>

      {/* 3. Tool Text */}
      <div className="relative z-10 flex flex-col gap-1 mt-2">
        <h4 className="text-[1.05rem] font-bold text-(--color-heading) tracking-tight">
          {item.name}
        </h4>
        <span className="text-[0.7rem] uppercase tracking-wider font-bold text-(--color-muted)">
          {item.level}
        </span>
      </div>

      {/* 4. Progress Bar */}
      <div className="relative z-10 mt-1">
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
          <div 
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              width: '0%',
              background: `linear-gradient(90deg, transparent, ${item.color})`,
              boxShadow: `0 0 16px ${item.color}80, 0 0 28px ${item.color}35`,
            }}
          />
        </div>
      </div>

    </div>
  );
};

const splitMeta = (meta) => {
  const parts = meta.split(' - ').map(p => p.trim());
  return { company: parts[0], location: parts[1] || '' };
};

const JourneyCard = ({ item, index, side = 'left' }) => {
  const { company, location } = splitMeta(item.meta);
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <article className={`journey-card group cursor-default ${side === 'right' ? 'journey-card--right' : 'journey-card--left'}`}>
      <div className="journey-card-glow" aria-hidden="true" />
      <div className="journey-card-shine" aria-hidden="true" />

      <div className="journey-card-content relative z-10 flex flex-col gap-3 sm:gap-3.5">
        <div className="journey-card-header flex items-center justify-between gap-3">
          <span className="journey-step-badge">{stepNumber}</span>
          <span className="journey-company">{company}</span>
        </div>

        <h4 className="journey-title font-heading font-bold">{item.title}</h4>

        <span className="journey-location">
          <svg className="journey-location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </span>

        <p className="journey-desc">{item.text}</p>
      </div>
    </article>
  );
};


/* ── Main About Section ── */

export const AboutIntro = () => {
  const introRef = React.useRef(null);
  React.useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set('.about-intro-img', { opacity: 0, x: isMobile ? 0 : -55, y: isMobile ? 30 : 0, rotateY: isMobile ? 0 : 6, filter: 'blur(8px)' });
      gsap.set('.about-intro-text > *', { opacity: 0, x: isMobile ? 0 : 45, y: isMobile ? 30 : 10 });
      const introTl = gsap.timeline({ scrollTrigger: { trigger: introRef.current, start: 'top 75%' }, defaults: { ease: 'power3.out' } });
      introTl.to('.about-intro-img', { opacity: 1, x: 0, y: 0, rotateY: 0, filter: 'blur(0px)', duration: 1 })
             .to('.about-intro-text > *', { opacity: 1, x: 0, y: 0, duration: 0.75, stagger: 0.1 }, '-=0.6');
    }, introRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={introRef} className="relative py-16 md:py-20 lg:py-24 scroll-mt-28 lg:scroll-mt-32 w-full overflow-x-clip overflow-y-visible">
      <SectionBackdrop variant="about" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-14 lg:gap-16 items-center overflow-visible">
          <div className="about-intro-img relative mx-auto lg:mx-0 w-full max-w-97.5 lg:max-w-107.5 order-2 lg:order-1 overflow-visible py-3 px-1">
            <div className="overflow-visible" style={{ animation: 'heroFloat 7s ease-in-out infinite' }}>
              <div className="absolute -bottom-5 -left-5 w-4/5 h-4/5 rounded-4xl z-0 opacity-80" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FB7185 100%)', boxShadow: '0 20px 40px rgba(245,158,11,0.2)' }} />
              <div className="relative z-10 rounded-4xl p-0.5 overflow-hidden bg-(--color-border)" style={{ aspectRatio: '4/5', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
                <div className="absolute inset-[-50%] pointer-events-none opacity-100" style={{ background: 'conic-gradient(from 0deg, #F59E0B 0%, #FB7185 50%, #F59E0B 100%)', animation: 'aboutFrameBorderSpin 7s linear infinite' }} />
                <div className="w-full h-full rounded-[calc(2rem-1px)] overflow-hidden relative group bg-(--color-surface) z-10">
                  <img src={aboutImage} alt={aboutData.imageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,7,11,0.5) 0%, transparent 40%)' }} />
                  <div className="absolute inset-0 pointer-events-none rounded-[calc(2rem-1px)]" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
              <div className="absolute z-20" style={{ top: '32px', left: '-12px', animation: 'badgeFloat 5.5s ease-in-out infinite' }}>
                <div className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full overflow-hidden" style={{ background: 'var(--color-glass)', backdropFilter: 'blur(16px)', border: '1px solid var(--color-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                  <div className="absolute top-0 bottom-0 w-[50%] pointer-events-none mix-blend-overlay" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'badgeShine 3s ease-in-out infinite' }} />
                  <span className="w-2 h-2 rounded-full relative z-10" style={{ background: '#FB7185', boxShadow: '0 0 10px rgba(251,113,133,0.45)' }} />
                  <span className="text-[0.7rem] font-bold tracking-wide text-(--color-heading) whitespace-nowrap relative z-10">Level 2 Fiverr Seller</span>
                </div>
              </div>
              <div className="absolute z-20" style={{ bottom: '36px', right: '-16px', animation: 'badgeFloat 6.5s ease-in-out 0.6s infinite' }}>
                <div className="relative flex items-center gap-2.5 px-5 py-3 rounded-full overflow-hidden" style={{ background: 'var(--color-glass)', backdropFilter: 'blur(16px)', border: '1px solid var(--color-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                  <div className="absolute top-0 bottom-0 w-[50%] pointer-events-none mix-blend-overlay" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'badgeShine 3s ease-in-out infinite' }} />
                  <span className="w-2.5 h-2.5 rounded-full relative z-10" style={{ background: '#F59E0B', boxShadow: '0 0 10px #F59E0B' }} />
                  <span className="text-[0.75rem] font-bold tracking-wide text-(--color-heading) whitespace-nowrap relative z-10">{aboutData.badge}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="about-intro-text flex flex-col gap-6 lg:gap-8 order-1 lg:order-2">
            <SectionLabel text={aboutData.label} />
            <h2 className="font-heading font-bold text-(--color-heading) leading-[1.2] mb-8 text-center lg:text-left" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              What Sets Me Apart as a{' '}
              <span style={{ background: 'linear-gradient(135deg, #F59E0B, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Creative Partner?
              </span>
            </h2>
            <div className="space-y-5 mb-10 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <p className="text-(--color-muted) leading-[1.8]" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)' }}>
                I’m <span className="font-bold text-(--color-heading)">Ikram Raza</span>, a video editor, graphic designer, and social media creative with <span className="font-bold text-(--color-heading)">6+ years</span> of experience helping brands, creators, and businesses turn raw ideas into polished digital content.
              </p>
              <p className="text-(--color-muted) leading-[1.8]" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)' }}>
                My work combines <span className="font-bold text-(--color-heading)">cinematic editing</span>, clean design, and strategy-led social media content, creating visuals that look premium, communicate clearly, and keep audiences engaged.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <a href="#contact" className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[12px] tracking-[0.22em] uppercase overflow-hidden transition-all duration-300 select-none btn-primary shadow-[0_8px_24px_var(--color-glow)] hover:shadow-[0_12px_40px_var(--color-glow)] hover:-translate-y-0.5 hover:scale-[1.02]" style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}>
                <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-linear-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                <span className="relative z-10">Let’s Work Together</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6h10M7 2l4 4-4 4" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const JourneySection = () => {
  const journeyRef = React.useRef(null);
  const timelineRef = React.useRef(null);

  React.useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const milestones = gsap.utils.toArray('.journey-milestone');

      if (reducedMotion) {
        gsap.set([
          '.journey-header-label',
          '.journey-header-heading',
          '.journey-header-text',
          '.journey-timeline-shell',
          '.journey-timeline-progress',
          ...milestones,
        ], { clearProps: 'all' });
        gsap.set('.journey-timeline-progress', { scaleY: 1, transformOrigin: 'top center' });
        milestones.forEach((m) => gsap.set(m.querySelectorAll('.journey-card-content > *'), { clearProps: 'all' }));
        return;
      }

      gsap.set('.journey-header-label', { opacity: 0, y: -15 });
      gsap.set('.journey-header-heading', { opacity: 0, y: 22, filter: 'blur(8px)' });
      gsap.set('.journey-header-text', { opacity: 0, y: 15 });
      gsap.set('.journey-timeline-shell', { opacity: 0, y: 30 });
      gsap.set('.journey-timeline-progress', { scaleY: 0, transformOrigin: 'top center' });

      const headerTl = gsap.timeline({
        scrollTrigger: { trigger: journeyRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      headerTl
        .to('.journey-header-label', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' })
        .to('.journey-header-heading', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, '-=0.45')
        .to('.journey-header-text', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.55')
        .to('.journey-timeline-shell', { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.4')
        .to('.journey-timeline-progress', { scaleY: 1, duration: 1.15, ease: 'power2.inOut' }, '-=0.55');

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        milestones.forEach((milestone, i) => {
          gsap.fromTo(milestone, {
            opacity: 0,
            y: 50,
            x: i % 2 === 0 ? -36 : 36,
            scale: 0.96,
            filter: 'blur(10px)',
          }, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: milestone,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });

          gsap.fromTo(milestone.querySelectorAll('.journey-card-content > *'), {
            opacity: 0,
            y: 18,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: milestone,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        });

        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 55%',
          end: 'bottom 45%',
          scrub: 0.8,
          onUpdate: (self) => {
            gsap.to('.journey-timeline-progress', { scaleY: self.progress, duration: 0.12, overwrite: true });
            milestones.forEach((milestone, i) => {
              const threshold = (i + 0.5) / milestones.length;
              const isActive = self.progress >= threshold - 0.15;
              milestone.classList.toggle('journey-milestone--active', isActive);
              milestone.querySelector('.journey-card')?.classList.toggle('journey-card--active', isActive);
            });
          },
        });
      });

      mm.add('(max-width: 1023px)', () => {
        milestones.forEach((milestone) => {
          gsap.fromTo(milestone, {
            opacity: 0,
            y: 40,
            x: -18,
            scale: 0.97,
            filter: 'blur(8px)',
          }, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: milestone,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          });

          gsap.fromTo(milestone.querySelectorAll('.journey-card-content > *'), {
            opacity: 0,
            y: 14,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: milestone,
              start: 'top 87%',
              toggleActions: 'play none none none',
            },
          });
        });

        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 65%',
          end: 'bottom 38%',
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.to('.journey-timeline-progress', { scaleY: self.progress, duration: 0.12, overwrite: true });
            milestones.forEach((milestone, i) => {
              const threshold = (i + 0.5) / milestones.length;
              const isActive = self.progress >= threshold - 0.16;
              milestone.classList.toggle('journey-milestone--active', isActive);
              milestone.querySelector('.journey-card')?.classList.toggle('journey-card--active', isActive);
            });
          },
        });
      });
    }, journeyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={journeyRef} className="relative py-16 md:py-20 lg:py-24 scroll-mt-28 lg:scroll-mt-32 w-full overflow-x-clip overflow-y-visible">
      <SectionBackdrop variant="journey" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col gap-10 md:gap-14 overflow-visible">
        <div className="journey-header text-center max-w-3xl mx-auto relative z-10">
          <div className="journey-header-label">
            <SectionLabel text={aboutData.journey.label} centered={true} />
          </div>
          <h2 className="journey-header-heading font-heading font-bold text-(--color-heading) leading-[1.2] mb-6" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            A Creative Journey Across Editing, Design &{' '}
            <span className="gradient-text">Digital Content</span>
          </h2>
          <p className="journey-header-text text-(--color-muted) leading-[1.8] text-[clamp(0.95rem,1.1vw,1.05rem)] px-1">
            {aboutData.journey.text}
          </p>
        </div>

        <div ref={timelineRef} className="journey-timeline-shell relative w-full max-w-[960px] mx-auto">
          <div className="journey-timeline-track" aria-hidden="true">
            <div className="journey-timeline-progress" />
          </div>

          <div className="journey-timeline-list flex flex-col gap-8 sm:gap-10 lg:gap-14">
            {aboutData.journey.items.map((item, index) => {
              const side = index % 2 === 0 ? 'left' : 'right';

              return (
                <div key={index} className={`journey-milestone journey-milestone--${side}`}>
                  <div className="journey-milestone-node-wrap" aria-hidden="true">
                    <div className="journey-milestone-node">
                      <span className="journey-milestone-node-core" />
                    </div>
                  </div>

                  <div className="journey-milestone-card">
                    <JourneyCard item={item} index={index} side={side} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export const SkillsSection = () => {
  const [startBars, setStartBars] = React.useState(false);
  const mindsetRef = React.useRef(null);
  React.useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) { setStartBars(true); return; }
    const ctx = gsap.context(() => {
      gsap.set('.mindset-content > *', { opacity: 0, y: 45, filter: 'blur(8px)' });
      gsap.set('.mindset-bar-item', { opacity: 0, y: 20 });
      const mindsetTl = gsap.timeline({ scrollTrigger: { trigger: mindsetRef.current, start: 'top 75%' }, defaults: { ease: 'power3.out' } });
      mindsetTl.to('.mindset-content > *', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.1 })
               .to('.mindset-bar-item', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, onStart: () => setStartBars(true) }, "-=0.6");
    }, mindsetRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={mindsetRef} className="relative py-16 md:py-20 lg:py-24 scroll-mt-28 lg:scroll-mt-32 w-full overflow-hidden">
      <SectionBackdrop variant="skills" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          <div className="relative mindset-content">
            <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
            <SectionLabel text={aboutData.mindset.label} />
            <h2 className="font-heading font-bold text-(--color-heading) leading-tight mb-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              Always Evolving to Create <span className="gradient-text">Better Visuals</span>
            </h2>
            <p className="text-(--color-muted) leading-[1.8] text-[1.05rem]">
              {aboutData.mindset.text}
            </p>
          </div>
          <div className="flex flex-col relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-75 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, rgba(251,113,133,0.03) 55%, transparent 72%)' }} />
            <div className="mindset-bars relative z-10 w-full">
              {aboutData.mindset.strengths.map((strength, index) => (
                <ProgressBar key={index} label={strength.label} value={strength.value} visible={startBars} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ToolsSection = () => {
  return (
    <section id="tools" className="relative py-16 md:py-20 lg:py-24 scroll-mt-28 lg:scroll-mt-32 w-full overflow-visible">
      <SectionBackdrop variant="tools" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col gap-10 md:gap-14 overflow-visible">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel text={aboutData.tools.label} centered={true} />
          <h2 className="font-heading font-bold text-(--color-heading) leading-[1.2] mb-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            Software Behind the{' '}
            <span className="gradient-text">Final Look</span>
          </h2>
          <p className="text-(--color-muted) leading-[1.8] text-[1.05rem]">
            {aboutData.tools.text}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 lg:gap-y-6 overflow-visible w-full pb-4">
          {aboutData.tools.items.map((item, index) => (
            <ToolCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
