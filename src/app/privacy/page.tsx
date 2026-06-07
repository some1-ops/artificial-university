"use client";

// ============================================================
// Privacy Policy Page — /privacy
// ============================================================

import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function PrivacyPage() {
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
            Privacy <span className="text-neon">Policy</span>
          </h1>
          <p className="text-white/30 text-xs uppercase font-bold tracking-wider mb-8">
            Last Updated: June 8, 2026
          </p>

          {/* Document Content */}
          <div className="bg-white/[0.01] border border-white/5 p-6 md:p-10 rounded-3xl backdrop-blur-md flex flex-col gap-8 text-white/70 text-sm md:text-base leading-relaxed">
            
            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                1. Information We Collect
              </h2>
              <p className="mb-3">
                At Artificial University, we collect information to provide a better learning experience. This includes:
              </p>
              <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                <li>
                  <strong className="text-white/90">Account Information:</strong> If you sign up, we collect your email address and profile preferences.
                </li>
                <li>
                  <strong className="text-white/90">Chat Transcripts:</strong> We save your dialogue history with your AI mentors to maintain your learning progress.
                </li>
                <li>
                  <strong className="text-white/90">Usage Data:</strong> We track metrics like module completion speeds, test grades, and general engagement parameters.
                </li>
              </ul>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                2. How We Use Your Data
              </h2>
              <p className="mb-3">
                Your data is strictly utilized to facilitate your skill acquisition pathway. Specifically:
              </p>
              <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                <li>To customize the AI mentor's responses to your specific level.</li>
                <li>To auto-grade your inputs and generate verifiable certificates.</li>
                <li>To analyze platform utilization and fix layout or software issues.</li>
              </ul>
              <p className="mt-3 text-neon/80 font-semibold">
                We do not sell, trade, or share your data with advertisers or third parties.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                3. Cookies & Local Storage
              </h2>
              <p>
                We use cookies and browser local storage to keep you logged in and persist your active chat sessions. You can disable cookies in your browser settings, though some features (such as preserving message history between page changes) may not function.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                4. Data Security
              </h2>
              <p>
                We execute standard encryption practices to safeguard your accounts and data. However, no database transmission over the internet is 100% secure. We encourage you to use secure passwords and protect your account tokens.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                5. Your Rights & Contact
              </h2>
              <p>
                You have the right to request a complete deletion of your account details and message transcripts at any time. To request data deletion or ask questions regarding our privacy rules, please email us at <strong className="text-white">privacy@artificial.university</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
