"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSToastContainer, createToast, useToastState } from "./toast";
import type { ToastPosition, ToastVariant } from "./toast";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface ToastSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function ToastSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ToastSectionProps) {
  const variantsDemo = useToastState();
  const positionDemo = useToastState();
  const stackDemo = useToastState();
  const [activePosition, setActivePosition] = useState<ToastPosition>("top-right");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const triggerBtn = (label: string, onClick: () => void): React.CSSProperties => ({
    padding: "7px 14px",
    fontSize: 12,
    fontWeight: 500,
    color: palette.textPrimary,
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.md,
    cursor: "pointer",
  });

  const previewContainer: React.CSSProperties = {
    position: "relative",
    backgroundColor: palette.surfaceMuted,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    height: 300,
    overflow: "hidden",
  };

  const variantConfigs: { variant: ToastVariant; title: string; desc: string }[] = [
    { variant: "success", title: content.alerts.success.title, desc: content.alerts.success.desc },
    { variant: "error", title: content.alerts.error.title, desc: content.alerts.error.desc },
    { variant: "warning", title: content.alerts.warning.title, desc: content.alerts.warning.desc },
    { variant: "info", title: content.alerts.info.title, desc: content.alerts.info.desc },
  ];

  return (
    <motion.section
      id="comp-toast"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Toasts</p>
      <p style={sectionDesc}>
        Toasts provide brief, non-blocking notifications that appear temporarily and
        auto-dismiss. They inform users about the result of an action without requiring
        interaction.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Background", value: "palette.surface" },
          { label: "Shadow", value: "system.spacing.elevation.md" },
          { label: "Border Radius", value: "system.spacing.radius.md" },
          { label: "Progress Bar Height", value: "3px" },
        ]}
      />

      {/* ──── Variants ──── */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {variantConfigs.map(({ variant, title, desc }) => (
          <button
            key={variant}
            onClick={() => variantsDemo.addToast(createToast(variant, title, desc))}
            style={triggerBtn(variant, () => {})}
          >
            Trigger {variant}
          </button>
        ))}
      </div>
      <div style={previewContainer}>
        <DSToastContainer
          system={system}
          palette={palette}
          toasts={variantsDemo.toasts}
          position="top-right"
          onDismiss={variantsDemo.dismissToast}
        />
        {variantsDemo.toasts.length === 0 && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>Click a button above to trigger a toast</span>
          </div>
        )}
      </div>

      {/* ──── Positions ──── */}
      <div style={subsectionLabel}>Positions</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {(["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] as ToastPosition[]).map((pos) => (
          <button
            key={pos}
            onClick={() => {
              setActivePosition(pos);
              positionDemo.addToast(createToast("info", `Toast at ${pos}`, "Position demo notification"));
            }}
            style={{
              ...triggerBtn(pos, () => {}),
              backgroundColor: activePosition === pos ? palette.primary + "15" : palette.surface,
              borderColor: activePosition === pos ? palette.primary + "40" : palette.border,
              fontSize: 11,
            }}
          >
            {pos}
          </button>
        ))}
      </div>
      <div style={previewContainer}>
        <DSToastContainer
          system={system}
          palette={palette}
          toasts={positionDemo.toasts}
          position={activePosition}
          onDismiss={positionDemo.dismissToast}
        />
        {positionDemo.toasts.length === 0 && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>Select a position and click to preview</span>
          </div>
        )}
      </div>

      {/* ──── Stacking ──── */}
      <div style={subsectionLabel}>Stacking</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => {
            const variants: ToastVariant[] = ["success", "info", "warning", "error"];
            const titles = ["Item saved", "New update", "Low storage", "Connection lost"];
            const idx = stackDemo.toasts.length % 4;
            stackDemo.addToast(createToast(variants[idx], titles[idx], "Notification description"));
          }}
          style={triggerBtn("Add toast", () => {})}
        >
          Add toast
        </button>
        <button
          onClick={() => {
            for (let i = 0; i < 3; i++) {
              setTimeout(() => {
                const variants: ToastVariant[] = ["success", "info", "warning"];
                const titles = ["First toast", "Second toast", "Third toast"];
                stackDemo.addToast(createToast(variants[i], titles[i], "Stacked notification"));
              }, i * 200);
            }
          }}
          style={triggerBtn("Add 3 toasts", () => {})}
        >
          Add 3 toasts
        </button>
      </div>
      <div style={previewContainer}>
        <DSToastContainer
          system={system}
          palette={palette}
          toasts={stackDemo.toasts}
          position="top-right"
          onDismiss={stackDemo.dismissToast}
        />
        {stackDemo.toasts.length === 0 && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>Add multiple toasts to see stacking</span>
          </div>
        )}
      </div>

      {/* ──── With Action ──── */}
      <div style={subsectionLabel}>With Action</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => {
            const t = createToast("info", "File uploaded", "report-final.pdf was uploaded successfully.");
            t.action = { label: "View file" };
            t.duration = 0;
            variantsDemo.addToast(t);
          }}
          style={triggerBtn("Toast with action", () => {})}
        >
          Toast with action
        </button>
      </div>

      {/* ──── Usage ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use toasts"
          description="Toasts are ideal for non-critical, transient messages:"
          items={[
            "Confirmation of a completed action (save, delete, send)",
            "Background process updates",
            "Non-blocking warnings and tips",
            "Network status changes",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Toasts vs Alerts"
          description="Choose the right feedback mechanism:"
          items={[
            "Toasts — Temporary, auto-dismiss, non-blocking",
            "Alerts — Persistent, inline, requires attention",
            "Toasts — Appear in a fixed screen position",
            "Alerts — Appear within the content flow",
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
            text: "Keep toast messages short and scannable. One line for the title, optionally one for the description.",
          },
          {
            type: "dont",
            text: "Don't use toasts for critical errors that require user action. Use alerts or modals instead.",
          },
          {
            type: "do",
            text: "Auto-dismiss informational toasts after 3-5 seconds. Allow persistent toasts for actions.",
          },
          {
            type: "dont",
            text: "Don't stack more than 3-4 toasts at once. Older toasts should be dismissed as new ones appear.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Elevated surface with left accent border", x: 5, y: 50 },
          { id: 2, label: "Icon", description: "Variant-colored status icon", x: 15, y: 15 },
          { id: 3, label: "Title", description: "Brief message headline", x: 40, y: 15 },
          { id: 4, label: "Description", description: "Optional supporting text", x: 50, y: 80 },
          { id: 5, label: "Action (optional)", description: "Inline action button", x: 70, y: 85 },
          { id: 6, label: "Close", description: "Dismiss button", x: 92, y: 15 },
        ]}
        renderPreview={(highlighted) => (
          <div
            style={{
              width: 300,
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.md,
              borderLeft: `3px solid ${palette.success}`,
              boxShadow: system.spacing.elevation.md,
              padding: "10px 12px",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.8,
              transition: "opacity 0.2s",
            }}
          >
            <div style={{
              width: 14, height: 14, borderRadius: "50%", backgroundColor: palette.success + "30",
              flexShrink: 0, marginTop: 2,
              opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
              transition: "opacity 0.2s",
            }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 12, fontWeight: 600, color: palette.textPrimary,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                Toast title
              </div>
              <div style={{
                fontSize: 11, color: palette.textSecondary, marginTop: 2,
                opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                Description text
              </div>
              <div style={{
                marginTop: 4, width: 52, height: 18, borderRadius: 4, backgroundColor: palette.success + "15",
                opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }} />
            </div>
            <div style={{
              width: 12, height: 12, borderRadius: 3, backgroundColor: palette.border + "60",
              opacity: highlighted === 6 ? 1 : highlighted === null ? 1 : 0.3,
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
          { label: "Toast Width", value: "360px" },
          { label: "Padding", value: "10px 12px" },
          { label: "Icon Size", value: "16px" },
          { label: "Close Button Size", value: "14px" },
        ]}
      />
    </motion.section>
  );
}
