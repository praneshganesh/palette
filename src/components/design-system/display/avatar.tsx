"use client";

import { useState } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  size?: AvatarSize;
  src?: string;
  initials?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  online?: boolean;
  style?: React.CSSProperties;
}

export interface AvatarGroupProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  size?: AvatarSize;
  children: React.ReactNode;
  max?: number;
  total?: number;
}

const sizeMap: Record<AvatarSize, { dim: number; fontSize: number; badgeSize: number; borderWidth: number }> = {
  xs: { dim: 24, fontSize: 10, badgeSize: 8, borderWidth: 1 },
  sm: { dim: 32, fontSize: 12, badgeSize: 10, borderWidth: 2 },
  md: { dim: 40, fontSize: 14, badgeSize: 12, borderWidth: 2 },
  lg: { dim: 52, fontSize: 18, badgeSize: 14, borderWidth: 2 },
  xl: { dim: 72, fontSize: 24, badgeSize: 16, borderWidth: 3 },
};

const UserIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export function DSAvatar({
  system,
  palette,
  size = "md",
  src,
  initials,
  icon,
  badge,
  online,
  style,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const s = sizeMap[size];

  const showImage = src && !imgError;
  const showInitials = !showImage && initials;
  const showIcon = !showImage && !showInitials;

  return (
    <div style={{ position: "relative", display: "inline-flex", flexShrink: 0, ...style }}>
      <div
        style={{
          width: s.dim,
          height: s.dim,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: showImage ? palette.surfaceMuted : palette.primary + "18",
          color: showImage ? undefined : palette.primary,
          fontSize: s.fontSize,
          fontWeight: 600,
          border: `${s.borderWidth}px solid ${palette.border}`,
        }}
      >
        {showImage && (
          <img
            src={src}
            onError={() => setImgError(true)}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {showInitials && initials}
        {showIcon && (icon || <UserIcon size={s.dim * 0.45} />)}
      </div>

      {online !== undefined && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: s.badgeSize,
            height: s.badgeSize,
            borderRadius: "50%",
            backgroundColor: online ? palette.success : palette.textSecondary + "60",
            border: `2px solid ${palette.surface}`,
          }}
        />
      )}

      {badge && (
        <span
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

export function DSAvatarGroup({
  system,
  palette,
  size = "md",
  children,
  max,
  total,
}: AvatarGroupProps) {
  const s = sizeMap[size];
  const items = Array.isArray(children) ? children : [children];
  const visible = max ? items.slice(0, max) : items;
  const remaining = total ? total - visible.length : items.length - visible.length;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {visible.map((child, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -(s.dim * 0.3),
            position: "relative",
            zIndex: visible.length - i,
          }}
        >
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div
          style={{
            marginLeft: -(s.dim * 0.3),
            width: s.dim,
            height: s.dim,
            borderRadius: "50%",
            backgroundColor: palette.surfaceMuted,
            border: `2px solid ${palette.surface}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: s.fontSize - 2,
            fontWeight: 600,
            color: palette.textSecondary,
            position: "relative",
            zIndex: 0,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
