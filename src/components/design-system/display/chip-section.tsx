"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSChip } from "./chip";
import type { ChipVariant } from "./chip";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface ChipSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const TagIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const SearchIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClockIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

export function ChipSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ChipSectionProps) {
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set(["All"]));
  const [inputChips, setInputChips] = useState(["Design", "Development", "Marketing"]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  const removeInputChip = (chip: string) => {
    setInputChips((prev) => prev.filter((c) => c !== chip));
  };

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const filterCategories = content.formFields.categories.length > 0
    ? ["All", ...content.formFields.categories.slice(0, 5)]
    : ["All", "Active", "Pending", "Archived", "Starred"];

  return (
    <motion.section
      id="comp-chip"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Chips</p>
      <p style={sectionDesc}>
        Chips are compact elements that represent attributes, filters, or
        actions. They let users enter information, make selections, filter
        content, or trigger short actions.
      </p>

      {/* ──── All Variants ──── */}
      <div style={subsectionLabel}>Chip Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {(["filter", "input", "suggestion", "assistive"] as ChipVariant[]).map((v) => (
            <div
              key={v}
              style={{
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16, textTransform: "capitalize" }}>{v}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                <DSChip system={system} palette={palette} variant={v}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </DSChip>
                <DSChip system={system} palette={palette} variant={v} selected={v === "filter"}>
                  Selected
                </DSChip>
              </div>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 12 }}>
                {v === "filter" && "Toggle to filter content"}
                {v === "input" && "Removable user entries"}
                {v === "suggestion" && "Clickable recommendations"}
                {v === "assistive" && "Contextual actions"}
              </div>
            </div>
          ))}
        </div>
        <TokensGrid
          palette={palette}
          tokens={[
            { label: "Border Radius", value: system.spacing.radius.full },
            { label: "Padding X", value: "12px (sm) / 16px (md)" },
            { label: "Font Size", value: "12px (sm) / 13px (md)" },
            { label: "Height", value: "28px (sm) / 34px (md)" },
            { label: "Selected BG", value: palette.primary },
            { label: "Selected Text", value: palette.background },
          ]}
        />
      </div>

      {/* ──── Filter Chips (Interactive) ──── */}
      <div style={subsectionLabel}>Filter Chips (Interactive)</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
        }}
      >
        <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 12 }}>Click to toggle filters:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {filterCategories.map((cat) => (
            <DSChip
              key={cat}
              system={system}
              palette={palette}
              variant="filter"
              selected={selectedFilters.has(cat)}
              onClick={() => toggleFilter(cat)}
            >
              {cat}
            </DSChip>
          ))}
        </div>
      </div>

      {/* ──── Input Chips (Removable) ──── */}
      <div style={subsectionLabel}>Input Chips (Removable)</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
        }}
      >
        <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 12 }}>Click × to remove:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          {inputChips.map((chip) => (
            <DSChip
              key={chip}
              system={system}
              palette={palette}
              variant="input"
              removable
              onRemove={() => removeInputChip(chip)}
              leadingIcon={<TagIcon />}
            >
              {chip}
            </DSChip>
          ))}
          {inputChips.length === 0 && (
            <div style={{ fontSize: 12, color: palette.textSecondary, fontStyle: "italic" }}>
              All chips removed. Refresh to reset.
            </div>
          )}
        </div>
      </div>

      {/* ──── With Icons ──── */}
      <div style={subsectionLabel}>With Icons</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
        }}
      >
        <DSChip system={system} palette={palette} variant="assistive" leadingIcon={<StarIcon />}>Favorites</DSChip>
        <DSChip system={system} palette={palette} variant="assistive" leadingIcon={<ClockIcon />}>Recent</DSChip>
        <DSChip system={system} palette={palette} variant="assistive" leadingIcon={<MapPinIcon />}>Nearby</DSChip>
        <DSChip system={system} palette={palette} variant="suggestion" leadingIcon={<SearchIcon />}>Search tips</DSChip>
      </div>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DSChip system={system} palette={palette} variant="filter" size="sm" selected>Small</DSChip>
          <div style={{ fontSize: 10, color: palette.textSecondary }}>sm</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DSChip system={system} palette={palette} variant="filter" size="md" selected>Medium</DSChip>
          <div style={{ fontSize: 10, color: palette.textSecondary }}>md</div>
        </div>
        <div style={{ width: 1, height: 40, backgroundColor: palette.border }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DSChip system={system} palette={palette} variant="input" size="sm" removable>Small</DSChip>
          <div style={{ fontSize: 10, color: palette.textSecondary }}>sm</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DSChip system={system} palette={palette} variant="input" size="md" removable>Medium</DSChip>
          <div style={{ fontSize: 10, color: palette.textSecondary }}>md</div>
        </div>
      </div>

      {/* ──── Suggestion Chips ──── */}
      <div style={subsectionLabel}>Suggestion Chips</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
        }}
      >
        <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 12 }}>Suggested searches:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {content.quickActions.slice(0, 5).map((action, i) => (
            <DSChip key={i} system={system} palette={palette} variant="suggestion">
              {action}
            </DSChip>
          ))}
        </div>
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          padding: 24,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>
          {content.formFields.projectTitle || "Project"} Tags
        </div>
        <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 16 }}>
          Categorise and filter your items with tags
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {content.formFields.categories.slice(0, 4).map((cat, i) => (
            <DSChip key={i} system={system} palette={palette} variant="filter" selected={i === 0} onClick={() => {}}>
              {cat}
            </DSChip>
          ))}
        </div>
        <div style={{ height: 1, backgroundColor: palette.border, marginBottom: 16 }} />
        <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 8 }}>Applied filters:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <DSChip system={system} palette={palette} variant="input" removable leadingIcon={<TagIcon />}>
            {content.formFields.categories[0] || "Category A"}
          </DSChip>
          <DSChip system={system} palette={palette} variant="input" removable>
            High Priority
          </DSChip>
        </div>
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use chips"
          description="Chips are compact elements for discrete selections and attributes:"
          items={[
            "Filter bars to narrow down content",
            "Tag inputs in forms (email recipients, labels)",
            "Search suggestions and autocomplete",
            "Category or attribute display on cards",
            "Quick actions in contextual toolbars",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right variant"
          description="Each variant serves a distinct interaction pattern:"
          items={[
            "Filter — Toggleable, for content filtering",
            "Input — Removable, for user-entered values",
            "Suggestion — Clickable, for recommended actions",
            "Assistive — With icons, for contextual navigation",
          ]}
        />
      </div>

      {/* ──── Do's and Don'ts ──── */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines
        palette={palette}
        items={[
          {
            type: "do",
            text: "Keep chip labels concise — one or two words. They should be scannable at a glance.",
            visual: (
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ height: 24, padding: "0 10px", borderRadius: 12, backgroundColor: palette.primary, color: palette.background, fontSize: 10, display: "flex", alignItems: "center" }}>Active</div>
                <div style={{ height: 24, padding: "0 10px", borderRadius: 12, border: `1px solid ${palette.border}`, fontSize: 10, display: "flex", alignItems: "center", color: palette.textSecondary }}>Draft</div>
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't use chips for long text or full sentences. They'll wrap awkwardly and lose their compact advantage.",
            visual: (
              <div style={{ height: 24, padding: "0 10px", borderRadius: 12, border: `1px solid ${palette.border}`, fontSize: 8, display: "flex", alignItems: "center", color: palette.textSecondary, maxWidth: 160, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                This is way too long for a chip label text
              </div>
            ),
          },
          {
            type: "do",
            text: "Group related chips together and provide clear context for what they filter or represent.",
            visual: (
              <div>
                <div style={{ fontSize: 8, color: palette.textSecondary, marginBottom: 4 }}>Status:</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {["Active", "Draft"].map((l) => (
                    <div key={l} style={{ height: 18, padding: "0 8px", borderRadius: 9, border: `1px solid ${palette.border}`, fontSize: 8, display: "flex", alignItems: "center", color: palette.textSecondary }}>{l}</div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't mix chip variants within the same group. Keep filter chips with filters, input chips with inputs.",
            visual: (
              <div style={{ display: "flex", gap: 4 }}>
                <div style={{ height: 18, padding: "0 8px", borderRadius: 9, backgroundColor: palette.primary, color: palette.background, fontSize: 8, display: "flex", alignItems: "center" }}>✓ A</div>
                <div style={{ height: 18, padding: "0 8px", borderRadius: 9, border: `1px dashed ${palette.danger}`, fontSize: 8, display: "flex", alignItems: "center", color: palette.danger }}>B ×</div>
              </div>
            ),
          },
        ]}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Chip Height (sm)", value: "28px" },
          { label: "Chip Height (md)", value: "34px" },
          { label: "Padding X (sm)", value: "12px" },
          { label: "Padding X (md)", value: "16px" },
          { label: "Icon Size", value: "14 × 14px" },
          { label: "Gap (icon to label)", value: "6px" },
          { label: "Remove Button Size", value: "12 × 12px" },
          { label: "Chip Gap", value: "8px" },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Pill-shaped surface with border radius", x: 10, y: 50 },
          { id: 2, label: "Check icon", description: "Shown when a filter chip is selected", x: 25, y: 15 },
          { id: 3, label: "Leading icon", description: "Optional icon before the label text", x: 40, y: 90 },
          { id: 4, label: "Label", description: "The primary text content of the chip", x: 60, y: 15 },
          { id: 5, label: "Remove button", description: "Close icon for input chips", x: 85, y: 90 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 34,
                padding: "0 14px",
                borderRadius: system.spacing.radius.full,
                backgroundColor: palette.primary,
                color: palette.background,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <span style={{ opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s", display: "flex", alignItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span style={{ opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s", display: "flex", alignItems: "center" }}>
                <TagIcon />
              </span>
              <span style={{ opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                Label text
              </span>
              <span style={{ opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s", display: "flex", alignItems: "center", marginLeft: 2 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </span>
            </span>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.background}80`, borderRadius: system.spacing.radius.full, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />
    </motion.section>
  );
}
