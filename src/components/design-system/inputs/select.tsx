"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ChevronDown = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function DSSelect({
  system,
  palette,
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  label,
  placeholder = "Select...",
  helperText,
  disabled = false,
  error = false,
  size = "md",
  fullWidth = false,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const selectedOption = options.find((o) => o.value === currentValue);

  const comp = system.components;
  const radius = comp.input.borderRadius || comp.button.borderRadius;

  const sizeMap = {
    sm: { height: 32, px: 10, fontSize: 12, labelSize: 11 },
    md: { height: 40, px: 14, fontSize: 13, labelSize: 12 },
    lg: { height: 48, px: 16, fontSize: 15, labelSize: 13 },
  };
  const s = sizeMap[size];

  const handleSelect = useCallback((opt: SelectOption) => {
    if (opt.disabled) return;
    if (!isControlled) setInternalValue(opt.value);
    onChange?.(opt.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, [isControlled, onChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen && highlightedIndex >= 0) {
        handleSelect(options[highlightedIndex]);
      } else {
        setIsOpen(!isOpen);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) { setIsOpen(true); setHighlightedIndex(0); return; }
      setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const borderColor = error ? palette.danger : isOpen ? palette.primary : palette.border;

  return (
    <div
      ref={containerRef}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 6,
        width: fullWidth ? "100%" : undefined,
        minWidth: fullWidth ? undefined : 220,
        position: "relative",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      {label && (
        <label style={{ fontSize: s.labelSize, fontWeight: 600, color: error ? palette.danger : palette.textPrimary }}>
          {label}
        </label>
      )}

      <div
        role="combobox"
        aria-expanded={isOpen}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: s.height,
          padding: `0 ${s.px}px`,
          backgroundColor: palette.surface,
          border: `1.5px solid ${borderColor}`,
          borderRadius: radius,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          boxShadow: isOpen ? `0 0 0 3px ${hexToRgba(palette.primary, 0.12)}` : undefined,
          outline: "none",
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: s.fontSize,
            color: selectedOption ? palette.textPrimary : palette.textSecondary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          style={{
            display: "flex",
            color: palette.textSecondary,
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <ChevronDown size={s.fontSize + 1} />
        </span>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 4,
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: radius,
            boxShadow: `0 8px 24px rgba(0,0,0,0.12)`,
            zIndex: 50,
            overflow: "hidden",
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === currentValue;
            const isHighlighted = i === highlightedIndex;
            return (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt)}
                onMouseEnter={() => setHighlightedIndex(i)}
                style={{
                  padding: `${s.height / 4}px ${s.px}px`,
                  fontSize: s.fontSize,
                  color: opt.disabled ? palette.textSecondary : palette.textPrimary,
                  backgroundColor: isSelected
                    ? hexToRgba(palette.primary, 0.1)
                    : isHighlighted
                      ? palette.surfaceMuted
                      : "transparent",
                  cursor: opt.disabled ? "not-allowed" : "pointer",
                  transition: "background-color 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: opt.disabled ? 0.5 : 1,
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}

      {helperText && (
        <span style={{ fontSize: s.labelSize - 1, color: error ? palette.danger : palette.textSecondary }}>
          {helperText}
        </span>
      )}
    </div>
  );
}
