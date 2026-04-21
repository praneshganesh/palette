"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable, TokensGrid } from "../shared/measurements";

interface ListSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type ListVariant = "simple" | "icons" | "avatars" | "actions" | "selectable" | "nested" | "divided";

const FileIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
);
const FolderIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>
);
const UserIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const MailIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);
const StarIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const MoreHIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
);
const ChevronRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);

const icons = [<FileIcon key="f" />, <FolderIcon key="fo" />, <MailIcon key="m" />, <StarIcon key="s" />, <UserIcon key="u" />];
const iconColors = (p: PaletteTokenSet) => [p.primary, p.secondary, p.info, p.warning, p.success];

export function ListSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ListSectionProps) {
  const comp = system.components;
  const radius = comp.card.borderRadius || system.spacing.radius.md;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const items = content.sidebarSections[0]?.items.slice(0, 5).map(i => i.name) ?? ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  const [activeVariant, setActiveVariant] = useState<ListVariant>("simple");
  const [selectedIdx, setSelectedIdx] = useState<Set<number>>(new Set([0]));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [disabledIdx] = useState(new Set([3]));

  const toggleSelect = (i: number) => setSelectedIdx(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const listContainer: React.CSSProperties = { border: `1px solid ${palette.border}`, borderRadius: radius, overflow: "hidden", backgroundColor: palette.surface };

  const renderItem = (label: string, i: number, variant: ListVariant) => {
    const isActive = selectedIdx.has(i);
    const isHovered = hoveredIdx === i;
    const isDisabled = disabledIdx.has(i) && variant === "selectable";
    const bg = isDisabled ? palette.surfaceMuted : isActive && variant === "selectable" ? palette.primary + "10" : isHovered ? palette.surfaceMuted : "transparent";
    const textColor = isDisabled ? palette.border : palette.textPrimary;

    return (
      <div key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}
        onClick={() => variant === "selectable" && !isDisabled ? toggleSelect(i) : undefined}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", backgroundColor: bg, cursor: variant === "selectable" ? (isDisabled ? "not-allowed" : "pointer") : "default", borderBottom: (variant === "divided" || i < items.length - 1) ? `1px solid ${palette.border}` : "none", transition: "background-color .1s" }}>

        {variant === "icons" && (
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: iconColors(palette)[i % 5] + "15", color: iconColors(palette)[i % 5], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {icons[i % 5]}
          </div>
        )}

        {variant === "avatars" && (
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: iconColors(palette)[i % 5] + "20", color: iconColors(palette)[i % 5], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700 }}>
            {label.charAt(0).toUpperCase()}
          </div>
        )}

        {variant === "selectable" && (
          <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isActive ? palette.primary : palette.border}`, backgroundColor: isActive ? palette.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .15s" }}>
            {isActive && <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#fff" }} />}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: textColor }}>{label}</div>
          {(variant === "avatars" || variant === "icons") && (
            <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>Supporting description for {label.toLowerCase()}</div>
          )}
        </div>

        {variant === "actions" && (
          <div style={{ display: "flex", gap: 4, opacity: isHovered ? 1 : 0, transition: "opacity .15s" }}>
            <button style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textSecondary, fontSize: 11, cursor: "pointer" }}>Edit</button>
            <button style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textSecondary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><MoreHIcon size={14} /></button>
          </div>
        )}

        {variant === "simple" && <ChevronRight />}
      </div>
    );
  };

  const nestedItems = [
    { label: content.sidebarSections[0]?.label || "Section A", children: items.slice(0, 3) },
    { label: content.sidebarSections[1]?.label || "Section B", children: items.slice(3) },
  ];

  return (
    <motion.section id="comp-list" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>List</p>
      <p style={sectionDesc}>Lists display a continuous set of related items vertically. They support icons, avatars, actions, selection states, and nested grouping.</p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...listContainer, width: 340 }}>
            {items.map((item, i) => renderItem(item, i, activeVariant))}
          </div>
        </div>
        <TokensGrid palette={palette} tokens={[
          { label: "Border Radius", value: radius },
          { label: "Item Padding", value: "10px 16px" },
          { label: "Icon Size", value: "32 × 32px" },
          { label: "Avatar Size", value: "36 × 36px" },
          { label: "Divider", value: palette.border },
        ]} />
      </div>

      {/* Variant Picker */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {(["simple", "icons", "avatars", "actions", "selectable", "nested", "divided"] as ListVariant[]).map(v => (
          <button key={v} onClick={() => setActiveVariant(v)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${activeVariant === v ? palette.primary : palette.border}`, backgroundColor: activeVariant === v ? palette.primary + "10" : palette.surface, color: activeVariant === v ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{v}</button>
        ))}
      </div>

      {/* Nested Variant */}
      {activeVariant === "nested" && (
        <div style={{ ...listContainer, maxWidth: 400 }}>
          {nestedItems.map((group, gi) => (
            <div key={gi}>
              <div style={{ padding: "8px 16px", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: palette.textSecondary, backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}` }}>{group.label}</div>
              {group.children.map((child, ci) => (
                <div key={ci} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px 10px 32px", borderBottom: `1px solid ${palette.border}`, fontSize: 13, color: palette.textPrimary }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: palette.primary + "40", flexShrink: 0 }} />
                  {child}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {(["Default", "Hover", "Active", "Disabled"] as const).map(state => {
          const bgMap = { Default: "transparent", Hover: palette.surfaceMuted, Active: palette.primary + "10", Disabled: palette.surfaceMuted };
          const colorMap = { Default: palette.textPrimary, Hover: palette.textPrimary, Active: palette.primary, Disabled: palette.border };
          return (
            <div key={state} style={{ border: `1px solid ${palette.border}`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", backgroundColor: bgMap[state], display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: palette.primary + "12", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: colorMap[state] }}>List item</div>
                  <div style={{ fontSize: 10, color: palette.textSecondary, opacity: state === "Disabled" ? 0.4 : 0.7 }}>Description</div>
                </div>
              </div>
              <div style={{ padding: "6px 16px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.5px" }}>{state}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use lists" description="Lists work for sequential or grouped items:" items={["Navigation menus and sidebar items", "Settings or preference panels", "Search results and selection lists", "Contact lists and user directories"]} />
        <UsageSection palette={palette} title="Variant selection" description="Choose the right variant for your content:" items={["Simple — Text-only with chevron navigation", "Icons — Category or type indicators", "Avatars — People or entity listings", "Actions — Items with contextual operations", "Selectable — Single or multi-select inputs"]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Keep list items at a consistent height within the same list.", visual: <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{[1, 2, 3].map(i => <div key={i} style={{ height: 16, width: 100, borderRadius: 4, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }} />)}</div> },
        { type: "dont", text: "Don't mix list item structures within the same list — keep leading elements consistent.", visual: <div style={{ display: "flex", flexDirection: "column", gap: 3 }}><div style={{ height: 16, width: 100, borderRadius: 4, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }} /><div style={{ height: 24, width: 80, borderRadius: 99, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.danger}30` }} /><div style={{ height: 12, width: 60, borderRadius: 4, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }} /></div> },
        { type: "do", text: "Show trailing actions on hover to keep the interface clean.", visual: <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ flex: 1, height: 12, borderRadius: 3, backgroundColor: palette.surfaceMuted }} /><div style={{ width: 28, height: 14, borderRadius: 3, backgroundColor: palette.primary + "20", fontSize: 7, color: palette.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>Edit</div></div> },
        { type: "dont", text: "Don't disable list items without a visible reason — use a tooltip or label to explain.", visual: <div style={{ height: 20, width: 100, borderRadius: 4, backgroundColor: palette.surfaceMuted, opacity: 0.4, border: `1px solid ${palette.border}` }} /> },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Container", description: "Bordered surface grouping all list items", x: 5, y: 50 },
        { id: 2, label: "Leading element", description: "Icon, avatar, or selection control", x: 15, y: 25 },
        { id: 3, label: "Content area", description: "Primary label and optional description", x: 50, y: 25 },
        { id: 4, label: "Trailing element", description: "Action buttons, chevron, or badge", x: 90, y: 25 },
        { id: 5, label: "Divider", description: "Separator line between items", x: 50, y: 75 },
      ]} renderPreview={(highlighted) => (
        <div style={{ width: 220, border: `1px solid ${palette.border}`, borderRadius: 8, overflow: "hidden", position: "relative" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: i < 2 ? `1px solid ${palette.border}` : "none", opacity: highlighted === 3 || highlighted === null ? 1 : undefined }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: palette.primary + "15", flexShrink: 0, opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
              <div style={{ flex: 1, opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}>
                <div style={{ height: 8, width: "80%", borderRadius: 2, backgroundColor: palette.textPrimary + "30", marginBottom: 4 }} />
                <div style={{ height: 6, width: "60%", borderRadius: 2, backgroundColor: palette.border }} />
              </div>
              <div style={{ opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}><ChevronRight size={12} /></div>
            </div>
          ))}
          {highlighted === 1 && <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: 10, pointerEvents: "none" }} />}
          {highlighted === 5 && <><div style={{ position: "absolute", left: 12, right: 12, top: "33.3%", height: 2, backgroundColor: palette.primary, borderRadius: 1 }} /><div style={{ position: "absolute", left: 12, right: 12, top: "66.6%", height: 2, backgroundColor: palette.primary, borderRadius: 1 }} /></>}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Item Padding", value: "10px 16px" },
        { label: "Icon Container", value: "32 × 32px" },
        { label: "Avatar Size", value: "36 × 36px" },
        { label: "Leading Gap", value: "12px" },
        { label: "Nested Indent", value: "32px left" },
        { label: "Font Size (primary)", value: "13px" },
        { label: "Font Size (secondary)", value: "11px" },
        { label: "Divider Height", value: "1px" },
      ]} />
    </motion.section>
  );
}
