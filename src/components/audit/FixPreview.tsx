"use client";

import React, { useState } from "react";
import { Lock, FileCode, ArrowRight, Users, ShieldAlert } from "lucide-react";

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

  // Prevent copying via keyboard shortcuts or context menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && ["c", "a", "x", "u", "s"].includes(e.key.toLowerCase())) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // Only expose the first 4 lines in plaintext; subsequent lines are obfuscated visual mockups in the DOM
  const rawLines = (activeTab === "jsonld" ? jsonLdSnippet : llmsTxtSnippet).split("\n");
  const visibleLines = rawLines.slice(0, 4);

  return (
    <div
      onKeyDown={handleKeyDown}
      onCopy={handleCopy}
      onCut={handleCopy}
      onContextMenu={(e) => e.preventDefault()}
      tabIndex={0}
      className="bg-velvet-950/90 rounded-[28px] border border-sage-border/90 p-6 sm:p-8 space-y-6 shadow-2xl relative select-none outline-none focus:outline-none"
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-sage-border/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-pista-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Auto-Generated Fix Preview
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-sage-muted">
            Pre-computed Schema.org and AI crawler files for <span className="font-mono text-white">{domain}</span>.
          </p>
        </div>

        {/* Tab Switcher (Notice: NO copy button) */}
        <div className="flex items-center p-1 bg-velvet-900 rounded-[14px] border border-sage-border">
          <button
            onClick={() => setActiveTab("jsonld")}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-[10px] transition-colors ${
              activeTab === "jsonld"
                ? "bg-white text-velvet-950 font-bold"
                : "text-sage-muted hover:text-white"
            }`}
          >
            schema.jsonld
          </button>
          <button
            onClick={() => setActiveTab("llms")}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-[10px] transition-colors ${
              activeTab === "llms"
                ? "bg-white text-velvet-950 font-bold"
                : "text-sage-muted hover:text-white"
            }`}
          >
            llms.txt
          </button>
        </div>
      </div>

      {/* Code Container with Hardened Anti-Copy & DOM Obfuscation */}
      <div
        className="relative rounded-[18px] bg-velvet-950 border border-sage-border/90 overflow-hidden font-mono text-xs text-pista-200 select-none shadow-inner"
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        {/* Code Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-velvet-900/90 border-b border-sage-border/80 text-[11px] text-sage-muted">
          <div className="flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5 text-pista-400" />
            <span>
              {activeTab === "jsonld"
                ? "Structured Schema.org Generator Output"
                : "Machine-Readable Markdown Manifest (/llms.txt)"}
            </span>
          </div>
          <span className="text-rose-400 font-mono text-[10px] flex items-center gap-1 font-semibold">
            <Lock className="w-3 h-3" />
            PROTECTED ASSET
          </span>
        </div>

        {/* Code Body - Obfuscated DOM preventing Ctrl+A / DevTools copying */}
        <div className="p-4 sm:p-5 max-h-[380px] overflow-hidden select-none pointer-events-none">
          <pre className="leading-relaxed whitespace-pre-wrap font-mono text-[11px] sm:text-xs text-pista-200/80">
            {visibleLines.join("\n")}
          </pre>

          {/* Obfuscated Blurred Tokens (not real plaintext in DOM) */}
          <div className="space-y-2 pt-2 blur-[6px] opacity-40 select-none pointer-events-none aria-hidden">
            <div className="h-3 w-4/5 rounded bg-pista-400/40" />
            <div className="h-3 w-2/3 rounded bg-pista-300/30" />
            <div className="h-3 w-5/6 rounded bg-pista-500/40" />
            <div className="h-3 w-3/4 rounded bg-pista-400/30" />
            <div className="h-3 w-1/2 rounded bg-pista-300/40" />
            <div className="h-3 w-4/6 rounded bg-pista-400/40" />
            <div className="h-3 w-3/5 rounded bg-pista-300/30" />
          </div>
        </div>

        {/* Frosted Glass Lock Gradient Over Center & Bottom */}
        <div className="absolute inset-x-0 bottom-0 top-[28%] bg-gradient-to-t from-velvet-950 via-velvet-950/95 to-transparent backdrop-blur-[6px] flex flex-col items-center justify-end p-6 sm:p-8 text-center select-none">
          <div className="max-w-md space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Full Code &amp; 1-Click Injection Locked</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Unlock Verified Schema Injection &amp; llms.txt
            </h4>

            <p className="text-xs text-sage-muted leading-relaxed">
              To prevent broken theme Liquid code, manual copying is disabled. Join the 1-click waitlist to claim your spot and automatically inject the schema when our 1,000-merchant launch threshold is reached.
            </p>

            <div className="pt-1">
              <button
                onClick={onConnectClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[16px] bg-white hover:bg-pista-100 text-velvet-950 font-bold text-sm shadow-[0_0_25px_rgba(134,239,172,0.35)] transition-all transform active:scale-95"
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
