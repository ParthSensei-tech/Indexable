"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Check, Users, Sparkles, Copy, Store, Mail, Gift } from "lucide-react";
import { LeaderboardAndRewards } from "@/components/waitlist/LeaderboardAndRewards";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [storeDomain, setStoreDomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupData, setSignupData] = useState<{
    position: number;
    totalSignups: number;
    remainingSpots: number;
    referralCode: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Live stats starting at 100
  const [stats, setStats] = useState({
    currentSignups: 100,
    targetMilestone: 1000,
    remainingSpots: 900,
  });

  useEffect(() => {
    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.currentSignups) {
          setStats(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, storeDomain }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Unable to join waitlist. Please try again.");
      } else {
        setSignupData({
          position: data.position,
          totalSignups: data.totalSignups,
          remainingSpots: data.remainingSpots,
          referralCode: data.referralCode,
        });
        setStats((prev) => ({
          ...prev,
          currentSignups: data.totalSignups,
          remainingSpots: data.remainingSpots,
        }));
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReferral = () => {
    if (!signupData) return;
    const refUrl = `https://indexable.dev/join?ref=${signupData.referralCode}`;
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.min(
    100,
    Math.round((stats.currentSignups / stats.targetMilestone) * 100)
  );

  return (
    <section id="waitlist" className="py-28 px-4 sm:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[16px] bg-velvet-950 border border-sage-border text-sage-muted text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-pista-400 animate-pulse" />
          <span>EARLY ACCESS &amp; AUTOMATION UNLOCK</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Automated 1-Click Injection Unlocks at 1,000 Verified Shopify Merchants
        </h2>

        <p className="text-base sm:text-lg text-sage-muted leading-relaxed">
          We are deploying automated theme injection in verified cohorts. Join the waitlist to secure your spot. Once we reach 1,000 stores, the 1-click sync engine goes live for all waitlist members.
        </p>
      </div>

      {/* Robinhood-Style Milestone Meter Starting from 100 */}
      <div className="rounded-[28px] p-6 sm:p-8 bg-velvet-950 border border-sage-border shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sage-border/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-pista-400/15 border border-pista-400/30 flex items-center justify-center text-pista-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-sage-muted uppercase tracking-wider block">
                Cohort Milestone Tracker
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                {stats.currentSignups.toLocaleString()} / {stats.targetMilestone.toLocaleString()} Verified Stores
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-[12px] bg-pista-400/10 border border-pista-400/30 text-pista-300 font-mono text-xs">
            <span>{stats.remainingSpots} Spots Left to Unlock</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 rounded-full bg-velvet-900 border border-sage-border overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pista-500 to-pista-300 shadow-[0_0_12px_#4ade80] transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-sage-muted">
            <span>Progress: {progressPercent}% of Launch Capacity</span>
            <span>Target: 1,000 Stores</span>
          </div>
        </div>

        {/* Interactive Signup Form / Confirmation Card */}
        {!signupData ? (
          <form onSubmit={handleSubmit} className="pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono text-sage-muted">
                  Your Shopify Store Domain
                </label>
                <div className="flex items-center gap-2 rounded-[16px] bg-velvet-900 border border-sage-border/90 px-3.5 py-3 focus-within:border-pista-400 transition-colors">
                  <Store className="w-4 h-4 text-sage-muted shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="yourstore.com or store.myshopify.com"
                    value={storeDomain}
                    onChange={(e) => setStoreDomain(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-sage-muted/60 focus:outline-none font-mono"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono text-sage-muted">
                  Merchant Work Email
                </label>
                <div className="flex items-center gap-2 rounded-[16px] bg-velvet-900 border border-sage-border/90 px-3.5 py-3 focus-within:border-pista-400 transition-colors">
                  <Mail className="w-4 h-4 text-sage-muted shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="owner@yourstore.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-sage-muted/60 focus:outline-none font-mono"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs font-mono text-rose-400 text-center">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !email || !storeDomain}
              className="w-full py-4 rounded-[16px] bg-white hover:bg-pista-100 disabled:opacity-60 text-velvet-950 font-bold text-sm tracking-tight shadow-[0_0_25px_rgba(134,239,172,0.35)] transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{isSubmitting ? "Securing Your Spot..." : "Claim Your Spot on the 1-Click Waitlist"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-sage-muted font-mono">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-pista-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-pista-400" />
                Guaranteed early cohort access
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-pista-400" />
                Safe App Embed injection
              </span>
            </div>
          </form>
        ) : (
          /* Robinhood-Style Position Reveal */
          <div className="pt-4 text-center space-y-6">
            <div className="p-6 rounded-[20px] bg-velvet-900 border border-pista-400/40 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-pista-400/20 text-pista-300 font-mono text-xs font-bold border border-pista-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                SPOT SECURED // WELCOME TO THE COHORT
              </span>

              <div className="space-y-1">
                <p className="text-xs font-mono text-sage-muted uppercase tracking-wider">
                  Your Verified Queue Position
                </p>
                <h3 className="text-5xl sm:text-6xl font-extrabold font-mono text-white tracking-tight">
                  #{signupData.position}
                </h3>
                <p className="text-xs text-pista-300 font-mono">
                  ahead of {(1000 - signupData.position)} upcoming merchants
                </p>
              </div>

              <p className="text-xs sm:text-sm text-sage-muted max-w-md mx-auto leading-relaxed">
                When we cross 1,000 signups, we will notify you at <strong className="text-white font-mono">{email}</strong> to activate your 1-click theme injection with zero coding required.
              </p>
            </div>

            {/* Viral Referral Link */}
            <div className="p-4 sm:p-5 rounded-[18px] bg-velvet-900/60 border border-sage-border max-w-lg mx-auto space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  Move Up 50 Spots Per Referral
                </span>
                <span className="font-mono text-pista-400 text-[11px]">
                  SIGNUP PRIORITY ACCESS
                </span>
              </div>
              <p className="text-[11px] text-sage-muted">
                Share this link with other Shopify store founders. Every verified signup moves your store up the deployment queue:
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-full bg-velvet-950 px-3 py-2 rounded-[12px] border border-sage-border font-mono text-xs text-pista-300 truncate">
                  https://indexable.dev/join?ref={signupData.referralCode}
                </div>
                <button
                  onClick={handleCopyReferral}
                  className="px-3.5 py-2 rounded-[12px] bg-white text-velvet-950 font-bold text-xs shrink-0 flex items-center gap-1 active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Leaderboard & Rewards Thresholds */}
      <LeaderboardAndRewards />

      {/* Trust & Guarantee */}
      <div className="text-center pt-8 border-t border-sage-border/60 space-y-2">
        <p className="text-xs text-sage-muted font-mono">
          INDEXABLE © 2026 // SHOPIFY GENERATIVE ENGINE OPTIMIZATION ENGINE
        </p>
        <p className="text-[11px] text-sage-muted/70">
          Public Auditor &amp; Fix Generator is 100% free. Automated injection rolling out after 1,000 verified signups.
        </p>
      </div>
    </section>
  );
}
