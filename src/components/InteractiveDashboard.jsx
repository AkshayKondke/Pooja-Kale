import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import {
  TrendingUp, Clock, CheckCircle2, SlidersHorizontal,
  Calculator, Zap, DollarSign, ArrowRight, Sparkles
} from 'lucide-react';
import { interactiveChartData } from '../data/portfolioData';

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState('roi');
  
  // Interactive ROI Calculator State
  const [monthlyExceptions, setMonthlyExceptions] = useState(1200);
  const [hourlyRate, setHourlyRate] = useState(25); // $25/hr standard analyst cost

  // Calculations:
  // Manual: 25 minutes per exception (0.416 hours)
  // Automated Python/SQL: 1.5 minutes per exception (0.025 hours)
  const manualHours = Math.round((monthlyExceptions * 25) / 60);
  const automatedHours = Math.round((monthlyExceptions * 1.5) / 60);
  const hoursSaved = Math.max(0, manualHours - automatedHours);
  const monthlyCostSaved = hoursSaved * hourlyRate;
  const annualCostSaved = monthlyCostSaved * 12;
  const efficiencyGain = Math.round((hoursSaved / manualHours) * 100);

  const tabs = [
    { id: 'roi', label: 'ROI & Scenario Simulator', icon: Calculator },
    { id: 'collections', label: 'Collections & DPD Delinquency', icon: TrendingUp },
    { id: 'discrepancies', label: 'Reconciliation Efficiency', icon: Clock },
    { id: 'sla', label: 'Settlement SLA Breakdown', icon: CheckCircle2 },
  ];

  return (
    <section id="live-dashboard" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Data Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Live Analytics & KPI Simulator
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Test simulated operational models and adjust scenario sliders to calculate tangible time and cost savings.
          </p>
        </div>

        {/* Dashboard Shell */}
        <div className="glass-panel rounded-3xl p-5 sm:p-8 border-zinc-200/80 dark:border-white/10 shadow-xl relative overflow-hidden bg-white/95 dark:bg-[#101014]/90">
          
          {/* Top Bar / Navigation Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-zinc-500 ml-2 hidden sm:inline">
                Executive_KPI_Engine.pbix (Live Web Preview)
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-zinc-100 dark:bg-black/40 p-1.5 rounded-2xl border border-zinc-200 dark:border-white/5">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab 0: Interactive ROI & Scenario Simulator */}
          {activeTab === 'roi' && (
            <div className="pt-6 space-y-6">
              
              {/* Slider Controls Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-sky-500" />
                      <span>Reconciliation Automation ROI Calculator</span>
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Drag the slider to adjust monthly transactional discrepancies & observe dynamic efficiency gains.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-500">Benchmark Model</span>
                    <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                      Workday ERP + Python Matcher
                    </div>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-600 dark:text-zinc-400">Monthly Discrepant Records:</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400 text-sm bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                      {monthlyExceptions.toLocaleString()} transactions / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="4000"
                    step="100"
                    value={monthlyExceptions}
                    onChange={(e) => setMonthlyExceptions(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>200 (Small Ledger)</span>
                    <span>2,000 (Mid-Enterprise)</span>
                    <span>4,000 (High Volume Multi-Currency)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic KPI Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Monthly Hours Saved */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Monthly Time Saved
                  </span>
                  <div className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                    {hoursSaved} hrs
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    ↓ {efficiencyGain}% reduction in manual hours
                  </span>
                </div>

                {/* Metric 2: Annual Cost Efficiency */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Annual Value Generated
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    ${annualCostSaved.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Calculated at ${hourlyRate}/hr operational baseline
                  </span>
                </div>

                {/* Metric 3: Manual vs Automated Effort */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Process Velocity
                  </span>
                  <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                    {automatedHours} hrs vs {manualHours} hrs
                  </div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Automated run vs legacy manual checking
                  </span>
                </div>

                {/* Metric 4: Turnaround Time (TAT) */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Cycle Turnaround (TAT)
                  </span>
                  <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
                    2.5 hrs
                  </div>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 block">
                    Accelerated from 48h SLA baseline
                  </span>
                </div>

              </div>

              {/* Side-by-side Comparative Visual Card */}
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                <div className="flex items-center justify-between mb-3 text-xs font-semibold text-zinc-900 dark:text-white">
                  <span>Capacity Allocation Breakdown</span>
                  <span className="font-mono text-zinc-500">Resource Optimization</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">Legacy Manual Auditing:</span>
                      <span className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold">{manualHours} hrs / month</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-400 h-full w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sky-600 dark:text-sky-400 font-medium">Pooja's Automated Pipeline:</span>
                      <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{automatedHours} hrs / month</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full"
                        style={{ width: `${Math.max(4, Math.round((automatedHours / manualHours) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 1: Collections Health & DPD */}
          {activeTab === 'collections' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Average Collection Rate</span>
                  <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">93.5%</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    ↑ +12.0% over 6 months
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Current Delinquency Rate (DPD 30+)</span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">1.8%</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    ↓ Down from 4.2% baseline
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">On-Time Repayment Status</span>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">Optimal</div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Zero high-risk portfolio leakage
                  </span>
                </div>
              </div>

              <div className="h-[320px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={interactiveChartData.collections} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="achievedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-zinc-800" opacity={0.7} />
                    <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} />
                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} domain={[70, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e4e4e7',
                        borderRadius: '12px',
                        fontSize: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                      }}
                      className="dark:!bg-zinc-900 dark:!border-zinc-800 dark:!text-white"
                      formatter={(val, name) => [`${val}%`, name === 'achieved' ? 'Achieved Rate' : name === 'target' ? 'Target Rate' : 'Delinquency Rate']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Area type="monotone" dataKey="target" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" fill="url(#targetGradient)" name="Target Rate (%)" />
                    <Area type="monotone" dataKey="achieved" stroke="#0284c7" strokeWidth={3} fill="url(#achievedGradient)" name="Achieved Recovery (%)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Tab 2: Discrepancy Reconciliation Hours Saved */}
          {activeTab === 'discrepancies' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Weekly Hours Saved</span>
                  <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">36 hrs / wk</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">Manual work reduced by 60%</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">First-Pass Auto Match</span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">98.2%</div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">Fuzzy tolerance matching active</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Audit Trail Readiness</span>
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">100%</div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">Full sub-ledger reconciliation logs</span>
                </div>
              </div>

              <div className="h-[320px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={interactiveChartData.discrepancies} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-zinc-800" opacity={0.7} />
                    <XAxis dataKey="period" stroke="#71717a" fontSize={12} tickLine={false} />
                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e4e4e7',
                        borderRadius: '12px',
                        fontSize: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                      }}
                      className="dark:!bg-zinc-900 dark:!border-zinc-800 dark:!text-white"
                      formatter={(val, name) => [`${val} hrs`, name === 'manualHours' ? 'Manual Reporting Hours' : 'Automated Pipeline Hours']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="manualHours" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Manual Work (Legacy)" />
                    <Bar dataKey="automatedHours" fill="#0284c7" radius={[6, 6, 0, 0]} name="Automated Python/SQL Pipeline" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Tab 3: SLA Breakdown */}
          {activeTab === 'sla' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="h-[300px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={interactiveChartData.slaBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={105}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {interactiveChartData.slaBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="#ffffff" className="dark:stroke-zinc-900" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderColor: '#e4e4e7',
                          borderRadius: '12px',
                          fontSize: '12px',
                          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                        }}
                        className="dark:!bg-zinc-900 dark:!border-zinc-800 dark:!text-white"
                        formatter={(val) => [`${val}%`, 'Proportion']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-sky-500" />
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Same-Day Settlement (68%)</h4>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Directly cleared through automated Workday & CargoWise reconciliation workflows.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-500" />
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">24-48h Operational Resolution (24%)</h4>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Standard queue resolution driven by dynamic Power BI backlog scorecards.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Exception Auditing (8%)</h4>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Multi-currency exchange rate variances routed to specialist finance managers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
