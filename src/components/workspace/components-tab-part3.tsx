"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart3Props {
  system: DesignSystem;
  content: IndustryContent;
  activeSection?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const accordionItems = [
  {
    title: "What payment methods are accepted?",
    body: "We accept all major credit cards, bank transfers, and digital wallet payments. Corporate accounts can also use purchase orders with NET-30 terms.",
  },
  {
    title: "How do I reset my password?",
    body: "Navigate to Settings → Security → Change Password. You will receive a verification code via email before the reset completes.",
  },
  {
    title: "Can I export my data?",
    body: "Yes, you can export all your data in CSV, JSON, or PDF format from the Data Management section under Settings.",
  },
];

const carouselCards = [
  { title: "Getting Started", desc: "Learn the basics and set up your first project in minutes." },
  { title: "Advanced Features", desc: "Unlock powerful tools for analytics, automation, and collaboration." },
  { title: "Best Practices", desc: "Tips and patterns from top teams to optimize your workflow." },
  { title: "Integrations", desc: "Connect with your favorite tools and services seamlessly." },
  { title: "Security Guide", desc: "Keep your data safe with our enterprise-grade security features." },
];

const footerLinks: Record<string, string[]> = {
  About: ["Company", "Team", "Careers", "Blog"],
  Resources: ["Documentation", "API Reference", "Tutorials"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const iconData: { name: string; path: React.ReactNode }[] = [
  { name: "Home", path: <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><polyline points="9 21 9 14 15 14 15 21" /></> },
  { name: "Search", path: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></> },
  { name: "Settings", path: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></> },
  { name: "User", path: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
  { name: "Bell", path: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></> },
  { name: "Mail", path: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" /></> },
  { name: "Calendar", path: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></> },
  { name: "Chart", path: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></> },
  { name: "Folder", path: <><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></> },
  { name: "Lock", path: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></> },
  { name: "Star", path: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></> },
  { name: "Heart", path: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></> },
];

export function ComponentsPart3({ system, content, activeSection }: ComponentsPart3Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;

  const [expandedAccordion, setExpandedAccordion] = useState<number>(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(60);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const visibleCards = carouselCards.slice(carouselIndex, carouselIndex + 3);

  const sectionSeparator: React.CSSProperties = {
    paddingBottom: 72,
    marginBottom: 72,
    borderBottom: `1px solid ${palette.border}`,
  };

  const accentBar: React.CSSProperties = {
    width: 48,
    height: 2,
    backgroundColor: palette.primary,
    marginBottom: 24,
    borderRadius: 1,
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    color: palette.textPrimary,
    fontFamily: system.typography.headingFont,
    marginBottom: 8,
    margin: 0,
    lineHeight: 1.2,
  };

  const sectionDesc: React.CSSProperties = {
    fontSize: 14,
    color: palette.textSecondary,
    lineHeight: 1.7,
    marginBottom: 40,
    maxWidth: 520,
    marginTop: 0,
  };

  const heroTokenGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: 32,
  };

  const tokenCard: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    padding: 24,
    alignSelf: "start",
  };

  const tokenTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: palette.primary,
    marginBottom: 16,
    marginTop: 0,
  };

  const variantLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: palette.textSecondary,
    marginBottom: 16,
    marginTop: 40,
  };

  function TokenRow({ label, value }: { label: string; value: string }) {
    return (
      <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span>{label}</span>
        <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>{value}</span>
      </div>
    );
  }

  function SearchIcon({ size = 16, color }: { size?: number; color?: string }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* ═══════════════════════════════════════════════
          1. ACCORDION
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-accordion" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={{ ...sectionSeparator, display: activeSection === "comp-accordion" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Accordion</h3>
        <p style={sectionDesc}>
          Expandable content panels for progressive disclosure. Used in FAQs, settings, and anywhere information density needs to be managed without overwhelming the viewer.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              overflow: "hidden",
            }}
          >
            {accordionItems.map((item, i) => {
              const isOpen = expandedAccordion === i;
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: i < accordionItems.length - 1 ? `1px solid ${palette.border}` : "none",
                  }}
                >
                  <button
                    onClick={() => setExpandedAccordion(isOpen ? -1 : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 24px",
                      background: isOpen ? palette.surfaceMuted : "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background-color 0.15s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: isOpen ? palette.primary : palette.textPrimary,
                        fontFamily: system.typography.bodyFont,
                        transition: "color 0.15s",
                      }}
                    >
                      {item.title}
                    </span>
                    <motion.svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke={isOpen ? palette.primary : palette.textSecondary}
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ flexShrink: 0, marginLeft: 12 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontSize: 13,
                            color: palette.textSecondary,
                            lineHeight: 1.7,
                            padding: "0 24px 20px",
                            margin: 0,
                            fontFamily: system.typography.bodyFont,
                          }}
                        >
                          {item.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Background" value={palette.surface} />
            <TokenRow label="Active bg" value={palette.surfaceMuted} />
            <TokenRow label="Padding" value="18px 24px" />
            <TokenRow label="Text" value={palette.textPrimary} />
            <TokenRow label="Active text" value={palette.primary} />
            <TokenRow label="Icon rotation" value="180deg" />
          </div>
        </div>

        {/* Variants */}
        <p style={variantLabel}>Variants</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {/* Default */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 10 }}>Default</p>
            <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
              {["Section one", "Section two"].map((t, i) => (
                <div key={i} style={{ padding: "12px 16px", borderBottom: i === 0 ? `1px solid ${palette.border}` : "none", fontSize: 13, fontWeight: 500, color: palette.textPrimary, display: "flex", justifyContent: "space-between" }}>
                  {t}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              ))}
            </div>
          </div>
          {/* Bordered */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 10 }}>Bordered</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Section one", "Section two"].map((t, i) => (
                <div key={i} style={{ padding: "12px 16px", border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, fontSize: 13, fontWeight: 500, color: palette.textPrimary, backgroundColor: palette.surface, display: "flex", justifyContent: "space-between" }}>
                  {t}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              ))}
            </div>
          </div>
          {/* Flush */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 10 }}>Flush</p>
            <div>
              {["Section one", "Section two"].map((t, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${palette.border}`, fontSize: 13, fontWeight: 500, color: palette.textPrimary, display: "flex", justifyContent: "space-between" }}>
                  {t}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          2. AVATAR
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-avatar" data-comp-section {...fadeUp} transition={{ delay: 0.05 }} style={{ ...sectionSeparator, display: activeSection === "comp-avatar" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Avatar</h3>
        <p style={sectionDesc}>
          Visual identity tokens for users and entities. Scales from compact inline mentions to prominent profile headers with optional status rings.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero — Profile card */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 32,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: palette.primary,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: system.typography.headingFont,
                }}
              >
                SR
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: palette.success,
                  border: `3px solid ${palette.surface}`,
                }}
              />
            </div>
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>Sarah Reynolds</p>
              <p style={{ fontSize: 13, color: palette.textSecondary, margin: "4px 0 0" }}>Senior Product Designer</p>
              <p style={{ fontSize: 12, color: palette.primary, margin: "6px 0 0", fontWeight: 500 }}>View profile →</p>
            </div>
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="XS" value="24 × 24" />
            <TokenRow label="SM" value="32 × 32" />
            <TokenRow label="MD" value="40 × 40" />
            <TokenRow label="LG" value="48 × 48" />
            <TokenRow label="XL" value="64 × 64" />
            <div style={{ height: 1, backgroundColor: palette.border, margin: "12px 0" }} />
            <TokenRow label="Border radius" value="50% (full)" />
            <TokenRow label="Status ring" value={`3px ${palette.surface}`} />
            <TokenRow label="Online" value={palette.success} />
            <TokenRow label="Away" value={palette.warning} />
            <TokenRow label="Offline" value={palette.border} />
          </div>
        </div>

        {/* Variants */}
        <p style={variantLabel}>Variants</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Size row */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>All Sizes</p>
            <div style={{ display: "flex", alignItems: "end", gap: 16 }}>
              {([
                { size: 24, label: "XS", initials: "A", bg: palette.primary },
                { size: 32, label: "SM", initials: "BK", bg: palette.secondary },
                { size: 40, label: "MD", initials: "CL", bg: palette.accent },
                { size: 48, label: "LG", initials: "DM", bg: palette.success },
                { size: 64, label: "XL", initials: "EF", bg: palette.primary },
              ] as const).map((av) => (
                <div key={av.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: av.size,
                      height: av.size,
                      borderRadius: "50%",
                      backgroundColor: av.bg,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: Math.max(av.size * 0.35, 10),
                      fontWeight: 600,
                      fontFamily: system.typography.bodyFont,
                    }}
                  >
                    {av.initials}
                  </div>
                  <span style={{ fontSize: 10, color: palette.textSecondary, fontWeight: 500 }}>{av.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Avatar Group (overlap)</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              {([
                { initials: "SA", bg: palette.primary },
                { initials: "MK", bg: palette.secondary },
                { initials: "FZ", bg: palette.accent },
                { initials: "RL", bg: palette.success },
              ]).map((av, i) => (
                <div
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: av.bg,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    border: `2px solid ${palette.surface}`,
                    marginLeft: i > 0 ? -10 : 0,
                    position: "relative",
                    zIndex: 4 - i,
                  }}
                >
                  {av.initials}
                </div>
              ))}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: palette.surfaceMuted,
                  color: palette.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  border: `2px solid ${palette.surface}`,
                  marginLeft: -10,
                  position: "relative",
                  zIndex: 0,
                }}
              >
                +3
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Status Indicators</p>
            <div style={{ display: "flex", gap: 24 }}>
              {([
                { initials: "ON", bg: palette.primary, status: palette.success, label: "Online" },
                { initials: "AW", bg: palette.secondary, status: palette.warning, label: "Away" },
                { initials: "OF", bg: palette.accent, status: palette.border, label: "Offline" },
              ]).map((av) => (
                <div key={av.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: av.bg, color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>
                      {av.initials}
                    </div>
                    <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", backgroundColor: av.status, border: `2px solid ${palette.surface}` }} />
                  </div>
                  <span style={{ fontSize: 10, color: palette.textSecondary, fontWeight: 500 }}>{av.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          3. CAROUSEL
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-carousel" data-comp-section {...fadeUp} transition={{ delay: 0.1 }} style={{ ...sectionSeparator, display: activeSection === "comp-carousel" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Carousel</h3>
        <p style={sectionDesc}>
          Horizontally paginated card sequences for feature highlights, onboarding flows, and content previews. Arrow navigation with dot pagination.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 28,
              position: "relative",
            }}
          >
            <button
              onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
              disabled={carouselIndex === 0}
              style={{
                position: "absolute",
                left: 8,
                top: "calc(50% - 16px)",
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: carouselIndex === 0 ? "default" : "pointer",
                opacity: carouselIndex === 0 ? 0.35 : 1,
                zIndex: 2,
                boxShadow: system.spacing.elevation.sm,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            <div style={{ display: "flex", gap: 14, overflow: "hidden", padding: "0 20px" }}>
              {visibleCards.map((card, i) => (
                <motion.div
                  key={carouselIndex + i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  style={{
                    flex: "1 1 0",
                    backgroundColor: palette.background,
                    border: `1px solid ${palette.border}`,
                    borderRadius: system.spacing.radius.md,
                    padding: 20,
                    minHeight: 100,
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 8, margin: 0 }}>{card.title}</p>
                  <p style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.6, margin: "8px 0 0" }}>{card.desc}</p>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setCarouselIndex(Math.min(carouselCards.length - 3, carouselIndex + 1))}
              disabled={carouselIndex >= carouselCards.length - 3}
              style={{
                position: "absolute",
                right: 8,
                top: "calc(50% - 16px)",
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: carouselIndex >= carouselCards.length - 3 ? "default" : "pointer",
                opacity: carouselIndex >= carouselCards.length - 3 ? 0.35 : 1,
                zIndex: 2,
                boxShadow: system.spacing.elevation.sm,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
              {carouselCards.slice(0, carouselCards.length - 2).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  style={{
                    width: i === carouselIndex ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: i === carouselIndex ? palette.primary : palette.border,
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.25s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Card bg" value={palette.background} />
            <TokenRow label="Card border" value={palette.border} />
            <TokenRow label="Active dot" value={palette.primary} />
            <TokenRow label="Inactive dot" value={palette.border} />
            <TokenRow label="Arrow bg" value={palette.surface} />
            <TokenRow label="Gap" value="14px" />
            <TokenRow label="Card radius" value={system.spacing.radius.md} />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          4. FOOTER
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-footer" data-comp-section {...fadeUp} transition={{ delay: 0.15 }} style={{ ...sectionSeparator, display: activeSection === "comp-footer" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Footer</h3>
        <p style={sectionDesc}>
          The page anchor — organizes secondary navigation, legal links, and brand presence into a structured, scannable layout with social connections.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero */}
          <div
            style={{
              backgroundColor: palette.surfaceMuted,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "28px 28px 0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, paddingBottom: 24, borderBottom: `1px solid ${palette.border}` }}>
                {Object.entries(footerLinks).map(([group, links]) => (
                  <div key={group}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: palette.textPrimary, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12, marginTop: 0 }}>
                      {group}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {links.map((link) => (
                        <span key={link} style={{ fontSize: 13, color: palette.textSecondary, cursor: "pointer", lineHeight: 1.4 }}>
                          {link}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Social + Copyright */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
              <span style={{ fontSize: 11, color: palette.textSecondary }}>&copy; 2026 {content.orgName}</span>
              <div style={{ display: "flex", gap: 8 }}>
                {["T", "G", "L", "D"].map((letter, i) => (
                  <div
                    key={i}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      backgroundColor: palette.primary + "18",
                      border: `1px solid ${palette.primary}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: palette.primary,
                      cursor: "pointer",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.surfaceMuted} />
            <TokenRow label="Text" value={palette.textSecondary} />
            <TokenRow label="Heading" value={palette.textPrimary} />
            <TokenRow label="Link hover" value={palette.primary} />
            <TokenRow label="Social ring" value={`${palette.primary}30`} />
            <TokenRow label="Divider" value={palette.border} />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          5. ICON LIBRARY
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-icon-library" data-comp-section {...fadeUp} transition={{ delay: 0.2 }} style={{ ...sectionSeparator, display: activeSection === "comp-icon-library" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Icon Library</h3>
        <p style={sectionDesc}>
          A curated set of interface icons rendered as lightweight SVG line drawings. Consistent stroke weight ensures harmony across navigation, actions, and status indicators.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero — 6×2 grid */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 24,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
              {iconData.map((icon) => (
                <div
                  key={icon.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 4px",
                    backgroundColor: palette.background,
                    border: `1px solid ${palette.border}`,
                    borderRadius: system.spacing.radius.md,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {icon.path}
                  </svg>
                  <span style={{ fontSize: 9, color: palette.textSecondary, fontWeight: 500, letterSpacing: "0.3px" }}>{icon.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Color" value={palette.textPrimary} />
            <TokenRow label="Default size" value="22px" />
            <TokenRow label="Small size" value="16px" />
            <TokenRow label="Large size" value="28px" />
            <TokenRow label="Stroke width" value="1.5px" />
            <TokenRow label="Line cap" value="round" />
            <TokenRow label="Line join" value="round" />
          </div>
        </div>

        {/* Variants — size comparison */}
        <p style={variantLabel}>Size Variants</p>
        <div style={{ display: "flex", gap: 40, alignItems: "end" }}>
          {([
            { label: "Small (16px)", size: 16, sw: "1.5" },
            { label: "Default (22px)", size: 22, sw: "1.5" },
            { label: "Large (28px)", size: 28, sw: "1.5" },
          ]).map((v) => (
            <div key={v.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 12 }}>
                {iconData.slice(0, 4).map((icon) => (
                  <svg key={icon.name} width={v.size} height={v.size} viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth={v.sw} strokeLinecap="round" strokeLinejoin="round">
                    {icon.path}
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: 11, color: palette.textSecondary, fontWeight: 500 }}>{v.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          6. SEARCH BAR
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-search-bar" data-comp-section {...fadeUp} transition={{ delay: 0.25 }} style={{ ...sectionSeparator, display: activeSection === "comp-search-bar" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Search Bar</h3>
        <p style={sectionDesc}>
          The gateway to content discovery. Equipped with search affordances, keyboard shortcut hints, and progressive suggestion overlays for instant results.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: palette.background,
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.md,
                padding: "12px 16px",
                width: "100%",
                maxWidth: 400,
                boxShadow: system.spacing.elevation.sm,
              }}
            >
              <SearchIcon size={18} />
              <span style={{ flex: 1, fontSize: 14, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>Search...</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: palette.textSecondary,
                  backgroundColor: palette.surfaceMuted,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.sm,
                  padding: "3px 10px",
                  letterSpacing: "0.04em",
                  fontFamily: "monospace",
                }}
              >
                ⌘K
              </span>
            </div>
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.background} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Placeholder" value={palette.textSecondary} />
            <TokenRow label="Border radius" value={system.spacing.radius.md} />
            <TokenRow label="Padding" value="12px 16px" />
            <TokenRow label="Focus border" value={palette.primary} />
            <TokenRow label="Badge bg" value={palette.surfaceMuted} />
          </div>
        </div>

        {/* Variants */}
        <p style={variantLabel}>Variants</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {/* Default */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Default</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: palette.background, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: "10px 14px" }}>
              <SearchIcon size={15} />
              <span style={{ fontSize: 13, color: palette.textSecondary }}>Search anything...</span>
            </div>
          </div>

          {/* With dropdown */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>With Suggestions</p>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: palette.background, border: `1px solid ${palette.primary}`, borderRadius: system.spacing.radius.md, padding: "10px 14px" }}>
                <SearchIcon size={15} />
                <span style={{ fontSize: 13, color: palette.textPrimary }}>Dashb</span>
              </div>
              <div style={{ marginTop: 4, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, boxShadow: system.spacing.elevation.lg, overflow: "hidden" }}>
                {["Dashboard Overview", "Dashboard Settings"].map((item, i) => (
                  <div key={item} style={{ padding: "8px 14px", fontSize: 12, color: i === 0 ? palette.textPrimary : palette.textSecondary, backgroundColor: i === 0 ? palette.primary + "10" : "transparent", display: "flex", alignItems: "center", gap: 8 }}>
                    <SearchIcon size={12} color={i === 0 ? palette.primary : palette.textSecondary} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compact */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Compact</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: palette.background, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, padding: "6px 10px", maxWidth: 200 }}>
              <SearchIcon size={13} />
              <span style={{ fontSize: 12, color: palette.textSecondary }}>Search...</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          7. SLIDER
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-slider" data-comp-section {...fadeUp} transition={{ delay: 0.3 }} style={{ ...sectionSeparator, display: activeSection === "comp-slider" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Slider</h3>
        <p style={sectionDesc}>
          Continuous range inputs for precise value selection. The filled track and branded thumb provide clear visual feedback on the selected position.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero — interactive slider */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>Volume</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: palette.primary, fontFamily: "monospace" }}>{sliderValue}%</span>
            </div>
            <div
              style={{ position: "relative", height: 24, cursor: "pointer" }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
                setSliderValue(pct);
              }}
            >
              <div style={{ position: "absolute", top: 10, left: 0, right: 0, height: 4, backgroundColor: palette.border, borderRadius: 2 }} />
              <div style={{ position: "absolute", top: 10, left: 0, width: `${sliderValue}%`, height: 4, backgroundColor: palette.primary, borderRadius: 2 }} />
              <div
                style={{
                  position: "absolute",
                  top: 5,
                  left: `${sliderValue}%`,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: palette.primary,
                  border: "3px solid #ffffff",
                  boxShadow: `0 1px 4px rgba(0,0,0,0.18), 0 0 0 2px ${palette.primary}30`,
                  transform: "translateX(-50%)",
                  transition: "left 0.05s",
                }}
              />
            </div>
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Track bg" value={palette.border} />
            <TokenRow label="Fill" value={palette.primary} />
            <TokenRow label="Thumb" value={palette.primary} />
            <TokenRow label="Thumb ring" value="#ffffff" />
            <TokenRow label="Track height" value="4px" />
            <TokenRow label="Thumb size" value="14px" />
            <TokenRow label="Focus ring" value={`${palette.primary}30`} />
          </div>
        </div>

        {/* Variants */}
        <p style={variantLabel}>Variants</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {/* Single */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Single</p>
            <div style={{ position: "relative", height: 20 }}>
              <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 4, backgroundColor: palette.border, borderRadius: 2 }} />
              <div style={{ position: "absolute", top: 8, left: 0, width: "55%", height: 4, backgroundColor: palette.primary, borderRadius: 2 }} />
              <div style={{ position: "absolute", top: 3, left: "55%", width: 14, height: 14, borderRadius: "50%", backgroundColor: palette.primary, border: "3px solid #ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transform: "translateX(-50%)" }} />
            </div>
          </div>

          {/* Dual range */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Dual Range</p>
            <div style={{ position: "relative", height: 20 }}>
              <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 4, backgroundColor: palette.border, borderRadius: 2 }} />
              <div style={{ position: "absolute", top: 8, left: "25%", width: "40%", height: 4, backgroundColor: palette.primary, borderRadius: 2 }} />
              <div style={{ position: "absolute", top: 3, left: "25%", width: 14, height: 14, borderRadius: "50%", backgroundColor: palette.primary, border: "3px solid #ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transform: "translateX(-50%)" }} />
              <div style={{ position: "absolute", top: 3, left: "65%", width: 14, height: 14, borderRadius: "50%", backgroundColor: palette.primary, border: "3px solid #ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transform: "translateX(-50%)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: palette.textSecondary }}>25</span>
              <span style={{ fontSize: 11, color: palette.textSecondary }}>65</span>
            </div>
          </div>

          {/* With value tooltip */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Value</p>
            <div style={{ position: "relative", height: 36, marginTop: 4 }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "45%",
                  transform: "translateX(-50%)",
                  backgroundColor: palette.primary,
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: system.spacing.radius.sm,
                }}
              >
                45
                <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `4px solid ${palette.primary}` }} />
              </div>
              <div style={{ position: "absolute", top: 24, left: 0, right: 0, height: 4, backgroundColor: palette.border, borderRadius: 2 }} />
              <div style={{ position: "absolute", top: 24, left: 0, width: "45%", height: 4, backgroundColor: palette.primary, borderRadius: 2 }} />
              <div style={{ position: "absolute", top: 19, left: "45%", width: 14, height: 14, borderRadius: "50%", backgroundColor: palette.primary, border: "3px solid #ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transform: "translateX(-50%)" }} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          8. TOGGLE
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-toggle" data-comp-section {...fadeUp} transition={{ delay: 0.35 }} style={{ ...sectionSeparator, display: activeSection === "comp-toggle" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Toggle</h3>
        <p style={sectionDesc}>
          Binary state switches for preferences and feature flags. Tactile thumb movement and color transitions provide immediate, unmistakable feedback.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero — settings panel */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 28,
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, marginTop: 0, marginBottom: 24, fontFamily: system.typography.headingFont }}>Preferences</p>
            {[
              { label: "Enable notifications", desc: "Receive alerts for new activity", idx: 0 },
              { label: "Dark mode", desc: "Switch to a darker color scheme", idx: 1 },
              { label: "Auto-save", desc: "Save changes automatically every 30 seconds", idx: 2 },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderTop: i > 0 ? `1px solid ${palette.border}` : "none",
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: palette.textPrimary, margin: 0 }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: palette.textSecondary, margin: "2px 0 0" }}>{item.desc}</p>
                </div>
                <div
                  onClick={() => {
                    const next = [...toggleStates];
                    next[item.idx] = !next[item.idx];
                    setToggleStates(next);
                  }}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: toggleStates[item.idx] ? palette.primary : palette.border,
                    position: "relative",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      left: toggleStates[item.idx] ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      transition: "left 0.2s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Track (on)" value={palette.primary} />
            <TokenRow label="Track (off)" value={palette.border} />
            <TokenRow label="Thumb" value="#ffffff" />
            <TokenRow label="Track size" value="44 × 24" />
            <TokenRow label="Thumb size" value="20px" />
            <TokenRow label="Border radius" value="12px" />
            <TokenRow label="Transition" value="0.2s ease" />
          </div>
        </div>

        {/* Variants */}
        <p style={variantLabel}>States</p>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
          {([
            { label: "On", on: true, disabled: false },
            { label: "Off", on: false, disabled: false },
            { label: "Disabled On", on: true, disabled: true },
            { label: "Disabled Off", on: false, disabled: true },
          ]).map((toggle) => (
            <div key={toggle.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: toggle.on ? palette.primary : palette.border,
                  position: "relative",
                  cursor: toggle.disabled ? "not-allowed" : "pointer",
                  opacity: toggle.disabled ? 0.4 : 1,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: toggle.on ? 22 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
              <span style={{ fontSize: 10, color: palette.textSecondary, fontWeight: 500 }}>{toggle.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          9. TOOLTIP
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-tooltip" data-comp-section {...fadeUp} transition={{ delay: 0.4 }} style={{ paddingBottom: 24, display: activeSection === "comp-tooltip" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Tooltip</h3>
        <p style={sectionDesc}>
          Contextual information overlays that appear on hover or focus. Available in dark and light themes with four positional variants and directional arrows.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero — buttons with visible tooltips */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "40px 32px",
              display: "flex",
              gap: 40,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Dark tooltip top */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: palette.textPrimary,
                  color: palette.surface,
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "6px 12px",
                  borderRadius: system.spacing.radius.sm,
                  marginBottom: 8,
                  position: "relative",
                  whiteSpace: "nowrap",
                }}
              >
                Click to save
                <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${palette.textPrimary}` }} />
              </div>
              <div style={{ padding: "8px 18px", fontSize: 13, fontWeight: 500, backgroundColor: palette.primary, color: "#ffffff", borderRadius: system.spacing.radius.md, cursor: "pointer" }}>
                Save
              </div>
            </div>

            {/* Light tooltip bottom */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ padding: "8px 18px", fontSize: 13, fontWeight: 500, backgroundColor: palette.surfaceMuted, color: palette.textPrimary, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, cursor: "pointer" }}>
                Edit
              </div>
              <div
                style={{
                  backgroundColor: palette.surface,
                  color: palette.textPrimary,
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "6px 12px",
                  borderRadius: system.spacing.radius.sm,
                  border: `1px solid ${palette.border}`,
                  boxShadow: system.spacing.elevation.sm,
                  marginTop: 8,
                  position: "relative",
                  whiteSpace: "nowrap",
                }}
              >
                Edit details
                <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: `5px solid ${palette.surface}` }} />
              </div>
            </div>
          </div>

          {/* Tokens */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Dark bg" value={palette.textPrimary} />
            <TokenRow label="Dark text" value={palette.surface} />
            <TokenRow label="Light bg" value={palette.surface} />
            <TokenRow label="Light text" value={palette.textPrimary} />
            <TokenRow label="Light border" value={palette.border} />
            <TokenRow label="Border radius" value={system.spacing.radius.sm} />
            <TokenRow label="Arrow size" value="5px" />
          </div>
        </div>

        {/* Variants */}
        <p style={variantLabel}>Positions</p>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
          {/* Top */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ backgroundColor: palette.textPrimary, color: palette.surface, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: system.spacing.radius.sm, position: "relative", marginBottom: 8 }}>
              Top
              <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `4px solid ${palette.textPrimary}` }} />
            </div>
            <div style={{ width: 56, height: 32, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: palette.textSecondary }}>
              Top
            </div>
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 56, height: 32, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: palette.textSecondary }}>
              Bottom
            </div>
            <div style={{ backgroundColor: palette.textPrimary, color: palette.surface, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: system.spacing.radius.sm, position: "relative", marginTop: 8 }}>
              Bottom
              <div style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: `4px solid ${palette.textPrimary}` }} />
            </div>
          </div>

          {/* Left */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ backgroundColor: palette.textPrimary, color: palette.surface, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: system.spacing.radius.sm, position: "relative", marginRight: 8 }}>
              Left
              <div style={{ position: "absolute", top: "50%", right: -4, transform: "translateY(-50%)", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `4px solid ${palette.textPrimary}` }} />
            </div>
            <div style={{ width: 56, height: 32, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: palette.textSecondary }}>
              Left
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 56, height: 32, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: palette.textSecondary }}>
              Right
            </div>
            <div style={{ backgroundColor: palette.textPrimary, color: palette.surface, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: system.spacing.radius.sm, position: "relative", marginLeft: 8 }}>
              Right
              <div style={{ position: "absolute", top: "50%", left: -4, transform: "translateY(-50%)", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderRight: `4px solid ${palette.textPrimary}` }} />
            </div>
          </div>
        </div>

        {/* Theme variants */}
        <p style={variantLabel}>Themes</p>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ backgroundColor: palette.textPrimary, color: palette.surface, fontSize: 12, fontWeight: 500, padding: "6px 14px", borderRadius: system.spacing.radius.sm, position: "relative" }}>
              Dark theme
              <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${palette.textPrimary}` }} />
            </div>
            <span style={{ fontSize: 10, color: palette.textSecondary, marginTop: 4 }}>Dark</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ backgroundColor: palette.surface, color: palette.textPrimary, fontSize: 12, fontWeight: 500, padding: "6px 14px", borderRadius: system.spacing.radius.sm, border: `1px solid ${palette.border}`, boxShadow: system.spacing.elevation.sm, position: "relative" }}>
              Light theme
              <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${palette.surface}` }} />
            </div>
            <span style={{ fontSize: 10, color: palette.textSecondary, marginTop: 4 }}>Light</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
