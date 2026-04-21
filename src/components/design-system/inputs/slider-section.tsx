"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface SliderSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

function SliderTrack({ value, onChange, min = 0, max = 100, disabled, color, showValue, marks }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number;
  disabled?: boolean; color: string; showValue?: boolean; marks?: number[];
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ opacity: disabled ? 0.4 : 1, width: "100%" }}>
      <div
        style={{ position: "relative", height: 20, cursor: disabled ? "not-allowed" : "pointer", userSelect: "none" }}
        onMouseDown={(e) => {
          if (disabled) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const update = (clientX: number) => {
            const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            onChange(Math.round(min + x * (max - min)));
          };
          update(e.clientX);
          const move = (ev: MouseEvent) => update(ev.clientX);
          const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
          window.addEventListener("mousemove", move);
          window.addEventListener("mouseup", up);
        }}
      >
        <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 4, borderRadius: 2, backgroundColor: color + "25" }} />
        <div style={{ position: "absolute", top: 8, left: 0, width: `${pct}%`, height: 4, borderRadius: 2, backgroundColor: color, transition: "width 0.05s" }} />
        <div style={{
          position: "absolute", top: 2, left: `${pct}%`, transform: "translateX(-50%)",
          width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff",
          border: `2px solid ${color}`, boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          transition: "left 0.05s",
        }} />
        {marks && marks.map((m) => {
          const mPct = ((m - min) / (max - min)) * 100;
          return (
            <div key={m} style={{ position: "absolute", top: 22, left: `${mPct}%`, transform: "translateX(-50%)", fontSize: 9, color: "#999" }}>
              {m}
            </div>
          );
        })}
      </div>
      {showValue && (
        <div style={{ textAlign: "right", fontSize: 12, fontWeight: 600, color, marginTop: marks ? 14 : 4 }}>{value}</div>
      )}
    </div>
  );
}

function RangeSlider({ low, high, onLow, onHigh, min = 0, max = 100, color }: {
  low: number; high: number; onLow: (v: number) => void; onHigh: (v: number) => void;
  min?: number; max?: number; color: string;
}) {
  const pctL = ((low - min) / (max - min)) * 100;
  const pctH = ((high - min) / (max - min)) * 100;
  return (
    <div>
      <div
        style={{ position: "relative", height: 20, cursor: "pointer", userSelect: "none" }}
        onMouseDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const val = min + x * (max - min);
          const isLow = Math.abs(val - low) < Math.abs(val - high);
          const setter = isLow ? onLow : onHigh;
          const update = (clientX: number) => {
            const xr = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            setter(Math.round(min + xr * (max - min)));
          };
          update(e.clientX);
          const move = (ev: MouseEvent) => update(ev.clientX);
          const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
          window.addEventListener("mousemove", move);
          window.addEventListener("mouseup", up);
        }}
      >
        <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 4, borderRadius: 2, backgroundColor: color + "25" }} />
        <div style={{ position: "absolute", top: 8, left: `${pctL}%`, width: `${pctH - pctL}%`, height: 4, borderRadius: 2, backgroundColor: color }} />
        {[pctL, pctH].map((p, i) => (
          <div key={i} style={{
            position: "absolute", top: 2, left: `${p}%`, transform: "translateX(-50%)",
            width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff",
            border: `2px solid ${color}`, boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color, marginTop: 4 }}>
        <span>{low}</span><span>{high}</span>
      </div>
    </div>
  );
}

export function SliderSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: SliderSectionProps) {
  const comp = system.components;
  const [heroVal, setHeroVal] = useState(65);
  const [rangeLow, setRangeLow] = useState(25);
  const [rangeHigh, setRangeHigh] = useState(75);
  const [stepVal, setStepVal] = useState(50);
  const [inputVal, setInputVal] = useState(40);
  const radius = comp.input.borderRadius || system.spacing.radius.md;

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

  return (
    <motion.section id="comp-slider" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Slider</p>
      <p style={sectionDesc}>
        Sliders allow users to select a value or range from a continuous or discrete set.
        They are ideal for settings like volume, brightness, price ranges, and filters.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }}>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: palette.textPrimary, fontWeight: 500 }}>Volume</span>
              <span style={{ fontSize: 13, color: palette.primary, fontWeight: 600 }}>{heroVal}%</span>
            </div>
            <SliderTrack value={heroVal} onChange={setHeroVal} color={palette.primary} />
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Track Height", "4px")}
          {tokenRow("Thumb Size", "16px")}
          {tokenRow("Active Color", "palette.primary")}
          {tokenRow("Track BG", `${palette.primary} @ 25%`)}
          {tokenRow("Thumb Border", "2px solid")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Single Value</div>
          <SliderTrack value={heroVal} onChange={setHeroVal} color={palette.primary} showValue />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Range (Two Thumbs)</div>
          <RangeSlider low={rangeLow} high={rangeHigh} onLow={setRangeLow} onHigh={setRangeHigh} color={palette.primary} />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Marks</div>
          <SliderTrack value={stepVal} onChange={setStepVal} color={palette.primary} marks={[0, 25, 50, 75, 100]} showValue />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Input Field</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <SliderTrack value={inputVal} onChange={setInputVal} color={palette.primary} />
            </div>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(Math.max(0, Math.min(100, Number(e.target.value))))}
              style={{
                width: 56, padding: "6px 8px", fontSize: 13, textAlign: "center",
                border: `1px solid ${palette.border}`, borderRadius: radius,
                color: palette.textPrimary, backgroundColor: palette.surface,
                fontFamily: "inherit", outline: "none",
              }}
            />
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Vertical</div>
          <div style={{ display: "flex", alignItems: "flex-end", height: 120, gap: 24, paddingLeft: 8 }}>
            {[80, 45, 60].map((v, i) => {
              const colors = [palette.primary, palette.success, palette.warning];
              return (
                <div key={i} style={{ position: "relative", width: 20, height: "100%" }}>
                  <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 4, borderRadius: 2, backgroundColor: colors[i] + "25" }} />
                  <div style={{ position: "absolute", left: 8, bottom: 0, width: 4, height: `${v}%`, borderRadius: 2, backgroundColor: colors[i] }} />
                  <div style={{
                    position: "absolute", left: 0, bottom: `${v}%`, transform: "translateY(50%)",
                    width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff",
                    border: `2px solid ${colors[i]}`, boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                  }} />
                  <div style={{ position: "absolute", bottom: -18, left: 4, fontSize: 10, color: palette.textSecondary }}>{v}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>Default</div>
          <SliderTrack value={50} onChange={() => {}} color={palette.primary} />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>Active / Dragging</div>
          <div style={{ position: "relative" }}>
            <SliderTrack value={65} onChange={() => {}} color={palette.primary} />
            <div style={{
              position: "absolute", top: -26, left: "65%", transform: "translateX(-50%)",
              padding: "2px 8px", borderRadius: 4, backgroundColor: palette.primary,
              color: "#fff", fontSize: 10, fontWeight: 600, whiteSpace: "nowrap",
            }}>65</div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>Disabled</div>
          <SliderTrack value={30} onChange={() => {}} color={palette.primary} disabled />
        </div>
      </div>

      {/* Step Variants */}
      <div style={subsectionLabel}>Step Variants</div>
      <div style={{ ...showcaseBox, display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 8 }}>Continuous (any value)</div>
          <SliderTrack value={heroVal} onChange={setHeroVal} color={palette.primary} showValue />
        </div>
        <div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 8 }}>Discrete (steps of 25)</div>
          <SliderTrack value={stepVal} onChange={(v) => setStepVal(Math.round(v / 25) * 25)} color={palette.secondary} marks={[0, 25, 50, 75, 100]} showValue />
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use sliders" description="Sliders are ideal for adjusting values within a range:" items={[
          "Volume and brightness controls",
          "Price range filters in e-commerce",
          "Setting thresholds and limits",
          "Image editing (opacity, saturation)",
        ]} />
        <UsageSection palette={palette} title="Slider best practices" description="Design sliders for precise and easy interaction:" items={[
          "Always show the current value visually",
          "Pair with an input field for exact values",
          "Use marks for discrete/stepped values",
          "Provide adequate thumb size for touch targets",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Pair sliders with a numeric input for precise value entry." },
        { type: "dont", text: "Don't use sliders for exact values without a visible readout or input." },
        { type: "do", text: "Use range sliders for price filters so users can set both min and max." },
        { type: "dont", text: "Don't make the slider track too short — provide enough space for precision." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Track", description: "Horizontal bar showing the full range", x: 50, y: 30 },
        { id: 2, label: "Fill", description: "Colored portion from min to current value", x: 30, y: 50 },
        { id: 3, label: "Thumb", description: "Draggable circular handle", x: 60, y: 50 },
        { id: 4, label: "Value label", description: "Current value display (tooltip or side)", x: 60, y: 15 },
        { id: 5, label: "Marks", description: "Optional tick marks for discrete steps", x: 50, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ width: 260, position: "relative", paddingTop: 20 }}>
          <div style={{ position: "absolute", top: 0, left: "60%", transform: "translateX(-50%)", padding: "2px 8px", borderRadius: 4, backgroundColor: palette.primary, color: "#fff", fontSize: 10, fontWeight: 600, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>60</div>
          <div style={{ position: "relative", height: 20 }}>
            <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 4, borderRadius: 2, backgroundColor: palette.primary + "25", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }} />
            <div style={{ position: "absolute", top: 8, left: 0, width: "60%", height: 4, borderRadius: 2, backgroundColor: palette.primary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }} />
            <div style={{
              position: "absolute", top: 2, left: "60%", transform: "translateX(-50%)",
              width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff",
              border: `2px solid ${palette.primary}`, boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {[0, 25, 50, 75, 100].map((m) => (
              <span key={m} style={{ fontSize: 9, color: palette.textSecondary }}>{m}</span>
            ))}
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Track Height", value: "4px" },
        { label: "Thumb Diameter", value: "16px" },
        { label: "Thumb Border", value: "2px solid" },
        { label: "Track Border Radius", value: "2px (full)" },
        { label: "Min Track Width", value: "120px" },
        { label: "Value Tooltip Padding", value: "2px 8px" },
        { label: "Mark Font Size", value: "9px" },
      ]} />
    </motion.section>
  );
}
