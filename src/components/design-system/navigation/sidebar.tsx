"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
  active?: boolean;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export interface DSSidebarProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  groups: SidebarGroup[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  mini?: boolean;
  activeItemId?: string;
  onItemClick?: (id: string) => void;
}

const ChevronDownIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function DSSidebar({
  system,
  palette,
  groups,
  collapsed = false,
  onCollapsedChange,
  header,
  footer,
  mini = false,
  activeItemId: controlledActive,
  onItemClick,
}: DSSidebarProps) {
  const [internalActive, setInternalActive] = useState<string>(
    groups[0]?.items[0]?.id ?? ""
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(groups.map((_, i) => `group-${i}`))
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const activeItemId = controlledActive ?? internalActive;
  const effectiveCollapsed = mini || collapsed;
  const sidebarWidth = effectiveCollapsed ? 64 : 260;

  const handleItemClick = (id: string) => {
    setInternalActive(id);
    onItemClick?.(id);
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) next.delete(groupKey);
      else next.add(groupKey);
      return next;
    });
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const radius = system.spacing.radius.md;

  const renderItem = (item: SidebarItem, depth: number = 0) => {
    const isActive = activeItemId === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) toggleItem(item.id);
            else handleItemClick(item.id);
          }}
          title={effectiveCollapsed ? item.label : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: effectiveCollapsed
              ? "10px 0"
              : `8px 12px 8px ${12 + depth * 16}px`,
            justifyContent: effectiveCollapsed ? "center" : "flex-start",
            fontSize: 13,
            fontWeight: isActive ? 600 : 400,
            color: isActive ? palette.primary : palette.textSecondary,
            backgroundColor: isActive
              ? palette.primary + "12"
              : "transparent",
            border: "none",
            borderRadius: radius,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
            textAlign: "left",
          }}
        >
          {item.icon && (
            <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {item.icon}
            </span>
          )}
          {!effectiveCollapsed && (
            <>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.label}
              </span>
              {item.badge && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    backgroundColor: palette.primary + "18",
                    color: palette.primary,
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span
                  style={{
                    display: "flex",
                    transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <ChevronDownIcon />
                </span>
              )}
            </>
          )}
        </button>
        {hasChildren && !effectiveCollapsed && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                {item.children!.map((child) => renderItem(child, depth + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <motion.div
      animate={{ width: sidebarWidth }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      style={{
        backgroundColor: palette.surface,
        borderRight: `1px solid ${palette.border}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: effectiveCollapsed ? "16px 8px" : "16px",
          borderBottom: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: effectiveCollapsed ? "center" : "space-between",
          minHeight: 56,
        }}
      >
        {!effectiveCollapsed && header}
        {onCollapsedChange && (
          <button
            onClick={() => onCollapsedChange(!collapsed)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              border: "none",
              backgroundColor: "transparent",
              color: palette.textSecondary,
              cursor: "pointer",
              borderRadius: radius,
            }}
          >
            {effectiveCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        )}
        {!onCollapsedChange && effectiveCollapsed && (
          <span style={{ color: palette.textSecondary }}>
            <MenuIcon />
          </span>
        )}
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, overflow: "auto", padding: effectiveCollapsed ? "8px" : "12px" }}>
        {groups.map((group, gi) => {
          const groupKey = `group-${gi}`;
          const isExpanded = expandedGroups.has(groupKey);
          return (
            <div key={gi} style={{ marginBottom: 16 }}>
              {!effectiveCollapsed && group.label && (
                <button
                  onClick={() => toggleGroup(groupKey)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "4px 12px",
                    marginBottom: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: palette.textSecondary,
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {group.label}
                  <span
                    style={{
                      display: "flex",
                      transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <ChevronDownIcon size={10} />
                  </span>
                </button>
              )}
              <AnimatePresence>
                {(effectiveCollapsed || isExpanded) && (
                  <motion.div
                    initial={effectiveCollapsed ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {group.items.map((item) => renderItem(item))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {footer && (
        <div
          style={{
            borderTop: `1px solid ${palette.border}`,
            padding: effectiveCollapsed ? "12px 8px" : "12px 16px",
          }}
        >
          {!effectiveCollapsed && footer}
          {effectiveCollapsed && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: palette.primary + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: palette.primary,
                }}
              >
                U
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
