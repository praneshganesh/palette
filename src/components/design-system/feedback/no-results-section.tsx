"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface NoResultsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type NoResultsVariant = "search" | "filter" | "empty-category" | "suggestions";

export function NoResultsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: NoResultsSectionProps) {
  const comp = system.components;
  const [activeVariant, setActiveVariant] = useState<NoResultsVariant>("search");
  const [searchTerm, setSearchTerm] = useState("xyzabc");
  const [activeFilters, setActiveFilters] = useState(["Status: Active", "Type: Premium", "Region: EU"]);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const variants: { id: NoResultsVariant; label: string }[] = [
    { id: "search", label: "Search No Results" },
    { id: "filter", label: "Filter No Results" },
    { id: "empty-category", label: "Empty Category" },
    { id: "suggestions", label: "With Suggestions" },
  ];

  const renderSearchNoResults = () => (
    <div style={{ textAlign: "center", padding: "40px 24px" }}>
      <div style={{
        width: 56, height: 56, borderRadius: system.spacing.radius.xl,
        backgroundColor: palette.info + "10", margin: "0 auto 20px",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
      }}>🔍</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
        No results for &quot;{searchTerm}&quot;
      </div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20, maxWidth: 360, margin: "0 auto 20px" }}>
        We couldn&apos;t find anything matching your search. Try different keywords or check for typos.
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setSearchTerm("")} style={{
          padding: `${comp.button.paddingY || "8px"} ${comp.button.paddingX || "16px"}`,
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          backgroundColor: "transparent", color: palette.primary,
          border: `1px solid ${palette.primary}30`,
          borderRadius: comp.button.borderRadius || system.spacing.radius.md,
        }}>
          Clear search
        </button>
      </div>
    </div>
  );

  const renderFilterNoResults = () => (
    <div style={{ textAlign: "center", padding: "40px 24px" }}>
      <div style={{
        width: 56, height: 56, borderRadius: system.spacing.radius.xl,
        backgroundColor: palette.warning + "10", margin: "0 auto 20px",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
      }}>⊘</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
        No items match your filters
      </div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16, maxWidth: 360, margin: "0 auto 16px" }}>
        Try removing or adjusting some filters to see more results.
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 20 }}>
        {activeFilters.map((filter, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 10px", fontSize: 12,
            backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.xl, color: palette.textSecondary,
          }}>
            {filter}
            <span onClick={() => setActiveFilters(f => f.filter((_, fi) => fi !== i))} style={{
              cursor: "pointer", fontSize: 10, color: palette.textSecondary,
              width: 14, height: 14, borderRadius: "50%",
              backgroundColor: palette.border + "60",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>✕</span>
          </span>
        ))}
      </div>
      <button onClick={() => setActiveFilters(["Status: Active", "Type: Premium", "Region: EU"])} style={{
        padding: `${comp.button.paddingY || "8px"} ${comp.button.paddingX || "16px"}`,
        fontSize: 13, fontWeight: 500, cursor: "pointer",
        backgroundColor: "transparent", color: palette.primary,
        border: `1px solid ${palette.primary}30`,
        borderRadius: comp.button.borderRadius || system.spacing.radius.md,
      }}>
        Clear all filters
      </button>
    </div>
  );

  const renderEmptyCategory = () => (
    <div style={{ textAlign: "center", padding: "40px 24px" }}>
      <div style={{
        width: 56, height: 56, borderRadius: system.spacing.radius.xl,
        backgroundColor: palette.primary + "10", margin: "0 auto 20px",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
      }}>📂</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
        This category is empty
      </div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20, maxWidth: 360, margin: "0 auto 20px" }}>
        No items have been added to this category yet. Browse other categories or add items here.
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button style={{
          padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          backgroundColor: palette.primary, color: "#fff", border: "none",
          borderRadius: comp.button.borderRadius || system.spacing.radius.md,
        }}>Add item</button>
        <button style={{
          padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          backgroundColor: "transparent", color: palette.textSecondary,
          border: `1px solid ${palette.border}`,
          borderRadius: comp.button.borderRadius || system.spacing.radius.md,
        }}>Browse categories</button>
      </div>
    </div>
  );

  const renderSuggestions = () => {
    const suggestions = ["design system", "components", "dashboard templates", "color palette"];
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <div style={{
          width: 56, height: 56, borderRadius: system.spacing.radius.xl,
          backgroundColor: palette.info + "10", margin: "0 auto 20px",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
        }}>💡</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
          No results found
        </div>
        <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20, maxWidth: 360, margin: "0 auto 20px" }}>
          Try one of these popular searches instead:
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 20 }}>
          {suggestions.map((s, i) => (
            <button key={i} style={{
              padding: "6px 14px", fontSize: 12, cursor: "pointer",
              backgroundColor: palette.primary + "08", color: palette.primary,
              border: `1px solid ${palette.primary}20`,
              borderRadius: system.spacing.radius.xl, fontFamily: system.typography.bodyFont,
            }}>{s}</button>
          ))}
        </div>
        <div style={{
          maxWidth: 320, margin: "0 auto", borderTop: `1px solid ${palette.border}`,
          paddingTop: 16, fontSize: 12, color: palette.textSecondary, lineHeight: 1.6,
        }}>
          <strong style={{ color: palette.textPrimary }}>Tips:</strong> Use fewer words, check spelling, or try more general terms.
        </div>
      </div>
    );
  };

  const renderVariant = () => {
    switch (activeVariant) {
      case "search": return renderSearchNoResults();
      case "filter": return renderFilterNoResults();
      case "empty-category": return renderEmptyCategory();
      case "suggestions": return renderSuggestions();
    }
  };

  return (
    <motion.section id="comp-no-results" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>No Results</p>
      <p style={sectionDesc}>
        No results states appear when a search, filter, or category yields zero matches.
        They guide users with suggestions, clear actions, and helpful messaging.
      </p>

      {/* Variant Switcher */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {variants.map(v => (
          <button key={v.id} onClick={() => {
            setActiveVariant(v.id);
            setActiveFilters(["Status: Active", "Type: Premium", "Region: EU"]);
            setSearchTerm("xyzabc");
          }} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: activeVariant === v.id ? 600 : 400,
            cursor: "pointer",
            color: activeVariant === v.id ? palette.primary : palette.textSecondary,
            backgroundColor: activeVariant === v.id ? palette.primary + "10" : palette.surfaceMuted,
            border: `1px solid ${activeVariant === v.id ? palette.primary + "30" : palette.border}`,
            borderRadius: system.spacing.radius.md, fontFamily: system.typography.bodyFont,
          }}>
            {v.label}
          </button>
        ))}
      </div>
      <div style={previewBox}>{renderVariant()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to show no results" description="Display when:" items={[
          "A search query returns zero matches",
          "Active filters exclude all items",
          "A category or collection is empty",
          "A browse action yields nothing",
        ]} />
        <UsageSection palette={palette} title="Content guidelines" description="Write helpful no-results messages:" items={[
          "Echo the search term or active filters",
          "Suggest alternative searches or actions",
          "Offer a clear way to reset/clear filters",
          "Provide tips for better search results",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show the user's search term in the message so they can spot typos immediately." },
        { type: "dont", text: "Don't just say 'No results'. Provide context, suggestions, and a clear action." },
        { type: "do", text: "Offer suggested searches or popular items as alternatives to help users continue." },
        { type: "dont", text: "Don't hide the search/filter controls when showing no results. Users need them to adjust." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Illustration", description: "Icon representing the empty state", x: 50, y: 10 },
          { id: 2, label: "Title", description: "Clear message about missing results", x: 50, y: 30 },
          { id: 3, label: "Description", description: "Guidance text with helpful suggestions", x: 50, y: 50 },
          { id: 4, label: "Suggestions", description: "Alternative search terms or categories", x: 50, y: 70 },
          { id: 5, label: "Action", description: "Clear filters or reset search button", x: 50, y: 90 },
        ]}
        renderPreview={(h) => (
          <div style={{ textAlign: "center", width: 220 }}>
            <div style={{
              fontSize: 22, marginBottom: 8,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>🔍</div>
            <div style={{
              fontSize: 13, fontWeight: 700, color: palette.textPrimary, marginBottom: 4,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>No results</div>
            <div style={{
              fontSize: 11, color: palette.textSecondary, marginBottom: 10, lineHeight: 1.4,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Try different keywords</div>
            <div style={{
              display: "flex", justifyContent: "center", gap: 4, marginBottom: 10,
              opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>
              {["ui kit", "icons"].map((s, i) => (
                <span key={i} style={{
                  padding: "2px 8px", fontSize: 10, borderRadius: 10,
                  backgroundColor: palette.primary + "10", color: palette.primary,
                }}>{s}</span>
              ))}
            </div>
            <div style={{
              fontSize: 11, color: palette.primary, fontWeight: 500,
              opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Clear search</div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Icon Container", value: "56px" },
        { label: "Content Max Width", value: "360px" },
        { label: "Padding", value: "40px 24px" },
        { label: "Title Size", value: "16px / 700" },
        { label: "Suggestion Chip Padding", value: "6px 14px" },
      ]} />
    </motion.section>
  );
}
