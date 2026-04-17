"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding";
import { StepProjectType } from "./step-project-type";
import { StepIndustry } from "./step-industry";
import { StepVisualTone } from "./step-visual-tone";
import { StepLogoPalette } from "./step-logo-palette";
import { StepTypography } from "./step-typography";
import { StepDensity } from "./step-density";
import { StepLanguage } from "./step-language";
import { StepInspiration } from "./step-inspiration";

const TOTAL_STEPS = 8;

export function OnboardingWizard() {
  const router = useRouter();
  const store = useOnboardingStore();
  const { currentStep, nextStep, prevStep } = store;

  const canGoNext = (() => {
    switch (currentStep) {
      case 1: return !!store.projectType;
      case 2: return !!store.industry;
      case 3: return !!store.visualTone;
      case 4: return !!(store.selectedPalette || store.extractedColors.length > 0);
      case 5: return !!store.typographyStyle;
      case 6: return !!store.density;
      case 7: return !!store.languageSupport;
      case 8: return true;
      default: return false;
    }
  })();

  const handleNext = () => {
    if (currentStep === TOTAL_STEPS) {
      router.push("/workspace");
      return;
    }
    nextStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepProjectType />;
      case 2: return <StepIndustry />;
      case 3: return <StepVisualTone />;
      case 4: return <StepLogoPalette />;
      case 5: return <StepTypography />;
      case 6: return <StepDensity />;
      case 7: return <StepLanguage />;
      case 8: return <StepInspiration />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8">
      {/* Shell container */}
      <div
        className="w-full max-w-[1200px] rounded-2xl overflow-hidden"
        style={{
          background: "#0e0e11",
          border: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Topbar */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "16px 32px",
            borderBottom: "0.5px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="text-[15px] font-medium text-white" style={{ letterSpacing: "-0.3px" }}>
            Palette
          </span>
          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="transition-all duration-300"
                style={{
                  height: 6,
                  borderRadius: i + 1 === currentStep ? 3 : "50%",
                  width: i + 1 === currentStep ? 18 : 6,
                  background:
                    i + 1 === currentStep
                      ? "#a78bfa"
                      : i + 1 < currentStep
                        ? "rgba(167,139,250,0.4)"
                        : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
            <span className="text-[12px] ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              Step {currentStep} of {TOTAL_STEPS}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "48px 56px 40px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div
            className="flex items-center justify-between"
            style={{
              paddingTop: 24,
              marginTop: 16,
              borderTop: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={prevStep}
                disabled={currentStep <= 1}
                className="transition-all duration-200"
                style={{
                  background: "transparent",
                  border: currentStep > 1 ? "0.5px solid rgba(255,255,255,0.12)" : "0.5px solid transparent",
                  color: currentStep > 1 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.15)",
                  fontSize: 13,
                  padding: "10px 20px",
                  borderRadius: 8,
                  cursor: currentStep > 1 ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                }}
              >
                Back
              </button>
            </div>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="flex items-center gap-1.5 transition-all duration-200"
              style={{
                background: canGoNext ? "#a78bfa" : "rgba(255,255,255,0.06)",
                border: "none",
                color: canGoNext ? "#1a0a3d" : "rgba(255,255,255,0.2)",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 24px",
                borderRadius: 8,
                cursor: canGoNext ? "pointer" : "not-allowed",
                fontFamily: "inherit",
              }}
            >
              {currentStep === TOTAL_STEPS ? "Generate Design System" : "Continue"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
