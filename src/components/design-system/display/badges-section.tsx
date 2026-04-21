"use client";

import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSBadge } from "./badge";
import type { BadgeVariant, BadgeSize } from "./badge";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";

interface BadgesSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const CheckCircleIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const InfoIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const XCircleIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export function BadgesSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: BadgesSectionProps) {
  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}
      <br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>
        → {value}
      </span>
    </div>
  );

  return (
    <motion.section
      id="comp-badges"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Badges</p>
      <p style={sectionDesc}>
        Badges communicate status, category, or count at a glance. Their color
        and shape instantly convey meaning, helping users scan and prioritise
        information without reading.
      </p>

      {/* ──── Hero Preview + Tokens ──── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
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
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <DSBadge system={system} palette={palette} variant="success" dot>Active</DSBadge>
          <DSBadge system={system} palette={palette} variant="warning" icon={<AlertIcon />}>Pending</DSBadge>
          <DSBadge system={system} palette={palette} variant="danger" icon={<XCircleIcon />}>Failed</DSBadge>
          <DSBadge system={system} palette={palette} variant="info" icon={<InfoIcon />}>New</DSBadge>
          <DSBadge system={system} palette={palette} variant="neutral">Draft</DSBadge>
        </div>

        <div
          style={{
            backgroundColor: palette.surfaceMuted,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.md,
            padding: 24,
            alignSelf: "start",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>
            Design Tokens
          </p>
          {tokenRow("Border Radius", system.spacing.radius.full)}
          {tokenRow("Font Weight", "600")}
          {tokenRow("Success", palette.success)}
          {tokenRow("Warning", palette.warning)}
          {tokenRow("Danger", palette.danger)}
          {tokenRow("Info", palette.info)}
        </div>
      </div>

      {/* ──── Status Variants ──── */}
      <div style={subsectionLabel}>Status Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        {(["success", "warning", "danger", "info", "neutral"] as BadgeVariant[]).map((v) => (
          <div
            key={v}
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 12,
              padding: 20,
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <DSBadge system={system} palette={palette} variant={v}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </DSBadge>
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary, textTransform: "capitalize" }}>
              {v} status
            </div>
          </div>
        ))}
      </div>

      {/* ──── With Dot Indicator ──── */}
      <div style={subsectionLabel}>With Dot Indicator</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
        }}
      >
        <DSBadge system={system} palette={palette} variant="success" dot>Online</DSBadge>
        <DSBadge system={system} palette={palette} variant="warning" dot>Away</DSBadge>
        <DSBadge system={system} palette={palette} variant="danger" dot>Offline</DSBadge>
        <DSBadge system={system} palette={palette} variant="info" dot>Busy</DSBadge>
        <DSBadge system={system} palette={palette} variant="neutral" dot>Unknown</DSBadge>
        <div style={{ width: 1, height: 24, backgroundColor: palette.border }} />
        <DSBadge system={system} palette={palette} variant="success" dot />
        <DSBadge system={system} palette={palette} variant="warning" dot />
        <DSBadge system={system} palette={palette} variant="danger" dot />
      </div>

      {/* ──── With Icons ──── */}
      <div style={subsectionLabel}>With Icons</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
        }}
      >
        <DSBadge system={system} palette={palette} variant="success" icon={<CheckCircleIcon />}>Approved</DSBadge>
        <DSBadge system={system} palette={palette} variant="warning" icon={<AlertIcon />}>Review</DSBadge>
        <DSBadge system={system} palette={palette} variant="danger" icon={<XCircleIcon />}>Rejected</DSBadge>
        <DSBadge system={system} palette={palette} variant="info" icon={<InfoIcon />}>Updated</DSBadge>
      </div>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {(["sm", "md", "lg"] as BadgeSize[]).map((sz) => (
          <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <DSBadge system={system} palette={palette} variant="success" size={sz} dot>Active</DSBadge>
            <div style={{ fontSize: 10, color: palette.textSecondary }}>{sz}</div>
          </div>
        ))}
        <div style={{ width: 1, height: 32, backgroundColor: palette.border }} />
        {(["sm", "md", "lg"] as BadgeSize[]).map((sz) => (
          <div key={`i-${sz}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <DSBadge system={system} palette={palette} variant="info" size={sz} icon={<InfoIcon size={sz === "sm" ? 10 : sz === "lg" ? 14 : 12} />}>Info</DSBadge>
            <div style={{ fontSize: 10, color: palette.textSecondary }}>{sz}</div>
          </div>
        ))}
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          padding: 0,
          overflow: "hidden",
        }}
      >
        {content.tableRows.slice(0, 4).map((row, i) => (
          <div
            key={row.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: i < 3 ? `1px solid ${palette.border}` : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>{row.title}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <DSBadge
                system={system}
                palette={palette}
                variant={row.priority === "High" ? "danger" : row.priority === "Medium" ? "warning" : "neutral"}
                size="sm"
              >
                {row.priority}
              </DSBadge>
              <DSBadge
                system={system}
                palette={palette}
                variant={row.status === "Active" || row.status === "Done" ? "success" : row.status === "In Progress" ? "info" : "neutral"}
                size="sm"
                dot
              >
                {row.status}
              </DSBadge>
            </div>
          </div>
        ))}
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use badges"
          description="Badges highlight status or metadata in a compact, scannable way:"
          items={[
            "Status indicators in tables and lists",
            "Notification counts on icons or tabs",
            "Category labels on cards and content",
            "User role or permission indicators",
            "Version or environment markers",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right variant"
          description="Map badge color to semantic meaning consistently:"
          items={[
            "Success — Completed, active, approved",
            "Warning — Pending, needs attention, expiring",
            "Danger — Failed, overdue, critical, rejected",
            "Info — New, updated, informational",
            "Neutral — Draft, archived, default state",
          ]}
        />
      </div>

      {/* ──── Do's and Don'ts ──── */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines
        palette={palette}
        items={[
          {
            type: "do",
            text: "Keep badge text short — 1-2 words maximum for quick scanning.",
            visual: (
              <div style={{ display: "flex", gap: 8 }}>
                <DSBadge system={system} palette={palette} variant="success" size="sm">Active</DSBadge>
                <DSBadge system={system} palette={palette} variant="warning" size="sm">Pending</DSBadge>
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't use badges for long descriptive text. Use labels or tooltips instead.",
            visual: (
              <DSBadge system={system} palette={palette} variant="info" size="sm">This item needs your review and approval</DSBadge>
            ),
          },
          {
            type: "do",
            text: "Use consistent color-meaning mapping across the entire application.",
            visual: (
              <div style={{ display: "flex", gap: 8 }}>
                <DSBadge system={system} palette={palette} variant="success" size="sm" dot>Live</DSBadge>
                <DSBadge system={system} palette={palette} variant="danger" size="sm" dot>Down</DSBadge>
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't use too many badges in a row. Limit to 2-3 per context to avoid visual noise.",
            visual: (
              <div style={{ display: "flex", gap: 4 }}>
                <DSBadge system={system} palette={palette} variant="success" size="sm">A</DSBadge>
                <DSBadge system={system} palette={palette} variant="warning" size="sm">B</DSBadge>
                <DSBadge system={system} palette={palette} variant="danger" size="sm">C</DSBadge>
                <DSBadge system={system} palette={palette} variant="info" size="sm">D</DSBadge>
                <DSBadge system={system} palette={palette} variant="neutral" size="sm">E</DSBadge>
              </div>
            ),
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Pill-shaped background with semantic color", x: 10, y: 50 },
          { id: 2, label: "Dot indicator", description: "Optional leading status dot", x: 30, y: 15 },
          { id: 3, label: "Icon (optional)", description: "Leading icon for additional context", x: 55, y: 90 },
          { id: 4, label: "Label text", description: "Short descriptive text content", x: 80, y: 15 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 28,
                padding: "0 14px",
                borderRadius: system.spacing.radius.full,
                backgroundColor: palette.success + "18",
                color: palette.success,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <span style={{ opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.success, display: "inline-block" }} />
              </span>
              <span style={{ opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s", display: "flex", alignItems: "center" }}>
                <CheckCircleIcon size={14} />
              </span>
              <span style={{ opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                Active
              </span>
            </span>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: system.spacing.radius.full, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />
    </motion.section>
  );
}
