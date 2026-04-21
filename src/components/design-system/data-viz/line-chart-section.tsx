"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface LineChartSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const SAMPLE_DATA = [12, 38, 25, 55, 42, 68, 52, 75, 60, 85, 72, 90];
const MULTI_DATA = [
  [12, 38, 25, 55, 42, 68, 52, 75, 60, 85, 72, 90],
  [28, 18, 45, 35, 55, 40, 65, 50, 70, 55, 80, 65],
];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function pointsToPath(data: number[], w: number, h: number, smooth = false): string {
  const xStep = w / (data.length - 1);
  const pts = data.map((v, i) => ({ x: i * xStep, y: h - (v / 100) * h }));
  if (!smooth) return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cp1x = pts[i - 1].x + xStep / 3;
    const cp2x = pts[i].x - xStep / 3;
    d += ` C${cp1x},${pts[i - 1].y} ${cp2x},${pts[i].y} ${pts[i].x},${pts[i].y}`;
  }
  return d;
}

export function LineChartSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: LineChartSectionProps) {
  const comp = system.components;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [variant, setVariant] = useState<"single" | "multi" | "area" | "curved" | "annotated">("single");
  const cw = 320, ch = 160, pad = 24;

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

  const renderGrid = () => (
    <g>
      {[0, 25, 50, 75, 100].map(v => {
        const y = ch - (v / 100) * ch;
        return <g key={v}>
          <line x1={0} y1={y} x2={cw} y2={y} stroke={palette.border} strokeWidth={0.5} strokeDasharray="4 2" />
          <text x={-6} y={y + 3} textAnchor="end" fontSize={9} fill={palette.textSecondary}>{v}</text>
        </g>;
      })}
      {MONTHS.map((m, i) => {
        const x = (i / (MONTHS.length - 1)) * cw;
        return <text key={i} x={x} y={ch + 14} textAnchor="middle" fontSize={9} fill={palette.textSecondary}>{m}</text>;
      })}
    </g>
  );

  const renderChart = () => {
    const xStep = cw / (SAMPLE_DATA.length - 1);
    switch (variant) {
      case "multi":
        return <svg width={cw + pad * 2} height={ch + pad * 2} style={{ overflow: "visible" }}>
          <g transform={`translate(${pad},${pad / 2})`}>
            {renderGrid()}
            {MULTI_DATA.map((d, di) => (
              <path key={di} d={pointsToPath(d, cw, ch)} fill="none"
                stroke={di === 0 ? palette.primary : palette.secondary} strokeWidth={2} />
            ))}
          </g>
        </svg>;
      case "area":
        return <svg width={cw + pad * 2} height={ch + pad * 2} style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.primary} stopOpacity={0.3} />
              <stop offset="100%" stopColor={palette.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <g transform={`translate(${pad},${pad / 2})`}>
            {renderGrid()}
            <path d={`${pointsToPath(SAMPLE_DATA, cw, ch)} L${cw},${ch} L0,${ch} Z`} fill="url(#areaGrad)" />
            <path d={pointsToPath(SAMPLE_DATA, cw, ch)} fill="none" stroke={palette.primary} strokeWidth={2} />
          </g>
        </svg>;
      case "curved":
        return <svg width={cw + pad * 2} height={ch + pad * 2} style={{ overflow: "visible" }}>
          <g transform={`translate(${pad},${pad / 2})`}>
            {renderGrid()}
            <path d={pointsToPath(SAMPLE_DATA, cw, ch, true)} fill="none" stroke={palette.primary} strokeWidth={2} />
            {SAMPLE_DATA.map((v, i) => (
              <circle key={i} cx={i * xStep} cy={ch - (v / 100) * ch} r={3} fill={palette.primary} />
            ))}
          </g>
        </svg>;
      case "annotated":
        return <svg width={cw + pad * 2} height={ch + pad * 2} style={{ overflow: "visible" }}>
          <g transform={`translate(${pad},${pad / 2})`}>
            {renderGrid()}
            <path d={pointsToPath(SAMPLE_DATA, cw, ch)} fill="none" stroke={palette.primary} strokeWidth={2} />
            <line x1={5 * xStep} y1={0} x2={5 * xStep} y2={ch} stroke={palette.warning} strokeWidth={1} strokeDasharray="4 2" />
            <rect x={5 * xStep - 30} y={ch - (68 / 100) * ch - 22} width={60} height={18} rx={4} fill={palette.warning} />
            <text x={5 * xStep} y={ch - (68 / 100) * ch - 10} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={600}>Peak: 68</text>
            {SAMPLE_DATA.map((v, i) => (
              <circle key={i} cx={i * xStep} cy={ch - (v / 100) * ch} r={hoveredIdx === i ? 5 : 3}
                fill={hoveredIdx === i ? palette.primary : palette.surface} stroke={palette.primary} strokeWidth={2}
                onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: "pointer" }} />
            ))}
          </g>
        </svg>;
      default:
        return <svg width={cw + pad * 2} height={ch + pad * 2} style={{ overflow: "visible" }}>
          <g transform={`translate(${pad},${pad / 2})`}>
            {renderGrid()}
            <path d={pointsToPath(SAMPLE_DATA, cw, ch)} fill="none" stroke={palette.primary} strokeWidth={2} />
            {SAMPLE_DATA.map((v, i) => (
              <circle key={i} cx={i * xStep} cy={ch - (v / 100) * ch} r={hoveredIdx === i ? 5 : 3}
                fill={hoveredIdx === i ? palette.primary : palette.surface} stroke={palette.primary} strokeWidth={2}
                onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: "pointer" }} />
            ))}
            {hoveredIdx !== null && (
              <g>
                <line x1={hoveredIdx * xStep} y1={0} x2={hoveredIdx * xStep} y2={ch} stroke={palette.primary} strokeWidth={1} strokeDasharray="3 2" opacity={0.4} />
                <rect x={hoveredIdx * xStep - 20} y={ch - (SAMPLE_DATA[hoveredIdx] / 100) * ch - 24} width={40} height={18} rx={4} fill={palette.primary} />
                <text x={hoveredIdx * xStep} y={ch - (SAMPLE_DATA[hoveredIdx] / 100) * ch - 12} textAnchor="middle" fontSize={10} fill="#fff" fontWeight={600}>{SAMPLE_DATA[hoveredIdx]}</text>
              </g>
            )}
          </g>
        </svg>;
    }
  };

  return (
    <motion.section id="comp-line-chart" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Line Chart</p>
      <p style={sectionDesc}>
        Line charts display trends and changes over continuous intervals, ideal for time-series data, performance metrics, and comparative analysis.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 220 }}>
          {renderChart()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Stroke Width", "2px")}
          {tokenRow("Point Radius", "3px / 5px hover")}
          {tokenRow("Grid Color", "palette.border")}
          {tokenRow("Line Color", "palette.primary")}
          {tokenRow("Font", system.typography.bodyFont)}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("single", "Single Line")}
        {variantBtn("multi", "Multi-line")}
        {variantBtn("area", "Area Fill")}
        {variantBtn("curved", "Curved / Smooth")}
        {variantBtn("annotated", "With Annotations")}
      </div>
      <div style={showcaseBox}>{renderChart()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use for time-series and continuous data", "Keep gridlines subtle", "Limit to 4-5 lines for readability", "Add tooltips for exact values"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't truncate Y-axis misleadingly", "Don't use for categorical data", "Don't clutter with too many annotations"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Axes: Always label axes. Use consistent intervals. Start Y at zero when possible." },
        { type: "dont", text: "Color Coding: Assign distinct, accessible colors per series. Include a legend for multi-line charts." },
        { type: "do", text: "Responsive: Simplify data points on small screens. Use touch-friendly hover targets." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "X Axis", description: "Horizontal category/time axis", x: 50, y: 90 },
        { id: 2, label: "Y Axis", description: "Vertical value axis", x: 5, y: 40 },
        { id: 3, label: "Data Line", description: "Path connecting data points", x: 50, y: 40 },
        { id: 4, label: "Data Point", description: "Individual value marker", x: 75, y: 25 },
        { id: 5, label: "Tooltip", description: "Value on hover", x: 75, y: 10 },
      ]} renderPreview={(hl) => (
        <svg width={200} height={100} style={{ overflow: "visible" }}>
          <line x1={20} y1={90} x2={190} y2={90} stroke={palette.border} strokeWidth={hl === 1 ? 2 : 1} opacity={hl && hl !== 1 ? 0.3 : 1} />
          <line x1={20} y1={10} x2={20} y2={90} stroke={palette.border} strokeWidth={hl === 2 ? 2 : 1} opacity={hl && hl !== 2 ? 0.3 : 1} />
          <polyline points="30,70 60,50 90,60 120,30 150,40 180,20" fill="none" stroke={palette.primary} strokeWidth={2} opacity={hl && hl !== 3 ? 0.3 : 1} />
          {[{ x: 30, y: 70 }, { x: 90, y: 60 }, { x: 150, y: 40 }].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill={palette.primary} opacity={hl && hl !== 4 ? 0.3 : 1} />
          ))}
          {hl === 5 && <rect x={130} y={5} width={40} height={16} rx={3} fill={palette.primary} opacity={0.9} />}
        </svg>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Chart Minimum Height", value: "200px" },
        { label: "Stroke Width", value: "2px" },
        { label: "Point Radius", value: "3px (5px hover)" },
        { label: "Grid Line Width", value: "0.5px dashed" },
        { label: "Axis Font Size", value: "9px" },
        { label: "Tooltip Border Radius", value: system.spacing.radius.sm },
        { label: "Padding", value: "24px" },
      ]} />
    </motion.section>
  );
}
