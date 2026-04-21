"use client";

import type { PaletteTokenSet } from "@/types";

export interface MeasurementAttribute {
  label: string;
  value: string;
}

interface MeasurementsTableProps {
  palette: PaletteTokenSet;
  attributes: MeasurementAttribute[];
}

export function MeasurementsTable({ palette, attributes }: MeasurementsTableProps) {
  return (
    <div
      style={{
        border: `1px solid ${palette.border}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          backgroundColor: palette.surfaceMuted,
          borderBottom: `1px solid ${palette.border}`,
          padding: "10px 20px",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary }}>
          Attribute
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary }}>
          Value
        </div>
      </div>
      {attributes.map((attr, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "10px 20px",
            borderBottom: i < attributes.length - 1 ? `1px solid ${palette.border}` : "none",
            backgroundColor: palette.surface,
          }}
        >
          <div style={{ fontSize: 13, color: palette.textSecondary }}>
            {attr.label}
          </div>
          <div style={{ fontSize: 13, color: palette.textPrimary, fontFamily: "monospace" }}>
            {attr.value}
          </div>
        </div>
      ))}
    </div>
  );
}

interface TokensGridProps {
  palette: PaletteTokenSet;
  tokens: { label: string; value: string }[];
}

export function TokensGrid({ palette, tokens }: TokensGridProps) {
  return (
    <div
      style={{
        backgroundColor: palette.surfaceMuted,
        border: `1px solid ${palette.border}`,
        borderRadius: 12,
        padding: 20,
      }}
    >
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 14, marginTop: 0 }}>
        Design Tokens
      </p>
      {tokens.map((t, i) => (
        <div key={i} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 8 }}>
          {t.label}
          <br />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>
            → {t.value}
          </span>
        </div>
      ))}
    </div>
  );
}
