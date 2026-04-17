"use client";

import { motion } from "framer-motion";
import { useOnboardingStore } from "@/store/onboarding";
import { OptionCard } from "@/components/ui/option-card";
import type { LanguageSupport } from "@/types";

const languages: { id: LanguageSupport; label: string; icon: string; description: string }[] = [
  { id: "en-only", label: "English Only", icon: "🇬🇧", description: "LTR layout only" },
  { id: "ar-only", label: "Arabic Only", icon: "🇸🇦", description: "RTL layout only" },
  { id: "en-ar", label: "English + Arabic", icon: "🌍", description: "Bilingual, full RTL" },
  { id: "en-ar-plus", label: "EN + AR + More", icon: "🌏", description: "Bilingual base + expansion" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function StepLanguage() {
  const {
    languageSupport, setLanguageSupport,
    rtlSupport, setRtlSupport,
    regionalDateFormat, setRegionalDateFormat,
    regionalNumberFormat, setRegionalNumberFormat,
  } = useOnboardingStore();

  const showRtlOptions = languageSupport === "ar-only" || languageSupport === "en-ar" || languageSupport === "en-ar-plus";

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
        Language & layout
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 8 }}>
        Which languages should your app support?
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 36, lineHeight: 1.6 }}>
        This determines layout direction, font pairing, and regional formatting.
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, marginBottom: 32, alignItems: "stretch" }}
      >
        {languages.map((lang) => (
          <motion.div key={lang.id} variants={itemVariants} className="h-full">
            <OptionCard
              selected={languageSupport === lang.id}
              onClick={() => setLanguageSupport(lang.id)}
              icon={<span>{lang.icon}</span>}
              label={lang.label}
              description={lang.description}
            />
          </motion.div>
        ))}
      </motion.div>

      {showRtlOptions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 24, marginTop: 8 }}
        >
          <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
            Regional options
          </div>
          <div className="space-y-2.5">
            <ToggleRow label="RTL support" description="Mirror layouts for right-to-left" enabled={rtlSupport} onChange={setRtlSupport} />
            <ToggleRow label="Regional dates" description="Locale-appropriate date format" enabled={regionalDateFormat} onChange={setRegionalDateFormat} />
            <ToggleRow label="Regional numbers" description="Locale-appropriate number format" enabled={regionalNumberFormat} onChange={setRegionalNumberFormat} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ToggleRow({ label, description, enabled, onChange }: { label: string; description: string; enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center justify-between w-full cursor-pointer transition-all"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "0.5px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "12px 16px",
      }}
    >
      <div className="text-left">
        <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{label}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{description}</div>
      </div>
      <div
        className="shrink-0 ml-4 relative"
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: enabled ? "#a78bfa" : "rgba(255,255,255,0.15)",
          transition: "background 0.2s",
        }}
      >
        <motion.div
          className="absolute rounded-full bg-white shadow-sm"
          style={{ top: 2, width: 16, height: 16 }}
          animate={{ left: enabled ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  );
}
