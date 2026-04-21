"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface RangeSliderSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function RangeSliderSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: RangeSliderSectionProps) {
  const comp = system.components;
  const [singleVal, setSingleVal] = useState(40);
  const [dualMin, setDualMin] = useState(20);
  const [dualMax, setDualMax] = useState(70);
  const [priceMin, setPriceMin] = useState(100);
  const [priceMax, setPriceMax] = useState(800);
  const [labelVal, setLabelVal] = useState(3);
  const [dragging, setDragging] = useState(false);
  const [disabledVal] = useState(60);
  const trackRef = useRef<HTMLDivElement>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const trackH = 6;
  const thumbSz = 20;

  const handleTrackClick = useCallback((
    e: React.MouseEvent<HTMLDivElement>, min: number, max: number,
    onSet: (v: number) => void
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSet(Math.round(min + pct * (max - min)));
  }, []);

  const renderSingleSlider = (
    id: string, value: number, onChange: (v: number) => void,
    opts: { min?: number; max?: number; disabled?: boolean; color?: string; showTooltip?: boolean; steps?: string[] } = {}
  ) => {
    const { min = 0, max = 100, disabled, color = palette.primary, showTooltip = true, steps } = opts;
    const pct = ((value - min) / (max - min)) * 100;
    return (
      <div style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "default", padding: "12px 0" }}>
        {showTooltip && (
          <div style={{ position: "relative", height: 24, marginBottom: 4 }}>
            <div style={{
              position: "absolute", left: `${pct}%`, transform: "translateX(-50%)",
              backgroundColor: color, color: "#fff", fontSize: 11, fontWeight: 600,
              padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap",
            }}>
              {steps ? steps[value] : value}
            </div>
          </div>
        )}
        <div
          style={{ position: "relative", height: thumbSz, display: "flex", alignItems: "center", cursor: disabled ? "not-allowed" : "pointer" }}
          onClick={(e) => !disabled && handleTrackClick(e, min, max, onChange)}
          onMouseDown={() => !disabled && setDragging(true)}
          onMouseUp={() => setDragging(false)}
        >
          <div style={{ position: "absolute", left: 0, right: 0, height: trackH, borderRadius: trackH / 2, backgroundColor: palette.border + "60" }} />
          <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: trackH, borderRadius: trackH / 2, backgroundColor: disabled ? palette.textSecondary : color, transition: "width 0.1s" }} />
          {steps && steps.map((_, i) => {
            const stepPct = (i / (steps.length - 1)) * 100;
            return <div key={i} style={{ position: "absolute", left: `${stepPct}%`, top: "50%", transform: "translate(-50%, -50%)", width: 8, height: 8, borderRadius: "50%", backgroundColor: i <= value ? color : palette.border, border: `2px solid ${palette.surface}`, zIndex: 1 }} />;
          })}
          <div style={{
            position: "absolute", left: `${pct}%`, transform: "translateX(-50%)",
            width: thumbSz, height: thumbSz, borderRadius: "50%",
            backgroundColor: disabled ? palette.textSecondary : color,
            border: `3px solid ${palette.surface}`, boxShadow: `0 1px 4px rgba(0,0,0,0.2)`,
            transition: "transform 0.1s", zIndex: 2,
          }} />
        </div>
        {steps && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {steps.map((s, i) => <span key={i} style={{ fontSize: 10, color: palette.textSecondary }}>{s}</span>)}
          </div>
        )}
      </div>
    );
  };

  const renderDualSlider = (
    minVal: number, maxVal: number, onMinChange: (v: number) => void, onMaxChange: (v: number) => void,
    opts: { min?: number; max?: number; prefix?: string; color?: string } = {}
  ) => {
    const { min = 0, max = 100, prefix = "", color = palette.primary } = opts;
    const range = max - min;
    const pctMin = ((minVal - min) / range) * 100;
    const pctMax = ((maxVal - min) / range) * 100;
    return (
      <div style={{ padding: "12px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>{prefix}{minVal}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>{prefix}{maxVal}</span>
        </div>
        <div
          style={{ position: "relative", height: thumbSz, display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            const val = Math.round(min + (pct / 100) * range);
            if (Math.abs(val - minVal) < Math.abs(val - maxVal)) {
              onMinChange(Math.min(val, maxVal - 1));
            } else {
              onMaxChange(Math.max(val, minVal + 1));
            }
          }}
        >
          <div style={{ position: "absolute", left: 0, right: 0, height: trackH, borderRadius: trackH / 2, backgroundColor: palette.border + "60" }} />
          <div style={{ position: "absolute", left: `${pctMin}%`, width: `${pctMax - pctMin}%`, height: trackH, borderRadius: trackH / 2, backgroundColor: color, transition: "all 0.1s" }} />
          <div style={{
            position: "absolute", left: `${pctMin}%`, transform: "translateX(-50%)",
            width: thumbSz, height: thumbSz, borderRadius: "50%", backgroundColor: color,
            border: `3px solid ${palette.surface}`, boxShadow: "0 1px 4px rgba(0,0,0,0.2)", zIndex: 2,
          }} />
          <div style={{
            position: "absolute", left: `${pctMax}%`, transform: "translateX(-50%)",
            width: thumbSz, height: thumbSz, borderRadius: "50%", backgroundColor: color,
            border: `3px solid ${palette.surface}`, boxShadow: "0 1px 4px rgba(0,0,0,0.2)", zIndex: 2,
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 10, color: palette.textSecondary }}>{prefix}{min}</span>
          <span style={{ fontSize: 10, color: palette.textSecondary }}>{prefix}{max}</span>
        </div>
      </div>
    );
  };

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  return (
    <motion.section id="comp-range-slider" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Range Slider</p>
      <p style={sectionDesc}>
        Range sliders let users select a value or range within a defined min-max boundary, with optional tooltips, step marks, and dual handles.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }}>
          <div style={{ width: "80%" }}>
            {renderSingleSlider("hero", singleVal, setSingleVal, { showTooltip: true })}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Track Height", "6px")}
          {tokenRow("Thumb Size", "20px")}
          {tokenRow("Active Color", "palette.primary")}
          {tokenRow("Track BG", "palette.border")}
          {tokenRow("Border Radius", system.spacing.radius.md)}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Single Range</div>
          {renderSingleSlider("v-single", singleVal, setSingleVal)}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Dual Handle (Min-Max)</div>
          {renderDualSlider(dualMin, dualMax, setDualMin, setDualMax)}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Price Range</div>
          {renderDualSlider(priceMin, priceMax, setPriceMin, setPriceMax, { min: 0, max: 1000, prefix: "$" })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>With Step Labels</div>
          {renderSingleSlider("v-labels", labelVal, setLabelVal, { min: 0, max: 4, steps: ["XS", "S", "M", "L", "XL"] })}
        </div>
        <div style={{ ...showcaseBox, gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>With Histogram</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 40, marginBottom: 4, padding: "0 10px" }}>
            {[12, 28, 45, 60, 72, 85, 65, 48, 30, 18, 8].map((h, i) => {
              const pct = (i / 10) * 100;
              const inRange = pct >= ((dualMin / 100) * 100) && pct <= ((dualMax / 100) * 100);
              return <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, backgroundColor: inRange ? palette.primary + "60" : palette.border + "40", transition: "background-color 0.2s" }} />;
            })}
          </div>
          {renderDualSlider(dualMin, dualMax, setDualMin, setDualMax)}
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Default</div>
          {renderSingleSlider("s-default", singleVal, setSingleVal, { showTooltip: false })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Dragging</div>
          {renderSingleSlider("s-drag", singleVal, setSingleVal, { showTooltip: true })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Disabled</div>
          {renderSingleSlider("s-disabled", disabledVal, () => {}, { disabled: true, showTooltip: false })}
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use range sliders" description="Range sliders work best for approximate value selection:" items={[
          "Price range filters in e-commerce",
          "Volume or brightness controls",
          "Date or time range pickers",
          "Any bounded numeric range with visual feedback",
        ]} />
        <UsageSection palette={palette} title="Slider vs. number input" description="Choose based on the precision required:" items={[
          "Slider — visual, approximate selection within a range",
          "Number input — exact value required",
          "Dual slider — selecting a range between two bounds",
          "Combine both for power users (slider + editable field)",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show the current value as a tooltip or label so users know the exact selection." },
        { type: "dont", text: "Don't use sliders for ranges that need extreme precision (e.g., latitude/longitude)." },
        { type: "do", text: "Use step marks for discrete options like clothing sizes (XS, S, M, L, XL)." },
        { type: "dont", text: "Don't set the range so wide that small movements cause huge value changes." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Track", description: "Background bar representing the full range", x: 50, y: 60 },
        { id: 2, label: "Fill", description: "Colored portion showing the selected range", x: 30, y: 60 },
        { id: 3, label: "Thumb", description: "Draggable circular handle", x: 50, y: 60 },
        { id: 4, label: "Value Tooltip", description: "Popup showing current value on drag", x: 50, y: 30 },
        { id: 5, label: "Range Labels", description: "Min/max values at track ends", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, position: "relative" }}>
          <div style={{
            position: "absolute", left: "40%", top: -20, transform: "translateX(-50%)",
            backgroundColor: palette.primary, color: "#fff", fontSize: 10, fontWeight: 600,
            padding: "2px 6px", borderRadius: 4,
            opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>40</div>
          <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
            <div style={{
              position: "absolute", left: 0, right: 0, height: trackH, borderRadius: 3,
              backgroundColor: palette.border + "60",
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }} />
            <div style={{
              position: "absolute", left: 0, width: "40%", height: trackH, borderRadius: 3,
              backgroundColor: palette.primary,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }} />
            <div style={{
              position: "absolute", left: "40%", transform: "translateX(-50%)",
              width: thumbSz, height: thumbSz, borderRadius: "50%",
              backgroundColor: palette.primary, border: `3px solid ${palette.surface}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }} />
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between", marginTop: 4,
            opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>
            <span style={{ fontSize: 10, color: palette.textSecondary }}>0</span>
            <span style={{ fontSize: 10, color: palette.textSecondary }}>100</span>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Track Height", value: "6px" },
        { label: "Thumb Diameter", value: "20px" },
        { label: "Thumb Border", value: "3px solid surface" },
        { label: "Tooltip Padding", value: "2px 8px" },
        { label: "Step Mark Size", value: "8px" },
        { label: "Label Font Size", value: "10px" },
        { label: "Track Border Radius", value: "3px" },
      ]} />
    </motion.section>
  );
}
