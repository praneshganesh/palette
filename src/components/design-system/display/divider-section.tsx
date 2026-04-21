"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable, TokensGrid } from "../shared/measurements";

interface DividerSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type DividerVariant = "solid" | "dashed" | "thick" | "label-center" | "label-left" | "label-right" | "icon";
type Orientation = "horizontal" | "vertical";

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const MailIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);

export function DividerSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: DividerSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const [thickness, setThickness] = useState(1);
  const [spacing, setSpacing] = useState(16);
  const [activeVariant, setActiveVariant] = useState<DividerVariant>("solid");

  const dividerLine = (variant: DividerVariant, orientation: Orientation = "horizontal") => {
    const isH = orientation === "horizontal";
    const style = variant === "dashed" ? "dashed" : "solid";
    const weight = variant === "thick" ? 3 : thickness;
    const color = palette.border;

    if (variant === "label-center" || variant === "label-left" || variant === "label-right") {
      const align = variant === "label-center" ? "center" : variant === "label-left" ? "flex-start" : "flex-end";
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: align, margin: `${spacing}px 0` }}>
          {variant !== "label-left" && <div style={{ flex: variant === "label-center" ? 1 : undefined, width: variant === "label-right" ? "100%" : undefined, height: weight, backgroundColor: color }} />}
          <span style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, whiteSpace: "nowrap", padding: "0 4px" }}>Section Label</span>
          {variant !== "label-right" && <div style={{ flex: variant === "label-center" ? 1 : undefined, width: variant === "label-left" ? "100%" : undefined, height: weight, backgroundColor: color }} />}
        </div>
      );
    }
    if (variant === "icon") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: `${spacing}px 0` }}>
          <div style={{ flex: 1, height: weight, backgroundColor: color }} />
          <span style={{ color: palette.textSecondary, display: "flex" }}><StarIcon /></span>
          <div style={{ flex: 1, height: weight, backgroundColor: color }} />
        </div>
      );
    }
    if (isH) {
      return <div style={{ height: weight, backgroundColor: color, borderStyle: style, borderWidth: variant === "dashed" ? `${weight}px 0 0 0` : 0, borderColor: color, margin: `${spacing}px 0` }} />;
    }
    return <div style={{ width: weight, backgroundColor: color, borderStyle: style, borderWidth: variant === "dashed" ? `0 0 0 ${weight}px` : 0, borderColor: color, alignSelf: "stretch", margin: `0 ${spacing}px` }} />;
  };

  const sampleListItem = (label: string, desc: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: palette.primary + "12", display: "flex", alignItems: "center", justifyContent: "center", color: palette.primary, flexShrink: 0 }}><MailIcon /></div>
      <div><div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>{label}</div><div style={{ fontSize: 11, color: palette.textSecondary }}>{desc}</div></div>
    </div>
  );

  return (
    <motion.section id="comp-divider" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Divider</p>
      <p style={sectionDesc}>Dividers separate content into distinct sections, creating visual rhythm and grouping. They come in multiple styles including labeled, dashed, and icon variants.</p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 32 }}>
          <div style={{ backgroundColor: palette.surface, borderRadius: radius, padding: 24, border: `1px solid ${palette.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>{content.orgName || "Organization"}</div>
            <div style={{ fontSize: 12, color: palette.textSecondary }}>{content.orgSubtitle || "Subtitle"}</div>
            {dividerLine(activeVariant)}
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6 }}>Content below the divider demonstrates separation of visual sections within a card or panel.</div>
            {dividerLine(activeVariant)}
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ padding: "6px 14px", borderRadius: 6, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Primary</button>
              <button style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: "transparent", color: palette.textSecondary, fontSize: 12, cursor: "pointer" }}>Secondary</button>
            </div>
          </div>
        </div>
        <TokensGrid palette={palette} tokens={[
          { label: "Color", value: palette.border },
          { label: "Thickness", value: `${thickness}px` },
          { label: "Spacing", value: `${spacing}px` },
          { label: "Label Font Size", value: "12px" },
          { label: "Label Color", value: palette.textSecondary },
        ]} />
      </div>

      {/* Variant Picker */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {(["solid", "dashed", "thick", "label-center", "label-left", "label-right", "icon"] as DividerVariant[]).map(v => (
          <button key={v} onClick={() => setActiveVariant(v)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${activeVariant === v ? palette.primary : palette.border}`, backgroundColor: activeVariant === v ? palette.primary + "10" : palette.surface, color: activeVariant === v ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{v}</button>
        ))}
      </div>
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, padding: 24 }}>
        {(["solid", "dashed", "thick", "label-center", "label-left", "label-right", "icon"] as DividerVariant[]).map(v => (
          <div key={v}>{dividerLine(v)}</div>
        ))}
      </div>

      {/* Orientation */}
      <div style={subsectionLabel}>Orientation</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, padding: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Horizontal</div>
          <div style={{ fontSize: 13, color: palette.textPrimary }}>Content above</div>
          {dividerLine("solid")}
          <div style={{ fontSize: 13, color: palette.textPrimary }}>Content below</div>
        </div>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, padding: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Vertical</div>
          <div style={{ display: "flex", alignItems: "center", height: 60 }}>
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Left</span>
            {dividerLine("solid", "vertical")}
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Center</span>
            {dividerLine("solid", "vertical")}
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Right</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={subsectionLabel}>Configuration</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Thickness: {thickness}px</div>
          <input type="range" min={1} max={6} value={thickness} onChange={e => setThickness(+e.target.value)} style={{ width: "100%", accentColor: palette.primary }} />
        </div>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Spacing: {spacing}px</div>
          <input type="range" min={4} max={40} value={spacing} onChange={e => setSpacing(+e.target.value)} style={{ width: "100%", accentColor: palette.primary }} />
        </div>
      </div>

      {/* In Context */}
      <div style={subsectionLabel}>In Context</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Between List Items</div>
          {sampleListItem(content.recentItems[0]?.title || "First item", "Description text")}
          {dividerLine("solid")}
          {sampleListItem(content.recentItems[1]?.title || "Second item", "Another description")}
          {dividerLine("solid")}
          {sampleListItem(content.recentItems[2]?.title || "Third item", "More details here")}
        </div>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>In a Form</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Personal Info</div>
          <div style={{ height: 32, borderRadius: 6, border: `1px solid ${palette.border}`, marginBottom: 8, backgroundColor: palette.surfaceMuted }} />
          <div style={{ height: 32, borderRadius: 6, border: `1px solid ${palette.border}`, marginBottom: 8, backgroundColor: palette.surfaceMuted }} />
          {dividerLine("label-center")}
          <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Address</div>
          <div style={{ height: 32, borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted }} />
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use dividers" description="Dividers create visual separation between content:" items={["Between list items or card sections", "Separating form field groups", "Toolbar section boundaries", "Footer separation from main content", "Sectioning long pages or modals"]} />
        <UsageSection palette={palette} title="Choosing a variant" description="Select based on the degree of separation needed:" items={["Solid — Standard, subtle separation", "Dashed — Lighter, less prominent divide", "Thick — Strong separation between major sections", "Label — Named sections with inline text", "Icon — Decorative or themed separators"]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use dividers sparingly — whitespace alone can often create enough separation.", visual: <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}><div style={{ width: 80, height: 10, borderRadius: 3, backgroundColor: palette.surfaceMuted }} /><div style={{ width: 80, height: 1, backgroundColor: palette.border }} /><div style={{ width: 80, height: 10, borderRadius: 3, backgroundColor: palette.surfaceMuted }} /></div> },
        { type: "dont", text: "Don't stack multiple dividers or use them between every element.", visual: <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>{[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: 80, height: i % 2 === 0 ? 8 : 1, borderRadius: 2, backgroundColor: i % 2 === 0 ? palette.surfaceMuted : palette.danger + "60" }} />)}</div> },
        { type: "do", text: "Match divider style to the context — use labeled dividers for clear sections.", visual: <div style={{ display: "flex", alignItems: "center", gap: 4, width: 100 }}><div style={{ flex: 1, height: 1, backgroundColor: palette.border }} /><div style={{ fontSize: 7, color: palette.textSecondary, whiteSpace: "nowrap" }}>Label</div><div style={{ flex: 1, height: 1, backgroundColor: palette.border }} /></div> },
        { type: "dont", text: "Don't use thick dividers in compact or dense layouts — they create visual noise.", visual: <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}><div style={{ width: 80, height: 8, borderRadius: 2, backgroundColor: palette.surfaceMuted }} /><div style={{ width: 80, height: 4, backgroundColor: palette.danger + "40" }} /><div style={{ width: 80, height: 8, borderRadius: 2, backgroundColor: palette.surfaceMuted }} /></div> },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Line", description: "The visible divider stroke or border", x: 50, y: 50 },
        { id: 2, label: "Spacing", description: "Margin above and below the divider", x: 50, y: 15 },
        { id: 3, label: "Label", description: "Optional text centered on the divider", x: 50, y: 50 },
        { id: 4, label: "Icon", description: "Optional decorative icon element", x: 80, y: 50 },
      ]} renderPreview={(highlighted) => (
        <div style={{ width: 200, position: "relative" }}>
          <div style={{ height: 16, borderRadius: 3, backgroundColor: palette.surfaceMuted, marginBottom: 0, opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
          <div style={{ padding: `12px 0`, opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 2, backgroundColor: palette.border, opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
              <span style={{ fontSize: 9, fontWeight: 600, color: palette.textSecondary, opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}>Label</span>
              <div style={{ display: "flex", alignItems: "center", color: palette.textSecondary, opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}><StarIcon size={10} /></div>
              <div style={{ flex: 1, height: 2, backgroundColor: palette.border, opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
            </div>
          </div>
          <div style={{ height: 16, borderRadius: 3, backgroundColor: palette.surfaceMuted, opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Default Thickness", value: "1px" },
        { label: "Thick Variant", value: "3px" },
        { label: "Vertical Min Height", value: "inherit (stretch)" },
        { label: "Label Font Size", value: "12px" },
        { label: "Label Gap", value: "12px" },
        { label: "Icon Size", value: "14 × 14px" },
        { label: "Default Spacing", value: "16px" },
        { label: "Color", value: palette.border },
      ]} />
    </motion.section>
  );
}
