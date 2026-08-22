import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from './About';
import SectionBackdrop from '../ui/SectionBackdrop';
import { longVideos, shortReels, graphicBanners } from '../../data/featuredProjectsData';

gsap.registerPlugin(ScrollTrigger);

const LongVideoCard = ({ video, activeLongVideoId, setActiveLongVideoId }) => {
  const isPlaying = activeLongVideoId === video.id;

  return (
    <div className="fp-card group relative p-4 sm:p-5 lg:p-6 rounded-[28px] sm:rounded-[34px] flex flex-col gap-5 overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:scale-[1.015]"
         style={{
           background: 'var(--color-glass)',
           backdropFilter: 'blur(16px)',
           border: '1px solid var(--color-border)',
           boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
         }}>
         {/* Hover Glow Background */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/5 via-transparent to-[#FB7185]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
         
         {/* Shine sweep */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]">
           <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[25deg] transition-all duration-[800ms] ease-out group-hover:left-[200%]" />
         </div>

         {/* Video Wrapper */}
         <div 
           role={!isPlaying ? "button" : undefined}
           aria-label={!isPlaying ? `Play video ${video.title}` : undefined}
           tabIndex={!isPlaying ? 0 : -1}
           onKeyDown={(e) => {
             if (!isPlaying && (e.key === 'Enter' || e.key === ' ')) {
               e.preventDefault();
               setActiveLongVideoId(video.id);
             }
           }}
           className={`relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/60 border border-white/5 z-10 transition-colors duration-500 shadow-inner ${isPlaying ? 'cursor-default' : 'cursor-pointer group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:border-[#F59E0B]/30'}`}
           onClick={!isPlaying ? () => setActiveLongVideoId(video.id) : undefined}
         >
             {isPlaying ? (
               <>
                 <iframe 
                   src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&fs=1`}
                   title={video.title}
                   loading="lazy"
                   allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                   allowFullScreen
                   className="absolute inset-0 w-full h-full border-none"
                 />
                 <button 
                   onClick={(e) => { e.stopPropagation(); setActiveLongVideoId(null); }}
                   className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none"
                   style={{ 
                     background: 'rgba(8,7,11,0.5)', 
                     backdropFilter: 'blur(12px)',
                     border: '1px solid rgba(255,255,255,0.15)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.background = 'linear-gradient(135deg, #F59E0B, #FB7185, #6366F1)';
                     e.currentTarget.style.boxShadow = '0 0 20px rgba(251,113,133,0.5)';
                     e.currentTarget.style.border = '1px solid transparent';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'rgba(8,7,11,0.5)';
                     e.currentTarget.style.boxShadow = 'none';
                     e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                   }}
                   aria-label="Close video"
                 >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                   </svg>
                 </button>
               </>
             ) : (
               <>
                 <img 
                     src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                     onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`; }}
                     alt={video.title}
                     loading="lazy"
                     decoding="async"
                     className="absolute inset-0 w-full h-full object-cover transition-all duration-[700ms] group-hover:brightness-110 group-hover:scale-[1.05]"
                 />
                 {/* Play Button Overlay */}
                 <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg"
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                       <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: 'linear-gradient(135deg, #F59E0B, #FB7185, #6366F1)', boxShadow: '0 0 20px rgba(245,158,11,0.5)' }}
                       />
                       <svg className="w-7 h-7 text-white ml-1.5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                       </svg>
                    </div>
                 </div>
               </>
             )}
         </div>

         {/* Content */}
         <div className="flex flex-col gap-1.5 relative z-10 px-1 mt-1 cursor-default pointer-events-none">
            <h3 className="font-heading font-bold text-[1.15rem] sm:text-[1.25rem] text-(--color-heading) tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#FB7185] transition-all duration-300 w-fit">
              {video.title}
            </h3>
            <p className="text-[0.85rem] sm:text-[0.9rem] text-(--color-muted) leading-relaxed">
              {video.description}
            </p>
         </div>
    </div>
  );
};

const ShortReelCard = ({ reel, activeShortId, setActiveShortId }) => {
  const isPlaying = activeShortId === reel.id;

  return (
    <div 
         role="button"
         aria-label={`Play short ${reel.title}`}
         onClick={!isPlaying ? () => setActiveShortId(reel.id) : undefined} 
         tabIndex={!isPlaying ? 0 : -1}
         onKeyDown={(e) => {
           if (e.key === 'Enter' || e.key === ' ') {
             e.preventDefault();
             if (!isPlaying) setActiveShortId(reel.id);
           }
         }}
         className={`fp-card group relative rounded-[24px] sm:rounded-[30px] flex flex-col overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] aspect-[9/16] min-h-[390px] lg:min-h-[420px] max-h-[460px] w-full focus:outline-none ${
           isPlaying 
           ? 'scale-[1.015] cursor-default z-30 shadow-[0_18px_55px_rgba(245,158,11,0.18),0_0_34px_rgba(251,113,133,0.12),0_0_42px_rgba(99,102,241,0.12)]' 
           : 'cursor-pointer hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_18px_55px_rgba(245,158,11,0.18),0_0_34px_rgba(251,113,133,0.12),0_0_42px_rgba(99,102,241,0.12)]'
         }`}
         style={{
           background: 'var(--color-glass)',
           border: isPlaying ? '1px solid transparent' : '1px solid var(--color-border)',
         }}
    >
       <style>{`
         .fp-card:focus-visible {
            box-shadow: 0 0 0 2px rgba(245,158,11,0.55), 0 0 0 5px rgba(251,113,133,0.18) !important;
         }
       `}</style>
       
       {/* Background gradient overlay for text readability (only if not playing) */}
       {!isPlaying && (
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/90 opacity-90 transition-opacity duration-700 z-10 pointer-events-none" />
       )}

       {/* Shine sweep (only if not playing) */}
       {!isPlaying && (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]">
           <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[25deg] transition-all duration-[800ms] ease-out group-hover:left-[200%]" />
         </div>
       )}

       {/* Media/Iframe Container */}
       <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black/60 rounded-[inherit]">
           {isPlaying ? (
             <>
               <iframe 
                   src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&fs=1`}
                   title={reel.title}
                   loading="lazy"
                   allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                   allowFullScreen
                   className="absolute inset-0 w-full h-full border-none"
               />
               
               {/* Close Button */}
               <button 
                  onClick={(e) => { e.stopPropagation(); setActiveShortId(null); }}
                  className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center text-white/90 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none"
                  style={{ 
                    background: 'rgba(8,7,11,0.5)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #F59E0B, #FB7185, #6366F1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(251,113,133,0.5)';
                    e.currentTarget.style.border = '1px solid transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(8,7,11,0.5)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                  }}
                  aria-label="Close video"
               >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
               </button>
               
               {/* Brand Gradient Border when active */}
               <div 
                 className="absolute inset-0 pointer-events-none z-40 rounded-[inherit]"
                 style={{
                    border: '2px solid transparent',
                    background: 'linear-gradient(135deg, #F59E0B, #FB7185, #6366F1) border-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'destination-out',
                    maskComposite: 'exclude',
                 }}
               />
             </>
           ) : (
             <img 
                 src={`https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
                 onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`; }}
                 alt={reel.title}
                 loading="lazy"
                 decoding="async"
                 className="absolute inset-0 w-full h-full object-cover transition-all duration-[700ms] group-hover:brightness-110 group-hover:scale-[1.08] pointer-events-none"
             />
           )}
       </div>

       {/* Play Button Overlay (only if not playing) */}
       {!isPlaying && (
         <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
               {/* Hover Gradient Background */}
               <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, #F59E0B, #FB7185, #6366F1)', boxShadow: '0 0 20px rgba(251,113,133,0.5)' }}
               />
               <svg className="w-6 h-6 text-white ml-1 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
               </svg>
            </div>
         </div>
       )}

       {/* Title/Category (only if not playing) */}
       {!isPlaying && (
         <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 z-20 flex flex-col gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white/90 bg-white/10 backdrop-blur-md border border-white/10 w-fit mb-1 shadow-sm">
               Short
            </span>
            <h3 className="font-heading font-bold text-lg text-white tracking-tight leading-tight transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#FB7185]">
              {reel.title}
            </h3>
         </div>
       )}
  </div>
  );
};

const GraphicBannerCard = ({ banner, index }) => (
  <div className="fp-card group relative p-4 sm:p-5 lg:p-6 rounded-[28px] sm:rounded-[34px] flex flex-col gap-5 overflow-hidden cursor-default transition-all duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:scale-[1.015]"
       style={{
         background: 'var(--color-glass)',
         backdropFilter: 'blur(16px)',
         border: '1px solid var(--color-border)',
         boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
       }}>
       
       <div className="absolute inset-0 bg-gradient-to-br from-[#FB7185]/5 via-transparent to-[#F59E0B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

       {/* Shine sweep */}
       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]">
         <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[25deg] transition-all duration-[800ms] ease-out group-hover:left-[200%]" />
       </div>

       {/* Media Area */}
       <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1820] to-[#0d0c11] border border-white/5 flex items-center justify-center group-hover:border-[#FB7185]/30 transition-colors duration-500 z-10 group-hover:shadow-[0_0_20px_rgba(251,113,133,0.15)]">
           
           {/* Fallback CSS Mockup (Behind image if image exists) */}
           {index === 0 ? (
              <>
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#F59E0B]/20 rounded-full blur-3xl group-hover:bg-[#F59E0B]/40 transition-colors duration-700 pointer-events-none" />
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FB7185]/20 rounded-full blur-3xl group-hover:bg-[#FB7185]/40 transition-colors duration-700 pointer-events-none" />
                 
                 <div className="relative z-10 w-[65%] h-[70%] rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col p-4 sm:p-5 gap-3 shadow-2xl transform group-hover:rotate-2 group-hover:scale-105 transition-all duration-700">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FB7185]" />
                      <div className="w-24 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="w-full flex-1 rounded-lg bg-white/10" />
                    <div className="w-1/2 h-2.5 rounded-full bg-white/10" />
                 </div>
              </>
           ) : (
              <>
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#6366F1]/20 rounded-full blur-[50px] group-hover:bg-[#6366F1]/40 transition-colors duration-700 pointer-events-none" />
                 
                 <div className="relative z-10 w-[75%] h-[55%] rounded-xl border border-[#6366F1]/20 bg-[#6366F1]/10 backdrop-blur-md flex items-center justify-between px-6 shadow-2xl transform group-hover:-rotate-1 group-hover:scale-110 transition-all duration-700">
                     <div className="flex flex-col gap-3 w-[55%]">
                       <div className="w-full h-3.5 rounded-full bg-white/30" />
                       <div className="w-2/3 h-3 rounded-full bg-white/20" />
                     </div>
                     <div className="w-14 h-14 rounded-full border-[3px] border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-500">
                       <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white/60 border-b-[6px] border-b-transparent ml-1 group-hover:border-l-white transition-colors duration-500" />
                     </div>
                 </div>
              </>
           )}

           {/* Image Layer (On top of Mockup) */}
           {banner.image && (
             <img 
               src={banner.image} 
               alt={banner.title} 
               loading="lazy"
               decoding="async"
               className="absolute inset-0 w-full h-full object-cover transition-all duration-[700ms] group-hover:scale-[1.08] z-20"
               onError={(e) => {
                 e.currentTarget.style.display = 'none'; // Reveal CSS mockup if image fails
               }}
             />
           )}
       </div>

       {/* Content */}
       <div className="flex flex-col gap-1.5 relative z-10 px-1 mt-1">
          <div className="mb-1">
             <span className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-(--color-muted)">
               Graphic Design
             </span>
          </div>
          <h3 className="font-heading font-bold text-[1.1rem] sm:text-[1.2rem] text-(--color-heading) tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FB7185] group-hover:to-[#6366F1] transition-all duration-300 w-fit">
            {banner.title}
          </h3>
          <p className="text-[0.85rem] sm:text-[0.9rem] text-(--color-muted) leading-relaxed">
            {banner.description}
          </p>
       </div>
       
       <div className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500 text-[#FB7185]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
       </div>
  </div>
);

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const [activeShortId, setActiveShortId] = useState(null);
  const [activeLongVideoId, setActiveLongVideoId] = useState(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.fp-label, .fp-heading, .fp-intro, .fp-card, .fp-cta-wrapper', {
          opacity: 1, y: 0, filter: 'none', scale: 1,
        });
        return;
      }

      gsap.set('.fp-label', { opacity: 0, y: -15 });
      gsap.set('.fp-heading', { opacity: 0, y: 25, filter: 'blur(8px)' });
      gsap.set('.fp-intro', { opacity: 0, y: 15 });
      gsap.set('.fp-card', { opacity: 0, y: 35, scale: 0.96 });
      gsap.set('.fp-cta-wrapper', { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 80%', 
            toggleActions: 'play none none none' 
        },
        defaults: { ease: 'power3.out' },
      });

      tl.to('.fp-label', { opacity: 1, y: 0, duration: 0.6 })
        .to('.fp-heading', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.4')
        .to('.fp-intro', { opacity: 1, y: 0, duration: 0.6 }, '-=0.45');

      gsap.to('.fp-short-row .fp-card', {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, stagger: 0.10, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-short-row', start: 'top 85%', toggleActions: 'play none none none' },
      });

      gsap.to('.fp-long-row .fp-card', {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-long-row', start: 'top 85%', toggleActions: 'play none none none' },
      });

      gsap.to('.fp-graphic-row .fp-card', {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-graphic-row', start: 'top 85%', toggleActions: 'play none none none' },
      });

      gsap.to('.fp-cta-wrapper', {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-cta-wrapper', start: 'top 90%', toggleActions: 'play none none none' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        className="relative py-[60px] sm:py-[80px] lg:py-[100px] overflow-hidden"
        style={{ scrollMarginTop: '80px' }}
      >
        <SectionBackdrop variant="portfolio" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">

          {/* ── Section Header ── */}
          <div className="text-center">
            <div className="fp-label inline-block">
              <SectionLabel text="FEATURED PROJECTS" centered />
            </div>

            <h2
              className="fp-heading font-bold mb-5 leading-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: 'var(--color-heading)',
                letterSpacing: '-0.02em',
              }}
            >
              Work That Turns Ideas Into{' '}
              <span className="gradient-text">Premium Visual Content</span>
            </h2>

            <p
              className="fp-intro mx-auto max-w-[580px] leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-muted)',
                fontSize: '0.95rem',
              }}
            >
              A curated selection of long-form edits, short-form reels, and visual design work created to help brands communicate clearly and stand out online.
            </p>
          </div>

          {/* ── Content Grids ── */}
          <div className="flex flex-col gap-8 sm:gap-10">
            
            {/* Row 1: Short Reels (4 Cards) */}
            <div className="fp-short-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {shortReels.map((reel) => (
                <ShortReelCard 
                  key={reel.id} 
                  reel={reel} 
                  activeShortId={activeShortId} 
                  setActiveShortId={setActiveShortId} 
                />
              ))}
            </div>

            {/* Row 2: Long Videos */}
            <div className="fp-long-row grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {longVideos.map((video) => (
                <LongVideoCard 
                  key={video.id} 
                  video={video} 
                  activeLongVideoId={activeLongVideoId}
                  setActiveLongVideoId={setActiveLongVideoId}
                />
              ))}
            </div>

            {/* Row 3: Graphic Banners */}
            <div className="fp-graphic-row grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {graphicBanners.map((banner, idx) => (
                <GraphicBannerCard key={banner.id} banner={banner} index={idx} />
              ))}
            </div>

          </div>

          {/* ── CTA ── */}
          <div className="fp-cta-wrapper flex flex-col items-center gap-4 mt-6">
            <p
              className="text-sm font-medium text-center"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
            >
              Explore the full portfolio for more edits, reels, and visual design work.
            </p>
            <a
              href="/portfolio"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-[11px] tracking-[0.2em] uppercase overflow-hidden select-none btn-primary shadow-[0_8px_24px_var(--color-glow)] hover:shadow-[0_12px_40px_var(--color-glow)] hover:-translate-y-0.5 hover:scale-[1.02]"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-bg, #08070b)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
              />
              <span className="relative z-10">View full portfolio</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 6h10M7 2l4 4-4 4" />
                </svg>
              </span>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
