"use client";

import { useState } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type ChipVariant = "filter" | "input" | "suggestion" | "assistive";
export type ChipSize = "sm" | "md";

export interface ChipProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  removable?: boolean;
  leadingIcon?: React.ReactNode;
  onRemove?: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const CloseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckSmall = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function DSChip({
  system,
  palette,
  variant = "filter",
  size = "md",
  selected = false,
  removable = false,
  leadingIcon,
  onRemove,
  onClick,
  children,
  style,
}: ChipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const radius = system.spacing.radius.full;

  const sizeMap = {
    sm: { height: 28, px: 10, fontSize: 11, iconSize: 12 },
    md: { height: 34, px: 14, fontSize: 13, iconSize: 14 },
  };
  const s = sizeMap[size];

  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      height: s.height,
      padding: `0 ${s.px}px`,
      borderRadius: radius,
      fontSize: s.fontSize,
      fontWeight: 500,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      cursor: onClick || variant === "filter" ? "pointer" : "default",
      border: "none",
      fontFamily: "inherit",
      transition: "all 0.15s",
      whiteSpace: "nowrap",
      outline: "none",
    };

    switch (variant) {
      case "filter":
        return {
          ...base,
          backgroundColor: selected ? palette.primary : isHovered ? palette.primary + "12" : palette.surfaceMuted,
          color: selected ? palette.background : palette.textPrimary,
          border: `1px solid ${selected ? palette.primary : palette.border}`,
        };
      case "input":
        return {
          ...base,
          backgroundColor: palette.surfaceMuted,
          color: palette.textPrimary,
          border: `1px solid ${palette.border}`,
        };
      case "suggestion":
        return {
          ...base,
          backgroundColor: isHovered ? palette.primary + "12" : "transparent",
          color: palette.primary,
          border: `1px solid ${isHovered ? palette.primary : palette.border}`,
        };
      case "assistive":
        return {
          ...base,
          backgroundColor: palette.surface,
          color: palette.textPrimary,
          border: `1px solid ${palette.border}`,
          boxShadow: system.spacing.elevation.sm,
        };
      default:
        return base;
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...getStyles(), ...style }}
    >
      {variant === "filter" && selected && <CheckSmall size={s.iconSize} />}
      {leadingIcon && <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{leadingIcon}</span>}
      {children}
      {removable && (
        <span
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 2,
            cursor: "pointer",
            opacity: 0.6,
            transition: "opacity 0.15s",
          }}
        >
          <CloseIcon size={s.iconSize} />
        </span>
      )}
    </button>
  );
}
