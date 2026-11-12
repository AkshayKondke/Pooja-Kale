import React, { useState } from 'react';
import {
  Cpu, CheckCircle2, BarChart3, Database, Code, Landmark, Sparkles,
  Award, ExternalLink, ShieldCheck, Check, ArrowUpRight
} from 'lucide-react';
import { skillsCategories, certificationsData } from '../data/portfolioData';

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('all');

  const categoryIcons = {
    bi: BarChart3,
    sql: Database,
    python: Code,
    erp: Landmark,
    ai: Sparkles,
  };

  // Map candidate skills to verified projects where they are deployed
  const projectMapping = {
    "Power BI": "Operational Star Schema KPI Dashboard",
    "Advanced DAX": "Operational Star Schema KPI Dashboard",
    "Star Schema": "Operational Star Schema KPI Dashboard",
    "Advanced Excel": "OIA Global Financial Operations",
    "Executive Scorecards": "Weekly Departmental SLA Reviews",
    "Advanced SQL": "Credit Delinquency Cohort Analytics",
    "SQL Server (SSMS)": "Production Task Completion Ingestion",
    "MySQL": "Relational Data Modeling",
    "Data Cleansing": "Workday ERP Sub-Ledger Pipeline",
    "Python (Pandas, NumPy)": "Automated Reconciliation Engine",
    "PySpark & Databricks": "Batch Transaction Aggregations",
    "Statistical Analysis": "Moveworks AI Containment A/B Testing",
    "Data Visualization": "Credit Risk Cohort Heatmaps",
    "Workday ERP": "Multi-Currency Sub-Ledger Balancing",
    "CargoWise": "Freight AP/AR Customs Clearance",
    "Financial Reconciliation": "3-Way Bank vs. ERP Reconciliation",
    "Delinquency Tracking": "FinTech MSME Credit Scorecard",
    "Claude & Claude Code": "Agentic Prototyping & Pipeline Automation",
    "Low-Code MIS (Frappe)": "Automated Operational Forms & Workflows",
    "Moveworks Analytics": "Enterprise AI Funnel Optimization",
    "Git & Agile/Scrum": "Version-Controlled Data Pipelines",
  };

  const getTierBadge = (level) => {
    switch (level) {
      case 'Expert':
        return {
          label: 'Primary Production Capability',
          style: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
        };
      case 'Advanced':
        return {
          label: 'Core Technical Competency',
          style: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20'
        };
      case 'Intermediate':
      default:
        return {
          label: 'Working Applied Knowledge',
          style: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20'
        };
    }
  };

  const filteredCategories = activeTab === 'all'
    ? skillsCategories
    : skillsCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Core Skills & Verified Credentials
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Organized by technical discipline and backed by production deployment in enterprise ERP systems, data pipelines, and certified credentials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`text-xs font-medium px-4 py-2 rounded-full transition-all ${
              activeTab === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-md'
                : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            All Capabilities
          </button>
          {skillsCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Cpu;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full transition-all ${
                  activeTab === category.id
                    ? 'bg-sky-500 text-white dark:text-zinc-950 font-semibold shadow-md shadow-sky-500/20'
                    : 'glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid: Focus on concrete production application instead of arbitrary percentages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filteredCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Cpu;
            return (
              <div
                key={category.id}
                className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 flex flex-col justify-between shadow-sm relative overflow-hidden group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-zinc-100 dark:border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight">
                        {category.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/5">
                      {category.skills.length} tools
                    </span>
                  </div>

                  {/* Skills List with Concrete Deployment Context */}
                  <div className="space-y-4">
                    {category.skills.map((skill, idx) => {
                      const tier = getTierBadge(skill.level);
                      const project = projectMapping[skill.name] || "Enterprise Operations at OIA Global";

                      return (
                        <div key={idx} className="p-3 rounded-2xl bg-zinc-50/70 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 tracking-tight">
                              {skill.name}
                            </h4>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${tier.style}`}>
                              {tier.label}
                            </span>
                          </div>

                          <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-snug">
                            {skill.desc}
                          </p>

                          {/* Demonstrated in Project */}
                          <div className="pt-1.5 mt-1 border-t border-zinc-200/40 dark:border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-sky-600 dark:text-sky-400">
                            <Check className="w-3 h-3 text-sky-500 shrink-0" />
                            <span className="truncate">Demonstrated: {project}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Production Audited</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Certifications & Credentials Grid */}
        <div id="certifications" className="space-y-6 scroll-mt-24 sm:scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider font-mono mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Formal Industry Certifications</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                Verified Accreditations & Credentials
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
              Third-party verified competency in enterprise BI modeling, relational SQL, and big data architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="glass-panel glass-panel-hover rounded-2xl p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 flex flex-col justify-between shadow-sm space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                      {cert.status} • {cert.issueDate}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {cert.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight leading-snug">
                    {cert.title}
                  </h4>

                  <div className="text-xs font-medium text-sky-600 dark:text-sky-400 mt-1 mb-2">
                    {cert.issuer}
                  </div>

                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {cert.skillsValidated.slice(0, 3).map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">Audited Curriculum</span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    <span>View Credential</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
