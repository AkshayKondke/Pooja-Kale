import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
          style: 'bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF] border-[#0071E3]/20'
        };
      case 'Intermediate':
      default:
        return {
          label: 'Working Applied Knowledge',
          style: 'bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#6E6E73] dark:text-[#86868B] border-[#E5E7EB] dark:border-[#2C2C2E]'
        };
    }
  };

  const filteredCategories = activeTab === 'all'
    ? skillsCategories
    : skillsCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/20 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
            Core Skills & Verified Credentials
          </h2>
          <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#86868B]">
            Organized by technical discipline and backed by production deployment in enterprise ERP systems, data pipelines, and certified credentials.
          </p>
        </div>

        {/* Apple Segmented Filter Pill Rail */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E7EB] dark:border-[#2C2C2E] max-w-full overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer select-none ${
                activeTab === 'all'
                  ? 'text-[#1D1D1F] dark:text-white'
                  : 'text-[#6E6E73] dark:text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              {activeTab === 'all' && (
                <motion.div
                  layoutId="activeSkillsTab"
                  className="absolute inset-0 bg-white dark:bg-[#2C2C2E] rounded-full shadow-sm border border-[#E5E7EB] dark:border-[#3A3A3C]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Cpu className={`w-3.5 h-3.5 ${activeTab === 'all' ? 'text-[#0071E3] dark:text-[#2997FF]' : 'text-[#6E6E73] dark:text-[#86868B]'}`} />
                <span>All Capabilities</span>
              </span>
            </button>
            {skillsCategories.map((category) => {
              const Icon = categoryIcons[category.id] || Cpu;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? 'text-[#1D1D1F] dark:text-white'
                      : 'text-[#6E6E73] dark:text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillsTab"
                      className="absolute inset-0 bg-white dark:bg-[#2C2C2E] rounded-full shadow-sm border border-[#E5E7EB] dark:border-[#3A3A3C]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0071E3] dark:text-[#2997FF]' : 'text-[#6E6E73] dark:text-[#86868B]'}`} />
                    <span>{category.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid: Focus on concrete production application instead of arbitrary percentages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filteredCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Cpu;
            return (
              <div
                key={category.id}
                className="apple-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[#E5E7EB] dark:border-[#2C2C2E]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF] flex items-center justify-center font-bold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                        {category.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#6E6E73] dark:text-[#86868B] border border-[#E5E7EB] dark:border-[#2C2C2E] shrink-0 font-medium">
                      {category.skills.length} tools
                    </span>
                  </div>

                  {/* Skills List with Concrete Deployment Context */}
                  <div className="space-y-3.5">
                    {category.skills.map((skill, idx) => {
                      const tier = getTierBadge(skill.level);
                      const project = projectMapping[skill.name] || "Enterprise Operations at OIA Global";

                      return (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#F5F5F7]/80 dark:bg-[#1C1C1E]/60 border border-[#E5E7EB] dark:border-[#2C2C2E] space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <h4 className="font-bold text-xs sm:text-sm text-[#1D1D1F] dark:text-zinc-100 tracking-tight">
                              {skill.name}
                            </h4>
                            <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full font-semibold border ${tier.style} shrink-0`}>
                              {tier.label}
                            </span>
                          </div>

                          <p className="text-xs text-[#6E6E73] dark:text-zinc-300 leading-snug">
                            {skill.desc}
                          </p>

                          {/* Demonstrated in Project */}
                          <div className="pt-1.5 mt-1 border-t border-[#E5E7EB]/60 dark:border-[#2C2C2E]/60 flex items-center gap-1.5 text-xs font-mono text-[#0071E3] dark:text-[#2997FF]">
                            <Check className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                            <span className="truncate">Demonstrated: {project}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#E5E7EB] dark:border-[#2C2C2E] flex items-center justify-between text-[11px] text-[#6E6E73] dark:text-[#86868B] font-mono">
                  <span>Production Audited</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Certifications & Credentials Grid */}
        <div id="skills-cert-preview" className="space-y-6 scroll-mt-24 sm:scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#E5E7EB] dark:border-[#2C2C2E]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] uppercase tracking-wider font-mono mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Formal Industry Certifications</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                Verified Accreditations & Credentials
              </h3>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B] max-w-sm">
              Third-party verified competency in enterprise BI modeling, relational SQL, and big data architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="apple-card rounded-2xl p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                      {cert.status} • {cert.issueDate}
                    </span>
                    <span className="text-xs font-mono text-[#6E6E73] dark:text-[#86868B] font-medium">
                      {cert.category}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-[15px] font-bold text-[#1D1D1F] dark:text-white tracking-tight leading-snug">
                    {cert.title}
                  </h4>

                  <div className="text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] mt-1 mb-2">
                    {cert.issuer}
                  </div>

                  <p className="text-xs text-[#6E6E73] dark:text-zinc-300 leading-relaxed mb-3">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsValidated.slice(0, 3).map((s, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-[#F5F5F7] dark:bg-[#1C1C1E] text-xs font-mono text-[#6E6E73] dark:text-zinc-300 border border-[#E5E7EB] dark:border-[#2C2C2E] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2C2C2E] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#6E6E73] dark:text-[#86868B]">Audited Curriculum</span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline cursor-pointer"
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
