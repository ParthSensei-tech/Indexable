"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CrushedVelvetScene } from "@/components/3d/CrushedVelvetScene";
import { HookSection } from "@/components/sections/HookSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { UseCaseSection } from "@/components/sections/UseCaseSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { WaitlistModal } from "@/components/ui/WaitlistModal";

export default function Home() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Dynamic 3D Crushed Velvet Sheen & Atmosphere */}
      <CrushedVelvetScene />

      {/* Navigation */}
      <Navbar />

      <div className="relative z-10 space-y-12">
        {/* Stage 1: The Hook (Clean Hero with Audit My Store Free CTA) */}
        <HookSection />

        {/* Stage 2: The Problem (The Invisible Wall) */}
        <ProblemSection />

        {/* Stage 3: The Use Case (Before & After Reality) */}
        <UseCaseSection />

        {/* Stage 4: Robinhood-Style Waitlist, Leaderboard & Point Rewards */}
        <WaitlistSection />
      </div>

      {/* Robinhood VIP Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />
    </main>
  );
}
