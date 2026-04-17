"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart4Props {
  system: DesignSystem;
  content: IndustryContent;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function ComponentsPart4({ system, content }: ComponentsPart4Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  const [activeSegment, setActiveSegment] = useState(1);
  const [activeViewMode, setActiveViewMode] = useState(0);
  const [selectedChips, setSelectedChips] = useState<number[]>([0, 2]);
  const [currentPage, setCurrentPage] = useState(3);

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

  const toasts: { type: "success" | "warning" | "error"; color: string; message: string; action: string }[] = [
    { type: "success", color: palette.success, message: content.alerts.success.title, action: "View" },
    { type: "warning", color: palette.warning, message: content.alerts.warning.title, action: "Review" },
    { type: "error", color: palette.danger, message: content.alerts.error.title, action: "Retry" },
  ];

  const toastIcons: Record<string, React.ReactNode> = {
    success: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    warning: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    error: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>,
  };

  const menuItems: { label: string; shortcut?: string; icon: React.ReactNode; danger?: boolean; divider?: boolean }[] = [
    { label: "Edit", shortcut: "⌘E", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> },
    { label: "Duplicate", shortcut: "⌘D", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg> },
    { label: "Share", shortcut: "⌘S", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg> },
    { label: "", divider: true, icon: null },
    { label: "Archive", shortcut: "⌘⇧A", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></svg> },
    { label: "Delete", shortcut: "⌫", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>, danger: true },
  ];

  const chipData = [
    { label: "Active", color: palette.success },
    { label: "Pending", color: palette.warning },
    { label: "Closed", color: palette.danger },
    { label: "Draft", color: palette.info },
  ];

  const uploadedFiles = [
    { name: "floor-plan-v2.pdf", size: "2.4 MB", progress: 100 },
    { name: "property-photos.zip", size: "18.7 MB", progress: 68 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* ═══════════════════════════════════════════════
          1. TOAST / SNACKBAR
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-toast" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Toast / Snackbar</h3>
        <p style={sectionDesc}>
          Ephemeral feedback notifications that surface from the edge. Semantic color-coding and auto-dismiss timers keep users informed without demanding interaction.
        </p>

        <div style={heroTokenGrid}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {toasts.map((toast) => (
              <div
                key={toast.type}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  boxShadow: system.spacing.elevation.lg,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 3,
                    width: toast.type === "success" ? "25%" : toast.type === "warning" ? "55%" : "80%",
                    backgroundColor: toast.color,
                    borderRadius: "0 2px 0 0",
                    transition: "width 1s linear",
                  }}
                />
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: system.spacing.radius.sm,
                    backgroundColor: toast.color + "14",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: toast.color,
                    flexShrink: 0,
                  }}
                >
                  {toastIcons[toast.type]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, margin: 0, lineHeight: 1.3 }}>
                    {toast.message}
                  </p>
                  <p style={{ fontSize: 12, color: palette.textSecondary, margin: "2px 0 0", lineHeight: 1.4 }}>
                    {content.alerts[toast.type === "error" ? "error" : toast.type].desc}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: toast.color,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    padding: "4px 8px",
                    borderRadius: system.spacing.radius.sm,
                    backgroundColor: toast.color + "10",
                  }}
                >
                  {toast.action}
                </span>
                <span style={{ fontSize: 18, color: palette.textSecondary, cursor: "pointer", lineHeight: 1, flexShrink: 0, marginLeft: 4 }}>&times;</span>
              </div>
            ))}
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.surface} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Shadow" value="elevation.lg" />
            <TokenRow label="Success" value={palette.success} />
            <TokenRow label="Warning" value={palette.warning} />
            <TokenRow label="Danger" value={palette.danger} />
            <TokenRow label="Timer height" value="3px" />
            <TokenRow label="Border radius" value={system.spacing.radius.md} />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          2. POPOVER
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-popover" data-comp-section {...fadeUp} transition={{ delay: 0.05 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Popover</h3>
        <p style={sectionDesc}>
          Contextual floating panels anchored to a trigger element. Used for supplementary actions, quick forms, and inline detail views that don&apos;t warrant a full modal.
        </p>

        <div style={heroTokenGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "48px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              style={{
                padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                backgroundColor: palette.primary,
                color: "#ffffff",
                border: "none",
                borderRadius: comp.button.borderRadius,
                fontWeight: comp.button.fontWeight,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Options
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>

            <div style={{ position: "relative", marginTop: 10, width: 280 }}>
              <div
                style={{
                  position: "absolute",
                  top: -6,
                  left: "50%",
                  width: 12,
                  height: 12,
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRight: "none",
                  borderBottom: "none",
                  transform: "translateX(-50%) rotate(45deg)",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  boxShadow: system.spacing.elevation.xl,
                  padding: 20,
                  position: "relative",
                  zIndex: 0,
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, margin: "0 0 6px", fontFamily: system.typography.headingFont }}>
                  Quick Actions
                </p>
                <p style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.6, margin: "0 0 16px" }}>
                  Choose an action to perform on this item. Changes will be applied immediately.
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      backgroundColor: "transparent",
                      color: palette.textSecondary,
                      border: `1px solid ${palette.border}`,
                      borderRadius: system.spacing.radius.sm,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      backgroundColor: palette.primary,
                      color: "#ffffff",
                      border: "none",
                      borderRadius: system.spacing.radius.sm,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.surface} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Shadow" value="elevation.xl" />
            <TokenRow label="Arrow size" value="12px" />
            <TokenRow label="Padding" value="20px" />
            <TokenRow label="Border radius" value={system.spacing.radius.md} />
            <TokenRow label="Title font" value={system.typography.headingFont} />
            <TokenRow label="Max width" value="320px" />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          3. PAGINATION
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-pagination" data-comp-section {...fadeUp} transition={{ delay: 0.1 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Pagination</h3>
        <p style={sectionDesc}>
          Navigation controls for traversing multi-page data sets. Supports numbered pages, ellipsis truncation, and page-size selectors for user-controlled density.
        </p>

        <div style={heroTokenGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: system.spacing.radius.sm,
                  backgroundColor: "transparent",
                  border: `1px solid ${palette.border}`,
                  cursor: currentPage === 1 ? "default" : "pointer",
                  opacity: currentPage === 1 ? 0.4 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: system.spacing.radius.sm,
                    backgroundColor: currentPage === page ? palette.primary : "transparent",
                    color: currentPage === page ? "#ffffff" : palette.textPrimary,
                    border: currentPage === page ? "none" : `1px solid ${palette.border}`,
                    fontSize: 13,
                    fontWeight: currentPage === page ? 600 : 400,
                    cursor: "pointer",
                    fontFamily: system.typography.bodyFont,
                  }}
                >
                  {page}
                </button>
              ))}
              <span style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: palette.textSecondary, letterSpacing: 2 }}>…</span>
              <button
                onClick={() => setCurrentPage(12)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: system.spacing.radius.sm,
                  backgroundColor: currentPage === 12 ? palette.primary : "transparent",
                  color: currentPage === 12 ? "#ffffff" : palette.textPrimary,
                  border: currentPage === 12 ? "none" : `1px solid ${palette.border}`,
                  fontSize: 13,
                  fontWeight: currentPage === 12 ? 600 : 400,
                  cursor: "pointer",
                  fontFamily: system.typography.bodyFont,
                }}
              >
                12
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(12, currentPage + 1))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: system.spacing.radius.sm,
                  backgroundColor: "transparent",
                  border: `1px solid ${palette.border}`,
                  cursor: currentPage === 12 ? "default" : "pointer",
                  opacity: currentPage === 12 ? 0.4 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
            <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>
              Showing <span style={{ fontWeight: 600, color: palette.textPrimary }}>31–40</span> of <span style={{ fontWeight: 600, color: palette.textPrimary }}>120</span> results
            </p>
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Active bg" value={palette.primary} />
            <TokenRow label="Active text" value="#ffffff" />
            <TokenRow label="Default border" value={palette.border} />
            <TokenRow label="Page size" value="36 × 36" />
            <TokenRow label="Border radius" value={system.spacing.radius.sm} />
            <TokenRow label="Font size" value="13px" />
            <TokenRow label="Gap" value="4px" />
          </div>
        </div>

        <p style={variantLabel}>Variants</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Minimal</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ width: 32, height: 32, borderRadius: system.spacing.radius.sm, backgroundColor: "transparent", border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <span style={{ fontSize: 13, color: palette.textSecondary }}>Page <span style={{ fontWeight: 600, color: palette.textPrimary }}>3</span> of <span style={{ fontWeight: 600, color: palette.textPrimary }}>12</span></span>
              <button style={{ width: 32, height: 32, borderRadius: system.spacing.radius.sm, backgroundColor: "transparent", border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Numbered (compact)</p>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {[1, 2, 3, 4, 5].map((p) => (
                <div
                  key={p}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: system.spacing.radius.sm,
                    backgroundColor: p === 3 ? palette.primary : "transparent",
                    color: p === 3 ? "#ffffff" : palette.textSecondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: p === 3 ? 600 : 400,
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>With Page Size</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                {[1, 2, 3].map((p) => (
                  <div key={p} style={{ width: 28, height: 28, borderRadius: system.spacing.radius.sm, backgroundColor: p === 1 ? palette.primary : "transparent", color: p === 1 ? "#ffffff" : palette.textSecondary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: p === 1 ? 600 : 400 }}>{p}</div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, fontSize: 11, color: palette.textSecondary }}>
                <span>10 / page</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          4. BREADCRUMBS
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-breadcrumbs" data-comp-section {...fadeUp} transition={{ delay: 0.15 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Breadcrumbs</h3>
        <p style={sectionDesc}>
          Hierarchical navigation trails that maintain spatial orientation. Chevron separators and truncation patterns ensure clarity even in deeply nested structures.
        </p>

        <div style={heroTokenGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>Default</p>
              <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                {content.breadcrumb.map((crumb, i) => {
                  const isLast = i === content.breadcrumb.length - 1;
                  return (
                    <React.Fragment key={crumb}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: isLast ? 600 : 400,
                          color: isLast ? palette.textPrimary : palette.primary,
                          cursor: isLast ? "default" : "pointer",
                          fontFamily: system.typography.bodyFont,
                        }}
                      >
                        {crumb}
                      </span>
                      {!isLast && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 6px", flexShrink: 0, opacity: 0.5 }}>
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>Collapsed (with dropdown indicator)</p>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <span style={{ fontSize: 13, color: palette.primary, cursor: "pointer" }}>{content.breadcrumb[0]}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 6px", opacity: 0.5 }}><polyline points="9 18 15 12 9 6" /></svg>
                <span
                  style={{
                    fontSize: 13,
                    color: palette.textSecondary,
                    cursor: "pointer",
                    padding: "2px 8px",
                    borderRadius: system.spacing.radius.sm,
                    backgroundColor: palette.surfaceMuted,
                    border: `1px solid ${palette.border}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  •••
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 6px", opacity: 0.5 }}><polyline points="9 18 15 12 9 6" /></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{content.breadcrumb[content.breadcrumb.length - 1]}</span>
              </div>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Link color" value={palette.primary} />
            <TokenRow label="Current" value={palette.textPrimary} />
            <TokenRow label="Separator" value={palette.textSecondary} />
            <TokenRow label="Font size" value="13px" />
            <TokenRow label="Font weight" value="600 (current)" />
            <TokenRow label="Separator gap" value="6px" />
            <TokenRow label="Collapse bg" value={palette.surfaceMuted} />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          5. MENU / DROPDOWN
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-menu" data-comp-section {...fadeUp} transition={{ delay: 0.2 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Menu / Dropdown</h3>
        <p style={sectionDesc}>
          Structured action menus with grouped items, dividers, keyboard shortcuts, and destructive action callouts. Appears contextually from trigger interactions.
        </p>

        <div style={heroTokenGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              style={{
                padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                backgroundColor: palette.surfaceMuted,
                color: palette.textPrimary,
                border: `1px solid ${palette.border}`,
                borderRadius: comp.button.borderRadius,
                fontWeight: comp.button.fontWeight,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 8,
              }}
            >
              Actions
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>

            <div
              style={{
                width: 240,
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.md,
                boxShadow: system.spacing.elevation.xl,
                padding: "6px 0",
                overflow: "hidden",
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: palette.textSecondary, padding: "8px 14px 4px", margin: 0 }}>
                Actions
              </p>
              {menuItems.map((item, i) => {
                if (item.divider) {
                  return <div key={i} style={{ height: 1, backgroundColor: palette.border, margin: "6px 0" }} />;
                }
                return (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 14px",
                      cursor: "pointer",
                      color: item.danger ? palette.danger : palette.textPrimary,
                      fontSize: 13,
                      fontWeight: 400,
                      transition: "background-color 0.1s",
                    }}
                  >
                    <span style={{ color: item.danger ? palette.danger : palette.textSecondary, flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.shortcut && (
                      <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: "monospace", opacity: 0.7 }}>{item.shortcut}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.surface} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Shadow" value="elevation.xl" />
            <TokenRow label="Item padding" value="8px 14px" />
            <TokenRow label="Text" value={palette.textPrimary} />
            <TokenRow label="Danger" value={palette.danger} />
            <TokenRow label="Shortcut" value={palette.textSecondary} />
            <TokenRow label="Divider" value={palette.border} />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          6. FILE UPLOAD
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-file-upload" data-comp-section {...fadeUp} transition={{ delay: 0.25 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>File Upload</h3>
        <p style={sectionDesc}>
          Drag-and-drop upload zones with progress tracking. Visual cues communicate acceptable file types, size limits, and real-time upload progress per file.
        </p>

        <div style={heroTokenGrid}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                border: `2px dashed ${palette.border}`,
                borderRadius: system.spacing.radius.lg,
                backgroundColor: palette.surfaceMuted,
                padding: "40px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: system.spacing.radius.md,
                  backgroundColor: palette.primary + "12",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, margin: "0 0 4px", fontFamily: system.typography.bodyFont }}>
                Drop files here or <span style={{ color: palette.primary }}>click to browse</span>
              </p>
              <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>
                PDF, PNG, JPG up to 25MB
              </p>
            </div>

            {uploadedFiles.map((file) => (
              <div
                key={file.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: system.spacing.radius.sm,
                    backgroundColor: palette.primary + "12",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                    <span style={{ fontSize: 11, color: palette.textSecondary, flexShrink: 0, marginLeft: 8 }}>{file.size}</span>
                  </div>
                  <div style={{ height: 4, backgroundColor: palette.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${file.progress}%`, backgroundColor: file.progress === 100 ? palette.success : palette.primary, borderRadius: 2, transition: "width 0.3s" }} />
                  </div>
                  <span style={{ fontSize: 11, color: file.progress === 100 ? palette.success : palette.textSecondary, marginTop: 4, display: "block" }}>
                    {file.progress === 100 ? "Complete" : `${file.progress}%`}
                  </span>
                </div>
                <span style={{ fontSize: 16, color: palette.textSecondary, cursor: "pointer", lineHeight: 1, flexShrink: 0 }}>&times;</span>
              </div>
            ))}
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Zone bg" value={palette.surfaceMuted} />
            <TokenRow label="Zone border" value={`dashed ${palette.border}`} />
            <TokenRow label="Icon bg" value={`${palette.primary}12`} />
            <TokenRow label="Track color" value={palette.border} />
            <TokenRow label="Progress" value={palette.primary} />
            <TokenRow label="Complete" value={palette.success} />
            <TokenRow label="Track height" value="4px" />
            <TokenRow label="Border radius" value={system.spacing.radius.md} />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          7. BUTTON GROUP
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-button-group" data-comp-section {...fadeUp} transition={{ delay: 0.3 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Button Group</h3>
        <p style={sectionDesc}>
          Clustered controls for related actions — segmented toggles, view-mode switchers, and split-action buttons. Unified borders create visual cohesion.
        </p>

        <div style={heroTokenGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>Segmented Control</p>
              <div
                style={{
                  display: "inline-flex",
                  backgroundColor: palette.surfaceMuted,
                  borderRadius: system.spacing.radius.md,
                  padding: 3,
                  border: `1px solid ${palette.border}`,
                }}
              >
                {["Day", "Week", "Month"].map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setActiveSegment(i)}
                    style={{
                      padding: "8px 20px",
                      fontSize: 13,
                      fontWeight: activeSegment === i ? 600 : 400,
                      color: activeSegment === i ? palette.textPrimary : palette.textSecondary,
                      backgroundColor: activeSegment === i ? palette.surface : "transparent",
                      border: "none",
                      borderRadius: system.spacing.radius.sm,
                      cursor: "pointer",
                      boxShadow: activeSegment === i ? system.spacing.elevation.sm : "none",
                      transition: "all 0.15s",
                      fontFamily: system.typography.bodyFont,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>Icon Button Group</p>
              <div
                style={{
                  display: "inline-flex",
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  overflow: "hidden",
                }}
              >
                {[
                  <svg key="list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
                  <svg key="grid" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
                  <svg key="cols" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>,
                ].map((icon, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveViewMode(i)}
                    style={{
                      width: 40,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: activeViewMode === i ? palette.primary : palette.surface,
                      color: activeViewMode === i ? "#ffffff" : palette.textSecondary,
                      border: "none",
                      borderRight: i < 2 ? `1px solid ${palette.border}` : "none",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>Split Button</p>
              <div style={{ display: "inline-flex" }}>
                <button
                  style={{
                    padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                    backgroundColor: palette.primary,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: `${comp.button.borderRadius} 0 0 ${comp.button.borderRadius}`,
                    fontWeight: comp.button.fontWeight,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: system.typography.bodyFont,
                  }}
                >
                  Save Changes
                </button>
                <button
                  style={{
                    padding: `${comp.button.paddingY} 10px`,
                    backgroundColor: palette.primaryHover,
                    color: "#ffffff",
                    border: "none",
                    borderLeft: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: `0 ${comp.button.borderRadius} ${comp.button.borderRadius} 0`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Segment bg" value={palette.surfaceMuted} />
            <TokenRow label="Active bg" value={palette.surface} />
            <TokenRow label="Active shadow" value="elevation.sm" />
            <TokenRow label="Primary" value={palette.primary} />
            <TokenRow label="Primary hover" value={palette.primaryHover} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Button radius" value={comp.button.borderRadius} />
            <TokenRow label="Font weight" value={comp.button.fontWeight} />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          8. CHIP / TAG
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-chip" data-comp-section {...fadeUp} transition={{ delay: 0.35 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Chip / Tag</h3>
        <p style={sectionDesc}>
          Compact tokens for categorization, filtering, and status display. Supports interactive selection, removal, avatars, and semantic color mapping.
        </p>

        <div style={heroTokenGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>Status Chips</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {chipData.map((chip) => (
                  <span
                    key={chip.label}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                      fontSize: comp.badge.fontSize,
                      fontWeight: comp.badge.fontWeight,
                      borderRadius: comp.badge.borderRadius,
                      backgroundColor: chip.color + "14",
                      color: chip.color,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: chip.color }} />
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>Removable Chips</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Design", "Engineering", "Marketing", "Product"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      fontSize: 12,
                      fontWeight: 500,
                      borderRadius: system.spacing.radius.full,
                      backgroundColor: palette.surfaceMuted,
                      border: `1px solid ${palette.border}`,
                      color: palette.textPrimary,
                    }}
                  >
                    {tag}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>Filter Chips</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["All Items", "Active", "Pending", "Archived", "Flagged"].map((label, i) => {
                  const isSelected = selectedChips.includes(i);
                  return (
                    <button
                      key={label}
                      onClick={() =>
                        setSelectedChips(
                          isSelected
                            ? selectedChips.filter((c) => c !== i)
                            : [...selectedChips, i],
                        )
                      }
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "6px 14px",
                        fontSize: 12,
                        fontWeight: isSelected ? 600 : 400,
                        borderRadius: system.spacing.radius.full,
                        backgroundColor: isSelected ? palette.primary + "14" : "transparent",
                        border: `1px solid ${isSelected ? palette.primary : palette.border}`,
                        color: isSelected ? palette.primary : palette.textSecondary,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, marginTop: 0, letterSpacing: "0.5px" }}>With Avatar</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { name: "Sarah R.", initials: "SR", bg: palette.primary },
                  { name: "James M.", initials: "JM", bg: palette.secondary },
                  { name: "Alex K.", initials: "AK", bg: palette.accent },
                ].map((person) => (
                  <span
                    key={person.name}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "3px 10px 3px 3px",
                      fontSize: 12,
                      fontWeight: 500,
                      borderRadius: system.spacing.radius.full,
                      backgroundColor: palette.surfaceMuted,
                      border: `1px solid ${palette.border}`,
                      color: palette.textPrimary,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: person.bg,
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        fontWeight: 700,
                      }}
                    >
                      {person.initials}
                    </span>
                    {person.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Badge padding" value={`${comp.badge.paddingY} ${comp.badge.paddingX}`} />
            <TokenRow label="Badge radius" value={comp.badge.borderRadius} />
            <TokenRow label="Badge font" value={comp.badge.fontSize} />
            <TokenRow label="Badge weight" value={comp.badge.fontWeight} />
            <TokenRow label="Pill radius" value={system.spacing.radius.full} />
            <TokenRow label="Selected bg" value={`${palette.primary}14`} />
            <TokenRow label="Selected border" value={palette.primary} />
            <TokenRow label="Muted bg" value={palette.surfaceMuted} />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          9. DIVIDER
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-divider" data-comp-section {...fadeUp} transition={{ delay: 0.4 }} style={sectionSeparator}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Divider</h3>
        <p style={sectionDesc}>
          Subtle structural separators that create visual rhythm and group related content. Available in horizontal and vertical orientations with optional inline labels.
        </p>

        <div style={heroTokenGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 16, marginTop: 0, letterSpacing: "0.5px" }}>Default</p>
              <div style={{ height: 1, backgroundColor: palette.border }} />
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 16, marginTop: 0, letterSpacing: "0.5px" }}>With Label (centered)</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
                <span style={{ fontSize: 12, color: palette.textSecondary, fontWeight: 500, whiteSpace: "nowrap" }}>or continue with</span>
                <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 16, marginTop: 0, letterSpacing: "0.5px" }}>With Label (left-aligned)</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: palette.textSecondary, fontWeight: 500, whiteSpace: "nowrap" }}>Section Title</span>
                <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 16, marginTop: 0, letterSpacing: "0.5px" }}>Dashed</p>
              <div style={{ height: 0, borderTop: `1px dashed ${palette.border}` }} />
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 16, marginTop: 0, letterSpacing: "0.5px" }}>Vertical (in flex row)</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, height: 48 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Left Section</span>
                  <span style={{ fontSize: 11, color: palette.textSecondary }}>Description text</span>
                </div>
                <div style={{ width: 1, alignSelf: "stretch", backgroundColor: palette.border }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Right Section</span>
                  <span style={{ fontSize: 11, color: palette.textSecondary }}>Description text</span>
                </div>
              </div>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Color" value={palette.border} />
            <TokenRow label="Thickness" value="1px" />
            <TokenRow label="Style (default)" value="solid" />
            <TokenRow label="Style (dashed)" value="dashed" />
            <TokenRow label="Label color" value={palette.textSecondary} />
            <TokenRow label="Label size" value="12px" />
            <TokenRow label="Label gap" value="12–16px" />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          10. LIST
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-list" data-comp-section {...fadeUp} transition={{ delay: 0.45 }} style={{ paddingBottom: 24 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>List</h3>
        <p style={sectionDesc}>
          Structured vertical content displays with support for avatars, metadata, trailing actions, and status badges. The workhorse of data-dense interfaces.
        </p>

        <div style={heroTokenGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>Recent Items</p>
              <span style={{ fontSize: 12, color: palette.primary, fontWeight: 500, cursor: "pointer" }}>View all →</span>
            </div>
            {content.recentItems.map((item, i) => {
              const statusColors: Record<string, string> = { Pending: palette.warning, Review: palette.info, Draft: palette.textSecondary, Active: palette.success };
              const statusColor = statusColors[item.status] ?? palette.textSecondary;
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 20px",
                    borderBottom: i < content.recentItems.length - 1 ? `1px solid ${palette.border}` : "none",
                    cursor: "pointer",
                    transition: "background-color 0.1s",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: system.spacing.radius.md,
                      backgroundColor: palette.primary + "14",
                      color: palette.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {item.id.slice(0, 2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 12, color: palette.textSecondary, margin: "2px 0 0" }}>
                      {item.author} · <span style={{ fontFamily: "monospace", fontSize: 11 }}>{item.id}</span>
                    </p>
                  </div>
                  <span
                    style={{
                      padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                      fontSize: comp.badge.fontSize,
                      fontWeight: comp.badge.fontWeight,
                      borderRadius: comp.badge.borderRadius,
                      backgroundColor: statusColor + "14",
                      color: statusColor,
                      flexShrink: 0,
                    }}
                  >
                    {item.status}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              );
            })}
          </div>

          <div style={tokenCard}>
            <p style={tokenTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.surface} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Item padding" value="14px 20px" />
            <TokenRow label="Avatar size" value="36px" />
            <TokenRow label="Avatar radius" value={system.spacing.radius.md} />
            <TokenRow label="Avatar bg" value={`${palette.primary}14`} />
            <TokenRow label="Title size" value="13px" />
            <TokenRow label="Subtitle size" value="12px" />
          </div>
        </div>

        <p style={variantLabel}>Variants</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Simple List</p>
            <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, overflow: "hidden" }}>
              {["Dashboard overview", "User management", "System settings", "Billing & plans"].map((item, i, arr) => (
                <div
                  key={item}
                  style={{
                    padding: "10px 16px",
                    fontSize: 13,
                    color: palette.textPrimary,
                    borderBottom: i < arr.length - 1 ? `1px solid ${palette.border}` : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Interactive (with hover indicator)</p>
            <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, overflow: "hidden" }}>
              {[
                { label: "Notifications", desc: "Manage alert preferences", icon: "🔔" },
                { label: "Privacy", desc: "Control data sharing settings", icon: "🔒" },
                { label: "Appearance", desc: "Theme and display options", icon: "🎨" },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  style={{
                    padding: "12px 16px",
                    borderBottom: i < arr.length - 1 ? `1px solid ${palette.border}` : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    borderLeft: i === 0 ? `3px solid ${palette.primary}` : "3px solid transparent",
                    backgroundColor: i === 0 ? palette.primary + "06" : "transparent",
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, margin: 0 }}>{item.label}</p>
                    <p style={{ fontSize: 11, color: palette.textSecondary, margin: "2px 0 0" }}>{item.desc}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
