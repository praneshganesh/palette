"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ScatterSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

interface ScatterPoint { x: number; y: number; size?: number; cat?: number }
const BASIC_PTS: ScatterPoint[] = [
  { x: 12, y: 35 }, { x: 25, y: 55 }, { x: 38, y: 42 }, { x: 45, y: 70 },
  { x: 55, y: 60 }, { x: 62, y: 80 }, { x: 72, y: 48 }, { x: 78, y: 88 },
  { x: 85, y: 65 }, { x: 92, y: 75 }, { x: 30, y: 30 }, { x: 50, y: 50 },
];
const BUBBLE_PTS: ScatterPoint[] = [
  { x: 15, y: 40, size: 8 }, { x: 30, y: 65, size: 14 }, { x: 45, y: 35, size: 20 },
  { x: 55, y: 72, size: 10 }, { x: 70, y: 50, size: 18 }, { x: 80, y: 85, size: 12 },
  { x: 40, y: 55, size: 24 }, { x: 90, y: 60, size: 16 },
];
const CAT_PTS: ScatterPoint[] = [
  { x: 10, y: 25, cat: 0 }, { x: 20, y: 40, cat: 0 }, { x: 15, y: 35, cat: 0 }, { x: 25, y: 30, cat: 0 },
  { x: 55, y: 65, cat: 1 }, { x: 65, y: 75, cat: 1 }, { x: 60, y: 70, cat: 1 }, { x: 70, y: 60, cat: 1 },
  { x: 40, y: 80, cat: 2 }, { x: 50, y: 85, cat: 2 }, { x: 45, y: 90, cat: 2 },
];

const CW = 300, CH = 200;

export function ScatterSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ScatterSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"basic" | "bubble" | "trend" | "category" | "quadrants">("basic");
  const [hoveredPt, setHoveredPt] = useState<number | null>(null);

  const catColors = [palette.primary, palette.secondary, palette.info];
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

  const toSvg = (p: ScatterPoint) => ({ sx: (p.x / 100) * CW, sy: CH - (p.y / 100) * CH });

  const renderGrid = () => (
    <g>
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={0} y1={CH - (v / 100) * CH} x2={CW} y2={CH - (v / 100) * CH} stroke={palette.border} strokeWidth={0.5} strokeDasharray="3 2" />
          <line x1={(v / 100) * CW} y1={0} x2={(v / 100) * CW} y2={CH} stroke={palette.border} strokeWidth={0.5} strokeDasharray="3 2" />
        </g>
      ))}
      <line x1={0} y1={CH} x2={CW} y2={CH} stroke={palette.border} strokeWidth={1} />
      <line x1={0} y1={0} x2={0} y2={CH} stroke={palette.border} strokeWidth={1} />
    </g>
  );

  const renderChart = () => {
    const pad = 20;
    switch (variant) {
      case "bubble":
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              {BUBBLE_PTS.map((p, i) => {
                const { sx, sy } = toSvg(p);
                return (
                  <circle key={i} cx={sx} cy={sy} r={p.size || 6} fill={palette.primary}
                    opacity={hoveredPt === i ? 0.9 : 0.4} stroke={palette.primary} strokeWidth={hoveredPt === i ? 2 : 1}
                    onMouseEnter={() => setHoveredPt(i)} onMouseLeave={() => setHoveredPt(null)} style={{ cursor: "pointer", transition: "opacity 0.2s" }} />
                );
              })}
            </g>
          </svg>
        );
      case "trend":
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              <line x1={0} y1={CH - (20 / 100) * CH} x2={CW} y2={CH - (85 / 100) * CH}
                stroke={palette.warning} strokeWidth={2} strokeDasharray="6 3" opacity={0.7} />
              {BASIC_PTS.map((p, i) => {
                const { sx, sy } = toSvg(p);
                return (
                  <circle key={i} cx={sx} cy={sy} r={hoveredPt === i ? 6 : 4} fill={palette.primary}
                    opacity={hoveredPt === i ? 1 : 0.7}
                    onMouseEnter={() => setHoveredPt(i)} onMouseLeave={() => setHoveredPt(null)} style={{ cursor: "pointer" }} />
                );
              })}
            </g>
          </svg>
        );
      case "category":
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              {CAT_PTS.map((p, i) => {
                const { sx, sy } = toSvg(p);
                return (
                  <circle key={i} cx={sx} cy={sy} r={hoveredPt === i ? 7 : 5} fill={catColors[p.cat || 0]}
                    opacity={hoveredPt === i ? 1 : 0.7}
                    onMouseEnter={() => setHoveredPt(i)} onMouseLeave={() => setHoveredPt(null)} style={{ cursor: "pointer" }} />
                );
              })}
            </g>
          </svg>
        );
      case "quadrants":
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              <rect x={0} y={0} width={CW / 2} height={CH / 2} fill={palette.success} opacity={0.06} />
              <rect x={CW / 2} y={0} width={CW / 2} height={CH / 2} fill={palette.info} opacity={0.06} />
              <rect x={0} y={CH / 2} width={CW / 2} height={CH / 2} fill={palette.warning} opacity={0.06} />
              <rect x={CW / 2} y={CH / 2} width={CW / 2} height={CH / 2} fill={palette.danger} opacity={0.06} />
              <line x1={CW / 2} y1={0} x2={CW / 2} y2={CH} stroke={palette.textSecondary} strokeWidth={1} strokeDasharray="4 3" opacity={0.4} />
              <line x1={0} y1={CH / 2} x2={CW} y2={CH / 2} stroke={palette.textSecondary} strokeWidth={1} strokeDasharray="4 3" opacity={0.4} />
              {BASIC_PTS.map((p, i) => {
                const { sx, sy } = toSvg(p);
                return (
                  <circle key={i} cx={sx} cy={sy} r={hoveredPt === i ? 6 : 4} fill={palette.primary}
                    opacity={hoveredPt === i ? 1 : 0.7}
                    onMouseEnter={() => setHoveredPt(i)} onMouseLeave={() => setHoveredPt(null)} style={{ cursor: "pointer" }} />
                );
              })}
            </g>
          </svg>
        );
      default:
        return (
          <svg width={CW + pad * 2} height={CH + pad * 2} style={{ overflow: "visible" }}>
            <g transform={`translate(${pad},${pad / 2})`}>
              {renderGrid()}
              {BASIC_PTS.map((p, i) => {
                const { sx, sy } = toSvg(p);
                return (
                  <g key={i} onMouseEnter={() => setHoveredPt(i)} onMouseLeave={() => setHoveredPt(null)} style={{ cursor: "pointer" }}>
                    <circle cx={sx} cy={sy} r={hoveredPt === i ? 6 : 4} fill={palette.primary} opacity={hoveredPt === i ? 1 : 0.7} />
                    {hoveredPt === i && (
                      <g>
                        <rect x={sx - 22} y={sy - 22} width={44} height={16} rx={4} fill={palette.primary} />
                        <text x={sx} y={sy - 11} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={600}>({p.x},{p.y})</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        );
    }
  };

  return (
    <motion.section id="comp-scatter" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Scatter Plot</p>
      <p style={sectionDesc}>
        Scatter plots reveal correlations, distributions, and outliers by plotting individual data points across two axes.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
          {renderChart()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Point Radius", "4px (6px hover)")}
          {tokenRow("Bubble Range", "8–24px")}
          {tokenRow("Opacity", "0.7 (1.0 hover)")}
          {tokenRow("Grid Dash", "3px 2px")}
          {tokenRow("Trend Line", "2px dashed")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("basic", "Basic Scatter")}
        {variantBtn("bubble", "Bubble")}
        {variantBtn("trend", "Trend Line")}
        {variantBtn("category", "By Category")}
        {variantBtn("quadrants", "Quadrants")}
      </div>
      <div style={showcaseBox}>{renderChart()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use to explore correlations between two variables", "Add trend lines for regression context", "Vary point size for a third dimension (bubble)", "Color-code categories with distinct hues"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't overplot with too many points (>200) without aggregation", "Don't omit axis labels", "Don't use for time-series data (use line charts instead)"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Point Density: For dense data, lower opacity or use smaller radii. Consider hexbin aggregation for 1000+ points." },
        { type: "dont", text: "Quadrants: Use quadrant lines to create meaningful zones (e.g., high-effort/high-value). Label each quadrant." },
        { type: "do", text: "Accessibility: Combine color with shape for category distinction. Ensure 3:1 contrast against background." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Point", description: "Individual data marker", x: 55, y: 35 },
        { id: 2, label: "X Axis", description: "Horizontal variable axis", x: 50, y: 95 },
        { id: 3, label: "Y Axis", description: "Vertical variable axis", x: 5, y: 50 },
        { id: 4, label: "Grid", description: "Reference lines for both axes", x: 30, y: 60 },
        { id: 5, label: "Tooltip", description: "Coordinate values on hover", x: 70, y: 20 },
      ]} renderPreview={(hl) => (
        <svg width={160} height={120}>
          {[30, 60, 90].map(y => <line key={y} x1={20} y1={y} x2={150} y2={y} stroke={palette.border} strokeWidth={0.5} opacity={hl && hl !== 4 ? 0.2 : 0.5} />)}
          <line x1={20} y1={105} x2={150} y2={105} stroke={palette.border} strokeWidth={hl === 2 ? 2 : 1} opacity={hl && hl !== 2 ? 0.3 : 1} />
          <line x1={20} y1={10} x2={20} y2={105} stroke={palette.border} strokeWidth={hl === 3 ? 2 : 1} opacity={hl && hl !== 3 ? 0.3 : 1} />
          {[{ x: 40, y: 70 }, { x: 70, y: 40 }, { x: 100, y: 55 }, { x: 130, y: 25 }].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={5} fill={palette.primary} opacity={hl && hl !== 1 ? 0.2 : 0.7} />
          ))}
          {hl === 5 && <rect x={90} y={10} width={50} height={14} rx={3} fill={palette.primary}><title>Tooltip</title></rect>}
        </svg>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Chart Min Size", value: "300×200px" },
        { label: "Point Radius", value: "4px (6px hover)" },
        { label: "Bubble Size Range", value: "8–24px" },
        { label: "Grid Stroke", value: "0.5px dashed" },
        { label: "Tooltip Padding", value: "4px 8px" },
        { label: "Axis Label Font", value: "9px" },
      ]} />
    </motion.section>
  );
}
