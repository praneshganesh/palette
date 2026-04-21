"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type AccordionVariant = "default" | "bordered" | "separated" | "filled";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  items: AccordionItem[];
  variant?: AccordionVariant;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  style?: React.CSSProperties;
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function DSAccordion({
  system,
  palette,
  items,
  variant = "default",
  allowMultiple = false,
  defaultOpen = [],
  style,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  const radius = system.spacing.radius.md;

  const getItemStyles = (index: number, isOpen: boolean): { wrapper: React.CSSProperties; trigger: React.CSSProperties } => {
    const base: React.CSSProperties = {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      width: "100%",
      border: "none",
      background: "none",
      textAlign: "left",
      fontFamily: "inherit",
      color: palette.textPrimary,
      fontSize: 14,
      fontWeight: 500,
      padding: "14px 16px",
      transition: "background-color 0.15s",
    };

    switch (variant) {
      case "bordered":
        return {
          wrapper: {
            border: `1px solid ${palette.border}`,
            borderTop: index === 0 ? `1px solid ${palette.border}` : "none",
            borderRadius: index === 0 ? `${radius} ${radius} 0 0` : index === items.length - 1 ? `0 0 ${radius} ${radius}` : "0",
          },
          trigger: { ...base, backgroundColor: isOpen ? palette.surfaceMuted : "transparent" },
        };
      case "separated":
        return {
          wrapper: {
            border: `1px solid ${palette.border}`,
            borderRadius: radius,
            marginBottom: index < items.length - 1 ? 8 : 0,
            overflow: "hidden",
          },
          trigger: { ...base, backgroundColor: isOpen ? palette.surfaceMuted : palette.surface },
        };
      case "filled":
        return {
          wrapper: {
            borderRadius: radius,
            marginBottom: index < items.length - 1 ? 4 : 0,
            overflow: "hidden",
            backgroundColor: isOpen ? palette.primary + "0A" : "transparent",
          },
          trigger: {
            ...base,
            backgroundColor: isOpen ? palette.primary + "10" : palette.surfaceMuted,
            borderRadius: isOpen ? `${radius} ${radius} 0 0` : radius,
          },
        };
      default:
        return {
          wrapper: {
            borderBottom: `1px solid ${palette.border}`,
          },
          trigger: { ...base, paddingLeft: 0, paddingRight: 0 },
        };
    }
  };

  return (
    <div style={style}>
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);
        const styles = getItemStyles(index, isOpen);

        return (
          <div key={item.id} style={styles.wrapper}>
            <button onClick={() => toggle(item.id)} style={styles.trigger}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                {item.icon && <span style={{ display: "flex", color: palette.primary, flexShrink: 0 }}>{item.icon}</span>}
                <span>{item.title}</span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", color: palette.textSecondary, flexShrink: 0 }}
              >
                <ChevronDown />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: variant === "default" ? "12px 0 20px" : "12px 16px 20px",
                      fontSize: 13,
                      color: palette.textSecondary,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
