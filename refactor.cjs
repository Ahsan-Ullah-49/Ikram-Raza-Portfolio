const fs = require('fs');
const path = require('path');
const p = path.join('d:', 'Ikram Raza Portfolio', 'src', 'components', 'sections', 'About.jsx');
const content = fs.readFileSync(p, 'utf-8');
const topPart = content.split('/* ── Main About Section ── */')[0];

const newCode = `
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '600px', height: '600px', borderRadius: '50%', background: '#F59E0B', opacity: 0.04, filter: 'blur(120px)' }} />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-14 lg:gap-16 items-center overflow-visible">
          <div className="about-intro-img relative mx-auto lg:mx-0 w-full max-w-97.5 lg:max-w-107.5 order-2 lg:order-1 overflow-visible py-3 px-1">
            <div className="overflow-visible" style={{ animation: 'heroFloat 7s ease-in-out infinite' }}>
              <div className="absolute -bottom-5 -left-5 w-4/5 h-4/5 rounded-4xl z-0 opacity-80" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FB7185 100%)', boxShadow: '0 20px 40px rgba(245,158,11,0.2)' }} />
              <div className="relative z-10 rounded-4xl p-0.5 overflow-hidden bg-(--color-border)" style={{ aspectRatio: '4/5', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
                <div className="absolute inset-[-50%] pointer-events-none opacity-100" style={{ background: 'conic-gradient(from 0deg, #F59E0B 0%, #FB7185 25%, #6366F1 50%, #FB7185 75%, #F59E0B 100%)', animation: 'aboutFrameBorderSpin 7s linear infinite' }} />
                <div className="w-full h-full rounded-[calc(2rem-1px)] overflow-hidden relative group bg-(--color-surface) z-10">
                  <img src={aboutImage} alt={aboutData.imageAlt} className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,7,11,0.5) 0%, transparent 40%)' }} />
                  <div className="absolute inset-0 pointer-events-none rounded-[calc(2rem-1px)]" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
              <div className="absolute z-20" style={{ top: '32px', left: '-12px', animation: 'badgeFloat 5.5s ease-in-out infinite' }}>
                <div className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full overflow-hidden" style={{ background: 'var(--color-glass)', backdropFilter: 'blur(16px)', border: '1px solid var(--color-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                  <div className="absolute top-0 bottom-0 w-[50%] pointer-events-none mix-blend-overlay" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'badgeShine 3s ease-in-out infinite' }} />
                  <span className="w-2 h-2 rounded-full relative z-10" style={{ background: '#6366F1', boxShadow: '0 0 10px #6366F1' }} />
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
              <a href="#contact" className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[12px] tracking-[0.22em] uppercase overflow-hidden transition-all duration-300 select-none btn-primary shadow-[0_8px_24px_rgba(245,158,11,0.2)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 hover:scale-[1.01]" style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}>
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
  React.useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set('.journey-header-label', { opacity: 0, y: -15 });
        gsap.set('.journey-header-heading', { opacity: 0, y: 15, filter: 'blur(8px)' });
        gsap.set('.journey-header-text', { opacity: 0, y: 15 });
        gsap.set('.journey-board-wrapper', { opacity: 0, y: 30 });
        const desktopCards = gsap.utils.toArray('.journey-desktop-grid .journey-card-wrapper');
        desktopCards.forEach((card) => gsap.set(card, { opacity: 0, y: 36, scale: 0.95, filter: 'blur(8px)' }));
        const journeyTl = gsap.timeline({ scrollTrigger: { trigger: journeyRef.current, start: 'top 80%', toggleActions: 'play none none none' } });
        journeyTl.to('.journey-header-label', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
                 .to('.journey-header-heading', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75, ease: 'power3.out' }, "-=0.4")
                 .to('.journey-header-text', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.4")
                 .to('.journey-board-wrapper', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.3");
        journeyTl.to(desktopCards, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.10 }, "-=0.6");
        ScrollTrigger.create({
          trigger: journeyRef.current, start: 'top 50%', end: 'bottom 60%', scrub: true,
          onUpdate: (self) => {
            desktopCards.forEach((card, i) => {
              const nodeProgress = i / Math.max(1, desktopCards.length - 1);
              const isActive = self.progress >= nodeProgress - 0.15 && self.progress <= nodeProgress + 0.35;
              const node = card.querySelector('.journey-desktop-node');
              if (isActive) { card.classList.add('card-active-glow'); if (node) node.classList.add('node-active'); } 
              else { card.classList.remove('card-active-glow'); if (node) node.classList.remove('node-active'); }
            });
          }
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.set('.journey-header-label', { opacity: 0, y: -15 });
        gsap.set('.journey-header-heading', { opacity: 0, y: 15, filter: 'blur(8px)' });
        gsap.set('.journey-header-text', { opacity: 0, y: 15 });
        gsap.set('.journey-board-wrapper', { opacity: 0, y: 30 });
        const mobileCards = gsap.utils.toArray('.journey-mobile-list .journey-card-wrapper');
        mobileCards.forEach((card) => gsap.set(card, { opacity: 0, y: 30, filter: 'blur(6px)' }));
        const journeyTl = gsap.timeline({ scrollTrigger: { trigger: journeyRef.current, start: 'top 85%', toggleActions: 'play none none none' } });
        journeyTl.to('.journey-header-label', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
                 .to('.journey-header-heading', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75, ease: 'power3.out' }, "-=0.4")
                 .to('.journey-header-text', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.4")
                 .to('.journey-board-wrapper', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.3")
                 .to(mobileCards, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', stagger: 0.12 }, "-=0.4");
        ScrollTrigger.create({
          trigger: journeyRef.current, start: 'top 60%', end: 'bottom 40%', scrub: true,
          onUpdate: (self) => {
            mobileCards.forEach((card, i) => {
              const nodeProgress = i / Math.max(1, mobileCards.length - 1);
              const isActive = self.progress >= nodeProgress - 0.15 && self.progress <= nodeProgress + 0.35;
              const node = card.querySelector('.journey-mobile-node');
              if (isActive) { card.classList.add('card-active-glow'); if (node) node.classList.add('node-active'); } 
              else { card.classList.remove('card-active-glow'); if (node) node.classList.remove('node-active'); }
            });
          }
        });
      });
    }, journeyRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={journeyRef} className="relative py-16 md:py-20 lg:py-24 scroll-mt-28 lg:scroll-mt-32 w-full overflow-x-clip overflow-y-visible">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '400px', height: '400px', borderRadius: '50%', background: '#6366F1', opacity: 0.03, filter: 'blur(100px)' }} />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col gap-10 md:gap-14 overflow-visible">
        <div className="journey-header text-center max-w-3xl mx-auto relative z-10">
          <div className="journey-header-label">
            <SectionLabel text={aboutData.journey.label} centered={true} />
          </div>
          <h3 className="journey-header-heading font-heading font-bold text-(--color-heading) leading-[1.2] mb-6" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            A Creative Journey Across Editing, Design & <span className="gradient-text">Digital Content</span>
          </h3>
          <p className="journey-header-text text-(--color-muted) leading-[1.8] text-[1.05rem]">
            {aboutData.journey.text}
          </p>
        </div>
        <div className="journey-board-wrapper relative max-w-250 mx-auto w-full mt-4 md:mt-8 overflow-visible z-10">
          <div className="journey-desktop-grid hidden lg:grid grid-cols-2 gap-x-14 gap-y-12 relative w-full overflow-visible z-10">
            {aboutData.journey.items.map((item, index) => (
              <div key={index} className="journey-card-wrapper overflow-visible relative z-10">
                <div className={\`journey-desktop-node hidden lg:block absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-(--color-border) bg-transparent z-10 transition-all duration-500 \${index % 2 === 0 ? '-right-7' : '-left-7'}\`} />
                <JourneyCard item={item} index={index} />
              </div>
            ))}
          </div>
          <div className="journey-mobile-list lg:hidden flex flex-col gap-6 relative w-full pl-10 overflow-visible z-10">
            {aboutData.journey.items.map((item, index) => (
              <div key={index} className="journey-card-wrapper w-full relative z-10">
                <div className="journey-mobile-node absolute -left-7.25 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 bg-(--color-bg) z-10 transition-all duration-300" style={{ borderColor: index === 0 ? '#F59E0B' : index === 1 ? '#FB7185' : index === 2 ? '#E11D48' : '#6366F1', boxShadow: '0 0 8px rgba(251, 113, 133, 0.4)' }} />
                <JourneyCard item={item} index={index} />
              </div>
            ))}
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: '#FB7185', opacity: 0.03, filter: 'blur(100px)' }} />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          <div className="relative mindset-content">
            <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
            <SectionLabel text={aboutData.mindset.label} />
            <h3 className="font-heading font-bold text-(--color-heading) leading-tight mb-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              Always Evolving to Create <span className="gradient-text">Better Visuals</span>
            </h3>
            <p className="text-(--color-muted) leading-[1.8] text-[1.05rem]">
              {aboutData.mindset.text}
            </p>
          </div>
          <div className="flex flex-col relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-75 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(251,113,133,0.04) 0%, rgba(99,102,241,0.03) 60%, transparent 70%)' }} />
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
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col gap-10 md:gap-14 overflow-visible">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel text={aboutData.tools.label} centered={true} />
          <h3 className="font-heading font-bold text-(--color-heading) leading-[1.2] mb-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            Software Behind the{' '}
            <span style={{ background: 'linear-gradient(135deg, #F59E0B, #FB7185, #6366F1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Final Look
            </span>
          </h3>
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
`;

fs.writeFileSync(p, topPart + newCode);
