"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CrushedVelvetScene } from "@/components/3d/CrushedVelvetScene";
import { LoadingScanner } from "@/components/audit/LoadingScanner";
import { ScoreGauge } from "@/components/audit/ScoreGauge";
import { AuditChecklist } from "@/components/audit/AuditChecklist";
import { FixPreview } from "@/components/audit/FixPreview";
import { LeaderboardAndRewards } from "@/components/waitlist/LeaderboardAndRewards";
import { WaitlistModal } from "@/components/ui/WaitlistModal";
import { AuditResult } from "@/lib/types";
import { Search, ArrowRight, ShieldCheck, Sparkles, FileCode2 } from "lucide-react";

export default function AuditPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scannedDomain, setScannedDomain] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [showFixPreview, setShowFixPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Waitlist Modal
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setShowFixPreview(false);
    const domainCandidate = inputUrl.replace(/^https?:\/\//, "").split("/")[0];
    setScannedDomain(domainCandidate);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl.trim() }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Unable to complete store audit.");
      } else {
        setAuditResult(data);
      }
    } catch {
      setErrorMessage("Network error connecting to audit crawler. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const criticalCount = auditResult?.checks.filter((c) => c.status === "critical").length || 0;
  const warningCount = auditResult?.checks.filter((c) => c.status === "warning").length || 0;
  const passCount = auditResult?.checks.filter((c) => c.status === "pass").length || 0;

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <CrushedVelvetScene />
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-36 pb-28 space-y-16">
        {/* Dedicated Initial Screen: Centered Search Bar & Action Button */}
        {!auditResult && !isLoading && (
          <div className="max-w-2xl mx-auto text-center space-y-8 pt-8">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Audit Your Shopify Store
              </h1>
              <p className="text-sm sm:text-base text-sage-muted">
                Enter your live Shopify store domain or product URL to analyze AI search readiness.
              </p>
            </div>

            {/* The Single Focused Search Bar */}
            <div className="rounded-[24px] p-2 bg-velvet-950 border border-sage-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(134,239,172,0.15)]">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center gap-3 w-full px-4 py-3.5 rounded-[16px] bg-velvet-900 border border-sage-border focus-within:border-pista-400/80 transition-colors">
                  <Search className="w-5 h-5 text-sage-muted shrink-0" />
                  <input
                    type="text"
                    required
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Enter store URL (e.g. yourstore.com or product link)"
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-sage-muted/60 focus:outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputUrl.trim()}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-[16px] bg-white hover:bg-pista-100 disabled:opacity-60 text-velvet-950 font-bold text-sm tracking-tight shrink-0 transition-all shadow-[0_0_20px_rgba(134,239,172,0.3)] active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Audit My Store Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-sage-muted">
              <ShieldCheck className="w-4 h-4 text-pista-400" />
              <span>Full live crawl of JSON-LD, return policies, shipping terms &amp; robots.txt</span>
            </div>
          </div>
        )}

        {/* Loading Scanner State */}
        {isLoading && (
          <div className="py-12">
            <LoadingScanner domain={scannedDomain || "store"} />
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="max-w-md mx-auto p-4 rounded-[16px] bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono text-center">
            {errorMessage}
          </div>
        )}

        {/* Audit Results Breakdown */}
        {auditResult && !isLoading && (
          <div className="space-y-12">
            {/* Store Re-scan Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[20px] bg-velvet-950 border border-sage-border">
              <div className="text-left">
                <span className="text-[11px] font-mono text-pista-400 uppercase tracking-wider block">
                  AUDIT COMPLETE
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {auditResult.targetUrl}
                </span>
              </div>
              <button
                onClick={() => {
                  setAuditResult(null);
                  setShowFixPreview(false);
                }}
                className="px-4 py-2 rounded-[12px] bg-velvet-900 hover:bg-velvet-850 border border-sage-border text-xs font-mono text-sage-muted hover:text-white transition-colors"
              >
                Scan Another Store
              </button>
            </div>

            {/* Score Gauge */}
            <ScoreGauge
              score={auditResult.score}
              grade={auditResult.grade}
              gradeBadgeColor={auditResult.gradeBadgeColor}
              criticalCount={criticalCount}
              warningCount={warningCount}
              passCount={passCount}
            />

            {/* Grouped Findings */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Audit Checklist &amp; Revenue Impact
              </h3>
              <AuditChecklist checks={auditResult.checks} />
            </div>

            {/* Action Button: Auto Generated Fix */}
            {!showFixPreview ? (
              <div className="p-8 rounded-[24px] bg-velvet-950 border border-pista-400/30 text-center space-y-4 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-pista-400/15 text-pista-400 flex items-center justify-center mx-auto">
                  <FileCode2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Structured Data &amp; llms.txt Fix Ready
                  </h3>
                  <p className="text-xs sm:text-sm text-sage-muted max-w-md mx-auto">
                    We synthesized the exact missing Schema.org JSON-LD definitions and /llms.txt manifest for {auditResult.domain}.
                  </p>
                </div>
                <button
                  onClick={() => setShowFixPreview(true)}
                  className="px-8 py-4 rounded-[16px] bg-white hover:bg-pista-100 text-velvet-950 font-extrabold text-sm shadow-[0_0_25px_rgba(134,239,172,0.35)] transition-all active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Preview Auto-Generated Fix</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Non-Copyable Fix Preview Container */
              <div className="space-y-6 animate-in fade-in duration-300">
                <FixPreview
                  jsonLdSnippet={auditResult.generatedFix.jsonLdSnippet}
                  llmsTxtSnippet={auditResult.generatedFix.llmsTxtSnippet}
                  domain={auditResult.domain}
                  onConnectClick={() => setIsWaitlistModalOpen(true)}
                />
              </div>
            )}

            {/* Robinhood-Style Leaderboard & Rewards Thresholds */}
            <LeaderboardAndRewards />
          </div>
        )}
      </div>

      {/* Robinhood VIP Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        initialDomain={scannedDomain}
      />
    </main>
  );
}
