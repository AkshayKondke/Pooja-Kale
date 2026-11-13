import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, BarChart3, Download, MapPin, Database,
  Layers, TrendingUp, ShieldCheck
} from 'lucide-react';
import { keyMetrics } from '../data/portfolioData';
import AnimatedCounter from './AnimatedCounter';

export default function Hero() {
  const specializations = [
    {
      phrase: "Workday ERP Integration",
      label: "Workday ERP",
      icon: Database,
      highlight: "Financial Operations & Sub-Ledger Balancing",
    },
    {
      phrase: "CargoWise Data Pipelines",
      label: "CargoWise",
      icon: Layers,
      highlight: "Customs & Freight AP/AR Reconciliation",
    },
    {
      phrase: "Data & Business Analytics",
      label: "Data Analyst",
      icon: TrendingUp,
      highlight: "Executive Decision Systems & Operational KPIs",
    },
    {
      phrase: "Automated Reconciliation",
      label: "Financial Systems",
      icon: ShieldCheck,
      highlight: "60% Discrepancy Verification Overhead Saved",
    },
    {
      phrase: "Executive Power BI Models",
      label: "Power BI & DAX",
      icon: BarChart3,
      highlight: "Dimensional Star Schema & Time Intelligence",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(65);

  // Typewriter effect logic
  useEffect(() => {
    const currentPhrase = specializations[currentIndex].phrase;

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
          setTypingSpeed(55 + Math.random() * 20);
        } else {
          setTypingSpeed(2400); // Generous pause after phrase completes
          setIsDeleting(true);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
          setTypingSpeed(28); // Snappy delete
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % specializations.length);
          setTypingSpeed(450); // Pause before next phrase
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentIndex, typingSpeed, specializations]);

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
    <section id="hero" className="relative pt-[116px] sm:pt-[130px] md:pt-[140px] pb-12 sm:pb-16 scroll-mt-28 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center flex flex-col items-center"
        >
          
          {/* 1. Avatar Monogram: Apple Minimal clean badge */}
          <motion.div variants={itemVariants} className="relative group select-none">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0071E3] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-none">
              <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl tracking-tight relative z-10">
                PK
              </span>
            </div>
            {/* Emerald Availability Status Dot */}
            <div className="absolute -bottom-0.5 -right-0.5 p-0.5 sm:p-1 bg-white dark:bg-black rounded-full z-20">
              <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-500 border-2 border-white dark:border-black" />
              </span>
            </div>
          </motion.div>

          {/* 2. Role & Location Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-3.5 inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F7] dark:bg-[#161617] text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E7EB] dark:border-[#2C2C2E] select-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
            <span className="font-semibold">Data & Business Analyst</span>
            <span className="text-[#86868B]">•</span>
            <span className="flex items-center gap-1 text-[#6E6E73] dark:text-[#86868B]">
              <MapPin className="w-3 h-3 text-[#0071E3]" />
              Pune, India
            </span>
          </motion.div>

          {/* 3. Main Display Headline: Spacious, non-overlapping Apple typography */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 sm:mt-7 text-[clamp(2.1rem,5.4vw,3.35rem)] font-bold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.24] text-center"
          >
            Architecting
            <span className="block my-2 sm:my-2.5 text-[#0071E3] dark:text-[#2997FF] min-h-[1.28em]">
              <span>{displayedText}</span>
              <span className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.82em] ml-1.5 bg-[#0071E3] dark:bg-[#2997FF] rounded-full animate-cursor-blink align-baseline" />
            </span>
            for Enterprise Scale.
          </motion.h1>

          {/* 4. Sub-headline: Generous line-height and breathing room */}
          <motion.p
            variants={itemVariants}
            className="mt-6 sm:mt-7 text-[16px] sm:text-[18px] text-[#6E6E73] dark:text-[#86868B] max-w-2xl mx-auto font-normal leading-[1.6]"
          >
            I specialize in <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">Power BI, SQL, Python, and ERP systems</strong> (Workday & CargoWise) to eliminate reporting bottlenecks, track operational KPIs, and translate high-volume transactional records into executive decisions.
          </motion.p>

          {/* 5. Primary Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <a
              href="#projects"
              className="apple-btn-primary"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#live-dashboard"
              className="apple-btn-secondary"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Interactive Simulator</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-tertiary sm:ml-2 justify-center py-2 sm:py-0"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </motion.div>

          {/* 6. Micro Stack Technology Chips */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-[#6E6E73] dark:text-[#86868B] font-mono font-medium"
          >
            <span className="px-3 py-1.5 rounded-lg bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7]">Power BI (Advanced DAX)</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7]">SQL (CTEs & Window Functions)</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7]">Python (Pandas)</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7]">PySpark & Databricks</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7]">Workday ERP</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7]">Claude AI Workflows</span>
          </motion.div>

        </motion.div>

        {/* 7. Bento Grid Key Metrics Cards: Apple Minimal flat cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto w-full items-stretch"
        >
          {keyMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="apple-card apple-card-hover text-left flex flex-col justify-between h-full"
            >
              <div>
                {/* Metric Number */}
                <div className="min-h-[36px] sm:min-h-[40px] flex items-baseline mb-2">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums text-[#1D1D1F] dark:text-[#F5F5F7]">
                    <AnimatedCounter value={metric.value} delay={0.25 + idx * 0.08} />
                  </span>
                </div>
                {/* Metric Heading */}
                <h3 className="text-xs sm:text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-snug">
                  {metric.label}
                </h3>
              </div>
              {/* Metric Description */}
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] mt-2 leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
