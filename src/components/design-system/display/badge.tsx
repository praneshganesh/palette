"use client";

import type { PaletteTokenSet, DesignSystem } from "@/types";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function DSBadge({
  system,
  palette,
  variant = "neutral",
  size = "md",
  dot = false,
  icon,
  children,
  style,
}: BadgeProps) {
  const radius = system.spacing.radius.full;

  const colorMap: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
    success: { bg: palette.success + "18", text: palette.success, dot: palette.success },
    warning: { bg: palette.warning + "18", text: palette.warning, dot: palette.warning },
    danger: { bg: palette.danger + "18", text: palette.danger, dot: palette.danger },
    info: { bg: palette.info + "18", text: palette.info, dot: palette.info },
    neutral: { bg: palette.border + "60", text: palette.textSecondary, dot: palette.textSecondary },
  };

  const sizeMap = {
    sm: { height: 20, px: 8, fontSize: 10, dotSize: 6 },
    md: { height: 24, px: 10, fontSize: 11, dotSize: 7 },
    lg: { height: 28, px: 12, fontSize: 12, dotSize: 8 },
  };

  const c = colorMap[variant];
  const s = sizeMap[size];

  if (dot && !children && !icon) {
    return (
      <span
        style={{
          display: "inline-block",
          width: s.dotSize + 2,
          height: s.dotSize + 2,
          borderRadius: "50%",
          backgroundColor: c.dot,
          ...style,
        }}
      />
    );
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        height: s.height,
        padding: `0 ${s.px}px`,
        borderRadius: radius,
        backgroundColor: c.bg,
        color: c.text,
        fontSize: s.fontSize,
        fontWeight: 600,
        whiteSpace: "nowrap",
        lineHeight: 1,
        letterSpacing: "0.02em",
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: s.dotSize,
            height: s.dotSize,
            borderRadius: "50%",
            backgroundColor: c.dot,
            flexShrink: 0,
          }}
        />
      )}
      {icon && (
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
