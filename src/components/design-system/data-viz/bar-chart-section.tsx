"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface BarChartSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const BAR_DATA = [
  { label: "Q1", value: 65 }, { label: "Q2", value: 82 },
  { label: "Q3", value: 48 }, { label: "Q4", value: 91 }, { label: "Q5", value: 73 },
];
const GROUPED_DATA = [
  { label: "Q1", a: 65, b: 45 }, { label: "Q2", a: 82, b: 60 },
  { label: "Q3", a: 48, b: 72 }, { label: "Q4", a: 91, b: 55 },
];
const STACKED_DATA = [
  { label: "Jan", a: 40, b: 30, c: 20 }, { label: "Feb", a: 50, b: 25, c: 15 },
  { label: "Mar", a: 35, b: 40, c: 25 }, { label: "Apr", a: 60, b: 20, c: 10 },
];
const NEG_DATA = [
  { label: "A", value: 40 }, { label: "B", value: -25 },
  { label: "C", value: 60 }, { label: "D", value: -15 }, { label: "E", value: 35 },
];

export function BarChartSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: BarChartSectionProps) {
  const comp = system.components;
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [variant, setVariant] = useState<"vertical" | "horizontal" | "grouped" | "stacked" | "negative">("vertical");

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

  const renderChart = () => {
    const cw = 320, ch = 180, barGap = 8;
    switch (variant) {
      case "horizontal":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 360 }}>
            {BAR_DATA.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}
                onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                <span style={{ fontSize: 11, color: palette.textSecondary, width: 24, textAlign: "right" }}>{d.label}</span>
                <div style={{ flex: 1, height: 24, backgroundColor: palette.border + "30", borderRadius: system.spacing.radius.sm, overflow: "hidden" }}>
                  <div style={{
                    width: `${d.value}%`, height: "100%", borderRadius: system.spacing.radius.sm,
                    backgroundColor: hoveredBar === i ? palette.secondary : palette.primary,
                    transition: "all 0.2s",
                  }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: palette.textPrimary, width: 28 }}>{d.value}</span>
              </div>
            ))}
          </div>
        );
      case "grouped": {
        const bw = (cw / GROUPED_DATA.length - barGap * 2) / 2;
        return (
          <svg width={cw} height={ch + 24} style={{ overflow: "visible" }}>
            <line x1={0} y1={ch} x2={cw} y2={ch} stroke={palette.border} strokeWidth={1} />
            {GROUPED_DATA.map((d, i) => {
              const gx = (cw / GROUPED_DATA.length) * i + barGap;
              return <g key={i}>
                <rect x={gx} y={ch - (d.a / 100) * ch} width={bw} height={(d.a / 100) * ch}
                  fill={palette.primary} rx={3} opacity={hoveredBar === i ? 1 : 0.85}
                  onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)} style={{ cursor: "pointer" }} />
                <rect x={gx + bw + 2} y={ch - (d.b / 100) * ch} width={bw} height={(d.b / 100) * ch}
                  fill={palette.secondary} rx={3} opacity={hoveredBar === i ? 1 : 0.85}
                  onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)} style={{ cursor: "pointer" }} />
                <text x={gx + bw} y={ch + 16} textAnchor="middle" fontSize={10} fill={palette.textSecondary}>{d.label}</text>
              </g>;
            })}
          </svg>
        );
      }
      case "stacked": {
        const bw = cw / STACKED_DATA.length - barGap * 2;
        const colors = [palette.primary, palette.secondary, palette.info];
        return (
          <svg width={cw} height={ch + 24} style={{ overflow: "visible" }}>
            <line x1={0} y1={ch} x2={cw} y2={ch} stroke={palette.border} strokeWidth={1} />
            {STACKED_DATA.map((d, i) => {
              const gx = (cw / STACKED_DATA.length) * i + barGap;
              const vals = [d.a, d.b, d.c];
              let yOff = 0;
              return <g key={i} onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)} style={{ cursor: "pointer" }}>
                {vals.map((v, vi) => {
                  const h = (v / 100) * ch;
                  const el = <rect key={vi} x={gx} y={ch - yOff - h} width={bw} height={h} fill={colors[vi]} rx={vi === vals.length - 1 ? 3 : 0} opacity={hoveredBar === i ? 1 : 0.8} />;
                  yOff += h;
                  return el;
                })}
                <text x={gx + bw / 2} y={ch + 16} textAnchor="middle" fontSize={10} fill={palette.textSecondary}>{d.label}</text>
              </g>;
            })}
          </svg>
        );
      }
      case "negative": {
        const bw = cw / NEG_DATA.length - barGap * 2;
        const mid = ch / 2;
        return (
          <svg width={cw} height={ch + 24} style={{ overflow: "visible" }}>
            <line x1={0} y1={mid} x2={cw} y2={mid} stroke={palette.textSecondary} strokeWidth={1} />
            {NEG_DATA.map((d, i) => {
              const gx = (cw / NEG_DATA.length) * i + barGap;
              const h = Math.abs(d.value) / 100 * mid;
              const y = d.value >= 0 ? mid - h : mid;
              return <g key={i} onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)} style={{ cursor: "pointer" }}>
                <rect x={gx} y={y} width={bw} height={h} fill={d.value >= 0 ? palette.primary : palette.danger} rx={3}
                  opacity={hoveredBar === i ? 1 : 0.8} />
                <text x={gx + bw / 2} y={ch + 16} textAnchor="middle" fontSize={10} fill={palette.textSecondary}>{d.label}</text>
              </g>;
            })}
          </svg>
        );
      }
      default: {
        const bw = cw / BAR_DATA.length - barGap * 2;
        return (
          <svg width={cw} height={ch + 24} style={{ overflow: "visible" }}>
            <line x1={0} y1={ch} x2={cw} y2={ch} stroke={palette.border} strokeWidth={1} />
            {BAR_DATA.map((d, i) => {
              const x = (cw / BAR_DATA.length) * i + barGap;
              const h = (d.value / 100) * ch;
              return <g key={i} onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)} style={{ cursor: "pointer" }}>
                <rect x={x} y={ch - h} width={bw} height={h} fill={hoveredBar === i ? palette.secondary : palette.primary} rx={4}
                  style={{ transition: "all 0.2s" }} />
                {hoveredBar === i && <text x={x + bw / 2} y={ch - h - 6} textAnchor="middle" fontSize={11} fontWeight={600} fill={palette.textPrimary}>{d.value}</text>}
                <text x={x + bw / 2} y={ch + 16} textAnchor="middle" fontSize={10} fill={palette.textSecondary}>{d.label}</text>
              </g>;
            })}
          </svg>
        );
      }
    }
  };

  return (
    <motion.section id="comp-bar-chart" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Bar Chart</p>
      <p style={sectionDesc}>
        Bar charts compare discrete categories or groups using rectangular bars whose length or height encodes value.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
          {renderChart()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Bar Radius", system.spacing.radius.sm)}
          {tokenRow("Gap", "8px")}
          {tokenRow("Primary Fill", "palette.primary")}
          {tokenRow("Hover Fill", "palette.secondary")}
          {tokenRow("Axis Color", "palette.border")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("vertical", "Vertical")}
        {variantBtn("horizontal", "Horizontal")}
        {variantBtn("grouped", "Grouped")}
        {variantBtn("stacked", "Stacked")}
        {variantBtn("negative", "Negative Values")}
      </div>
      <div style={showcaseBox}>{renderChart()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use for comparing discrete categories", "Sort bars by value when order isn't meaningful", "Label each bar or provide a legend", "Keep consistent bar widths"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't use 3D effects", "Don't compare too many categories (>10)", "Don't truncate the baseline away from zero"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Spacing: Bar gap should be 40-60% of bar width for optimal readability." },
        { type: "dont", text: "Color: Use a single color for single-series. Reserve multiple colors for grouped/stacked variants." },
        { type: "do", text: "Labels: Show value labels on hover. For horizontal bars, place values at bar ends." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Bar", description: "Rectangular value indicator", x: 50, y: 45 },
        { id: 2, label: "Axis", description: "Baseline reference line", x: 50, y: 90 },
        { id: 3, label: "Label", description: "Category identifier", x: 50, y: 98 },
        { id: 4, label: "Value", description: "Displayed on hover", x: 50, y: 15 },
        { id: 5, label: "Grid", description: "Background reference lines", x: 10, y: 50 },
      ]} renderPreview={(hl) => (
        <svg width={200} height={110}>
          {[30, 55, 75].map((_, i) => (
            <line key={i} x1={20} y1={20 + i * 30} x2={190} y2={20 + i * 30} stroke={palette.border} strokeWidth={0.5} strokeDasharray="3 2" opacity={hl && hl !== 5 ? 0.2 : 0.6} />
          ))}
          <line x1={20} y1={95} x2={190} y2={95} stroke={palette.border} strokeWidth={hl === 2 ? 2 : 1} opacity={hl && hl !== 2 ? 0.3 : 1} />
          {[{ x: 35, h: 55 }, { x: 75, h: 75 }, { x: 115, h: 40 }, { x: 155, h: 65 }].map((b, i) => (
            <rect key={i} x={b.x} y={95 - b.h} width={28} height={b.h} rx={3} fill={palette.primary} opacity={hl && hl !== 1 ? 0.3 : 0.85} />
          ))}
          {hl === 3 && ["A", "B", "C", "D"].map((l, i) => (
            <text key={i} x={49 + i * 40} y={108} textAnchor="middle" fontSize={8} fill={palette.textSecondary}>{l}</text>
          ))}
          {hl === 4 && <text x={89} y={14} textAnchor="middle" fontSize={9} fontWeight={700} fill={palette.primary}>75</text>}
        </svg>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Minimum Chart Height", value: "200px" },
        { label: "Bar Corner Radius", value: system.spacing.radius.sm },
        { label: "Bar Gap", value: "8px" },
        { label: "Label Font Size", value: "10px" },
        { label: "Value Font Size", value: "11px" },
        { label: "Axis Stroke", value: "1px" },
      ]} />
    </motion.section>
  );
}
