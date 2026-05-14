import { useEffect, useRef, useCallback } from 'react';

/**
 * CustomCursor — Premium cursor with trail (v4).
 *
 * ✓ Default browser cursor stays visible.
 * ✓ Amber glow dot at cursor tip (lerp 0.82).
 * ✓ 10-dot smooth cinematic trail (chained lerp, fixed DOM nodes).
 * ✓ 34px rotating broken-arc ring on clickable hover.
 * ✓ Single RAF loop, no new DOM nodes per frame.
 * ✓ Desktop only — disabled on touch / <768px / prefers-reduced-motion.
 * ✓ All elements pointer-events:none.
 */

// ── Constants ────────────────────────────────────────────────────────────────
const TRAIL_COUNT = 10;
const CLICKABLE =
  'a, button, [role="button"], input, textarea, select, .clickable, [data-cursor="hover"]';

// Lerp helper
const lerp = (a, b, t) => a + (b - a) * t;

// Per-dot visual configuration (computed once, not in render)
const TRAIL_CFG = Array.from({ length: TRAIL_COUNT }, (_, i) => {
  const t       = i / (TRAIL_COUNT - 1);           // 0 → 1
  const size    = Math.max(1.5, 5 - i * 0.38);     // 5px → ~1.5px
  const opacity = Math.max(0.05, 0.46 - i * 0.044); // 0.46 → 0.05
  const factor  = Math.max(0.12, 0.35 - i * 0.015); // lerp speed

  // Color: amber (0-3) → rose (4-6) → indigo (7-9)
  const rgb =
    i < 4 ? '245, 158, 11'   // #F59E0B
    : i < 7 ? '251, 113, 133' // #FB7185
    : '99, 102, 241';         // #6366F1

  return { size, opacity, factor, rgb, t };
});

// ── Gradient & mask for the rotating ring ───────────────────────────────────
const RING_BG = `conic-gradient(
  from 0deg,
  transparent 0deg,
  rgba(245, 158, 11, 0.00) 35deg,
  rgba(245, 158, 11, 0.95) 110deg,
  rgba(251, 113, 133, 0.90) 180deg,
  rgba(99, 102, 241, 0.40) 235deg,
  transparent 290deg,
  rgba(245, 158, 11, 0.55) 330deg,
  transparent 360deg
)`;
const RING_MASK =
  'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))';
const RING_GLOW =
  'drop-shadow(0 0 8px rgba(245, 158, 11, 0.35)) drop-shadow(0 0 14px rgba(251, 113, 133, 0.18))';

// ── Component ────────────────────────────────────────────────────────────────
export default function CustomCursor() {
  // Main cursor elements
  const dotRef       = useRef(null);
  const ringWrapRef  = useRef(null);
  const ringInnerRef = useRef(null);

  // Trail dot elements — populated via callback refs in JSX
  const trailEls  = useRef(new Array(TRAIL_COUNT).fill(null));

  // Mutable position state (never causes re-renders)
  const mouse    = useRef({ x: -400, y: -400 });
  const dotPos   = useRef({ x: -400, y: -400 });
  const ringPos  = useRef({ x: -400, y: -400 });
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -400, y: -400 }))
  );

  const hovering = useRef(false);
  const seeded   = useRef(false);
  const rafId    = useRef(null);

  // ── Environment guard ───────────────────────────────────────────────────
  const shouldEnable = () => {
    if (typeof window === 'undefined')                                  return false;
    if (window.matchMedia('(pointer: coarse)').matches)                 return false;
    if (window.innerWidth < 768)                                        return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)  return false;
    return true;
  };

  // ── RAF loop ─────────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const mx = mouse.current.x;
    const my = mouse.current.y;
    const isHover = hovering.current;

    // — Amber dot (fast lerp, +1,+1 tip offset) —
    dotPos.current.x = lerp(dotPos.current.x, mx + 1, 0.82);
    dotPos.current.y = lerp(dotPos.current.y, my + 1, 0.82);
    const dot = dotRef.current;
    if (dot) {
      dot.style.transform =
        `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
    }

    // — Ring wrapper —
    ringPos.current.x = lerp(ringPos.current.x, mx, 0.38);
    ringPos.current.y = lerp(ringPos.current.y, my, 0.38);
    const rw = ringWrapRef.current;
    if (rw) {
      rw.style.transform =
        `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
    }

    // — Trail chain (each dot follows the previous one) —
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const cfg = TRAIL_CFG[i];
      // Target: trail[0] follows the dot tip, rest follow each other
      const tx = i === 0 ? dotPos.current.x : trailPos.current[i - 1].x;
      const ty = i === 0 ? dotPos.current.y : trailPos.current[i - 1].y;

      trailPos.current[i].x = lerp(trailPos.current[i].x, tx, cfg.factor);
      trailPos.current[i].y = lerp(trailPos.current[i].y, ty, cfg.factor);

      const el = trailEls.current[i];
      if (!el) continue;

      // Offset so each dot's center lands at the position
      const half = cfg.size / 2;
      el.style.transform =
        `translate(${trailPos.current[i].x - half}px, ${trailPos.current[i].y - half}px)`;

      // Slightly brighter on hover (rose warmth) — clamp to 1
      const opMult  = isHover ? 1.4 : 1;
      el.style.opacity = Math.min(1, cfg.opacity * opMult);
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  // ── Hover toggle ─────────────────────────────────────────────────────────
  const setHover = useCallback((on) => {
    if (hovering.current === on) return;
    hovering.current = on;
    const inner = ringInnerRef.current;
    if (!inner) return;
    inner.style.opacity   = on ? '1'        : '0';
    inner.style.transform = on ? 'scale(1)' : 'scale(0.78)';
    inner.style.filter    = on ? RING_GLOW   : 'none';
  }, []);

  // ── Event handlers ────────────────────────────────────────────────────────
  const onMouseMove = useCallback((e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;

    if (!seeded.current) {
      // Seed all positions on first move so nothing flies in from corner
      dotPos.current.x  = e.clientX;
      dotPos.current.y  = e.clientY;
      ringPos.current.x = e.clientX;
      ringPos.current.y = e.clientY;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        trailPos.current[i].x = e.clientX;
        trailPos.current[i].y = e.clientY;
      }
      seeded.current = true;
    }
  }, []);

  const onMouseOver = useCallback((e) => {
    if (e.target.closest(CLICKABLE)) setHover(true);
  }, [setHover]);

  const onMouseOut = useCallback((e) => {
    if (
      e.target.closest(CLICKABLE) &&
      !e.relatedTarget?.closest(CLICKABLE)
    ) {
      setHover(false);
    }
  }, [setHover]);

  // ── Mount / unmount ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!shouldEnable()) return;

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove',   onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout',  onMouseOut,  { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove',   onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout',  onMouseOut);
    };
  }, [tick, onMouseMove, onMouseOver, onMouseOut]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Trail dots (rendered before main dot so dot sits on top) ── */}
      {TRAIL_CFG.map((cfg, i) => (
        <div
          key={i}
          ref={(el) => { trailEls.current[i] = el; }}
          aria-hidden="true"
          style={{
            position:      'fixed',
            top:           0,
            left:          0,
            width:         `${cfg.size}px`,
            height:        `${cfg.size}px`,
            borderRadius:  '50%',
            background:    `rgba(${cfg.rgb}, 1)`,
            boxShadow:     `0 0 ${cfg.size * 2}px ${cfg.size}px rgba(${cfg.rgb}, 0.22)`,
            opacity:       cfg.opacity,
            pointerEvents: 'none',
            zIndex:        9997,
            willChange:    'transform, opacity',
            transform:     'translate(-400px, -400px)',
          }}
        />
      ))}

      {/* ── Amber glow dot (sits at cursor tip) ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           '-3px',   // center the 6px dot: -3px so translate = tip
          left:          '-3px',
          width:         '6px',
          height:        '6px',
          borderRadius:  '50%',
          background:    '#F59E0B',
          boxShadow: [
            '0 0 0 3px rgba(245, 158, 11, 0.10)',
            '0 0 10px 4px rgba(245, 158, 11, 0.40)',
            '0 0 18px 6px rgba(251, 113, 133, 0.16)',
          ].join(', '),
          pointerEvents: 'none',
          zIndex:        9999,
          willChange:    'transform',
          transform:     'translate(-400px, -400px)',
        }}
      />

      {/* ── Hover ring: outer wrapper (positions ring on cursor) ── */}
      <div
        ref={ringWrapRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           '-17px',   // center 34px ring: -17px
          left:          '-17px',
          width:         '34px',
          height:        '34px',
          pointerEvents: 'none',
          zIndex:        9998,
          willChange:    'transform',
          transform:     'translate(-400px, -400px)',
        }}
      >
        {/* ── Inner ring: CSS keyframe spin + opacity transition ── */}
        <div
          ref={ringInnerRef}
          style={{
            width:         '100%',
            height:        '100%',
            borderRadius:  '50%',
            background:    RING_BG,
            WebkitMask:    RING_MASK,
            mask:          RING_MASK,
            opacity:       '0',
            transform:     'scale(0.78)',
            filter:        'none',
            transition:    'opacity 220ms ease, transform 220ms ease, filter 220ms ease',
            animation:     'cursorRingSpin 1.5s linear infinite',
          }}
        />
      </div>
    </>
  );
}
