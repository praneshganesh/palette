"use client";

import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import { useDesignSystemStore } from "@/store/design-system";

interface ThemeOverviewProps {
  system: DesignSystem;
}

export function ThemeOverview({ system }: ThemeOverviewProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;

  const colorTokens = [
    { name: "Primary", value: palette.primary },
    { name: "Primary Hover", value: palette.primaryHover },
    { name: "Secondary", value: palette.secondary },
    { name: "Accent", value: palette.accent },
    { name: "Background", value: palette.background },
    { name: "Surface", value: palette.surface },
    { name: "Surface Muted", value: palette.surfaceMuted },
    { name: "Border", value: palette.border },
    { name: "Text Primary", value: palette.textPrimary },
    { name: "Text Secondary", value: palette.textSecondary },
    { name: "Success", value: palette.success },
    { name: "Warning", value: palette.warning },
    { name: "Danger", value: palette.danger },
    { name: "Info", value: palette.info },
  ];

  return (
    <div className="space-y-8">
      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-palette-border bg-palette-bg-raised p-5"
      >
        <p className="text-sm text-palette-text-secondary leading-relaxed">
          {system.meta.explanation}
        </p>
      </motion.div>

      {/* Color Tokens */}
      <div>
        <h3 className="text-sm font-medium text-palette-text mb-4">Color Tokens</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {colorTokens.map((token, i) => (
            <motion.div
              key={token.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="h-12 w-12 rounded-xl border border-palette-border shadow-sm"
                style={{ backgroundColor: token.value }}
              />
              <div className="text-center">
                <p className="text-[10px] text-palette-text-secondary leading-tight">{token.name}</p>
                <p className="text-[10px] text-palette-text-muted font-mono">{token.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-sm font-medium text-palette-text mb-4">Typography System</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-palette-border bg-palette-bg-raised p-5 space-y-3">
            <p className="text-xs text-palette-text-muted uppercase tracking-wider">English</p>
            <p className="text-xs text-palette-text-secondary">
              Heading: <span className="text-palette-text font-medium">{system.typography.headingFont}</span>
            </p>
            <p className="text-xs text-palette-text-secondary">
              Body: <span className="text-palette-text font-medium">{system.typography.bodyFont}</span>
            </p>
            <div className="pt-2 border-t border-palette-border space-y-1">
              {Object.entries(system.typography.scale).slice(0, 4).map(([key, size]) => (
                <p key={key} className="text-palette-text-secondary" style={{ fontSize: size }}>
                  {key.toUpperCase()} — {size}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-palette-border bg-palette-bg-raised p-5 space-y-3">
            <p className="text-xs text-palette-text-muted uppercase tracking-wider">Arabic</p>
            <p className="text-xs text-palette-text-secondary">
              Heading: <span className="text-palette-text font-medium">{system.typography.arabicHeadingFont}</span>
            </p>
            <p className="text-xs text-palette-text-secondary">
              Body: <span className="text-palette-text font-medium">{system.typography.arabicBodyFont}</span>
            </p>
            <div className="pt-2 border-t border-palette-border space-y-1" dir="rtl">
              <p className="text-palette-text-secondary text-right" style={{ fontSize: system.typography.scale.h2 }}>
                عنوان رئيسي
              </p>
              <p className="text-palette-text-secondary text-right" style={{ fontSize: system.typography.scale.body }}>
                نص تجريبي للمعاينة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing & Shape */}
      <div>
        <h3 className="text-sm font-medium text-palette-text mb-4">Spacing & Shape</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-palette-border bg-palette-bg-raised p-5 space-y-3">
            <p className="text-xs text-palette-text-muted uppercase tracking-wider">Radius</p>
            <div className="flex items-end gap-2">
              {Object.entries(system.spacing.radius).slice(1, 5).map(([key, val]) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-8 border border-palette-accent-1/30 bg-palette-accent-1/10"
                    style={{ borderRadius: val }}
                  />
                  <span className="text-[9px] text-palette-text-muted">{key}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-palette-border bg-palette-bg-raised p-5 space-y-3">
            <p className="text-xs text-palette-text-muted uppercase tracking-wider">Spacing Scale</p>
            <div className="flex items-end gap-1">
              {system.spacing.scale.slice(1, 8).map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-3 bg-palette-accent-1/30 rounded-sm"
                    style={{ height: `${val}px` }}
                  />
                  <span className="text-[8px] text-palette-text-muted">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-palette-border bg-palette-bg-raised p-5 space-y-3">
            <p className="text-xs text-palette-text-muted uppercase tracking-wider">Elevation</p>
            <div className="flex gap-2">
              {Object.entries(system.spacing.elevation).slice(1, 4).map(([key, val]) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-10 rounded bg-white"
                    style={{ boxShadow: val }}
                  />
                  <span className="text-[9px] text-palette-text-muted">{key}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
