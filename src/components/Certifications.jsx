import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Trophy,
  BookOpen,
  Layers,
  BarChart3,
  Database,
  FileCode2,
  Cpu,
  Building2,
  ChevronRight,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { certificationsData, achievementsData } from '../data/portfolioData';

export default function Certifications() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Credentials', icon: Layers, count: certificationsData.length + achievementsData.length },
    { id: 'certifications', label: 'Certifications & Courses', icon: Award, count: certificationsData.length },
    { id: 'achievements', label: 'Honors & Accomplishments', icon: Trophy, count: achievementsData.length },
  ];

  const iconMap = {
    BarChart3: BarChart3,
    Database: Database,
    FileCode2: FileCode2,
    Cpu: Cpu,
    Building2: Building2,
    Sparkles: Sparkles,
  };

  const keyStats = [
    { value: '6+', label: 'Industry Credentials', desc: 'Power BI, SQL, Python, Databricks & ERP', icon: Award, color: 'text-sky-500' },
    { value: '60%', label: 'Discrepancy Time Saved', desc: 'Enterprise automated reconciliation SaaS', icon: Trophy, color: 'text-emerald-500' },
    { value: '-30%', label: 'Backlog Eliminated', desc: 'Executive Star Schema DAX models', icon: BarChart3, color: 'text-indigo-500' },
    { value: '1', label: 'Research Publication', desc: 'Deep learning malware detection robustness', icon: BookOpen, color: 'text-purple-500' },
  ];

  return (
    <section id="certifications" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-500/5 via-indigo-500/5 to-emerald-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400 shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Impact</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
            Certifications & <span className="text-gradient-blue">Achievements</span>.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Industry-recognized data certifications, proven enterprise reconciliation milestones, and academic research honors validating technical and business impact.
          </p>

          {/* Apple-style Segmented Control / Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl glass-panel bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 max-w-full overflow-x-auto no-scrollbar gap-1 shadow-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-zinc-950 dark:text-white'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCertTab"
                        className="absolute inset-0 bg-white dark:bg-[#1c1c22] rounded-xl shadow-sm border border-black/5 dark:border-white/10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-500' : 'text-zinc-400 dark:text-zinc-500'}`} />
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold'
                          : 'bg-zinc-200/60 dark:bg-white/10 text-zinc-500 dark:text-zinc-400'
                      }`}>
                        {tab.count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top 4 KPI Metric Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 mb-12 sm:mb-16">
          {keyStats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="glass-panel rounded-2xl p-4 sm:p-5 border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-[#121217]/60 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${stat.color}`}>
                    {stat.value}
                  </span>
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400">
                    <StatIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                  {stat.label}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Content Display */}
        <AnimatePresence mode="wait">

          {/* VIEW 1: ALL CREDENTIALS (BENTO COMBO) */}
          {activeTab === 'all' && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Section 1: Major Honors & Accomplishments */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      Featured Honors & Recognitions
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('achievements')}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all honors</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievementsData.slice(0, 2).map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -3 }}
                      className="glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-4 shadow-sm hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-blue">
                            {item.metric}
                          </span>
                          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            {item.highlight}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                            {item.title}
                          </h4>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                            {item.organization} • {item.date}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Section 2: Verified Certifications & Courses Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-sky-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      Industry Certifications & Professional Courses
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('certifications')}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all certifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {certificationsData.map((cert) => {
                    const IssuerIcon = iconMap[cert.issuerLogo] || Award;
                    return (
                      <motion.div
                        key={cert.id}
                        whileHover={{ y: -4 }}
                        className="glass-panel rounded-3xl p-6 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-4 shadow-sm hover:border-sky-500/30 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          {/* Issuer & Verification Pill */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
                                <IssuerIcon className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                                {cert.issuer}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>{cert.status}</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
                              {cert.title}
                            </h4>
                            <div className="text-[11px] font-mono text-zinc-500 mt-1">
                              {cert.category} • {cert.issueDate}
                            </div>
                          </div>

                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {cert.description}
                          </p>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-white/5">
                          <div className="flex flex-wrap gap-1">
                            {cert.skillsValidated.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/5"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="pt-1 flex items-center justify-between text-xs">
                            <span className="text-zinc-400 text-[11px]">Validated Skill Set</span>
                            <a
                              href={cert.credentialUrl}
                              target={cert.credentialUrl.startsWith('http') ? '_blank' : '_self'}
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400 hover:underline text-xs"
                            >
                              <span>View Details</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW 2: CERTIFICATIONS ONLY */}
          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2 mb-8 max-w-xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  Verified Industry Certifications & Specialized Courses
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Demonstrated command over data architecture, analytics tooling, distributed processing, and enterprise systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificationsData.map((cert, idx) => {
                  const IssuerIcon = iconMap[cert.issuerLogo] || Award;
                  return (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-4 shadow-sm hover:border-sky-500/30 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
                              <IssuerIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-zinc-900 dark:text-white">
                                {cert.issuer}
                              </div>
                              <div className="text-[10px] font-mono text-zinc-500">
                                Issued {cert.issueDate}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>{cert.status}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
                            {cert.title}
                          </h4>
                          <span className="inline-block mt-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                            {cert.category}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-white/5">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                          Core Competencies Validated:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skillsValidated.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/5"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 flex justify-end">
                          <a
                            href={cert.credentialUrl}
                            target={cert.credentialUrl.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                          >
                            <span>Verify Credential</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Return to All Credentials</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* VIEW 3: ACHIEVEMENTS & HONORS */}
          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-5xl mx-auto"
            >
              <div className="text-center space-y-2 mb-8 max-w-xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  Enterprise Impact & Academic Milestones
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Real-world measurable accomplishments across enterprise systems, operations optimization, and academic research.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievementsData.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-4 shadow-sm hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient-blue">
                          {item.metric}
                        </span>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                          {item.highlight}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                          {item.title}
                        </h4>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                          {item.organization} • {item.date}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recruitment Value Callout */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-emerald-500/10 border border-sky-500/20 text-center space-y-3">
                <h4 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Proven Track Record of Measurable Execution
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-lg mx-auto">
                  Available on 1-month notice. Ready to apply certified data modeling, query optimization, and enterprise reconciliation to your team.
                </p>
                <div className="pt-2 flex justify-center">
                  <a
                    href="#contact"
                    className="px-6 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs sm:text-sm font-semibold hover:bg-sky-600 dark:hover:bg-sky-400 transition-colors shadow-sm"
                  >
                    Discuss Open Opportunities
                  </a>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Return to All Credentials</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
