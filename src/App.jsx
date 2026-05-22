import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import CustomCursor from './components/ui/CustomCursor';
import TouchTrail from './components/ui/TouchTrail';
import Hero from './components/sections/Hero';
import { AboutIntro, JourneySection, SkillsSection, ToolsSection } from './components/sections/About';
import FeaturedProjects from './components/sections/FeaturedProjects';

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, []);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <CustomCursor />
      <TouchTrail />

      {/* Background Cinematic Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--cinematic-bg-1), transparent, var(--cinematic-bg-2))' }} />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] blur-[120px] rounded-full" style={{ background: 'var(--cinematic-glow-1)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] blur-[120px] rounded-full" style={{ background: 'var(--cinematic-glow-2)' }} />
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
        <AboutIntro />
        <JourneySection />
        <FeaturedProjects />
        <SkillsSection />
        <ToolsSection />
      </main>
    </div>
  );
}

export default App;
