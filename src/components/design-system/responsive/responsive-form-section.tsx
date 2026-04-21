"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ResponsiveFormSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const fields = [
  { label: "First Name", placeholder: "Alex", half: true },
  { label: "Last Name", placeholder: "Morgan", half: true },
  { label: "Email", placeholder: "alex@example.com", half: false },
  { label: "Phone", placeholder: "+1 555-0123", half: true },
  { label: "Company", placeholder: "Acme Inc.", half: true },
  { label: "Message", placeholder: "Tell us more…", textarea: true, half: false },
];

export function ResponsiveFormSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ResponsiveFormSectionProps) {
  const comp = system.components;
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const inputStyle = (isTextarea: boolean): React.CSSProperties => ({
    width: "100%", padding: "10px 12px", fontSize: 13, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.md, backgroundColor: palette.surface,
    color: palette.textPrimary, outline: "none", fontFamily: "inherit",
    minHeight: isTextarea ? 80 : "auto", resize: isTextarea ? "vertical" as const : "none" as const,
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: palette.textSecondary, marginBottom: 6, display: "block",
  };

  const renderForm = (isMobile: boolean) => {
    const colFields: typeof fields[] = [];
    let row: typeof fields = [];

    for (const f of fields) {
      if (isMobile || !f.half) {
        if (row.length) { colFields.push(row); row = []; }
        colFields.push([f]);
      } else {
        row.push(f);
        if (row.length === 2) { colFields.push(row); row = []; }
      }
    }
    if (row.length) colFields.push(row);

    return (
      <div style={{ maxWidth: isMobile ? 320 : "100%", margin: "0 auto" }}>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: isMobile ? 16 : 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, marginBottom: 4 }}>Contact Form</div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 20 }}>Fill in the details below</div>
          {colFields.map((group, gi) => (
            <div key={gi} style={{ display: "grid", gridTemplateColumns: group.length > 1 && !isMobile ? "1fr 1fr" : "1fr", gap: 14, marginBottom: 14 }}>
              {group.map(f => (
                <div key={f.label}>
                  <label style={labelStyle}>{f.label}</label>
                  {f.textarea ? (
                    <textarea placeholder={f.placeholder} style={inputStyle(true)} />
                  ) : (
                    <input placeholder={f.placeholder} style={inputStyle(false)} />
                  )}
                </div>
              ))}
            </div>
          ))}
          <button style={{ width: isMobile ? "100%" : "auto", padding: "10px 28px", fontSize: 14, fontWeight: 600, backgroundColor: palette.primary, color: "#fff", border: "none", borderRadius: system.spacing.radius.md, cursor: "pointer", marginTop: 8 }}>Submit</button>
        </div>
      </div>
    );
  };

  return (
    <motion.section id="comp-responsive-form" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Responsive Form</p>
      <p style={sectionDesc}>
        Multi-column forms collapse to single-column layouts on mobile, with full-width inputs and adjusted spacing to maintain usability on touch devices.
      </p>

      <div style={subsectionLabel}>Breakpoint Comparison</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["desktop", "mobile"] as const).map(m => (
          <button key={m} onClick={() => setViewMode(m)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${viewMode === m ? palette.primary : palette.border}`, backgroundColor: viewMode === m ? palette.primary + "15" : palette.surface, color: viewMode === m ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>{m === "desktop" ? "≥ 768px Desktop" : "< 768px Mobile"}</button>
        ))}
      </div>
      <div style={previewBox}>{renderForm(viewMode === "mobile")}</div>

      <div style={subsectionLabel}>Side-by-Side</div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Desktop — Multi-Column</div>
          <div style={previewBox}>{renderForm(false)}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Mobile — Stacked</div>
          <div style={previewBox}>{renderForm(true)}</div>
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use responsive forms" description="Forms accessed across devices:" items={[
          "Registration and contact forms",
          "Settings and profile editing screens",
          "Multi-field data entry in dashboards",
        ]} />
        <UsageSection palette={palette} title="Layout strategies" description="Adapt form layout intelligently:" items={[
          "Pair short fields (first/last name) side-by-side on desktop",
          "Stack all fields single-column on mobile",
          "Make submit button full-width on mobile for easy thumb access",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use full-width inputs on mobile so users can comfortably type on small screens." },
        { type: "dont", text: "Don't force two-column layout on mobile — side-by-side tiny inputs are frustrating." },
        { type: "do", text: "Place labels above inputs (not beside) on both mobile and desktop for scanning." },
        { type: "dont", text: "Don't hide helper text or validation on mobile to save space — it's more needed there." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Form container", description: "Card wrapping the form fields", x: 50, y: 50 },
        { id: 2, label: "Field group", description: "Row of 1 or 2 inputs", x: 50, y: 30 },
        { id: 3, label: "Label", description: "Field description above input", x: 20, y: 20 },
        { id: 4, label: "Input", description: "Text field or textarea", x: 50, y: 45 },
        { id: 5, label: "Submit button", description: "Full-width on mobile, auto-width on desktop", x: 50, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 12, opacity: h === 1 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6, opacity: h === 2 ? 1 : h === null ? 1 : 0.5 }}>
            {["First", "Last"].map(l => (
              <div key={l}>
                <div style={{ fontSize: 8, color: palette.textSecondary, marginBottom: 2, opacity: h === 3 ? 1 : h === null ? 1 : 0.4 }}>{l}</div>
                <div style={{ height: 14, border: `1px solid ${palette.border}`, borderRadius: 3, backgroundColor: palette.surfaceMuted, opacity: h === 4 ? 1 : h === null ? 1 : 0.4 }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 8, opacity: h === 2 ? 1 : h === null ? 1 : 0.5 }}>
            <div style={{ fontSize: 8, color: palette.textSecondary, marginBottom: 2 }}>Email</div>
            <div style={{ height: 14, border: `1px solid ${palette.border}`, borderRadius: 3, backgroundColor: palette.surfaceMuted }} />
          </div>
          <div style={{ height: 14, backgroundColor: palette.primary, borderRadius: 3, opacity: h === 5 ? 1 : h === null ? 1 : 0.4 }} />
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Input Height", value: "40–44px" },
        { label: "Label Font Size", value: "12px / 600" },
        { label: "Field Gap (desktop)", value: "14–16px" },
        { label: "Field Gap (mobile)", value: "12–14px" },
        { label: "Form Padding (mobile)", value: "16px" },
      ]} />
    </motion.section>
  );
}
