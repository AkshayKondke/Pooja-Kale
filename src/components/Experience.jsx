import React from 'react';
import {
  Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2,
  Award, Trophy, BookOpen, Sparkles, Building2, ExternalLink
} from 'lucide-react';
import { experienceData, educationData, achievementsData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Trajectory & Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Professional Experience & Milestones
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A continuous track record bridging enterprise ERP operations, financial sub-ledger balancing, and IT systems engineering.
          </p>
        </div>

        {/* Continuous Connected Timeline Layout */}
        <div className="relative pl-7 sm:pl-10 space-y-12 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-indigo-500 before:to-zinc-300 dark:before:to-zinc-800">
          
          {/* Milestone 1: Enterprise Experience at OIA Global */}
          <div className="relative space-y-4">
            
            {/* Timeline Marker Node: Centered on vertical line */}
            <div className="absolute -left-7 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/25 ring-4 ring-white dark:ring-[#09090b]">
              <Building2 className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>

            {/* Experience Card */}
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-4 sm:p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-white/5">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold block mb-1">
                      Current Enterprise Role
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-bold text-sky-600 dark:text-sky-400 mt-0.5 flex items-center gap-1.5">
                      <span>{exp.company}</span>
                      <span className="text-zinc-400">•</span>
                      <span className="text-zinc-500 font-normal text-xs">{exp.type}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1 bg-zinc-100 dark:bg-white/[0.03] px-3 py-1 rounded-full border border-zinc-200 dark:border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-zinc-100 dark:bg-white/[0.03] px-3 py-1 rounded-full border border-zinc-200 dark:border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key Bullet Highlights */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                    Core Engineering Deliverables & Responsibilities:
                  </h4>
                  {exp.highlights.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Production Tech Stack */}
                <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300">Power BI (Advanced DAX)</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300">Workday ERP</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300">CargoWise</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300">Python (Pandas)</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300">PySpark</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300">Databricks</span>
                </div>
              </div>
            ))}
          </div>

          {/* Milestone 2: Genuine Professional Achievements & Recognition */}
          <div className="relative space-y-4 pt-2">
            
            {/* Timeline Marker Node: Centered on vertical line */}
            <div className="absolute -left-7 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 ring-4 ring-white dark:ring-[#09090b]">
              <Trophy className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Verified Honors & Milestones
                </span>
                <span className="text-[11px] font-mono text-zinc-400">Documented Impact</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievementsData.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel rounded-2xl p-5 border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                        {item.highlight}
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-950 dark:text-white">
                        {item.metric}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-1">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-mono px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Milestone 3: Academic Foundation & B.E. Degree */}
          <div className="relative space-y-4 pt-2">
            
            {/* Timeline Marker Node: Centered on vertical line */}
            <div className="absolute -left-7 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-md shadow-purple-500/25 ring-4 ring-white dark:ring-[#09090b]">
              <GraduationCap className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                Academic Foundation
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationData.map((edu, idx) => (
                  <div
                    key={idx}
                    className="glass-panel rounded-2xl p-5 border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">{edu.period}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                        {edu.grade}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                      {edu.degree}
                    </h4>

                    <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {edu.institution}
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
