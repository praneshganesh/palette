"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface IconButtonSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const icons: Record<string, (size: number, color: string) => React.ReactNode> = {
  plus: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  edit: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
  delete: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>,
  settings: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
  share: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
  heart: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
  bookmark: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>,
};

export function IconButtonSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: IconButtonSectionProps) {
  const comp = system.components;
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null);
  const [toggled, setToggled] = useState<Record<string, boolean>>({ heart: false, bookmark: false });
  const [activeState, setActiveState] = useState<string | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };
  const btnRadius = parseInt(comp.button.borderRadius) || 8;

  const renderIconBtn = (
    icon: string, variant: "filled" | "outlined" | "tonal" | "standard" | "toggle",
    size: number, iconSize: number, disabled?: boolean, isToggled?: boolean,
  ) => {
    const key = `${variant}-${icon}-${size}`;
    const hovered = hoveredVariant === key;
    const on = variant === "toggle" ? (isToggled ?? false) : false;
    let bg = "transparent";
    let border = "none";
    let fg = palette.textPrimary;

    if (variant === "filled") {
      bg = disabled ? palette.border : hovered ? palette.secondary : palette.primary;
      fg = "#fff";
    } else if (variant === "outlined") {
      bg = hovered && !disabled ? palette.primary + "10" : "transparent";
      border = `1.5px solid ${disabled ? palette.border : palette.primary}`;
      fg = disabled ? palette.border : palette.primary;
    } else if (variant === "tonal") {
      bg = disabled ? palette.border + "30" : hovered ? palette.primary + "25" : palette.primary + "15";
      fg = disabled ? palette.textSecondary : palette.primary;
    } else if (variant === "standard") {
      bg = hovered && !disabled ? palette.surfaceMuted : "transparent";
      fg = disabled ? palette.border : palette.textSecondary;
    } else if (variant === "toggle") {
      bg = on ? palette.primary + "15" : hovered ? palette.surfaceMuted : "transparent";
      fg = on ? palette.primary : palette.textSecondary;
    }

    return (
      <button
        key={key}
        onMouseEnter={() => !disabled && setHoveredVariant(key)}
        onMouseLeave={() => setHoveredVariant(null)}
        onMouseDown={() => !disabled && setActiveState(key)}
        onMouseUp={() => setActiveState(null)}
        onClick={() => variant === "toggle" && !disabled && setToggled(p => ({ ...p, [icon]: !p[icon] }))}
        disabled={disabled}
        style={{
          width: size, height: size, borderRadius: btnRadius, backgroundColor: bg,
          border, cursor: disabled ? "not-allowed" : "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          opacity: disabled ? 0.5 : 1, outline: "none",
          transform: activeState === key ? "scale(0.92)" : "scale(1)",
          transition: "all 0.15s",
        }}
      >
        {icons[icon]?.(iconSize, fg)}
      </button>
    );
  };

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  return (
    <motion.section id="comp-icon-button" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Icon Button</p>
      <p style={sectionDesc}>
        Icon buttons render a single icon without a visible label, ideal for toolbars, compact actions, and toggleable controls.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140, gap: 16 }}>
          {renderIconBtn("plus", "filled", 48, 20)}
          {renderIconBtn("edit", "outlined", 48, 20)}
          {renderIconBtn("settings", "tonal", 48, 20)}
          {renderIconBtn("share", "standard", 48, 20)}
          {renderIconBtn("heart", "toggle", 48, 20, false, toggled.heart)}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Border Radius", comp.button.borderRadius)}
          {tokenRow("Sizes", "32 / 40 / 48 px")}
          {tokenRow("Fill Color", "palette.primary")}
          {tokenRow("Hover Opacity", "0.85")}
          {tokenRow("Focus Ring", `2px ${palette.primary}`)}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        {(["filled", "outlined", "tonal", "standard", "toggle"] as const).map((v) => (
          <div key={v} style={showcaseBox}>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16, textTransform: "capitalize" }}>{v === "standard" ? "Standard (ghost)" : v === "toggle" ? "Toggle (on/off)" : v}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {renderIconBtn("edit", v, 40, 18, false, v === "toggle" ? toggled.heart : undefined)}
              {renderIconBtn("delete", v, 40, 18, false, v === "toggle" ? toggled.bookmark : undefined)}
            </div>
          </div>
        ))}
      </div>

      {/* Sizes */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ ...showcaseBox, display: "flex", gap: 32, alignItems: "center" }}>
        {([{ label: "Small (32px)", sz: 32, icon: 14 }, { label: "Medium (40px)", sz: 40, icon: 18 }, { label: "Large (48px)", sz: 48, icon: 22 }] as const).map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 10 }}>{renderIconBtn("settings", "filled", s.sz, s.icon)}</div>
            <div style={{ fontSize: 11, color: palette.textSecondary }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
        {([
          { label: "Default", disabled: false, focus: false, toggled: false },
          { label: "Hover", disabled: false, focus: false, toggled: false },
          { label: "Active", disabled: false, focus: false, toggled: false },
          { label: "Focused", disabled: false, focus: true, toggled: false },
          { label: "Disabled", disabled: true, focus: false, toggled: false },
          { label: "Toggled", disabled: false, focus: false, toggled: true },
        ]).map((st) => (
          <div key={st.label} style={{ ...showcaseBox, textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>{st.label}</div>
            <div style={{ display: "inline-flex", position: "relative" }}>
              {st.focus && <div style={{ position: "absolute", inset: -4, borderRadius: btnRadius + 4, border: `2px solid ${palette.primary}60`, pointerEvents: "none" }} />}
              {renderIconBtn("heart", st.toggled ? "toggle" : "filled", 40, 18, st.disabled, st.toggled)}
            </div>
          </div>
        ))}
      </div>

      {/* Common Icons */}
      <div style={subsectionLabel}>Common Icons</div>
      <div style={{ ...showcaseBox, display: "flex", gap: 20, flexWrap: "wrap" }}>
        {Object.keys(icons).map((name) => (
          <div key={name} style={{ textAlign: "center" }}>
            {renderIconBtn(name, "tonal", 44, 20)}
            <div style={{ fontSize: 10, color: palette.textSecondary, marginTop: 6 }}>{name}</div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use icon buttons" description="Icon buttons work best for common, recognizable actions:" items={[
          "Toolbars with limited horizontal space",
          "Toggleable actions like favorite or bookmark",
          "Compact table row actions (edit, delete)",
          "Floating action buttons or FABs",
        ]} />
        <UsageSection palette={palette} title="Icon vs. labeled button" description="Choose the right format for clarity:" items={[
          "Use icon buttons only for universally understood actions",
          "Add a tooltip for less obvious icons",
          "Prefer labeled buttons for destructive or primary actions",
          "Combine icon + label when space allows",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        {
          type: "do", text: "Use universally recognized icons like trash for delete, pencil for edit.",
          visual: <div style={{ display: "flex", gap: 8 }}>{renderIconBtn("delete", "outlined", 36, 16)}{renderIconBtn("edit", "outlined", 36, 16)}</div>,
        },
        {
          type: "dont", text: "Don't use ambiguous icons without labels or tooltips.",
          visual: <div style={{ display: "flex", gap: 8 }}>{renderIconBtn("share", "standard", 36, 16)}<span style={{ fontSize: 11, color: palette.textSecondary }}>???</span></div>,
        },
        {
          type: "do", text: "Maintain consistent sizing within a toolbar or action group.",
          visual: <div style={{ display: "flex", gap: 6 }}>{renderIconBtn("plus", "filled", 36, 14)}{renderIconBtn("edit", "filled", 36, 14)}{renderIconBtn("delete", "filled", 36, 14)}</div>,
        },
        {
          type: "dont", text: "Don't mix different sizes in the same row.",
          visual: <div style={{ display: "flex", gap: 6, alignItems: "center" }}>{renderIconBtn("plus", "filled", 48, 20)}{renderIconBtn("edit", "filled", 32, 12)}{renderIconBtn("delete", "filled", 40, 18)}</div>,
        },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Container", description: "The clickable hit area with background fill", x: 50, y: 50 },
        { id: 2, label: "Icon", description: "SVG icon centered within the container", x: 50, y: 50 },
        { id: 3, label: "Focus Ring", description: "Visible ring on keyboard focus for a11y", x: 50, y: 50 },
        { id: 4, label: "Ripple / Press Indicator", description: "Visual feedback on click or tap", x: 50, y: 50 },
      ]} renderPreview={(h) => (
        <div style={{ position: "relative", display: "inline-flex" }}>
          <div style={{
            position: "absolute", inset: -5, borderRadius: btnRadius + 5,
            border: `2px dashed ${palette.primary}60`,
            opacity: h === 3 ? 1 : h === null ? 0.4 : 0, transition: "opacity 0.2s",
          }} />
          <div style={{
            width: 48, height: 48, borderRadius: btnRadius,
            backgroundColor: palette.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              backgroundColor: "#fff", opacity: h === 4 ? 0.25 : 0,
              transition: "opacity 0.2s", transform: "scale(0.6)",
            }} />
            <span style={{ opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              {icons.edit(22, "#fff")}
            </span>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Size — Small", value: "32 × 32 px" },
        { label: "Size — Medium", value: "40 × 40 px" },
        { label: "Size — Large", value: "48 × 48 px" },
        { label: "Icon Size (sm / md / lg)", value: "14 / 18 / 22 px" },
        { label: "Border Radius", value: comp.button.borderRadius },
        { label: "Focus Ring Offset", value: "4px" },
        { label: "Transition Duration", value: "150ms" },
      ]} />
    </motion.section>
  );
}
