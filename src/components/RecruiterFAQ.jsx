import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, Clock, MapPin, Sparkles, Briefcase } from 'lucide-react';

export default function RecruiterFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is Pooja's current notice period and availability?",
      answer: "Pooja is currently serving a 1-month notice period at OIA Global. She is actively interviewing and can onboard on short notice for high-priority hiring requirements.",
      tag: "Availability",
      icon: Clock,
    },
    {
      question: "What sets Pooja apart from standard analytics candidates?",
      answer: "She combines a formal B.E. in Information Technology (2024) with ~1.5 years of hands-on enterprise experience in Workday ERP & CargoWise financial operations. Rather than just making charts, she engineers root-cause automated data pipelines in SQL and Python that eliminated 60% of manual reconciliation overhead and cut backlogs by 30%.",
      tag: "Core Differentiator",
      icon: Sparkles,
    },
    {
      question: "Which roles and career tracks is she actively targeting?",
      answer: "She is targeting Data Analyst, Business Analyst, BI Developer, and Financial Analytics roles where she can build executive Power BI models (advanced DAX, Star Schema), optimize SQL queries, and automate operational reporting pipelines.",
      tag: "Target Roles",
      icon: Briefcase,
    },
    {
      question: "What is her location preference and work mode flexibility?",
      answer: "Pooja is currently based in Pune, India. She is fully open to on-site or hybrid roles in Pune, Bengaluru, as well as Remote opportunities across India and global distributed teams.",
      tag: "Location & Mobility",
      icon: MapPin,
    },
    {
      question: "Can Pooja handle advanced data modeling and enterprise ERPs on day one?",
      answer: "Yes. She regularly builds dimensional Star Schema models, authors complex DAX measures (Time Intelligence, dynamic ranking), writes optimized SQL queries with CTEs and Window Functions, and manages multi-currency reconciliation across Workday ERP and CargoWise.",
      tag: "Day-One Readiness",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative bg-[#F5F5F7] dark:bg-[#121214] border-y border-[#E5E7EB] dark:border-[#2C2C2E] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/20 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Recruiter Fast-Facts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#86868B]">
            Quick, high-signal answers to key questions for talent partners and hiring managers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3" role="presentation">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;
            const buttonId = `faq-btn-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className="apple-card rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-2xl min-h-[52px] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF] font-bold block mb-1">
                        {faq.tag}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#1D1D1F] dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-5 h-5 text-[#6E6E73] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#0071E3]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-[#6E6E73] dark:text-zinc-300 leading-relaxed border-t border-[#E5E7EB] dark:border-[#2C2C2E] animate-in fade-in duration-200"
                  >
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
