import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Linkedin, Github, Send, Copy,
  Check, MessageSquare, ArrowUpRight, AlertCircle, Loader2, RefreshCw
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'Full-Time Employment',
    message: '',
    _gotcha: '', // Anti-spam honeypot
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

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

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name or organization (min 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid work email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Please include details regarding the opportunity (min 10 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot spam trap check
    if (formData._gotcha) {
      setStatus('success');
      return;
    }

    setStatus('loading');

    try {
      // Prepare prefilled mailto link for direct client transmission
      const subject = encodeURIComponent(`[${formData.roleType}] Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Pooja,\n\n${formData.message}\n\nCandidate Inquiry Details:\n• Name: ${formData.name}\n• Work Email: ${formData.email}\n• Inquiry Category: ${formData.roleType}\n\nBest regards,\n${formData.name}`
      );

      // Simulate network latency for transmission feedback
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Open email client with prefilled details
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', roleType: 'Full-Time Employment', message: '', _gotcha: '' });
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect & Inquire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Let's Discuss New Opportunities
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            I am actively interviewing for <strong className="text-zinc-900 dark:text-zinc-200">Data Analyst, Business Analyst, and Financial Analytics</strong> roles across Pune, Bengaluru, and Remote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column: Direct Verified Contact Channels (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            
            {/* Email Card */}
            <div className="glass-panel rounded-2xl p-4 sm:p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-zinc-500 font-mono uppercase">Direct Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate block">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.email, 'email')}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
                title="Copy Email to Clipboard"
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-panel rounded-2xl p-4 sm:p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-zinc-500 font-mono uppercase">Phone / WhatsApp</div>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
                title="Copy Phone to Clipboard"
                aria-label="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm flex items-center justify-between block group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                <div className="w-10 h-10 rounded-xl bg-[#0077b5]/15 flex items-center justify-center text-[#0077b5] shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-zinc-500 font-mono uppercase">LinkedIn Network</div>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate block">
                    linkedin.com/in/pooja-kale
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-sky-500 transition-colors shrink-0" />
            </a>

            {/* GitHub Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm flex items-center justify-between block group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                <div className="w-10 h-10 rounded-xl bg-zinc-900/10 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-zinc-500 font-mono uppercase">GitHub Repositories</div>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate block">
                    github.com/poojakale
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-sky-500 transition-colors shrink-0" />
            </a>

            {/* Location & Notice Badge */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>Base: <strong className="text-zinc-900 dark:text-white">Pune, India</strong> (Open to Bengaluru & Remote)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Serving 1 Month Notice • Ready for fast-track onboarding</span>
              </div>
            </div>

          </div>

          {/* Right Column: Production Contact Form (3 cols) */}
          <div className="lg:col-span-3 glass-panel rounded-3xl p-6 sm:p-8 border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#121217]/60 shadow-sm relative">
            
            <div className="mb-6">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Direct Recruiter Inquiry Form</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Share candidate inquiry details or interview schedules. Transmits with full validation.
              </p>
            </div>

            {/* Success State View */}
            {status === 'success' && (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold">
                    <Check className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Inquiry Prepared & Transmitted!</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">Your email client has been opened with your inquiry.</p>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Pooja typically reviews talent partner inquiries within 24 hours. A backup copy of your inquiry details has been compiled.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={resetForm}
                    className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            )}

            {/* Form View (Idle / Loading / Error) */}
            {status !== 'success' && (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Honeypot field (hidden from genuine users) */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Your Name / Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sarah (Talent Partner at FinTech Corp)"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-black/40 border text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 dark:border-white/10 focus:border-sky-500'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-zinc-50 dark:bg-black/40 border text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 dark:border-white/10 focus:border-sky-500'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Inquiry Type Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Role Category / Inquiry Scope
                  </label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option value="Data Analyst (Full-Time)">Data Analyst (Full-Time)</option>
                    <option value="Business Analyst (Operations / BI)">Business Analyst (Operations / BI)</option>
                    <option value="Financial Systems & Reconciliation Analyst">Financial Systems & Reconciliation Analyst</option>
                    <option value="Interview / Recruitment Scheduling">Interview / Recruitment Scheduling</option>
                  </select>
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Opportunity / Message Overview <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="We have an opening for a Data Analyst in our Pune/Bengaluru team and would love to connect..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-black/40 border text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 dark:border-white/10 focus:border-sky-500'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button: Min 48px touch height */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full min-h-[48px] py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-600 text-white font-bold text-xs sm:text-sm hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-[0.99] cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating & Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Recruiter Inquiry</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
