"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface FormSectionSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const SECTIONS = [
  {
    title: "Personal Information",
    desc: "Basic details about you",
    fields: [
      { label: "Full Name", placeholder: "John Doe" },
      { label: "Date of Birth", placeholder: "MM/DD/YYYY" },
    ],
  },
  {
    title: "Contact Details",
    desc: "How we can reach you",
    fields: [
      { label: "Email", placeholder: "john@example.com" },
      { label: "Phone", placeholder: "+1 (555) 000-0000" },
    ],
  },
  {
    title: "Address",
    desc: "Your mailing address",
    fields: [
      { label: "Street", placeholder: "123 Main St" },
      { label: "City", placeholder: "San Francisco" },
    ],
  },
];

export function FormSectionSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: FormSectionSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"titled" | "collapsible" | "described" | "card" | "dividers" | "stepped">("titled");
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set([2]));

  const radius = comp.input?.borderRadius || system.spacing.radius.md;
  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };
  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );
  const variantBtn = (v: typeof variant, label: string) => (
    <button onClick={() => setVariant(v)} style={{
      padding: "6px 14px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.sm,
      border: `1px solid ${variant === v ? palette.primary : palette.border}`,
      backgroundColor: variant === v ? palette.primary + "15" : palette.surface,
      color: variant === v ? palette.primary : palette.textSecondary, cursor: "pointer",
    }}>{label}</button>
  );

  const fieldEl = (f: { label: string; placeholder: string }) => (
    <div key={f.label} style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 4, display: "block" }}>{f.label}</label>
      <input style={{
        width: "100%", padding: "9px 14px", fontSize: 13,
        fontFamily: system.typography.bodyFont, color: palette.textPrimary,
        backgroundColor: palette.background, borderRadius: radius,
        border: `1px solid ${palette.border}`, outline: "none",
        boxSizing: "border-box" as const,
      }} placeholder={f.placeholder} readOnly />
    </div>
  );

  const toggleCollapse = (idx: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const renderForm = () => {
    switch (variant) {
      case "collapsible":
        return (
          <div style={{ maxWidth: 420 }}>
            {SECTIONS.map((sec, i) => {
              const isOpen = !collapsed.has(i);
              return (
                <div key={i} style={{ marginBottom: 8, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
                  <button onClick={() => toggleCollapse(i)} style={{
                    width: "100%", padding: "14px 18px", fontSize: 14, fontWeight: 600,
                    color: palette.textPrimary, backgroundColor: palette.surfaceMuted,
                    border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                    textAlign: "left",
                  }}>
                    {sec.title}
                    <ChevronIcon open={isOpen} />
                  </button>
                  {isOpen && <div style={{ padding: "16px 18px" }}>{sec.fields.map(fieldEl)}</div>}
                </div>
              );
            })}
          </div>
        );
      case "described":
        return (
          <div style={{ maxWidth: 420 }}>
            {SECTIONS.map((sec, i) => (
              <div key={i} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, marginBottom: 4 }}>{sec.title}</div>
                <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 16 }}>{sec.desc}</div>
                {sec.fields.map(fieldEl)}
              </div>
            ))}
          </div>
        );
      case "card":
        return (
          <div style={{ maxWidth: 440, display: "flex", flexDirection: "column", gap: 16 }}>
            {SECTIONS.map((sec, i) => (
              <div key={i} style={{
                border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg,
                padding: 20, backgroundColor: palette.background,
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, marginBottom: 4 }}>{sec.title}</div>
                <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 16 }}>{sec.desc}</div>
                {sec.fields.map(fieldEl)}
              </div>
            ))}
          </div>
        );
      case "dividers":
        return (
          <div style={{ maxWidth: 420 }}>
            {SECTIONS.map((sec, i) => (
              <div key={i}>
                {i > 0 && <div style={{ height: 1, backgroundColor: palette.border, margin: "24px 0" }} />}
                <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, marginBottom: 14 }}>{sec.title}</div>
                {sec.fields.map(fieldEl)}
              </div>
            ))}
          </div>
        );
      case "stepped":
        return (
          <div style={{ maxWidth: 440 }}>
            {SECTIONS.map((sec, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.primary,
                    color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{i + 1}</div>
                  {i < SECTIONS.length - 1 && <div style={{ width: 2, flex: 1, backgroundColor: palette.border, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, marginBottom: 4 }}>{sec.title}</div>
                  <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 14 }}>{sec.desc}</div>
                  {sec.fields.map(fieldEl)}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div style={{ maxWidth: 420 }}>
            {SECTIONS.map((sec, i) => (
              <div key={i} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${palette.primary}20` }}>{sec.title}</div>
                {sec.fields.map(fieldEl)}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <motion.section id="comp-form-section" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Form Sections</p>
      <p style={sectionDesc}>
        Form sections group related fields into logical blocks, improving scannability and reducing cognitive load in complex forms.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 320 }}>
          {renderForm()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Section Gap", "28px")}
          {tokenRow("Title Size", "15px / 700")}
          {tokenRow("Desc Size", "12px")}
          {tokenRow("Card Radius", system.spacing.radius.lg)}
          {tokenRow("Divider", "1px palette.border")}
          {tokenRow("Step Circle", "28px")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("titled", "With Title")}
        {variantBtn("collapsible", "Collapsible")}
        {variantBtn("described", "With Description")}
        {variantBtn("card", "Card-wrapped")}
        {variantBtn("dividers", "With Dividers")}
        {variantBtn("stepped", "With Step Number")}
      </div>
      <div style={showcaseBox}>{renderForm()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Group related fields together (personal, contact, address)", "Use section titles to set context", "Collapsible sections for long forms with optional fields", "Card-wrapped for visually distinct independent sections"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't create sections with a single field", "Don't nest sections more than one level deep", "Don't collapse required sections by default"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Grouping Logic: Group by task or topic: personal info, payment, shipping. Keep 2-6 fields per section." },
        { type: "dont", text: "Collapsible: Use for optional or advanced sections. Keep required sections expanded by default." },
        { type: "do", text: "Visual Weight: Card-wrapped for dashboards or settings. Divider-based for inline document editing. Stepped for sequential flows." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Section Title", description: "Group heading text", x: 30, y: 12 },
        { id: 2, label: "Description", description: "Optional context text", x: 30, y: 25 },
        { id: 3, label: "Fields", description: "Grouped form inputs", x: 50, y: 55 },
        { id: 4, label: "Divider/Card", description: "Section boundary", x: 50, y: 85 },
        { id: 5, label: "Step Number", description: "Sequential ordering indicator", x: 8, y: 12 },
      ]} renderPreview={(hl) => (
        <div style={{ width: 180 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
            {(hl === 5 || !hl) && (
              <div style={{
                width: 20, height: 20, borderRadius: "50%", backgroundColor: palette.primary, color: "#fff",
                fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, opacity: hl && hl !== 5 ? 0.3 : 1,
              }}>1</div>
            )}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: palette.textPrimary, opacity: hl && hl !== 1 ? 0.3 : 1 }}>Personal Info</div>
              <div style={{ fontSize: 8, color: palette.textSecondary, marginBottom: 8, opacity: hl && hl !== 2 ? 0.3 : 1 }}>Basic details</div>
              <div style={{ opacity: hl && hl !== 3 ? 0.3 : 1 }}>
                <div style={{ height: 18, borderRadius: 3, border: `1px solid ${palette.border}`, backgroundColor: palette.background, marginBottom: 6 }} />
                <div style={{ height: 18, borderRadius: 3, border: `1px solid ${palette.border}`, backgroundColor: palette.background }} />
              </div>
            </div>
          </div>
          <div style={{ height: 1, backgroundColor: palette.border, margin: "8px 0", opacity: hl && hl !== 4 ? 0.3 : 1 }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textPrimary, opacity: 0.4 }}>Contact</div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Section Gap", value: "24–28px" },
        { label: "Title Font Size", value: "15px" },
        { label: "Description Font Size", value: "12px" },
        { label: "Card Padding", value: "20px" },
        { label: "Card Border Radius", value: system.spacing.radius.lg },
        { label: "Divider Height", value: "1px" },
        { label: "Step Number Size", value: "28px circle" },
        { label: "Collapse Header Padding", value: "14px 18px" },
      ]} />
    </motion.section>
  );
}
