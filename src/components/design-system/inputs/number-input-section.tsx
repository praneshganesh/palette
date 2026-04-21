"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface NumberInputSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function NumberInputSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: NumberInputSectionProps) {
  const comp = system.components;
  const [defaultVal, setDefaultVal] = useState(5);
  const [stepperVal, setStepperVal] = useState(10);
  const [unitVal, setUnitVal] = useState(75);
  const [currencyVal, setCurrencyVal] = useState(250);
  const [percentVal, setPercentVal] = useState(50);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [errorVal, setErrorVal] = useState(150);

  const inputRadius = parseInt(comp.input.borderRadius) || 8;
  const inputPx = parseInt(comp.input.paddingX) || 12;
  const inputPy = parseInt(comp.input.paddingY) || 8;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const baseInput = (id: string, error?: boolean, disabled?: boolean): React.CSSProperties => ({
    width: "100%", boxSizing: "border-box" as const,
    padding: `${inputPy}px ${inputPx}px`, borderRadius: inputRadius,
    border: `1.5px solid ${error ? palette.danger : focusedId === id ? palette.primary : palette.border}`,
    backgroundColor: disabled ? palette.surfaceMuted : palette.background,
    color: disabled ? palette.textSecondary : palette.textPrimary,
    fontFamily: system.typography.bodyFont, fontSize: 14, outline: "none",
    transition: "border-color 0.15s", cursor: disabled ? "not-allowed" : "text",
    opacity: disabled ? 0.6 : 1,
  });

  const stepBtn = (onClick: () => void, disabled?: boolean) => ({
    onClick: disabled ? undefined : onClick,
    style: {
      width: 32, height: "100%" as const, border: "none",
      backgroundColor: "transparent", cursor: disabled ? "not-allowed" : "pointer",
      display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const,
      color: disabled ? palette.border : palette.textSecondary, fontSize: 18, fontWeight: 600,
      opacity: disabled ? 0.4 : 1,
    } as React.CSSProperties,
  });

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const renderNumberInput = (
    id: string, value: number, onChange: (v: number) => void,
    opts: { prefix?: string; suffix?: string; stepper?: boolean; min?: number; max?: number; step?: number; disabled?: boolean; error?: boolean; label?: string } = {}
  ) => {
    const { prefix, suffix, stepper, min = 0, max = 999, step = 1, disabled, error, label } = opts;
    const isFocused = focusedId === id;
    return (
      <div>
        {label && <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 8 }}>{label}</div>}
        <div style={{
          display: "flex", alignItems: "stretch",
          borderRadius: inputRadius, overflow: "hidden",
          border: `1.5px solid ${error ? palette.danger : isFocused ? palette.primary : palette.border}`,
          backgroundColor: disabled ? palette.surfaceMuted : palette.background,
          transition: "border-color 0.15s", opacity: disabled ? 0.6 : 1,
        }}>
          {stepper && <button {...stepBtn(() => onChange(clamp(value - step, min, max)), disabled)}>−</button>}
          {prefix && (
            <div style={{ display: "flex", alignItems: "center", paddingLeft: inputPx, color: palette.textSecondary, fontSize: 14, fontWeight: 500, userSelect: "none" }}>
              {prefix}
            </div>
          )}
          <input
            type="number" value={value} disabled={disabled}
            onChange={(e) => onChange(clamp(Number(e.target.value), min, max))}
            onFocus={() => setFocusedId(id)} onBlur={() => setFocusedId(null)}
            style={{
              flex: 1, border: "none", outline: "none", backgroundColor: "transparent",
              padding: `${inputPy}px ${prefix ? 4 : inputPx}px`,
              color: disabled ? palette.textSecondary : palette.textPrimary,
              fontFamily: system.typography.bodyFont, fontSize: 14, minWidth: 0,
              cursor: disabled ? "not-allowed" : "text",
            }}
          />
          {suffix && (
            <div style={{ display: "flex", alignItems: "center", paddingRight: inputPx, color: palette.textSecondary, fontSize: 13, userSelect: "none" }}>
              {suffix}
            </div>
          )}
          {stepper && <button {...stepBtn(() => onChange(clamp(value + step, min, max)), disabled)}>+</button>}
        </div>
        {error && <div style={{ fontSize: 11, color: palette.danger, marginTop: 4 }}>Value must be between {min} and {max}</div>}
      </div>
    );
  };

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  return (
    <motion.section id="comp-number-input" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Number Input</p>
      <p style={sectionDesc}>
        Number inputs allow users to enter and adjust numeric values with optional stepper buttons, unit suffixes, and built-in validation for min/max ranges.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }}>
          <div style={{ width: 220 }}>
            {renderNumberInput("hero", stepperVal, setStepperVal, { stepper: true, min: 0, max: 100, step: 1, label: "Quantity" })}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Border Radius", comp.input.borderRadius)}
          {tokenRow("Padding X", comp.input.paddingX)}
          {tokenRow("Padding Y", comp.input.paddingY)}
          {tokenRow("Border Color", "palette.border")}
          {tokenRow("Focus Border", "palette.primary")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Default</div>
          {renderNumberInput("v-default", defaultVal, setDefaultVal, { min: 0, max: 100 })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Stepper</div>
          {renderNumberInput("v-stepper", stepperVal, setStepperVal, { stepper: true, min: 0, max: 100 })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Unit Suffix</div>
          {renderNumberInput("v-unit", unitVal, setUnitVal, { suffix: "kg", min: 0, max: 500 })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Currency</div>
          {renderNumberInput("v-currency", currencyVal, setCurrencyVal, { prefix: "$", min: 0, max: 10000, step: 10 })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Percentage</div>
          {renderNumberInput("v-percent", percentVal, setPercentVal, { suffix: "%", min: 0, max: 100 })}
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Default</div>
          {renderNumberInput("s-default", 42, () => {}, {})}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Focused</div>
          <div style={{
            borderRadius: inputRadius, overflow: "hidden",
            border: `1.5px solid ${palette.primary}`,
            backgroundColor: palette.background,
          }}>
            <input type="number" value={42} readOnly style={{
              border: "none", outline: "none", backgroundColor: "transparent",
              padding: `${inputPy}px ${inputPx}px`, width: "100%", boxSizing: "border-box",
              color: palette.textPrimary, fontFamily: system.typography.bodyFont, fontSize: 14,
            }} />
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Error</div>
          {renderNumberInput("s-error", errorVal, setErrorVal, { min: 0, max: 100, error: errorVal > 100 || errorVal < 0 })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Disabled</div>
          {renderNumberInput("s-disabled", 42, () => {}, { disabled: true })}
        </div>
      </div>

      {/* Features */}
      <div style={subsectionLabel}>Features</div>
      <div style={{ ...showcaseBox, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 8 }}>Increment / Decrement (step: 5)</div>
          {renderNumberInput("f-step", stepperVal, setStepperVal, { stepper: true, step: 5, min: 0, max: 100 })}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 8 }}>Min/Max Clamping (0–100)</div>
          {renderNumberInput("f-clamp", defaultVal, setDefaultVal, { min: 0, max: 100 })}
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 4 }}>Try typing above 100</div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use number inputs" description="Number inputs are best for precise numeric entry:" items={[
          "Quantity selectors in e-commerce carts",
          "Price or currency fields in financial forms",
          "Measurement inputs with unit suffixes",
          "Settings that require exact numeric values",
        ]} />
        <UsageSection palette={palette} title="Number input vs. slider" description="Choose the right control based on precision needs:" items={[
          "Number input — when exact values matter",
          "Slider — when approximate range selection is fine",
          "Number input — when the valid range is large",
          "Slider — when visual feedback helps decision-making",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Always set sensible min and max values to prevent invalid input." },
        { type: "dont", text: "Don't allow unrestricted ranges where users can enter impossibly large numbers." },
        { type: "do", text: "Show the unit suffix (kg, %, $) so users know what they're entering." },
        { type: "dont", text: "Don't rely on placeholder text alone to communicate the expected format." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Container", description: "Outer border wrapper with focus state", x: 50, y: 50 },
        { id: 2, label: "Input Field", description: "Editable numeric text area", x: 50, y: 50 },
        { id: 3, label: "Stepper Buttons", description: "Optional ± buttons for increment/decrement", x: 50, y: 50 },
        { id: 4, label: "Prefix / Suffix", description: "Currency symbol or unit label", x: 50, y: 50 },
        { id: 5, label: "Label", description: "Descriptive text above the input", x: 50, y: 50 },
      ]} renderPreview={(h) => (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            Price
          </div>
          <div style={{
            display: "flex", alignItems: "stretch", borderRadius: inputRadius,
            border: `1.5px solid ${palette.primary}`, overflow: "hidden",
            backgroundColor: palette.background, width: 200,
            opacity: h === 1 ? 1 : h === null ? 1 : (h === 2 || h === 3 || h === 4) ? 1 : 0.3,
            transition: "opacity 0.2s",
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", width: 28,
              cursor: "pointer", color: palette.textSecondary, fontSize: 16, fontWeight: 600,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>−</div>
            <div style={{
              display: "flex", alignItems: "center", paddingLeft: 4, color: palette.textSecondary, fontSize: 14,
              opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>$</div>
            <div style={{
              flex: 1, padding: `${inputPy}px 4px`, fontSize: 14, color: palette.textPrimary,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>250</div>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", width: 28,
              cursor: "pointer", color: palette.textSecondary, fontSize: 16, fontWeight: 600,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>+</div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Height", value: "40px (default)" },
        { label: "Padding X", value: comp.input.paddingX },
        { label: "Padding Y", value: comp.input.paddingY },
        { label: "Border Radius", value: comp.input.borderRadius },
        { label: "Stepper Button Width", value: "32px" },
        { label: "Font Size", value: "14px" },
        { label: "Border Width", value: "1.5px" },
      ]} />
    </motion.section>
  );
}
