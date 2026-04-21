"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ResponsiveMenuSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const navItems = ["Dashboard", "Analytics", "Projects", "Settings", "Help"];

export function ResponsiveMenuSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ResponsiveMenuSectionProps) {
  const comp = system.components;
  const [desktopActive, setDesktopActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);

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
    overflow: "hidden", position: "relative", minHeight: 340,
  };

  const renderDesktopNav = () => (
    <div style={{ width: "100%", maxWidth: 600, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: palette.primary, padding: "12px 0" }}>Brand</div>
      <div style={{ display: "flex", gap: 4 }}>
        {navItems.map((item, i) => (
          <button key={item} onClick={() => setDesktopActive(i)} style={{ padding: "10px 14px", fontSize: 13, fontWeight: desktopActive === i ? 600 : 400, color: desktopActive === i ? palette.primary : palette.textSecondary, backgroundColor: desktopActive === i ? palette.primary + "10" : "transparent", border: "none", borderRadius: system.spacing.radius.sm, cursor: "pointer", transition: "all 0.2s", borderBottom: desktopActive === i ? `2px solid ${palette.primary}` : "2px solid transparent" }}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  const renderMobileNav = () => (
    <div style={phoneFrame}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${palette.border}`, backgroundColor: palette.surface }}>
        <span style={{ fontWeight: 700, fontSize: 15, color: palette.primary }}>Brand</span>
        <div onClick={() => setMobileOpen(!mobileOpen)} style={{ width: 32, height: 32, borderRadius: system.spacing.radius.sm, backgroundColor: mobileOpen ? palette.primary + "15" : palette.surfaceMuted, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", transition: "all 0.2s" }}>
          {mobileOpen
            ? <span style={{ fontSize: 16, color: palette.primary, lineHeight: 1 }}>✕</span>
            : [0, 1, 2].map(j => <div key={j} style={{ width: 14, height: 2, backgroundColor: palette.textSecondary, borderRadius: 1, transition: "all 0.2s" }} />)
          }
        </div>
      </div>

      {mobileOpen && (
        <div style={{ position: "absolute", top: 56, left: 0, right: 0, bottom: 0, backgroundColor: palette.background + "f5", backdropFilter: "blur(8px)", zIndex: 10, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item, i) => (
            <button key={item} onClick={() => { setMobileActive(i); setMobileOpen(false); }} style={{ padding: "14px 16px", fontSize: 15, fontWeight: mobileActive === i ? 600 : 400, color: mobileActive === i ? palette.primary : palette.textPrimary, backgroundColor: mobileActive === i ? palette.primary + "10" : "transparent", border: "none", borderRadius: system.spacing.radius.md, textAlign: "left", cursor: "pointer", transition: "all 0.15s" }}>
              {item}
            </button>
          ))}
        </div>
      )}

      {!mobileOpen && (
        <div style={{ padding: 20, fontSize: 13, color: palette.textSecondary, textAlign: "center", paddingTop: 60 }}>
          {navItems[mobileActive]} screen
        </div>
      )}
    </div>
  );

  return (
    <motion.section id="comp-responsive-menu" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Responsive Menu</p>
      <p style={sectionDesc}>
        Navigation menus adapt from a horizontal navbar on desktop to a hamburger-triggered overlay on mobile, maintaining access to all destinations at every breakpoint.
      </p>

      <div style={subsectionLabel}>Side-by-Side Comparison</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Desktop — Horizontal Bar</div>
          <div style={previewBox}>{renderDesktopNav()}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Mobile — Hamburger Overlay</div>
          <div style={previewBox}>{renderMobileNav()}</div>
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use responsive menus" description="Primary navigation that must work everywhere:" items={[
          "Sites with 4–8 top-level navigation items",
          "Applications where the header is the main navigation",
          "Marketing sites with multiple page sections",
        ]} />
        <UsageSection palette={palette} title="Desktop vs. mobile behaviour" description="Adaptation strategies:" items={[
          "Desktop: horizontal row of links with active indicator",
          "Mobile: hamburger icon reveals full-screen overlay",
          "Tablet: icon-only or condensed horizontal layout",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Animate the overlay in smoothly so users understand the transition from collapsed to expanded." },
        { type: "dont", text: "Don't nest more than two levels deep in a mobile overlay — use a drill-down pattern instead." },
        { type: "do", text: "Mark the current page clearly on both desktop and mobile with colour or weight." },
        { type: "dont", text: "Don't auto-close the menu while the user is scrolling through items." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Nav bar", description: "Container for logo and items", x: 50, y: 15 },
        { id: 2, label: "Logo / brand", description: "Identity mark", x: 10, y: 15 },
        { id: 3, label: "Nav items", description: "Horizontal links on desktop", x: 60, y: 15 },
        { id: 4, label: "Hamburger icon", description: "Mobile trigger button", x: 90, y: 15 },
        { id: 5, label: "Overlay", description: "Full-screen menu on mobile", x: 50, y: 60 },
      ]} renderPreview={(h) => (
        <div style={{ width: 240, backgroundColor: palette.surface, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: palette.primary, opacity: h === 2 ? 1 : h === null ? 1 : 0.4 }}>Brand</span>
            <div style={{ display: "flex", gap: 8, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              {navItems.slice(0, 3).map(n => <span key={n} style={{ fontSize: 9, color: palette.textSecondary }}>{n}</span>)}
            </div>
            <div style={{ width: 14, height: 12, display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: h === 4 ? 1 : h === null ? 1 : 0.3 }}>
              {[0, 1, 2].map(j => <div key={j} style={{ height: 2, backgroundColor: palette.textSecondary, borderRadius: 1 }} />)}
            </div>
          </div>
          <div style={{ padding: "12px", borderTop: `1px solid ${palette.border}`, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {navItems.slice(0, 3).map(n => <div key={n} style={{ padding: "4px 0", fontSize: 10, color: palette.textPrimary }}>{n}</div>)}
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Desktop Bar Height", value: "48–56px" },
        { label: "Hamburger Icon Size", value: "32×32px" },
        { label: "Overlay Item Padding", value: "14–16px" },
        { label: "Breakpoint", value: "< 768px" },
        { label: "Nav Item Font", value: "13–15px" },
      ]} />
    </motion.section>
  );
}
