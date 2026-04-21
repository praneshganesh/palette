"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ResponsiveGridSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const gridItems = [
  { title: "Revenue", value: "$48.2k", icon: "📈" },
  { title: "Users", value: "2,847", icon: "👥" },
  { title: "Orders", value: "1,204", icon: "📦" },
  { title: "Growth", value: "+12.5%", icon: "🚀" },
  { title: "Tickets", value: "89", icon: "🎫" },
  { title: "Rating", value: "4.8", icon: "⭐" },
];

const breakpoints = [
  { label: "Desktop (≥1024px)", cols: 3, key: "desktop" },
  { label: "Tablet (≥768px)", cols: 2, key: "tablet" },
  { label: "Mobile (<768px)", cols: 1, key: "mobile" },
] as const;

type Breakpoint = typeof breakpoints[number]["key"];

export function ResponsiveGridSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ResponsiveGridSectionProps) {
  const comp = system.components;
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>("desktop");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const bp = breakpoints.find(b => b.key === activeBreakpoint)!;

  const renderGridCard = (item: typeof gridItems[0], compact: boolean) => (
    <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: compact ? "12px 14px" : 20, display: "flex", alignItems: compact ? "center" : "flex-start", gap: compact ? 12 : 0, flexDirection: compact ? "row" : "column" }}>
      <div style={{ fontSize: compact ? 20 : 28, marginBottom: compact ? 0 : 8 }}>{item.icon}</div>
      <div>
        <div style={{ fontSize: compact ? 11 : 12, color: palette.textSecondary, fontWeight: 500, marginBottom: 2 }}>{item.title}</div>
        <div style={{ fontSize: compact ? 16 : 22, fontWeight: 700, color: palette.textPrimary, fontFamily: "monospace" }}>{item.value}</div>
      </div>
    </div>
  );

  return (
    <motion.section id="comp-responsive-grid" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Responsive Grid</p>
      <p style={sectionDesc}>
        Grid layouts collapse from multi-column arrangements on desktop to a single-column stack on mobile, maintaining content hierarchy and readability across breakpoints.
      </p>

      <div style={subsectionLabel}>Breakpoint Switcher</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {breakpoints.map(b => (
          <button key={b.key} onClick={() => setActiveBreakpoint(b.key)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${activeBreakpoint === b.key ? palette.primary : palette.border}`, backgroundColor: activeBreakpoint === b.key ? palette.primary + "15" : palette.surface, color: activeBreakpoint === b.key ? palette.primary : palette.textSecondary, cursor: "pointer" }}>
            {b.label}
          </button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={{ maxWidth: activeBreakpoint === "mobile" ? 340 : activeBreakpoint === "tablet" ? 560 : "100%", margin: "0 auto", transition: "max-width 0.3s", display: "grid", gridTemplateColumns: `repeat(${bp.cols}, 1fr)`, gap: 14 }}>
          {gridItems.map(item => (
            <div key={item.title}>{renderGridCard(item, bp.cols === 1)}</div>
          ))}
        </div>
      </div>

      <div style={subsectionLabel}>All Breakpoints Side-by-Side</div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr", gap: 16 }}>
        {breakpoints.map(b => (
          <div key={b.key}>
            <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{b.label}</div>
            <div style={{ ...previewBox, padding: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${b.cols}, 1fr)`, gap: 8 }}>
                {gridItems.slice(0, 4).map(item => (
                  <div key={item.title} style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, padding: b.cols === 1 ? "8px 10px" : 10, display: "flex", alignItems: b.cols === 1 ? "center" : "flex-start", gap: b.cols === 1 ? 8 : 0, flexDirection: b.cols === 1 ? "row" : "column" }}>
                    <span style={{ fontSize: b.cols === 1 ? 14 : 16 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 9, color: palette.textSecondary }}>{item.title}</div>
                      <div style={{ fontSize: b.cols === 1 ? 12 : 14, fontWeight: 700, color: palette.textPrimary }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use responsive grids" description="Content layouts that adapt to viewport:" items={[
          "Dashboard KPI cards and metric tiles",
          "Product or content listing grids",
          "Feature comparison or pricing columns",
        ]} />
        <UsageSection palette={palette} title="Column strategies" description="Common responsive patterns:" items={[
          "3-col → 2-col → 1-col (standard collapse)",
          "4-col → 2-col → 1-col (dense dashboard)",
          "Maintain 2-col minimum on tablet for comparison views",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Adjust card layout (horizontal on mobile, vertical on desktop) when column count changes." },
        { type: "dont", text: "Don't shrink multi-column cards into unreadable tiny boxes — stack them instead." },
        { type: "do", text: "Use consistent gap spacing that scales with the grid (smaller gaps on mobile)." },
        { type: "dont", text: "Don't use a grid when items have no visual relationship — use a simple list." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Grid container", description: "Outer wrapper with gap and column config", x: 50, y: 50 },
        { id: 2, label: "Grid item", description: "Individual card or cell", x: 25, y: 30 },
        { id: 3, label: "Gutter", description: "Spacing between grid items", x: 50, y: 30 },
        { id: 4, label: "Breakpoint rule", description: "Column count change at viewport width", x: 75, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, width: 180, opacity: h === 1 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ height: 36, backgroundColor: palette.primary + "15", border: `1px solid ${palette.primary}30`, borderRadius: system.spacing.radius.sm, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: palette.primary, fontWeight: 600, opacity: h === 2 ? 1 : h === null ? 1 : 0.5 }}>{i + 1}</div>
          ))}
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Desktop Columns", value: "3–4" },
        { label: "Tablet Columns", value: "2" },
        { label: "Mobile Columns", value: "1" },
        { label: "Grid Gap", value: "12–20px" },
        { label: "Card Min Width", value: "240px" },
      ]} />
    </motion.section>
  );
}
