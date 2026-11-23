"use client";

import React, { useState } from "react";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

interface HookSectionProps {
  onAudit: (url: string) => void;
  isLoading: boolean;
}

export function HookSection({ onAudit, isLoading }: HookSectionProps) {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onAudit(inputUrl.trim());
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-12">
      {/* Narrative Lead */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[16px] bg-velvet-950 border border-sage-border text-sage-muted text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-pista-400" />
          <span>01 THE SHIFT IN CONSUMER SEARCH</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          When AI Recommends What to Buy, 84% of Shopify Stores Are Invisible.
        </h1>

        <p className="text-base sm:text-lg text-sage-muted max-w-2xl mx-auto leading-relaxed">
          ChatGPT Search, Perplexity, and Google AI Overviews cite stores with verified return policies, shipping schemas, and machine-readable <code className="text-pista-300 font-mono text-sm px-1.5 py-0.5 rounded-[6px] bg-velvet-950 border border-sage-border">/llms.txt</code>. Audit your live store in 15 seconds.
        </p>
      </div>

      {/* The Hero Scanner (Enlarged Centerpiece with Concentric Radius) */}
      <div className="max-w-3xl mx-auto">
        <div className="rounded-[24px] p-2 bg-velvet-950 border border-sage-border/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(134,239,172,0.15)]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center gap-3 w-full px-4 py-3.5 rounded-[16px] bg-velvet-900 border border-sage-border/80 focus-within:border-pista-400/80 transition-colors">
              <Search className="w-5 h-5 text-sage-muted shrink-0" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter your live Shopify store URL (e.g. brand.com or brand.myshopify.com)"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-sage-muted/60 focus:outline-none font-mono"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputUrl.trim()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-[16px] bg-white hover:bg-pista-100 disabled:opacity-60 text-velvet-950 font-bold text-sm tracking-tight shrink-0 transition-all shadow-[0_0_20px_rgba(134,239,172,0.3)] active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{isLoading ? "Auditing Live Store..." : "Audit My Store Free"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-sage-muted">
          <ShieldCheck className="w-4 h-4 text-pista-400" />
          <span>Real-time crawler inspection. Free public audit &amp; structured data diagnostic.</span>
        </div>
      </div>

      {/* 3D Perspective Visual: Real-time Shopify Product Node Map */}
      <div className="pt-8 max-w-4xl mx-auto">
        <div className="relative rounded-[28px] p-6 sm:p-8 bg-gradient-to-b from-velvet-950 to-velvet-900/90 border border-sage-border/90 shadow-2xl text-left overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-pista-400/10 blur-[80px] pointer-events-none" />

          <div className="flex items-center justify-between border-b border-sage-border pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-pista-400" />
              <span className="text-xs font-mono text-sage-muted ml-2">
                INDEXABLE GEO CRAWLER ENGINE // LIVE VIEW
              </span>
            </div>
            <span className="text-xs font-mono text-pista-400">
              SCHEMA.ORG / JSON-LD / LLMS.TXT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-[16px] bg-velvet-900 border border-sage-border space-y-2">
              <div className="flex items-center justify-between text-sage-muted">
                <span>01 PRODUCT ENTITY</span>
                <span className="text-pista-400">FOUND</span>
              </div>
              <p className="text-white font-semibold">@type: &quot;Product&quot;</p>
              <p className="text-sage-muted text-[11px]">
                Valid title, brand, and SKU detected. Basic entity declaration passes.
              </p>
            </div>

            <div className="p-4 rounded-[16px] bg-rose-950/20 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between text-rose-300">
                <span>02 RETURN POLICY</span>
                <span className="text-rose-400 font-bold">MISSING</span>
              </div>
              <p className="text-white font-semibold">hasMerchantReturnPolicy</p>
              <p className="text-rose-200/70 text-[11px]">
                Null. AI shopping engines drop citation due to unverified consumer risk.
              </p>
            </div>

            <div className="p-4 rounded-[16px] bg-amber-950/20 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-amber-300">
                <span>03 AI CRAWLER MAP</span>
                <span className="text-amber-400 font-bold">NOT FOUND</span>
              </div>
              <p className="text-white font-semibold">/llms.txt manifest</p>
              <p className="text-amber-200/70 text-[11px]">
                Perplexity &amp; GPTBot scrape 10x slower without a concise markdown index.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
