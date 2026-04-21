"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface HeatmapSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const GRID_DATA = [
  [2, 5, 8, 3, 7, 1],
  [6, 9, 4, 7, 2, 8],
  [1, 3, 7, 9, 5, 4],
  [8, 6, 2, 4, 9, 3],
  [4, 7, 5, 1, 6, 8],
];
const ROW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const COL_LABELS = ["9am", "10am", "11am", "12pm", "1pm", "2pm"];

const CALENDAR_DATA: Record<number, number> = {};
for (let i = 0; i < 35; i++) CALENDAR_DATA[i] = Math.floor(Math.random() * 10);

function heatColor(value: number, max: number, baseColor: string): string {
  const intensity = Math.round((value / max) * 255);
  const hex = intensity.toString(16).padStart(2, "0");
  return baseColor + hex;
}

function interpolateColor(value: number, max: number, palette: PaletteTokenSet): string {
  const t = value / max;
  if (t < 0.25) return palette.success + "40";
  if (t < 0.5) return palette.info + "60";
  if (t < 0.75) return palette.warning + "80";
  return palette.danger + "B0";
}

export function HeatmapSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: HeatmapSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"basic" | "calendar" | "labeled" | "gradient" | "interactive">("basic");
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

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

  const cellSize = 40;
  const cellGap = 3;

  const renderBasicGrid = (showLabels: boolean, colorFn: (v: number) => string) => (
    <div style={{ display: "inline-block" }}>
      {showLabels && (
        <div style={{ display: "flex", marginLeft: 40 }}>
          {COL_LABELS.map((l, i) => (
            <div key={i} style={{ width: cellSize + cellGap, textAlign: "center", fontSize: 10, color: palette.textSecondary }}>{l}</div>
          ))}
        </div>
      )}
      {GRID_DATA.map((row, r) => (
        <div key={r} style={{ display: "flex", alignItems: "center" }}>
          {showLabels && <span style={{ fontSize: 10, color: palette.textSecondary, width: 36, textAlign: "right", marginRight: 4 }}>{ROW_LABELS[r]}</span>}
          {row.map((v, c) => {
            const isHov = hoveredCell?.r === r && hoveredCell?.c === c;
            return (
              <div key={c}
                onMouseEnter={() => setHoveredCell({ r, c })} onMouseLeave={() => setHoveredCell(null)}
                style={{
                  width: cellSize, height: cellSize, margin: cellGap / 2,
                  borderRadius: system.spacing.radius.sm, backgroundColor: colorFn(v),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600, color: v > 5 ? "#fff" : palette.textPrimary,
                  border: isHov ? `2px solid ${palette.primary}` : "2px solid transparent",
                  cursor: "pointer", transition: "border 0.15s",
                  position: "relative",
                }}>
                {(variant === "labeled" || variant === "interactive") && v}
                {variant === "interactive" && isHov && (
                  <div style={{
                    position: "absolute", bottom: "110%", left: "50%", transform: "translateX(-50%)",
                    backgroundColor: palette.primary, color: "#fff", padding: "3px 8px",
                    borderRadius: system.spacing.radius.sm, fontSize: 10, fontWeight: 600, whiteSpace: "nowrap",
                    zIndex: 10,
                  }}>
                    {ROW_LABELS[r]} {COL_LABELS[c]}: {v}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderCalendar = () => {
    const weeks = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <div style={{ display: "inline-block" }}>
        <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
          {weeks.map((d, i) => (
            <div key={i} style={{ width: 20, height: 20, textAlign: "center", fontSize: 9, color: palette.textSecondary, lineHeight: "20px" }}>{d}</div>
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, w) => (
          <div key={w} style={{ display: "flex", gap: 2, marginBottom: 2 }}>
            {Array.from({ length: 7 }).map((_, d) => {
              const idx = w * 7 + d;
              const v = CALENDAR_DATA[idx] ?? 0;
              const isHov = hoveredCell?.r === w && hoveredCell?.c === d;
              return (
                <div key={d}
                  onMouseEnter={() => setHoveredCell({ r: w, c: d })} onMouseLeave={() => setHoveredCell(null)}
                  style={{
                    width: 20, height: 20, borderRadius: 3,
                    backgroundColor: v === 0 ? palette.border + "30" : palette.primary + ((Math.min(v, 9) / 9) * 200 + 55).toString(16).slice(0, 2).padStart(2, "0"),
                    border: isHov ? `1px solid ${palette.primary}` : "1px solid transparent",
                    cursor: "pointer", transition: "border 0.15s",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderChart = () => {
    switch (variant) {
      case "calendar": return renderCalendar();
      case "labeled": return renderBasicGrid(true, (v) => heatColor(v, 9, palette.primary));
      case "gradient": return (
        <div>
          {renderBasicGrid(true, (v) => interpolateColor(v, 9, palette))}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, marginLeft: 40 }}>
            <span style={{ fontSize: 10, color: palette.textSecondary }}>Low</span>
            {[palette.success + "40", palette.info + "60", palette.warning + "80", palette.danger + "B0"].map((c, i) => (
              <div key={i} style={{ width: 24, height: 12, backgroundColor: c, borderRadius: 2 }} />
            ))}
            <span style={{ fontSize: 10, color: palette.textSecondary }}>High</span>
          </div>
        </div>
      );
      case "interactive": return renderBasicGrid(true, (v) => heatColor(v, 9, palette.primary));
      default: return renderBasicGrid(false, (v) => heatColor(v, 9, palette.primary));
    }
  };

  return (
    <motion.section id="comp-heatmap" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Heatmap</p>
      <p style={sectionDesc}>
        Heatmaps use color intensity across a grid to reveal patterns, density, and distribution in matrix-structured data.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
          {renderChart()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Cell Size", "40×40px")}
          {tokenRow("Cell Gap", "3px")}
          {tokenRow("Corner Radius", system.spacing.radius.sm)}
          {tokenRow("Hover Border", "2px solid primary")}
          {tokenRow("Color Range", "primary @ 0–100%")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("basic", "Basic Grid")}
        {variantBtn("calendar", "Calendar")}
        {variantBtn("labeled", "With Labels")}
        {variantBtn("gradient", "Gradient Scale")}
        {variantBtn("interactive", "Interactive Hover")}
      </div>
      <div style={showcaseBox}>{renderChart()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use for matrix data with two categorical axes", "Provide a color legend for the intensity scale", "Calendar heatmaps work well for contribution/activity data", "Keep cell sizes consistent"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't use too many colors in the scale", "Don't omit axis labels", "Don't use for small datasets (<9 cells)"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Color Scale: Use a sequential single-hue scale for magnitude data. Diverging scales for data with a meaningful midpoint." },
        { type: "dont", text: "Cell Aspect Ratio: Square cells work best. Rectangular cells can distort perception of relative values." },
        { type: "do", text: "Interactivity: Hover should reveal exact values. Consider cross-highlighting rows/columns on hover." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Cell", description: "Individual colored grid unit", x: 50, y: 45 },
        { id: 2, label: "Row Label", description: "Left-side category", x: 5, y: 45 },
        { id: 3, label: "Column Label", description: "Top category", x: 50, y: 5 },
        { id: 4, label: "Color Legend", description: "Scale reference", x: 80, y: 90 },
      ]} renderPreview={(hl) => (
        <svg width={160} height={100}>
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 4 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={35 + c * 28} y={15 + r * 28} width={24} height={24} rx={3}
                fill={palette.primary} opacity={hl && hl !== 1 ? 0.1 : 0.2 + (r * 4 + c) * 0.06} />
            ))
          )}
          {hl === 2 && ROW_LABELS.slice(0, 3).map((l, i) => (
            <text key={i} x={30} y={30 + i * 28} textAnchor="end" fontSize={8} fill={palette.textSecondary}>{l}</text>
          ))}
          {hl === 3 && COL_LABELS.slice(0, 4).map((l, i) => (
            <text key={i} x={47 + i * 28} y={10} textAnchor="middle" fontSize={7} fill={palette.textSecondary}>{l}</text>
          ))}
          {hl === 4 && (
            <g>
              <rect x={35} y={88} width={80} height={8} rx={2} fill={`url(#hm-leg)`} />
              <defs><linearGradient id="hm-leg"><stop offset="0%" stopColor={palette.primary} stopOpacity={0.1} /><stop offset="100%" stopColor={palette.primary} stopOpacity={0.9} /></linearGradient></defs>
            </g>
          )}
        </svg>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Cell Size", value: "40×40px (20×20 calendar)" },
        { label: "Cell Gap", value: "2–3px" },
        { label: "Cell Border Radius", value: system.spacing.radius.sm },
        { label: "Label Font Size", value: "10px" },
        { label: "Hover Border", value: "2px solid" },
        { label: "Tooltip Font Size", value: "10px" },
      ]} />
    </motion.section>
  );
}
