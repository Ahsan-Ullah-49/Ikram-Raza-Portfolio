import React, { useEffect, useState } from 'react';

export default function TouchTrail() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // 2. Only activate on touch devices or screens below 768px
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    if (!isTouchDevice) return;

    let pointId = 0;
    let timeoutIds = new Set();

    const addPoint = (x, y) => {
      const id = pointId++;
      
      setPoints(prev => {
        const newPoints = [...prev, { id, x, y }];
        // Enforce maximum of 10 points
        if (newPoints.length > 10) return newPoints.slice(newPoints.length - 10);
        return newPoints;
      });

      // Automatically remove point after animation completes (450ms)
      const timeoutId = setTimeout(() => {
        setPoints(prev => prev.filter(p => p.id !== id));
        timeoutIds.delete(timeoutId);
      }, 450);
      
      timeoutIds.add(timeoutId);
    };

    let ticking = false;

    const handleTouchStart = (e) => {
      addPoint(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          addPoint(e.touches[0].clientX, e.touches[0].clientY);
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
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  // Return nothing if no points to render
  if (points.length === 0) return null;

  return (
    <>
      <style>
        {`
          @keyframes touchTrailFade {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.25); /* 8px down to 2px */
            }
          }
          .animate-touch-trail {
            animation: touchTrailFade 450ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        `}
      </style>
      <div className="fixed inset-0 pointer-events-none z-9999" aria-hidden="true">
        {points.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-touch-trail"
            style={{
              left: p.x,
              top: p.y,
              width: '8px',
              height: '8px',
              background: 'rgba(var(--cursor-amber),0.45)', // Amber main core
              boxShadow: '0 0 18px rgba(var(--cursor-amber),0.28), 0 0 10px rgba(var(--cursor-rose),0.18), 0 0 6px rgba(var(--cursor-indigo),0.12)',
            }}
          />
        ))}
      </div>
    </>
  );
}
