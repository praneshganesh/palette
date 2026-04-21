"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface StatusWorkflowSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

type StatusColumn = { id: string; label: string; color: string; items: { id: string; title: string; assignee: string; priority: string }[] };

export function StatusWorkflowSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: StatusWorkflowSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const cardRadius = comp.card.borderRadius || system.spacing.radius.md;

  const initialColumns: StatusColumn[] = [
    { id: "backlog", label: "Backlog", color: palette.textSecondary, items: [
      { id: "t1", title: "Research competitors", assignee: "AC", priority: "Low" },
      { id: "t2", title: "Define color tokens", assignee: "SK", priority: "Medium" },
    ]},
    { id: "todo", label: "To Do", color: palette.info, items: [
      { id: "t3", title: "Design button variants", assignee: "JL", priority: "High" },
      { id: "t4", title: "Create icon set", assignee: "DP", priority: "Medium" },
    ]},
    { id: "progress", label: "In Progress", color: palette.warning, items: [
      { id: "t5", title: "Build card component", assignee: "AC", priority: "High" },
    ]},
    { id: "review", label: "In Review", color: palette.primary, items: [
      { id: "t6", title: "Typography scale", assignee: "SK", priority: "Medium" },
    ]},
    { id: "done", label: "Done", color: palette.success, items: [
      { id: "t7", title: "Spacing system", assignee: "JL", priority: "Low" },
      { id: "t8", title: "Color palette", assignee: "AC", priority: "High" },
    ]},
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [dragItem, setDragItem] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const priorityColor = (p: string) => p === "High" ? palette.danger : p === "Medium" ? palette.warning : palette.textSecondary;

  const moveItem = (itemId: string, toColId: string) => {
    setColumns(prev => {
      let item: StatusColumn["items"][0] | undefined;
      const cleaned = prev.map(col => ({ ...col, items: col.items.filter(it => { if (it.id === itemId) { item = it; return false; } return true; }) }));
      if (!item) return prev;
      return cleaned.map(col => col.id === toColId ? { ...col, items: [...col.items, item!] } : col);
    });
  };

  const Avatar = ({ initials, size = 22 }: { initials: string; size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: palette.primary + "20", color: palette.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
  );

  return (
    <motion.section id="comp-status-workflow" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Status Workflow</p>
      <p style={sectionDesc}>
        Status workflow boards organize items into color-coded columns representing workflow stages,
        supporting drag-between movement for Kanban-style task management.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 12, minWidth: 700 }}>
            {columns.map(col => (
              <div
                key={col.id}
                onDragOver={e => { e.preventDefault(); setDragOverCol(col.id); }}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={() => { if (dragItem) { moveItem(dragItem, col.id); setDragItem(null); setDragOverCol(null); } }}
                style={{
                  flex: 1, minWidth: 140, backgroundColor: dragOverCol === col.id ? palette.primary + "05" : palette.surfaceMuted,
                  borderRadius: radius, padding: 12, border: `1px solid ${dragOverCol === col.id ? palette.primary + "30" : palette.border}`,
                  transition: "all .15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: col.color }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary }}>{col.label}</span>
                  <span style={{ fontSize: 11, color: palette.textSecondary, marginLeft: "auto" }}>{col.items.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.items.map(item => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => setDragItem(item.id)}
                      onDragEnd={() => { setDragItem(null); setDragOverCol(null); }}
                      style={{
                        padding: 10, borderRadius: cardRadius, backgroundColor: palette.surface,
                        border: `1px solid ${dragItem === item.id ? palette.primary : palette.border}`,
                        cursor: "grab", opacity: dragItem === item.id ? 0.5 : 1, transition: "opacity .15s",
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 8 }}>{item.title}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: priorityColor(item.priority), backgroundColor: priorityColor(item.priority) + "12", padding: "2px 6px", borderRadius: 99 }}>{item.priority}</span>
                        <Avatar initials={item.assignee} />
                      </div>
                    </div>
                  ))}
                  {col.items.length === 0 && (
                    <div style={{ padding: 16, textAlign: "center", fontSize: 11, color: palette.textSecondary, border: `1px dashed ${palette.border}`, borderRadius: radius }}>Drop items here</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Column BG", "palette.surfaceMuted"], ["Card Radius", cardRadius], ["Status Colors", "info/warning/primary/success"], ["Priority: High", "palette.danger"], ["Drop Highlight", `${palette.primary}05`]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Linear flow variant */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Linear Flow</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {columns.map((col, i) => (
              <div key={col.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ padding: "6px 14px", borderRadius: 99, backgroundColor: col.color + "15", border: `1px solid ${col.color}30`, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: col.color }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: col.color }}>{col.label}</span>
                  <span style={{ fontSize: 10, color: col.color + "80" }}>{col.items.length}</span>
                </div>
                {i < columns.length - 1 && <span style={{ color: palette.textSecondary + "60", display: "flex" }}><ArrowRight /></span>}
              </div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Compact Status Bar</div>
          <div style={{ display: "flex", borderRadius: 99, overflow: "hidden", height: 8, backgroundColor: palette.surfaceMuted }}>
            {columns.map(col => (
              <div key={col.id} style={{ flex: col.items.length || 0.5, backgroundColor: col.color, transition: "flex .3s" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {columns.map(col => (
              <div key={col.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: palette.textSecondary }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: col.color }} />{col.label} ({col.items.length})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status transitions */}
      <div style={subsectionLabel}>Status Transitions</div>
      <div style={showcaseBox}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {columns.map((col, ci) => (
            <div key={col.id}>
              <div style={{ fontSize: 11, fontWeight: 700, color: col.color, marginBottom: 8, textAlign: "center" }}>{col.label}</div>
              {columns.map((target, ti) => (
                <div key={target.id} style={{
                  padding: "4px 8px", marginBottom: 3, borderRadius: system.spacing.radius.sm, fontSize: 10,
                  textAlign: "center",
                  backgroundColor: ci === ti ? palette.surfaceMuted : Math.abs(ci - ti) === 1 ? palette.success + "08" : "transparent",
                  color: ci === ti ? palette.textSecondary : Math.abs(ci - ti) === 1 ? palette.success : palette.textSecondary + "40",
                  border: `1px solid ${ci === ti ? palette.border : Math.abs(ci - ti) === 1 ? palette.success + "20" : "transparent"}`,
                }}>
                  {ci === ti ? "—" : Math.abs(ci - ti) === 1 ? "✓" : "✕"} {target.label}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: palette.textSecondary }}>
          ✓ = allowed transition · ✕ = blocked · — = current state
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use status workflows" description="Visual task and process management:" items={[
          "Project management Kanban boards",
          "Issue tracking and bug triage",
          "Content publishing pipelines",
          "Sales and CRM pipeline stages",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Design for clarity and flow:" items={[
          "Use distinct colors for each status column",
          "Show item counts per column",
          "Support drag-and-drop for status changes",
          "Define valid transitions between states",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use color-coded column headers so status is visible at a glance.", visual: <div style={{ display: "flex", gap: 4 }}>{[palette.textSecondary, palette.info, palette.warning, palette.success].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: c }} />)}</div> },
        { type: "dont", text: "Don't allow more than 7 columns — it becomes unreadable." },
        { type: "do", text: "Show a drop zone highlight when dragging items between columns." },
        { type: "dont", text: "Don't allow backward transitions without explicit rules." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Column header", description: "Status label with color dot and count", x: 20, y: 10 },
        { id: 2, label: "Task card", description: "Draggable item with title and metadata", x: 20, y: 45 },
        { id: 3, label: "Priority badge", description: "Color-coded importance level", x: 15, y: 70 },
        { id: 4, label: "Assignee avatar", description: "Person responsible for the task", x: 35, y: 70 },
        { id: 5, label: "Drop zone", description: "Highlighted area for receiving dragged items", x: 70, y: 45 },
      ]} renderPreview={(h) => (
        <div style={{ width: 240, display: "flex", gap: 8 }}>
          {[{ label: "Todo", color: palette.info, items: 2 }, { label: "Done", color: palette.success, items: 1 }].map(col => (
            <div key={col.label} style={{ flex: 1, backgroundColor: col.label === "Done" && h === 5 ? palette.primary + "05" : palette.surfaceMuted, borderRadius: 6, padding: 8, border: `1px solid ${col.label === "Done" && h === 5 ? palette.primary + "30" : palette.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: col.color }} />
                <span style={{ fontSize: 8, fontWeight: 700, color: palette.textPrimary }}>{col.label}</span>
                <span style={{ fontSize: 7, color: palette.textSecondary, marginLeft: "auto" }}>{col.items}</span>
              </div>
              {Array.from({ length: col.items }, (_, i) => (
                <div key={i} style={{ padding: 6, borderRadius: 4, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, marginBottom: 4, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                  <div style={{ fontSize: 7, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>Task {i + 1}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 6, padding: "1px 4px", borderRadius: 99, backgroundColor: palette.warning + "12", color: palette.warning, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Med</span>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: palette.primary + "20", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
                  </div>
                </div>
              ))}
              {col.label === "Done" && (
                <div style={{ padding: 6, textAlign: "center", fontSize: 6, color: palette.textSecondary, border: `1px dashed ${palette.border}`, borderRadius: 4, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Drop here</div>
              )}
            </div>
          ))}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Column Min Width", value: "140px" },
        { label: "Column Padding", value: "12px" },
        { label: "Card Padding", value: "10px" },
        { label: "Card Border Radius", value: cardRadius },
        { label: "Status Dot Size", value: "8px" },
        { label: "Column Gap", value: "12px" },
        { label: "Card Gap", value: "8px" },
      ]} />
    </motion.section>
  );
}
