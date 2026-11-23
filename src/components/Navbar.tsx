"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand */}
        <div className="flex items-center gap-3 bg-velvet-950/80 backdrop-blur-md px-4 py-2 rounded-[20px] border border-sage-border/80 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pista-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <Link
              href="/"
              className="text-white font-bold tracking-tight text-lg hover:text-pista-300 transition-colors"
            >
              Indexable
            </Link>
          </div>
          <span className="text-sage-border">|</span>
          <div className="hidden sm:flex items-center text-[11px] font-mono text-sage-muted tracking-wider">
            <span>SHOPIFY AI SEARCH AUDITOR</span>
          </div>
        </div>

        {/* Navigation Anchors & CTAs */}
        <nav className="flex items-center gap-2 bg-velvet-950/80 backdrop-blur-md p-1.5 rounded-[22px] border border-sage-border/80 shadow-lg">
          <Link
            href="/#problem"
            className="hidden md:inline-flex px-3.5 py-1.5 text-xs text-sage-muted hover:text-white rounded-[14px] transition-colors"
          >
            The Invisible Wall
          </Link>
          <Link
            href="/#usecase"
            className="hidden md:inline-flex px-3.5 py-1.5 text-xs text-sage-muted hover:text-white rounded-[14px] transition-colors"
          >
            Before &amp; After
          </Link>
          <Link
            href="/#waitlist"
            className="px-3.5 py-1.5 text-xs text-pista-300 hover:text-white rounded-[14px] transition-colors font-medium"
          >
            Waitlist (100/1000)
          </Link>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-pista-400/90 hover:text-pista-300 rounded-[14px] transition-colors"
          >
            /llms.txt
            <ExternalLink className="w-3 h-3" />
          </a>
          <Link
            href="/audit"
            className="bg-white hover:bg-pista-100 text-velvet-950 font-bold text-xs px-4 py-2 rounded-[16px] transition-all duration-200 shadow-sm active:scale-95"
          >
            Audit Store Free
          </Link>
        </nav>
      </div>
    </header>
  );
}
