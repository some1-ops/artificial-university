"use client";

// ============================================================
// Contact Page — /contact
// ============================================================

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "support",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "support",
        message: "",
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6 overflow-hidden flex-1 flex items-center">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Info Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-neon bg-neon/10 border border-neon/20">
                  Got Questions?
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-3">
                  Let&apos;s <span className="text-neon">Connect.</span>
                </h1>
                <p className="text-white/40 text-sm leading-relaxed">
                  Have an issue with your roadmap, billing, or certificates? Or looking to collaborate on B2B skill training? Reach out to our operators. We respond to all transmissions in 4-6 hours.
                </p>
              </div>

              {/* Info Cards */}
              <div className="flex flex-col gap-4">
                
                {/* Email Support Card */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4 items-start">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">Email Support</h3>
                    <p className="text-white/40 text-xs mb-2">For billing and general inquiries.</p>
                    <a
                      href="mailto:support@artificial.university"
                      className="text-neon text-xs font-semibold hover:underline"
                    >
                      support@artificial.university
                    </a>
                  </div>
                </div>

                {/* Discord Mastermind Card */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4 items-start">
                  <span className="text-2xl">👾</span>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">Mastermind Discord</h3>
                    <p className="text-white/40 text-xs mb-2">Connect with 2k+ active student builders.</p>
                    <a
                      href="#"
                      className="text-neon text-xs font-semibold hover:underline"
                    >
                      Join Student Community →
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4 items-start">
                  <span className="text-2xl">🕒</span>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">Response Guarantee</h3>
                    <p className="text-white/40 text-xs">
                      24/7/365 AI routing. Human operators online Monday – Friday, 9:00 AM – 6:00 PM EST.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative bg-white/[0.02] border border-white/8 p-6 md:p-10 rounded-3xl backdrop-blur-md">
                
                {isSubmitted ? (
                  // Success State
                  <div className="text-center py-12 flex flex-col items-center gap-6 animate-fade-up">
                    <div className="w-16 h-16 rounded-full bg-neon/10 border border-neon flex items-center justify-center text-neon text-3xl shadow-[0_0_20px_rgba(57,255,20,0.3)] animate-bounce-slow">
                      ✓
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white">Transmission Received</h2>
                      <p className="mt-2 text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
                        Your message has been securely sent. A support agent or mentor strategist will review and reply within the next 4–6 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 rounded-xl bg-neon text-black font-black text-xs hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  // Form State
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {errorMsg && (
                      <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                        ⚠️ {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-white/50 text-xs font-bold uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Rivera"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-neon/50 focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all duration-300"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-white/50 text-xs font-bold uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. alex@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-neon/50 focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Subject Select */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-white/50 text-xs font-bold uppercase tracking-wider">
                        Inquiry Topic
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white text-sm focus:outline-none focus:border-neon/50 focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="support">General Technical Support</option>
                          <option value="billing">Billing & Subscription Issue</option>
                          <option value="business">Business / Strategic Partnership</option>
                          <option value="feedback">Platform Suggestion / Feedback</option>
                        </select>
                        {/* Custom Select Arrow */}
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-white/50 text-xs font-bold uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Write your transmission details here..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-neon/50 focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full py-4 rounded-xl bg-neon text-black font-black text-xs hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Sending Transmission...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
