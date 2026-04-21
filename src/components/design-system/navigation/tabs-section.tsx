"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSTabs, DSTabPanel } from "./tabs";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface TabsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const FileIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
);

const SettingsIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const UserIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const BellIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const LockIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export function TabsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: TabsSectionProps) {
  const [heroTab, setHeroTab] = useState("overview");
  const [pillTab, setPillTab] = useState("all");
  const [containedTab, setContainedTab] = useState("design");
  const [verticalTab, setVerticalTab] = useState("general");

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
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    padding: 24,
  };

  const heroTabs = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics", badge: 3 },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" },
  ];

  const iconTabs = [
    { id: "files", label: "Files", icon: <FileIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
    { id: "profile", label: "Profile", icon: <UserIcon /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon />, badge: 5 },
  ];

  const pillTabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active", badge: 12 },
    { id: "pending", label: "Pending", badge: 4 },
    { id: "archived", label: "Archived" },
  ];

  const containedTabs = [
    { id: "design", label: "Design" },
    { id: "code", label: "Code" },
    { id: "preview", label: "Preview" },
  ];

  const scrollableTabs = [
    { id: "t1", label: "Dashboard" },
    { id: "t2", label: "Analytics" },
    { id: "t3", label: "Users" },
    { id: "t4", label: "Settings" },
    { id: "t5", label: "Integrations" },
    { id: "t6", label: "Billing" },
    { id: "t7", label: "Security" },
    { id: "t8", label: "API Keys" },
    { id: "t9", label: "Webhooks" },
    { id: "t10", label: "Logs" },
  ];

  const verticalTabs = [
    { id: "general", label: "General", icon: <SettingsIcon /> },
    { id: "security", label: "Security", icon: <LockIcon /> },
    { id: "profile", label: "Profile", icon: <UserIcon /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon /> },
  ];

  return (
    <motion.section
      id="comp-tabs"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Tabs</p>
      <p style={sectionDesc}>
        Tabs organize content across different views within the same context.
        They let users navigate between related groups of information without
        leaving the page.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Active Color", value: "palette.primary" },
          { label: "Inactive Color", value: "palette.textSecondary" },
          { label: "Indicator Height", value: "2px" },
          { label: "Gap", value: "0px (flush tabs)" },
        ]}
      />

      {/* ──── Hero Preview ──── */}
      <div style={previewBox}>
        <DSTabs
          system={system}
          palette={palette}
          tabs={heroTabs}
          activeTab={heroTab}
          onTabChange={setHeroTab}
          variant="underline"
        />
        <div style={{ padding: "20px 0 4px" }}>
          <DSTabPanel activeTab={heroTab} tabId="overview">
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6 }}>
              Welcome to the overview panel. This is where you&apos;d see a summary of your {content.orgName} project data.
            </div>
          </DSTabPanel>
          <DSTabPanel activeTab={heroTab} tabId="analytics">
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6 }}>
              Analytics content showing key metrics and trends for your organization.
            </div>
          </DSTabPanel>
          <DSTabPanel activeTab={heroTab} tabId="reports">
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6 }}>
              Generated reports and exportable data views.
            </div>
          </DSTabPanel>
          <DSTabPanel activeTab={heroTab} tabId="settings">
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6 }}>
              Configure your project preferences and integration settings.
            </div>
          </DSTabPanel>
        </div>
      </div>

      {/* ──── Underline with Icons ──── */}
      <div style={subsectionLabel}>With Icons &amp; Badges</div>
      <div style={previewBox}>
        <DSTabs
          system={system}
          palette={palette}
          tabs={iconTabs}
          variant="underline"
        />
      </div>

      {/* ──── Pill / Segment Tabs ──── */}
      <div style={subsectionLabel}>Pill / Segment</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        Pill tabs work well for filtering or toggling between closely related views. The active state
        uses an elevated surface treatment.
      </div>
      <div style={previewBox}>
        <DSTabs
          system={system}
          palette={palette}
          tabs={pillTabs}
          activeTab={pillTab}
          onTabChange={setPillTab}
          variant="pill"
        />
      </div>

      {/* ──── Contained Tabs ──── */}
      <div style={subsectionLabel}>Contained</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        Contained tabs use a filled primary background for the active tab, providing
        the strongest visual emphasis.
      </div>
      <div style={previewBox}>
        <DSTabs
          system={system}
          palette={palette}
          tabs={containedTabs}
          activeTab={containedTab}
          onTabChange={setContainedTab}
          variant="contained"
        />
      </div>

      {/* ──── Scrollable Tabs ──── */}
      <div style={subsectionLabel}>Scrollable</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        When the number of tabs exceeds the container width, the tab bar becomes horizontally scrollable.
      </div>
      <div style={{ ...previewBox, maxWidth: 400 }}>
        <DSTabs
          system={system}
          palette={palette}
          tabs={scrollableTabs}
          variant="underline"
          scrollable
        />
      </div>

      {/* ──── Vertical Tabs ──── */}
      <div style={subsectionLabel}>Vertical</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        Vertical tabs are ideal for settings pages or side-panel navigation where horizontal space is abundant.
      </div>
      <div style={{ ...previewBox, display: "flex", gap: 24 }}>
        <div style={{ minWidth: 180 }}>
          <DSTabs
            system={system}
            palette={palette}
            tabs={verticalTabs}
            activeTab={verticalTab}
            onTabChange={setVerticalTab}
            variant="underline"
            orientation="vertical"
          />
        </div>
        <div style={{ flex: 1, padding: "8px 0" }}>
          <DSTabPanel activeTab={verticalTab} tabId="general">
            <div style={{ fontSize: 13, color: palette.textSecondary }}>General settings and preferences.</div>
          </DSTabPanel>
          <DSTabPanel activeTab={verticalTab} tabId="security">
            <div style={{ fontSize: 13, color: palette.textSecondary }}>Security settings and two-factor authentication.</div>
          </DSTabPanel>
          <DSTabPanel activeTab={verticalTab} tabId="profile">
            <div style={{ fontSize: 13, color: palette.textSecondary }}>Profile information and avatar.</div>
          </DSTabPanel>
          <DSTabPanel activeTab={verticalTab} tabId="notifications">
            <div style={{ fontSize: 13, color: palette.textSecondary }}>Notification preferences and channels.</div>
          </DSTabPanel>
        </div>
      </div>

      {/* ──── Full Width ──── */}
      <div style={subsectionLabel}>Full Width</div>
      <div style={previewBox}>
        <DSTabs
          system={system}
          palette={palette}
          tabs={[
            { id: "tab1", label: "Monthly" },
            { id: "tab2", label: "Quarterly" },
            { id: "tab3", label: "Yearly" },
          ]}
          variant="contained"
          fullWidth
        />
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use tabs"
          description="Tabs are the right choice when you need to:"
          items={[
            "Organize related content into separate views",
            "Switch between contexts without leaving the page",
            "Filter or segment a list (pill tabs)",
            "Create settings or preference panels (vertical tabs)",
            "Toggle between code, design, and preview views",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right variant"
          description="Select a tab style based on context:"
          items={[
            "Underline — Default for page-level navigation",
            "Pill / Segment — Filtering or toggling between views",
            "Contained — High emphasis, embedded in cards",
            "Vertical — Settings pages or side navigation",
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
            text: "Use short, descriptive labels for each tab. Keep them to one or two words.",
            visual: (
              <DSTabs
                system={system}
                palette={palette}
                tabs={[
                  { id: "a", label: "Overview" },
                  { id: "b", label: "Details" },
                  { id: "c", label: "History" },
                ]}
                variant="underline"
              />
            ),
          },
          {
            type: "dont",
            text: "Don't use long, verbose labels or sentence-like text in tabs.",
            visual: (
              <DSTabs
                system={system}
                palette={palette}
                tabs={[
                  { id: "a", label: "General Overview Data" },
                  { id: "b", label: "Detailed View of Info" },
                ]}
                variant="underline"
              />
            ),
          },
          {
            type: "do",
            text: "Keep related content together. Each tab should represent a distinct but related section.",
            visual: (
              <DSTabs
                system={system}
                palette={palette}
                tabs={[
                  { id: "a", label: "Profile" },
                  { id: "b", label: "Security" },
                  { id: "c", label: "Billing" },
                ]}
                variant="pill"
              />
            ),
          },
          {
            type: "dont",
            text: "Don't nest tabs within tabs. Use a different navigation pattern for deeper hierarchy.",
            visual: (
              <div style={{ opacity: 0.7 }}>
                <DSTabs
                  system={system}
                  palette={palette}
                  tabs={[
                    { id: "a", label: "Tab A" },
                    { id: "b", label: "Tab B" },
                  ]}
                  variant="underline"
                />
                <div style={{ paddingLeft: 16, paddingTop: 8 }}>
                  <DSTabs
                    system={system}
                    palette={palette}
                    tabs={[
                      { id: "c", label: "Nested 1" },
                      { id: "d", label: "Nested 2" },
                    ]}
                    variant="underline"
                  />
                </div>
              </div>
            ),
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "The wrapper that holds all tab items", x: 10, y: 50 },
          { id: 2, label: "Tab item", description: "Individual clickable tab element", x: 35, y: 15 },
          { id: 3, label: "Indicator", description: "Active state marker (underline, fill, or pill)", x: 60, y: 85 },
          { id: 4, label: "Content panel", description: "The area below tabs showing active tab content", x: 85, y: 50 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", minWidth: 300 }}>
            <div
              style={{
                opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  borderBottom: `2px solid ${highlighted === 3 ? palette.primary : palette.border}`,
                  transition: "border-color 0.2s",
                }}
              >
                <div
                  style={{
                    padding: "10px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: palette.primary,
                    borderBottom: `2px solid ${palette.primary}`,
                    marginBottom: -2,
                    opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                    transition: "opacity 0.2s",
                  }}
                >
                  Active Tab
                </div>
                <div
                  style={{
                    padding: "10px 16px",
                    fontSize: 13,
                    color: palette.textSecondary,
                    opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                    transition: "opacity 0.2s",
                  }}
                >
                  Inactive
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "16px 0",
                fontSize: 12,
                color: palette.textSecondary,
                opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              Tab panel content area
            </div>
            {highlighted === 1 && (
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  border: `2px dashed ${palette.primary}`,
                  borderRadius: 8,
                  pointerEvents: "none",
                  top: -4,
                  bottom: "auto",
                  height: 42,
                }}
              />
            )}
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Tab Height", value: "40px" },
          { label: "Indicator Height", value: "2px" },
          { label: "Horizontal Padding", value: "16px" },
          { label: "Gap Between Tabs", value: "0px" },
        ]}
      />
    </motion.section>
  );
}
