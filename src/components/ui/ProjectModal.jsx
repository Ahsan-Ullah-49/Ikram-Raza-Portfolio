import React, { useEffect } from 'react';

// ── Design Modal CSS Mockup ───────────────────────────────────────────────────
function DesignModalPreview({ project }) {
  const { accent1 = '#F59E0B', accent2 = '#FB7185' } = project;
  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        aspectRatio: '1 / 1',
        maxHeight: '68vh',
        borderRadius: '24px',
        background: `linear-gradient(135deg, ${accent1}18 0%, ${accent2}12 55%, rgba(8,7,11,1) 100%)`,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="absolute w-72 h-72 rounded-full opacity-25 blur-[70px]" style={{ background: accent1, top: '-15%', right: '-10%' }} />
      <div className="absolute w-52 h-52 rounded-full opacity-18 blur-[55px]" style={{ background: accent2, bottom: '-10%', left: '-8%' }} />

      <div
        className="relative z-10 w-[68%] max-w-[280px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        style={{ background: 'rgba(18,17,24,0.88)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${accent1}, ${accent2})` }} />
          <div className="flex-1 space-y-1.5 min-w-0">
            <div className="h-2 w-24 rounded-full bg-white/40" />
            <div className="h-1.5 w-16 rounded-full bg-white/15" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded flex-shrink-0"
            style={{ background: `${accent1}22`, color: accent1, border: `1px solid ${accent1}35` }}>
            Campaign
          </span>
        </div>
        {/* Image area */}
        <div className="relative w-full" style={{ paddingBottom: '82%', background: 'linear-gradient(135deg, rgba(22,18,42,1) 0%, rgba(10,8,18,1) 100%)' }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-35" style={{ background: `radial-gradient(circle at 62% 38%, ${accent1}55, transparent 62%)` }} />
            <div className="absolute inset-0 opacity-22" style={{ background: `radial-gradient(circle at 30% 70%, ${accent2}55, transparent 60%)` }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl opacity-45 rotate-8" style={{ border: `3px solid ${accent2}70` }} />
              <div className="absolute w-9 h-9 rounded-xl opacity-35 -rotate-6 translate-x-8 -translate-y-5" style={{ border: `2px solid ${accent1}70`, background: `${accent1}14` }} />
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="p-4 space-y-2.5">
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded-full bg-white/24" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
            <div className="h-1.5 w-3/5 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <div className="w-4 h-4 rounded-full opacity-75" style={{ background: `linear-gradient(135deg, ${accent1}, ${accent2})` }} />
            <div className="h-1.5 w-16 rounded-full bg-white/20" />
            <div className="ml-auto h-5 w-14 rounded-full" style={{ background: `linear-gradient(90deg, ${accent1}40, ${accent2}40)`, border: `1px solid ${accent1}30` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const isReel   = project.type === 'reel';
  const isDesign = project.type === 'design';
  const embedUrl = !isDesign
    ? `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&fs=1`
    : null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-10" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={onClose} aria-hidden="true" />

      {/* Container */}
      <div
        className="relative z-10 w-full flex flex-col items-center mx-auto"
        style={{ maxWidth: isReel ? '390px' : '980px' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Media */}
        {isDesign ? (
          <DesignModalPreview project={project} />
        ) : (
          <div
            className="relative w-full overflow-hidden shadow-[0_0_70px_rgba(245,158,11,0.2)]"
            style={{
              borderRadius: '28px',
              aspectRatio: isReel ? '9/16' : '16/9',
              maxHeight: isReel ? '82vh' : undefined,
              border: '1px solid rgba(255,255,255,0.10)',
              background: '#08070b',
            }}
          >
            <iframe
              key={project.id}
              src={embedUrl}
              title={project.title}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        )}

        {/* Info */}
        <div className="w-full mt-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 px-1">
          <div className="min-w-0">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.25)' }}
            >
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">{project.clientValue}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end flex-shrink-0">
            {project.tags && project.tags.map((tag, i) => (
              <span key={i} className="text-[11px] font-medium px-3 py-1 rounded-full text-slate-300 tracking-wide"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
