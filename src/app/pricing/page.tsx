"use client";

// ============================================================
// Pricing Page — /pricing
// ============================================================

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does the AI grade my skills?",
    answer: "The AI mentor continuously evaluates your understanding during your interactive chat sessions. There are no written exams; as you demonstrate practical knowledge, explain concepts, and write code snippets directly in the chat, the AI automatically verifies and updates your progress.",
  },
  {
    question: "Can I change or cancel my plan anytime?",
    answer: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time with a single click in your billing panel. If you cancel, you will keep all your premium features until the end of your current billing period.",
  },
  {
    question: "What makes this different from watching YouTube tutorials?",
    answer: "Passive learning doesn't stick. With YouTube, you consume; with Artificial University, you build. Our AI mentor acts as a personal senior developer, prompting you, challenging your logic, checking your syntax, and adapting the speed and direction of the modules to fit your goals.",
  },
  {
    question: "How do the verifiable certificates work?",
    answer: "Once you successfully complete all modules of a skill pathway, the platform auto-generates a cryptographic, verifiable certificate. This certificate is hosted on our verification database, allowing potential clients or employers to view your authenticated credentials.",
  },
  {
    question: "What is the Founders Guild strategic review?",
    answer: "Founders Guild members get direct human review from AG. Once a week, you can submit your active landing page designs, copywriting scripts, or client outreach emails. AG will record a detailed video feedback session showing you exactly how to optimize your work.",
  },
];

interface ComparisonRow {
  feature: string;
  audit: string | boolean;
  pro: string | boolean;
  founders: string | boolean;
}

const COMPARISON_MATRIX: ComparisonRow[] = [
  { feature: "AI Mentor Chat Access", audit: "Limited (1 active lesson)", pro: "Unlimited", founders: "Unlimited" },
  { feature: "Skills Library Access", audit: "Web Design Only", pro: "All 10+ Skills", founders: "All 10+ Skills" },
  { feature: "AI Curriculum Generation", audit: false, pro: true, founders: true },
  { feature: "Verifiable Certificates", audit: false, pro: true, founders: true },
  { feature: "Mentor Response Priority", audit: "Standard Speed", pro: "Priority Speed", founders: "Instant Real-Time" },
  { feature: "Human Portfolio Audits", audit: false, pro: false, founders: "Weekly Video Reviews" },
  { feature: "AG 1-on-1 Monthly Strategy", audit: false, pro: false, founders: "1x 45-Min Call" },
  { feature: "Exclusive Mastermind Discord", audit: false, pro: true, founders: true },
  { feature: "Client Outreach Proposals", audit: false, pro: false, founders: true },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleBilling = () => {
    setBillingCycle((c) => (c === "monthly" ? "annual" : "monthly"));
  };

  const getPrice = (monthlyPrice: number, annualMonthlyPrice: number) => {
    return billingCycle === "monthly" ? monthlyPrice : annualMonthlyPrice;
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-neon/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-neon bg-neon/10 border border-neon/20 animate-fade-up">
            Simple, Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white animate-fade-up [animation-delay:0.1s]">
            Invest in Yourself. <br />
            <span className="text-neon [text-shadow:0_0_20px_rgba(57,255,20,0.4)]">Pay for Results.</span>
          </h1>
          <p className="text-white/40 max-w-xl text-sm md:text-base leading-relaxed animate-fade-up [animation-delay:0.2s]">
            Choose a plan that fits your learning goals. All plans include automated AI skill validation. Save 20% by billing annually.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center gap-4 mt-8 bg-white/5 border border-white/10 p-1.5 rounded-2xl animate-fade-up [animation-delay:0.3s]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                billingCycle === "monthly" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                billingCycle === "annual" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Annual Billing
              <span className="absolute -top-3.5 -right-3 px-2 py-0.5 rounded bg-neon text-black text-[8px] font-black tracking-widest uppercase animate-bounce-slow">
                -20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-6xl mx-auto w-full px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Audit */}
          <div className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/15 hover:bg-[#111] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-white/30">Audit</span>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase bg-white/5 text-white/40 border border-white/5">Free Tier</span>
              </div>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl sm:text-5xl font-black text-white">$0</span>
                <span className="text-white/30 text-xs ml-2">/ month</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-8">
                Perfect for testing out the interactive chat interface and sampling curriculum modules.
              </p>
              
              {/* Divider */}
              <div className="h-px bg-white/5 my-6" />

              <ul className="flex flex-col gap-4 text-xs text-white/70">
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  1 Active Lesson at a time
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  Web Design Pathway only
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  Standard AI response speed
                </li>
                <li className="flex items-center gap-3 text-white/20 line-through">
                  Verifiable Certification
                </li>
                <li className="flex items-center gap-3 text-white/20 line-through">
                  Custom AI Roadmap Builder
                </li>
              </ul>
            </div>

            <Link
              href="/classroom?skill=web-design"
              className="mt-12 w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs text-center border border-white/5 transition-all duration-200"
            >
              Start Free Audit
            </Link>
          </div>

          {/* Card 2: Pro Student */}
          <div className="group relative flex flex-col justify-between p-8 rounded-3xl bg-neon/[0.01] border-2 border-neon/30 hover:border-neon bg-[#0d0d0d] transition-all duration-300 shadow-[0_0_30px_rgba(57,255,20,0.05)] hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] md:-translate-y-2">
            
            {/* Ribbon */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-neon text-black text-[9px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(57,255,20,0.4)]">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-neon">Pro Student</span>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase bg-neon/10 text-neon border border-neon/20">Full Access</span>
              </div>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  ${getPrice(29, 23)}
                </span>
                <span className="text-white/30 text-xs ml-2">/ month</span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed mb-8">
                Complete access to all pathways. Build real skills, generate custom curriculums, and get certified.
              </p>

              {/* Divider */}
              <div className="h-px bg-white/5 my-6" />

              <ul className="flex flex-col gap-4 text-xs text-white/80">
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  <strong>Unlimited</strong> AI mentor chats
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  Access to <strong>all 10+ skills</strong>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  <strong>Custom AI Roadmaps</strong>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  <strong>Verifiable Certificates</strong>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  Priority response times
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  Mastermind Discord access
                </li>
              </ul>
            </div>

            <Link
              href="/skills"
              className="mt-12 w-full py-4 rounded-2xl bg-neon text-black font-black text-xs text-center hover:scale-[1.02] active:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
            >
              Choose Pro Student
            </Link>
          </div>

          {/* Card 3: Founders Guild */}
          <div className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/15 hover:bg-[#111] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-white/30">Founders Guild</span>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase bg-white/5 text-white/40 border border-white/5">Strategic</span>
              </div>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  ${getPrice(99, 79)}
                </span>
                <span className="text-white/30 text-xs ml-2">/ month</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-8">
                Designed for builders scaling to $10k+/month. Combines AI training with 1-on-1 human review.
              </p>

              {/* Divider */}
              <div className="h-px bg-white/5 my-6" />

              <ul className="flex flex-col gap-4 text-xs text-white/70">
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  Everything in Pro Student
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  <strong>Weekly Video Audits</strong> by AG
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  <strong>1-on-1</strong> Strategic Call per month
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  Proposal & outreach templates
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-neon">✦</span>
                  Direct Slack/WhatsApp line
                </li>
              </ul>
            </div>

            <Link
              href="/skills"
              className="mt-12 w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs text-center border border-white/5 transition-all duration-200"
            >
              Join Founders Guild
            </Link>
          </div>

        </div>
      </section>

      {/* Plan Feature Comparison Table */}
      <section className="max-w-4xl mx-auto w-full px-6 py-16 relative z-10">
        <h2 className="text-2xl font-black text-white text-center mb-8">Compare All Features</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 font-bold text-white/40 uppercase tracking-widest">Feature Matrix</th>
                <th className="p-4 font-bold text-white/40 uppercase tracking-widest">Audit</th>
                <th className="p-4 font-bold text-neon uppercase tracking-widest">Pro</th>
                <th className="p-4 font-bold text-white/40 uppercase tracking-widest">Founders</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_MATRIX.map((row, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                  <td className="p-4 font-medium text-white/80">{row.feature}</td>
                  
                  {/* Audit cell */}
                  <td className="p-4 text-white/40">
                    {typeof row.audit === "boolean" ? (
                      row.audit ? "✓" : "—"
                    ) : (
                      row.audit
                    )}
                  </td>
                  
                  {/* Pro cell */}
                  <td className="p-4 font-semibold text-white/90">
                    {typeof row.pro === "boolean" ? (
                      row.pro ? <span className="text-neon">✓</span> : "—"
                    ) : (
                      row.pro
                    )}
                  </td>
                  
                  {/* Founders cell */}
                  <td className="p-4 text-white/60">
                    {typeof row.founders === "boolean" ? (
                      row.founders ? "✓" : "—"
                    ) : (
                      row.founders
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20 relative z-10">
        <h2 className="text-3xl font-black text-center text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-white/40 text-sm mb-12">
          Everything you need to know about Artificial University models.
        </p>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-4 h-4 text-white/30 transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? "rotate-45 text-neon" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                
                {/* Collapsible content area */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-60 border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-white/40 text-xs leading-relaxed bg-[#0d0d0d]/40">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Guarantee Block */}
      <section className="max-w-4xl mx-auto w-full px-6 pb-24 text-center relative z-10">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-3xl">🛡️</span>
          <h3 className="text-xl font-bold text-white mt-4 mb-2">14-Day Money-Back Guarantee</h3>
          <p className="text-white/45 text-xs max-w-md mx-auto leading-relaxed">
            Try Pro Student or Founders Guild risk-free. If you don&apos;t build a high-income skill pathway you feel proud of within 14 days, email our support and we will issue a full refund immediately. No questions asked.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
