"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface AppShellTabProps {
  system: DesignSystem;
  content: IndustryContent;
}

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

/* ─────────────────────────────────────────────
   Section 8.5 — APP SHELL RULES
   ───────────────────────────────────────────── */

function SidebarRule({
  palette,
  system,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  content: IndustryContent;
}) {
  const sidebarWidth = 220;
  return (
    <div
      style={{
        display: "flex",
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
        minHeight: 400,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarWidth,
          backgroundColor: palette.surface,
          borderRight: `1px solid ${palette.border}`,
          padding: "20px 0",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 16px",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: system.spacing.radius.md,
              backgroundColor: palette.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {content.orgName.charAt(0)}
          </div>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: palette.textPrimary,
                margin: 0,
                letterSpacing: "0.03em",
              }}
            >
              {content.orgName}
            </p>
            <p
              style={{
                fontSize: 9,
                color: palette.textSecondary,
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {content.orgSubtitle}
            </p>
          </div>
        </div>

        <nav style={{ padding: "0 10px", display: "flex", flexDirection: "column", gap: 16 }}>
          {content.sidebarSections.slice(0, 2).map((section) => (
            <div key={section.label}>
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: palette.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0 8px",
                  marginBottom: 4,
                  margin: 0,
                  marginBlockEnd: 4,
                }}
              >
                {section.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "7px 10px",
                      borderRadius: system.spacing.radius.md,
                      backgroundColor: item.active ? palette.primary : "transparent",
                      color: item.active ? "#FFFFFF" : palette.textSecondary,
                      fontSize: 12,
                      fontWeight: item.active ? 600 : 400,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          backgroundColor: item.active ? "rgba(255,255,255,0.25)" : palette.border,
                        }}
                      />
                      {item.name}
                    </div>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          padding: "1px 7px",
                          borderRadius: system.spacing.radius.full,
                          backgroundColor: item.active ? "rgba(255,255,255,0.25)" : palette.danger + "18",
                          color: item.active ? "#FFFFFF" : palette.danger,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Annotation overlay */}
      <div
        style={{
          flex: 1,
          backgroundColor: palette.background,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: palette.primary,
            }}
          />
          <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>
            Sidebar: <strong style={{ color: palette.textPrimary }}>{sidebarWidth}px</strong> width
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: palette.success,
            }}
          />
          <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>
            Background: <code style={{ fontSize: 11, color: palette.primary, backgroundColor: palette.surfaceMuted, padding: "2px 6px", borderRadius: 4 }}>{palette.surface}</code>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: palette.warning,
            }}
          />
          <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>
            Active state: <strong style={{ color: palette.textPrimary }}>primary fill + white text</strong>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: palette.info,
            }}
          />
          <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>
            Icon placement: <strong style={{ color: palette.textPrimary }}>16×16 left-aligned, {system.spacing.radius.md} radius</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function HeaderRule({
  palette,
  system,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  content: IndustryContent;
}) {
  const headerHeight = 56;
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: headerHeight,
          backgroundColor: palette.surface,
          borderBottom: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: palette.textPrimary,
              margin: 0,
              fontFamily: system.typography.headingFont,
            }}
          >
            {content.portalTitle}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 200,
              height: 32,
              borderRadius: system.spacing.radius.md,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>Search…</span>
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: palette.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            A
          </div>
        </div>
      </div>
      <div
        style={{
          padding: 20,
          backgroundColor: palette.background,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {[
          { label: "Height", value: `${headerHeight}px` },
          { label: "Background", value: palette.surface },
          { label: "Alignment", value: "space-between (title left, actions right)" },
          { label: "Search", value: "right-aligned, 200px, bordered input" },
        ].map((spec) => (
          <div key={spec.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: palette.primary,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                width: 100,
                flexShrink: 0,
              }}
            >
              {spec.label}
            </span>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageTitleRule({
  palette,
  system,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  content: IndustryContent;
}) {
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.surface,
        padding: 32,
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0 }}>
          {content.breadcrumb.map((crumb, i) => (
            <span key={crumb}>
              {i > 0 && <span style={{ margin: "0 6px", opacity: 0.4 }}>›</span>}
              <span style={i === content.breadcrumb.length - 1 ? { color: palette.textPrimary, fontWeight: 500 } : { opacity: 0.7 }}>
                {crumb}
              </span>
            </span>
          ))}
        </p>
      </div>
      <h2
        style={{
          fontSize: system.typography.scale.h2,
          fontWeight: system.typography.fontWeight.bold,
          color: palette.textPrimary,
          fontFamily: system.typography.headingFont,
          margin: 0,
          marginBottom: 4,
        }}
      >
        {content.breadcrumb[content.breadcrumb.length - 1] || "Page Title"}
      </h2>
      <p style={{ fontSize: 13, color: palette.textSecondary, margin: 0 }}>
        Breadcrumbs above, heading at {system.typography.scale.h2}, weight {system.typography.fontWeight.bold}
      </p>
    </div>
  );
}

function FilterBarRule({
  palette,
  system,
  comp,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  comp: DesignSystem["components"];
}) {
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.surface,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <div
            style={{
              flex: 1,
              maxWidth: 280,
              height: 36,
              borderRadius: comp.input.borderRadius,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 8,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>Search items…</span>
          </div>
          {["Status", "Priority", "Owner"].map((filter) => (
            <button
              key={filter}
              style={{
                height: 36,
                padding: "0 14px",
                borderRadius: comp.button.borderRadius,
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.surface,
                color: palette.textSecondary,
                fontSize: 12,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "default",
              }}
            >
              {filter}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              height: 36,
              padding: "0 16px",
              borderRadius: comp.button.borderRadius,
              border: "none",
              backgroundColor: palette.primary,
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 600,
              cursor: "default",
            }}
          >
            + New Item
          </button>
        </div>
      </div>
      <div
        style={{
          marginTop: 16,
          padding: 12,
          borderRadius: system.spacing.radius.md,
          backgroundColor: palette.surfaceMuted,
          border: `1px solid ${palette.border}`,
        }}
      >
        <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: palette.textPrimary }}>Layout:</strong> search left, filter dropdowns center, primary action right.{" "}
          <strong style={{ color: palette.textPrimary }}>Search:</strong> 280px max.{" "}
          <strong style={{ color: palette.textPrimary }}>Buttons:</strong> {comp.button.borderRadius} radius, 36px height.
        </p>
      </div>
    </div>
  );
}

function DashboardWidgetRule({
  palette,
  system,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  content: IndustryContent;
}) {
  const accentColors = [palette.primary, palette.success, palette.warning, palette.info];
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.background,
        padding: 24,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {content.kpis.slice(0, 4).map((kpi, i) => (
          <div
            key={kpi.label}
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              borderTop: `3px solid ${accentColors[i % accentColors.length]}`,
              padding: 20,
            }}
          >
            <p style={{ fontSize: 24, fontWeight: 700, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>
              {kpi.value}
            </p>
            <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0, marginTop: 4 }}>
              {kpi.label}
            </p>
            <p style={{ fontSize: 11, color: accentColors[i % accentColors.length], margin: 0, marginTop: 2 }}>
              {kpi.subtitle}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: 12,
          borderRadius: system.spacing.radius.md,
          backgroundColor: palette.surfaceMuted,
          border: `1px solid ${palette.border}`,
        }}
      >
        <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: palette.textPrimary }}>Grid:</strong> 4-column KPI cards.{" "}
          <strong style={{ color: palette.textPrimary }}>Accent:</strong> colored top border per card.{" "}
          <strong style={{ color: palette.textPrimary }}>Spacing:</strong> 16px gap, 20px inner padding.
        </p>
      </div>
    </div>
  );
}

function FormLayoutRule({
  palette,
  system,
  comp,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  comp: DesignSystem["components"];
  content: IndustryContent;
}) {
  const fields = content.formFields;
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.surface,
        padding: 32,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6 }}>
            {fields.ownerLabel}
          </label>
          <div
            style={{
              height: 38,
              borderRadius: comp.input.borderRadius,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, color: palette.textSecondary }}>{fields.ownerPlaceholder}</span>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6 }}>
            {fields.projectTitle || "Project Title"}
          </label>
          <div
            style={{
              height: 38,
              borderRadius: comp.input.borderRadius,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, color: palette.textSecondary }}>{fields.placeholder}</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6 }}>
          {fields.descriptionLabel}
        </label>
        <div
          style={{
            height: 80,
            borderRadius: comp.input.borderRadius,
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.background,
            padding: 12,
          }}
        >
          <span style={{ fontSize: 13, color: palette.textSecondary }}>{fields.descriptionPlaceholder}</span>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6 }}>
          Category
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {fields.categories.slice(0, 4).map((cat, i) => (
            <div
              key={cat}
              style={{
                padding: "6px 14px",
                borderRadius: system.spacing.radius.full,
                border: `1px solid ${i === 0 ? palette.primary : palette.border}`,
                backgroundColor: i === 0 ? palette.primary + "12" : "transparent",
                color: i === 0 ? palette.primary : palette.textSecondary,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: 12,
          borderRadius: system.spacing.radius.md,
          backgroundColor: palette.surfaceMuted,
          border: `1px solid ${palette.border}`,
        }}
      >
        <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: palette.textPrimary }}>Two-column:</strong> short fields side by side.{" "}
          <strong style={{ color: palette.textPrimary }}>Single-column:</strong> description/textarea full-width.{" "}
          <strong style={{ color: palette.textPrimary }}>Field spacing:</strong> 20px gap (two-col), 24px vertical.
        </p>
      </div>
    </div>
  );
}

function MobileNavRule({
  palette,
  system,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  content: IndustryContent;
}) {
  const navItems = content.sidebarSections[0]?.items.slice(0, 5) || [];
  return (
    <div style={{ display: "flex", gap: 24 }}>
      {/* Collapsed sidebar */}
      <div
        style={{
          width: 180,
          borderRadius: system.spacing.radius.lg,
          border: `1px solid ${palette.border}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "8px 12px",
            backgroundColor: palette.surfaceMuted,
            borderBottom: `1px solid ${palette.border}`,
          }}
        >
          <p style={{ fontSize: 9, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
            Collapsed Sidebar
          </p>
        </div>
        <div
          style={{
            backgroundColor: palette.surface,
            padding: "12px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: system.spacing.radius.md,
              backgroundColor: palette.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            {content.orgName.charAt(0)}
          </div>
          {navItems.map((item) => (
            <div
              key={item.name}
              style={{
                width: 36,
                height: 36,
                borderRadius: system.spacing.radius.md,
                backgroundColor: item.active ? palette.primary : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  backgroundColor: item.active ? "rgba(255,255,255,0.3)" : palette.border,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          flex: 1,
          borderRadius: system.spacing.radius.lg,
          border: `1px solid ${palette.border}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "8px 12px",
            backgroundColor: palette.surfaceMuted,
            borderBottom: `1px solid ${palette.border}`,
          }}
        >
          <p style={{ fontSize: 9, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
            Mobile Bottom Navigation
          </p>
        </div>
        <div style={{ flex: 1, backgroundColor: palette.background, padding: 20, position: "relative", minHeight: 180 }}>
          <div
            style={{
              width: 140,
              margin: "0 auto",
              borderRadius: system.spacing.radius.lg,
              border: `2px solid ${palette.border}`,
              overflow: "hidden",
              backgroundColor: palette.background,
            }}
          >
            <div style={{ height: 100, backgroundColor: palette.surfaceMuted, padding: 10 }}>
              <div style={{ width: "60%", height: 8, borderRadius: 4, backgroundColor: palette.border, marginBottom: 6 }} />
              <div style={{ width: "80%", height: 6, borderRadius: 3, backgroundColor: palette.border, marginBottom: 4 }} />
              <div style={{ width: "45%", height: 6, borderRadius: 3, backgroundColor: palette.border }} />
            </div>
            <div
              style={{
                height: 36,
                backgroundColor: palette.surface,
                borderTop: `1px solid ${palette.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 8px",
              }}
            >
              {[palette.primary, palette.textSecondary, palette.textSecondary, palette.textSecondary].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    backgroundColor: i === 0 ? palette.primary : palette.border,
                    opacity: i === 0 ? 1 : 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopLayoutRule({
  palette,
  system,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
}) {
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
        minHeight: 200,
      }}
    >
      <div style={{ display: "flex", height: 200 }}>
        <div
          style={{
            width: "20%",
            backgroundColor: palette.surface,
            borderRight: `1px solid ${palette.border}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <p style={{ fontSize: 20, fontWeight: 700, color: palette.primary, margin: 0 }}>20%</p>
          <p style={{ fontSize: 10, color: palette.textSecondary, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Sidebar
          </p>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: palette.background,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <p style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, margin: 0 }}>80%</p>
          <p style={{ fontSize: 10, color: palette.textSecondary, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Content Area
          </p>
        </div>
      </div>
      <div
        style={{
          padding: 16,
          backgroundColor: palette.surfaceMuted,
          borderTop: `1px solid ${palette.border}`,
          display: "flex",
          gap: 32,
        }}
      >
        {[
          { label: "Sidebar", value: "220px / 20%" },
          { label: "Content", value: "flex-1 / 80%" },
          { label: "Max width", value: "1440px" },
          { label: "Content pad", value: "24–32px" },
        ].map((item) => (
          <div key={item.label}>
            <p style={{ fontSize: 10, fontWeight: 600, color: palette.primary, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0, marginBottom: 2 }}>
              {item.label}
            </p>
            <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section 8.6 — STARTER TEMPLATES
   ───────────────────────────────────────────── */

function TemplateDashboard({
  palette,
  system,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  content: IndustryContent;
}) {
  const comp = system.components;
  const accentColors = [palette.primary, palette.success, palette.warning, palette.info];
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", minHeight: 420 }}>
        {/* Mini sidebar */}
        <div
          style={{
            width: 180,
            backgroundColor: palette.surface,
            borderRight: `1px solid ${palette.border}`,
            padding: "16px 0",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "0 12px", marginBottom: 16 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: system.spacing.radius.md,
                backgroundColor: palette.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFF",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {content.orgName.charAt(0)}
            </div>
          </div>
          {content.sidebarSections[0]?.items.slice(0, 4).map((item) => (
            <div
              key={item.name}
              style={{
                padding: "6px 12px",
                margin: "0 8px",
                borderRadius: system.spacing.radius.md,
                backgroundColor: item.active ? palette.primary : "transparent",
                color: item.active ? "#FFF" : palette.textSecondary,
                fontSize: 11,
                fontWeight: item.active ? 600 : 400,
                marginBottom: 2,
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, backgroundColor: palette.background, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: 0 }}>
            {content.greeting}
          </p>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {content.kpis.slice(0, 4).map((kpi, i) => (
              <div
                key={kpi.label}
                style={{
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  padding: 12,
                  borderLeft: `3px solid ${accentColors[i % accentColors.length]}`,
                }}
              >
                <p style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, margin: 0 }}>{kpi.value}</p>
                <p style={{ fontSize: 10, color: palette.textSecondary, margin: 0, marginTop: 2 }}>{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Mini table */}
          <div
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.md,
              overflow: "hidden",
              flex: 1,
            }}
          >
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${palette.border}` }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, margin: 0 }}>Recent Items</p>
            </div>
            <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: comp.table.headerBg }}>
                  {["Title", "Status", "Owner"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: comp.table.headerText,
                        padding: "8px 14px",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.tableRows.slice(0, 3).map((row, i) => (
                  <tr
                    key={row.id}
                    style={{
                      backgroundColor: i % 2 === 1 ? comp.table.stripedBg : "transparent",
                      borderTop: `1px solid ${comp.table.rowBorder}`,
                    }}
                  >
                    <td style={{ padding: "8px 14px", color: palette.textPrimary }}>{row.title}</td>
                    <td style={{ padding: "8px 14px" }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          padding: "2px 8px",
                          borderRadius: comp.badge.borderRadius,
                          backgroundColor: (row.status === "Active" ? palette.success : palette.warning) + "18",
                          color: row.status === "Active" ? palette.success : palette.warning,
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: "8px 14px", color: palette.textSecondary }}>{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateFormPage({
  palette,
  system,
  comp,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  comp: DesignSystem["components"];
  content: IndustryContent;
}) {
  const fields = content.formFields;
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.background,
        overflow: "hidden",
      }}
    >
      {/* Form header */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: `1px solid ${palette.border}`,
          backgroundColor: palette.surface,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>
            New {content.breadcrumb[content.breadcrumb.length - 1] || "Item"}
          </p>
          <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0, marginTop: 2 }}>Fill in the details below</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: comp.button.borderRadius,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.surface,
              color: palette.textSecondary,
              fontSize: 12,
              fontWeight: 500,
              cursor: "default",
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: comp.button.borderRadius,
              border: "none",
              backgroundColor: palette.primary,
              color: "#FFF",
              fontSize: 12,
              fontWeight: 600,
              cursor: "default",
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Form body */}
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6 }}>
              {fields.projectTitle || "Title"}
            </label>
            <div
              style={{
                height: 38,
                borderRadius: comp.input.borderRadius,
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.surface,
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: palette.textSecondary }}>{fields.placeholder}</span>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6 }}>
              {fields.ownerLabel}
            </label>
            <div
              style={{
                height: 38,
                borderRadius: comp.input.borderRadius,
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.surface,
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: palette.textSecondary }}>{fields.ownerPlaceholder}</span>
            </div>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6 }}>
            {fields.descriptionLabel}
          </label>
          <div
            style={{
              height: 80,
              borderRadius: comp.input.borderRadius,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.surface,
              padding: 12,
            }}
          >
            <span style={{ fontSize: 13, color: palette.textSecondary }}>{fields.descriptionPlaceholder}</span>
          </div>
        </div>

        {/* Validation states */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6 }}>
              Valid Field
            </label>
            <div
              style={{
                height: 38,
                borderRadius: comp.input.borderRadius,
                border: `2px solid ${palette.success}`,
                backgroundColor: palette.surface,
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: palette.textPrimary }}>John Doe</span>
            </div>
            <p style={{ fontSize: 11, color: palette.success, margin: 0, marginTop: 4 }}>Looks good!</p>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: palette.danger, display: "block", marginBottom: 6 }}>
              Required Field *
            </label>
            <div
              style={{
                height: 38,
                borderRadius: comp.input.borderRadius,
                border: `2px solid ${palette.danger}`,
                backgroundColor: palette.danger + "08",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: palette.textSecondary }} />
            </div>
            <p style={{ fontSize: 11, color: palette.danger, margin: 0, marginTop: 4 }}>This field is required</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateListPage({
  palette,
  system,
  comp,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  comp: DesignSystem["components"];
  content: IndustryContent;
}) {
  const statusColor = (s: string) => {
    switch (s) {
      case "Active": return palette.success;
      case "Pending": return palette.warning;
      case "Urgent": return palette.danger;
      case "Review": return palette.info;
      default: return palette.textSecondary;
    }
  };
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.surface,
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>
          All Items
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 160,
              height: 32,
              borderRadius: comp.input.borderRadius,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              gap: 6,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: 11, color: palette.textSecondary }}>Search…</span>
          </div>
          <button
            style={{
              height: 32,
              padding: "0 12px",
              borderRadius: comp.button.borderRadius,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.surface,
              color: palette.textSecondary,
              fontSize: 11,
              fontWeight: 500,
              cursor: "default",
            }}
          >
            Filter
          </button>
          <button
            style={{
              height: 32,
              padding: "0 14px",
              borderRadius: comp.button.borderRadius,
              border: "none",
              backgroundColor: palette.primary,
              color: "#FFF",
              fontSize: 11,
              fontWeight: 600,
              cursor: "default",
            }}
          >
            + New
          </button>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: comp.table.headerBg }}>
            {["Title", "Type", "Priority", "Status", "Owner", "Due"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: comp.table.headerText,
                  padding: "8px 14px",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.tableRows.slice(0, 5).map((row, i) => (
            <tr
              key={row.id}
              style={{
                backgroundColor: i % 2 === 1 ? comp.table.stripedBg : "transparent",
                borderTop: `1px solid ${comp.table.rowBorder}`,
              }}
            >
              <td style={{ padding: "8px 14px", color: palette.textPrimary, fontWeight: 500 }}>{row.title}</td>
              <td style={{ padding: "8px 14px", color: palette.textSecondary }}>{row.type}</td>
              <td style={{ padding: "8px 14px", color: palette.textSecondary }}>{row.priority}</td>
              <td style={{ padding: "8px 14px" }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: comp.badge.borderRadius,
                    backgroundColor: statusColor(row.status) + "18",
                    color: statusColor(row.status),
                  }}
                >
                  {row.status}
                </span>
              </td>
              <td style={{ padding: "8px 14px", color: palette.textSecondary }}>{row.owner}</td>
              <td style={{ padding: "8px 14px", color: palette.textSecondary, fontFamily: "monospace", fontSize: 11 }}>{row.due}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        style={{
          padding: "10px 20px",
          borderTop: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0 }}>
          Showing 1–5 of {content.tableRows.length}
        </p>
        <div style={{ display: "flex", gap: 4 }}>
          {["‹", "1", "2", "3", "›"].map((pg, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: system.spacing.radius.sm,
                border: `1px solid ${pg === "1" ? palette.primary : palette.border}`,
                backgroundColor: pg === "1" ? palette.primary : "transparent",
                color: pg === "1" ? "#FFF" : palette.textSecondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: pg === "1" ? 600 : 400,
              }}
            >
              {pg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateDetailPage({
  palette,
  system,
  comp,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  comp: DesignSystem["components"];
  content: IndustryContent;
}) {
  const item = content.recentItems[0];
  const tabs = ["Overview", "History", "Comments", "Files"];
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
      }}
    >
      {/* Detail header */}
      <div
        style={{
          padding: "16px 24px",
          backgroundColor: palette.surface,
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              fontWeight: 500,
              backgroundColor: palette.primary + "15",
              color: palette.primary,
              padding: "2px 8px",
              borderRadius: comp.badge.borderRadius,
            }}
          >
            {item?.id || "ITM-001"}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: palette.success + "18",
              color: palette.success,
              padding: "2px 8px",
              borderRadius: comp.badge.borderRadius,
            }}
          >
            {item?.status || "Active"}
          </span>
        </div>
        <h3
          style={{
            fontSize: system.typography.scale.h3,
            fontWeight: system.typography.fontWeight.bold,
            color: palette.textPrimary,
            fontFamily: system.typography.headingFont,
            margin: 0,
            marginBottom: 4,
          }}
        >
          {item?.title || "Item Detail Title"}
        </h3>
        <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>
          Assigned to {item?.author || "User"} · Updated today
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${palette.border}`,
          backgroundColor: palette.surface,
        }}
      >
        {tabs.map((tab, i) => (
          <div
            key={tab}
            style={{
              padding: "10px 20px",
              fontSize: 12,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? palette.primary : palette.textSecondary,
              borderBottom: i === 0 ? `2px solid ${palette.primary}` : "2px solid transparent",
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content + sidebar metadata */}
      <div style={{ display: "flex", minHeight: 200 }}>
        <div style={{ flex: 1, padding: 24, backgroundColor: palette.background }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {content.progressItems.slice(0, 3).map((p) => (
              <div key={p.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: palette.textPrimary }}>{p.label}</span>
                  <span style={{ fontSize: 11, color: palette.textSecondary }}>{p.value}%</span>
                </div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: palette.border,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${p.value}%`,
                      height: "100%",
                      backgroundColor: p.value >= 80 ? palette.success : p.value >= 50 ? palette.primary : palette.warning,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar metadata */}
        <div
          style={{
            width: 200,
            backgroundColor: palette.surfaceMuted,
            borderLeft: `1px solid ${palette.border}`,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[
            { label: "Status", value: item?.status || "Active" },
            { label: "Author", value: item?.author || "User" },
            { label: "Priority", value: "High" },
            { label: "Created", value: "Apr 10, 2026" },
          ].map((meta) => (
            <div key={meta.label}>
              <p style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0, marginBottom: 4 }}>
                {meta.label}
              </p>
              <p style={{ fontSize: 12, color: palette.textPrimary, margin: 0 }}>{meta.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateSettingsPage({
  palette,
  system,
  comp,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  comp: DesignSystem["components"];
}) {
  const navItems = ["General", "Appearance", "Notifications", "Security", "Integrations"];
  const toggleGroups = [
    { label: "Email Notifications", desc: "Receive email updates for new activity", on: true },
    { label: "Push Notifications", desc: "Browser push notifications for mentions", on: false },
    { label: "Weekly Digest", desc: "Summary of activity sent every Monday", on: true },
    { label: "Dark Mode", desc: "Use dark theme across the application", on: false },
  ];
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
      }}
    >
      {/* Settings header */}
      <div
        style={{
          padding: "14px 24px",
          backgroundColor: palette.surface,
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>
          Settings
        </p>
      </div>

      <div style={{ display: "flex", minHeight: 340 }}>
        {/* Left nav */}
        <div
          style={{
            width: 180,
            backgroundColor: palette.surface,
            borderRight: `1px solid ${palette.border}`,
            padding: "12px 8px",
            flexShrink: 0,
          }}
        >
          {navItems.map((item, i) => (
            <div
              key={item}
              style={{
                padding: "8px 12px",
                borderRadius: system.spacing.radius.md,
                backgroundColor: i === 2 ? palette.primary : "transparent",
                color: i === 2 ? "#FFF" : palette.textSecondary,
                fontSize: 12,
                fontWeight: i === 2 ? 600 : 400,
                marginBottom: 2,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right content with toggles */}
        <div style={{ flex: 1, backgroundColor: palette.background, padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary, margin: 0, marginBottom: 4, fontFamily: system.typography.headingFont }}>
            Notifications
          </p>
          <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0, marginBottom: 20 }}>
            Manage how you receive notifications
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {toggleGroups.map((tg, i) => (
              <div
                key={tg.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderTop: i > 0 ? `1px solid ${palette.border}` : undefined,
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, margin: 0 }}>{tg.label}</p>
                  <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0, marginTop: 2 }}>{tg.desc}</p>
                </div>
                <div
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: tg.on ? palette.primary : palette.border,
                    position: "relative",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "#FFF",
                      position: "absolute",
                      top: 3,
                      left: tg.on ? 21 : 3,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: comp.button.borderRadius,
                border: "none",
                backgroundColor: palette.primary,
                color: "#FFF",
                fontSize: 12,
                fontWeight: 600,
                cursor: "default",
              }}
            >
              Save Changes
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: comp.button.borderRadius,
                border: `1px solid ${palette.border}`,
                backgroundColor: "transparent",
                color: palette.textSecondary,
                fontSize: 12,
                fontWeight: 500,
                cursor: "default",
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateRequestFlow({
  palette,
  system,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  content: IndustryContent;
}) {
  const fields = content.formFields;
  const steps = ["Submit Request", "Review", "Approval", "Complete"];
  const activeStep = 1;
  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
        backgroundColor: palette.surface,
      }}
    >
      {/* Stepper */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          gap: 0,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              flex: i < steps.length - 1 ? 1 : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor:
                    i < activeStep
                      ? palette.success
                      : i === activeStep
                        ? palette.primary
                        : palette.border,
                  color: i <= activeStep ? "#FFF" : palette.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {i < activeStep ? "✓" : i + 1}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: i === activeStep ? 700 : 500,
                  color: i === activeStep ? palette.primary : i < activeStep ? palette.success : palette.textSecondary,
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: i < activeStep ? palette.success : palette.border,
                  margin: "0 12px",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", minHeight: 300 }}>
        {/* Form area */}
        <div style={{ flex: 1, backgroundColor: palette.surface, padding: 24 }}>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: palette.textPrimary,
              margin: 0,
              marginBottom: 4,
              fontFamily: system.typography.headingFont,
            }}
          >
            Review Details
          </p>
          <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0, marginBottom: 20, fontFamily: system.typography.bodyFont }}>
            Verify the information below before submitting for approval.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6, fontFamily: system.typography.bodyFont }}>
                {fields.projectTitle || "Title"}
              </label>
              <div
                style={{
                  height: 38,
                  borderRadius: system.spacing.radius.md,
                  border: `1px solid ${palette.border}`,
                  backgroundColor: palette.background,
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>{fields.placeholder}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6, fontFamily: system.typography.bodyFont }}>
                  {fields.ownerLabel}
                </label>
                <div
                  style={{
                    height: 38,
                    borderRadius: system.spacing.radius.md,
                    border: `1px solid ${palette.border}`,
                    backgroundColor: palette.background,
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>{fields.ownerPlaceholder}</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, display: "block", marginBottom: 6, fontFamily: system.typography.bodyFont }}>
                  Category
                </label>
                <div
                  style={{
                    height: 38,
                    borderRadius: system.spacing.radius.md,
                    border: `1px solid ${palette.border}`,
                    backgroundColor: palette.background,
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>{fields.categories[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: system.spacing.radius.md,
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.surface,
                color: palette.textSecondary,
                fontSize: 12,
                fontWeight: 500,
                cursor: "default",
                fontFamily: system.typography.bodyFont,
              }}
            >
              Save Draft
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: system.spacing.radius.md,
                border: "none",
                backgroundColor: palette.primary,
                color: "#FFF",
                fontSize: 12,
                fontWeight: 600,
                cursor: "default",
                fontFamily: system.typography.bodyFont,
              }}
            >
              Submit for Review
            </button>
          </div>
        </div>

        {/* Sidebar: Request Summary / Timeline */}
        <div
          style={{
            width: 220,
            backgroundColor: palette.surfaceMuted,
            borderLeft: `1px solid ${palette.border}`,
            padding: 20,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: palette.textPrimary,
                margin: 0,
                marginBottom: 12,
                fontFamily: system.typography.headingFont,
              }}
            >
              Request Summary
            </p>
            {[
              { label: "Submitted", value: "Apr 14, 2026" },
              { label: "Reviewer", value: content.recentItems[0]?.author || "Admin" },
              { label: "Request ID", value: content.recentItems[0]?.id || "REQ-001" },
            ].map((meta) => (
              <div key={meta.label} style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0, marginBottom: 2, fontFamily: system.typography.bodyFont }}>
                  {meta.label}
                </p>
                <p style={{ fontSize: 12, color: palette.textPrimary, margin: 0, fontFamily: system.typography.bodyFont }}>{meta.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: palette.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: 0,
                marginBottom: 8,
                fontFamily: system.typography.bodyFont,
              }}
            >
              Status
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  display: "inline-block",
                  width: "fit-content",
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 10px",
                  borderRadius: system.spacing.radius.full,
                  backgroundColor: palette.success + "18",
                  color: palette.success,
                }}
              >
                Submitted
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "fit-content",
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 10px",
                  borderRadius: system.spacing.radius.full,
                  backgroundColor: palette.primary + "18",
                  color: palette.primary,
                }}
              >
                In Review
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "fit-content",
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 10px",
                  borderRadius: system.spacing.radius.full,
                  backgroundColor: palette.border + "60",
                  color: palette.textSecondary,
                }}
              >
                Pending Approval
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateMobilePreview({
  palette,
  system,
  content,
}: {
  palette: DesignSystem["palette"];
  system: DesignSystem;
  content: IndustryContent;
}) {
  const kpis = content.kpis.slice(0, 2);
  const listItems = content.recentItems.slice(0, 3);
  const phoneWidth = 250;
  const phoneHeight = Math.round(phoneWidth * (667 / 375));
  const notchWidth = 80;

  const bottomTabs = [
    { label: "Home", active: true, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )},
    { label: "Search", active: false, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    )},
    { label: "Alerts", active: false, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    )},
    { label: "Profile", active: false, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )},
  ];

  return (
    <div
      style={{
        borderRadius: system.spacing.radius.lg,
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
        backgroundColor: palette.surfaceMuted,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}
      >
        {/* Phone frame */}
        <div
          style={{
            width: phoneWidth,
            height: phoneHeight,
            borderRadius: 28,
            border: `3px solid ${palette.border}`,
            backgroundColor: palette.background,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            boxShadow: `0 8px 32px rgba(0,0,0,0.12)`,
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: notchWidth,
              height: 20,
              backgroundColor: palette.border,
              borderRadius: "0 0 12px 12px",
              zIndex: 10,
            }}
          />

          {/* Mobile header */}
          <div
            style={{
              height: 48,
              backgroundColor: palette.surface,
              borderBottom: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              paddingTop: 8,
              gap: 10,
              flexShrink: 0,
            }}
          >
            {/* Hamburger */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
              <div style={{ width: 16, height: 2, backgroundColor: palette.textPrimary, borderRadius: 1 }} />
              <div style={{ width: 12, height: 2, backgroundColor: palette.textPrimary, borderRadius: 1 }} />
              <div style={{ width: 16, height: 2, backgroundColor: palette.textPrimary, borderRadius: 1 }} />
            </div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: palette.textPrimary,
                margin: 0,
                fontFamily: system.typography.headingFont,
              }}
            >
              {content.orgName}
            </p>
          </div>

          {/* Mobile content */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              backgroundColor: palette.background,
            }}
          >
            {/* KPI cards stacked */}
            {kpis.map((kpi, i) => (
              <div
                key={kpi.label}
                style={{
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  padding: "10px 12px",
                  borderLeft: `3px solid ${i === 0 ? palette.primary : palette.success}`,
                }}
              >
                <p style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>
                  {kpi.value}
                </p>
                <p style={{ fontSize: 9, color: palette.textSecondary, margin: 0, marginTop: 2, fontFamily: system.typography.bodyFont }}>
                  {kpi.label}
                </p>
              </div>
            ))}

            {/* Mini list */}
            <div
              style={{
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.md,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "8px 12px", borderBottom: `1px solid ${palette.border}` }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>Recent</p>
              </div>
              {listItems.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    padding: "8px 12px",
                    borderTop: i > 0 ? `1px solid ${palette.border}` : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 500, color: palette.textPrimary, margin: 0, fontFamily: system.typography.bodyFont }}>{item.title}</p>
                    <p style={{ fontSize: 8, color: palette.textSecondary, margin: 0, marginTop: 1, fontFamily: system.typography.bodyFont }}>{item.author}</p>
                  </div>
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 500,
                      padding: "1px 6px",
                      borderRadius: system.spacing.radius.full,
                      backgroundColor: (item.status === "Active" ? palette.success : palette.warning) + "18",
                      color: item.status === "Active" ? palette.success : palette.warning,
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom tab bar */}
          <div
            style={{
              height: 48,
              backgroundColor: palette.surface,
              borderTop: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexShrink: 0,
              padding: "0 8px",
            }}
          >
            {bottomTabs.map((tab) => (
              <div
                key={tab.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  color: tab.active ? palette.primary : palette.textSecondary,
                  opacity: tab.active ? 1 : 0.6,
                }}
              >
                {tab.icon}
                <span style={{ fontSize: 8, fontWeight: tab.active ? 600 : 400, fontFamily: system.typography.bodyFont }}>{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────── */

export function AppShellTab({ system, content }: AppShellTabProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: palette.primary,
    marginBottom: 12,
  };

  const sectionDescStyle: React.CSSProperties = {
    fontSize: 15,
    color: palette.textSecondary,
    lineHeight: 1.6,
    marginBottom: 36,
  };

  const cardStyle: React.CSSProperties = {
    padding: 32,
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
  };

  const shellRules: {
    title: string;
    desc: string;
    render: () => React.ReactNode;
  }[] = [
    {
      title: "SIDEBAR STYLE",
      desc: "Width, background color, active states, and icon placement for the primary sidebar navigation.",
      render: () => <SidebarRule palette={palette} system={system} content={content} />,
    },
    {
      title: "HEADER STYLE",
      desc: "Header height, background, alignment, and search bar placement.",
      render: () => <HeaderRule palette={palette} system={system} content={content} />,
    },
    {
      title: "PAGE TITLE PATTERN",
      desc: "Typography scale for page headings and breadcrumb placement above the title.",
      render: () => <PageTitleRule palette={palette} system={system} content={content} />,
    },
    {
      title: "FILTER BAR PATTERN",
      desc: "Layout for search, filter dropdowns, and primary action buttons.",
      render: () => <FilterBarRule palette={palette} system={system} comp={comp} />,
    },
    {
      title: "DASHBOARD WIDGET PATTERN",
      desc: "KPI card grid layout with accent-colored borders and consistent spacing.",
      render: () => <DashboardWidgetRule palette={palette} system={system} content={content} />,
    },
    {
      title: "FORM LAYOUT RULES",
      desc: "Single-column and two-column form layouts with consistent field spacing.",
      render: () => <FormLayoutRule palette={palette} system={system} comp={comp} content={content} />,
    },
    {
      title: "MOBILE NAVIGATION BEHAVIOR",
      desc: "Collapsed sidebar for tablet and bottom navigation for mobile viewports.",
      render: () => <MobileNavRule palette={palette} system={system} content={content} />,
    },
    {
      title: "DESKTOP LAYOUT DEFAULTS",
      desc: "Default sidebar-to-content ratio and maximum content widths for desktop.",
      render: () => <DesktopLayoutRule palette={palette} system={system} />,
    },
  ];

  const templates: {
    title: string;
    desc: string;
    render: () => React.ReactNode;
  }[] = [
    {
      title: "DASHBOARD",
      desc: "KPI cards, data table, and sidebar navigation in a single view.",
      render: () => <TemplateDashboard palette={palette} system={system} content={content} />,
    },
    {
      title: "FORM PAGE",
      desc: "Two-column form with validation states, submit and cancel actions.",
      render: () => <TemplateFormPage palette={palette} system={system} comp={comp} content={content} />,
    },
    {
      title: "LIST PAGE",
      desc: "Filterable table with pagination, inline search, and action buttons.",
      render: () => <TemplateListPage palette={palette} system={system} comp={comp} content={content} />,
    },
    {
      title: "DETAIL PAGE",
      desc: "Header info with tabbed content area and sidebar metadata panel.",
      render: () => <TemplateDetailPage palette={palette} system={system} comp={comp} content={content} />,
    },
    {
      title: "SETTINGS PAGE",
      desc: "Left navigation with right content area containing toggle groups.",
      render: () => <TemplateSettingsPage palette={palette} system={system} comp={comp} />,
    },
    {
      title: "REQUEST FLOW",
      desc: "Multi-step request and approval workflow with stepper, form, and summary timeline.",
      render: () => <TemplateRequestFlow palette={palette} system={system} content={content} />,
    },
    {
      title: "MOBILE PREVIEW",
      desc: "Phone-frame preview showing the app's mobile viewport with compact dashboard and bottom tabs.",
      render: () => <TemplateMobilePreview palette={palette} system={system} content={content} />,
    },
  ];

  const shellRuleIds = ["shell-sidebar-style", "shell-header-style", "shell-page-title", "shell-filter-bar", "shell-dashboard", "shell-form-layout", "shell-mobile-nav", "shell-desktop"];
  const templateIds = ["tmpl-dashboard", "tmpl-form", "tmpl-list", "tmpl-detail", "tmpl-settings", "tmpl-request", "tmpl-mobile"];

  const shellNavItems = [
    { id: "shell-sidebar-style", label: "Sidebar Style" },
    { id: "shell-header-style", label: "Header Style" },
    { id: "shell-page-title", label: "Page Title Pattern" },
    { id: "shell-filter-bar", label: "Filter Bar Pattern" },
    { id: "shell-dashboard", label: "Dashboard Widget" },
    { id: "shell-form-layout", label: "Form Layout Rules" },
    { id: "shell-mobile-nav", label: "Mobile Navigation" },
    { id: "shell-desktop", label: "Desktop Defaults" },
  ];

  const tmplNavItems = [
    { id: "shell-templates", label: "Starter Templates" },
    { id: "tmpl-dashboard", label: "Dashboard" },
    { id: "tmpl-form", label: "Form Page" },
    { id: "tmpl-list", label: "List Page" },
    { id: "tmpl-detail", label: "Detail Page" },
    { id: "tmpl-settings", label: "Settings Page" },
    { id: "tmpl-request", label: "Request Flow" },
    { id: "tmpl-mobile", label: "Mobile Preview" },
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
          App Shell &amp; Templates
        </div>
        {shellNavItems.map(renderNavBtn)}
        <div style={{ padding: "16px 16px 8px", fontSize: 10, fontWeight: 700, color: palette.textSecondary, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Templates
        </div>
        {tmplNavItems.map(renderNavBtn)}
      </nav>
      <div style={{ flex: 1, minWidth: 0, padding: "0 0 0 24px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
      {/* ─── Section 8.5 — App Shell Rules ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p style={sectionHeadingStyle}>APP SHELL RULES</p>
        <p style={sectionDescStyle}>
          Structural patterns that define how the application shell is assembled — sidebar, header,
          page titles, filter bars, widgets, forms, and responsive behavior.
        </p>
      </motion.div>

      {shellRules.map((rule, i) => (
        <motion.section
          key={rule.title}
          id={shellRuleIds[i]}
          data-tab-section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 * i }}
          style={{ marginBottom: 72 }}
        >
          <div style={cardStyle}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: palette.primary,
                marginBottom: 4,
              }}
            >
              {rule.title}
            </p>
            <p
              style={{
                fontSize: 13,
                color: palette.textSecondary,
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              {rule.desc}
            </p>
            {rule.render()}
          </div>
        </motion.section>
      ))}

      {/* ─── Section 8.6 — Starter Templates ─── */}
      <motion.div
        id="shell-templates"
        data-tab-section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <p style={sectionHeadingStyle}>STARTER TEMPLATES</p>
        <p style={sectionDescStyle}>
          Ready-to-use screen previews built with the generated design system tokens.
          Each template demonstrates a common application page pattern.
        </p>
      </motion.div>

      {templates.map((tmpl, i) => (
        <motion.section
          key={tmpl.title}
          id={templateIds[i]}
          data-tab-section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 + 0.05 * i }}
          style={{ marginBottom: 72 }}
        >
          <div style={cardStyle}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: system.spacing.radius.full,
                backgroundColor: palette.primary + "15",
                color: palette.primary,
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: 8,
              }}
            >
              Template {i + 1}
            </div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: palette.textPrimary,
                marginBottom: 4,
                fontFamily: system.typography.headingFont,
              }}
            >
              {tmpl.title}
            </p>
            <p
              style={{
                fontSize: 13,
                color: palette.textSecondary,
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              {tmpl.desc}
            </p>
            {tmpl.render()}
          </div>
        </motion.section>
      ))}
    </div>
    </div>
    </div>
  );
}
