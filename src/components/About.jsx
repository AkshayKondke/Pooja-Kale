import React from 'react';
import {
  UserCheck, Sparkles, Quote, ArrowRight,
  Database, ShieldCheck, BarChart3
} from 'lucide-react';
import { aboutMeData } from '../data/portfolioData';

export default function About() {
  const corePillars = [
    {
      step: '01',
      title: 'Audit & Ingest',
      desc: 'Raw multi-source extraction across Workday ERP, CargoWise feeds, and financial sub-ledgers.',
      icon: Database,
    },
    {
      step: '02',
      title: 'Reconcile & Verify',
      desc: 'Automated Python & SQL discrepancy engines eliminating 60% manual verification overhead.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Executive Delivery',
      desc: 'Star Schema Power BI models translating complex transactional records into executive clarity.',
      icon: BarChart3,
    },
  ];

  const coreChips = [
    'B.E. IT 2024 (7.74 Distinction)',
    'Workday ERP Reconciliations',
    'Star Schema Power BI',
    'Python & SQL Automation',
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 scroll-mt-24 sm:scroll-mt-28 relative bg-[#F5F5F7] dark:bg-[#121214] border-y border-[#E5E7EB] dark:border-[#2C2C2E] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-xs font-semibold text-[#0071E3] dark:text-[#2997FF]">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile & Mindset</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.12]">
            Engineering Systems <br className="hidden sm:inline" />
            Meets <span className="text-[#0071E3] dark:text-[#2997FF]">Business Intelligence</span>.
          </h2>

          <p className="text-[16px] sm:text-[17px] text-[#6E6E73] dark:text-[#86868B] font-normal leading-relaxed max-w-2xl mx-auto">
            From relational database foundations to enterprise ERP reconciliations at OIA Global—turning messy data into reliable systems and executive clarity.
          </p>
        </div>

        {/* Master Bento Grid: 2 Columns (8 / 4 on desktop, 1 column on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-5 sm:mb-6">
          
          {/* Card 1: Professional Narrative & Philosophy (8 cols) */}
          <div className="lg:col-span-8 apple-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Origin & Philosophy</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                {aboutMeData.headline}
              </h3>

              <div className="space-y-3 text-[#6E6E73] dark:text-[#86868B] text-sm sm:text-[15px] leading-relaxed font-normal">
                <p>{aboutMeData.narrativeLead}</p>
                <p>{aboutMeData.narrativeBody}</p>
              </div>
            </div>

            {/* Philosophy Quote Callout */}
            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-4.5 bg-[#0071E3]/[0.04] dark:bg-[#0071E3]/10 border-l-3 border-[#0071E3] border border-[#E5E7EB] dark:border-[#2C2C2E] space-y-1">
              <div className="flex items-center gap-1.5 text-[#0071E3] dark:text-[#2997FF] text-[11px] font-semibold uppercase tracking-wider font-mono">
                <Quote className="w-3 h-3" />
                <span>Guiding Principle</span>
              </div>
              <blockquote className="text-xs sm:text-sm italic font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                {aboutMeData.philosophyQuote}
              </blockquote>
            </div>

            {/* Core Capability Badges */}
            <div className="pt-2 flex flex-wrap gap-2 border-t border-[#E5E7EB] dark:border-[#2C2C2E]">
              {coreChips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E7EB] dark:border-[#2C2C2E]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Executive Factsheet & Availability (4 cols) */}
          <div className="lg:col-span-4 apple-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
            
            {/* Availability Status Badge */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  Availability
                </span>
              </div>
              <div className="text-lg font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                1 Month Notice Period
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Serving notice at OIA Global. Fast-track onboarding available.
              </p>
            </div>

            {/* Key Facts List */}
            <div className="space-y-3.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] font-semibold">
                Key Facts
              </div>
              {aboutMeData.quickFacts.map((fact, i) => (
                <div key={i} className="pb-3 border-b border-[#E5E7EB] dark:border-[#2C2C2E] last:border-0 last:pb-0">
                  <div className="text-[11px] text-[#86868B]">{fact.label}</div>
                  <div className="text-sm font-semibold text-[#1D1D1F] dark:text-white">{fact.value}</div>
                  <div className="text-[11px] text-[#6E6E73] dark:text-[#86868B]">{fact.sub}</div>
                </div>
              ))}
            </div>

            {/* Direct Connect CTA */}
            <a
              href="#contact"
              className="apple-btn-primary w-full justify-center text-xs sm:text-sm font-semibold"
            >
              <span>Connect Regarding Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>
        </div>

        {/* Row 2: 3 Core Methodology Pillars (At a glance) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.step}
                className="apple-card rounded-2xl p-5 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#0071E3] dark:text-[#2997FF] px-2.5 py-1 rounded-md bg-[#0071E3]/10 border border-[#0071E3]/20">
                      STEP {pillar.step}
                    </span>
                    <Icon className="w-4 h-4 text-[#86868B]" />
                  </div>
                  <h4 className="text-base font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
