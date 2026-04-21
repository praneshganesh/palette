"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type ModalSize = "sm" | "md" | "lg" | "fullscreen";
export type ModalVariant = "basic" | "confirmation" | "form";

export interface ModalProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  variant?: ModalVariant;
  size?: ModalSize;
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlay?: boolean;
  showClose?: boolean;
}

const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AlertTriangleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

function getSizeStyles(size: ModalSize): React.CSSProperties {
  switch (size) {
    case "sm": return { width: 360, maxHeight: "70%" };
    case "md": return { width: 480, maxHeight: "80%" };
    case "lg": return { width: 640, maxHeight: "85%" };
    case "fullscreen": return { width: "95%", height: "90%", maxHeight: "90%" };
  }
}

export function DSModal({
  system,
  palette,
  variant = "basic",
  size = "md",
  open,
  onClose,
  title,
  description,
  children,
  footer,
  closeOnOverlay = true,
  showClose = true,
}: ModalProps) {
  const radius = system.spacing.radius;
  const sizeStyles = getSizeStyles(size);

  return (
    <AnimatePresence>
      {open && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeOnOverlay ? onClose : undefined}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              borderRadius: radius.lg,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: radius.lg,
              boxShadow: system.spacing.elevation.xl,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              ...sizeStyles,
            }}
          >
            {(title || showClose) && (
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: `1px solid ${palette.border}`,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  {variant === "confirmation" && (
                    <div style={{ color: palette.warning, marginBottom: 8 }}>
                      <AlertTriangleIcon />
                    </div>
                  )}
                  {title && (
                    <div style={{ fontSize: 16, fontWeight: 600, color: palette.textPrimary, lineHeight: 1.3 }}>
                      {title}
                    </div>
                  )}
                  {description && (
                    <div style={{ fontSize: 13, color: palette.textSecondary, marginTop: 4, lineHeight: 1.5 }}>
                      {description}
                    </div>
                  )}
                </div>
                {showClose && (
                  <button
                    onClick={onClose}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: palette.textSecondary,
                      padding: 4,
                      borderRadius: radius.sm,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}

            <div
              style={{
                padding: "16px 20px",
                flex: 1,
                overflowY: "auto",
                fontSize: 13,
                color: palette.textSecondary,
                lineHeight: 1.6,
              }}
            >
              {children}
            </div>

            {footer && (
              <div
                style={{
                  padding: "12px 20px",
                  borderTop: `1px solid ${palette.border}`,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  backgroundColor: palette.surfaceMuted,
                }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ModalPreviewContainer({
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

export function ModalTriggerButton({
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
