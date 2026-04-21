"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertStyle = "filled" | "outlined";

export interface AlertProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  variant?: AlertVariant;
  alertStyle?: AlertStyle;
  title?: string;
  description?: string;
  closable?: boolean;
  action?: { label: string; onClick?: () => void };
  icon?: boolean;
}

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const XCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function getVariantColor(variant: AlertVariant, palette: PaletteTokenSet): string {
  switch (variant) {
    case "info": return palette.info;
    case "success": return palette.success;
    case "warning": return palette.warning;
    case "error": return palette.danger;
  }
}

function getVariantIcon(variant: AlertVariant) {
  switch (variant) {
    case "info": return <InfoIcon />;
    case "success": return <CheckCircleIcon />;
    case "warning": return <AlertTriangleIcon />;
    case "error": return <XCircleIcon />;
  }
}

export function DSAlert({
  system,
  palette,
  variant = "info",
  alertStyle = "outlined",
  title,
  description,
  closable = false,
  action,
  icon = true,
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const color = getVariantColor(variant, palette);
  const radius = system.spacing.radius;

  const isFilled = alertStyle === "filled";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "12px 16px",
              borderRadius: radius.md,
              backgroundColor: isFilled ? color : color + "10",
              border: isFilled ? "none" : `1px solid ${color}30`,
              color: isFilled ? "#fff" : color,
            }}
          >
            {icon && (
              <div style={{ flexShrink: 0, marginTop: 1, opacity: isFilled ? 0.9 : 1 }}>
                {getVariantIcon(variant)}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: isFilled ? "#fff" : palette.textPrimary,
                  marginBottom: description ? 2 : 0,
                }}>
                  {title}
                </div>
              )}
              {description && (
                <div style={{
                  fontSize: 12,
                  color: isFilled ? "rgba(255,255,255,0.85)" : palette.textSecondary,
                  lineHeight: 1.5,
                }}>
                  {description}
                </div>
              )}
              {action && (
                <button
                  onClick={action.onClick}
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    color: isFilled ? "#fff" : color,
                    background: isFilled ? "rgba(255,255,255,0.2)" : color + "15",
                    border: "none",
                    borderRadius: radius.sm,
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                >
                  {action.label}
                </button>
              )}
            </div>
            {closable && (
              <button
                onClick={() => setVisible(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: isFilled ? "rgba(255,255,255,0.7)" : palette.textSecondary,
                  padding: 2,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
