"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ToggleSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

function Toggle({ checked, onChange, color, size = 20, disabled }: {
  checked: boolean; onChange: (v: boolean) => void; color: string; size?: number; disabled?: boolean;
}) {
  const w = size * 2.2;
  const dot = size * 0.8;
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      style={{
        width: w, height: size, borderRadius: size,
        backgroundColor: checked ? color : "#ccc",
        border: "none", padding: 0, cursor: disabled ? "not-allowed" : "pointer",
        position: "relative", transition: "background-color 0.2s",
        opacity: disabled ? 0.4 : 1, outline: "none",
      }}
    >
      <div style={{
        position: "absolute", top: (size - dot) / 2,
        left: checked ? w - dot - (size - dot) / 2 : (size - dot) / 2,
        width: dot, height: dot, borderRadius: "50%",
        backgroundColor: "#fff", transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

export function ToggleSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ToggleSectionProps) {
  const comp = system.components;
  const [hero, setHero] = useState(true);
  const [withLabel, setWithLabel] = useState(true);
  const [withDesc, setWithDesc] = useState(false);
  const [colorPri, setColorPri] = useState(true);
  const [colorSuccess, setColorSuccess] = useState(false);
  const [colorWarn, setColorWarn] = useState(true);
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(false);

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

  return (
    <motion.section id="comp-toggle" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Toggle</p>
      <p style={sectionDesc}>
        Toggles allow users to switch between two mutually exclusive states — on and off.
        They provide immediate visual feedback and are ideal for enabling or disabling features.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140, gap: 16 }}>
          <span style={{ fontSize: 14, color: palette.textSecondary }}>Dark mode</span>
          <Toggle checked={hero} onChange={setHero} color={palette.primary} size={28} />
          <span style={{ fontSize: 13, fontWeight: 600, color: hero ? palette.primary : palette.textSecondary }}>{hero ? "On" : "Off"}</span>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Border Radius", "full (pill)")}
          {tokenRow("Track Height", "20–28px")}
          {tokenRow("Active Color", "palette.primary")}
          {tokenRow("Inactive Color", palette.border)}
          {tokenRow("Transition", "0.2s ease")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Default</div>
          <Toggle checked={hero} onChange={setHero} color={palette.primary} />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Label</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Toggle checked={withLabel} onChange={setWithLabel} color={palette.primary} />
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Notifications</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Description</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Toggle checked={withDesc} onChange={setWithDesc} color={palette.primary} />
            <div>
              <div style={{ fontSize: 13, color: palette.textPrimary }}>Auto-save</div>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>Save changes automatically</div>
            </div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Disabled On</div>
          <Toggle checked={true} onChange={() => {}} color={palette.primary} disabled />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Disabled Off</div>
          <Toggle checked={false} onChange={() => {}} color={palette.primary} disabled />
        </div>
      </div>

      {/* Color Variants */}
      <div style={subsectionLabel}>Color Variants</div>
      <div style={{ ...showcaseBox, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Toggle checked={colorPri} onChange={setColorPri} color={palette.primary} />
          <span style={{ fontSize: 12, color: palette.textSecondary }}>Primary</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Toggle checked={colorSuccess} onChange={setColorSuccess} color={palette.success} />
          <span style={{ fontSize: 12, color: palette.textSecondary }}>Success</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Toggle checked={colorWarn} onChange={setColorWarn} color={palette.warning} />
          <span style={{ fontSize: 12, color: palette.textSecondary }}>Warning</span>
        </div>
      </div>

      {/* Sizes */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ ...showcaseBox, display: "flex", gap: 32, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Toggle checked={sm} onChange={setSm} color={palette.primary} size={16} />
          <span style={{ fontSize: 11, color: palette.textSecondary }}>Small</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Toggle checked={md} onChange={setMd} color={palette.primary} size={22} />
          <span style={{ fontSize: 12, color: palette.textSecondary }}>Medium</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Toggle checked={lg} onChange={setLg} color={palette.primary} size={28} />
          <span style={{ fontSize: 13, color: palette.textSecondary }}>Large</span>
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {(["Default", "Focused", "Disabled", "On"] as const).map((state) => (
          <div key={state} style={{ ...showcaseBox, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>{state}</div>
            <div style={{ display: "inline-flex", position: "relative" }}>
              {state === "Focused" && (
                <div style={{ position: "absolute", inset: -4, borderRadius: 999, border: `2px solid ${palette.primary}40`, pointerEvents: "none" }} />
              )}
              <Toggle
                checked={state === "On" || state === "Focused"}
                onChange={() => {}}
                color={palette.primary}
                disabled={state === "Disabled"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use toggles" description="Toggles are best for binary settings that take effect immediately:" items={[
          "Feature on/off switches in settings",
          "Enabling notifications or preferences",
          "Activating dark mode or accessibility features",
          "Any setting where the change is instant",
        ]} />
        <UsageSection palette={palette} title="Toggle vs. Checkbox" description="Choose the right control for the context:" items={[
          "Toggle — immediate effect, no submit needed",
          "Checkbox — part of a form, submitted together",
          "Toggle — single binary choice only",
          "Checkbox — can be used in groups",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        {
          type: "do", text: "Label toggles with positive statements so 'on' is the expected state.",
          visual: (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Toggle checked={true} onChange={() => {}} color={palette.primary} size={18} />
              <span style={{ fontSize: 12, color: palette.textPrimary }}>Enable notifications</span>
            </div>
          ),
        },
        {
          type: "dont", text: "Don't use negative labels where 'on' means something is disabled.",
          visual: (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Toggle checked={true} onChange={() => {}} color={palette.primary} size={18} />
              <span style={{ fontSize: 12, color: palette.textPrimary }}>Disable sounds</span>
            </div>
          ),
        },
        {
          type: "do", text: "Apply the change immediately when toggled. No save button needed.",
          visual: (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Toggle checked={true} onChange={() => {}} color={palette.success} size={18} />
              <span style={{ fontSize: 12, color: palette.success }}>Saved</span>
            </div>
          ),
        },
        {
          type: "dont", text: "Don't use toggles for actions that require a confirmation step.",
          visual: (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Toggle checked={false} onChange={() => {}} color={palette.danger} size={18} />
              <span style={{ fontSize: 12, color: palette.textSecondary }}>Delete account?</span>
            </div>
          ),
        },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Track", description: "Background pill shape that changes color", x: 0, y: 50 },
        { id: 2, label: "Thumb", description: "Circular knob that slides left/right", x: 30, y: 50 },
        { id: 3, label: "Label", description: "Text describing what the toggle controls", x: 60, y: 50 },
        { id: 4, label: "Description", description: "Optional helper text below the label", x: 60, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{
            width: 44, height: 24, borderRadius: 12, backgroundColor: palette.primary,
            position: "relative", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>
            <div style={{
              position: "absolute", top: 3, left: 23, width: 18, height: 18, borderRadius: "50%",
              backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              Enable feature
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              Activate this feature for all users
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Track Width (md)", value: "44px" },
        { label: "Track Height (md)", value: "24px" },
        { label: "Thumb Diameter (md)", value: "18px" },
        { label: "Thumb Offset", value: "3px" },
        { label: "Border Radius", value: "full (pill)" },
        { label: "Label Gap", value: "10px" },
        { label: "Transition Duration", value: "200ms" },
      ]} />
    </motion.section>
  );
}
