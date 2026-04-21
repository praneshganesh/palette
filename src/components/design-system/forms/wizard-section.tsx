"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface WizardSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const STEPS = [
  { title: "Account", desc: "Create your account" },
  { title: "Profile", desc: "Set up your profile" },
  { title: "Preferences", desc: "Choose your settings" },
  { title: "Confirm", desc: "Review & submit" },
];

export function WizardSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: WizardSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"horizontal" | "vertical" | "progress" | "numbered" | "validated">("horizontal");
  const [activeStep, setActiveStep] = useState(1);
  const [validSteps, setValidSteps] = useState<Set<number>>(new Set([0]));

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

  const goTo = (step: number) => {
    if (step >= 0 && step < STEPS.length) {
      if (variant === "validated") {
        setValidSteps((prev) => new Set([...prev, activeStep]));
      }
      setActiveStep(step);
    }
  };

  const stepIndicator = (idx: number, active: boolean, completed: boolean) => ({
    width: 32, height: 32, borderRadius: "50%", display: "flex" as const,
    alignItems: "center" as const, justifyContent: "center" as const,
    fontSize: 13, fontWeight: 700 as const,
    backgroundColor: active ? palette.primary : completed ? palette.primary + "20" : palette.surfaceMuted,
    color: active ? "#fff" : completed ? palette.primary : palette.textSecondary,
    border: `2px solid ${active ? palette.primary : completed ? palette.primary : palette.border}`,
    transition: "all 0.2s", cursor: "pointer" as const,
  });

  const navButtons = () => (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
      <button onClick={() => goTo(activeStep - 1)} disabled={activeStep === 0}
        style={{
          padding: "8px 20px", fontSize: 13, fontWeight: 600, borderRadius: radius,
          border: `1px solid ${palette.border}`, backgroundColor: palette.surface,
          color: activeStep === 0 ? palette.textSecondary + "60" : palette.textPrimary,
          cursor: activeStep === 0 ? "not-allowed" : "pointer",
        }}>Back</button>
      <button onClick={() => goTo(activeStep + 1)} disabled={activeStep === STEPS.length - 1}
        style={{
          padding: "8px 20px", fontSize: 13, fontWeight: 600, borderRadius: radius,
          border: "none", backgroundColor: palette.primary,
          color: "#fff", cursor: activeStep === STEPS.length - 1 ? "not-allowed" : "pointer",
          opacity: activeStep === STEPS.length - 1 ? 0.5 : 1,
        }}>{activeStep === STEPS.length - 1 ? "Submit" : "Next"}</button>
    </div>
  );

  const stepContent = () => (
    <div style={{ padding: "20px 0" }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: palette.textPrimary, marginBottom: 8 }}>{STEPS[activeStep].title}</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 16 }}>{STEPS[activeStep].desc}</div>
      <div style={{ height: 36, backgroundColor: palette.surfaceMuted, borderRadius: radius, border: `1px solid ${palette.border}` }} />
      <div style={{ height: 36, backgroundColor: palette.surfaceMuted, borderRadius: radius, border: `1px solid ${palette.border}`, marginTop: 12 }} />
    </div>
  );

  const renderWizard = () => {
    switch (variant) {
      case "vertical":
        return (
          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {STEPS.map((s, i) => {
                const active = i === activeStep;
                const completed = i < activeStep;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={stepIndicator(i, active, completed)} onClick={() => goTo(i)}>
                        {completed ? "✓" : i + 1}
                      </div>
                      {i < STEPS.length - 1 && <div style={{ width: 2, height: 40, backgroundColor: completed ? palette.primary : palette.border }} />}
                    </div>
                    <div style={{ paddingTop: 4 }}>
                      <div style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? palette.textPrimary : palette.textSecondary }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: palette.textSecondary }}>{s.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ flex: 1 }}>{stepContent()}{navButtons()}</div>
          </div>
        );
      case "progress":
        return (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>Step {activeStep + 1} of {STEPS.length}</span>
              <span style={{ fontSize: 12, color: palette.textSecondary }}>{Math.round(((activeStep + 1) / STEPS.length) * 100)}%</span>
            </div>
            <div style={{ height: 6, backgroundColor: palette.border + "40", borderRadius: 3, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ height: "100%", width: `${((activeStep + 1) / STEPS.length) * 100}%`, backgroundColor: palette.primary, borderRadius: 3, transition: "width 0.3s" }} />
            </div>
            {stepContent()}{navButtons()}
          </div>
        );
      case "numbered":
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 24 }}>
              {STEPS.map((s, i) => {
                const active = i === activeStep;
                const completed = i < activeStep;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{
                        ...stepIndicator(i, active, completed), width: 36, height: 36, fontSize: 14,
                      }} onClick={() => goTo(i)}>
                        {i + 1}
                      </div>
                      <div style={{ fontSize: 10, color: active ? palette.primary : palette.textSecondary, marginTop: 4, fontWeight: active ? 600 : 400 }}>{s.title}</div>
                    </div>
                    {i < STEPS.length - 1 && <div style={{ width: 48, height: 2, backgroundColor: completed ? palette.primary : palette.border, margin: "0 4px", marginBottom: 18 }} />}
                  </div>
                );
              })}
            </div>
            {stepContent()}{navButtons()}
          </div>
        );
      case "validated":
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 24 }}>
              {STEPS.map((s, i) => {
                const active = i === activeStep;
                const completed = validSteps.has(i) && i !== activeStep;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={stepIndicator(i, active, completed)} onClick={() => goTo(i)}>
                        {completed ? (
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : i + 1}
                      </div>
                      <div style={{ fontSize: 10, color: active ? palette.primary : palette.textSecondary, marginTop: 4 }}>{s.title}</div>
                    </div>
                    {i < STEPS.length - 1 && <div style={{ width: 48, height: 2, backgroundColor: validSteps.has(i) ? palette.success : palette.border, margin: "0 4px", marginBottom: 18 }} />}
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "12px 16px", backgroundColor: activeStep === 0 ? palette.info + "15" : "transparent", borderRadius: system.spacing.radius.sm, marginBottom: 12, fontSize: 12, color: palette.info }}>
              {activeStep === 0 && "Fill in your account details to proceed."}
            </div>
            {stepContent()}{navButtons()}
          </div>
        );
      default:
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 24 }}>
              {STEPS.map((s, i) => {
                const active = i === activeStep;
                const completed = i < activeStep;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={stepIndicator(i, active, completed)} onClick={() => goTo(i)}>
                        {completed ? "✓" : i + 1}
                      </div>
                      <div style={{ fontSize: 10, color: active ? palette.primary : palette.textSecondary, marginTop: 4, fontWeight: active ? 600 : 400 }}>{s.title}</div>
                    </div>
                    {i < STEPS.length - 1 && <div style={{ width: 48, height: 2, backgroundColor: completed ? palette.primary : palette.border, margin: "0 4px", marginBottom: 18 }} />}
                  </div>
                );
              })}
            </div>
            {stepContent()}{navButtons()}
          </div>
        );
    }
  };

  return (
    <motion.section id="comp-wizard" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Wizard / Stepper</p>
      <p style={sectionDesc}>
        Wizards break complex forms into sequential steps, reducing cognitive load and guiding users through multi-stage processes.
      </p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 300 }}>
          {renderWizard()}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Step Circle", "32px")}
          {tokenRow("Active Color", "palette.primary")}
          {tokenRow("Completed", "palette.primary @ 20%")}
          {tokenRow("Connector", "2px line")}
          {tokenRow("Button Radius", radius)}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {variantBtn("horizontal", "Horizontal Steps")}
        {variantBtn("vertical", "Vertical Steps")}
        {variantBtn("progress", "Progress Bar")}
        {variantBtn("numbered", "Numbered")}
        {variantBtn("validated", "With Validation")}
      </div>
      <div style={showcaseBox}>{renderWizard()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Recommended use cases:" items={["Use for multi-step processes (3-7 steps)", "Show progress clearly", "Allow navigation to completed steps", "Validate before advancing"]} />
        <UsageSection palette={palette} title="When not to use" description="Avoid using when:" items={["Don't use for single-page forms", "Don't hide the total step count", "Don't force linear-only navigation when steps are independent"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Guidelines</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Step Count: 3-7 steps is optimal. More than 7 should be re-organized into fewer, broader steps." },
        { type: "dont", text: "Validation: Validate each step before allowing progression. Show validation state on step indicators." },
        { type: "do", text: "Navigation: Allow backward navigation freely. Forward navigation may require validation." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Step Indicator", description: "Numbered circle showing state", x: 25, y: 15 },
        { id: 2, label: "Connector", description: "Line between steps", x: 50, y: 15 },
        { id: 3, label: "Step Label", description: "Text below indicator", x: 25, y: 30 },
        { id: 4, label: "Content Area", description: "Current step form fields", x: 50, y: 60 },
        { id: 5, label: "Navigation", description: "Back/Next buttons", x: 50, y: 90 },
      ]} renderPreview={(hl) => (
        <div style={{ width: 200 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 12 }}>
            {[1, 2, 3].map((n, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, backgroundColor: n === 1 ? palette.primary : palette.surfaceMuted,
                  color: n === 1 ? "#fff" : palette.textSecondary, border: `1px solid ${n === 1 ? palette.primary : palette.border}`,
                  opacity: hl && hl !== 1 ? 0.3 : 1,
                }}>{n}</div>
                {i < 2 && <div style={{ width: 24, height: 2, backgroundColor: palette.border, opacity: hl && hl !== 2 ? 0.3 : 1 }} />}
              </div>
            ))}
          </div>
          {hl === 3 && <div style={{ textAlign: "center", fontSize: 8, color: palette.textSecondary, marginBottom: 8 }}>Account</div>}
          <div style={{ height: 40, backgroundColor: palette.surfaceMuted, borderRadius: 4, marginBottom: 8, opacity: hl && hl !== 4 ? 0.3 : 1 }} />
          <div style={{ display: "flex", justifyContent: "space-between", opacity: hl && hl !== 5 ? 0.3 : 1 }}>
            <div style={{ width: 40, height: 20, borderRadius: 3, border: `1px solid ${palette.border}` }} />
            <div style={{ width: 40, height: 20, borderRadius: 3, backgroundColor: palette.primary }} />
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Step Indicator Size", value: "32–36px" },
        { label: "Connector Width", value: "48px × 2px" },
        { label: "Step Label Font", value: "10px" },
        { label: "Button Padding", value: "8px 20px" },
        { label: "Content Padding", value: "20px 0" },
        { label: "Progress Bar Height", value: "6px" },
      ]} />
    </motion.section>
  );
}
