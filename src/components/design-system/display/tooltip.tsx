"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: React.ReactNode;
  position?: TooltipPosition;
  arrow?: boolean;
  delay?: number;
  children: React.ReactNode;
  rich?: boolean;
  style?: React.CSSProperties;
}

export function DSTooltip({
  palette,
  content,
  position = "top",
  arrow = true,
  delay = 200,
  children,
  rich = false,
  style,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const bg = palette.textPrimary;
  const fg = palette.background;

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case "top": return { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 };
      case "bottom": return { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 };
      case "left": return { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 };
      case "right": return { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 };
    }
  };

  const getArrowStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      width: 8,
      height: 8,
      backgroundColor: bg,
      transform: "rotate(45deg)",
    };
    switch (position) {
      case "top": return { ...base, bottom: -4, left: "50%", marginLeft: -4 };
      case "bottom": return { ...base, top: -4, left: "50%", marginLeft: -4 };
      case "left": return { ...base, right: -4, top: "50%", marginTop: -4 };
      case "right": return { ...base, left: -4, top: "50%", marginTop: -4 };
    }
  };

  const motionDir = position === "top" ? { y: 4 } : position === "bottom" ? { y: -4 } : position === "left" ? { x: 4 } : { x: -4 };

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      style={{ position: "relative", display: "inline-flex", ...style }}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, ...motionDir }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...motionDir }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              ...getPositionStyles(),
              zIndex: 100,
              pointerEvents: rich ? "auto" : "none",
            }}
          >
            <div
              style={{
                backgroundColor: bg,
                color: fg,
                padding: rich ? "12px 16px" : "6px 12px",
                borderRadius: 8,
                fontSize: rich ? 13 : 12,
                lineHeight: 1.5,
                whiteSpace: rich ? "normal" : "nowrap",
                maxWidth: rich ? 260 : undefined,
                boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
              }}
            >
              {content}
              {arrow && <div style={getArrowStyles()} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
