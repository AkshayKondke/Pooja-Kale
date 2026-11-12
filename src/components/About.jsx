import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Sparkles,
  Target,
  ShieldCheck,
  GraduationCap,
  Building2,
  Compass,
  Search,
  Cpu,
  TrendingUp,
  Activity,
  Palette,
  ArrowRight,
  Clock,
  Briefcase,
  Layers,
  Quote,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { personalInfo, aboutMeData } from '../data/portfolioData';

export default function About() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedMilestones, setExpandedMilestones] = useState({ 0: false, 1: false, 2: false });

  const toggleMilestone = (index) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const tabs = [
    { id: 'all', label: 'Overview', icon: Layers },
    { id: 'approach', label: 'Problem-Solving', icon: Search },
    { id: 'journey', label: 'My Journey', icon: Compass },
    { id: 'interests', label: 'Interests & Goals', icon: Sparkles },
  ];

  const iconMap = {
    Search: Search,
    ShieldCheck: ShieldCheck,
    Cpu: Cpu,
    TrendingUp: TrendingUp,
    Sparkles: Sparkles,
    Activity: Activity,
    Palette: Palette,
  };

  const handleTabKeyDown = (e, currentIndex) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
    }
  };

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 scroll-mt-24 sm:scroll-mt-28 relative overflow-hidden">
      {/* Subtle Apple-style Ambient Background Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400 shadow-xs">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile & Mindset</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white leading-[1.12]">
            Engineering Systems <br className="hidden sm:inline" />
            Meets <span className="text-gradient-blue">Business Intelligence</span>.
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            From relational database foundations to enterprise ERP reconciliations at OIA Global—turning messy data into reliable systems and executive clarity.
          </p>

          {/* Apple-style Segmented Control / Tabs */}
          <div className="pt-2 flex justify-center">
            <div
              role="tablist"
              aria-label="About section categories"
              className="inline-flex p-1.5 rounded-2xl glass-panel bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 max-w-full overflow-x-auto no-scrollbar gap-1 shadow-xs"
            >
              {tabs.map((tab, idx) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`about-tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`about-panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                      isActive
                        ? 'text-zinc-950 dark:text-white font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeAboutTab"
                        className="absolute inset-0 bg-white dark:bg-[#1c1c22] rounded-xl shadow-xs border border-black/5 dark:border-white/10 -z-10"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-500' : 'text-zinc-400 dark:text-zinc-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content Panes */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW (BENTO PROFILE) */}
          {activeTab === 'all' && (
            <motion.div
              key="all"
              id="about-panel-all"
              role="tabpanel"
              aria-labelledby="about-tab-all"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Row 1: Narrative (8 cols) + Factsheet (4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                
                {/* Main Narrative Bento Card */}
                <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                      <span>Origin & Philosophy</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      {aboutMeData.headline}
                    </h3>

                    <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm sm:text-[15px] leading-relaxed">
                      <p>{aboutMeData.narrativeLead}</p>
                      <p>{aboutMeData.narrativeBody}</p>
                    </div>
                  </div>

                  {/* Philosophy Quote Callout */}
                  <div className="rounded-2xl p-4 sm:p-4.5 bg-sky-500/[0.04] border-l-3 border-sky-500 border-zinc-200/50 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 text-[11px] font-semibold uppercase tracking-wider font-mono">
                      <Quote className="w-3 h-3" />
                      <span>Guiding Principle</span>
                    </div>
                    <blockquote className="text-xs sm:text-sm italic font-medium text-zinc-800 dark:text-zinc-200">
                      {aboutMeData.philosophyQuote}
                    </blockquote>
                  </div>

                  {/* Core Capabilities Badges */}
                  <div className="pt-2 flex flex-wrap gap-2 border-t border-zinc-100 dark:border-white/5">
                    {["B.E. IT 2024 (7.74 Distinction)", "Workday ERP Reconciliation", "Star Schema BI Modeling", "Python / SQL Automation"].map((chip) => (
                      <span
                        key={chip}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Executive Factsheet Card */}
                <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 flex flex-col justify-between shadow-xs space-y-5">
                  
                  {/* Hiring Availability Status */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                        Availability
                      </span>
                    </div>
                    <div className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                      1 Month Notice Period
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Serving notice at OIA Global. Fast-track onboarding available.
                    </p>
                  </div>

                  {/* Quick Facts List */}
                  <div className="space-y-3">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      Key Facts
                    </div>
                    {aboutMeData.quickFacts.map((fact, i) => (
                      <div key={i} className="pb-2.5 border-b border-zinc-100 dark:border-white/5 last:border-0 last:pb-0">
                        <div className="text-[11px] text-zinc-400">{fact.label}</div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-white">{fact.value}</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{fact.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Connect CTA Button */}
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-sky-600 dark:hover:bg-sky-400 dark:hover:text-zinc-950 transition-colors shadow-xs"
                  >
                    <span>Connect Regarding Roles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                </div>
              </div>

              {/* Row 2: 4-Step Framework Preview (7 cols) + Journey Rail (5 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                
                {/* 4-Step Problem Solving Framework */}
                <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5 font-semibold">
                        <Search className="w-3.5 h-3.5" />
                        <span>Execution Model</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight mt-0.5">
                        Problem-Solving Framework
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab('approach')}
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 4 Step Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {aboutMeData.approach.map((step) => {
                      const StepIcon = iconMap[step.icon] || Search;
                      return (
                        <div
                          key={step.step}
                          className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/5 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 px-2.5 py-0.5 rounded-md bg-sky-500/10">
                              STEP {step.step}
                            </span>
                            <StepIcon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                          </div>
                          <div className="font-bold text-sm text-zinc-900 dark:text-white">
                            {step.title}
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>Deterministic Methodology</span>
                    <span className="text-sky-600 dark:text-sky-400 font-semibold">Zero-Discrepancy Target</span>
                  </div>
                </div>

                {/* Journey Snapshot */}
                <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 font-semibold">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Trajectory</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight mt-0.5">
                        My Journey
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab('journey')}
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Timeline</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 3 Compact Milestone Rows */}
                  <div className="space-y-3.5 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                    {aboutMeData.journey.map((item, idx) => (
                      <div key={idx} className="relative pl-7 space-y-0.5">
                        <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-white dark:bg-[#121217] border-2 border-sky-500 shadow-xs" />
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                            {item.period}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-medium">
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-zinc-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {item.institution}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500">
                    <span>1.5+ Yrs Enterprise Experience</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">Class of 2024</span>
                  </div>
                </div>

              </div>

              {/* Row 3: Interests & Goals Bento Preview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                
                {/* 3 Interests (6 cols) */}
                <div className="md:col-span-6 glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Interests & Curiosity</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('interests')}
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {aboutMeData.interests.map((item, i) => {
                      const IntIcon = iconMap[item.icon] || Sparkles;
                      return (
                        <div
                          key={i}
                          className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/5 flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                            <IntIcon className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5">
                            <h5 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                              {item.title}
                            </h5>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2 Strategic Goals (6 cols) */}
                <div className="md:col-span-6 glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-4 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Target className="w-3.5 h-3.5" />
                      <span>Goals & Direction</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('interests')}
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
                        className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/5 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                            {goal.title}
                          </h5>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
                            {goal.pill}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {goal.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500">
                    <span>1 Month Notice (Serving)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready on Day 1</span>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 2: PROBLEM-SOLVING (CLEAN 4 STEPS) */}
          {activeTab === 'approach' && (
            <motion.div
              key="approach"
              id="about-panel-approach"
              role="tabpanel"
              aria-labelledby="about-tab-approach"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  <Search className="w-3.5 h-3.5" />
                  <span>Disciplined Methodology</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  Four-Step Problem-Solving Framework
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                  A disciplined systems approach that deconstructs operational friction into verifiable data models and executive decision velocity.
                </p>
              </div>

              {/* 4 Cards (2x2 on Desktop, 1 Col on Mobile) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {aboutMeData.approach.map((step) => {
                  const StepIcon = iconMap[step.icon] || Search;
                  return (
                    <div
                      key={step.step}
                      className="glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-3.5 shadow-xs flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-xl bg-sky-500/10 border border-sky-500/20">
                            STEP {step.step}
                          </span>
                          <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-sky-600 dark:text-sky-400">
                            <StepIcon className="w-4 h-4" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                            {step.title}
                          </h4>
                          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 block mt-0.5 font-mono">
                            {step.tagline}
                          </span>
                        </div>

                        <p className="text-[14px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Return to Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MY JOURNEY (3 MILESTONES WITH EXPANDABLE DETAIL VIEW) */}
          {activeTab === 'journey' && (
            <motion.div
              key="journey"
              id="about-panel-journey"
              role="tabpanel"
              aria-labelledby="about-tab-journey"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Timeline</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  My Journey: Engineering to Enterprise Intelligence
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                  A deliberate progression from IT engineering foundations to enterprise data systems and predictive analytics.
                </p>
              </div>

              {/* 3 Prominent Milestones with Expandable Details */}
              <div className="space-y-6 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-indigo-500 before:to-purple-500">
                {aboutMeData.journey.map((item, idx) => {
                  const isExpanded = expandedMilestones[idx];
                  return (
                    <div key={idx} className="relative pl-11 sm:pl-16">
                      {/* Timeline Node */}
                      <div className="absolute left-2 sm:left-4 top-5 w-4 h-4 rounded-full bg-white dark:bg-[#121217] border-4 border-sky-500 shadow-xs" />

                      <div className="glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-3.5 shadow-xs hover:border-sky-500/30 transition-colors">
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

                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                            {item.title}
                          </h4>
                          {item.qualification && (
                            <span className="text-xs text-sky-600 dark:text-sky-400 font-medium block mt-0.5">
                              {item.qualification}
                            </span>
                          )}
                        </div>

                        <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Expandable Detail View */}
                        {item.details && (
                          <div className="pt-2">
                            <button
                              onClick={() => toggleMilestone(idx)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 cursor-pointer select-none transition-colors"
                              aria-expanded={isExpanded}
                            >
                              <span>{isExpanded ? 'Hide Details' : 'View Key Milestones'}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden pt-3"
                                >
                                  <ul className="space-y-2 p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/5 text-xs text-zinc-600 dark:text-zinc-300">
                                    {item.details.map((detail, dIdx) => (
                                      <li key={dIdx} className="flex items-start gap-2">
                                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Return to Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 4: INTERESTS & STRATEGIC GOALS */}
          {activeTab === 'interests' && (
            <motion.div
              key="interests"
              id="about-panel-interests"
              role="tabpanel"
              aria-labelledby="about-tab-interests"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curiosity & Impact</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                  Interests & Professional Direction
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                  What drives my continuous curiosity and what I bring to high-performing data teams.
                </p>
              </div>

              {/* 3 Interests Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 px-1">
                  Technical Interests
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aboutMeData.interests.map((interest, i) => {
                    const IntIcon = iconMap[interest.icon] || Sparkles;
                    return (
                      <div
                        key={i}
                        className="glass-panel rounded-3xl p-5 sm:p-6 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-3 shadow-xs flex flex-col justify-between"
                      >
                        <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                          <IntIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight mb-1">
                            {interest.title}
                          </h5>
                          <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {interest.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2 Strategic Goals Cards */}
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 px-1">
                  Professional Goals & Value
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {aboutMeData.goals.map((goal, idx) => (
                    <div
                      key={idx}
                      className="glass-panel rounded-3xl p-6 sm:p-7 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 space-y-4 shadow-xs flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                            {goal.title}
                          </h5>
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                            {goal.pill}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {goal.desc}
                        </p>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-zinc-100 dark:border-white/5">
                        {goal.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready to Connect Callout */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h5 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
                    Available on 1 Month Notice
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Fast-track onboarding for Data Analyst and Business Analyst opportunities.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs sm:text-sm font-semibold hover:bg-sky-600 dark:hover:bg-sky-400 dark:hover:text-zinc-950 transition-colors shadow-xs whitespace-nowrap text-center"
                >
                  Start a Conversation
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Return to Overview</span>
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

