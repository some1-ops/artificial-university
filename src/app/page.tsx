// ============================================================
// Landing Page — /
// ============================================================

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />

      {/* Skills marquee strip */}
      <section className="py-16 border-y border-white/5 overflow-hidden">
        <div className="flex items-center gap-0">
          {/* Marquee — duplicate for seamless loop */}
          {[0, 1].map((clone) => (
            <div
              key={clone}
              className="flex items-center gap-12 shrink-0 animate-marquee"
              aria-hidden={clone === 1}
            >
              {[
                "Forex Trading",
                "Web Design",
                "AI OFM",
                "Dropshipping",
                "YouTube Automation",
                "AI Integration",
                "Copywriting",
                "Growth Marketing",
                "Brand Strategy",
                "Sales Funnels",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-neon text-sm">✦</span>
                  <span className="text-white/25 text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA section */}
      <section className="py-24 px-6 flex flex-col items-center text-center gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Your AI mentor is{" "}
            <span className="text-neon [text-shadow:0_0_20px_rgba(57,255,20,0.4)]">waiting.</span>
          </h2>
          <p className="mt-4 text-white/40 text-base md:text-lg leading-relaxed">
            Stop consuming. Start building. Every chat session moves you closer to earning.
          </p>
        </div>
        <a
          href="/skills"
          id="bottom-cta"
          className="px-8 py-4 rounded-xl bg-neon text-black font-black text-base tracking-tight transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] active:scale-100"
        >
          Start Chatting. Start Earning.
        </a>
      </section>

      <Footer />
    </main>
  );
}
