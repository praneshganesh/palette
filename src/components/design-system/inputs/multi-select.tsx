"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  maxChipsVisible?: number;
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

const CloseIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export function DSMultiSelect({
  system,
  palette,
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  label,
  placeholder = "Select items...",
  helperText,
  disabled = false,
  error = false,
  size = "md",
  fullWidth = false,
  maxChipsVisible = 3,
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const selected = isControlled ? controlledValue : internalValue;

  const comp = system.components;
  const radius = comp.input.borderRadius || comp.button.borderRadius;

  const sizeMap = {
    sm: { minHeight: 32, px: 10, fontSize: 12, labelSize: 11, chipH: 22, chipFont: 10 },
    md: { minHeight: 40, px: 12, fontSize: 13, labelSize: 12, chipH: 26, chipFont: 11 },
    lg: { minHeight: 48, px: 14, fontSize: 15, labelSize: 13, chipH: 30, chipFont: 12 },
  };
  const s = sizeMap[size];

  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())),
    [options, search],
  );

  const toggleValue = useCallback((val: string) => {
    const next = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val];
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }, [selected, isControlled, onChange]);

  const removeChip = useCallback((val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = selected.filter((v) => v !== val);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }, [selected, isControlled, onChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  const borderColor = error ? palette.danger : isOpen ? palette.primary : palette.border;
  const visibleChips = selected.slice(0, maxChipsVisible);
  const overflowCount = selected.length - maxChipsVisible;

  return (
    <div
      ref={containerRef}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 6,
        width: fullWidth ? "100%" : undefined,
        minWidth: fullWidth ? undefined : 280,
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
        onClick={() => { if (!disabled) setIsOpen(!isOpen); }}
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 6,
          minHeight: s.minHeight,
          padding: `4px ${s.px}px`,
          backgroundColor: palette.surface,
          border: `1.5px solid ${borderColor}`,
          borderRadius: radius,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          boxShadow: isOpen ? `0 0 0 3px ${hexToRgba(palette.primary, 0.12)}` : undefined,
        }}
      >
        {selected.length === 0 && (
          <span style={{ fontSize: s.fontSize, color: palette.textSecondary }}>{placeholder}</span>
        )}

        {visibleChips.map((val) => {
          const opt = options.find((o) => o.value === val);
          return (
            <span
              key={val}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                height: s.chipH,
                padding: "0 8px",
                backgroundColor: hexToRgba(palette.primary, 0.1),
                color: palette.primary,
                borderRadius: 100,
                fontSize: s.chipFont,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {opt?.label ?? val}
              {!disabled && (
                <button
                  onClick={(e) => removeChip(val, e)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    color: palette.primary,
                    opacity: 0.7,
                  }}
                  tabIndex={-1}
                >
                  <CloseIcon size={s.chipFont - 1} />
                </button>
              )}
            </span>
          );
        })}

        {overflowCount > 0 && (
          <span style={{
            fontSize: s.chipFont,
            fontWeight: 600,
            color: palette.primary,
            padding: "0 4px",
          }}>
            +{overflowCount}
          </span>
        )}

        <span
          style={{
            marginLeft: "auto",
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
          }}
        >
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${palette.border}` }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 8px",
              height: 32,
              backgroundColor: palette.surfaceMuted,
              borderRadius: system.spacing.radius.sm,
            }}>
              <SearchIcon size={14} />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 12,
                  color: palette.textPrimary,
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          <div style={{ maxHeight: 180, overflowY: "auto" }}>
            {filtered.length === 0 && (
              <div style={{ padding: "12px 14px", fontSize: 12, color: palette.textSecondary, textAlign: "center" }}>
                No options found
              </div>
            )}
            {filtered.map((opt) => {
              const isChecked = selected.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  onClick={(e) => { e.stopPropagation(); if (!opt.disabled) toggleValue(opt.value); }}
                  style={{
                    padding: `8px ${s.px}px`,
                    fontSize: s.fontSize,
                    color: opt.disabled ? palette.textSecondary : palette.textPrimary,
                    backgroundColor: isChecked ? hexToRgba(palette.primary, 0.06) : "transparent",
                    cursor: opt.disabled ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: opt.disabled ? 0.5 : 1,
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => { if (!opt.disabled) (e.currentTarget.style.backgroundColor = isChecked ? hexToRgba(palette.primary, 0.1) : palette.surfaceMuted); }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isChecked ? hexToRgba(palette.primary, 0.06) : "transparent"; }}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: `2px solid ${isChecked ? palette.primary : palette.border}`,
                    backgroundColor: isChecked ? palette.primary : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s",
                    flexShrink: 0,
                  }}>
                    {isChecked && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span>{opt.label}</span>
                </div>
              );
            })}
          </div>

          {selected.length > 0 && (
            <div style={{
              padding: "8px 12px",
              borderTop: `1px solid ${palette.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: 11, color: palette.textSecondary }}>
                {selected.length} selected
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isControlled) setInternalValue([]);
                  onChange?.([]);
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 11,
                  fontWeight: 600,
                  color: palette.primary,
                  cursor: "pointer",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                Clear all
              </button>
            </div>
          )}
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
