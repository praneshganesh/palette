"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
  label: string;
  description?: string;
  children?: ReactNode;
}

export function OptionCard({
  selected,
  onClick,
  icon,
  label,
  description,
  children,
}: OptionCardProps) {
  const [hovered, setHovered] = useState(false);

  const border = selected
    ? "1px solid rgba(167,139,250,0.6)"
    : hovered
      ? "1px solid rgba(167,139,250,0.4)"
      : "1px solid rgba(255,255,255,0.08)";

  const background = selected
    ? "rgba(167,139,250,0.12)"
    : hovered
      ? "rgba(167,139,250,0.06)"
      : "rgba(255,255,255,0.03)";

  const boxShadow = selected
    ? "0 0 0 1px rgba(167,139,250,0.3), inset 0 0 24px rgba(167,139,250,0.08)"
    : hovered
      ? "0 0 0 1px rgba(167,139,250,0.15), inset 0 0 20px rgba(167,139,250,0.05)"
      : "none";

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-full text-left cursor-pointer flex flex-col"
      style={{
        background,
        border,
        boxShadow,
        borderRadius: 12,
        padding: 20,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {icon && (
        <div
          className="flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: selected ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.06)",
            marginBottom: 12,
            fontSize: 16,
          }}
        >
          {icon}
        </div>
      )}
      <div
        className="leading-snug"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: selected ? "#fff" : "rgba(255,255,255,0.85)",
          marginBottom: description ? 4 : 0,
        }}
      >
        {label}
      </div>
      {description && (
        <div
          className="leading-relaxed"
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {description}
        </div>
      )}
      {children && <div className="mt-3 w-full">{children}</div>}
    </motion.button>
  );
}
