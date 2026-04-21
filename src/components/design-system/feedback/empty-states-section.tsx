"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface EmptyStatesSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type EmptyVariant = "no-data" | "no-search" | "first-time" | "error" | "offline" | "permission";

export function EmptyStatesSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: EmptyStatesSectionProps) {
  const comp = system.components;
  const [activeVariant, setActiveVariant] = useState<EmptyVariant>("no-data");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const emptyCard = (
    icon: string,
    title: string,
    desc: string,
    action?: { label: string; primary?: boolean },
    secondaryAction?: string,
    iconColor?: string,
  ) => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "48px 32px", textAlign: "center", maxWidth: 360, margin: "0 auto",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: system.spacing.radius.xl,
        backgroundColor: (iconColor || palette.primary) + "10",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, marginBottom: 20,
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 8,
        fontFamily: system.typography.headingFont,
      }}>
        {title}
      </div>
      <div style={{
        fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: action ? 24 : 0,
      }}>
        {desc}
      </div>
      {action && (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button style={{
            padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            backgroundColor: action.primary !== false ? palette.primary : "transparent",
            color: action.primary !== false ? "#fff" : palette.primary,
            border: action.primary !== false ? "none" : `1px solid ${palette.primary}`,
            borderRadius: comp.button.borderRadius || system.spacing.radius.md,
            fontFamily: system.typography.bodyFont,
          }}>
            {action.label}
          </button>
          {secondaryAction && (
            <button style={{
              padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
              fontSize: 13, fontWeight: 500, cursor: "pointer",
              backgroundColor: "transparent", color: palette.textSecondary,
              border: `1px solid ${palette.border}`,
              borderRadius: comp.button.borderRadius || system.spacing.radius.md,
              fontFamily: system.typography.bodyFont,
            }}>
              {secondaryAction}
            </button>
          )}
        </div>
      )}
    </div>
  );

  const variants: { id: EmptyVariant; label: string }[] = [
    { id: "no-data", label: "No Data" },
    { id: "no-search", label: "No Search Results" },
    { id: "first-time", label: "First-Time User" },
    { id: "error", label: "Error Occurred" },
    { id: "offline", label: "Offline" },
    { id: "permission", label: "Permission Denied" },
  ];

  const renderVariant = () => {
    switch (activeVariant) {
      case "no-data":
        return emptyCard("📋", "No items yet", "You haven't created any items. Get started by adding your first entry to this collection.", { label: "Create item" });
      case "no-search":
        return emptyCard("🔍", "No results found", `We couldn't find anything matching your search. Try adjusting your filters or search terms.`, { label: "Clear search", primary: false });
      case "first-time":
        return emptyCard("🚀", `Welcome to ${content.orgName || "the platform"}!`, "This is where your data will appear. Let's get you started with a quick setup.", { label: "Get started" }, "Watch tutorial");
      case "error":
        return emptyCard("⚠", "Something went wrong", "We encountered an error loading this content. Please try again or contact support if the issue persists.", { label: "Retry" }, "Contact support", palette.danger);
      case "offline":
        return emptyCard("📡", "You're offline", "It looks like you've lost your internet connection. Some features may be unavailable until you're back online.", { label: "Retry connection", primary: false }, undefined, palette.warning);
      case "permission":
        return emptyCard("🔒", "Access restricted", "You don't have permission to view this content. Contact your administrator to request access.", { label: "Request access" }, "Go back", palette.danger);
    }
  };

  return (
    <motion.section id="comp-empty-states" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Empty States</p>
      <p style={sectionDesc}>
        Empty states communicate that a section has no content to display and guide users on what
        to do next. Each variant addresses a different reason for the empty state.
      </p>

      {/* Variant Switcher */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {variants.map(v => (
          <button key={v.id} onClick={() => setActiveVariant(v.id)} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: activeVariant === v.id ? 600 : 400,
            cursor: "pointer",
            color: activeVariant === v.id ? palette.primary : palette.textSecondary,
            backgroundColor: activeVariant === v.id ? palette.primary + "10" : palette.surfaceMuted,
            border: `1px solid ${activeVariant === v.id ? palette.primary + "30" : palette.border}`,
            borderRadius: system.spacing.radius.md, fontFamily: system.typography.bodyFont,
          }}>
            {v.label}
          </button>
        ))}
      </div>
      <div style={previewBox}>
        {renderVariant()}
      </div>

      {/* All Variants Grid */}
      <div style={subsectionLabel}>All Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { icon: "📋", title: "No Data", desc: "Collection is empty" },
          { icon: "🔍", title: "No Results", desc: "Search returned nothing" },
          { icon: "🚀", title: "Welcome", desc: "First-time user experience" },
          { icon: "⚠", title: "Error", desc: "Something went wrong", color: palette.danger },
          { icon: "📡", title: "Offline", desc: "No internet connection", color: palette.warning },
          { icon: "🔒", title: "Restricted", desc: "Insufficient permissions", color: palette.danger },
        ].map((item, i) => (
          <div key={i} style={{
            ...previewBox, display: "flex", alignItems: "center", gap: 14, padding: 16,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: system.spacing.radius.md,
              backgroundColor: (item.color || palette.primary) + "10",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{item.title}</div>
              <div style={{ fontSize: 12, color: palette.textSecondary }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use empty states" description="Show an empty state when:" items={[
          "A list or table has no data to display",
          "A search or filter returns zero results",
          "A user accesses a feature for the first time",
          "An error prevents content from loading",
        ]} />
        <UsageSection palette={palette} title="Content guidelines" description="Write effective empty state copy:" items={[
          "Be specific about why it's empty",
          "Offer a clear next step or action",
          "Use a friendly, encouraging tone",
          "Include an illustration or icon for visual context",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Always provide a primary action to resolve the empty state (e.g., 'Create item', 'Clear search')." },
        { type: "dont", text: "Don't leave the screen completely blank. Even a simple message is better than nothing." },
        { type: "do", text: "Use illustrations or icons to make empty states feel intentional, not broken." },
        { type: "dont", text: "Don't use technical jargon in empty states. 'No results found' is better than 'Query returned 0 rows'." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Illustration", description: "Icon or graphic conveying the state", x: 50, y: 10 },
          { id: 2, label: "Title", description: "Short headline describing the empty state", x: 50, y: 35 },
          { id: 3, label: "Description", description: "Supporting text with context and guidance", x: 50, y: 55 },
          { id: 4, label: "Action", description: "Primary button to resolve the state", x: 50, y: 80 },
        ]}
        renderPreview={(h) => (
          <div style={{ textAlign: "center", width: 240 }}>
            <div style={{
              width: 48, height: 48, borderRadius: system.spacing.radius.lg,
              backgroundColor: palette.primary + "10", margin: "0 auto 12px",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>📋</div>
            <div style={{
              fontSize: 14, fontWeight: 700, color: palette.textPrimary, marginBottom: 4,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>No items yet</div>
            <div style={{
              fontSize: 12, color: palette.textSecondary, marginBottom: 16, lineHeight: 1.5,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Create your first item to get started</div>
            <div style={{
              display: "inline-block", padding: "6px 16px", fontSize: 12, fontWeight: 600,
              backgroundColor: palette.primary, color: "#fff",
              borderRadius: comp.button.borderRadius || system.spacing.radius.md,
              opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Create item</div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Icon Container", value: "64px" },
        { label: "Content Max Width", value: "360px" },
        { label: "Padding", value: "48px 32px" },
        { label: "Title Size", value: "16px / 700" },
        { label: "Description Size", value: "13px" },
      ]} />
    </motion.section>
  );
}
