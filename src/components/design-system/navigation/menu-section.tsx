"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface MenuSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  divider?: boolean;
  children?: MenuItem[];
  disabled?: boolean;
}

export function MenuSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: MenuSectionProps) {
  const comp = system.components;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [contextPos, setContextPos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [nestedOpen, setNestedOpen] = useState(false);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    padding: 24,
  };

  const menuPanel: React.CSSProperties = {
    minWidth: 200, backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: comp.card.borderRadius || system.spacing.radius.md,
    boxShadow: system.spacing.elevation.lg,
    padding: "4px 0", overflow: "hidden",
  };

  const menuItem = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "8px 14px", fontSize: 13, cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? palette.textSecondary + "60" : active ? palette.primary : palette.textPrimary,
    backgroundColor: active ? palette.primary + "10" : "transparent",
    transition: "all 0.15s", fontFamily: system.typography.bodyFont,
  });

  const dividerStyle: React.CSSProperties = {
    height: 1, backgroundColor: palette.border, margin: "4px 0",
  };

  const triggerBtn = (id: string, label: string) => (
    <button
      onClick={() => setOpenMenu(openMenu === id ? null : id)}
      style={{
        padding: `${comp.button.paddingY || "8px"} ${comp.button.paddingX || "16px"}`,
        fontSize: 13, fontWeight: 500, cursor: "pointer",
        color: openMenu === id ? palette.primary : palette.textPrimary,
        backgroundColor: openMenu === id ? palette.primary + "10" : palette.surfaceMuted,
        border: `1px solid ${openMenu === id ? palette.primary + "30" : palette.border}`,
        borderRadius: comp.button.borderRadius || system.spacing.radius.md,
        fontFamily: system.typography.bodyFont,
      }}
    >
      {label} <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
    </button>
  );

  const basicItems: MenuItem[] = [
    { label: "New File" }, { label: "Open" }, { label: "Save" },
    { label: "Save As..." }, { label: "Export" },
  ];

  const iconItems: MenuItem[] = [
    { label: "Dashboard", icon: "◫" }, { label: "Settings", icon: "⚙" },
    { label: "Profile", icon: "◉" }, { label: "Logout", icon: "⏻" },
  ];

  const dividerItems: MenuItem[] = [
    { label: "Cut", shortcut: "⌘X" }, { label: "Copy", shortcut: "⌘C" },
    { label: "Paste", shortcut: "⌘V" }, { label: "", divider: true },
    { label: "Select All", shortcut: "⌘A" }, { label: "", divider: true },
    { label: "Delete", shortcut: "⌫" },
  ];

  const nestedItems: MenuItem[] = [
    { label: "View", children: [
      { label: "Zoom In" }, { label: "Zoom Out" }, { label: "Reset Zoom" },
    ]},
    { label: "Sort by", children: [
      { label: "Name" }, { label: "Date" }, { label: "Size" }, { label: "Type" },
    ]},
    { label: "Preferences" },
  ];

  const contextItems: MenuItem[] = [
    { label: "Inspect Element", shortcut: "⌘⇧I" },
    { label: "View Source", shortcut: "⌘U" },
    { label: "", divider: true },
    { label: "Refresh", shortcut: "⌘R" },
    { label: "", divider: true },
    { label: "Back" }, { label: "Forward", disabled: true },
  ];

  const renderMenu = (items: MenuItem[], showIcons = false) => (
    <div style={menuPanel}>
      {items.map((item, i) => {
        if (item.divider) return <div key={i} style={dividerStyle} />;
        const isHovered = hoveredItem === `${item.label}-${i}`;
        return (
          <div
            key={i}
            style={menuItem(isHovered, item.disabled)}
            onMouseEnter={() => !item.disabled && setHoveredItem(`${item.label}-${i}`)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {showIcons && item.icon && <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.shortcut && (
              <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: "monospace" }}>
                {item.shortcut}
              </span>
            )}
            {item.children && <span style={{ fontSize: 10, color: palette.textSecondary }}>▶</span>}
          </div>
        );
      })}
    </div>
  );

  return (
    <motion.section id="comp-menu" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Menu</p>
      <p style={sectionDesc}>
        Menus present a list of actions or options triggered by a button, icon, or contextual event.
        They support keyboard shortcuts, icons, dividers, nesting, and disabled states.
      </p>

      {/* Basic Dropdown */}
      <div style={subsectionLabel}>Basic Dropdown</div>
      <div style={{ ...previewBox, position: "relative" }}>
        {triggerBtn("basic", "File")}
        {openMenu === "basic" && <div style={{ marginTop: 6 }}>{renderMenu(basicItems)}</div>}
      </div>

      {/* With Icons */}
      <div style={subsectionLabel}>With Icons</div>
      <div style={{ ...previewBox, position: "relative" }}>
        {triggerBtn("icons", "Account")}
        {openMenu === "icons" && <div style={{ marginTop: 6 }}>{renderMenu(iconItems, true)}</div>}
      </div>

      {/* With Dividers + Shortcuts */}
      <div style={subsectionLabel}>With Dividers &amp; Keyboard Shortcuts</div>
      <div style={{ ...previewBox, position: "relative" }}>
        {triggerBtn("dividers", "Edit")}
        {openMenu === "dividers" && <div style={{ marginTop: 6 }}>{renderMenu(dividerItems)}</div>}
      </div>

      {/* Nested Submenu */}
      <div style={subsectionLabel}>Nested Submenu</div>
      <div style={{ ...previewBox, position: "relative" }}>
        {triggerBtn("nested", "Options")}
        {openMenu === "nested" && (
          <div style={{ marginTop: 6, display: "flex", gap: 2 }}>
            <div style={menuPanel}>
              {nestedItems.map((item, i) => (
                <div
                  key={i}
                  style={menuItem(nestedOpen && !!item.children)}
                  onMouseEnter={() => item.children && setNestedOpen(true)}
                  onMouseLeave={() => !item.children && setNestedOpen(false)}
                >
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.children && <span style={{ fontSize: 10, color: palette.textSecondary }}>▶</span>}
                </div>
              ))}
            </div>
            {nestedOpen && (
              <div style={menuPanel}>
                {nestedItems.find(i => i.children && nestedOpen)?.children?.map((child, i) => (
                  <div key={i} style={menuItem(false)}>{child.label}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Context Menu */}
      <div style={subsectionLabel}>Context Menu (Right-Click)</div>
      <div
        style={{ ...previewBox, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", userSelect: "none" }}
        onContextMenu={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          setContextPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onClick={() => setContextPos(null)}
      >
        {!contextPos && (
          <span style={{ fontSize: 13, color: palette.textSecondary }}>Right-click anywhere in this area</span>
        )}
        {contextPos && (
          <div style={{ position: "absolute", left: contextPos.x, top: contextPos.y, zIndex: 10 }}>
            {renderMenu(contextItems)}
          </div>
        )}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use menus" description="Menus group related actions behind a single trigger:" items={[
          "File or document actions (Save, Export, Print)",
          "Account or user actions (Profile, Settings, Logout)",
          "Contextual actions on right-click",
          "Overflow actions when toolbar space is limited",
        ]} />
        <UsageSection palette={palette} title="Choosing the right variant" description="Pick based on action complexity:" items={[
          "Basic — Simple list of actions",
          "With icons — Actions need quick visual identification",
          "Nested — Hierarchical grouping of related actions",
          "Context — Right-click actions on specific elements",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Group related items and use dividers to separate categories. Show keyboard shortcuts for power users." },
        { type: "dont", text: "Don't nest menus more than two levels deep. Deeply nested menus are hard to navigate." },
        { type: "do", text: "Disable items that aren't currently available rather than hiding them, so users know the option exists." },
        { type: "dont", text: "Don't use menus for navigation between pages. Use links or a sidebar instead." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Trigger", description: "Button or area that opens the menu", x: 15, y: 10 },
          { id: 2, label: "Panel", description: "Floating container with elevation", x: 50, y: 50 },
          { id: 3, label: "Menu Item", description: "Individual actionable row", x: 30, y: 35 },
          { id: 4, label: "Shortcut", description: "Optional keyboard shortcut hint", x: 85, y: 35 },
          { id: 5, label: "Divider", description: "Separator between item groups", x: 50, y: 80 },
        ]}
        renderPreview={(h) => (
          <div style={{ width: 220 }}>
            <div style={{
              padding: "6px 14px", fontSize: 12, fontWeight: 500, display: "inline-block",
              backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.sm,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>
              File ▼
            </div>
            <div style={{
              marginTop: 4, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md,
              backgroundColor: palette.surface, boxShadow: system.spacing.elevation.md,
              padding: "4px 0",
              opacity: h === 2 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
            }}>
              <div style={{
                padding: "7px 14px", fontSize: 12, display: "flex", justifyContent: "space-between",
                opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
                color: palette.textPrimary,
              }}>
                <span>Save</span>
                <span style={{ color: palette.textSecondary, fontFamily: "monospace", fontSize: 11,
                  opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
                }}>⌘S</span>
              </div>
              <div style={{
                height: 1, backgroundColor: palette.border, margin: "4px 0",
                opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }} />
              <div style={{
                padding: "7px 14px", fontSize: 12, color: palette.textPrimary,
                opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>Export</div>
            </div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Min Width", value: "200px" },
        { label: "Item Padding", value: "8px 14px" },
        { label: "Border Radius", value: comp.card.borderRadius || system.spacing.radius.md },
        { label: "Divider Margin", value: "4px 0" },
        { label: "Panel Elevation", value: "system.spacing.elevation.lg" },
      ]} />
    </motion.section>
  );
}
