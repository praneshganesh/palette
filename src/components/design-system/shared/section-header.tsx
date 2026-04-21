"use client";

import type { PaletteTokenSet, DesignSystem } from "@/types";

interface SectionHeaderProps {
  palette: PaletteTokenSet;
  system?: DesignSystem;
  children: React.ReactNode;
  first?: boolean;
}

export function SubsectionHeader({ palette, system, children, first }: SectionHeaderProps) {
  return (
    <div
      style={{
        fontSize: 16,
        fontWeight: 700,
        color: palette.textPrimary,
        fontFamily: system?.typography.headingFont,
        marginTop: first ? 32 : 56,
        marginBottom: 20,
        paddingBottom: 12,
        borderBottom: `2px solid ${palette.primary}20`,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 4,
          height: 20,
          borderRadius: 2,
          backgroundColor: palette.primary,
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

export function subsectionLabelStyle(palette: PaletteTokenSet): React.CSSProperties {
  return {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
    display: "flex",
    alignItems: "center",
    gap: 10,
  };
}
