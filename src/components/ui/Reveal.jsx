import React, { useEffect, useRef, useState } from 'react';

export const Reveal = ({ 
  children, 
  variant = 'fade-up', 
  delay = 0, 
  duration = 800,
  className = '', 
  once = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -70px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [once]);

  const getStyles = () => {
    const transitionStr = `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), filter ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), clip-path ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    if (isVisible) {
      return {
        opacity: 1,
        transform: 'none',
        filter: 'blur(0px)',
        clipPath: 'inset(0 0 0 0)',
        transition: transitionStr,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform, filter'
      };
    }

    let activeVariant = variant;
    if (isMobile) {
      activeVariant = 'fade-up';
    }

    const baseStyles = {
      opacity: 0,
      transition: transitionStr,
      transitionDelay: `${delay}ms`,
      willChange: 'opacity, transform, filter'
    };

    switch (activeVariant) {
      case 'fade-up':
        return { ...baseStyles, transform: 'translateY(16px)' };
      case 'fade-down':
        return { ...baseStyles, transform: 'translateY(-16px)' };
      case 'fade-left':
        return { ...baseStyles, transform: 'translateX(-16px)' };
      case 'fade-right':
        return { ...baseStyles, transform: 'translateX(16px)' };
      case 'soft-scale':
        return { ...baseStyles, transform: 'scale(0.985)' };
      case 'blur-up':
        return { ...baseStyles, transform: 'translateY(12px)', filter: 'blur(8px)' };
      case 'clip-up':
        return { ...baseStyles, transform: 'translateY(12px)', clipPath: 'inset(18% 0 0 0)' };
      case 'rotate-soft':
        return { ...baseStyles, transform: 'translateY(12px) rotateX(4deg) scale(0.99)' };
      case 'scale-y':
        return { ...baseStyles, transform: 'scaleY(0)', transformOrigin: 'top' };
      case 'soft-pop':
        return { ...baseStyles, transform: 'scale(0.7)' };
      default:
        return { ...baseStyles, transform: 'translateY(16px)' };
    }
  };

  return (
    <div ref={ref} className={className} style={{...getStyles(), ...(variant === 'scale-y' && isVisible ? { transformOrigin: 'top' } : {})}}>
      {children}
    </div>
  );
};
