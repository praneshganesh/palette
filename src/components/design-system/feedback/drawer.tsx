"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type DrawerPosition = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg";

export interface DrawerProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  position?: DrawerPosition;
  size?: DrawerSize;
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  showClose?: boolean;
}

const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function getSizeValue(size: DrawerSize): number {
  switch (size) {
    case "sm": return 260;
    case "md": return 340;
    case "lg": return 440;
  }
}

function getDrawerStyles(position: DrawerPosition, size: DrawerSize): React.CSSProperties {
  const s = getSizeValue(size);
  const base: React.CSSProperties = { position: "absolute", backgroundColor: "inherit", zIndex: 50 };
  switch (position) {
    case "left": return { ...base, top: 0, left: 0, bottom: 0, width: s };
    case "right": return { ...base, top: 0, right: 0, bottom: 0, width: s };
    case "top": return { ...base, top: 0, left: 0, right: 0, height: s };
    case "bottom": return { ...base, bottom: 0, left: 0, right: 0, height: s };
  }
}

function getSlideAnimation(position: DrawerPosition) {
  switch (position) {
    case "left": return { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } };
    case "right": return { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };
    case "top": return { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } };
    case "bottom": return { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
  }
}

export function DSDrawer({
  system,
  palette,
  position = "right",
  size = "md",
  open,
  onClose,
  title,
  children,
  showClose = true,
}: DrawerProps) {
  const radius = system.spacing.radius;
  const slideAnim = getSlideAnimation(position);
  const drawerStyles = getDrawerStyles(position, size);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 40,
              borderRadius: radius.lg,
            }}
          />
          <motion.div
            initial={slideAnim.initial}
            animate={slideAnim.animate}
            exit={slideAnim.exit}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            style={{
              ...drawerStyles,
              backgroundColor: palette.surface,
              borderLeft: position === "right" ? `1px solid ${palette.border}` : undefined,
              borderRight: position === "left" ? `1px solid ${palette.border}` : undefined,
              borderTop: position === "bottom" ? `1px solid ${palette.border}` : undefined,
              borderBottom: position === "top" ? `1px solid ${palette.border}` : undefined,
              display: "flex",
              flexDirection: "column",
              boxShadow: system.spacing.elevation.xl,
            }}
          >
            {(title || showClose) && (
              <div
                style={{
                  padding: "14px 16px",
                  borderBottom: `1px solid ${palette.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {title && (
                  <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>
                    {title}
                  </div>
                )}
                {showClose && (
                  <button
                    onClick={onClose}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: palette.textSecondary,
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: radius.sm,
                    }}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}
            <div style={{ flex: 1, padding: 16, overflowY: "auto", fontSize: 13, color: palette.textSecondary, lineHeight: 1.6 }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DrawerPreviewContainer({
  palette,
  system,
  children,
  height = 300,
}: {
  palette: PaletteTokenSet;
  system: DesignSystem;
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: palette.surfaceMuted,
        border: `1px solid ${palette.border}`,
        borderRadius: system.spacing.radius.lg,
        height,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

export function DrawerTriggerButton({
  palette,
  system,
  onClick,
  children,
}: {
  palette: PaletteTokenSet;
  system: DesignSystem;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "8px 16px",
        fontSize: 13,
        fontWeight: 500,
        color: palette.background,
        backgroundColor: hovered ? palette.primaryHover : palette.primary,
        border: "none",
        borderRadius: system.spacing.radius.md,
        cursor: "pointer",
        transition: "background-color 0.15s",
      }}
    >
      {children}
    </button>
  );
}
