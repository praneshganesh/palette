"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface BulkActionsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const CheckIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const ArchiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);
const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const items = Array.from({ length: 8 }, (_, i) => ({ id: `item-${i}`, title: `Record ${i + 1}`, status: ["Active", "Pending", "Draft"][i % 3], type: ["Document", "Task", "Report"][i % 3] }));

export function BulkActionsSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: BulkActionsSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const btnRadius = comp.button.borderRadius || system.spacing.radius.md;
  const [selected, setSelected] = useState<Set<string>>(new Set(["item-0", "item-2", "item-4"]));
  const [variant, setVariant] = useState<"inline" | "floating">("inline");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const toggle = (id: string) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setSelected(prev => prev.size === items.length ? new Set() : new Set(items.map(it => it.id)));
  const clearAll = () => setSelected(new Set());

  const Checkbox = ({ checked, onClick }: { checked: boolean; onClick: () => void }) => (
    <div onClick={onClick} style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${checked ? palette.primary : palette.border}`, backgroundColor: checked ? palette.primary : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all .15s", flexShrink: 0 }}>
      {checked && <CheckIcon size={10} />}
    </div>
  );

  const ActionBtn = ({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) => (
    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: btnRadius, border: `1px solid ${danger ? palette.danger + "40" : palette.border}`, backgroundColor: danger ? palette.danger + "08" : palette.surface, color: danger ? palette.danger : palette.textPrimary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
      {icon} {label}
    </button>
  );

  const selCount = selected.size;

  return (
    <motion.section id="comp-bulk-actions" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Bulk Actions</p>
      <p style={sectionDesc}>
        Bulk action bars appear when multiple items are selected, providing batch operations
        like delete, archive, and tag with a selection count and clear-all control.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, position: "relative" }}>
          {selCount > 0 && (
            <div style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
              backgroundColor: palette.primary + "08", border: `1px solid ${palette.primary}25`,
              borderRadius: radius, marginBottom: 16,
            }}>
              <Checkbox checked={selCount === items.length} onClick={toggleAll} />
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.primary }}>{selCount} selected</span>
              <div style={{ flex: 1 }} />
              <ActionBtn icon={<TagIcon />} label="Tag" />
              <ActionBtn icon={<ArchiveIcon />} label="Archive" />
              <ActionBtn icon={<TrashIcon />} label="Delete" danger />
              <button onClick={clearAll} style={{ border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, display: "flex", padding: 4 }}><XIcon /></button>
            </div>
          )}
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: radius, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 16px", backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}` }}>
              <Checkbox checked={selCount === items.length} onClick={toggleAll} />
              <span style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, flex: 1 }}>Title</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, width: 80 }}>Status</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, width: 80 }}>Type</span>
            </div>
            {items.map((item, i) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", backgroundColor: selected.has(item.id) ? palette.primary + "06" : palette.surface, borderBottom: i < items.length - 1 ? `1px solid ${palette.border}` : "none", transition: "background-color .1s" }}>
                <Checkbox checked={selected.has(item.id)} onClick={() => toggle(item.id)} />
                <span style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary, flex: 1 }}>{item.title}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: item.status === "Active" ? palette.success : item.status === "Pending" ? palette.warning : palette.textSecondary, width: 80 }}>{item.status}</span>
                <span style={{ fontSize: 12, color: palette.textSecondary, width: 80 }}>{item.type}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Selection BG", `${palette.primary}08`], ["Selection Border", `${palette.primary}25`], ["Checkbox Active", "palette.primary"], ["Danger Action", "palette.danger"], ["Count Font", "13px / 600"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Variant */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["inline", "floating"] as const).map(v => (
          <button key={v} onClick={() => setVariant(v)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${variant === v ? palette.primary : palette.border}`, backgroundColor: variant === v ? palette.primary + "10" : palette.surface, color: variant === v ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{v}</button>
        ))}
      </div>
      <div style={{ ...showcaseBox, position: "relative", minHeight: 140 }}>
        {variant === "inline" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", backgroundColor: palette.primary + "08", border: `1px solid ${palette.primary}25`, borderRadius: radius }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: palette.primary }}>3 selected</span>
            <div style={{ flex: 1 }} />
            <ActionBtn icon={<TagIcon />} label="Tag" />
            <ActionBtn icon={<TrashIcon />} label="Delete" danger />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.xl, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.primary }}>3 items</span>
              <div style={{ width: 1, height: 20, backgroundColor: palette.border }} />
              <ActionBtn icon={<TagIcon />} label="Tag" />
              <ActionBtn icon={<ArchiveIcon />} label="Archive" />
              <ActionBtn icon={<TrashIcon />} label="Delete" danger />
              <button onClick={clearAll} style={{ border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, display: "flex" }}><XIcon /></button>
            </div>
          </div>
        )}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use bulk actions" description="Batch operations for lists and tables:" items={[
          "Admin panels with multi-row management",
          "Email-style select and act patterns",
          "Content management bulk editing",
          "File manager multi-select operations",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Design for safe batch ops:" items={[
          "Show selection count prominently",
          "Require confirmation for destructive actions",
          "Provide select-all / deselect-all controls",
          "Keep action bar visible during scrolling",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show the selection count so users know how many items are affected." },
        { type: "dont", text: "Don't allow destructive bulk actions without a confirmation step." },
        { type: "do", text: "Use color to distinguish safe actions from destructive ones.", visual: <div style={{ display: "flex", gap: 4 }}><span style={{ padding: "3px 8px", borderRadius: 4, fontSize: 10, border: `1px solid ${palette.border}`, color: palette.textPrimary }}>Archive</span><span style={{ padding: "3px 8px", borderRadius: 4, fontSize: 10, border: `1px solid ${palette.danger}40`, color: palette.danger }}>Delete</span></div> },
        { type: "dont", text: "Don't hide the bulk action bar — it should be immediately visible." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Selection checkbox", description: "Global select-all toggle", x: 8, y: 50 },
        { id: 2, label: "Count label", description: "Number of selected items", x: 25, y: 50 },
        { id: 3, label: "Action buttons", description: "Batch operation controls", x: 60, y: 50 },
        { id: 4, label: "Dismiss", description: "Clear selection / close bar", x: 92, y: 50 },
        { id: 5, label: "Container", description: "Bar wrapper with selection highlight", x: 50, y: 15 },
      ]} renderPreview={(h) => (
        <div style={{ width: 260, padding: 10, borderRadius: 8, backgroundColor: palette.primary + "08", border: `1px solid ${palette.primary}25`, opacity: h === 5 ? 1 : undefined }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, border: `2px solid ${palette.primary}`, backgroundColor: palette.primary, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
            <span style={{ fontSize: 9, fontWeight: 600, color: palette.primary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>3 selected</span>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", gap: 4, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
              {["Tag", "Delete"].map(a => <span key={a} style={{ padding: "2px 6px", borderRadius: 3, border: `1px solid ${palette.border}`, fontSize: 7, color: a === "Delete" ? palette.danger : palette.textPrimary }}>{a}</span>)}
            </div>
            <span style={{ fontSize: 8, color: palette.textSecondary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>✕</span>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Bar Padding", value: "10px 16px" },
        { label: "Checkbox Size", value: "16 × 16px" },
        { label: "Action Button Padding", value: "6px 14px" },
        { label: "Floating Shadow", value: "0 8px 32px rgba(0,0,0,0.12)" },
        { label: "Count Font", value: "13px / 600" },
        { label: "Row Height", value: "44px" },
        { label: "Border Radius", value: radius },
      ]} />
    </motion.section>
  );
}
