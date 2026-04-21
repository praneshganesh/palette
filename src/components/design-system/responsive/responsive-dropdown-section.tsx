"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ResponsiveDropdownSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const options = ["All Categories", "Design", "Development", "Marketing", "Analytics", "Support"];

export function ResponsiveDropdownSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ResponsiveDropdownSectionProps) {
  const comp = system.components;
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [desktopSelected, setDesktopSelected] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSelected, setMobileSelected] = useState(0);

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
    width: 300, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative", minHeight: 380,
  };

  const renderDesktopDropdown = () => (
    <div style={{ width: 260, position: "relative" }}>
      <div onClick={() => setDesktopOpen(!desktopOpen)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", backgroundColor: palette.surface, border: `1px solid ${desktopOpen ? palette.primary : palette.border}`, borderRadius: system.spacing.radius.md, cursor: "pointer", transition: "border-color 0.2s" }}>
        <span style={{ fontSize: 13, color: palette.textPrimary }}>{options[desktopSelected]}</span>
        <span style={{ fontSize: 10, color: palette.textSecondary, transform: desktopOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </div>
      {desktopOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, boxShadow: system.spacing.elevation.md, zIndex: 10, overflow: "hidden" }}>
          {options.map((opt, i) => (
            <div key={opt} onClick={() => { setDesktopSelected(i); setDesktopOpen(false); }} style={{ padding: "10px 14px", fontSize: 13, color: i === desktopSelected ? palette.primary : palette.textPrimary, backgroundColor: i === desktopSelected ? palette.primary + "08" : "transparent", cursor: "pointer", fontWeight: i === desktopSelected ? 600 : 400, borderBottom: i < options.length - 1 ? `1px solid ${palette.border}30` : "none" }}>
              {opt}
              {i === desktopSelected && <span style={{ float: "right", color: palette.primary }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMobileActionSheet = () => (
    <div style={phoneFrame}>
      <div style={{ padding: "16px", paddingTop: 30 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Category</div>
        <div onClick={() => setMobileOpen(true)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, cursor: "pointer" }}>
          <span style={{ fontSize: 14, color: palette.textPrimary }}>{options[mobileSelected]}</span>
          <span style={{ fontSize: 10, color: palette.textSecondary }}>▼</span>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: palette.surface, borderRadius: `${system.spacing.radius.xl} ${system.spacing.radius.xl} 0 0`, zIndex: 11, paddingBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: palette.border }} />
            </div>
            <div style={{ padding: "8px 16px 12px", fontSize: 15, fontWeight: 700, color: palette.textPrimary, borderBottom: `1px solid ${palette.border}` }}>Select Category</div>
            {options.map((opt, i) => (
              <div key={opt} onClick={() => { setMobileSelected(i); setMobileOpen(false); }} style={{ padding: "14px 16px", fontSize: 15, color: i === mobileSelected ? palette.primary : palette.textPrimary, fontWeight: i === mobileSelected ? 600 : 400, display: "flex", justifyContent: "space-between", cursor: "pointer", borderBottom: i < options.length - 1 ? `1px solid ${palette.border}30` : "none" }}>
                {opt}
                {i === mobileSelected && <span style={{ color: palette.primary }}>✓</span>}
              </div>
            ))}
            <div style={{ padding: "8px 16px 0" }}>
              <button onClick={() => setMobileOpen(false)} style={{ width: "100%", padding: "12px", fontSize: 15, fontWeight: 600, color: palette.textSecondary, backgroundColor: palette.surfaceMuted, border: "none", borderRadius: system.spacing.radius.md, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <motion.section id="comp-responsive-dropdown" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Responsive Dropdown</p>
      <p style={sectionDesc}>
        Dropdowns adapt from a floating popover on desktop to a full-screen action sheet on mobile, providing touch-friendly selection at smaller viewports.
      </p>

      <div style={subsectionLabel}>Side-by-Side Comparison</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Desktop — Floating Popover</div>
          <div style={{ ...previewBox, minHeight: 280, alignItems: "flex-start", paddingTop: 40 }}>{renderDesktopDropdown()}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Mobile — Action Sheet</div>
          <div style={previewBox}>{renderMobileActionSheet()}</div>
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use responsive dropdowns" description="Selection controls that must work across devices:" items={[
          "Filters, sort options, or category selectors",
          "Settings or preference pickers",
          "Any list where a single option must be chosen",
        ]} />
        <UsageSection palette={palette} title="Adaptation patterns" description="Match the viewport:" items={[
          "Desktop: lightweight popover below the trigger",
          "Mobile: bottom action sheet with drag handle",
          "Tablet: popover with larger touch targets",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use a scrim/backdrop on mobile to focus attention on the action sheet." },
        { type: "dont", text: "Don't display a tiny floating popover on mobile — fingers will struggle to tap items." },
        { type: "do", text: "Include a Cancel button at the bottom of the mobile action sheet." },
        { type: "dont", text: "Don't present more than 8–10 items in an action sheet; use a search/filter list instead." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Trigger", description: "Button or field that opens the dropdown", x: 50, y: 15 },
        { id: 2, label: "Popover (desktop)", description: "Floating list below trigger", x: 50, y: 50 },
        { id: 3, label: "Action sheet (mobile)", description: "Bottom sheet with full-width options", x: 50, y: 70 },
        { id: 4, label: "Drag handle", description: "Indicator for sheet dismiss", x: 50, y: 40 },
        { id: 5, label: "Cancel button", description: "Explicit dismiss action", x: 50, y: 90 },
      ]} renderPreview={(h) => (
        <div style={{ width: 180 }}>
          <div style={{ padding: "8px 12px", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, fontSize: 11, color: palette.textPrimary, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>Select…&nbsp;&nbsp;▼</div>
          <div style={{ marginTop: 4, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, overflow: "hidden", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {options.slice(0, 3).map((o, i) => <div key={o} style={{ padding: "6px 12px", fontSize: 10, color: palette.textPrimary, borderBottom: i < 2 ? `1px solid ${palette.border}30` : "none" }}>{o}</div>)}
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Trigger Height", value: "40–44px" },
        { label: "Popover Max Height", value: "300px" },
        { label: "Action Sheet Item Height", value: "48–52px" },
        { label: "Drag Handle Width", value: "36px" },
        { label: "Scrim Opacity", value: "40%" },
      ]} />
    </motion.section>
  );
}
