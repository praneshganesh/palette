"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ChipFilterSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const filterChips = [
  { label: "All", count: 48 },
  { label: "Design", count: 12 },
  { label: "Development", count: 18 },
  { label: "Marketing", count: 8 },
  { label: "Analytics", count: 6 },
  { label: "Research", count: 4 },
  { label: "Operations", count: 9 },
  { label: "Support", count: 3 },
];

const resultItems = [
  { title: "UI Component Library", tag: "Design" },
  { title: "API Integration Guide", tag: "Development" },
  { title: "Q4 Campaign Plan", tag: "Marketing" },
  { title: "User Research Report", tag: "Research" },
  { title: "Dashboard Analytics", tag: "Analytics" },
];

export function ChipFilterSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: ChipFilterSectionProps) {
  const comp = system.components;
  const [selectMode, setSelectMode] = useState<"single" | "multi">("single");
  const [selectedSingle, setSelectedSingle] = useState("All");
  const [selectedMulti, setSelectedMulti] = useState<Set<string>>(new Set());

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24, display: "flex", justifyContent: "center",
  };

  const phoneFrame: React.CSSProperties = {
    width: 300, height: 420, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
  };

  const toggleMulti = (label: string) => {
    setSelectedMulti(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  const isActive = (label: string) => selectMode === "single" ? selectedSingle === label : selectedMulti.has(label);

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: "7px 14px", fontSize: 12, fontWeight: 600,
    borderRadius: 20, border: `1px solid ${active ? palette.primary : palette.border}`,
    backgroundColor: active ? palette.primary + "15" : palette.surface,
    color: active ? palette.primary : palette.textSecondary,
    cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
    display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
  });

  const filteredResults = selectMode === "single"
    ? (selectedSingle === "All" ? resultItems : resultItems.filter(r => r.tag === selectedSingle))
    : (selectedMulti.size === 0 ? resultItems : resultItems.filter(r => selectedMulti.has(r.tag)));

  return (
    <motion.section id="comp-chip-filter" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Chip Filter</p>
      <p style={sectionDesc}>
        Horizontal scrolling chip filters allow single or multi-select filtering with count badges — ideal for mobile category navigation in constrained spaces.
      </p>

      <div style={subsectionLabel}>Select Mode</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["single", "multi"] as const).map(m => (
          <button key={m} onClick={() => setSelectMode(m)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${selectMode === m ? palette.primary : palette.border}`, backgroundColor: selectMode === m ? palette.primary + "15" : palette.surface, color: selectMode === m ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>{m} Select</button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${palette.border}`, fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>Browse</div>
          <div style={{ padding: "12px 0 12px 16px", borderBottom: `1px solid ${palette.border}`, display: "flex", gap: 8, overflowX: "auto" }}>
            {filterChips.map(chip => (
              <button key={chip.label} onClick={() => selectMode === "single" ? setSelectedSingle(chip.label) : toggleMulti(chip.label)} style={chipStyle(isActive(chip.label))}>
                {chip.label}
                <span style={{ fontSize: 10, fontWeight: 700, color: isActive(chip.label) ? palette.primary : palette.textSecondary, backgroundColor: isActive(chip.label) ? palette.primary + "20" : palette.surfaceMuted, borderRadius: 10, padding: "1px 6px", minWidth: 20, textAlign: "center" }}>{chip.count}</span>
              </button>
            ))}
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
            {selectMode === "multi" && selectedMulti.size > 0 && (
              <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>{selectedMulti.size} filter{selectedMulti.size > 1 ? "s" : ""} active — <span onClick={() => setSelectedMulti(new Set())} style={{ color: palette.primary, cursor: "pointer", fontWeight: 600 }}>Clear all</span></div>
            )}
            {filteredResults.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", fontSize: 13, color: palette.textSecondary }}>No results match the current filters</div>
            )}
            {filteredResults.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{item.title}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: palette.primary, backgroundColor: palette.primary + "10", padding: "2px 8px", borderRadius: 10 }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>Chip Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Default", active: false, badge: false },
          { label: "Active", active: true, badge: false },
          { label: "With Count", active: false, badge: true },
          { label: "Active + Count", active: true, badge: true },
        ].map(v => (
          <div key={v.label} style={{ ...previewBox, flexDirection: "column", alignItems: "center", gap: 10, padding: 16 }}>
            <div style={chipStyle(v.active)}>
              Filter
              {v.badge && <span style={{ fontSize: 9, fontWeight: 700, backgroundColor: v.active ? palette.primary + "20" : palette.surfaceMuted, borderRadius: 8, padding: "1px 5px" }}>12</span>}
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary }}>{v.label}</span>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use chip filters" description="Quick inline filtering:" items={[
          "Category browsing in search results",
          "Tag-based content filtering on feeds",
          "E-commerce size, color, or brand selectors",
        ]} />
        <UsageSection palette={palette} title="Single vs. multi select" description="Choose the right behavior:" items={[
          "Single — mutually exclusive categories (tabs alternative)",
          "Multi — combine filters to narrow results",
          "Always show a 'Clear all' option for multi-select",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show count badges to give users confidence about the number of results per filter." },
        { type: "dont", text: "Don't wrap chips to a second row on mobile — use horizontal scroll instead." },
        { type: "do", text: "Keep chip labels short (1–2 words) so many fit in the visible area." },
        { type: "dont", text: "Don't disable chips with zero results — show them dimmed with '0' count." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Scroll container", description: "Horizontal overflow track", x: 50, y: 50 },
        { id: 2, label: "Chip", description: "Tappable filter pill", x: 25, y: 50 },
        { id: 3, label: "Count badge", description: "Result count inside chip", x: 40, y: 50 },
        { id: 4, label: "Active state", description: "Selected chip styling", x: 65, y: 50 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, height: 50, display: "flex", alignItems: "center", gap: 6, padding: "0 10px", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden", opacity: h === 1 ? 1 : h === null ? 1 : 0.5, transition: "opacity 0.2s" }}>
          {["All", "Design", "Dev"].map((c, i) => (
            <div key={c} style={{ padding: "4px 10px", borderRadius: 12, fontSize: 9, fontWeight: 600, border: `1px solid ${i === 0 ? palette.primary : palette.border}`, backgroundColor: i === 0 ? palette.primary + "15" : palette.surface, color: i === 0 ? palette.primary : palette.textSecondary, display: "flex", alignItems: "center", gap: 4, opacity: i === 0 ? (h === 4 ? 1 : h === null ? 1 : 0.4) : (h === 2 ? 1 : h === null ? 1 : 0.4), transition: "opacity 0.2s", flexShrink: 0 }}>
              {c}
              <span style={{ fontSize: 7, backgroundColor: palette.surfaceMuted, borderRadius: 6, padding: "0 3px", opacity: h === 3 ? 1 : h === null ? 1 : 0.4 }}>{i === 0 ? 48 : i === 1 ? 12 : 18}</span>
            </div>
          ))}
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Chip Height", value: "32–36px" },
        { label: "Chip Padding", value: "7–10px horizontal" },
        { label: "Gap Between Chips", value: "8px" },
        { label: "Badge Min Width", value: "20px" },
        { label: "Scroll Container Padding", value: "16px (leading)" },
      ]} />
    </motion.section>
  );
}
