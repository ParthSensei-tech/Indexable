"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Code,
} from "lucide-react";
import { AuditCheckItem } from "@/lib/types";

interface AuditChecklistProps {
  checks: AuditCheckItem[];
}

export function AuditChecklist({ checks }: AuditChecklistProps) {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "pass">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredChecks = checks.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const criticalTotal = checks.filter((c) => c.status === "critical").length;
  const warningTotal = checks.filter((c) => c.status === "warning").length;
  const passTotal = checks.filter((c) => c.status === "pass").length;

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-sage-border/80">
        <div className="flex items-center gap-1.5 p-1 bg-velvet-950 rounded-[14px] border border-sage-border">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-xs rounded-[10px] font-medium transition-colors ${
              filter === "all"
                ? "bg-white text-velvet-950 font-semibold"
                : "text-sage-muted hover:text-white"
            }`}
          >
            All Checks ({checks.length})
          </button>
          <button
            onClick={() => setFilter("critical")}
            className={`px-3 py-1 text-xs rounded-[10px] font-medium transition-colors ${
              filter === "critical"
                ? "bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/40"
                : "text-rose-400/80 hover:text-rose-300"
            }`}
          >
            Critical ({criticalTotal})
          </button>
          <button
            onClick={() => setFilter("warning")}
            className={`px-3 py-1 text-xs rounded-[10px] font-medium transition-colors ${
              filter === "warning"
                ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40"
                : "text-amber-400/80 hover:text-amber-300"
            }`}
          >
            Warnings ({warningTotal})
          </button>
          <button
            onClick={() => setFilter("pass")}
            className={`px-3 py-1 text-xs rounded-[10px] font-medium transition-colors ${
              filter === "pass"
                ? "bg-pista-400/20 text-pista-300 font-semibold border border-pista-400/40"
                : "text-pista-400/80 hover:text-pista-300"
            }`}
          >
            Passed ({passTotal})
          </button>
        </div>

        <span className="text-xs font-mono text-sage-muted">
          7 WEIGHTED GEO SIGNALS
        </span>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {filteredChecks.map((item) => {
          const isExpanded = expandedId === item.id;
          const statusConfig = {
            critical: {
              icon: XCircle,
              color: "text-rose-400",
              bgColor: "bg-rose-500/10",
              borderColor: "border-rose-500/25",
              badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
            },
            warning: {
              icon: AlertTriangle,
              color: "text-amber-400",
              bgColor: "bg-amber-500/10",
              borderColor: "border-amber-500/25",
              badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
            },
            pass: {
              icon: CheckCircle2,
              color: "text-pista-400",
              bgColor: "bg-emerald-500/10",
              borderColor: "border-pista-400/25",
              badgeBg: "bg-pista-400/20 text-pista-300 border-pista-400/30",
            },
          }[item.status];

          const IconComponent = statusConfig.icon;

          return (
            <div
              key={item.id}
              className={`rounded-[18px] border ${statusConfig.borderColor} ${statusConfig.bgColor} backdrop-blur-md transition-all duration-200 overflow-hidden`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div className={`mt-0.5 sm:mt-0 ${statusConfig.color} shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-[8px] border uppercase font-medium ${statusConfig.badgeBg}`}
                      >
                        {item.status === "pass" ? "Verified" : item.status}
                      </span>
                    </div>
                    <p className="text-xs text-sage-muted mt-0.5 truncate">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-sage-muted">
                    <strong className="text-white font-semibold">
                      +{item.pointsEarned}
                    </strong>{" "}
                    / {item.maxPoints} pts
                  </span>
                  <div className="text-sage-muted hover:text-white transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-sage-border/50 space-y-3 bg-velvet-950/40">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-pista-300">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Why this impacts AI search citations:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-sage-muted leading-relaxed pl-5">
                      {item.whyItMatters}
                    </p>
                  </div>

                  {item.technicalDetails && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-sage-muted">
                        <Code className="w-3.5 h-3.5" />
                        <span>Crawler Technical Diagnostics:</span>
                      </div>
                      <div className="bg-velvet-950 p-2.5 rounded-[10px] border border-sage-border font-mono text-[11px] text-pista-200 overflow-x-auto">
                        <code>{item.technicalDetails}</code>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
