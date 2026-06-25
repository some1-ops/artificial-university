import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artificial University | by AG",
  description:
    "Master high-income skills like web design, dropshipping, and AI integration by chatting with your personalized AI mentor. No boring lectures — just rapid skill building.",
  keywords: ["AI learning", "web design", "dropshipping", "online education", "skill building", "AI mentor"],
  authors: [{ name: "AG" }],
  openGraph: {
    title: "Artificial University | by AG",
    description: "Traditional school is obsolete. Learn what actually matters.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body className="bg-[#050505] text-white antialiased font-sans selection:bg-cyan-500/30 selection:text-cyan-50">
        {children}
      </body>
    </html>
  );
}
