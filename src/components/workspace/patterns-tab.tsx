"use client";

import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface PatternsTabProps {
  system: DesignSystem;
  content: IndustryContent;
}

const riskMatrix: number[][] = [
  [5, 5, 5, 4, 4],
  [4, 4, 4, 3, 3],
  [3, 3, 3, 2, 2],
  [2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1],
];

const impactLabels = [
  "Catastrophic",
  "Major",
  "Moderate",
  "Minor",
  "Insignificant",
];
const likelihoodLabels = [
  "Rare",
  "Unlikely",
  "Possible",
  "Likely",
  "Almost Certain",
];

function riskColor(score: number): { bg: string; text: string } {
  switch (score) {
    case 5:
      return { bg: "#DC2626", text: "#FFFFFF" };
    case 4:
      return { bg: "#EA580C", text: "#FFFFFF" };
    case 3:
      return { bg: "#EAB308", text: "#422006" };
    case 2:
      return { bg: "#FEF08A", text: "#713F12" };
    default:
      return { bg: "#E5E7EB", text: "#374151" };
  }
}

function riskLabel(score: number): string {
  switch (score) {
    case 5:
      return "Critical";
    case 4:
      return "High";
    case 3:
      return "Medium";
    case 2:
      return "Low";
    default:
      return "Negligible";
  }
}

function formatDate(): string {
  const d = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function PatternsTab({ system, content }: PatternsTabProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: palette.primary,
    marginBottom: 12,
  };

  const sectionDescStyle: React.CSSProperties = {
    fontSize: 15,
    color: palette.textSecondary,
    marginBottom: 32,
    lineHeight: 1.5,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
      {/* ─── NAVIGATION SIDEBAR ─── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p style={sectionHeadingStyle}>Navigation Sidebar</p>
        <p style={sectionDescStyle}>
          Primary navigation for the portal.
        </p>

        <div
          className="overflow-hidden"
          style={{
            borderRadius: system.spacing.radius.xl,
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.surface,
            padding: 0,
          }}
        >
          <div className="flex" style={{ minHeight: 520 }}>
            {/* Sidebar */}
            <div
              className="shrink-0 flex flex-col"
              style={{
                width: 240,
                backgroundColor: palette.surface,
                borderRight: `1px solid ${palette.border}`,
                padding: "20px 0",
              }}
            >
              {/* Org identity */}
              <div
                className="flex items-center gap-3"
                style={{ padding: "0 20px", marginBottom: 24 }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: system.spacing.radius.md,
                    backgroundColor: palette.primary,
                  }}
                >
                  <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 14 }}>
                    {content.orgName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: palette.textPrimary,
                      letterSpacing: "0.04em",
                      lineHeight: 1.2,
                    }}
                  >
                    {content.orgName.toUpperCase()}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      color: palette.textSecondary,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {content.orgSubtitle}
                  </p>
                </div>
              </div>

              {/* Nav sections from content */}
              <nav className="flex-1" style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 20 }}>
                {content.sidebarSections.map((section) => (
                  <div key={section.label}>
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        color: palette.textSecondary,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "0 8px",
                        marginBottom: 4,
                      }}
                    >
                      {section.label}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {section.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between"
                          style={{
                            padding: "7px 10px",
                            borderRadius: system.spacing.radius.md,
                            backgroundColor: item.active
                              ? palette.primary
                              : "transparent",
                            color: item.active ? "#FFFFFF" : palette.textSecondary,
                            fontSize: 12,
                            fontWeight: item.active ? 600 : 400,
                            cursor: "default",
                            transition: "background-color 0.15s",
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: 4,
                                backgroundColor: item.active
                                  ? "rgba(255,255,255,0.25)"
                                  : palette.border,
                              }}
                            />
                            {item.name}
                          </div>
                          {item.badge && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "1px 7px",
                                borderRadius: system.spacing.radius.full,
                                backgroundColor: item.active
                                  ? "rgba(255,255,255,0.25)"
                                  : palette.danger + "18",
                                color: item.active ? "#FFFFFF" : palette.danger,
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: palette.background }}>
              {/* Breadcrumb bar */}
              <div
                className="flex items-center"
                style={{
                  padding: "12px 24px",
                  borderBottom: `1px solid ${palette.border}`,
                }}
              >
                <p style={{ fontSize: 11, color: palette.textSecondary }}>
                  {content.breadcrumb.map((crumb, i) => {
                    const isLast = i === content.breadcrumb.length - 1;
                    return (
                      <span key={crumb}>
                        {i > 0 && (
                          <span style={{ margin: "0 6px", opacity: 0.4 }}>›</span>
                        )}
                        <span
                          style={
                            isLast
                              ? { color: palette.textPrimary, fontWeight: 500 }
                              : { opacity: 0.7 }
                          }
                        >
                          {crumb}
                        </span>
                      </span>
                    );
                  })}
                </p>
              </div>

              {/* Greeting header */}
              <div style={{ padding: "24px 24px 0" }}>
                <motion.h2
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  style={{
                    fontSize: system.typography.scale.h3,
                    fontWeight: system.typography.fontWeight.bold,
                    color: palette.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  {content.greeting}
                </motion.h2>
                <p style={{ fontSize: 12, color: palette.textSecondary }}>
                  {formatDate()}
                </p>
              </div>

              {/* Alert cards */}
              <div
                className="grid grid-cols-2 gap-3"
                style={{ padding: "20px 24px" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  style={{
                    border: `1px solid ${palette.warning}30`,
                    borderRadius: comp.card.borderRadius,
                    padding: "16px",
                    backgroundColor: palette.warning + "0A",
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="shrink-0 flex items-center justify-center"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        backgroundColor: palette.warning + "20",
                        color: palette.warning,
                        fontSize: 14,
                      }}
                    >
                      ⚠
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: palette.textPrimary,
                          marginBottom: 2,
                        }}
                      >
                        {content.alerts.warning.title}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: palette.textSecondary,
                          lineHeight: 1.4,
                        }}
                      >
                        {content.alerts.warning.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    border: `1px solid ${palette.info}30`,
                    borderRadius: comp.card.borderRadius,
                    padding: "16px",
                    backgroundColor: palette.info + "0A",
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="shrink-0 flex items-center justify-center"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        backgroundColor: palette.info + "20",
                        color: palette.info,
                        fontSize: 14,
                      }}
                    >
                      ✦
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: palette.textPrimary,
                          marginBottom: 2,
                        }}
                      >
                        {content.alerts.info.title}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: palette.textSecondary,
                          lineHeight: 1.4,
                        }}
                      >
                        {content.alerts.info.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick actions */}
              <div style={{ padding: "0 24px 24px" }}>
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: palette.textSecondary,
                    marginBottom: 10,
                  }}
                >
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {content.quickActions.map((label, i) => {
                    const isPrimary = i === 0;
                    return (
                      <motion.button
                        key={label}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35 + i * 0.05 }}
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                          borderRadius: comp.button.borderRadius,
                          border: isPrimary ? "none" : `1px solid ${palette.border}`,
                          backgroundColor: isPrimary ? palette.primary : palette.surface,
                          color: isPrimary ? "#FFFFFF" : palette.textPrimary,
                          cursor: "default",
                        }}
                      >
                        {label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── RISK MATRIX ─── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <p style={sectionHeadingStyle}>Risk Matrix</p>
        <p style={sectionDescStyle}>
          5×5 likelihood × impact matrix. Click a cell to see associated risks.
        </p>

        <div
          className="overflow-hidden"
          style={{
            borderRadius: system.spacing.radius.xl,
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.surface,
            padding: 32,
          }}
        >
          <div className="flex gap-6">
            {/* Matrix grid */}
            <div className="flex-1">
              <div className="flex">
                {/* Y-axis label */}
                <div className="flex flex-col items-center justify-center" style={{ marginRight: 8 }}>
                  <span
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: palette.textSecondary,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Impact
                  </span>
                </div>

                {/* Y-axis labels + grid */}
                <div className="flex-1">
                  <div className="flex flex-col">
                    {riskMatrix.map((row, rowIdx) => (
                      <div key={rowIdx} className="flex items-center">
                        <span
                          className="shrink-0"
                          style={{
                            width: 90,
                            fontSize: 10,
                            color: palette.textSecondary,
                            paddingRight: 10,
                            textAlign: "right",
                          }}
                        >
                          {impactLabels[rowIdx]}
                        </span>
                        <div className="flex-1 flex">
                          {row.map((_, colIdx) => {
                            const computedScore = Math.min(
                              5,
                              Math.max(1, Math.ceil(((5 - rowIdx) * (colIdx + 1)) / 5))
                            );
                            const colors = riskColor(computedScore);
                            return (
                              <motion.div
                                key={colIdx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: 0.3 + (rowIdx * 5 + colIdx) * 0.02,
                                  duration: 0.25,
                                }}
                                className="flex items-center justify-center"
                                style={{
                                  flex: 1,
                                  minWidth: 80,
                                  height: 48,
                                  backgroundColor: colors.bg,
                                  color: colors.text,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  border: `1px solid ${palette.background}`,
                                  borderRadius:
                                    rowIdx === 0 && colIdx === 0
                                      ? "6px 0 0 0"
                                      : rowIdx === 0 && colIdx === 4
                                        ? "0 6px 0 0"
                                        : rowIdx === 4 && colIdx === 0
                                          ? "0 0 0 6px"
                                          : rowIdx === 4 && colIdx === 4
                                            ? "0 0 6px 0"
                                            : "0",
                                  cursor: "default",
                                }}
                              >
                                {computedScore}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {/* X-axis labels */}
                    <div className="flex" style={{ marginLeft: 90 }}>
                      {likelihoodLabels.map((label) => (
                        <span
                          key={label}
                          className="flex-1"
                          style={{
                            fontSize: 10,
                            color: palette.textSecondary,
                            paddingTop: 8,
                            textAlign: "center",
                            minWidth: 80,
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* X-axis title */}
                    <p
                      style={{
                        marginLeft: 90,
                        marginTop: 6,
                        fontSize: 10,
                        fontWeight: 600,
                        color: palette.textSecondary,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      Likelihood
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div
              className="shrink-0"
              style={{
                width: 176,
                padding: 16,
                borderRadius: system.spacing.radius.lg,
                backgroundColor: palette.surfaceMuted,
                border: `1px solid ${palette.border}`,
                alignSelf: "flex-start",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: palette.textPrimary,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 12,
                }}
              >
                Legend
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[5, 4, 3, 2, 1].map((score) => {
                  const c = riskColor(score);
                  return (
                    <div key={score} className="flex items-center gap-2.5">
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          backgroundColor: c.bg,
                          border: score === 1 ? `1px solid ${palette.border}` : "none",
                        }}
                      />
                      <div>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: palette.textPrimary,
                          }}
                        >
                          {score}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: palette.textSecondary,
                            marginLeft: 6,
                          }}
                        >
                          {riskLabel(score)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
