"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ResponsiveTableSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const sampleData = [
  { id: 1, name: "Alex Morgan", role: "Designer", status: "Active", revenue: "$12,400" },
  { id: 2, name: "Jordan Lee", role: "Developer", status: "Away", revenue: "$18,200" },
  { id: 3, name: "Sam Taylor", role: "Manager", status: "Active", revenue: "$24,800" },
  { id: 4, name: "Chris Wu", role: "Analyst", status: "Offline", revenue: "$9,600" },
];

const columns = ["Name", "Role", "Status", "Revenue"];

export function ResponsiveTableSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ResponsiveTableSectionProps) {
  const comp = system.components;
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const statusColor = (s: string) =>
    s === "Active" ? palette.success : s === "Away" ? palette.warning : palette.textSecondary;

  const renderDesktopTable = () => (
    <div style={{ width: "100%", border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}`, padding: "12px 16px" }}>
        {columns.map(c => (
          <div key={c} style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c}</div>
        ))}
      </div>
      {sampleData.map((row, i) => (
        <div key={row.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "12px 16px", borderBottom: i < sampleData.length - 1 ? `1px solid ${palette.border}` : "none", backgroundColor: palette.surface }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{row.name}</div>
          <div style={{ fontSize: 13, color: palette.textSecondary }}>{row.role}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: statusColor(row.status) }} />
            <span style={{ fontSize: 13, color: palette.textSecondary }}>{row.status}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: "monospace" }}>{row.revenue}</div>
        </div>
      ))}
    </div>
  );

  const renderMobileCards = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      {sampleData.map(row => {
        const isOpen = expandedCard === row.id;
        return (
          <div key={row.id} onClick={() => setExpandedCard(isOpen ? null : row.id)} style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 14, cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{row.name}</div>
                <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 2 }}>{row.role}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: statusColor(row.status) }} />
                <span style={{ fontSize: 11, color: palette.textSecondary }}>{row.status}</span>
              </div>
            </div>
            {isOpen && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${palette.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[{ l: "Role", v: row.role }, { l: "Status", v: row.status }, { l: "Revenue", v: row.revenue }].map(f => (
                  <div key={f.l}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.l}</div>
                    <div style={{ fontSize: 13, color: palette.textPrimary, marginTop: 2, fontFamily: f.l === "Revenue" ? "monospace" : "inherit" }}>{f.v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <motion.section id="comp-responsive-table" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Responsive Table</p>
      <p style={sectionDesc}>
        Data tables transform between a full-width column layout on desktop and a condensed card/accordion format on mobile, preserving scannability at every breakpoint.
      </p>

      <div style={subsectionLabel}>Breakpoint Comparison</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["desktop", "mobile"] as const).map(m => (
          <button key={m} onClick={() => setViewMode(m)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${viewMode === m ? palette.primary : palette.border}`, backgroundColor: viewMode === m ? palette.primary + "15" : palette.surface, color: viewMode === m ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>{m === "desktop" ? "≥ 768px Desktop" : "< 768px Mobile"}</button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={{ maxWidth: viewMode === "mobile" ? 340 : "100%", margin: "0 auto", transition: "max-width 0.3s" }}>
          {viewMode === "desktop" ? renderDesktopTable() : renderMobileCards()}
        </div>
      </div>

      <div style={subsectionLabel}>Side-by-Side</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Desktop</div>
          <div style={previewBox}>{renderDesktopTable()}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Mobile</div>
          <div style={previewBox}>{renderMobileCards()}</div>
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use responsive tables" description="Adapt tables for small screens:" items={[
          "Data-heavy views that must remain accessible on mobile",
          "Admin dashboards viewed on tablets and phones",
          "Lists that require sorting/filtering at all breakpoints",
        ]} />
        <UsageSection palette={palette} title="Variant selection" description="Choose the right mobile pattern:" items={[
          "Card list — Each row becomes a card with key-value pairs",
          "Accordion — Collapsed rows expand to show detail fields",
          "Horizontal scroll — Keeps table structure, user scrolls horizontally",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Prioritize the most important columns to show in the collapsed mobile card view." },
        { type: "dont", text: "Don't force users to horizontally scroll wide tables on small screens without a card alternative." },
        { type: "do", text: "Use consistent expand/collapse interactions so users know which cards can open." },
        { type: "dont", text: "Don't hide critical data (e.g. status) behind an expand — surface it immediately." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Table header", description: "Column headers for desktop view", x: 50, y: 10 },
        { id: 2, label: "Row / Card", description: "Data row on desktop, card on mobile", x: 50, y: 50 },
        { id: 3, label: "Expand toggle", description: "Accordion trigger for mobile detail", x: 85, y: 50 },
        { id: 4, label: "Detail fields", description: "Key-value pairs in expanded card", x: 50, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ width: 240 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "6px 10px", backgroundColor: palette.surfaceMuted, borderRadius: `${system.spacing.radius.sm} ${system.spacing.radius.sm} 0 0`, border: `1px solid ${palette.border}`, borderBottom: "none", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {["Name", "Role", "Rev."].map(c => <div key={c} style={{ fontSize: 9, fontWeight: 600, color: palette.textSecondary }}>{c}</div>)}
          </div>
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: `0 0 ${system.spacing.radius.sm} ${system.spacing.radius.sm}`, overflow: "hidden", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {sampleData.slice(0, 2).map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "8px 10px", borderBottom: i === 0 ? `1px solid ${palette.border}` : "none", backgroundColor: palette.surface }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: palette.textPrimary }}>{r.name}</div>
                <div style={{ fontSize: 10, color: palette.textSecondary }}>{r.role}</div>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: palette.textPrimary }}>{r.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Desktop Breakpoint", value: "≥ 768px" },
        { label: "Row Height", value: "44–48px" },
        { label: "Mobile Card Padding", value: "14–16px" },
        { label: "Card Gap", value: "8–12px" },
        { label: "Column Header Font", value: "12px / 600" },
      ]} />
    </motion.section>
  );
}
