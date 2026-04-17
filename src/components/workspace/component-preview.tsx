"use client";

import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentPreviewProps {
  system: DesignSystem;
}

export function ComponentPreview({ system }: ComponentPreviewProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  return (
    <div className="space-y-8">
      {/* Preview container */}
      <div
        className="rounded-2xl border border-palette-border overflow-hidden"
        style={{ backgroundColor: palette.background }}
      >
        <div className="p-8 space-y-8">
          {/* Buttons */}
          <div>
            <p className="text-xs font-medium mb-4" style={{ color: palette.textSecondary }}>
              Buttons
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="inline-flex items-center justify-center text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: comp.button.primaryBg,
                  color: comp.button.primaryText,
                  padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                  borderRadius: comp.button.borderRadius,
                }}
              >
                Primary Button
              </button>
              <button
                className="inline-flex items-center justify-center text-sm font-semibold border transition-colors"
                style={{
                  backgroundColor: comp.button.secondaryBg,
                  color: comp.button.secondaryText,
                  borderColor: comp.button.secondaryBorder,
                  padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                  borderRadius: comp.button.borderRadius,
                }}
              >
                Secondary
              </button>
              <button
                className="inline-flex items-center justify-center text-sm transition-colors"
                style={{
                  color: palette.danger,
                  padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                  borderRadius: comp.button.borderRadius,
                  backgroundColor: palette.danger + "15",
                }}
              >
                Destructive
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div>
            <p className="text-xs font-medium mb-4" style={{ color: palette.textSecondary }}>
              Inputs
            </p>
            <div className="flex flex-wrap gap-3 max-w-lg">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full text-sm border outline-none transition-colors"
                  style={{
                    backgroundColor: comp.input.background,
                    borderColor: comp.input.border,
                    color: comp.input.text,
                    padding: `${comp.input.paddingY} ${comp.input.paddingX}`,
                    borderRadius: comp.input.borderRadius,
                  }}
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-sm border outline-none transition-colors"
                  style={{
                    backgroundColor: comp.input.background,
                    borderColor: palette.primary,
                    color: comp.input.text,
                    padding: `${comp.input.paddingY} ${comp.input.paddingX}`,
                    borderRadius: comp.input.borderRadius,
                    boxShadow: `0 0 0 3px ${palette.primary}20`,
                  }}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Cards */}
          <div>
            <p className="text-xs font-medium mb-4" style={{ color: palette.textSecondary }}>
              Cards
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Active Users", value: "2,847", change: "+12.5%" },
                { title: "Revenue", value: "$45.2K", change: "+8.3%" },
                { title: "Requests", value: "1,284", change: "-2.1%" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="border"
                  style={{
                    backgroundColor: comp.card.background,
                    borderColor: comp.card.border,
                    borderRadius: comp.card.borderRadius,
                    padding: comp.card.padding,
                    boxShadow: comp.card.shadow,
                  }}
                >
                  <p className="text-xs mb-2" style={{ color: palette.textSecondary }}>
                    {card.title}
                  </p>
                  <p className="text-xl font-bold" style={{ color: palette.textPrimary }}>
                    {card.value}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{
                      color: card.change.startsWith("+") ? palette.success : palette.danger,
                    }}
                  >
                    {card.change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="text-xs font-medium mb-4" style={{ color: palette.textSecondary }}>
              Badges
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Active", color: palette.success },
                { label: "Pending", color: palette.warning },
                { label: "Rejected", color: palette.danger },
                { label: "Draft", color: palette.info },
                { label: "New", color: palette.primary },
              ].map((badge) => (
                <span
                  key={badge.label}
                  style={{
                    padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                    borderRadius: comp.badge.borderRadius,
                    fontSize: comp.badge.fontSize,
                    fontWeight: comp.badge.fontWeight,
                    backgroundColor: badge.color + "18",
                    color: badge.color,
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Table */}
          <div>
            <p className="text-xs font-medium mb-4" style={{ color: palette.textSecondary }}>
              Table
            </p>
            <div
              className="border overflow-hidden"
              style={{
                borderColor: comp.table.rowBorder,
                borderRadius: system.spacing.radius.lg,
              }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: comp.table.headerBg }}>
                    {["Name", "Status", "Role", "Created"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-medium"
                        style={{
                          color: comp.table.headerText,
                          padding: comp.table.cellPadding,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Sarah Ahmed", status: "Active", role: "Admin", date: "2024-01-15" },
                    { name: "Mohammed Ali", status: "Pending", role: "Editor", date: "2024-01-14" },
                    { name: "Fatima Hassan", status: "Active", role: "Viewer", date: "2024-01-13" },
                  ].map((row, i) => (
                    <tr
                      key={row.name}
                      style={{
                        backgroundColor: i % 2 === 1 ? comp.table.stripedBg : "transparent",
                        borderTop: `1px solid ${comp.table.rowBorder}`,
                      }}
                    >
                      <td style={{ padding: comp.table.cellPadding, color: palette.textPrimary }}>
                        {row.name}
                      </td>
                      <td style={{ padding: comp.table.cellPadding }}>
                        <span
                          style={{
                            padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                            borderRadius: comp.badge.borderRadius,
                            fontSize: "11px",
                            backgroundColor:
                              row.status === "Active"
                                ? palette.success + "18"
                                : palette.warning + "18",
                            color:
                              row.status === "Active" ? palette.success : palette.warning,
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: comp.table.cellPadding, color: palette.textSecondary }}>
                        {row.role}
                      </td>
                      <td style={{ padding: comp.table.cellPadding, color: palette.textSecondary }}>
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
