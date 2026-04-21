"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface IconLibrarySectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type IconStyle = "outlined" | "filled" | "rounded";
type Category = "Navigation" | "Actions" | "Status" | "Media" | "Communication";

interface IconDef { name: string; category: Category; path: string; filledPath?: string; }

const ICONS: IconDef[] = [
  { name: "Home", category: "Navigation", path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" },
  { name: "Menu", category: "Navigation", path: "M3 12h18 M3 6h18 M3 18h18" },
  { name: "Arrow Left", category: "Navigation", path: "M19 12H5 M12 19l-7-7 7-7" },
  { name: "Arrow Right", category: "Navigation", path: "M5 12h14 M12 5l7 7-7 7" },
  { name: "Chevron Down", category: "Navigation", path: "M6 9l6 6 6-6" },
  { name: "External Link", category: "Navigation", path: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6 M15 3h6v6 M10 14L21 3" },
  { name: "Search", category: "Actions", path: "M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z M16 16l4.5 4.5" },
  { name: "Plus", category: "Actions", path: "M12 5v14 M5 12h14" },
  { name: "Edit", category: "Actions", path: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" },
  { name: "Trash", category: "Actions", path: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" },
  { name: "Copy", category: "Actions", path: "M9 9h13v13H9z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" },
  { name: "Download", category: "Actions", path: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3" },
  { name: "Filter", category: "Actions", path: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z" },
  { name: "Check Circle", category: "Status", path: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3" },
  { name: "Alert Circle", category: "Status", path: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 8v4 M12 16h.01" },
  { name: "Info", category: "Status", path: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 16v-4 M12 8h.01" },
  { name: "Alert Triangle", category: "Status", path: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" },
  { name: "Clock", category: "Status", path: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" },
  { name: "Eye", category: "Status", path: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 110 6 3 3 0 010-6z" },
  { name: "Image", category: "Media", path: "M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z M8.5 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3z M21 15l-5-5L5 21" },
  { name: "Video", category: "Media", path: "M23 7l-7 5 7 5V7z M14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z" },
  { name: "Music", category: "Media", path: "M9 18V5l12-2v13 M9 18a3 3 0 11-6 0 3 3 0 016 0z M21 16a3 3 0 11-6 0 3 3 0 016 0z" },
  { name: "Play", category: "Media", path: "M5 3l14 9-14 9V3z" },
  { name: "Volume", category: "Media", path: "M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 010 14.14 M15.54 8.46a5 5 0 010 7.07" },
  { name: "Mail", category: "Communication", path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
  { name: "Message", category: "Communication", path: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
  { name: "Bell", category: "Communication", path: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0" },
  { name: "Phone", category: "Communication", path: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" },
  { name: "Share", category: "Communication", path: "M18 5a3 3 0 110 6 3 3 0 010-6z M6 12a3 3 0 110 6 3 3 0 010-6z M18 19a3 3 0 110 6 3 3 0 010-6z M8.59 13.51l6.83 3.98 M15.41 6.51l-6.82 3.98" },
];

const CATEGORIES: Category[] = ["Navigation", "Actions", "Status", "Media", "Communication"];
const SIZES = [16, 20, 24, 32];

export function IconLibrarySection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: IconLibrarySectionProps) {
  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [iconStyle, setIconStyle] = useState<IconStyle>("outlined");
  const [activeSize, setActiveSize] = useState(24);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = ICONS;
    if (activeCategory !== "All") list = list.filter(i => i.category === activeCategory);
    if (search) list = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [activeCategory, search]);

  const handleCopy = (name: string) => {
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };

  const renderIcon = (icon: IconDef, size: number) => {
    const strokeWidth = iconStyle === "rounded" ? 2.5 : 1.5;
    const strokeLinecap = iconStyle === "rounded" ? "round" : "round" as const;
    const fill = iconStyle === "filled" ? "currentColor" : "none";
    const stroke = iconStyle === "filled" ? "none" : "currentColor";
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin="round">
        <path d={icon.path} />
      </svg>
    );
  };

  return (
    <motion.section id="comp-icon-library" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Icon Library</p>
      <p style={sectionDesc}>A curated set of SVG icons organized by category. Icons follow a consistent 24px grid with configurable size, stroke weight, and style variants.</p>

      {/* Search + Category Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "0 0 240px" }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search icons..." style={{ width: "100%", padding: "8px 10px 8px 32px", borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, fontSize: 12, color: palette.textPrimary, backgroundColor: palette.surface, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 4, flex: 1, flexWrap: "wrap" }}>
          {(["All", ...CATEGORIES] as const).map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "6px 14px", borderRadius: 99, border: `1px solid ${activeCategory === cat ? palette.primary : palette.border}`, backgroundColor: activeCategory === cat ? palette.primary + "10" : palette.surface, color: activeCategory === cat ? palette.primary : palette.textSecondary, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Style Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["outlined", "filled", "rounded"] as IconStyle[]).map(s => (
          <button key={s} onClick={() => setIconStyle(s)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${iconStyle === s ? palette.primary : palette.border}`, backgroundColor: iconStyle === s ? palette.primary + "10" : palette.surface, color: iconStyle === s ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{s}</button>
        ))}
      </div>

      {/* Icon Grid */}
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 20 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: palette.textSecondary, fontSize: 13 }}>No icons match &ldquo;{search}&rdquo;</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))", gap: 4 }}>
            {filtered.map(icon => {
              const isCopied = copiedName === icon.name;
              return (
                <div key={icon.name} onClick={() => handleCopy(icon.name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 8, cursor: "pointer", backgroundColor: isCopied ? palette.success + "10" : "transparent", border: `1px solid ${isCopied ? palette.success + "40" : "transparent"}`, transition: "all .15s" }}
                  onMouseEnter={e => { if (!isCopied) e.currentTarget.style.backgroundColor = palette.surfaceMuted; }}
                  onMouseLeave={e => { if (!isCopied) e.currentTarget.style.backgroundColor = "transparent"; }}>
                  <span style={{ color: isCopied ? palette.success : palette.textPrimary, display: "flex", transition: "color .15s" }}>
                    {renderIcon(icon, activeSize)}
                  </span>
                  <span style={{ fontSize: 10, color: isCopied ? palette.success : palette.textSecondary, textAlign: "center", lineHeight: 1.2, fontWeight: isCopied ? 600 : 400 }}>
                    {isCopied ? "Copied!" : icon.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24 }}>
        <div style={{ display: "flex", gap: 32, alignItems: "flex-end", justifyContent: "center", marginBottom: 16 }}>
          {SIZES.map(size => (
            <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span style={{ color: palette.textPrimary, display: "flex" }}>{renderIcon(ICONS[0], size)}</span>
              <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: "monospace" }}>{size}px</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {SIZES.map(size => (
            <button key={size} onClick={() => setActiveSize(size)} style={{ padding: "4px 12px", borderRadius: 6, border: `1px solid ${activeSize === size ? palette.primary : palette.border}`, backgroundColor: activeSize === size ? palette.primary + "10" : "transparent", color: activeSize === size ? palette.primary : palette.textSecondary, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{size}px</button>
          ))}
        </div>
      </div>

      {/* Style Comparison */}
      <div style={subsectionLabel}>Style Comparison</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {(["outlined", "filled", "rounded"] as IconStyle[]).map(style => (
          <div key={style} style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: palette.textSecondary, marginBottom: 16 }}>{style}</div>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", color: palette.textPrimary }}>
              {ICONS.slice(0, 5).map(icon => {
                const sw = style === "rounded" ? 2.5 : 1.5;
                const f = style === "filled" ? "currentColor" : "none";
                const s = style === "filled" ? "none" : "currentColor";
                return (
                  <svg key={icon.name} width={24} height={24} viewBox="0 0 24 24" fill={f} stroke={s} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={icon.path} /></svg>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="Icon usage guidelines" description="Icons supplement text and convey meaning quickly:" items={["Use alongside labels for clarity in navigation", "Icon-only buttons require tooltips for accessibility", "Match icon style (outlined/filled) within the same UI", "Use 24px as the default, 16px for compact contexts"]} />
        <UsageSection palette={palette} title="Sizing and spacing" description="Consistent icon sizing maintains visual rhythm:" items={["16px — Inline with text, compact UI elements", "20px — Small buttons and form elements", "24px — Standard size for most contexts", "32px — Large feature icons and empty states"]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use a consistent icon style throughout the entire application.", visual: <div style={{ display: "flex", gap: 8, color: palette.textPrimary }}>{ICONS.slice(6, 10).map(ic => <svg key={ic.name} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={ic.path} /></svg>)}</div> },
        { type: "dont", text: "Don't mix outlined and filled icons in the same toolbar or section.", visual: <div style={{ display: "flex", gap: 8, color: palette.textPrimary }}>{ICONS.slice(6, 8).map(ic => <svg key={ic.name} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={ic.path} /></svg>)}{ICONS.slice(8, 10).map(ic => <svg key={ic.name} width={20} height={20} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d={ic.path} /></svg>)}</div> },
        { type: "do", text: "Ensure icon touch targets are at least 44px for interactive elements.", visual: <div style={{ width: 44, height: 44, borderRadius: 8, border: `2px dashed ${palette.primary}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: palette.primary + "20" }} /></div> },
        { type: "dont", text: "Don't use icons at very small sizes where details become indistinguishable.", visual: <div style={{ display: "flex", gap: 6, color: palette.textSecondary }}>{[8, 8, 8].map((s, i) => <div key={i} style={{ width: s, height: s, borderRadius: 2, backgroundColor: palette.border }} />)}</div> },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Bounding box", description: "The square container defining the icon's size", x: 10, y: 50 },
        { id: 2, label: "Optical area", description: "The visible content area within the bounding box", x: 50, y: 20 },
        { id: 3, label: "Stroke", description: "The line weight and style of the icon paths", x: 75, y: 50 },
        { id: 4, label: "Padding", description: "Internal spacing between content and bounding box", x: 50, y: 80 },
      ]} renderPreview={(highlighted) => (
        <div style={{ position: "relative" }}>
          <div style={{ width: 80, height: 80, border: `2px dashed ${palette.border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", opacity: highlighted === 1 ? 1 : undefined }}>
            <div style={{ position: "absolute", inset: 10, border: `1px dashed ${palette.primary}30`, borderRadius: 4, opacity: highlighted === 4 ? 1 : highlighted === null ? 0.5 : 0.15, transition: "opacity .2s" }} />
            <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlighted === 2 || highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}>
              <path d={ICONS[0].path} strokeWidth={highlighted === 3 ? 3 : 1.5} />
            </svg>
          </div>
          {highlighted === 1 && <div style={{ position: "absolute", inset: -4, border: `2px dashed ${palette.primary}`, borderRadius: 10, pointerEvents: "none" }} />}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Default Size", value: "24 × 24px" },
        { label: "Small Size", value: "16 × 16px" },
        { label: "Medium Size", value: "20 × 20px" },
        { label: "Large Size", value: "32 × 32px" },
        { label: "Stroke Width (outlined)", value: "1.5px" },
        { label: "Stroke Width (rounded)", value: "2.5px" },
        { label: "ViewBox", value: "0 0 24 24" },
        { label: "Touch Target (min)", value: "44 × 44px" },
      ]} />
    </motion.section>
  );
}
