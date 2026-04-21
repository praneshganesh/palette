"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface SwipeActionsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

interface SwipeRow { id: number; title: string; subtitle: string; icon: string; }

const rows: SwipeRow[] = [
  { id: 1, title: "Project Update", subtitle: "New designs ready for review", icon: "📧" },
  { id: 2, title: "Weekly Report", subtitle: "Q2 metrics are looking good", icon: "📊" },
  { id: 3, title: "Team Standup", subtitle: "Tomorrow at 10:00 AM", icon: "📅" },
  { id: 4, title: "Invoice #4821", subtitle: "Payment received — $2,400", icon: "💰" },
];

export function SwipeActionsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: SwipeActionsSectionProps) {
  const comp = system.components;
  const [swipedRow, setSwipedRow] = useState<number | null>(null);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [confirming, setConfirming] = useState<number | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24, display: "flex", justifyContent: "center",
  };

  const phoneFrame: React.CSSProperties = {
    width: 320, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden",
  };

  const handleSwipe = (id: number, dir: "left" | "right") => {
    if (swipedRow === id && swipeDir === dir) {
      setSwipedRow(null); setSwipeDir(null);
    } else {
      setSwipedRow(id); setSwipeDir(dir);
    }
    setConfirming(null);
  };

  const renderRow = (row: SwipeRow) => {
    const isActive = swipedRow === row.id;
    const offset = isActive ? (swipeDir === "left" ? -100 : 100) : 0;

    return (
      <div key={row.id} style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${palette.border}30` }}>
        {/* Right action (swipe left reveals) */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 100, backgroundColor: palette.danger, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2, opacity: isActive && swipeDir === "left" ? 1 : 0, transition: "opacity 0.2s" }}>
          {confirming === row.id ? (
            <div onClick={() => { setConfirming(null); setSwipedRow(null); }} style={{ fontSize: 10, color: "#fff", fontWeight: 700, textAlign: "center" }}>Confirm?<br /><span style={{ textDecoration: "underline" }}>Yes</span></div>
          ) : (
            <div onClick={() => setConfirming(row.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 18, color: "#fff" }}>🗑️</span>
              <span style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>Delete</span>
            </div>
          )}
        </div>

        {/* Left action (swipe right reveals) */}
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 100, backgroundColor: palette.info, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2, opacity: isActive && swipeDir === "right" ? 1 : 0, transition: "opacity 0.2s" }}>
          <span style={{ fontSize: 18, color: "#fff" }}>📥</span>
          <span style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>Archive</span>
        </div>

        {/* Row content */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", backgroundColor: palette.surface, transform: `translateX(${offset}px)`, transition: "transform 0.25s cubic-bezier(0.32,0.72,0,1)" }}>
          <div style={{ width: 36, height: 36, borderRadius: system.spacing.radius.md, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{row.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{row.title}</div>
            <div style={{ fontSize: 11, color: palette.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.subtitle}</div>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button onClick={() => handleSwipe(row.id, "right")} style={{ width: 28, height: 28, borderRadius: system.spacing.radius.sm, border: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }} title="Swipe right">←</button>
            <button onClick={() => handleSwipe(row.id, "left")} style={{ width: 28, height: 28, borderRadius: system.spacing.radius.sm, border: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }} title="Swipe left">→</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.section id="comp-swipe-actions" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Swipe Actions</p>
      <p style={sectionDesc}>
        Swipe actions reveal contextual operations behind list items. Swipe left for destructive actions like delete, swipe right for neutral ones like archive. Includes confirmable destructive swipes.
      </p>

      <div style={subsectionLabel}>Interactive Demo</div>
      <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 12 }}>Use the arrow buttons to simulate swipe left/right on each row.</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${palette.border}`, backgroundColor: palette.surface }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>Inbox</span>
          </div>
          {rows.map(renderRow)}
          <div style={{ padding: 16, fontSize: 11, color: palette.textSecondary, textAlign: "center" }}>← swipe right = archive&nbsp;&nbsp;|&nbsp;&nbsp;swipe left = delete →</div>
        </div>
      </div>

      <div style={subsectionLabel}>Action Types</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {[
          { label: "Archive (Right)", bg: palette.info, icon: "📥", desc: "Non-destructive, immediate" },
          { label: "Delete (Left)", bg: palette.danger, icon: "🗑️", desc: "Destructive, needs confirm" },
          { label: "Pin / Flag", bg: palette.warning, icon: "📌", desc: "Toggle state action" },
        ].map(a => (
          <div key={a.label} style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
            <div style={{ height: 48, backgroundColor: a.bg, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{a.label}</span>
            </div>
            <div style={{ padding: "10px 14px", fontSize: 12, color: palette.textSecondary }}>{a.desc}</div>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use swipe actions" description="Quick operations on list items:" items={[
          "Email / message lists — delete, archive, flag",
          "Task lists — complete, snooze, delete",
          "Shopping lists — remove, move to another list",
        ]} />
        <UsageSection palette={palette} title="Swipe direction conventions" description="Follow platform conventions:" items={[
          "Swipe left — destructive (delete, remove)",
          "Swipe right — neutral / positive (archive, done)",
          "Full swipe — immediate action, partial swipe reveals buttons",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use distinct colours for different swipe actions so users can tell them apart instantly." },
        { type: "dont", text: "Don't hide critical actions behind swipe only — provide an alternative (e.g. long-press menu)." },
        { type: "do", text: "Add a confirmation step for destructive full-swipe (delete) to prevent accidental loss." },
        { type: "dont", text: "Don't combine more than 2 actions per side — keep it simple." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Row content", description: "The list item surface that slides", x: 50, y: 50 },
        { id: 2, label: "Left action", description: "Revealed behind on swipe right", x: 15, y: 50 },
        { id: 3, label: "Right action", description: "Revealed behind on swipe left", x: 85, y: 50 },
        { id: 4, label: "Action icon", description: "Visual identifier for the action", x: 85, y: 30 },
        { id: 5, label: "Action label", description: "Text description below icon", x: 85, y: 70 },
      ]} renderPreview={(h) => (
        <div style={{ width: 220, height: 40, position: "relative", borderRadius: system.spacing.radius.sm, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 60, backgroundColor: palette.info, display: "flex", alignItems: "center", justifyContent: "center", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <span style={{ fontSize: 12, color: "#fff", opacity: h === 4 ? 1 : h === null ? 1 : 0.5 }}>📥</span>
          </div>
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 60, backgroundColor: palette.danger, display: "flex", alignItems: "center", justifyContent: "center", opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <span style={{ fontSize: 12, color: "#fff", opacity: h === 4 ? 1 : h === null ? 1 : 0.5 }}>🗑️</span>
          </div>
          <div style={{ position: "absolute", top: 0, left: 40, right: 40, bottom: 0, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", padding: "0 10px", gap: 6, opacity: h === 1 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: palette.surfaceMuted }} />
            <div>
              <div style={{ height: 3, width: 50, backgroundColor: palette.textPrimary + "40", borderRadius: 1, marginBottom: 3 }} />
              <div style={{ height: 3, width: 35, backgroundColor: palette.border, borderRadius: 1 }} />
            </div>
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Swipe Threshold", value: "30–40% of row width" },
        { label: "Action Zone Width", value: "80–100px" },
        { label: "Row Height", value: "60–72px" },
        { label: "Icon Size", value: "18–22px" },
        { label: "Full Swipe Trigger", value: "80% of row width" },
      ]} />
    </motion.section>
  );
}
