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

const INITIAL_LEADERBOARD = [
  { rank: 1, store: "peakperformance.co", points: 1450, referrals: 14, tier: "VIP Diamond" },
  { rank: 2, store: "lunarwellness.store", points: 890, referrals: 8, tier: "Gold Tier" },
  { rank: 3, store: "kinfolkhome.com", points: 620, referrals: 6, tier: "Gold Tier" },
  { rank: 4, store: "strideathletics.shop", points: 410, referrals: 4, tier: "Silver Tier" },
  { rank: 5, store: "auroraskin.com", points: 260, referrals: 2, tier: "Bronze Tier" },
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
        title: "AI Citation Gap Audit ($199 Value)",
        perks: "Automated competitive intelligence report identifying which AI queries cite competitors over your brand, with revenue gap analysis.",
      },
      {
        threshold: 300,
        title: "1-Year Free Return Schema Sync ($588 Value)",
        perks: "12 months of automated return policy & shipping schema sync included. Unlocks ecosystem catalog integration and priority index pings.",
      },
      {
        threshold: 500,
        title: "Lifetime 50% Enterprise License ($1,200/yr Value)",
        perks: "Guaranteed 50% lifetime discount on multi-store catalog sync, real-time stock alert webhooks, and 24/7 AI crawler protection nodes.",
      },
      {
        threshold: 1000,
        title: "Quarterly 1-on-1 GEO Strategy Consultation ($2,500 Value)",
        perks: "Direct architectural consultation on custom /llms.txt manifest architecture, headless JSON-LD pipeline tuning, and custom crawler indexing.",
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
