"use client";

import { useState } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  size?: CheckboxSize;
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function DSCheckbox({
  system,
  palette,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  description,
  disabled = false,
  indeterminate = false,
  error = false,
  size = "md",
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [isHovered, setIsHovered] = useState(false);

  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const sizeMap = {
    sm: { box: 16, icon: 10, fontSize: 12, descSize: 11, gap: 8 },
    md: { box: 20, icon: 12, fontSize: 13, descSize: 11, gap: 10 },
    lg: { box: 24, icon: 14, fontSize: 15, descSize: 12, gap: 12 },
  };
  const s = sizeMap[size];

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const borderColor = error
    ? palette.danger
    : isChecked || indeterminate
      ? palette.primary
      : isHovered
        ? palette.primary
        : palette.border;

  const bgColor = isChecked || indeterminate
    ? palette.primary
    : "transparent";

  return (
    <label
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: description ? "flex-start" : "center",
        gap: s.gap,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
      }}
    >
      <div
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : isChecked}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } }}
        style={{
          width: s.box,
          height: s.box,
          borderRadius: system.spacing.radius.sm || "4px",
          border: `2px solid ${borderColor}`,
          backgroundColor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s cubic-bezier(0.2, 0, 0, 1)",
          flexShrink: 0,
          marginTop: description ? 2 : 0,
          boxShadow: isHovered && !disabled
            ? `0 0 0 3px ${hexToRgba(palette.primary, 0.1)}`
            : undefined,
          outline: "none",
        }}
      >
        {isChecked && !indeterminate && (
          <svg
            width={s.icon}
            height={s.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {indeterminate && (
          <svg
            width={s.icon}
            height={s.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </div>

      {(label || description) && (
        <div onClick={toggle} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {label && (
            <span style={{ fontSize: s.fontSize, color: palette.textPrimary, fontWeight: 500, lineHeight: 1.3 }}>
              {label}
            </span>
          )}
          {description && (
            <span style={{ fontSize: s.descSize, color: palette.textSecondary, lineHeight: 1.4 }}>
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
