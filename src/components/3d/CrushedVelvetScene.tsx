"use client";

import React, { useEffect, useState } from "react";

export function CrushedVelvetScene() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.round((e.clientX / window.innerWidth) * 100);
      const y = Math.round((e.clientY / window.innerHeight) * 100);
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base deep velvet layer */}
      <div className="absolute inset-0 bg-[#0a140f]" />

      {/* Dynamic Specular Sheen responding to cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, rgba(134, 239, 172, 0.07), transparent 60%)`,
        }}
      />

      {/* Secondary Velvet highlights */}
      <div className="absolute -top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-pista-400/[0.04] blur-[140px]" />
      <div className="absolute top-[40%] -right-[10%] w-[700px] h-[700px] rounded-full bg-pista-300/[0.035] blur-[160px]" />
      <div className="absolute bottom-[10%] left-[25%] w-[800px] h-[800px] rounded-full bg-[#1b3827]/40 blur-[180px]" />

      {/* Subtle micro-grain overlay simulating velvet pile texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
