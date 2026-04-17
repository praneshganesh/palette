import type {
  OnboardingState,
  DesignSystem,
  PaletteTokenSet,
  InterfaceDensity,
} from "@/types";
import { curatedPalettes } from "@/lib/palettes";
import { generateDesignSystem as generateFallback } from "./tokens";

interface AIGenerationResult {
  palette: PaletteTokenSet;
  darkPalette: PaletteTokenSet;
  typography: {
    headingFont: string;
    bodyFont: string;
    arabicHeadingFont: string;
    arabicBodyFont: string;
  };
  components: DesignSystem["components"];
  explanation: string;
  recommendedComponents: string[];
  recommendedFieldTypes: string[];
}

function resolveTypographyScale(density: InterfaceDensity) {
  const scaleMap: Record<InterfaceDensity, DesignSystem["typography"]["scale"]> = {
    comfortable: {
      h1: "2.5rem", h2: "2rem", h3: "1.75rem", h4: "1.5rem",
      h5: "1.25rem", h6: "1.125rem", body: "1rem", small: "0.875rem", caption: "0.75rem",
    },
    balanced: {
      h1: "2.25rem", h2: "1.875rem", h3: "1.5rem", h4: "1.25rem",
      h5: "1.125rem", h6: "1rem", body: "0.9375rem", small: "0.8125rem", caption: "0.6875rem",
    },
    dense: {
      h1: "2rem", h2: "1.75rem", h3: "1.375rem", h4: "1.125rem",
      h5: "1rem", h6: "0.9375rem", body: "0.875rem", small: "0.75rem", caption: "0.625rem",
    },
  };
  return scaleMap[density];
}

function resolveSpacing(density: InterfaceDensity, tone: string): DesignSystem["spacing"] {
  const densityScales: Record<InterfaceDensity, number[]> = {
    comfortable: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
    balanced: [0, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96],
    dense: [0, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64],
  };

  const radiusPresets: Record<string, DesignSystem["spacing"]["radius"]> = {
    professional: { none: "0", sm: "4px", md: "6px", lg: "8px", xl: "12px", full: "9999px" },
    premium: { none: "0", sm: "6px", md: "8px", lg: "12px", xl: "16px", full: "9999px" },
    modern: { none: "0", sm: "6px", md: "10px", lg: "14px", xl: "20px", full: "9999px" },
    friendly: { none: "0", sm: "8px", md: "12px", lg: "16px", xl: "24px", full: "9999px" },
    minimal: { none: "0", sm: "2px", md: "4px", lg: "6px", xl: "8px", full: "9999px" },
    bold: { none: "0", sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px" },
    institutional: { none: "0", sm: "2px", md: "4px", lg: "6px", xl: "8px", full: "9999px" },
    youthful: { none: "0", sm: "8px", md: "14px", lg: "20px", xl: "28px", full: "9999px" },
  };

  return {
    scale: densityScales[density],
    radius: radiusPresets[tone] || radiusPresets.modern,
    elevation: {
      none: "none",
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
  };
}

export async function generateWithAI(
  state: OnboardingState
): Promise<DesignSystem & { recommendedComponents: string[]; recommendedFieldTypes: string[] }> {
  const tone = state.visualTone || "modern";
  const density = state.density || "balanced";
  const lang = state.languageSupport || "en-only";

  let primaryColor: string | undefined;
  if (state.selectedPalette) {
    const palette = curatedPalettes.find((p) => p.id === state.selectedPalette);
    if (palette) primaryColor = palette.preview.primary;
  } else if (state.extractedColors.length > 0) {
    primaryColor = state.extractedColors[0];
  }

  const requestBody = {
    projectType: state.projectType || "other",
    industry: state.industry || "other",
    visualTone: tone,
    density,
    languageSupport: lang,
    primaryColor,
    inspirationStyle: state.inspirationStyle || undefined,
  };

  console.log("[Palette AI] Request:", JSON.stringify(requestBody, null, 2));

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Palette AI] HTTP Error:", response.status, errorText);
    throw new Error(`AI generation failed: ${response.status}`);
  }

  const json = await response.json();
  if (!json.success) {
    console.error("[Palette AI] API Error:", json.error);
    throw new Error(json.error || "AI generation returned an error");
  }

  const aiResult: AIGenerationResult = json.data;
  console.log("[Palette AI] Response:", JSON.stringify(aiResult, null, 2));

  const spacing = resolveSpacing(density, tone);

  const designSystem: DesignSystem = {
    id: crypto.randomUUID(),
    name: `${state.industry || "custom"}-${tone}-system`,
    createdAt: new Date().toISOString(),
    palette: aiResult.palette,
    darkPalette: aiResult.darkPalette,
    typography: {
      ...aiResult.typography,
      scale: resolveTypographyScale(density),
      lineHeight: {
        tight: density === "dense" ? "1.2" : "1.25",
        normal: density === "dense" ? "1.4" : "1.5",
        relaxed: density === "dense" ? "1.6" : "1.75",
      },
      fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    },
    spacing,
    components: aiResult.components,
    localization: {
      languages: lang,
      rtl: state.rtlSupport,
      regionalDate: state.regionalDateFormat,
      regionalNumber: state.regionalNumberFormat,
    },
    meta: {
      projectType: state.projectType || "other",
      industry: state.industry || "other",
      visualTone: tone,
      density,
      explanation: aiResult.explanation,
    },
  };

  return {
    ...designSystem,
    recommendedComponents: aiResult.recommendedComponents,
    recommendedFieldTypes: aiResult.recommendedFieldTypes,
  };
}

export async function generateDesignSystemSmart(
  state: OnboardingState,
  onProgress?: (status: string) => void
): Promise<DesignSystem & { recommendedComponents?: string[]; recommendedFieldTypes?: string[] }> {
  try {
    onProgress?.("Connecting to AI...");
    const result = await generateWithAI(state);
    onProgress?.("Design system generated with AI");
    return result;
  } catch (error) {
    console.warn("[Palette] AI generation failed, using fallback:", error);
    onProgress?.("Using local generation...");
    const fallback = generateFallback(state);
    return { ...fallback, recommendedComponents: undefined, recommendedFieldTypes: undefined };
  }
}
