"use client";

import { motion } from "framer-motion";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressVariant = "linear" | "circular";

export interface ProgressProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  value?: number;
  indeterminate?: boolean;
  size?: ProgressSize;
  color?: string;
  showLabel?: boolean;
  variant?: ProgressVariant;
}

function getHeight(size: ProgressSize): number {
  switch (size) {
    case "sm": return 4;
    case "md": return 8;
    case "lg": return 12;
  }
}

function getCircularSize(size: ProgressSize): number {
  switch (size) {
    case "sm": return 32;
    case "md": return 48;
    case "lg": return 64;
  }
}

function getStrokeWidth(size: ProgressSize): number {
  switch (size) {
    case "sm": return 3;
    case "md": return 4;
    case "lg": return 5;
  }
}

export function DSProgress({
  system,
  palette,
  value = 0,
  indeterminate = false,
  size = "md",
  color,
  showLabel = false,
  variant = "linear",
}: ProgressProps) {
  const barColor = color || palette.primary;
  const radius = system.spacing.radius;

  if (variant === "circular") {
    const circSize = getCircularSize(size);
    const stroke = getStrokeWidth(size);
    const r = (circSize - stroke) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div style={{ position: "relative", width: circSize, height: circSize, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={circSize} height={circSize} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={circSize / 2}
            cy={circSize / 2}
            r={r}
            fill="none"
            stroke={palette.border}
            strokeWidth={stroke}
          />
          {indeterminate ? (
            <motion.circle
              cx={circSize / 2}
              cy={circSize / 2}
              r={r}
              fill="none"
              stroke={barColor}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: [circumference, 0], rotate: [0, 360] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center" }}
            />
          ) : (
            <motion.circle
              cx={circSize / 2}
              cy={circSize / 2}
              r={r}
              fill="none"
              stroke={barColor}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </svg>
        {showLabel && !indeterminate && size !== "sm" && (
          <div style={{
            position: "absolute",
            fontSize: size === "lg" ? 12 : 10,
            fontWeight: 600,
            color: palette.textPrimary,
          }}>
            {Math.round(value)}%
          </div>
        )}
      </div>
    );
  }

  const h = getHeight(size);

  return (
    <div style={{ width: "100%" }}>
      {showLabel && !indeterminate && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: palette.textSecondary }}>Progress</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: palette.textPrimary }}>{Math.round(value)}%</span>
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: h,
          backgroundColor: palette.border + "60",
          borderRadius: radius.full,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {indeterminate ? (
          <motion.div
            style={{
              height: "100%",
              width: "40%",
              backgroundColor: barColor,
              borderRadius: radius.full,
              position: "absolute",
            }}
            animate={{ left: ["-40%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              height: "100%",
              backgroundColor: barColor,
              borderRadius: radius.full,
            }}
          />
        )}
      </div>
    </div>
  );
}
