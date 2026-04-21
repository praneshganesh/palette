"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface BottomSheetSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type SheetHeight = "closed" | "peek" | "half" | "full";

const sheetItems = [
  { icon: "📍", label: "Current Location", sub: "123 Main Street" },
  { icon: "⭐", label: "Saved Places", sub: "Home, Work, Gym" },
  { icon: "🕐", label: "Recent Searches", sub: "3 recent items" },
  { icon: "📋", label: "All Categories", sub: "Browse 24 categories" },
  { icon: "🎯", label: "Nearby", sub: "12 places within 1 mi" },
  { icon: "💡", label: "Suggestions", sub: "Based on your history" },
];

export function BottomSheetSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: BottomSheetSectionProps) {
  const comp = system.components;
  const [sheetHeight, setSheetHeight] = useState<SheetHeight>("peek");
  const [snapDemo, setSnapDemo] = useState<SheetHeight>("half");

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
    width: 300, height: 480, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const heightMap: Record<SheetHeight, string> = { closed: "0%", peek: "22%", half: "50%", full: "92%" };

  const renderSheet = (height: SheetHeight, showContent: boolean) => (
    <div style={phoneFrame}>
      <div style={{ padding: 20, paddingTop: 40, fontSize: 12, color: palette.textSecondary, textAlign: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: palette.primary + "15", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🗺️</div>
        Map content behind the sheet
      </div>
      {height !== "closed" && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: heightMap[height], backgroundColor: palette.surface, borderRadius: `${system.spacing.radius.xl} ${system.spacing.radius.xl} 0 0`, boxShadow: system.spacing.elevation.lg, transition: "height 0.35s cubic-bezier(0.32,0.72,0,1)", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px", cursor: "pointer", flexShrink: 0 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: palette.border }} />
          </div>
          {showContent && (
            <div style={{ flex: 1, overflow: "auto", padding: "4px 16px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Explore</div>
              {sheetItems.slice(0, height === "peek" ? 2 : height === "half" ? 4 : 6).map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${palette.border}30` }}>
                  <div style={{ width: 36, height: 36, borderRadius: system.spacing.radius.md, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: palette.textSecondary }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <motion.section id="comp-bottom-sheet" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Bottom Sheet</p>
      <p style={sectionDesc}>
        Bottom sheets slide up from the screen edge with peek, half, and full snap points. A drag handle lets users resize the sheet, revealing more content as it expands.
      </p>

      <div style={subsectionLabel}>Snap Point Heights</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["peek", "half", "full"] as const).map(h => (
          <button key={h} onClick={() => setSheetHeight(h)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${sheetHeight === h ? palette.primary : palette.border}`, backgroundColor: sheetHeight === h ? palette.primary + "15" : palette.surface, color: sheetHeight === h ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>{h} ({heightMap[h]})</button>
        ))}
      </div>
      <div style={previewBox}>
        {renderSheet(sheetHeight, true)}
      </div>

      <div style={subsectionLabel}>All Heights Side-by-Side</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {(["peek", "half", "full"] as const).map(h => (
          <div key={h}>
            <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, textAlign: "center" }}>{h} — {heightMap[h]}</div>
            <div style={{ ...previewBox, padding: 12 }}>
              <div style={{ ...phoneFrame, width: 200, height: 320 }}>
                <div style={{ padding: 12, paddingTop: 24, fontSize: 10, color: palette.textSecondary, textAlign: "center" }}>🗺️ Map</div>
                {(
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: heightMap[h], backgroundColor: palette.surface, borderRadius: `${system.spacing.radius.lg} ${system.spacing.radius.lg} 0 0`, boxShadow: system.spacing.elevation.md, transition: "height 0.3s" }}>
                    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 4px" }}>
                      <div style={{ width: 28, height: 3, borderRadius: 2, backgroundColor: palette.border }} />
                    </div>
                    <div style={{ padding: "2px 10px", overflow: "hidden" }}>
                      {sheetItems.slice(0, h === "peek" ? 1 : h === "half" ? 3 : 5).map(item => (
                        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${palette.border}20` }}>
                          <span style={{ fontSize: 12 }}>{item.icon}</span>
                          <div style={{ fontSize: 9, color: palette.textPrimary }}>{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use bottom sheets" description="Persistent or contextual mobile surfaces:" items={[
          "Map-based apps showing location details",
          "Music/media player with expandable controls",
          "Shopping cart preview that expands to full view",
        ]} />
        <UsageSection palette={palette} title="Snap point selection" description="Choose snap points wisely:" items={[
          "Peek — show a teaser (title + 1–2 items)",
          "Half — comfortable browsing of a short list",
          "Full — complete view for long content or forms",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Always include a drag handle so users understand the sheet is resizable." },
        { type: "dont", text: "Don't block the content behind the sheet entirely at peek height — users still need context." },
        { type: "do", text: "Animate smoothly between snap points using a spring or ease-out curve." },
        { type: "dont", text: "Don't add too many snap points (3 max) — it becomes confusing." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Drag handle", description: "Visual affordance for resize gesture", x: 50, y: 10 },
        { id: 2, label: "Sheet surface", description: "Rounded container that slides up", x: 50, y: 50 },
        { id: 3, label: "Content area", description: "Scrollable list or form content", x: 50, y: 60 },
        { id: 4, label: "Scrim", description: "Optional backdrop at half/full height", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 160, height: 100, position: "relative", backgroundColor: palette.surfaceMuted, borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: palette.textPrimary, opacity: h === 4 ? 0.15 : h === null ? 0.05 : 0.03, transition: "opacity 0.2s" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", backgroundColor: palette.surface, borderRadius: `${system.spacing.radius.md} ${system.spacing.radius.md} 0 0`, boxShadow: "0 -2px 8px rgba(0,0,0,0.08)", opacity: h === 2 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "6px 0 4px", opacity: h === 1 ? 1 : h === null ? 1 : 0.3 }}>
              <div style={{ width: 24, height: 3, borderRadius: 2, backgroundColor: palette.border }} />
            </div>
            <div style={{ padding: "0 10px", opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              {[0, 1].map(i => <div key={i} style={{ height: 3, width: i === 0 ? "80%" : "50%", backgroundColor: palette.border, borderRadius: 2, marginBottom: 4 }} />)}
            </div>
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Peek Height", value: "20–25% viewport" },
        { label: "Half Height", value: "50% viewport" },
        { label: "Full Height", value: "90–95% viewport" },
        { label: "Drag Handle Size", value: "36×4px" },
        { label: "Corner Radius", value: "16–24px (top)" },
      ]} />
    </motion.section>
  );
}
