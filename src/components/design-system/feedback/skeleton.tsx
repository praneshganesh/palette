"use client";

import { motion } from "framer-motion";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type SkeletonVariant = "text" | "circle" | "rectangle" | "card";
export type SkeletonAnimation = "pulse" | "wave";

export interface SkeletonProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  lines?: number;
  borderRadius?: string;
}

function PulseBlock({
  palette,
  style,
}: {
  palette: PaletteTokenSet;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        backgroundColor: palette.border + "50",
        ...style,
      }}
    />
  );
}

function WaveBlock({
  palette,
  style,
}: {
  palette: PaletteTokenSet;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: palette.border + "40",
        ...style,
      }}
    >
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, transparent, ${palette.border}30, transparent)`,
        }}
      />
    </div>
  );
}

export function DSSkeleton({
  system,
  palette,
  variant = "text",
  animation = "pulse",
  width,
  height,
  lines = 3,
  borderRadius,
}: SkeletonProps) {
  const radius = system.spacing.radius;
  const Block = animation === "wave" ? WaveBlock : PulseBlock;

  if (variant === "circle") {
    const s = (typeof height === "number" ? height : 40);
    return (
      <Block
        palette={palette}
        style={{
          width: s,
          height: s,
          borderRadius: "50%",
        }}
      />
    );
  }

  if (variant === "rectangle") {
    return (
      <Block
        palette={palette}
        style={{
          width: width || "100%",
          height: height || 100,
          borderRadius: borderRadius || radius.md,
        }}
      />
    );
  }

  if (variant === "card") {
    return (
      <div
        style={{
          border: `1px solid ${palette.border}40`,
          borderRadius: radius.lg,
          overflow: "hidden",
          width: width || "100%",
        }}
      >
        <Block
          palette={palette}
          style={{ width: "100%", height: 120, borderRadius: 0 }}
        />
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <Block
            palette={palette}
            style={{ width: "70%", height: 14, borderRadius: radius.sm }}
          />
          <Block
            palette={palette}
            style={{ width: "100%", height: 10, borderRadius: radius.sm }}
          />
          <Block
            palette={palette}
            style={{ width: "85%", height: 10, borderRadius: radius.sm }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <Block palette={palette} style={{ width: 60, height: 24, borderRadius: radius.sm }} />
            <Block palette={palette} style={{ width: 60, height: 24, borderRadius: radius.sm }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: width || "100%" }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Block
          key={i}
          palette={palette}
          style={{
            width: i === lines - 1 ? "60%" : "100%",
            height: height || 12,
            borderRadius: borderRadius || radius.sm,
          }}
        />
      ))}
    </div>
  );
}
