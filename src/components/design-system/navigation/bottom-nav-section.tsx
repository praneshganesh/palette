"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface BottomNavSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

interface NavItem {
  label: string;
  icon: string;
  badge?: number;
}

export function BottomNavSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: BottomNavSectionProps) {
  const comp = system.components;
  const [defaultActive, setDefaultActive] = useState(0);
  const [labelActive, setLabelActive] = useState(0);
  const [badgeActive, setBadgeActive] = useState(0);
  const [fabActive, setFabActive] = useState(0);
  const [shiftActive, setShiftActive] = useState(0);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
    display: "flex", justifyContent: "center",
  };

  const phoneFrame: React.CSSProperties = {
    width: 320, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const phoneScreen: React.CSSProperties = {
    height: 100, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, color: palette.textSecondary,
  };

  const defaultItems: NavItem[] = [
    { label: "Home", icon: "⌂" }, { label: "Search", icon: "⌕" },
    { label: "Notifications", icon: "🔔" }, { label: "Profile", icon: "◉" },
  ];

  const badgeItems: NavItem[] = [
    { label: "Home", icon: "⌂" }, { label: "Messages", icon: "✉", badge: 3 },
    { label: "Alerts", icon: "🔔", badge: 12 }, { label: "Profile", icon: "◉" },
  ];

  const fiveItems: NavItem[] = [
    { label: "Home", icon: "⌂" }, { label: "Search", icon: "⌕" },
    { label: "Add", icon: "＋" }, { label: "Activity", icon: "♡" }, { label: "Profile", icon: "◉" },
  ];

  const renderBottomBar = (
    items: NavItem[],
    active: number,
    onChange: (i: number) => void,
    options?: { showLabels?: boolean; fab?: boolean; shifting?: boolean },
  ) => {
    const fabIndex = options?.fab ? Math.floor(items.length / 2) : -1;

    return (
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-around",
        backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}`,
        padding: "6px 4px 10px", position: "relative",
      }}>
        {items.map((item, i) => {
          const isActive = active === i;
          const isFab = i === fabIndex;
          const showLabel = options?.showLabels !== false;
          const isShifting = options?.shifting;
          const itemWidth = isShifting && isActive ? "28%" : isShifting ? `${72 / (items.length - 1)}%` : "auto";

          if (isFab) {
            return (
              <div key={i} onClick={() => onChange(i)} style={{
                width: 48, height: 48, borderRadius: "50%",
                backgroundColor: palette.primary, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, cursor: "pointer", marginTop: -20,
                boxShadow: system.spacing.elevation.md,
              }}>
                {item.icon}
              </div>
            );
          }

          return (
            <div key={i} onClick={() => onChange(i)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              cursor: "pointer", padding: "4px 8px", position: "relative",
              transition: "all 0.2s", width: itemWidth,
              flex: isShifting ? undefined : 1,
            }}>
              <div style={{ position: "relative" }}>
                <span style={{
                  fontSize: 18, color: isActive ? palette.primary : palette.textSecondary,
                  transition: "color 0.2s",
                }}>
                  {item.icon}
                </span>
                {item.badge && (
                  <span style={{
                    position: "absolute", top: -4, right: -10,
                    backgroundColor: palette.danger, color: "#fff",
                    fontSize: 9, fontWeight: 700, padding: "1px 5px",
                    borderRadius: 10, minWidth: 16, textAlign: "center",
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>
              {(showLabel && (!isShifting || isActive)) && (
                <span style={{
                  fontSize: isActive ? 11 : 10, fontWeight: isActive ? 600 : 400,
                  color: isActive ? palette.primary : palette.textSecondary,
                  transition: "all 0.2s", whiteSpace: "nowrap",
                }}>
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.section id="comp-bottom-nav" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Bottom Navigation</p>
      <p style={sectionDesc}>
        Bottom navigation bars provide quick access to top-level destinations in a mobile app.
        They appear at the foot of the screen and support 3–5 items with icons and optional labels.
      </p>

      {/* Default */}
      <div style={subsectionLabel}>Default (3–5 Items)</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={phoneScreen}>Tap items below to navigate</div>
          {renderBottomBar(defaultItems, defaultActive, setDefaultActive, { showLabels: false })}
        </div>
      </div>

      {/* With Labels */}
      <div style={subsectionLabel}>With Labels</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={phoneScreen}>{defaultItems[labelActive].label} screen</div>
          {renderBottomBar(defaultItems, labelActive, setLabelActive, { showLabels: true })}
        </div>
      </div>

      {/* With Badge */}
      <div style={subsectionLabel}>With Badge</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={phoneScreen}>{badgeItems[badgeActive].label}</div>
          {renderBottomBar(badgeItems, badgeActive, setBadgeActive, { showLabels: true })}
        </div>
      </div>

      {/* With FAB Center */}
      <div style={subsectionLabel}>With FAB Center</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={phoneScreen}>{fiveItems[fabActive].label}</div>
          {renderBottomBar(fiveItems, fabActive, setFabActive, { showLabels: true, fab: true })}
        </div>
      </div>

      {/* Shifting */}
      <div style={subsectionLabel}>Shifting (Active Item Expands)</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={phoneScreen}>{defaultItems[shiftActive].label}</div>
          {renderBottomBar(defaultItems, shiftActive, setShiftActive, { showLabels: true, shifting: true })}
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use bottom navigation" description="Bottom nav is best for mobile-first apps:" items={[
          "3–5 top-level destinations of equal importance",
          "Frequently switched sections (Home, Search, Profile)",
          "Mobile-first or responsive layouts",
          "Apps where tab bar would be the primary navigation",
        ]} />
        <UsageSection palette={palette} title="Variant selection" description="Choose based on content and emphasis:" items={[
          "Default — Icons only for minimal UI",
          "With labels — When icons alone aren't clear enough",
          "With FAB — A primary creation action (Add, Compose)",
          "Shifting — Emphasis on the active destination",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use 3–5 destinations. Fewer than 3 doesn't justify a bottom bar; more than 5 is cramped." },
        { type: "dont", text: "Don't use bottom nav with a tab bar or sidebar simultaneously. Pick one primary navigation." },
        { type: "do", text: "Show badges for unread counts to draw attention to important updates." },
        { type: "dont", text: "Don't place destructive or rarely-used actions in the bottom nav. It's for top-level destinations." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Bottom-fixed bar with top border", x: 50, y: 85 },
          { id: 2, label: "Icon", description: "Visual identifier for each destination", x: 20, y: 20 },
          { id: 3, label: "Label", description: "Text label below the icon", x: 20, y: 65 },
          { id: 4, label: "Badge", description: "Notification count indicator", x: 70, y: 10 },
          { id: 5, label: "Active indicator", description: "Color change or highlight on active item", x: 50, y: 40 },
        ]}
        renderPreview={(h) => (
          <div style={{
            width: 280, display: "flex", justifyContent: "space-around", padding: "8px 4px 12px",
            backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.md,
            opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
          }}>
            {[
              { icon: "⌂", label: "Home", active: true },
              { icon: "⌕", label: "Search", active: false },
              { icon: "🔔", label: "Alerts", active: false, badge: 5 },
              { icon: "◉", label: "Profile", active: false },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <span style={{
                    fontSize: 16, color: item.active ? palette.primary : palette.textSecondary,
                    opacity: h === 2 ? 1 : h === 5 && item.active ? 1 : h === null ? 1 : 0.3,
                    transition: "opacity 0.2s",
                  }}>{item.icon}</span>
                  {item.badge && (
                    <span style={{
                      position: "absolute", top: -4, right: -8,
                      backgroundColor: palette.danger, color: "#fff",
                      fontSize: 8, padding: "0 4px", borderRadius: 8, fontWeight: 700,
                      opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
                    }}>{item.badge}</span>
                  )}
                </div>
                <span style={{
                  fontSize: 9, color: item.active ? palette.primary : palette.textSecondary,
                  fontWeight: item.active ? 600 : 400,
                  opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
                }}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Bar Height", value: "56–64px" },
        { label: "Icon Size", value: "18–22px" },
        { label: "Label Font Size", value: "10–11px" },
        { label: "FAB Size", value: "48px" },
        { label: "Badge Min Width", value: "16px" },
      ]} />
    </motion.section>
  );
}
