"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface AnchorNavSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function AnchorNavSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: AnchorNavSectionProps) {
  const comp = system.components;
  const [verticalActive, setVerticalActive] = useState(1);
  const [horizontalActive, setHorizontalActive] = useState(0);
  const [progressActive, setProgressActive] = useState(2);
  const [stepsActive, setStepsActive] = useState(1);
  const [highlightActive, setHighlightActive] = useState(0);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24, overflow: "hidden",
  };

  const sections = ["Introduction", "Getting Started", "Configuration", "API Reference", "Examples"];

  const verticalItem = (active: boolean): React.CSSProperties => ({
    padding: "8px 16px", fontSize: 13, cursor: "pointer",
    color: active ? palette.primary : palette.textSecondary,
    fontWeight: active ? 600 : 400,
    borderLeft: `2px solid ${active ? palette.primary : palette.border}`,
    transition: "all 0.2s", fontFamily: system.typography.bodyFont,
  });

  const horizontalItem = (active: boolean): React.CSSProperties => ({
    padding: "10px 16px", fontSize: 13, cursor: "pointer",
    color: active ? palette.primary : palette.textSecondary,
    fontWeight: active ? 600 : 400,
    borderBottom: `2px solid ${active ? palette.primary : "transparent"}`,
    transition: "all 0.2s", fontFamily: system.typography.bodyFont,
    whiteSpace: "nowrap" as const,
  });

  const progressPercent = ((progressActive + 1) / sections.length) * 100;

  return (
    <motion.section id="comp-anchor-nav" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Anchor Navigation</p>
      <p style={sectionDesc}>
        Anchor navigation links to sections within the same page. It tracks scroll position
        to highlight the current section, providing orientation in long-form content.
      </p>

      {/* Vertical Sticky Sidebar */}
      <div style={subsectionLabel}>Vertical Sticky Sidebar</div>
      <div style={{ ...previewBox, display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, minHeight: 200 }}>
        <div style={{ borderRight: `1px solid ${palette.border}`, paddingRight: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.05em", color: palette.textSecondary, marginBottom: 12, paddingLeft: 16 }}>
            On this page
          </div>
          {sections.map((s, i) => (
            <div key={i} onClick={() => setVerticalActive(i)} style={verticalItem(verticalActive === i)}>
              {s}
            </div>
          ))}
        </div>
        <div style={{ padding: "0 8px" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
            {sections[verticalActive]}
          </div>
          <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.7 }}>
            This is the content area for the &quot;{sections[verticalActive]}&quot; section.
            The sidebar tracks which section is in view and highlights the corresponding link.
          </div>
        </div>
      </div>

      {/* Horizontal Top Bar */}
      <div style={subsectionLabel}>Horizontal Top Bar</div>
      <div style={previewBox}>
        <div style={{ display: "flex", borderBottom: `1px solid ${palette.border}`, marginBottom: 16, overflowX: "auto" }}>
          {sections.map((s, i) => (
            <div key={i} onClick={() => setHorizontalActive(i)} style={horizontalItem(horizontalActive === i)}>
              {s}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.7 }}>
          Content for &quot;{sections[horizontalActive]}&quot; appears here.
          Horizontal anchor nav works well for pages with fewer sections.
        </div>
      </div>

      {/* With Progress Indicator */}
      <div style={subsectionLabel}>With Progress Indicator</div>
      <div style={{ ...previewBox, display: "grid", gridTemplateColumns: "180px 1fr", gap: 24 }}>
        <div>
          <div style={{ height: 3, backgroundColor: palette.border, borderRadius: 2, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPercent}%`, backgroundColor: palette.primary, borderRadius: 2, transition: "width 0.3s" }} />
          </div>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>
            {progressActive + 1} of {sections.length}
          </div>
          {sections.map((s, i) => (
            <div key={i} onClick={() => setProgressActive(i)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 0", fontSize: 13, cursor: "pointer",
              color: i <= progressActive ? palette.primary : palette.textSecondary,
              fontWeight: i === progressActive ? 600 : 400,
              transition: "all 0.2s", fontFamily: system.typography.bodyFont,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                backgroundColor: i < progressActive ? palette.primary : i === progressActive ? palette.primary : palette.border,
                transition: "all 0.2s",
              }} />
              {s}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.7 }}>
          Reading &quot;{sections[progressActive]}&quot;. Progress tracking helps users see how far
          along they are in long documentation or tutorial pages.
        </div>
      </div>

      {/* Numbered Steps */}
      <div style={subsectionLabel}>Numbered Steps</div>
      <div style={{ ...previewBox, display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
        <div>
          {sections.map((s, i) => (
            <div key={i} onClick={() => setStepsActive(i)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 0", fontSize: 13, cursor: "pointer",
              color: i === stepsActive ? palette.primary : palette.textSecondary,
              fontFamily: system.typography.bodyFont, transition: "all 0.2s",
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                backgroundColor: i === stepsActive ? palette.primary : i < stepsActive ? palette.primary + "20" : palette.surfaceMuted,
                color: i === stepsActive ? "#fff" : i < stepsActive ? palette.primary : palette.textSecondary,
                fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                border: `1.5px solid ${i <= stepsActive ? palette.primary : palette.border}`,
                transition: "all 0.2s",
              }}>
                {i < stepsActive ? "✓" : i + 1}
              </div>
              <span style={{ fontWeight: i === stepsActive ? 600 : 400 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.7 }}>
          Step {stepsActive + 1}: {sections[stepsActive]}. Numbered navigation works well
          for sequential content like tutorials or multi-step guides.
        </div>
      </div>

      {/* Highlighted Active */}
      <div style={subsectionLabel}>Highlighted Active</div>
      <div style={{ ...previewBox, display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sections.map((s, i) => (
            <div key={i} onClick={() => setHighlightActive(i)} style={{
              padding: "10px 14px", fontSize: 13, cursor: "pointer",
              color: i === highlightActive ? palette.primary : palette.textPrimary,
              fontWeight: i === highlightActive ? 600 : 400,
              backgroundColor: i === highlightActive ? palette.primary + "10" : "transparent",
              borderRadius: system.spacing.radius.sm,
              borderLeft: `3px solid ${i === highlightActive ? palette.primary : "transparent"}`,
              transition: "all 0.2s", fontFamily: system.typography.bodyFont,
            }}>
              {s}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.7 }}>
          Viewing &quot;{sections[highlightActive]}&quot;. The highlighted variant provides the
          strongest visual emphasis on the current section.
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use anchor navigation" description="Anchor nav helps orient users in long pages:" items={[
          "Documentation pages with multiple sections",
          "Long-form articles or blog posts",
          "Settings pages with grouped options",
          "Tutorial or onboarding flows with sequential steps",
        ]} />
        <UsageSection palette={palette} title="Choosing a variant" description="Match the layout to your content:" items={[
          "Vertical sidebar — Documentation, dense content",
          "Horizontal bar — Fewer sections, top-of-page",
          "Progress — Sequential reading flow",
          "Numbered — Step-by-step tutorials or guides",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Keep section titles short and descriptive. The nav should be scannable at a glance." },
        { type: "dont", text: "Don't use anchor nav for fewer than 3 sections. A table of contents isn't useful for very short pages." },
        { type: "do", text: "Make the sidebar sticky so it stays visible as users scroll through content." },
        { type: "dont", text: "Don't mix anchor navigation with tabs for the same content hierarchy." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Sidebar or top bar holding the nav items", x: 10, y: 50 },
          { id: 2, label: "Active indicator", description: "Border, highlight, or color showing current section", x: 15, y: 15 },
          { id: 3, label: "Nav item", description: "Clickable link to a page section", x: 40, y: 40 },
          { id: 4, label: "Progress (optional)", description: "Bar or dots showing reading progress", x: 80, y: 15 },
        ]}
        renderPreview={(h) => (
          <div style={{ width: 170 }}>
            <div style={{
              height: 3, backgroundColor: palette.border, borderRadius: 2, marginBottom: 12,
              overflow: "hidden",
              opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>
              <div style={{ height: "100%", width: "60%", backgroundColor: palette.primary, borderRadius: 2 }} />
            </div>
            <div style={{
              opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
            }}>
              {["Introduction", "Setup", "API", "Examples"].map((s, i) => (
                <div key={i} style={{
                  padding: "6px 12px", fontSize: 12, cursor: "pointer",
                  color: i === 1 ? palette.primary : palette.textSecondary,
                  fontWeight: i === 1 ? 600 : 400,
                  borderLeft: `2px solid ${i === 1 ? palette.primary : palette.border}`,
                  backgroundColor: i === 1 ? palette.primary + "08" : "transparent",
                  opacity: i === 1 && h === 2 ? 1 : h === 3 ? 1 : h === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Sidebar Width", value: "180–200px" },
        { label: "Item Padding", value: "8px 16px" },
        { label: "Active Border Width", value: "2–3px" },
        { label: "Font Size", value: "13px" },
        { label: "Progress Bar Height", value: "3px" },
      ]} />
    </motion.section>
  );
}
