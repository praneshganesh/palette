"use client";

import { motion } from "framer-motion";
import { useOnboardingStore } from "@/store/onboarding";
import { OptionCard } from "@/components/ui/option-card";
import type { VisualTone } from "@/types";

const tones: { id: VisualTone; label: string; icon: string; description: string }[] = [
  { id: "professional", label: "Professional", icon: "🏛", description: "Corporate, structured, trustworthy" },
  { id: "premium", label: "Premium", icon: "⭐", description: "Elegant, refined, high-trust" },
  { id: "modern", label: "Modern", icon: "⚡", description: "Startup feel, fast, clean" },
  { id: "friendly", label: "Friendly", icon: "💬", description: "Approachable, warm, human" },
  { id: "minimal", label: "Minimal", icon: "▪️", description: "Clean, quiet, content-first" },
  { id: "bold", label: "Bold", icon: "🔥", description: "High contrast, strong presence" },
  { id: "institutional", label: "Institutional", icon: "🏢", description: "Navy tones, authoritative" },
  { id: "youthful", label: "Youthful", icon: "🎨", description: "Bright accents, energetic" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function StepVisualTone() {
  const { visualTone, setVisualTone } = useOnboardingStore();

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
        Visual identity
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 8 }}>
        Which style feels closest to your brand?
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 36, lineHeight: 1.6 }}>
        Choose one — this shapes your typography, spacing, and component personality.
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 32, alignItems: "stretch" }}
      >
        {tones.map((tone) => (
          <motion.div key={tone.id} variants={itemVariants} className="h-full">
            <OptionCard
              selected={visualTone === tone.id}
              onClick={() => setVisualTone(tone.id)}
              icon={<span>{tone.icon}</span>}
              label={tone.label}
              description={tone.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
