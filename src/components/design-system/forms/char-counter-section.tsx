"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface CharCounterSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type CounterState = "normal" | "warning" | "limit" | "exceeded";

function getCounterState(len: number, max: number, warn: number): CounterState {
  if (len > max) return "exceeded";
  if (len === max) return "limit";
  if (len >= warn) return "warning";
  return "normal";
}

export function CharCounterSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: CharCounterSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"simple" | "countdown" | "progress" | "colored" | "threshold" | "textarea">("simple");
  const [inputVal, setInputVal] = useState("Hello world");
  const [textareaVal, setTextareaVal] = useState("This is a longer text that shows how character counters work with textarea elements in forms.");

  const MAX = 50;
  const WARN = 40;
  const TA_MAX = 200;
  const TA_WARN = 160;

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

  const stateColor = (s: CounterState) => {
    switch (s) {
      case "warning": return palette.warning;
      case "limit": return palette.warning;
      case "exceeded": return palette.danger;
      default: return palette.textSecondary;
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", fontSize: 14,
    fontFamily: system.typography.bodyFont, color: palette.textPrimary,
    backgroundColor: palette.background, borderRadius: radius,
    border: `1px solid ${palette.border}`, outline: "none",
    boxSizing: "border-box" as const,
  };

  const renderVariant = () => {
    const len = inputVal.length;
    const state = getCounterState(len, MAX, WARN);
    const color = stateColor(state);

    switch (variant) {
      case "countdown":
        return (
          <div style={{ maxWidth: 360 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>Message</label>
            <input style={{ ...inputStyle, borderColor: state === "exceeded" ? palette.danger : palette.border }}
              value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <div style={{ textAlign: "right", marginTop: 6, fontSize: 12, fontWeight: 600, color }}>
              {MAX - len} remaining
            </div>
          </div>
        );
      case "progress": {
        const pct = Math.min((len / MAX) * 100, 100);
        return (
          <div style={{ maxWidth: 360 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>Title</label>
            <input style={{ ...inputStyle, borderColor: state === "exceeded" ? palette.danger : palette.border }}
              value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: palette.border + "40", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, backgroundColor: color, transition: "width 0.15s, background-color 0.15s" }} />
              </div>
              <span style={{ fontSize: 11, color, fontWeight: 600, minWidth: 48, textAlign: "right" }}>{len}/{MAX}</span>
            </div>
          </div>
        );
      }
      case "colored":
        return (
          <div style={{ maxWidth: 360 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>Username</label>
            <input style={{
              ...inputStyle,
              borderColor: state === "exceeded" ? palette.danger : state === "warning" ? palette.warning : palette.border,
            }} value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 11, color }}>
                {state === "exceeded" ? "Over limit!" : state === "warning" ? "Approaching limit" : state === "limit" ? "At limit" : ""}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color }}>{len}/{MAX}</span>
            </div>
          </div>
        );
      case "threshold":
        return (
          <div style={{ maxWidth: 360 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>Bio</label>
            <input style={{ ...inputStyle, borderColor: state === "exceeded" ? palette.danger : palette.border }}
              value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              {len >= WARN && (
                <span style={{ fontSize: 11, color: palette.warning, display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  {MAX - len <= 0 ? "Over limit" : `${MAX - len} chars left`}
                </span>
              )}
              <span style={{ fontSize: 12, fontWeight: 600, color, marginLeft: "auto" }}>{len}/{MAX}</span>
            </div>
          </div>
        );
      case "textarea": {
        const taLen = textareaVal.length;
        const taState = getCounterState(taLen, TA_MAX, TA_WARN);
        const taColor = stateColor(taState);
        const taPct = Math.min((taLen / TA_MAX) * 100, 100);
        return (
          <div style={{ maxWidth: 400 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>Description</label>
            <textarea style={{
              ...inputStyle, height: 100, resize: "none",
              borderColor: taState === "exceeded" ? palette.danger : palette.border,
            }} value={textareaVal} onChange={(e) => setTextareaVal(e.target.value)} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: palette.border + "40", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${taPct}%`, borderRadius: 2, backgroundColor: taColor, transition: "width 0.15s" }} />
              </div>
              <span style={{ fontSize: 11, color: taColor, fontWeight: 600, minWidth: 60, textAlign: "right" }}>{taLen}/{TA_MAX}</span>
            </div>
          </div>
        );
      }
      default:
        return (
          <div style={{ maxWidth: 360 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>Display Name</label>
            <input style={inputStyle} value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <div style={{ textAlign: "right", marginTop: 6, fontSize: 12, color }}>{len}/{MAX}</div>
          </div>
        );
    }
  };

  const renderStates = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 12, marginBottom: 8 }}>
      {([
        { state: "normal" as CounterState, label: "Within Limit", count: "11/50" },
        { state: "warning" as CounterState, label: "Approaching", count: "42/50" },
        { state: "limit" as CounterState, label: "At Limit", count: "50/50" },
        { state: "exceeded" as CounterState, label: "Exceeded", count: "57/50" },
      ]).map((s) => (
        <div key={s.state} style={{ ...showcaseBox, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6 }}>{s.label}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: stateColor(s.state) }}>{s.count}</div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.section id="comp-char-counter" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Character Counter</p>
      <p style={sectionDesc}>
        Character counters display remaining or used characters against a limit, helping users stay within constraints for text fields.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 180 }}>
          {renderVariant()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Counter Font", "12px / 600")}
          {tokenRow("Normal", "palette.textSecondary")}
          {tokenRow("Warning", "palette.warning")}
          {tokenRow("Exceeded", "palette.danger")}
          {tokenRow("Bar Height", "4px")}
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      {renderStates()}

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("simple", "Simple Count")}
        {variantBtn("countdown", "Countdown")}
        {variantBtn("progress", "Progress Bar")}
        {variantBtn("colored", "Color-coded")}
        {variantBtn("threshold", "Warning Threshold")}
        {variantBtn("textarea", "For Textarea")}
      </div>
      <div style={showcaseBox}>{renderVariant()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use for fields with explicit character limits", "Show warning color as limit approaches (80%+)", "Position counter near the field (bottom-right preferred)", "Use countdown for short-form fields (tweets, titles)"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't use for fields without limits", "Don't block typing when limit is reached (allow overflow indication)", "Don't rely on color alone for state changes"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Threshold: Show warning at 80% capacity. Change to error color when exceeded. Consider soft vs hard limits." },
        { type: "dont", text: "Format: '42/50' for count-up, '8 remaining' for countdown. Use progress bars for visual emphasis." },
        { type: "do", text: "Accessibility: Announce character count changes to screen readers using aria-live regions at key thresholds." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Input Field", description: "Text entry element", x: 50, y: 35 },
        { id: 2, label: "Counter Text", description: "Current/max display", x: 80, y: 60 },
        { id: 3, label: "Progress Bar", description: "Visual fill indicator", x: 50, y: 70 },
        { id: 4, label: "Warning Icon", description: "Shown near threshold", x: 15, y: 60 },
      ]} renderPreview={(hl) => (
        <div style={{ width: 180 }}>
          <div style={{
            height: 28, borderRadius: 4, border: `1px solid ${palette.border}`, backgroundColor: palette.background,
            opacity: hl && hl !== 1 ? 0.3 : 1,
          }} />
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
            {hl === 4 && (
              <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={palette.warning} strokeWidth={2.5}>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            )}
            <div style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: palette.border + "30", overflow: "hidden", opacity: hl && hl !== 3 ? 0.3 : 1 }}>
              <div style={{ height: "100%", width: "80%", backgroundColor: palette.warning, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 9, fontWeight: 600, color: palette.warning, opacity: hl && hl !== 2 ? 0.3 : 1 }}>42/50</span>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Counter Font Size", value: "11–12px" },
        { label: "Counter Font Weight", value: "600" },
        { label: "Progress Bar Height", value: "4px" },
        { label: "Margin Top", value: "6–8px" },
        { label: "Warning Threshold", value: "80% of max" },
        { label: "Textarea Min Height", value: "100px" },
      ]} />
    </motion.section>
  );
}
