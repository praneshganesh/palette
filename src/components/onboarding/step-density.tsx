"use client";

import { motion } from "framer-motion";
import { useOnboardingStore } from "@/store/onboarding";
import type { InterfaceDensity } from "@/types";

const densities: { id: InterfaceDensity; label: string; description: string; rows: number }[] = [
  { id: "comfortable", label: "Comfortable", description: "Generous spacing, portals & public-facing", rows: 3 },
  { id: "balanced", label: "Balanced", description: "Middle ground, most use cases", rows: 5 },
  { id: "dense", label: "Dense", description: "Compact, dashboards & ops tools", rows: 7 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function StepDensity() {
  const { density, setDensity } = useOnboardingStore();

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
        Interface density
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 8 }}>
        How compact should your app feel?
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 36, lineHeight: 1.6 }}>
        This controls default spacing, padding, and component sizing.
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-3"
        style={{ marginBottom: 32 }}
      >
        {densities.map((d) => (
          <motion.button
            key={d.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDensity(d.id)}
            className="cursor-pointer text-left transition-all duration-200 overflow-hidden"
            style={{
              background: density === d.id ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.04)",
              border: density === d.id ? "0.5px solid rgba(167,139,250,0.6)" : "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
            }}
          >
            {/* Preview */}
            <div style={{ padding: 12 }}>
              <div style={{ background: "#09090B", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div className="flex" style={{ height: 100 }}>
                  <div style={{ width: 36, borderRight: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", padding: 6 }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} style={{ height: 3, borderRadius: 1, marginBottom: 5, background: i === 0 ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)" }} />
                    ))}
                  </div>
                  <div style={{ flex: 1, padding: d.id === "comfortable" ? 10 : d.id === "balanced" ? 7 : 5 }}>
                    <div style={{ height: 3, width: 40, borderRadius: 1, background: "rgba(255,255,255,0.1)", marginBottom: 8 }} />
                    {Array.from({ length: d.rows }).map((_, i) => (
                      <div key={i} className="flex items-center gap-1.5" style={{ marginBottom: 3 }}>
                        <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(167,139,250,0.3)", flexShrink: 0 }} />
                        <div style={{ height: 2, flex: 1, borderRadius: 1, background: "rgba(255,255,255,0.06)" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Label */}
            <div style={{ padding: "12px 16px", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: density === d.id ? "#fff" : "rgba(255,255,255,0.85)", marginBottom: 4 }}>{d.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{d.description}</div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
