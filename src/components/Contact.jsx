import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, Copy, Check, MessageSquare, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Job Opportunity / Analytics Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Hi Pooja,\n\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Let's Discuss New Opportunities
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            I am actively interviewing for <strong className="text-zinc-900 dark:text-zinc-200">Data Analyst, Business Analyst, and Financial Analytics</strong> roles across Pune, Bengaluru, and Remote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Contact Details Cards (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Email Card */}
            <div className="glass-panel rounded-2xl p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 font-mono uppercase">Email Address</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.email, 'email')}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-panel rounded-2xl p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 font-mono uppercase">Direct Phone / WhatsApp</div>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-2xl p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm flex items-center justify-between block group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0077b5]/15 flex items-center justify-center text-[#0077b5] shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 font-mono uppercase">LinkedIn Profile</div>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    linkedin.com/in/pooja-kale
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-sky-500 transition-colors" />
            </a>

            {/* Location Card */}
            <div className="glass-panel rounded-2xl p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-500 font-mono uppercase">Primary Location</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {personalInfo.location}
                </div>
              </div>
            </div>

          </div>

          {/* Direct Message Form (3 cols) */}
          <div className="lg:col-span-3 glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm relative">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">Send a Direct Message</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              Recruiter inquiries, interview schedules, or project discussions are welcome.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah (Talent Acquisition at FinTech Corp)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Your Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Message / Role Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="We are looking for a Data / Business Analyst for our Bangalore/Pune team and would love to connect..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Send Message via Email</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Your email client has been opened with your message!</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
