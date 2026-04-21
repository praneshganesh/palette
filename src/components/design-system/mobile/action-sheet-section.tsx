"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ActionSheetSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const defaultActions = [
  { icon: "📷", label: "Take Photo", destructive: false },
  { icon: "🖼️", label: "Choose from Library", destructive: false },
  { icon: "📎", label: "Attach File", destructive: false },
  { icon: "🔗", label: "Paste Link", destructive: false },
];

const destructiveActions = [
  { icon: "✏️", label: "Edit", destructive: false },
  { icon: "📋", label: "Duplicate", destructive: false },
  { icon: "📤", label: "Share", destructive: false },
  { icon: "🗑️", label: "Delete", destructive: true },
];

export function ActionSheetSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ActionSheetSectionProps) {
  const comp = system.components;
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

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
    width: 300, height: 440, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const renderActionSheet = (
    actions: typeof defaultActions,
    open: boolean,
    onClose: () => void,
    title?: string,
  ) => (
    <>
      {open && (
        <>
          <div onClick={onClose} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 12, left: 8, right: 8, zIndex: 11, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ backgroundColor: palette.surface, borderRadius: system.spacing.radius.lg, overflow: "hidden" }}>
              {title && (
                <div style={{ padding: "12px 16px", textAlign: "center", borderBottom: `1px solid ${palette.border}` }}>
                  <div style={{ fontSize: 12, color: palette.textSecondary }}>{title}</div>
                </div>
              )}
              {actions.map((action, i) => (
                <div key={action.label} onClick={() => { setSelectedAction(action.label); onClose(); }} style={{ padding: "14px 16px", fontSize: 15, textAlign: "center", color: action.destructive ? palette.danger : palette.primary, fontWeight: action.destructive ? 600 : 400, borderBottom: i < actions.length - 1 ? `1px solid ${palette.border}30` : "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "background-color 0.15s" }}>
                  <span style={{ fontSize: 16 }}>{action.icon}</span>
                  {action.label}
                </div>
              ))}
            </div>
            <div onClick={onClose} style={{ backgroundColor: palette.surface, borderRadius: system.spacing.radius.lg, padding: "14px 16px", textAlign: "center", fontSize: 15, fontWeight: 600, color: palette.textPrimary, cursor: "pointer" }}>
              Cancel
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <motion.section id="comp-action-sheet" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Action Sheet</p>
      <p style={sectionDesc}>
        Action sheets present a set of contextual actions from the bottom of the screen. They include icons, labels, a destructive option, and a separate cancel button.
      </p>

      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Default Actions</div>
          <div style={previewBox}>
            <div style={phoneFrame}>
              <div style={{ padding: 20, paddingTop: 60, textAlign: "center" }}>
                <button onClick={() => setDefaultOpen(true)} style={{ padding: "10px 24px", fontSize: 14, backgroundColor: palette.primary, color: "#fff", border: "none", borderRadius: system.spacing.radius.md, cursor: "pointer", fontWeight: 600 }}>Add Attachment</button>
                {selectedAction && !defaultOpen && <div style={{ marginTop: 12, fontSize: 12, color: palette.textSecondary }}>Selected: {selectedAction}</div>}
              </div>
              {renderActionSheet(defaultActions, defaultOpen, () => setDefaultOpen(false), "Add attachment from")}
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>With Destructive Option</div>
          <div style={previewBox}>
            <div style={phoneFrame}>
              <div style={{ padding: 20, paddingTop: 60, textAlign: "center" }}>
                <button onClick={() => setDestructiveOpen(true)} style={{ padding: "10px 24px", fontSize: 14, backgroundColor: palette.surface, color: palette.textPrimary, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, cursor: "pointer", fontWeight: 600 }}>More Options</button>
              </div>
              {renderActionSheet(destructiveActions, destructiveOpen, () => setDestructiveOpen(false))}
            </div>
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use action sheets" description="Contextual actions on mobile:" items={[
          "Share, edit, duplicate, or delete operations",
          "File source selection (camera, gallery, files)",
          "Overflow actions from a more menu",
        ]} />
        <UsageSection palette={palette} title="Design considerations" description="Structure your action sheet well:" items={[
          "Group related actions and separate destructive ones visually",
          "Always include a Cancel button as a separate group",
          "Use icons alongside labels for quick scanning",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Colour destructive actions in red/danger to warn users before they tap." },
        { type: "dont", text: "Don't place more than 6 actions — use a full-screen list for longer sets." },
        { type: "do", text: "Separate the Cancel button from the action group with a gap." },
        { type: "dont", text: "Don't dismiss the sheet without a backdrop tap or Cancel — always provide an escape." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Scrim / backdrop", description: "Dimmed overlay behind the sheet", x: 50, y: 25 },
        { id: 2, label: "Action group", description: "Rounded container for action items", x: 50, y: 55 },
        { id: 3, label: "Action item", description: "Icon + label row, tappable", x: 50, y: 45 },
        { id: 4, label: "Destructive action", description: "Red-coloured danger action", x: 50, y: 70 },
        { id: 5, label: "Cancel button", description: "Separate dismiss action", x: 50, y: 90 },
      ]} renderPreview={(h) => (
        <div style={{ width: 180, height: 110, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: palette.textPrimary, borderRadius: system.spacing.radius.sm, opacity: h === 1 ? 0.15 : h === null ? 0.06 : 0.03, transition: "opacity 0.2s" }} />
          <div style={{ position: "absolute", bottom: 22, left: 8, right: 8, backgroundColor: palette.surface, borderRadius: system.spacing.radius.md, overflow: "hidden", border: `1px solid ${palette.border}`, opacity: h === 2 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>
            {["Share", "Edit"].map((a, i) => (
              <div key={a} style={{ padding: "5px 10px", fontSize: 9, color: palette.primary, textAlign: "center", borderBottom: i === 0 ? `1px solid ${palette.border}20` : "none", opacity: h === 3 ? 1 : h === null ? 1 : 0.5 }}>{a}</div>
            ))}
            <div style={{ padding: "5px 10px", fontSize: 9, color: palette.danger, textAlign: "center", borderTop: `1px solid ${palette.border}20`, opacity: h === 4 ? 1 : h === null ? 1 : 0.5 }}>Delete</div>
          </div>
          <div style={{ position: "absolute", bottom: 4, left: 8, right: 8, backgroundColor: palette.surface, borderRadius: system.spacing.radius.sm, padding: "4px 0", textAlign: "center", fontSize: 9, fontWeight: 600, color: palette.textPrimary, border: `1px solid ${palette.border}`, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>Cancel</div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Action Item Height", value: "48–52px" },
        { label: "Action Font Size", value: "15px" },
        { label: "Group Border Radius", value: "12–14px" },
        { label: "Gap Between Groups", value: "8px" },
        { label: "Side Margin", value: "8–10px" },
      ]} />
    </motion.section>
  );
}
