"use client";

import { useState } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type ButtonVariant =
  | "filled"
  | "outlined"
  | "text"
  | "elevated"
  | "tonal"
  | "double-border"
  | "danger"
  | "success";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function DSButton({
  system,
  palette,
  variant = "filled",
  size = "md",
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  loading = false,
  disabled = false,
  children,
  onClick,
  fullWidth = false,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const comp = system.components;
  const radius = comp.button.borderRadius;

  const sizeMap = {
    sm: { height: 32, px: 14, py: 4, fontSize: 12, iconSize: 14, iconBtnSize: 32 },
    md: { height: 40, px: 20, py: 8, fontSize: 13, iconSize: 16, iconBtnSize: 40 },
    lg: { height: 48, px: 28, py: 12, fontSize: 15, iconSize: 18, iconBtnSize: 48 },
  };
  const s = sizeMap[size];

  const getVariantStyles = (): React.CSSProperties => {
    const effectiveRadius = iconOnly ? "50%" : radius;

    const base: React.CSSProperties = {
      borderRadius: effectiveRadius,
      fontWeight: comp.button.fontWeight,
      fontSize: s.fontSize,
      cursor: disabled ? "not-allowed" : "pointer",
      border: "none",
      transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
      fontFamily: "inherit",
      opacity: disabled ? 0.45 : 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: iconOnly ? s.iconBtnSize : s.height,
      width: iconOnly ? s.iconBtnSize : fullWidth ? "100%" : undefined,
      padding: iconOnly ? 0 : `${s.py}px ${s.px}px`,
      position: "relative",
      outline: "none",
      textDecoration: "none",
      whiteSpace: "nowrap",
      flexShrink: 0,
    };

    switch (variant) {
      case "filled":
        return {
          ...base,
          backgroundColor: isPressed
            ? palette.primaryHover
            : isHovered
              ? palette.primaryHover
              : palette.primary,
          color: comp.button.primaryText || palette.background,
          boxShadow: isHovered && !disabled ? `0 1px 3px ${hexToRgba(palette.primary, 0.3)}` : undefined,
        };

      case "outlined":
        return {
          ...base,
          backgroundColor: isPressed
            ? hexToRgba(palette.primary, 0.08)
            : isHovered
              ? hexToRgba(palette.primary, 0.04)
              : "transparent",
          color: palette.primary,
          border: `1.5px solid ${isHovered ? palette.primary : palette.border}`,
        };

      case "text":
        return {
          ...base,
          backgroundColor: isPressed
            ? hexToRgba(palette.primary, 0.1)
            : isHovered
              ? hexToRgba(palette.primary, 0.05)
              : "transparent",
          color: palette.primary,
          padding: iconOnly ? 0 : `${s.py}px ${s.px - 4}px`,
        };

      case "elevated":
        return {
          ...base,
          backgroundColor: palette.surface,
          color: palette.primary,
          boxShadow: isHovered
            ? `0 2px 8px ${hexToRgba(palette.primary, 0.15)}, 0 1px 3px rgba(0,0,0,0.1)`
            : `0 1px 4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)`,
        };

      case "tonal":
        return {
          ...base,
          backgroundColor: isPressed
            ? hexToRgba(palette.primary, 0.2)
            : isHovered
              ? hexToRgba(palette.primary, 0.16)
              : hexToRgba(palette.primary, 0.12),
          color: palette.primary,
        };

      case "double-border":
        return {
          ...base,
          backgroundColor: isPressed
            ? palette.primaryHover
            : isHovered
              ? palette.primaryHover
              : palette.primary,
          color: comp.button.primaryText || palette.background,
          border: `2px solid ${palette.primary}`,
          outline: `2px solid ${palette.primary}`,
          outlineOffset: "3px",
          borderRadius: iconOnly ? "50%" : "100px",
        };

      case "danger":
        return {
          ...base,
          backgroundColor: isPressed
            ? palette.danger
            : isHovered
              ? palette.danger
              : palette.danger,
          color: "#ffffff",
          opacity: disabled ? 0.45 : isHovered ? 0.9 : 1,
        };

      case "success":
        return {
          ...base,
          backgroundColor: palette.success,
          color: "#ffffff",
          opacity: disabled ? 0.45 : isHovered ? 0.9 : 1,
        };

      default:
        return base;
    }
  };

  const spinnerSvg = (
    <svg
      width={s.iconSize}
      height={s.iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: "spin 1s linear infinite" }}
    >
      <path d="M21 12a9 9 0 1 1-6.22-8.56" />
    </svg>
  );

  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={getVariantStyles()}
    >
      {loading ? (
        <>
          {spinnerSvg}
          {!iconOnly && children && <span>{children}</span>}
        </>
      ) : iconOnly ? (
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {leadingIcon || trailingIcon}
        </span>
      ) : (
        <>
          {leadingIcon && (
            <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {leadingIcon}
            </span>
          )}
          {children && <span>{children}</span>}
          {trailingIcon && (
            <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {trailingIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
