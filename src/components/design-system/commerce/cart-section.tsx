"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface CartSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const CartEmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

type CartItem = { id: string; name: string; variant: string; price: number; qty: number };

export function CartSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: CartSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const btnRadius = comp.button.borderRadius || system.spacing.radius.md;

  const [items, setItems] = useState<CartItem[]>([
    { id: "1", name: "Wireless Headphones", variant: "Black · Over-ear", price: 299, qty: 1 },
    { id: "2", name: "USB-C Hub", variant: "7-in-1 · Silver", price: 59, qty: 2 },
    { id: "3", name: "Mechanical Keyboard", variant: "Tactile · White", price: 149, qty: 1 },
  ]);
  const [showEmpty, setShowEmpty] = useState(false);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const updateQty = (id: string, delta: number) => setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it));
  const removeItem = (id: string) => setItems(prev => prev.filter(it => it.id !== id));
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  const QtyControl = ({ item }: { item: CartItem }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${palette.border}`, borderRadius: btnRadius, overflow: "hidden" }}>
      <button onClick={() => updateQty(item.id, -1)} style={{ border: "none", backgroundColor: "transparent", padding: "6px 8px", cursor: "pointer", color: palette.textSecondary, display: "flex" }}><MinusIcon /></button>
      <span style={{ padding: "4px 12px", fontSize: 13, fontWeight: 600, color: palette.textPrimary, borderLeft: `1px solid ${palette.border}`, borderRight: `1px solid ${palette.border}`, minWidth: 32, textAlign: "center" }}>{item.qty}</span>
      <button onClick={() => updateQty(item.id, 1)} style={{ border: "none", backgroundColor: "transparent", padding: "6px 8px", cursor: "pointer", color: palette.textSecondary, display: "flex" }}><PlusIcon /></button>
    </div>
  );

  return (
    <motion.section id="comp-cart" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Cart</p>
      <p style={sectionDesc}>
        Cart components display line items with images, quantity controls, removal actions,
        and a running subtotal for a seamless shopping experience.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary }}>Cart ({items.length})</span>
            <button onClick={() => setShowEmpty(!showEmpty)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 12, color: palette.primary, fontWeight: 600, fontFamily: "inherit" }}>{showEmpty ? "Show items" : "Show empty"}</button>
          </div>
          {showEmpty ? (
            <div style={{ textAlign: "center", padding: 48 }}>
              <span style={{ color: palette.textSecondary + "60", display: "inline-block", marginBottom: 16 }}><CartEmptyIcon /></span>
              <p style={{ fontSize: 15, fontWeight: 600, color: palette.textPrimary, margin: "0 0 6px" }}>Your cart is empty</p>
              <p style={{ fontSize: 13, color: palette.textSecondary, margin: 0 }}>Browse products and add items to get started.</p>
              <button style={{ marginTop: 20, padding: "10px 24px", borderRadius: btnRadius, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Continue Shopping</button>
            </div>
          ) : (
            <>
              {items.map((item, i) => (
                <div key={item.id} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: i < items.length - 1 ? `1px solid ${palette.border}` : "none", alignItems: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: radius, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>📦</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 2 }}>{item.variant}</div>
                  </div>
                  <QtyControl item={item} />
                  <div style={{ width: 80, textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>${(item.price * item.qty).toFixed(2)}</div>
                    {item.qty > 1 && <div style={{ fontSize: 11, color: palette.textSecondary }}>${item.price} each</div>}
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, display: "flex", padding: 4 }}><TrashIcon /></button>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: `1px solid ${palette.border}`, marginTop: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>Subtotal</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: palette.textPrimary }}>${subtotal.toFixed(2)}</span>
              </div>
              <button style={{ width: "100%", marginTop: 16, padding: "12px 0", borderRadius: btnRadius, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Proceed to Checkout</button>
            </>
          )}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Image Size", "64px"], ["Item Gap", "16px"], ["Border Radius", radius], ["Subtotal Font", "20px / 800"], ["Danger Color", "palette.danger"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Variant */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Compact / Mini Cart</div>
          {items.slice(0, 2).map((item, i) => (
            <div key={item.id} style={{ display: "flex", gap: 10, marginBottom: i < 1 ? 10 : 0, alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: system.spacing.radius.sm, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📦</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>{item.name}</div>
                <div style={{ fontSize: 11, color: palette.textSecondary }}>×{item.qty} · ${item.price}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${palette.border}`, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: palette.textSecondary }}>Subtotal</span>
            <span style={{ fontWeight: 700, color: palette.textPrimary }}>${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Empty State</div>
          <div style={{ textAlign: "center", padding: 24 }}>
            <span style={{ color: palette.textSecondary + "50", display: "inline-block", marginBottom: 10 }}><CartEmptyIcon /></span>
            <p style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, margin: "0 0 4px" }}>No items yet</p>
            <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>Add products to get started</p>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use cart components" description="Cart displays manage purchase items:" items={[
          "E-commerce checkout flows",
          "Mini-cart dropdowns in navigation",
          "Cart pages with full item management",
          "Side panels for quick cart review",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Keep the cart experience smooth:" items={[
          "Show running subtotal updated in real-time",
          "Allow quantity changes without page reload",
          "Display per-unit price when qty > 1",
          "Provide a clear empty state with CTA",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show product images and variant info for easy identification." },
        { type: "dont", text: "Don't require a separate page to change quantities." },
        { type: "do", text: "Provide a clear path to checkout from every cart view." },
        { type: "dont", text: "Don't remove items without a confirmation or undo option." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Product image", description: "Thumbnail of the cart item", x: 8, y: 35 },
        { id: 2, label: "Item details", description: "Name, variant, and per-unit price", x: 35, y: 35 },
        { id: 3, label: "Qty control", description: "Increment/decrement stepper", x: 60, y: 35 },
        { id: 4, label: "Line total", description: "Price × quantity subtotal", x: 80, y: 35 },
        { id: 5, label: "Remove button", description: "Delete item from cart", x: 93, y: 35 },
      ]} renderPreview={(h) => (
        <div style={{ width: 260 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 0", borderBottom: i === 0 ? `1px solid ${palette.border}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 4, backgroundColor: palette.surfaceMuted, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>📦</div>
              <div style={{ flex: 1, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: palette.textPrimary }}>Item {i + 1}</div>
                <div style={{ fontSize: 7, color: palette.textSecondary }}>Variant</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 2, border: `1px solid ${palette.border}`, borderRadius: 4, padding: "2px 4px", opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                <span style={{ fontSize: 8, color: palette.textSecondary }}>−</span>
                <span style={{ fontSize: 8, fontWeight: 600, color: palette.textPrimary, padding: "0 4px" }}>{i + 1}</span>
                <span style={{ fontSize: 8, color: palette.textSecondary }}>+</span>
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, color: palette.textPrimary, width: 30, textAlign: "right", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>${(i + 1) * 59}</span>
              <span style={{ fontSize: 8, color: palette.textSecondary, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>🗑</span>
            </div>
          ))}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Thumbnail Size", value: "64 × 64px" },
        { label: "Mini Thumbnail", value: "40 × 40px" },
        { label: "Row Padding", value: "16px 0" },
        { label: "Qty Control Height", value: "32px" },
        { label: "Subtotal Font", value: "20px / 800" },
        { label: "CTA Button Padding", value: "12px 0 (full width)" },
        { label: "Border Radius", value: radius },
      ]} />
    </motion.section>
  );
}
