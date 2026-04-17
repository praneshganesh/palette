export type ProjectType =
  | "admin-portal"
  | "employee-portal"
  | "customer-portal"
  | "education-portal"
  | "workflow-app"
  | "operations-dashboard"
  | "booking-app"
  | "marketplace"
  | "ecommerce-store"
  | "saas-product"
  | "crm"
  | "analytics-platform"
  | "social-platform"
  | "content-platform"
  | "mobile-app"
  | "other";

export type Industry =
  | "government"
  | "education"
  | "healthcare"
  | "real-estate"
  | "hr"
  | "operations"
  | "logistics"
  | "retail"
  | "finance"
  | "hospitality"
  | "technology"
  | "ai-ml"
  | "media-entertainment"
  | "nonprofit"
  | "legal"
  | "construction"
  | "energy"
  | "telecom"
  | "other";

export type VisualTone =
  | "professional"
  | "premium"
  | "modern"
  | "friendly"
  | "minimal"
  | "bold"
  | "institutional"
  | "youthful";

export type TypographyStyle =
  | "clean-sans"
  | "premium-modern"
  | "formal-institutional"
  | "friendly-rounded"
  | "bold-product"
  | "compact-dashboard";

export type InterfaceDensity = "comfortable" | "balanced" | "dense";

export type LanguageSupport =
  | "en-only"
  | "ar-only"
  | "en-ar"
  | "en-ar-plus";

export type InspirationStyle =
  | "admin-heavy"
  | "portal-style"
  | "dashboard-heavy"
  | "mobile-first"
  | "formal-enterprise"
  | "soft-modern"
  | "premium-brand"
  | "public-service";

export interface OnboardingState {
  currentStep: number;
  projectType: ProjectType | null;
  industry: Industry | null;
  visualTone: VisualTone | null;
  logoFile: File | null;
  logoPreviewUrl: string | null;
  extractedColors: string[];
  selectedPalette: string | null;
  typographyStyle: TypographyStyle | null;
  density: InterfaceDensity | null;
  languageSupport: LanguageSupport | null;
  rtlSupport: boolean;
  regionalDateFormat: boolean;
  regionalNumberFormat: boolean;
  inspirationStyle: InspirationStyle | null;
}

export interface ColorToken {
  name: string;
  value: string;
  description: string;
}

export interface PaletteTokenSet {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface TypographySet {
  headingFont: string;
  bodyFont: string;
  arabicHeadingFont: string;
  arabicBodyFont: string;
  scale: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    body: string;
    small: string;
    caption: string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  fontWeight: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface SpacingSystem {
  scale: number[];
  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  elevation: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface ComponentTheme {
  button: Record<string, string>;
  input: Record<string, string>;
  card: Record<string, string>;
  badge: Record<string, string>;
  table: Record<string, string>;
  sidebar: Record<string, string>;
}

export interface DesignSystem {
  id: string;
  name: string;
  createdAt: string;
  palette: PaletteTokenSet;
  darkPalette: PaletteTokenSet;
  typography: TypographySet;
  spacing: SpacingSystem;
  components: ComponentTheme;
  localization: {
    languages: LanguageSupport;
    rtl: boolean;
    regionalDate: boolean;
    regionalNumber: boolean;
  };
  meta: {
    projectType: ProjectType;
    industry: Industry;
    visualTone: VisualTone;
    density: InterfaceDensity;
    explanation: string;
  };
}

export interface CuratedPalette {
  id: string;
  name: string;
  description: string;
  colors: string[];
  preview: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
}

export interface TypographyPack {
  id: TypographyStyle;
  name: string;
  description: string;
  headingFont: string;
  bodyFont: string;
  arabicHeadingFont: string;
  arabicBodyFont: string;
  sampleHeading: string;
  sampleBody: string;
  sampleArabicHeading: string;
  sampleArabicBody: string;
}

export interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
  required: boolean;
}
