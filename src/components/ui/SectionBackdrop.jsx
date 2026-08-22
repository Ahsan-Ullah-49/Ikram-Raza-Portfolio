/**
 * Section-level ambient backgrounds — warm amber/rose palette only.
 * Variants follow color psychology per section (trust, growth, showcase, mastery, precision).
 */
const SectionBackdrop = ({ variant = 'default' }) => (
  <div className={`section-backdrop section-backdrop--${variant}`} aria-hidden="true">
    <div className="section-backdrop__mesh" />
    <div className="section-backdrop__orb section-backdrop__orb--primary" />
    {(variant === 'hero' || variant === 'journey') && (
      <div className="section-backdrop__orb section-backdrop__orb--secondary" />
    )}
  </div>
);

export default SectionBackdrop;
