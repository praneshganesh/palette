"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface AutosaveSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type SaveState = "idle" | "saving" | "saved" | "error" | "offline";

export function AutosaveSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: AutosaveSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"dot" | "text" | "cloud" | "timestamp" | "progress" | "toast">("dot");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [inputVal, setInputVal] = useState("Draft document content...");

  const radius = comp.input?.borderRadius || system.spacing.radius.md;
  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };
  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );
  const variantBtn = (v: typeof variant, label: string) => (
    <button onClick={() => setVariant(v)} style={{
      padding: "6px 14px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.sm,
      border: `1px solid ${variant === v ? palette.primary : palette.border}`,
      backgroundColor: variant === v ? palette.primary + "15" : palette.surface,
      color: variant === v ? palette.primary : palette.textSecondary, cursor: "pointer",
    }}>{label}</button>
  );

  const simulateSave = useCallback(() => {
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 1200);
    setTimeout(() => setSaveState("idle"), 3500);
  }, []);

  useEffect(() => {
    if (saveState === "idle" && inputVal !== "Draft document content...") {
      const t = setTimeout(simulateSave, 800);
      return () => clearTimeout(t);
    }
  }, [inputVal, saveState, simulateSave]);

  const stateColor = (s: SaveState) => {
    switch (s) {
      case "saving": return palette.warning;
      case "saved": return palette.success;
      case "error": return palette.danger;
      case "offline": return palette.textSecondary;
      default: return palette.border;
    }
  };

  const CloudIcon = ({ color, saving }: { color: string; saving?: boolean }) => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      style={saving ? { animation: "pulse 1s infinite" } : undefined}>
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
    </svg>
  );

  const CheckIcon = ({ color }: { color: string }) => (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const DotIndicator = ({ state }: { state: SaveState }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%", backgroundColor: stateColor(state),
        transition: "background-color 0.3s",
        ...(state === "saving" ? { animation: "pulse 1s infinite" } : {}),
      }} />
      <span style={{ fontSize: 11, color: palette.textSecondary, textTransform: "capitalize" }}>{state}</span>
    </div>
  );

  const TextIndicator = ({ state }: { state: SaveState }) => {
    const labels: Record<SaveState, string> = { idle: "Unsaved changes", saving: "Saving...", saved: "All changes saved", error: "Failed to save", offline: "Offline — will retry" };
    return (
      <span style={{ fontSize: 12, color: stateColor(state), fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
        {state === "saved" && <CheckIcon color={palette.success} />}
        {labels[state]}
      </span>
    );
  };

  const TimestampIndicator = ({ state }: { state: SaveState }) => (
    <span style={{ fontSize: 11, color: stateColor(state) }}>
      {state === "saving" ? "Saving..." : state === "saved" ? "Saved at 2:34 PM" : state === "error" ? "Save failed" : "Last saved 5 min ago"}
    </span>
  );

  const ProgressIndicator = ({ state }: { state: SaveState }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
      <div style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: palette.border + "40", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2, backgroundColor: stateColor(state),
          width: state === "saving" ? "60%" : state === "saved" ? "100%" : "0%",
          transition: "width 0.5s",
        }} />
      </div>
      <span style={{ fontSize: 10, color: stateColor(state), textTransform: "capitalize", whiteSpace: "nowrap" }}>{state}</span>
    </div>
  );

  const renderIndicator = (state: SaveState) => {
    switch (variant) {
      case "dot": return <DotIndicator state={state} />;
      case "text": return <TextIndicator state={state} />;
      case "cloud": return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <CloudIcon color={stateColor(state)} saving={state === "saving"} />
          <span style={{ fontSize: 11, color: stateColor(state), textTransform: "capitalize" }}>{state}</span>
        </div>
      );
      case "timestamp": return <TimestampIndicator state={state} />;
      case "progress": return <ProgressIndicator state={state} />;
      case "toast":
        return state !== "idle" ? (
          <div style={{
            padding: "8px 14px", borderRadius: system.spacing.radius.md,
            backgroundColor: stateColor(state) + "15", border: `1px solid ${stateColor(state)}30`,
            fontSize: 12, color: stateColor(state), display: "flex", alignItems: "center", gap: 6,
          }}>
            {state === "saved" && <CheckIcon color={palette.success} />}
            {state === "saving" ? "Saving your changes..." : state === "saved" ? "Changes saved!" : state === "error" ? "Failed to save. Retrying..." : "You're offline"}
          </div>
        ) : null;
      default: return <DotIndicator state={state} />;
    }
  };

  const stateBtn = (s: SaveState, label: string) => (
    <button onClick={() => setSaveState(s)} style={{
      padding: "5px 12px", fontSize: 11, fontWeight: 600, borderRadius: system.spacing.radius.sm,
      border: `1px solid ${saveState === s ? stateColor(s) : palette.border}`,
      backgroundColor: saveState === s ? stateColor(s) + "15" : palette.surface,
      color: saveState === s ? stateColor(s) : palette.textSecondary, cursor: "pointer",
    }}>{label}</button>
  );

  return (
    <motion.section id="comp-autosave" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Autosave Indicator</p>
      <p style={sectionDesc}>
        Autosave indicators communicate save status unobtrusively, giving users confidence their work is persisted without requiring manual action.
      </p>

      <style>{`@keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }`}</style>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 220 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>Document Editor</span>
            {renderIndicator(saveState)}
          </div>
          <textarea
            style={{
              width: "100%", height: 100, padding: 12, fontSize: 13,
              fontFamily: system.typography.bodyFont, color: palette.textPrimary,
              backgroundColor: palette.background, borderRadius: radius,
              border: `1px solid ${palette.border}`, outline: "none", resize: "none",
              boxSizing: "border-box" as const,
            }}
            value={inputVal} onChange={(e) => setInputVal(e.target.value)}
          />
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {stateBtn("idle", "Idle")}
            {stateBtn("saving", "Saving")}
            {stateBtn("saved", "Saved")}
            {stateBtn("error", "Error")}
            {stateBtn("offline", "Offline")}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Idle", "palette.border")}
          {tokenRow("Saving", "palette.warning")}
          {tokenRow("Saved", "palette.success")}
          {tokenRow("Error", "palette.danger")}
          {tokenRow("Offline", "palette.textSecondary")}
          {tokenRow("Pulse Animation", "1s infinite")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("dot", "Dot Indicator")}
        {variantBtn("text", "Text Status")}
        {variantBtn("cloud", "Cloud Icon")}
        {variantBtn("timestamp", "With Timestamp")}
        {variantBtn("progress", "Progress Bar")}
        {variantBtn("toast", "Toast Notification")}
      </div>
      <div style={{ ...showcaseBox, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {(["idle", "saving", "saved", "error", "offline"] as SaveState[]).map((s) => (
          <div key={s} style={{ padding: 12, backgroundColor: palette.surfaceMuted, borderRadius: system.spacing.radius.sm, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: palette.textSecondary, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{s}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>{renderIndicator(s)}</div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Place indicator near the document title or toolbar", "Use subtle animations for 'saving' state", "Show timestamp for last successful save", "Auto-dismiss 'saved' state after 2-3s"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't use intrusive modals for save status", "Don't hide errors silently", "Don't animate continuously after save completes"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Debounce: Wait 500-1000ms after the last keystroke before triggering save. Prevents excessive API calls." },
        { type: "dont", text: "Error Recovery: Show error state with retry option. Auto-retry with exponential backoff in the background." },
        { type: "do", text: "Offline: Queue changes locally. Show offline indicator. Sync when connection resumes." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Status Icon", description: "Dot, cloud, or check icon", x: 15, y: 20 },
        { id: 2, label: "Status Text", description: "Human-readable state label", x: 45, y: 20 },
        { id: 3, label: "Timestamp", description: "Last save time", x: 75, y: 20 },
        { id: 4, label: "Progress Bar", description: "Save progress indicator", x: 50, y: 50 },
      ]} renderPreview={(hl) => (
        <div style={{ width: 180, display: "flex", flexDirection: "column", gap: 8, padding: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.success, opacity: hl && hl !== 1 ? 0.3 : 1 }} />
            <span style={{ fontSize: 11, color: palette.success, opacity: hl && hl !== 2 ? 0.3 : 1 }}>Saved</span>
            <span style={{ fontSize: 9, color: palette.textSecondary, marginLeft: "auto", opacity: hl && hl !== 3 ? 0.3 : 1 }}>2:34 PM</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, backgroundColor: palette.success, opacity: hl && hl !== 4 ? 0.2 : 1 }} />
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Dot Size", value: "8px" },
        { label: "Icon Size", value: "12–16px" },
        { label: "Status Font Size", value: "11–12px" },
        { label: "Progress Bar Height", value: "3px" },
        { label: "Toast Padding", value: "8px 14px" },
        { label: "Debounce Delay", value: "800ms" },
        { label: "Saved Dismiss", value: "3500ms" },
      ]} />
    </motion.section>
  );
}
