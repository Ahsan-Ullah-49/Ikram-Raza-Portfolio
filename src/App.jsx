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

      <div className="site-backdrop" aria-hidden="true">
        <div className="site-backdrop__base" />
        <div className="site-backdrop__orb site-backdrop__orb--1" />
        <div className="site-backdrop__orb site-backdrop__orb--2" />
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
