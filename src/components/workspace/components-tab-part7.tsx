"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart7Props {
  system: DesignSystem;
  content: IndustryContent;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

export function ComponentsPart7({ system, content }: ComponentsPart7Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  const [quantities, setQuantities] = useState([2, 1, 3]);

  const accentBar: React.CSSProperties = { width: 48, height: 2, backgroundColor: palette.primary, marginBottom: 24, borderRadius: 1 };
  const sectionTitle: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8, margin: 0, lineHeight: 1.2 };
  const sectionDesc: React.CSSProperties = { fontSize: 14, color: palette.textSecondary, lineHeight: 1.8, maxWidth: 600, marginBottom: 32, marginTop: 0 };
  const sectionWrap = (border = true): React.CSSProperties => ({ paddingBottom: 72, marginBottom: 72, borderBottom: border ? `1px solid ${palette.border}` : "none" });

  const btnPrimary: React.CSSProperties = {
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 600,
    color: comp.button.primaryText ?? "#ffffff",
    backgroundColor: comp.button.primaryBg ?? palette.primary,
    border: "none",
    borderRadius: comp.button.radius ?? system.spacing.radius.md,
    cursor: "pointer",
    fontFamily: system.typography.bodyFont,
  };

  const btnSecondary: React.CSSProperties = {
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 600,
    color: comp.button.secondaryText ?? palette.primary,
    backgroundColor: comp.button.secondaryBg ?? "transparent",
    border: `1px solid ${palette.border}`,
    borderRadius: comp.button.radius ?? system.spacing.radius.md,
    cursor: "pointer",
    fontFamily: system.typography.bodyFont,
  };

  const cardBase: React.CSSProperties = {
    backgroundColor: comp.card.bg ?? palette.surface,
    border: `1px solid ${comp.card.border ?? palette.border}`,
    borderRadius: comp.card.radius ?? system.spacing.radius.lg,
    overflow: "hidden",
  };

  const statusColor = (s: string): string => {
    const lower = s.toLowerCase();
    if (lower.includes("active") || lower.includes("done") || lower.includes("approved") || lower.includes("completed")) return palette.success;
    if (lower.includes("review") || lower.includes("progress") || lower.includes("pending")) return palette.warning;
    if (lower.includes("draft") || lower.includes("waiting") || lower.includes("todo")) return palette.info;
    if (lower.includes("blocked") || lower.includes("critical") || lower.includes("closed")) return palette.danger;
    return palette.textSecondary;
  };

  const priorityColor = (p: string): string => {
    const lower = p.toLowerCase();
    if (lower === "critical") return palette.danger;
    if (lower === "high") return palette.warning;
    if (lower === "medium") return palette.info;
    return palette.textSecondary;
  };

  const cartItems = [
    { name: content.formFields.categories[0] ?? "Premium Plan", variant: "Size M, Color Blue", price: 450 },
    { name: content.formFields.categories[1] ?? "Standard Plan", variant: "Size L, Color Black", price: 320 },
    { name: content.formFields.categories[2] ?? "Basic Package", variant: "Size S, Color White", price: 180 },
  ];

  const invoiceItems = [
    { item: content.formFields.categories[0] ?? "Consulting", qty: 3, unitPrice: 1200 },
    { item: content.formFields.categories[1] ?? "Development", qty: 1, unitPrice: 4500 },
    { item: content.formFields.categories[2] ?? "Design", qty: 2, unitPrice: 800 },
    { item: content.formFields.categories[3] ?? "Support", qty: 5, unitPrice: 150 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* ═══════════════════════════════════════════════
          1. PRODUCT / PROPERTY CARD
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-product-card" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Product / Property Card</h3>
        <p style={sectionDesc}>
          Enhanced product card with image area, pricing, specifications, location context, status badges, and dual call-to-action buttons for commerce and listing flows.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {[
            { title: "Marina Gate Tower — Unit 1204", price: content.kpis[3]?.value ?? "AED 2,450,000", status: "New Launch", specs: ["3 Bed", "2 Bath", "1,850 sqft"], location: "Dubai Marina, UAE" },
            { title: "Creek Harbour Residence — Suite 802", price: "AED 1,875,000", status: "Featured", specs: ["2 Bed", "2 Bath", "1,420 sqft"], location: "Dubai Creek, UAE" },
          ].map((card, ci) => (
            <div key={ci} style={{ ...cardBase, position: "relative" }}>
              {/* Image area */}
              <div style={{
                height: 180,
                background: `linear-gradient(135deg, ${withAlpha(palette.primary, 0.15)} 0%, ${withAlpha(palette.accent, 0.12)} 50%, ${withAlpha(palette.secondary, 0.1)} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={withAlpha(palette.primary, 0.4)} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                {/* Status badge */}
                <div style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  padding: "4px 12px",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  color: "#ffffff",
                  backgroundColor: ci === 0 ? palette.primary : palette.accent,
                  borderRadius: system.spacing.radius.full,
                  textTransform: "uppercase",
                }}>
                  {card.status}
                </div>
                {/* Favorite */}
                <div style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: withAlpha("#ffffff", 0.9),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.danger} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: 20 }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: "0 0 8px", lineHeight: 1.3 }}>
                  {card.title}
                </h4>
                <p style={{ fontSize: 22, fontWeight: 800, color: palette.primary, fontFamily: system.typography.headingFont, margin: "0 0 12px", lineHeight: 1 }}>
                  {card.price}
                </p>
                {/* Specs row */}
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  {card.specs.map((spec, si) => (
                    <span key={si} style={{
                      fontSize: 12,
                      color: palette.textSecondary,
                      fontFamily: system.typography.bodyFont,
                      padding: "4px 8px",
                      backgroundColor: palette.surfaceMuted,
                      borderRadius: system.spacing.radius.sm,
                      fontWeight: 500,
                    }}>
                      {spec}
                    </span>
                  ))}
                </div>
                {/* Location */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span style={{ fontSize: 12, color: palette.textSecondary }}>{card.location}</span>
                </div>
                {/* Buttons */}
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ ...btnPrimary, flex: 1, textAlign: "center" }}>View Details</button>
                  <button style={{ ...btnSecondary, flex: 1, textAlign: "center" }}>Schedule Visit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          2. PRICING CARD / PLAN
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-pricing" data-comp-section {...fadeUp} transition={{ delay: 0.05 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Pricing Plans</h3>
        <p style={sectionDesc}>
          Tiered pricing comparison with highlighted recommended plan, feature checklists, and clear call-to-action hierarchy to drive conversion decisions.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
          {[
            {
              tier: "Basic",
              price: "49",
              period: "/mo",
              isPrimary: false,
              features: ["5 Projects", "10 GB Storage", "Email Support", "Basic Analytics"],
              cta: "Get Started",
            },
            {
              tier: "Pro",
              price: "99",
              period: "/mo",
              isPrimary: true,
              features: ["Unlimited Projects", "100 GB Storage", "Priority Support", "Advanced Analytics", "Custom Integrations", "Team Collaboration"],
              cta: "Upgrade",
            },
            {
              tier: "Enterprise",
              price: "Custom",
              period: "",
              isPrimary: false,
              features: ["Everything in Pro", "Dedicated Manager", "SLA Guarantee", "SSO & SAML", "Audit Logs"],
              cta: "Contact Sales",
            },
          ].map((plan, pi) => (
            <div key={pi} style={{
              backgroundColor: plan.isPrimary ? palette.primary : (comp.card.bg ?? palette.surface),
              border: plan.isPrimary ? `2px solid ${palette.primary}` : `1px solid ${comp.card.border ?? palette.border}`,
              borderRadius: comp.card.radius ?? system.spacing.radius.lg,
              padding: "32px 24px",
              position: "relative",
              transform: plan.isPrimary ? "scale(1.04)" : "none",
              boxShadow: plan.isPrimary ? system.spacing.elevation.lg : "none",
            }}>
              {plan.isPrimary && (
                <div style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "4px 16px",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: palette.primary,
                  backgroundColor: palette.surface,
                  borderRadius: system.spacing.radius.full,
                  border: `1px solid ${palette.primary}`,
                  textTransform: "uppercase",
                }}>
                  Popular
                </div>
              )}
              <p style={{
                fontSize: 14,
                fontWeight: 600,
                color: plan.isPrimary ? withAlpha("#ffffff", 0.8) : palette.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "1px",
                margin: "0 0 12px",
              }}>
                {plan.tier}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 24 }}>
                {plan.price !== "Custom" && (
                  <span style={{ fontSize: 14, fontWeight: 500, color: plan.isPrimary ? withAlpha("#ffffff", 0.7) : palette.textSecondary }}>AED</span>
                )}
                <span style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: plan.isPrimary ? "#ffffff" : palette.textPrimary,
                  fontFamily: system.typography.headingFont,
                  lineHeight: 1,
                }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: 14, color: plan.isPrimary ? withAlpha("#ffffff", 0.6) : palette.textSecondary }}>
                    {plan.period}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {plan.features.map((feat, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.isPrimary ? withAlpha("#ffffff", 0.8) : palette.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{
                      fontSize: 13,
                      color: plan.isPrimary ? withAlpha("#ffffff", 0.9) : palette.textPrimary,
                      fontFamily: system.typography.bodyFont,
                    }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
              <button style={{
                width: "100%",
                padding: "12px 20px",
                fontSize: 14,
                fontWeight: 700,
                color: plan.isPrimary ? palette.primary : (comp.button.primaryText ?? "#ffffff"),
                backgroundColor: plan.isPrimary ? "#ffffff" : (comp.button.primaryBg ?? palette.primary),
                border: "none",
                borderRadius: comp.button.radius ?? system.spacing.radius.md,
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
                textAlign: "center",
              }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          3. CART ITEM
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-cart" data-comp-section {...fadeUp} transition={{ delay: 0.1 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Cart Items</h3>
        <p style={sectionDesc}>
          Shopping cart line items with image thumbnails, variant info, quantity stepper controls, line totals, and a subtotal summary row.
        </p>

        <div style={{ ...cardBase, padding: 0 }}>
          {cartItems.map((item, ci) => {
            const qty = quantities[ci];
            return (
              <div key={ci} style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderBottom: ci < cartItems.length - 1 ? `1px solid ${palette.border}` : "none",
              }}>
                {/* Thumbnail */}
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: system.spacing.radius.md,
                  background: `linear-gradient(135deg, ${withAlpha(palette.primary, 0.12)}, ${withAlpha(palette.accent, 0.08)})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={withAlpha(palette.primary, 0.4)} strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, margin: "0 0 4px", fontFamily: system.typography.bodyFont }}>{item.name}</p>
                  <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>{item.variant}</p>
                </div>
                {/* Quantity stepper */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${comp.input.border ?? palette.border}`,
                  borderRadius: comp.input.radius ?? system.spacing.radius.md,
                  overflow: "hidden",
                }}>
                  <button
                    onClick={() => setQuantities(q => q.map((v, i) => i === ci ? Math.max(1, v - 1) : v))}
                    style={{
                      width: 32,
                      height: 32,
                      border: "none",
                      backgroundColor: palette.surfaceMuted,
                      color: palette.textSecondary,
                      fontSize: 16,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    −
                  </button>
                  <span style={{
                    width: 36,
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    color: palette.textPrimary,
                    backgroundColor: comp.input.bg ?? palette.background,
                    lineHeight: "32px",
                  }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQuantities(q => q.map((v, i) => i === ci ? v + 1 : v))}
                    style={{
                      width: 32,
                      height: 32,
                      border: "none",
                      backgroundColor: palette.surfaceMuted,
                      color: palette.textSecondary,
                      fontSize: 16,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>
                {/* Unit price */}
                <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont, minWidth: 80, textAlign: "right" }}>
                  AED {item.price.toLocaleString()}
                </span>
                {/* Line total */}
                <span style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, minWidth: 90, textAlign: "right" }}>
                  AED {(item.price * qty).toLocaleString()}
                </span>
                {/* Remove */}
                <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.danger} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            );
          })}
          {/* Subtotal */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 16,
            padding: "16px 20px",
            borderTop: `1px solid ${palette.border}`,
            backgroundColor: palette.surfaceMuted,
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: palette.textSecondary }}>Subtotal</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>
              AED {cartItems.reduce((sum, item, i) => sum + item.price * quantities[i], 0).toLocaleString()}
            </span>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          4. ORDER SUMMARY
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-order-summary" data-comp-section {...fadeUp} transition={{ delay: 0.15 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Order Summary</h3>
        <p style={sectionDesc}>
          Compact checkout summary card with itemized line totals, discount callout, tax calculation, and a prominent place-order button.
        </p>

        <div style={{ maxWidth: 420 }}>
          <div style={{ ...cardBase, padding: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: "0 0 20px" }}>
              Order Summary
            </h4>
            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              {[
                { name: content.formFields.categories[0] ?? "Premium Plan", qty: 2, price: 450 },
                { name: content.formFields.categories[1] ?? "Standard Plan", qty: 1, price: 320 },
                { name: content.formFields.categories[2] ?? "Basic Package", qty: 3, price: 180 },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>
                    {item.name} <span style={{ color: palette.textSecondary }}>× {item.qty}</span>
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>
                    AED {(item.qty * item.price).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, backgroundColor: palette.border, marginBottom: 12 }} />
            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: palette.textSecondary }}>Subtotal</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>AED 1,860</span>
            </div>
            {/* Discount */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: palette.success, fontWeight: 500 }}>Discount (10%)</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.success }}>− AED 186</span>
            </div>
            {/* Tax */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: palette.textSecondary }}>VAT (5%)</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>AED 83.70</span>
            </div>
            <div style={{ height: 1, backgroundColor: palette.border, marginBottom: 16 }} />
            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Total</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: palette.primary, fontFamily: system.typography.headingFont }}>AED 1,757.70</span>
            </div>
            <button style={{ ...btnPrimary, width: "100%", padding: "14px 20px", fontSize: 15, textAlign: "center" }}>
              Place Order
            </button>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          5. INVOICE ROW
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-invoice" data-comp-section {...fadeUp} transition={{ delay: 0.2 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Invoice Table</h3>
        <p style={sectionDesc}>
          Mini invoice with line items, quantity, unit pricing, tax calculation, and grand total — designed for billing and financial document previews.
        </p>

        <div style={{ ...cardBase, padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: comp.table.headerBg ?? palette.surfaceMuted }}>
                {["Item", "Qty", "Unit Price", "Total"].map((h, hi) => (
                  <th key={hi} style={{
                    padding: "12px 16px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase" as const,
                    color: comp.table.headerText ?? palette.textSecondary,
                    textAlign: hi === 0 ? ("left" as const) : ("right" as const),
                    borderBottom: `1px solid ${palette.border}`,
                    fontFamily: system.typography.bodyFont,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((row, ri) => (
                <tr key={ri} style={{ backgroundColor: ri % 2 === 0 ? "transparent" : (comp.table.stripeBg ?? withAlpha(palette.surfaceMuted, 0.5)) }}>
                  <td style={{ padding: "10px 16px", fontSize: 13, color: palette.textPrimary, fontFamily: system.typography.bodyFont, borderBottom: `1px solid ${palette.border}` }}>
                    {row.item}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 13, color: palette.textSecondary, textAlign: "right", borderBottom: `1px solid ${palette.border}`, fontFamily: "monospace" }}>
                    {row.qty}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 13, color: palette.textSecondary, textAlign: "right", borderBottom: `1px solid ${palette.border}`, fontFamily: "monospace" }}>
                    AED {row.unitPrice.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600, color: palette.textPrimary, textAlign: "right", borderBottom: `1px solid ${palette.border}`, fontFamily: "monospace" }}>
                    AED {(row.qty * row.unitPrice).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Invoice footer */}
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", backgroundColor: palette.surfaceMuted }}>
            {(() => {
              const subtotal = invoiceItems.reduce((s, r) => s + r.qty * r.unitPrice, 0);
              const vat = Math.round(subtotal * 0.05);
              const grand = subtotal + vat;
              return (
                <>
                  <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: palette.textSecondary, minWidth: 80, textAlign: "right" }}>Subtotal</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: "monospace", minWidth: 100, textAlign: "right" }}>AED {subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: palette.textSecondary, minWidth: 80, textAlign: "right" }}>VAT (5%)</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: "monospace", minWidth: 100, textAlign: "right" }}>AED {vat.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 1, width: 220, backgroundColor: palette.border, marginTop: 4, marginBottom: 4 }} />
                  <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, minWidth: 80, textAlign: "right" }}>Grand Total</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: palette.primary, fontFamily: system.typography.headingFont, minWidth: 100, textAlign: "right" }}>AED {grand.toLocaleString()}</span>
                  </div>
                  <button style={{ ...btnPrimary, marginTop: 12, padding: "10px 28px" }}>Pay Now</button>
                </>
              );
            })()}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          6. PRICE DISPLAY
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-price-display" data-comp-section {...fadeUp} transition={{ delay: 0.25 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Price Display</h3>
        <p style={sectionDesc}>
          Formatting variants for monetary values — standard, discounted with strikethrough, per-unit, monthly, and installment pricing.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {/* Standard */}
          <div style={{ ...cardBase, padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: palette.textSecondary, margin: "0 0 8px" }}>Standard</p>
            <p style={{ fontSize: 32, fontWeight: 800, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: 0, lineHeight: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: palette.textSecondary }}>AED </span>1,250,000
            </p>
          </div>
          {/* Discounted */}
          <div style={{ ...cardBase, padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: palette.textSecondary, margin: "0 0 8px" }}>With Discount</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontSize: 18, color: palette.textSecondary, textDecoration: "line-through", fontFamily: system.typography.headingFont }}>AED 1,500</span>
              <span style={{ fontSize: 32, fontWeight: 800, color: palette.success, fontFamily: system.typography.headingFont, lineHeight: 1 }}>AED 1,200</span>
            </div>
            <span style={{
              display: "inline-block",
              marginTop: 8,
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              backgroundColor: withAlpha(palette.success, 0.1),
              color: palette.success,
              borderRadius: system.spacing.radius.full,
            }}>
              SAVE 20%
            </span>
          </div>
          {/* Per unit */}
          <div style={{ ...cardBase, padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: palette.textSecondary, margin: "0 0 8px" }}>Per Unit</p>
            <p style={{ fontSize: 32, fontWeight: 800, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: 0, lineHeight: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: palette.textSecondary }}>AED </span>450
              <span style={{ fontSize: 16, fontWeight: 500, color: palette.textSecondary }}>/sqft</span>
            </p>
          </div>
          {/* Monthly */}
          <div style={{ ...cardBase, padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: palette.textSecondary, margin: "0 0 8px" }}>Monthly</p>
            <p style={{ fontSize: 32, fontWeight: 800, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: 0, lineHeight: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: palette.textSecondary }}>AED </span>8,500
              <span style={{ fontSize: 16, fontWeight: 500, color: palette.textSecondary }}>/mo</span>
            </p>
          </div>
          {/* Installment — full width */}
          <div style={{ ...cardBase, padding: 20, gridColumn: "1 / -1" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: palette.textSecondary, margin: "0 0 8px" }}>Installment Plan</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 14, color: palette.textSecondary }}>From</span>
              <span style={{ fontSize: 36, fontWeight: 800, color: palette.primary, fontFamily: system.typography.headingFont, lineHeight: 1 }}>
                AED 2,125
              </span>
              <span style={{ fontSize: 14, color: palette.textSecondary }}>/mo for 48 months</span>
            </div>
            <p style={{ fontSize: 12, color: palette.textSecondary, margin: "8px 0 0", lineHeight: 1.5 }}>
              Total: AED 102,000 · 0% interest · No down payment required
            </p>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          7. BULK ACTION BAR
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-bulk-actions" data-comp-section {...fadeUp} transition={{ delay: 0.3 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Bulk Action Bar</h3>
        <p style={sectionDesc}>
          Contextual toolbar for multi-select operations — export, archive, assign, and destructive actions with selection count and clear-all affordance.
        </p>

        <div style={{
          backgroundColor: palette.textPrimary,
          borderRadius: system.spacing.radius.lg,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: system.spacing.elevation.md,
        }}>
          {/* Checkbox + count */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 18,
              height: 18,
              borderRadius: 3,
              backgroundColor: palette.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: palette.surface, whiteSpace: "nowrap" }}>
              12 items selected
            </span>
          </div>

          <div style={{ width: 1, height: 24, backgroundColor: withAlpha(palette.surface, 0.2) }} />

          {/* Actions */}
          {[
            { label: "Export", icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" },
            { label: "Archive", icon: "M21 8v13H3V8M1 3h22v5H1zM10 12h4" },
            { label: "Assign", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
          ].map((action) => (
            <button key={action.label} style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: palette.surface,
              backgroundColor: withAlpha(palette.surface, 0.1),
              border: `1px solid ${withAlpha(palette.surface, 0.15)}`,
              borderRadius: system.spacing.radius.md,
              cursor: "pointer",
              fontFamily: system.typography.bodyFont,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={action.icon} />
              </svg>
              {action.label}
            </button>
          ))}

          {/* Danger: Delete */}
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            color: palette.danger,
            backgroundColor: withAlpha(palette.danger, 0.15),
            border: `1px solid ${withAlpha(palette.danger, 0.25)}`,
            borderRadius: system.spacing.radius.md,
            cursor: "pointer",
            fontFamily: system.typography.bodyFont,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>

          <div style={{ flex: 1 }} />

          {/* Clear */}
          <span style={{ fontSize: 12, color: withAlpha(palette.surface, 0.6), cursor: "pointer", fontWeight: 500, whiteSpace: "nowrap" }}>
            Clear selection
          </span>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          8. ADVANCED FILTERS / QUERY BUILDER
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-query-builder" data-comp-section {...fadeUp} transition={{ delay: 0.35 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Query Builder</h3>
        <p style={sectionDesc}>
          Advanced filter construction with field/operator/value rows, boolean connectors, add/remove controls, and apply/reset actions for complex data queries.
        </p>

        <div style={{ ...cardBase, padding: 24 }}>
          {/* Filter rows */}
          {[
            { field: "Status", operator: "is", value: "Active" },
            { field: "Priority", operator: "greater than", value: "3" },
          ].map((row, ri) => (
            <React.Fragment key={ri}>
              {ri > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "12px 0 12px 12px" }}>
                  <div style={{
                    display: "flex",
                    borderRadius: system.spacing.radius.md,
                    overflow: "hidden",
                    border: `1px solid ${palette.border}`,
                  }}>
                    <span style={{
                      padding: "4px 12px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#ffffff",
                      backgroundColor: palette.primary,
                      cursor: "pointer",
                    }}>
                      AND
                    </span>
                    <span style={{
                      padding: "4px 12px",
                      fontSize: 11,
                      fontWeight: 600,
                      color: palette.textSecondary,
                      backgroundColor: palette.surfaceMuted,
                      cursor: "pointer",
                    }}>
                      OR
                    </span>
                  </div>
                  <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Field */}
                <div style={{
                  flex: 1,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: palette.textPrimary,
                  backgroundColor: comp.input.bg ?? palette.background,
                  border: `1px solid ${comp.input.border ?? palette.border}`,
                  borderRadius: comp.input.radius ?? system.spacing.radius.md,
                  fontFamily: system.typography.bodyFont,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span>{row.field}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                {/* Operator */}
                <div style={{
                  flex: 1,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: palette.textPrimary,
                  backgroundColor: comp.input.bg ?? palette.background,
                  border: `1px solid ${comp.input.border ?? palette.border}`,
                  borderRadius: comp.input.radius ?? system.spacing.radius.md,
                  fontFamily: system.typography.bodyFont,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span>{row.operator}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                {/* Value */}
                <div style={{
                  flex: 1,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: palette.textPrimary,
                  backgroundColor: comp.input.bg ?? palette.background,
                  border: `1px solid ${comp.input.border ?? palette.border}`,
                  borderRadius: comp.input.radius ?? system.spacing.radius.md,
                  fontFamily: system.typography.bodyFont,
                }}>
                  {row.value}
                </div>
                {/* Remove */}
                <button style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  backgroundColor: palette.surfaceMuted,
                  cursor: "pointer",
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.danger} strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </React.Fragment>
          ))}

          {/* Add condition */}
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 16,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 600,
            color: palette.primary,
            backgroundColor: withAlpha(palette.primary, 0.06),
            border: `1px dashed ${withAlpha(palette.primary, 0.3)}`,
            borderRadius: system.spacing.radius.md,
            cursor: "pointer",
            fontFamily: system.typography.bodyFont,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add condition
          </button>

          {/* Action row */}
          <div style={{ display: "flex", gap: 10, marginTop: 20, paddingTop: 20, borderTop: `1px solid ${palette.border}` }}>
            <button style={btnPrimary}>Apply Filters</button>
            <button style={btnSecondary}>Reset</button>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          9. APPROVAL FLOW
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-approval-flow" data-comp-section {...fadeUp} transition={{ delay: 0.4 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Approval Flow</h3>
        <p style={sectionDesc}>
          Horizontal workflow diagram with step nodes, role avatars, status indicators, and a pulsing highlight on the current step for approval tracking.
        </p>

        <div style={{ ...cardBase, padding: 28 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, margin: "0 0 4px", fontFamily: system.typography.headingFont }}>
            {content.decisions[0]?.title ?? "Approval Workflow"}
          </p>
          <p style={{ fontSize: 12, color: palette.textSecondary, margin: "0 0 28px" }}>
            Decision by {content.decisions[0]?.madeBy ?? "Team"} · {content.decisions[0]?.date ?? "2026-03-15"}
          </p>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 0, position: "relative" }}>
            {[
              { label: "Submitted", role: "Requester", status: "Approved", initials: "AR", done: true, current: false },
              { label: "Manager Review", role: "Manager", status: "In Review", initials: "MK", done: false, current: true },
              { label: "Finance Approval", role: "Finance", status: "Pending", initials: "FT", done: false, current: false },
              { label: "Completed", role: "System", status: "Waiting", initials: "SY", done: false, current: false },
            ].map((step, si, arr) => (
              <React.Fragment key={si}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 120, position: "relative", zIndex: 1 }}>
                  {/* Node */}
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: step.done ? palette.success : step.current ? palette.primary : palette.surfaceMuted,
                    border: step.current ? `3px solid ${withAlpha(palette.primary, 0.3)}` : step.done ? `2px solid ${palette.success}` : `2px solid ${palette.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                    boxShadow: step.current ? `0 0 0 6px ${withAlpha(palette.primary, 0.12)}` : "none",
                  }}>
                    {step.done ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: step.current ? "#ffffff" : palette.textSecondary,
                        fontFamily: system.typography.bodyFont,
                      }}>
                        {step.initials}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: step.current ? palette.primary : step.done ? palette.success : palette.textPrimary,
                    fontFamily: system.typography.bodyFont,
                    textAlign: "center",
                    marginBottom: 2,
                  }}>
                    {step.label}
                  </span>
                  <span style={{ fontSize: 10, color: palette.textSecondary, textAlign: "center", marginBottom: 4 }}>
                    {step.role}
                  </span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: system.spacing.radius.full,
                    color: step.done ? palette.success : step.current ? palette.primary : palette.textSecondary,
                    backgroundColor: step.done ? withAlpha(palette.success, 0.1) : step.current ? withAlpha(palette.primary, 0.1) : palette.surfaceMuted,
                  }}>
                    {step.status}
                  </span>
                </div>
                {/* Arrow connector */}
                {si < arr.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", marginTop: 20, flexShrink: 0 }}>
                    <div style={{
                      width: 40,
                      height: 2,
                      backgroundColor: step.done ? palette.success : palette.border,
                    }} />
                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginLeft: -1 }}>
                      <polygon points="0,0 10,5 0,10" fill={step.done ? palette.success : palette.border} />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          10. DIFF / COMPARISON VIEW
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-diff-view" data-comp-section {...fadeUp} transition={{ delay: 0.45 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Diff / Comparison View</h3>
        <p style={sectionDesc}>
          Side-by-side version comparison with color-coded additions, removals, and unchanged rows for document review and change tracking workflows.
        </p>

        <div style={{ ...cardBase, padding: 0 }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${palette.border}` }}>
            <div style={{ padding: "12px 16px", backgroundColor: withAlpha(palette.danger, 0.04), borderRight: `1px solid ${palette.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: palette.danger }}>v2.3 — Previous Version</span>
              <span style={{ fontSize: 11, color: palette.textSecondary, marginLeft: 8 }}>Mar 12, 2026</span>
            </div>
            <div style={{ padding: "12px 16px", backgroundColor: withAlpha(palette.success, 0.04) }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: palette.success }}>v2.4 — Current Version</span>
              <span style={{ fontSize: 11, color: palette.textSecondary, marginLeft: 8 }}>Mar 15, 2026</span>
            </div>
          </div>
          {/* Diff rows */}
          {[
            { left: "Maximum budget: AED 500,000", right: "Maximum budget: AED 750,000", type: "changed" },
            { left: "Review cycle: 14 days", right: "Review cycle: 14 days", type: "unchanged" },
            { left: "Approval required: Department Head", right: "Approval required: Department Head, Finance", type: "changed" },
            { left: "Vendor: Al Habtoor Group", right: null, type: "removed" },
            { left: null, right: "New clause: Auto-renewal after 12 months", type: "added" },
          ].map((row, ri) => (
            <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: ri < 4 ? `1px solid ${palette.border}` : "none" }}>
              <div style={{
                padding: "10px 16px",
                fontSize: 13,
                fontFamily: system.typography.bodyFont,
                color: row.type === "removed" ? palette.danger : row.type === "changed" ? palette.textPrimary : palette.textPrimary,
                backgroundColor: row.type === "removed" ? withAlpha(palette.danger, 0.06) : row.type === "changed" ? withAlpha(palette.danger, 0.03) : "transparent",
                borderRight: `1px solid ${palette.border}`,
                lineHeight: 1.5,
                textDecoration: row.type === "removed" ? "line-through" : "none",
                opacity: row.left === null ? 0.3 : 1,
              }}>
                {row.left ?? "—"}
              </div>
              <div style={{
                padding: "10px 16px",
                fontSize: 13,
                fontFamily: system.typography.bodyFont,
                color: row.type === "added" ? palette.success : row.type === "changed" ? palette.textPrimary : palette.textPrimary,
                backgroundColor: row.type === "added" ? withAlpha(palette.success, 0.06) : row.type === "changed" ? withAlpha(palette.success, 0.03) : "transparent",
                lineHeight: 1.5,
                fontWeight: row.type === "added" ? 600 : 400,
                opacity: row.right === null ? 0.3 : 1,
              }}>
                {row.right ?? "—"}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          11. VERSION HISTORY
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-version-history" data-comp-section {...fadeUp} transition={{ delay: 0.5 }} style={sectionWrap()}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Version History</h3>
        <p style={sectionDesc}>
          Chronological list of document or record versions with author info, change summaries, restore actions, and highlighted current version badge.
        </p>

        <div style={{ ...cardBase, padding: 0 }}>
          {[
            { version: "v2.4", date: content.decisions[0]?.date ?? "2026-03-15", author: content.decisions[0]?.madeBy ?? "Admin", summary: "Updated budget limits and added auto-renewal clause", current: true },
            { version: "v2.3", date: content.decisions[1]?.date ?? "2026-02-28", author: content.decisions[1]?.madeBy ?? "Manager", summary: "Revised approval workflow and vendor terms", current: false },
            { version: "v2.2", date: content.decisions[2]?.date ?? "2026-02-10", author: content.decisions[2]?.madeBy ?? "Lead", summary: "Added compliance section and updated formatting", current: false },
            { version: "v2.1", date: content.decisions[3]?.date ?? "2026-01-20", author: content.decisions[3]?.madeBy ?? "Director", summary: "Initial draft with core requirements defined", current: false },
            { version: "v2.0", date: "2025-12-15", author: "System", summary: "Major version reset — migrated from legacy template", current: false },
          ].map((ver, vi) => (
            <div key={vi} style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 20px",
              borderBottom: vi < 4 ? `1px solid ${palette.border}` : "none",
              backgroundColor: ver.current ? withAlpha(palette.primary, 0.04) : "transparent",
            }}>
              {/* Version badge */}
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "monospace",
                color: ver.current ? "#ffffff" : palette.textSecondary,
                backgroundColor: ver.current ? palette.primary : palette.surfaceMuted,
                padding: "4px 10px",
                borderRadius: system.spacing.radius.md,
                minWidth: 42,
                textAlign: "center",
              }}>
                {ver.version}
              </span>
              {/* Date */}
              <span style={{ fontSize: 12, color: palette.textSecondary, minWidth: 90, fontFamily: "monospace" }}>{ver.date}</span>
              {/* Avatar + author */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 140 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: ver.current ? palette.primary : [palette.secondary, palette.accent, palette.success, palette.info][vi % 4],
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {ver.author.charAt(0)}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>{ver.author}</span>
              </div>
              {/* Summary */}
              <span style={{ flex: 1, fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont, lineHeight: 1.4 }}>
                {ver.summary}
              </span>
              {/* Action */}
              {ver.current ? (
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 10px",
                  backgroundColor: withAlpha(palette.primary, 0.1),
                  color: palette.primary,
                  borderRadius: system.spacing.radius.full,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                }}>
                  Current
                </span>
              ) : (
                <button style={{
                  padding: "5px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: palette.primary,
                  backgroundColor: "transparent",
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  cursor: "pointer",
                  fontFamily: system.typography.bodyFont,
                  whiteSpace: "nowrap",
                }}>
                  Restore
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          12. STATUS WORKFLOW (Kanban-style)
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-status-workflow" data-comp-section {...fadeUp} transition={{ delay: 0.55 }} style={sectionWrap(false)}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Status Workflow</h3>
        <p style={sectionDesc}>
          Compact kanban-style status flow visualization with columnar grouping, count badges, assignee avatars, and priority indicators for workflow state overview.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {(() => {
            const columns = [
              { label: "Todo", color: palette.textSecondary, statusKey: "Draft" },
              { label: "In Progress", color: palette.info, statusKey: "In Progress" },
              { label: "Review", color: palette.warning, statusKey: "Review" },
              { label: "Done", color: palette.success, statusKey: "Active" },
            ];
            const rows = content.tableRows.length > 0 ? content.tableRows : [];

            return columns.map((col, ci) => {
              const colItems = rows.length > 0
                ? rows.filter(r => {
                    const st = r.status.toLowerCase();
                    if (ci === 0) return st.includes("draft") || st.includes("pending");
                    if (ci === 1) return st.includes("progress") || st.includes("blocked");
                    if (ci === 2) return st.includes("review");
                    return st.includes("active") || st.includes("done") || st.includes("completed");
                  })
                : [
                    { id: `T${ci}-1`, title: `Task ${ci * 2 + 1}`, owner: "User A", priority: ci === 0 ? "High" : "Medium", status: col.label, type: "Task", due: "2026-05-01" },
                    { id: `T${ci}-2`, title: `Task ${ci * 2 + 2}`, owner: "User B", priority: "Low", status: col.label, type: "Task", due: "2026-05-15" },
                  ];

              return (
                <div key={ci} style={{
                  backgroundColor: palette.surfaceMuted,
                  borderRadius: system.spacing.radius.lg,
                  padding: 12,
                  minHeight: 200,
                }}>
                  {/* Column header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: col.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.bodyFont, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {col.label}
                    </span>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: col.color,
                      backgroundColor: withAlpha(col.color, 0.12),
                      padding: "2px 7px",
                      borderRadius: system.spacing.radius.full,
                      marginLeft: "auto",
                    }}>
                      {colItems.length}
                    </span>
                  </div>
                  {/* Cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {colItems.slice(0, 3).map((item, ii) => (
                      <div key={ii} style={{
                        backgroundColor: comp.card.bg ?? palette.surface,
                        border: `1px solid ${comp.card.border ?? palette.border}`,
                        borderRadius: system.spacing.radius.md,
                        padding: "10px 12px",
                      }}>
                        <p style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, margin: "0 0 8px", lineHeight: 1.3, fontFamily: system.typography.bodyFont }}>
                          {item.title}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {/* Priority dot */}
                          <div style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: priorityColor(item.priority),
                            flexShrink: 0,
                          }} />
                          <span style={{ fontSize: 10, color: palette.textSecondary, flex: 1 }}>{item.id}</span>
                          {/* Assignee avatar */}
                          <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: [palette.primary, palette.accent, palette.secondary, palette.success][(ci + ii) % 4],
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 8,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}>
                            {item.owner.charAt(0)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </motion.section>
    </div>
  );
}
