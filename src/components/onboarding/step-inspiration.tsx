"use client";

import { motion } from "framer-motion";
import { useOnboardingStore } from "@/store/onboarding";
import { OptionCard } from "@/components/ui/option-card";
import type { InspirationStyle } from "@/types";

const inspirations: { id: InspirationStyle; label: string; icon: string; description: string }[] = [
  { id: "admin-heavy", label: "Admin Heavy", icon: "📋", description: "Tables, filters, bulk actions" },
  { id: "portal-style", label: "Portal Style", icon: "🏠", description: "Cards, categories, self-service" },
  { id: "dashboard-heavy", label: "Dashboard", icon: "📊", description: "Charts, KPIs, widgets" },
  { id: "mobile-first", label: "Mobile First", icon: "📱", description: "Bottom nav, swipeable cards" },
  { id: "formal-enterprise", label: "Enterprise", icon: "🏢", description: "Structured, breadcrumbs" },
  { id: "soft-modern", label: "Soft Modern", icon: "🌸", description: "Rounded, gradients, airy" },
  { id: "premium-brand", label: "Premium Brand", icon: "💎", description: "Hero sections, brand-forward" },
  { id: "public-service", label: "Public Service", icon: "🏛", description: "Accessible, clear hierarchy" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.035 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function StepInspiration() {
  const { inspirationStyle, setInspirationStyle } = useOnboardingStore();

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
        Inspiration
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 8 }}>
        Visual inspiration
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 8, lineHeight: 1.6 }}>
        Which examples feel closest to what you want?
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 36, cursor: "default" }}>
        Optional — helps fine-tune your generated system
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 32, alignItems: "stretch" }}
      >
        {inspirations.map((insp) => (
          <motion.div key={insp.id} variants={itemVariants} className="h-full">
            <OptionCard
              selected={inspirationStyle === insp.id}
              onClick={() => setInspirationStyle(insp.id)}
              icon={<span>{insp.icon}</span>}
              label={insp.label}
              description={insp.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
