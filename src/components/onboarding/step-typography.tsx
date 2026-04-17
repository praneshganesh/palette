"use client";

import { motion } from "framer-motion";
import { useOnboardingStore } from "@/store/onboarding";
import { typographyPacks } from "@/lib/typography-packs";
import type { TypographyStyle } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function StepTypography() {
  const { typographyStyle, setTypographyStyle, languageSupport } = useOnboardingStore();
  const showArabic = languageSupport !== "en-only";

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
        Typography
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 8 }}>
        Choose a typography style
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 36, lineHeight: 1.6 }}>
        Each pack is vetted for bilingual use and accessibility.
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
        style={{ marginBottom: 32 }}
      >
        {typographyPacks.map((pack) => (
          <motion.button
            key={pack.id}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setTypographyStyle(pack.id as TypographyStyle)}
            className="cursor-pointer text-left transition-all duration-200"
            style={{
              background: typographyStyle === pack.id ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.04)",
              border: typographyStyle === pack.id ? "0.5px solid rgba(167,139,250,0.6)" : "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 12 }}>
              {pack.name}
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#fff", letterSpacing: "-0.3px", marginBottom: 4 }}>
              {pack.sampleHeading}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, marginBottom: showArabic ? 12 : 8 }}>
              {pack.sampleBody}
            </div>
            {showArabic && (
              <div dir="rtl" style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 500, color: "#fff", textAlign: "right" as const, marginBottom: 4 }}>{pack.sampleArabicHeading}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, textAlign: "right" as const }}>{pack.sampleArabicBody}</div>
              </div>
            )}
            <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 8, marginTop: 4, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
              {pack.headingFont} · {pack.arabicHeadingFont}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
