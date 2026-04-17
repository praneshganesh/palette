"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "#09090B" }}>
      <AuroraBackground />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[680px] mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 24 }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #818CF8, #A78BFA)",
              boxShadow: "0 8px 32px -4px rgba(129,140,248,0.3)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="13.5" cy="6.5" r="2.5" />
              <circle cx="17.5" cy="10.5" r="2.5" />
              <circle cx="8.5" cy="7.5" r="2.5" />
              <circle cx="6.5" cy="12.5" r="2.5" />
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12a9.97 9.97 0 0 0 2.2 6.3l.8.7a2 2 0 0 0 2.8-.1l.1-.1a2 2 0 0 1 3.2.5A2 2 0 0 0 13 21h-1" />
            </svg>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginBottom: 32 }}
        >
          <span
            className="inline-flex items-center gap-2"
            style={{
              padding: "6px 16px",
              borderRadius: 99,
              border: "0.5px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22D3EE" }} className="animate-pulse" />
            AI-Powered Design System Generator
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 500,
            letterSpacing: "-1px",
            lineHeight: 1.15,
            color: "#fff",
            marginBottom: 20,
          }}
        >
          From a few answers to a{" "}
          <span style={{ background: "linear-gradient(90deg, #818CF8, #A78BFA, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            complete design system
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.7,
            maxWidth: 480,
            marginBottom: 40,
          }}
        >
          Generate brand tokens, typography, component themes, and screen previews. Bilingual. RTL-ready. Built for the region.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-4"
          style={{ marginBottom: 56 }}
        >
          <Link href="/onboarding">
            <motion.span
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 cursor-pointer transition-all"
              style={{
                background: "#a78bfa",
                color: "#1a0a3d",
                fontSize: 13,
                fontWeight: 500,
                padding: "12px 28px",
                borderRadius: 10,
                boxShadow: "0 4px 24px -4px rgba(167,139,250,0.35)",
              }}
            >
              Start Building
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.span>
          </Link>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            Takes about 2 minutes
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="grid grid-cols-4 gap-8 text-center w-full"
          style={{ maxWidth: 500 }}
        >
          {[
            { label: "Brand Tokens", value: "14+" },
            { label: "Component Themes", value: "16+" },
            { label: "Starter Screens", value: "5" },
            { label: "Languages", value: "EN + AR" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "-0.5px" }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 120, background: "linear-gradient(to top, #09090B, transparent)" }} />
    </div>
  );
}
