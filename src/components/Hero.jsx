import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Download, MapPin } from 'lucide-react';
import { personalInfo, keyMetrics } from '../data/portfolioData';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className="relative pt-[124px] sm:pt-[136px] md:pt-[144px] pb-8 sm:pb-10 scroll-mt-28 overflow-hidden">
      
      {/* Background Ambient Spotlight Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center flex flex-col items-center"
        >
          
          {/* 1. Avatar Monogram: 64px mobile to 80px desktop, pure white initials, blue-purple gradient */}
          <motion.div variants={itemVariants} className="relative group select-none">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 shadow-xl shadow-sky-500/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight relative z-10">
                PK
              </span>
            </div>
            {/* Emerald Availability Status Dot */}
            <div className="absolute -bottom-0.5 -right-0.5 p-0.5 sm:p-1 bg-white dark:bg-[#121217] rounded-full shadow-md z-20">
              <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-500 border-2 border-white dark:border-[#121217]" />
              </span>
            </div>
          </motion.div>

          {/* 2. Role & Location Pill Badge: 10–12px below avatar */}
          <motion.div
            variants={itemVariants}
            className="mt-[11px] inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full glass-panel text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10 shadow-sm cursor-default select-none"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Data & Business Analyst</span>
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-3 h-3 text-sky-500" />
              Pune, India
            </span>
          </motion.div>

          {/* 3. Main Display Headline: Fluid responsive clamp, Apple line-height */}
          <motion.h1
            variants={itemVariants}
            className="mt-[20px] text-[clamp(2.15rem,6.8vw,4.125rem)] font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white leading-[1.08] sm:leading-[1.03]"
          >
            Architecting <br className="hidden sm:inline" />
            <span className="text-gradient-blue">Data Intelligence</span> <br className="hidden sm:inline" />
            for Enterprise Scale.
          </motion.h1>

          {/* 4. Sub-headline: 16–20px below headline; max-w-2xl; comfortable line-height */}
          <motion.p
            variants={itemVariants}
            className="mt-[18px] text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto font-normal leading-[1.6]"
          >
            I specialize in <strong className="text-zinc-900 dark:text-white font-semibold">Power BI, SQL, Python, and ERP systems</strong> (Workday & CargoWise) to eliminate reporting bottlenecks, track operational KPIs, and translate high-volume transactional records into executive decisions.
          </motion.p>

          {/* 5. Primary Action Buttons: Stacked full-width touch buttons on mobile, inline on desktop */}
          <motion.div
            variants={itemVariants}
            className="mt-[22px] flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <a
              href="#projects"
              className="h-12 px-6 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-sky-600 dark:hover:bg-sky-400 dark:hover:text-zinc-950 active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center gap-2 select-none"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#live-dashboard"
              className="h-12 px-6 rounded-full glass-panel text-zinc-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm hover:border-sky-500/40 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 select-none"
            >
              <BarChart3 className="w-4 h-4 text-sky-500" />
              <span>Interactive BI Demo</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-5 rounded-full glass-panel text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium text-xs sm:text-sm active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 select-none"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </motion.div>

          {/* 6. Micro Stack Technology Chips: balanced wrapping & compact mobile padding */}
          <motion.div
            variants={itemVariants}
            className="mt-[26px] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 font-mono font-medium"
          >
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5">Power BI (Advanced DAX)</span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5">SQL (CTEs & Window Functions)</span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5">Python (Pandas)</span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5">PySpark & Databricks</span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5">Workday ERP</span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/5">Claude AI Workflows</span>
          </motion.div>

        </motion.div>

        {/* 7. Bento Grid Key Metrics Cards: equal-height, aligned numbers, balanced spacing & hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto w-full items-stretch"
        >
          {keyMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-left relative overflow-hidden group shadow-sm bg-white dark:bg-[#121217]/70 border border-zinc-200/80 dark:border-white/10 flex flex-col justify-between h-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-500/10 hover:border-sky-500/30"
            >
              <div>
                {/* Metric Number: tabular-nums with fixed baseline container */}
                <div className="min-h-[36px] sm:min-h-[40px] flex items-baseline mb-2">
                  <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </span>
                </div>
                {/* Metric Heading */}
                <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
                  {metric.label}
                </h3>
              </div>
              {/* Metric Description */}
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
