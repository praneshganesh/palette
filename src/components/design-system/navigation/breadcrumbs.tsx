"use client";

import { useState } from "react";
import type { DesignSystem, PaletteTokenSet } from "@/types";

export type BreadcrumbSeparator = "slash" | "chevron" | "arrow";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface DSBreadcrumbsProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  maxItems?: number;
  showIcons?: boolean;
  onItemClick?: (index: number) => void;
}

const SlashSep = ({ color }: { color: string }) => (
  <span style={{ color, margin: "0 6px", fontSize: 13, userSelect: "none" }}>/</span>
);

const ChevronSep = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 4px", flexShrink: 0 }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ArrowSep = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 4px", flexShrink: 0 }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const MoreDotsIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="19" cy="12" r="1" />
  </svg>
);

export function DSBreadcrumbs({
  system,
  palette,
  items,
  separator = "chevron",
  maxItems,
  onItemClick,
}: DSBreadcrumbsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const SeparatorComponent =
    separator === "slash" ? SlashSep : separator === "arrow" ? ArrowSep : ChevronSep;
  const sepColor = palette.textSecondary + "80";

  let visibleItems = items;
  let showEllipsis = false;

  if (maxItems && items.length > maxItems && !expanded) {
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    visibleItems = [firstItem, ...lastItems];
    showEllipsis = true;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        fontSize: 13,
      }}
    >
      {visibleItems.map((item, i) => {
        const isLast = i === visibleItems.length - 1;
        const originalIndex = showEllipsis && i > 0
          ? items.length - (visibleItems.length - i)
          : i;
        const isHovered = hoveredIndex === originalIndex;

        return (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            {i === 1 && showEllipsis && (
              <>
                <SeparatorComponent color={sepColor} />
                <button
                  onClick={() => setExpanded(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: `1px solid ${palette.border}`,
                    borderRadius: system.spacing.radius.sm,
                    cursor: "pointer",
                    padding: "2px 6px",
                    color: palette.textSecondary,
                  }}
                >
                  <MoreDotsIcon color={palette.textSecondary} />
                </button>
              </>
            )}
            {i > 0 && <SeparatorComponent color={sepColor} />}
            {isLast ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  color: palette.textPrimary,
                  fontWeight: 600,
                }}
              >
                {item.icon && <span style={{ display: "flex" }}>{item.icon}</span>}
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onItemClick?.(originalIndex)}
                onMouseEnter={() => setHoveredIndex(originalIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "none",
                  border: "none",
                  padding: "2px 4px",
                  borderRadius: system.spacing.radius.sm,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  color: isHovered ? palette.primary : palette.textSecondary,
                  textDecoration: isHovered ? "underline" : "none",
                  transition: "color 0.15s",
                }}
              >
                {item.icon && <span style={{ display: "flex" }}>{item.icon}</span>}
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
