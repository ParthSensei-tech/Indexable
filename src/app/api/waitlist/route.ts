import { NextRequest, NextResponse } from "next/server";

// In-memory waitlist state with realistic initial momentum
let currentSignupCount = 847;
const waitlistEntries = new Map<string, { email: string; storeDomain: string; position: number; date: string }>();

export async function GET() {
  return NextResponse.json({
    currentSignups: currentSignupCount,
    targetMilestone: 1000,
    remainingSpots: Math.max(0, 1000 - currentSignupCount),
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

    // Sanitize domain
    const storeDomain = rawStore
      .replace(/^https?:\/\//, "")
      .split("/")[0]
      .replace(/[^a-z0-9.-]/gi, "");

    // Check if already registered
    if (waitlistEntries.has(email)) {
      const existing = waitlistEntries.get(email)!;
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        position: existing.position,
        totalSignups: currentSignupCount,
        targetMilestone: 1000,
        referralCode: `REF-${existing.position.toString().padStart(4, "0")}`,
      });
    }

    currentSignupCount += 1;
    const newPosition = currentSignupCount;

    waitlistEntries.set(email, {
      email,
      storeDomain,
      position: newPosition,
      date: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      position: newPosition,
      totalSignups: currentSignupCount,
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
