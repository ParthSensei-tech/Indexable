import { NextRequest, NextResponse } from "next/server";

// Base waitlist count starts at 100
let currentSignupCount = 100;

interface WaitlistEntry {
  email: string;
  storeDomain: string;
  position: number;
  points: number;
  referrals: number;
  date: string;
}

const waitlistEntries = new Map<string, WaitlistEntry>();

// Seed initial leaderboard participants for social momentum
const INITIAL_LEADERBOARD = [
  { rank: 1, store: "peakperformance.co", points: 1450, referrals: 14, tier: "VIP Diamond" },
  { rank: 2, store: "lunarwellness.store", points: 850, referrals: 8, tier: "Gold Tier" },
  { rank: 3, store: "kinfolkhome.com", points: 600, referrals: 6, tier: "Gold Tier" },
  { rank: 4, store: "strideathletics.shop", points: 400, referrals: 4, tier: "Silver Tier" },
  { rank: 5, store: "auroraskin.com", points: 250, referrals: 2, tier: "Bronze Tier" },
];

export async function GET() {
  return NextResponse.json({
    currentSignups: currentSignupCount,
    targetMilestone: 1000,
    remainingSpots: Math.max(0, 1000 - currentSignupCount),
    leaderboard: INITIAL_LEADERBOARD,
    rewards: [
      {
        threshold: 100,
        title: "Bronze Tier (100 pts)",
        perks: "Batch 1 Early Access + Automated Theme Compatibility Diagnostic Report.",
      },
      {
        threshold: 300,
        title: "Silver Tier (300 pts)",
        perks: "Lifetime Free 1-Click Auto-Injection for 1 Store + Priority Schema Ingestion.",
      },
      {
        threshold: 500,
        title: "Gold Tier (500 pts)",
        perks: "Multi-Store Auto-Sync (up to 3 stores) + 24/7 AI Bot Crawler Monitoring.",
      },
      {
        threshold: 1000,
        title: "VIP Diamond Tier (1,000 pts)",
        perks: "Dedicated GEO Optimization Architect + Custom /llms.txt Curation + Zero Platform Fees for Life.",
      },
    ],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const email = body?.email?.trim().toLowerCase();
    const rawStore = body?.storeDomain?.trim().toLowerCase();

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid business email address." },
        { status: 400 }
      );
    }

    if (!rawStore || rawStore.length < 3) {
      return NextResponse.json(
        { error: "Please enter your Shopify store URL or domain." },
        { status: 400 }
      );
    }

    const storeDomain = rawStore
      .replace(/^https?:\/\//, "")
      .split("/")[0]
      .replace(/[^a-z0-9.-]/gi, "");

    // If user already registered, return existing queue rank
    if (waitlistEntries.has(email)) {
      const existing = waitlistEntries.get(email)!;
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        position: existing.position,
        totalSignups: currentSignupCount,
        points: existing.points,
        referrals: existing.referrals,
        targetMilestone: 1000,
        referralCode: `REF-${existing.position.toString().padStart(4, "0")}`,
      });
    }

    // Increment signup count by 1 (starts at 100 -> 101 -> 102...)
    currentSignupCount += 1;
    const newPosition = currentSignupCount;

    const newEntry: WaitlistEntry = {
      email,
      storeDomain,
      position: newPosition,
      points: 50, // 50 base signup points
      referrals: 0,
      date: new Date().toISOString(),
    };

    waitlistEntries.set(email, newEntry);

    return NextResponse.json({
      success: true,
      position: newPosition,
      totalSignups: currentSignupCount,
      points: 50,
      targetMilestone: 1000,
      remainingSpots: Math.max(0, 1000 - currentSignupCount),
      referralCode: `REF-${newPosition.toString().padStart(4, "0")}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process waitlist signup. Please try again." },
      { status: 500 }
    );
  }
}
