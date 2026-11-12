import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Sparkles,
  Target,
  Zap,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Building2,
  Compass,
  Search,
  Cpu,
  TrendingUp,
  Activity,
  Palette,
  Workflow,
  ArrowRight,
  Clock,
  MapPin,
  Briefcase,
  Layers,
  Quote,
  ChevronRight,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { personalInfo, aboutMeData } from '../data/portfolioData';

export default function About() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All (Bento)', icon: Layers },
    { id: 'journey', label: 'My Journey', icon: Compass },
    { id: 'approach', label: 'Problem-Solving', icon: Search },
    { id: 'interests', label: 'Interests & Craft', icon: Sparkles },
    { id: 'goals', label: 'Goals & Value', icon: Target },
  ];

  // Map icon strings from data to actual Lucide components
  const iconMap = {
    Search: Search,
    ShieldCheck: ShieldCheck,
    Cpu: Cpu,
    TrendingUp: TrendingUp,
    Sparkles: Sparkles,
    Activity: Activity,
    Palette: Palette,
    Workflow: Workflow,
    Building2: Building2,
    GraduationCap: GraduationCap,
    Compass: Compass,
  };

  return (
    <section id="about" className="pt-8 sm:pt-10 pb-16 sm:pb-20 scroll-mt-24 sm:scroll-mt-28 relative overflow-hidden">
      {/* Subtle Apple-style Background Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-sky-500/5 via-indigo-500/5 to-purple-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400 shadow-sm">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile & Mindset</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
            Where Engineering Systems <br className="hidden sm:inline" />
            Meet <span className="text-gradient-blue">Business Intelligence</span>.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            From database architectures to enterprise ERP reconciliations at OIA Global—turning complex, fragmented data into bulletproof systems and executive clarity.
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
                        layoutId="activeAboutTab"
                        className="absolute inset-0 bg-white dark:bg-[#1c1c22] rounded-xl shadow-sm border border-black/5 dark:border-white/10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-500' : 'text-zinc-400 dark:text-zinc-500'}`} />
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content Panes */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: ALL (APPLE BENTO OVERVIEW) */}
          {activeTab === 'all' && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Row 1: Main Narrative (2/3) + Executive Factsheet (1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Main Narrative Bento Card */}
                <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-9 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-6 shadow-sm relative overflow-hidden">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      <Sparkles className="w-4 h-4 text-sky-500" />
                      <span>Origin & Core Philosophy</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                      {aboutMeData.headline}
                    </h3>
                  </div>

                  <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                    <p>
                      {aboutMeData.narrativeLead}
                    </p>
                    <p>
                      {aboutMeData.narrativeBody}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
                      {aboutMeData.narrativeAi}
                    </p>
                  </div>

                  {/* Philosophy Quote Callout */}
                  <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-sky-500/5 via-indigo-500/5 to-transparent border-l-4 border-sky-500 border-zinc-200/50 dark:border-white/5 space-y-2">
                    <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
                      <Quote className="w-4 h-4" />
                      <span>Guiding Principle</span>
                    </div>
                    <blockquote className="text-sm sm:text-base italic font-medium text-zinc-800 dark:text-zinc-200">
                      {aboutMeData.philosophyQuote}
                    </blockquote>
                  </div>

                  {/* Core Focus Pills */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {["B.E. IT 2024", "Workday ERP Reconciliation", "Star Schema BI", "Advanced DAX", "Python / SQL", "Applied AI"].map((chip) => (
                      <span
                        key={chip}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Executive Factsheet Bento Card */}
                <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 flex flex-col justify-between shadow-sm space-y-6">
                  
                  {/* Notice Period Badge */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Hiring Status
                      </span>
                    </div>
                    <div className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      1 Month Notice Period
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Currently serving notice at OIA Global. Ready for fast-track onboarding.
                    </p>
                  </div>

                  {/* Quick Facts List */}
                  <div className="space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Key Highlights
                    </div>
                    {aboutMeData.quickFacts.map((fact, i) => (
                      <div key={i} className="pb-3 border-b border-zinc-100 dark:border-white/5 last:border-0 last:pb-0">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">{fact.label}</div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-white">{fact.value}</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{fact.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Button */}
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-sky-600 dark:hover:bg-sky-400 dark:hover:text-zinc-950 transition-all duration-200 shadow-sm"
                  >
                    <span>Connect Regarding Opportunities</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                </div>
              </div>

              {/* Row 2: 4-Step Problem Solving (7 cols) + Trajectory Milestones (5 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 4-Step Problem Solving Approach Card */}
                <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5" />
                        <span>Methodology</span>
                      </div>
                      <h4 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                        How I Approach Problems
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab('approach')}
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Deep Dive</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {aboutMeData.approach.map((step) => {
                      const StepIcon = iconMap[step.icon] || Search;
                      return (
                        <div
                          key={step.step}
                          className="p-4 rounded-2xl bg-zinc-50/70 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/5 space-y-2 hover:border-sky-500/30 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-md bg-sky-500/10">
                              {step.step}
                            </span>
                            <StepIcon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                          </div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white">
                            {step.title}
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                            {step.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Journey Snapshot Card */}
                <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Trajectory</span>
                      </div>
                      <button
                        onClick={() => setActiveTab('journey')}
                        className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full Timeline</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      My Journey at a Glance
                    </h4>
                  </div>

                  {/* Compact Timeline Rail */}
                  <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                    {aboutMeData.journey.map((item, idx) => (
                      <div key={idx} className="relative pl-8 space-y-1">
                        <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-white dark:bg-[#121217] border-2 border-sky-500 shadow-sm" />
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">
                            {item.period}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-medium">
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                          {item.title}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {item.institution}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500">
                    <span>1.5+ Years Enterprise Experience</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">Class of 2024</span>
                  </div>
                </div>

              </div>

              {/* Row 3: Interests & Curiosity (6 cols) + Professional Goals (6 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Interests & Craft */}
                <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Curiosity & Passion</span>
                      </div>
                      <h4 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                        What Drives My Curiosity
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab('interests')}
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {aboutMeData.interests.map((interest, i) => {
                      const IntIcon = iconMap[interest.icon] || Sparkles;
                      return (
                        <div
                          key={i}
                          className="p-3.5 rounded-2xl bg-zinc-50/70 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/5 space-y-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                              <IntIcon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                              {interest.category}
                            </span>
                          </div>
                          <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
                            {interest.title}
                          </div>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                            {interest.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Professional Goals & Value Delivered */}
                <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" />
                        <span>Professional Direction</span>
                      </div>
                      <h4 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                        Goals & Value on Day 1
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab('goals')}
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {aboutMeData.goals.map((goal, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-zinc-50/70 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/5 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
                            {goal.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                            {goal.pill}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                          {goal.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: MY JOURNEY (EXPANDED TIMELINE) */}
          {activeTab === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  My Journey: From IT Engineering to Enterprise Intelligence
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                  A continuous evolution of applying rigorous systems architecture to high-volume business operations and predictive analytics.
                </p>
              </div>

              <div className="space-y-8 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-indigo-500 before:to-purple-500">
                {aboutMeData.journey.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative pl-12 sm:pl-16"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-2.5 sm:left-4.5 top-5 w-4 h-4 rounded-full bg-white dark:bg-[#121217] border-4 border-sky-500 shadow-md" />

                    <div className="glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-4 shadow-sm hover:border-sky-500/30 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-full bg-sky-500/10">
                            {item.period}
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-medium">
                            {item.badge}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          {item.institution}
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                        {item.title}
                      </h4>

                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Return to Bento Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: PROBLEM-SOLVING APPROACH */}
          {activeTab === 'approach' && (
            <motion.div
              key="approach"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  My 4-Step Problem Solving Framework
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                  How I approach messy, fragmented datasets to engineer reliable, automated systems and clear metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutMeData.approach.map((step, idx) => {
                  const StepIcon = iconMap[step.icon] || Search;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-4 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-extrabold text-sky-600 dark:text-sky-400 px-3 py-1 rounded-xl bg-sky-500/10">
                            STEP {step.step}
                          </span>
                          <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-sky-600 dark:text-sky-400">
                            <StepIcon className="w-5 h-5" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                            {step.title}
                          </h4>
                          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                            {step.tagline}
                          </span>
                        </div>

                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <Check className="w-4 h-4" />
                        <span>Ensures zero discrepancy & executive trust</span>
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
                  <span>Return to Bento Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 4: INTERESTS & CRAFT */}
          {activeTab === 'interests' && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  Beyond Static Tables: Interests & Creative Craft
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                  What excites me outside day-to-day tickets—exploring applied AI, risk dynamics, and human-centric dashboard design.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutMeData.interests.map((interest, i) => {
                  const IntIcon = iconMap[interest.icon] || Sparkles;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
                          <IntIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400">
                          {interest.category}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                        {interest.title}
                      </h4>

                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {interest.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Return to Bento Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 5: GOALS & VALUE ON DAY 1 */}
          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  Professional Goals & What I Bring to Your Team
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                  Where I am heading and the immediate impact you can expect from Day 1.
                </p>
              </div>

              <div className="space-y-6">
                {aboutMeData.goals.map((goal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#121217]/70 space-y-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                        {goal.title}
                      </h4>
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                        {goal.pill}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {goal.desc}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {goal.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Day-1 Impact Callout */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/20 text-center space-y-4">
                <h4 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Ready to accelerate your data & operations intelligence?
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-lg mx-auto">
                  Serving 1 month notice at OIA Global. Open to fast-track hiring discussions for Data Analyst and Business Analyst positions.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#contact"
                    className="px-6 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs sm:text-sm font-semibold hover:bg-sky-600 dark:hover:bg-sky-400 dark:hover:text-zinc-950 transition-colors shadow-sm"
                  >
                    Start a Conversation
                  </a>
                  <a
                    href="#projects"
                    className="px-6 py-2.5 rounded-full glass-panel text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    Inspect Featured Projects
                  </a>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Return to Bento Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}

