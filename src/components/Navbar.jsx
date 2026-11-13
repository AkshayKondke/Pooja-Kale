import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, ArrowUpRight, Sun, Moon, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef(null);

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

  const sectionIds = ['about', 'projects', 'live-dashboard', 'skills', 'experience', 'certifications', 'faq', 'contact'];

  // Scroll elevate effect & IntersectionObserver for active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      if (window.scrollY < 160) {
        if (!isNavigatingRef.current) {
          setActiveSection('');
        }
      } else if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 70) {
        if (!isNavigatingRef.current) {
          setActiveSection('contact');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to detect visible section without CPU overhead or jitter
    const visibleEntries = new Map();

    const observerCallback = (entries) => {
      if (isNavigatingRef.current) return;

      entries.forEach((entry) => {
        visibleEntries.set(entry.target.id, entry);
      });

      if (window.scrollY < 160) {
        setActiveSection('');
        return;
      }

      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 70) {
        setActiveSection('contact');
        return;
      }

      let bestSection = '';
      let maxVisibleHeight = 0;

      visibleEntries.forEach((entry, id) => {
        if (entry.isIntersecting) {
          const visibleHeight = entry.intersectionRect.height;
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            bestSection = id;
          }
        }
      });

      if (bestSection) {
        setActiveSection(bestSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0, 0.15, 0.3, 0.5, 0.75, 1.0],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      isNavigatingRef.current = true;
      setActiveSection(targetId);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
      navTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 850);
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
            ? 'h-[58px] sm:h-[62px] bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-[#E5E7EB] dark:border-[#2C2C2E] shadow-apple-card'
            : 'h-[64px] sm:h-[66px] bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-[#E5E7EB]/80 dark:border-[#2C2C2E]/80 shadow-apple-subtle'
        }`}
      >
        {/* Left: PK Avatar Monogram & Branding */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            isNavigatingRef.current = true;
            setActiveSection('');
            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
            navTimeoutRef.current = setTimeout(() => {
              isNavigatingRef.current = false;
            }, 850);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0071E3] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 select-none shadow-none">
              <span className="text-white font-bold text-xs tracking-tight relative z-10">
                PK
              </span>
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-semibold text-sm sm:text-[15px] tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
              Pooja Kale
            </span>
            <span className="text-xs text-[#6E6E73] dark:text-[#86868B] font-mono hidden xs:inline tracking-tight">
              Data & Business Analyst
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Links with Sliding Active Pill */}
        <div className="hidden lg:flex items-center gap-0.5 bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] rounded-full p-1 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-3 xl:px-3.5 py-1.5 rounded-full text-[13px] tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 z-10 ${
                  isActive
                    ? 'text-[#0071E3] dark:text-[#2997FF] font-semibold'
                    : 'text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#0071E3] dark:hover:text-[#2997FF] font-normal'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white dark:bg-[#2C2C2E] shadow-apple-subtle border border-[#E5E7EB] dark:border-[#38383A] -z-10"
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Actions: Theme Toggle, Availability Badge & Resume CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Animated Theme Toggle: Min 44x44px touch target */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
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
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono whitespace-nowrap select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>1 Month Notice</span>
          </div>

          {/* Resume CTA Button: Apple Minimal button-primary */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs sm:text-[13px] font-medium bg-[#0071E3] hover:bg-[#2997FF] active:bg-[#0066CC] text-white px-4 py-2 rounded-full active:scale-[0.98] transition-colors whitespace-nowrap tracking-tight"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 -ml-0.5 opacity-80" />
          </a>

          {/* Mobile Menu Hamburger Button: Min 44x44px touch target */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Slide-Down Glass Drawer & Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Click-away Backdrop Overlay: Tap outside to close drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm -z-10"
              aria-hidden="true"
            />

            {/* Slide-Down Apple Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto absolute top-20 sm:top-24 left-3 right-3 max-w-lg mx-auto rounded-2xl bg-white/95 dark:bg-[#161617]/95 backdrop-blur-2xl p-4 sm:p-5 lg:hidden border border-[#E5E7EB] dark:border-[#2C2C2E] shadow-apple-dropdown space-y-4 max-h-[82vh] overflow-y-auto"
            >
              {/* Status in mobile drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-[#2C2C2E]">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Available on 1 Month Notice</span>
                </div>
                <span className="text-xs font-mono font-medium text-[#6E6E73] dark:text-[#86868B]">Pune, India</span>
              </div>

              {/* Nav list with min 44px touch targets */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`flex items-center justify-between text-sm px-4 py-3 rounded-xl min-h-[44px] transition-colors ${
                        isActive
                          ? 'bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF] font-semibold'
                          : 'text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1D1D1F] font-normal'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#0071E3] dark:bg-[#2997FF]" />}
                    </a>
                  );
                })}
              </div>

              {/* Mobile Resume CTA: Apple Minimal button-primary */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3 text-sm font-medium bg-[#0071E3] hover:bg-[#2997FF] active:bg-[#0066CC] text-white rounded-full transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
