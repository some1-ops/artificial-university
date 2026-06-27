"use client";

import { useState, useEffect, useRef } from "react";

interface KtlGauntletProps {
  onSuccess: () => void;
  onFailure: () => void;
  onClose: () => void;
}

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function KtlGauntlet({ onSuccess, onFailure, onClose }: KtlGauntletProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<"playing" | "passed" | "failed">("playing");
  
  // KTL Selection States
  const [keyLevel, setKeyLevel] = useState("");
  const [killzone, setKillzone] = useState("");
  const [liquidity, setLiquidity] = useState("");

  // Chart data
  const [candles, setCandles] = useState<Candle[]>([
    { time: "08:00", open: 1.0950, high: 1.0965, low: 1.0945, close: 1.0960 },
    { time: "08:15", open: 1.0960, high: 1.0980, low: 1.0955, close: 1.0975 },
    { time: "08:30", open: 1.0975, high: 1.0978, low: 1.0940, close: 1.0945 }, // Hunt low
    { time: "08:45", open: 1.0945, high: 1.0995, low: 1.0940, close: 1.0990 }, // QML structure high
    { time: "09:00", open: 1.0990, high: 1.1005, low: 1.0985, close: 1.1000 }, // High
    { time: "09:15", open: 1.1000, high: 1.1005, low: 1.0920, close: 1.0930 }, // Break structural low (QML setup)
    { time: "09:30", open: 1.0930, high: 1.0965, low: 1.0925, close: 1.0960 }, // Retrace
  ]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  // Timer Countdown
  useEffect(() => {
    if (gameState !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleFailure("Time Ran Out! Market crashed before order placement.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Tick chart animation to simulate active trading environment
  useEffect(() => {
    if (gameState !== "playing") return;

    tickRef.current = setInterval(() => {
      setCandles((prev) => {
        const last = prev[prev.length - 1];
        // Create subtle fluctuations
        const change = (Math.random() - 0.5) * 0.0006;
        const newClose = parseFloat((last.close + change).toFixed(4));
        const newHigh = Math.max(last.high, newClose);
        const newLow = Math.min(last.low, newClose);

        const updated = [...prev];
        updated[updated.length - 1] = {
          ...last,
          close: newClose,
          high: newHigh,
          low: newLow,
        };
        return updated;
      });
    }, 400);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [gameState]);

  const handleExecute = () => {
    // Correct choices:
    // Key Level: QML (Quasimodo Level)
    // Time Killzone: New York Killzone (FOMC is always NY afternoon)
    // Liquidity Target: External Range Liquidity (ERL)
    if (
      keyLevel === "qml" &&
      killzone === "ny" &&
      liquidity === "erl"
    ) {
      handleSuccess();
    } else {
      let reason = "Axis mismatch: ";
      if (keyLevel !== "qml") reason += "Wrong Key Level identified. ";
      if (killzone !== "ny") reason += "Incorrect session Killzone. ";
      if (liquidity !== "erl") reason += "Wrong Liquidity target. ";
      handleFailure(reason);
    }
  };

  const handleSuccess = () => {
    setGameState("passed");
    // Add custom big candle shoot up/down to show successful trade trigger
    setCandles((prev) => [
      ...prev,
      { time: "09:45", open: 1.0960, high: 1.1080, low: 1.0955, close: 1.1070 } // Huge winning candle
    ]);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  const handleFailure = (reason: string) => {
    setGameState("failed");
    // Add massive red crash candle
    setCandles((prev) => [
      ...prev,
      { time: "09:45", open: 1.0960, high: 1.0965, low: 1.0750, close: 1.0760 } // Account blow-up candle
    ]);
    setTimeout(() => {
      onFailure();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl bg-[#09090b] border-2 border-red-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.25)] flex flex-col h-[600px] md:h-[650px]">
        
        {/* Header bar */}
        <div className="flex-shrink-0 bg-red-950/20 border-b border-red-500/20 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-red-500">Gauntlet Active: Live Market Crash (FOMC Axis)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-bold text-white/40">MARGIN: $10,000</span>
            <button 
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>

        {/* Game Main Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Chart Area */}
          <div className="flex-1 flex flex-col p-4 bg-[#050507] relative">
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 border border-white/5 flex items-center gap-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Time Remaining:</span>
              <span className={`font-mono font-bold text-sm ${timeLeft <= 15 ? "text-red-500 animate-pulse" : "text-white"}`}>{timeLeft}s</span>
            </div>

            {/* Simulated TradingView Chart */}
            <div className="flex-1 w-full border border-white/5 rounded-2xl relative bg-[#09090c] p-6 flex flex-col justify-between overflow-hidden">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-wider flex gap-4">
                <span>EURUSD, 15m</span>
                <span className="text-emerald-400">H: 1.1005</span>
                <span className="text-red-400">L: 1.0920</span>
                <span className="text-cyan-400 font-bold">LIVE RATE: {candles[candles.length - 1].close}</span>
              </div>

              {/* Graphical Chart Elements */}
              <div className="flex-1 flex items-end justify-around pb-8 pt-4 h-full relative">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-full h-px bg-white" />
                  ))}
                </div>

                {/* Quasimodo Level (QML) line visualization */}
                {gameState === "playing" && (
                  <div className="absolute left-0 right-0 top-[28%] border-t border-dashed border-cyan-500/40 z-10">
                    <span className="absolute right-2 -top-2.5 bg-[#09090c] px-1 text-[8px] font-mono text-cyan-400 tracking-wider">INSTITUTIONAL QML PRE-TRIGGER LEVEL (1.0990)</span>
                  </div>
                )}

                {/* Candles list */}
                {candles.map((candle, idx) => {
                  const isGreen = candle.close >= candle.open;
                  // Map coordinates proportionally
                  const baseH = 200;
                  const priceMin = 1.0700;
                  const priceMax = 1.1100;
                  const scale = (val: number) => ((val - priceMin) / (priceMax - priceMin)) * baseH;

                  const openY = scale(candle.open);
                  const closeY = scale(candle.close);
                  const highY = scale(candle.high);
                  const lowY = scale(candle.low);

                  const bodyHeight = Math.max(Math.abs(closeY - openY), 4);
                  const bodyBottom = Math.min(openY, closeY);

                  return (
                    <div key={idx} className="flex flex-col items-center w-8 relative" style={{ height: `${baseH}px` }}>
                      {/* Wick */}
                      <div 
                        className={`absolute w-0.5 ${isGreen ? "bg-emerald-500" : "bg-red-500"}`} 
                        style={{
                          bottom: `${lowY}px`,
                          height: `${highY - lowY}px`
                        }}
                      />
                      {/* Body */}
                      <div 
                        className={`absolute w-4 rounded-[1px] transition-all duration-300 ${
                          isGreen 
                            ? "bg-emerald-500 border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                            : "bg-red-500 border border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                        }`} 
                        style={{
                          bottom: `${bodyBottom}px`,
                          height: `${bodyHeight}px`
                        }}
                      />
                      {/* Time Marker */}
                      <span className="absolute -bottom-6 text-[9px] font-mono text-white/20">{candle.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Controls Panel */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/5 p-6 bg-[#09090b] flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-white font-bold text-sm">Align the KTL Axis</h3>
                <p className="text-[10px] text-white/40 mt-1 leading-relaxed">FOMC is hunting liquidity. Set the exact levels to target institutional fills before the news wipes out standard orders.</p>
              </div>

              {/* Selector 1: Key Levels */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest">Key Level (K)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "support", label: "Support" },
                    { id: "resistance", label: "Resistance" },
                    { id: "qml", label: "QML" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => gameState === "playing" && setKeyLevel(opt.id)}
                      className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                        keyLevel === opt.id 
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40" 
                          : "bg-white/[0.01] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Time Killzone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest">Time Killzone (T)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "asia", label: "Asia" },
                    { id: "london", label: "London" },
                    { id: "ny", label: "New York" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => gameState === "playing" && setKillzone(opt.id)}
                      className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                        killzone === opt.id 
                          ? "bg-violet-500/10 text-violet-400 border-violet-500/40" 
                          : "bg-white/[0.01] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 3: Liquidity target */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest">Liquidity Hunt (L)</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "irl", label: "Internal (IRL)" },
                    { id: "erl", label: "External (ERL)" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => gameState === "playing" && setLiquidity(opt.id)}
                      className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                        liquidity === opt.id 
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/40" 
                          : "bg-white/[0.01] border-white/5 text-white/40 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Execution status screen / button */}
            <div className="mt-6">
              {gameState === "playing" ? (
                <button
                  onClick={handleExecute}
                  disabled={!keyLevel || !killzone || !liquidity}
                  className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    keyLevel && killzone && liquidity
                      ? "bg-gradient-to-r from-red-500 to-amber-600 text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:scale-[1.02]"
                      : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                  }`}
                >
                  Execute KTL sniper
                </button>
              ) : gameState === "passed" ? (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center animate-fade-up">
                  <span className="text-xl">🏆</span>
                  <h4 className="text-sm font-black text-emerald-400 mt-1 uppercase tracking-wider">Trade Success!</h4>
                  <p className="text-[10px] text-white/60 mt-1">Verified: +4.2% simulated profit. Capital unlocked!</p>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-center animate-fade-up">
                  <span className="text-xl">💥</span>
                  <h4 className="text-sm font-black text-red-500 mt-1 uppercase tracking-wider">Account Blown</h4>
                  <p className="text-[10px] text-white/60 mt-1">Margin Call triggered. Retry the module.</p>
                  <button
                    onClick={() => {
                      setGameState("playing");
                      setTimeLeft(60);
                      setKeyLevel("");
                      setKillzone("");
                      setLiquidity("");
                      setCandles([
                        { time: "08:00", open: 1.0950, high: 1.0965, low: 1.0945, close: 1.0960 },
                        { time: "08:15", open: 1.0960, high: 1.0980, low: 1.0955, close: 1.0975 },
                        { time: "08:30", open: 1.0975, high: 1.0978, low: 1.0940, close: 1.0945 },
                        { time: "08:45", open: 1.0945, high: 1.0995, low: 1.0940, close: 1.0990 },
                        { time: "09:00", open: 1.0990, high: 1.1005, low: 1.0985, close: 1.1000 },
                        { time: "09:15", open: 1.1000, high: 1.1005, low: 1.0920, close: 1.0930 },
                        { time: "09:30", open: 1.0930, high: 1.0965, low: 1.0925, close: 1.0960 },
                      ]);
                    }}
                    className="mt-3 px-3 py-1.5 bg-red-500/20 border border-red-500/40 text-red-400 text-[9px] font-black tracking-widest uppercase rounded hover:bg-red-500/30 transition-colors cursor-pointer"
                  >
                    Reset Challenge
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
