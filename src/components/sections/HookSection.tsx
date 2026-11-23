"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function HookSection() {
  return (
    <section className="relative pt-36 pb-28 px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-10">
      {/* Narrative Lead */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[16px] bg-velvet-950 border border-sage-border text-sage-muted text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-pista-400 animate-pulse" />
          <span>THE SHIFT IN CONSUMER SEARCH</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12]">
          When AI Recommends What to Buy, 84% of Shopify Stores Are Invisible.
        </h1>

        <p className="text-base sm:text-xl text-sage-muted max-w-2xl mx-auto leading-relaxed">
          ChatGPT Search, Perplexity, and Google AI Overviews cite stores with verified return policies, shipping schemas, and machine-readable <code className="text-pista-300 font-mono text-sm px-1.5 py-0.5 rounded-[6px] bg-velvet-950 border border-sage-border">/llms.txt</code>.
        </p>
      </div>

      {/* Prominent High-Contrast Call to Action (Search Bar moved to /audit) */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/audit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-5 rounded-[20px] bg-white hover:bg-pista-100 text-velvet-950 font-extrabold text-base sm:text-lg tracking-tight shadow-[0_0_35px_rgba(134,239,172,0.38)] transition-all transform active:scale-95"
        >
          <span>Audit My Store Free</span>
          <ArrowRight className="w-5 h-5 text-velvet-950" />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-xs font-mono text-sage-muted">
        <ShieldCheck className="w-4 h-4 text-pista-400" />
        <span>Free live structured data diagnostic. No credit card or installation required.</span>
      </div>
    </section>
  );
}
