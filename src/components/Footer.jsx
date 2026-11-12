import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-white/5 py-12 relative bg-[#fbfbfd] dark:bg-[#09090b] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
            PK
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white">Pooja Kale</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Data & Business Analyst • Applied AI & Financial Operations
            </div>
          </div>
        </div>

        {/* Center Tag */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <span>Engineered with React & Tailwind</span>
          <span>•</span>
          <span>Apple-Inspired Clean UI</span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full glass-panel hover:text-sky-600 dark:hover:text-sky-400 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 transition-colors flex items-center gap-1.5 text-xs shadow-sm"
          title="Back to Top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
