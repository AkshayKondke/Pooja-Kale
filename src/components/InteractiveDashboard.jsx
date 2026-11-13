import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line
} from 'recharts';
import {
  TrendingUp, Clock, CheckCircle2, SlidersHorizontal,
  Calculator, Zap, DollarSign, RotateCcw, Filter, Calendar,
  Globe, ShieldAlert, Sparkles, FileSpreadsheet, Check,
  Download, Printer, ArrowRight, Layers, Building2,
  AlertCircle, Info, X, ChevronDown, ChevronUp, FileText, CheckCircle
} from 'lucide-react';
import { interactiveChartData } from '../data/portfolioData';

// Core deterministic calculation model
export function computeROIModel(records, hourlyRate, manualMins, autoMins) {
  const safeRecords = Math.max(10, Math.min(10000, Number(records) || 0));
  const safeRate = Math.max(10, Math.min(200, Number(hourlyRate) || 0));
  const safeManualMins = Math.max(1, Math.min(120, Number(manualMins) || 1));
  const safeAutoMins = Math.max(0.1, Math.min(30, Number(autoMins) || 0.1));

  const manualHours = (safeRecords * safeManualMins) / 60;
  const automatedHours = (safeRecords * safeAutoMins) / 60;
  const monthlyHoursSaved = Math.max(0, manualHours - automatedHours);
  const annualHoursSaved = monthlyHoursSaved * 12;

  const manualMonthlyCost = manualHours * safeRate;
  const automatedMonthlyCost = automatedHours * safeRate;
  const monthlySavings = Math.max(0, manualMonthlyCost - automatedMonthlyCost);
  const annualCostSaved = monthlySavings * 12;

  const efficiencyGain = manualHours > 0 ? ((manualHours - automatedHours) / manualHours) * 100 : 0;
  const fteCapacityReleased = monthlyHoursSaved / 160; // 1 FTE = 160 hrs/month

  const tatManualHours = 48; // Baseline SLA legacy turnaround
  const tatAutomatedHours = Math.max(0.4, Math.round((safeAutoMins / safeManualMins) * 48 * 10) / 10);
  const tatReduction = ((tatManualHours - tatAutomatedHours) / tatManualHours) * 100;

  return {
    records: safeRecords,
    hourlyRate: safeRate,
    manualMinutes: safeManualMins,
    automatedMinutes: safeAutoMins,
    manualHours: Math.round(manualHours),
    automatedHours: Math.round(automatedHours * 10) / 10,
    monthlyHoursSaved: Math.round(monthlyHoursSaved),
    annualHoursSaved: Math.round(annualHoursSaved),
    manualMonthlyCost: Math.round(manualMonthlyCost),
    automatedMonthlyCost: Math.round(automatedMonthlyCost),
    monthlySavings: Math.round(monthlySavings),
    annualCostSaved: Math.round(annualCostSaved),
    efficiencyGain: Math.round(efficiencyGain * 10) / 10,
    fteCapacityReleased: Math.round(fteCapacityReleased * 10) / 10,
    tatManualHours,
    tatAutomatedHours,
    tatReduction: Math.round(tatReduction * 10) / 10,
  };
}

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState('roi');
  
  // Interactive Filters
  const [dateRange, setDateRange] = useState('30d'); // '30d' | 'q2' | 'ytd'
  const [region, setRegion] = useState('all'); // 'all' | 'na' | 'emea' | 'apac'
  const [department, setDepartment] = useState('all'); // 'all' | 'ap' | 'freight' | 'gl'
  
  // Scenario Preset Selection
  const [scenario, setScenario] = useState('baseline'); // 'baseline' | 'best' | 'worst' | 'custom'

  // Interactive ROI Calculator State (4 Dynamic Inputs)
  const [monthlyExceptions, setMonthlyExceptions] = useState(1200);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [manualMinutes, setManualMinutes] = useState(25);
  const [automatedMinutes, setAutomatedMinutes] = useState(1.5);

  // UI state for modals / accordions
  const [showExecutiveModal, setShowExecutiveModal] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Pre-defined Scenario Configurations
  const scenarioPresets = {
    baseline: {
      name: 'Baseline Operational Scenario',
      records: 1200,
      hourlyRate: 25,
      manualMinutes: 25,
      automatedMinutes: 1.5,
      description: 'Standard mid-market freight & AP reconciliation queue running legacy spreadsheet VLOOKUPs.',
    },
    best: {
      name: 'Best-Case Enterprise Scale',
      records: 2800,
      hourlyRate: 35,
      manualMinutes: 30,
      automatedMinutes: 1.0,
      description: 'High-volume multi-currency logistics operations with specialized senior financial auditors.',
    },
    worst: {
      name: 'Conservative / Small Queue',
      records: 500,
      hourlyRate: 20,
      manualMinutes: 15,
      automatedMinutes: 3.0,
      description: 'Low transaction volume with simpler single-currency local ledger accounts.',
    },
  };

  // Handler to apply a scenario preset
  const applyScenario = (scenKey) => {
    if (scenarioPresets[scenKey]) {
      const p = scenarioPresets[scenKey];
      setMonthlyExceptions(p.records);
      setHourlyRate(p.hourlyRate);
      setManualMinutes(p.manualMinutes);
      setAutomatedMinutes(p.automatedMinutes);
      setScenario(scenKey);
    }
  };

  // Handler for custom inputs
  const handleInputChange = (setter, value, min, max) => {
    const num = Math.max(min, Math.min(max, Number(value) || min));
    setter(num);
    setScenario('custom');
  };

  // Reset Sandbox function
  const handleReset = () => {
    setActiveTab('roi');
    setDateRange('30d');
    setRegion('all');
    setDepartment('all');
    applyScenario('baseline');
  };

  // Compute Active Single-Source ROI Model
  const roi = useMemo(() => {
    return computeROIModel(monthlyExceptions, hourlyRate, manualMinutes, automatedMinutes);
  }, [monthlyExceptions, hourlyRate, manualMinutes, automatedMinutes]);

  // Compute Comparative Scenario Matrix
  const scenarioMatrix = useMemo(() => {
    return {
      baseline: computeROIModel(1200, 25, 25, 1.5),
      best: computeROIModel(2800, 35, 30, 1.0),
      worst: computeROIModel(500, 20, 15, 3.0),
      current: roi,
    };
  }, [roi]);

  // Deterministic Rule-Based Executive Recommendations
  const executiveRecommendations = useMemo(() => {
    const recs = [];

    // Recommendation 1: Capacity & Headcount Reallocation
    if (roi.fteCapacityReleased >= 2.0) {
      recs.push({
        id: 'fte-high',
        tag: 'Capacity Optimization',
        badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        title: `Liberate ~${roi.fteCapacityReleased} Full-Time Equivalent (FTE) Analyst Capacity`,
        description: `With ${roi.monthlyHoursSaved} hours saved monthly, reassign operational analysts from tedious line-item reconciliation to high-impact vendor contract auditing, dispute prevention, and cash-flow forecasting.`,
      });
    } else {
      recs.push({
        id: 'fte-moderate',
        tag: 'Workflow Streamlining',
        badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20',
        title: `Recover ${roi.monthlyHoursSaved} Hours / Month of Team Bandwidth`,
        description: `Eliminates repetitive data-entry fatigue and enables your existing team to handle peak quarter-end volume spikes without requiring supplementary contractor staffing.`,
      });
    }

    // Recommendation 2: Financial & Working Capital Impact
    if (roi.annualCostSaved >= 100000) {
      recs.push({
        id: 'cost-high',
        tag: 'Capital Efficiency',
        badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
        title: `Substantial Annual Run-Rate Savings of $${roi.annualCostSaved.toLocaleString()}`,
        description: `Direct operational cost reduction yields an immediate multi-fold return on modern analytics infrastructure and justifies expanding automated ETL pipelines enterprise-wide.`,
      });
    } else {
      recs.push({
        id: 'cost-moderate',
        tag: 'Direct Cost Avoidance',
        badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
        title: `Generate $${roi.annualCostSaved.toLocaleString()} in Direct Annual Savings`,
        description: `Predictable operational expense containment with immediate month-one payback on Power BI and Python automation development.`,
      });
    }

    // Recommendation 3: SLA & Cycle Time Acceleration
    if (roi.tatReduction >= 85) {
      recs.push({
        id: 'sla-fast',
        tag: 'Vendor Settlement SLA',
        badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        title: `Cycle Turnaround Slashed by ${roi.tatReduction}% (from 48h to ${roi.tatAutomatedHours}h)`,
        description: `Same-day sub-ledger reconciliation prevents shipping container detention fees and positions your organization to capture prompt-payment early cash discounts (e.g. 2/10 Net 30).`,
      });
    }

    // Recommendation 4: Scalability & Architecture Strategy
    if (roi.records >= 2000) {
      recs.push({
        id: 'arch-scale',
        tag: 'Architecture Scalability',
        badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20',
        title: 'High-Volume Databricks & PySpark Partitioning Recommended',
        description: `At ${roi.records.toLocaleString()} monthly records, transition scheduled reconciliation scripts into partitioned Spark Lakehouse workflows for sub-second query performance.`,
      });
    } else {
      recs.push({
        id: 'arch-agile',
        tag: 'Architecture Scalability',
        badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
        title: 'Lightweight SQL Window Functions & Power Query Architecture',
        description: `Current volume is efficiently processed by normalized Star Schema tables and automated Python scripts without requiring complex distributed cloud infrastructure.`,
      });
    }

    return recs;
  }, [roi]);

  // Department Multipliers
  const deptFactor = useMemo(() => {
    switch (department) {
      case 'ap': return 0.42;
      case 'freight': return 0.38;
      case 'gl': return 0.20;
      default: return 1.0;
    }
  }, [department]);

  // 12-Month Analytical Trend Data (Manual Spend vs Automated Spend vs Cumulative Savings)
  const monthlySpendTrend = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let runningSavings = 0;

    return months.map((m, idx) => {
      // Natural enterprise variance: higher in Q2 & Q4
      const seasonalFactor = 1 + Math.sin((idx / 12) * Math.PI * 2) * 0.12;
      const monthManualCost = Math.round(roi.manualMonthlyCost * deptFactor * seasonalFactor);
      const monthAutoCost = Math.round(roi.automatedMonthlyCost * deptFactor * seasonalFactor);
      const monthSavings = monthManualCost - monthAutoCost;
      runningSavings += monthSavings;

      return {
        month: m,
        manualCost: monthManualCost,
        autoCost: monthAutoCost,
        netSavings: monthSavings,
        cumulativeSavings: runningSavings,
      };
    });
  }, [roi, deptFactor]);

  // Discrepancy Breakdown by Root Cause Category
  const discrepancyCategories = [
    { name: 'Tariff / Freight Rate Mismatch', value: 38, count: Math.round(roi.records * 0.38 * deptFactor), fill: '#0284c7' },
    { name: 'Multi-Currency FX Float', value: 26, count: Math.round(roi.records * 0.26 * deptFactor), fill: '#6366f1' },
    { name: 'Missing Purchase Order Ref', value: 22, count: Math.round(roi.records * 0.22 * deptFactor), fill: '#8b5cf6' },
    { name: 'Duplicate Vendor Invoices', value: 14, count: Math.round(roi.records * 0.14 * deptFactor), fill: '#f59e0b' },
  ];

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
      manualHours: Math.round(item.manualHours * (dateRange === '30d' ? 1 : dateRange === 'q2' ? 1.4 : 2.5) * deptFactor),
      automatedHours: Math.round(item.automatedHours * (dateRange === '30d' ? 1 : dateRange === 'q2' ? 1.4 : 2.5) * deptFactor),
    }));
  }, [dateRange, deptFactor]);

  // Export to CSV Function
  const exportToCSV = useCallback(() => {
    const headers = [
      'Report: Pooja Kale - Reconciliation Automation ROI Model',
      `Generated Date: ${new Date().toISOString()}`,
      `Selected Scenario: ${scenario.toUpperCase()}`,
      `Department Scope: ${department.toUpperCase()}`,
      `Subsidiary Region: ${region.toUpperCase()}`,
      '',
      '--- MODEL INPUT ASSUMPTIONS ---',
      `Monthly Discrepancy Records,${roi.records}`,
      `Analyst Hourly Operational Cost ($/hr),$${roi.hourlyRate}`,
      `Manual Processing Time per Record (mins),${roi.manualMinutes}`,
      `Automated Processing Time per Record (mins),${roi.automatedMinutes}`,
      '',
      '--- CALCULATED EXECUTIVE KPIS ---',
      `Manual Processing Hours (hrs/mo),${roi.manualHours}`,
      `Automated Processing Hours (hrs/mo),${roi.automatedHours}`,
      `Monthly Hours Saved (hrs/mo),${roi.monthlyHoursSaved}`,
      `Annual Hours Saved (hrs/yr),${roi.annualHoursSaved}`,
      `Monthly Operational Savings ($),$${roi.monthlySavings}`,
      `Annual Cost Savings ($),$${roi.annualCostSaved}`,
      `Efficiency Improvement (%),${roi.efficiencyGain}%`,
      `FTE Capacity Liberated (FTEs),${roi.fteCapacityReleased}`,
      `Turnaround Acceleration (TAT hrs),${roi.tatAutomatedHours} hrs (vs ${roi.tatManualHours} hrs baseline)`,
      `Turnaround Time Reduction (%),${roi.tatReduction}%`,
      '',
      '--- 12-MONTH FINANCIAL RUN-RATE PROJECTION ---',
      'Month,Legacy Manual Spend ($),Automated Pipeline Spend ($),Monthly Net Savings ($),Cumulative Net Savings ($)',
      ...monthlySpendTrend.map(
        (row) => `${row.month},${row.manualCost},${row.autoCost},${row.netSavings},${row.cumulativeSavings}`
      ),
      '',
      '--- CANDIDATE CREDIBILITY NOTE ---',
      'Engineered by Pooja Kale: Data & Business Analyst specializing in Workday ERP, CargoWise, and automated SQL/Python reconciliation pipelines.',
    ];

    const csvContent = '\uFEFF' + headers.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Pooja_Kale_ROI_Scenario_${scenario}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3500);
  }, [roi, scenario, department, region, monthlySpendTrend]);

  // Print Executive Summary
  const handlePrintSummary = () => {
    window.print();
  };

  const tabs = [
    { id: 'roi', label: 'ROI & Capacity Simulator', icon: Calculator },
    { id: 'trends', label: '12-Mo Financial Trends', icon: DollarSign },
    { id: 'collections', label: 'Collections & DPD Delinquency', icon: TrendingUp },
    { id: 'discrepancies', label: 'Financial Reconciliation', icon: Clock },
    { id: 'sla', label: 'Operational SLA & Backlog', icon: CheckCircle2 },
  ];

  const simulatedVarianceLogs = [
    { id: "TX-90214", vendor: "Maersk Logistics Global", erpAmt: "$14,250.00", bankAmt: "$14,250.00", currency: "USD", variance: "$0.00", status: "AUTO_MATCHED", badge: "Exact Match" },
    { id: "TX-90215", vendor: "Hapag-Lloyd AG (Rotterdam)", erpAmt: "€8,410.20", bankAmt: "€8,410.18", currency: "EUR", variance: "-$0.02", status: "TOLERANCE_CLEARED", badge: "Within ±$0.02 Rule" },
    { id: "TX-90216", vendor: "DHL Global Forwarding", erpAmt: "$6,120.50", bankAmt: "$6,120.50", currency: "USD", variance: "$0.00", status: "AUTO_MATCHED", badge: "Exact Match" },
    { id: "TX-90217", vendor: "Kuehne+Nagel Intermodal", erpAmt: "$22,890.00", bankAmt: "$22,890.00", currency: "USD", variance: "$0.00", status: "AUTO_MATCHED", badge: "Exact Match" },
  ];

  return (
    <section id="live-dashboard" className="pt-16 sm:pt-20 pb-16 sm:pb-20 scroll-mt-24 sm:scroll-mt-28 relative bg-[#F5F5F7] dark:bg-[#121214] border-y border-[#E5E7EB] dark:border-[#2C2C2E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] text-xs font-semibold text-[#0071E3] dark:text-[#2997FF]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Data Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
            Operational Analytics & ROI Simulator
          </h2>
          <p className="text-[17px] text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
            Explore live mathematical models of automated ERP reconciliation, calculate capacity ROI across operating scenarios, and export executive audit summaries.
          </p>
        </div>

        {/* Sandbox Demarcation Alert Banner */}
        <div className="mb-5 p-4 rounded-2xl bg-white dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6E6E73] dark:text-[#86868B]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#0071E3] shrink-0" />
            <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Interactive Mathematical Sandbox
            </span>
            <span className="hidden md:inline text-[#86868B]">•</span>
            <span className="hidden md:inline">
              Formulas derive dynamically from a unified calculation model. Pooja's actual enterprise achievements are documented in Experience.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowExecutiveModal(true)}
              className="apple-btn-primary min-h-[38px] px-3.5 py-1.5 text-xs font-medium cursor-pointer"
              title="View full executive summary briefing"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Executive Summary</span>
            </button>

            <button
              onClick={exportToCSV}
              className="apple-btn-secondary min-h-[38px] px-3.5 py-1.5 text-xs font-medium cursor-pointer"
              title="Download calculated scenario model as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleReset}
              className="min-h-[38px] px-3.5 py-1.5 rounded-full border border-[#E5E7EB] dark:border-[#2C2C2E] hover:border-[#0071E3] dark:hover:border-[#2997FF] hover:bg-black/5 dark:hover:bg-white/5 text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              title="Reset sandbox inputs and scenario to baseline"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Export Notification Toast */}
        {copiedNotification && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Scenario CSV exported successfully with actual calculated formulas and 12-month projections.</span>
            </div>
            <button onClick={() => setCopiedNotification(false)} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Dashboard Shell Window */}
        <div className="glass-panel rounded-3xl p-5 sm:p-8 border-zinc-200/80 dark:border-white/10 shadow-xl relative overflow-hidden bg-white/95 dark:bg-[#101014]/90">
          
          {/* Top Bar: macOS Window Dots + Primary View Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-zinc-500 ml-2 hidden sm:inline">
                Enterprise_Reconciliation_BI.pbix (Model v2.4)
              </span>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-black/40 p-1.5 rounded-2xl border border-zinc-200 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-colors duration-200 shrink-0 whitespace-nowrap min-h-[36px] cursor-pointer select-none ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeDashboardTab"
                        className="absolute inset-0 bg-[#0071E3] rounded-xl shadow-md shadow-[#0071E3]/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Control Toolbar: Department, Date Range & Region Filters */}
          <div className="pt-4 pb-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-zinc-100 dark:border-white/5">
            
            {/* Department Scope Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="text-zinc-500 font-mono text-[11px] mr-1 shrink-0">Department:</span>
              <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-white/5 p-0.5 border border-zinc-200 dark:border-white/5 shrink-0">
                {[
                  { id: 'all', label: 'All Operations' },
                  { id: 'ap', label: 'Accounts Payable' },
                  { id: 'freight', label: 'Freight Audit' },
                  { id: 'gl', label: 'Treasury & GL' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDepartment(d.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap min-h-[30px] cursor-pointer ${
                      department === d.id
                        ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm font-semibold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Horizon & Region */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Range Selector */}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="text-zinc-500 font-mono text-[11px] shrink-0">Horizon:</span>
                <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-white/5 p-0.5 border border-zinc-200 dark:border-white/5">
                  {[
                    { id: '30d', label: 'Last 30d' },
                    { id: 'q2', label: 'Q2 Benchmark' },
                    { id: 'ytd', label: 'Full YTD' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDateRange(opt.id)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap min-h-[28px] cursor-pointer ${
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
                <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="text-zinc-500 font-mono text-[11px] shrink-0">Subsidiary:</span>
                <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-white/5 p-0.5 border border-zinc-200 dark:border-white/5">
                  {[
                    { id: 'all', label: 'Global' },
                    { id: 'na', label: 'NA' },
                    { id: 'emea', label: 'EMEA' },
                    { id: 'apac', label: 'APAC' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRegion(r.id)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap min-h-[28px] cursor-pointer ${
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

          </div>

          {/* TAB 0: ROI & CAPACITY SIMULATOR */}
          {activeTab === 'roi' && (
            <div className="pt-6 space-y-6">
              
              {/* Scenario Preset Toggle Bar */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                    Model Scenarios:
                  </span>
                  <div className="inline-flex rounded-xl bg-zinc-200/70 dark:bg-white/10 p-1 gap-1 flex-wrap">
                    {[
                      { key: 'baseline', label: 'Baseline (Mid-Enterprise)' },
                      { key: 'best', label: 'Best-Case (High Scale)' },
                      { key: 'worst', label: 'Conservative (Low Volume)' },
                    ].map((s) => {
                      const isActive = scenario === s.key;
                      return (
                        <button
                          key={s.key}
                          onClick={() => applyScenario(s.key)}
                          className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 cursor-pointer select-none ${
                            isActive
                              ? 'text-[#0071E3] dark:text-[#2997FF]'
                              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeScenarioPill"
                              className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-[#E5E7EB] dark:border-[#3A3A3C]"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="text-xs font-mono text-zinc-500">
                  Status: <span className="text-sky-600 dark:text-sky-400 font-semibold">{scenario.toUpperCase()}</span>
                </div>
              </div>

              {/* 4 Interactive Dynamic Sliders Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-sky-500" />
                      <span>Reconciliation Capacity & Financial ROI Engine</span>
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Adjust input parameters to observe real-time recalculations across capacity, annual savings, and turnaround velocity.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAssumptions(!showAssumptions)}
                    className="flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline w-fit cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{showAssumptions ? 'Hide Formulas' : 'View Formulas & Assumptions'}</span>
                    {showAssumptions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {/* Calculation Methodology Accordion */}
                {showAssumptions && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs font-mono text-zinc-600 dark:text-zinc-300 space-y-2 animate-in fade-in duration-200">
                    <div className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">
                      Documented Mathematical Formulas
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                      <div>• <span className="text-sky-500">Manual Effort:</span> (Monthly Records × Manual Minutes) ÷ 60</div>
                      <div>• <span className="text-sky-500">Automated Effort:</span> (Monthly Records × Automated Minutes) ÷ 60</div>
                      <div>• <span className="text-emerald-500">Monthly Hours Saved:</span> Manual Hours − Automated Hours</div>
                      <div>• <span className="text-emerald-500">Annual Run-Rate Savings:</span> Monthly Hours Saved × Hourly Rate × 12</div>
                      <div>• <span className="text-indigo-500">Efficiency Improvement %:</span> (Hours Saved ÷ Manual Hours) × 100%</div>
                      <div>• <span className="text-indigo-500">FTE Capacity Liberated:</span> Monthly Hours Saved ÷ 160 hrs/FTE</div>
                    </div>
                  </div>
                )}

                {/* The 4 Dynamic Parameter Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-1">
                  
                  {/* Parameter 1: Monthly Discrepancy Records */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-white dark:bg-[#121217] border border-zinc-200/80 dark:border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">Monthly Discrepancies:</span>
                      <span className="font-bold font-mono text-sky-600 dark:text-sky-400 text-xs bg-sky-500/10 px-2 py-0.5 rounded-full">
                        {monthlyExceptions.toLocaleString()} txns
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="4000"
                      step="50"
                      value={monthlyExceptions}
                      onChange={(e) => handleInputChange(setMonthlyExceptions, e.target.value, 100, 4000)}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>100 (Low)</span>
                      <span>2,000 (Mid)</span>
                      <span>4,000 (High)</span>
                    </div>
                  </div>

                  {/* Parameter 2: Analyst Hourly Operational Cost */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-white dark:bg-[#121217] border border-zinc-200/80 dark:border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">Analyst Cost Rate:</span>
                      <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        ${hourlyRate} / hr
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="75"
                      step="5"
                      value={hourlyRate}
                      onChange={(e) => handleInputChange(setHourlyRate, e.target.value, 15, 75)}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>$15 (Junior)</span>
                      <span>$35 (Senior)</span>
                      <span>$75 (Specialist)</span>
                    </div>
                  </div>

                  {/* Parameter 3: Manual Processing Time per Record */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-white dark:bg-[#121217] border border-zinc-200/80 dark:border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">Manual Time / Record:</span>
                      <span className="font-bold font-mono text-amber-600 dark:text-amber-400 text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">
                        {manualMinutes} mins
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="45"
                      step="1"
                      value={manualMinutes}
                      onChange={(e) => handleInputChange(setManualMinutes, e.target.value, 5, 45)}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>5m (Quick)</span>
                      <span>25m (Average)</span>
                      <span>45m (Complex)</span>
                    </div>
                  </div>

                  {/* Parameter 4: Automated Processing Time per Record */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-white dark:bg-[#121217] border border-zinc-200/80 dark:border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">Automated Pipeline Time:</span>
                      <span className="font-bold font-mono text-purple-600 dark:text-purple-400 text-xs bg-purple-500/10 px-2 py-0.5 rounded-full">
                        {automatedMinutes} mins
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="4.0"
                      step="0.1"
                      value={automatedMinutes}
                      onChange={(e) => handleInputChange(setAutomatedMinutes, e.target.value, 0.2, 4.0)}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>0.2m (Instant)</span>
                      <span>1.5m (Standard)</span>
                      <span>4.0m (Fuzzy)</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Requirement #2: 4 Refined Primary KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Monthly Hours Saved */}
                <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex flex-col justify-between shadow-sm hover:border-sky-500/30 transition-colors">
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                      Monthly Time Saved
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 mt-2 tracking-tight">
                      {roi.monthlyHoursSaved.toLocaleString()} hrs
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-white/5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>↓ {roi.efficiencyGain}% manual workload reduction</span>
                  </div>
                </div>

                {/* Metric 2: Annual Cost Savings */}
                <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex flex-col justify-between shadow-sm hover:border-emerald-500/30 transition-colors">
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                      Annual Run-Rate Savings
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2 tracking-tight">
                      ${roi.annualCostSaved.toLocaleString()}
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-white/5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    Calculated at ${roi.hourlyRate}/hr operational baseline
                  </div>
                </div>

                {/* Metric 3: FTE Capacity Released */}
                <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex flex-col justify-between shadow-sm hover:border-indigo-500/30 transition-colors">
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                      Capacity Released (FTE)
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2 tracking-tight">
                      {roi.fteCapacityReleased} FTEs
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-white/5 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                    Equivalent to {roi.monthlyHoursSaved}h analyst bandwidth
                  </div>
                </div>

                {/* Metric 4: Cycle Turnaround Velocity */}
                <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 flex flex-col justify-between shadow-sm hover:border-purple-500/30 transition-colors">
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                      Turnaround Velocity (TAT)
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400 mt-2 tracking-tight">
                      {roi.tatAutomatedHours} hrs
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-white/5 text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                    Accelerated from {roi.tatManualHours}h legacy SLA baseline
                  </div>
                </div>

              </div>

              {/* Requirement #3: Capacity Allocation Visualizer (Before-and-After Comparison) */}
              <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-sky-500" />
                      <span>Capacity Allocation Breakdown: Manual vs. Automated Engineering</span>
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Visualizing human capital freed from repetitive entry to strategic dispute resolution.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                    {roi.efficiencyGain}% Time Reclaimed
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Legacy Manual Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Legacy Manual Spreadsheets (Workday / CargoWise):</span>
                      <span className="font-mono text-zinc-900 dark:text-zinc-200 font-bold">{roi.manualHours.toLocaleString()} hrs / mo</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                      <div className="bg-red-400/80 h-full w-full rounded-full transition-all duration-500" />
                    </div>
                  </div>

                  {/* Pooja's Automated Pipeline Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-sky-600 dark:text-sky-400 font-semibold">Pooja's Automated Pipeline (Python + SQL Engine):</span>
                      <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{roi.automatedHours.toLocaleString()} hrs / mo</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(3, Math.round((roi.automatedHours / roi.manualHours) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Capacity Callout Footer */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 font-mono">
                  <span>Capacity Released: <strong className="text-zinc-900 dark:text-white font-bold">{roi.monthlyHoursSaved.toLocaleString()} hours/mo</strong></span>
                  <span>Headcount Equivalent: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">~{roi.fteCapacityReleased} Dedicated Analysts</strong></span>
                </div>
              </div>

              {/* Requirement #4: Executive Insights Panel (Deterministic Rule-Based Recommendations) */}
              <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white tracking-tight">
                      Executive Business Recommendations ({scenario.toUpperCase()})
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Deterministic operational strategies generated from current model inputs.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {executiveRecommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#121217] border border-zinc-200/80 dark:border-white/5 space-y-2 hover:border-sky-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${rec.badgeColor}`}>
                          {rec.tag}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                        {rec.title}
                      </h5>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement #5: Scenario Comparison Matrix */}
              <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-sky-500" />
                      <span>Scenario Comparison Matrix (Best vs. Baseline vs. Conservative)</span>
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Evaluate sensitivity across distinct operational scales and cost structures.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto no-scrollbar rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
                  <table className="w-full text-xs font-mono min-w-[620px]">
                    <thead className="bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-white/5 text-left">
                      <tr>
                        <th className="p-3">Scenario</th>
                        <th className="p-3">Monthly Volume</th>
                        <th className="p-3">Analyst Rate</th>
                        <th className="p-3">Monthly Time Saved</th>
                        <th className="p-3">Annual Savings</th>
                        <th className="p-3">Capacity (FTE)</th>
                        <th className="p-3">Efficiency %</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-white/5 text-zinc-700 dark:text-zinc-300">
                      {/* Best Case */}
                      <tr className={scenario === 'best' ? 'bg-sky-500/5 font-semibold' : ''}>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Best-Case</td>
                        <td className="p-3">2,800 txns</td>
                        <td className="p-3">$35 / hr</td>
                        <td className="p-3">{scenarioMatrix.best.monthlyHoursSaved} hrs</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">${scenarioMatrix.best.annualCostSaved.toLocaleString()}</td>
                        <td className="p-3">{scenarioMatrix.best.fteCapacityReleased} FTE</td>
                        <td className="p-3">{scenarioMatrix.best.efficiencyGain}%</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => applyScenario('best')}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-sans font-semibold bg-zinc-200 dark:bg-white/10 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"
                          >
                            Load
                          </button>
                        </td>
                      </tr>

                      {/* Baseline */}
                      <tr className={scenario === 'baseline' ? 'bg-sky-500/5 font-semibold' : ''}>
                        <td className="p-3 text-sky-600 dark:text-sky-400 font-bold">Baseline (Target)</td>
                        <td className="p-3">1,200 txns</td>
                        <td className="p-3">$25 / hr</td>
                        <td className="p-3">{scenarioMatrix.baseline.monthlyHoursSaved} hrs</td>
                        <td className="p-3 text-sky-600 dark:text-sky-400 font-bold">${scenarioMatrix.baseline.annualCostSaved.toLocaleString()}</td>
                        <td className="p-3">{scenarioMatrix.baseline.fteCapacityReleased} FTE</td>
                        <td className="p-3">{scenarioMatrix.baseline.efficiencyGain}%</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => applyScenario('baseline')}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-sans font-semibold bg-zinc-200 dark:bg-white/10 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"
                          >
                            Load
                          </button>
                        </td>
                      </tr>

                      {/* Conservative */}
                      <tr className={scenario === 'worst' ? 'bg-sky-500/5 font-semibold' : ''}>
                        <td className="p-3 text-amber-600 dark:text-amber-400 font-bold">Conservative</td>
                        <td className="p-3">500 txns</td>
                        <td className="p-3">$20 / hr</td>
                        <td className="p-3">{scenarioMatrix.worst.monthlyHoursSaved} hrs</td>
                        <td className="p-3 text-amber-600 dark:text-amber-400 font-bold">${scenarioMatrix.worst.annualCostSaved.toLocaleString()}</td>
                        <td className="p-3">{scenarioMatrix.worst.fteCapacityReleased} FTE</td>
                        <td className="p-3">{scenarioMatrix.worst.efficiencyGain}%</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => applyScenario('worst')}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-sans font-semibold bg-zinc-200 dark:bg-white/10 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"
                          >
                            Load
                          </button>
                        </td>
                      </tr>

                      {/* Custom Active if modified */}
                      {scenario === 'custom' && (
                        <tr className="bg-purple-500/10 font-semibold border-t-2 border-purple-500/40">
                          <td className="p-3 text-purple-600 dark:text-purple-400 font-bold">Custom (Active)</td>
                          <td className="p-3">{roi.records.toLocaleString()} txns</td>
                          <td className="p-3">${roi.hourlyRate} / hr</td>
                          <td className="p-3">{roi.monthlyHoursSaved.toLocaleString()} hrs</td>
                          <td className="p-3 text-purple-600 dark:text-purple-400 font-bold">${roi.annualCostSaved.toLocaleString()}</td>
                          <td className="p-3">{roi.fteCapacityReleased} FTE</td>
                          <td className="p-3">{roi.efficiencyGain}%</td>
                          <td className="p-3 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-700 dark:text-purple-300">
                              Active
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 1: 12-MONTH FINANCIAL & RECONCILIATION TRENDS */}
          {activeTab === 'trends' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Projected Annual Savings</span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    ${roi.annualCostSaved.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-zinc-500 mt-1 block">Full 12-month run rate with Q2/Q4 seasonality</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Legacy Cost Avoidance</span>
                  <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">
                    ${(roi.manualMonthlyCost * 12).toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">Slashed by {roi.efficiencyGain}%</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Department Scope</span>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1 capitalize">
                    {department === 'all' ? 'Enterprise-Wide' : department}
                  </div>
                  <span className="text-[11px] text-zinc-500 mt-1 block">Factored at {(deptFactor * 100).toFixed(0)}% volume allocation</span>
                </div>
              </div>

              {/* Chart 1: Monthly Cost Comparison: Legacy Spend vs Automated Pipeline Spend */}
              <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                      12-Month Operational Spend Comparison ($)
                    </h4>
                    <p className="text-xs text-zinc-500">Legacy manual spreadsheet auditing vs. automated Python/SQL pipeline.</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    Cumulative Savings: ${roi.annualCostSaved.toLocaleString()}
                  </span>
                </div>

                <div className="h-[260px] sm:h-[320px] w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlySpendTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="manualGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="autoGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-zinc-800" opacity={0.7} />
                      <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                      <YAxis stroke="#71717a" fontSize={11} tickLine={false} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderColor: '#e4e4e7',
                          borderRadius: '12px',
                          fontSize: '12px',
                          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                        }}
                        className="dark:!bg-zinc-900 dark:!border-zinc-800 dark:!text-white"
                        formatter={(val, name) => [`$${val.toLocaleString()}`, name === 'manualCost' ? 'Legacy Manual Spend' : name === 'autoCost' ? 'Automated Spend' : 'Cumulative Net Savings']}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      <Area type="monotone" dataKey="manualCost" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" fill="url(#manualGradient)" name="Legacy Manual Spend ($)" />
                      <Area type="monotone" dataKey="autoCost" stroke="#0284c7" strokeWidth={3} fill="url(#autoGradient)" name="Automated Pipeline Spend ($)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Root-Cause Discrepancy Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-5 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
                <div className="h-[240px] sm:h-[260px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={discrepancyCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {discrepancyCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="#ffffff" className="dark:stroke-zinc-900" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderColor: '#e4e4e7',
                          borderRadius: '12px',
                          fontSize: '12px',
                        }}
                        className="dark:!bg-zinc-900 dark:!border-zinc-800 dark:!text-white"
                        formatter={(val, name) => [`${val}%`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                    Discrepancy Inflow by Root Cause
                  </h4>
                  {discrepancyCategories.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white dark:bg-[#121217] border border-zinc-200/60 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.fill }} />
                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">{cat.name}</span>
                      </div>
                      <div className="font-mono text-zinc-500">
                        <strong className="text-zinc-900 dark:text-white">{cat.value}%</strong> ({cat.count} txns)
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: COLLECTIONS HEALTH & DPD */}
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

              <div className="h-[250px] sm:h-[320px] w-full pt-2">
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
                    <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                    <YAxis stroke="#71717a" fontSize={11} tickLine={false} domain={[70, 100]} />
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
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Area type="monotone" dataKey="target" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" fill="url(#targetGradient)" name="Target Benchmark (%)" />
                    <Area type="monotone" dataKey="achieved" stroke="#0284c7" strokeWidth={3} fill="url(#achievedGradient)" name="Achieved Recovery (%)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 3: DISCREPANCY RECONCILIATION & VARIANCE LOGS */}
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
              <div className="h-[240px] sm:h-[280px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dynamicDiscrepanciesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-zinc-800" opacity={0.7} />
                    <XAxis dataKey="period" stroke="#71717a" fontSize={11} tickLine={false} />
                    <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
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
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="manualHours" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Manual Work (Legacy)" />
                    <Bar dataKey="automatedHours" fill="#0284c7" radius={[6, 6, 0, 0]} name="Automated Pipeline (Pooja)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Simulated Transaction Variance Audit Log Table */}
              <div className="space-y-2 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-sky-500" />
                    <span>Simulated Sub-Ledger Clearance Log (Live Sample Feed)</span>
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400">
                    <span className="sm:hidden text-sky-500 mr-1 font-sans">← Scroll table →</span>
                    Tolerance Rule: ±$0.02 USD / EUR Float
                  </span>
                </div>

                <div className="overflow-x-auto no-scrollbar rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
                  <div className="min-w-[540px] text-xs">
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
                        <div className="col-span-2 truncate pr-2">{log.vendor}</div>
                        <div>{log.erpAmt}</div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20 whitespace-nowrap">
                            <Check className="w-3 h-3" />
                            <span>{log.badge}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: OPERATIONAL SLA BREAKDOWN */}
          {activeTab === 'sla' && (
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="h-[240px] sm:h-[280px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={interactiveChartData.slaBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
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

      {/* Requirement #7: Printable Executive Summary Briefing Modal */}
      {showExecutiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121217] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
                    Executive Briefing: Reconciliation Automation ROI
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">
                    Prepared for Talent Partners & Finance Leadership
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowExecutiveModal(false)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Briefing Content */}
            <div className="space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 space-y-1">
                <div className="font-bold text-zinc-950 dark:text-white text-xs uppercase tracking-wider font-mono">
                  Context & Operational Scale
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Model evaluated on <strong className="text-zinc-900 dark:text-white">{roi.records.toLocaleString()} monthly exceptions</strong> at an operational baseline of <strong className="text-zinc-900 dark:text-white">${roi.hourlyRate}/hour</strong>.
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <div className="text-lg font-extrabold text-sky-600 dark:text-sky-400">{roi.monthlyHoursSaved}h</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Monthly Saved</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">${roi.annualCostSaved.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Annual Savings</div>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{roi.fteCapacityReleased} FTE</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Capacity Liberated</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="text-lg font-extrabold text-purple-600 dark:text-purple-400">{roi.efficiencyGain}%</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Efficiency Gain</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-zinc-950 dark:text-white text-xs uppercase tracking-wider font-mono">
                  Executive Recommendations
                </h4>
                <ul className="space-y-2 text-xs">
                  {executiveRecommendations.map((rec) => (
                    <li key={rec.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/5 space-y-1">
                      <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-sky-500" />
                        <span>{rec.title}</span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">{rec.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.04] text-[11px] font-mono text-zinc-500">
                Author: Pooja Kale — Associate Analyst (Finance & IT Systems at OIA Global) • B.E. Information Technology (Class of 2024).
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-white/10">
              <button
                onClick={handlePrintSummary}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-semibold text-xs hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-sky-500" />
                <span>Print / Save as PDF</span>
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold text-xs hover:bg-sky-600 dark:hover:bg-sky-400 transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dataset (.CSV)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
