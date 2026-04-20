"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import { useDesignSystemStore } from "@/store/design-system";
import { useOnboardingStore } from "@/store/onboarding";

interface OverviewTabProps {
  system: DesignSystem;
}

const projectLabels: Record<string, string> = {
  "admin-portal": "Internal Admin Portal",
  "employee-portal": "Employee Self-Service",
  "customer-portal": "Customer Portal",
  "education-portal": "Education Portal",
  "workflow-app": "Approval / Workflow",
  "operations-dashboard": "Operations Dashboard",
  "booking-app": "Booking / Request App",
  marketplace: "Marketplace / Directory",
  other: "Custom Project",
};

const industryLabels: Record<string, string> = {
  government: "Government / Public Sector",
  education: "Education",
  healthcare: "Healthcare",
  "real-estate": "Real Estate",
  hr: "HR / Internal Services",
  operations: "Operations / Facilities",
  logistics: "Logistics",
  retail: "Retail / Commerce",
  finance: "Finance / Insurance",
  hospitality: "Hospitality",
  other: "Other",
};

const toneLabels: Record<string, string> = {
  professional: "Professional / Corporate",
  premium: "Premium / Elegant",
  modern: "Modern / Startup",
  friendly: "Friendly / Approachable",
  minimal: "Minimal / Clean",
  bold: "Bold / High-Contrast",
  institutional: "Institutional / Formal",
  youthful: "Youthful / Educational",
};

const densityLabels: Record<string, string> = {
  comfortable: "Comfortable — spacious layout",
  balanced: "Balanced — standard density",
  dense: "Dense — data-heavy layout",
};

const languageLabels: Record<string, string> = {
  "en-only": "English Only",
  "ar-only": "Arabic Only",
  "en-ar": "English + Arabic",
  "en-ar-plus": "English + Arabic + More",
};


function textColorForBg(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#000000" : "#ffffff";
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export function OverviewTab({ system }: OverviewTabProps) {
  const { previewMode } = useDesignSystemStore();
  const { logoPreviewUrl } = useOnboardingStore();
  const palette: PaletteTokenSet =
    previewMode === "dark" ? system.darkPalette : system.palette;

  const isBilingual =
    system.localization.languages === "en-ar" ||
    system.localization.languages === "en-ar-plus" ||
    system.localization.languages === "ar-only";

  const createdDate = new Date(system.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: system.typography.headingFont,
    color: palette.textPrimary,
    marginBottom: 8,
    marginTop: 0,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 14,
    color: palette.textSecondary,
    lineHeight: 1.7,
    marginBottom: 40,
    marginTop: 0,
    maxWidth: 520,
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    padding: 24,
  };

  const accentBar: React.CSSProperties = {
    width: 48,
    height: 2,
    backgroundColor: palette.primary,
    marginBottom: 24,
    borderRadius: 1,
  };

  const heroColors: { name: string; key: keyof PaletteTokenSet; hex: string }[] = [
    { name: "Primary", key: "primary", hex: palette.primary },
    { name: "Secondary", key: "secondary", hex: palette.secondary },
    { name: "Accent", key: "accent", hex: palette.accent },
    { name: "Success", key: "success", hex: palette.success },
    { name: "Warning", key: "warning", hex: palette.warning },
  ];

  const remainingTokens: { name: string; hex: string }[] = [
    { name: "Primary Hover", hex: palette.primaryHover },
    { name: "Background", hex: palette.background },
    { name: "Surface", hex: palette.surface },
    { name: "Muted Surface", hex: palette.surfaceMuted },
    { name: "Border", hex: palette.border },
    { name: "Text Primary", hex: palette.textPrimary },
    { name: "Text Secondary", hex: palette.textSecondary },
    { name: "Danger", hex: palette.danger },
    { name: "Info", hex: palette.info },
  ];

  const summaryCards = [
    {
      label: "Project Type",
      value: projectLabels[system.meta.projectType] || system.meta.projectType,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      ),
    },
    {
      label: "Industry",
      value: industryLabels[system.meta.industry] || system.meta.industry,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <path d="M9 9h1" /><path d="M9 13h1" /><path d="M9 17h1" />
        </svg>
      ),
    },
    {
      label: "Visual Tone",
      value: toneLabels[system.meta.visualTone] || system.meta.visualTone,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="2.5" />
          <path d="M17 2.1a7 7 0 0 1 4 6.3 7 7 0 0 1-3.5 6.1" />
          <path d="M6.5 12.5a7 7 0 0 0 0 0" />
          <path d="M3 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
          <circle cx="11" cy="14" r="7" />
        </svg>
      ),
    },
    {
      label: "Interface Density",
      value: densityLabels[system.meta.density] || system.meta.density,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Language Setup",
      value: languageLabels[system.localization.languages] || system.localization.languages,
      badge: system.localization.rtl ? "RTL" : null,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" />
          <path d="M22 22l-5-10-5 10" /><path d="M14 18h6" />
        </svg>
      ),
    },
    {
      label: "Typography",
      value: `${system.typography.headingFont} / ${isBilingual ? system.typography.arabicBodyFont : system.typography.bodyFont}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
      ),
    },
  ];

  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const XIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.danger} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  const ovNavItems = [
    { id: "ov-hero", label: "Design System" },
    { id: "ov-why", label: "Why This Design" },
    { id: "ov-summary", label: "Quick Summary" },
    { id: "ov-palette", label: "Colour Palette" },
    { id: "ov-typography", label: "Typography" },
    { id: "ov-spacing", label: "Spacing & Shape" },
    { id: "ov-localization", label: "Localization" },
  ];

  const [activeSection, setActiveSection] = useState<string>("");

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    const sections = document.querySelectorAll("[data-tab-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const renderNavBtn = (item: { id: string; label: string }) => {
    const isActive = activeSection === item.id;
    return (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "5px 16px 5px 20px",
          fontSize: 12,
          fontWeight: isActive ? 600 : 400,
          color: isActive ? palette.primary : palette.textSecondary,
          backgroundColor: isActive ? palette.primary + "08" : "transparent",
          borderTop: "none",
          borderRight: "none",
          borderBottom: "none",
          borderLeftWidth: 2,
          borderLeftStyle: "solid",
          borderLeftColor: isActive ? palette.primary : "transparent",
          cursor: "pointer",
          transition: "all 0.15s",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.label}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", gap: 0, position: "relative" }}>
      <nav style={{
        width: 200,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        borderRight: `1px solid ${palette.border}`,
        padding: "24px 0",
        backgroundColor: palette.background,
      }}>
        <div style={{ padding: "0 16px 16px", fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Overview
        </div>
        {ovNavItems.map(renderNavBtn)}
      </nav>
      <div style={{ flex: 1, minWidth: 0, padding: "0 0 0 24px" }}>
      <div style={{ padding: 0 }}>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — HERO BANNER
          ════════════════════════════════════════════════════════════════ */}
      <motion.section id="ov-hero" data-tab-section {...fadeUp} style={{ marginBottom: 72 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            padding: "48px 40px",
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${palette.primary}, ${palette.accent})`,
            }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: palette.primary,
                marginTop: 0,
                marginBottom: 16,
              }}
            >
              DESIGN SYSTEM
            </p>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 700,
                fontFamily: system.typography.headingFont,
                color: palette.textPrimary,
                margin: 0,
                lineHeight: 1.15,
                marginBottom: 8,
              }}
            >
              {industryLabels[system.meta.industry] || system.meta.industry}
            </h1>
            <p
              style={{
                fontSize: 18,
                fontWeight: 400,
                fontFamily: system.typography.headingFont,
                color: palette.textSecondary,
                margin: 0,
                marginBottom: 20,
              }}
            >
              {projectLabels[system.meta.projectType] || system.meta.projectType}
            </p>
            <p
              style={{
                fontSize: 12,
                color: palette.textSecondary,
                margin: 0,
                fontFamily: "monospace",
              }}
            >
              Created {createdDate}
            </p>
          </div>

          <div style={{ flexShrink: 0 }}>
            {logoPreviewUrl ? (
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: system.spacing.radius.lg,
                  overflow: "hidden",
                  border: `1px solid ${palette.border}`,
                  backgroundColor: palette.background,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={logoPreviewUrl}
                  alt="Project logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: system.spacing.radius.lg,
                  backgroundColor: palette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: system.typography.headingFont,
                    color: textColorForBg(palette.primary),
                  }}
                >
                  {(system.name || "DS").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — EXPLAINABILITY (FR-11) — "Why This Design"
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="ov-why"
        data-tab-section
        {...fadeUp}
        transition={{ duration: 0.45, delay: 0.05 }}
        style={{ marginBottom: 72 }}
      >
        <div style={accentBar} />
        <h2 style={sectionTitleStyle}>Why This Design</h2>
        <p style={descriptionStyle}>
          The AI&#39;s reasoning for the design direction chosen based on your
          project inputs.
        </p>

        <div
          style={{
            backgroundColor: palette.surfaceMuted,
            borderLeft: `4px solid ${palette.primary}`,
            borderRadius: system.spacing.radius.md,
            padding: "32px 36px",
            position: "relative",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={palette.primary}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: 16, opacity: 0.7 }}
          >
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 12 18.469c-.874 0-1.713.346-2.329.962l-.209.21" />
          </svg>
          <p
            style={{
              fontSize: 16,
              fontStyle: "italic",
              color: palette.textPrimary,
              lineHeight: 1.8,
              margin: 0,
              fontFamily: system.typography.bodyFont,
            }}
          >
            {system.meta.explanation}
          </p>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — QUICK SUMMARY GRID
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="ov-summary"
        data-tab-section
        {...fadeUp}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{ marginBottom: 72 }}
      >
        <div style={accentBar} />
        <h2 style={sectionTitleStyle}>Quick Summary</h2>
        <p style={descriptionStyle}>
          Key decisions that shaped your design system at a glance.
        </p>

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {summaryCards.map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              style={{
                ...cardStyle,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: system.spacing.radius.md,
                    backgroundColor: `${palette.primary}12`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: palette.textSecondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {card.label}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: palette.textPrimary,
                    lineHeight: 1.4,
                  }}
                >
                  {card.value}
                </span>
                {"badge" in card && card.badge && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: system.spacing.radius.sm,
                      backgroundColor: palette.primary,
                      color: textColorForBg(palette.primary),
                      letterSpacing: "0.5px",
                    }}
                  >
                    {card.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — PALETTE PREVIEW
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="ov-palette"
        data-tab-section
        {...fadeUp}
        transition={{ duration: 0.45, delay: 0.15 }}
        style={{ marginBottom: 72 }}
      >
        <div style={accentBar} />
        <h2 style={sectionTitleStyle}>Colour Palette</h2>
        <p style={descriptionStyle}>
          The five hero colours and all supporting tokens that define the
          visual identity of this system.
        </p>

        <motion.div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 28,
          }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {heroColors.map((color) => (
            <motion.div
              key={color.key}
              variants={fadeUp}
              style={{
                flex: 1,
                height: 88,
                borderRadius: system.spacing.radius.md,
                backgroundColor: color.hex,
                border: `1px solid ${palette.border}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "12px 14px",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: textColorForBg(color.hex),
                  lineHeight: 1.2,
                }}
              >
                {color.name}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: textColorForBg(color.hex),
                  opacity: 0.75,
                  fontFamily: "monospace",
                  marginTop: 3,
                }}
              >
                {color.hex.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            gap: 10,
          }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {remainingTokens.map((token) => (
            <motion.div
              key={token.name}
              variants={fadeUp}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: system.spacing.radius.sm,
                  backgroundColor: token.hex,
                  border: `1px solid ${palette.border}`,
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: palette.textPrimary,
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {token.name}
              </span>
              <span
                style={{
                  fontSize: 8,
                  color: palette.textSecondary,
                  fontFamily: "monospace",
                }}
              >
                {token.hex.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 — TYPOGRAPHY PREVIEW
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="ov-typography"
        data-tab-section
        {...fadeUp}
        transition={{ duration: 0.45, delay: 0.2 }}
        style={{ marginBottom: 72 }}
      >
        <div style={accentBar} />
        <h2 style={sectionTitleStyle}>Typography</h2>
        <p style={descriptionStyle}>
          Font pairings for Latin and Arabic scripts with heading and body
          samples rendered at scale.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isBilingual ? "1fr 1fr" : "1fr",
            gap: 24,
          }}
        >
          {/* Latin Fonts */}
          <div style={cardStyle}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: palette.textSecondary,
                marginTop: 0,
                marginBottom: 24,
              }}
            >
              LATIN FONTS
            </p>

            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 10,
                  color: palette.textSecondary,
                  marginTop: 0,
                  marginBottom: 6,
                }}
              >
                Heading — {system.typography.headingFont}
              </p>
              <p
                style={{
                  fontFamily: system.typography.headingFont,
                  fontSize: system.typography.scale.h2,
                  fontWeight: system.typography.fontWeight.bold,
                  color: palette.textPrimary,
                  margin: 0,
                  lineHeight: system.typography.lineHeight.tight,
                }}
              >
                Design System
              </p>
            </div>

            <div style={{ height: 1, backgroundColor: palette.border, marginBottom: 20 }} />

            <div>
              <p
                style={{
                  fontSize: 10,
                  color: palette.textSecondary,
                  marginTop: 0,
                  marginBottom: 6,
                }}
              >
                Body — {system.typography.bodyFont}
              </p>
              <p
                style={{
                  fontFamily: system.typography.bodyFont,
                  fontSize: system.typography.scale.body,
                  fontWeight: system.typography.fontWeight.regular,
                  color: palette.textPrimary,
                  margin: 0,
                  lineHeight: system.typography.lineHeight.normal,
                }}
              >
                The quick brown fox jumps over the lazy dog. Every great
                design system begins with carefully chosen typographic
                pairings that balance legibility with brand identity.
              </p>
            </div>

            <div
              style={{
                marginTop: 20,
                padding: "12px 16px",
                backgroundColor: palette.surfaceMuted,
                borderRadius: system.spacing.radius.sm,
                display: "flex",
                gap: 24,
              }}
            >
              {[
                { label: "H1", size: system.typography.scale.h1 },
                { label: "H2", size: system.typography.scale.h2 },
                { label: "Body", size: system.typography.scale.body },
                { label: "Small", size: system.typography.scale.small },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: palette.textSecondary }}>
                    {item.size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Arabic Fonts */}
          {isBilingual && (
            <div style={cardStyle} dir="rtl">
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: palette.textSecondary,
                  marginTop: 0,
                  marginBottom: 24,
                }}
              >
                ARABIC FONTS
              </p>

              <div style={{ marginBottom: 20 }}>
                <p
                  style={{
                    fontSize: 10,
                    color: palette.textSecondary,
                    marginTop: 0,
                    marginBottom: 6,
                  }}
                >
                  {system.typography.arabicHeadingFont} — عنوان
                </p>
                <p
                  style={{
                    fontFamily: system.typography.arabicHeadingFont,
                    fontSize: system.typography.scale.h2,
                    fontWeight: system.typography.fontWeight.bold,
                    color: palette.textPrimary,
                    margin: 0,
                    lineHeight: system.typography.lineHeight.tight,
                  }}
                >
                  نظام التصميم
                </p>
              </div>

              <div style={{ height: 1, backgroundColor: palette.border, marginBottom: 20 }} />

              <div>
                <p
                  style={{
                    fontSize: 10,
                    color: palette.textSecondary,
                    marginTop: 0,
                    marginBottom: 6,
                  }}
                >
                  {system.typography.arabicBodyFont} — نص أساسي
                </p>
                <p
                  style={{
                    fontFamily: system.typography.arabicBodyFont,
                    fontSize: system.typography.scale.body,
                    fontWeight: system.typography.fontWeight.regular,
                    color: palette.textPrimary,
                    margin: 0,
                    lineHeight: system.typography.lineHeight.normal,
                  }}
                >
                  يبدأ كل نظام تصميم رائع باختيارات طباعية مدروسة توازن
                  بين سهولة القراءة وهوية العلامة التجارية. النص الجيد يعكس
                  روح المنتج ويوجه المستخدم بسلاسة.
                </p>
              </div>

              <div
                dir="ltr"
                style={{
                  marginTop: 20,
                  padding: "12px 16px",
                  backgroundColor: palette.surfaceMuted,
                  borderRadius: system.spacing.radius.sm,
                  display: "flex",
                  gap: 24,
                }}
              >
                {[
                  { label: "H1", size: system.typography.scale.h1 },
                  { label: "H2", size: system.typography.scale.h2 },
                  { label: "Body", size: system.typography.scale.body },
                  { label: "Small", size: system.typography.scale.small },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: 10, fontFamily: "monospace", color: palette.textSecondary }}>
                      {item.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 6 — SPACING & SHAPE SUMMARY
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="ov-spacing"
        data-tab-section
        {...fadeUp}
        transition={{ duration: 0.45, delay: 0.25 }}
        style={{ marginBottom: 72 }}
      >
        <div style={accentBar} />
        <h2 style={sectionTitleStyle}>Spacing &amp; Shape</h2>
        <p style={descriptionStyle}>
          Border radii, spacing scale, and the interface density profile.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {/* Border Radius */}
          <div style={cardStyle}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: palette.textSecondary,
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              BORDER RADIUS
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                gap: 16,
              }}
            >
              {(Object.entries(system.spacing.radius) as [string, string][]).map(
                ([key, val]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: val,
                        border: `2px solid ${palette.primary}`,
                        backgroundColor: `${palette.primary}14`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: palette.textPrimary,
                      }}
                    >
                      {key}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        color: palette.textSecondary,
                        fontFamily: "monospace",
                      }}
                    >
                      {val}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Spacing Scale */}
          <div style={cardStyle}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: palette.textSecondary,
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              SPACING SCALE
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                height: 120,
              }}
            >
              {system.spacing.scale.map((val, i) => {
                const maxVal = Math.max(...system.spacing.scale);
                const barHeight = Math.max(6, (val / maxVal) * 100);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 20,
                        height: barHeight,
                        backgroundColor: palette.primary,
                        borderRadius: system.spacing.radius.sm,
                        opacity: 0.3 + (i / system.spacing.scale.length) * 0.7,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 8,
                        color: palette.textSecondary,
                        fontFamily: "monospace",
                      }}
                    >
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Density */}
          <div
            style={{
              ...cardStyle,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: palette.textSecondary,
                  marginTop: 0,
                  marginBottom: 20,
                }}
              >
                DENSITY
              </p>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: system.typography.headingFont,
                  color: palette.textPrimary,
                  margin: 0,
                  marginBottom: 8,
                  textTransform: "capitalize",
                }}
              >
                {system.meta.density}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: palette.textSecondary,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {densityLabels[system.meta.density] || system.meta.density}
              </p>
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 4,
              }}
            >
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      (system.meta.density === "comfortable" && level <= 1) ||
                      (system.meta.density === "balanced" && level <= 2) ||
                      (system.meta.density === "dense" && level <= 3)
                        ? palette.primary
                        : `${palette.primary}20`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 7 — LOCALIZATION SUMMARY
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="ov-localization"
        data-tab-section
        {...fadeUp}
        transition={{ duration: 0.45, delay: 0.3 }}
        style={{ marginBottom: 0 }}
      >
        <div style={accentBar} />
        <h2 style={sectionTitleStyle}>Localization</h2>
        <p style={descriptionStyle}>
          Language support, directionality, and regional format settings.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: "Language Support",
              value: languageLabels[system.localization.languages] || system.localization.languages,
              enabled: true,
            },
            {
              label: "RTL Layout",
              value: system.localization.rtl ? "Enabled" : "Disabled",
              enabled: system.localization.rtl,
            },
            {
              label: "Regional Date Format",
              value: system.localization.regionalDate ? "Enabled" : "Disabled",
              enabled: system.localization.regionalDate,
            },
            {
              label: "Regional Number Format",
              value: system.localization.regionalNumber ? "Enabled" : "Disabled",
              enabled: system.localization.regionalNumber,
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                ...cardStyle,
                flex: "1 1 200px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: item.enabled
                    ? `${palette.success}18`
                    : `${palette.danger}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.enabled ? <CheckIcon /> : <XIcon />}
              </div>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: palette.textSecondary,
                    margin: 0,
                    marginBottom: 3,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: palette.textPrimary,
                    margin: 0,
                  }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
    </div>
    </div>
  );
}
