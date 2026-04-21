"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSAlert } from "./alert";
import type { AlertVariant, AlertStyle } from "./alert";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface AlertsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function AlertsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: AlertsSectionProps) {
  const [resetKey, setResetKey] = useState(0);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const variantLabels: { variant: AlertVariant; title: string; desc: string }[] = [
    { variant: "info", title: content.alerts.info.title, desc: content.alerts.info.desc },
    { variant: "success", title: content.alerts.success.title, desc: content.alerts.success.desc },
    { variant: "warning", title: content.alerts.warning.title, desc: content.alerts.warning.desc },
    { variant: "error", title: content.alerts.error.title, desc: content.alerts.error.desc },
  ];

  return (
    <motion.section
      id="comp-alerts"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Alerts</p>
      <p style={sectionDesc}>
        Alerts communicate important messages to the user without interrupting their workflow.
        They provide contextual feedback about system state, actions, or potential issues
        at varying levels of severity.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Info Color", value: "palette.info" },
          { label: "Success Color", value: "palette.success" },
          { label: "Warning Color", value: "palette.warning" },
          { label: "Error Color", value: "palette.danger" },
          { label: "Background", value: "variant color @ 10% opacity" },
          { label: "Border", value: "variant color @ 30% opacity" },
          { label: "Icon Color", value: "variant color (100%)" },
        ]}
      />

      {/* ──── Outlined Variants ──── */}
      <div style={subsectionLabel}>Outlined Variants</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {variantLabels.map(({ variant, title, desc }) => (
          <DSAlert
            key={`outlined-${variant}-${resetKey}`}
            system={system}
            palette={palette}
            variant={variant}
            alertStyle="outlined"
            title={title}
            description={desc}
          />
        ))}
      </div>

      {/* ──── Filled Variants ──── */}
      <div style={subsectionLabel}>Filled Variants</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {variantLabels.map(({ variant, title, desc }) => (
          <DSAlert
            key={`filled-${variant}-${resetKey}`}
            system={system}
            palette={palette}
            variant={variant}
            alertStyle="filled"
            title={title}
            description={desc}
          />
        ))}
      </div>

      {/* ──── With Actions ──── */}
      <div style={subsectionLabel}>With Actions</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <DSAlert
          key={`action-info-${resetKey}`}
          system={system}
          palette={palette}
          variant="info"
          title="New version available"
          description="A new software update is ready to install."
          action={{ label: "Update now" }}
        />
        <DSAlert
          key={`action-warning-${resetKey}`}
          system={system}
          palette={palette}
          variant="warning"
          title="Storage almost full"
          description="You've used 90% of your storage quota."
          action={{ label: "Manage storage" }}
        />
      </div>

      {/* ──── Closable ──── */}
      <div style={subsectionLabel}>Closable</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <button
          onClick={() => setResetKey((k) => k + 1)}
          style={{
            padding: "6px 14px",
            fontSize: 11,
            fontWeight: 500,
            color: palette.primary,
            backgroundColor: palette.primary + "12",
            border: `1px solid ${palette.primary}30`,
            borderRadius: system.spacing.radius.md,
            cursor: "pointer",
          }}
        >
          Reset alerts
        </button>
        <span style={{ fontSize: 11, color: palette.textSecondary }}>
          Dismiss alerts below then reset to restore them
        </span>
      </div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {(["info", "success", "warning", "error"] as AlertVariant[]).map((variant) => (
          <DSAlert
            key={`closable-${variant}-${resetKey}`}
            system={system}
            palette={palette}
            variant={variant}
            title={`Closable ${variant} alert`}
            description="Click the close button to dismiss this alert."
            closable
          />
        ))}
      </div>

      {/* ──── Without Icon ──── */}
      <div style={subsectionLabel}>Without Icon</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <DSAlert
          key={`noicon-${resetKey}`}
          system={system}
          palette={palette}
          variant="info"
          title="Tip"
          description="You can use keyboard shortcuts to navigate between items."
          icon={false}
        />
      </div>

      {/* ──── Title Only ──── */}
      <div style={subsectionLabel}>Title Only</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {(["info", "success", "warning", "error"] as AlertVariant[]).map((variant) => (
          <DSAlert
            key={`titleonly-${variant}-${resetKey}`}
            system={system}
            palette={palette}
            variant={variant}
            title={`${variant.charAt(0).toUpperCase() + variant.slice(1)}: Quick status message`}
          />
        ))}
      </div>

      {/* ──── Usage ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use alerts"
          description="Alerts are persistent, inline messages that convey status:"
          items={[
            "Form validation feedback",
            "System status changes and outages",
            "Success confirmations after actions",
            "Important warnings about data or permissions",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right variant"
          description="Match the variant to the severity of the message:"
          items={[
            "Info — Neutral information and tips",
            "Success — Completed actions, positive feedback",
            "Warning — Potential issues that need attention",
            "Error — Failures, blocking issues, missing data",
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
            text: "Use concise, actionable language. Tell the user what happened and what to do next.",
          },
          {
            type: "dont",
            text: "Don't show multiple alerts of the same type simultaneously. Consolidate messages when possible.",
          },
          {
            type: "do",
            text: "Place alerts close to the relevant content. Form errors near the form, page alerts at the top.",
          },
          {
            type: "dont",
            text: "Don't use error alerts for warnings or vice versa. Severity should match the actual impact.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Background with variant-colored border or fill", x: 5, y: 50 },
          { id: 2, label: "Icon", description: "Variant-specific icon for quick recognition", x: 15, y: 15 },
          { id: 3, label: "Title", description: "Bold headline summarizing the alert", x: 40, y: 15 },
          { id: 4, label: "Description", description: "Supporting text with additional context", x: 55, y: 85 },
          { id: 5, label: "Close (optional)", description: "Dismiss button for closable alerts", x: 90, y: 15 },
        ]}
        renderPreview={(highlighted) => (
          <div
            style={{
              width: 360,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "12px 16px",
              borderRadius: system.spacing.radius.md,
              backgroundColor: palette.info + "10",
              border: `1px solid ${palette.info}30`,
              opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.8,
              transition: "opacity 0.2s",
            }}
          >
            <div style={{
              width: 16, height: 16, borderRadius: "50%", backgroundColor: palette.info + "30",
              flexShrink: 0, marginTop: 1,
              opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
              transition: "opacity 0.2s",
            }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: palette.textPrimary,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                Alert title
              </div>
              <div style={{
                fontSize: 12, color: palette.textSecondary, marginTop: 2,
                opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                Description text goes here
              </div>
            </div>
            <div style={{
              width: 14, height: 14, borderRadius: 4, backgroundColor: palette.border + "60",
              opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3,
              transition: "opacity 0.2s",
            }} />
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Padding", value: "12px 16px" },
          { label: "Icon Size", value: "16px" },
          { label: "Border Radius", value: "system.spacing.radius.md" },
          { label: "Min Height", value: "48px" },
        ]}
      />
    </motion.section>
  );
}
