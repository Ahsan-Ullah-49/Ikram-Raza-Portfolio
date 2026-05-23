import { useEffect } from 'react';

/**
 * TouchTrail — ref-based, zero React re-renders during operation.
 * Uses direct DOM manipulation + requestAnimationFrame throttle.
 */
export default function TouchTrail() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Only on touch / mobile
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    if (!isTouch) return;

    // Inject keyframe once
    const styleId = 'touch-trail-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes touchTrailFade {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.25); }
        }
        .tt-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          background: rgba(245,158,11,0.45);
          box-shadow: 0 0 18px rgba(245,158,11,0.28), 0 0 10px rgba(251,113,133,0.18), 0 0 6px rgba(99,102,241,0.12);
          animation: touchTrailFade 450ms cubic-bezier(0.25,1,0.5,1) forwards;
        }
      `;
      document.head.appendChild(style);
    }

    let ticking = false;

    const spawnDot = (x, y) => {
      const dot = document.createElement('div');
      dot.className = 'tt-dot';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 460);
    };

    const handleTouchStart = (e) => {
      spawnDot(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          spawnDot(e.touches[0].clientX, e.touches[0].clientY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Renders nothing — all dots are created imperatively in the DOM
  return null;
}
