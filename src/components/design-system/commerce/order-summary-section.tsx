"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface OrderSummarySectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 12 15 16 10" />
  </svg>
);

type LineItem = { name: string; variant: string; qty: number; price: number };

const orderItems: LineItem[] = [
  { name: "Wireless Headphones", variant: "Black · Over-ear", qty: 1, price: 299 },
  { name: "USB-C Hub", variant: "7-in-1 · Silver", qty: 2, price: 59 },
  { name: "Laptop Stand", variant: "Aluminum · Space Gray", qty: 1, price: 89 },
];

export function OrderSummarySection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: OrderSummarySectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const btnRadius = comp.button.borderRadius || system.spacing.radius.md;

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const subtotal = orderItems.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = shippingMethod === "express" ? 12.99 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const SummaryRow = ({ label, value, bold, color }: { label: string; value: string; bold?: boolean; color?: string }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontSize: bold ? 16 : 13 }}>
      <span style={{ color: palette.textSecondary, fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ color: color || palette.textPrimary, fontWeight: bold ? 800 : 500 }}>{value}</span>
    </div>
  );

  return (
    <motion.section id="comp-order-summary" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Order Summary</p>
      <p style={sectionDesc}>
        Order summaries display item lists, promotional codes, tax calculations, shipping options,
        and a final total for checkout confirmation.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, maxWidth: 440 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20 }}>Order Summary</div>

          {orderItems.map((item, i) => (
            <div key={item.name} style={{ display: "flex", gap: 12, marginBottom: 14, paddingBottom: i < orderItems.length - 1 ? 14 : 0, borderBottom: i < orderItems.length - 1 ? `1px solid ${palette.border}` : "none", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: system.spacing.radius.sm, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📦</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{item.name}</div>
                <div style={{ fontSize: 11, color: palette.textSecondary }}>{item.variant} · Qty: {item.qty}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}

          <div style={{ display: "flex", gap: 8, marginTop: 20, marginBottom: 20 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", border: `1px solid ${promoApplied ? palette.success : palette.border}`, borderRadius: radius }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><TagIcon /></span>
              <input
                style={{ border: "none", outline: "none", backgroundColor: "transparent", fontSize: 13, color: palette.textPrimary, fontFamily: "inherit", width: "100%" }}
                placeholder="Promo code"
                value={promoCode}
                onChange={e => { setPromoCode(e.target.value); setPromoApplied(false); }}
              />
              {promoApplied && <span style={{ color: palette.success, display: "flex" }}><CheckCircle /></span>}
            </div>
            <button onClick={() => promoCode && setPromoApplied(true)} style={{ padding: "8px 16px", borderRadius: btnRadius, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textPrimary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Apply</button>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, marginBottom: 8 }}>Shipping</div>
            {(["standard", "express"] as const).map(m => (
              <label key={m} onClick={() => setShippingMethod(m)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: `1px solid ${shippingMethod === m ? palette.primary : palette.border}`, borderRadius: radius, marginBottom: 6, cursor: "pointer", backgroundColor: shippingMethod === m ? palette.primary + "05" : "transparent", transition: "all .15s" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${shippingMethod === m ? palette.primary : palette.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {shippingMethod === m && <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.primary }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, textTransform: "capitalize" }}>{m}</span>
                  <span style={{ fontSize: 11, color: palette.textSecondary, marginLeft: 6 }}>{m === "standard" ? "5-7 days" : "1-2 days"}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{m === "standard" ? "Free" : "$12.99"}</span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 16 }}>
            <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            {promoApplied && <SummaryRow label="Discount (10%)" value={`-$${discount.toFixed(2)}`} color={palette.success} />}
            <SummaryRow label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            <SummaryRow label="Tax" value={`$${tax.toFixed(2)}`} />
            <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 12, marginTop: 8 }}>
              <SummaryRow label="Total" value={`$${total.toFixed(2)}`} bold />
            </div>
          </div>

          <button style={{ width: "100%", marginTop: 12, padding: "12px 0", borderRadius: btnRadius, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Place Order</button>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Border Radius", radius], ["Discount Color", "palette.success"], ["Total Font", "16px / 800"], ["Promo Border", "palette.success (applied)"], ["Radio Active", "palette.primary"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use order summaries" description="Order summaries appear in checkout:" items={[
          "Checkout page sidebar or panel",
          "Order confirmation and receipt screens",
          "Cart review before payment",
          "Email order confirmation templates",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Build trust with clear totals:" items={[
          "Always show line-item breakdown",
          "Display taxes and shipping before final total",
          "Make promo code entry discoverable but not intrusive",
          "Update totals in real-time as options change",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show a clear breakdown: subtotal, discount, tax, shipping, then total." },
        { type: "dont", text: "Don't hide taxes until the last step — show estimated tax early." },
        { type: "do", text: "Confirm promo code application with a visual indicator.", visual: <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: palette.success }}><CheckCircle /> SAVE10 applied</div> },
        { type: "dont", text: "Don't let the order total exceed the visible viewport without scrolling." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Items list", description: "Product rows with thumbnails and prices", x: 50, y: 15 },
        { id: 2, label: "Promo input", description: "Discount code entry with apply button", x: 50, y: 38 },
        { id: 3, label: "Shipping selector", description: "Delivery method radio options", x: 50, y: 55 },
        { id: 4, label: "Totals breakdown", description: "Subtotal, tax, discount, shipping lines", x: 50, y: 75 },
        { id: 5, label: "CTA button", description: "Place order / checkout action", x: 50, y: 93 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, border: `1px solid ${palette.border}`, borderRadius: 8, padding: 10, backgroundColor: palette.surface }}>
          <div style={{ opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {[1, 2].map(i => <div key={i} style={{ display: "flex", gap: 4, marginBottom: 6, alignItems: "center" }}><div style={{ width: 20, height: 20, borderRadius: 3, backgroundColor: palette.surfaceMuted }} /><div style={{ flex: 1, height: 6, borderRadius: 2, backgroundColor: palette.border + "40" }} /><span style={{ fontSize: 7, color: palette.textPrimary }}>$99</span></div>)}
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ flex: 1, height: 18, borderRadius: 4, border: `1px solid ${palette.border}` }} />
            <div style={{ height: 18, padding: "0 6px", borderRadius: 4, border: `1px solid ${palette.border}`, fontSize: 7, display: "flex", alignItems: "center", color: palette.textSecondary }}>Apply</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 8, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {["Standard", "Express"].map(s => <div key={s} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 7, color: palette.textSecondary }}><div style={{ width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${palette.border}` }} />{s}</div>)}
          </div>
          <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 6, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {["Subtotal", "Tax", "Total"].map(l => <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 7, color: l === "Total" ? palette.textPrimary : palette.textSecondary, fontWeight: l === "Total" ? 700 : 400, marginBottom: 3 }}><span>{l}</span><span>$XX</span></div>)}
          </div>
          <div style={{ height: 16, borderRadius: 4, backgroundColor: palette.primary, marginTop: 6, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Max Width", value: "440px" },
        { label: "Thumbnail Size", value: "48 × 48px" },
        { label: "Promo Input Height", value: "40px" },
        { label: "Total Font Size", value: "16px / 800" },
        { label: "Row Spacing", value: "10px" },
        { label: "Section Padding", value: "16px" },
        { label: "CTA Height", value: "44px" },
      ]} />
    </motion.section>
  );
}
