"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CrushedVelvetScene } from "@/components/3d/CrushedVelvetScene";
import { HookSection } from "@/components/sections/HookSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { UseCaseSection } from "@/components/sections/UseCaseSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { LoadingScanner } from "@/components/audit/LoadingScanner";
import { WaitlistModal } from "@/components/ui/WaitlistModal";
import { AuditResult } from "@/lib/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [scannedDomain, setScannedDomain] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Robinhood Waitlist Modal State
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [selectedDomainForModal, setSelectedDomainForModal] = useState("");

  const handleAudit = async (targetUrl: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    const domainCandidate = targetUrl.replace(/^https?:\/\//, "").split("/")[0];
    setScannedDomain(domainCandidate);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Unable to complete store audit.");
      } else {
        setAuditResult(data);
        setTimeout(() => {
          const resultsElem = document.getElementById("results");
          if (resultsElem) {
            resultsElem.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    } catch {
      setErrorMessage("Network error while connecting to audit engine. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenWaitlistModal = (domain?: string) => {
    if (domain) setSelectedDomainForModal(domain);
    setIsWaitlistModalOpen(true);
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Dynamic 3D Crushed Velvet Sheen & Atmosphere */}
      <CrushedVelvetScene />

      {/* Navigation */}
      <Navbar
        onScanClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onWaitlistClick={() => {
          const waitlistElem = document.getElementById("waitlist");
          if (waitlistElem) {
            waitlistElem.scrollIntoView({ behavior: "smooth" });
          } else {
            setIsWaitlistModalOpen(true);
          }
        }}
      />

      <div className="relative z-10 space-y-12">
        {/* Stage 1: The Hook & Core Scanner */}
        <HookSection onAudit={handleAudit} isLoading={isLoading} />

        {/* Loading Scanner Overlay (During Active Deep Crawl) */}
        {isLoading && (
          <div className="py-12 px-4">
            <LoadingScanner domain={scannedDomain || "store"} />
          </div>
        )}

        {/* Error notification if any */}
        {errorMessage && (
          <div className="max-w-md mx-auto p-4 rounded-[16px] bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono text-center">
            {errorMessage}
          </div>
        )}

        {/* Stage 2: The Problem (The Invisible Wall) */}
        <ProblemSection />

        {/* Stage 3: The Use Case (Before & After Reality) */}
        <UseCaseSection />

        {/* Stage 4: Live Results & Robinhood-Style Waitlist */}
        <CtaSection
          auditResult={auditResult}
          onOpenWaitlistModal={handleOpenWaitlistModal}
        />
      </div>

      {/* Robinhood-Style VIP Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        initialDomain={selectedDomainForModal}
      />
    </main>
  );
}
