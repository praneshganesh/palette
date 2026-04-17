"use client";

import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import { useDesignSystemStore } from "@/store/design-system";

interface SampleScreensProps {
  system: DesignSystem;
}

export function SampleScreens({ system }: SampleScreensProps) {
  const { previewMode, previewLang } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const isRTL = previewLang === "ar";
  const comp = system.components;

  return (
    <div className="space-y-6">
      {/* Dashboard Screen */}
      <div>
        <p className="text-xs font-medium text-palette-text-secondary mb-3">Dashboard</p>
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.background,
          }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="flex h-[400px]">
            {/* Sidebar */}
            <div
              className="w-48 border-r flex flex-col shrink-0"
              style={{
                backgroundColor: comp.sidebar.background,
                borderColor: comp.sidebar.border,
                padding: comp.sidebar.padding,
              }}
            >
              <div className="flex items-center gap-2 mb-6 px-2">
                <div
                  className="h-7 w-7 rounded-lg"
                  style={{ backgroundColor: palette.primary }}
                />
                <span className="text-sm font-semibold" style={{ color: palette.textPrimary }}>
                  {isRTL ? "تطبيقي" : "My App"}
                </span>
              </div>

              <nav className="space-y-1">
                {(isRTL
                  ? ["لوحة التحكم", "المشاريع", "الفريق", "الإعدادات"]
                  : ["Dashboard", "Projects", "Team", "Settings"]
                ).map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-xs"
                    style={{
                      backgroundColor: i === 0 ? palette.primary : "transparent",
                      color: i === 0 ? "#FFFFFF" : palette.textSecondary,
                    }}
                  >
                    <div
                      className="h-3.5 w-3.5 rounded"
                      style={{
                        backgroundColor: i === 0 ? "rgba(255,255,255,0.3)" : palette.border,
                      }}
                    />
                    {item}
                  </div>
                ))}
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-hidden">
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: palette.border }}
              >
                <h2 className="text-base font-semibold" style={{ color: palette.textPrimary }}>
                  {isRTL ? "لوحة التحكم" : "Dashboard"}
                </h2>
                <div className="flex items-center gap-2">
                  <div
                    className="h-7 w-7 rounded-full"
                    style={{ backgroundColor: palette.surfaceMuted }}
                  />
                </div>
              </div>

              {/* KPI Cards */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: isRTL ? "إجمالي المستخدمين" : "Total Users", value: "2,847" },
                    { label: isRTL ? "الطلبات النشطة" : "Active Requests", value: "156" },
                    { label: isRTL ? "معدل الإنجاز" : "Completion Rate", value: "94.2%" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="border"
                      style={{
                        backgroundColor: comp.card.background,
                        borderColor: comp.card.border,
                        borderRadius: comp.card.borderRadius,
                        padding: comp.card.padding,
                      }}
                    >
                      <p className="text-[10px] mb-1" style={{ color: palette.textSecondary }}>
                        {kpi.label}
                      </p>
                      <p className="text-lg font-bold" style={{ color: palette.textPrimary }}>
                        {kpi.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Placeholder chart area */}
                <div
                  className="border rounded-lg h-36 flex items-end gap-1 p-4"
                  style={{
                    borderColor: palette.border,
                    backgroundColor: palette.surface,
                  }}
                >
                  {[40, 65, 45, 80, 55, 90, 70, 60, 85, 50, 75, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex-1 rounded-t"
                      style={{
                        backgroundColor: i === 11 ? palette.primary : palette.primary + "30",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List Screen */}
      <div>
        <p className="text-xs font-medium text-palette-text-secondary mb-3">
          {isRTL ? "صفحة القائمة" : "List Page"}
        </p>
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.background,
          }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="p-6 space-y-4">
            {/* Search bar */}
            <div className="flex gap-3">
              <input
                className="flex-1 text-sm border outline-none"
                placeholder={isRTL ? "بحث..." : "Search..."}
                style={{
                  backgroundColor: comp.input.background,
                  borderColor: comp.input.border,
                  color: comp.input.text,
                  padding: `${comp.input.paddingY} ${comp.input.paddingX}`,
                  borderRadius: comp.input.borderRadius,
                }}
                readOnly
              />
              <button
                className="text-sm font-medium text-white"
                style={{
                  backgroundColor: palette.primary,
                  padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                  borderRadius: comp.button.borderRadius,
                }}
              >
                {isRTL ? "إضافة" : "Add New"}
              </button>
            </div>

            {/* List items */}
            {[
              { name: isRTL ? "تقرير المبيعات" : "Sales Report", status: "Active" },
              { name: isRTL ? "مراجعة الأداء" : "Performance Review", status: "Pending" },
              { name: isRTL ? "طلب الميزانية" : "Budget Request", status: "Active" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between border rounded-lg"
                style={{
                  borderColor: palette.border,
                  padding: comp.card.padding,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{ backgroundColor: palette.surfaceMuted }}
                  />
                  <span className="text-sm" style={{ color: palette.textPrimary }}>
                    {item.name}
                  </span>
                </div>
                <span
                  className="text-[11px]"
                  style={{
                    padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                    borderRadius: comp.badge.borderRadius,
                    backgroundColor:
                      item.status === "Active"
                        ? palette.success + "18"
                        : palette.warning + "18",
                    color:
                      item.status === "Active" ? palette.success : palette.warning,
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
