"use client";

import React, { useState } from "react";
import { X, Check, Users, Sparkles, Store, Mail, ArrowRight, Copy } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: string;
}

export function WaitlistModal({ isOpen, onClose, initialDomain = "" }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [storeDomain, setStoreDomain] = useState(initialDomain);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupData, setSignupData] = useState<{
    position: number;
    referralCode: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, storeDomain: storeDomain || initialDomain }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Unable to join waitlist.");
      } else {
        setSignupData({
          position: data.position,
          referralCode: data.referralCode,
        });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!signupData) return;
    navigator.clipboard.writeText(`https://indexable.dev/join?ref=${signupData.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-velvet-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-velvet-950 border border-pista-400/40 rounded-[28px] p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-[12px] bg-velvet-900 border border-sage-border text-sage-muted hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!signupData ? (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-pista-400/10 border border-pista-400/25 text-pista-300 text-xs font-mono">
                <Users className="w-3.5 h-3.5" />
                <span>VIP PRIORITY ACCESS // COHORT 1</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Unlock Automated 1-Click Injection
              </h3>

              <p className="text-xs sm:text-sm text-sage-muted leading-relaxed">
                Automated 1-click theme injection goes live when we reach <strong className="text-white">1,000 verified Shopify merchants</strong>. Join now to claim early priority.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-sage-muted">
                  Your Shopify Store Domain
                </label>
                <div className="flex items-center gap-2 rounded-[16px] bg-velvet-900 border border-sage-border/90 px-3.5 py-2.5 focus-within:border-pista-400 transition-colors">
                  <Store className="w-4 h-4 text-sage-muted shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="yourstore.com"
                    value={storeDomain}
                    onChange={(e) => setStoreDomain(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-sage-muted/60 focus:outline-none font-mono"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-sage-muted">
                  Merchant Email Address
                </label>
                <div className="flex items-center gap-2 rounded-[16px] bg-velvet-900 border border-sage-border/90 px-3.5 py-2.5 focus-within:border-pista-400 transition-colors">
                  <Mail className="w-4 h-4 text-sage-muted shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="founder@yourstore.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-sage-muted/60 focus:outline-none font-mono"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs font-mono text-rose-400 text-center">
                  {errorMsg}
                </p>
              )}

              {/* Unlocked Point Rewards Brief */}
              <div className="p-3.5 rounded-[16px] bg-velvet-900 border border-pista-400/25 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pista-400" />
                    Early Founder Rewards Available:
                  </span>
                  <span className="font-mono text-pista-400 text-[11px] font-bold">
                    Up to $4,400+ Value
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-sage-muted">
                  <div className="bg-velvet-950/80 p-2 rounded-[10px] border border-sage-border/60">
                    <span className="text-white font-bold block">100 PTS</span>
                    <span>AI Citation Gap Audit</span>
                  </div>
                  <div className="bg-velvet-950/80 p-2 rounded-[10px] border border-sage-border/60">
                    <span className="text-white font-bold block">300 PTS</span>
                    <span>1-Yr Return Schema Sync</span>
                  </div>
                  <div className="bg-velvet-950/80 p-2 rounded-[10px] border border-sage-border/60">
                    <span className="text-white font-bold block">500 PTS</span>
                    <span>Lifetime 50% Enterprise</span>
                  </div>
                  <div className="bg-velvet-950/80 p-2 rounded-[10px] border border-sage-border/60">
                    <span className="text-white font-bold block">1000 PTS</span>
                    <span>1-on-1 GEO Strategy Call</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-sage-border/60">
                <div className="flex items-center gap-2 text-xs text-sage-muted">
                  <Check className="w-3.5 h-3.5 text-pista-400 shrink-0" />
                  <span>100% Free early adopter priority access.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-sage-muted">
                  <Check className="w-3.5 h-3.5 text-pista-400 shrink-0" />
                  <span>Zero code edits: safe App Embed that survives theme updates.</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-[16px] bg-white hover:bg-pista-100 text-velvet-950 font-bold text-sm shadow-[0_0_25px_rgba(134,239,172,0.35)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {isSubmitting ? (
                  <span>Reserving Your Queue Number...</span>
                ) : (
                  <>
                    <span>Claim Your Waitlist Spot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 rounded-full bg-pista-400/20 border border-pista-400 text-pista-400 flex items-center justify-center mx-auto shadow-[0_0_20px_#4ade80]">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-sage-muted uppercase">
                Queue Confirmation
              </span>
              <h3 className="text-4xl font-extrabold font-mono text-white tracking-tight">
                #{signupData.position}
              </h3>
              <p className="text-xs text-pista-300 font-mono">
                on the 1-Click Injection Rollout Waitlist
              </p>
            </div>

            <p className="text-xs text-sage-muted leading-relaxed max-w-sm mx-auto">
              We will notify you at <strong className="text-white font-mono">{email}</strong> the exact moment our 1,000-merchant milestone is reached.
            </p>

            {/* Share link */}
            <div className="p-3.5 rounded-[14px] bg-velvet-900 border border-sage-border text-left space-y-1.5">
              <span className="text-[11px] text-sage-muted font-mono block">
                Share with founders to jump 50 spots:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`https://indexable.dev/join?ref=${signupData.referralCode}`}
                  className="w-full bg-velvet-950 px-2.5 py-1.5 rounded-[8px] text-[11px] font-mono text-pista-300 border border-sage-border focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-[8px] bg-white text-velvet-950 font-bold text-xs shrink-0"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-[14px] bg-white text-velvet-950 font-bold text-xs"
            >
              Done &amp; Return to Auditor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
