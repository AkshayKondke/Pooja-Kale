import React, { useState } from 'react';
import { Cpu, CheckCircle2, BarChart3, Database, Code, Landmark, Sparkles } from 'lucide-react';
import { skillsCategories } from '../data/portfolioData';

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('all');

  const categoryIcons = {
    bi: BarChart3,
    sql: Database,
    python: Code,
    erp: Landmark,
    ai: Sparkles,
  };

  const getPercentage = (level) => {
    switch (level) {
      case 'Expert': return 95;
      case 'Advanced': return 85;
      case 'Intermediate': return 72;
      default: return 75;
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
            Core Skills & Domain Expertise
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A balanced analytics toolkit spanning executive BI modeling, relational databases, programmatic data wrangling, and enterprise ERP systems.
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

        {/* Apple Bento Grid of Skill Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                      {category.skills.length} competencies
                    </span>
                  </div>

                  {/* Skills List with Progress Meters */}
                  <div className="space-y-4">
                    {category.skills.map((skill, idx) => {
                      const pct = getPercentage(skill.level);
                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                              {skill.name}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                              skill.level === 'Expert'
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                                : skill.level === 'Advanced'
                                ? 'bg-sky-500/10 text-sky-700 dark:text-sky-400'
                                : 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
                            }`}>
                              {skill.level}
                            </span>
                          </div>

                          {/* Skill bar */}
                          <div className="w-full bg-zinc-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                            {skill.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Verified in Production</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
