"use client";

import React from "react";
import { AuditResult } from "@/lib/types";
import { ScoreGauge } from "@/components/audit/ScoreGauge";
import { AuditChecklist } from "@/components/audit/AuditChecklist";
import { FixPreview } from "@/components/audit/FixPreview";
import { WaitlistSection } from "@/components/sections/WaitlistSection";

interface CtaSectionProps {
  auditResult: AuditResult | null;
  onOpenWaitlistModal: (domain?: string) => void;
}

export function CtaSection({ auditResult, onOpenWaitlistModal }: CtaSectionProps) {
  const criticalCount = auditResult?.checks.filter((c) => c.status === "critical").length || 0;
  const warningCount = auditResult?.checks.filter((c) => c.status === "warning").length || 0;
  const passCount = auditResult?.checks.filter((c) => c.status === "pass").length || 0;

  return (
    <div className="space-y-20">
      {/* Live Audit Results View (When an audit runs) */}
      {auditResult && (
        <section id="results" className="py-12 px-4 sm:px-8 max-w-6xl mx-auto space-y-10 scroll-mt-24">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[14px] bg-velvet-950 border border-sage-border text-sage-muted text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-pista-400" />
              <span>LIVE AUDIT REPORT // {auditResult.domain.toUpperCase()}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Audit Breakdown &amp; AI Search Readiness
            </h2>

            <p className="text-xs sm:text-sm text-sage-muted font-mono">
              Scanned: <span className="text-white">{auditResult.targetUrl}</span>
            </p>
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
            <h3 className="text-lg font-bold text-white tracking-tight">
              Audit Checklist &amp; Revenue Impact
            </h3>
            <AuditChecklist checks={auditResult.checks} />
          </div>

          {/* Gated Fix Preview */}
          <FixPreview
            jsonLdSnippet={auditResult.generatedFix.jsonLdSnippet}
            llmsTxtSnippet={auditResult.generatedFix.llmsTxtSnippet}
            domain={auditResult.domain}
            onConnectClick={() => onOpenWaitlistModal(auditResult.domain)}
          />
        </section>
      )}

      {/* Robinhood-Style Milestone Waitlist (Replaces Pricing Section) */}
      <WaitlistSection />
    </div>
  );
}
