import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';
import { personalInfo, experienceData, keyMetrics } from '../data/portfolioData';

export default function PortfolioAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "👋 Hi there! I'm Pooja's Portfolio AI Assistant. Ask me anything about her analytical skills, OIA Global experience, ERP systems, or availability!"
    }
  ]);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "Tell me about Pooja's core skills",
    "What is her notice period & availability?",
    "Explain her financial reconciliation work",
    "What ERP & BI tools does she use?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase();

    if (query.includes('skill') || query.includes('tech') || query.includes('tool')) {
      return `Pooja's technical stack spans four core domains:
• **Business Intelligence**: Power BI (Advanced DAX, Star Schema, Time Intelligence), Advanced Excel (Power Pivot, XLOOKUP, Macros).
• **SQL & Databases**: PostgreSQL, MySQL, SQL Server (SSMS) with complex CTEs, Window Functions, and query optimization.
• **Programmatic Analytics**: Python (Pandas, NumPy, Scikit-Learn), PySpark, Databricks for large-scale data wrangling.
• **Enterprise Systems**: Workday ERP & CargoWise for multi-currency sub-ledger reconciliation, invoice matching, and DPD delinquency tracking.`;
    }

    if (query.includes('notice') || query.includes('available') || query.includes('join') || query.includes('location')) {
      return `📅 **Availability & Location Status**:
• **Notice Period**: 1 Month notice at OIA Global (Immediate/fast-track onboarding available for high-priority hiring).
• **Current Base**: Pune, India.
• **Mobility**: Actively open to on-site/hybrid opportunities in **Pune** and **Bengaluru**, as well as full-time **Remote** roles across India and global distributed teams.`;
    }

    if (query.includes('reconcil') || query.includes('discrepan') || query.includes('oia') || query.includes('workday')) {
      return `⚡ **Enterprise Reconciliation Track Record**:
At OIA Global, Pooja engineered an automated Python & SQL discrepancy engine that:
• Cut manual month-end ledger verification effort by **60% (saving 36 hrs/week)**.
• Reconciled 24,000+ transactional records between Workday ERP sub-ledgers and bank settlement files.
• Achieved **98.2% first-pass auto match** using Levenshtein fuzzy string matching and multi-currency tolerance rules.
• Guaranteed 100% audit-readiness with zero financial variance across 6 quarters.`;
    }

    if (query.includes('project') || query.includes('power bi') || query.includes('dax') || query.includes('star schema')) {
      return `📊 **Featured Engineering Projects**:
1. **FinTech Lending & Collections Delinquency Platform**: XGBoost credit scoring (AUC 0.88) and DPD 0–30 cohort migration modeling across 25K+ borrowers.
2. **Automated Reconciliation Engine**: Fuzzy matching and ERP variance auditor eliminating 60% manual close overhead.
3. **Enterprise AI Workflow Analytics**: Moveworks bot interaction funnel optimization raising containment to 78.5% and CSAT to 4.8/5.
4. **Operational Star Schema Dashboard**: 15+ complex DAX measures eliminating team backlogs by 30%.`;
    }

    if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('hire')) {
      return `📬 **Get in Touch Directly with Pooja**:
• **Email**: ${personalInfo.email}
• **Phone**: ${personalInfo.phone}
• **LinkedIn**: ${personalInfo.linkedin}
• **Location**: ${personalInfo.location}

Feel free to send a message via the Contact section below or email directly!`;
    }

    return `Pooja Kale is a Data & Business Analyst (B.E. IT 2024 graduate) with ~1.5 years at OIA Global specializing in Power BI, SQL, Python, and Workday ERP reconciliation. She is available on 1 month notice for Data/Business Analyst roles in Pune, Bengaluru, or Remote. What specific aspect would you like to know more about?`;
  };

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage = { role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const responseText = generateAIResponse(text);
      setMessages((prev) => [...prev, { role: 'assistant', text: responseText }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      
      {/* Refined Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-10 px-3.5 sm:px-4 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 text-white font-semibold text-xs shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 select-none border border-white/20 backdrop-blur-sm group"
          title="Open Portfolio AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-4 h-4 group-hover:rotate-6 transition-transform" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-1 ring-white" />
          </div>
          <span>Portfolio AI</span>
        </button>
      )}

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[360px] max-w-[360px] h-[490px] max-h-[80vh] rounded-3xl glass-panel bg-white/95 dark:bg-[#121217]/95 border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="p-3.5 bg-zinc-100 dark:bg-white/[0.04] border-b border-zinc-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <span>Portfolio AI Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </h4>
                <span className="text-[10px] text-zinc-500 font-mono">Pooja Kale Knowledge Base</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-sky-500 text-white font-medium rounded-br-none shadow-sm'
                      : 'bg-zinc-100 dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-200/50 dark:border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompt Chips */}
          <div className="px-3 py-2 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-1.5 bg-zinc-50 dark:bg-white/[0.01]">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-200/80 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white text-zinc-700 dark:text-zinc-300 transition-colors border border-zinc-200 dark:border-white/5"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-zinc-100 dark:bg-white/[0.04] border-t border-zinc-200 dark:border-white/5 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Pooja..."
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-40 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
