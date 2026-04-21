"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface MobileToastSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type ToastType = "info" | "success" | "warning" | "error";

const toastVariants: { type: ToastType; icon: string; message: string; action?: string }[] = [
  { type: "info", icon: "ℹ️", message: "New update available", action: "Update" },
  { type: "success", icon: "✓", message: "Message sent successfully" },
  { type: "warning", icon: "⚠", message: "Connection is unstable", action: "Retry" },
  { type: "error", icon: "✕", message: "Failed to save changes", action: "Try Again" },
];

export function MobileToastSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: MobileToastSectionProps) {
  const comp = system.components;
  const [activeToasts, setActiveToasts] = useState<ToastType[]>([]);
  const [stackDemo, setStackDemo] = useState(false);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24, display: "flex", justifyContent: "center",
  };

  const phoneFrame: React.CSSProperties = {
    width: 300, height: 460, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const toastColor = (t: ToastType) =>
    t === "success" ? palette.success : t === "warning" ? palette.warning : t === "error" ? palette.danger : palette.info;

  const renderToast = (variant: typeof toastVariants[number], offset: number, onDismiss?: () => void) => (
    <div key={variant.type + offset} style={{ position: "absolute", bottom: 20 + offset * 60, left: 16, right: 16, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: system.spacing.elevation.lg, borderLeft: `3px solid ${toastColor(variant.type)}`, transition: "all 0.3s", zIndex: 10 - offset }}>
      <span style={{ fontSize: 16, width: 24, height: 24, borderRadius: "50%", backgroundColor: toastColor(variant.type) + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{variant.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{variant.message}</div>
        <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 1 }}>Swipe to dismiss</div>
      </div>
      {variant.action && <button style={{ fontSize: 12, fontWeight: 700, color: palette.primary, backgroundColor: "transparent", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>{variant.action}</button>}
      {onDismiss && <span onClick={onDismiss} style={{ fontSize: 14, color: palette.textSecondary, cursor: "pointer", padding: 4 }}>✕</span>}
    </div>
  );

  const addToast = (type: ToastType) => {
    setActiveToasts(prev => prev.includes(type) ? prev : [...prev, type]);
    setTimeout(() => setActiveToasts(prev => prev.filter(t => t !== type)), 3000);
  };

  return (
    <motion.section id="comp-mobile-toast" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Mobile Toast</p>
      <p style={sectionDesc}>
        Toasts provide brief, non-blocking feedback at the bottom of the screen. They auto-dismiss, support swipe-to-dismiss, optional action buttons, and can stack when multiple fire.
      </p>

      <div style={subsectionLabel}>Toast Types</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {toastVariants.map(v => (
          <div key={v.type} style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 14, borderLeft: `3px solid ${toastColor(v.type)}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>{v.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, textTransform: "capitalize" }}>{v.type}</span>
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary }}>{v.message}</div>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Interactive Demo</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {toastVariants.map(v => (
          <button key={v.type} onClick={() => addToast(v.type)} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${toastColor(v.type)}40`, backgroundColor: toastColor(v.type) + "10", color: toastColor(v.type), cursor: "pointer", textTransform: "capitalize" }}>Show {v.type}</button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: 20, paddingTop: 40, textAlign: "center", fontSize: 13, color: palette.textSecondary }}>Tap buttons above to trigger toasts</div>
          {activeToasts.map((type, i) => {
            const variant = toastVariants.find(v => v.type === type)!;
            return renderToast(variant, i, () => setActiveToasts(prev => prev.filter(t => t !== type)));
          })}
        </div>
      </div>

      <div style={subsectionLabel}>Stacked Toasts</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setStackDemo(!stackDemo)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.primary}`, backgroundColor: stackDemo ? palette.primary + "15" : palette.surface, color: palette.primary, cursor: "pointer" }}>{stackDemo ? "Hide Stack" : "Show Stack"}</button>
      </div>
      {stackDemo && (
        <div style={previewBox}>
          <div style={phoneFrame}>
            <div style={{ padding: 20, paddingTop: 40, textAlign: "center", fontSize: 13, color: palette.textSecondary }}>Multiple toasts stacked</div>
            {toastVariants.slice(0, 3).map((v, i) => renderToast(v, i))}
          </div>
        </div>
      )}

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use toasts" description="Brief, non-blocking feedback:" items={[
          "Confirming a background action (saved, sent, deleted)",
          "Network status changes (offline/online)",
          "Non-critical warnings that don't need immediate attention",
        ]} />
        <UsageSection palette={palette} title="Toast with actions" description="When to include an action:" items={[
          "Undo — destructive actions like delete or archive",
          "Retry — network failures or save errors",
          "View — navigate to the created/changed item",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Auto-dismiss info toasts after 3–5 seconds so they don't pile up." },
        { type: "dont", text: "Don't use toasts for critical errors that need user acknowledgment — use a dialog." },
        { type: "do", text: "Stack multiple toasts vertically with subtle offset to show queue depth." },
        { type: "dont", text: "Don't show more than 3 toasts at once — queue additional ones." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Toast container", description: "Floating card at screen bottom", x: 50, y: 80 },
        { id: 2, label: "Status icon", description: "Type indicator (info/success/error)", x: 10, y: 80 },
        { id: 3, label: "Message text", description: "Brief description of the event", x: 40, y: 80 },
        { id: 4, label: "Action button", description: "Optional CTA (Undo, Retry)", x: 85, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, height: 80, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}` }}>
          <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, backgroundColor: palette.surface, borderRadius: system.spacing.radius.sm, border: `1px solid ${palette.border}`, padding: "6px 8px", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `2px solid ${palette.success}`, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <span style={{ fontSize: 10, opacity: h === 2 ? 1 : h === null ? 1 : 0.4 }}>✓</span>
            <div style={{ flex: 1, opacity: h === 3 ? 1 : h === null ? 1 : 0.3 }}>
              <div style={{ height: 3, width: "75%", backgroundColor: palette.border, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 8, fontWeight: 700, color: palette.primary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3 }}>Undo</span>
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Toast Min Height", value: "48px" },
        { label: "Bottom Offset", value: "16–20px (+ safe area)" },
        { label: "Horizontal Margin", value: "16px" },
        { label: "Auto-dismiss", value: "3–5 seconds" },
        { label: "Stack Offset", value: "56–64px per toast" },
      ]} />
    </motion.section>
  );
}
