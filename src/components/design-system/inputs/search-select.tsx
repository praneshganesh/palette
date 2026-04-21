"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export interface SearchSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SearchSelectProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  options: SearchSelectOption[];
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
  emptyMessage?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const SearchIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function DSSearchSelect({
  system,
  palette,
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  label,
  placeholder = "Search...",
  helperText,
  disabled = false,
  error = false,
  size = "md",
  fullWidth = false,
  emptyMessage = "No results found",
}: SearchSelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const filtered = useMemo(
    () => options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()) ||
      (o.description && o.description.toLowerCase().includes(search.toLowerCase()))
    ),
    [options, search],
  );

  const handleSelect = useCallback((opt: SearchSelectOption) => {
    if (opt.disabled) return;
    if (!isControlled) setInternalValue(opt.value);
    onChange?.(opt.value);
    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(-1);
  }, [isControlled, onChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue("");
    onChange?.("");
    setSearch("");
  }, [isControlled, onChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) { setIsOpen(true); return; }
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filtered[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearch("");
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
        minWidth: fullWidth ? undefined : 260,
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
        onClick={() => { if (!disabled) setIsOpen(true); }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: s.height,
          padding: `0 ${s.px}px`,
          backgroundColor: palette.surface,
          border: `1.5px solid ${borderColor}`,
          borderRadius: radius,
          cursor: disabled ? "not-allowed" : "text",
          transition: "all 0.2s",
          boxShadow: isOpen ? `0 0 0 3px ${hexToRgba(palette.primary, 0.12)}` : undefined,
        }}
      >
        <span style={{ display: "flex", color: isOpen ? palette.primary : palette.textSecondary, flexShrink: 0 }}>
          <SearchIcon size={s.fontSize + 1} />
        </span>

        {isOpen ? (
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setHighlightedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder={selectedOption ? selectedOption.label : placeholder}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: s.fontSize,
              color: palette.textPrimary,
              fontFamily: "inherit",
              padding: 0,
            }}
          />
        ) : (
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
        )}

        {currentValue && !isOpen && (
          <button
            onClick={handleClear}
            style={{
              display: "flex",
              alignItems: "center",
              background: "none",
              border: "none",
              padding: 2,
              cursor: "pointer",
              color: palette.textSecondary,
              flexShrink: 0,
            }}
            tabIndex={-1}
          >
            <CloseIcon size={s.fontSize - 1} />
          </button>
        )}
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
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {filtered.length === 0 && (
            <div style={{ padding: "16px 14px", fontSize: 12, color: palette.textSecondary, textAlign: "center" }}>
              {emptyMessage}
            </div>
          )}
          {filtered.map((opt, i) => {
            const isSelected = opt.value === currentValue;
            const isHighlighted = i === highlightedIndex;
            return (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt)}
                onMouseEnter={() => setHighlightedIndex(i)}
                style={{
                  padding: `${opt.description ? 8 : 10}px ${s.px}px`,
                  cursor: opt.disabled ? "not-allowed" : "pointer",
                  backgroundColor: isSelected
                    ? hexToRgba(palette.primary, 0.1)
                    : isHighlighted
                      ? palette.surfaceMuted
                      : "transparent",
                  opacity: opt.disabled ? 0.5 : 1,
                  transition: "background-color 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: s.fontSize, color: palette.textPrimary }}>{opt.label}</div>
                  {opt.description && (
                    <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>{opt.description}</div>
                  )}
                </div>
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
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
