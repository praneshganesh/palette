"use client";

import { useState } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type CardVariant = "elevated" | "outlined" | "filled";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  variant?: CardVariant;
  size?: CardSize;
  horizontal?: boolean;
  interactive?: boolean;
  header?: React.ReactNode;
  media?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function DSCard({
  system,
  palette,
  variant = "elevated",
  size = "md",
  horizontal = false,
  interactive = false,
  header,
  media,
  children,
  footer,
  onClick,
  style,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const comp = system.components;
  const radius = comp.card.borderRadius || system.spacing.radius.lg;

  const sizeMap = {
    sm: { padding: 16, gap: 12, fontSize: 12 },
    md: { padding: 20, gap: 16, fontSize: 13 },
    lg: { padding: 28, gap: 20, fontSize: 14 },
  };
  const s = sizeMap[size];

  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      borderRadius: radius,
      overflow: "hidden",
      transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
      cursor: interactive || onClick ? "pointer" : "default",
      display: horizontal ? "flex" : "block",
      flexDirection: horizontal ? "row" : undefined,
    };

    switch (variant) {
      case "elevated":
        return {
          ...base,
          backgroundColor: palette.surface,
          boxShadow: isHovered && (interactive || onClick)
            ? system.spacing.elevation.lg
            : system.spacing.elevation.md,
          border: `1px solid transparent`,
          transform: isHovered && (interactive || onClick) ? "translateY(-2px)" : undefined,
        };
      case "outlined":
        return {
          ...base,
          backgroundColor: palette.surface,
          border: `1px solid ${isHovered && (interactive || onClick) ? palette.primary : palette.border}`,
          boxShadow: "none",
        };
      case "filled":
        return {
          ...base,
          backgroundColor: isHovered && (interactive || onClick)
            ? palette.surfaceMuted
            : palette.surfaceMuted,
          border: `1px solid transparent`,
          boxShadow: "none",
        };
      default:
        return base;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...getVariantStyles(), ...style }}
    >
      {media && (
        <div
          style={{
            width: horizontal ? 180 : "100%",
            minHeight: horizontal ? "100%" : 160,
            backgroundColor: palette.primary + "12",
            flexShrink: 0,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {media}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {header && (
          <div style={{ padding: `${s.padding}px ${s.padding}px 0` }}>
            {header}
          </div>
        )}
        {children && (
          <div style={{ padding: s.padding, fontSize: s.fontSize, color: palette.textSecondary, lineHeight: 1.6 }}>
            {children}
          </div>
        )}
        {footer && (
          <div
            style={{
              padding: `0 ${s.padding}px ${s.padding}px`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
