"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";
import { ComponentsPart2 } from "./components-tab-part2";
import { ComponentsPart3 } from "./components-tab-part3";
import { ComponentsPart4 } from "./components-tab-part4";
import { ComponentsPart5 } from "./components-tab-part5";
import { ComponentsPart6 } from "./components-tab-part6";
import { ComponentsPart7 } from "./components-tab-part7";
import { ComponentsPart8 } from "./components-tab-part8";
import { ComponentsPart9 } from "./components-tab-part9";

interface ComponentsTabProps {
  system: DesignSystem;
  content: IndustryContent;
}

const SIDEBAR_SECTIONS = [
  { group: "Core Inputs", items: [
    { id: "comp-buttons", label: "Buttons" },
    { id: "comp-inputs", label: "Inputs & Selects" },
    { id: "comp-date-pickers", label: "Date Pickers" },
    { id: "comp-checkboxes", label: "Checkboxes" },
    { id: "comp-radio", label: "Radio Buttons" },
    { id: "comp-icon-button", label: "Icon Button" },
    { id: "comp-number-input", label: "Number Input" },
    { id: "comp-range-slider", label: "Range Slider" },
    { id: "comp-tag-input", label: "Tag Input" },
    { id: "comp-rating", label: "Rating" },
    { id: "comp-otp", label: "OTP / PIN" },
    { id: "comp-file-upload", label: "File Upload" },
    { id: "comp-button-group", label: "Button Group" },
    { id: "comp-slider", label: "Slider" },
    { id: "comp-toggle", label: "Toggle" },
    { id: "comp-search-bar", label: "Search Bar" },
  ]},
  { group: "Content & Display", items: [
    { id: "comp-cards", label: "Cards" },
    { id: "comp-tables", label: "Data Table" },
    { id: "comp-badges", label: "Badges & Status" },
    { id: "comp-tabs", label: "Tabs" },
    { id: "comp-chip", label: "Chip / Tag" },
    { id: "comp-list", label: "List" },
    { id: "comp-divider", label: "Divider" },
    { id: "comp-accordion", label: "Accordion" },
    { id: "comp-avatar", label: "Avatar" },
    { id: "comp-carousel", label: "Carousel" },
    { id: "comp-tooltip", label: "Tooltip" },
    { id: "comp-popover", label: "Popover" },
    { id: "comp-icon-library", label: "Icon Library" },
  ]},
  { group: "Navigation", items: [
    { id: "comp-sidebars", label: "Sidebars" },
    { id: "comp-nav-bars", label: "Nav Bars" },
    { id: "comp-breadcrumbs", label: "Breadcrumbs" },
    { id: "comp-pagination", label: "Pagination" },
    { id: "comp-menu", label: "Menu / Dropdown" },
    { id: "comp-segmented", label: "Segmented Control" },
    { id: "comp-mega-menu", label: "Mega Menu" },
    { id: "comp-tree-nav", label: "Tree Navigation" },
    { id: "comp-anchor-nav", label: "Anchor Nav / TOC" },
    { id: "comp-bottom-nav", label: "Bottom Navigation" },
    { id: "comp-footer", label: "Footer" },
  ]},
  { group: "Feedback & Overlays", items: [
    { id: "comp-modals", label: "Modals" },
    { id: "comp-drawers", label: "Drawers" },
    { id: "comp-alerts", label: "Alerts" },
    { id: "comp-toast", label: "Toast / Snackbar" },
    { id: "comp-empty-states", label: "Empty States" },
    { id: "comp-skeleton", label: "Skeleton States" },
    { id: "comp-progress", label: "Progress" },
    { id: "comp-spinner", label: "Spinner / Loading" },
    { id: "comp-error-state", label: "Error State" },
    { id: "comp-maintenance", label: "Maintenance State" },
    { id: "comp-no-results", label: "No Results" },
    { id: "comp-permission", label: "Permission Denied" },
    { id: "comp-save-sync", label: "Save / Sync Status" },
    { id: "comp-upload-progress", label: "Upload Progress" },
  ]},
  { group: "Data Visualization", items: [
    { id: "comp-line-chart", label: "Line Chart" },
    { id: "comp-bar-chart", label: "Bar Chart" },
    { id: "comp-area-chart", label: "Area Chart" },
    { id: "comp-pie-donut", label: "Pie / Donut" },
    { id: "comp-scatter", label: "Scatter Plot" },
    { id: "comp-heatmap", label: "Heatmap" },
    { id: "comp-kpi-cards", label: "KPI / Stat Cards" },
  ]},
  { group: "Form Patterns", items: [
    { id: "comp-form-layout", label: "Form Layout" },
    { id: "comp-wizard", label: "Multi-step Wizard" },
    { id: "comp-validation", label: "Inline Validation" },
    { id: "comp-autosave", label: "Autosave Indicator" },
    { id: "comp-char-counter", label: "Character Counter" },
    { id: "comp-form-section", label: "Form Section" },
  ]},
  { group: "Composites", items: [
    { id: "comp-filter-bar", label: "Filter Bar" },
    { id: "comp-timeline", label: "Timeline / Activity" },
    { id: "comp-calendar", label: "Calendar" },
    { id: "comp-command-palette", label: "Command Palette" },
    { id: "comp-comment-thread", label: "Comment Thread" },
  ]},
  { group: "Commerce", items: [
    { id: "comp-product-card", label: "Product Card" },
    { id: "comp-pricing", label: "Pricing Plans" },
    { id: "comp-cart", label: "Cart Items" },
    { id: "comp-order-summary", label: "Order Summary" },
    { id: "comp-invoice", label: "Invoice Table" },
    { id: "comp-price-display", label: "Price Display" },
  ]},
  { group: "Enterprise", items: [
    { id: "comp-bulk-actions", label: "Bulk Action Bar" },
    { id: "comp-query-builder", label: "Query Builder" },
    { id: "comp-approval-flow", label: "Approval Flow" },
    { id: "comp-diff-view", label: "Diff / Comparison" },
    { id: "comp-version-history", label: "Version History" },
    { id: "comp-status-workflow", label: "Status Workflow" },
  ]},
  { group: "Communication", items: [
    { id: "comp-chat", label: "Chat Bubble" },
    { id: "comp-composer", label: "Message Composer" },
    { id: "comp-presence", label: "Presence Indicator" },
    { id: "comp-reactions", label: "Reaction Picker" },
    { id: "comp-notifications", label: "Notification Panel" },
  ]},
  { group: "Media & Auth", items: [
    { id: "comp-gallery", label: "Image Gallery" },
    { id: "comp-video", label: "Video Player" },
    { id: "comp-file-preview", label: "File Preview" },
    { id: "comp-sign-in", label: "Sign In Form" },
    { id: "comp-profile-card", label: "Profile Card" },
  ]},
  { group: "Mobile", items: [
    { id: "comp-bottom-sheet", label: "Bottom Sheet" },
    { id: "comp-fab", label: "FAB" },
  ]},
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function ComponentsTab({ system, content }: ComponentsTabProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  function priorityColor(p: string) {
    switch (p) {
      case "Critical": return palette.danger;
      case "High": return "#f97316";
      case "Medium": return palette.warning;
      default: return palette.textSecondary;
    }
  }

  function statusColor(s: string) {
    switch (s) {
      case "Active": return palette.success;
      case "In Progress": return palette.primary;
      case "Blocked": return palette.danger;
      case "Review": return palette.info;
      case "Pending": return palette.warning;
      default: return palette.textSecondary;
    }
  }

  function typeColor(t: string) {
    const map: Record<string, string> = {
      Requirement: palette.primary, Risk: palette.danger, Decision: palette.info,
      Issue: "#f97316", Demand: palette.secondary, Listing: palette.primary,
      Maintenance: "#f97316", Lease: palette.info, Insurance: palette.warning,
      Permit: palette.primary, License: palette.secondary, Inspection: palette.info,
      Approval: palette.warning, Compliance: palette.success, Clinical: palette.danger,
      Lab: palette.info, Record: palette.primary, Billing: palette.warning,
      Task: palette.primary, Report: palette.info, Project: palette.primary,
      Documentation: palette.secondary,
    };
    return map[t] || palette.textSecondary;
  }

  const calendarDays = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, null, null, null],
  ];
  const todayDay = 16;
  const selectedDay = 22;

  const accentBar: React.CSSProperties = {
    height: 2,
    backgroundColor: palette.primary,
    width: 48,
    marginBottom: 24,
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    color: palette.textPrimary,
    fontFamily: system.typography.headingFont,
    marginBottom: 8,
    margin: 0,
    paddingBottom: 8,
  };

  const sectionDesc: React.CSSProperties = {
    fontSize: 14,
    color: palette.textSecondary,
    lineHeight: 1.7,
    marginBottom: 40,
    maxWidth: 520,
    marginTop: 0,
  };

  const heroTokensGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: 32,
  };

  const tokenCard: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.md,
    padding: 24,
    alignSelf: "start",
  };

  const tokenCardTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: palette.primary,
    marginBottom: 16,
    marginTop: 0,
  };

  const tokenRow: React.CSSProperties = {
    fontSize: 13,
    color: palette.textSecondary,
    marginBottom: 10,
  };

  const tokenValue: React.CSSProperties = {
    fontFamily: "monospace",
    fontSize: 12,
    color: palette.textPrimary,
  };

  const variantsLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: palette.textSecondary,
    marginBottom: 20,
    marginTop: 40,
  };

  const sectionWrap = (isLast: boolean): React.CSSProperties => ({
    paddingBottom: isLast ? 0 : 72,
    marginBottom: isLast ? 0 : 72,
    borderBottom: isLast ? "none" : `1px solid ${palette.border}`,
  });

  const inputBase: React.CSSProperties = {
    backgroundColor: palette.background,
    border: `1px solid ${palette.border}`,
    color: palette.textPrimary,
    padding: `${comp.input.paddingY} ${comp.input.paddingX}`,
    borderRadius: comp.input.borderRadius,
    fontSize: 13,
  };

  const btnBase: React.CSSProperties = {
    borderRadius: comp.button.borderRadius,
    fontWeight: comp.button.fontWeight,
    fontSize: 13,
    cursor: "pointer",
    border: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    color: palette.textPrimary,
    display: "block",
    marginBottom: 6,
  };

  function TokenRow({ label, value }: { label: string; value: string }) {
    return (
      <div style={tokenRow}>
        {label}
        <br />
        <span style={tokenValue}>→ {value}</span>
      </div>
    );
  }

  const [activeSection, setActiveSection] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

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

    const sections = document.querySelectorAll("[data-comp-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", gap: 0, position: "relative" }}>
      {/* Sidebar Index */}
      <nav
        style={{
          width: 220,
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          borderRight: `1px solid ${palette.border}`,
          padding: "24px 0",
          backgroundColor: palette.background,
        }}
      >
        <div style={{ padding: "0 16px 16px", fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
          Components ({SIDEBAR_SECTIONS.reduce((sum, g) => sum + g.items.length, 0)})
        </div>
        {SIDEBAR_SECTIONS.map((group) => (
          <div key={group.group} style={{ marginBottom: 8 }}>
            <div style={{ padding: "8px 16px 4px", fontSize: 10, fontWeight: 600, color: palette.textSecondary, letterSpacing: "0.08em", textTransform: "uppercase" as const, opacity: 0.7 }}>
              {group.group}
            </div>
            {group.items.map((item) => {
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
            })}
          </div>
        ))}
      </nav>

      {/* Main Content */}
      <div ref={contentRef} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, minWidth: 0, padding: "0 0 0 24px" }}>

      {/* ─── 1. BUTTONS ─── */}
      <motion.section id="comp-buttons" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Buttons</p>
        <p style={sectionDesc}>
          The primary interaction affordance. Each variant maps to a distinct
          level of visual hierarchy, ensuring the most important action always
          stands out while secondary actions recede gracefully.
        </p>

        <div style={heroTokensGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 140,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: palette.surfaceMuted,
                borderRadius: system.spacing.radius.md,
                padding: "10px 14px",
                border: `1px solid ${palette.border}`,
              }}
            >
              <button style={{ ...btnBase, backgroundColor: comp.button.primaryBg, color: comp.button.primaryText, padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>
                Save Changes
              </button>
              <button style={{ ...btnBase, backgroundColor: "transparent", color: comp.button.secondaryText, padding: `${comp.button.paddingY} ${comp.button.paddingX}`, border: `1.5px solid ${comp.button.secondaryBorder}` }}>
                Export
              </button>
              <div style={{ width: 1, height: 24, backgroundColor: palette.border }} />
              <button
                style={{
                  ...btnBase,
                  backgroundColor: palette.surfaceMuted,
                  color: palette.textSecondary,
                  width: 36,
                  height: 36,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  border: `1px solid ${palette.border}`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Border Radius" value={comp.button.borderRadius} />
            <TokenRow label="Padding Y" value={comp.button.paddingY} />
            <TokenRow label="Padding X" value={comp.button.paddingX} />
            <TokenRow label="Font Weight" value={comp.button.fontWeight} />
            <TokenRow label="Primary BG" value={palette.primary} />
            <TokenRow label="Primary Text" value={palette.background} />
          </div>
        </div>

        <p style={variantsLabel}>Variants</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <button style={{ ...btnBase, backgroundColor: comp.button.primaryBg, color: comp.button.primaryText, padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Primary</button>
          <button style={{ ...btnBase, backgroundColor: "transparent", color: comp.button.secondaryText, padding: `${comp.button.paddingY} ${comp.button.paddingX}`, border: `1.5px solid ${comp.button.secondaryBorder}` }}>Outline</button>
          <button style={{ ...btnBase, backgroundColor: palette.success, color: "#ffffff", padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Approve</button>
          <button style={{ ...btnBase, backgroundColor: "transparent", color: palette.textSecondary, padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Cancel</button>
          <button style={{ ...btnBase, backgroundColor: palette.danger, color: "#ffffff", padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Delete</button>

          <div style={{ width: 1, height: 24, backgroundColor: palette.border, margin: "0 6px" }} />

          <button style={{ ...btnBase, backgroundColor: comp.button.primaryBg, color: comp.button.primaryText, padding: "4px 10px", fontSize: 11 }}>Small</button>
          <button style={{ ...btnBase, backgroundColor: comp.button.primaryBg, color: comp.button.primaryText, padding: `${comp.button.paddingY} ${comp.button.paddingX}` }}>Default</button>
          <button style={{ ...btnBase, backgroundColor: comp.button.primaryBg, color: comp.button.primaryText, padding: "12px 28px", fontSize: 15 }}>Large</button>
          <button
            style={{
              ...btnBase,
              backgroundColor: comp.button.primaryBg,
              color: comp.button.primaryText,
              width: 36, height: 36,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: 0,
            }}
            aria-label="Icon button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          <div style={{ width: 1, height: 24, backgroundColor: palette.border, margin: "0 6px" }} />

          <button style={{ ...btnBase, backgroundColor: comp.button.primaryBg, color: comp.button.primaryText, padding: `${comp.button.paddingY} ${comp.button.paddingX}`, opacity: 0.45, cursor: "not-allowed" }} disabled>Disabled</button>
          <button style={{ ...btnBase, backgroundColor: comp.button.primaryBg, color: comp.button.primaryText, padding: `${comp.button.paddingY} ${comp.button.paddingX}`, display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
              <path d="M21 12a9 9 0 1 1-6.22-8.56" />
            </svg>
            Loading…
          </button>
        </div>
      </motion.section>

      {/* ─── 2. INPUTS & SELECTS ─── */}
      <motion.section id="comp-inputs" data-comp-section {...fadeUp} transition={{ delay: 0.05 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Inputs &amp; Selects</p>
        <p style={sectionDesc}>
          Form primitives designed for clarity and accessibility. The soft border
          transitions to a brand-colored focus ring, guiding users through data
          entry without visual clutter.
        </p>

        <div style={heroTokensGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 32,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 360 }}>
              <div>
                <label style={labelStyle}>{content.formFields.projectTitle}</label>
                <input
                  type="text"
                  defaultValue={content.formFields.placeholder.replace("e.g. ", "")}
                  readOnly
                  className="w-full outline-none"
                  style={inputBase}
                />
              </div>
              <div>
                <label style={labelStyle}>{content.formFields.ownerLabel}</label>
                <input
                  type="text"
                  defaultValue={content.formFields.ownerPlaceholder.replace("Search ", "").replace("...", "")}
                  readOnly
                  className="w-full outline-none"
                  style={{ ...inputBase, border: `1.5px solid ${palette.primary}`, boxShadow: `0 0 0 3px ${palette.primary}18` }}
                />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <div
                  className="w-full flex items-center justify-between"
                  style={{ ...inputBase, cursor: "pointer" }}
                >
                  <span>{content.formFields.categories[0]}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.background} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Border Radius" value={comp.input.borderRadius} />
            <TokenRow label="Padding Y" value={comp.input.paddingY} />
            <TokenRow label="Padding X" value={comp.input.paddingX} />
            <TokenRow label="Focus Border" value={palette.primary} />
          </div>
        </div>

        <p style={variantsLabel}>States &amp; Types</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6, fontWeight: 500 }}>Default</div>
            <input
              type="text"
              placeholder={content.formFields.placeholder}
              readOnly
              className="w-full outline-none"
              style={inputBase}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6, fontWeight: 500 }}>Focus</div>
            <input
              type="text"
              defaultValue="Focused input"
              readOnly
              className="w-full outline-none"
              style={{ ...inputBase, border: `1.5px solid ${palette.primary}`, boxShadow: `0 0 0 3px ${palette.primary}18` }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6, fontWeight: 500 }}>Error</div>
            <input
              type="text"
              defaultValue="Invalid value"
              readOnly
              className="w-full outline-none"
              style={{ ...inputBase, border: `1.5px solid ${palette.danger}`, boxShadow: `0 0 0 3px ${palette.danger}18` }}
            />
            <p style={{ fontSize: 11, color: palette.danger, marginTop: 4 }}>Required field</p>
          </div>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6, fontWeight: 500 }}>Disabled</div>
            <input
              type="text"
              defaultValue="Not editable"
              readOnly
              className="w-full outline-none"
              style={{ ...inputBase, opacity: 0.5, cursor: "not-allowed" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6, fontWeight: 500 }}>Select</div>
            <div className="w-full flex items-center justify-between" style={{ ...inputBase, cursor: "pointer" }}>
              <span>Select status...</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6, fontWeight: 500 }}>Textarea</div>
            <textarea
              placeholder={content.formFields.descriptionPlaceholder}
              readOnly
              rows={2}
              className="w-full outline-none resize-none"
              style={{ ...inputBase, fontFamily: "inherit" }}
            />
          </div>
        </div>
      </motion.section>

      {/* ─── 3. DATE PICKERS ─── */}
      <motion.section id="comp-date-pickers" data-comp-section {...fadeUp} transition={{ delay: 0.1 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Date Pickers</p>
        <p style={sectionDesc}>
          Temporal selection built for scheduling workflows. The compact input
          expands into a calendar grid, anchored to the brand palette for
          selected and today states.
        </p>

        <div style={heroTokensGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 32,
            }}
          >
            <div style={{ maxWidth: 300 }}>
              <label style={labelStyle}>Due Date</label>
              <div
                className="flex items-center justify-between"
                style={{ ...inputBase, cursor: "pointer", marginBottom: 16 }}
              >
                <span style={{ color: palette.textPrimary }}>April 22, 2026</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>

              <div
                style={{
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  padding: 16,
                  backgroundColor: palette.background,
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: palette.textSecondary, padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>April 2026</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: palette.textSecondary, padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center" }}>
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary, padding: "4px 0", letterSpacing: "0.5px" }}>{d}</div>
                  ))}
                  {calendarDays.flat().map((day, idx) => {
                    const isSelected = day === selectedDay;
                    const isToday = day === todayDay;
                    return (
                      <div
                        key={idx}
                        style={{
                          fontSize: 12, padding: "6px 0",
                          borderRadius: system.spacing.radius.sm,
                          color: isSelected ? "#ffffff" : isToday ? palette.primary : day ? palette.textPrimary : "transparent",
                          backgroundColor: isSelected ? palette.primary : isToday ? palette.primary + "18" : "transparent",
                          fontWeight: isSelected || isToday ? 600 : 400,
                          cursor: day ? "pointer" : "default",
                        }}
                      >
                        {day ?? ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.background} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Border Radius" value={comp.input.borderRadius} />
            <TokenRow label="Padding Y" value={comp.input.paddingY} />
            <TokenRow label="Padding X" value={comp.input.paddingX} />
            <TokenRow label="Selected BG" value={palette.primary} />
          </div>
        </div>

        <p style={variantsLabel}>Variants</p>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 220px" }}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6, fontWeight: 500 }}>Closed</div>
            <div className="flex items-center justify-between" style={{ ...inputBase, cursor: "pointer" }}>
              <span style={{ color: palette.textSecondary }}>Select date...</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
          <div style={{ flex: "0 0 220px" }}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6, fontWeight: 500 }}>With Value</div>
            <div className="flex items-center justify-between" style={{ ...inputBase, cursor: "pointer" }}>
              <span style={{ color: palette.textPrimary }}>April 22, 2026</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 4. CHECKBOXES ─── */}
      <motion.section id="comp-checkboxes" data-comp-section {...fadeUp} transition={{ delay: 0.15 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Checkboxes</p>
        <p style={sectionDesc}>
          Multi-select controls that respect the brand through color and corner
          radius. The checked state uses the primary color for immediate
          recognition in dense forms.
        </p>

        <div style={heroTokensGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 32,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>Notification Preferences</div>
            <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 20 }}>Choose what updates you receive</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: content.quickActions[0]?.replace("+ ", "") || "Email notifications", checked: true },
                { label: "Weekly summary digest", checked: true },
                { label: "New assignment alerts", checked: false },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3" style={{ cursor: "pointer" }}>
                  <span
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                      border: item.checked ? `2px solid ${palette.primary}` : `1.5px solid ${palette.border}`,
                      backgroundColor: item.checked ? palette.primary : "transparent",
                    }}
                  >
                    {item.checked && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span style={{ fontSize: 13, color: palette.textPrimary }}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Checked Color" value={palette.primary} />
            <TokenRow label="Size" value="18px" />
            <TokenRow label="Border Radius" value="4px" />
            <TokenRow label="Border Color" value={palette.border} />
          </div>
        </div>

        <p style={variantsLabel}>States</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${palette.border}`, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Unchecked</span>
          </label>
          <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 4, border: `2px solid ${palette.primary}`, backgroundColor: palette.primary, flexShrink: 0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </span>
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Checked</span>
          </label>
          <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 4, border: `2px solid ${palette.primary}`, backgroundColor: palette.primary, flexShrink: 0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </span>
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Indeterminate</span>
          </label>
          <label className="flex items-center gap-2" style={{ cursor: "not-allowed", opacity: 0.45 }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: palette.textSecondary }}>Disabled</span>
          </label>
        </div>
      </motion.section>

      {/* ─── 5. RADIOS ─── */}
      <motion.section id="comp-radio" data-comp-section {...fadeUp} transition={{ delay: 0.2 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Radio Buttons</p>
        <p style={sectionDesc}>
          Single-select controls for mutually exclusive choices. The filled-dot
          selection pattern provides a clear affordance while the ring animation
          confirms the user's action.
        </p>

        <div style={heroTokensGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 32,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>Priority Level</div>
            <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 20 }}>Select urgency for this item</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Critical — Immediate action required", selected: false },
                { label: "High — Needs attention this sprint", selected: true },
                { label: "Medium — Scheduled for upcoming cycle", selected: false },
                { label: "Low — Backlog item", selected: false },
              ].map((opt) => (
                <label key={opt.label} className="flex items-center gap-3" style={{ cursor: "pointer" }}>
                  <span
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: 18, height: 18, borderRadius: "50%",
                      border: opt.selected ? `2px solid ${palette.primary}` : `1.5px solid ${palette.border}`,
                      flexShrink: 0,
                    }}
                  >
                    {opt.selected && <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.primary }} />}
                  </span>
                  <span style={{ fontSize: 13, color: palette.textPrimary }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Selected Color" value={palette.primary} />
            <TokenRow label="Size" value="18px" />
            <TokenRow label="Border" value={palette.border} />
          </div>
        </div>

        <p style={variantsLabel}>States</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", border: `2px solid ${palette.primary}`, flexShrink: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.primary }} />
            </span>
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Selected</span>
          </label>
          <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${palette.border}`, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Unselected</span>
          </label>
          <label className="flex items-center gap-2" style={{ cursor: "not-allowed", opacity: 0.45 }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: palette.textSecondary }}>Disabled</span>
          </label>
        </div>
      </motion.section>

      {/* ─── 6. CARDS ─── */}
      <motion.section id="comp-cards" data-comp-section {...fadeUp} transition={{ delay: 0.25 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Cards</p>
        <p style={sectionDesc}>
          The foundational container for grouping related content. Contextualised for your {system.meta.industry.replace("-", " ")} project with industry-specific card patterns — from stat dashboards to listing layouts.
        </p>

        <div style={heroTokensGrid}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
            {/* Industry-specific listing/media card */}
            <div
              style={{
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: comp.card.borderRadius || system.spacing.radius.lg,
                overflow: "hidden",
                gridRow: "1 / 3",
              }}
            >
              <div style={{ height: 140, background: `linear-gradient(135deg, ${palette.primary}25, ${palette.secondary}35, ${palette.accent}20)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                </svg>
                <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 4 }}>
                  {content.formFields.categories.slice(0, 2).map((cat) => (
                    <span key={cat} style={{ padding: "3px 8px", borderRadius: system.spacing.radius.sm, fontSize: 9, fontWeight: 600, backgroundColor: palette.background, color: palette.textPrimary, boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}>{cat}</span>
                  ))}
                </div>
                <div style={{ position: "absolute", top: 10, right: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.background, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.danger} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: system.typography.fontWeight.bold, color: palette.primary, margin: "0 0 4px", fontFamily: system.typography.headingFont }}>{content.kpis[3]?.value || "AED 1,250,000"}</p>
                    <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>{content.formFields.projectTitle}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 11, color: palette.textSecondary }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                    3 Beds
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                    2 Baths
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                    1,450 sqft
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: palette.textSecondary, marginBottom: 14 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {content.breadcrumb.slice(0, 2).join(", ")}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, padding: "8px 12px", fontSize: 11, fontWeight: 600, color: palette.primary, backgroundColor: palette.primary + "12", border: `1px solid ${palette.primary}30`, borderRadius: system.spacing.radius.md, cursor: "pointer" }}>Contact</button>
                  <button style={{ flex: 1, padding: "8px 12px", fontSize: 11, fontWeight: 600, color: palette.background, backgroundColor: palette.primary, border: "none", borderRadius: system.spacing.radius.md, cursor: "pointer" }}>Details →</button>
                </div>
              </div>
            </div>

            {/* Stat Card */}
            <div
              style={{
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: comp.card.borderRadius || system.spacing.radius.lg,
                padding: 20,
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: palette.textSecondary, marginBottom: 8, marginTop: 0 }}>{content.kpis[0]?.label || "Active Items"}</p>
              <p style={{ fontSize: 28, fontWeight: system.typography.fontWeight.bold, color: palette.textPrimary, lineHeight: 1, margin: "0 0 6px", fontFamily: system.typography.headingFont }}>{content.kpis[0]?.value || "2,847"}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: palette.success }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /></svg>
                {content.kpis[0]?.subtitle || "+12.5%"}
              </span>
            </div>

            {/* Content Card */}
            <div
              style={{
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: comp.card.borderRadius || system.spacing.radius.lg,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: 20 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, marginTop: 0 }}>{content.recentItems[0]?.title || content.formFields.projectTitle}</p>
                <p style={{ fontSize: 11, color: palette.textSecondary, lineHeight: 1.6, margin: "0 0 8px" }}>{content.recentItems[0]?.author || "Summary information"}</p>
                <span style={{ padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`, borderRadius: comp.badge.borderRadius, fontSize: 10, fontWeight: comp.badge.fontWeight, backgroundColor: palette.warning + "18", color: palette.warning }}>{content.recentItems[0]?.status || "Pending"}</span>
              </div>
              <div style={{ borderTop: `1px solid ${palette.border}`, padding: "8px 20px", display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: palette.primary, cursor: "pointer" }}>View →</span>
              </div>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Background" value={palette.surface} />
            <TokenRow label="Border Color" value={palette.border} />
            <TokenRow label="Border Radius" value={comp.card.borderRadius || system.spacing.radius.lg} />
            <TokenRow label="Padding" value="20px" />
            <TokenRow label="Shadow" value={comp.card.shadow || "none"} />
          </div>
        </div>

        <p style={variantsLabel}>Elevation Levels</p>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: comp.card.borderRadius || system.spacing.radius.lg, padding: "20px 24px" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "1px", textTransform: "uppercase" as const }}>Basic</span>
            <p style={{ fontSize: 13, color: palette.textSecondary, marginTop: 6, marginBottom: 0, lineHeight: 1.5 }}>Flat surface, border only</p>
          </div>
          <div style={{ flex: 1, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: comp.card.borderRadius || system.spacing.radius.lg, padding: "20px 24px", outline: `1px solid ${palette.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "1px", textTransform: "uppercase" as const }}>Outlined</span>
            <p style={{ fontSize: 13, color: palette.textSecondary, marginTop: 6, marginBottom: 0, lineHeight: 1.5 }}>Emphasized border treatment</p>
          </div>
          <div style={{ flex: 1, backgroundColor: palette.surface, borderRadius: comp.card.borderRadius || system.spacing.radius.lg, padding: "20px 24px", boxShadow: system.spacing.elevation.md, border: "1px solid transparent" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "1px", textTransform: "uppercase" as const }}>Elevated</span>
            <p style={{ fontSize: 13, color: palette.textSecondary, marginTop: 6, marginBottom: 0, lineHeight: 1.5 }}>Shadow for focal content</p>
          </div>
        </div>
      </motion.section>

      {/* ─── 7. TABLES ─── */}
      <motion.section id="comp-tables" data-comp-section {...fadeUp} transition={{ delay: 0.3 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Data Table</p>
        <p style={sectionDesc}>
          Structured data presentation with sortable headers, inline badges, and
          alternating row shading for scanability in data-dense views.
        </p>

        <div style={heroTokensGrid}>
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, overflow: "hidden" }}>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ backgroundColor: palette.surfaceMuted }}>
                    {["ID", "TITLE", "TYPE", "PRIORITY", "STATUS", "OWNER", "DUE"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: comp.table.cellPadding,
                          color: palette.textSecondary,
                          fontWeight: 600, fontSize: 10,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          textAlign: "left", whiteSpace: "nowrap",
                        }}
                      >
                        <span className="inline-flex items-center gap-1">
                          {h}
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}><path d="M12 5v14M5 12l7-7 7 7" /></svg>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.tableRows.map((row, i) => (
                    <tr key={row.id} style={{ backgroundColor: i % 2 === 1 ? palette.surface : "transparent", borderTop: `1px solid ${palette.border}` }}>
                      <td style={{ padding: comp.table.cellPadding, color: palette.textSecondary, fontFamily: "monospace", fontSize: 12, whiteSpace: "nowrap" }}>{row.id}</td>
                      <td style={{ padding: comp.table.cellPadding, color: palette.textPrimary, fontWeight: 500, maxWidth: 220 }}>
                        <span className="line-clamp-1">{row.title}</span>
                      </td>
                      <td style={{ padding: comp.table.cellPadding, whiteSpace: "nowrap" }}>
                        <span style={{ padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`, borderRadius: comp.badge.borderRadius, fontSize: 11, fontWeight: comp.badge.fontWeight, backgroundColor: typeColor(row.type) + "15", color: typeColor(row.type) }}>{row.type}</span>
                      </td>
                      <td style={{ padding: comp.table.cellPadding, whiteSpace: "nowrap" }}>
                        <span className="inline-flex items-center gap-1.5">
                          <svg width="10" height="10" viewBox="0 0 10 10" style={{ color: priorityColor(row.priority) }}><polygon points="5,1 9,9 1,9" fill="currentColor" /></svg>
                          <span style={{ fontSize: 12, fontWeight: 500, color: priorityColor(row.priority) }}>{row.priority}</span>
                        </span>
                      </td>
                      <td style={{ padding: comp.table.cellPadding, whiteSpace: "nowrap" }}>
                        <span style={{ padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`, borderRadius: "9999px", fontSize: 11, fontWeight: comp.badge.fontWeight, backgroundColor: statusColor(row.status) + "15", color: statusColor(row.status) }}>{row.status}</span>
                      </td>
                      <td style={{ padding: comp.table.cellPadding, whiteSpace: "nowrap", fontSize: 12, color: palette.textPrimary }}>{row.owner}</td>
                      <td style={{ padding: comp.table.cellPadding, color: palette.textSecondary, fontSize: 12, whiteSpace: "nowrap" }}>{row.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Header BG" value={palette.surfaceMuted} />
            <TokenRow label="Cell Padding" value={comp.table.cellPadding} />
            <TokenRow label="Row Border" value={palette.border} />
            <TokenRow label="Striped BG" value={palette.surface} />
          </div>
        </div>
      </motion.section>

      {/* ─── 8. BADGES ─── */}
      <motion.section id="comp-badges" data-comp-section {...fadeUp} transition={{ delay: 0.35 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Badges &amp; Status</p>
        <p style={sectionDesc}>
          Visual shorthand for state and urgency. The compact form ensures badges
          work alongside text in tables, cards, and navigation without competing
          for attention.
        </p>

        <div style={heroTokensGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 32,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const, color: palette.textSecondary, marginBottom: 14 }}>Recent Activity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { text: `${content.recentItems[0]?.title || "New item created"}`, badge: "In Progress", color: palette.primary },
                { text: `${content.recentItems[1]?.title || "Review submitted"}`, badge: "Review", color: palette.info },
                { text: `${content.recentItems[2]?.title || "Task completed"}`, badge: content.recentItems[2]?.status || "Done", color: palette.success },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: i < 2 ? `1px solid ${palette.border}` : "none" }}>
                  <span style={{ padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`, borderRadius: comp.badge.borderRadius, fontSize: comp.badge.fontSize, fontWeight: comp.badge.fontWeight, backgroundColor: item.color + "18", color: item.color, whiteSpace: "nowrap", flexShrink: 0 }}>{item.badge}</span>
                  <span style={{ fontSize: 13, color: palette.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Padding Y" value={comp.badge.paddingY} />
            <TokenRow label="Padding X" value={comp.badge.paddingX} />
            <TokenRow label="Border Radius" value={comp.badge.borderRadius} />
            <TokenRow label="Font Size" value={comp.badge.fontSize} />
            <TokenRow label="Font Weight" value={comp.badge.fontWeight} />
          </div>
        </div>

        <p style={variantsLabel}>Workflow Badges</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {[
            { label: "In Progress", color: palette.primary },
            { label: "Review", color: palette.info },
            { label: "Completed", color: palette.success },
            { label: "Blocked", color: palette.danger },
            { label: "At Risk", color: palette.warning },
            { label: "Draft", color: palette.textSecondary },
          ].map((b) => (
            <span key={b.label} style={{ padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`, borderRadius: comp.badge.borderRadius, fontSize: comp.badge.fontSize, fontWeight: comp.badge.fontWeight, backgroundColor: b.color + "18", color: b.color }}>{b.label}</span>
          ))}
        </div>

        <p style={{ ...variantsLabel, marginTop: 0 }}>Status Chips with Dots</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {[
            { label: "Active", color: palette.success },
            { label: "Pending", color: palette.warning },
            { label: "Blocked", color: palette.danger },
            { label: "In Review", color: palette.info },
            { label: "Closed", color: palette.textSecondary },
          ].map((c) => (
            <span
              key={c.label}
              style={{
                padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                borderRadius: "9999px",
                fontSize: comp.badge.fontSize,
                fontWeight: comp.badge.fontWeight,
                backgroundColor: c.color + "14",
                color: c.color,
                border: `1px solid ${c.color}30`,
              }}
            >
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", backgroundColor: c.color, marginRight: 6, verticalAlign: "middle" }} />
              {c.label}
            </span>
          ))}
        </div>

        <p style={{ ...variantsLabel, marginTop: 0 }}>Priority Levels</p>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {[
            { label: "Critical", color: palette.danger },
            { label: "High", color: "#f97316" },
            { label: "Medium", color: palette.warning },
            { label: "Low", color: palette.textSecondary },
          ].map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: p.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─── 9. TABS ─── */}
      <motion.section id="comp-tabs" data-comp-section {...fadeUp} transition={{ delay: 0.4 }} style={sectionWrap(true)}>
        <div style={accentBar} />
        <p style={sectionTitle}>Tabs</p>
        <p style={sectionDesc}>
          Navigation patterns for switching context within a page. The underline
          style anchors primary navigation while the pill variant suits
          segmented filters and compact controls.
        </p>

        <div style={heroTokensGrid}>
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              overflow: "hidden",
            }}
          >
            <div style={{ borderBottom: `1px solid ${palette.border}`, display: "flex", gap: 0 }}>
              {["Overview", "Details", "Activity", "Settings"].map((tab, i) => {
                const isActive = i === 0;
                return (
                  <button
                    key={tab}
                    style={{
                      background: "none", border: "none",
                      borderBottom: isActive ? `2px solid ${palette.primary}` : "2px solid transparent",
                      padding: "14px 20px",
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? palette.textPrimary : palette.textSecondary,
                      cursor: "pointer",
                      marginBottom: -1,
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
            <div style={{ padding: 24, fontSize: 13, color: palette.textSecondary, lineHeight: 1.7 }}>
              The overview panel shows a high-level summary of the current item, including key metrics, recent activity, and quick-access actions.
            </div>
          </div>

          <div style={tokenCard}>
            <p style={tokenCardTitle}>Design Tokens</p>
            <TokenRow label="Active Color" value={palette.primary} />
            <TokenRow label="Border" value={palette.border} />
            <TokenRow label="Font Size" value="13px" />
          </div>
        </div>

        <p style={variantsLabel}>Styles</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8, fontWeight: 500 }}>Underline</div>
            <div style={{ borderBottom: `1px solid ${palette.border}`, display: "flex", gap: 0 }}>
              {["Overview", "Details", "Activity"].map((tab, i) => {
                const isActive = i === 0;
                return (
                  <button key={tab} style={{ background: "none", border: "none", borderBottom: isActive ? `2px solid ${palette.primary}` : "2px solid transparent", padding: "10px 18px", fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? palette.textPrimary : palette.textSecondary, cursor: "pointer", marginBottom: -1 }}>{tab}</button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8, fontWeight: 500 }}>Pill / Segment</div>
            <div style={{ display: "inline-flex", gap: 4, backgroundColor: palette.surfaceMuted, borderRadius: system.spacing.radius.md, padding: 4 }}>
              {["Overview", "Details", "Activity"].map((tab, i) => {
                const isActive = i === 0;
                return (
                  <button key={tab} style={{ background: isActive ? palette.surface : "none", border: isActive ? `1px solid ${palette.border}` : "none", borderRadius: system.spacing.radius.sm, padding: "7px 16px", fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? palette.textPrimary : palette.textSecondary, cursor: "pointer", boxShadow: isActive ? system.spacing.elevation.sm : "none" }}>{tab}</button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <ComponentsPart2 system={system} content={content} />
      <ComponentsPart3 system={system} content={content} />
      <ComponentsPart4 system={system} content={content} />
      <ComponentsPart5 system={system} content={content} />
      <ComponentsPart6 system={system} content={content} />
      <ComponentsPart7 system={system} content={content} />
      <ComponentsPart8 system={system} content={content} />
      <ComponentsPart9 system={system} content={content} />

      </div>
    </div>
  );
}
