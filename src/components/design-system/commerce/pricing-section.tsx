"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface PricingSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

type Plan = { name: string; monthlyPrice: number; annualPrice: number; features: string[]; featured?: boolean; cta: string };

const plans: Plan[] = [
  { name: "Starter", monthlyPrice: 9, annualPrice: 7, features: ["5 projects", "1 GB storage", "Email support", "Basic analytics"], cta: "Get Started" },
  { name: "Pro", monthlyPrice: 29, annualPrice: 24, features: ["Unlimited projects", "50 GB storage", "Priority support", "Advanced analytics", "Custom domains", "API access"], featured: true, cta: "Start Free Trial" },
  { name: "Enterprise", monthlyPrice: 99, annualPrice: 79, features: ["Everything in Pro", "Unlimited storage", "24/7 phone support", "Custom integrations", "SSO & SAML", "SLA guarantee", "Dedicated manager"], cta: "Contact Sales" },
];

const comparisonFeatures = ["Projects", "Storage", "Support", "Analytics", "Custom domain", "API access", "SSO"];
const comparisonGrid: (string | boolean)[][] = [
  ["5", "1 GB", "Email", "Basic", false, false, false],
  ["Unlimited", "50 GB", "Priority", "Advanced", true, true, false],
  ["Unlimited", "Unlimited", "24/7 Phone", "Advanced", true, true, true],
];

export function PricingSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: PricingSectionProps) {
  const comp = system.components;
  const radius = comp.card.borderRadius || system.spacing.radius.lg;
  const btnRadius = comp.button.borderRadius || system.spacing.radius.md;
  const [isAnnual, setIsAnnual] = useState(false);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  return (
    <motion.section id="comp-pricing" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Pricing</p>
      <p style={sectionDesc}>
        Pricing components present plan tiers with monthly/annual toggles, feature lists,
        highlighted recommended plans, and comparison grids for informed decision-making.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0, backgroundColor: palette.surfaceMuted, borderRadius: 99, padding: 3, border: `1px solid ${palette.border}` }}>
              <button onClick={() => setIsAnnual(false)} style={{ padding: "6px 18px", borderRadius: 99, border: "none", backgroundColor: !isAnnual ? palette.surface : "transparent", color: !isAnnual ? palette.textPrimary : palette.textSecondary, fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: !isAnnual ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>Monthly</button>
              <button onClick={() => setIsAnnual(true)} style={{ padding: "6px 18px", borderRadius: 99, border: "none", backgroundColor: isAnnual ? palette.surface : "transparent", color: isAnnual ? palette.textPrimary : palette.textSecondary, fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: isAnnual ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>Annual</button>
            </div>
            {isAnnual && <span style={{ fontSize: 11, color: palette.success, fontWeight: 600, marginLeft: 10, alignSelf: "center" }}>Save 20%</span>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {plans.map(plan => {
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              return (
                <div key={plan.name} style={{
                  border: `${plan.featured ? 2 : 1}px solid ${plan.featured ? palette.primary : palette.border}`,
                  borderRadius: radius, padding: 20, position: "relative", backgroundColor: palette.surface,
                }}>
                  {plan.featured && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "3px 14px", borderRadius: 99, backgroundColor: palette.primary, color: "#fff", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>Most Popular</div>
                  )}
                  <div style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary, marginBottom: 4 }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
                    <span style={{ fontSize: 32, fontWeight: 800, color: palette.textPrimary }}>${price}</span>
                    <span style={{ fontSize: 13, color: palette.textSecondary }}>/mo</span>
                  </div>
                  <button style={{
                    width: "100%", padding: "10px 0", borderRadius: btnRadius, border: plan.featured ? "none" : `1px solid ${palette.border}`,
                    backgroundColor: plan.featured ? palette.primary : palette.surface,
                    color: plan.featured ? "#fff" : palette.textPrimary,
                    fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20,
                  }}>{plan.cta}</button>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13, color: palette.textSecondary }}>
                      <span style={{ color: palette.success, display: "flex" }}><CheckIcon /></span> {f}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Card Radius", radius], ["Featured Border", "palette.primary (2px)"], ["Badge BG", "palette.primary"], ["Check Color", "palette.success"], ["Price Font", "32px / 800"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div style={subsectionLabel}>Comparison Grid</div>
      <div style={{ border: `1px solid ${palette.border}`, borderRadius: radius, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: palette.surfaceMuted }}>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: palette.textSecondary, borderBottom: `1px solid ${palette.border}` }}>Feature</th>
              {plans.map(p => (
                <th key={p.name} style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: p.featured ? palette.primary : palette.textPrimary, borderBottom: `1px solid ${palette.border}` }}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feat, fi) => (
              <tr key={feat} style={{ borderBottom: fi < comparisonFeatures.length - 1 ? `1px solid ${palette.border}` : "none" }}>
                <td style={{ padding: "10px 16px", color: palette.textPrimary }}>{feat}</td>
                {comparisonGrid.map((planData, pi) => (
                  <td key={pi} style={{ padding: "10px 16px", textAlign: "center" }}>
                    {typeof planData[fi] === "boolean"
                      ? planData[fi]
                        ? <span style={{ color: palette.success, display: "inline-flex" }}><CheckIcon /></span>
                        : <span style={{ color: palette.textSecondary + "40", display: "inline-flex" }}><XIcon /></span>
                      : <span style={{ color: palette.textPrimary }}>{planData[fi]}</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use pricing tables" description="Pricing tables help users choose plans:" items={[
          "SaaS product plan selection pages",
          "Service tier comparison and upselling",
          "Subscription management interfaces",
          "Feature-gated access levels",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Make plan selection easy:" items={[
          "Highlight the recommended plan visually",
          "Show savings for annual billing clearly",
          "Keep feature lists scannable (5-7 items)",
          "Use a comparison grid for 3+ plans",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Visually distinguish the featured plan with a border or badge." },
        { type: "dont", text: "Don't hide the price or require hovering to see costs." },
        { type: "do", text: "Show percentage savings on annual plans near the toggle." },
        { type: "dont", text: "Don't use more than 4 pricing tiers — it overwhelms users." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Billing toggle", description: "Monthly/annual switcher", x: 50, y: 5 },
        { id: 2, label: "Plan header", description: "Name and pricing information", x: 50, y: 25 },
        { id: 3, label: "CTA button", description: "Primary action for each plan", x: 50, y: 48 },
        { id: 4, label: "Feature list", description: "Included features with check marks", x: 50, y: 70 },
        { id: 5, label: "Featured badge", description: "'Most Popular' or 'Recommended' label", x: 50, y: 15 },
      ]} renderPreview={(h) => (
        <div style={{ width: 240 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ display: "flex", gap: 2, padding: 2, backgroundColor: palette.surfaceMuted, borderRadius: 99 }}>
              <span style={{ padding: "2px 10px", borderRadius: 99, fontSize: 8, backgroundColor: palette.surface }}>Mo</span>
              <span style={{ padding: "2px 10px", borderRadius: 99, fontSize: 8, color: palette.textSecondary }}>Yr</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Basic", "Pro"].map((n, i) => (
              <div key={n} style={{ flex: 1, border: `${i === 1 ? 2 : 1}px solid ${i === 1 ? palette.primary : palette.border}`, borderRadius: 6, padding: 8, position: "relative" }}>
                {i === 1 && <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", fontSize: 6, padding: "1px 6px", borderRadius: 99, backgroundColor: palette.primary, color: "#fff", opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Popular</div>}
                <div style={{ fontSize: 8, fontWeight: 600, color: palette.textPrimary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>{n}<br /><span style={{ fontSize: 14, fontWeight: 800 }}>${i === 0 ? 9 : 29}</span></div>
                <div style={{ height: 16, borderRadius: 3, backgroundColor: i === 1 ? palette.primary : palette.surfaceMuted, marginTop: 6, marginBottom: 6, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
                <div style={{ opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                  {[1, 2, 3].map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}><span style={{ color: palette.success, fontSize: 6 }}>✓</span><div style={{ height: 4, flex: 1, borderRadius: 2, backgroundColor: palette.border + "40" }} /></div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Card Padding", value: "20px" },
        { label: "Card Border Radius", value: radius },
        { label: "Price Font Size", value: "32px / 800" },
        { label: "Feature Item Gap", value: "8px" },
        { label: "Toggle Padding", value: "3px (outer) / 6px 18px (button)" },
        { label: "Featured Border Width", value: "2px" },
        { label: "Badge Font Size", value: "11px" },
      ]} />
    </motion.section>
  );
}
