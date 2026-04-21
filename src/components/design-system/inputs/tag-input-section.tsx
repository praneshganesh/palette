"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface TagInputSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

interface Tag { label: string; color?: string; }

const tagColors = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6", "#ef4444"];

export function TagInputSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: TagInputSectionProps) {
  const comp = system.components;
  const [heroTags, setHeroTags] = useState<Tag[]>([{ label: "React" }, { label: "TypeScript" }, { label: "Tailwind" }]);
  const [heroInput, setHeroInput] = useState("");
  const [colorTags, setColorTags] = useState<Tag[]>([
    { label: "Bug", color: tagColors[5] }, { label: "Feature", color: tagColors[0] }, { label: "Docs", color: tagColors[2] },
  ]);
  const [colorInput, setColorInput] = useState("");
  const [limitTags, setLimitTags] = useState<Tag[]>([{ label: "Tag 1" }, { label: "Tag 2" }, { label: "Tag 3" }]);
  const [limitInput, setLimitInput] = useState("");
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [suggestTags, setSuggestTags] = useState<Tag[]>([{ label: "JavaScript" }]);
  const [suggestInput, setSuggestInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRadius = parseInt(comp.input.borderRadius) || 8;
  const inputPx = parseInt(comp.input.paddingX) || 12;
  const maxTags = 5;
  const suggestions = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Remix", "Astro"];

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const renderTag = (tag: Tag, onRemove?: () => void, size: "sm" | "md" = "md") => {
    const bg = tag.color ? tag.color + "18" : palette.primary + "12";
    const fg = tag.color || palette.primary;
    const px = size === "sm" ? 8 : 10;
    const py = size === "sm" ? 2 : 4;
    const fs = size === "sm" ? 11 : 12;
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: `${py}px ${px}px`, borderRadius: 6,
        backgroundColor: bg, color: fg, fontSize: fs, fontWeight: 500,
        lineHeight: 1, whiteSpace: "nowrap",
      }}>
        {tag.label}
        {onRemove && (
          <button onClick={onRemove} style={{
            border: "none", background: "none", cursor: "pointer",
            color: fg, padding: 0, display: "flex", alignItems: "center",
            opacity: 0.6, fontSize: fs,
          }}>
            <svg width={fs - 1} height={fs - 1} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </span>
    );
  };

  const renderTagInput = (
    id: string, tags: Tag[], setTags: (t: Tag[]) => void,
    input: string, setInput: (v: string) => void,
    opts: { disabled?: boolean; error?: boolean; colored?: boolean; limit?: number; placeholder?: string } = {}
  ) => {
    const { disabled, error, colored, limit, placeholder = "Type and press Enter…" } = opts;
    const isFocused = focusedId === id;
    const overLimit = limit !== undefined && tags.length >= limit;
    const borderColor = error || overLimit ? palette.danger : isFocused ? palette.primary : palette.border;

    const addTag = (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || tags.some(t => t.label.toLowerCase() === trimmed.toLowerCase())) return;
      if (limit !== undefined && tags.length >= limit) return;
      const newTag: Tag = colored
        ? { label: trimmed, color: tagColors[tags.length % tagColors.length] }
        : { label: trimmed };
      setTags([...tags, newTag]);
      setInput("");
    };

    return (
      <div>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
          padding: `6px ${inputPx}px`, minHeight: 40, borderRadius: inputRadius,
          border: `1.5px solid ${borderColor}`,
          backgroundColor: disabled ? palette.surfaceMuted : palette.background,
          transition: "border-color 0.15s", opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}>
          {tags.map((tag, i) => (
            <span key={i}>{renderTag(tag, disabled ? undefined : () => setTags(tags.filter((_, j) => j !== i)))}</span>
          ))}
          {!disabled && (
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); addTag(input); }
                if (e.key === "Backspace" && !input && tags.length > 0) setTags(tags.slice(0, -1));
              }}
              onFocus={() => setFocusedId(id)}
              onBlur={() => setFocusedId(null)}
              placeholder={tags.length === 0 ? placeholder : ""}
              disabled={disabled}
              style={{
                flex: 1, minWidth: 80, border: "none", outline: "none",
                backgroundColor: "transparent", fontSize: 13, padding: "4px 0",
                color: palette.textPrimary, fontFamily: system.typography.bodyFont,
              }}
            />
          )}
        </div>
        {overLimit && <div style={{ fontSize: 11, color: palette.danger, marginTop: 4 }}>Maximum of {limit} tags reached</div>}
      </div>
    );
  };

  const filteredSuggestions = suggestions.filter(
    s => s.toLowerCase().includes(suggestInput.toLowerCase()) && !suggestTags.some(t => t.label === s)
  );

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  return (
    <motion.section id="comp-tag-input" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Tag Input</p>
      <p style={sectionDesc}>
        Tag inputs let users add, remove, and manage a collection of labels or keywords with type-to-add interaction and overflow handling.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }}>
          <div style={{ width: "85%" }}>
            {renderTagInput("hero", heroTags, setHeroTags, heroInput, setHeroInput)}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Border Radius", comp.input.borderRadius)}
          {tokenRow("Tag Radius", "6px")}
          {tokenRow("Tag BG", `${palette.primary}12`)}
          {tokenRow("Focus Border", "palette.primary")}
          {tokenRow("Gap", "6px")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Default</div>
          {renderTagInput("v-default", heroTags, setHeroTags, heroInput, setHeroInput)}
        </div>
        <div style={{ ...showcaseBox, position: "relative" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>With Suggestions</div>
          <div>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
              padding: `6px ${inputPx}px`, minHeight: 40, borderRadius: inputRadius,
              border: `1.5px solid ${showSuggestions ? palette.primary : palette.border}`,
              backgroundColor: palette.background, transition: "border-color 0.15s",
            }}>
              {suggestTags.map((tag, i) => (
                <span key={i}>{renderTag(tag, () => setSuggestTags(suggestTags.filter((_, j) => j !== i)))}</span>
              ))}
              <input
                value={suggestInput} onChange={(e) => setSuggestInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && suggestInput.trim()) {
                    e.preventDefault();
                    setSuggestTags([...suggestTags, { label: suggestInput.trim() }]);
                    setSuggestInput("");
                  }
                }}
                placeholder="Search frameworks…"
                style={{
                  flex: 1, minWidth: 80, border: "none", outline: "none",
                  backgroundColor: "transparent", fontSize: 13, padding: "4px 0",
                  color: palette.textPrimary, fontFamily: system.typography.bodyFont,
                }}
              />
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div style={{
                position: "absolute", left: 24, right: 24, top: "100%", marginTop: -16,
                backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
                borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10,
                maxHeight: 140, overflow: "auto",
              }}>
                {filteredSuggestions.slice(0, 5).map((s) => (
                  <div key={s} onMouseDown={() => { setSuggestTags([...suggestTags, { label: s }]); setSuggestInput(""); }}
                    style={{ padding: "8px 12px", fontSize: 13, color: palette.textPrimary, cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = palette.surfaceMuted)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >{s}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Color-Coded Tags</div>
          {renderTagInput("v-color", colorTags, setColorTags, colorInput, setColorInput, { colored: true })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>With Max Limit ({maxTags})</div>
          {renderTagInput("v-limit", limitTags, setLimitTags, limitInput, setLimitInput, { limit: maxTags })}
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {([
          { label: "Default", id: "s-def" },
          { label: "Focused", id: "s-focus" },
          { label: "Error (max exceeded)", id: "s-err" },
          { label: "Disabled", id: "s-dis" },
        ] as const).map((st) => (
          <div key={st.id} style={showcaseBox}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>{st.label}</div>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center",
              padding: `6px ${inputPx}px`, minHeight: 36, borderRadius: inputRadius,
              border: `1.5px solid ${
                st.id === "s-err" ? palette.danger :
                st.id === "s-focus" ? palette.primary : palette.border
              }`,
              backgroundColor: st.id === "s-dis" ? palette.surfaceMuted : palette.background,
              opacity: st.id === "s-dis" ? 0.5 : 1,
            }}>
              {renderTag({ label: "Tag 1" })}
              {renderTag({ label: "Tag 2" })}
            </div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use tag inputs" description="Tag inputs are ideal for multi-value text entry:" items={[
          "Adding skills, categories, or keywords",
          "Email recipients in compose fields",
          "Filter or search tag systems",
          "Content tagging for CMS or blog posts",
        ]} />
        <UsageSection palette={palette} title="Tag input vs. multi-select" description="Choose based on input style:" items={[
          "Tag input — free-form text, user creates new values",
          "Multi-select — pick from a predefined list only",
          "Tag input — when the list of possible values is unbounded",
          "Multi-select — when options are limited and well-known",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Allow backspace to remove the last tag for quick editing." },
        { type: "dont", text: "Don't allow duplicate tags — deduplicate on entry." },
        { type: "do", text: "Set a reasonable max limit and show remaining count." },
        { type: "dont", text: "Don't allow excessively long tag text — truncate or limit length." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Container", description: "Wrapper with border and focus state", x: 50, y: 50 },
        { id: 2, label: "Tag Chip", description: "Individual tag with label text", x: 20, y: 50 },
        { id: 3, label: "Remove Button", description: "X icon to delete a tag", x: 35, y: 50 },
        { id: 4, label: "Text Input", description: "Inline input for typing new tags", x: 70, y: 50 },
      ]} renderPreview={(h) => (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
          padding: `6px 10px`, borderRadius: inputRadius,
          border: `1.5px solid ${palette.primary}`, backgroundColor: palette.background,
          opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
          width: 240,
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "3px 8px", borderRadius: 6,
            backgroundColor: palette.primary + "12", color: palette.primary,
            fontSize: 12, fontWeight: 500,
            opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>
            React
            <span style={{ opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s", cursor: "pointer" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </span>
          <span style={{
            fontSize: 12, color: palette.textSecondary, padding: "3px 0",
            opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>
            Type here…
          </span>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Container Min Height", value: "40px" },
        { label: "Container Padding", value: `6px ${comp.input.paddingX}` },
        { label: "Container Radius", value: comp.input.borderRadius },
        { label: "Tag Padding", value: "4px 10px" },
        { label: "Tag Border Radius", value: "6px" },
        { label: "Tag Gap", value: "6px" },
        { label: "Remove Icon Size", value: "11px" },
      ]} />
    </motion.section>
  );
}
