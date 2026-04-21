"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface CommandPaletteSectionProps {
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

type CmdGroup = { label: string; items: { icon: React.ReactNode; name: string; shortcut?: string }[] };
const groups: CmdGroup[] = [
  { label: "Recent", items: [
    { icon: <ClockIcon />, name: "Dashboard", shortcut: "⌘D" },
    { icon: <ClockIcon />, name: "Settings page" },
  ]},
  { label: "Pages", items: [
    { icon: <FileIcon />, name: "Home", shortcut: "⌘1" },
    { icon: <FileIcon />, name: "Analytics", shortcut: "⌘2" },
    { icon: <FileIcon />, name: "Users" },
    { icon: <FileIcon />, name: "Reports" },
  ]},
  { label: "Actions", items: [
    { icon: <SettingsIcon />, name: "Open settings", shortcut: "⌘," },
    { icon: <SettingsIcon />, name: "Toggle dark mode", shortcut: "⌘⇧D" },
    { icon: <SettingsIcon />, name: "Invite teammate" },
  ]},
];

export function CommandPaletteSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: CommandPaletteSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.lg;
  const [query, setQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const filtered = groups.map(g => ({
    ...g,
    items: g.items.filter(it => !query || it.name.toLowerCase().includes(query.toLowerCase())),
  })).filter(g => g.items.length > 0);

  const PaletteModal = ({ compact }: { compact?: boolean }) => (
    <div style={{
      width: compact ? 320 : "100%", maxWidth: 520, borderRadius: radius,
      border: `1px solid ${palette.border}`, backgroundColor: palette.surface,
      boxShadow: "0 16px 48px rgba(0,0,0,0.12)", overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: compact ? "10px 14px" : "14px 18px", borderBottom: `1px solid ${palette.border}` }}>
        <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
        <input
          style={{ border: "none", outline: "none", backgroundColor: "transparent", fontSize: compact ? 13 : 15, color: palette.textPrimary, fontFamily: "inherit", width: "100%" }}
          placeholder="Type a command or search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span style={{ padding: "2px 8px", borderRadius: system.spacing.radius.sm, backgroundColor: palette.surfaceMuted, fontSize: 11, color: palette.textSecondary, border: `1px solid ${palette.border}`, whiteSpace: "nowrap" }}>ESC</span>
      </div>
      <div style={{ maxHeight: compact ? 240 : 320, overflowY: "auto" }}>
        {filtered.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: palette.textSecondary, fontSize: 13 }}>No results found</div>
        )}
        {filtered.map(g => (
          <div key={g.label}>
            <div style={{ padding: compact ? "8px 14px 4px" : "10px 18px 4px", fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "1px" }}>{g.label}</div>
            {g.items.map(it => (
              <div
                key={it.name}
                onMouseEnter={() => setHoveredItem(it.name)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: compact ? "8px 14px" : "10px 18px",
                  cursor: "pointer",
                  backgroundColor: hoveredItem === it.name ? palette.primary + "10" : "transparent",
                  transition: "background-color .1s",
                }}
              >
                <span style={{ color: hoveredItem === it.name ? palette.primary : palette.textSecondary, display: "flex" }}>{it.icon}</span>
                <span style={{ flex: 1, fontSize: compact ? 12 : 14, color: palette.textPrimary }}>{it.name}</span>
                {it.shortcut && (
                  <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: "monospace", display: "flex", gap: 3 }}>
                    {it.shortcut.split("").map((k, i) => <span key={i} style={{ padding: "1px 5px", borderRadius: 4, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }}>{k}</span>)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding: compact ? "8px 14px" : "10px 18px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, display: "flex", gap: 16, fontSize: 11, color: palette.textSecondary }}>
        <span>↑↓ Navigate</span><span>↵ Select</span><span>ESC Close</span>
      </div>
    </div>
  );

  return (
    <motion.section id="comp-command-palette" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Command Palette</p>
      <p style={sectionDesc}>
        Command palettes provide a modal search overlay with keyboard shortcuts, grouped results,
        and recent items for fast navigation and action execution.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, backgroundColor: palette.background }}>
          <PaletteModal />
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Border Radius", radius], ["Shadow", "0 16px 48px"], ["Overlay BG", "palette.background"], ["Hover BG", `${palette.primary}10`], ["Shortcut BG", "palette.surfaceMuted"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ ...showcaseBox, display: "flex", justifyContent: "center" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Compact</div>
            <PaletteModal compact />
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Empty State</div>
          <div style={{ width: "100%", maxWidth: 360, borderRadius: radius, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${palette.border}` }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><SearchIcon /></span>
              <span style={{ fontSize: 14, color: palette.textSecondary }}>zzz_no_match_query</span>
            </div>
            <div style={{ padding: 32, textAlign: "center", color: palette.textSecondary, fontSize: 13 }}>
              No results found. Try a different search.
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard trigger */}
      <div style={subsectionLabel}>Trigger</div>
      <div style={{ ...showcaseBox, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["⌘", "K"].map(k => (
            <span key={k} style={{ padding: "6px 12px", borderRadius: system.spacing.radius.sm, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, fontSize: 14, fontWeight: 600, color: palette.textPrimary, fontFamily: "monospace" }}>{k}</span>
          ))}
        </div>
        <span style={{ fontSize: 13, color: palette.textSecondary }}>Press <strong>⌘K</strong> to open the command palette</span>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use command palettes" description="Quick keyboard-driven access:" items={[
          "Power-user navigation across many pages",
          "Quick action execution without menus",
          "Search-as-you-type for files or entities",
          "Keyboard shortcut discovery",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Keep the palette fast and useful:" items={[
          "Show recent/frequent items before search",
          "Group results by type (pages, actions, settings)",
          "Display keyboard shortcuts inline",
          "Support fuzzy matching for typo tolerance",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show keyboard shortcuts next to each action for discoverability." },
        { type: "dont", text: "Don't require mouse clicks to navigate — ensure full keyboard support." },
        { type: "do", text: "Group results by category with clear section headers." },
        { type: "dont", text: "Don't show more than 10 results at once — add scrolling instead." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Search input", description: "Text field with icon and ESC badge", x: 50, y: 10 },
        { id: 2, label: "Group header", description: "Category label for result sections", x: 15, y: 35 },
        { id: 3, label: "Result item", description: "Clickable row with icon and label", x: 50, y: 55 },
        { id: 4, label: "Shortcut badge", description: "Keyboard shortcut display", x: 85, y: 55 },
        { id: 5, label: "Footer hints", description: "Navigation instruction bar", x: 50, y: 92 },
      ]} renderPreview={(h) => (
        <div style={{ width: 240, borderRadius: 8, border: `1px solid ${palette.border}`, overflow: "hidden", backgroundColor: palette.surface }}>
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", gap: 6, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <span style={{ color: palette.textSecondary, display: "flex", transform: "scale(0.7)" }}><SearchIcon /></span>
            <span style={{ fontSize: 9, color: palette.textSecondary }}>Search...</span>
          </div>
          <div style={{ fontSize: 8, padding: "6px 10px 2px", color: palette.textSecondary, fontWeight: 600, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>PAGES</div>
          {["Home", "Settings"].map((n, i) => (
            <div key={n} style={{ padding: "5px 10px", display: "flex", alignItems: "center", gap: 6, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: palette.border + "60" }} />
              <span style={{ flex: 1, fontSize: 9, color: palette.textPrimary }}>{n}</span>
              <span style={{ fontSize: 7, padding: "1px 4px", borderRadius: 2, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, color: palette.textSecondary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>⌘{i + 1}</span>
            </div>
          ))}
          <div style={{ padding: "5px 10px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, fontSize: 7, color: palette.textSecondary, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>↑↓ Navigate · ↵ Select</div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Modal Width", value: "520px (max)" },
        { label: "Border Radius", value: radius },
        { label: "Input Padding", value: "14px 18px" },
        { label: "Item Padding", value: "10px 18px" },
        { label: "Max Results Height", value: "320px" },
        { label: "Footer Height", value: "36px" },
        { label: "Shadow", value: "0 16px 48px rgba(0,0,0,0.12)" },
      ]} />
    </motion.section>
  );
}
