"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ValidationSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type FieldState = "idle" | "valid" | "invalid" | "warning" | "info";

const stateIcon = (state: FieldState) => {
  const props = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (state) {
    case "valid": return <svg {...props}><polyline points="20 6 9 17 4 12" /></svg>;
    case "invalid": return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;
    case "warning": return <svg {...props}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    case "info": return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;
    default: return null;
  }
};

export function ValidationSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ValidationSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"inline-error" | "inline-success" | "below" | "toast" | "summary" | "realtime">("inline-error");
  const [emailVal, setEmailVal] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

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

  const stateColor = (s: FieldState) => {
    switch (s) {
      case "valid": return palette.success;
      case "invalid": return palette.danger;
      case "warning": return palette.warning;
      case "info": return palette.info;
      default: return palette.border;
    }
  };

  const fieldWithState = (label: string, state: FieldState, msg: string, value: string, onChange: (v: string) => void) => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input style={{
          width: "100%", padding: "10px 36px 10px 14px", fontSize: 14,
          fontFamily: system.typography.bodyFont, color: palette.textPrimary,
          backgroundColor: palette.background, borderRadius: radius,
          border: `1px solid ${stateColor(state)}`, outline: "none",
          boxSizing: "border-box" as const,
        }} value={value} onChange={(e) => onChange(e.target.value)} />
        {state !== "idle" && (
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: stateColor(state) }}>
            {stateIcon(state)}
          </span>
        )}
      </div>
      {state !== "idle" && msg && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 12, color: stateColor(state) }}>
          {msg}
        </div>
      )}
    </div>
  );

  const renderStates = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 20, marginBottom: 16 }}>
      {([
        { state: "valid" as FieldState, label: "Valid", border: palette.success, bg: palette.success + "10" },
        { state: "invalid" as FieldState, label: "Invalid", border: palette.danger, bg: palette.danger + "10" },
        { state: "warning" as FieldState, label: "Warning", border: palette.warning, bg: palette.warning + "10" },
        { state: "info" as FieldState, label: "Info", border: palette.info, bg: palette.info + "10" },
      ]).map((s) => (
        <div key={s.state} style={{ ...showcaseBox, borderColor: s.border, backgroundColor: s.bg }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ color: s.border }}>{stateIcon(s.state)}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: s.border }}>{s.label}</span>
          </div>
          <div style={{ height: 32, borderRadius: radius, border: `1px solid ${s.border}`, backgroundColor: palette.background }} />
        </div>
      ))}
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case "inline-success":
        return (
          <div style={{ maxWidth: 360 }}>
            {fieldWithState("Email", "valid", "Email is available!", "john@example.com", () => {})}
            {fieldWithState("Username", "valid", "Username looks good.", "johndoe", () => {})}
          </div>
        );
      case "below":
        return (
          <div style={{ maxWidth: 360 }}>
            {fieldWithState("Password", "invalid", "Must be at least 8 characters", "abc", () => {})}
            {fieldWithState("Confirm Password", "warning", "Passwords do not match yet", "ab", () => {})}
          </div>
        );
      case "toast":
        return (
          <div style={{ maxWidth: 360 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>Email</label>
              <input style={{ width: "100%", padding: "10px 14px", fontSize: 14, fontFamily: system.typography.bodyFont, color: palette.textPrimary, backgroundColor: palette.background, borderRadius: radius, border: `1px solid ${palette.border}`, outline: "none", boxSizing: "border-box" as const }} />
            </div>
            <button onClick={() => { setToastVisible(true); setTimeout(() => setToastVisible(false), 2500); }}
              style={{ padding: "8px 20px", fontSize: 13, fontWeight: 600, borderRadius: radius, border: "none", backgroundColor: palette.primary, color: "#fff", cursor: "pointer" }}>
              Submit
            </button>
            {toastVisible && (
              <div style={{
                marginTop: 16, padding: "12px 16px", backgroundColor: palette.danger + "15",
                border: `1px solid ${palette.danger}`, borderRadius: system.spacing.radius.md,
                fontSize: 13, color: palette.danger, display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ color: palette.danger }}>{stateIcon("invalid")}</span>
                Please enter a valid email address.
              </div>
            )}
          </div>
        );
      case "summary":
        return (
          <div style={{ maxWidth: 400 }}>
            <div style={{
              padding: "14px 18px", backgroundColor: palette.danger + "10",
              border: `1px solid ${palette.danger}30`, borderRadius: system.spacing.radius.md, marginBottom: 20,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: palette.danger, marginBottom: 8 }}>Please fix the following errors:</div>
              {["Email is required", "Password must be at least 8 characters", "Please accept the terms"].map((err, i) => (
                <div key={i} style={{ fontSize: 12, color: palette.danger, marginBottom: 4, paddingLeft: 12, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0 }}>•</span>{err}
                </div>
              ))}
            </div>
            {fieldWithState("Email", "invalid", "Required", "", () => {})}
            {fieldWithState("Password", "invalid", "Too short", "abc", () => {})}
          </div>
        );
      case "realtime":
        return (
          <div style={{ maxWidth: 360 }}>
            {fieldWithState("Name", nameVal.length >= 2 ? "valid" : nameVal.length > 0 ? "warning" : "idle",
              nameVal.length >= 2 ? "Looks good!" : nameVal.length > 0 ? "Name should be at least 2 characters" : "",
              nameVal, setNameVal)}
            {fieldWithState("Email",
              emailVal.includes("@") && emailVal.includes(".") ? "valid" : emailVal.length > 0 ? "invalid" : "idle",
              emailVal.includes("@") && emailVal.includes(".") ? "Valid email" : emailVal.length > 0 ? "Enter a valid email address" : "",
              emailVal, setEmailVal)}
            <div style={{ fontSize: 11, color: palette.textSecondary, fontStyle: "italic" }}>Type to see real-time validation</div>
          </div>
        );
      default:
        return (
          <div style={{ maxWidth: 360 }}>
            {fieldWithState("Email", "invalid", "Please enter a valid email address", "notanemail", () => {})}
            {fieldWithState("Phone", "warning", "Phone number seems incomplete", "+1 555", () => {})}
            {fieldWithState("Name", "info", "This will be visible to other users", "John", () => {})}
          </div>
        );
    }
  };

  return (
    <motion.section id="comp-validation" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Validation</p>
      <p style={sectionDesc}>
        Validation patterns communicate field requirements and errors, guiding users to correct issues without frustration.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 240 }}>
          {renderVariant()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Error", "palette.danger")}
          {tokenRow("Success", "palette.success")}
          {tokenRow("Warning", "palette.warning")}
          {tokenRow("Info", "palette.info")}
          {tokenRow("Message Font", "12px")}
          {tokenRow("Icon Size", "14px")}
        </div>
      </div>

      {/* Field States */}
      <div style={subsectionLabel}>Field States</div>
      {renderStates()}

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("inline-error", "Inline Error")}
        {variantBtn("inline-success", "Inline Success")}
        {variantBtn("below", "Below Field")}
        {variantBtn("toast", "Toast-based")}
        {variantBtn("summary", "Summary at Top")}
        {variantBtn("realtime", "Real-time")}
      </div>
      <div style={showcaseBox}>{renderVariant()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Show validation near the relevant field", "Use color + icon + text for maximum clarity", "Validate on blur for inline, on submit for summary", "Provide actionable error messages"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't validate on every keystroke for complex rules", "Don't rely on color alone", "Don't use alert dialogs for field validation"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Timing: Inline validation on blur. Summary validation on submit. Real-time only for simple checks (length, format)." },
        { type: "dont", text: "Messages: Be specific: 'Password must be 8+ characters' not 'Invalid password'. Include how to fix the error." },
        { type: "do", text: "Accessibility: Use aria-invalid, aria-describedby. Don't rely solely on color—combine with icons and text." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Input Border", description: "Color changes with state", x: 50, y: 45 },
        { id: 2, label: "Status Icon", description: "Right-aligned in input", x: 85, y: 45 },
        { id: 3, label: "Message", description: "Text below the field", x: 50, y: 70 },
        { id: 4, label: "Summary Box", description: "Grouped errors at top", x: 50, y: 10 },
      ]} renderPreview={(hl) => (
        <div style={{ width: 180 }}>
          {hl === 4 && (
            <div style={{ padding: 6, backgroundColor: palette.danger + "10", borderRadius: 4, marginBottom: 8, fontSize: 8, color: palette.danger }}>2 errors found</div>
          )}
          <div style={{ position: "relative" }}>
            <div style={{
              height: 28, borderRadius: 4, border: `1px solid ${hl === 1 ? palette.danger : palette.border}`,
              backgroundColor: palette.background, opacity: hl && hl !== 1 && hl !== 2 ? 0.3 : 1,
            }} />
            {(hl === 2 || !hl) && (
              <span style={{ position: "absolute", right: 6, top: 7, color: palette.danger }}>{stateIcon("invalid")}</span>
            )}
          </div>
          {(hl === 3 || !hl) && (
            <div style={{ fontSize: 8, color: palette.danger, marginTop: 4, opacity: hl && hl !== 3 ? 0.3 : 1 }}>Please enter a valid email</div>
          )}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Icon Size", value: "14px" },
        { label: "Message Font Size", value: "12px" },
        { label: "Message Margin Top", value: "6px" },
        { label: "Summary Padding", value: "14px 18px" },
        { label: "Summary Border Radius", value: system.spacing.radius.md },
        { label: "Toast Duration", value: "2500ms" },
      ]} />
    </motion.section>
  );
}
