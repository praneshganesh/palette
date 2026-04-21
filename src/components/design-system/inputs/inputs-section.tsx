"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSTextInput } from "./text-input";
import type { InputVariant } from "./text-input";
import { DSSelect } from "./select";
import { DSMultiSelect } from "./multi-select";
import { DSSearchSelect } from "./search-select";
import { DSCheckbox } from "./checkbox";
import { DSRadioGroup } from "./radio";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";

interface InputsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MailIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" />
  </svg>
);

const LockIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const UserIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const CalendarIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const EyeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const AlertCircleIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckCircleIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const selectOptions = [
  { value: "opt1", label: "Option One" },
  { value: "opt2", label: "Option Two" },
  { value: "opt3", label: "Option Three" },
  { value: "opt4", label: "Option Four" },
  { value: "opt5", label: "Option Five", disabled: true },
];

const multiSelectOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
];

const searchSelectOptions = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
  { value: "au", label: "Australia", description: "Oceania" },
  { value: "ae", label: "United Arab Emirates", description: "Middle East" },
  { value: "sg", label: "Singapore", description: "Asia" },
  { value: "ca", label: "Canada", description: "North America" },
];

export function InputsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: InputsSectionProps) {
  const comp = system.components;
  const [heroInputValue, setHeroInputValue] = useState("");

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

  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: 12,
    padding: 24,
  };

  return (
    <motion.section
      id="comp-inputs"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Inputs &amp; Selects</p>
      <p style={sectionDesc}>
        Form inputs are the primary way users enter and modify data. Each variant
        provides clear visual feedback through focus rings, validation states, and
        accessible labelling to reduce errors and speed up task completion.
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
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 360 }}>
            <DSTextInput
              system={system}
              palette={palette}
              label={content.formFields.ownerLabel}
              placeholder={content.formFields.ownerPlaceholder}
              prefixIcon={<UserIcon size={15} />}
              value={heroInputValue}
              onChange={setHeroInputValue}
              fullWidth
            />
            <DSSelect
              system={system}
              palette={palette}
              label="Category"
              placeholder="Select category..."
              options={content.formFields.categories.map((c) => ({ value: c.toLowerCase().replace(/\s+/g, "-"), label: c }))}
              fullWidth
            />
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
          {tokenRow("Border Radius", comp.input.borderRadius || comp.button.borderRadius)}
          {tokenRow("Padding Y", comp.input.paddingY || "8px")}
          {tokenRow("Padding X", comp.input.paddingX || "14px")}
          {tokenRow("Font Size", comp.input.fontSize || "13px")}
          {tokenRow("Border Color", palette.border)}
          {tokenRow("Focus Ring", palette.primary)}
        </div>
      </div>

      {/* ──── Input Variants ──── */}
      <div style={subsectionLabel}>Input Variants</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
        Three visual variants to match different contexts. <strong style={{ color: palette.textPrimary }}>Default</strong> uses
        a visible border, <strong style={{ color: palette.textPrimary }}>Filled</strong> uses a background tint, and{" "}
        <strong style={{ color: palette.textPrimary }}>Outlined</strong> adds stronger border emphasis.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {(["default", "filled", "outlined"] as InputVariant[]).map((v, i) => (
          <div key={v} style={{ ...showcaseBox, textAlign: "center" }}>
            <div
              style={{
                width: 24, height: 24, borderRadius: "50%",
                backgroundColor: palette.primary + "15", color: palette.primary,
                fontSize: 12, fontWeight: 700,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}
            >
              {i + 1}
            </div>
            <div style={{ marginBottom: 12 }}>
              <DSTextInput
                system={system}
                palette={palette}
                variant={v}
                placeholder={`${v.charAt(0).toUpperCase() + v.slice(1)} input`}
                fullWidth
              />
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary, textTransform: "capitalize" }}>
              {v} variant
            </div>
          </div>
        ))}
      </div>

      {/* ──── States ──── */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <DSTextInput
            system={system}
            palette={palette}
            label="Default"
            placeholder="Type here..."
            fullWidth
          />
        </div>
        <div style={showcaseBox}>
          <DSTextInput
            system={system}
            palette={palette}
            label="Error State"
            defaultValue="invalid@"
            state="error"
            helperText="Please enter a valid email address"
            suffixIcon={<AlertCircleIcon size={15} />}
            fullWidth
          />
        </div>
        <div style={showcaseBox}>
          <DSTextInput
            system={system}
            palette={palette}
            label="Success State"
            defaultValue="user@example.com"
            state="success"
            helperText="Email verified successfully"
            suffixIcon={<CheckCircleIcon size={15} />}
            fullWidth
          />
        </div>
        <div style={showcaseBox}>
          <DSTextInput
            system={system}
            palette={palette}
            label="Disabled"
            defaultValue="Cannot edit"
            disabled
            fullWidth
          />
        </div>
        <div style={showcaseBox}>
          <DSTextInput
            system={system}
            palette={palette}
            label="Read Only"
            defaultValue="For display only"
            readOnly
            fullWidth
          />
        </div>
        <div style={showcaseBox}>
          <DSTextInput
            system={system}
            palette={palette}
            label="With Helper"
            placeholder="Enter value..."
            helperText="This is a helpful description"
            fullWidth
          />
        </div>
      </div>

      {/* ──── With Icons ──── */}
      <div style={subsectionLabel}>With Icons</div>
      <div
        style={{
          ...showcaseBox,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "flex-end",
        }}
      >
        <DSTextInput
          system={system}
          palette={palette}
          label="Search"
          placeholder="Search..."
          prefixIcon={<SearchIcon size={15} />}
        />
        <DSTextInput
          system={system}
          palette={palette}
          label="Email"
          placeholder="you@example.com"
          prefixIcon={<MailIcon size={15} />}
        />
        <DSTextInput
          system={system}
          palette={palette}
          label="Password"
          placeholder="Enter password"
          prefixIcon={<LockIcon size={15} />}
          suffixIcon={<EyeIcon size={15} />}
        />
        <DSTextInput
          system={system}
          palette={palette}
          label="Clearable"
          placeholder="Type to clear..."
          defaultValue="Clearable text"
          clearable
        />
      </div>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div
        style={{
          ...showcaseBox,
          display: "flex",
          alignItems: "flex-end",
          gap: 16,
        }}
      >
        <DSTextInput system={system} palette={palette} size="sm" label="Small" placeholder="Small input" />
        <DSTextInput system={system} palette={palette} size="md" label="Medium" placeholder="Medium input" />
        <DSTextInput system={system} palette={palette} size="lg" label="Large" placeholder="Large input" />
      </div>

      {/* ──── Textarea ──── */}
      <div style={subsectionLabel}>Textarea</div>
      <div style={{ ...showcaseBox, display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
        <DSTextInput
          system={system}
          palette={palette}
          label={content.formFields.descriptionLabel}
          placeholder={content.formFields.descriptionPlaceholder}
          multiline
          rows={4}
          fullWidth
        />
        <DSTextInput
          system={system}
          palette={palette}
          label="Notes (Error)"
          placeholder="Add notes..."
          multiline
          rows={3}
          state="error"
          helperText="This field is required"
          fullWidth
        />
      </div>

      {/* ──── Select Dropdown ──── */}
      <div style={subsectionLabel}>Select Dropdown</div>
      <div
        style={{
          ...showcaseBox,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "flex-end",
        }}
      >
        <DSSelect
          system={system}
          palette={palette}
          label="Default Select"
          placeholder="Choose..."
          options={selectOptions}
        />
        <DSSelect
          system={system}
          palette={palette}
          label="With Error"
          placeholder="Required..."
          options={selectOptions}
          error
          helperText="Selection is required"
        />
        <DSSelect
          system={system}
          palette={palette}
          label="Disabled"
          placeholder="Cannot change"
          options={selectOptions}
          defaultValue="opt1"
          disabled
        />
      </div>

      {/* ──── Multi-Select ──── */}
      <div style={subsectionLabel}>Multi-Select with Chips</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
        Multi-select dropdowns display chosen items as removable chips. Includes built-in search
        filtering and a &ldquo;clear all&rdquo; action for quick resets.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <DSMultiSelect
            system={system}
            palette={palette}
            label="Technologies"
            placeholder="Select frameworks..."
            options={multiSelectOptions}
            defaultValue={["react", "next"]}
            fullWidth
          />
        </div>
        <div style={showcaseBox}>
          <DSMultiSelect
            system={system}
            palette={palette}
            label="With Error"
            placeholder="Select at least one..."
            options={multiSelectOptions}
            error
            helperText="Please select at least one technology"
            fullWidth
          />
        </div>
      </div>

      {/* ──── Search Select ──── */}
      <div style={subsectionLabel}>Search Select</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
        Searchable dropdowns let users filter through long lists by typing. Ideal for country pickers,
        user selectors, and any dataset with more than ~10 options.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <DSSearchSelect
            system={system}
            palette={palette}
            label="Country"
            placeholder="Search countries..."
            options={searchSelectOptions}
            fullWidth
          />
        </div>
        <div style={showcaseBox}>
          <DSSearchSelect
            system={system}
            palette={palette}
            label="Pre-selected"
            options={searchSelectOptions}
            defaultValue="ae"
            fullWidth
          />
        </div>
      </div>

      {/* ──── Checkbox ──── */}
      <div style={subsectionLabel}>Checkbox</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>States</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <DSCheckbox system={system} palette={palette} label="Unchecked" />
            <DSCheckbox system={system} palette={palette} label="Checked" defaultChecked />
            <DSCheckbox system={system} palette={palette} label="Indeterminate" indeterminate />
            <DSCheckbox system={system} palette={palette} label="Disabled" disabled />
            <DSCheckbox system={system} palette={palette} label="Disabled checked" disabled defaultChecked />
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Sizes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <DSCheckbox system={system} palette={palette} size="sm" label="Small checkbox" defaultChecked />
            <DSCheckbox system={system} palette={palette} size="md" label="Medium checkbox" defaultChecked />
            <DSCheckbox system={system} palette={palette} size="lg" label="Large checkbox" defaultChecked />
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Descriptions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <DSCheckbox system={system} palette={palette} label="Email notifications" description="Receive weekly digest emails" defaultChecked />
            <DSCheckbox system={system} palette={palette} label="SMS alerts" description="Get critical alerts via text" />
            <DSCheckbox system={system} palette={palette} label="Push notifications" description="Desktop and mobile alerts" error />
          </div>
        </div>
      </div>

      {/* ──── Radio ──── */}
      <div style={subsectionLabel}>Radio Group</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Vertical (Default)</div>
          <DSRadioGroup
            system={system}
            palette={palette}
            defaultValue="opt1"
            options={[
              { value: "opt1", label: "Option One" },
              { value: "opt2", label: "Option Two" },
              { value: "opt3", label: "Option Three" },
              { value: "opt4", label: "Disabled", disabled: true },
            ]}
          />
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Horizontal</div>
          <DSRadioGroup
            system={system}
            palette={palette}
            defaultValue="sm"
            direction="horizontal"
            options={[
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
            ]}
          />
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Sizes</div>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <DSRadioGroup system={system} palette={palette} size="sm" defaultValue="a" options={[{ value: "a", label: "Sm" }]} />
              <DSRadioGroup system={system} palette={palette} size="md" defaultValue="a" options={[{ value: "a", label: "Md" }]} />
              <DSRadioGroup system={system} palette={palette} size="lg" defaultValue="a" options={[{ value: "a", label: "Lg" }]} />
            </div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Descriptions</div>
          <DSRadioGroup
            system={system}
            palette={palette}
            defaultValue="standard"
            options={[
              { value: "standard", label: "Standard", description: "Free delivery in 5–7 days" },
              { value: "express", label: "Express", description: "Delivery in 1–2 days" },
              { value: "overnight", label: "Overnight", description: "Next-day delivery" },
            ]}
          />
        </div>
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div
        style={{
          ...showcaseBox,
          borderRadius: system.spacing.radius.lg,
          padding: 32,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>
          {content.formFields.projectTitle || "New Record"}
        </div>
        <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 24 }}>
          Fill in the details below to create a new entry
        </div>
        <div style={{ height: 1, backgroundColor: palette.border, marginBottom: 24 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <DSTextInput
            system={system}
            palette={palette}
            label={content.formFields.projectTitle}
            placeholder={content.formFields.placeholder}
            prefixIcon={<CalendarIcon size={15} />}
            fullWidth
          />
          <DSSelect
            system={system}
            palette={palette}
            label="Category"
            placeholder="Select..."
            options={content.formFields.categories.map((c) => ({ value: c.toLowerCase().replace(/\s+/g, "-"), label: c }))}
            fullWidth
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <DSTextInput
            system={system}
            palette={palette}
            label={content.formFields.ownerLabel}
            placeholder={content.formFields.ownerPlaceholder}
            prefixIcon={<UserIcon size={15} />}
            fullWidth
          />
          <DSSearchSelect
            system={system}
            palette={palette}
            label="Region"
            placeholder="Search regions..."
            options={searchSelectOptions}
            fullWidth
          />
        </div>
        <DSTextInput
          system={system}
          palette={palette}
          label={content.formFields.descriptionLabel}
          placeholder={content.formFields.descriptionPlaceholder}
          multiline
          rows={3}
          fullWidth
        />
        <div style={{ marginTop: 20 }}>
          <DSCheckbox
            system={system}
            palette={palette}
            label="I confirm the information above is accurate"
            description="By checking this box, you agree to the terms and conditions"
          />
        </div>
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use input fields"
          description="Inputs allow users to enter and edit text or data. They are essential in:"
          items={[
            "Forms and data entry screens",
            "Search bars and filter panels",
            "Settings and profile pages",
            "Inline editing in tables or cards",
            "Dialog and modal content",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Label and helper text placement"
          description="Consistent labelling improves form completion rates and accessibility:"
          items={[
            "Always provide a visible label above the input",
            "Use placeholder text for format hints, not as labels",
            "Place helper text below the input for guidance",
            "Error messages should replace helper text on validation failure",
            "Use required indicators (*) sparingly and consistently",
            "Group related inputs with clear section headings",
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
            text: "Use clear, descriptive labels above each input. Include helper text for complex fields.",
            visual: (
              <div style={{ width: "100%", maxWidth: 240 }}>
                <DSTextInput
                  system={system}
                  palette={palette}
                  label="Email address"
                  placeholder="you@company.com"
                  helperText="We'll never share your email"
                  size="sm"
                  fullWidth
                />
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't use placeholder text as the only label. It disappears on focus and reduces accessibility.",
            visual: (
              <div style={{ width: "100%", maxWidth: 240 }}>
                <DSTextInput
                  system={system}
                  palette={palette}
                  placeholder="Email address"
                  size="sm"
                  fullWidth
                />
              </div>
            ),
          },
          {
            type: "do",
            text: "Show validation feedback inline with specific, actionable error messages.",
            visual: (
              <div style={{ width: "100%", maxWidth: 240 }}>
                <DSTextInput
                  system={system}
                  palette={palette}
                  label="Password"
                  defaultValue="abc"
                  state="error"
                  helperText="Must be at least 8 characters"
                  size="sm"
                  fullWidth
                />
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't validate on every keystroke. Wait for blur or submit to avoid frustrating users.",
            visual: (
              <div style={{ width: "100%", maxWidth: 240 }}>
                <DSTextInput
                  system={system}
                  palette={palette}
                  label="Username"
                  defaultValue="a"
                  state="error"
                  helperText="Too short! Invalid! Try again!"
                  size="sm"
                  fullWidth
                />
              </div>
            ),
          },
        ]}
      />

      {/* ──── Anatomy — Text Input ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Label", description: "Identifies the purpose of the input field", x: 10, y: 15 },
          { id: 2, label: "Container", description: "Background shape with border and padding", x: 5, y: 55 },
          { id: 3, label: "Input area", description: "Where text is entered or displayed", x: 50, y: 50 },
          { id: 4, label: "Prefix icon", description: "Leading icon for context (optional)", x: 20, y: 55 },
          { id: 5, label: "Helper text", description: "Guidance or validation message below", x: 10, y: 92 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", width: 300 }}>
            <div style={{ marginBottom: 6 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: palette.textPrimary,
                  opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                Email address
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 40,
                padding: "0 14px",
                backgroundColor: palette.surface,
                border: `1.5px solid ${highlighted === 2 ? palette.primary : palette.border}`,
                borderRadius: comp.input.borderRadius || comp.button.borderRadius,
                transition: "all 0.2s",
              }}
            >
              <span style={{
                display: "flex",
                color: palette.textSecondary,
                opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                <MailIcon size={15} />
              </span>
              <span style={{
                flex: 1,
                fontSize: 13,
                color: palette.textSecondary,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                you@company.com
              </span>
            </div>
            <div style={{ marginTop: 4 }}>
              <span style={{
                fontSize: 11,
                color: palette.textSecondary,
                opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                We&apos;ll never share your email
              </span>
            </div>
            {highlighted === 2 && (
              <div style={{
                position: "absolute",
                left: -3,
                right: -3,
                top: 21,
                bottom: 17,
                border: `2px dashed ${palette.primary}`,
                borderRadius: comp.input.borderRadius || comp.button.borderRadius,
                pointerEvents: "none",
              }} />
            )}
          </div>
        )}
      />

      {/* ──── Anatomy — Select ──── */}
      <div style={{ ...subsectionLabel, marginTop: 32 }}>Select Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Trigger", description: "The clickable area that opens the dropdown", x: 10, y: 30 },
          { id: 2, label: "Selected value", description: "Displays the current selection or placeholder", x: 45, y: 30 },
          { id: 3, label: "Chevron", description: "Arrow indicator showing expandable state", x: 90, y: 30 },
          { id: 4, label: "Dropdown menu", description: "Floating list of options", x: 10, y: 75 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", width: 260 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 40,
                padding: "0 14px",
                backgroundColor: palette.surface,
                border: `1.5px solid ${palette.border}`,
                borderRadius: comp.input.borderRadius || comp.button.borderRadius,
                opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              <span style={{
                flex: 1,
                fontSize: 13,
                color: palette.textPrimary,
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                Option Two
              </span>
              <span style={{
                display: "flex",
                color: palette.textSecondary,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            {highlighted === 1 && (
              <div style={{
                position: "absolute", inset: -3,
                border: `2px dashed ${palette.primary}`,
                borderRadius: comp.input.borderRadius || comp.button.borderRadius,
                pointerEvents: "none",
              }} />
            )}
            <div style={{
              marginTop: 4,
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: comp.input.borderRadius || comp.button.borderRadius,
              boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
              overflow: "hidden",
              opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
              transition: "opacity 0.2s",
            }}>
              {["Option One", "Option Two", "Option Three"].map((o, i) => (
                <div key={o} style={{
                  padding: "8px 14px",
                  fontSize: 13,
                  color: i === 1 ? palette.primary : palette.textPrimary,
                  backgroundColor: i === 1 ? palette.primary + "10" : "transparent",
                }}>
                  {o}
                </div>
              ))}
            </div>
          </div>
        )}
      />

      {/* ──── Anatomy — Checkbox ──── */}
      <div style={{ ...subsectionLabel, marginTop: 32 }}>Checkbox Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Box", description: "The checkable square container", x: 20, y: 30 },
          { id: 2, label: "Check mark", description: "Visual indicator of checked state", x: 25, y: 70 },
          { id: 3, label: "Label", description: "Text describing the option", x: 60, y: 30 },
          { id: 4, label: "Description", description: "Optional secondary text below label", x: 60, y: 75 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{
              width: 20, height: 20,
              borderRadius: system.spacing.radius.sm || "4px",
              border: `2px solid ${palette.primary}`,
              backgroundColor: palette.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: highlighted === 1 || highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
              transition: "opacity 0.2s",
              flexShrink: 0,
              marginTop: 2,
            }}>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div style={{
                fontSize: 13, fontWeight: 500, color: palette.textPrimary,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                Email notifications
              </div>
              <div style={{
                fontSize: 11, color: palette.textSecondary, marginTop: 2,
                opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                Receive weekly digest emails
              </div>
            </div>
          </div>
        )}
      />

    </motion.section>
  );
}
