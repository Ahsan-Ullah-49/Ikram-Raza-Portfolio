import React from 'react';
import Header from './components/layout/Header';
import CustomCursor from './components/ui/CustomCursor';
import TouchTrail from './components/ui/TouchTrail';
import Hero from './components/sections/Hero';

function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <CustomCursor />
      <TouchTrail />

      {/* Background Cinematic Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 via-transparent to-rose-500/5" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-600/10 blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
      </main>
    </div>
  );
}

export default App;
