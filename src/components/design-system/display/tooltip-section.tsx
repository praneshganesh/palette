"use client";

import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSTooltip } from "./tooltip";
import type { TooltipPosition } from "./tooltip";
import { DSButton } from "../buttons/button";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface TooltipSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const InfoIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const HelpIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CopyIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const TrashIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const EditIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export function TooltipSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: TooltipSectionProps) {
  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  return (
    <motion.section
      id="comp-tooltip"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Tooltip</p>
      <p style={sectionDesc}>
        Tooltips reveal supplementary information on hover or focus. They
        provide context without cluttering the interface, appearing transiently
        near the trigger element.
      </p>

      {/* ──── Positions ──── */}
      <div style={subsectionLabel}>Positions</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div
          style={{
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: 12,
            padding: "60px 40px",
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {(["top", "bottom", "left", "right"] as TooltipPosition[]).map((pos) => (
            <DSTooltip
              key={pos}
              system={system}
              palette={palette}
              content={`Tooltip on ${pos}`}
              position={pos}
            >
              <DSButton system={system} palette={palette} variant="outlined" size="sm">
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </DSButton>
            </DSTooltip>
          ))}
        </div>
        <TokensGrid
          palette={palette}
          tokens={[
            { label: "Background", value: palette.textPrimary },
            { label: "Text Color", value: palette.background },
            { label: "Border Radius", value: "8px" },
            { label: "Max Width", value: "240px" },
            { label: "Font Size", value: "12px" },
            { label: "Arrow Size", value: "8px" },
          ]}
        />
      </div>

      {/* ──── With Arrow vs Without ──── */}
      <div style={subsectionLabel}>Arrow Variants</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: "48px 40px",
          display: "flex",
          gap: 32,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DSTooltip system={system} palette={palette} content="With arrow" arrow={true}>
          <DSButton system={system} palette={palette} variant="outlined" size="sm">With arrow</DSButton>
        </DSTooltip>
        <DSTooltip system={system} palette={palette} content="Without arrow" arrow={false}>
          <DSButton system={system} palette={palette} variant="outlined" size="sm">No arrow</DSButton>
        </DSTooltip>
      </div>

      {/* ──── Rich Content ──── */}
      <div style={subsectionLabel}>Rich Content</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: "48px 40px",
          display: "flex",
          gap: 32,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DSTooltip
          system={system}
          palette={palette}
          rich
          content={
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Keyboard Shortcut</div>
              <div style={{ opacity: 0.8 }}>Press <kbd style={{ padding: "2px 6px", borderRadius: 4, backgroundColor: "rgba(255,255,255,0.15)", fontSize: 11 }}>⌘ + S</kbd> to save</div>
            </div>
          }
        >
          <DSButton system={system} palette={palette} variant="outlined" size="sm">Rich tooltip</DSButton>
        </DSTooltip>
        <DSTooltip
          system={system}
          palette={palette}
          rich
          content={
            <div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{content.orgName}</div>
              <div style={{ opacity: 0.8, lineHeight: 1.5 }}>{content.orgSubtitle} — Hover over elements to learn more about features and functionality.</div>
            </div>
          }
        >
          <DSButton system={system} palette={palette} variant="outlined" size="sm">Description</DSButton>
        </DSTooltip>
      </div>

      {/* ──── On Icon Buttons ──── */}
      <div style={subsectionLabel}>On Icon Buttons</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: "48px 40px",
          display: "flex",
          gap: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DSTooltip system={system} palette={palette} content="Edit">
          <DSButton system={system} palette={palette} variant="outlined" size="sm" iconOnly leadingIcon={<EditIcon />} />
        </DSTooltip>
        <DSTooltip system={system} palette={palette} content="Copy to clipboard">
          <DSButton system={system} palette={palette} variant="outlined" size="sm" iconOnly leadingIcon={<CopyIcon />} />
        </DSTooltip>
        <DSTooltip system={system} palette={palette} content="Delete item">
          <DSButton system={system} palette={palette} variant="danger" size="sm" iconOnly leadingIcon={<TrashIcon />} />
        </DSTooltip>
        <div style={{ width: 1, height: 32, backgroundColor: palette.border }} />
        <DSTooltip system={system} palette={palette} content="More info" position="bottom">
          <span style={{ color: palette.textSecondary, cursor: "help", display: "inline-flex" }}><InfoIcon /></span>
        </DSTooltip>
        <DSTooltip system={system} palette={palette} content="Need help?" position="bottom">
          <span style={{ color: palette.textSecondary, cursor: "help", display: "inline-flex" }}><HelpIcon /></span>
        </DSTooltip>
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          padding: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: palette.textPrimary }}>Settings</div>
            <DSTooltip system={system} palette={palette} content="Configure your workspace preferences">
              <span style={{ color: palette.textSecondary, cursor: "help", display: "inline-flex" }}><HelpIcon size={14} /></span>
            </DSTooltip>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <DSTooltip system={system} palette={palette} content="Edit settings">
              <DSButton system={system} palette={palette} variant="outlined" size="sm" iconOnly leadingIcon={<EditIcon />} />
            </DSTooltip>
            <DSTooltip system={system} palette={palette} content="Copy configuration">
              <DSButton system={system} palette={palette} variant="outlined" size="sm" iconOnly leadingIcon={<CopyIcon />} />
            </DSTooltip>
          </div>
        </div>
        <div style={{ height: 1, backgroundColor: palette.border, marginBottom: 16 }} />
        <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6 }}>
          Hover over the icons above to see tooltips in a real interface context.
        </div>
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use tooltips"
          description="Tooltips provide brief, non-essential supplementary information:"
          items={[
            "Icon-only buttons that need labels",
            "Truncated text that has more content",
            "Form fields with brief help text",
            "Keyboard shortcuts and hotkeys",
            "Explaining disabled states",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Configuration options"
          description="Customize tooltip behavior and appearance:"
          items={[
            "Position — Top, bottom, left, or right",
            "Arrow — Optional pointer toward the trigger",
            "Rich — Multi-line content with formatting",
            "Delay — Configurable hover delay before showing",
            "Interactive — Allow hovering over the tooltip itself",
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
            text: "Keep tooltip content brief and scannable — 1-2 short sentences maximum.",
            visual: (
              <div style={{ backgroundColor: palette.textPrimary, color: palette.background, padding: "4px 10px", borderRadius: 6, fontSize: 10 }}>
                Save changes
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't put essential information or interactive elements in simple tooltips.",
            visual: (
              <div style={{ backgroundColor: palette.textPrimary, color: palette.background, padding: "6px 10px", borderRadius: 6, fontSize: 8, maxWidth: 120 }}>
                Click here to submit your form and then wait for confirmation...
              </div>
            ),
          },
          {
            type: "do",
            text: "Always add tooltips to icon-only buttons so their function is discoverable.",
            visual: (
              <div style={{ display: "flex", gap: 4 }}>
                {["✏", "📋", "🗑"].map((icon, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{icon}</div>
                ))}
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't use tooltips on touch-only interfaces — there's no hover event on mobile.",
            visual: (
              <div style={{ width: 60, height: 40, borderRadius: 8, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: palette.textSecondary }}>📱</div>
            ),
          },
        ]}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Padding", value: "8px 14px" },
          { label: "Arrow Size", value: "8 × 8px" },
          { label: "Offset From Trigger", value: "8px" },
          { label: "Max Width", value: "240px" },
          { label: "Border Radius", value: "8px" },
          { label: "Rich Padding", value: "12px 16px" },
          { label: "Font Size", value: "12px" },
          { label: "Line Height", value: "1.4" },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Trigger element", description: "The element that activates the tooltip on hover/focus", x: 50, y: 80 },
          { id: 2, label: "Container", description: "Dark background surface for the tooltip content", x: 50, y: 20 },
          { id: 3, label: "Arrow", description: "Pointer connecting the tooltip to its trigger", x: 30, y: 50 },
          { id: 4, label: "Content", description: "Text or rich content inside the tooltip", x: 75, y: 10 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, paddingTop: 40 }}>
            <div
              style={{
                backgroundColor: palette.textPrimary,
                color: palette.background,
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 12,
                position: "relative",
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : undefined,
              }}
            >
              <span style={{ opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                Tooltip content
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: "50%",
                  marginLeft: -4,
                  width: 8,
                  height: 8,
                  backgroundColor: palette.textPrimary,
                  transform: "rotate(45deg)",
                  opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              />
              {highlighted === 2 && (
                <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: 10, pointerEvents: "none" }} />
              )}
            </div>
            <div style={{ marginTop: 8, opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              <div style={{ height: 32, width: 80, borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: palette.textSecondary }}>Trigger</div>
            </div>
          </div>
        )}
      />
    </motion.section>
  );
}
