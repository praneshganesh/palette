"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface StickyBottomSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const productItems = [
  { name: "Premium Plan", price: "$29/mo", desc: "All features included" },
  { name: "Standard Plan", price: "$14/mo", desc: "Core features" },
  { name: "Basic Plan", price: "$0/mo", desc: "Free tier" },
];

export function StickyBottomSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: StickyBottomSectionProps) {
  const comp = system.components;
  const [variant, setVariant] = useState<"cta" | "price" | "dual">("cta");
  const [collapsed, setCollapsed] = useState(false);
  const [showGradient, setShowGradient] = useState(true);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24, display: "flex", justifyContent: "center",
  };

  const phoneFrame: React.CSSProperties = {
    width: 300, height: 460, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
  };

  const ctaButton: React.CSSProperties = {
    width: "100%", padding: "14px 0", backgroundColor: palette.primary,
    color: "#fff", border: "none", borderRadius: system.spacing.radius.md,
    fontSize: 15, fontWeight: 700, cursor: "pointer",
  };

  const renderBottomBar = () => {
    if (variant === "cta") return (
      <div style={{ padding: "12px 16px 24px", backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}` }}>
        <button style={ctaButton}>Get Started</button>
      </div>
    );
    if (variant === "price") return (
      <div style={{ padding: "12px 16px 24px", backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: palette.textSecondary }}>Total</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, fontFamily: "monospace" }}>$29.00</div>
        </div>
        <button style={{ ...ctaButton, width: "auto", padding: "14px 32px" }}>Purchase</button>
      </div>
    );
    return (
      <div style={{ padding: "12px 16px 24px", backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}`, display: "flex", gap: 10 }}>
        <button style={{ flex: 1, padding: "12px 0", backgroundColor: "transparent", border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, fontSize: 14, fontWeight: 600, color: palette.textPrimary, cursor: "pointer" }}>Save Draft</button>
        <button style={{ ...ctaButton, flex: 1, padding: "12px 0" }}>Publish</button>
      </div>
    );
  };

  return (
    <motion.section id="comp-sticky-bottom" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Sticky Bottom Bar</p>
      <p style={sectionDesc}>
        Fixed bottom CTA bars anchor critical actions within thumb reach. They support safe-area insets, gradient fade-outs above, and collapsible states during scroll.
      </p>

      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["cta", "price", "dual"] as const).map(v => (
          <button key={v} onClick={() => setVariant(v)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${variant === v ? palette.primary : palette.border}`, backgroundColor: variant === v ? palette.primary + "15" : palette.surface, color: variant === v ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>
            {v === "cta" ? "Single CTA" : v === "price" ? "Price + CTA" : "Dual Action"}
          </button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
            {productItems.map((p, i) => (
              <div key={i} style={{ padding: 14, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{p.name}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: palette.primary, fontFamily: "monospace" }}>{p.price}</span>
                </div>
                <div style={{ fontSize: 12, color: palette.textSecondary }}>{p.desc}</div>
              </div>
            ))}
            <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: palette.textSecondary }}>More content below…</div>
          </div>
          {showGradient && (
            <div style={{ position: "absolute", bottom: variant === "price" ? 72 : 62, left: 0, right: 0, height: 32, background: `linear-gradient(transparent, ${palette.background})`, pointerEvents: "none", zIndex: 5 }} />
          )}
          <div style={{ flexShrink: 0, transform: collapsed ? "translateY(100%)" : "translateY(0)", transition: "transform 0.3s" }}>
            {renderBottomBar()}
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>Collapsible & Gradient</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.primary}`, backgroundColor: collapsed ? palette.primary + "15" : palette.surface, color: palette.primary, cursor: "pointer" }}>{collapsed ? "Show Bar" : "Hide Bar (Scroll Down)"}</button>
        <button onClick={() => setShowGradient(!showGradient)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, backgroundColor: showGradient ? palette.primary + "15" : palette.surface, color: showGradient ? palette.primary : palette.textSecondary, cursor: "pointer" }}>Gradient: {showGradient ? "On" : "Off"}</button>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use sticky bottom bars" description="Persistent call-to-action:" items={[
          "Checkout flows where the buy/pay button must always be visible",
          "Long forms with a submit action at the end",
          "Product detail pages with an 'Add to Cart' button",
        ]} />
        <UsageSection palette={palette} title="Enhancement options" description="Polish the experience:" items={[
          "Gradient fade — soften the transition from content to bar",
          "Collapsible — hide on scroll down, reveal on scroll up",
          "Safe area — pad below for home indicator on notch devices",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Add safe-area padding at the bottom to avoid overlap with device home indicators." },
        { type: "dont", text: "Don't stack a sticky bottom bar on top of a bottom tab bar — combine or choose one." },
        { type: "do", text: "Use a subtle gradient fade above the bar to indicate content continues below." },
        { type: "dont", text: "Don't put more than 2 actions in the bar — it becomes a toolbar, not a CTA bar." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Bar container", description: "Fixed-bottom surface above safe area", x: 50, y: 85 },
        { id: 2, label: "CTA button", description: "Primary action button", x: 50, y: 88 },
        { id: 3, label: "Gradient fade", description: "Transparent-to-solid gradient above bar", x: 50, y: 78 },
        { id: 4, label: "Safe area", description: "Bottom padding for device insets", x: 50, y: 95 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, height: 90, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
          <div style={{ padding: "6px 10px", fontSize: 8, color: palette.textSecondary }}>Content area…<br />More content…<br />Scrollable…</div>
          <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, height: 16, background: `linear-gradient(transparent, ${palette.background})`, opacity: h === 3 ? 1 : h === null ? 0.6 : 0.15, transition: "opacity 0.2s" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}`, padding: "4px 10px 8px", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <div style={{ height: 16, backgroundColor: palette.primary, borderRadius: system.spacing.radius.sm, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }} />
            <div style={{ height: 6, backgroundColor: "transparent", opacity: h === 4 ? 1 : 0, borderTop: `1px dashed ${palette.border}`, marginTop: 2 }} />
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Bar Height", value: "60–80px (incl. padding)" },
        { label: "Safe Area Padding", value: "env(safe-area-inset-bottom)" },
        { label: "CTA Button Height", value: "48–52px" },
        { label: "Gradient Height", value: "24–40px" },
        { label: "Horizontal Padding", value: "16px" },
      ]} />
    </motion.section>
  );
}
