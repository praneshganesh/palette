"use client";

import { useState, useRef } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type InputVariant = "default" | "filled" | "outlined";
export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "error" | "success";

export interface TextInputProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  placeholder?: string;
  helperText?: string;
  state?: InputState;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  multiline?: boolean;
  rows?: number;
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

const CloseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function DSTextInput({
  system,
  palette,
  variant = "default",
  size = "md",
  label,
  placeholder,
  helperText,
  state = "default",
  prefixIcon,
  suffixIcon,
  clearable = false,
  disabled = false,
  readOnly = false,
  value: controlledValue,
  defaultValue = "",
  onChange,
  multiline = false,
  rows = 3,
  fullWidth = false,
}: TextInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    inputRef.current?.focus();
  };

  const comp = system.components;
  const radius = comp.input.borderRadius || comp.button.borderRadius;

  const sizeMap = {
    sm: { height: 32, px: 10, fontSize: 12, labelSize: 11, gap: 4 },
    md: { height: 40, px: 14, fontSize: 13, labelSize: 12, gap: 6 },
    lg: { height: 48, px: 16, fontSize: 15, labelSize: 13, gap: 8 },
  };
  const s = sizeMap[size];

  const stateColor =
    state === "error" ? palette.danger :
    state === "success" ? palette.success :
    isFocused ? palette.primary : palette.border;

  const getBorderColor = () => {
    if (disabled) return palette.border;
    if (state === "error") return palette.danger;
    if (state === "success") return palette.success;
    if (isFocused) return palette.primary;
    return palette.border;
  };

  const getBackground = () => {
    if (disabled) return palette.surfaceMuted;
    if (variant === "filled") return isFocused ? palette.surface : palette.surfaceMuted;
    return palette.surface;
  };

  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    gap: s.gap,
    width: fullWidth ? "100%" : undefined,
    minWidth: fullWidth ? undefined : 220,
    opacity: disabled ? 0.55 : 1,
  };

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: multiline ? "flex-start" : "center",
    gap: 8,
    backgroundColor: getBackground(),
    border: variant === "outlined" || variant === "default"
      ? `1.5px solid ${getBorderColor()}`
      : variant === "filled"
        ? `1.5px solid ${isFocused ? getBorderColor() : "transparent"}`
        : `1.5px solid ${getBorderColor()}`,
    borderRadius: radius,
    padding: multiline ? `${s.px - 2}px ${s.px}px` : `0 ${s.px}px`,
    height: multiline ? undefined : s.height,
    transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
    cursor: disabled ? "not-allowed" : "text",
    boxShadow: isFocused && !disabled
      ? `0 0 0 3px ${hexToRgba(stateColor, 0.12)}`
      : undefined,
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: s.fontSize,
    fontFamily: "inherit",
    color: disabled ? palette.textSecondary : palette.textPrimary,
    cursor: disabled ? "not-allowed" : readOnly ? "default" : "text",
    padding: 0,
    width: "100%",
    resize: multiline ? "vertical" : undefined,
    minHeight: multiline ? rows * 22 : undefined,
    lineHeight: multiline ? "1.6" : undefined,
  };

  const iconStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    color: isFocused ? palette.primary : palette.textSecondary,
    transition: "color 0.2s",
    flexShrink: 0,
    marginTop: multiline ? 4 : 0,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label
          style={{
            fontSize: s.labelSize,
            fontWeight: 600,
            color: state === "error" ? palette.danger : palette.textPrimary,
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </label>
      )}

      <div
        style={wrapperStyle}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {prefixIcon && <span style={iconStyle}>{prefixIcon}</span>}

        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            style={inputStyle}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={inputStyle}
          />
        )}

        {clearable && currentValue && !disabled && !readOnly && (
          <button
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
            style={{
              ...iconStyle,
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 2,
              borderRadius: "50%",
              color: palette.textSecondary,
            }}
            tabIndex={-1}
          >
            <CloseIcon size={s.fontSize - 1} />
          </button>
        )}

        {suffixIcon && <span style={iconStyle}>{suffixIcon}</span>}
      </div>

      {helperText && (
        <span
          style={{
            fontSize: s.labelSize - 1,
            color: state === "error" ? palette.danger : state === "success" ? palette.success : palette.textSecondary,
            lineHeight: 1.4,
          }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
