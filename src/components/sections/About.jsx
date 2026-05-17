import React, { useEffect, useRef, useState } from 'react';
import { aboutData } from '../../data/aboutData';
import aboutImage from '../../assets/aboutnew.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Reusable Section Label ── */
export const SectionLabel = ({ text, centered = false }) => (
  <div className={`flex items-center gap-3 mb-6 ${centered ? 'justify-center' : 'justify-center lg:justify-start'}`}>
    <span
      className="h-[2px] w-6 sm:w-8 rounded-full"
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
      <span className="h-[2px] w-4 sm:w-6 rounded-full" style={{ background: 'linear-gradient(90deg, #FB7185, transparent)' }} />
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
        className="h-[4px] w-full rounded-full relative"
        style={{ background: 'var(--color-border)' }}
      >
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all ease-out group-hover:brightness-110 group-hover:shadow-[0_0_15px_rgba(251,113,133,0.6)]"
          style={{
            width: hasAnimated ? `${value}%` : '0%',
            background: 'linear-gradient(90deg, #F59E0B, #FB7185, #6366F1)',
            boxShadow: '0 0 8px rgba(245,158,11,0.4)',
            transitionDuration: '1.4s',
            transitionDelay: `${400 + index * 150}ms`
          }}
        >
          {/* Glow Dot */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-white opacity-0 transition-opacity duration-500"
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

const JourneyCard = ({ item }) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="w-full overflow-visible">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative rounded-3xl p-px w-full overflow-visible"
        style={{
          background: 'var(--color-border)',
          transform: hover ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hover
            ? '0 16px 48px rgba(0,0,0,0.15)'
            : '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 350ms ease',
        }}
      >
        {/* Gradient border wrapper */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #FB7185, #6366F1)',
            opacity: hover ? 1 : 0,
            transition: 'opacity 350ms ease',
          }}
        />

        <div
          className="w-full rounded-[calc(1.5rem-1px)] p-3.5 md:p-4 relative overflow-hidden z-10 flex flex-col gap-1"
          style={{
            background: 'var(--color-card)',
            backdropFilter: 'blur(18px) saturate(180%)',
          }}
        >
          {/* Subtle inner glow on hover */}
          <div
            className="absolute inset-0 rounded-[calc(1.5rem-1px)] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.08), transparent 70%)',
              opacity: hover ? 1 : 0,
              transition: 'opacity 350ms ease',
            }}
          />
          <h3 className="font-bold text-[1rem] tracking-tight text-(--color-heading) z-10">
            {item.title}
          </h3>
          <div className="flex items-center gap-1.5 mb-1 z-10">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #FB7185)' }}
            />
            <span
              className="text-[0.75rem] font-bold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(90deg, #F59E0B, #FB7185)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {item.meta}
            </span>
          </div>
          <p className="text-[0.85rem] leading-[1.6] text-(--color-muted) relative z-10 mt-0.5">
            {item.text}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Main About Section ── */
const About = () => {
  const [startBars, setStartBars] = useState(false);
  const introRef = useRef(null);
  const mindsetRef = useRef(null);
  const journeyRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setStartBars(true);
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // 1. About Intro Animation
      gsap.set('.about-intro-img', { opacity: 0, x: isMobile ? 0 : -55, y: isMobile ? 30 : 0, rotateY: isMobile ? 0 : 6, filter: 'blur(8px)' });
      gsap.set('.about-intro-text > *', { opacity: 0, x: isMobile ? 0 : 45, y: isMobile ? 30 : 10 });
      
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out' }
      });
      introTl.to('.about-intro-img', { opacity: 1, x: 0, y: 0, rotateY: 0, filter: 'blur(0px)', duration: 1 })
             .to('.about-intro-text > *', { opacity: 1, x: 0, y: 0, duration: 0.75, stagger: 0.1 }, "-=0.6");

      // 2. Creative Mindset
      gsap.set('.mindset-content > *', { opacity: 0, y: 45, filter: 'blur(8px)' });
      gsap.set('.mindset-bar-item', { opacity: 0, y: 20 });

      const mindsetTl = gsap.timeline({
        scrollTrigger: {
          trigger: mindsetRef.current,
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out' }
      });
      mindsetTl.to('.mindset-content > *', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.1 })
               .to('.mindset-bar-item', { 
                 opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
                 onStart: () => setStartBars(true)
               }, "-=0.6");

      // 3. Journey Timeline
      gsap.set('.journey-header > :nth-child(1)', { opacity: 0, y: -20 });
      gsap.set('.journey-header > :nth-child(2)', { opacity: 0, y: 20, filter: 'blur(8px)' });
      gsap.set('.journey-header > :nth-child(3)', { opacity: 0, y: 20 });
      gsap.set('.journey-line', { scaleY: 0, transformOrigin: 'top' });
      gsap.set('.journey-node', { opacity: 0, scale: 0.65 });
      
      const cards = gsap.utils.toArray('.journey-card-wrapper');
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.set(card, { 
          opacity: 0, 
          x: isMobile ? 0 : (isLeft ? -38 : 38), 
          y: isMobile ? 30 : 0,
          filter: 'blur(6px)' 
        });
      });

      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: journeyRef.current,
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out' }
      });

      journeyTl.to('.journey-header > :nth-child(1)', { opacity: 1, y: 0, duration: 0.8 })
               .to('.journey-header > :nth-child(2)', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, "-=0.6")
               .to('.journey-header > :nth-child(3)', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
               .to('.journey-line', { scaleY: 1, duration: 1.2 }, "-=0.4")
               .to('.journey-node', { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12 }, "-=1.0")
               .to(cards, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.14 }, "-=0.8");

    }, aboutSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutSectionRef} className="relative pt-24 lg:pt-32 xl:pt-36 pb-20 lg:pb-28 xl:pb-32 w-full overflow-x-clip overflow-y-visible">
      {/* Subtle Atmosphere Glows (About only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft amber glow behind image */}
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '600px', height: '600px', borderRadius: '50%', background: '#F59E0B', opacity: 0.04, filter: 'blur(120px)' }} />
        {/* Soft rose/indigo glow behind content */}
        <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: '#FB7185', opacity: 0.03, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '400px', height: '400px', borderRadius: '50%', background: '#6366F1', opacity: 0.03, filter: 'blur(100px)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 flex flex-col gap-16 sm:gap-24 lg:gap-[120px] xl:gap-[140px] overflow-visible">
        
        {/* ════════════════════════════════════
            1. TOP ABOUT INTRO ROW
        ════════════════════════════════════ */}
        <div ref={introRef} className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-14 lg:gap-16 items-center overflow-visible">
          
          {/* Left: Image Card */}
          <div className="about-intro-img relative mx-auto lg:mx-0 w-full max-w-[390px] lg:max-w-[430px] order-2 lg:order-1 overflow-visible py-3 px-1">
            {/* Floating animation wrapper */}
            <div className="overflow-visible" style={{ animation: 'heroFloat 7s ease-in-out infinite' }}>
              
              {/* Bold Accent Frame (L-shape) behind image */}
              <div 
                className="absolute -bottom-5 -left-5 w-4/5 h-4/5 rounded-4xl z-0 opacity-80"
                style={{ 
                  background: 'linear-gradient(135deg, #F59E0B 0%, #FB7185 100%)',
                  boxShadow: '0 20px 40px rgba(245,158,11,0.2)'
                }}
              />

              {/* Main Image Container */}
              <div
                className="relative z-10 rounded-4xl p-[2px] overflow-hidden bg-(--color-border)"
                style={{ 
                  aspectRatio: '4/5',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.3)'
                }}
              >
                {/* Frame Border Animation */}
                <div 
                  className="absolute inset-[-50%] pointer-events-none opacity-100"
                  style={{
                    background: 'conic-gradient(from 0deg, #F59E0B 0%, #FB7185 25%, #6366F1 50%, #FB7185 75%, #F59E0B 100%)',
                    animation: 'aboutFrameBorderSpin 7s linear infinite'
                  }}
                />
                <div className="w-full h-full rounded-[calc(2rem-1px)] overflow-hidden relative group bg-(--color-surface) z-10">

                  <img
                    src={aboutImage}
                    alt={aboutData.imageAlt}
                    className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Premium dark overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(8,7,11,0.5) 0%, transparent 40%)',
                    }}
                  />
                  {/* Subtle inner shadow */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[calc(2rem-1px)]"
                    style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2)' }}
                  />
                </div>
              </div>

              {/* Top Left Floating Badge (New) */}
              <div 
                className="absolute z-20"
                style={{
                  top: '32px',
                  left: '-12px',
                  animation: 'badgeFloat 5.5s ease-in-out infinite'
                }}
              >
                <div 
                  className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full overflow-hidden"
                  style={{
                    background: 'var(--color-glass)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Flash Shine Animation */}
                  <div 
                    className="absolute top-0 bottom-0 w-[50%] pointer-events-none mix-blend-overlay"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      animation: 'badgeShine 3s ease-in-out infinite'
                    }}
                  />
                  <span className="w-2 h-2 rounded-full relative z-10" style={{ background: '#6366F1', boxShadow: '0 0 10px #6366F1' }} />
                  <span className="text-[0.7rem] font-bold tracking-wide text-(--color-heading) whitespace-nowrap relative z-10">
                    Level 2 Fiverr Seller
                  </span>
                </div>
              </div>

              {/* Bottom Right Floating Badge (Existing) */}
              <div 
                className="absolute z-20"
                style={{
                  bottom: '36px',
                  right: '-16px',
                  animation: 'badgeFloat 6.5s ease-in-out 0.6s infinite'
                }}
              >
                <div 
                  className="relative flex items-center gap-2.5 px-5 py-3 rounded-full overflow-hidden"
                  style={{
                    background: 'var(--color-glass)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Flash Shine Animation */}
                  <div 
                    className="absolute top-0 bottom-0 w-[50%] pointer-events-none mix-blend-overlay"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      animation: 'badgeShine 3s ease-in-out infinite'
                    }}
                  />
                  <span className="w-2.5 h-2.5 rounded-full relative z-10" style={{ background: '#F59E0B', boxShadow: '0 0 10px #F59E0B' }} />
                  <span className="text-[0.75rem] font-bold tracking-wide text-(--color-heading) whitespace-nowrap relative z-10">
                    {aboutData.badge}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Content */}
          <div className="about-intro-text flex flex-col gap-6 lg:gap-8 order-1 lg:order-2">
            {/* ABOUT ME Label */}
            <SectionLabel text={aboutData.label} />

              {/* Heading */}
              <h2
                className="font-heading font-bold text-(--color-heading) leading-[1.2] mb-8 text-center lg:text-left"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                What Sets Me Apart as a{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Creative Partner?
                </span>
              </h2>

              {/* Paragraphs */}
              <div className="space-y-5 mb-10 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <p 
                  className="text-(--color-muted) leading-[1.8]"
                  style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)' }}
                >
                  I’m <span className="font-bold text-(--color-heading)">Ikram Raza</span>, a video editor, graphic designer, and social media creative with <span className="font-bold text-(--color-heading)">6+ years</span> of experience helping brands, creators, and businesses turn raw ideas into polished digital content.
                </p>
                <p 
                  className="text-(--color-muted) leading-[1.8]"
                  style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)' }}
                >
                  My work combines <span className="font-bold text-(--color-heading)">cinematic editing</span>, clean design, and strategy-led social media content, creating visuals that look premium, communicate clearly, and keep audiences engaged.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[12px] tracking-[0.22em] uppercase overflow-hidden transition-all duration-300 select-none btn-primary shadow-[0_8px_24px_rgba(245,158,11,0.2)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 hover:scale-[1.01]"
                  style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                  />
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

        {/* ════════════════════════════════════
            2. CREATIVE STRENGTHS ROW
        ════════════════════════════════════ */}
        <div ref={mindsetRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          
          {/* Left: Mindset */}
          <div className="relative mindset-content">
            {/* Subtle Atmosphere Glow behind Mindset */}
            <div 
              className="absolute -top-10 -left-10 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }}
            />
            
            <SectionLabel text={aboutData.mindset.label} />

              <h3
                className="font-heading font-bold text-(--color-heading) leading-tight mb-5"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              >
                Always Evolving to Create <span className="gradient-text">Better Visuals</span>
              </h3>

              <p className="text-(--color-muted) leading-[1.8] text-[1.05rem]">
                {aboutData.mindset.text}
              </p>
            </div>

          {/* Right: Progress Bars */}
          <div className="flex flex-col relative">
            {/* Subtle Atmosphere Glow behind Bars */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-[300px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(251,113,133,0.04) 0%, rgba(99,102,241,0.03) 60%, transparent 70%)' }}
            />
            
            <div className="mindset-bars relative z-10 w-full">
              {aboutData.mindset.strengths.map((strength, index) => (
                <ProgressBar
                  key={index}
                  label={strength.label}
                  value={strength.value}
                  visible={startBars}
                  index={index}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════
            3. EXPERIENCE JOURNEY ROW
        ════════════════════════════════════ */}
        <div ref={journeyRef} className="flex flex-col gap-6 md:gap-10">
          
          {/* Journey Header */}
          <div className="journey-header text-center max-w-3xl mx-auto">
            <SectionLabel text={aboutData.journey.label} centered={true} />
            <h3
              className="font-heading font-bold text-(--color-heading) leading-[1.2] mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              A Creative Journey Across Editing, Design & <span className="gradient-text">Digital Content</span>
            </h3>
            <p className="text-(--color-muted) leading-[1.8] text-[1.05rem]">
              {aboutData.journey.text}
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="relative max-w-[1000px] mx-auto w-full mt-1 md:mt-2 overflow-visible">
            {/* The Center Line */}
            <div 
              className="journey-line absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2" 
              style={{ 
                background: 'linear-gradient(to bottom, transparent, var(--color-border) 10%, var(--color-border) 90%, transparent)',
              }} 
            />
            
            <div className="flex flex-col gap-6 md:gap-8 relative overflow-visible">
              {aboutData.journey.items.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={index} className="relative grid grid-cols-[48px_1fr] md:grid-cols-[1fr_auto_1fr] gap-x-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-14 items-center w-full group overflow-visible">
                    
                    {/* Desktop Left Slot / Mobile Card Slot */}
                    <div className="journey-card-wrapper order-2 md:order-1 overflow-visible py-3 px-1">
                       <div className="md:hidden">
                         <JourneyCard item={item} />
                       </div>
                       <div className="hidden md:block w-full">
                         {isLeft && <JourneyCard item={item} />}
                       </div>
                    </div>

                    {/* Center Node Slot */}
                    <div className="journey-node order-1 md:order-2 flex items-center justify-center w-12 md:w-16 lg:w-20 relative z-20">
                      <div className="flex items-center justify-center w-10 h-10 md:w-[44px] md:h-[44px] rounded-full bg-(--color-bg) border-[2px] border-(--color-border) transition-all duration-500 group-hover:border-(--color-primary) group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:scale-110">
                        <span className="text-[0.75rem] font-bold text-(--color-muted) transition-colors duration-300 group-hover:text-(--color-primary)">
                          0{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Desktop Right Slot */}
                    <div className="journey-card-wrapper order-3 hidden md:block overflow-visible py-3 px-1">
                       {!isLeft && <JourneyCard item={item} />}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;

