"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface PieChartSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const SLICES = [
  { label: "Product", value: 35 },
  { label: "Marketing", value: 25 },
  { label: "Engineering", value: 20 },
  { label: "Design", value: 12 },
  { label: "Other", value: 8 },
];

function getSliceColors(p: PaletteTokenSet) {
  return [p.primary, p.secondary, p.info, p.warning, p.success];
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M${start.x},${start.y} A${r},${r} 0 ${large} 0 ${end.x},${end.y}`;
}

function piePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const a = arcPath(cx, cy, r, startDeg, endDeg);
  return `${a} L${cx},${cy} Z`;
}

export function PieChartSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: PieChartSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"pie" | "donut" | "semi" | "center" | "legend" | "nested">("pie");
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const colors = getSliceColors(palette);
  const total = SLICES.reduce((s, sl) => s + sl.value, 0);
  const cx = 100, cy = 100, r = 80;

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

  const renderPieSlices = (innerR = 0, startAngle = 0, sweep = 360) => {
    let cumDeg = startAngle;
    return SLICES.map((sl, i) => {
      const deg = (sl.value / total) * sweep;
      const start = cumDeg;
      cumDeg += deg;
      const isHovered = hoveredSlice === i;
      if (innerR > 0) {
        const outerStart = polarToCartesian(cx, cy, r, start);
        const outerEnd = polarToCartesian(cx, cy, r, start + deg);
        const innerStart = polarToCartesian(cx, cy, innerR, start + deg);
        const innerEnd = polarToCartesian(cx, cy, innerR, start);
        const largeArc = deg > 180 ? 1 : 0;
        const d = [
          `M${outerStart.x},${outerStart.y}`,
          `A${r},${r} 0 ${largeArc} 1 ${outerEnd.x},${outerEnd.y}`,
          `L${innerStart.x},${innerStart.y}`,
          `A${innerR},${innerR} 0 ${largeArc} 0 ${innerEnd.x},${innerEnd.y}`,
          "Z",
        ].join(" ");
        return (
          <path key={i} d={d} fill={colors[i % colors.length]}
            opacity={isHovered ? 1 : 0.8} style={{ cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={() => setHoveredSlice(i)} onMouseLeave={() => setHoveredSlice(null)} />
        );
      }
      return (
        <path key={i} d={piePath(cx, cy, r, start, start + deg)} fill={colors[i % colors.length]}
          opacity={isHovered ? 1 : 0.8} style={{ cursor: "pointer", transition: "opacity 0.2s" }}
          onMouseEnter={() => setHoveredSlice(i)} onMouseLeave={() => setHoveredSlice(null)} />
      );
    });
  };

  const renderLegend = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginLeft: 16 }}>
      {SLICES.map((sl, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: hoveredSlice === i ? palette.textPrimary : palette.textSecondary, fontWeight: hoveredSlice === i ? 600 : 400 }}
          onMouseEnter={() => setHoveredSlice(i)} onMouseLeave={() => setHoveredSlice(null)}>
          <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: colors[i % colors.length] }} />
          {sl.label} ({sl.value}%)
        </div>
      ))}
    </div>
  );

  const renderChart = () => {
    switch (variant) {
      case "donut":
        return <svg width={200} height={200}>{renderPieSlices(50)}</svg>;
      case "semi":
        return <svg width={200} height={120} viewBox="0 0 200 120">{renderPieSlices(45, 180, 180)}</svg>;
      case "center":
        return (
          <div style={{ position: "relative", width: 200, height: 200 }}>
            <svg width={200} height={200}>{renderPieSlices(55)}</svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>
                {hoveredSlice !== null ? `${SLICES[hoveredSlice].value}%` : "100%"}
              </div>
              <div style={{ fontSize: 11, color: palette.textSecondary }}>
                {hoveredSlice !== null ? SLICES[hoveredSlice].label : "Total"}
              </div>
            </div>
          </div>
        );
      case "legend":
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width={200} height={200}>{renderPieSlices()}</svg>
            {renderLegend()}
          </div>
        );
      case "nested":
        return (
          <svg width={200} height={200}>
            {renderPieSlices(60)}
            {(() => {
              let cum = 0;
              return SLICES.slice(0, 3).map((sl, i) => {
                const deg = (sl.value / (SLICES[0].value + SLICES[1].value + SLICES[2].value)) * 360;
                const start = cum; cum += deg;
                const os = polarToCartesian(cx, cy, 55, start);
                const oe = polarToCartesian(cx, cy, 55, start + deg);
                const is2 = polarToCartesian(cx, cy, 30, start + deg);
                const ie2 = polarToCartesian(cx, cy, 30, start);
                const la = deg > 180 ? 1 : 0;
                const d = `M${os.x},${os.y} A55,55 0 ${la} 1 ${oe.x},${oe.y} L${is2.x},${is2.y} A30,30 0 ${la} 0 ${ie2.x},${ie2.y} Z`;
                return <path key={i} d={d} fill={colors[i]} opacity={0.5} />;
              });
            })()}
          </svg>
        );
      default:
        return <svg width={200} height={200}>{renderPieSlices()}</svg>;
    }
  };

  return (
    <motion.section id="comp-pie-donut" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Pie &amp; Donut Chart</p>
      <p style={sectionDesc}>
        Pie and donut charts represent part-to-whole relationships using circular segments proportional to each category's share.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
          {renderChart()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Outer Radius", "80px")}
          {tokenRow("Donut Inner", "50-55px")}
          {tokenRow("Segment Gap", "1px stroke")}
          {tokenRow("Hover Opacity", "1.0 (0.8 rest)")}
          {tokenRow("Colors", "5-color palette")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("pie", "Pie")}
        {variantBtn("donut", "Donut")}
        {variantBtn("semi", "Semi-circle")}
        {variantBtn("center", "Center Label")}
        {variantBtn("legend", "With Legend")}
        {variantBtn("nested", "Nested Rings")}
      </div>
      <div style={showcaseBox}>{renderChart()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use for part-to-whole comparisons", "Limit to 5-7 slices maximum", "Use donut variant for center metrics", "Always include a legend or labels"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't use for comparisons between datasets", "Don't use 3D or exploded slices", "Don't rely solely on color—add labels"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Slice Count: Combine small slices (<5%) into 'Other'. More than 7 slices makes the chart unreadable." },
        { type: "dont", text: "Donut vs Pie: Prefer donut for dashboards—the center can display a KPI. Pie for print or simple compositions." },
        { type: "do", text: "Color: Use palette-derived colors with sufficient contrast. Avoid adjacent hues for neighboring slices." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Segment", description: "Individual slice representing a category", x: 65, y: 30 },
        { id: 2, label: "Center Hole", description: "Empty center in donut variant", x: 50, y: 50 },
        { id: 3, label: "Label", description: "Value/percentage text", x: 80, y: 60 },
        { id: 4, label: "Legend", description: "Color-coded category list", x: 90, y: 85 },
      ]} renderPreview={(hl) => (
        <svg width={120} height={120}>
          <circle cx={60} cy={60} r={50} fill={palette.primary} opacity={hl && hl !== 1 ? 0.2 : 0.8} />
          <path d={piePath(60, 60, 50, 0, 130)} fill={palette.secondary} opacity={hl && hl !== 1 ? 0.2 : 0.8} />
          <path d={piePath(60, 60, 50, 130, 230)} fill={palette.info} opacity={hl && hl !== 1 ? 0.2 : 0.8} />
          <circle cx={60} cy={60} r={28} fill={palette.surface} opacity={hl && hl !== 2 ? 0.3 : 1} />
          {hl === 3 && <text x={60} y={63} textAnchor="middle" fontSize={11} fontWeight={700} fill={palette.textPrimary}>35%</text>}
        </svg>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Chart Size", value: "200×200px" },
        { label: "Outer Radius", value: "80px" },
        { label: "Donut Inner Radius", value: "50–55px" },
        { label: "Legend Item Gap", value: "6px" },
        { label: "Label Font Size", value: "11–12px" },
        { label: "Hover Opacity Transition", value: "0.2s" },
      ]} />
    </motion.section>
  );
}
