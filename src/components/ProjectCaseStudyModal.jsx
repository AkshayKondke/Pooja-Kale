import React, { useEffect, useState } from 'react';
import {
  X, ExternalLink, Github, ArrowRight, CheckCircle2, AlertTriangle,
  Zap, Copy, Check, Terminal, Layers, TrendingUp, SlidersHorizontal, Sparkles
} from 'lucide-react';

export default function ProjectCaseStudyModal({ project, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);

  // Close on Escape key and lock body scroll
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

  const copyCodeToClipboard = () => {
    if (!caseStudy.codeSnippet) return;
    navigator.clipboard.writeText(caseStudy.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleLiveDemoClick = () => {
    onClose();
    const liveSection = document.getElementById('live-dashboard');
    if (liveSection) {
      liveSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Window */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-4xl bg-white dark:bg-[#101014] rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col z-10 animate-in zoom-in-95 duration-200"
      >
        
        {/* Sticky Window Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 dark:bg-[#101014]/95 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
                title="Close"
              />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs font-mono text-zinc-400 ml-2 hidden sm:inline">
              case-study-{project.id}.md
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
              {project.badge}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Hero Header */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-medium text-sky-600 dark:text-sky-400">
              {project.tagline}
            </p>

            {/* Executive Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-sky-500/5 border border-sky-500/20 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <span className="font-semibold text-sky-700 dark:text-sky-300 block mb-1">
                Executive Brief:
              </span>
              {caseStudy.executiveSummary}
            </div>

            {/* Measurable Results KPI Chips */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {project.measurableResults.map((result, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 text-center"
                >
                  <div className={`text-xl sm:text-2xl font-extrabold ${result.color}`}>
                    {result.metric}
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                    {result.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: The Business Problem & Context */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>The Business Challenge & Constraints</span>
            </h3>
            <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {caseStudy.contextAndProblem}
            </div>
          </div>

          {/* Section 3: Visual System Architecture Pipeline */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-500" />
              <span>System & Data Pipeline Architecture</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {caseStudy.architectureFlow.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-1">
                      STEP {step.step}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-white/5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                    {step.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Engineering Hurdles & Technical Solutions */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              <span>Key Technical Challenges & Solutions</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.engineeringHurdles.map((hurdle, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 space-y-2.5"
                >
                  <div className="text-xs font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>{hurdle.challenge}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    <strong className="text-zinc-900 dark:text-zinc-100">Engineering Approach:</strong> {hurdle.solution}
                  </p>
                  <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 pt-1 border-t border-zinc-200 dark:border-white/5">
                    ⚡ {hurdle.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Before vs. After Impact Matrix */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Before vs. After Impact Comparison</span>
            </h3>

            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10">
              <div className="grid grid-cols-4 bg-zinc-100 dark:bg-white/[0.04] p-3 text-xs font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-white/5">
                <div>Metric Tracked</div>
                <div>Legacy (Before)</div>
                <div>Pooja's Pipeline (After)</div>
                <div className="text-right">Measurable Impact</div>
              </div>
              {caseStudy.beforeAfter.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 p-3.5 text-xs text-zinc-600 dark:text-zinc-300 border-b border-zinc-100 dark:border-white/5 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors items-center"
                >
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{item.metric}</div>
                  <div className="text-red-500 dark:text-red-400">{item.before}</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.after}</div>
                  <div className="text-right font-mono text-sky-600 dark:text-sky-400 font-bold">
                    {item.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Code & Core Logic Showcase */}
          {caseStudy.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-500" />
                  <span>Production Code Snippet: {caseStudy.codeSnippet.title}</span>
                </h3>
                <button
                  onClick={copyCodeToClipboard}
                  className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-[#0d1117] text-zinc-200 font-mono text-xs p-4 overflow-x-auto shadow-inner">
                <pre className="leading-relaxed">
                  <code>{caseStudy.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Section 7: Key Outcomes */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-mono">
              Key Production Deliverables:
            </h4>
            <div className="space-y-1.5">
              {caseStudy.keyOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-zinc-50 dark:bg-[#121217] border-t border-zinc-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="hidden sm:inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleLiveDemoClick}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-md shadow-sky-500/20"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Open Live Simulator</span>
            </button>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-all shadow-sm"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Code</span>
            </a>

            <button
              onClick={onClose}
              className="text-xs font-medium px-4 py-2 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
            >
              Close
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
