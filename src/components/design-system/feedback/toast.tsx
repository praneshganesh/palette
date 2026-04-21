"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type ToastVariant = "info" | "success" | "warning" | "error";
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void };
  duration?: number;
}

export interface ToastProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  toasts: ToastItem[];
  position?: ToastPosition;
  onDismiss: (id: string) => void;
}

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const XCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function getVariantColor(variant: ToastVariant, palette: PaletteTokenSet): string {
  switch (variant) {
    case "info": return palette.info;
    case "success": return palette.success;
    case "warning": return palette.warning;
    case "error": return palette.danger;
  }
}

function getVariantIcon(variant: ToastVariant) {
  switch (variant) {
    case "info": return <InfoIcon />;
    case "success": return <CheckCircleIcon />;
    case "warning": return <AlertTriangleIcon />;
    case "error": return <XCircleIcon />;
  }
}

function getPositionStyles(position: ToastPosition): React.CSSProperties {
  const base: React.CSSProperties = { position: "absolute", display: "flex", flexDirection: "column", gap: 8, zIndex: 60 };
  switch (position) {
    case "top-right": return { ...base, top: 12, right: 12 };
    case "top-left": return { ...base, top: 12, left: 12 };
    case "bottom-right": return { ...base, bottom: 12, right: 12 };
    case "bottom-left": return { ...base, bottom: 12, left: 12 };
    case "top-center": return { ...base, top: 12, left: "50%", transform: "translateX(-50%)" };
    case "bottom-center": return { ...base, bottom: 12, left: "50%", transform: "translateX(-50%)" };
  }
}

function getSlideDirection(position: ToastPosition) {
  if (position.includes("right")) return { x: 40, opacity: 0 };
  if (position.includes("left")) return { x: -40, opacity: 0 };
  if (position.startsWith("top")) return { y: -20, opacity: 0 };
  return { y: 20, opacity: 0 };
}

function SingleToast({
  toast,
  system,
  palette,
  position,
  onDismiss,
}: {
  toast: ToastItem;
  system: DesignSystem;
  palette: PaletteTokenSet;
  position: ToastPosition;
  onDismiss: (id: string) => void;
}) {
  const color = getVariantColor(toast.variant, palette);
  const slide = getSlideDirection(position);

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => onDismiss(toast.id), toast.duration || 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={slide}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ ...slide, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 300,
        backgroundColor: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: system.spacing.radius.md,
        boxShadow: system.spacing.elevation.lg,
        padding: "10px 12px",
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div style={{ color, flexShrink: 0, marginTop: 2 }}>
        {getVariantIcon(toast.variant)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, lineHeight: 1.3 }}>
          {toast.title}
        </div>
        {toast.description && (
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2, lineHeight: 1.4 }}>
            {toast.description}
          </div>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            style={{
              marginTop: 6,
              fontSize: 11,
              fontWeight: 600,
              color,
              background: color + "12",
              border: "none",
              borderRadius: system.spacing.radius.sm,
              padding: "3px 8px",
              cursor: "pointer",
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: palette.textSecondary,
          padding: 2,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <CloseIcon />
      </button>
    </motion.div>
  );
}

export function DSToastContainer({
  system,
  palette,
  toasts,
  position = "top-right",
  onDismiss,
}: ToastProps) {
  return (
    <div style={getPositionStyles(position)}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <SingleToast
            key={toast.id}
            toast={toast}
            system={system}
            palette={palette}
            position={position}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

let toastCounter = 0;
export function createToast(variant: ToastVariant, title: string, description?: string): ToastItem {
  return { id: `toast-${++toastCounter}-${Date.now()}`, variant, title, description, duration: 4000 };
}

export function useToastState() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: ToastItem) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, dismissToast };
}
