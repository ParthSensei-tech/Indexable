"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";

interface ScoreGaugeProps {
  score: number;
  grade: "AI Ready" | "Needs Optimization" | "Invisible to AI";
  gradeBadgeColor: "emerald" | "amber" | "rose";
  criticalCount: number;
  warningCount: number;
  passCount: number;
}

export function ScoreGauge({
  score,
  grade,
  gradeBadgeColor,
  criticalCount,
  warningCount,
  passCount,
}: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 15;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Radius math for SVG gauge
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  const colorConfig = {
    emerald: {
      stroke: "#4ade80",
      glow: "rgba(74, 222, 128, 0.3)",
      badgeBg: "bg-pista-400/15",
      badgeText: "text-pista-300",
      badgeBorder: "border-pista-400/30",
    },
    amber: {
      stroke: "#fbbf24",
      glow: "rgba(251, 191, 36, 0.3)",
      badgeBg: "bg-amber-400/15",
      badgeText: "text-amber-300",
      badgeBorder: "border-amber-400/30",
    },
    rose: {
      stroke: "#f87171",
      glow: "rgba(248, 113, 113, 0.3)",
      badgeBg: "bg-rose-400/15",
      badgeText: "text-rose-300",
      badgeBorder: "border-rose-400/30",
    },
  }[gradeBadgeColor];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 bg-velvet-950/70 p-6 sm:p-8 rounded-[24px] border border-sage-border/90 shadow-2xl">
      {/* SVG Radial Gauge */}
      <div className="relative flex items-center justify-center">
        <svg
          className="w-44 h-44 -rotate-90 transform"
          viewBox="0 0 160 160"
        >
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#16291e"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Active Score Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={colorConfig.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: "stroke-dashoffset 0.8s ease-out",
              filter: `drop-shadow(0 0 10px ${colorConfig.glow})`,
            }}
          />
        </svg>

        {/* Center Numbers */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
            {animatedScore}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-sage-muted mt-0.5">
            / 100 PTS
          </span>
        </div>
      </div>

      {/* Grade & Breakdown Info */}
      <div className="flex-1 space-y-4 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-xs font-semibold border ${colorConfig.badgeBg} ${colorConfig.badgeText} ${colorConfig.badgeBorder}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {grade}
            </span>
            <span className="text-xs font-mono text-sage-muted">
              AI Readiness Status
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {grade === "AI Ready" && "Store is fully prepared for AI search citations."}
            {grade === "Needs Optimization" &&
              "Critical gaps prevent conversational search citations."}
            {grade === "Invisible to AI" &&
              "Perplexity & ChatGPT Search currently skip this store."}
          </h3>

          <p className="text-xs sm:text-sm text-sage-muted mt-1 leading-relaxed">
            {grade === "AI Ready"
              ? "All key structured data fields, return policies, and bot directives are verified and indexable."
              : "AI shopping models require verified return policies, shipping times, and machine-readable data to recommend products."}
          </p>
        </div>

        {/* Breakdown Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 border-t border-sage-border/60">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
            <XCircle className="w-3.5 h-3.5" />
            <span>{criticalCount} Critical</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{warningCount} Warnings</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-emerald-500/10 border border-emerald-500/20 text-pista-300 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{passCount} Passed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
