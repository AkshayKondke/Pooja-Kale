import React, { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import {
  TrendingUp, Clock, CheckCircle2, SlidersHorizontal,
  Calculator, Zap, DollarSign, RotateCcw, Filter, Calendar,
  Globe, ShieldAlert, Sparkles, FileSpreadsheet, Check
} from 'lucide-react';
import { interactiveChartData } from '../data/portfolioData';

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState('roi');
  
  // Interactive Filters
  const [dateRange, setDateRange] = useState('30d'); // '30d' | 'q2' | 'ytd'
  const [region, setRegion] = useState('all'); // 'all' | 'na' | 'emea' | 'apac'
  
  // Interactive ROI Calculator State
  const [monthlyExceptions, setMonthlyExceptions] = useState(1200);
  const [hourlyRate, setHourlyRate] = useState(25); // $25/hr standard analyst cost

  // Reset Sandbox function
  const handleReset = () => {
    setActiveTab('roi');
    setDateRange('30d');
    setRegion('all');
    setMonthlyExceptions(1200);
    setHourlyRate(25);
  };

  // Dynamic Multipliers based on date range & region
  const dataMultiplier = useMemo(() => {
    let rangeFactor = 1;
    if (dateRange === 'q2') rangeFactor = 1.35;
    if (dateRange === 'ytd') rangeFactor = 2.8;

    let regionFactor = 1;
    if (region === 'na') regionFactor = 0.45;
    if (region === 'emea') regionFactor = 0.35;
    if (region === 'apac') regionFactor = 0.20;

    return rangeFactor * (region === 'all' ? 1 : regionFactor);
  }, [dateRange, region]);

  // Dynamically scaled collections data
  const dynamicCollectionsData = useMemo(() => {
    return interactiveChartData.collections.map((item) => ({
      ...item,
      target: item.target,
      achieved: Math.min(99.4, Math.round((item.achieved + (region === 'apac' ? 1.2 : region === 'emea' ? -0.8 : 0)) * 10) / 10),
      delinquencyRate: Math.max(0.9, Math.round((item.delinquencyRate + (region === 'na' ? -0.3 : 0.2)) * 10) / 10),
    }));
  }, [region]);

  // Dynamically scaled discrepancies data
  const dynamicDiscrepanciesData = useMemo(() => {
    return interactiveChartData.discrepancies.map((item) => ({
      ...item,
      manualHours: Math.round(item.manualHours * (dateRange === '30d' ? 1 : dateRange === 'q2' ? 1.4 : 2.5)),
      automatedHours: Math.round(item.automatedHours * (dateRange === '30d' ? 1 : dateRange === 'q2' ? 1.4 : 2.5)),
    }));
  }, [dateRange]);

  // ROI Calculations:
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
    { id: 'discrepancies', label: 'Financial Reconciliation', icon: Clock },
    { id: 'sla', label: 'Operational SLA & Backlog', icon: CheckCircle2 },
  ];

  // Sample Simulated Variance Log entries
  const simulatedVarianceLogs = [
    { id: "TX-90214", vendor: "Maersk Logistics Global", erpAmt: "$14,250.00", bankAmt: "$14,250.00", currency: "USD", variance: "$0.00", status: "AUTO_MATCHED", badge: "Exact Match" },
    { id: "TX-90215", vendor: "Hapag-Lloyd AG (Rotterdam)", erpAmt: "€8,410.20", bankAmt: "€8,410.18", currency: "EUR", variance: "-$0.02", status: "TOLERANCE_CLEARED", badge: "Within ±$0.02 Rule" },
    { id: "TX-90216", vendor: "DHL Global Forwarding", erpAmt: "$6,120.50", bankAmt: "$6,120.50", currency: "USD", variance: "$0.00", status: "AUTO_MATCHED", badge: "Exact Match" },
    { id: "TX-90217", vendor: "Kuehne+Nagel Intermodal", erpAmt: "$22,890.00", bankAmt: "$22,890.00", currency: "USD", variance: "$0.00", status: "AUTO_MATCHED", badge: "Exact Match" },
  ];

  return (
    <section id="live-dashboard" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Data Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Operational Analytics & KPI Simulator
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Interact with simulated operational data models. Adjust date horizons, filter by operating regions, or calculate capacity ROI.
          </p>
        </div>

        {/* Sandbox Demarcation Alert Banner */}
        <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-sky-500/5 dark:bg-sky-500/[0.04] border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              Interactive Sandbox Demonstration
            </span>
            <span className="hidden md:inline text-zinc-400">•</span>
            <span className="hidden md:inline">
              Simulated environment for technical evaluation. Verified candidate metrics are detailed in Experience & Projects.
            </span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 font-medium transition-colors w-fit shrink-0"
            title="Reset sandbox filters and simulator to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-500" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Dashboard Shell Window */}
        <div className="glass-panel rounded-3xl p-5 sm:p-8 border-zinc-200/80 dark:border-white/10 shadow-xl relative overflow-hidden bg-white/95 dark:bg-[#101014]/90">
          
          {/* Top Bar: macOS Controls + Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-zinc-500 ml-2 hidden sm:inline">
                Operations_KPI_Engine.pbix (Interactive Sandbox)
              </span>
            </div>

            {/* View Tabs */}
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

          {/* Interactive Filter Toolbar (Date Range & Region) */}
          <div className="pt-4 pb-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-zinc-100 dark:border-white/5">
            
            {/* Date Range Selector */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-500 font-mono text-[11px] mr-1">Time Horizon:</span>
              <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-white/5 p-0.5 border border-zinc-200 dark:border-white/5">
                {[
                  { id: '30d', label: 'Last 30 Days' },
                  { id: 'q2', label: 'Q2 2024' },
                  { id: 'ytd', label: 'Full Year YTD' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDateRange(opt.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      dateRange === opt.id
                        ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm font-semibold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Selector */}
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-500 font-mono text-[11px] mr-1">Subsidiary:</span>
              <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-white/5 p-0.5 border border-zinc-200 dark:border-white/5">
                {[
                  { id: 'all', label: 'Global (All)' },
                  { id: 'na', label: 'North America' },
                  { id: 'emea', label: 'EMEA' },
                  { id: 'apac', label: 'APAC' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      region === r.id
                        ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm font-semibold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
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
                      Drag the sliders to adjust monthly transactional discrepancies & hourly baseline cost.
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-zinc-500">Benchmark Model</span>
                    <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                      Workday ERP + Python Discrepancy Engine
                    </div>
                  </div>
                </div>

                {/* Range Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  
                  {/* Slider 1: Discrepancy Volume */}
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
                      <span>200 (Low Vol)</span>
                      <span>2,000 (Mid-Enterprise)</span>
                      <span>4,000 (High Volume Multi-Currency)</span>
                    </div>
                  </div>

                  {/* Slider 2: Hourly Rate Baseline */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-600 dark:text-zinc-400">Analyst Operational Cost:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        ${hourlyRate} / hr
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>$15/hr (Junior Support)</span>
                      <span>$35/hr (Senior Analyst)</span>
                      <span>$60/hr (Specialist Auditor)</span>
                    </div>
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
                    ↓ {efficiencyGain}% reduction in manual auditing
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
                  <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                    {automatedHours}h vs {manualHours}h
                  </div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Automated pipeline vs legacy spreadsheet lookup
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
                  <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">94.2%</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    ↑ +12.0% over monitored period
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Delinquency Rate (DPD 30+)</span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">1.8%</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    ↓ Slashed from 4.2% baseline
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Portfolio at Risk (PAR)</span>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">Controlled</div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Zero high-risk uncollateralized spillover
                  </span>
                </div>
              </div>

              <div className="h-[320px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dynamicCollectionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                      formatter={(val, name) => [`${val}%`, name === 'achieved' ? 'Achieved Recovery' : name === 'target' ? 'Target Benchmark' : 'Delinquency Rate']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Area type="monotone" dataKey="target" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" fill="url(#targetGradient)" name="Target Benchmark (%)" />
                    <Area type="monotone" dataKey="achieved" stroke="#0284c7" strokeWidth={3} fill="url(#achievedGradient)" name="Achieved Recovery (%)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Tab 2: Discrepancy Reconciliation Hours Saved & Variance Logs */}
          {activeTab === 'discrepancies' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">First-Pass Auto Match</span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">98.2%</div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">Fuzzy tolerance matching active</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Weekly Hours Saved</span>
                  <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">36 hrs / wk</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">Manual work reduced by 60%</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Audit Trail Readiness</span>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">100%</div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">Full sub-ledger variance logs</span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[280px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dynamicDiscrepanciesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                      formatter={(val, name) => [`${val} hrs`, name === 'manualHours' ? 'Legacy Manual Hours' : 'Automated Python/SQL Hours']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="manualHours" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Manual Work (Legacy)" />
                    <Bar dataKey="automatedHours" fill="#0284c7" radius={[6, 6, 0, 0]} name="Automated Pipeline (Pooja)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Simulated Transaction Variance Audit Log Table */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-sky-500" />
                    <span>Simulated Sub-Ledger Clearance Log (Live Sample Feed)</span>
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400">Zero Multi-Currency Variance</span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 text-xs">
                  <div className="grid grid-cols-5 bg-zinc-100 dark:bg-white/[0.04] p-2.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-white/5">
                    <div>Reference ID</div>
                    <div className="col-span-2">Vendor / Carrier</div>
                    <div>ERP vs Bank Amt</div>
                    <div className="text-right">Reconciliation Status</div>
                  </div>
                  {simulatedVarianceLogs.map((log) => (
                    <div
                      key={log.id}
                      className="grid grid-cols-5 p-2.5 border-b border-zinc-100 dark:border-white/5 last:border-b-0 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] items-center hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
                    >
                      <div className="font-semibold text-zinc-900 dark:text-white">{log.id}</div>
                      <div className="col-span-2 truncate">{log.vendor}</div>
                      <div>{log.erpAmt}</div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                          <Check className="w-3 h-3" />
                          <span>{log.badge}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 3: SLA Breakdown */}
          {activeTab === 'sla' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="h-[280px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={interactiveChartData.slaBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
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

                <div className="space-y-3.5">
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
