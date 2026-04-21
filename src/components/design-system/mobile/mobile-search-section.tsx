"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface MobileSearchSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const recentSearches = ["Dashboard layouts", "Color tokens", "Typography scale", "Form validation"];
const suggestions = ["Button variants", "Card components", "Navigation patterns", "Modal dialogs", "Input styles"];

export function MobileSearchSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: MobileSearchSectionProps) {
  const comp = system.components;
  const [searchMode, setSearchMode] = useState<"collapsed" | "expanded" | "fullscreen">("collapsed");
  const [query, setQuery] = useState("");
  const [demoFocused, setDemoFocused] = useState(false);

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
    width: 300, height: 480, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const searchInput: React.CSSProperties = {
    width: "100%", padding: "10px 14px 10px 36px", fontSize: 14,
    border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md,
    backgroundColor: palette.surfaceMuted, color: palette.textPrimary,
    outline: "none", fontFamily: system.typography.bodyFont,
  };

  const filteredSuggestions = query
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  const renderCollapsedSearch = () => (
    <div style={phoneFrame}>
      <div style={{ padding: "16px", borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: palette.textPrimary }}>Home</span>
        <div onClick={() => setSearchMode("expanded")} style={{ width: 36, height: 36, borderRadius: system.spacing.radius.md, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>🔍</div>
      </div>
      <div style={{ padding: 20, textAlign: "center", fontSize: 13, color: palette.textSecondary }}>Tap the search icon to expand</div>
    </div>
  );

  const renderExpandedSearch = () => (
    <div style={phoneFrame}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", gap: 10 }}>
        <span onClick={() => setSearchMode("collapsed")} style={{ fontSize: 18, cursor: "pointer", color: palette.textSecondary }}>←</span>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: palette.textSecondary }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setDemoFocused(true)} placeholder="Search components…" style={searchInput} />
          {query && <span onClick={() => setQuery("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, cursor: "pointer", color: palette.textSecondary }}>✕</span>}
        </div>
      </div>
      <div style={{ padding: "12px 16px" }}>
        {!query && (
          <>
            <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Recent</div>
            {recentSearches.map(s => (
              <div key={s} onClick={() => setQuery(s)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${palette.border}20`, cursor: "pointer" }}>
                <span style={{ fontSize: 12, color: palette.textSecondary }}>🕐</span>
                <span style={{ fontSize: 13, color: palette.textPrimary }}>{s}</span>
              </div>
            ))}
          </>
        )}
        {(query || demoFocused) && (
          <>
            <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>{query ? "Results" : "Suggestions"}</div>
            {filteredSuggestions.map(s => (
              <div key={s} onClick={() => setQuery(s)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${palette.border}20`, cursor: "pointer" }}>
                <span style={{ fontSize: 12, color: palette.textSecondary }}>🔍</span>
                <span style={{ fontSize: 13, color: palette.textPrimary }}>{s}</span>
              </div>
            ))}
            {query && filteredSuggestions.length === 0 && (
              <div style={{ padding: 20, textAlign: "center", fontSize: 13, color: palette.textSecondary }}>No results for &ldquo;{query}&rdquo;</div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <motion.section id="comp-mobile-search" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Mobile Search</p>
      <p style={sectionDesc}>
        Mobile search expands from a compact icon into a full-screen experience with recent searches, live suggestions, and clear results — optimized for thumb-driven input.
      </p>

      <div style={subsectionLabel}>Search States</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["collapsed", "expanded"] as const).map(m => (
          <button key={m} onClick={() => { setSearchMode(m); if (m === "collapsed") setQuery(""); }} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${searchMode === m ? palette.primary : palette.border}`, backgroundColor: searchMode === m ? palette.primary + "15" : palette.surface, color: searchMode === m ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>{m}</button>
        ))}
      </div>
      <div style={previewBox}>
        {searchMode === "collapsed" ? renderCollapsedSearch() : renderExpandedSearch()}
      </div>

      <div style={subsectionLabel}>Side-by-Side</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, textAlign: "center" }}>Collapsed</div>
          <div style={{ ...previewBox, padding: 12 }}>{renderCollapsedSearch()}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, textAlign: "center" }}>Expanded + Suggestions</div>
          <div style={{ ...previewBox, padding: 12 }}>{renderExpandedSearch()}</div>
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use mobile search" description="Finding content on small screens:" items={[
          "Apps with large content catalogues that need filtering",
          "E-commerce product search with autocomplete",
          "Knowledge bases or documentation sites",
        ]} />
        <UsageSection palette={palette} title="Search enhancements" description="Improve the experience with:" items={[
          "Recent searches — let users re-run past queries",
          "Suggestions — auto-complete as the user types",
          "Scoped search — filter by category before typing",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show recent searches immediately on focus to speed up repeat queries." },
        { type: "dont", text: "Don't require a minimum character count before showing suggestions." },
        { type: "do", text: "Provide a clear 'x' button to clear the query and a back arrow to exit." },
        { type: "dont", text: "Don't auto-submit on typing — let the user review suggestions first." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Search trigger", description: "Icon button that expands to input", x: 85, y: 15 },
        { id: 2, label: "Search input", description: "Text field with icon and clear button", x: 50, y: 15 },
        { id: 3, label: "Recent list", description: "Previously searched terms", x: 50, y: 45 },
        { id: 4, label: "Suggestions", description: "Autocomplete results as user types", x: 50, y: 70 },
      ]} renderPreview={(h) => (
        <div style={{ width: 180, backgroundColor: palette.surface, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 10px", borderBottom: `1px solid ${palette.border}`, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <span style={{ fontSize: 10, color: palette.textSecondary }}>🔍</span>
            <div style={{ flex: 1, height: 3, backgroundColor: palette.border, borderRadius: 2 }} />
            <span style={{ fontSize: 8, color: palette.textSecondary, opacity: h === 1 ? 1 : h === null ? 1 : 0.3 }}>✕</span>
          </div>
          <div style={{ padding: "6px 10px" }}>
            {[0, 1].map(i => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", opacity: h === 3 && i === 0 ? 1 : h === 4 && i === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                <span style={{ fontSize: 8, color: palette.textSecondary }}>{i === 0 ? "🕐" : "🔍"}</span>
                <div style={{ height: 3, width: i === 0 ? "60%" : "45%", backgroundColor: palette.border, borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Search Bar Height", value: "40–48px" },
        { label: "Trigger Icon Size", value: "36×36px" },
        { label: "Input Font", value: "14–16px" },
        { label: "Suggestion Row Height", value: "44px" },
        { label: "Recent Icon Size", value: "16×16px" },
      ]} />
    </motion.section>
  );
}
