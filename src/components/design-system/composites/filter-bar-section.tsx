"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface FilterBarSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function FilterBarSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: FilterBarSectionProps) {
  const comp = system.components;
  const radius = comp.button.borderRadius || system.spacing.radius.md;
  const inputRadius = comp.input.borderRadius || system.spacing.radius.md;

  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Status: Active", "Type: Design"]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [variant, setVariant] = useState<"inline" | "stacked" | "minimal">("inline");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const removeFilter = (f: string) => setActiveFilters(prev => prev.filter(x => x !== f));
  const clearAll = () => setActiveFilters([]);

  const filterCategories = ["Status", "Type", "Priority", "Owner"];
  const filterOptions: Record<string, string[]> = {
    Status: ["Active", "Pending", "Archived"],
    Type: ["Design", "Engineering", "Research"],
    Priority: ["High", "Medium", "Low"],
    Owner: ["Me", "Team A", "Unassigned"],
  };

  const DropdownBtn = ({ label }: { label: string }) => (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
        style={{
          display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
          border: `1px solid ${openDropdown === label ? palette.primary : palette.border}`,
          borderRadius: radius, backgroundColor: palette.surface, cursor: "pointer",
          fontSize: 13, color: palette.textPrimary, fontFamily: "inherit",
        }}
      >
        {label} <ChevronIcon />
      </button>
      {openDropdown === label && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 20, minWidth: 160,
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: inputRadius, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", overflow: "hidden",
        }}>
          {filterOptions[label]?.map((opt, i) => (
            <div
              key={opt}
              onClick={() => { setActiveFilters(prev => [...prev.filter(f => !f.startsWith(label)), `${label}: ${opt}`]); setOpenDropdown(null); }}
              style={{
                padding: "8px 14px", fontSize: 13, color: palette.textPrimary, cursor: "pointer",
                backgroundColor: activeFilters.includes(`${label}: ${opt}`) ? palette.primary + "10" : "transparent",
                borderBottom: i < (filterOptions[label]?.length ?? 0) - 1 ? `1px solid ${palette.border}` : "none",
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px",
      borderRadius: 99, fontSize: 12, fontWeight: 500, backgroundColor: palette.primary + "12",
      color: palette.primary, border: `1px solid ${palette.primary}25`,
    }}>
      {label}
      <span onClick={onRemove} style={{ cursor: "pointer", display: "flex", opacity: 0.7 }}><XIcon /></span>
    </span>
  );

  return (
    <motion.section id="comp-filter-bar" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Filter Bar</p>
      <p style={sectionDesc}>
        Filter bars combine search, dropdowns, and active filter chips to help users narrow down
        large data sets. They support clear-all actions and multiple layout variants.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 160 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", flex: "1 1 200px",
              border: `1px solid ${palette.border}`, borderRadius: inputRadius, backgroundColor: palette.surface,
            }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              <input
                style={{ border: "none", outline: "none", backgroundColor: "transparent", fontSize: 13, color: palette.textPrimary, fontFamily: "inherit", width: "100%" }}
                placeholder="Search filters..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {filterCategories.slice(0, 3).map(cat => <DropdownBtn key={cat} label={cat} />)}
          </div>
          {activeFilters.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {activeFilters.map(f => <Chip key={f} label={f} onRemove={() => removeFilter(f)} />)}
              <button onClick={clearAll} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 12, color: palette.danger, fontWeight: 600, fontFamily: "inherit" }}>
                Clear all
              </button>
            </div>
          )}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Border Radius", radius], ["Input Radius", inputRadius], ["Chip BG", `${palette.primary}12`], ["Chip Color", "palette.primary"], ["Danger", "palette.danger"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["inline", "stacked", "minimal"] as const).map(v => (
          <button key={v} onClick={() => setVariant(v)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${variant === v ? palette.primary : palette.border}`, backgroundColor: variant === v ? palette.primary + "10" : palette.surface, color: variant === v ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{v}</button>
        ))}
      </div>
      <div style={showcaseBox}>
        {variant === "inline" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", border: `1px solid ${palette.border}`, borderRadius: inputRadius, flex: "1 1 180px" }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              <span style={{ fontSize: 13, color: palette.textSecondary }}>Search...</span>
            </div>
            {filterCategories.slice(0, 4).map(c => (
              <span key={c} style={{ padding: "7px 14px", border: `1px solid ${palette.border}`, borderRadius: radius, fontSize: 13, color: palette.textPrimary, display: "flex", alignItems: "center", gap: 4 }}>{c} <ChevronIcon /></span>
            ))}
          </div>
        )}
        {variant === "stacked" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", border: `1px solid ${palette.border}`, borderRadius: inputRadius, marginBottom: 12 }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              <span style={{ fontSize: 13, color: palette.textSecondary }}>Search...</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {filterCategories.map(c => (
                <span key={c} style={{ padding: "7px 14px", border: `1px solid ${palette.border}`, borderRadius: radius, fontSize: 13, color: palette.textPrimary, display: "flex", alignItems: "center", gap: 4 }}>{c} <ChevronIcon /></span>
              ))}
            </div>
          </div>
        )}
        {variant === "minimal" && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
            {filterCategories.slice(0, 3).map(c => (
              <span key={c} style={{ fontSize: 13, color: palette.primary, cursor: "pointer", fontWeight: 500, textDecoration: "underline", textDecorationColor: palette.primary + "40", textUnderlineOffset: 3 }}>{c}</span>
            ))}
          </div>
        )}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use filter bars" description="Filter bars help narrow results:" items={[
          "Tables or lists with 10+ items",
          "Multi-faceted data with several filterable attributes",
          "Dashboard views requiring quick data segmentation",
          "Search-driven interfaces with refinement needs",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Make filtering intuitive:" items={[
          "Show active filter count on mobile",
          "Persist filters across navigation",
          "Provide clear-all when 2+ filters active",
          "Use chips to make active filters visible",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show active filter chips so users know what's applied.", visual: <div style={{ display: "flex", gap: 4 }}>{["Status: Active", "Type: All"].map(f => <span key={f} style={{ padding: "3px 8px", borderRadius: 99, fontSize: 10, backgroundColor: palette.primary + "12", color: palette.primary }}>{f}</span>)}</div> },
        { type: "dont", text: "Don't hide applied filters behind a dropdown only.", visual: <div style={{ padding: "4px 10px", border: `1px solid ${palette.border}`, borderRadius: 6, fontSize: 10, color: palette.textSecondary }}>2 filters ▾</div> },
        { type: "do", text: "Include a clear-all action when multiple filters are active." },
        { type: "dont", text: "Don't require users to click 'Apply' for every individual filter change." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Container", description: "Wrapper holding all filter controls", x: 5, y: 50 },
        { id: 2, label: "Search input", description: "Free-text search field", x: 15, y: 25 },
        { id: 3, label: "Dropdown filters", description: "Category-based filter menus", x: 55, y: 25 },
        { id: 4, label: "Active chips", description: "Tags showing applied filters", x: 30, y: 75 },
        { id: 5, label: "Clear all", description: "Removes all active filters", x: 80, y: 75 },
      ]} renderPreview={(h) => (
        <div style={{ width: 280, padding: 12, border: `1px solid ${palette.border}`, borderRadius: 8, backgroundColor: palette.surface, opacity: h === 1 ? 1 : undefined }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 8, opacity: h === null || h === 1 ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ flex: 1, height: 24, borderRadius: 4, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", paddingLeft: 6, opacity: h === 2 ? 1 : h === null ? 1 : 0.3 }}>
              <span style={{ fontSize: 9, color: palette.textSecondary }}>🔍 Search</span>
            </div>
            {["A", "B"].map(d => <div key={d} style={{ height: 24, padding: "0 8px", borderRadius: 4, border: `1px solid ${palette.border}`, fontSize: 9, display: "flex", alignItems: "center", color: palette.textSecondary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>{d} ▾</div>)}
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center", opacity: h === null || h === 1 ? 1 : 0.3, transition: "opacity .2s" }}>
            {["Filter 1", "Filter 2"].map(f => <span key={f} style={{ padding: "2px 6px", borderRadius: 99, fontSize: 8, backgroundColor: palette.primary + "15", color: palette.primary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>{f} ×</span>)}
            <span style={{ fontSize: 8, color: palette.danger, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Clear</span>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Filter Button Height", value: "36px" },
        { label: "Search Input Height", value: "36px" },
        { label: "Chip Height", value: "28px" },
        { label: "Dropdown Min Width", value: "160px" },
        { label: "Gap Between Controls", value: "10px" },
        { label: "Chip Border Radius", value: "99px (pill)" },
        { label: "Button Border Radius", value: radius },
      ]} />
    </motion.section>
  );
}
