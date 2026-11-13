import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  X, Github, CheckCircle2, AlertTriangle,
  Layers, SlidersHorizontal, Sparkles
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function ProjectCaseStudyModal({ project, onClose }) {
  // Close on Escape key and lock background body scroll
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !project.caseStudy) return null;

  const { caseStudy } = project;

  const handleLiveDemoClick = () => {
    onClose();
    const liveSection = document.getElementById('live-dashboard');
    if (liveSection) {
      liveSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      
      {/* 1. Backdrop (covers entire screen, including floating navbar at z-50) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
        aria-hidden="true"
      />

      {/* 2. Modal Dialog Window (Strict 3-Layer Architecture: Header, Scroll Body, Sticky Footer) */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[880px] max-h-[85vh] sm:max-h-[86vh] my-auto flex flex-col bg-white dark:bg-[#161617] rounded-[24px] border border-[#E5E7EB] dark:border-[#2C2C2E] shadow-2xl overflow-hidden"
      >
        
        {/* ========================================================= */}
        {/* LAYER 1: MODAL HEADER (Fixed, Non-Scrolling, Min 44px targets) */}
        {/* ========================================================= */}
        <div className="shrink-0 px-5 sm:px-7 py-3.5 sm:py-4 bg-white/95 dark:bg-[#161617]/95 backdrop-blur-xl border-b border-[#E5E7EB] dark:border-[#2C2C2E] flex items-center justify-between gap-3 z-20">
          
          {/* Left: macOS Dots + Single Clean Category Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"
                title="Close Modal (Esc)"
                aria-label="Close"
              />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>

            <div className="flex items-center gap-2 text-xs truncate ml-1">
              <span className="px-3 py-1 rounded-full text-xs sm:text-[13px] font-semibold bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF] border border-[#0071E3]/20 shrink-0 font-mono">
                {project.category || project.badge}
              </span>
            </div>
          </div>

          {/* Right: Close Button (Min 44px Touch Target) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center text-[#6E6E73] hover:text-[#1D1D1F] dark:text-[#86868B] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER 2: INDEPENDENTLY SCROLLABLE CONTENT BODY */}
        {/* ========================================================= */}
        <div className="flex-1 overflow-y-auto min-h-0 p-5 sm:p-7 md:p-8 space-y-6 sm:space-y-7 no-scrollbar overscroll-contain">
          
          {/* 1. Title & Tagline */}
          <div className="space-y-1.5">
            <h2
              id="modal-project-title"
              className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.2]"
            >
              {project.title}
            </h2>
            <p className="text-sm sm:text-[15px] font-medium text-[#0071E3] dark:text-[#2997FF]">
              {project.tagline}
            </p>
          </div>

          {/* 2. Executive Summary (Concise Apple Minimal Card) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F5F7] dark:bg-[#121214] border border-[#E5E7EB] dark:border-[#2C2C2E] text-xs sm:text-sm text-[#1D1D1F] dark:text-zinc-200 leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-mono font-bold text-[#0071E3] dark:text-[#2997FF] uppercase tracking-wider text-xs sm:text-[12.5px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Brief</span>
            </div>
            <p className="text-sm sm:text-[15px] text-[#1D1D1F] dark:text-zinc-200 leading-relaxed font-normal">
              {caseStudy.executiveSummary}
            </p>
          </div>

          {/* 3. Three Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {project.measurableResults.map((result, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#F5F5F7] dark:bg-[#121214] border border-[#E5E7EB] dark:border-[#2C2C2E] text-center flex flex-col justify-center items-center min-h-[92px]"
              >
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${result.color}`}>
                  <AnimatedCounter value={result.metric} delay={idx * 0.08} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1">
                  {result.label}
                </div>
              </div>
            ))}
          </div>

          {/* 4. Business Problem & Engineered Solution (Balanced 2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Business Problem Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/[0.04] dark:bg-amber-500/[0.03] border border-amber-500/20 space-y-2.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <h3 className="text-sm sm:text-[15px] font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 uppercase tracking-wider font-mono">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>The Challenge</span>
                </h3>
                <p className="text-sm sm:text-[14.5px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-medium text-amber-700/80 dark:text-amber-300/80">
                Root Cause Analysis
              </div>
            </div>

            {/* Engineered Solution Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.03] border border-emerald-500/20 space-y-2.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <h3 className="text-sm sm:text-[15px] font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2 uppercase tracking-wider font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>The Engineered Solution</span>
                </h3>
                <p className="text-sm sm:text-[14.5px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-medium text-emerald-700/80 dark:text-emerald-300/80">
                Automated System Architecture
              </div>
            </div>

          </div>

          {/* 5. Relevant Technology Stack */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
              <Layers className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Core Technology Stack</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {project.tools.slice(0, 6).map((tool) => (
                <span
                  key={tool}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-mono font-medium bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-zinc-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 6. Verified Deliverables & Business Impact */}
          {caseStudy.keyOutcomes && caseStudy.keyOutcomes.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Deliverables & Business Impact</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.keyOutcomes.slice(0, 4).map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-[#F5F5F7] dark:bg-[#121214] border border-[#E5E7EB] dark:border-[#2C2C2E] flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#1D1D1F] dark:text-zinc-200 leading-relaxed">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Insight if present */}
          {caseStudy.businessInsights && caseStudy.businessInsights.length > 0 && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#0071E3]/5 dark:bg-[#0071E3]/10 border border-[#0071E3]/20 text-xs sm:text-sm text-[#1D1D1F] dark:text-zinc-200 space-y-1">
              <span className="font-mono font-bold text-[#0071E3] dark:text-[#2997FF] text-xs uppercase tracking-wider block">
                Key Strategic Insight
              </span>
              <p className="leading-relaxed">
                {caseStudy.businessInsights[0]}
              </p>
            </div>
          )}

          <div className="h-2" />

        </div>

        {/* ========================================================= */}
        {/* LAYER 3: STICKY BOTTOM ACTION FOOTER (Never Overlaps!) */}
        {/* ========================================================= */}
        <div className="shrink-0 px-5 sm:px-7 py-3.5 sm:py-4 bg-white/95 dark:bg-[#161617]/95 backdrop-blur-xl border-t border-[#E5E7EB] dark:border-[#2C2C2E] flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
          
          {/* Left: Quick Jump Context */}
          <div className="hidden sm:flex items-center gap-2 text-xs sm:text-[13px] text-[#6E6E73] dark:text-[#86868B] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Interactive Simulator & Verified Repo Available</span>
          </div>

          {/* Right: Actions with Min 44px Touch Targets & enlarged legible text */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleLiveDemoClick}
              className="apple-btn-primary flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full min-h-[44px] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Live Simulator</span>
            </button>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-secondary flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full min-h-[44px] cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Code</span>
            </a>

            <button
              onClick={onClose}
              className="text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#6E6E73] dark:text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer min-h-[44px]"
            >
              Close
            </button>
          </div>
        </div>

      </motion.div>

    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}
