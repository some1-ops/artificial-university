"use client";

// ============================================================
// Terms of Service Page — /terms
// ============================================================

import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden flex-1">
        {/* Background glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-neon/5 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-neon transition-colors duration-200 mb-8"
          >
            ← Back to home
          </Link>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
            Terms of <span className="text-neon">Service</span>
          </h1>
          <p className="text-white/30 text-xs uppercase font-bold tracking-wider mb-8">
            Last Updated: June 8, 2026
          </p>

          {/* Document Content */}
          <div className="bg-white/[0.01] border border-white/5 p-6 md:p-10 rounded-3xl backdrop-blur-md flex flex-col gap-8 text-white/70 text-sm md:text-base leading-relaxed">

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the Artificial University platform (&quot;Service&quot;), you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not access or use the platform.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                2. Description of Service
              </h2>
              <p>
                Artificial University provides conversational, AI-driven education models designed to teach high-income skills (including Web Design, Dropshipping, and AI Integration). The content, roadmaps, and progress meters are generated dynamically by software agents.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                3. Subscriptions, Refunds & Cancellations
              </h2>
              <p className="mb-3">
                Access to premium pathways requires an active subscription:
              </p>
              <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                <li>
                  <strong className="text-white/90">Billing:</strong> Subscription payments are processed automatically on a recurring monthly or annual basis depending on your plan.
                </li>
                <li>
                  <strong className="text-white/90">Cancellations:</strong> You can cancel your subscription at any point. Your access will remain active until the end of the current billing term.
                </li>
                <li>
                  <strong className="text-white/90">Refunds:</strong> We provide a 14-day 100% money-back guarantee. If you are dissatisfied, request a refund within 14 days of your initial signup via <strong className="text-white">reach.agtech@gmail.com</strong>.
                </li>
              </ul>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                4. Intellectual Property
              </h2>
              <p>
                The designs, brand assets, code templates, curriculum logic, and AI prompt databases on this site are the exclusive property of Artificial University. You are granted a limited, personal, non-transferable license to use our materials strictly for individual learning.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                5. User Conduct
              </h2>
              <p>
                You agree not to reverse engineer the AI dialog prompts, overload our chat endpoints with bots, scrape site materials, or input harassing, malicious, or illegal content into the chat inputs. Violation of this clause will lead to immediate account termination without refund.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                6. Disclaimers & Limitation of Liability
              </h2>
              <p>
                The platform, including its AI responses, is provided on an &quot;as is&quot; basis. While our curriculum focuses on business systems, we do not guarantee specific monetary returns, salary levels, client acquisitions, or financial outcomes as a result of using our Service.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                7. Governing Law
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the user&apos;s registered jurisdiction.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
