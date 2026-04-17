import { create } from "zustand";
import type {
  OnboardingState,
  ProjectType,
  Industry,
  VisualTone,
  TypographyStyle,
  InterfaceDensity,
  LanguageSupport,
  InspirationStyle,
} from "@/types";

interface OnboardingStore extends OnboardingState {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setProjectType: (type: ProjectType) => void;
  setIndustry: (industry: Industry) => void;
  setVisualTone: (tone: VisualTone) => void;
  setLogoFile: (file: File | null, previewUrl: string | null) => void;
  setExtractedColors: (colors: string[]) => void;
  setSelectedPalette: (paletteId: string) => void;
  setTypographyStyle: (style: TypographyStyle) => void;
  setDensity: (density: InterfaceDensity) => void;
  setLanguageSupport: (lang: LanguageSupport) => void;
  setRtlSupport: (rtl: boolean) => void;
  setRegionalDateFormat: (enabled: boolean) => void;
  setRegionalNumberFormat: (enabled: boolean) => void;
  setInspirationStyle: (style: InspirationStyle) => void;
  reset: () => void;
}

const TOTAL_STEPS = 8;

const initialState: OnboardingState = {
  currentStep: 1,
  projectType: null,
  industry: null,
  visualTone: null,
  logoFile: null,
  logoPreviewUrl: null,
  extractedColors: [],
  selectedPalette: null,
  typographyStyle: null,
  density: null,
  languageSupport: null,
  rtlSupport: false,
  regionalDateFormat: false,
  regionalNumberFormat: false,
  inspirationStyle: null,
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: Math.max(1, Math.min(step, TOTAL_STEPS)) }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  setProjectType: (projectType) => set({ projectType }),
  setIndustry: (industry) => set({ industry }),
  setVisualTone: (visualTone) => set({ visualTone }),
  setLogoFile: (logoFile, logoPreviewUrl) => set({ logoFile, logoPreviewUrl }),
  setExtractedColors: (extractedColors) => set({ extractedColors }),
  setSelectedPalette: (selectedPalette) => set({ selectedPalette }),
  setTypographyStyle: (typographyStyle) => set({ typographyStyle }),
  setDensity: (density) => set({ density }),
  setLanguageSupport: (languageSupport) =>
    set((state) => ({
      languageSupport,
      rtlSupport:
        languageSupport === "ar-only" ||
        languageSupport === "en-ar" ||
        languageSupport === "en-ar-plus"
          ? true
          : state.rtlSupport,
    })),
  setRtlSupport: (rtlSupport) => set({ rtlSupport }),
  setRegionalDateFormat: (regionalDateFormat) => set({ regionalDateFormat }),
  setRegionalNumberFormat: (regionalNumberFormat) => set({ regionalNumberFormat }),
  setInspirationStyle: (inspirationStyle) => set({ inspirationStyle }),
  reset: () => set(initialState),
}));
