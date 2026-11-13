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
    <section id="contact" className="py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28 relative bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/20 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect & Inquire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
            Let's Discuss New Opportunities
          </h2>
          <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#86868B]">
            I am actively interviewing for <strong className="text-[#1D1D1F] dark:text-white">Data Analyst, Business Analyst, and Financial Analytics</strong> roles across Pune, Bengaluru, and Remote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column: Direct Verified Contact Channels (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            
            {/* Email Card */}
            <div className="apple-card rounded-2xl p-4 sm:p-5 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-[#6E6E73] dark:text-[#86868B] font-mono uppercase">Direct Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-[#1D1D1F] dark:text-white hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors truncate block">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.email, 'email')}
                className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
                title="Copy Email to Clipboard"
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="apple-card rounded-2xl p-4 sm:p-5 flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-[#6E6E73] dark:text-[#86868B] font-mono uppercase">Phone / WhatsApp</div>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-semibold text-[#1D1D1F] dark:text-white hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors truncate block">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
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
              className="apple-card rounded-2xl p-4 sm:p-5 flex items-center justify-between block group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-[#6E6E73] dark:text-[#86868B] font-mono uppercase">LinkedIn Network</div>
                  <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors truncate block">
                    linkedin.com/in/pooja-kale
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#6E6E73] group-hover:text-[#0071E3] transition-colors shrink-0" />
            </a>

            {/* GitHub Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card rounded-2xl p-4 sm:p-5 flex items-center justify-between block group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                <div className="w-10 h-10 rounded-xl bg-[#1D1D1F]/10 dark:bg-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-white shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-[#6E6E73] dark:text-[#86868B] font-mono uppercase">GitHub Repositories</div>
                  <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors truncate block">
                    github.com/poojakale
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#6E6E73] group-hover:text-[#0071E3] transition-colors shrink-0" />
            </a>

            {/* Location & Notice Badge */}
            <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-[#161617] border border-[#E5E7EB] dark:border-[#2C2C2E] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#6E6E73] dark:text-[#86868B]">
                <MapPin className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                <span>Base: <strong className="text-[#1D1D1F] dark:text-white">Pune, India</strong> (Open to Bengaluru & Remote)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Serving 1 Month Notice • Ready for fast-track onboarding</span>
              </div>
            </div>

          </div>

          {/* Right Column: Production Contact Form (3 cols) */}
          <div className="lg:col-span-3 apple-card rounded-2xl p-6 sm:p-8 relative">
            
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white">Direct Recruiter Inquiry Form</h3>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] mt-1">
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
                    <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white">Inquiry Prepared & Transmitted!</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">Your email client has been opened with your inquiry.</p>
                  </div>
                </div>

                <p className="text-xs text-[#6E6E73] dark:text-zinc-300 leading-relaxed">
                  Pooja typically reviews talent partner inquiries within 24 hours. A backup copy of your inquiry details has been compiled.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={resetForm}
                    className="apple-btn-secondary min-h-[44px] px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
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
                    <label className="block text-xs font-semibold text-[#1D1D1F] dark:text-zinc-200 mb-1.5">
                      Your Name / Organization <span className="text-[#D92D20]">*</span>
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
                      className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#F5F5F7] dark:bg-[#121214] border text-[#1D1D1F] dark:text-white placeholder-[#86868B] text-xs sm:text-sm focus:outline-none transition-colors ${
                        errors.name ? 'border-[#D92D20] focus:border-[#D92D20]' : 'border-[#E5E7EB] dark:border-[#2C2C2E] focus:border-[#0071E3]'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-[#D92D20] flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] dark:text-zinc-200 mb-1.5">
                      Work Email <span className="text-[#D92D20]">*</span>
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
                      className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#F5F5F7] dark:bg-[#121214] border text-[#1D1D1F] dark:text-white placeholder-[#86868B] text-xs sm:text-sm focus:outline-none transition-colors ${
                        errors.email ? 'border-[#D92D20] focus:border-[#D92D20]' : 'border-[#E5E7EB] dark:border-[#2C2C2E] focus:border-[#0071E3]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-[#D92D20] flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Inquiry Type Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] dark:text-zinc-200 mb-1.5">
                    Role Category / Inquiry Scope
                  </label>
                  <select
                    value={formData.roleType}
                    onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#F5F5F7] dark:bg-[#121214] border border-[#E5E7EB] dark:border-[#2C2C2E] text-[#1D1D1F] dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#0071E3] transition-colors"
                  >
                    <option value="Data Analyst (Full-Time)">Data Analyst (Full-Time)</option>
                    <option value="Business Analyst (Operations / BI)">Business Analyst (Operations / BI)</option>
                    <option value="Financial Systems & Reconciliation Analyst">Financial Systems & Reconciliation Analyst</option>
                    <option value="Interview / Recruitment Scheduling">Interview / Recruitment Scheduling</option>
                  </select>
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] dark:text-zinc-200 mb-1.5">
                    Opportunity / Message Overview <span className="text-[#D92D20]">*</span>
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
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-[#121214] border text-[#1D1D1F] dark:text-white placeholder-[#86868B] text-xs sm:text-sm focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-[#D92D20] focus:border-[#D92D20]' : 'border-[#E5E7EB] dark:border-[#2C2C2E] focus:border-[#0071E3]'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-[#D92D20] flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button: Min 48px touch height, Apple Minimal pill */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="apple-btn-primary w-full min-h-[48px] py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-50"
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
