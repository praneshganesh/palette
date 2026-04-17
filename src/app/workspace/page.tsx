"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStore } from "@/store/onboarding";
import { useDesignSystemStore } from "@/store/design-system";
import { generateDesignSystemSmart } from "@/lib/generation/ai-generate";
import { GeneratingScreen } from "@/components/workspace/generating-screen";
import { FoundationsTab } from "@/components/workspace/foundations-tab";
import { ComponentsTab } from "@/components/workspace/components-tab";
import { AppShellTab } from "@/components/workspace/appshell-tab";
import { LocalizationTab } from "@/components/workspace/localization-tab";
import { OverviewTab } from "@/components/workspace/overview-tab";
import { SpecificationsTab } from "@/components/workspace/specifications-tab";
import { getIndustryContent } from "@/lib/content-context";

type Tab = "overview" | "foundations" | "components" | "specifications" | "appshell" | "localization";

const industryLabels: Record<string, string> = {
  government: "Government Portal",
  education: "Education Platform",
  healthcare: "Healthcare System",
  "real-estate": "Real Estate Portal",
  hr: "HR Management System",
  operations: "Operations Platform",
  logistics: "Logistics Dashboard",
  retail: "Retail Commerce",
  finance: "Finance Platform",
  hospitality: "Hospitality Portal",
  technology: "Technology Platform",
  "ai-ml": "AI / ML Platform",
  "media-entertainment": "Media & Entertainment",
  nonprofit: "Non-Profit Platform",
  legal: "Legal / Compliance",
  construction: "Construction & Engineering",
  energy: "Energy & Utilities",
  telecom: "Telecom Platform",
  other: "Custom Project",
};

const projectLabels: Record<string, string> = {
  "admin-portal": "Admin Portal",
  "employee-portal": "Employee Portal",
  "customer-portal": "Customer Portal",
  "education-portal": "Education Portal",
  "workflow-app": "Workflow App",
  "operations-dashboard": "Operations Dashboard",
  "booking-app": "Booking App",
  marketplace: "Marketplace",
  "ecommerce-store": "E-Commerce Store",
  "saas-product": "SaaS Product",
  crm: "CRM Platform",
  "analytics-platform": "Analytics Platform",
  "social-platform": "Social Platform",
  "content-platform": "Content Platform",
  "mobile-app": "Mobile App",
  other: "Custom Project",
};

export default function WorkspacePage() {
  const onboardingState = useOnboardingStore();
  const {
    system,
    setSystem,
    isGenerating,
    setIsGenerating,
    previewMode,
    setPreviewMode,
    setAIRecommendations,
  } = useDesignSystemStore();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [genStatus, setGenStatus] = useState<string>("Initializing...");
  const onboardingRef = useRef(onboardingState);
  onboardingRef.current = onboardingState;

  useEffect(() => {
    if (system) return;
    setIsGenerating(true);

    let cancelled = false;

    async function run() {
      try {
        setGenStatus("Analyzing your requirements...");
        await new Promise((r) => setTimeout(r, 800));

        if (cancelled) return;
        setGenStatus("Generating design tokens with AI...");

        const generated = await generateDesignSystemSmart(
          onboardingRef.current,
          (status) => { if (!cancelled) setGenStatus(status); }
        );

        if (cancelled) return;
        setGenStatus("Finalizing design system...");
        await new Promise((r) => setTimeout(r, 500));

        if ("recommendedComponents" in generated && generated.recommendedComponents) {
          setAIRecommendations(
            generated.recommendedComponents || null,
            generated.recommendedFieldTypes || null
          );
        }
        setSystem(generated);
        setIsGenerating(false);
      } catch (error) {
        console.error("[Palette] Generation error:", error);
        if (!cancelled) setIsGenerating(false);
      }
    }

    run();
    return () => { cancelled = true; };
  }, [system, setSystem, setIsGenerating]);

  useEffect(() => {
    if (!system) return;
    const fonts = new Set([
      system.typography.headingFont,
      system.typography.bodyFont,
      system.typography.arabicHeadingFont,
      system.typography.arabicBodyFont,
    ]);
    const families = Array.from(fonts)
      .filter((f) => f && f !== "Inter")
      .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;600;700`);
    if (families.length === 0) return;
    const id = "palette-google-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
    document.head.appendChild(link);
  }, [system]);

  if (isGenerating || !system) {
    return (
      <div
        className="min-h-screen flex items-center"
        style={{ justifyContent: "center", background: "#09090B" }}
      >
        <GeneratingScreen status={genStatus} />
      </div>
    );
  }

  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const projectName = projectLabels[system.meta.projectType] || "Design System";
  const industryName = industryLabels[system.meta.industry] || "Custom";
  const content = getIndustryContent(system.meta.industry, system.meta.projectType);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "foundations", label: "Foundations" },
    { id: "components", label: "Components" },
    { id: "specifications", label: "Specifications" },
    { id: "appshell", label: "App Shell & Templates" },
    { id: "localization", label: "Localization" },
  ];

  const footerLinks: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "foundations", label: "Foundations" },
    { id: "components", label: "Components" },
    { id: "specifications", label: "Specifications" },
    { id: "appshell", label: "App Shell" },
    { id: "localization", label: "Localization" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.background, fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif" }}>
      <header style={{ backgroundColor: system.palette.textPrimary }}>
        <div
          className="flex items-center justify-between gap-4"
          style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 32px" }}
        >
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: system.palette.primary,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {industryName}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  DESIGN SYSTEM
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 2,
                }}
              >
                {projectName}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-1"
              style={{
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                padding: 2,
              }}
            >
              {(["light", "dark"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPreviewMode(mode)}
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    padding: "5px 14px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    backgroundColor: previewMode === mode ? "rgba(255,255,255,0.12)" : "transparent",
                    color: previewMode === mode ? "#fff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {mode === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              v1.0 · {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </div>
        </div>
      </header>

      <nav
        style={{
          backgroundColor: palette.background,
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <div className="flex gap-0" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? palette.textPrimary : palette.textSecondary,
                padding: "14px 20px",
                border: "none",
                borderBottom: activeTab === tab.id ? `2px solid ${palette.textPrimary}` : "2px solid transparent",
                background: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 150ms, border-color 150ms",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px 80px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "overview" && <OverviewTab system={system} />}
            {activeTab === "foundations" && <FoundationsTab system={system} />}
            {activeTab === "components" && <ComponentsTab system={system} content={content} />}
            {activeTab === "specifications" && <SpecificationsTab system={system} />}
            {activeTab === "appshell" && <AppShellTab system={system} content={content} />}
            {activeTab === "localization" && <LocalizationTab system={system} content={content} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer style={{ backgroundColor: system.palette.textPrimary, padding: "24px 0" }}>
        <div
          className="flex items-center justify-between gap-4"
          style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}
        >
          <div className="flex items-center gap-2" style={{ flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{industryName}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>DESIGN SYSTEM v1.0</span>
          </div>
          <div className="flex gap-4" style={{ flexWrap: "wrap" }}>
            {footerLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => setActiveTab(link.id)}
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.35)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  padding: 0,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
