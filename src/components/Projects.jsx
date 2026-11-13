import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Github, Layers, Sparkles, AlertTriangle, Zap,
  Activity, FileSpreadsheet, Bot, BarChart4, SlidersHorizontal, BookOpen,
  Eye, CheckCircle2, TrendingUp
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import ProjectCaseStudyModal from './ProjectCaseStudyModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Sync with URL hash for deep linking (e.g. #/case-study/fintech-lending)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/case-study/')) {
        const id = hash.replace('#/case-study/', '');
        const match = projects.find((p) => p.id === id);
        if (match) {
          setSelectedProject(match);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    window.location.hash = `#/case-study/${project.id}`;
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    if (window.location.hash.startsWith('#/case-study/')) {
      history.pushState('', document.title, window.location.pathname + window.location.search + '#projects');
    }
  };

  const handleLiveDemo = (e, project) => {
    e.stopPropagation();
    const liveSection = document.getElementById('live-dashboard');
    if (liveSection) {
      liveSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // High-fidelity, responsive macOS-style live simulation previews (aspect 16:10)
  const getProjectPreview = (id) => {
    switch (id) {
      case 'fintech-lending':
        return (
          <div className="h-full flex flex-col justify-between p-3.5 sm:p-4 font-mono text-xs text-zinc-300 bg-gradient-to-b from-[#0c0d12] to-[#08090c] select-none">
            <div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2 mb-2.5">
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold truncate text-xs">
                  <Activity className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Credit_Risk_Scorecard.py</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap font-medium">
                  ROC-AUC: 0.88
                </span>
              </div>

              {/* DPD Migration Aging Buckets */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">DPD 0–30 (Low Risk Portfolio):</span>
                    <span className="text-emerald-400 font-semibold">92.4% Optimal</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[92.4%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">DPD 31–60 (Early Warning Queue):</span>
                    <span className="text-amber-400 font-semibold">5.8% Monitored</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[5.8%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">DPD 60+ (Severe Delinquency):</span>
                    <span className="text-rose-400 font-semibold">1.8% Intervened</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full w-[1.8%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span>Lead Time: <strong className="text-emerald-400 font-normal">+45 Days</strong></span>
              <span className="text-sky-400">25,000+ Modeled</span>
            </div>
          </div>
        );

      case 'discrepancy-engine':
        return (
          <div className="h-full flex flex-col justify-between p-3.5 sm:p-4 font-mono text-xs text-zinc-300 bg-gradient-to-b from-[#0c0d12] to-[#08090c] select-none">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-2 mb-2.5">
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold truncate">
                  <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">ERP_Audit_Reconciliation.sql</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap font-medium">
                  Match: 98.2%
                </span>
              </div>

              {/* 3-Way Reconciliation Ledger Cards */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Workday Sub-Ledger</span>
                  <span className="font-semibold text-zinc-200">24,510 Txns</span>
                  <span className="text-zinc-400 block text-[11px] mt-0.5">$1,420,500.00</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Bank MT940 Feed</span>
                  <span className="font-semibold text-emerald-400">100% Balanced</span>
                  <span className="text-emerald-400/90 block text-[11px] mt-0.5">$0.00 Net Variance</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span>Rule: <strong className="text-sky-400 font-normal">±$0.02 / 2-day float</strong></span>
              <span className="text-emerald-400 font-semibold">AUDIT_PASSED</span>
            </div>
          </div>
        );

      case 'ai-workflow-analytics':
        return (
          <div className="h-full flex flex-col justify-between p-3.5 sm:p-4 font-mono text-xs text-zinc-300 bg-gradient-to-b from-[#0c0d12] to-[#08090c] select-none">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-2 mb-2.5">
                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold truncate">
                  <Bot className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Moveworks_AI_Funnel.json</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 whitespace-nowrap font-medium">
                  CSAT: 4.8 / 5
                </span>
              </div>

              {/* Conversational Funnel Stages */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Gross Session Inquiries:</span>
                  <span className="text-zinc-200 font-semibold">10,400 (100%)</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Intent Correctly Mapped:</span>
                  <span className="text-zinc-300 font-semibold">9,776 (94.0%)</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sky-400">Autonomous Containment:</span>
                    <span className="text-sky-400 font-bold">78.5% Resolved</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full w-[78.5%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span>Turnaround: <strong className="text-indigo-400 font-normal">-42% Faster</strong></span>
              <span className="text-sky-400 font-semibold">FCR: 78.5%</span>
            </div>
          </div>
        );

      case 'kpi-star-schema':
      default:
        return (
          <div className="h-full flex flex-col justify-between p-3.5 sm:p-4 font-mono text-xs text-zinc-300 bg-gradient-to-b from-[#0c0d12] to-[#08090c] select-none">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-2 mb-2.5">
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold truncate">
                  <BarChart4 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">StarSchema_DAX_Measures.dax</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap font-medium">
                  Backlog: -30%
                </span>
              </div>

              {/* 3 Executive Metric Tiles */}
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">SLA Met</div>
                  <div className="font-extrabold text-emerald-400 text-xs sm:text-sm">96.4%</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Avg TAT</div>
                  <div className="font-extrabold text-sky-400 text-xs sm:text-sm">3.2 hrs</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Throughput</div>
                  <div className="font-extrabold text-purple-400 text-xs sm:text-sm">+25%</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span>Model: <strong className="text-zinc-200 font-normal">Fact + 4 Dims</strong></span>
              <span className="text-emerald-400">Latency: 0.4s</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="pt-16 sm:pt-20 pb-12 sm:pb-16 scroll-mt-24 sm:scroll-mt-28 relative bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Engineering Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              Featured Case Studies & Projects
            </h2>
          </div>
          <p className="text-[15px] text-[#6E6E73] dark:text-[#86868B] max-w-md leading-relaxed">
            Click any project to explore the dedicated technical case study, data pipeline architecture, and verified business outcomes.
          </p>
        </div>

        {/* Bento Grid: 2 Columns on Desktop, 1 Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => openProjectModal(project)}
              className="apple-card apple-card-hover rounded-2xl p-5 sm:p-7 flex flex-col justify-between relative cursor-pointer"
            >
              <div>
                {/* Header Taxonomy Badges & GitHub Icon */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF] border border-[#0071E3]/20">
                      {project.badge}
                    </span>
                    {project.category && (
                      <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-medium text-[#6E6E73] dark:text-[#86868B] bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E]">
                        {project.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-[#E5E7EB] dark:border-[#2C2C2E] hover:border-[#0071E3] text-[#6E6E73] dark:text-[#86868B] hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
                      title="View GitHub Repository"
                      aria-label="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Standardized macOS-Style App Window Preview (Aspect 16:10) */}
                <div className="mb-5 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-md bg-zinc-950 aspect-[16/10] flex flex-col relative group/preview">
                  
                  {/* macOS Window Titlebar */}
                  <div className="bg-zinc-900/90 px-3.5 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400 truncate max-w-[200px]">
                      {project.id}.view
                    </span>
                    <span className="w-2.5" />
                  </div>

                  {/* Window Content with subtle zoom on card hover */}
                  <div className="flex-1 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.025] origin-top">
                    {getProjectPreview(project.id)}
                  </div>

                  {/* Subtle interactive hover overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/80 text-zinc-900 dark:text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 border border-white/20">
                      <Eye className="w-3.5 h-3.5 text-sky-500" />
                      <span>Click to View Case Study</span>
                    </div>
                  </div>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
                  {project.tagline}
                </p>

                {/* The Business Problem (STAR: Situation) */}
                <div className="mb-3 p-3.5 rounded-xl bg-amber-500/[0.05] dark:bg-amber-500/[0.04] border border-amber-500/20 text-xs sm:text-[13px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <div className="flex items-center gap-1.5 font-semibold font-mono text-amber-700 dark:text-amber-400 text-xs uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Business Problem</span>
                  </div>
                  <p className="text-[#6E6E73] dark:text-[#86868B]">{project.problem}</p>
                </div>

                {/* The Solution (STAR: Action) */}
                <div className="mb-4 p-3.5 rounded-xl bg-[#0071E3]/[0.05] dark:bg-[#2997FF]/[0.08] border border-[#0071E3]/20 dark:border-[#2997FF]/20 text-xs sm:text-[13px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <div className="flex items-center gap-1.5 font-semibold font-mono text-[#0071E3] dark:text-[#2997FF] text-xs uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Engineered Solution</span>
                  </div>
                  <p className="text-[#6E6E73] dark:text-[#86868B]">{project.solution}</p>
                </div>

                {/* Measurable Results KPI Row (STAR: Result) */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {project.measurableResults.map((result, idx) => (
                    <div
                      key={idx}
                      className="p-2 sm:p-2.5 rounded-xl bg-[#F5F5F7] dark:bg-[#121214] border border-[#E5E7EB] dark:border-[#2C2C2E] text-center flex flex-col justify-center items-center"
                    >
                      <div className={`text-base sm:text-lg font-bold ${result.color}`}>
                        {result.metric}
                      </div>
                      <div className="text-xs font-medium text-[#6E6E73] dark:text-[#86868B] leading-tight mt-1">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 pb-4 border-t border-[#E5E7EB] dark:border-[#2C2C2E]">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[#F5F5F7] dark:bg-[#121214] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E7EB] dark:border-[#2C2C2E]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* 3 Interactive Action Buttons: Apple Minimal CTAs (Min 44px touch height) */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-3 border-t border-[#E5E7EB] dark:border-[#2C2C2E]">
                  {/* Primary: View Case Study Modal */}
                  <button
                    onClick={() => openProjectModal(project)}
                    className="apple-btn-primary flex-1 min-h-[44px] py-2.5 px-4 text-xs sm:text-[13px] font-medium"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Secondary: Live Demo */}
                  <button
                    onClick={(e) => handleLiveDemo(e, project)}
                    className="apple-btn-secondary min-h-[44px] py-2.5 px-4 text-xs sm:text-[13px] font-medium"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </button>

                  {/* Tertiary: GitHub */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="min-h-[44px] py-2.5 px-3.5 rounded-full border border-[#E5E7EB] dark:border-[#2C2C2E] hover:border-[#0071E3] dark:hover:border-[#2997FF] text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#0071E3] dark:hover:text-[#2997FF] font-medium text-xs sm:text-[13px] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Deep-Dive Modal with Smooth Entrance and Exit */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectCaseStudyModal
            project={selectedProject}
            onClose={closeProjectModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

