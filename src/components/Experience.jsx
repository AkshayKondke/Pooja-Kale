import React from 'react';
import {
  Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2,
  Award, Trophy, BookOpen, Sparkles, Building2, ExternalLink
} from 'lucide-react';
import { experienceData, educationData, achievementsData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative bg-[#F5F5F7] dark:bg-[#121214] border-y border-[#E5E7EB] dark:border-[#2C2C2E] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/20 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Trajectory & Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
            Professional Experience & Milestones
          </h2>
          <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#86868B]">
            A continuous track record bridging enterprise ERP operations, financial sub-ledger balancing, and IT systems engineering.
          </p>
        </div>

        {/* Continuous Connected Timeline Layout */}
        <div className="relative pl-7 sm:pl-10 space-y-12 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E5E7EB] dark:before:bg-[#2C2C2E]">
          
          {/* Milestone 1: Enterprise Experience at OIA Global */}
          <div className="relative space-y-4">
            
            {/* Timeline Marker Node: Centered on vertical line */}
            <div className="absolute -left-7 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0071E3] text-white flex items-center justify-center shadow-sm ring-4 ring-[#F5F5F7] dark:ring-[#121214]">
              <Building2 className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>

            {/* Experience Card */}
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="apple-card rounded-2xl p-5 sm:p-7 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB] dark:border-[#2C2C2E]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF] font-bold block mb-1">
                      Current Enterprise Role
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[#0071E3] dark:text-[#2997FF] mt-0.5 flex items-center gap-1.5">
                      <span>{exp.company}</span>
                      <span className="text-[#6E6E73]">•</span>
                      <span className="text-[#6E6E73] font-normal text-xs">{exp.type}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6E6E73] dark:text-[#86868B]">
                    <span className="flex items-center gap-1 bg-[#F5F5F7] dark:bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[#2C2C2E]">
                      <Calendar className="w-3.5 h-3.5 text-[#0071E3]" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-[#F5F5F7] dark:bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[#2C2C2E]">
                      <MapPin className="w-3.5 h-3.5 text-[#6E6E73]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key Bullet Highlights */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-bold">
                    Core Engineering Deliverables & Responsibilities:
                  </h4>
                  {exp.highlights.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#1D1D1F] dark:text-zinc-200 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#0071E3] mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Production Tech Stack */}
                <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#2C2C2E] flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-zinc-300">Power BI (Advanced DAX)</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-zinc-300">Workday ERP</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-zinc-300">CargoWise</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-zinc-300">Python (Pandas)</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-zinc-300">PySpark</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-zinc-300">Databricks</span>
                </div>
              </div>
            ))}
          </div>

          {/* Milestone 2: Genuine Professional Achievements & Recognition */}
          <div className="relative space-y-4 pt-2">
            
            {/* Timeline Marker Node: Centered on vertical line */}
            <div className="absolute -left-7 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] flex items-center justify-center shadow-sm ring-4 ring-[#F5F5F7] dark:ring-[#121214]">
              <Trophy className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1D1D1F] dark:text-white uppercase tracking-wider">
                  Verified Honors & Milestones
                </span>
                <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#86868B]">Documented Impact</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievementsData.map((item) => (
                  <div
                    key={item.id}
                    className="apple-card rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF] font-semibold border border-[#0071E3]/20">
                        {item.highlight}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#1D1D1F] dark:text-white">
                        {item.metric}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#6E6E73] dark:text-zinc-300 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#2C2C2E] flex flex-wrap gap-1">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#6E6E73] dark:text-[#86868B] border border-[#E5E7EB] dark:border-[#2C2C2E] font-medium">
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
            <div className="absolute -left-7 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0071E3] text-white flex items-center justify-center shadow-sm ring-4 ring-[#F5F5F7] dark:ring-[#121214]">
              <GraduationCap className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#0071E3] dark:text-[#2997FF] uppercase tracking-wider block">
                Academic Foundation
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationData.map((edu, idx) => (
                  <div
                    key={idx}
                    className="apple-card rounded-2xl p-5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#0071E3] dark:text-[#2997FF] font-semibold">{edu.period}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                        {edu.grade}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white leading-snug">
                      {edu.degree}
                    </h4>

                    <div className="text-xs font-medium text-[#6E6E73] dark:text-[#86868B]">
                      {edu.institution}
                    </div>

                    <p className="text-xs text-[#6E6E73] dark:text-zinc-400 leading-relaxed pt-1">
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
