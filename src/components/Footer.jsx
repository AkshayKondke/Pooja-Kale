import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E5E7EB] dark:border-[#2C2C2E] py-12 relative bg-[#F5F5F7] dark:bg-[#121214] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-full bg-[#0071E3] flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-sm">
            PK
          </div>
          <div>
            <div className="text-xs font-bold text-[#1D1D1F] dark:text-white">Pooja Kale</div>
            <div className="text-[11px] text-[#6E6E73] dark:text-[#86868B]">
              Data & Business Analyst • Applied AI & Financial Operations
            </div>
          </div>
        </div>

        {/* Center Tag */}
        <div className="text-xs text-[#6E6E73] dark:text-[#86868B] flex items-center gap-2 font-mono">
          {/* <span>Engineered with React & Tailwind</span>
          <span>•</span>
          <span>Apple Minimal UI System</span> */}
        </div>

        {/* Back to top: Min 44px touch target */}
        <button
          onClick={scrollToTop}
          className="min-h-[44px] px-4 py-2.5 rounded-full apple-card hover:text-[#0071E3] dark:hover:text-[#2997FF] text-[#6E6E73] dark:text-[#86868B] transition-colors flex items-center gap-1.5 text-xs cursor-pointer active:scale-95"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
