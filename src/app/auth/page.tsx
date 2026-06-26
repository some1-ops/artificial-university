"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/profile");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username || email.split("@")[0],
            },
          },
        });
        if (error) throw error;
        // On success, redirect to profile or classroom
        router.push("/profile");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 font-black text-xl tracking-tighter">AU</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase">Operative Terminal</h1>
          <p className="text-sm text-white/40 mt-1 uppercase tracking-widest text-center">
            {isLogin ? "Authenticate to access the black market." : "Initialize your operative profile."}
          </p>
        </div>

        <form onSubmit={handleAuth} className="p-8 rounded-2xl bg-[#0a0a0c] border border-white/5 shadow-2xl flex flex-col gap-5">
          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-xs text-red-400 font-mono">ERROR: {error}</p>
            </div>
          )}

          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Codename (Username)</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                placeholder="User_0x94"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
              placeholder="operative@algeris.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Access Phrase (Password)</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            ) : (
              isLogin ? "Establish Connection" : "Initialize Operative"
            )}
          </button>

          <div className="w-full h-px bg-white/5 my-2"></div>

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-xs text-white/40 hover:text-cyan-400 transition-colors uppercase tracking-widest font-bold text-center"
          >
            {isLogin ? "No clearance? Request access." : "Already an operative? Establish connection."}
          </button>
        </form>
      </div>
    </div>
  );
}
