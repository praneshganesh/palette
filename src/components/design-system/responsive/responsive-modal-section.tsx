"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ResponsiveModalSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function ResponsiveModalSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ResponsiveModalSectionProps) {
  const comp = system.components;
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

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
    width: 300, height: 420, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const desktopFrame: React.CSSProperties = {
    width: 480, height: 320, backgroundColor: palette.background,
    borderRadius: system.spacing.radius.lg, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const modalContent = (
    <>
      <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 8 }}>Confirm Action</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
        Are you sure you want to proceed? This action cannot be undone and will affect all related items.
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button style={{ padding: "8px 18px", fontSize: 13, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textPrimary, borderRadius: system.spacing.radius.md, cursor: "pointer" }}>Cancel</button>
        <button style={{ padding: "8px 18px", fontSize: 13, border: "none", backgroundColor: palette.primary, color: "#fff", borderRadius: system.spacing.radius.md, cursor: "pointer", fontWeight: 600 }}>Confirm</button>
      </div>
    </>
  );

  return (
    <motion.section id="comp-responsive-modal" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Responsive Modal</p>
      <p style={sectionDesc}>
        Modals transform between a centered dialog on desktop and a full-screen or bottom-sheet presentation on mobile, ensuring comfortable interaction at any viewport.
      </p>

      <div style={subsectionLabel}>Side-by-Side Comparison</div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Desktop — Centered Dialog</div>
          <div style={previewBox}>
            <div style={desktopFrame}>
              <div style={{ padding: 20, fontSize: 13, color: palette.textSecondary }}>
                <button onClick={() => setDesktopOpen(!desktopOpen)} style={{ padding: "8px 16px", fontSize: 13, backgroundColor: palette.primary, color: "#fff", border: "none", borderRadius: system.spacing.radius.md, cursor: "pointer", fontWeight: 600 }}>Open Modal</button>
              </div>
              {desktopOpen && (
                <>
                  <div onClick={() => setDesktopOpen(false)} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80%", maxWidth: 360, backgroundColor: palette.surface, borderRadius: system.spacing.radius.lg, padding: 24, boxShadow: system.spacing.elevation.lg, zIndex: 10 }}>
                    {modalContent}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Mobile — Full Screen</div>
          <div style={previewBox}>
            <div style={phoneFrame}>
              <div style={{ padding: 20, paddingTop: 40, fontSize: 13, color: palette.textSecondary }}>
                <button onClick={() => setMobileOpen(!mobileOpen)} style={{ padding: "10px 20px", fontSize: 14, backgroundColor: palette.primary, color: "#fff", border: "none", borderRadius: system.spacing.radius.md, cursor: "pointer", fontWeight: 600 }}>Open Modal</button>
              </div>
              {mobileOpen && (
                <div style={{ position: "absolute", inset: 0, backgroundColor: palette.surface, zIndex: 10, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", padding: "14px 16px", borderBottom: `1px solid ${palette.border}` }}>
                    <span onClick={() => setMobileOpen(false)} style={{ fontSize: 18, color: palette.textSecondary, cursor: "pointer" }}>✕</span>
                  </div>
                  <div style={{ flex: 1, padding: 20 }}>{modalContent}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>Bottom Sheet Variant (Mobile)</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: 20, paddingTop: 40 }}>
            <button onClick={() => setSheetOpen(!sheetOpen)} style={{ padding: "10px 20px", fontSize: 14, backgroundColor: palette.primary, color: "#fff", border: "none", borderRadius: system.spacing.radius.md, cursor: "pointer", fontWeight: 600 }}>Open Bottom Sheet</button>
          </div>
          {sheetOpen && (
            <>
              <div onClick={() => setSheetOpen(false)} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 10 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: palette.surface, borderRadius: `${system.spacing.radius.xl} ${system.spacing.radius.xl} 0 0`, padding: "12px 20px 24px", zIndex: 11 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: palette.border }} />
                </div>
                {modalContent}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use responsive modals" description="Dialogs that must work at all sizes:" items={[
          "Confirmation dialogs for destructive actions",
          "Form entry that overlays current context",
          "Quick detail views or previews",
        ]} />
        <UsageSection palette={palette} title="Mobile patterns" description="Choose the right mobile treatment:" items={[
          "Full-screen — complex forms or multi-step flows",
          "Bottom sheet — quick selections or short confirmations",
          "Centered dialog — avoid on mobile (too cramped)",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use full-screen modals on mobile for complex forms — it gives users enough room to interact." },
        { type: "dont", text: "Don't center a narrow modal on mobile — it wastes screen space and is hard to dismiss." },
        { type: "do", text: "Include a visible close button (✕) on mobile modals, not just a backdrop tap to dismiss." },
        { type: "dont", text: "Don't stack modals on top of each other. Replace the current modal or navigate inline." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Backdrop / scrim", description: "Semi-transparent overlay behind the modal", x: 50, y: 50 },
        { id: 2, label: "Modal container", description: "Centered card or full-screen surface", x: 50, y: 30 },
        { id: 3, label: "Header / close", description: "Title area with dismiss action", x: 50, y: 15 },
        { id: 4, label: "Body", description: "Content area for text, forms, or media", x: 50, y: 50 },
        { id: 5, label: "Actions", description: "Footer buttons (Cancel / Confirm)", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, height: 120, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: palette.surfaceMuted, borderRadius: system.spacing.radius.sm, opacity: h === 1 ? 1 : h === null ? 0.4 : 0.2, transition: "opacity 0.2s" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "75%", backgroundColor: palette.surface, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden", opacity: h === 2 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>
            <div style={{ padding: "6px 10px", borderBottom: `1px solid ${palette.border}`, display: "flex", justifyContent: "space-between", opacity: h === 3 ? 1 : h === null ? 1 : 0.4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: palette.textPrimary }}>Title</span>
              <span style={{ fontSize: 9, color: palette.textSecondary }}>✕</span>
            </div>
            <div style={{ padding: "8px 10px", opacity: h === 4 ? 1 : h === null ? 1 : 0.4 }}>
              <div style={{ height: 4, width: "90%", backgroundColor: palette.border, borderRadius: 2, marginBottom: 4 }} />
              <div style={{ height: 4, width: "60%", backgroundColor: palette.border, borderRadius: 2 }} />
            </div>
            <div style={{ padding: "6px 10px", borderTop: `1px solid ${palette.border}`, display: "flex", justifyContent: "flex-end", gap: 4, opacity: h === 5 ? 1 : h === null ? 1 : 0.4 }}>
              <div style={{ width: 28, height: 10, borderRadius: 3, border: `1px solid ${palette.border}` }} />
              <div style={{ width: 28, height: 10, borderRadius: 3, backgroundColor: palette.primary }} />
            </div>
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Desktop Max Width", value: "480–640px" },
        { label: "Mobile Treatment", value: "Full-screen or bottom sheet" },
        { label: "Scrim Opacity", value: "35–50%" },
        { label: "Border Radius (desktop)", value: "12–16px" },
        { label: "Bottom Sheet Radius", value: "16–24px (top only)" },
      ]} />
    </motion.section>
  );
}
