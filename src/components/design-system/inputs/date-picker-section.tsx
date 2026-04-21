"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface DatePickerSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

function MiniCalendar({ palette, system, selectedDay, rangeEnd }: {
  palette: PaletteTokenSet; system: DesignSystem; selectedDay: number; rangeEnd?: number;
}) {
  const radius = system.spacing.radius.sm;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const today = 15;
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: palette.textSecondary, cursor: "pointer", display: "flex" }}><ChevronLeft /></span>
        <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>April 2026</span>
        <span style={{ color: palette.textSecondary, cursor: "pointer", display: "flex" }}><ChevronRight /></span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center" }}>
        {weekDays.map((d) => (
          <div key={d} style={{ fontSize: 10, color: palette.textSecondary, padding: 4, fontWeight: 600 }}>{d}</div>
        ))}
        {[0, 0, 0].map((_, i) => <div key={`pad-${i}`} />)}
        {days.map((d) => {
          const isSelected = d === selectedDay;
          const isToday = d === today;
          const inRange = rangeEnd && d >= selectedDay && d <= rangeEnd;
          return (
            <div key={d} style={{
              padding: 4, fontSize: 12, cursor: "pointer", borderRadius: radius,
              backgroundColor: isSelected ? palette.primary : inRange ? palette.primary + "15" : "transparent",
              color: isSelected ? "#fff" : isToday ? palette.primary : palette.textPrimary,
              fontWeight: isToday || isSelected ? 700 : 400,
              border: isToday && !isSelected ? `1px solid ${palette.primary}` : "1px solid transparent",
            }}>
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DatePickerSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: DatePickerSectionProps) {
  const comp = system.components;
  const [showCal, setShowCal] = useState(false);
  const radius = comp.input.borderRadius || system.spacing.radius.md;
  const px = comp.input.paddingX || "14px";
  const py = comp.input.paddingY || "8px";

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };
  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  return (
    <motion.section id="comp-date-pickers" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Date Picker</p>
      <p style={sectionDesc}>
        Date pickers provide a visual calendar interface for selecting dates and date ranges.
        They support single dates, ranges, and datetime combinations with keyboard navigation.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "flex-start", justifyContent: "center", minHeight: 140, paddingTop: 32 }}>
          <div style={{ width: "100%", maxWidth: 320, position: "relative" }}>
            <div
              onClick={() => setShowCal(!showCal)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`,
                border: `1.5px solid ${showCal ? palette.primary : palette.border}`,
                borderRadius: radius, cursor: "pointer", transition: "border-color 0.2s",
              }}
            >
              <span style={{ color: palette.textSecondary, display: "flex" }}><CalendarIcon /></span>
              <span style={{ fontSize: 13, color: palette.textPrimary }}>Apr 21, 2026</span>
            </div>
            {showCal && (
              <div style={{
                position: "absolute", top: "calc(100% + 4px)", left: 0, width: 280, zIndex: 10,
                backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.lg, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: 16,
              }}>
                <MiniCalendar palette={palette} system={system} selectedDay={21} />
              </div>
            )}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Input Radius", radius)}
          {tokenRow("Dropdown Radius", system.spacing.radius.lg)}
          {tokenRow("Cell Size", "32px")}
          {tokenRow("Selected", "palette.primary")}
          {tokenRow("Today Ring", "palette.primary (border)")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Single Date</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`, border: `1px solid ${palette.border}`, borderRadius: radius }}>
            <span style={{ color: palette.textSecondary, display: "flex" }}><CalendarIcon /></span>
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Apr 21, 2026</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Date Range</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`, border: `1px solid ${palette.border}`, borderRadius: radius }}>
            <span style={{ color: palette.textSecondary, display: "flex" }}><CalendarIcon /></span>
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Apr 10 – Apr 21, 2026</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Month Picker</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
              <div key={m} style={{
                padding: "6px 4px", fontSize: 12, textAlign: "center", borderRadius: system.spacing.radius.sm, cursor: "pointer",
                backgroundColor: m === "Apr" ? palette.primary : "transparent",
                color: m === "Apr" ? "#fff" : palette.textPrimary,
                fontWeight: m === "Apr" ? 700 : 400,
              }}>{m}</div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Time</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`, border: `1px solid ${palette.border}`, borderRadius: radius }}>
            <span style={{ color: palette.textSecondary, display: "flex" }}><CalendarIcon /></span>
            <span style={{ fontSize: 13, color: palette.textPrimary }}>Apr 21, 2026 at 2:30 PM</span>
          </div>
        </div>
      </div>

      {/* Inline Calendar */}
      <div style={subsectionLabel}>Inline Calendar</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ ...showcaseBox, maxWidth: 300 }}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Single Selection</div>
          <MiniCalendar palette={palette} system={system} selectedDay={21} />
        </div>
        <div style={{ ...showcaseBox, maxWidth: 300 }}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Range Selection</div>
          <MiniCalendar palette={palette} system={system} selectedDay={10} rangeEnd={21} />
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { label: "Default", value: "Select date...", color: palette.textSecondary, border: palette.border },
          { label: "Focused", value: "Select date...", color: palette.textSecondary, border: palette.primary },
          { label: "Filled", value: "Apr 21, 2026", color: palette.textPrimary, border: palette.border },
          { label: "Error", value: "Invalid date", color: palette.danger, border: palette.danger },
          { label: "Disabled", value: "Select date...", color: palette.textSecondary, border: palette.border },
        ].map((s) => (
          <div key={s.label} style={showcaseBox}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>{s.label}</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: `${py} ${px}`,
              border: `1.5px solid ${s.border}`, borderRadius: radius,
              opacity: s.label === "Disabled" ? 0.4 : 1,
              boxShadow: s.label === "Focused" ? `0 0 0 3px ${palette.primary}20` : "none",
            }}>
              <span style={{ color: palette.textSecondary, display: "flex" }}><CalendarIcon /></span>
              <span style={{ fontSize: 13, color: s.color }}>{s.value}</span>
            </div>
            {s.label === "Error" && (
              <div style={{ fontSize: 11, color: palette.danger, marginTop: 4 }}>Please select a valid date</div>
            )}
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use date pickers" description="Date pickers are ideal for structured date entry:" items={[
          "Booking and scheduling forms",
          "Filter by date range in dashboards",
          "Setting deadlines or due dates",
          "Birth date or event date fields",
        ]} />
        <UsageSection palette={palette} title="Choosing the right variant" description="Select the variant that matches user intent:" items={[
          "Single date — specific appointments or deadlines",
          "Date range — reports, bookings, leave requests",
          "Month/Year — billing periods, high-level planning",
          "With time — meetings, events with specific times",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Highlight today's date in the calendar for easy orientation." },
        { type: "dont", text: "Don't allow selection of dates that are logically invalid (e.g., end before start)." },
        { type: "do", text: "Support manual text input alongside the calendar for power users." },
        { type: "dont", text: "Don't require a date picker for year-only inputs — use a simple select instead." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Trigger input", description: "Input field that opens the calendar", x: 0, y: 20 },
        { id: 2, label: "Calendar icon", description: "Trailing icon indicating date selection", x: 85, y: 20 },
        { id: 3, label: "Month/Year nav", description: "Header with arrows and current month", x: 50, y: 40 },
        { id: 4, label: "Day grid", description: "7×5 grid of selectable day cells", x: 50, y: 65 },
        { id: 5, label: "Selected cell", description: "Highlighted cell for chosen date(s)", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 240 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
            border: `1.5px solid ${palette.border}`, borderRadius: radius, marginBottom: 4,
            opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>
            <span style={{ flex: 1, fontSize: 12, color: palette.textPrimary }}>Apr 21, 2026</span>
            <span style={{ color: palette.textSecondary, display: "flex", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}><CalendarIcon /></span>
          </div>
          <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              <ChevronLeft /><span style={{ fontSize: 11, fontWeight: 600, color: palette.textPrimary }}>April 2026</span><ChevronRight />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              {[19, 20, 21, 22, 23, 24, 25].map((d) => (
                <div key={d} style={{
                  padding: 3, fontSize: 10, textAlign: "center", borderRadius: 4,
                  backgroundColor: d === 21 ? palette.primary : "transparent",
                  color: d === 21 ? "#fff" : palette.textPrimary,
                  fontWeight: d === 21 ? 700 : 400,
                  opacity: h === 5 && d === 21 ? 1 : h === 5 ? 0.3 : 1,
                  transition: "opacity 0.2s",
                }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Input Height", value: "40px" },
        { label: "Calendar Width", value: "280px" },
        { label: "Cell Size", value: "32px" },
        { label: "Calendar Padding", value: "16px" },
        { label: "Border Radius (input)", value: radius },
        { label: "Border Radius (calendar)", value: system.spacing.radius.lg },
        { label: "Dropdown Offset", value: "4px" },
      ]} />
    </motion.section>
  );
}
