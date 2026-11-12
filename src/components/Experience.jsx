import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData, educationData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Track Record & Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Experience & Education
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Enterprise analytics background bridging corporate finance reconciliation, logistics operations, and IT systems engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Work Experience Column (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500 font-mono mb-4">
              <Briefcase className="w-4 h-4 text-sky-500" />
              <span>Work Experience</span>
            </div>

            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-zinc-100 dark:border-white/5">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1 bg-zinc-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/5">
                      <Calendar className="w-3 h-3 text-sky-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-zinc-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/5">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {exp.highlights.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">Power BI (DAX)</span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">Workday ERP</span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">CargoWise</span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">Python (Pandas)</span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">PySpark</span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">Databricks</span>
                </div>
              </div>
            ))}
          </div>

          {/* Education Column (Spans 1 column) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500 font-mono mb-4">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span>Academic Education</span>
            </div>

            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-3xl p-6 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm"
              >
                <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                  {edu.period}
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
                  {edu.degree}
                </h4>
                <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mt-1">
                  {edu.institution}
                </div>
                <div className="inline-block mt-3 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
                  {edu.grade}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
