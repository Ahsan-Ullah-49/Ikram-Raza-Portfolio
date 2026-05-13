import React from 'react';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="relative min-h-[200vh] bg-(--color-bg)">
      <Header />
      
      {/* Background Cinematic Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 via-transparent to-rose-500/5" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero Placeholder (Just for context) */}
      <main className="relative z-10 pt-40 px-6">
        <div className="max-w-[1240px] mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 font-logo uppercase">
            Creative <span className="gradient-text">Content</span> Strategist
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Crafting premium digital experiences through cinematic storytelling and modern engineering.
          </p>
        </div>
      </main>

      {/* Scroll indicator for testing sticky header */}
      <div className="h-screen"></div>
    </div>
  );
}

export default App;
