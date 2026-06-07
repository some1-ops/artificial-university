import Link from "next/link";

// ============================================================
// Footer.tsx — Minimalist branded footer
// ============================================================

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-neon/10 border border-neon/20 flex items-center justify-center">
            <span className="text-neon font-black text-[10px]">AU</span>
          </div>
          <span className="text-white/30 text-sm font-medium">
            artificial university <span className="text-white/15">·</span>{" "}
            <span className="text-neon/60">by AG</span>
          </span>
        </div>

        {/* Legal + links */}
        <div className="flex items-center gap-6 text-xs text-white/20">
          <Link href="/privacy" className="hover:text-white/40 transition-colors duration-200">Privacy</Link>
          <Link href="/terms" className="hover:text-white/40 transition-colors duration-200">Terms</Link>
          <Link href="/contact" className="hover:text-white/40 transition-colors duration-200">Contact</Link>
        </div>

        {/* Copyright */}
        <p className="text-white/15 text-xs">
          © {new Date().getFullYear()} Artificial University. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
