"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface AreaChartSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const SERIES_A = [20, 45, 35, 60, 50, 75, 65, 80, 70, 88];
const SERIES_B = [10, 25, 20, 35, 30, 45, 40, 55, 48, 60];
const CW = 320, CH = 160;

function toPoints(data: number[], w: number, h: number) {
  const xStep = w / (data.length - 1);
  return data.map((v, i) => ({ x: i * xStep, y: h - (v / 100) * h }));
}

function polyPath(data: number[], w: number, h: number) {
  return toPoints(data, w, h).map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
}

function smoothPath(data: number[], w: number, h: number) {
  const pts = toPoints(data, w, h);
  const xStep = w / (data.length - 1);
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` C${pts[i - 1].x + xStep / 3},${pts[i - 1].y} ${pts[i].x - xStep / 3},${pts[i].y} ${pts[i].x},${pts[i].y}`;
  }
  return d;
}

function areaPath(data: number[], w: number, h: number, smooth = false) {
  const line = smooth ? smoothPath(data, w, h) : polyPath(data, w, h);
  return `${line} L${w},${h} L0,${h} Z`;
}

function stepPath(data: number[], w: number, h: number) {
  const pts = toPoints(data, w, h);
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L${pts[i].x},${pts[i - 1].y} L${pts[i].x},${pts[i].y}`;
  }
  return d;
}

export function AreaChartSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: AreaChartSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"single" | "stacked" | "line-overlay" | "gradient" | "step">("single");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

  const pad = 24;
  const xStep = CW / (SERIES_A.length - 1);

  const renderGrid = () => (
    <g>
      {[0, 25, 50, 75, 100].map(v => {
        const y = CH - (v / 100) * CH;
        return <line key={v} x1={0} y1={y} x2={CW} y2={y} stroke={palette.border} strokeWidth={0.5} strokeDasharray="4 2" />;
      })}
    </g>
  );

  const renderPoints = (data: number[], color: string) => (
    <g>
      {data.map((v, i) => (
        <circle key={i} cx={i * xStep} cy={CH - (v / 100) * CH} r={hoveredIdx === i ? 5 : 3}
          fill={hoveredIdx === i ? color : palette.surface} stroke={color} strokeWidth={2}
          onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: "pointer" }} />
      ))}
      {hoveredIdx !== null && (
        <g>
          <rect x={hoveredIdx * xStep - 18} y={CH - (data[hoveredIdx] / 100) * CH - 22} width={36} height={16} rx={4} fill={color} />
          <text x={hoveredIdx * xStep} y={CH - (data[hoveredIdx] / 100) * CH - 11} textAnchor="middle" fontSize={10} fill="#fff" fontWeight={600}>{data[hoveredIdx]}</text>
        </g>
      )}
    </g>
  );

  const renderChart = () => {
    const gradId = "area-grad-" + variant;
    switch (variant) {
      case "stacked":
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              <path d={areaPath(SERIES_A, CW, CH)} fill={palette.primary} opacity={0.25} />
              <path d={areaPath(SERIES_B, CW, CH)} fill={palette.secondary} opacity={0.25} />
              <path d={polyPath(SERIES_A, CW, CH)} fill="none" stroke={palette.primary} strokeWidth={2} />
              <path d={polyPath(SERIES_B, CW, CH)} fill="none" stroke={palette.secondary} strokeWidth={2} />
            </g>
          </svg>
        );
      case "line-overlay":
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              <path d={areaPath(SERIES_A, CW, CH)} fill={palette.primary} opacity={0.12} />
              <path d={polyPath(SERIES_A, CW, CH)} fill="none" stroke={palette.primary} strokeWidth={2.5} />
              {renderPoints(SERIES_A, palette.primary)}
            </g>
          </svg>
        );
      case "gradient":
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.primary} stopOpacity={0.5} />
                <stop offset="100%" stopColor={palette.primary} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              <path d={areaPath(SERIES_A, CW, CH, true)} fill={`url(#${gradId})`} />
              <path d={smoothPath(SERIES_A, CW, CH)} fill="none" stroke={palette.primary} strokeWidth={2} />
              {renderPoints(SERIES_A, palette.primary)}
            </g>
          </svg>
        );
      case "step": {
        const sLine = stepPath(SERIES_A, CW, CH);
        const sArea = `${sLine} L${CW},${CH} L0,${CH} Z`;
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              <path d={sArea} fill={palette.primary} opacity={0.15} />
              <path d={sLine} fill="none" stroke={palette.primary} strokeWidth={2} />
              {renderPoints(SERIES_A, palette.primary)}
            </g>
          </svg>
        );
      }
      default:
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="area-def" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.primary} stopOpacity={0.3} />
                <stop offset="100%" stopColor={palette.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              <path d={areaPath(SERIES_A, CW, CH)} fill="url(#area-def)" />
              <path d={polyPath(SERIES_A, CW, CH)} fill="none" stroke={palette.primary} strokeWidth={2} />
              {renderPoints(SERIES_A, palette.primary)}
            </g>
          </svg>
        );
    }
  };

  return (
    <motion.section id="comp-area-chart" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Area Chart</p>
      <p style={sectionDesc}>
        Area charts combine line charts with filled regions to emphasize volume, totals, or cumulative trends over time.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 220 }}>
          {renderChart()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Fill Opacity", "0.15–0.3")}
          {tokenRow("Stroke", "2px")}
          {tokenRow("Gradient Start", "palette.primary @ 50%")}
          {tokenRow("Gradient End", "palette.primary @ 2%")}
          {tokenRow("Point Radius", "3px / 5px hover")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("single", "Single Area")}
        {variantBtn("stacked", "Stacked Areas")}
        {variantBtn("line-overlay", "Line Overlay")}
        {variantBtn("gradient", "Gradient Fill")}
        {variantBtn("step", "Step Area")}
      </div>
      <div style={showcaseBox}>{renderChart()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use to show volume over time", "Apply gradient fills to reduce visual weight", "Stack for part-to-whole comparisons", "Keep fills semi-transparent for layered charts"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't stack too many areas (>4)", "Don't use opaque fills that hide overlapping series", "Don't omit the baseline (y = 0)"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Fill Transparency: Use 15-30% opacity for single areas, lower for stacked so underlying layers remain visible." },
        { type: "dont", text: "Stacking Order: Place the most stable/largest series at the bottom. Volatile series on top." },
        { type: "do", text: "Smooth vs Straight: Smooth curves suit organic data (temperature). Straight segments suit discrete intervals (sales)." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Fill Area", description: "Semi-transparent region below the line", x: 50, y: 60 },
        { id: 2, label: "Stroke Line", description: "Solid line along data path", x: 50, y: 35 },
        { id: 3, label: "Data Point", description: "Interactive value marker", x: 75, y: 25 },
        { id: 4, label: "Grid", description: "Background reference lines", x: 15, y: 50 },
        { id: 5, label: "Gradient", description: "Top-to-bottom fade on the fill", x: 35, y: 70 },
      ]} renderPreview={(hl) => (
        <svg width={200} height={100} style={{ overflow: "visible" }}>
          {[25, 50, 75].map(y => <line key={y} x1={10} y1={y} x2={190} y2={y} stroke={palette.border} strokeWidth={0.5} strokeDasharray="3 2" opacity={hl && hl !== 4 ? 0.2 : 0.6} />)}
          <path d="M20,70 L60,45 L100,55 L140,30 L180,25 L180,90 L20,90 Z" fill={palette.primary} opacity={hl && hl !== 1 ? 0.05 : 0.2} />
          <polyline points="20,70 60,45 100,55 140,30 180,25" fill="none" stroke={palette.primary} strokeWidth={hl === 2 ? 3 : 2} opacity={hl && hl !== 2 ? 0.3 : 1} />
          {[{ x: 60, y: 45 }, { x: 100, y: 55 }, { x: 140, y: 30 }].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill={palette.primary} opacity={hl && hl !== 3 ? 0.3 : 1} />
          ))}
        </svg>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Chart Min Height", value: "200px" },
        { label: "Stroke Width", value: "2px" },
        { label: "Fill Opacity Range", value: "0.02–0.5" },
        { label: "Point Radius", value: "3px (5px hover)" },
        { label: "Grid Stroke", value: "0.5px dashed" },
        { label: "Padding", value: "24px" },
      ]} />
    </motion.section>
  );
}
