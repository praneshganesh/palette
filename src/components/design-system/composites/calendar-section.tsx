"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface CalendarSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const ChevLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const ChevRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
);

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function CalendarSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: CalendarSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const [month, setMonth] = useState(3);
  const [year] = useState(2026);
  const [selected, setSelected] = useState<number | null>(15);
  const [rangeStart, setRangeStart] = useState<number | null>(8);
  const [rangeEnd, setRangeEnd] = useState<number | null>(14);
  const [view, setView] = useState<"month" | "week">("month");

  const events: Record<number, { label: string; color: string }[]> = {
    5: [{ label: "Design Review", color: palette.primary }],
    12: [{ label: "Sprint Demo", color: palette.success }],
    15: [{ label: "Team Standup", color: palette.info }],
    22: [{ label: "Deadline", color: palette.danger }],
    28: [{ label: "Workshop", color: palette.warning }],
  };

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const cells: { day: number; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevMonthDays - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  const rem = 42 - cells.length;
  for (let i = 1; i <= rem; i++) cells.push({ day: i, current: false });

  const isInRange = (d: number) => rangeStart !== null && rangeEnd !== null && d >= rangeStart && d <= rangeEnd;

  const CalGrid = ({ compact, showEvents }: { compact?: boolean; showEvents?: boolean }) => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button onClick={() => setMonth(m => Math.max(0, m - 1))} style={{ border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, display: "flex" }}><ChevLeft /></button>
        <span style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: palette.textPrimary }}>{MONTHS[month]} {year}</span>
        <button onClick={() => setMonth(m => Math.min(11, m + 1))} style={{ border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, display: "flex" }}><ChevRight /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: compact ? 2 : 4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: compact ? 10 : 11, fontWeight: 600, color: palette.textSecondary, padding: compact ? 4 : 6 }}>{d}</div>
        ))}
        {cells.map((c, i) => {
          const isSelected = c.current && c.day === selected;
          const hasEvent = c.current && events[c.day];
          return (
            <div
              key={i}
              onClick={() => c.current && setSelected(c.day)}
              style={{
                textAlign: "center", fontSize: compact ? 11 : 13, padding: compact ? "4px 2px" : "8px 4px",
                borderRadius: system.spacing.radius.sm, cursor: c.current ? "pointer" : "default",
                color: !c.current ? palette.textSecondary + "40" : isSelected ? "#fff" : palette.textPrimary,
                backgroundColor: isSelected ? palette.primary : "transparent",
                fontWeight: isSelected ? 700 : 400, position: "relative",
                transition: "all .15s",
              }}
            >
              {c.day}
              {showEvents && hasEvent && (
                <div style={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 2 }}>
                  {events[c.day].map((e, j) => (
                    <div key={j} style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: isSelected ? "#fff" : e.color }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <motion.section id="comp-calendar" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Calendar</p>
      <p style={sectionDesc}>
        Calendars present date-based views with month and week layouts, event indicators,
        date selection, range picking, and mini-calendar navigation.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg }}>
          <CalGrid showEvents />
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Cell Radius", system.spacing.radius.sm], ["Selected BG", "palette.primary"], ["Event Colors", "primary/success/danger"], ["Header Font", "15px / 700"], ["Day Font", "13px"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Events List</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <CalGrid compact showEvents />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Events</div>
              {Object.entries(events).map(([day, evts]) => evts.map((e, i) => (
                <div key={`${day}-${i}`} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "6px 10px", borderRadius: system.spacing.radius.sm, backgroundColor: e.color + "10", border: `1px solid ${e.color}20` }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: e.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>{e.label}</div>
                    <div style={{ fontSize: 10, color: palette.textSecondary }}>{MONTHS[month]} {day}</div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Date Range Picker</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {DAYS.map(d => <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, color: palette.textSecondary, padding: 4 }}>{d}</div>)}
            {cells.filter(c => c.current).slice(0, 28).map((c, i) => (
              <div key={i} style={{
                textAlign: "center", fontSize: 11, padding: "6px 2px", borderRadius: system.spacing.radius.sm,
                cursor: "pointer", color: isInRange(c.day) ? palette.primary : palette.textPrimary,
                backgroundColor: isInRange(c.day) ? palette.primary + "12" : "transparent",
                fontWeight: c.day === rangeStart || c.day === rangeEnd ? 700 : 400,
                border: c.day === rangeStart || c.day === rangeEnd ? `1.5px solid ${palette.primary}` : "1.5px solid transparent",
              }}
              onClick={() => {
                if (!rangeStart || (rangeStart && rangeEnd)) { setRangeStart(c.day); setRangeEnd(null); }
                else { setRangeEnd(c.day > rangeStart ? c.day : rangeStart); if (c.day < rangeStart) setRangeStart(c.day); }
              }}>
                {c.day}
              </div>
            ))}
          </div>
          {rangeStart && rangeEnd && (
            <div style={{ marginTop: 12, fontSize: 12, color: palette.textSecondary }}>
              Selected: <span style={{ color: palette.primary, fontWeight: 600 }}>{MONTHS[month]} {rangeStart} – {rangeEnd}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mini Calendar */}
      <div style={subsectionLabel}>Mini Calendar</div>
      <div style={{ ...showcaseBox, maxWidth: 240 }}>
        <CalGrid compact />
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use calendars" description="Calendars are best for:" items={[
          "Date pickers and scheduling interfaces",
          "Event management and planning tools",
          "Booking systems and availability displays",
          "Date range selection for reports or filters",
        ]} />
        <UsageSection palette={palette} title="View selection" description="Choose the right view:" items={[
          "Month view — Overview of full month with events",
          "Week view — Detailed daily schedule breakdown",
          "Mini calendar — Compact navigation in sidebars",
          "Range picker — Start and end date selection",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use color-coded dots to indicate different event types." },
        { type: "dont", text: "Don't cram long event names into small calendar cells." },
        { type: "do", text: "Dim out-of-month days while keeping them visible for context.", visual: <div style={{ display: "flex", gap: 4 }}><span style={{ fontSize: 10, color: palette.textSecondary + "40" }}>30</span><span style={{ fontSize: 10, color: palette.textPrimary }}>1</span><span style={{ fontSize: 10, color: palette.textPrimary }}>2</span></div> },
        { type: "dont", text: "Don't remove navigation arrows when the user reaches current month." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Header", description: "Month/year title with navigation arrows", x: 50, y: 8 },
        { id: 2, label: "Day labels", description: "Weekday abbreviation row", x: 50, y: 22 },
        { id: 3, label: "Date cells", description: "Individual day numbers in the grid", x: 50, y: 55 },
        { id: 4, label: "Selected state", description: "Highlighted current selection", x: 30, y: 55 },
        { id: 5, label: "Event dots", description: "Color indicators for events on a day", x: 70, y: 65 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, padding: 10, border: `1px solid ${palette.border}`, borderRadius: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <span style={{ fontSize: 8, color: palette.textSecondary }}>◀</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: palette.textPrimary }}>April 2026</span>
            <span style={{ fontSize: 8, color: palette.textSecondary }}>▶</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {DAYS.map(d => <div key={d} style={{ fontSize: 7, textAlign: "center", color: palette.textSecondary }}>{d}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginTop: 4 }}>
            {Array.from({ length: 14 }, (_, i) => (
              <div key={i} style={{
                fontSize: 8, textAlign: "center", padding: 2, borderRadius: 3,
                backgroundColor: i === 4 ? palette.primary : "transparent",
                color: i === 4 ? "#fff" : palette.textPrimary,
                opacity: (h === 3 || (h === 4 && i === 4)) ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s",
                position: "relative",
              }}>
                {i + 1}
                {i === 8 && <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: palette.success, margin: "1px auto 0", opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />}
              </div>
            ))}
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Cell Size (month)", value: "40 × 40px" },
        { label: "Cell Size (mini)", value: "28 × 28px" },
        { label: "Day Label Size", value: "11px" },
        { label: "Date Font Size", value: "13px" },
        { label: "Event Dot Size", value: "4px" },
        { label: "Header Height", value: "40px" },
        { label: "Grid Gap", value: "4px" },
      ]} />
    </motion.section>
  );
}
