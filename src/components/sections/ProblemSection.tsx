"use client";

import React from "react";
import { ShieldAlert, Bot, HelpCircle, ArrowRight, CornerDownRight, XCircle, CheckCircle } from "lucide-react";

export function ProblemSection() {
  return (
    <section id="problem" className="py-28 px-4 sm:px-8 max-w-6xl mx-auto space-y-16">
      {/* Section Narrative Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[14px] bg-velvet-950 border border-sage-border text-sage-muted text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span>02 THE INVISIBLE WALL</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Why Standard Shopify Themes Fail Modern AI Crawlers
        </h2>

        <p className="text-base sm:text-lg text-sage-muted leading-relaxed">
          AI search models optimize for certainty. When structured data has gaps, the recommendation engine defaults to your competitor.
        </p>
      </div>

      {/* 3D Depth Layer View: The Invisible Wall Simulation */}
      <div className="relative rounded-[28px] p-6 sm:p-10 bg-velvet-950 border border-sage-border shadow-2xl overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-rose-500/10 blur-[100px] pointer-events-none" />

        <div className="space-y-12">
          {/* Layer 1: The Merchant Return Policy Vacuum */}
          <div className="flex flex-col md:flex-row items-start gap-6 pb-10 border-b border-sage-border/70">
            <div className="w-full md:w-1/3 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-semibold tracking-wider">
                GAP 01 // CRITICAL
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                The Return Policy Vacuum
              </h3>
              <p className="text-xs font-mono text-sage-muted">
                Missing schema: Offer.hasMerchantReturnPolicy
              </p>
            </div>

            <div className="w-full md:w-2/3 space-y-3 bg-velvet-900/80 p-5 sm:p-6 rounded-[20px] border border-sage-border">
              <p className="text-sm text-sage-muted leading-relaxed">
                When a consumer asks Perplexity or ChatGPT: <strong className="text-white">&quot;Find me wool shoes with free returns under $100&quot;</strong>, the model does not read your FAQ page prose. It searches specifically for the <code className="text-pista-300 font-mono text-xs">hasMerchantReturnPolicy</code> schema attribute.
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-rose-300 font-mono">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Result: Store is omitted because AI cannot verify return terms.</span>
              </div>
            </div>
          </div>

          {/* Layer 2: The Shipping Blind Spot */}
          <div className="flex flex-col md:flex-row items-start gap-6 pb-10 border-b border-sage-border/70">
            <div className="w-full md:w-1/3 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                GAP 02 // HIGH IMPACT
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                The Shipping Blind Spot
              </h3>
              <p className="text-xs font-mono text-sage-muted">
                Missing schema: Offer.shippingDetails
              </p>
            </div>

            <div className="w-full md:w-2/3 space-y-3 bg-velvet-900/80 p-5 sm:p-6 rounded-[20px] border border-sage-border">
              <p className="text-sm text-sage-muted leading-relaxed">
                Conversational search engines frequently answer time-sensitive queries like <strong className="text-white">&quot;Can this arrive before Friday?&quot;</strong> or <strong className="text-white">&quot;Free shipping over $50&quot;</strong>. Without structured transit time and cost specifications in <code className="text-pista-300 font-mono text-xs">shippingDetails</code>, AI assistants refuse to hazard a guess.
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-amber-300 font-mono">
                <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Result: AI recommends Amazon or a competitor with structured shipping data.</span>
              </div>
            </div>
          </div>

          {/* Layer 3: The LLMs.txt Void */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-1/3 space-y-2">
              <span className="text-xs font-mono text-pista-400 font-semibold tracking-wider">
                GAP 03 // THE NEW OPEN STANDARD
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                The LLMs.txt Void
              </h3>
              <p className="text-xs font-mono text-sage-muted">
                Missing standard: /llms.txt manifest
              </p>
            </div>

            <div className="w-full md:w-2/3 space-y-3 bg-velvet-900/80 p-5 sm:p-6 rounded-[20px] border border-sage-border">
              <p className="text-sm text-sage-muted leading-relaxed">
                Modern AI crawlers operate on strict token budgets. Instead of parsing heavy HTML, scripts, and tracking tags, models like <strong className="text-white">GPTBot</strong> and <strong className="text-white">PerplexityBot</strong> actively check <code className="text-pista-300 font-mono text-xs">/llms.txt</code> for a curated markdown overview of your catalog.
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-pista-300 font-mono">
                <CheckCircle className="w-4 h-4 text-pista-400 shrink-0" />
                <span>With Indexable: An auto-generated /llms.txt is served directly to AI bots.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
