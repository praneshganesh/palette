"use client";

import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSButton } from "./button";
import type { ButtonVariant, ButtonSize } from "./button";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ButtonsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const PlusIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ArrowRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const DownloadIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const ShareIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const TrashIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const MoreIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

const HeartIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function ButtonsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ButtonsSectionProps) {
  const comp = system.components;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}
      <br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>
        → {value}
      </span>
    </div>
  );

  return (
    <motion.section
      id="comp-buttons"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Buttons</p>
      <p style={sectionDesc}>
        The primary interaction affordance. Each variant maps to a distinct
        level of visual hierarchy, ensuring the most important action always
        stands out while secondary actions recede gracefully.
      </p>

      {/* ──── Hero Preview + Tokens ──── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div
          style={{
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            padding: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 140,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: palette.surfaceMuted,
              borderRadius: system.spacing.radius.md,
              padding: "10px 14px",
              border: `1px solid ${palette.border}`,
            }}
          >
            <DSButton system={system} palette={palette} variant="filled">
              Save Changes
            </DSButton>
            <DSButton system={system} palette={palette} variant="outlined">
              Export
            </DSButton>
            <div style={{ width: 1, height: 24, backgroundColor: palette.border }} />
            <DSButton system={system} palette={palette} variant="outlined" iconOnly leadingIcon={<MoreIcon />} />
          </div>
        </div>

        <div
          style={{
            backgroundColor: palette.surfaceMuted,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.md,
            padding: 24,
            alignSelf: "start",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>
            Design Tokens
          </p>
          {tokenRow("Border Radius", comp.button.borderRadius)}
          {tokenRow("Padding Y", comp.button.paddingY)}
          {tokenRow("Padding X", comp.button.paddingX)}
          {tokenRow("Font Weight", comp.button.fontWeight)}
          {tokenRow("Primary BG", palette.primary)}
          {tokenRow("Primary Text", palette.background)}
        </div>
      </div>

      {/* ──── Button Styles (Emphasis Hierarchy) ──── */}
      <div style={subsectionLabel}>Button Styles</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
        Five button styles in order of visual emphasis. Use <strong style={{ color: palette.textPrimary }}>filled</strong> for
        the highest-priority actions, stepping down to <strong style={{ color: palette.textPrimary }}>text</strong> for the least prominent.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        {(["filled", "elevated", "tonal", "outlined", "text"] as ButtonVariant[]).map((v, i) => (
          <div
            key={v}
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 12,
              padding: 20,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 24, height: 24, borderRadius: "50%",
                backgroundColor: palette.primary + "15", color: palette.primary,
                fontSize: 12, fontWeight: 700,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12,
              }}
            >
              {i + 1}
            </div>
            <div style={{ marginBottom: 12 }}>
              <DSButton system={system} palette={palette} variant={v}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </DSButton>
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary }}>
              {v === "filled" && "Highest emphasis"}
              {v === "elevated" && "Medium-high emphasis"}
              {v === "tonal" && "Medium emphasis"}
              {v === "outlined" && "Medium-low emphasis"}
              {v === "text" && "Lowest emphasis"}
            </div>
          </div>
        ))}
      </div>

      {/* ──── Special Variants ──── */}
      <div style={subsectionLabel}>Special Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Double Border</div>
          <DSButton system={system} palette={palette} variant="double-border">Book A Test</DSButton>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 12 }}>Premium CTA with outer ring</div>
        </div>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Danger</div>
          <DSButton system={system} palette={palette} variant="danger" leadingIcon={<TrashIcon />}>Delete Record</DSButton>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 12 }}>Destructive actions</div>
        </div>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Success</div>
          <DSButton system={system} palette={palette} variant="success" leadingIcon={<CheckIcon />}>Approve</DSButton>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 12 }}>Positive confirmations</div>
        </div>
      </div>

      {/* ──── With Icons ──── */}
      <div style={subsectionLabel}>With Icons</div>
      <div
        style={{
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: 12, padding: 24, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center",
        }}
      >
        <DSButton system={system} palette={palette} variant="filled" leadingIcon={<PlusIcon />}>Leading Icon</DSButton>
        <DSButton system={system} palette={palette} variant="filled" trailingIcon={<ArrowRightIcon />}>Trailing Icon</DSButton>
        <DSButton system={system} palette={palette} variant="filled" leadingIcon={<DownloadIcon />} trailingIcon={<ArrowRightIcon />}>Both Icons</DSButton>
        <div style={{ width: 1, height: 32, backgroundColor: palette.border }} />
        <DSButton system={system} palette={palette} variant="outlined" leadingIcon={<HeartIcon />}>Favorite</DSButton>
        <DSButton system={system} palette={palette} variant="tonal" leadingIcon={<ShareIcon />}>Share</DSButton>
        <DSButton system={system} palette={palette} variant="text" trailingIcon={<ArrowRightIcon />}>Learn more</DSButton>
      </div>

      {/* ──── Icon Only ──── */}
      <div style={subsectionLabel}>Icon Only</div>
      <div
        style={{
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: 12, padding: 24, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center",
        }}
      >
        {(["filled", "outlined", "tonal", "elevated", "text"] as ButtonVariant[]).map((v) => (
          <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <DSButton system={system} palette={palette} variant={v} iconOnly leadingIcon={<PlusIcon />} />
            <div style={{ fontSize: 10, color: palette.textSecondary, textTransform: "capitalize" }}>{v}</div>
          </div>
        ))}
        <div style={{ width: 1, height: 40, backgroundColor: palette.border }} />
        {(["sm", "md", "lg"] as ButtonSize[]).map((sz) => (
          <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <DSButton system={system} palette={palette} variant="filled" size={sz} iconOnly leadingIcon={<PlusIcon size={sz === "sm" ? 14 : sz === "lg" ? 18 : 16} />} />
            <div style={{ fontSize: 10, color: palette.textSecondary }}>{sz}</div>
          </div>
        ))}
      </div>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div
        style={{
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: 12, padding: 24, display: "flex", alignItems: "center", gap: 12,
        }}
      >
        <DSButton system={system} palette={palette} variant="filled" size="sm">Small</DSButton>
        <DSButton system={system} palette={palette} variant="filled" size="md">Medium</DSButton>
        <DSButton system={system} palette={palette} variant="filled" size="lg">Large</DSButton>
        <div style={{ width: 1, height: 40, backgroundColor: palette.border }} />
        <DSButton system={system} palette={palette} variant="outlined" size="sm">Small</DSButton>
        <DSButton system={system} palette={palette} variant="outlined" size="md">Medium</DSButton>
        <DSButton system={system} palette={palette} variant="outlined" size="lg">Large</DSButton>
      </div>

      {/* ──── States ──── */}
      <div style={subsectionLabel}>States</div>
      <div
        style={{
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: 12, padding: 24, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center",
        }}
      >
        {[
          { label: "Default", props: {} },
          { label: "Disabled", props: { disabled: true } },
          { label: "Loading", props: { loading: true } },
        ].map(({ label, props }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <DSButton system={system} palette={palette} variant="filled" {...props}>{label}</DSButton>
            <div style={{ fontSize: 10, color: palette.textSecondary }}>{label}</div>
          </div>
        ))}
        <div style={{ width: 1, height: 48, backgroundColor: palette.border }} />
        {[
          { label: "Default", props: {} },
          { label: "Disabled", props: { disabled: true } },
          { label: "Loading", props: { loading: true } },
        ].map(({ label, props }) => (
          <div key={`o-${label}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <DSButton system={system} palette={palette} variant="outlined" {...props}>{label}</DSButton>
            <div style={{ fontSize: 10, color: palette.textSecondary }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ──── Full Width ──── */}
      <div style={subsectionLabel}>Full Width</div>
      <div
        style={{
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 12, maxWidth: 400,
        }}
      >
        <DSButton system={system} palette={palette} variant="filled" fullWidth>Submit Application</DSButton>
        <DSButton system={system} palette={palette} variant="outlined" fullWidth>Save as Draft</DSButton>
        <DSButton system={system} palette={palette} variant="text" fullWidth>Cancel</DSButton>
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div
        style={{
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg, padding: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>
              {content.formFields.projectTitle || "Project Details"}
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary }}>Review and manage your project settings</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <DSButton system={system} palette={palette} variant="outlined" leadingIcon={<ShareIcon />}>Share</DSButton>
            <DSButton system={system} palette={palette} variant="filled" leadingIcon={<DownloadIcon />}>Export</DSButton>
          </div>
        </div>
        <div style={{ height: 1, backgroundColor: palette.border, marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <DSButton system={system} palette={palette} variant="tonal" size="sm">All</DSButton>
            <DSButton system={system} palette={palette} variant="text" size="sm">Active</DSButton>
            <DSButton system={system} palette={palette} variant="text" size="sm">Archived</DSButton>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <DSButton system={system} palette={palette} variant="danger" size="sm" leadingIcon={<TrashIcon size={14} />}>Delete</DSButton>
            <DSButton system={system} palette={palette} variant="outlined" size="sm" iconOnly leadingIcon={<MoreIcon />} />
          </div>
        </div>
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use buttons"
          description="Buttons communicate actions that people can take. They are typically placed throughout the UI, in places like:"
          items={[
            "Dialogs and modal windows",
            "Forms and form steps",
            "Cards and card footers",
            "Toolbars and action bars",
            "Empty states and onboarding",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right variant"
          description="Use the emphasis hierarchy to guide which button style to use:"
          items={[
            "Filled \u2014 Primary action (submit, confirm, save)",
            "Tonal \u2014 Secondary action (filter, toggle)",
            "Elevated \u2014 Important but not primary (floating CTAs)",
            "Outlined \u2014 Neutral option (cancel, back)",
            "Text \u2014 Lowest emphasis (skip, learn more)",
            "Double Border \u2014 Premium CTAs (book, buy, reserve)",
          ]}
        />
      </div>

      {/* ──── Do's and Don'ts ──── */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines
        palette={palette}
        items={[
          {
            type: "do",
            text: "Use filled buttons for the most important action on a screen. One filled button per section.",
            visual: (
              <div style={{ display: "flex", gap: 8 }}>
                <DSButton system={system} palette={palette} variant="filled" size="sm">Submit</DSButton>
                <DSButton system={system} palette={palette} variant="outlined" size="sm">Cancel</DSButton>
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't clutter your UI with too many buttons. Consider text links, chips, or icon buttons instead.",
            visual: (
              <div style={{ display: "flex", gap: 6 }}>
                <DSButton system={system} palette={palette} variant="filled" size="sm">Submit</DSButton>
                <DSButton system={system} palette={palette} variant="filled" size="sm">Save</DSButton>
                <DSButton system={system} palette={palette} variant="filled" size="sm">Export</DSButton>
                <DSButton system={system} palette={palette} variant="filled" size="sm">Print</DSButton>
              </div>
            ),
          },
          {
            type: "do",
            text: "A button container's width should dynamically fit its label text. It can also be made responsive.",
            visual: (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <DSButton system={system} palette={palette} variant="filled" size="sm">OK</DSButton>
                <DSButton system={system} palette={palette} variant="filled" size="sm">Save Changes</DSButton>
              </div>
            ),
          },
          {
            type: "dont",
            text: "A button container's width shouldn't be narrower than its label text. Avoid truncation inside buttons.",
            visual: (
              <div style={{ width: 70, overflow: "hidden" }}>
                <DSButton system={system} palette={palette} variant="filled" size="sm">Save All Changes</DSButton>
              </div>
            ),
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Background shape with border radius and padding", x: 10, y: 50 },
          { id: 2, label: "Label text", description: "The primary text content of the button", x: 55, y: 15 },
          { id: 3, label: "Icon (optional)", description: "Leading or trailing icon element", x: 30, y: 90 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative" }}>
            <DSButton system={system} palette={palette} variant="filled" size="lg" leadingIcon={
              <span style={{ opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                <PlusIcon size={18} />
              </span>
            }>
              <span style={{ opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                Label text
              </span>
            </DSButton>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: comp.button.borderRadius, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />

      {/* Icon Button Anatomy */}
      <div style={{ ...subsectionLabel, marginTop: 32 }}>Icon Button Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Circular container with equal width and height", x: 10, y: 50 },
          { id: 2, label: "Icon", description: "Centered icon as the sole interactive element", x: 50, y: 15 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative" }}>
            <DSButton system={system} palette={palette} variant="filled" size="lg" iconOnly leadingIcon={
              <span style={{ opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                <PlusIcon size={18} />
              </span>
            } />
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: "50%", pointerEvents: "none" }} />
            )}
          </div>
        )}
      />

      {/* Double Border Anatomy */}
      <div style={{ ...subsectionLabel, marginTop: 32 }}>Double Border Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Outer ring", description: "Outline offset border for premium emphasis", x: 5, y: 50 },
          { id: 2, label: "Inner border", description: "Standard button border", x: 18, y: 90 },
          { id: 3, label: "Container", description: "Filled background area", x: 40, y: 15 },
          { id: 4, label: "Label text", description: "Button text content", x: 65, y: 90 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", padding: 8 }}>
            <DSButton system={system} palette={palette} variant="double-border" size="lg">
              <span style={{ opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                Book A Test
              </span>
            </DSButton>
          </div>
        )}
      />

      {/* ──── Button Hierarchy Example ──── */}
      <div style={subsectionLabel}>Button Hierarchy</div>
      <div
        style={{
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: 12, padding: 24,
        }}
      >
        <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 20, lineHeight: 1.6 }}>
          In a form or dialog, use a clear hierarchy: primary action (filled), secondary (outlined),
          and tertiary (text). This guides the user towards the intended action.
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingTop: 16, borderTop: `1px solid ${palette.border}` }}>
          <DSButton system={system} palette={palette} variant="text">Cancel</DSButton>
          <DSButton system={system} palette={palette} variant="outlined">Save Draft</DSButton>
          <DSButton system={system} palette={palette} variant="filled">Submit</DSButton>
        </div>
      </div>

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Container height (Small)", value: "32px" },
          { label: "Container height (Medium)", value: "40px" },
          { label: "Container height (Large)", value: "48px" },
          { label: "Container corner shape", value: comp.button.borderRadius },
          { label: "Horizontal padding (Small)", value: "14px" },
          { label: "Horizontal padding (Medium)", value: "20px" },
          { label: "Horizontal padding (Large)", value: "28px" },
          { label: "Icon size (Small)", value: "14px" },
          { label: "Icon size (Medium)", value: "16px" },
          { label: "Icon size (Large)", value: "18px" },
          { label: "Icon-label gap", value: "8px" },
          { label: "Font weight", value: comp.button.fontWeight },
          { label: "Icon-only container (Medium)", value: "40px × 40px" },
          { label: "Double-border outline offset", value: "3px" },
        ]}
      />
    </motion.section>
  );
}
