"use client";

import React, { useState } from "react";
import { Check, Copy, Lock, FileCode, ArrowRight, Users } from "lucide-react";

interface FixPreviewProps {
  jsonLdSnippet: string;
  llmsTxtSnippet: string;
  domain: string;
  onConnectClick: () => void;
}

export function FixPreview({
  jsonLdSnippet,
  llmsTxtSnippet,
  domain,
  onConnectClick,
}: FixPreviewProps) {
  const [activeTab, setActiveTab] = useState<"jsonld" | "llms">("jsonld");
  const [copied, setCopied] = useState(false);

  const activeCode = activeTab === "jsonld" ? jsonLdSnippet : llmsTxtSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-velvet-950/80 rounded-[24px] border border-sage-border/90 p-6 sm:p-8 space-y-6 shadow-2xl relative">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-sage-border/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-pista-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Auto-Generated Fix Preview
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-sage-muted">
            Pre-computed Schema.org and AI crawler files ready for {domain}.
          </p>
        </div>

        {/* Tab Switcher & Copy */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-velvet-900 rounded-[14px] border border-sage-border">
            <button
              onClick={() => setActiveTab("jsonld")}
              className={`px-3 py-1.5 text-xs font-mono rounded-[10px] transition-colors ${
                activeTab === "jsonld"
                  ? "bg-white text-velvet-950 font-semibold"
                  : "text-sage-muted hover:text-white"
              }`}
            >
              schema.jsonld
            </button>
            <button
              onClick={() => setActiveTab("llms")}
              className={`px-3 py-1.5 text-xs font-mono rounded-[10px] transition-colors ${
                activeTab === "llms"
                  ? "bg-white text-velvet-950 font-semibold"
                  : "text-sage-muted hover:text-white"
              }`}
            >
              llms.txt
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-velvet-900 hover:bg-velvet-850 border border-sage-border text-xs text-sage-muted hover:text-white transition-colors"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-pista-400" />
                <span className="text-pista-300 font-mono text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Container with Blurred Lock */}
      <div className="relative rounded-[16px] bg-velvet-950 border border-sage-border/90 overflow-hidden font-mono text-xs text-pista-100 shadow-inner">
        {/* Code Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-velvet-900/90 border-b border-sage-border/80 text-[11px] text-sage-muted">
          <div className="flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5 text-pista-400" />
            <span>
              {activeTab === "jsonld"
                ? "Auto-Injected Return & Shipping Schema"
                : "Machine-Readable Markdown Manifest (/llms.txt)"}
            </span>
          </div>
          <span className="text-pista-400/80">VALIDATED SCHEMA.ORG v26.0</span>
        </div>

        {/* Code Body */}
        <div className="p-4 sm:p-5 max-h-[380px] overflow-hidden select-none">
          <pre className="leading-relaxed whitespace-pre-wrap font-mono text-[11px] sm:text-xs">
            {activeCode}
          </pre>
        </div>

        {/* Frosted Glass Lock Gradient Over Bottom Half */}
        <div className="absolute inset-x-0 bottom-0 top-[35%] bg-gradient-to-t from-velvet-950 via-velvet-950/90 to-transparent backdrop-blur-[4px] flex flex-col items-center justify-end p-6 sm:p-8 text-center">
          <div className="max-w-md space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-pista-400/10 border border-pista-400/30 text-pista-300 text-xs font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>Unlocks at 1,000 Verified Shopify Merchants</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Automated 1-Click Theme Injection Engine
            </h4>

            <p className="text-xs text-sage-muted leading-relaxed">
              Don’t manually edit theme Liquid files or risk breaking updates. Join the waitlist to receive priority access to automated sync once our cohort milestone is reached.
            </p>

            <div className="pt-2">
              <button
                onClick={onConnectClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[16px] bg-white hover:bg-pista-100 text-velvet-950 font-bold text-sm shadow-[0_0_25px_rgba(134,239,172,0.35)] transition-all transform active:scale-95"
              >
                <span>Join the 1-Click Injection Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
