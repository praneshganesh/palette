"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart5Props {
  system: DesignSystem;
  content: IndustryContent;
  activeSection?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const lineData = [28, 42, 35, 58, 52, 68, 62, 78, 72, 88, 82, 95];
const barData = [64, 82, 45, 93, 71, 58];
const barLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const areaData1 = [20, 35, 28, 48, 42, 55, 50, 65, 60, 72];
const areaData2 = [12, 22, 18, 32, 28, 38, 35, 45, 40, 50];
const areaData3 = [5, 12, 8, 18, 15, 22, 20, 28, 24, 32];
const donutSegments = [
  { label: "Primary", pct: 35 },
  { label: "Secondary", pct: 25 },
  { label: "Growth", pct: 20 },
  { label: "Stable", pct: 12 },
  { label: "Other", pct: 8 },
];
const scatterPoints = [
  [45, 78], [120, 145], [80, 110], [200, 180], [160, 155],
  [55, 60], [180, 195], [130, 120], [95, 135], [220, 170],
  [70, 95], [240, 210], [150, 160], [110, 100], [190, 185],
  [35, 50], [210, 200], [140, 130], [85, 115], [170, 175],
];
const heatmapGrid = [
  [0.2, 0.5, 0.8, 0.3, 0.9, 0.6, 0.4],
  [0.7, 0.3, 0.6, 0.9, 0.4, 0.2, 0.8],
  [0.4, 0.8, 0.2, 0.5, 0.7, 0.9, 0.3],
  [0.9, 0.6, 0.4, 0.7, 0.2, 0.5, 0.8],
  [0.3, 0.4, 0.9, 0.6, 0.8, 0.3, 0.7],
];
const heatmapCols = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatmapRows = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

const activityTypes = [
  { type: "created", color: "success", icon: "+" },
  { type: "updated", color: "info", icon: "↻" },
  { type: "commented", color: "warning", icon: "💬" },
  { type: "approved", color: "primary", icon: "✓" },
];

const commandItems = {
  Recent: [
    { label: "Dashboard", shortcut: "⌘D", icon: "▦" },
    { label: "Settings", shortcut: "⌘,", icon: "⚙" },
  ],
  Actions: [
    { label: "New project", shortcut: "⌘N", icon: "+" },
    { label: "Search files", shortcut: "⌘P", icon: "⌕" },
    { label: "Toggle theme", shortcut: "⌘T", icon: "◐" },
  ],
  Navigation: [
    { label: "Go to home", shortcut: "⌘H", icon: "⌂" },
    { label: "View reports", shortcut: "⌘R", icon: "▤" },
  ],
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

function lerpColor(from: string, to: string, t: number): string {
  const f = hexToRgb(from);
  const tt = hexToRgb(to);
  if (!f || !tt) return to;
  const r = Math.round(f.r + (tt.r - f.r) * t);
  const g = Math.round(f.g + (tt.g - f.g) * t);
  const b = Math.round(f.b + (tt.b - f.b) * t);
  return `rgb(${r},${g},${b})`;
}

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cx = (pts[i][0] + pts[i + 1][0]) / 2;
    const cy = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${pts[i][0]} ${pts[i][1]}, ${cx} ${cy}`;
  }
  d += ` T ${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
  return d;
}

export function ComponentsPart5({ system, content, activeSection }: ComponentsPart5Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  const [calendarMonth] = useState(3);

  const accentBar: React.CSSProperties = { width: 48, height: 2, backgroundColor: palette.primary, marginBottom: 24, borderRadius: 1 };
  const sectionTitle: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8, margin: 0, lineHeight: 1.2 };
  const sectionDesc: React.CSSProperties = { fontSize: 14, color: palette.textSecondary, lineHeight: 1.8, maxWidth: 600, marginBottom: 32, marginTop: 0 };
  const sectionWrap = (border = true): React.CSSProperties => ({ paddingBottom: 72, marginBottom: 72, borderBottom: border ? `1px solid ${palette.border}` : "none" });
  const chartContainer: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 28 };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const donutColors = [palette.primary, palette.secondary, palette.accent, palette.success, palette.info];

  const calYear = 2026;
  const calMonthIdx = calendarMonth;
  const daysInMonth = new Date(calYear, calMonthIdx + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonthIdx, 1).getDay();
  const calDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calDays.push(d);
  const eventDays = [3, 7, 12, 15, 18, 22, 26];
  const todayDay = 17;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* ═══════════════════════════════════════════════
          1. LINE CHART
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-line-chart" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={{ ...sectionWrap(), display: activeSection === "comp-line-chart" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Line Chart</h3>
        <p style={sectionDesc}>
          Trend visualization for time-series data. Gradient fills beneath the line communicate magnitude while data points provide precise readability.
        </p>

        <div style={chartContainer}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: 0 }}>
              Performance Over Time
            </p>
            <p style={{ fontSize: 12, color: palette.textSecondary, margin: "4px 0 0" }}>Monthly trend — last 12 months</p>
          </div>
          <svg viewBox="0 0 440 220" style={{ width: "100%", height: "auto", overflow: "visible" }}>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.primary} stopOpacity="0.25" />
                <stop offset="100%" stopColor={palette.primary} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <line x1="40" y1={20 + i * 40} x2="420" y2={20 + i * 40} stroke={palette.border} strokeWidth="0.5" strokeOpacity="0.6" />
                <text x="34" y={24 + i * 40} textAnchor="end" fill={palette.textSecondary} fontSize="9" fontFamily={system.typography.bodyFont}>
                  {100 - i * 25}
                </text>
              </React.Fragment>
            ))}
            {(() => {
              const pts: [number, number][] = lineData.map((v, i) => [
                40 + (i * 380) / (lineData.length - 1),
                180 - (v / 100) * 160,
              ]);
              const linePath = smoothPath(pts);
              const areaPath = linePath + ` L ${pts[pts.length - 1][0]} 180 L ${pts[0][0]} 180 Z`;
              return (
                <>
                  <path d={areaPath} fill="url(#lineGrad)" />
                  <path d={linePath} fill="none" stroke={palette.primary} strokeWidth="2.5" strokeLinecap="round" />
                  {pts.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill={palette.surface} stroke={palette.primary} strokeWidth="2" />
                  ))}
                  <g>
                    <rect x={pts[7][0] - 30} y={pts[7][1] - 32} width="60" height="22" rx="4" fill={palette.textPrimary} />
                    <text x={pts[7][0]} y={pts[7][1] - 18} textAnchor="middle" fill={palette.surface} fontSize="10" fontWeight="600" fontFamily={system.typography.bodyFont}>
                      {lineData[7]}%
                    </text>
                    <polygon points={`${pts[7][0] - 4},${pts[7][1] - 10} ${pts[7][0] + 4},${pts[7][1] - 10} ${pts[7][0]},${pts[7][1] - 5}`} fill={palette.textPrimary} />
                  </g>
                </>
              );
            })()}
            {months.map((m, i) => (
              <text key={m} x={40 + (i * 380) / 11} y="198" textAnchor="middle" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>
                {m}
              </text>
            ))}
          </svg>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          2. BAR CHART
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-bar-chart" data-comp-section {...fadeUp} transition={{ delay: 0.05 }} style={{ ...sectionWrap(), display: activeSection === "comp-bar-chart" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Bar Chart</h3>
        <p style={sectionDesc}>
          Categorical comparison through proportional bars. Highlighted segments draw attention to outliers while grouped variants enable multi-series analysis.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={chartContainer}>
            <p style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: "0 0 16px" }}>
              Single Series
            </p>
            <svg viewBox="0 0 320 200" style={{ width: "100%", height: "auto" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1="35" y1={16 + i * 38} x2="310" y2={16 + i * 38} stroke={palette.border} strokeWidth="0.5" strokeOpacity="0.5" />
              ))}
              {barData.map((v, i) => {
                const barW = 30;
                const gap = (275 - barData.length * barW) / (barData.length + 1);
                const x = 35 + gap + i * (barW + gap);
                const barH = (v / 100) * 150;
                const y = 168 - barH;
                const isHighlight = i === 3;
                return (
                  <React.Fragment key={i}>
                    <rect x={x} y={y} width={barW} height={barH} rx="3" fill={isHighlight ? palette.accent : palette.primary} opacity={isHighlight ? 1 : 0.85} />
                    <text x={x + barW / 2} y={y - 6} textAnchor="middle" fill={palette.textPrimary} fontSize="9" fontWeight="600" fontFamily={system.typography.bodyFont}>
                      {v}
                    </text>
                    <text x={x + barW / 2} y="184" textAnchor="middle" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>
                      {barLabels[i]}
                    </text>
                  </React.Fragment>
                );
              })}
            </svg>
          </div>

          <div style={chartContainer}>
            <p style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: "0 0 16px" }}>
              Grouped Comparison
            </p>
            <svg viewBox="0 0 320 200" style={{ width: "100%", height: "auto" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1="35" y1={16 + i * 38} x2="310" y2={16 + i * 38} stroke={palette.border} strokeWidth="0.5" strokeOpacity="0.5" />
              ))}
              {barLabels.map((label, i) => {
                const groupW = 42;
                const gap = (275 - barLabels.length * groupW) / (barLabels.length + 1);
                const gx = 35 + gap + i * (groupW + gap);
                const v1 = barData[i];
                const v2 = Math.round(barData[i] * 0.7);
                const h1 = (v1 / 100) * 150;
                const h2 = (v2 / 100) * 150;
                return (
                  <React.Fragment key={i}>
                    <rect x={gx} y={168 - h1} width={18} height={h1} rx="2" fill={palette.primary} opacity="0.85" />
                    <rect x={gx + 20} y={168 - h2} width={18} height={h2} rx="2" fill={palette.secondary} opacity="0.85" />
                    <text x={gx + 19} y="184" textAnchor="middle" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>
                      {label}
                    </text>
                  </React.Fragment>
                );
              })}
              <rect x="220" y="6" width="8" height="8" rx="1.5" fill={palette.primary} opacity="0.85" />
              <text x="232" y="13" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>This year</text>
              <rect x="272" y="6" width="8" height="8" rx="1.5" fill={palette.secondary} opacity="0.85" />
              <text x="284" y="13" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>Last year</text>
            </svg>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          3. AREA CHART
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-area-chart" data-comp-section {...fadeUp} transition={{ delay: 0.1 }} style={{ ...sectionWrap(), display: activeSection === "comp-area-chart" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Area Chart</h3>
        <p style={sectionDesc}>
          Stacked area visualization for multi-series composition analysis. Translucent fills show volume distribution while smooth curves ensure readability.
        </p>

        <div style={chartContainer}>
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: 0 }}>
                Resource Allocation
              </p>
              <p style={{ fontSize: 12, color: palette.textSecondary, margin: "4px 0 0" }}>Stacked view — 10 data points</p>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "Series A", color: palette.primary },
                { label: "Series B", color: palette.secondary },
                { label: "Series C", color: palette.accent },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: s.color, opacity: 0.7 }} />
                  <span style={{ fontSize: 10, color: palette.textSecondary }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 440 200" style={{ width: "100%", height: "auto" }}>
            <defs>
              <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.primary} stopOpacity="0.3" />
                <stop offset="100%" stopColor={palette.primary} stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.secondary} stopOpacity="0.3" />
                <stop offset="100%" stopColor={palette.secondary} stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="areaGrad3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.accent} stopOpacity="0.3" />
                <stop offset="100%" stopColor={palette.accent} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="40" y1={15 + i * 38} x2="420" y2={15 + i * 38} stroke={palette.border} strokeWidth="0.5" strokeOpacity="0.4" />
            ))}
            {[areaData1, areaData2, areaData3].map((data, si) => {
              const pts: [number, number][] = data.map((v, i) => [
                40 + (i * 380) / (data.length - 1),
                170 - (v / 80) * 155,
              ]);
              const line = smoothPath(pts);
              const area = line + ` L ${pts[pts.length - 1][0]} 170 L ${pts[0][0]} 170 Z`;
              const colors = [palette.primary, palette.secondary, palette.accent];
              const grads = ["url(#areaGrad1)", "url(#areaGrad2)", "url(#areaGrad3)"];
              return (
                <React.Fragment key={si}>
                  <path d={area} fill={grads[si]} />
                  <path d={line} fill="none" stroke={colors[si]} strokeWidth="2" strokeLinecap="round" />
                </React.Fragment>
              );
            })}
            {areaData1.map((_, i) => (
              <text key={i} x={40 + (i * 380) / 9} y="188" textAnchor="middle" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>
                {i + 1}
              </text>
            ))}
          </svg>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          4. DONUT CHART
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-pie-donut" data-comp-section {...fadeUp} transition={{ delay: 0.15 }} style={{ ...sectionWrap(), display: activeSection === "comp-pie-donut" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Donut Chart</h3>
        <p style={sectionDesc}>
          Proportional distribution with a hollow center for summary metrics. Segmented arcs communicate part-to-whole relationships at a glance.
        </p>

        <div style={chartContainer}>
          <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
            <svg viewBox="0 0 200 200" style={{ width: 220, height: 220, flexShrink: 0 }}>
              {(() => {
                const cx = 100, cy = 100, r = 75, strokeW = 28;
                let cumAngle = -90;
                return donutSegments.map((seg, i) => {
                  const angle = (seg.pct / 100) * 360;
                  const startRad = (cumAngle * Math.PI) / 180;
                  const endRad = ((cumAngle + angle) * Math.PI) / 180;
                  const x1 = cx + r * Math.cos(startRad);
                  const y1 = cy + r * Math.sin(startRad);
                  const x2 = cx + r * Math.cos(endRad);
                  const y2 = cy + r * Math.sin(endRad);
                  const largeArc = angle > 180 ? 1 : 0;
                  const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
                  cumAngle += angle;
                  return (
                    <path key={i} d={d} fill="none" stroke={donutColors[i]} strokeWidth={strokeW} strokeLinecap="butt" />
                  );
                });
              })()}
              <text x="100" y="94" textAnchor="middle" fill={palette.textPrimary} fontSize="22" fontWeight="700" fontFamily={system.typography.headingFont}>
                {content.kpis[0]?.value ?? "148"}
              </text>
              <text x="100" y="112" textAnchor="middle" fill={palette.textSecondary} fontSize="10" fontFamily={system.typography.bodyFont}>
                {content.kpis[0]?.label ?? "Total"}
              </text>
            </svg>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {donutSegments.map((seg, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: donutColors[i], flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: palette.textPrimary, fontWeight: 500, fontFamily: system.typography.bodyFont, minWidth: 80 }}>
                    {seg.label}
                  </span>
                  <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: "monospace" }}>{seg.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          5. SCATTER PLOT
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-scatter" data-comp-section {...fadeUp} transition={{ delay: 0.2 }} style={{ ...sectionWrap(), display: activeSection === "comp-scatter" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Scatter Plot</h3>
        <p style={sectionDesc}>
          Correlation visualization for two-variable analysis. Varying opacity encodes density while accent-highlighted outliers surface key data points.
        </p>

        <div style={chartContainer}>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: 0 }}>
              Correlation Analysis
            </p>
            <p style={{ fontSize: 12, color: palette.textSecondary, margin: "4px 0 0" }}>20 data points with trend line</p>
          </div>
          <svg viewBox="0 0 440 260" style={{ width: "100%", height: "auto" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <React.Fragment key={`g${i}`}>
                <line x1="50" y1={20 + i * 40} x2="420" y2={20 + i * 40} stroke={palette.border} strokeWidth="0.5" strokeOpacity="0.4" />
                <text x="44" y={24 + i * 40} textAnchor="end" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>
                  {250 - i * 50}
                </text>
              </React.Fragment>
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <React.Fragment key={`x${i}`}>
                <line x1={50 + i * 74} y1="220" x2={50 + i * 74} y2="20" stroke={palette.border} strokeWidth="0.5" strokeOpacity="0.2" />
                <text x={50 + i * 74} y="238" textAnchor="middle" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>
                  {i * 50}
                </text>
              </React.Fragment>
            ))}
            <line x1="50" y1="200" x2="420" y2="40" stroke={palette.primary} strokeWidth="1.5" strokeDasharray="6 3" opacity="0.4" />
            {scatterPoints.map(([px, py], i) => {
              const x = 50 + (px / 260) * 370;
              const y = 220 - (py / 250) * 200;
              const isHighlight = i % 5 === 0;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={isHighlight ? 5 : 3.5}
                  fill={isHighlight ? palette.accent : palette.primary}
                  opacity={isHighlight ? 0.9 : 0.5 + (i % 3) * 0.15}
                />
              );
            })}
          </svg>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          6. HEATMAP
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-heatmap" data-comp-section {...fadeUp} transition={{ delay: 0.25 }} style={{ ...sectionWrap(), display: activeSection === "comp-heatmap" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Heatmap</h3>
        <p style={sectionDesc}>
          Matrix-style intensity visualization for spotting patterns across two dimensions. Color interpolation from surface to primary communicates magnitude.
        </p>

        <div style={chartContainer}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, margin: 0 }}>
              Activity Density
            </p>
            <p style={{ fontSize: 12, color: palette.textSecondary, margin: "4px 0 0" }}>Weekly breakdown — intensity mapped</p>
          </div>
          <svg viewBox="0 0 440 260" style={{ width: "100%", height: "auto" }}>
            <text x="220" y="16" textAnchor="middle" fill={palette.textSecondary} fontSize="9" fontFamily={system.typography.bodyFont} />
            {heatmapCols.map((col, ci) => (
              <text key={col} x={80 + ci * 50 + 22} y="38" textAnchor="middle" fill={palette.textSecondary} fontSize="9" fontWeight="600" fontFamily={system.typography.bodyFont}>
                {col}
              </text>
            ))}
            {heatmapRows.map((row, ri) => (
              <React.Fragment key={row}>
                <text x="72" y={62 + ri * 36 + 14} textAnchor="end" fill={palette.textSecondary} fontSize="9" fontFamily={system.typography.bodyFont}>
                  {row}
                </text>
                {heatmapGrid[ri].map((val, ci) => (
                  <rect
                    key={ci}
                    x={80 + ci * 50}
                    y={50 + ri * 36}
                    width="44"
                    height="30"
                    rx="4"
                    fill={lerpColor(palette.surface, palette.primary, val)}
                    opacity={0.4 + val * 0.6}
                  />
                ))}
              </React.Fragment>
            ))}
            <rect x="120" y="236" width="200" height="8" rx="4" fill="none" />
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x={120 + i * 20} y="236" width="20" height="8" rx={i === 0 ? 4 : i === 9 ? 4 : 0} fill={lerpColor(palette.surface, palette.primary, i / 9)} opacity={0.4 + (i / 9) * 0.6} />
            ))}
            <text x="112" y="243" textAnchor="end" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>Low</text>
            <text x="328" y="243" fill={palette.textSecondary} fontSize="8" fontFamily={system.typography.bodyFont}>High</text>
          </svg>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          7. KPI / STAT CARD ROW
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-kpi-cards" data-comp-section {...fadeUp} transition={{ delay: 0.3 }} style={{ ...sectionWrap(), display: activeSection === "comp-kpi-cards" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>KPI Cards</h3>
        <p style={sectionDesc}>
          High-impact summary metrics for dashboard headers. Sparklines provide trend context while directional indicators surface momentum at a glance.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {content.kpis.slice(0, 4).map((kpi, i) => {
            const isHighlight = i === 0;
            const sparkData = [30, 45, 38, 55, 48, 62, 58, 70, 65, 78].map((v, si) => v + i * 5 + si * (i + 1));
            const sparkMax = Math.max(...sparkData);
            const sparkMin = Math.min(...sparkData);
            const sparkPts = sparkData.map((v, si) => `${4 + (si * 72) / 9},${22 - ((v - sparkMin) / (sparkMax - sparkMin || 1)) * 18}`).join(" ");
            const isUp = kpi.subtitle.includes("↑") || i % 2 === 0;
            const trendPct = `${(3 + i * 2.5).toFixed(1)}%`;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: isHighlight ? palette.primary : palette.surface,
                  border: `1px solid ${isHighlight ? palette.primary : palette.border}`,
                  borderRadius: system.spacing.radius.lg,
                  padding: "20px 20px 16px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <p style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: isHighlight ? withAlpha("#ffffff", 0.7) : palette.textSecondary,
                  margin: "0 0 8px",
                  fontFamily: system.typography.bodyFont,
                }}>
                  {kpi.label}
                </p>
                <p style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: isHighlight ? "#ffffff" : palette.textPrimary,
                  margin: "0 0 6px",
                  fontFamily: system.typography.headingFont,
                  lineHeight: 1,
                }}>
                  {kpi.value}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: isHighlight ? withAlpha("#ffffff", 0.85) : isUp ? palette.success : palette.danger,
                  }}>
                    {isUp ? "↑" : "↓"} {trendPct}
                  </span>
                  <span style={{
                    fontSize: 10,
                    color: isHighlight ? withAlpha("#ffffff", 0.6) : palette.textSecondary,
                  }}>
                    {kpi.subtitle}
                  </span>
                </div>
                <svg viewBox="0 0 80 24" style={{ width: 80, height: 24, marginTop: 10, display: "block" }}>
                  <polyline
                    points={sparkPts}
                    fill="none"
                    stroke={isHighlight ? withAlpha("#ffffff", 0.6) : palette.primary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          8. FILTER BAR
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-filter-bar" data-comp-section {...fadeUp} transition={{ delay: 0.35 }} style={{ ...sectionWrap(), display: activeSection === "comp-filter-bar" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Filter Bar</h3>
        <p style={sectionDesc}>
          Compound filtering interface for data-heavy views. Combines search, dropdown filters, active chips, sort controls, and view toggles in a single coherent bar.
        </p>

        <div style={chartContainer}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: palette.background,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.md,
              padding: "8px 12px",
              minWidth: 180,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>Search...</span>
            </div>

            <div style={{ width: 1, height: 28, backgroundColor: palette.border }} />

            {/* Filter dropdowns */}
            {["Status ▾", "Type ▾", "Date range ▾", "Owner ▾"].map((f) => (
              <button key={f} style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "7px 12px",
                fontSize: 12,
                fontWeight: 500,
                color: palette.textSecondary,
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.md,
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                {f}
              </button>
            ))}

            <div style={{ flex: 1 }} />

            {/* Sort */}
            <button style={{
              padding: "7px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: palette.textSecondary,
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.md,
              cursor: "pointer",
              fontFamily: system.typography.bodyFont,
            }}>
              Sort: Recent ▾
            </button>

            {/* View toggle */}
            <div style={{ display: "flex", border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
              <div style={{ padding: "6px 10px", backgroundColor: palette.primary, display: "flex", alignItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </div>
              <div style={{ padding: "6px 10px", backgroundColor: palette.surface, display: "flex", alignItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
            {[
              { label: "Status: Active", color: palette.success },
              { label: "Type: Report", color: palette.info },
              { label: "Owner: Sarah", color: palette.primary },
            ].map((chip) => (
              <div key={chip.label} style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 500,
                color: chip.color,
                backgroundColor: withAlpha(chip.color, 0.1),
                borderRadius: system.spacing.radius.full,
                fontFamily: system.typography.bodyFont,
              }}>
                {chip.label}
                <span style={{ cursor: "pointer", fontSize: 13, lineHeight: 1, opacity: 0.6 }}>×</span>
              </div>
            ))}
            <span style={{ fontSize: 11, color: palette.primary, cursor: "pointer", fontWeight: 500, marginLeft: 4 }}>Clear all</span>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          9. TIMELINE / ACTIVITY FEED
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-timeline" data-comp-section {...fadeUp} transition={{ delay: 0.4 }} style={{ ...sectionWrap(), display: activeSection === "comp-timeline" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Activity Feed</h3>
        <p style={sectionDesc}>
          Chronological event stream with contextual metadata. A vertical spine connects entries while icon badges and status colors differentiate event types.
        </p>

        <div style={chartContainer}>
          <div style={{ position: "relative", paddingLeft: 36 }}>
            <div style={{
              position: "absolute",
              left: 13,
              top: 8,
              bottom: 8,
              width: 2,
              backgroundColor: palette.border,
              borderRadius: 1,
            }} />

            {(content.recentItems.length > 0 ? content.recentItems : [
              { id: "ACT-1", title: "Item created", author: "User", status: "Active" },
              { id: "ACT-2", title: "Item updated", author: "Admin", status: "Review" },
              { id: "ACT-3", title: "Comment added", author: "User", status: "Active" },
            ]).slice(0, 4).map((item, i) => {
              const at = activityTypes[i % activityTypes.length];
              const colorMap: Record<string, string> = { success: palette.success, info: palette.info, warning: palette.warning, primary: palette.primary };
              const iconColor = colorMap[at.color] ?? palette.primary;
              const timestamps = ["2 min ago", "15 min ago", "1 hour ago", "3 hours ago"];
              const descriptions = [
                "Created a new entry in the system",
                "Updated priority and assigned new owner",
                "Added a review comment with feedback",
                "Approved changes and marked as complete",
              ];
              return (
                <div key={item.id} style={{ display: "flex", gap: 14, marginBottom: i < 3 ? 28 : 0, position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    left: -36,
                    top: 2,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: withAlpha(iconColor, 0.12),
                    border: `2px solid ${palette.surface}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: iconColor,
                    fontWeight: 700,
                    zIndex: 1,
                  }}>
                    {at.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: i === 0 ? palette.primary : i === 1 ? palette.secondary : i === 2 ? palette.accent : palette.success,
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        fontWeight: 600,
                      }}>
                        {item.author.charAt(0)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{item.author}</span>
                      <span style={{ fontSize: 11, color: palette.textSecondary }}>{timestamps[i]}</span>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: system.spacing.radius.full,
                        backgroundColor: withAlpha(iconColor, 0.1),
                        color: iconColor,
                        marginLeft: "auto",
                      }}>
                        {item.status}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, margin: "0 0 2px" }}>{item.title}</p>
                    <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0, lineHeight: 1.5 }}>{descriptions[i]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          10. CALENDAR
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-calendar" data-comp-section {...fadeUp} transition={{ delay: 0.45 }} style={{ ...sectionWrap(), display: activeSection === "comp-calendar" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Calendar</h3>
        <p style={sectionDesc}>
          Month-view date grid with event indicators and today highlighting. Compact event pills surface scheduling density without overwhelming the grid.
        </p>

        <div style={{ ...chartContainer, maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <button style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: palette.surfaceMuted,
              border: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14,
              color: palette.textSecondary,
            }}>
              ‹
            </button>
            <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>
              {monthNames[calMonthIdx]} {calYear}
            </span>
            <button style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: palette.surfaceMuted,
              border: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14,
              color: palette.textSecondary,
            }}>
              ›
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} style={{
                textAlign: "center",
                fontSize: 10,
                fontWeight: 700,
                color: palette.textSecondary,
                padding: "6px 0",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}>
                {d}
              </div>
            ))}
            {calDays.map((day, i) => {
              const isToday = day === todayDay;
              const hasEvent = day !== null && eventDays.includes(day);
              return (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    padding: "6px 0 8px",
                    fontSize: 12,
                    fontWeight: isToday ? 700 : 400,
                    color: day === null ? "transparent" : isToday ? "#ffffff" : palette.textPrimary,
                    backgroundColor: isToday ? palette.primary : "transparent",
                    borderRadius: system.spacing.radius.md,
                    position: "relative",
                    cursor: day ? "pointer" : "default",
                    minHeight: 36,
                  }}
                >
                  {day ?? ""}
                  {hasEvent && !isToday && (
                    <div style={{
                      position: "absolute",
                      bottom: 3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: palette.accent,
                    }} />
                  )}
                  {hasEvent && isToday && (
                    <div style={{
                      position: "absolute",
                      bottom: 3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      opacity: 0.8,
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Sample events */}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6, borderTop: `1px solid ${palette.border}`, paddingTop: 14 }}>
            {[
              { day: 7, label: "Team standup", color: palette.primary },
              { day: 15, label: "Sprint review", color: palette.accent },
              { day: 22, label: "Planning session", color: palette.secondary },
            ].map((ev) => (
              <div key={ev.day} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 3, height: 18, borderRadius: 2, backgroundColor: ev.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, minWidth: 32 }}>{monthNames[calMonthIdx].slice(0, 3)} {ev.day}</span>
                <span style={{ fontSize: 12, color: palette.textPrimary, fontWeight: 500 }}>{ev.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          11. COMMAND PALETTE
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-command-palette" data-comp-section {...fadeUp} transition={{ delay: 0.5 }} style={{ ...sectionWrap(), display: activeSection === "comp-command-palette" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Command Palette</h3>
        <p style={sectionDesc}>
          Keyboard-driven action launcher for power users. Grouped results, shortcut badges, and highlighted selection create a fast, keyboard-native navigation experience.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 480,
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            boxShadow: system.spacing.elevation.xl,
            overflow: "hidden",
          }}>
            {/* Search input */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 18px",
              borderBottom: `1px solid ${palette.border}`,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span style={{ flex: 1, fontSize: 14, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>
                Type a command or search...
              </span>
            </div>

            {/* Results */}
            <div style={{ maxHeight: 320, overflowY: "auto" }}>
              {Object.entries(commandItems).map(([group, items]) => (
                <div key={group}>
                  <p style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: palette.textSecondary,
                    padding: "10px 18px 4px",
                    margin: 0,
                  }}>
                    {group}
                  </p>
                  {items.map((item, ii) => {
                    const isSelected = group === "Recent" && ii === 0;
                    return (
                      <div
                        key={item.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "9px 18px",
                          backgroundColor: isSelected ? withAlpha(palette.primary, 0.08) : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{
                          width: 22,
                          height: 22,
                          borderRadius: system.spacing.radius.sm,
                          backgroundColor: isSelected ? withAlpha(palette.primary, 0.15) : palette.surfaceMuted,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          color: isSelected ? palette.primary : palette.textSecondary,
                          flexShrink: 0,
                        }}>
                          {item.icon}
                        </span>
                        <span style={{
                          flex: 1,
                          fontSize: 13,
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? palette.primary : palette.textPrimary,
                          fontFamily: system.typography.bodyFont,
                        }}>
                          {item.label}
                        </span>
                        <span style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: palette.textSecondary,
                          backgroundColor: palette.surfaceMuted,
                          border: `1px solid ${palette.border}`,
                          borderRadius: system.spacing.radius.sm,
                          padding: "2px 8px",
                          fontFamily: "monospace",
                          letterSpacing: "0.02em",
                        }}>
                          {item.shortcut}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "10px 18px",
              borderTop: `1px solid ${palette.border}`,
              backgroundColor: palette.surfaceMuted,
            }}>
              {[
                { keys: "↑↓", label: "navigate" },
                { keys: "↵", label: "select" },
                { keys: "esc", label: "close" },
              ].map((hint) => (
                <div key={hint.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: palette.textSecondary,
                    backgroundColor: palette.surface,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 3,
                    padding: "1px 5px",
                    fontFamily: "monospace",
                  }}>
                    {hint.keys}
                  </span>
                  <span style={{ fontSize: 10, color: palette.textSecondary }}>{hint.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          12. COMMENT THREAD
         ═══════════════════════════════════════════════ */}
      <motion.section id="comp-comment-thread" data-comp-section {...fadeUp} transition={{ delay: 0.55 }} style={{ ...sectionWrap(false), display: activeSection === "comp-comment-thread" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Comment Thread</h3>
        <p style={sectionDesc}>
          Threaded discussion interface with nested replies, reactions, and a rich composer. Supports collaboration workflows with timestamps and identity context.
        </p>

        <div style={chartContainer}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Comment 1 */}
            <div style={{ display: "flex", gap: 12, paddingBottom: 20, borderBottom: `1px solid ${palette.border}` }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: palette.primary,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                SM
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Sarah Mitchell</span>
                  <span style={{ fontSize: 11, color: palette.textSecondary }}>2 hours ago</span>
                </div>
                <p style={{ fontSize: 13, color: palette.textPrimary, lineHeight: 1.6, margin: "0 0 8px", fontFamily: system.typography.bodyFont }}>
                  The latest design iteration looks great. I think we should refine the spacing in the header section before moving forward with the implementation phase.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 10px",
                    borderRadius: system.spacing.radius.full,
                    backgroundColor: palette.surfaceMuted,
                    border: `1px solid ${palette.border}`,
                    fontSize: 11,
                    color: palette.textSecondary,
                    cursor: "pointer",
                  }}>
                    👍 <span style={{ fontWeight: 600 }}>3</span>
                  </div>
                  <span style={{ fontSize: 11, color: palette.primary, fontWeight: 500, cursor: "pointer" }}>Reply</span>
                </div>

                {/* Nested reply */}
                <div style={{ display: "flex", gap: 10, marginTop: 16, paddingLeft: 0, borderLeft: `2px solid ${palette.border}`, marginLeft: 0, paddingTop: 0 }}>
                  <div style={{ paddingLeft: 14, display: "flex", gap: 10 }}>
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      backgroundColor: palette.accent,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      JK
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>James Kim</span>
                        <span style={{ fontSize: 10, color: palette.textSecondary }}>1 hour ago</span>
                      </div>
                      <p style={{ fontSize: 12, color: palette.textPrimary, lineHeight: 1.6, margin: 0, fontFamily: system.typography.bodyFont }}>
                        Agreed — I&apos;ll adjust the top margin to 24px and align the nav items. Should be ready for review by EOD.
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "2px 8px",
                          borderRadius: system.spacing.radius.full,
                          backgroundColor: palette.surfaceMuted,
                          border: `1px solid ${palette.border}`,
                          fontSize: 10,
                          color: palette.textSecondary,
                          cursor: "pointer",
                        }}>
                          ❤️ <span style={{ fontWeight: 600 }}>1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div style={{ display: "flex", gap: 12, paddingTop: 20, paddingBottom: 20, borderBottom: `1px solid ${palette.border}` }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: palette.secondary,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                AR
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Alex Rodriguez</span>
                  <span style={{ fontSize: 11, color: palette.textSecondary }}>45 min ago</span>
                </div>
                <p style={{ fontSize: 13, color: palette.textPrimary, lineHeight: 1.6, margin: "0 0 8px", fontFamily: system.typography.bodyFont }}>
                  Can we also add a subtle shadow to the card components? The current flat style looks a bit disconnected from the rest of the layout.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 10px",
                    borderRadius: system.spacing.radius.full,
                    backgroundColor: palette.surfaceMuted,
                    border: `1px solid ${palette.border}`,
                    fontSize: 11,
                    color: palette.textSecondary,
                    cursor: "pointer",
                  }}>
                    👍 <span style={{ fontWeight: 600 }}>5</span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 10px",
                    borderRadius: system.spacing.radius.full,
                    backgroundColor: palette.surfaceMuted,
                    border: `1px solid ${palette.border}`,
                    fontSize: 11,
                    color: palette.textSecondary,
                    cursor: "pointer",
                  }}>
                    🔥 <span style={{ fontWeight: 600 }}>2</span>
                  </div>
                  <span style={{ fontSize: 11, color: palette.primary, fontWeight: 500, cursor: "pointer" }}>Reply</span>
                </div>
              </div>
            </div>

            {/* Comment composer */}
            <div style={{ display: "flex", gap: 12, paddingTop: 20 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: palette.surfaceMuted,
                border: `1px solid ${palette.border}`,
                color: palette.textSecondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                Y
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  overflow: "hidden",
                }}>
                  <div style={{
                    padding: "12px 14px",
                    minHeight: 60,
                    fontSize: 13,
                    color: palette.textSecondary,
                    fontFamily: system.typography.bodyFont,
                    lineHeight: 1.6,
                  }}>
                    Write a comment...
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 14px",
                    borderTop: `1px solid ${palette.border}`,
                    backgroundColor: palette.surfaceMuted,
                  }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["B", "I", "🔗", "📎"].map((tool) => (
                        <span key={tool} style={{
                          width: 26,
                          height: 26,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: tool === "B" || tool === "I" ? 700 : 400,
                          color: palette.textSecondary,
                          borderRadius: system.spacing.radius.sm,
                          cursor: "pointer",
                          fontStyle: tool === "I" ? "italic" : "normal",
                        }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                    <button style={{
                      padding: "6px 16px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#ffffff",
                      backgroundColor: palette.primary,
                      border: "none",
                      borderRadius: system.spacing.radius.md,
                      cursor: "pointer",
                      fontFamily: system.typography.bodyFont,
                    }}>
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
