"use client";

import { useState } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type RadioSize = "sm" | "md" | "lg";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  size?: RadioSize;
  direction?: "horizontal" | "vertical";
  error?: boolean;
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function DSRadioGroup({
  system,
  palette,
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  disabled = false,
  size = "md",
  direction = "vertical",
  error = false,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const sizeMap = {
    sm: { outer: 16, inner: 8, fontSize: 12, descSize: 11, gap: 8, itemGap: 10 },
    md: { outer: 20, inner: 10, fontSize: 13, descSize: 11, gap: 10, itemGap: 14 },
    lg: { outer: 24, inner: 12, fontSize: 15, descSize: 12, gap: 12, itemGap: 16 },
  };
  const s = sizeMap[size];

  const handleSelect = (val: string) => {
    if (disabled) return;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div
      role="radiogroup"
      style={{
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap: s.itemGap,
        flexWrap: direction === "horizontal" ? "wrap" : undefined,
      }}
    >
      {options.map((opt) => {
        const isSelected = opt.value === currentValue;
        const isDisabled = disabled || opt.disabled;
        const isHovered = hoveredValue === opt.value;

        const borderColor = error
          ? palette.danger
          : isSelected
            ? palette.primary
            : isHovered
              ? palette.primary
              : palette.border;

        return (
          <label
            key={opt.value}
            onMouseEnter={() => setHoveredValue(opt.value)}
            onMouseLeave={() => setHoveredValue(null)}
            style={{
              display: "inline-flex",
              alignItems: opt.description ? "flex-start" : "center",
              gap: s.gap,
              cursor: isDisabled ? "not-allowed" : "pointer",
              opacity: isDisabled ? 0.5 : 1,
              userSelect: "none",
            }}
          >
            <div
              role="radio"
              aria-checked={isSelected}
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => !isDisabled && handleSelect(opt.value)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  if (!isDisabled) handleSelect(opt.value);
                }
              }}
              style={{
                width: s.outer,
                height: s.outer,
                borderRadius: "50%",
                border: `2px solid ${borderColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s cubic-bezier(0.2, 0, 0, 1)",
                flexShrink: 0,
                marginTop: opt.description ? 2 : 0,
                boxShadow: isHovered && !isDisabled
                  ? `0 0 0 3px ${hexToRgba(palette.primary, 0.1)}`
                  : undefined,
                outline: "none",
              }}
            >
              {isSelected && (
                <div
                  style={{
                    width: s.inner,
                    height: s.inner,
                    borderRadius: "50%",
                    backgroundColor: palette.primary,
                    transition: "transform 0.15s cubic-bezier(0.2, 0, 0, 1)",
                    transform: "scale(1)",
                  }}
                />
              )}
            </div>

            {(opt.label || opt.description) && (
              <div
                onClick={() => !isDisabled && handleSelect(opt.value)}
                style={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {opt.label && (
                  <span style={{ fontSize: s.fontSize, color: palette.textPrimary, fontWeight: 500, lineHeight: 1.3 }}>
                    {opt.label}
                  </span>
                )}
                {opt.description && (
                  <span style={{ fontSize: s.descSize, color: palette.textSecondary, lineHeight: 1.4 }}>
                    {opt.description}
                  </span>
                )}
              </div>
            )}
          </label>
        );
      })}
    </div>
  );
}
