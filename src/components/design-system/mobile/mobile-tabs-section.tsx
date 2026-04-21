"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface MobileTabsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const tabItems = [
  { icon: "🏠", label: "Home", badge: 0 },
  { icon: "🔍", label: "Explore", badge: 0 },
  { icon: "🔔", label: "Alerts", badge: 5 },
  { icon: "💬", label: "Messages", badge: 12 },
  { icon: "👤", label: "Profile", badge: 0 },
  { icon: "⚙️", label: "Settings", badge: 0 },
  { icon: "📊", label: "Analytics", badge: 0 },
  { icon: "📁", label: "Files", badge: 3 },
];

const tabContent: Record<string, string[]> = {
  Home: ["Featured post #1", "Featured post #2", "Trending now"],
  Explore: ["Category A", "Category B", "Category C"],
  Alerts: ["New follower", "Comment reply", "System update", "Price alert", "Weekly digest"],
  Messages: ["Alice: Hey there!", "Bob: Meeting at 3?", "Team: Sprint review"],
};

export function MobileTabsSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: MobileTabsSectionProps) {
  const comp = system.components;
  const [activeTab, setActiveTab] = useState(0);
  const [tabStyle, setTabStyle] = useState<"icon-text" | "icon-only" | "text-only">("icon-text");

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
    width: 300, height: 460, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
  };

  const renderTab = (item: typeof tabItems[number], idx: number, style: string) => {
    const isActive = idx === activeTab;
    return (
      <button key={item.label} onClick={() => setActiveTab(idx)} style={{ flex: style === "text-only" ? "none" : 1, padding: style === "text-only" ? "8px 16px" : "8px 4px", backgroundColor: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative", borderBottom: isActive ? `2px solid ${palette.primary}` : "2px solid transparent", transition: "all 0.2s" }}>
        {style !== "text-only" && <span style={{ fontSize: 18, opacity: isActive ? 1 : 0.5, transition: "opacity 0.2s" }}>{item.icon}</span>}
        {style !== "icon-only" && <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? palette.primary : palette.textSecondary, transition: "color 0.2s" }}>{item.label}</span>}
        {item.badge > 0 && (
          <span style={{ position: "absolute", top: 4, right: style === "text-only" ? -4 : "calc(50% - 18px)", minWidth: 16, height: 16, borderRadius: 8, backgroundColor: palette.danger, color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>{item.badge}</span>
        )}
      </button>
    );
  };

  const items = tabContent[tabItems[activeTab]?.label] ?? ["Content for " + tabItems[activeTab]?.label];

  return (
    <motion.section id="comp-mobile-tabs" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Mobile Tabs</p>
      <p style={sectionDesc}>
        Mobile tabs provide scrollable, touch-friendly tab navigation with optional badges, icon+text combinations, and swipeable content areas for fast section switching.
      </p>

      <div style={subsectionLabel}>Tab Styles</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["icon-text", "icon-only", "text-only"] as const).map(s => (
          <button key={s} onClick={() => setTabStyle(s)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${tabStyle === s ? palette.primary : palette.border}`, backgroundColor: tabStyle === s ? palette.primary + "15" : palette.surface, color: tabStyle === s ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>{s.replace("-", " + ")}</button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, marginBottom: 12 }}>{tabItems[activeTab]?.label}</div>
            {items.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, marginBottom: 8, fontSize: 13, color: palette.textPrimary }}>{item}</div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surface, display: "flex", overflowX: "auto", flexShrink: 0 }}>
            {(tabStyle === "text-only" ? tabItems : tabItems.slice(0, 5)).map((t, i) => renderTab(t, i, tabStyle))}
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>Scrollable Overflow</div>
      <div style={previewBox}>
        <div style={{ width: 300, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
          <div style={{ display: "flex", overflowX: "auto", borderBottom: `1px solid ${palette.border}`, padding: "0 8px" }}>
            {tabItems.map((t, i) => (
              <button key={t.label} onClick={() => setActiveTab(i)} style={{ padding: "10px 16px", fontSize: 12, fontWeight: activeTab === i ? 700 : 400, color: activeTab === i ? palette.primary : palette.textSecondary, backgroundColor: "transparent", border: "none", borderBottom: activeTab === i ? `2px solid ${palette.primary}` : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{t.label}</button>
            ))}
          </div>
          <div style={{ padding: 16, fontSize: 12, color: palette.textSecondary, minHeight: 60 }}>Showing content for &ldquo;{tabItems[activeTab]?.label}&rdquo;</div>
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use mobile tabs" description="Section navigation on small screens:" items={[
          "Bottom navigation for 3–5 top-level destinations",
          "Scrollable tabs for categorized content (6+ sections)",
          "Swipeable content panels tied to tab indicators",
        ]} />
        <UsageSection palette={palette} title="Tab style selection" description="Choose the right format:" items={[
          "Icon + Text — most accessible, clearest meaning",
          "Icon only — space-efficient, needs recognizable icons",
          "Text only — scrollable for many categories",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Limit bottom tabs to 3–5 items; use scrollable tabs for more." },
        { type: "dont", text: "Don't mix icon-only and icon+text styles in the same tab bar." },
        { type: "do", text: "Show badge counts for unread/pending items to draw attention." },
        { type: "dont", text: "Don't nest tab bars — one level of tabs per screen." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Tab bar", description: "Container anchored to bottom of screen", x: 50, y: 85 },
        { id: 2, label: "Tab item", description: "Tappable icon + label unit", x: 30, y: 85 },
        { id: 3, label: "Active indicator", description: "Underline or fill showing current tab", x: 30, y: 78 },
        { id: 4, label: "Badge", description: "Count badge for notifications", x: 70, y: 75 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, height: 80, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 8, left: 12, right: 12 }}>
            {[0, 1].map(i => <div key={i} style={{ height: 3, width: i === 0 ? "70%" : "40%", backgroundColor: palette.border, borderRadius: 2, marginBottom: 4 }} />)}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surface, display: "flex", padding: "6px 0", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {["🏠", "🔍", "🔔", "👤"].map((icon, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", opacity: h === 2 && i === 0 ? 1 : h === 2 ? 0.3 : h === null ? 1 : h === 4 && i === 2 ? 1 : 0.6, transition: "opacity 0.2s" }}>
                <div style={{ fontSize: 14 }}>{icon}</div>
                <div style={{ height: 2, width: 20, margin: "2px auto 0", backgroundColor: i === 0 ? palette.primary : "transparent", borderRadius: 1, opacity: h === 3 ? 1 : h === null ? 1 : 0.3 }} />
                {i === 2 && <span style={{ position: "absolute", top: 2, fontSize: 7, backgroundColor: palette.danger, color: "#fff", borderRadius: 6, padding: "0 3px", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, marginLeft: 4 }}>5</span>}
              </div>
            ))}
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Tab Bar Height", value: "56–64px" },
        { label: "Icon Size", value: "24×24px" },
        { label: "Label Font", value: "10–12px / 600" },
        { label: "Badge Min Width", value: "16px" },
        { label: "Scrollable Tab Padding", value: "10–16px" },
      ]} />
    </motion.section>
  );
}
