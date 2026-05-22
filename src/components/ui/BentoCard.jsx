import React, { useRef, useState } from 'react';

// ── CSS Design Mockup (inside card) ──────────────────────────────────────────
function DesignCardMockup({ isHovered, accent1 = '#F59E0B', accent2 = '#FB7185' }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${accent1}15 0%, ${accent2}10 55%, rgba(8,7,11,1) 100%)` }}
    >
      <div className="absolute w-60 h-60 rounded-full opacity-22 blur-[55px] transition-transform duration-700"
        style={{ background: accent1, top: '-12%', right: '-8%', transform: isHovered ? 'scale(1.15)' : 'scale(1)' }} />
      <div className="absolute w-44 h-44 rounded-full opacity-18 blur-[45px] transition-transform duration-700"
        style={{ background: accent2, bottom: '-10%', left: '-8%', transform: isHovered ? 'scale(1.12)' : 'scale(1)' }} />

      {/* Post card */}
      <div
        className="relative z-10 w-[62%] max-w-[200px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out"
        style={{
          background: 'rgba(18,17,24,0.86)',
          border: '1px solid rgba(255,255,255,0.10)',
          backdropFilter: 'blur(12px)',
          transform: isHovered ? 'translateY(-7px) scale(1.04)' : 'translateY(0) scale(1)',
        }}
      >
        <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/5">
          <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${accent1}, ${accent2})` }} />
          <div className="flex-1 space-y-1.5">
            <div className="h-1.5 w-16 rounded-full bg-white/35" />
            <div className="h-1 w-10 rounded-full bg-white/15" />
          </div>
        </div>
        <div className="relative w-full" style={{ paddingBottom: '82%' }}>
          <div className="absolute inset-0 transition-transform duration-700" style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(22,18,40,1), rgba(10,8,18,1))' }} />
            <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 60% 40%, ${accent1}55, transparent 65%)` }} />
            <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 28% 72%, ${accent2}55, transparent 62%)` }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-xl opacity-40 transition-transform duration-700"
                style={{ border: `3px solid ${accent2}65`, transform: isHovered ? 'rotate(14deg)' : 'rotate(6deg)' }} />
              <div className="absolute w-8 h-8 rounded-lg opacity-35 transition-transform duration-700"
                style={{ border: `2px solid ${accent1}65`, background: `${accent1}12`, transform: isHovered ? 'rotate(-10deg) translate(16px, -10px)' : 'rotate(-4deg) translate(12px, -8px)' }} />
            </div>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-white/22" />
            <div className="h-1 w-4/5 rounded-full bg-white/14" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full opacity-70" style={{ background: `linear-gradient(135deg, ${accent1}, ${accent2})` }} />
            <div className="h-1 w-12 rounded-full bg-white/20" />
            <div className="ml-auto h-4 w-10 rounded-full" style={{ background: `linear-gradient(90deg, ${accent1}35, ${accent2}35)`, border: `1px solid ${accent1}30` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Play Icon ─────────────────────────────────────────────────────────────────
function PlayIcon({ size = 'w-7 h-7', featured = false }) {
  const sz = featured ? 'w-9 h-9' : size;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${sz} translate-x-0.5`} aria-hidden="true">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

// ── Main Bento Card ───────────────────────────────────────────────────────────
export default function BentoCard({ project, onOpenModal }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  const isDesign = project.type === 'design';
  const isReel   = project.type === 'reel';

  const thumbUrl   = !isDesign ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg` : null;
  const fallbackUrl = !isDesign ? `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg` : null;

  const handleMouseEnter = () => { if (!isMobile) setIsHovered(true); };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--x', '50%');
      cardRef.current.style.setProperty('--y', '50%');
    }
  };
  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };
  const handleClick = () => { if (!isDesign || project.cta === 'View Design') onOpenModal(project); };

  // Badge colors
  const badgeStyle = isDesign
    ? { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)', color: '#818CF8' }
    : isReel
      ? { bg: 'rgba(251,113,133,0.15)', border: 'rgba(251,113,133,0.3)', color: '#FB7185' }
      : { bg: 'rgba(96,165,250,0.15)', border: 'rgba(96,165,250,0.3)', color: '#60A5FA' };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="bento-card project-card-wrapper relative overflow-hidden h-full w-full"
      style={{
        borderRadius: '32px',
        background: 'var(--color-card, #121118)',
        cursor: 'pointer',
        boxShadow: isHovered && !isMobile
          ? '0 20px 50px rgba(0,0,0,0.38), 0 0 32px rgba(245,158,11,0.12)'
          : '0 6px 24px rgba(0,0,0,0.22)',
        transform: isHovered && !isMobile ? 'translateY(-6px) scale(1.022)' : 'translateY(0) scale(1)',
        transition: 'transform 0.6s cubic-bezier(0.25,1,0.5,1), box-shadow 0.6s cubic-bezier(0.25,1,0.5,1)',
        willChange: 'transform',
        '--x': '50%',
        '--y': '50%',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Glass border */}
      <div className="absolute inset-0 pointer-events-none rounded-[32px] z-40"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }} />

      {/* Cursor spotlight */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-500 overflow-hidden rounded-[32px]"
          style={{
            background: 'radial-gradient(circle at var(--x) var(--y), rgba(245,158,11,0.17) 0%, transparent 38%)',
            opacity: isHovered ? 1 : 0,
            mixBlendMode: 'screen',
          }} />
      )}

      {/* Media fill */}
      <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-[#08070b]">
        {isDesign ? (
          <DesignCardMockup isHovered={isHovered} accent1={project.accent1} accent2={project.accent2} />
        ) : (
          <img
            src={thumbUrl}
            alt={project.title}
            onError={(e) => { e.currentTarget.src = fallbackUrl; }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: isHovered ? 'scale(1.07)' : 'scale(1)' }}
            loading="lazy"
          />
        )}
      </div>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(8,7,11,0.97) 0%, rgba(8,7,11,0.6) 40%, rgba(8,7,11,0.15) 70%, transparent 100%)',
        }} />

      {/* Top badges */}
      <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
        {/* Category pill */}
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all duration-500"
          style={{
            background: 'rgba(245,158,11,0.14)',
            border: '1px solid rgba(245,158,11,0.28)',
            color: '#F59E0B',
            backdropFilter: 'blur(8px)',
            boxShadow: isHovered ? '0 0 14px rgba(245,158,11,0.28)' : 'none',
          }}
        >
          {project.category}
        </span>
        {/* Type badge */}
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: badgeStyle.bg,
            border: `1px solid ${badgeStyle.border}`,
            color: badgeStyle.color,
            backdropFilter: 'blur(8px)',
          }}
        >
          {isReel ? 'Reel' : isDesign ? 'Design' : 'Video'}
        </span>
      </div>

      {/* Play button (video/reel only) */}
      {!isDesign && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="flex items-center justify-center rounded-full text-white transition-all duration-500"
            style={{
              width: project.featured ? '72px' : '52px',
              height: project.featured ? '72px' : '52px',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.28)',
              boxShadow: isHovered
                ? '0 0 28px rgba(245,158,11,0.4), 0 8px 32px rgba(0,0,0,0.3)'
                : '0 8px 30px rgba(0,0,0,0.3)',
              transform: isHovered ? 'scale(1.12)' : 'scale(1)',
            }}
          >
            <PlayIcon featured={project.featured} />
          </div>
        </div>
      )}

      {/* Bottom content */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 pointer-events-none"
        style={{
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'transform 0.6s cubic-bezier(0.25,1,0.5,1)',
        }}
      >
        <h3
          className="font-bold leading-tight mb-1.5"
          style={{
            fontFamily: 'var(--font-heading)',
            color: '#F8FAFC',
            fontSize: isReel ? 'clamp(1rem, 1.6vw, 1.15rem)' : 'clamp(1.1rem, 1.9vw, 1.35rem)',
            letterSpacing: '-0.015em',
          }}
        >
          {project.title}
        </h3>
        <p className="text-[12px] leading-snug text-slate-400 mb-3 line-clamp-2" style={{ fontFamily: 'var(--font-body)' }}>
          {project.clientValue}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags && project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-medium px-2.5 py-1 rounded-full tracking-wide"
              style={{
                color: 'rgba(248,250,252,0.65)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none z-40 transition-opacity duration-600"
        style={{
          border: '1.5px solid transparent',
          background: isHovered ? 'linear-gradient(135deg, rgba(245,158,11,0.55), rgba(251,113,133,0.25)) border-box' : 'none',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Shine sweep */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden rounded-[32px]">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, transparent 18%, rgba(255,255,255,0.1) 24%, transparent 30%)',
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.75s cubic-bezier(0.25,1,0.5,1)',
          width: '200%', left: '-50%',
        }} />
      </div>
    </div>
  );
}
