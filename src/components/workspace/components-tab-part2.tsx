"use client";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart2Props {
  system: DesignSystem;
  content: IndustryContent;
  activeSection?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function ComponentsPart2({ system, content, activeSection }: ComponentsPart2Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

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
  };

  const editorialDesc: React.CSSProperties = {
    fontSize: 14,
    color: palette.textSecondary,
    lineHeight: 1.7,
    marginBottom: 40,
    maxWidth: 520,
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
  };

  const tokenTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: palette.primary,
    marginBottom: 16,
  };

  const tokenRow: React.CSSProperties = {
    fontSize: 13,
    color: palette.textSecondary,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  };

  const tokenValue: React.CSSProperties = {
    fontFamily: "monospace",
    fontSize: 12,
    color: palette.textPrimary,
  };

  const variantLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: palette.textSecondary,
    marginBottom: 16,
  };

  const sectionDivider = (isLast: boolean): React.CSSProperties => ({
    paddingBottom: isLast ? 0 : 72,
    marginBottom: isLast ? 0 : 72,
    borderBottom: isLast ? "none" : `1px solid ${palette.border}`,
  });

  const btnBase: React.CSSProperties = {
    borderRadius: comp.button.borderRadius,
    fontWeight: comp.button.fontWeight,
    fontSize: 13,
    cursor: "pointer",
    border: "none",
  };

  const inputBase: React.CSSProperties = {
    backgroundColor: palette.background,
    border: `1px solid ${palette.border}`,
    color: palette.textPrimary,
    padding: `${comp.input.paddingY} ${comp.input.paddingX}`,
    borderRadius: comp.input.borderRadius,
    fontSize: 13,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    color: palette.textPrimary,
    display: "block",
    marginBottom: 6,
  };

  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes pulse {
      0% { opacity: 0.5; }
      50% { opacity: 1; }
      100% { opacity: 0.5; }
    }
    .palette-shimmer {
      background-image: linear-gradient(90deg, ${palette.surfaceMuted} 25%, ${palette.border} 50%, ${palette.surfaceMuted} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.8s ease-in-out infinite;
      border-radius: ${system.spacing.radius.sm};
    }
  `;

  function TokenRow({ label, value }: { label: string; value: string }) {
    return (
      <div style={tokenRow}>
        <span>{label}</span>
        <span style={tokenValue}>{value}</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <style>{shimmerKeyframes}</style>

      {/* ─── 1. SIDEBARS ─── */}
      <motion.section id="comp-sidebars" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={{ ...sectionDivider(false), display: activeSection === "comp-sidebars" ? undefined : "none" }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Sidebars</h2>
        <p style={editorialDesc}>
          The structural backbone of navigation. A well-designed sidebar balances density with clarity — grouping related actions, surfacing urgency through badges, and collapsing gracefully when space is scarce.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero: Expanded sidebar */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "20px 0",
              height: 400,
              overflow: "hidden",
              width: 260,
            }}
          >
            <div style={{ padding: "0 16px 16px", borderBottom: `1px solid ${palette.border}`, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: system.spacing.radius.md,
                    backgroundColor: palette.primary,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {content.orgName.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, lineHeight: 1.2 }}>{content.orgName}</p>
                  <p style={{ fontSize: 10, color: palette.textSecondary, letterSpacing: "0.05em" }}>{content.orgSubtitle}</p>
                </div>
              </div>
            </div>

            {content.sidebarSections.map((section) => (
              <div key={section.label} style={{ marginBottom: 8 }}>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: palette.textSecondary, padding: "8px 16px 4px", textTransform: "uppercase" }}>
                  {section.label}
                </p>
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 16px",
                      margin: "0 8px",
                      borderRadius: system.spacing.radius.md,
                      backgroundColor: item.active ? palette.primary : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        backgroundColor: item.active ? "rgba(255,255,255,0.3)" : palette.border,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: item.active ? 600 : 400, color: item.active ? "#ffffff" : palette.textPrimary, flex: 1 }}>
                      {item.name}
                    </span>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: "9999px",
                          backgroundColor: item.active ? "rgba(255,255,255,0.25)" : palette.primary + "18",
                          color: item.active ? "#ffffff" : palette.primary,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Token card */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="background" value={palette.surface} />
            <TokenRow label="width" value="260px" />
            <TokenRow label="padding" value="20px 0" />
            <TokenRow label="active-bg" value={palette.primary} />
            <TokenRow label="active-text" value="#ffffff" />
            <TokenRow label="inactive-text" value={palette.textPrimary} />
            <TokenRow label="border" value={palette.border} />
            <TokenRow label="item-radius" value={system.spacing.radius.md} />
          </div>
        </div>

        {/* Variants */}
        <div style={{ marginTop: 40 }}>
          <p style={variantLabel}>Variants</p>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Expanded</p>
              <div
                style={{
                  width: 220,
                  height: 180,
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.lg,
                  padding: "14px 0",
                  overflow: "hidden",
                }}
              >
                {content.sidebarSections.flatMap((s) => s.items).slice(0, 5).map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 14px",
                      margin: "0 6px",
                      borderRadius: system.spacing.radius.md,
                      backgroundColor: item.active ? palette.primary : "transparent",
                    }}
                  >
                    <span style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: item.active ? "rgba(255,255,255,0.3)" : palette.border, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: item.active ? "#ffffff" : palette.textPrimary }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Collapsed (Icon-only)</p>
              <div
                style={{
                  width: 52,
                  height: 180,
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.lg,
                  padding: "14px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: system.spacing.radius.md,
                    backgroundColor: palette.primary,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {content.orgName.charAt(0)}
                </div>
                {content.sidebarSections.flatMap((s) => s.items).slice(0, 5).map((item) => (
                  <div
                    key={item.name}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: system.spacing.radius.md,
                      backgroundColor: item.active ? palette.primary : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <span style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: item.active ? "rgba(255,255,255,0.3)" : palette.border }} />
                    {item.badge && (
                      <span style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, borderRadius: "50%", backgroundColor: palette.primary }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 2. NAV BARS ─── */}
      <motion.section id="comp-nav-bars" data-comp-section {...fadeUp} transition={{ delay: 0.05 }} style={{ ...sectionDivider(false), display: activeSection === "comp-nav-bars" ? undefined : "none" }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Nav Bars</h2>
        <p style={editorialDesc}>
          The persistent header that anchors every view. It carries brand presence, global search, and quick-access actions — providing orientation without stealing focus from the content below.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero: Top navigation bar */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: system.spacing.radius.md,
                    backgroundColor: palette.primary,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {content.orgName.charAt(0)}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{content.orgName}</span>
              </div>

              <div
                style={{
                  ...inputBase,
                  width: 220,
                  padding: "6px 12px",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: palette.textSecondary,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search {content.orgName}...</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ position: "relative", cursor: "pointer", color: palette.textSecondary }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.danger }} />
                </span>
                <span style={{ cursor: "pointer", color: palette.textSecondary }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </span>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: palette.primary + "20",
                    border: `2px solid ${palette.primary}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: palette.primary }}>SA</span>
                </div>
              </div>
            </div>

            {/* Breadcrumb area below the bar to give context */}
            <div style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 6 }}>
              {content.breadcrumb.map((crumb, i) => (
                <span key={crumb} style={{ fontSize: 12, color: i === content.breadcrumb.length - 1 ? palette.textPrimary : palette.textSecondary }}>
                  {crumb}{i < content.breadcrumb.length - 1 && <span style={{ marginLeft: 6, color: palette.border }}>/</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Token card */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="background" value={palette.surface} />
            <TokenRow label="border" value={palette.border} />
            <TokenRow label="height" value="52px" />
            <TokenRow label="text-color" value={palette.textPrimary} />
            <TokenRow label="icon-color" value={palette.textSecondary} />
            <TokenRow label="search-bg" value={palette.background} />
            <TokenRow label="avatar-ring" value={palette.primary} />
            <TokenRow label="notif-dot" value={palette.danger} />
          </div>
        </div>

        {/* Variants */}
        <div style={{ marginTop: 40 }}>
          <p style={variantLabel}>Variants</p>
          <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
            <div>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Transparent / Overlay</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  borderRadius: system.spacing.radius.lg,
                  border: `1px dashed ${palette.border}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: system.spacing.radius.md, backgroundColor: palette.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{content.orgName.charAt(0)}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{content.orgName}</span>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: palette.border }} />
                  <span style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: palette.border }} />
                  <span style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: palette.primary + "20", border: `2px solid ${palette.primary}` }} />
                </div>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Solid / Bordered</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  borderRadius: system.spacing.radius.lg,
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: system.spacing.radius.md, backgroundColor: palette.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{content.orgName.charAt(0)}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{content.orgName}</span>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: palette.border }} />
                  <span style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: palette.border }} />
                  <span style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: palette.primary + "20", border: `2px solid ${palette.primary}` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 3. MODALS ─── */}
      <motion.section id="comp-modals" data-comp-section {...fadeUp} transition={{ delay: 0.1 }} style={{ ...sectionDivider(false), display: activeSection === "comp-modals" ? undefined : "none" }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Modals</h2>
        <p style={editorialDesc}>
          A focused interruption that demands attention. Modals isolate a task from the surrounding interface — whether capturing input through a form or confirming a destructive action — always with a clear escape route.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero: Modal with backdrop */}
          <div
            style={{
              position: "relative",
              borderRadius: system.spacing.radius.lg,
              overflow: "hidden",
              height: 380,
              backgroundColor: palette.background,
              border: `1px solid ${palette.border}`,
            }}
          >
            {/* Dimmed content behind */}
            <div style={{ position: "absolute", inset: 0, padding: 20, opacity: 0.3 }}>
              <div style={{ height: 14, width: "40%", backgroundColor: palette.border, borderRadius: 4, marginBottom: 12 }} />
              <div style={{ height: 10, width: "70%", backgroundColor: palette.border, borderRadius: 4, marginBottom: 8 }} />
              <div style={{ height: 10, width: "55%", backgroundColor: palette.border, borderRadius: 4, marginBottom: 8 }} />
            </div>

            {/* Semi-transparent backdrop */}
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }} />

            {/* Modal card */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "85%",
                maxWidth: 380,
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.lg,
                boxShadow: system.spacing.elevation.xl,
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${palette.border}` }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: palette.textPrimary }}>Create New Item</p>
                <span style={{ cursor: "pointer", color: palette.textSecondary, fontSize: 18, lineHeight: 1 }}>&times;</span>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>{content.formFields.projectTitle}</label>
                  <input type="text" placeholder={content.formFields.placeholder} readOnly style={{ ...inputBase, width: "100%", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={labelStyle}>{content.formFields.descriptionLabel}</label>
                  <textarea placeholder={content.formFields.descriptionPlaceholder} readOnly rows={2} style={{ ...inputBase, width: "100%", boxSizing: "border-box", fontFamily: "inherit", resize: "none" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "12px 20px", borderTop: `1px solid ${palette.border}` }}>
                <button style={{ ...btnBase, backgroundColor: "transparent", color: palette.textSecondary, padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Cancel</button>
                <button style={{ ...btnBase, backgroundColor: palette.primary, color: "#ffffff", padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Confirm</button>
              </div>
            </div>
          </div>

          {/* Token card */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="backdrop" value="rgba(0,0,0,0.35)" />
            <TokenRow label="background" value={palette.surface} />
            <TokenRow label="border-radius" value={system.spacing.radius.lg} />
            <TokenRow label="padding" value="20px" />
            <TokenRow label="shadow" value="elevation.xl" />
            <TokenRow label="header-border" value={palette.border} />
            <TokenRow label="title-weight" value="600" />
            <TokenRow label="close-color" value={palette.textSecondary} />
          </div>
        </div>

        {/* Variants */}
        <div style={{ marginTop: 40 }}>
          <p style={variantLabel}>Variants</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Standard Modal</p>
              <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", height: 120 }}>
                <div style={{ width: "80%", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 12, boxShadow: system.spacing.elevation.md }}>
                  <div style={{ height: 8, width: "50%", backgroundColor: palette.textPrimary, borderRadius: 3, marginBottom: 8, opacity: 0.3 }} />
                  <div style={{ height: 6, width: "80%", backgroundColor: palette.border, borderRadius: 3, marginBottom: 4 }} />
                  <div style={{ height: 6, width: "60%", backgroundColor: palette.border, borderRadius: 3 }} />
                </div>
              </div>
            </div>
            <div style={{ flex: "1 1 220px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Confirmation Dialog</p>
              <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", height: 120 }}>
                <div style={{ width: "70%", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 12, textAlign: "center", boxShadow: system.spacing.elevation.md }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: palette.danger + "18", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.danger} strokeWidth="2.5"><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  </div>
                  <div style={{ height: 6, width: "60%", backgroundColor: palette.border, borderRadius: 3, margin: "0 auto 4px" }} />
                  <div style={{ height: 4, width: "80%", backgroundColor: palette.border, borderRadius: 2, margin: "0 auto", opacity: 0.5 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 4. DRAWERS ─── */}
      <motion.section id="comp-drawers" data-comp-section {...fadeUp} transition={{ delay: 0.15 }} style={{ ...sectionDivider(false), display: activeSection === "comp-drawers" ? undefined : "none" }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Drawers</h2>
        <p style={editorialDesc}>
          A contextual panel that slides in from the edge, letting users drill into detail or complete a task without losing sight of where they came from. Ideal for forms, settings, and record previews.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero: Drawer over dimmed content */}
          <div
            style={{
              position: "relative",
              borderRadius: system.spacing.radius.lg,
              overflow: "hidden",
              height: 380,
              border: `1px solid ${palette.border}`,
            }}
          >
            {/* Background content */}
            <div style={{ position: "absolute", inset: 0, backgroundColor: palette.background, padding: 20, opacity: 0.5 }}>
              <div style={{ height: 14, width: "40%", backgroundColor: palette.border, borderRadius: 4, marginBottom: 12 }} />
              <div style={{ height: 10, width: "70%", backgroundColor: palette.border, borderRadius: 4, marginBottom: 8 }} />
              <div style={{ height: 10, width: "55%", backgroundColor: palette.border, borderRadius: 4, marginBottom: 8 }} />
              <div style={{ height: 10, width: "65%", backgroundColor: palette.border, borderRadius: 4, marginBottom: 20 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ height: 50, backgroundColor: palette.border, borderRadius: system.spacing.radius.sm, opacity: 0.6 }} />
                ))}
              </div>
            </div>

            {/* Overlay */}
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.15)" }} />

            {/* Drawer panel */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "55%",
                maxWidth: 340,
                backgroundColor: palette.surface,
                borderLeft: `1px solid ${palette.border}`,
                boxShadow: system.spacing.elevation.xl,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${palette.border}`, flexShrink: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>Edit Details</p>
                <span style={{ cursor: "pointer", color: palette.textSecondary, fontSize: 18, lineHeight: 1 }}>&times;</span>
              </div>

              <div style={{ flex: 1, padding: 16, overflow: "hidden" }}>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{content.formFields.projectTitle}</label>
                  <input type="text" placeholder={content.formFields.placeholder} readOnly style={{ ...inputBase, width: "100%", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{content.formFields.ownerLabel}</label>
                  <input type="text" placeholder={content.formFields.ownerPlaceholder} readOnly style={{ ...inputBase, width: "100%", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Category</label>
                  <div style={{ ...inputBase, width: "100%", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", color: palette.textSecondary, cursor: "pointer" }}>
                    <span>{content.formFields.categories[0]}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>{content.formFields.descriptionLabel}</label>
                  <textarea placeholder={content.formFields.descriptionPlaceholder} readOnly rows={2} style={{ ...inputBase, width: "100%", boxSizing: "border-box", fontFamily: "inherit", resize: "none" }} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "12px 16px", borderTop: `1px solid ${palette.border}`, flexShrink: 0 }}>
                <button style={{ ...btnBase, backgroundColor: "transparent", color: palette.textSecondary, padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Cancel</button>
                <button style={{ ...btnBase, backgroundColor: palette.primary, color: "#ffffff", padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Save</button>
              </div>
            </div>
          </div>

          {/* Token card */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="width" value="340px max" />
            <TokenRow label="background" value={palette.surface} />
            <TokenRow label="shadow" value="elevation.xl" />
            <TokenRow label="backdrop" value="rgba(0,0,0,0.15)" />
            <TokenRow label="border-left" value={palette.border} />
            <TokenRow label="header-h" value="48px" />
            <TokenRow label="padding" value="16px" />
            <TokenRow label="footer-border" value={palette.border} />
          </div>
        </div>

        {/* Variants */}
        <div style={{ marginTop: 40 }}>
          <p style={variantLabel}>Variants</p>
          <div>
            <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Drawer — Open from Right</p>
            <div style={{ display: "flex", height: 100, borderRadius: system.spacing.radius.lg, overflow: "hidden", border: `1px solid ${palette.border}` }}>
              <div style={{ flex: 1, backgroundColor: palette.background, opacity: 0.4, padding: 12 }}>
                <div style={{ height: 8, width: "40%", backgroundColor: palette.border, borderRadius: 3, marginBottom: 8 }} />
                <div style={{ height: 6, width: "60%", backgroundColor: palette.border, borderRadius: 3 }} />
              </div>
              <div style={{ width: 180, backgroundColor: palette.surface, borderLeft: `1px solid ${palette.border}`, padding: 12 }}>
                <div style={{ height: 8, width: "60%", backgroundColor: palette.textPrimary, borderRadius: 3, marginBottom: 8, opacity: 0.3 }} />
                <div style={{ height: 6, width: "80%", backgroundColor: palette.border, borderRadius: 3, marginBottom: 4 }} />
                <div style={{ height: 6, width: "50%", backgroundColor: palette.border, borderRadius: 3 }} />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 5. ALERTS ─── */}
      <motion.section id="comp-alerts" data-comp-section {...fadeUp} transition={{ delay: 0.2 }} style={{ ...sectionDivider(false), display: activeSection === "comp-alerts" ? undefined : "none" }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Alerts</h2>
        <p style={editorialDesc}>
          Contextual signals that communicate system status — from quiet informational notes to urgent error banners. Color-coded borders and icons provide instant semantic meaning at a glance.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero: Notification center stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {([
              { key: "success" as const, color: palette.success, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
              { key: "warning" as const, color: palette.warning, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
              { key: "error" as const, color: palette.danger, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg> },
              { key: "info" as const, color: palette.info, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg> },
            ]).map((alert) => (
              <div
                key={alert.key}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "14px 16px",
                  backgroundColor: alert.color + "0C",
                  border: `1px solid ${alert.color}30`,
                  borderLeft: `4px solid ${alert.color}`,
                  borderRadius: system.spacing.radius.md,
                }}
              >
                <span style={{ color: alert.color, flexShrink: 0, marginTop: 1 }}>{alert.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 2 }}>{content.alerts[alert.key].title}</p>
                  <p style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.5 }}>{content.alerts[alert.key].desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Token card */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="success" value={palette.success} />
            <TokenRow label="warning" value={palette.warning} />
            <TokenRow label="danger" value={palette.danger} />
            <TokenRow label="info" value={palette.info} />
            <TokenRow label="bg-tint" value="color + 0C" />
            <TokenRow label="border-alpha" value="color + 30" />
            <TokenRow label="border-left" value="4px solid" />
            <TokenRow label="border-radius" value={system.spacing.radius.md} />
          </div>
        </div>

        {/* Variants */}
        <div style={{ marginTop: 40 }}>
          <p style={variantLabel}>Variants</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 380px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Inline Alerts</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {([
                  { color: palette.success, label: content.alerts.success.title },
                  { color: palette.danger, label: content.alerts.error.title },
                ]).map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", backgroundColor: a.color + "0C", borderLeft: `3px solid ${a.color}`, borderRadius: system.spacing.radius.sm }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: a.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: palette.textPrimary }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: "0 0 240px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Compact Toast</p>
              <div style={{ backgroundColor: palette.background, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                {([
                  { color: palette.success, label: content.alerts.success.title },
                  { color: palette.danger, label: content.alerts.error.title },
                  { color: palette.info, label: content.alerts.info.title },
                ]).map((toast, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: palette.surface,
                      border: `1px solid ${palette.border}`,
                      borderRadius: system.spacing.radius.sm,
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: system.spacing.elevation.sm,
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: toast.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: palette.textPrimary, fontWeight: 500, flex: 1, lineHeight: 1.3 }}>{toast.label}</span>
                    <span style={{ fontSize: 14, color: palette.textSecondary, cursor: "pointer", lineHeight: 1 }}>&times;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 6. EMPTY STATES ─── */}
      <motion.section id="comp-empty-states" data-comp-section {...fadeUp} transition={{ delay: 0.25 }} style={{ ...sectionDivider(false), display: activeSection === "comp-empty-states" ? undefined : "none" }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Empty States</h2>
        <p style={editorialDesc}>
          The first impression when nothing exists yet. A well-crafted empty state turns an absence of data into an invitation — guiding users toward their first meaningful action with clarity and warmth.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero: Centered empty state */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              minHeight: 320,
              textAlign: "center",
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 20 }}>
              <circle cx="32" cy="32" r="30" stroke={palette.border} strokeWidth="2" fill={palette.surfaceMuted} />
              <path d="M22 28v-2a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H24a2 2 0 01-2-2v-2" stroke={palette.textSecondary} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M28 32h8M32 28v8" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: 16, fontWeight: 600, color: palette.textPrimary, marginBottom: 8 }}>No items found</p>
            <p style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, maxWidth: 300, marginBottom: 24 }}>
              Get started by creating your first item. You can add, organize, and track everything from here.
            </p>
            <button style={{ ...btnBase, backgroundColor: palette.primary, color: "#ffffff", padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>
              {content.quickActions[0] || "+ Create Item"}
            </button>
          </div>

          {/* Token card */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="icon-size" value="64px" />
            <TokenRow label="icon-bg" value={palette.surfaceMuted} />
            <TokenRow label="icon-stroke" value={palette.textSecondary} />
            <TokenRow label="title-color" value={palette.textPrimary} />
            <TokenRow label="desc-color" value={palette.textSecondary} />
            <TokenRow label="btn-bg" value={palette.primary} />
            <TokenRow label="btn-text" value="#ffffff" />
            <TokenRow label="btn-radius" value={comp.button.borderRadius} />
          </div>
        </div>

        {/* Variants */}
        <div style={{ marginTop: 40 }}>
          <p style={variantLabel}>Variants</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Default — No Items</p>
              <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <svg width="40" height="40" viewBox="0 0 56 56" fill="none" style={{ marginBottom: 12 }}>
                  <circle cx="28" cy="28" r="26" stroke={palette.border} strokeWidth="2" fill={palette.surfaceMuted} />
                  <path d="M20 24v-2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H22a2 2 0 01-2-2v-2" stroke={palette.textSecondary} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M25 28h6M28 25v6" stroke={palette.textSecondary} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>No items yet</p>
                <p style={{ fontSize: 12, color: palette.textSecondary }}>Create your first item to get started.</p>
              </div>
            </div>
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Search — No Results</p>
              <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <svg width="40" height="40" viewBox="0 0 56 56" fill="none" style={{ marginBottom: 12 }}>
                  <circle cx="28" cy="28" r="26" stroke={palette.border} strokeWidth="2" fill={palette.surfaceMuted} />
                  <circle cx="25" cy="25" r="7" stroke={palette.textSecondary} strokeWidth="1.5" fill="none" />
                  <line x1="30" y1="30" x2="36" y2="36" stroke={palette.textSecondary} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>No results found</p>
                <p style={{ fontSize: 12, color: palette.textSecondary }}>Try adjusting your filters or search terms.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 7. SKELETON STATES ─── */}
      <motion.section id="comp-skeleton" data-comp-section {...fadeUp} transition={{ delay: 0.3 }} style={{ ...sectionDivider(false), display: activeSection === "comp-skeleton" ? undefined : "none" }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Skeleton States</h2>
        <p style={editorialDesc}>
          Perceived performance matters. Skeleton screens maintain spatial relationships while content loads, reducing cognitive shift and keeping users oriented. The shimmer animation signals active progress.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero: Card skeleton with shimmer */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div className="palette-shimmer" style={{ height: 18, width: "55%" }} />
            <div className="palette-shimmer" style={{ height: 12, width: "90%" }} />
            <div className="palette-shimmer" style={{ height: 12, width: "72%" }} />
            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
              <div className="palette-shimmer" style={{ height: 36, width: 100 }} />
              <div className="palette-shimmer" style={{ height: 36, width: 100 }} />
            </div>
          </div>

          {/* Token card */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="placeholder-bg" value={palette.surfaceMuted} />
            <TokenRow label="shimmer-high" value={palette.border} />
            <TokenRow label="animation" value="1.8s ease-in-out" />
            <TokenRow label="direction" value="linear-gradient" />
            <TokenRow label="border-radius" value={system.spacing.radius.sm} />
            <TokenRow label="title-height" value="18px" />
            <TokenRow label="line-height" value="12px" />
            <TokenRow label="action-height" value="36px" />
          </div>
        </div>

        {/* Variants */}
        <div style={{ marginTop: 40 }}>
          <p style={variantLabel}>Variants</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Card Skeleton</p>
              <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 16 }}>
                <div className="palette-shimmer" style={{ height: 14, width: "50%", marginBottom: 10 }} />
                <div className="palette-shimmer" style={{ height: 10, width: "90%", marginBottom: 6 }} />
                <div className="palette-shimmer" style={{ height: 10, width: "70%", marginBottom: 12 }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <div className="palette-shimmer" style={{ height: 28, width: 70 }} />
                  <div className="palette-shimmer" style={{ height: 28, width: 70 }} />
                </div>
              </div>
            </div>
            <div style={{ flex: "2 1 300px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Table Skeleton</p>
              <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 16 }}>
                <div style={{ display: "flex", gap: 12, paddingBottom: 10, borderBottom: `1px solid ${palette.border}`, marginBottom: 8 }}>
                  {[40, 100, 60, 60, 80].map((w, i) => (
                    <div key={i} className="palette-shimmer" style={{ height: 10, width: w }} />
                  ))}
                </div>
                {Array.from({ length: 3 }).map((_, row) => (
                  <div key={row} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: row < 2 ? `1px solid ${palette.border}40` : "none" }}>
                    {[40, 100, 60, 60, 80].map((w, i) => (
                      <div key={i} className="palette-shimmer" style={{ height: 10, width: w - (row % 2 === 0 ? 0 : 10) }} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>List Skeleton</p>
              <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="palette-shimmer" style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div className="palette-shimmer" style={{ height: 10, width: `${70 + (i % 2) * 15}%`, marginBottom: 4 }} />
                      <div className="palette-shimmer" style={{ height: 8, width: `${50 + (i % 3) * 10}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 8. PROGRESS INDICATORS ─── */}
      <motion.section id="comp-progress" data-comp-section {...fadeUp} transition={{ delay: 0.35 }} style={{ ...sectionDivider(true), display: activeSection === "comp-progress" ? undefined : "none" }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Progress Indicators</h2>
        <p style={editorialDesc}>
          Visual momentum for tasks in flight. Whether tracking a multi-step workflow or displaying completion percentages, progress indicators transform abstract waiting into tangible advancement.
        </p>

        <div style={heroTokenGrid}>
          {/* Hero: Project status overview */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 28,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 20 }}>Project Status Overview</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {content.progressItems.map((item) => {
                const barColor =
                  item.value >= 80 ? palette.success
                  : item.value >= 60 ? palette.primary
                  : item.value >= 40 ? palette.warning
                  : palette.danger;
                return (
                  <div key={item.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>{item.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: barColor }}>{item.value}%</span>
                    </div>
                    <div style={{ height: 6, backgroundColor: palette.border, borderRadius: "9999px", overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        style={{ height: "100%", backgroundColor: barColor, borderRadius: "9999px" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Token card */}
          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="track-color" value={palette.border} />
            <TokenRow label="fill-success" value={palette.success} />
            <TokenRow label="fill-primary" value={palette.primary} />
            <TokenRow label="fill-warning" value={palette.warning} />
            <TokenRow label="fill-danger" value={palette.danger} />
            <TokenRow label="track-height" value="6px" />
            <TokenRow label="track-radius" value="9999px" />
            <TokenRow label="label-size" value="13px" />
          </div>
        </div>

        {/* Variants */}
        <div style={{ marginTop: 40 }}>
          <p style={variantLabel}>Variants</p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
            {/* Linear bars */}
            <div style={{ flex: "1 1 220px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Linear Bars</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {content.progressItems.slice(0, 2).map((item) => {
                  const color = item.value >= 80 ? palette.success : item.value >= 60 ? palette.primary : palette.warning;
                  return (
                    <div key={item.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: palette.textSecondary }}>{item.label}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color }}>{item.value}%</span>
                      </div>
                      <div style={{ height: 5, backgroundColor: palette.border, borderRadius: "9999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${item.value}%`, backgroundColor: color, borderRadius: "9999px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Circular ring */}
            <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Circular Ring</p>
              <div style={{ position: "relative", width: 80, height: 80 }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke={palette.border} strokeWidth="6" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke={palette.primary}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 34}
                    initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - (content.progressItems[0]?.value ?? 75) / 100) }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary }}>{content.progressItems[0]?.value ?? 75}%</span>
                </div>
              </div>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginTop: 6 }}>{content.progressItems[0]?.label ?? "Overall"}</p>
            </div>

            {/* Stepper */}
            <div style={{ flex: "1 1 200px" }}>
              <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Stepper (4 steps)</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { label: "Requirements", status: "completed" },
                  { label: "In Progress", status: "current" },
                  { label: "Review", status: "upcoming" },
                  { label: "Completed", status: "upcoming" },
                ].map((step, i, arr) => (
                  <div key={step.label} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          backgroundColor:
                            step.status === "completed" ? palette.success
                            : step.status === "current" ? palette.primary
                            : palette.surfaceMuted,
                          border: step.status === "upcoming" ? `2px solid ${palette.border}` : "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {step.status === "completed" ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : step.status === "current" ? (
                          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ffffff" }} />
                        ) : (
                          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: palette.border }} />
                        )}
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{ width: 2, height: 20, backgroundColor: step.status === "completed" ? palette.success : palette.border }} />
                      )}
                    </div>
                    <div style={{ paddingTop: 2, paddingBottom: i < arr.length - 1 ? 4 : 0 }}>
                      <p style={{ fontSize: 12, fontWeight: step.status === "current" ? 600 : 400, color: step.status === "upcoming" ? palette.textSecondary : palette.textPrimary }}>
                        {step.label}
                      </p>
                      <p style={{ fontSize: 10, color: palette.textSecondary }}>
                        {step.status === "completed" ? "Done" : step.status === "current" ? "In progress..." : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
