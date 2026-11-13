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
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pk_portfolio_theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] relative selection:bg-[#0071E3]/15 selection:text-[#0071E3] dark:selection:bg-[#2997FF]/20 dark:selection:text-[#2997FF] transition-colors duration-250">
      <Navbar theme={theme} setTheme={setTheme} />

      <main className="relative z-10">
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
