"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";

export type TabVariant = "underline" | "pill" | "contained";
export type TabOrientation = "horizontal" | "vertical";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  disabled?: boolean;
}

export interface DSTabsProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  variant?: TabVariant;
  orientation?: TabOrientation;
  scrollable?: boolean;
  fullWidth?: boolean;
}

export function DSTabs({
  system,
  palette,
  tabs,
  activeTab: controlledActive,
  onTabChange,
  variant = "underline",
  orientation = "horizontal",
  scrollable = false,
  fullWidth = false,
}: DSTabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id ?? "");
  const activeTab = controlledActive ?? internalActive;

  const handleTabClick = (id: string) => {
    setInternalActive(id);
    onTabChange?.(id);
  };

  const comp = system.components;
  const radius = comp.button.borderRadius;
  const isVertical = orientation === "vertical";

  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: isVertical ? "column" : "row",
    gap: variant === "pill" ? 4 : 0,
    ...(variant === "underline" && !isVertical
      ? { borderBottom: `1px solid ${palette.border}` }
      : {}),
    ...(variant === "underline" && isVertical
      ? { borderRight: `1px solid ${palette.border}` }
      : {}),
    ...(variant === "contained"
      ? {
          backgroundColor: palette.surfaceMuted,
          borderRadius: radius,
          padding: 4,
          border: `1px solid ${palette.border}`,
        }
      : {}),
    ...(variant === "pill"
      ? {
          backgroundColor: palette.surfaceMuted,
          borderRadius: radius,
          padding: 4,
        }
      : {}),
    ...(scrollable && !isVertical
      ? { overflowX: "auto", whiteSpace: "nowrap" as const }
      : {}),
    ...(fullWidth && !isVertical ? { width: "100%" } : {}),
  };

  const getTabStyles = (isActive: boolean, isDisabled: boolean): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: variant === "underline" ? "10px 16px" : "8px 16px",
      fontSize: 13,
      fontWeight: isActive ? 600 : 500,
      cursor: isDisabled ? "not-allowed" : "pointer",
      border: "none",
      background: "none",
      fontFamily: "inherit",
      transition: "all 0.2s",
      position: "relative",
      opacity: isDisabled ? 0.4 : 1,
      whiteSpace: "nowrap",
      ...(fullWidth && !isVertical ? { flex: 1, justifyContent: "center" } : {}),
    };

    switch (variant) {
      case "underline":
        return {
          ...base,
          color: isActive ? palette.primary : palette.textSecondary,
          borderBottom: !isVertical
            ? `2px solid ${isActive ? palette.primary : "transparent"}`
            : "none",
          borderRight: isVertical
            ? `2px solid ${isActive ? palette.primary : "transparent"}`
            : "none",
          marginBottom: !isVertical ? -1 : 0,
          marginRight: isVertical ? -1 : 0,
        };
      case "pill":
        return {
          ...base,
          color: isActive ? palette.primary : palette.textSecondary,
          backgroundColor: isActive ? palette.surface : "transparent",
          borderRadius: radius,
          boxShadow: isActive ? `0 1px 3px rgba(0,0,0,0.08)` : "none",
        };
      case "contained":
        return {
          ...base,
          color: isActive ? palette.background : palette.textSecondary,
          backgroundColor: isActive ? palette.primary : "transparent",
          borderRadius: radius,
        };
      default:
        return base;
    }
  };

  return (
    <div style={containerStyles} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            style={getTabStyles(isActive, !!tab.disabled)}
          >
            {tab.icon && (
              <span style={{ display: "flex", alignItems: "center" }}>
                {tab.icon}
              </span>
            )}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                style={{
                  backgroundColor: isActive
                    ? variant === "contained"
                      ? "rgba(255,255,255,0.25)"
                      : palette.primary + "18"
                    : palette.surfaceMuted,
                  color: isActive
                    ? variant === "contained"
                      ? palette.background
                      : palette.primary
                    : palette.textSecondary,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 7px",
                  borderRadius: 99,
                  minWidth: 20,
                  textAlign: "center",
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export interface DSTabPanelProps {
  activeTab: string;
  tabId: string;
  children: React.ReactNode;
}

export function DSTabPanel({ activeTab, tabId, children }: DSTabPanelProps) {
  if (activeTab !== tabId) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabId}
        role="tabpanel"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
