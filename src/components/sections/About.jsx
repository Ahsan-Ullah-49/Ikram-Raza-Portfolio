import React, { useEffect, useRef, useState } from 'react';
import { aboutData } from '../../data/aboutData';
// Temporary licensed placeholder image. Replace with Ikram’s real professional portrait later.
import aboutImage from '../../assets/images/about-workspace.jpg';

/* ── Value card dot colours ── */
const DOT_COLORS = ['#F59E0B', '#FB7185', '#6366F1', '#F59E0B'];
const CARD_GRADS  = [
  'rgba(245,158,11,0.72), rgba(251,113,133,0.58)',
  'rgba(99,102,241,0.68), rgba(245,158,11,0.55)',
  'rgba(251,113,133,0.68), rgba(99,102,241,0.55)',
  'rgba(245,158,11,0.68), rgba(99,102,241,0.55)',
];

/* ── Value Card ── */
const ValueCard = ({ item, idx, visible }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: visible ? `${350 + idx * 85}ms` : '0ms'
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative rounded-[1.25rem] p-[1.5px]"
        style={{
          background: 'var(--color-border)',
          transform: hover ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hover
            ? `0 16px 48px rgba(0,0,0,0.22)`
            : '0 2px 12px rgba(0,0,0,0.10)',
          transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 350ms ease',
        }}
      >
        {/* Gradient border that fades in smoothly without affecting layout */}
        <div
          className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${CARD_GRADS[idx]})`,
            opacity: hover ? 1 : 0,
            transition: 'opacity 350ms ease',
          }}
        />
        
        <div
          className="h-full rounded-[calc(1.25rem-1.5px)] p-5 flex flex-col gap-3 relative overflow-hidden z-10"
          style={{
            background: 'var(--color-card)',
            backdropFilter: 'blur(24px) saturate(180%)',
            boxShadow: hover
              ? 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.03)',
            transition: 'box-shadow 350ms ease',
          }}
        >
          {/* Subtle inner glow on hover */}
          <div
            className="absolute inset-0 rounded-[calc(1.25rem-1.5px)] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, rgba(${DOT_COLORS[idx].replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.12), transparent 70%)`,
              opacity: hover ? 1 : 0,
              transition: 'opacity 350ms ease',
            }}
          />
          {/* Accent dot + title */}
          <div className="flex items-center gap-2.5 relative z-10">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background: DOT_COLORS[idx],
                boxShadow: hover ? `0 0 12px 2px ${DOT_COLORS[idx]}` : 'none',
                transition: 'box-shadow 350ms ease',
              }}
            />
            <h3
              className="font-bold text-[0.88rem] tracking-tight transition-colors duration-300"
              style={{ color: hover ? 'var(--color-primary)' : 'var(--color-heading)' }}
            >
              {item.title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-(--color-muted) pl-[18px] relative z-10">{item.text}</p>
        </div>
      </div>
    </div>
  );
};

/* ── Main About ── */
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded]  = useState(false);
  const [imgError,  setImgError]   = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const showPlaceholder = !imgLoaded || imgError;

  return (
    <section id="about" ref={ref} className="relative py-24 lg:py-32 w-full overflow-hidden">

      {/* Section ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position:'absolute', top:'-100px', left:'-80px', width:'520px', height:'520px', borderRadius:'50%', background:'var(--color-primary)', opacity:0.06, filter:'blur(110px)' }} />
        <div style={{ position:'absolute', bottom:'-80px', right:'-80px', width:'460px', height:'460px', borderRadius:'50%', background:'var(--color-secondary)', opacity:0.05, filter:'blur(110px)' }} />
        <div style={{ position:'absolute', top:'40%', right:'20%', width:'320px', height:'320px', borderRadius:'50%', background:'var(--color-accent)', opacity:0.04, filter:'blur(90px)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* Section intro removed to fix duplicate ABOUT ME label */}

        <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-12 lg:gap-14 items-start">

          {/* ════════════════════════════════════
              LEFT — Creative Profile Card
          ════════════════════════════════════ */}
          <div
            className={`relative mx-auto lg:mx-0 about-card-float w-full
              max-w-[310px] sm:max-w-[360px] lg:max-w-[410px]
              transition-[opacity,transform] duration-1000 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'}`}
          >
            {/* Glow halo */}
            <div
              className="absolute -inset-8 rounded-[3.5rem] pointer-events-none about-glow-pulse"
              style={{ background:'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)', opacity:0.14, filter:'blur(50px)' }}
            />

            {/* Card frame */}
            <div
              className="relative rounded-[2.25rem] p-[1.5px]"
              style={{ background:'linear-gradient(150deg, rgba(245,158,11,0.65) 0%, rgba(251,113,133,0.50) 42%, rgba(99,102,241,0.60) 100%)', boxShadow:'0 28px 70px rgba(0,0,0,0.42)' }}
            >
              <div
                className="relative rounded-[calc(2.25rem-1.5px)] overflow-hidden"
                style={{ background:'var(--color-surface)', minHeight:'clamp(420px, 62vw, 560px)' }}
              >
                {/* Temporary workspace placeholder image */}
                {!imgError && (
                  <img
                    src={aboutImage}
                    alt="Creative editing workspace"
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 group-hover:scale-[1.01] ${
                      imgLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transition: 'opacity 700ms ease, transform 1000ms ease' }}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                  />
                )}
                {/* Cinematic overlay always sits on top of the real image */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[calc(2.25rem-1.5px)] z-[1]"
                  style={{
                    background: 'linear-gradient(to top, rgba(8,7,11,0.72) 0%, rgba(8,7,11,0.18) 45%, transparent 75%)',
                  }}
                />

                {/* Placeholder */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${showPlaceholder ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                  {/* Layered abstract shapes */}
                  <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,158,11,0.22), transparent 65%)', filter:'blur(50px)' }} />
                  <div style={{ position:'absolute', bottom:'-40px', left:'-40px', width:'240px', height:'240px', borderRadius:'50%', background:'radial-gradient(circle, rgba(251,113,133,0.18), transparent 65%)', filter:'blur(45px)' }} />
                  <div style={{ position:'absolute', top:'35%', left:'20%', width:'180px', height:'180px', borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)', filter:'blur(40px)' }} />

                  {/* Subtle large circle outline */}
                  <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'260px', height:'260px', borderRadius:'50%', border:'1px solid rgba(245,158,11,0.10)' }} />
                  <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'200px', height:'200px', borderRadius:'50%', border:'1px solid rgba(251,113,133,0.08)' }} />

                  {/* Grid texture */}
                  <div className="absolute inset-0" style={{ backgroundImage:'linear-gradient(rgba(248,250,252,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.03) 1px, transparent 1px)', backgroundSize:'36px 36px' }} />

                  {/* Corner lines */}
                  {[
                    { cls:'top-6 left-6', bt:'border-t', bl:'border-l' },
                    { cls:'top-6 right-6', bt:'border-t', bl:'border-r' },
                    { cls:'bottom-[4.5rem] left-6', bt:'border-b', bl:'border-l' },
                    { cls:'bottom-[4.5rem] right-6', bt:'border-b', bl:'border-r' },
                  ].map(({ cls, bt, bl }, i) => (
                    <div key={i} className={`absolute w-7 h-7 ${cls} ${bt} ${bl}`}
                      style={{ borderColor: i % 2 === 0 ? 'rgba(245,158,11,0.38)' : 'rgba(251,113,133,0.34)', borderWidth:'1.5px' }} />
                  ))}

                  {/* Glowing dots */}
                  {[
                    { top:'2.5rem', right:'2.5rem', c:'245,158,11' },
                    { bottom:'5.5rem', left:'2rem',  c:'251,113,133' },
                    { top:'38%', left:'1.75rem',     c:'99,102,241' },
                    { top:'60%', right:'2rem',       c:'245,158,11' },
                  ].map(({ c, ...pos }, i) => (
                    <div key={i} className="absolute rounded-full pointer-events-none"
                      style={{ ...pos, width:'5px', height:'5px', background:`rgb(${c})`, boxShadow:`0 0 10px 2px rgba(${c},0.65)`, opacity:0.72 }} />
                  ))}

                  {/* Central block */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                    <div style={{ position:'absolute', width:'180px', height:'180px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,158,11,0.24), rgba(251,113,133,0.16), transparent 70%)', filter:'blur(32px)' }} />
                    <span
                      className="relative font-heading font-bold leading-none"
                      style={{
                        fontSize:'clamp(5rem, 12vw, 7.5rem)',
                        background:'linear-gradient(135deg, #F59E0B 0%, #FB7185 50%, #6366F1 100%)',
                        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                        filter:'drop-shadow(0 0 28px rgba(245,158,11,0.40)) drop-shadow(0 0 10px rgba(251,113,133,0.24))',
                        letterSpacing:'-0.02em',
                      }}
                    >IR.</span>
                    <div style={{ marginTop:'12px', width:'3rem', height:'1px', background:'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', opacity:0.48 }} />
                    <span className="font-body font-semibold uppercase text-center px-10 text-(--color-muted)"
                      style={{ marginTop:'10px', fontSize:'0.56rem', letterSpacing:'0.30em', opacity:0.50 }}>
                      Creative Visual Partner
                    </span>
                  </div>
                </div>

                {/* Bottom overlays */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                  style={{ background:'linear-gradient(to top, var(--color-surface) 0%, transparent)' }} />
                <div className="absolute inset-0 rounded-[calc(2.25rem-1.5px)] pointer-events-none"
                  style={{ boxShadow:'inset 0 0 60px rgba(0,0,0,0.38)' }} />

                {/* Name strip */}
                <div className="absolute bottom-0 inset-x-0 px-6 pb-5 z-10 pointer-events-none">
                  <p className="font-body font-semibold uppercase text-(--color-muted)"
                    style={{ fontSize:'0.55rem', letterSpacing:'0.22em', opacity:0.42 }}>Ikram Raza</p>
                  <div style={{ marginTop:'5px', width:'1.75rem', height:'1.5px', background:'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', opacity:0.52 }} />
                </div>
              </div>
            </div>

            {/* ── Floating Badges ── */}
            <div className="hidden sm:flex absolute -top-4 left-5 z-20"
              style={{ animation:'heroFloat 6s ease-in-out infinite' }}>
              <div className="about-badge">
                <span className="w-2 h-2 shrink-0 rounded-full" style={{ background:'linear-gradient(135deg,#F59E0B,#FB7185)', boxShadow:'0 0 8px rgba(245,158,11,0.70)' }} />
                <span className="text-[0.67rem] font-semibold tracking-wide whitespace-nowrap text-(--color-heading)">{aboutData.badges[0]}</span>
              </div>
            </div>

            <div className="hidden sm:flex absolute top-[44%] -translate-y-1/2 -right-5 lg:-right-8 z-20"
              style={{ animation:'heroFloat 7.5s ease-in-out 1s infinite reverse' }}>
              <div className="about-badge">
                <span className="w-2 h-2 shrink-0 rounded-full" style={{ background:'linear-gradient(135deg,#FB7185,#6366F1)', boxShadow:'0 0 8px rgba(251,113,133,0.65)' }} />
                <span className="text-[0.67rem] font-semibold tracking-wide whitespace-nowrap text-(--color-heading)">{aboutData.badges[1]}</span>
              </div>
            </div>

            <div className="hidden sm:flex absolute -bottom-4 right-6 z-20"
              style={{ animation:'heroFloat 8.5s ease-in-out 1.8s infinite' }}>
              <div className="about-badge">
                <span className="w-2 h-2 shrink-0 rounded-full" style={{ background:'linear-gradient(135deg,#6366F1,#F59E0B)', boxShadow:'0 0 8px rgba(99,102,241,0.65)' }} />
                <span className="text-[0.67rem] font-semibold tracking-wide whitespace-nowrap text-(--color-heading)">{aboutData.badges[2]}</span>
              </div>
            </div>

            {/* Mobile badges */}
            <div className="flex sm:hidden flex-wrap justify-center gap-2.5 mt-8">
              {aboutData.badges.map((badge, i) => (
                <div key={badge} className="about-badge">
                  <span className="w-1.5 h-1.5 shrink-0 rounded-full"
                    style={{ background: i === 0 ? '#F59E0B' : i === 1 ? '#FB7185' : '#6366F1' }} />
                  <span className="text-[0.62rem] font-semibold tracking-wide whitespace-nowrap text-(--color-heading)">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════
              RIGHT — Content
          ════════════════════════════════════ */}
          <div className="flex flex-col gap-10 lg:pt-1">

            {/* Label + Heading + Copy */}
            <div
              className={`transition-[opacity,transform] duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: isVisible ? '160ms' : '0ms' }}
            >
              {/* ABOUT ME label — centered on mobile, left-aligned on desktop */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <span
                  className="h-px w-10 rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary))' }}
                />
                <span className="text-[0.65rem] font-bold tracking-[0.30em] uppercase gradient-text whitespace-nowrap">
                  {aboutData.label}
                </span>
                <span
                  className="h-px w-10 rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--color-secondary), transparent)' }}
                />
              </div>

              <h2
                className="font-heading font-bold text-(--color-heading) leading-[1.16] mb-7 text-center lg:text-left"
                style={{ fontSize:'clamp(1.75rem, 3.2vw, 2.9rem)', maxWidth:'31rem' }}
              >
                {aboutData.heading}
              </h2>

              <div className="space-y-4" style={{ maxWidth:'36rem' }}>
                {aboutData.paragraphs.map((p, i) => (
                  <p key={i} className="text-(--color-muted) leading-[1.85]"
                    style={{ fontSize:'clamp(0.88rem, 1.35vw, 1rem)' }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Thin accent rule below copy */}
              <div className="mt-8 flex items-center gap-3">
                <div className="h-px w-20 rounded-full" style={{ background:'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background:'var(--color-primary)', boxShadow:'0 0 8px var(--color-primary)' }} />
                <div className="h-px flex-1 rounded-full" style={{ background:'linear-gradient(90deg, var(--color-border), transparent)' }} />
              </div>
            </div>

            {/* 4 Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {aboutData.highlights.map((item, idx) => (
                <ValueCard key={item.title} item={item} idx={idx} visible={isVisible} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
