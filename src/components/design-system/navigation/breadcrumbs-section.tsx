"use client";

import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSBreadcrumbs } from "./breadcrumbs";
import type { BreadcrumbSeparator } from "./breadcrumbs";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface BreadcrumbsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const HomeIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FolderIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

const FileIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
);

export function BreadcrumbsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: BreadcrumbsSectionProps) {
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

  const breadcrumbItems = content.breadcrumb.map((label) => ({ label }));

  const iconItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Projects", icon: <FolderIcon /> },
    { label: "Design System", icon: <FileIcon /> },
    { label: "Components" },
  ];

  const longPath = [
    { label: "Home" },
    { label: "Organization" },
    { label: "Department" },
    { label: "Team" },
    { label: "Projects" },
    { label: "Active" },
    { label: "Current Task" },
  ];

  return (
    <motion.section
      id="comp-breadcrumbs"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Breadcrumbs</p>
      <p style={sectionDesc}>
        Breadcrumbs reveal the user&apos;s location within the site hierarchy and
        provide one-click navigation back to any ancestor page.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Separator Color", value: "palette.textSecondary @ 50% opacity" },
          { label: "Active Color", value: "palette.textPrimary" },
          { label: "Link Color", value: "palette.textSecondary" },
        ]}
      />

      {/* ──── Separator Variants ──── */}
      <div style={subsectionLabel}>Separator Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {(["chevron", "slash", "arrow"] as BreadcrumbSeparator[]).map((sep) => (
          <div key={sep} style={previewBox}>
            <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 12, textTransform: "capitalize" }}>
              {sep}
            </div>
            <DSBreadcrumbs
              system={system}
              palette={palette}
              items={breadcrumbItems}
              separator={sep}
            />
          </div>
        ))}
      </div>

      {/* ──── With Icons ──── */}
      <div style={subsectionLabel}>With Icons</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        Icons reinforce meaning and help users quickly identify sections in the hierarchy.
      </div>
      <div style={previewBox}>
        <DSBreadcrumbs
          system={system}
          palette={palette}
          items={iconItems}
          separator="chevron"
        />
      </div>

      {/* ──── Collapsed / Overflow ──── */}
      <div style={subsectionLabel}>Collapsed / Overflow</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        When the path is deep, intermediate items are collapsed into an expandable ellipsis button.
        Click the dots to reveal hidden items.
      </div>
      <div style={previewBox}>
        <DSBreadcrumbs
          system={system}
          palette={palette}
          items={longPath}
          separator="chevron"
          maxItems={3}
        />
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div
        style={{
          ...previewBox,
          padding: 0,
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${palette.border}`,
          }}
        >
          <DSBreadcrumbs
            system={system}
            palette={palette}
            items={[
              { label: content.orgName },
              ...content.breadcrumb.map((label) => ({ label })),
            ]}
            separator="chevron"
          />
        </div>
        <div style={{ padding: "24px" }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: palette.textPrimary, marginBottom: 6 }}>
            {content.breadcrumb[content.breadcrumb.length - 1] || "Page Title"}
          </div>
          <div style={{ fontSize: 13, color: palette.textSecondary }}>
            Manage and review your project details and resources.
          </div>
        </div>
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use breadcrumbs"
          description="Breadcrumbs are appropriate when:"
          items={[
            "The app has more than 2 levels of hierarchy",
            "Users need to orient themselves within a deep structure",
            "There's a clear parent-child page relationship",
            "You want to reduce back-button usage",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the separator"
          description="The separator should match the visual tone:"
          items={[
            "Chevron (>) — Default for most interfaces",
            "Slash (/) — Minimal, developer-oriented UIs",
            "Arrow (→) — Editorial or bold visual tones",
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
            text: "Show the full hierarchy path from the top-level page. The current page should be the last item and non-interactive.",
            visual: (
              <DSBreadcrumbs
                system={system}
                palette={palette}
                items={[{ label: "Home" }, { label: "Projects" }, { label: "Current" }]}
                separator="chevron"
              />
            ),
          },
          {
            type: "dont",
            text: "Don't make the current (last) breadcrumb item clickable. It should be styled differently to indicate the active page.",
            visual: (
              <div style={{ fontSize: 13, color: palette.primary, textDecoration: "underline" }}>
                Home / Projects / <span style={{ color: palette.primary, textDecoration: "underline" }}>Current</span>
              </div>
            ),
          },
          {
            type: "do",
            text: "Use overflow / collapse for paths deeper than 4-5 levels to prevent horizontal overflow.",
            visual: (
              <DSBreadcrumbs
                system={system}
                palette={palette}
                items={longPath}
                separator="chevron"
                maxItems={3}
              />
            ),
          },
          {
            type: "dont",
            text: "Don't use breadcrumbs for flat or single-level navigation. They add no value when there's no hierarchy.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Horizontal wrapper for breadcrumb items", x: 10, y: 50 },
          { id: 2, label: "Crumb item", description: "Clickable ancestor link", x: 30, y: 15 },
          { id: 3, label: "Separator", description: "Visual divider between crumb items", x: 50, y: 85 },
          { id: 4, label: "Current page", description: "Non-interactive last item with bold styling", x: 80, y: 15 },
        ]}
        renderPreview={(highlighted) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              position: "relative",
              padding: "8px 16px",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: palette.textSecondary,
                cursor: "pointer",
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              Home
            </span>
            <span
              style={{
                color: palette.textSecondary + "80",
                margin: "0 4px",
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </span>
            <span
              style={{
                fontSize: 13,
                color: palette.textSecondary,
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              Projects
            </span>
            <span
              style={{
                color: palette.textSecondary + "80",
                margin: "0 4px",
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: palette.textPrimary,
                opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              Current Page
            </span>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: 0, border: `2px dashed ${palette.primary}`, borderRadius: 8, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Font Size", value: "13px" },
          { label: "Separator Width", value: "14px" },
          { label: "Gap", value: "4px" },
          { label: "Icon Size", value: "14px" },
        ]}
      />
    </motion.section>
  );
}
