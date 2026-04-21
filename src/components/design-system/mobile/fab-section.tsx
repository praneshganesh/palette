"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface FabSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const speedDialItems = [
  { icon: "📷", label: "Photo" },
  { icon: "📎", label: "File" },
  { icon: "📝", label: "Note" },
  { icon: "🔗", label: "Link" },
];

export function FabSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: FabSectionProps) {
  const comp = system.components;
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [fabPosition, setFabPosition] = useState<"br" | "bl" | "center">("br");

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
    width: 300, height: 400, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const fabBase: React.CSSProperties = {
    backgroundColor: palette.primary, color: "#fff", border: "none",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", boxShadow: system.spacing.elevation.lg,
    transition: "all 0.2s",
  };

  const positionStyle = (pos: string): React.CSSProperties => {
    const base: React.CSSProperties = { position: "absolute", bottom: 20 };
    if (pos === "br") return { ...base, right: 20 };
    if (pos === "bl") return { ...base, left: 20 };
    return { ...base, left: "50%", transform: "translateX(-50%)" };
  };

  return (
    <motion.section id="comp-fab" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Floating Action Button</p>
      <p style={sectionDesc}>
        FABs provide a prominent, floating entry point for the primary action in a mobile interface. They come in regular, mini, and extended sizes with optional speed-dial expansion.
      </p>

      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { label: "Regular", size: 56, icon: "＋", borderRadius: "50%" },
          { label: "Mini", size: 40, icon: "＋", borderRadius: "50%" },
          { label: "Extended", size: 48, icon: null, borderRadius: system.spacing.radius.xl, text: "＋ Create" },
          { label: "Secondary", size: 56, icon: "✎", borderRadius: "50%", secondary: true },
        ].map(v => (
          <div key={v.label} style={{ ...previewBox, flexDirection: "column", alignItems: "center", gap: 12, padding: 20 }}>
            <button style={{ ...fabBase, width: v.text ? "auto" : v.size, height: v.size, borderRadius: v.borderRadius, padding: v.text ? "0 20px" : 0, fontSize: v.text ? 14 : 22, fontWeight: v.text ? 600 : 400, backgroundColor: v.secondary ? palette.secondary : palette.primary, gap: 6 }}>
              {v.text || v.icon}
            </button>
            <span style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary }}>{v.label}</span>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Speed Dial</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: 20, paddingTop: 40, fontSize: 12, color: palette.textSecondary, textAlign: "center" }}>Tap the FAB to expand options</div>

          {speedDialOpen && (
            <div onClick={() => setSpeedDialOpen(false)} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.2)", zIndex: 5 }} />
          )}

          <div style={{ ...positionStyle("br"), zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            {speedDialOpen && speedDialItems.map((item, i) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, opacity: speedDialOpen ? 1 : 0, transform: speedDialOpen ? "translateY(0)" : "translateY(10px)", transition: `all 0.2s ${i * 0.05}s` }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: palette.textPrimary, backgroundColor: palette.surface, padding: "4px 10px", borderRadius: system.spacing.radius.sm, boxShadow: system.spacing.elevation.sm, whiteSpace: "nowrap" }}>{item.label}</span>
                <button style={{ ...fabBase, width: 40, height: 40, borderRadius: "50%", fontSize: 16, backgroundColor: palette.surface, color: palette.textPrimary, boxShadow: system.spacing.elevation.md }}>
                  {item.icon}
                </button>
              </div>
            ))}
            <button onClick={() => setSpeedDialOpen(!speedDialOpen)} style={{ ...fabBase, width: 56, height: 56, borderRadius: "50%", fontSize: 22, transform: speedDialOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
              ＋
            </button>
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>Positions</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["br", "bl", "center"] as const).map(p => (
          <button key={p} onClick={() => setFabPosition(p)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${fabPosition === p ? palette.primary : palette.border}`, backgroundColor: fabPosition === p ? palette.primary + "15" : palette.surface, color: fabPosition === p ? palette.primary : palette.textSecondary, cursor: "pointer" }}>
            {p === "br" ? "Bottom Right" : p === "bl" ? "Bottom Left" : "Center"}
          </button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={{ ...phoneFrame, height: 260 }}>
          <div style={{ padding: 20, paddingTop: 40, fontSize: 12, color: palette.textSecondary, textAlign: "center" }}>FAB positioned at {fabPosition === "br" ? "bottom-right" : fabPosition === "bl" ? "bottom-left" : "bottom-center"}</div>
          <button style={{ ...fabBase, ...positionStyle(fabPosition), width: 56, height: 56, borderRadius: "50%", fontSize: 22 }}>＋</button>
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use a FAB" description="Prominent primary actions:" items={[
          "Creating new content (compose, add, upload)",
          "Primary call-to-action in a mobile view",
          "Speed dial for 3–6 related quick actions",
        ]} />
        <UsageSection palette={palette} title="Size selection" description="Pick the right FAB size:" items={[
          "Regular (56px) — default for primary actions",
          "Mini (40px) — secondary or less prominent actions",
          "Extended — when the icon alone isn't clear enough",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use one FAB per screen for the single most important action." },
        { type: "dont", text: "Don't use a FAB for destructive actions like delete — it's for constructive flows." },
        { type: "do", text: "Hide the FAB when scrolling down and show it again when scrolling up." },
        { type: "dont", text: "Don't place a FAB over important content like the last list item or a submit button." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "FAB container", description: "Circular elevated button surface", x: 50, y: 50 },
        { id: 2, label: "Icon", description: "Action symbol (+ / compose / camera)", x: 50, y: 50 },
        { id: 3, label: "Speed dial items", description: "Secondary actions that fan out", x: 50, y: 20 },
        { id: 4, label: "Label (extended)", description: "Text label beside the icon", x: 70, y: 50 },
      ]} renderPreview={(h) => (
        <div style={{ width: 120, height: 100, position: "relative" }}>
          <div style={{ position: "absolute", bottom: 4, right: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {[0, 1].map(i => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                {speedDialItems[i].icon}
              </div>
            ))}
            <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: palette.primary, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: system.spacing.elevation.md, opacity: h === 1 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>
              <span style={{ fontSize: 18, color: "#fff", opacity: h === 2 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>＋</span>
            </div>
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Regular FAB Size", value: "56×56px" },
        { label: "Mini FAB Size", value: "40×40px" },
        { label: "Extended Height", value: "48px" },
        { label: "Speed Dial Item Size", value: "40×40px" },
        { label: "Elevation", value: "8–12dp shadow" },
      ]} />
    </motion.section>
  );
}
