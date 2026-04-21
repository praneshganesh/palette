"use client";

import { useRef, useState } from "react";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";
// Core Inputs
import { ButtonsSection } from "@/components/design-system/buttons";
import { InputsSection } from "@/components/design-system/inputs/inputs-section";
import { DatePickerSection } from "@/components/design-system/inputs/date-picker-section";
import { CheckboxSection } from "@/components/design-system/inputs/checkbox-section";
import { RadioSection } from "@/components/design-system/inputs/radio-section";
import { IconButtonSection } from "@/components/design-system/inputs/icon-button-section";
import { NumberInputSection } from "@/components/design-system/inputs/number-input-section";
import { RangeSliderSection } from "@/components/design-system/inputs/range-slider-section";
import { TagInputSection } from "@/components/design-system/inputs/tag-input-section";
import { RatingSection } from "@/components/design-system/inputs/rating-section";
import { OtpSection } from "@/components/design-system/inputs/otp-section";
import { FileUploadSection } from "@/components/design-system/inputs/file-upload-section";
import { ButtonGroupSection } from "@/components/design-system/inputs/button-group-section";
import { SliderSection } from "@/components/design-system/inputs/slider-section";
import { ToggleSection } from "@/components/design-system/inputs/toggle-section";
import { SearchBarSection } from "@/components/design-system/inputs/search-bar-section";
// Content & Display
import { CardsSection } from "@/components/design-system/display/cards-section";
import { TableSection } from "@/components/design-system/display/table-section";
import { BadgesSection } from "@/components/design-system/display/badges-section";
import { TabsSection } from "@/components/design-system/navigation/tabs-section";
import { ChipSection } from "@/components/design-system/display/chip-section";
import { ListSection } from "@/components/design-system/display/list-section";
import { DividerSection } from "@/components/design-system/display/divider-section";
import { AccordionSection } from "@/components/design-system/display/accordion-section";
import { AvatarSection } from "@/components/design-system/display/avatar-section";
import { CarouselSection } from "@/components/design-system/display/carousel-section";
import { TooltipSection } from "@/components/design-system/display/tooltip-section";
import { PopoverSection } from "@/components/design-system/display/popover-section";
import { IconLibrarySection } from "@/components/design-system/display/icon-library-section";
// Navigation
import { SidebarSection } from "@/components/design-system/navigation/sidebar-section";
import { NavbarSection } from "@/components/design-system/navigation/navbar-section";
import { BreadcrumbsSection } from "@/components/design-system/navigation/breadcrumbs-section";
import { PaginationSection } from "@/components/design-system/navigation/pagination-section";
import { MenuSection } from "@/components/design-system/navigation/menu-section";
import { SegmentedSection } from "@/components/design-system/navigation/segmented-section";
import { MegaMenuSection } from "@/components/design-system/navigation/mega-menu-section";
import { TreeNavSection } from "@/components/design-system/navigation/tree-nav-section";
import { AnchorNavSection } from "@/components/design-system/navigation/anchor-nav-section";
import { BottomNavSection } from "@/components/design-system/navigation/bottom-nav-section";
import { FooterSection } from "@/components/design-system/navigation/footer-section";
// Feedback & Overlays
import { ModalsSection } from "@/components/design-system/feedback/modal-section";
import { DrawersSection } from "@/components/design-system/feedback/drawer-section";
import { AlertsSection } from "@/components/design-system/feedback/alert-section";
import { ToastSection } from "@/components/design-system/feedback/toast-section";
import { EmptyStatesSection } from "@/components/design-system/feedback/empty-states-section";
import { SkeletonSection } from "@/components/design-system/feedback/skeleton-section";
import { ProgressSection } from "@/components/design-system/feedback/progress-section";
import { SpinnerSection } from "@/components/design-system/feedback/spinner-section";
import { ErrorStateSection } from "@/components/design-system/feedback/error-state-section";
import { MaintenanceSection } from "@/components/design-system/feedback/maintenance-section";
import { NoResultsSection } from "@/components/design-system/feedback/no-results-section";
import { PermissionSection } from "@/components/design-system/feedback/permission-section";
import { SaveSyncSection } from "@/components/design-system/feedback/save-sync-section";
import { UploadProgressSection } from "@/components/design-system/feedback/upload-progress-section";
// Data Visualization
import { LineChartSection } from "@/components/design-system/data-viz/line-chart-section";
import { BarChartSection } from "@/components/design-system/data-viz/bar-chart-section";
import { AreaChartSection } from "@/components/design-system/data-viz/area-chart-section";
import { PieChartSection } from "@/components/design-system/data-viz/pie-chart-section";
import { ScatterSection } from "@/components/design-system/data-viz/scatter-section";
import { HeatmapSection } from "@/components/design-system/data-viz/heatmap-section";
import { KpiSection } from "@/components/design-system/data-viz/kpi-section";
// Form Patterns
import { FormLayoutSection } from "@/components/design-system/forms/form-layout-section";
import { WizardSection } from "@/components/design-system/forms/wizard-section";
import { ValidationSection } from "@/components/design-system/forms/validation-section";
import { AutosaveSection } from "@/components/design-system/forms/autosave-section";
import { CharCounterSection } from "@/components/design-system/forms/char-counter-section";
import { FormSectionSection } from "@/components/design-system/forms/form-section-section";
// Composites
import { FilterBarSection } from "@/components/design-system/composites/filter-bar-section";
import { TimelineSection } from "@/components/design-system/composites/timeline-section";
import { CalendarSection } from "@/components/design-system/composites/calendar-section";
import { CommandPaletteSection } from "@/components/design-system/composites/command-palette-section";
import { CommentThreadSection } from "@/components/design-system/composites/comment-thread-section";
// Commerce
import { ProductCardSection } from "@/components/design-system/commerce/product-card-section";
import { PricingSection } from "@/components/design-system/commerce/pricing-section";
import { CartSection } from "@/components/design-system/commerce/cart-section";
import { OrderSummarySection } from "@/components/design-system/commerce/order-summary-section";
import { InvoiceSection } from "@/components/design-system/commerce/invoice-section";
import { PriceDisplaySection } from "@/components/design-system/commerce/price-display-section";
// Enterprise
import { BulkActionsSection } from "@/components/design-system/enterprise/bulk-actions-section";
import { QueryBuilderSection } from "@/components/design-system/enterprise/query-builder-section";
import { ApprovalFlowSection } from "@/components/design-system/enterprise/approval-flow-section";
import { DiffViewSection } from "@/components/design-system/enterprise/diff-view-section";
import { VersionHistorySection } from "@/components/design-system/enterprise/version-history-section";
import { StatusWorkflowSection } from "@/components/design-system/enterprise/status-workflow-section";
// Communication
import { ChatSection } from "@/components/design-system/communication/chat-section";
import { ComposerSection } from "@/components/design-system/communication/composer-section";
import { PresenceSection } from "@/components/design-system/communication/presence-section";
import { ReactionsSection } from "@/components/design-system/communication/reactions-section";
import { NotificationsSection } from "@/components/design-system/communication/notifications-section";
// Media & Auth
import { GallerySection } from "@/components/design-system/media/gallery-section";
import { VideoSection } from "@/components/design-system/media/video-section";
import { FilePreviewSection } from "@/components/design-system/media/file-preview-section";
import { SignInSection } from "@/components/design-system/media/sign-in-section";
import { ProfileCardSection } from "@/components/design-system/media/profile-card-section";
// Responsive
import { ResponsiveTableSection } from "@/components/design-system/responsive/responsive-table-section";
import { ResponsiveMenuSection } from "@/components/design-system/responsive/responsive-menu-section";
import { ResponsiveDropdownSection } from "@/components/design-system/responsive/responsive-dropdown-section";
import { ResponsiveGridSection } from "@/components/design-system/responsive/responsive-grid-section";
import { ResponsiveModalSection } from "@/components/design-system/responsive/responsive-modal-section";
import { ResponsiveFormSection } from "@/components/design-system/responsive/responsive-form-section";
// Mobile
import { BottomSheetSection } from "@/components/design-system/mobile/bottom-sheet-section";
import { FabSection } from "@/components/design-system/mobile/fab-section";
import { ActionSheetSection } from "@/components/design-system/mobile/action-sheet-section";
import { SwipeActionsSection } from "@/components/design-system/mobile/swipe-actions-section";
import { PullRefreshSection } from "@/components/design-system/mobile/pull-refresh-section";
import { MobileTabsSection } from "@/components/design-system/mobile/mobile-tabs-section";
import { MobileSearchSection } from "@/components/design-system/mobile/mobile-search-section";
import { MobileToastSection } from "@/components/design-system/mobile/mobile-toast-section";
import { FloatingHeaderSection } from "@/components/design-system/mobile/floating-header-section";
import { StickyBottomSection } from "@/components/design-system/mobile/sticky-bottom-section";
import { MobileStepperSection } from "@/components/design-system/mobile/mobile-stepper-section";
import { SwipeCarouselSection } from "@/components/design-system/mobile/swipe-carousel-section";
import { ChipFilterSection } from "@/components/design-system/mobile/chip-filter-section";
import { ImageViewerSection } from "@/components/design-system/mobile/image-viewer-section";
import { GestureHintsSection } from "@/components/design-system/mobile/gesture-hints-section";
import { MobileOnboardingSection } from "@/components/design-system/mobile/mobile-onboarding-section";

interface ComponentsTabProps {
  system: DesignSystem;
  content: IndustryContent;
}

const SIDEBAR_SECTIONS = [
  { group: "Core Inputs", items: [
    { id: "comp-buttons", label: "Buttons" },
    { id: "comp-inputs", label: "Inputs & Selects" },
    { id: "comp-date-pickers", label: "Date Pickers" },
    { id: "comp-checkboxes", label: "Checkboxes" },
    { id: "comp-radio", label: "Radio Buttons" },
    { id: "comp-icon-button", label: "Icon Button" },
    { id: "comp-number-input", label: "Number Input" },
    { id: "comp-range-slider", label: "Range Slider" },
    { id: "comp-tag-input", label: "Tag Input" },
    { id: "comp-rating", label: "Rating" },
    { id: "comp-otp", label: "OTP / PIN" },
    { id: "comp-file-upload", label: "File Upload" },
    { id: "comp-button-group", label: "Button Group" },
    { id: "comp-slider", label: "Slider" },
    { id: "comp-toggle", label: "Toggle" },
    { id: "comp-search-bar", label: "Search Bar" },
  ]},
  { group: "Content & Display", items: [
    { id: "comp-cards", label: "Cards" },
    { id: "comp-tables", label: "Data Table" },
    { id: "comp-badges", label: "Badges & Status" },
    { id: "comp-tabs", label: "Tabs" },
    { id: "comp-chip", label: "Chip / Tag" },
    { id: "comp-list", label: "List" },
    { id: "comp-divider", label: "Divider" },
    { id: "comp-accordion", label: "Accordion" },
    { id: "comp-avatar", label: "Avatar" },
    { id: "comp-carousel", label: "Carousel" },
    { id: "comp-tooltip", label: "Tooltip" },
    { id: "comp-popover", label: "Popover" },
    { id: "comp-icon-library", label: "Icon Library" },
  ]},
  { group: "Navigation", items: [
    { id: "comp-sidebars", label: "Sidebars" },
    { id: "comp-nav-bars", label: "Nav Bars" },
    { id: "comp-breadcrumbs", label: "Breadcrumbs" },
    { id: "comp-pagination", label: "Pagination" },
    { id: "comp-menu", label: "Menu / Dropdown" },
    { id: "comp-segmented", label: "Segmented Control" },
    { id: "comp-mega-menu", label: "Mega Menu" },
    { id: "comp-tree-nav", label: "Tree Navigation" },
    { id: "comp-anchor-nav", label: "Anchor Nav / TOC" },
    { id: "comp-bottom-nav", label: "Bottom Navigation" },
    { id: "comp-footer", label: "Footer" },
  ]},
  { group: "Feedback & Overlays", items: [
    { id: "comp-modals", label: "Modals" },
    { id: "comp-drawers", label: "Drawers" },
    { id: "comp-alerts", label: "Alerts" },
    { id: "comp-toast", label: "Toast / Snackbar" },
    { id: "comp-empty-states", label: "Empty States" },
    { id: "comp-skeleton", label: "Skeleton States" },
    { id: "comp-progress", label: "Progress" },
    { id: "comp-spinner", label: "Spinner / Loading" },
    { id: "comp-error-state", label: "Error State" },
    { id: "comp-maintenance", label: "Maintenance State" },
    { id: "comp-no-results", label: "No Results" },
    { id: "comp-permission", label: "Permission Denied" },
    { id: "comp-save-sync", label: "Save / Sync Status" },
    { id: "comp-upload-progress", label: "Upload Progress" },
  ]},
  { group: "Data Visualization", items: [
    { id: "comp-line-chart", label: "Line Chart" },
    { id: "comp-bar-chart", label: "Bar Chart" },
    { id: "comp-area-chart", label: "Area Chart" },
    { id: "comp-pie-donut", label: "Pie / Donut" },
    { id: "comp-scatter", label: "Scatter Plot" },
    { id: "comp-heatmap", label: "Heatmap" },
    { id: "comp-kpi-cards", label: "KPI / Stat Cards" },
  ]},
  { group: "Form Patterns", items: [
    { id: "comp-form-layout", label: "Form Layout" },
    { id: "comp-wizard", label: "Multi-step Wizard" },
    { id: "comp-validation", label: "Inline Validation" },
    { id: "comp-autosave", label: "Autosave Indicator" },
    { id: "comp-char-counter", label: "Character Counter" },
    { id: "comp-form-section", label: "Form Section" },
  ]},
  { group: "Composites", items: [
    { id: "comp-filter-bar", label: "Filter Bar" },
    { id: "comp-timeline", label: "Timeline / Activity" },
    { id: "comp-calendar", label: "Calendar" },
    { id: "comp-command-palette", label: "Command Palette" },
    { id: "comp-comment-thread", label: "Comment Thread" },
  ]},
  { group: "Commerce", items: [
    { id: "comp-product-card", label: "Product Card" },
    { id: "comp-pricing", label: "Pricing Plans" },
    { id: "comp-cart", label: "Cart Items" },
    { id: "comp-order-summary", label: "Order Summary" },
    { id: "comp-invoice", label: "Invoice Table" },
    { id: "comp-price-display", label: "Price Display" },
  ]},
  { group: "Enterprise", items: [
    { id: "comp-bulk-actions", label: "Bulk Action Bar" },
    { id: "comp-query-builder", label: "Query Builder" },
    { id: "comp-approval-flow", label: "Approval Flow" },
    { id: "comp-diff-view", label: "Diff / Comparison" },
    { id: "comp-version-history", label: "Version History" },
    { id: "comp-status-workflow", label: "Status Workflow" },
  ]},
  { group: "Communication", items: [
    { id: "comp-chat", label: "Chat Bubble" },
    { id: "comp-composer", label: "Message Composer" },
    { id: "comp-presence", label: "Presence Indicator" },
    { id: "comp-reactions", label: "Reaction Picker" },
    { id: "comp-notifications", label: "Notification Panel" },
  ]},
  { group: "Media & Auth", items: [
    { id: "comp-gallery", label: "Image Gallery" },
    { id: "comp-video", label: "Video Player" },
    { id: "comp-file-preview", label: "File Preview" },
    { id: "comp-sign-in", label: "Sign In Form" },
    { id: "comp-profile-card", label: "Profile Card" },
  ]},
  { group: "Responsive", items: [
    { id: "comp-responsive-table", label: "Table: Desktop vs Mobile" },
    { id: "comp-responsive-menu", label: "Nav: Desktop vs Mobile" },
    { id: "comp-responsive-dropdown", label: "Dropdown: Desktop vs Mobile" },
    { id: "comp-responsive-grid", label: "Grid: Desktop vs Mobile" },
    { id: "comp-responsive-modal", label: "Modal: Desktop vs Mobile" },
    { id: "comp-responsive-form", label: "Form: Desktop vs Mobile" },
  ]},
  { group: "Mobile", items: [
    { id: "comp-bottom-sheet", label: "Bottom Sheet" },
    { id: "comp-fab", label: "FAB" },
    { id: "comp-action-sheet", label: "Action Sheet" },
    { id: "comp-swipe-actions", label: "Swipe Actions" },
    { id: "comp-pull-refresh", label: "Pull to Refresh" },
    { id: "comp-mobile-tabs", label: "Mobile Tabs" },
    { id: "comp-mobile-search", label: "Mobile Search" },
    { id: "comp-mobile-toast", label: "Mobile Toast" },
    { id: "comp-floating-header", label: "Floating Header" },
    { id: "comp-sticky-bottom", label: "Sticky Bottom CTA" },
    { id: "comp-mobile-stepper", label: "Mobile Stepper" },
    { id: "comp-swipe-carousel", label: "Swipe Carousel" },
    { id: "comp-chip-filter", label: "Mobile Chip Filter" },
    { id: "comp-image-viewer", label: "Image Viewer" },
    { id: "comp-gesture-hint", label: "Gesture Hints" },
    { id: "comp-mobile-onboarding", label: "Mobile Onboarding" },
  ]},
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function ComponentsTab({ system, content }: ComponentsTabProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;

  const accentBar: React.CSSProperties = { height: 2, backgroundColor: palette.primary, width: 48, marginBottom: 24 };
  const sectionTitle: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8, margin: 0, paddingBottom: 8 };
  const sectionDesc: React.CSSProperties = { fontSize: 14, color: palette.textSecondary, lineHeight: 1.7, marginBottom: 40, maxWidth: 520, marginTop: 0 };
  const sectionWrap = (_isLast: boolean): React.CSSProperties => ({ paddingBottom: 72, marginBottom: 0, borderBottom: "none" });

  const [activeSection, setActiveSection] = useState<string>("comp-buttons");
  const contentRef = useRef<HTMLDivElement>(null);

  const sectionPropsBase = { system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SECTION_MAP: Record<string, React.ComponentType<any>> = {
    "comp-buttons": ButtonsSection,
    "comp-inputs": InputsSection,
    "comp-date-pickers": DatePickerSection,
    "comp-checkboxes": CheckboxSection,
    "comp-radio": RadioSection,
    "comp-icon-button": IconButtonSection,
    "comp-number-input": NumberInputSection,
    "comp-range-slider": RangeSliderSection,
    "comp-tag-input": TagInputSection,
    "comp-rating": RatingSection,
    "comp-otp": OtpSection,
    "comp-file-upload": FileUploadSection,
    "comp-button-group": ButtonGroupSection,
    "comp-slider": SliderSection,
    "comp-toggle": ToggleSection,
    "comp-search-bar": SearchBarSection,
    "comp-cards": CardsSection,
    "comp-tables": TableSection,
    "comp-badges": BadgesSection,
    "comp-tabs": TabsSection,
    "comp-chip": ChipSection,
    "comp-list": ListSection,
    "comp-divider": DividerSection,
    "comp-accordion": AccordionSection,
    "comp-avatar": AvatarSection,
    "comp-carousel": CarouselSection,
    "comp-tooltip": TooltipSection,
    "comp-popover": PopoverSection,
    "comp-icon-library": IconLibrarySection,
    "comp-sidebars": SidebarSection,
    "comp-nav-bars": NavbarSection,
    "comp-breadcrumbs": BreadcrumbsSection,
    "comp-pagination": PaginationSection,
    "comp-menu": MenuSection,
    "comp-segmented": SegmentedSection,
    "comp-mega-menu": MegaMenuSection,
    "comp-tree-nav": TreeNavSection,
    "comp-anchor-nav": AnchorNavSection,
    "comp-bottom-nav": BottomNavSection,
    "comp-footer": FooterSection,
    "comp-modals": ModalsSection,
    "comp-drawers": DrawersSection,
    "comp-alerts": AlertsSection,
    "comp-toast": ToastSection,
    "comp-empty-states": EmptyStatesSection,
    "comp-skeleton": SkeletonSection,
    "comp-progress": ProgressSection,
    "comp-spinner": SpinnerSection,
    "comp-error-state": ErrorStateSection,
    "comp-maintenance": MaintenanceSection,
    "comp-no-results": NoResultsSection,
    "comp-permission": PermissionSection,
    "comp-save-sync": SaveSyncSection,
    "comp-upload-progress": UploadProgressSection,
    "comp-line-chart": LineChartSection,
    "comp-bar-chart": BarChartSection,
    "comp-area-chart": AreaChartSection,
    "comp-pie-donut": PieChartSection,
    "comp-scatter": ScatterSection,
    "comp-heatmap": HeatmapSection,
    "comp-kpi-cards": KpiSection,
    "comp-form-layout": FormLayoutSection,
    "comp-wizard": WizardSection,
    "comp-validation": ValidationSection,
    "comp-autosave": AutosaveSection,
    "comp-char-counter": CharCounterSection,
    "comp-form-section": FormSectionSection,
    "comp-filter-bar": FilterBarSection,
    "comp-timeline": TimelineSection,
    "comp-calendar": CalendarSection,
    "comp-command-palette": CommandPaletteSection,
    "comp-comment-thread": CommentThreadSection,
    "comp-product-card": ProductCardSection,
    "comp-pricing": PricingSection,
    "comp-cart": CartSection,
    "comp-order-summary": OrderSummarySection,
    "comp-invoice": InvoiceSection,
    "comp-price-display": PriceDisplaySection,
    "comp-bulk-actions": BulkActionsSection,
    "comp-query-builder": QueryBuilderSection,
    "comp-approval-flow": ApprovalFlowSection,
    "comp-diff-view": DiffViewSection,
    "comp-version-history": VersionHistorySection,
    "comp-status-workflow": StatusWorkflowSection,
    "comp-chat": ChatSection,
    "comp-composer": ComposerSection,
    "comp-presence": PresenceSection,
    "comp-reactions": ReactionsSection,
    "comp-notifications": NotificationsSection,
    "comp-gallery": GallerySection,
    "comp-video": VideoSection,
    "comp-file-preview": FilePreviewSection,
    "comp-sign-in": SignInSection,
    "comp-profile-card": ProfileCardSection,
    "comp-responsive-table": ResponsiveTableSection,
    "comp-responsive-menu": ResponsiveMenuSection,
    "comp-responsive-dropdown": ResponsiveDropdownSection,
    "comp-responsive-grid": ResponsiveGridSection,
    "comp-responsive-modal": ResponsiveModalSection,
    "comp-responsive-form": ResponsiveFormSection,
    "comp-bottom-sheet": BottomSheetSection,
    "comp-fab": FabSection,
    "comp-action-sheet": ActionSheetSection,
    "comp-swipe-actions": SwipeActionsSection,
    "comp-pull-refresh": PullRefreshSection,
    "comp-mobile-tabs": MobileTabsSection,
    "comp-mobile-search": MobileSearchSection,
    "comp-mobile-toast": MobileToastSection,
    "comp-floating-header": FloatingHeaderSection,
    "comp-sticky-bottom": StickyBottomSection,
    "comp-mobile-stepper": MobileStepperSection,
    "comp-swipe-carousel": SwipeCarouselSection,
    "comp-chip-filter": ChipFilterSection,
    "comp-image-viewer": ImageViewerSection,
    "comp-gesture-hint": GestureHintsSection,
    "comp-mobile-onboarding": MobileOnboardingSection,
  };

  const ActiveSection = SECTION_MAP[activeSection];

  return (
    <div style={{ display: "flex", gap: 0, position: "relative" }}>
      {/* Sidebar Index */}
      <nav
        style={{
          width: 220,
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          borderRight: `1px solid ${palette.border}`,
          padding: "24px 0",
          backgroundColor: palette.background,
        }}
      >
        <div style={{ padding: "0 16px 16px", fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
          Components ({SIDEBAR_SECTIONS.reduce((sum, g) => sum + g.items.length, 0)})
        </div>
        {SIDEBAR_SECTIONS.map((group) => (
          <div key={group.group} style={{ marginBottom: 8 }}>
            <div style={{ padding: "8px 16px 4px", fontSize: 10, fontWeight: 600, color: palette.textSecondary, letterSpacing: "0.08em", textTransform: "uppercase" as const, opacity: 0.7 }}>
              {group.group}
            </div>
            {group.items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "5px 16px 5px 20px",
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? palette.primary : palette.textSecondary,
                    backgroundColor: isActive ? palette.primary + "08" : "transparent",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    borderLeftWidth: 2,
                    borderLeftStyle: "solid",
                    borderLeftColor: isActive ? palette.primary : "transparent",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Main Content - Only render the active section */}
      <div ref={contentRef} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, minWidth: 0, padding: "0 0 0 24px", overflowY: "auto" }}>
      {ActiveSection && <ActiveSection {...sectionPropsBase} />}

      </div>
    </div>
  );
}
