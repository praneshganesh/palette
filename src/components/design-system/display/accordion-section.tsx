"use client";

import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSAccordion } from "./accordion";
import type { AccordionVariant } from "./accordion";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface AccordionSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const FileIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
);

const SettingsIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const HelpIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LockIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export function AccordionSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: AccordionSectionProps) {
  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const faqItems = [
    { id: "faq-1", title: `What is ${content.orgName}?`, content: `${content.orgName} is a comprehensive platform designed to streamline your operations. ${content.orgSubtitle} provides tools for managing and monitoring all aspects of your workflow.` },
    { id: "faq-2", title: "How do I get started?", content: "Getting started is easy. Sign up for an account, complete the onboarding wizard, and you'll be guided through configuring your workspace. Most users are fully set up within 15 minutes." },
    { id: "faq-3", title: "What support options are available?", content: "We offer 24/7 email support, live chat during business hours, and a comprehensive knowledge base. Premium plans include dedicated account managers and priority phone support." },
    { id: "faq-4", title: "Can I integrate with other tools?", content: "Yes! We support integrations with over 100 popular tools and services. Our REST API and webhook system allow you to build custom integrations for your specific needs." },
  ];

  const iconItems = [
    { id: "icon-1", title: "General Information", content: "Access general platform information, feature documentation, and getting started guides.", icon: <FileIcon /> },
    { id: "icon-2", title: "Account Settings", content: "Manage your profile, notification preferences, and team member access controls.", icon: <SettingsIcon /> },
    { id: "icon-3", title: "Help & Support", content: "Find answers to common questions, contact support, and browse our knowledge base.", icon: <HelpIcon /> },
    { id: "icon-4", title: "Security & Privacy", content: "Review security settings, data handling policies, and access your audit logs.", icon: <LockIcon /> },
  ];

  return (
    <motion.section
      id="comp-accordion"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Accordion</p>
      <p style={sectionDesc}>
        Accordions organise content into collapsible sections, letting users
        reveal information progressively. They reduce cognitive load by keeping
        the page scannable while making detail available on demand.
      </p>

      {/* ──── Default ──── */}
      <div style={subsectionLabel}>Default</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 }}>
          <DSAccordion system={system} palette={palette} items={faqItems} defaultOpen={["faq-1"]} />
        </div>
        <TokensGrid
          palette={palette}
          tokens={[
            { label: "Border Radius", value: system.spacing.radius.md },
            { label: "Padding", value: "16px" },
            { label: "Icon Size", value: "16px" },
            { label: "Divider Color", value: palette.border },
            { label: "Header Font Weight", value: "500" },
            { label: "Content Color", value: palette.textSecondary },
          ]}
        />
      </div>

      {/* ──── All Variants ──── */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {(["default", "bordered", "separated", "filled"] as AccordionVariant[]).map((v) => (
          <div key={v}>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12, textTransform: "capitalize" }}>{v}</div>
            <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 20 }}>
              <DSAccordion
                system={system}
                palette={palette}
                items={faqItems.slice(0, 3)}
                variant={v}
                defaultOpen={[faqItems[0].id]}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ──── With Icons ──── */}
      <div style={subsectionLabel}>With Icons</div>
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 }}>
        <DSAccordion system={system} palette={palette} items={iconItems} variant="separated" />
      </div>

      {/* ──── Allow Multiple ──── */}
      <div style={subsectionLabel}>Allow Multiple Open</div>
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 }}>
        <DSAccordion
          system={system}
          palette={palette}
          items={faqItems}
          variant="bordered"
          allowMultiple
          defaultOpen={["faq-1", "faq-3"]}
        />
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use accordions"
          description="Accordions help manage complex content in a structured, scannable way:"
          items={[
            "FAQ sections and help centres",
            "Settings and configuration panels",
            "Content-heavy pages with distinct sections",
            "Navigation menus with sub-categories",
            "Form sections in multi-step flows",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Behaviour options"
          description="Configure the accordion behaviour to match the context:"
          items={[
            "Single open — Only one section at a time (default)",
            "Multiple open — Allow several sections simultaneously",
            "Default open — Pre-expand important sections",
            "With icons — Add visual cues to each section header",
            "Nested — Place accordions inside accordion content",
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
            text: "Use clear, descriptive titles that tell users what content each section contains.",
            visual: (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: palette.textPrimary, padding: "6px 0", borderBottom: `1px solid ${palette.border}` }}>Shipping information ▸</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: palette.textPrimary, padding: "6px 0", borderBottom: `1px solid ${palette.border}` }}>Return policy ▸</div>
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't hide critical information behind accordions. Important content should be visible by default.",
            visual: (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: palette.danger, padding: "6px 0", borderBottom: `1px solid ${palette.border}` }}>⚠ Terms of service ▸</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: palette.danger, padding: "6px 0" }}>⚠ Pricing details ▸</div>
              </div>
            ),
          },
          {
            type: "do",
            text: "Keep the number of accordion items reasonable (3-8) to maintain scannability.",
            visual: (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} style={{ height: 14, borderRadius: 3, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }} />
                ))}
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't nest more than two levels of accordions. Deeply nested content is hard to navigate.",
            visual: (
              <div style={{ padding: 6, border: `1px solid ${palette.border}`, borderRadius: 4 }}>
                <div style={{ padding: 4, border: `1px solid ${palette.border}`, borderRadius: 3 }}>
                  <div style={{ padding: 3, border: `1px dashed ${palette.danger}`, borderRadius: 2, fontSize: 7, color: palette.danger, textAlign: "center" }}>Too deep</div>
                </div>
              </div>
            ),
          },
        ]}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Header Height", value: "48px (min)" },
          { label: "Content Padding", value: "0 16px 16px" },
          { label: "Icon Size", value: "16 × 16px" },
          { label: "Border Radius", value: system.spacing.radius.md },
          { label: "Chevron Size", value: "16 × 16px" },
          { label: "Divider Thickness", value: "1px" },
          { label: "Gap (separated variant)", value: "8px" },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Header / Trigger", description: "Clickable row that toggles the panel open/closed", x: 50, y: 10 },
          { id: 2, label: "Icon (optional)", description: "Leading icon for visual context", x: 10, y: 30 },
          { id: 3, label: "Chevron indicator", description: "Rotates to indicate open/closed state", x: 90, y: 30 },
          { id: 4, label: "Content panel", description: "Expandable area with section content", x: 50, y: 75 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ width: 300, position: "relative" }}>
            <div style={{ borderBottom: `1px solid ${palette.border}` }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s", color: palette.primary, display: "flex" }}>
                    <FileIcon />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>Section Title</span>
                </div>
                <span style={{ opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s", color: palette.textSecondary, transform: "rotate(180deg)", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </div>
              <div
                style={{
                  paddingBottom: 16,
                  fontSize: 12,
                  color: palette.textSecondary,
                  lineHeight: 1.6,
                  opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                The expanded content of this accordion section with detailed information.
              </div>
            </div>
            <div style={{ padding: "12px 0", opacity: 0.4 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: palette.primary, display: "flex" }}><SettingsIcon /></span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>Collapsed Section</span>
                </div>
                <span style={{ color: palette.textSecondary, display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </div>
            </div>
          </div>
        )}
      />
    </motion.section>
  );
}
