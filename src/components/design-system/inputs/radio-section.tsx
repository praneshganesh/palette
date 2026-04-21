"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface RadioSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

function Radio({ selected, onSelect, disabled, color, size = 18 }: {
  selected: boolean; onSelect: () => void; disabled?: boolean; color: string; size?: number;
}) {
  return (
    <button
      onClick={() => !disabled && onSelect()}
      style={{
        width: size, height: size, borderRadius: "50%",
        border: `2px solid ${selected ? color : "#bbb"}`,
        backgroundColor: "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer", padding: 0,
        transition: "all 0.15s", opacity: disabled ? 0.4 : 1, outline: "none",
        flexShrink: 0,
      }}
    >
      {selected && (
        <div style={{
          width: size * 0.5, height: size * 0.5, borderRadius: "50%",
          backgroundColor: color, transition: "transform 0.15s",
        }} />
      )}
    </button>
  );
}

export function RadioSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: RadioSectionProps) {
  const comp = system.components;
  const [heroVal, setHeroVal] = useState("standard");
  const [horzVal, setHorzVal] = useState("sm");
  const [cardVal, setCardVal] = useState("pro");
  const [segVal, setSegVal] = useState("monthly");
  const radius = comp.input.borderRadius || system.spacing.radius.md;

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
    <motion.section id="comp-radio" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Radio</p>
      <p style={sectionDesc}>
        Radio buttons let users select exactly one option from a set. They are ideal for
        mutually exclusive choices where all options should be visible at once.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { value: "standard", label: "Standard", desc: "Free delivery in 5–7 days" },
              { value: "express", label: "Express", desc: "Delivery in 1–2 days" },
              { value: "overnight", label: "Overnight", desc: "Next-day delivery" },
            ].map((opt) => (
              <div key={opt.value} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }} onClick={() => setHeroVal(opt.value)}>
                <Radio selected={heroVal === opt.value} onSelect={() => setHeroVal(opt.value)} color={palette.primary} size={20} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: palette.textPrimary }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 1 }}>{opt.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Circle Size", "18px (md)")}
          {tokenRow("Dot Size", "50% of circle")}
          {tokenRow("Selected Color", "palette.primary")}
          {tokenRow("Border", "2px solid")}
          {tokenRow("Label Gap", "10px")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Default (Vertical)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Option A", "Option B", "Option C"].map((o, i) => (
              <div key={o} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Radio selected={i === 0} onSelect={() => {}} color={palette.primary} /><span style={{ fontSize: 13, color: palette.textPrimary }}>{o}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Horizontal Group</div>
          <div style={{ display: "flex", gap: 20 }}>
            {["S", "M", "L"].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Radio selected={horzVal === s.toLowerCase()} onSelect={() => setHorzVal(s.toLowerCase())} color={palette.primary} /><span style={{ fontSize: 13, color: palette.textPrimary }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Card-style Radio</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { value: "basic", label: "Basic", price: "$9/mo" },
              { value: "pro", label: "Pro", price: "$29/mo" },
              { value: "enterprise", label: "Enterprise", price: "$99/mo" },
            ].map((p) => (
              <div
                key={p.value}
                onClick={() => setCardVal(p.value)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: radius, cursor: "pointer", transition: "all 0.15s",
                  border: `1.5px solid ${cardVal === p.value ? palette.primary : palette.border}`,
                  backgroundColor: cardVal === p.value ? palette.primary + "08" : "transparent",
                }}
              >
                <Radio selected={cardVal === p.value} onSelect={() => setCardVal(p.value)} color={palette.primary} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>{p.label}</span>
                <span style={{ fontSize: 12, color: palette.textSecondary }}>{p.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Segmented</div>
          <div style={{
            display: "inline-flex", borderRadius: radius, overflow: "hidden",
            border: `1px solid ${palette.border}`,
          }}>
            {["Monthly", "Yearly"].map((s) => {
              const sel = segVal === s.toLowerCase();
              return (
                <button
                  key={s}
                  onClick={() => setSegVal(s.toLowerCase())}
                  style={{
                    padding: "8px 20px", fontSize: 13, fontWeight: sel ? 600 : 400,
                    backgroundColor: sel ? palette.primary : "transparent",
                    color: sel ? "#fff" : palette.textPrimary,
                    border: "none", cursor: "pointer", transition: "all 0.15s",
                    outline: "none",
                  }}
                >{s}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { label: "Unselected", selected: false, disabled: false, error: false },
          { label: "Selected", selected: true, disabled: false, error: false },
          { label: "Disabled", selected: true, disabled: true, error: false },
          { label: "Error", selected: false, disabled: false, error: true },
        ].map((s) => (
          <div key={s.label} style={{ ...showcaseBox, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>{s.label}</div>
            <div style={{ display: "inline-flex", position: "relative" }}>
              {s.error && <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `2px solid ${palette.danger}40`, pointerEvents: "none" }} />}
              <Radio selected={s.selected} onSelect={() => {}} disabled={s.disabled} color={s.error ? palette.danger : palette.primary} />
            </div>
          </div>
        ))}
      </div>

      {/* Sizes */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ ...showcaseBox, display: "flex", gap: 32, alignItems: "center" }}>
        {[{ s: 14, l: "Small" }, { s: 18, l: "Medium" }, { s: 24, l: "Large" }].map(({ s, l }) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Radio selected={true} onSelect={() => {}} color={palette.primary} size={s} />
            <span style={{ fontSize: 12, color: palette.textSecondary }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use radios" description="Radios work best for exclusive single-choice selections:" items={[
          "Choosing a plan or pricing tier",
          "Selecting a shipping method",
          "Picking a payment option",
          "Any mutually exclusive choice (2–5 options)",
        ]} />
        <UsageSection palette={palette} title="Radio vs. Select" description="Choose the right pattern based on option count:" items={[
          "Radio — 2–5 visible options, no hidden state",
          "Select — 6+ options, dropdown saves space",
          "Radio — when users need to compare options",
          "Select — when the exact option doesn't matter much",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        {
          type: "do", text: "Always pre-select a default option so the form is never in an empty state.",
          visual: (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Radio selected={true} onSelect={() => {}} color={palette.primary} size={14} /><span style={{ fontSize: 11 }}>Standard</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Radio selected={false} onSelect={() => {}} color={palette.primary} size={14} /><span style={{ fontSize: 11 }}>Express</span></div>
            </div>
          ),
        },
        {
          type: "dont", text: "Don't use a single radio button alone. Use a checkbox or toggle instead.",
          visual: (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Radio selected={false} onSelect={() => {}} color={palette.danger} size={14} /><span style={{ fontSize: 11 }}>I agree</span>
            </div>
          ),
        },
        { type: "do", text: "Use the card-style variant when options need more context or visual weight." },
        { type: "dont", text: "Don't use radios for more than 6 options — switch to a select dropdown." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Circle", description: "Outer ring border", x: 15, y: 40 },
        { id: 2, label: "Dot", description: "Inner filled circle when selected", x: 15, y: 70 },
        { id: 3, label: "Label", description: "Primary text for the option", x: 55, y: 35 },
        { id: 4, label: "Description", description: "Optional helper text below label", x: 55, y: 65 },
      ]} renderPreview={(h) => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%", border: `2px solid ${palette.primary}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2,
            opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%", backgroundColor: palette.primary,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              Express shipping
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              Delivery in 1–2 business days
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Circle Size (sm)", value: "14px" },
        { label: "Circle Size (md)", value: "18px" },
        { label: "Circle Size (lg)", value: "24px" },
        { label: "Dot Size", value: "50% of circle" },
        { label: "Border Width", value: "2px" },
        { label: "Label Gap", value: "10px" },
        { label: "Group Spacing", value: "12px" },
        { label: "Card Padding", value: "12px 16px" },
      ]} />
    </motion.section>
  );
}
