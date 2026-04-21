"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface MobileStepperSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const steps = ["Account", "Profile", "Preferences", "Review"];

export function MobileStepperSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: MobileStepperSectionProps) {
  const comp = system.components;
  const [currentStep, setCurrentStep] = useState(1);
  const [stepperStyle, setStepperStyle] = useState<"dots" | "progress" | "text">("dots");
  const total = steps.length;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24, display: "flex", justifyContent: "center",
  };

  const phoneFrame: React.CSSProperties = {
    width: 300, height: 420, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
  };

  const navBtn = (label: string, disabled: boolean, onClick: () => void): React.CSSProperties => ({
    padding: "10px 20px", fontSize: 13, fontWeight: 600,
    borderRadius: system.spacing.radius.md, cursor: disabled ? "default" : "pointer",
    border: "none", opacity: disabled ? 0.4 : 1,
    backgroundColor: label === "Next" || label === "Finish" ? palette.primary : "transparent",
    color: label === "Next" || label === "Finish" ? "#fff" : palette.textSecondary,
  });

  const renderDots = () => (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {steps.map((_, i) => (
        <div key={i} style={{ width: i === currentStep ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i === currentStep ? palette.primary : i < currentStep ? palette.primary + "60" : palette.border, transition: "all 0.3s" }} />
      ))}
    </div>
  );

  const renderProgress = () => (
    <div style={{ padding: "0 16px", width: "100%" }}>
      <div style={{ height: 4, backgroundColor: palette.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((currentStep + 1) / total) * 100}%`, backgroundColor: palette.primary, borderRadius: 2, transition: "width 0.3s" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        {steps.map((s, i) => (
          <span key={s} style={{ fontSize: 10, fontWeight: i <= currentStep ? 600 : 400, color: i <= currentStep ? palette.primary : palette.textSecondary }}>{s}</span>
        ))}
      </div>
    </div>
  );

  const renderTextIndicator = () => (
    <div style={{ textAlign: "center" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Step {currentStep + 1}</span>
      <span style={{ fontSize: 13, color: palette.textSecondary }}> of {total}</span>
    </div>
  );

  return (
    <motion.section id="comp-mobile-stepper" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Mobile Stepper</p>
      <p style={sectionDesc}>
        Mobile steppers show progress through a multi-step flow using dots, a progress bar, or text indicator — paired with back/next navigation buttons.
      </p>

      <div style={subsectionLabel}>Stepper Styles</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["dots", "progress", "text"] as const).map(s => (
          <button key={s} onClick={() => setStepperStyle(s)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${stepperStyle === s ? palette.primary : palette.border}`, backgroundColor: stepperStyle === s ? palette.primary + "15" : palette.surface, color: stepperStyle === s ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>{s} Indicator</button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: "16px", borderBottom: `1px solid ${palette.border}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 40 }}>
              {stepperStyle === "dots" && renderDots()}
              {stepperStyle === "progress" && renderProgress()}
              {stepperStyle === "text" && renderTextIndicator()}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: palette.primary + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>
              {["👤", "📝", "⚙️", "✓"][currentStep]}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 6 }}>{steps[currentStep]}</div>
            <div style={{ fontSize: 13, color: palette.textSecondary, textAlign: "center" }}>Complete this step to continue</div>
          </div>
          <div style={{ padding: "12px 16px 24px", borderTop: `1px solid ${palette.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} style={navBtn("Back", currentStep === 0, () => {})}>Back</button>
            <button onClick={() => setCurrentStep(Math.min(total - 1, currentStep + 1))} style={navBtn(currentStep === total - 1 ? "Finish" : "Next", false, () => {})}>{currentStep === total - 1 ? "Finish" : "Next"}</button>
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>All Styles Comparison</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {(["dots", "progress", "text"] as const).map(s => (
          <div key={s}>
            <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, textAlign: "center" }}>{s}</div>
            <div style={{ ...previewBox, padding: 16, flexDirection: "column", alignItems: "center", gap: 12 }}>
              {s === "dots" && (
                <div style={{ display: "flex", gap: 6 }}>
                  {steps.map((_, i) => <div key={i} style={{ width: i === 1 ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: i <= 1 ? palette.primary : palette.border, transition: "all 0.2s" }} />)}
                </div>
              )}
              {s === "progress" && (
                <div style={{ width: "100%" }}>
                  <div style={{ height: 4, backgroundColor: palette.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: "50%", backgroundColor: palette.primary, borderRadius: 2 }} />
                  </div>
                </div>
              )}
              {s === "text" && (
                <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>Step 2 <span style={{ color: palette.textSecondary, fontWeight: 400 }}>of 4</span></span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use steppers" description="Multi-step flows on mobile:" items={[
          "Onboarding or registration wizards (3–6 steps)",
          "Checkout flows — shipping, payment, confirmation",
          "Setup wizards — configure preferences step by step",
        ]} />
        <UsageSection palette={palette} title="Indicator selection" description="Pick the right style:" items={[
          "Dots — few steps (3–5), clean minimal look",
          "Progress bar — more steps, shows percentage completion",
          "Text — when step names or numbers matter most",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Let users go back to previous steps — never trap them in a forward-only flow." },
        { type: "dont", text: "Don't use more than 6 dots — switch to a progress bar for longer flows." },
        { type: "do", text: "Animate the active dot expanding to give a sense of direction." },
        { type: "dont", text: "Don't skip step validation — validate before allowing navigation to the next step." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Step indicator", description: "Dots, bar, or text showing progress", x: 50, y: 15 },
        { id: 2, label: "Step content", description: "Form or info for the current step", x: 50, y: 50 },
        { id: 3, label: "Back button", description: "Navigate to previous step", x: 15, y: 90 },
        { id: 4, label: "Next button", description: "Navigate to next step or finish", x: 85, y: 90 },
      ]} renderPreview={(h) => (
        <div style={{ width: 180, height: 90, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "6px 0", borderBottom: `1px solid ${palette.border}`, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: i === 1 ? 14 : 5, height: 5, borderRadius: 3, backgroundColor: i <= 1 ? palette.primary : palette.border }} />)}
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: palette.primary + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>📝</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px", borderTop: `1px solid ${palette.border}` }}>
            <span style={{ fontSize: 8, color: palette.textSecondary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3 }}>Back</span>
            <span style={{ fontSize: 8, fontWeight: 700, color: palette.primary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3 }}>Next</span>
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Dot Size (inactive)", value: "8px" },
        { label: "Dot Size (active width)", value: "20–24px" },
        { label: "Progress Bar Height", value: "4px" },
        { label: "Nav Button Height", value: "44–48px" },
        { label: "Step Content Padding", value: "16–24px" },
      ]} />
    </motion.section>
  );
}
