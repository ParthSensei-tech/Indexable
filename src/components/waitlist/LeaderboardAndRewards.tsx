"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Gift, Sparkles, TrendingUp, Users, ArrowUpRight, DollarSign } from "lucide-react";

interface LeaderboardItem {
  rank: number;
  store: string;
  points: number;
  referrals: number;
  tier: string;
}

const DEFAULT_LEADERBOARD: LeaderboardItem[] = [
  { rank: 1, store: "peakperformance.co", points: 1450, referrals: 14, tier: "VIP Diamond" },
  { rank: 2, store: "lunarwellness.store", points: 890, referrals: 8, tier: "Gold Tier" },
  { rank: 3, store: "kinfolkhome.com", points: 620, referrals: 6, tier: "Gold Tier" },
  { rank: 4, store: "strideathletics.shop", points: 410, referrals: 4, tier: "Silver Tier" },
  { rank: 5, store: "auroraskin.com", points: 260, referrals: 2, tier: "Bronze Tier" },
  { rank: 6, store: "vanguardgear.com", points: 190, referrals: 1, tier: "Bronze Tier" },
  { rank: 7, store: "monarchcoffee.shop", points: 120, referrals: 1, tier: "Bronze Tier" },
];

const REWARDS_TIERS = [
  {
    points: 100,
    tier: "Bronze Tier",
    badge: "100 PTS",
    title: "AI Citation Gap Audit ($199 Value)",
    details: "Automated competitive intelligence report revealing which AI search queries cite your competitors instead of you, with revenue gap analysis.",
    perkHighlight: "Free Diagnostic Unlock",
  },
  {
    points: 300,
    tier: "Silver Tier",
    badge: "300 PTS",
    title: "1-Year Free Return Schema Sync ($588 Value)",
    details: "12 months of automated return policy & shipping schema sync included. Unlocks ecosystem catalog integration and priority index pings.",
    perkHighlight: "Saves $588 on Theme Sync",
  },
  {
    points: 500,
    tier: "Gold Tier",
    badge: "500 PTS",
    title: "Lifetime 50% Enterprise License ($1,200/yr Value)",
    details: "Guaranteed 50% lifetime discount on multi-store catalog sync, real-time stock alert webhooks, and 24/7 AI crawler protection nodes.",
    perkHighlight: "Locked-In Half Price Forever",
  },
  {
    points: 1000,
    tier: "VIP Diamond",
    badge: "1,000 PTS",
    title: "Quarterly 1-on-1 GEO Strategy Consultation ($2,500 Value)",
    details: "Direct architectural consultation on custom /llms.txt manifest architecture, headless JSON-LD pipeline tuning, and custom crawler indexing.",
    perkHighlight: "Direct Advisory Access",
  },
];

export function LeaderboardAndRewards() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>(DEFAULT_LEADERBOARD);

  // Live dynamic leaderboard movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard((prev) =>
        prev.map((item, idx) => {
          if (idx === 1 || idx === 3 || idx === 5) {
            const delta = Math.floor(Math.random() * 20) - 5;
            return {
              ...item,
              points: Math.max(100, item.points + delta),
            };
          }
          return item;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10">
      {/* Rewards Thresholds Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-pista-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Waitlist Point Rewards &amp; Merchant Perks
            </h3>
          </div>
          <span className="text-xs font-mono text-pista-300 font-semibold bg-pista-400/10 border border-pista-400/25 px-2.5 py-1 rounded-[10px]">
            Earn +50 pts per referred store founder
          </span>
        </div>

        <p className="text-xs sm:text-sm text-sage-muted">
          Earn points by joining the waitlist (+50 pts) and inviting verified Shopify store founders (+50 pts per merchant). Rewards activate automatically upon milestone unlock.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {REWARDS_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className="p-5 rounded-[22px] bg-velvet-950 border border-sage-border flex flex-col justify-between space-y-3 shadow-lg hover:border-pista-400/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[8px] bg-pista-400/15 border border-pista-400/30 text-pista-300 font-bold">
                    {tier.badge}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-[8px] border border-amber-400/25">
                    {tier.perkHighlight}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {tier.title}
                </h4>
                <p className="text-xs text-sage-muted leading-relaxed">
                  {tier.details}
                </p>
              </div>

              <div className="pt-2 border-t border-sage-border/50 text-[11px] font-mono text-pista-400 font-semibold flex items-center justify-between">
                <span>Unlock: {tier.points} Points</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SIGNUP Merchant Leaderboard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-sage-border/70 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
              SIGNUP MERCHANT LEADERBOARD
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-pista-400">
            <span className="w-2 h-2 rounded-full bg-pista-400 animate-ping" />
            <span>LIVE QUEUE ACTIVITY</span>
          </div>
        </div>

        <div className="rounded-[22px] bg-velvet-950 border border-sage-border overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-velvet-900/90 text-sage-muted border-b border-sage-border/80 text-[11px]">
                <tr>
                  <th className="py-3 px-4">RANK</th>
                  <th className="py-3 px-4">SHOPIFY STORE</th>
                  <th className="py-3 px-4">TOTAL POINTS</th>
                  <th className="py-3 px-4">REFERRALS</th>
                  <th className="py-3 px-4">REWARD TIER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-border/50 text-white">
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.rank}
                    className="hover:bg-velvet-900/60 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-pista-300">
                      {entry.rank === 1 ? "🥇 #1" : entry.rank === 2 ? "🥈 #2" : entry.rank === 3 ? "🥉 #3" : `#${entry.rank}`}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {entry.store}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-pista-400">
                      {entry.points} pts
                    </td>
                    <td className="py-3.5 px-4 text-sage-muted">
                      {entry.referrals} merchants
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[8px] bg-velvet-900 border border-sage-border text-[10px] text-pista-300 font-semibold">
                        {entry.tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
