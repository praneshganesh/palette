"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface PriceDisplaySectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type Currency = "USD" | "EUR" | "GBP";
const currencySymbols: Record<Currency, string> = { USD: "$", EUR: "€", GBP: "£" };

export function PriceDisplaySection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: PriceDisplaySectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showOriginal, setShowOriginal] = useState(true);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const sym = currencySymbols[currency];
  const rates: Record<Currency, number> = { USD: 1, EUR: 0.92, GBP: 0.79 };
  const convert = (usd: number) => (usd * rates[currency]).toFixed(2);

  const PriceTag = ({ price, original, label }: { price: number; original?: number; label?: string }) => (
    <div>
      {label && <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 4 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: palette.textPrimary }}>{sym}{convert(price)}</span>
        {original && showOriginal && (
          <span style={{ fontSize: 16, color: palette.textSecondary, textDecoration: "line-through" }}>{sym}{convert(original)}</span>
        )}
      </div>
      {original && showOriginal && (
        <span style={{ fontSize: 12, fontWeight: 600, color: palette.success, marginTop: 4, display: "inline-block" }}>
          Save {Math.round((1 - price / original) * 100)}%
        </span>
      )}
    </div>
  );

  return (
    <motion.section id="comp-price-display" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Price Display</p>
      <p style={sectionDesc}>
        Price displays render monetary values with currency symbols, sale/original pricing,
        per-unit rates, subscription intervals, and multi-currency support.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <PriceTag price={299} original={399} />
            <div style={{ display: "flex", gap: 4 }}>
              {(["USD", "EUR", "GBP"] as Currency[]).map(c => (
                <button key={c} onClick={() => setCurrency(c)} style={{ padding: "4px 10px", borderRadius: 99, border: `1px solid ${currency === c ? palette.primary : palette.border}`, backgroundColor: currency === c ? palette.primary + "10" : "transparent", color: currency === c ? palette.primary : palette.textSecondary, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ padding: 16, borderRadius: radius, border: `1px solid ${palette.border}`, flex: "1 1 140px" }}>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 4 }}>Per unit</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary }}>{sym}{convert(49)}<span style={{ fontSize: 13, fontWeight: 400, color: palette.textSecondary }}>/unit</span></div>
            </div>
            <div style={{ padding: 16, borderRadius: radius, border: `1px solid ${palette.border}`, flex: "1 1 140px" }}>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 4 }}>Subscription</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary }}>{sym}{convert(29)}<span style={{ fontSize: 13, fontWeight: 400, color: palette.textSecondary }}>/mo</span></div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Price Font", "28px / 800"], ["Original Font", "16px / line-through"], ["Save Color", "palette.success"], ["Unit Suffix", "13px / 400"], ["Currency Radius", "99px (pill)"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Standard</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: palette.textPrimary }}>{sym}{convert(199)}</div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Sale Price</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: palette.danger }}>{sym}{convert(149)}</span>
            <span style={{ fontSize: 14, color: palette.textSecondary, textDecoration: "line-through" }}>{sym}{convert(199)}</span>
          </div>
          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, backgroundColor: palette.danger + "12", color: palette.danger, fontWeight: 600, marginTop: 6, display: "inline-block" }}>-25%</span>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Range</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: palette.textPrimary }}>{sym}{convert(49)} – {sym}{convert(199)}</div>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 4 }}>Depends on configuration</div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Per Unit</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary }}>{sym}{convert(12.99)}<span style={{ fontSize: 13, color: palette.textSecondary, fontWeight: 400 }}>/kg</span></div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Subscription</div>
          <div>
            <span style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary }}>{sym}{convert(9.99)}</span>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>/month</span>
          </div>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 4 }}>Billed annually at {sym}{convert(119.88)}</div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Free / From</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: palette.success }}>Free</div>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 4 }}>Paid plans from {sym}{convert(9)}/mo</div>
        </div>
      </div>

      {/* Size variants */}
      <div style={subsectionLabel}>Size Scale</div>
      <div style={{ ...showcaseBox, display: "flex", alignItems: "baseline", gap: 32, flexWrap: "wrap" }}>
        {[{ label: "XS", size: 13 }, { label: "SM", size: 16 }, { label: "MD", size: 24 }, { label: "LG", size: 32 }, { label: "XL", size: 40 }].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 10, color: palette.textSecondary, marginBottom: 4 }}>{s.label}</div>
            <span style={{ fontSize: s.size, fontWeight: 800, color: palette.textPrimary }}>{sym}{convert(99)}</span>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div style={subsectionLabel}>Options</div>
      <div style={{ ...showcaseBox, display: "flex", alignItems: "center", gap: 16, maxWidth: 400 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: palette.textPrimary }}>
          <div onClick={() => setShowOriginal(!showOriginal)} style={{ width: 36, height: 20, borderRadius: 99, backgroundColor: showOriginal ? palette.primary : palette.border, padding: 2, cursor: "pointer", transition: "background-color .2s" }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff", transform: showOriginal ? "translateX(16px)" : "translateX(0)", transition: "transform .2s" }} />
          </div>
          Show original price
        </label>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use price displays" description="Price components appear in:" items={[
          "Product detail pages and listings",
          "Pricing tables and plan comparisons",
          "Cart and checkout summaries",
          "Promotional banners and sale sections",
        ]} />
        <UsageSection palette={palette} title="Formatting best practices" description="Display prices clearly:" items={[
          "Always include currency symbol or code",
          "Use consistent decimal precision (2 places)",
          "Show savings percentage for sale items",
          "Support locale-aware number formatting",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show both sale and original price for discount transparency.", visual: <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}><span style={{ fontSize: 14, fontWeight: 800, color: palette.textPrimary }}>$149</span><span style={{ fontSize: 11, textDecoration: "line-through", color: palette.textSecondary }}>$199</span></div> },
        { type: "dont", text: "Don't mix currency formats in the same view without labels." },
        { type: "do", text: "Use a smaller, lighter font weight for currency suffixes like '/mo'." },
        { type: "dont", text: "Don't show prices without consistent decimal formatting." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Currency symbol", description: "$ € £ or currency code prefix", x: 10, y: 40 },
        { id: 2, label: "Price value", description: "Main numeric amount (large, bold)", x: 35, y: 40 },
        { id: 3, label: "Original price", description: "Struck-through pre-discount amount", x: 65, y: 40 },
        { id: 4, label: "Savings badge", description: "Percentage or amount saved", x: 35, y: 70 },
        { id: 5, label: "Unit suffix", description: "/mo, /unit, /kg interval label", x: 60, y: 70 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: palette.textPrimary, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>$</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: palette.textPrimary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>149</span>
            <span style={{ fontSize: 12, color: palette.textSecondary, textDecoration: "line-through", opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>$199</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 99, backgroundColor: palette.success + "15", color: palette.success, fontWeight: 600, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>-25%</span>
            <span style={{ fontSize: 10, color: palette.textSecondary, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>/month</span>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Price Font (Large)", value: "28px / 800" },
        { label: "Price Font (Medium)", value: "20px / 700" },
        { label: "Original Price Font", value: "16px / line-through" },
        { label: "Suffix Font", value: "13px / 400" },
        { label: "Savings Badge", value: "12px / 600" },
        { label: "Currency Switcher", value: "11px / pill (99px radius)" },
        { label: "Price Gap", value: "8px" },
      ]} />
    </motion.section>
  );
}
