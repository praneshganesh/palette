"use client";

import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface DashboardTabProps {
  system: DesignSystem;
  content: IndustryContent;
}

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const accentColors = (palette: DesignSystem["palette"]) => [
  palette.primary,
  palette.danger,
  palette.warning,
  palette.success,
];

export function DashboardTab({ system, content }: DashboardTabProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;
  const radius = system.spacing.radius;

  const statusColor = (status: string) => {
    switch (status) {
      case "Active":
        return palette.success;
      case "Review":
        return palette.info;
      case "Closed":
        return palette.textSecondary;
      case "Pending":
        return palette.warning;
      case "Draft":
        return palette.textSecondary;
      case "Urgent":
        return palette.danger;
      case "Scheduled":
        return palette.info;
      default:
        return palette.textSecondary;
    }
  };

  const impactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
      case "High":
        return palette.danger;
      case "Medium":
        return palette.warning;
      default:
        return palette.textSecondary;
    }
  };

  const severityColor = (level: number) =>
    level >= 4 ? palette.danger : palette.warning;

  const sectionHeadingStyle: React.CSSProperties = {
    textTransform: "uppercase",
    fontSize: 13,
    fontWeight: 700,
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

  const colors = accentColors(palette);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
      {/* Section heading */}
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <p style={sectionHeadingStyle}>DASHBOARD PREVIEW</p>
        <p style={sectionDescStyle}>
          A realistic composition showing how the design system comes together.
        </p>

        {/* Dashboard container */}
        <div
          style={{
            backgroundColor: palette.background,
            borderRadius: radius.xl,
            border: `1px solid ${palette.border}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            {/* KPI Stats Row */}
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 20,
              }}
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {content.kpis.slice(0, 4).map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  variants={fadeUp}
                  transition={{ duration: 0.35 }}
                  style={{
                    backgroundColor: palette.surface,
                    border: `1px solid ${palette.border}`,
                    borderRadius: radius.lg,
                    borderLeft: `4px solid ${colors[i % colors.length]}`,
                    padding: 24,
                  }}
                >
                  <p
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: palette.textPrimary,
                      fontFamily: system.typography.headingFont,
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    {kpi.value}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: palette.textSecondary,
                      marginTop: 6,
                      margin: 0,
                      marginBlockStart: 6,
                    }}
                  >
                    {kpi.label}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: colors[i % colors.length],
                      marginTop: 2,
                      margin: 0,
                      marginBlockStart: 2,
                    }}
                  >
                    {kpi.subtitle}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Two-column layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              {/* Recent Items */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.15 }}
                style={{
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: radius.lg,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    borderBottom: `1px solid ${palette.border}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: palette.textPrimary,
                      fontFamily: system.typography.headingFont,
                      margin: 0,
                    }}
                  >
                    Recent Items
                  </p>
                  <button
                    style={{
                      backgroundColor: comp.button.primaryBg,
                      color: comp.button.primaryText,
                      padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                      borderRadius: comp.button.borderRadius,
                      border: "none",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    + New
                  </button>
                </div>
                <div>
                  {content.recentItems.slice(0, 3).map((item, i) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 20px",
                        borderTop:
                          i > 0 ? `1px solid ${palette.border}` : undefined,
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          fontSize: 11,
                          fontFamily: "monospace",
                          fontWeight: 500,
                          backgroundColor: palette.primary + "15",
                          color: palette.primary,
                          padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                          borderRadius: comp.badge.borderRadius,
                          marginTop: 2,
                        }}
                      >
                        {item.id}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 14,
                            color: palette.textPrimary,
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: palette.textSecondary,
                            margin: 0,
                            marginBlockStart: 2,
                          }}
                        >
                          {item.author}
                        </p>
                      </div>
                      <span
                        style={{
                          flexShrink: 0,
                          fontSize: 11,
                          fontWeight: 500,
                          backgroundColor: statusColor(item.status) + "18",
                          color: statusColor(item.status),
                          padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                          borderRadius: comp.badge.borderRadius,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Risk Register */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{
                  backgroundColor: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: radius.lg,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    borderBottom: `1px solid ${palette.border}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: palette.textPrimary,
                      fontFamily: system.typography.headingFont,
                      margin: 0,
                    }}
                  >
                    Risk Register
                  </p>
                  <button
                    style={{
                      backgroundColor: comp.button.secondaryBg,
                      color: comp.button.secondaryText,
                      border: `1px solid ${comp.button.secondaryBorder}`,
                      padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                      borderRadius: comp.button.borderRadius,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Full Register
                  </button>
                </div>
                <div>
                  {content.risks.slice(0, 3).map((risk, i) => (
                    <div
                      key={risk.id}
                      style={{
                        padding: "12px 20px",
                        borderTop:
                          i > 0 ? `1px solid ${palette.border}` : undefined,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: "monospace",
                            fontWeight: 500,
                            backgroundColor: palette.danger + "15",
                            color: palette.danger,
                            padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                            borderRadius: comp.badge.borderRadius,
                          }}
                        >
                          {risk.id}
                        </span>
                        <span
                          style={{ fontSize: 12, color: palette.textSecondary }}
                        >
                          {risk.owner}
                        </span>
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 11,
                            fontWeight: 700,
                            width: 24,
                            height: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor:
                              severityColor(risk.severity) + "18",
                            color: severityColor(risk.severity),
                          }}
                        >
                          {risk.severity}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 14,
                          color: palette.textPrimary,
                          margin: 0,
                          marginBottom: 8,
                        }}
                      >
                        {risk.title}
                      </p>
                      <div style={{ display: "flex", gap: 6 }}>
                        {risk.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 10,
                              fontWeight: 500,
                              backgroundColor:
                                severityColor(risk.severity) + "15",
                              color: severityColor(risk.severity),
                              padding: "2px 6px",
                              borderRadius: comp.badge.borderRadius,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Decision Log */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: radius.lg,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  borderBottom: `1px solid ${palette.border}`,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: palette.textPrimary,
                      fontFamily: system.typography.headingFont,
                      margin: 0,
                    }}
                  >
                    Decision Log
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: palette.textSecondary,
                      margin: 0,
                      marginBlockStart: 4,
                    }}
                  >
                    Governance decisions and ratification status
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      backgroundColor: comp.button.secondaryBg,
                      color: comp.button.secondaryText,
                      border: `1px solid ${comp.button.secondaryBorder}`,
                      padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                      borderRadius: comp.button.borderRadius,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filter
                  </button>
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      backgroundColor: comp.button.primaryBg,
                      color: comp.button.primaryText,
                      border: "none",
                      padding: `${comp.button.paddingY} ${comp.button.paddingX}`,
                      borderRadius: comp.button.borderRadius,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    + Add Decision
                  </button>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    fontSize: 13,
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: comp.table.headerBg }}>
                      {[
                        "ID",
                        "DECISION",
                        "MADE BY",
                        "DATE",
                        "IMPACT",
                        "STATUS",
                        "ACTIONS",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
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
                    {content.decisions.slice(0, 4).map((row, i) => (
                      <tr
                        key={row.id}
                        style={{
                          backgroundColor:
                            i % 2 === 1
                              ? comp.table.stripedBg
                              : "transparent",
                          borderTop: `1px solid ${comp.table.rowBorder}`,
                        }}
                      >
                        <td
                          style={{
                            padding: comp.table.cellPadding,
                            color: palette.primary,
                            fontFamily: "monospace",
                            fontSize: 12,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.id}
                        </td>
                        <td
                          style={{
                            padding: comp.table.cellPadding,
                            color: palette.textPrimary,
                          }}
                        >
                          {row.title}
                        </td>
                        <td
                          style={{
                            padding: comp.table.cellPadding,
                            color: palette.textSecondary,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.madeBy}
                        </td>
                        <td
                          style={{
                            padding: comp.table.cellPadding,
                            color: palette.textSecondary,
                            fontFamily: "monospace",
                            fontSize: 12,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.date}
                        </td>
                        <td style={{ padding: comp.table.cellPadding }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              backgroundColor:
                                impactColor(row.impact) + "15",
                              color: impactColor(row.impact),
                              padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                              borderRadius: comp.badge.borderRadius,
                            }}
                          >
                            {row.impact}
                          </span>
                        </td>
                        <td style={{ padding: comp.table.cellPadding }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              backgroundColor:
                                statusColor(row.status) + "18",
                              color: statusColor(row.status),
                              padding: `${comp.badge.paddingY} ${comp.badge.paddingX}`,
                              borderRadius: comp.badge.borderRadius,
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: comp.table.cellPadding }}>
                          <button
                            style={{
                              fontSize: 12,
                              color: palette.primary,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
