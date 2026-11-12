import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, ArrowUpRight, Sun, Moon, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Live Simulator', href: '#live-dashboard', id: 'live-dashboard' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Credentials', href: '#certifications', id: 'certifications' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Track scroll position for navbar elevate/shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Active section calculation with offset
      const sectionIds = ['about', 'projects', 'live-dashboard', 'skills', 'experience', 'certifications', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-5 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto w-full max-w-[1200px] rounded-full transition-all duration-300 flex items-center justify-between px-3.5 sm:px-6 ${
          scrolled
            ? 'h-[60px] sm:h-[64px] bg-white/80 dark:bg-[#101014]/80 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.55)]'
            : 'h-[66px] sm:h-[68px] bg-white/70 dark:bg-[#121217]/70 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
        }`}
      >
        {/* Left: PK Avatar Monogram & Branding */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 shadow-md shadow-sky-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 select-none">
              <span className="text-white font-extrabold text-xs sm:text-sm tracking-tight relative z-10">
                PK
              </span>
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-semibold text-xs sm:text-sm tracking-tight text-zinc-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              Pooja Kale
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono -mt-0.5 hidden xs:inline tracking-tight">
              Data & Business Analyst
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Links with Sliding Active Pill */}
        <div className="hidden lg:flex items-center gap-0.5 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.05] rounded-full p-1 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-colors duration-200 z-10 ${
                  isActive
                    ? 'text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white dark:bg-white/10 shadow-sm border border-black/[0.04] dark:border-white/10 -z-10"
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Actions: Theme Toggle, Availability Badge & Resume CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Animated Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </motion.div>
          </button>

          {/* Availability Status Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 whitespace-nowrap select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>1 Month Notice</span>
          </div>

          {/* Resume CTA Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full hover:bg-sky-600 dark:hover:bg-sky-400 dark:hover:text-zinc-950 active:scale-[0.98] transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 -ml-0.5 opacity-70" />
          </a>

          {/* Mobile Menu Hamburger Button */}
          <div className="lg:hidden flex items-center ml-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Slide-Down Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-auto absolute top-20 sm:top-24 left-4 right-4 max-w-lg mx-auto rounded-3xl glass-panel bg-white/95 dark:bg-[#101014]/95 backdrop-blur-2xl p-5 lg:hidden border border-zinc-200 dark:border-white/10 shadow-2xl space-y-4"
          >
            {/* Status in mobile drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Available on 1 Month Notice</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">Pune, India</span>
            </div>

            {/* Nav list */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center justify-between text-sm font-medium px-3.5 py-2.5 rounded-2xl transition-colors ${
                      isActive
                        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
                  </a>
                );
              })}
            </div>

            {/* Mobile Resume CTA */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 rounded-2xl shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume PDF</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
