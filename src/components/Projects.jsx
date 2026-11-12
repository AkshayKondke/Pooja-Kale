import React, { useState } from 'react';
import {
  ArrowRight, Github, Layers, Sparkles, AlertTriangle, Zap,
  Activity, FileSpreadsheet, Bot, BarChart4, SlidersHorizontal, BookOpen
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import ProjectCaseStudyModal from './ProjectCaseStudyModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const getProjectPreview = (id) => {
    switch (id) {
      case 'fintech-lending':
        return (
          <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2.5 text-zinc-300">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-sky-400">
                <Activity className="w-3.5 h-3.5" />
                <span>Credit_Risk_Scorecard.py</span>
              </span>
              <span className="text-emerald-400">Model: XGBoost (AUC 0.88)</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">DPD 0–30 (Low Risk):</span>
                <span className="text-emerald-400 font-semibold">92.4% Optimal</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[92%]" />
              </div>

              <div className="flex justify-between text-[11px] pt-1">
                <span className="text-zinc-400">DPD 31–60 (Watchlist):</span>
                <span className="text-amber-400 font-semibold">5.8% Monitored</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[6%]" />
              </div>
            </div>
          </div>
        );

      case 'discrepancy-engine':
        return (
          <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2 text-zinc-300">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-sky-400">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>ERP_Audit_Reconciliation.sql</span>
              </span>
              <span className="text-emerald-400">Auto-Matched: 98.2%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                <span className="text-zinc-500 block">Workday Sub-Ledger:</span>
                <span className="font-semibold text-zinc-200">24,510 Txns</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                <span className="text-zinc-500 block">Bank Settlement:</span>
                <span className="font-semibold text-emerald-400">100% Balanced</span>
              </div>
            </div>
            <div className="text-[10px] text-zinc-500 pt-1 flex items-center justify-between">
              <span>Tolerance Rule: ±$0.02 / 2-day float</span>
              <span className="text-sky-400">Variance: $0.00</span>
            </div>
          </div>
        );

      case 'ai-workflow-analytics':
        return (
          <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2 text-zinc-300">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <Bot className="w-3.5 h-3.5" />
                <span>Moveworks_AI_Funnel.json</span>
              </span>
              <span className="text-sky-400">CSAT Score: 4.8 / 5</span>
            </div>
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">10,400 Inquiries</span>
                <span className="text-zinc-200">100% Total Volume</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-sky-400">Autonomous Resolution</span>
                <span className="text-sky-400 font-semibold">78.5% Containment</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full w-[78.5%]" />
              </div>
            </div>
          </div>
        );

      case 'kpi-star-schema':
      default:
        return (
          <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2 text-zinc-300">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-sky-400">
                <BarChart4 className="w-3.5 h-3.5" />
                <span>StarSchema_DAX_Measures.dax</span>
              </span>
              <span className="text-emerald-400">Backlog: -30%</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] text-center">
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-zinc-500">SLA Met</div>
                <div className="font-bold text-emerald-400">96.4%</div>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-zinc-500">Avg TAT</div>
                <div className="font-bold text-sky-400">3.2 hrs</div>
              </div>
              <div className="p-1.5 rounded bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-zinc-500">Throughput</div>
                <div className="font-bold text-purple-400">+25%</div>
              </div>
            </div>
          </div>
        );
    }
  };

  const handleLiveDemo = (e, project) => {
    e.stopPropagation();
    const liveSection = document.getElementById('live-dashboard');
    if (liveSection) {
      liveSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Engineering Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Featured Case Studies & Projects
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Click any project to explore the full interactive architecture diagram, before/after impact matrix, and technical decisions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group shadow-sm bg-white dark:bg-[#121217]/60 cursor-pointer border-zinc-200/80 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-500/40"
            >
              <div>
                {/* Header Badge & Action Icons */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                    {project.badge}
                  </span>
                  
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full glass-panel hover:text-sky-600 dark:hover:text-sky-400 text-zinc-500 dark:text-zinc-400 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Simulated macOS-Style App Window Preview */}
                <div className="mb-5 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-md">
                  <div className="bg-zinc-200 dark:bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-zinc-300 dark:border-white/5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">live-preview-v1.0</span>
                  </div>
                  {getProjectPreview(project.id)}
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
                  {project.tagline}
                </p>

                {/* The Business Problem (STAR: Situation) */}
                <div className="mb-3 p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 text-[11px] uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Business Problem</span>
                  </div>
                  <p>{project.problem}</p>
                </div>

                {/* The Solution (STAR: Action) */}
                <div className="mb-4 p-3.5 rounded-2xl bg-sky-500/[0.06] border border-sky-500/20 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-1.5 font-bold text-sky-700 dark:text-sky-400 text-[11px] uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Engineered Solution</span>
                  </div>
                  <p>{project.solution}</p>
                </div>

                {/* Measurable Results KPI Row (STAR: Result) */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {project.measurableResults.map((result, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 text-center"
                    >
                      <div className={`text-base sm:text-lg font-extrabold ${result.color}`}>
                        {result.metric}
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 pb-4 border-t border-zinc-100 dark:border-white/5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-400 border border-zinc-200 dark:border-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* 3 Interactive Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-white/5">
                  {/* Primary: View Case Study Modal */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-sky-600 dark:hover:bg-sky-400 transition-all shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Secondary: Live Demo */}
                  <button
                    onClick={(e) => handleLiveDemo(e, project)}
                    className="py-2.5 px-3 rounded-xl glass-panel text-zinc-700 dark:text-zinc-300 font-semibold text-xs flex items-center gap-1.5 hover:border-sky-500/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-sky-500" />
                    <span>Demo</span>
                  </button>

                  {/* Tertiary: GitHub */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="py-2.5 px-3 rounded-xl glass-panel text-zinc-700 dark:text-zinc-300 font-semibold text-xs flex items-center gap-1 hover:border-sky-500/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
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

      {/* Case Study Deep-Dive Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
