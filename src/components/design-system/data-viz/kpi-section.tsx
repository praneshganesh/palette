"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface KpiSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const KPI_DATA = [
  { label: "Revenue", value: "$48.2K", trend: +12.5, sparkline: [20, 35, 28, 42, 38, 52, 48] },
  { label: "Users", value: "2,847", trend: +8.3, sparkline: [10, 18, 15, 22, 28, 25, 32] },
  { label: "Churn", value: "3.2%", trend: -1.4, sparkline: [30, 28, 32, 25, 22, 20, 18] },
  { label: "NPS", value: "72", trend: +5, sparkline: [55, 60, 58, 65, 68, 70, 72] },
];

function MiniSparkline({ data, color, width = 80, height = 24 }: { data: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const xStep = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * xStep},${height - ((v - min) / range) * height}`).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProgressRing({ value, max, color, bg, size = 44, stroke = 4 }: {
  value: number; max: number; color: string; bg: string; size?: number; stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${circ * pct} ${circ * (1 - pct)}`} strokeLinecap="round" />
    </svg>
  );
}

export function KpiSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: KpiSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"simple" | "trend" | "sparkline" | "ring" | "comparison" | "dashboard">("simple");

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

  const cardBase: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 20,
  };

  const trendArrow = (val: number) => (
    <span style={{ fontSize: 12, fontWeight: 600, color: val >= 0 ? palette.success : palette.danger, display: "inline-flex", alignItems: "center", gap: 2 }}>
      <svg width={10} height={10} viewBox="0 0 10 10" fill="currentColor" style={{ transform: val < 0 ? "rotate(180deg)" : undefined }}>
        <path d="M5 1L9 6H1L5 1Z" />
      </svg>
      {Math.abs(val)}%
    </span>
  );

  const renderCards = () => {
    switch (variant) {
      case "trend":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {KPI_DATA.map((kpi, i) => (
              <div key={i} style={cardBase}>
                <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 8 }}>{kpi.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>{kpi.value}</span>
                  {trendArrow(kpi.trend)}
                </div>
              </div>
            ))}
          </div>
        );
      case "sparkline":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {KPI_DATA.map((kpi, i) => (
              <div key={i} style={cardBase}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div>
                    <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 6 }}>{kpi.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>{kpi.value}</div>
                  </div>
                  <MiniSparkline data={kpi.sparkline} color={kpi.trend >= 0 ? palette.success : palette.danger} />
                </div>
              </div>
            ))}
          </div>
        );
      case "ring":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {KPI_DATA.map((kpi, i) => {
              const pctVal = parseInt(kpi.value.replace(/[^0-9]/g, "")) || 50;
              return (
                <div key={i} style={{ ...cardBase, display: "flex", alignItems: "center", gap: 16 }}>
                  <ProgressRing value={pctVal} max={100} color={palette.primary} bg={palette.border + "40"} />
                  <div>
                    <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 4 }}>{kpi.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>{kpi.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      case "comparison":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {KPI_DATA.map((kpi, i) => (
              <div key={i} style={cardBase}>
                <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 8 }}>{kpi.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>{kpi.value}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: palette.textSecondary }}>
                  <span>vs last period</span>
                  {trendArrow(kpi.trend)}
                </div>
                <div style={{ height: 4, borderRadius: 2, backgroundColor: palette.border + "30", marginTop: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${50 + kpi.trend}%`, backgroundColor: kpi.trend >= 0 ? palette.success : palette.danger, borderRadius: 2, transition: "width 0.3s" }} />
                </div>
              </div>
            ))}
          </div>
        );
      case "dashboard":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {KPI_DATA.map((kpi, i) => (
              <div key={i} style={{ ...cardBase, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: palette.textSecondary, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{kpi.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: palette.textPrimary, marginBottom: 6, fontFamily: system.typography.headingFont }}>{kpi.value}</div>
                <MiniSparkline data={kpi.sparkline} color={palette.primary} width={60} height={18} />
                <div style={{ marginTop: 6 }}>{trendArrow(kpi.trend)}</div>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {KPI_DATA.map((kpi, i) => (
              <div key={i} style={cardBase}>
                <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 8 }}>{kpi.label}</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>{kpi.value}</div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <motion.section id="comp-kpi-cards" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>KPI Cards</p>
      <p style={sectionDesc}>
        KPI cards present key performance indicators at a glance—combining large values, trends, and micro-visualizations for dashboard displays.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 220 }}>
          {renderCards()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Card Radius", system.spacing.radius.lg)}
          {tokenRow("Value Font", system.typography.headingFont)}
          {tokenRow("Value Size", "28–32px")}
          {tokenRow("Label Size", "12px")}
          {tokenRow("Trend Up", "palette.success")}
          {tokenRow("Trend Down", "palette.danger")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("simple", "Simple Value")}
        {variantBtn("trend", "With Trend")}
        {variantBtn("sparkline", "With Sparkline")}
        {variantBtn("ring", "Progress Ring")}
        {variantBtn("comparison", "Comparison")}
        {variantBtn("dashboard", "Dashboard Grid")}
      </div>
      <div style={showcaseBox}>{renderCards()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use for at-a-glance key metrics", "Pair values with context (trends, comparisons)", "Keep to 3-6 KPIs per view", "Use consistent card sizing in a grid"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't show too many decimal places", "Don't mix units without labels", "Don't use without providing time context"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Hierarchy: The numeric value should be the most prominent element. Support with label, trend, and optional sparkline." },
        { type: "dont", text: "Trends: Green for positive movement, red for negative. Use arrows and percentage deltas for clarity." },
        { type: "do", text: "Density: Dashboard grids can use compact cards. Detail views can use larger cards with sparklines and progress rings." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Value", description: "Primary metric number", x: 30, y: 50 },
        { id: 2, label: "Label", description: "Metric name/description", x: 30, y: 25 },
        { id: 3, label: "Trend", description: "Direction arrow + percentage", x: 70, y: 50 },
        { id: 4, label: "Sparkline", description: "Mini trend line", x: 70, y: 30 },
        { id: 5, label: "Card", description: "Container with border and radius", x: 50, y: 85 },
      ]} renderPreview={(hl) => (
        <div style={{
          width: 160, padding: 14,
          border: `1px solid ${hl === 5 ? palette.primary : palette.border}`,
          borderRadius: system.spacing.radius.lg, backgroundColor: palette.surface,
          opacity: 1,
        }}>
          <div style={{ fontSize: 10, color: palette.textSecondary, marginBottom: 4, opacity: hl && hl !== 2 ? 0.3 : 1 }}>Revenue</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, opacity: hl && hl !== 1 ? 0.3 : 1 }}>$48.2K</span>
            <span style={{ fontSize: 10, color: palette.success, fontWeight: 600, opacity: hl && hl !== 3 ? 0.3 : 1 }}>+12.5%</span>
          </div>
          <div style={{ marginTop: 6, opacity: hl && hl !== 4 ? 0.3 : 1 }}>
            <MiniSparkline data={[20, 35, 28, 42, 38, 52, 48]} color={palette.success} width={130} height={16} />
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Card Padding", value: "16–20px" },
        { label: "Card Border Radius", value: system.spacing.radius.lg },
        { label: "Value Font Size", value: "22–32px" },
        { label: "Label Font Size", value: "10–12px" },
        { label: "Sparkline Height", value: "18–24px" },
        { label: "Progress Ring Size", value: "44px, 4px stroke" },
        { label: "Grid Gap", value: "12–16px" },
      ]} />
    </motion.section>
  );
}
