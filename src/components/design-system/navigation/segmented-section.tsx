"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface SegmentedSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type Variant = "text" | "icons" | "iconOnly" | "pill" | "underline" | "badge";

export function SegmentedSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: SegmentedSectionProps) {
  const comp = system.components;
  const [activeVariant, setActiveVariant] = useState<Variant>("text");
  const [textSel, setTextSel] = useState(0);
  const [iconsSel, setIconsSel] = useState(0);
  const [iconOnlySel, setIconOnlySel] = useState(0);
  const [pillSel, setPillSel] = useState(0);
  const [underlineSel, setUnderlineSel] = useState(0);
  const [badgeSel, setBadgeSel] = useState(0);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16,
  };

  const icons = ["◫", "⊞", "☰", "⚙"];
  const textItems = ["Daily", "Weekly", "Monthly", "Yearly"];
  const iconTextItems = [
    { label: "Grid", icon: "⊞" }, { label: "List", icon: "☰" },
    { label: "Board", icon: "◫" }, { label: "Timeline", icon: "━" },
  ];
  const badgeItems = [
    { label: "All", count: 42 }, { label: "Active", count: 18 },
    { label: "Draft", count: 7 }, { label: "Archived", count: 17 },
  ];

  const segBase: React.CSSProperties = {
    display: "inline-flex", borderRadius: system.spacing.radius.md,
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    padding: 3, gap: 2,
  };

  const segItem = (active: boolean, variant: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      padding: "7px 16px", fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer",
      borderRadius: parseInt(system.spacing.radius.sm) || 6,
      transition: "all 0.2s", border: "none", fontFamily: system.typography.bodyFont,
      display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
    };
    if (variant === "pill") {
      return { ...base, borderRadius: system.spacing.radius.xl,
        color: active ? "#fff" : palette.textSecondary,
        backgroundColor: active ? palette.primary : "transparent",
      };
    }
    if (variant === "underline") {
      return { ...base, borderRadius: 0, backgroundColor: "transparent",
        color: active ? palette.primary : palette.textSecondary,
        borderBottom: `2px solid ${active ? palette.primary : "transparent"}`,
        padding: "7px 16px 5px",
      };
    }
    return { ...base,
      color: active ? palette.textPrimary : palette.textSecondary,
      backgroundColor: active ? palette.surface : "transparent",
      boxShadow: active ? system.spacing.elevation.sm : "none",
    };
  };

  const renderSegmented = (
    items: { label?: string; icon?: string; count?: number }[],
    selected: number,
    onChange: (i: number) => void,
    variant: string,
  ) => {
    const wrapStyle = variant === "underline"
      ? { display: "inline-flex", gap: 0, borderBottom: `1px solid ${palette.border}` }
      : segBase;

    return (
      <div style={wrapStyle}>
        {items.map((item, i) => (
          <button key={i} onClick={() => onChange(i)} style={segItem(selected === i, variant)}>
            {item.icon && <span style={{ fontSize: 14 }}>{item.icon}</span>}
            {item.label && <span>{item.label}</span>}
            {item.count !== undefined && (
              <span style={{
                fontSize: 10, fontWeight: 600, padding: "1px 6px",
                borderRadius: system.spacing.radius.xl,
                backgroundColor: selected === i ? palette.primary + "20" : palette.border + "60",
                color: selected === i ? palette.primary : palette.textSecondary,
              }}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <motion.section id="comp-segmented" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Segmented Control</p>
      <p style={sectionDesc}>
        Segmented controls let users toggle between a small set of mutually exclusive options.
        They work like radio buttons but with a more compact, inline appearance.
      </p>

      {/* Text Only */}
      <div style={subsectionLabel}>Text Only</div>
      <div style={previewBox}>
        {renderSegmented(textItems.map(l => ({ label: l })), textSel, setTextSel, "text")}
        <span style={{ fontSize: 12, color: palette.textSecondary }}>
          Selected: <strong style={{ color: palette.textPrimary }}>{textItems[textSel]}</strong>
        </span>
      </div>

      {/* With Icons */}
      <div style={subsectionLabel}>With Icons</div>
      <div style={previewBox}>
        {renderSegmented(iconTextItems, iconsSel, setIconsSel, "text")}
      </div>

      {/* Icon Only */}
      <div style={subsectionLabel}>Icon Only</div>
      <div style={previewBox}>
        {renderSegmented(icons.map(ic => ({ icon: ic })), iconOnlySel, setIconOnlySel, "text")}
      </div>

      {/* Pill Style */}
      <div style={subsectionLabel}>Pill Style</div>
      <div style={previewBox}>
        {renderSegmented(textItems.map(l => ({ label: l })), pillSel, setPillSel, "pill")}
      </div>

      {/* Underline Style */}
      <div style={subsectionLabel}>Underline Style</div>
      <div style={previewBox}>
        {renderSegmented(textItems.map(l => ({ label: l })), underlineSel, setUnderlineSel, "underline")}
      </div>

      {/* With Badge Counts */}
      <div style={subsectionLabel}>With Badge Counts</div>
      <div style={previewBox}>
        {renderSegmented(badgeItems, badgeSel, setBadgeSel, "text")}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Segmented controls are ideal for:" items={[
          "Toggling between views (Grid / List / Board)",
          "Filtering by time range (Daily / Weekly / Monthly)",
          "Switching display modes or layouts",
          "Status-based filtering with counts",
        ]} />
        <UsageSection palette={palette} title="Style guide" description="Choose the right variant:" items={[
          "Text — Default for labeled options",
          "Pill — Stronger emphasis on the active state",
          "Underline — When integrated into page-level navigation",
          "Icon only — Compact spaces like toolbars",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Keep options to 2–5 items. Segmented controls aren't suited for many options." },
        { type: "dont", text: "Don't mix icons and text inconsistently. Either all items have icons or none do." },
        { type: "do", text: "Use equal-width segments when labels are similar in length for visual balance." },
        { type: "dont", text: "Don't use segmented controls for actions (like Save/Cancel). They're for switching views." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Track", description: "Background container for all segments", x: 50, y: 85 },
          { id: 2, label: "Segment", description: "Individual option button", x: 25, y: 15 },
          { id: 3, label: "Active indicator", description: "Elevated or colored active state", x: 70, y: 15 },
          { id: 4, label: "Label/Icon", description: "Text, icon, or both inside segment", x: 50, y: 50 },
        ]}
        renderPreview={(h) => (
          <div style={{
            display: "inline-flex", padding: 3, gap: 2, borderRadius: system.spacing.radius.md,
            backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
            opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
          }}>
            {["Daily", "Weekly", "Monthly"].map((label, i) => (
              <div key={i} style={{
                padding: "7px 18px", fontSize: 12, borderRadius: parseInt(system.spacing.radius.sm) || 6,
                backgroundColor: i === 1 ? palette.surface : "transparent",
                boxShadow: i === 1 ? system.spacing.elevation.sm : "none",
                color: i === 1 ? palette.textPrimary : palette.textSecondary,
                fontWeight: i === 1 ? 600 : 400,
                opacity: h === 3 && i === 1 ? 1 : h === 2 && i !== 1 ? 1 : h === 4 ? 1 : h === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                {label}
              </div>
            ))}
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Track Padding", value: "3px" },
        { label: "Segment Padding", value: "7px 16px" },
        { label: "Border Radius (Track)", value: system.spacing.radius.md },
        { label: "Border Radius (Segment)", value: system.spacing.radius.sm },
        { label: "Gap", value: "2px" },
      ]} />
    </motion.section>
  );
}
