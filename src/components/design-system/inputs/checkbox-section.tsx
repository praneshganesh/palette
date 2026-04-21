"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface CheckboxSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

function Checkbox({ checked, onChange, indeterminate, disabled, color, size = 18 }: {
  checked: boolean; onChange: (v: boolean) => void; indeterminate?: boolean;
  disabled?: boolean; color: string; size?: number;
}) {
  const active = checked || indeterminate;
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      style={{
        width: size, height: size, borderRadius: Math.max(3, size * 0.2),
        border: `2px solid ${active ? color : "#bbb"}`,
        backgroundColor: active ? color : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer", padding: 0,
        transition: "all 0.15s", opacity: disabled ? 0.4 : 1, outline: "none",
        flexShrink: 0,
      }}
    >
      {checked && !indeterminate && (
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {indeterminate && (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )}
    </button>
  );
}

export function CheckboxSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: CheckboxSectionProps) {
  const comp = system.components;
  const [hero, setHero] = useState(true);
  const [group, setGroup] = useState<Record<string, boolean>>({ email: true, sms: false, push: true });
  const [colorPri, setColorPri] = useState(true);
  const [colorSuccess, setColorSuccess] = useState(false);
  const [colorWarn, setColorWarn] = useState(true);

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

  const allChecked = Object.values(group).every(Boolean);
  const someChecked = Object.values(group).some(Boolean) && !allChecked;

  return (
    <motion.section id="comp-checkboxes" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Checkbox</p>
      <p style={sectionDesc}>
        Checkboxes let users select one or more options from a set. They support checked,
        unchecked, and indeterminate states for parent-child relationships.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                onChange={(v) => setGroup({ email: v, sms: v, push: v })}
                color={palette.primary}
                size={20}
              />
              <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>Select all notifications</span>
            </div>
            <div style={{ marginLeft: 30, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { key: "email", label: "Email notifications" },
                { key: "sms", label: "SMS alerts" },
                { key: "push", label: "Push notifications" },
              ].map(({ key, label }) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Checkbox checked={group[key]} onChange={(v) => setGroup({ ...group, [key]: v })} color={palette.primary} />
                  <span style={{ fontSize: 13, color: palette.textPrimary }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Box Size", "18px (md)")}
          {tokenRow("Border Radius", comp.input.borderRadius || "4px")}
          {tokenRow("Checked Color", "palette.primary")}
          {tokenRow("Border", "2px solid")}
          {tokenRow("Focus Ring", `${palette.primary} @ 20%`)}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Default</div>
          <Checkbox checked={hero} onChange={setHero} color={palette.primary} />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Indeterminate</div>
          <Checkbox checked={false} indeterminate onChange={() => {}} color={palette.primary} />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Label</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Checkbox checked={hero} onChange={setHero} color={palette.primary} />
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Accept terms</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Description</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Checkbox checked={true} onChange={() => {}} color={palette.primary} />
            <div>
              <div style={{ fontSize: 13, color: palette.textPrimary }}>Marketing emails</div>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>Receive promotional content</div>
            </div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Checkbox Group</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Option A", "Option B", "Option C"].map((o, i) => (
              <div key={o} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Checkbox checked={i === 0 || i === 2} onChange={() => {}} color={palette.primary} />
                <span style={{ fontSize: 13, color: palette.textPrimary }}>{o}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color Variants */}
      <div style={subsectionLabel}>Color Variants</div>
      <div style={{ ...showcaseBox, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox checked={colorPri} onChange={setColorPri} color={palette.primary} /><span style={{ fontSize: 12, color: palette.textSecondary }}>Primary</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox checked={colorSuccess} onChange={setColorSuccess} color={palette.success} /><span style={{ fontSize: 12, color: palette.textSecondary }}>Success</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox checked={colorWarn} onChange={setColorWarn} color={palette.warning} /><span style={{ fontSize: 12, color: palette.textSecondary }}>Warning</span>
        </div>
      </div>

      {/* Sizes */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ ...showcaseBox, display: "flex", gap: 32, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox checked={true} onChange={() => {}} color={palette.primary} size={14} /><span style={{ fontSize: 11, color: palette.textSecondary }}>Small</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox checked={true} onChange={() => {}} color={palette.primary} size={18} /><span style={{ fontSize: 12, color: palette.textSecondary }}>Medium</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox checked={true} onChange={() => {}} color={palette.primary} size={24} /><span style={{ fontSize: 13, color: palette.textSecondary }}>Large</span>
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        {[
          { label: "Unchecked", checked: false, indet: false, dis: false, err: false },
          { label: "Checked", checked: true, indet: false, dis: false, err: false },
          { label: "Indeterminate", checked: false, indet: true, dis: false, err: false },
          { label: "Disabled", checked: true, indet: false, dis: true, err: false },
          { label: "Error", checked: false, indet: false, dis: false, err: true },
        ].map((s) => (
          <div key={s.label} style={{ ...showcaseBox, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>{s.label}</div>
            <div style={{ display: "inline-flex", position: "relative" }}>
              {s.err && <div style={{ position: "absolute", inset: -4, borderRadius: 6, border: `2px solid ${palette.danger}40`, pointerEvents: "none" }} />}
              <Checkbox checked={s.checked} indeterminate={s.indet} disabled={s.dis} onChange={() => {}} color={s.err ? palette.danger : palette.primary} />
            </div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use checkboxes" description="Checkboxes are best for multi-select scenarios:" items={[
          "Selecting multiple items from a list",
          "Accepting terms and conditions",
          "Enabling/disabling individual settings",
          "Filter panels with multiple criteria",
        ]} />
        <UsageSection palette={palette} title="Checkbox vs. Toggle" description="Pick the right control for the interaction:" items={[
          "Checkbox — part of a form, submitted together",
          "Toggle — instant effect, no form submit",
          "Checkbox — supports indeterminate (mixed) state",
          "Toggle — strictly binary on/off",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        {
          type: "do", text: "Use a parent checkbox with indeterminate state when controlling a group.",
          visual: (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Checkbox checked={false} indeterminate onChange={() => {}} color={palette.primary} size={16} />
                <span style={{ fontSize: 11, color: palette.textPrimary, fontWeight: 600 }}>Select all</span>
              </div>
              <div style={{ marginLeft: 24, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Checkbox checked={true} onChange={() => {}} color={palette.primary} size={14} /><span style={{ fontSize: 11, color: palette.textSecondary }}>Item 1</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Checkbox checked={false} onChange={() => {}} color={palette.primary} size={14} /><span style={{ fontSize: 11, color: palette.textSecondary }}>Item 2</span></div>
              </div>
            </div>
          ),
        },
        {
          type: "dont", text: "Don't use checkboxes for mutually exclusive options — use radios instead.",
          visual: (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Checkbox checked={true} onChange={() => {}} color={palette.danger} size={14} /><span style={{ fontSize: 11, color: palette.textSecondary }}>Yes</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Checkbox checked={true} onChange={() => {}} color={palette.danger} size={14} /><span style={{ fontSize: 11, color: palette.textSecondary }}>No</span></div>
            </div>
          ),
        },
        { type: "do", text: "Always provide a visible label. The checkbox alone isn't enough context." },
        { type: "dont", text: "Don't nest checkboxes more than one level deep to avoid confusion." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Box", description: "Square container with border", x: 15, y: 40 },
        { id: 2, label: "Check mark", description: "SVG check or minus icon inside", x: 15, y: 70 },
        { id: 3, label: "Label", description: "Primary descriptive text", x: 55, y: 35 },
        { id: 4, label: "Description", description: "Optional secondary helper text", x: 55, y: 65 },
      ]} renderPreview={(h) => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 4, backgroundColor: palette.primary,
            border: `2px solid ${palette.primary}`, display: "flex", alignItems: "center", justifyContent: "center",
            opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s", flexShrink: 0, marginTop: 2,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              style={{ opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              Email notifications
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              Receive weekly digest emails
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Box Size (sm)", value: "14px" },
        { label: "Box Size (md)", value: "18px" },
        { label: "Box Size (lg)", value: "24px" },
        { label: "Border Width", value: "2px" },
        { label: "Border Radius", value: "4px" },
        { label: "Label Gap", value: "10px" },
        { label: "Group Spacing", value: "12px" },
      ]} />
    </motion.section>
  );
}
