"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface SearchBarSectionProps {
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
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function SearchBarSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: SearchBarSectionProps) {
  const comp = system.components;
  const [heroValue, setHeroValue] = useState("");
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const radius = comp.input.borderRadius || comp.button.borderRadius || system.spacing.radius.md;
  const px = comp.input.paddingX || "14px";
  const py = comp.input.paddingY || "8px";

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
  const inputBase: React.CSSProperties = {
    width: "100%", border: "none", outline: "none", backgroundColor: "transparent",
    fontSize: comp.input.fontSize || "13px", color: palette.textPrimary,
    fontFamily: "inherit",
  };

  return (
    <motion.section id="comp-search-bar" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Search Bar</p>
      <p style={sectionDesc}>
        Search bars let users quickly find content by typing queries. They support suggestions,
        filters, and various display modes to match different navigation contexts.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }}>
          <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`,
              border: `1.5px solid ${focusedId === "hero" ? palette.primary : palette.border}`,
              borderRadius: radius, backgroundColor: palette.surface, transition: "border-color 0.2s",
            }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              <input
                style={inputBase}
                placeholder="Search anything..."
                value={heroValue}
                onChange={(e) => setHeroValue(e.target.value)}
                onFocus={() => setFocusedId("hero")}
                onBlur={() => setFocusedId(null)}
              />
              {heroValue && (
                <button onClick={() => setHeroValue("")} style={{ border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, display: "flex", padding: 0 }}>
                  <XIcon />
                </button>
              )}
            </div>
            {focusedId === "hero" && heroValue.length > 0 && (
              <div style={{
                position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 10,
                backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
                borderRadius: radius, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", overflow: "hidden",
              }}>
                {["Recent search result", "Suggested item", "Related document"].map((s, i) => (
                  <div key={i} style={{ padding: "10px 14px", fontSize: 13, color: palette.textPrimary, cursor: "pointer", borderBottom: i < 2 ? `1px solid ${palette.border}` : "none" }}>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Border Radius", radius)}
          {tokenRow("Padding", `${py} ${px}`)}
          {tokenRow("Font Size", comp.input.fontSize || "13px")}
          {tokenRow("Focus Color", "palette.primary")}
          {tokenRow("Icon Color", "palette.textSecondary")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Default</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`, border: `1px solid ${palette.border}`, borderRadius: radius }}>
            <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
            <span style={{ fontSize: 13, color: palette.textSecondary }}>Search...</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Filters</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`, border: `1px solid ${palette.border}`, borderRadius: radius }}>
            <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
            <span style={{ fontSize: 13, color: palette.textSecondary, flex: 1 }}>Filter results...</span>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, backgroundColor: palette.primary + "15", color: palette.primary, fontWeight: 600 }}>Type: All</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Full-width</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: `10px ${px}`, border: `1px solid ${palette.border}`, borderRadius: radius, backgroundColor: palette.surfaceMuted }}>
            <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
            <span style={{ fontSize: 13, color: palette.textSecondary }}>Search across all sections...</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Expandable</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                display: "flex", alignItems: "center", gap: 8, border: `1px solid ${palette.border}`,
                borderRadius: radius, padding: `${py} ${expanded ? px : py}`,
                backgroundColor: palette.surface, cursor: "pointer", transition: "all 0.3s",
                width: expanded ? "100%" : "auto",
              }}
            >
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              {expanded && <span style={{ fontSize: 13, color: palette.textSecondary, flex: 1, textAlign: "left" }}>Type to search...</span>}
            </button>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Clear Button</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`, border: `1px solid ${palette.border}`, borderRadius: radius }}>
            <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
            <span style={{ fontSize: 13, color: palette.textPrimary, flex: 1 }}>design tokens</span>
            <span style={{ color: palette.textSecondary, display: "flex", cursor: "pointer" }}><XIcon /></span>
          </div>
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { label: "Resting", borderColor: palette.border, text: "Search...", textColor: palette.textSecondary },
          { label: "Focused", borderColor: palette.primary, text: "Search...", textColor: palette.textSecondary },
          { label: "Filled", borderColor: palette.border, text: "Active query", textColor: palette.textPrimary },
          { label: "Disabled", borderColor: palette.border, text: "Search...", textColor: palette.textSecondary },
        ].map((s) => (
          <div key={s.label} style={showcaseBox}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>{s.label}</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`,
              border: `1.5px solid ${s.borderColor}`, borderRadius: radius,
              opacity: s.label === "Disabled" ? 0.4 : 1,
              boxShadow: s.label === "Focused" ? `0 0 0 3px ${palette.primary}20` : "none",
            }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              <span style={{ fontSize: 13, color: s.textColor }}>{s.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use search bars" description="Search bars help users locate content quickly:" items={[
          "Global navigation search in headers",
          "Table or list filtering",
          "Command palettes and quick actions",
          "Content discovery in large datasets",
        ]} />
        <UsageSection palette={palette} title="Search behavior patterns" description="Configure search behavior for the best UX:" items={[
          "Debounce input to avoid excessive API calls",
          "Show recent searches on focus",
          "Display result counts in the suggestions",
          "Support keyboard navigation in dropdowns",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        {
          type: "do", text: "Include a clear/reset button when the search bar has content.",
          visual: (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", border: `1px solid ${palette.border}`, borderRadius: radius, width: 200 }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              <span style={{ flex: 1, fontSize: 12, color: palette.textPrimary }}>query</span>
              <span style={{ color: palette.textSecondary, display: "flex" }}><XIcon /></span>
            </div>
          ),
        },
        {
          type: "dont", text: "Don't make users manually clear the search with backspace only.",
          visual: (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", border: `1px solid ${palette.border}`, borderRadius: radius, width: 200 }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              <span style={{ flex: 1, fontSize: 12, color: palette.textPrimary }}>very long search query text</span>
            </div>
          ),
        },
        {
          type: "do", text: "Use descriptive placeholder text that hints at what can be searched.",
        },
        {
          type: "dont", text: "Don't use vague placeholders like 'Type here...' without context.",
        },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Container", description: "Input wrapper with border and padding", x: 0, y: 50 },
        { id: 2, label: "Search icon", description: "Leading magnifier icon", x: 10, y: 50 },
        { id: 3, label: "Input field", description: "Text entry area with placeholder", x: 50, y: 50 },
        { id: 4, label: "Clear button", description: "Clears the current query", x: 85, y: 50 },
        { id: 5, label: "Suggestions", description: "Dropdown panel with search results", x: 50, y: 90 },
      ]} renderPreview={(h) => (
        <div style={{ position: "relative", width: 300 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
            border: `1.5px solid ${palette.border}`, borderRadius: radius,
            opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
          }}>
            <span style={{ color: palette.textSecondary, display: "flex", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}><SearchIcon /></span>
            <span style={{ flex: 1, fontSize: 13, color: palette.textPrimary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>design system</span>
            <span style={{ color: palette.textSecondary, display: "flex", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}><XIcon /></span>
          </div>
          <div style={{
            marginTop: 4, backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
            borderRadius: radius, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflow: "hidden",
            opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>
            {["Result one", "Result two"].map((r, i) => (
              <div key={i} style={{ padding: "8px 14px", fontSize: 12, color: palette.textPrimary }}>{r}</div>
            ))}
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Height", value: "40px (default)" },
        { label: "Padding X", value: comp.input.paddingX || "14px" },
        { label: "Padding Y", value: comp.input.paddingY || "8px" },
        { label: "Border Radius", value: radius },
        { label: "Icon Size", value: "15px" },
        { label: "Dropdown Gap", value: "4px" },
        { label: "Suggestion Padding", value: "10px 14px" },
      ]} />
    </motion.section>
  );
}
