"use client";

import React, { useState } from "react";
import { Check, X, Sparkles, MessageSquare, ExternalLink, Bot, ArrowRight } from "lucide-react";

export function UseCaseSection() {
  const [activeEngine, setActiveEngine] = useState<"perplexity" | "chatgpt">("perplexity");

  return (
    <section id="usecase" className="py-28 px-4 sm:px-8 max-w-6xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[14px] bg-velvet-950 border border-sage-border text-sage-muted text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-pista-400" />
          <span>03 THE BEFORE &amp; AFTER REALITY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          From Hallucinated Anomaly to Top Recommended Entity
        </h2>

        <p className="text-base sm:text-lg text-sage-muted leading-relaxed">
          See how conversational AI shopping engines evaluate the exact same product before and after complete GEO structured data optimization.
        </p>

        {/* Engine switcher */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs font-mono text-sage-muted mr-1">Engine Simulation:</span>
          <button
            onClick={() => setActiveEngine("perplexity")}
            className={`px-3 py-1.5 rounded-[12px] text-xs font-mono transition-colors ${
              activeEngine === "perplexity"
                ? "bg-white text-velvet-950 font-bold"
                : "bg-velvet-950 text-sage-muted hover:text-white border border-sage-border"
            }`}
          >
            Perplexity Pro Search
          </button>
          <button
            onClick={() => setActiveEngine("chatgpt")}
            className={`px-3 py-1.5 rounded-[12px] text-xs font-mono transition-colors ${
              activeEngine === "chatgpt"
                ? "bg-white text-velvet-950 font-bold"
                : "bg-velvet-950 text-sage-muted hover:text-white border border-sage-border"
            }`}
          >
            ChatGPT Search
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Card 1: BEFORE (Unoptimized Shopify Store) */}
        <div className="rounded-[28px] p-6 sm:p-8 bg-velvet-950/90 border border-rose-500/20 shadow-2xl flex flex-col justify-between space-y-6 opacity-90 hover:opacity-100 transition-opacity">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-sage-border/60 pb-3">
              <span className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
                BEFORE INDEXABLE // DEFAULT SHOPIFY THEME
              </span>
              <span className="text-[11px] font-mono text-rose-400/80 px-2 py-0.5 rounded-[8px] bg-rose-500/10 border border-rose-500/20">
                0 Citations
              </span>
            </div>

            {/* Simulated Query */}
            <div className="p-3.5 rounded-[14px] bg-velvet-900 border border-sage-border text-xs text-sage-muted flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-sage-muted shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-medium block">
                  &quot;Find sustainable trail running shoes under $150 with free returns.&quot;
                </span>
                <span className="text-[10px] text-sage-muted/70 font-mono">
                  Prompt submitted to {activeEngine === "perplexity" ? "Perplexity AI" : "ChatGPT Search"}
                </span>
              </div>
            </div>

            {/* AI Engine Response */}
            <div className="p-4 rounded-[16px] bg-rose-950/15 border border-rose-500/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-300">
                <X className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Store Ignored / Omitted</span>
              </div>

              <p className="text-xs text-sage-muted leading-relaxed">
                <span className="line-through text-rose-400/60 font-semibold mr-1">Your Store Product:</span>
                I was unable to verify return policies or shipping terms for this merchant in structured data. Recommending alternative verified retailers with certified 30-day return policies instead.
              </p>

              <div className="space-y-1.5 pt-2 border-t border-rose-500/20 text-[11px] font-mono text-rose-300/80">
                <p>✗ Offer.hasMerchantReturnPolicy missing</p>
                <p>✗ Offer.shippingDetails missing</p>
                <p>✗ /llms.txt not published</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-[12px] bg-velvet-900 text-center text-xs font-mono text-rose-300">
            Estimated Impact: 84% reduction in AI search click-throughs
          </div>
        </div>

        {/* Card 2: AFTER (With Indexable Optimization) */}
        <div className="rounded-[28px] p-6 sm:p-8 bg-velvet-950 border border-pista-400/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(134,239,172,0.18)] flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pista-400/10 blur-[80px] pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-sage-border/80 pb-3">
              <span className="text-xs font-mono text-pista-400 font-semibold uppercase tracking-wider">
                AFTER INDEXABLE // AUTO-INJECTED GEO SCHEMA
              </span>
              <span className="text-[11px] font-mono text-pista-300 px-2.5 py-0.5 rounded-[8px] bg-pista-400/15 border border-pista-400/30 font-semibold">
                ✓ #1 Recommended Entity
              </span>
            </div>

            {/* Simulated Query */}
            <div className="p-3.5 rounded-[14px] bg-velvet-900 border border-sage-border text-xs text-sage-muted flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-pista-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-medium block">
                  &quot;Find sustainable trail running shoes under $150 with free returns.&quot;
                </span>
                <span className="text-[10px] text-pista-300 font-mono">
                  Cited across {activeEngine === "perplexity" ? "Perplexity Pro" : "ChatGPT Search"}
                </span>
              </div>
            </div>

            {/* AI Engine Rich Verified Product Entity */}
            <div className="p-4 sm:p-5 rounded-[18px] bg-gradient-to-b from-velvet-900 to-velvet-950 border border-pista-400/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white tracking-tight">
                  Top Recommended Pick
                </span>
                <span className="text-xs font-mono text-pista-400 font-bold">
                  $110.00 USD
                </span>
              </div>

              <p className="text-xs text-sage-muted leading-relaxed">
                Directly matches all criteria: Made with eco-friendly merino wool, verified in stock, and confirmed with a guaranteed 30-day free return window.
              </p>

              {/* Verified Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-pista-300">
                  <Check className="w-3.5 h-3.5 text-pista-400 shrink-0" />
                  <span>30-Day Free Returns</span>
                </div>
                <div className="flex items-center gap-1.5 text-pista-300">
                  <Check className="w-3.5 h-3.5 text-pista-400 shrink-0" />
                  <span>Ships in 2-3 Days</span>
                </div>
                <div className="flex items-center gap-1.5 text-pista-300">
                  <Check className="w-3.5 h-3.5 text-pista-400 shrink-0" />
                  <span>GTIN-13 Authenticated</span>
                </div>
                <div className="flex items-center gap-1.5 text-pista-300">
                  <Check className="w-3.5 h-3.5 text-pista-400 shrink-0" />
                  <span>/llms.txt Verified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-[12px] bg-pista-400/10 border border-pista-400/25 text-center text-xs font-mono text-pista-300 font-semibold">
            ✓ Full Entity Graph Injected &amp; Verified in Google + LLMs
          </div>
        </div>
      </div>
    </section>
  );
}
