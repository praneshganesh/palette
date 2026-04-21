"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface FormLayoutSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const FIELDS = [
  { label: "Full Name", placeholder: "John Doe", type: "text" },
  { label: "Email", placeholder: "john@example.com", type: "email" },
  { label: "Phone", placeholder: "+1 (555) 000-0000", type: "tel" },
  { label: "Company", placeholder: "Acme Inc.", type: "text" },
];

export function FormLayoutSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: FormLayoutSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"single" | "two-col" | "inline" | "floating" | "grouped">("single");
  const [values, setValues] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

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

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%", padding: "10px 14px", fontSize: 14,
    fontFamily: system.typography.bodyFont, color: palette.textPrimary,
    backgroundColor: palette.background, borderRadius: radius,
    border: `1px solid ${focused === field ? palette.primary : palette.border}`,
    outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box" as const,
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block",
  };

  const renderField = (f: typeof FIELDS[0], inline = false) => {
    const key = f.label.toLowerCase().replace(/\s/g, "-");
    if (inline) {
      return (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <label style={{ ...labelStyle, marginBottom: 0, minWidth: 90, textAlign: "right" }}>{f.label}</label>
          <input style={inputStyle(key)} placeholder={f.placeholder} value={values[key] || ""}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            onFocus={() => setFocused(key)} onBlur={() => setFocused(null)} />
        </div>
      );
    }
    return (
      <div key={key} style={{ marginBottom: 16 }}>
        <label style={labelStyle}>{f.label}</label>
        <input style={inputStyle(key)} placeholder={f.placeholder} value={values[key] || ""}
          onChange={(e) => setValues({ ...values, [key]: e.target.value })}
          onFocus={() => setFocused(key)} onBlur={() => setFocused(null)} />
      </div>
    );
  };

  const renderFloatingField = (f: typeof FIELDS[0]) => {
    const key = f.label.toLowerCase().replace(/\s/g, "-");
    const hasValue = !!values[key];
    const isActive = focused === key || hasValue;
    return (
      <div key={key} style={{ position: "relative", marginBottom: 20 }}>
        <input style={{
          ...inputStyle(key), paddingTop: isActive ? 18 : 10, paddingBottom: isActive ? 4 : 10,
        }}
          placeholder={isActive ? f.placeholder : ""} value={values[key] || ""}
          onChange={(e) => setValues({ ...values, [key]: e.target.value })}
          onFocus={() => setFocused(key)} onBlur={() => setFocused(null)} />
        <label style={{
          position: "absolute", left: 14, transition: "all 0.2s",
          top: isActive ? 4 : "50%", transform: isActive ? "none" : "translateY(-50%)",
          fontSize: isActive ? 10 : 14, fontWeight: isActive ? 600 : 400,
          color: isActive ? palette.primary : palette.textSecondary,
          pointerEvents: "none",
        }}>{f.label}</label>
      </div>
    );
  };

  const renderForm = () => {
    switch (variant) {
      case "two-col":
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px", maxWidth: 500 }}>
            {FIELDS.map((f) => renderField(f))}
          </div>
        );
      case "inline":
        return <div style={{ maxWidth: 500 }}>{FIELDS.map((f) => renderField(f, true))}</div>;
      case "floating":
        return <div style={{ maxWidth: 360 }}>{FIELDS.map((f) => renderFloatingField(f))}</div>;
      case "grouped":
        return (
          <div style={{ maxWidth: 500 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${palette.border}` }}>Personal Info</div>
              {FIELDS.slice(0, 2).map((f) => renderField(f))}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${palette.border}` }}>Contact</div>
              {FIELDS.slice(2).map((f) => renderField(f))}
            </div>
          </div>
        );
      default:
        return <div style={{ maxWidth: 360 }}>{FIELDS.map((f) => renderField(f))}</div>;
    }
  };

  return (
    <motion.section id="comp-form-layout" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Form Layout</p>
      <p style={sectionDesc}>
        Form layouts structure input fields into readable, scannable groups that guide users through data entry efficiently.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 260 }}>
          {renderForm()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Input Radius", radius)}
          {tokenRow("Input Padding", "10px 14px")}
          {tokenRow("Label Size", "13px / 600")}
          {tokenRow("Field Gap", "16px")}
          {tokenRow("Focus Border", "palette.primary")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("single", "Single Column")}
        {variantBtn("two-col", "Two Column")}
        {variantBtn("inline", "Inline Labels")}
        {variantBtn("floating", "Floating Labels")}
        {variantBtn("grouped", "Grouped Sections")}
      </div>
      <div style={showcaseBox}>{renderForm()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Single column for mobile and simple forms", "Two-column for dense desktop forms with related pairs", "Group related fields with section headers", "Use consistent label placement within a form"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't mix label styles within the same form", "Don't exceed 3 columns", "Don't create overly long single-column forms without grouping"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Label Position: Top-aligned labels scan fastest. Inline labels save space but slow scanning. Floating labels are modern but can cause accessibility issues." },
        { type: "dont", text: "Field Width: Match field width to expected input length. Short fields for zip codes, full-width for addresses." },
        { type: "do", text: "Grouping: Group related fields under section headers. Use visual dividers or spacing to separate groups." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Label", description: "Field identifier text", x: 15, y: 25 },
        { id: 2, label: "Input", description: "Text entry container", x: 50, y: 40 },
        { id: 3, label: "Placeholder", description: "Hint text inside empty field", x: 50, y: 40 },
        { id: 4, label: "Group Header", description: "Section divider for field groups", x: 50, y: 10 },
        { id: 5, label: "Field Gap", description: "Vertical spacing between fields", x: 85, y: 55 },
      ]} renderPreview={(hl) => (
        <div style={{ width: 180 }}>
          {hl === 4 && <div style={{ fontSize: 10, fontWeight: 700, color: palette.textPrimary, borderBottom: `1px solid ${palette.border}`, paddingBottom: 4, marginBottom: 8 }}>Personal Info</div>}
          <div style={{ fontSize: 9, color: palette.textPrimary, marginBottom: 3, opacity: hl && hl !== 1 ? 0.3 : 1 }}>Full Name</div>
          <div style={{
            height: 28, borderRadius: 4, border: `1px solid ${palette.border}`, backgroundColor: palette.background,
            display: "flex", alignItems: "center", paddingLeft: 8, fontSize: 10, color: palette.textSecondary,
            opacity: hl && hl !== 2 && hl !== 3 ? 0.3 : 1,
          }}>{hl === 3 ? "John Doe" : ""}</div>
          <div style={{ height: hl === 5 ? 16 : 10, borderLeft: hl === 5 ? `2px dashed ${palette.primary}` : "none", marginLeft: 10 }} />
          <div style={{ fontSize: 9, color: palette.textPrimary, marginBottom: 3, opacity: hl && hl !== 1 ? 0.3 : 1 }}>Email</div>
          <div style={{ height: 28, borderRadius: 4, border: `1px solid ${palette.border}`, backgroundColor: palette.background, opacity: hl && hl !== 2 ? 0.3 : 1 }} />
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Input Height", value: "40px" },
        { label: "Input Padding", value: "10px 14px" },
        { label: "Input Border Radius", value: radius },
        { label: "Label Font Size", value: "13px" },
        { label: "Field Vertical Gap", value: "16px" },
        { label: "Column Gap (2-col)", value: "20px" },
        { label: "Section Header Gap", value: "24px" },
      ]} />
    </motion.section>
  );
}
