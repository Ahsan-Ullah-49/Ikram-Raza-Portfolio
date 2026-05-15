import React from 'react';

/**
 * Reusable premium Button component.
 *
 * Props:
 *  - children     — button label / content
 *  - href         — renders an <a> tag when provided
 *  - onClick      — click handler (for <button> mode)
 *  - variant      — "primary" | "secondary"  (default: "primary")
 *  - className    — extra Tailwind classes
 *  - icon         — optional trailing icon element
 *  - ...rest      — any extra props forwarded to the element
 */
const Button = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  ...rest
}) => {
  const base =
    'btn relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[11px] tracking-[0.22em] uppercase overflow-hidden transition-all duration-300 select-none';

  const variants = {
    primary:
      'btn-primary text-[var(--color-bg)] shadow-[0_8px_24px_var(--color-glow)] hover:shadow-[0_12px_40px_var(--color-glow)] hover:-translate-y-0.5 hover:scale-[1.02]',
    secondary:
      'btn-secondary text-[var(--color-heading)] border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-sm hover:border-[var(--color-primary)] hover:shadow-[0_8px_24px_var(--color-glow)] hover:-translate-y-0.5 hover:scale-[1.02]',
  };

  const content = (
    <>
      {/* Shine sweep */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-linear-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const cls = `group ${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls} {...rest}>
      {content}
    </button>
  );
};

export default Button;
