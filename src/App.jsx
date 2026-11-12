import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import InteractiveDashboard from './components/InteractiveDashboard';
import SkillsMatrix from './components/SkillsMatrix';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import RecruiterFAQ from './components/RecruiterFAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioAIAssistant from './components/PortfolioAIAssistant';

export default function App() {
  const [theme, setTheme] = useState(() => {
    // Default to clean white light theme as requested
    const saved = localStorage.getItem('pk_portfolio_theme');
    return saved ? saved : 'light';
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pk_portfolio_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfd] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 relative selection:bg-sky-500/20 selection:text-sky-600 dark:selection:text-sky-300 transition-colors duration-300">
      
      {/* Subtle Dynamic Ambient Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-40 dark:opacity-30"
        style={{
          background: theme === 'dark'
            ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.07), transparent 80%)`
            : `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 113, 227, 0.05), transparent 80%)`,
        }}
      />

      {/* Grid Pattern Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.025] dark:opacity-[0.015]"
        style={{
          backgroundImage: theme === 'dark' 
            ? `radial-gradient(#ffffff 1px, transparent 1px)` 
            : `radial-gradient(#000000 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Navbar theme={theme} setTheme={setTheme} />

      <main className="relative z-20">
        <Hero />
        <About />
        <Projects />
        <InteractiveDashboard />
        <SkillsMatrix />
        <Experience />
        <Certifications />
        <RecruiterFAQ />
        <Contact />
      </main>

      <Footer />

      {/* Interactive AI Assistant Widget */}
      <PortfolioAIAssistant />
    </div>
  );
}
