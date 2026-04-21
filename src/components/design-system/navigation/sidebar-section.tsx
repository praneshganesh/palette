"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSSidebar } from "./sidebar";
import type { SidebarGroup } from "./sidebar";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface SidebarSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const HomeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const LayersIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);

const UsersIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const FileTextIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const SettingsIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const BarChartIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const HelpIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const FolderIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

export function SidebarSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: SidebarSectionProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [miniActive, setMiniActive] = useState("home");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    overflow: "hidden",
  };

  const defaultGroups: SidebarGroup[] = content.sidebarSections.map((s) => ({
    label: s.label,
    items: s.items.map((item, i) => ({
      id: `${s.label}-${i}`,
      label: item.name,
      badge: item.badge,
      active: item.active,
      icon: i === 0 ? <HomeIcon /> : i === 1 ? <LayersIcon /> : <FileTextIcon />,
    })),
  }));

  const nestedGroups: SidebarGroup[] = [
    {
      label: "Navigation",
      items: [
        { id: "home", label: "Dashboard", icon: <HomeIcon /> },
        {
          id: "projects", label: "Projects", icon: <FolderIcon />,
          children: [
            { id: "proj-active", label: "Active" },
            { id: "proj-archived", label: "Archived" },
            { id: "proj-drafts", label: "Drafts" },
          ],
        },
        { id: "analytics", label: "Analytics", icon: <BarChartIcon />, badge: "New" },
        { id: "team", label: "Team Members", icon: <UsersIcon /> },
      ],
    },
    {
      label: "System",
      items: [
        { id: "settings", label: "Settings", icon: <SettingsIcon /> },
        { id: "help", label: "Help & Support", icon: <HelpIcon /> },
      ],
    },
  ];

  const miniGroups: SidebarGroup[] = [
    {
      label: "",
      items: [
        { id: "home", label: "Home", icon: <HomeIcon /> },
        { id: "layers", label: "Projects", icon: <LayersIcon /> },
        { id: "users", label: "Team", icon: <UsersIcon /> },
        { id: "analytics", label: "Analytics", icon: <BarChartIcon /> },
        { id: "settings", label: "Settings", icon: <SettingsIcon /> },
      ],
    },
  ];

  return (
    <motion.section
      id="comp-sidebars"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Sidebar</p>
      <p style={sectionDesc}>
        The sidebar provides persistent vertical navigation, allowing users to move
        between major sections of an application. It supports grouping, nesting,
        badges, and can collapse into a compact icon-only mode.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Width (Expanded)", value: "260px" },
          { label: "Width (Collapsed)", value: "64px" },
          { label: "Background", value: "palette.surface" },
          { label: "Border", value: "palette.border" },
          { label: "Active Item Background", value: "palette.primary @ 12% opacity" },
        ]}
      />

      {/* ──── Expanded Sidebar ──── */}
      <div style={{ ...previewBox, height: 420, display: "flex" }}>
        <DSSidebar
          system={system}
          palette={palette}
          groups={defaultGroups}
          header={
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: system.spacing.radius.md,
                  backgroundColor: palette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: palette.background,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {content.orgName.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{content.orgName}</div>
                <div style={{ fontSize: 10, color: palette.textSecondary, letterSpacing: "0.5px" }}>{content.orgSubtitle}</div>
              </div>
            </div>
          }
          footer={
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: palette.primary + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: palette.primary,
                }}
              >
                SA
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary }}>Sarah Ahmed</div>
                <div style={{ fontSize: 10, color: palette.textSecondary }}>Administrator</div>
              </div>
            </div>
          }
        />
        <div style={{ flex: 1, padding: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 13, color: palette.textSecondary }}>Page content area</div>
        </div>
      </div>

      {/* ──── Collapsible Sidebar ──── */}
      <div style={subsectionLabel}>Collapsible</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        Click the collapse toggle to switch between expanded and compact mode.
        The sidebar animates smoothly between states.
      </div>
      <div style={{ ...previewBox, height: 380, display: "flex" }}>
        <DSSidebar
          system={system}
          palette={palette}
          groups={defaultGroups}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          header={
            !sidebarCollapsed ? (
              <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>
                {content.orgName}
              </div>
            ) : undefined
          }
        />
        <div style={{ flex: 1, padding: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 13, color: palette.textSecondary }}>
            Sidebar is {sidebarCollapsed ? "collapsed" : "expanded"}
          </div>
        </div>
      </div>

      {/* ──── With Nested Items ──── */}
      <div style={subsectionLabel}>With Nested Items</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        Sidebar items can contain child items that reveal on click, creating a
        tree-like navigation structure.
      </div>
      <div style={{ ...previewBox, height: 400, display: "flex" }}>
        <DSSidebar
          system={system}
          palette={palette}
          groups={nestedGroups}
          header={
            <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>
              {content.portalTitle}
            </div>
          }
        />
        <div style={{ flex: 1, padding: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 13, color: palette.textSecondary }}>Click &quot;Projects&quot; to expand nested items</div>
        </div>
      </div>

      {/* ──── Mini Sidebar ──── */}
      <div style={subsectionLabel}>Mini Sidebar (Icon Only)</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        The mini variant displays only icons, maximizing content area.
        Hover over icons to see tooltips.
      </div>
      <div style={{ ...previewBox, height: 360, display: "flex" }}>
        <DSSidebar
          system={system}
          palette={palette}
          groups={miniGroups}
          mini
          activeItemId={miniActive}
          onItemClick={setMiniActive}
          footer={<span />}
        />
        <div style={{ flex: 1, padding: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 13, color: palette.textSecondary }}>
            Mini sidebar with icon-only navigation
          </div>
        </div>
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use a sidebar"
          description="A sidebar is the right pattern when you need:"
          items={[
            "Persistent navigation across many sections",
            "Deep hierarchical navigation with nesting",
            "Quick access to core features in admin/dashboard UIs",
            "Contextual user info or organization branding",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Sidebar configurations"
          description="Choose the right configuration based on your app:"
          items={[
            "Expanded — Full labels and badges for complex apps",
            "Collapsible — Let users toggle for more workspace",
            "Mini — Icon-only for power users and dense UIs",
            "With footer — Show user profile or quick actions",
          ]}
        />
      </div>

      {/* ──── Do's and Don'ts ──── */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines
        palette={palette}
        items={[
          {
            type: "do",
            text: "Group related items under clear section labels. Limit top-level items to 5–8.",
          },
          {
            type: "dont",
            text: "Don't nest more than 2 levels deep. Use a different pattern for deeply nested content.",
          },
          {
            type: "do",
            text: "Use badges sparingly to draw attention to items that need action (counts, \"New\").",
          },
          {
            type: "dont",
            text: "Don't use the sidebar for temporary or contextual actions. Use modals or drawers instead.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Fixed-width panel with background and border", x: 5, y: 50 },
          { id: 2, label: "Header", description: "Logo, org name, or collapse toggle area", x: 25, y: 10 },
          { id: 3, label: "Group label", description: "Section divider labeling a group of items", x: 20, y: 40 },
          { id: 4, label: "Nav item", description: "Clickable row with icon, label, and optional badge", x: 50, y: 60 },
          { id: 5, label: "Footer", description: "User profile, logout, or secondary actions", x: 25, y: 90 },
        ]}
        renderPreview={(highlighted) => (
          <div
            style={{
              width: 200,
              height: 180,
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "10px 12px",
                borderBottom: `1px solid ${palette.border}`,
                fontSize: 12,
                fontWeight: 600,
                color: palette.textPrimary,
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              App Name
            </div>
            {/* Group */}
            <div style={{ flex: 1, padding: 8 }}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: palette.textSecondary,
                  padding: "4px 8px",
                  textTransform: "uppercase",
                  opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                Section
              </div>
              {["Dashboard", "Projects", "Team"].map((label, i) => (
                <div
                  key={label}
                  style={{
                    padding: "6px 8px",
                    fontSize: 11,
                    color: i === 0 ? palette.primary : palette.textSecondary,
                    backgroundColor: i === 0 ? palette.primary + "12" : "transparent",
                    borderRadius: 4,
                    fontWeight: i === 0 ? 600 : 400,
                    opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                    transition: "opacity 0.2s",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
            {/* Footer */}
            <div
              style={{
                padding: "8px 12px",
                borderTop: `1px solid ${palette.border}`,
                fontSize: 10,
                color: palette.textSecondary,
                opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              User Name
            </div>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: 10, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Sidebar Width (Expanded)", value: "260px" },
          { label: "Item Height", value: "36px" },
          { label: "Icon Size", value: "16px" },
          { label: "Item Padding", value: "8px 12px" },
          { label: "Collapsed Width", value: "64px" },
        ]}
      />
    </motion.section>
  );
}
