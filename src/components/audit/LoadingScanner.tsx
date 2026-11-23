"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Terminal, CheckCircle2, ShieldCheck, Search } from "lucide-react";

interface LoadingScannerProps {
  domain: string;
}

const SCAN_STAGES = [
  "Connecting to store host & testing TLS handshake...",
  "Querying public /products.json catalog endpoint...",
  "Extracting <script type='application/ld+json'> tags...",
  "Interrogating /robots.txt for GPTBot & PerplexityBot...",
  "Checking /llms.txt AI crawler markdown standard...",
  "Auditing hasMerchantReturnPolicy & shippingDetails schema...",
  "Synthesizing 0–100 AI Readiness Score & automated fixes...",
];

export function LoadingScanner({ domain }: LoadingScannerProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev < SCAN_STAGES.length - 1 ? prev + 1 : prev));
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-velvet-950/90 rounded-[24px] border border-pista-400/40 p-8 sm:p-12 shadow-2xl text-center space-y-6 max-w-2xl mx-auto backdrop-blur-xl">
      {/* Animated Pulse Ring */}
      <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-pista-400/15 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-velvet-900 border border-pista-400/60 flex items-center justify-center text-pista-400 shadow-[0_0_30px_rgba(134,239,172,0.3)]">
          <Loader2 className="w-8 h-8 animate-spin text-pista-300" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[12px] bg-pista-400/10 border border-pista-400/25 text-pista-300 font-mono text-xs">
          <Search className="w-3.5 h-3.5" />
          <span>DEEP CRAWL IN PROGRESS // {domain}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Auditing AI Search Readiness & Schemas
        </h3>

        <p className="text-xs sm:text-sm text-sage-muted font-mono max-w-md mx-auto">
          {SCAN_STAGES[currentStageIndex]}
        </p>
      </div>

      {/* Progress step indicators */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {SCAN_STAGES.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx <= currentStageIndex
                ? "w-6 bg-pista-400 shadow-[0_0_8px_#4ade80]"
                : "w-2 bg-sage-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
