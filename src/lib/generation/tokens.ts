import type {
  PaletteTokenSet,
  TypographySet,
  SpacingSystem,
  ComponentTheme,
  DesignSystem,
  OnboardingState,
  VisualTone,
  InterfaceDensity,
  TypographyStyle,
} from "@/types";
import { curatedPalettes } from "@/lib/palettes";
import { typographyPacks } from "@/lib/typography-packs";
import { adjustLightness, hexToHsl, hslToHex } from "@/lib/color-utils";

function derivePalette(
  primaryColor: string,
  tone: VisualTone
): PaletteTokenSet {
  const { h, s } = hexToHsl(primaryColor);

  const toneModifiers: Record<VisualTone, { satMod: number; lightMod: number }> = {
    professional: { satMod: -0.05, lightMod: 0 },
    premium: { satMod: 0.05, lightMod: -0.05 },
    modern: { satMod: 0, lightMod: 0 },
    friendly: { satMod: 0.1, lightMod: 0.05 },
    minimal: { satMod: -0.15, lightMod: 0.05 },
    bold: { satMod: 0.15, lightMod: -0.1 },
    institutional: { satMod: -0.1, lightMod: 0 },
    youthful: { satMod: 0.1, lightMod: 0.05 },
  };

  const mod = toneModifiers[tone] || { satMod: 0, lightMod: 0 };
  const adjS = Math.max(0, Math.min(1, s + mod.satMod));

  return {
    primary: hslToHex(h, adjS, 0.45 + mod.lightMod),
    primaryHover: hslToHex(h, adjS, 0.38 + mod.lightMod),
    secondary: hslToHex((h + 30) % 360, adjS * 0.7, 0.35),
    accent: hslToHex((h + 180) % 360, adjS * 0.6, 0.55),
    background: "#FFFFFF",
    surface: hslToHex(h, 0.05, 0.975),
    surfaceMuted: hslToHex(h, 0.03, 0.95),
    border: hslToHex(h, 0.05, 0.88),
    textPrimary: hslToHex(h, 0.1, 0.1),
    textSecondary: hslToHex(h, 0.05, 0.4),
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",
  };
}

function deriveDarkPalette(lightPalette: PaletteTokenSet): PaletteTokenSet {
  return {
    primary: adjustLightness(lightPalette.primary, 0.1),
    primaryHover: adjustLightness(lightPalette.primaryHover, 0.15),
    secondary: adjustLightness(lightPalette.secondary, 0.15),
    accent: adjustLightness(lightPalette.accent, 0.05),
    background: "#0A0A0C",
    surface: "#141418",
    surfaceMuted: "#1A1A20",
    border: "#2A2A32",
    textPrimary: "#F5F5F7",
    textSecondary: "#9CA3AF",
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F87171",
    info: "#60A5FA",
  };
}

function deriveTypography(
  style: TypographyStyle,
  density: InterfaceDensity
): TypographySet {
  const pack = typographyPacks.find((p) => p.id === style) || typographyPacks[0];

  const scaleMap: Record<InterfaceDensity, TypographySet["scale"]> = {
    comfortable: {
      h1: "2.5rem",
      h2: "2rem",
      h3: "1.75rem",
      h4: "1.5rem",
      h5: "1.25rem",
      h6: "1.125rem",
      body: "1rem",
      small: "0.875rem",
      caption: "0.75rem",
    },
    balanced: {
      h1: "2.25rem",
      h2: "1.875rem",
      h3: "1.5rem",
      h4: "1.25rem",
      h5: "1.125rem",
      h6: "1rem",
      body: "0.9375rem",
      small: "0.8125rem",
      caption: "0.6875rem",
    },
    dense: {
      h1: "2rem",
      h2: "1.75rem",
      h3: "1.375rem",
      h4: "1.125rem",
      h5: "1rem",
      h6: "0.9375rem",
      body: "0.875rem",
      small: "0.75rem",
      caption: "0.625rem",
    },
  };

  return {
    headingFont: pack.headingFont,
    bodyFont: pack.bodyFont,
    arabicHeadingFont: pack.arabicHeadingFont,
    arabicBodyFont: pack.arabicBodyFont,
    scale: scaleMap[density],
    lineHeight: {
      tight: density === "dense" ? "1.2" : "1.25",
      normal: density === "dense" ? "1.4" : "1.5",
      relaxed: density === "dense" ? "1.6" : "1.75",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  };
}

function deriveSpacing(
  density: InterfaceDensity,
  tone: VisualTone
): SpacingSystem {
  const densityScales: Record<InterfaceDensity, number[]> = {
    comfortable: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
    balanced: [0, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96],
    dense: [0, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64],
  };

  const radiusMap: Record<VisualTone, SpacingSystem["radius"]> = {
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
    radius: radiusMap[tone] || radiusMap.modern,
    elevation: {
      none: "none",
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
  };
}

function deriveComponentTheme(
  palette: PaletteTokenSet,
  spacing: SpacingSystem,
  tone: VisualTone,
  density: InterfaceDensity
): ComponentTheme {
  const padY = density === "dense" ? "8px" : density === "balanced" ? "10px" : "12px";
  const padX = density === "dense" ? "14px" : density === "balanced" ? "18px" : "24px";

  return {
    button: {
      primaryBg: palette.primary,
      primaryText: "#FFFFFF",
      primaryHoverBg: palette.primaryHover,
      secondaryBg: "transparent",
      secondaryText: palette.primary,
      secondaryBorder: palette.border,
      paddingY: padY,
      paddingX: padX,
      borderRadius: spacing.radius.md,
      fontWeight: "600",
    },
    input: {
      background: palette.background,
      border: palette.border,
      focusBorder: palette.primary,
      text: palette.textPrimary,
      placeholder: palette.textSecondary,
      paddingY: padY,
      paddingX: padX,
      borderRadius: spacing.radius.md,
    },
    card: {
      background: palette.surface,
      border: palette.border,
      borderRadius: spacing.radius.lg,
      padding: density === "dense" ? "16px" : density === "balanced" ? "20px" : "24px",
      shadow: spacing.elevation.sm,
    },
    badge: {
      paddingY: "2px",
      paddingX: "8px",
      borderRadius: spacing.radius.full,
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    table: {
      headerBg: palette.surfaceMuted,
      headerText: palette.textSecondary,
      rowBorder: palette.border,
      cellPadding: density === "dense" ? "8px 12px" : density === "balanced" ? "10px 16px" : "14px 20px",
      stripedBg: palette.surface,
    },
    sidebar: {
      background: palette.surface,
      border: palette.border,
      activeBg: palette.primary,
      activeText: "#FFFFFF",
      inactiveText: palette.textSecondary,
      width: "260px",
      padding: density === "dense" ? "8px" : density === "balanced" ? "12px" : "16px",
    },
  };
}

function generateExplanation(state: OnboardingState): string {
  const parts: string[] = [];

  if (state.industry) {
    const industryNames: Record<string, string> = {
      government: "government/public sector",
      education: "education",
      healthcare: "healthcare",
      "real-estate": "real estate",
      hr: "HR/internal services",
      operations: "operations",
      logistics: "logistics",
      retail: "retail/commerce",
      finance: "finance/insurance",
      hospitality: "hospitality",
      other: "your industry",
    };
    parts.push(`your ${industryNames[state.industry] || state.industry} context`);
  }

  if (state.visualTone) {
    const toneNames: Record<string, string> = {
      professional: "professional/corporate",
      premium: "premium/elegant",
      modern: "modern/startup",
      friendly: "friendly/approachable",
      minimal: "minimal/clean",
      bold: "bold/high-contrast",
      institutional: "institutional/formal",
      youthful: "youthful/educational",
    };
    parts.push(`a ${toneNames[state.visualTone] || state.visualTone} visual direction`);
  }

  if (state.languageSupport && state.languageSupport !== "en-only") {
    parts.push("bilingual Arabic + English support");
  }

  if (state.density) {
    parts.push(`a ${state.density} interface density`);
  }

  return `Generated based on ${parts.join(", ")}.`;
}

export function generateDesignSystem(state: OnboardingState): DesignSystem {
  const tone = state.visualTone || "modern";
  const density = state.density || "balanced";
  const typoStyle = state.typographyStyle || "clean-sans";
  const lang = state.languageSupport || "en-only";

  let primaryColor = "#3B82F6";
  if (state.selectedPalette) {
    const palette = curatedPalettes.find((p) => p.id === state.selectedPalette);
    if (palette) primaryColor = palette.preview.primary;
  } else if (state.extractedColors.length > 0) {
    primaryColor = state.extractedColors[0];
  }

  const lightPalette = derivePalette(primaryColor, tone);
  const darkPalette = deriveDarkPalette(lightPalette);
  const typography = deriveTypography(typoStyle, density);
  const spacing = deriveSpacing(density, tone);
  const components = deriveComponentTheme(lightPalette, spacing, tone, density);

  return {
    id: crypto.randomUUID(),
    name: `${state.industry || "custom"}-${tone}-system`,
    createdAt: new Date().toISOString(),
    palette: lightPalette,
    darkPalette,
    typography,
    spacing,
    components,
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
      explanation: generateExplanation(state),
    },
  };
}
