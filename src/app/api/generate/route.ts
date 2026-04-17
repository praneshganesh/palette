import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const PaletteSchema = z.object({
  primary: z.string().describe("Primary brand color hex"),
  primaryHover: z.string().describe("Darker hover state of primary"),
  secondary: z.string().describe("Secondary accent color hex"),
  accent: z.string().describe("Complementary accent color hex"),
  background: z.string().describe("Page background color hex"),
  surface: z.string().describe("Card/surface background hex"),
  surfaceMuted: z.string().describe("Muted surface for alternating rows hex"),
  border: z.string().describe("Border color hex"),
  textPrimary: z.string().describe("Primary text color hex"),
  textSecondary: z.string().describe("Secondary/muted text color hex"),
  success: z.string().describe("Success state color hex"),
  warning: z.string().describe("Warning state color hex"),
  danger: z.string().describe("Danger/error state color hex"),
  info: z.string().describe("Informational state color hex"),
});

const DesignSystemSchema = z.object({
  palette: PaletteSchema,
  darkPalette: PaletteSchema,
  typography: z.object({
    headingFont: z.string().describe("Google Font family name for headings"),
    bodyFont: z.string().describe("Google Font family name for body text"),
    arabicHeadingFont: z.string().describe("Google Font for Arabic headings (must support Arabic)"),
    arabicBodyFont: z.string().describe("Google Font for Arabic body (must support Arabic)"),
  }),
  components: z.object({
    button: z.object({
      primaryBg: z.string(),
      primaryText: z.string(),
      primaryHoverBg: z.string(),
      secondaryBg: z.string(),
      secondaryText: z.string(),
      secondaryBorder: z.string(),
      paddingY: z.string(),
      paddingX: z.string(),
      borderRadius: z.string(),
      fontWeight: z.string(),
    }),
    input: z.object({
      background: z.string(),
      border: z.string(),
      focusBorder: z.string(),
      text: z.string(),
      placeholder: z.string(),
      paddingY: z.string(),
      paddingX: z.string(),
      borderRadius: z.string(),
    }),
    card: z.object({
      background: z.string(),
      border: z.string(),
      borderRadius: z.string(),
      padding: z.string(),
      shadow: z.string(),
    }),
    badge: z.object({
      paddingY: z.string(),
      paddingX: z.string(),
      borderRadius: z.string(),
      fontSize: z.string(),
      fontWeight: z.string(),
    }),
    table: z.object({
      headerBg: z.string(),
      headerText: z.string(),
      rowBorder: z.string(),
      cellPadding: z.string(),
      stripedBg: z.string(),
    }),
    sidebar: z.object({
      background: z.string(),
      border: z.string(),
      activeBg: z.string(),
      activeText: z.string(),
      inactiveText: z.string(),
      width: z.string(),
      padding: z.string(),
    }),
  }),
  explanation: z.string().describe("2-3 sentence explanation of why these design choices were made"),
  recommendedComponents: z.array(z.string()).describe("Top 20-30 most relevant UI components for this project type, ordered by importance"),
  recommendedFieldTypes: z.array(z.string()).describe("Top 15-25 most relevant field specification types for this industry"),
});

function buildSystemPrompt(): string {
  return `You are an expert design system architect specializing in enterprise applications for the GCC/MENA region.

Your job is to generate a complete, production-ready design system based on the user's project requirements.

CRITICAL RULES:
- All colors must be valid 6-digit hex codes (e.g. #3B82F6)
- Light palette: background should be white or near-white, text should be dark
- Dark palette: background should be very dark (#0A-#14 range), text should be light
- Font choices must be real Google Fonts that actually exist
- Arabic fonts must support Arabic script (e.g. IBM Plex Sans Arabic, Noto Sans Arabic, Cairo, Tajawal, Almarai)
- Component tokens should be contextually appropriate CSS values
- The explanation should reference the specific industry, tone, and design rationale
- recommendedComponents should be ordered by relevance (most important first)
- recommendedFieldTypes must use these exact type identifiers: email, fullName, arabicName, phone, whatsapp, textShort, textArea, password, url, search, richText, markdown, codeEditor, autocomplete, mention, select, checkbox, radio, toggle, multiSelect, priority, status, gender, nationality, treeSelect, consent, dynamicList, date, dateRange, time, dateTime, dateOfBirth, hijriDate, timezone, duration, schedule, currency, percentage, number, slider, rating, quantityStepper, iban, creditCard, vatNumber, invoiceNumber, salary, paymentMethod, bankAccount, weight, dimensions, nationalId, passport, commercialRegistration, licenseNumber, plateNumber, barcode, otp, pinCode, address, postalCode, poBox, mapLocation, emergencyContact, socialMedia, fileUpload, colorPicker, avatar, signature, ipAddress

INDUSTRY DESIGN GUIDELINES (color + key components):
- Government/Citizen Services: Formal blues/greens, high contrast, accessibility-first. Key: FormLayout, ApprovalFlow, Table, StatusWorkflow, MultiStepWizard, Alert
- Healthcare: Calming blues, clinical whites, clear hierarchy. Key: Calendar, FormLayout, Timeline, Table, Alert, ApprovalFlow, ProfileCard, StatusWorkflow
- Finance/Fintech: Trust navy/gold, premium feel, data-dense. Key: Table, LineChart, BarChart, KPICard, PieDonut, InvoiceTable, PriceDisplay, FilterBar
- Real Estate: Warm neutrals, spacious, property showcase. Key: ProductCard, ImageGallery, LineChart, BarChart, KPICard, FilterBar, Calendar, PriceDisplay, SearchBar, Heatmap
- Education: Friendly, accessible, youthful. Key: Card, Progress, Accordion, Calendar, Timeline, Rating, Stepper, Avatar
- HR/Internal: Professional, form-heavy, dashboard. Key: FormLayout, Table, KPICard, FilterBar, ApprovalFlow, Calendar, Timeline, ProfileCard
- Retail/E-commerce: Brand-forward, conversion-optimized. Key: ProductCard, CartItems, OrderSummary, PricingCards, Rating, SearchBar, Pagination, Chip, ImageGallery
- Hospitality/Travel: Warm, booking-centric, image-heavy. Key: Calendar, ProductCard, ImageGallery, SearchBar, PriceDisplay, Rating, Timeline, BottomSheet
- Logistics/Supply Chain: Efficient, status-oriented, map-integrated. Key: Table, KPICard, StatusWorkflow, Timeline, BarChart, FilterBar, BulkActionBar, Alert
- Operations: Dashboard-heavy, KPI-focused. Key: KPICard, LineChart, BarChart, PieDonut, Table, FilterBar, StatusWorkflow, Alert, Heatmap
- Technology/SaaS: Modern, clean, product-focused. Key: PricingCards, KPICard, LineChart, Table, FormLayout, CommandPalette, Toast, Badge, Tabs
- AI/ML/Future Tech: Futuristic, data-rich, purple/neon accents. Key: LineChart, ScatterPlot, Heatmap, KPICard, Table, BarChart, Progress, FilterBar
- Media/Entertainment: Bold, engaging, content-forward. Key: ImageGallery, VideoPlayer, Card, Carousel, SearchBar, Chip, Avatar, Timeline, BottomSheet
- Legal/Compliance: Conservative, document-heavy, precise. Key: Table, FormLayout, DiffView, VersionHistory, ApprovalFlow, Timeline, FilePreview, SearchBar
- Construction/Engineering: Project-oriented, status-driven. Key: StatusWorkflow, KPICard, BarChart, Calendar, Table, Progress, Timeline, FilterBar
- Energy/Utilities: Monitoring, IoT, consumption data. Key: LineChart, AreaChart, KPICard, Heatmap, Table, Alert, BarChart, Gauge
- Telecom: Account-centric, billing. Key: PriceDisplay, Table, KPICard, InvoiceTable, FormLayout, LineChart, Toast, Stepper
- Non-Profit/NGO: Warm, community, impact. Key: KPICard, PieDonut, Timeline, Card, ProfileCard, Progress, ImageGallery, FormLayout

TYPOGRAPHY GUIDANCE:
- Use font pairings that create visual hierarchy (display + body)
- For premium: consider DM Sans, Plus Jakarta Sans, Outfit, Manrope
- For professional: consider Inter, Source Sans 3, Work Sans
- For friendly: consider Nunito, Poppins, Quicksand
- For Arabic: IBM Plex Sans Arabic (professional), Noto Sans Arabic (clean), Cairo (modern), Tajawal (friendly), Almarai (premium)`;
}

function buildUserPrompt(input: {
  projectType: string;
  industry: string;
  visualTone: string;
  density: string;
  languageSupport: string;
  primaryColor?: string;
  inspirationStyle?: string;
}): string {
  return `Generate a design system for:

PROJECT TYPE: ${input.projectType}
INDUSTRY: ${input.industry}
VISUAL TONE: ${input.visualTone}
DENSITY: ${input.density}
LANGUAGE: ${input.languageSupport}
${input.primaryColor ? `BRAND COLOR: ${input.primaryColor} (use this as the primary, derive others from it)` : ""}
${input.inspirationStyle ? `INSPIRATION: ${input.inspirationStyle}` : ""}

Generate the complete design system with light palette, dark palette, typography, component tokens, and recommendations.

For recommendedComponents, pick the 20-30 MOST RELEVANT from this full list of 70 available components:

CORE INPUTS: Button, ButtonGroup, IconButton, Input, Textarea, Select, DatePicker, Checkbox, Radio, Toggle, Slider, RangeSlider, NumberInput, TagInput, Rating, OTP, FileUpload, SearchBar, Autocomplete

NAVIGATION: Sidebar, NavBar, Breadcrumbs, Tabs, Pagination, Menu, SegmentedControl, MegaMenu, TreeNavigation, AnchorNav, BottomNav, CommandPalette

CONTENT & DISPLAY: Card, ProductCard, KPICard, Table, Badge, Chip, Avatar, Accordion, Carousel, Divider, List, Tooltip, Popover, Toast, Modal, Drawer, Alert, EmptyState, Skeleton, Progress, Timeline, Calendar, Footer

DATA VISUALIZATION: LineChart, BarChart, AreaChart, PieDonut, ScatterPlot, Heatmap

FORM PATTERNS: FormLayout, MultiStepWizard, InlineValidation, AutosaveIndicator, CharacterCounter, FormSection

COMMERCE: PricingCards, CartItems, OrderSummary, InvoiceTable, PriceDisplay

ENTERPRISE: FilterBar, BulkActionBar, QueryBuilder, ApprovalFlow, DiffView, VersionHistory, StatusWorkflow, CommentThread

COMMUNICATION: ChatBubble, MessageComposer, PresenceIndicator, ReactionPicker, NotificationPanel

MEDIA: ImageGallery, VideoPlayer, FilePreview

AUTH: SignInForm, ProfileCard

MOBILE: BottomSheet, FAB

FEEDBACK STATES: Spinner, ErrorState, MaintenanceState, NoResultsState, PermissionDenied, SaveSyncStatus, UploadProgress

Pick the ones most relevant for a ${input.industry} ${input.projectType}. Order by importance.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(body);

    console.log("\n╔══════════════════════════════════════════════════════════════╗");
    console.log("║              AI DESIGN SYSTEM GENERATION                     ║");
    console.log("╚══════════════════════════════════════════════════════════════╝");
    console.log("📋 Model:", model);
    console.log("📋 Request body:", JSON.stringify(body, null, 2));
    console.log("📋 System prompt length:", systemPrompt.length, "chars");
    console.log("📋 User prompt:\n", userPrompt);
    console.log("────────────────────────────────────────────────────────────────");

    const startTime = Date.now();

    const result = await generateObject({
      model: openai(model),
      schema: DesignSystemSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
    });

    const elapsed = Date.now() - startTime;

    console.log("\n✅ AI Generation complete in", elapsed, "ms");
    console.log("📦 Response palette:", JSON.stringify(result.object.palette, null, 2));
    console.log("📦 Typography:", JSON.stringify(result.object.typography, null, 2));
    console.log("📦 Explanation:", result.object.explanation);
    console.log("📦 Recommended components:", result.object.recommendedComponents);
    console.log("📦 Recommended field types:", result.object.recommendedFieldTypes);
    console.log("📦 Component tokens (button):", JSON.stringify(result.object.components.button, null, 2));
    console.log("────────────────────────────────────────────────────────────────\n");

    return NextResponse.json({ success: true, data: result.object });
  } catch (error: unknown) {
    console.error("\n❌ [AI Generate] Error:", error);
    const message = error instanceof Error ? error.message : "AI generation failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
