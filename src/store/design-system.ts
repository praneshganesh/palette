import { create } from "zustand";
import type { DesignSystem } from "@/types";

interface DesignSystemStore {
  system: DesignSystem | null;
  isGenerating: boolean;
  previewMode: "light" | "dark";
  previewLang: "en" | "ar";
  aiRecommendedComponents: string[] | null;
  aiRecommendedFieldTypes: string[] | null;
  generatedWithAI: boolean;
  setSystem: (system: DesignSystem) => void;
  setIsGenerating: (val: boolean) => void;
  setPreviewMode: (mode: "light" | "dark") => void;
  setPreviewLang: (lang: "en" | "ar") => void;
  setAIRecommendations: (components: string[] | null, fieldTypes: string[] | null) => void;
  reset: () => void;
}

export const useDesignSystemStore = create<DesignSystemStore>((set) => ({
  system: null,
  isGenerating: false,
  previewMode: "light",
  previewLang: "en",
  aiRecommendedComponents: null,
  aiRecommendedFieldTypes: null,
  generatedWithAI: false,

  setSystem: (system) => set({ system }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setPreviewMode: (previewMode) => set({ previewMode }),
  setPreviewLang: (previewLang) => set({ previewLang }),
  setAIRecommendations: (components, fieldTypes) =>
    set({ aiRecommendedComponents: components, aiRecommendedFieldTypes: fieldTypes, generatedWithAI: !!components }),
  reset: () => set({ system: null, isGenerating: false, aiRecommendedComponents: null, aiRecommendedFieldTypes: null, generatedWithAI: false }),
}));
