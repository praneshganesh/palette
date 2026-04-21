"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ProductCardSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const CartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const Rating = ({ value, palette }: { value: number; palette: PaletteTokenSet }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
    {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: i <= value ? palette.warning : palette.border }}><StarIcon filled={i <= value} /></span>)}
    <span style={{ fontSize: 11, color: palette.textSecondary, marginLeft: 4 }}>({value}.0)</span>
  </div>
);

type Product = { name: string; price: number; oldPrice?: number; rating: number; tag?: string; colors?: string[] };

const products: Product[] = [
  { name: "Premium Headphones", price: 299, oldPrice: 349, rating: 4, tag: "Sale", colors: ["#1a1a2e", "#e94560", "#f5f5f5"] },
  { name: "Wireless Keyboard", price: 149, rating: 5, colors: ["#f5f5f5", "#2d3436"] },
  { name: "Smart Watch Pro", price: 449, rating: 4, tag: "New" },
  { name: "Portable Speaker", price: 79, oldPrice: 99, rating: 3, tag: "Sale" },
];

export function ProductCardSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ProductCardSectionProps) {
  const comp = system.components;
  const radius = comp.card.borderRadius || system.spacing.radius.lg;
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [selectedColor, setSelectedColor] = useState<Record<string, number>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const toggleWish = (name: string) => setWishlisted(prev => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; });

  const ProductCard = ({ product, variant = "default" }: { product: Product; variant?: "default" | "horizontal" | "minimal" }) => {
    const isWished = wishlisted.has(product.name);
    const isHovered = hovered === product.name + variant;
    if (variant === "horizontal") {
      return (
        <div style={{ display: "flex", gap: 16, padding: 16, border: `1px solid ${palette.border}`, borderRadius: radius, backgroundColor: palette.surface }}>
          <div style={{ width: 100, height: 100, borderRadius: system.spacing.radius.md, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>📦</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>{product.name}</div>
            <Rating value={product.rating} palette={palette} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary }}>${product.price}</span>
              {product.oldPrice && <span style={{ fontSize: 13, color: palette.textSecondary, textDecoration: "line-through" }}>${product.oldPrice}</span>}
            </div>
          </div>
          <button onClick={() => toggleWish(product.name)} style={{ border: "none", background: "none", cursor: "pointer", color: isWished ? palette.danger : palette.textSecondary, alignSelf: "start" }}><HeartIcon filled={isWished} /></button>
        </div>
      );
    }
    if (variant === "minimal") {
      return (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "100%", height: 120, borderRadius: system.spacing.radius.md, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 12 }}>📦</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>{product.name}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: palette.primary }}>${product.price}</div>
        </div>
      );
    }
    return (
      <div
        onMouseEnter={() => setHovered(product.name + variant)}
        onMouseLeave={() => setHovered(null)}
        style={{ border: `1px solid ${palette.border}`, borderRadius: radius, overflow: "hidden", backgroundColor: palette.surface, transition: "box-shadow .2s, transform .2s", boxShadow: isHovered ? "0 8px 24px rgba(0,0,0,0.08)" : "none", transform: isHovered ? "translateY(-2px)" : "none" }}
      >
        <div style={{ position: "relative", height: 160, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
          📦
          {product.tag && (
            <span style={{ position: "absolute", top: 10, left: 10, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, backgroundColor: product.tag === "Sale" ? palette.danger : palette.primary, color: "#fff" }}>{product.tag}</span>
          )}
          <button onClick={() => toggleWish(product.name)} style={{ position: "absolute", top: 10, right: 10, border: "none", background: "none", cursor: "pointer", color: isWished ? palette.danger : palette.textSecondary + "80" }}><HeartIcon filled={isWished} /></button>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 6 }}>{product.name}</div>
          <Rating value={product.rating} palette={palette} />
          {product.colors && (
            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
              {product.colors.map((c, i) => (
                <div key={c} onClick={() => setSelectedColor(prev => ({ ...prev, [product.name]: i }))} style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: c, border: `2px solid ${(selectedColor[product.name] ?? 0) === i ? palette.primary : palette.border}`, cursor: "pointer" }} />
              ))}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary }}>${product.price}</span>
              {product.oldPrice && <span style={{ fontSize: 13, color: palette.textSecondary, textDecoration: "line-through" }}>${product.oldPrice}</span>}
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: comp.button.borderRadius || system.spacing.radius.md, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <CartIcon /> Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.section id="comp-product-card" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Product Card</p>
      <p style={sectionDesc}>
        Product cards display item images, titles, prices, ratings, variant selectors,
        and actions like add-to-cart and wishlist in a compact commerce-ready format.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {products.slice(0, 2).map(p => <ProductCard key={p.name} product={p} />)}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Card Radius", radius], ["Image Height", "160px"], ["Price Font", "18px / 700"], ["Tag BG (Sale)", "palette.danger"], ["Wishlist Active", "palette.danger"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Horizontal</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {products.slice(0, 2).map(p => <ProductCard key={p.name} product={p} variant="horizontal" />)}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Minimal</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {products.slice(0, 4).map(p => <ProductCard key={p.name} product={p} variant="minimal" />)}
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use product cards" description="Product cards are ideal for:" items={[
          "E-commerce catalog and listing pages",
          "Featured products and recommendations",
          "Search and filter result grids",
          "Promotional sections and deals",
        ]} />
        <UsageSection palette={palette} title="Variant selection" description="Choose the right layout:" items={[
          "Default — Full card for grid-based catalogs",
          "Horizontal — List view for comparison shopping",
          "Minimal — Quick browse with less detail",
          "With variants — Color/size selection inline",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show original and sale price together for discount clarity." },
        { type: "dont", text: "Don't overflow product names — truncate with ellipsis." },
        { type: "do", text: "Use color badges for tags like 'Sale' and 'New'.", visual: <div style={{ display: "flex", gap: 4 }}><span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10, backgroundColor: palette.danger, color: "#fff" }}>Sale</span><span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10, backgroundColor: palette.primary, color: "#fff" }}>New</span></div> },
        { type: "dont", text: "Don't show add-to-cart without price information visible." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Image area", description: "Product photo with tag and wishlist", x: 50, y: 15 },
        { id: 2, label: "Title", description: "Product name and description", x: 30, y: 45 },
        { id: 3, label: "Rating", description: "Star rating with count", x: 30, y: 58 },
        { id: 4, label: "Price", description: "Current and original price", x: 25, y: 80 },
        { id: 5, label: "Action", description: "Add to cart button", x: 75, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ width: 160, border: `1px solid ${palette.border}`, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ height: 70, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>📦</div>
          <div style={{ padding: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: palette.textPrimary, marginBottom: 4, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Product Name</div>
            <div style={{ display: "flex", gap: 1, marginBottom: 6, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
              {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: i <= 4 ? palette.warning : palette.border, fontSize: 8 }}>★</span>)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>$99</span>
              <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 4, backgroundColor: palette.primary, color: "#fff", opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Add</span>
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Card Border Radius", value: radius },
        { label: "Image Height", value: "160px" },
        { label: "Content Padding", value: "16px" },
        { label: "Title Font Size", value: "14px / 600" },
        { label: "Price Font Size", value: "18px / 700" },
        { label: "Tag Padding", value: "3px 10px" },
        { label: "Color Swatch Size", value: "18px" },
      ]} />
    </motion.section>
  );
}
