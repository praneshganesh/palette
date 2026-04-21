"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface SaveSyncSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type SyncStatus = "auto-saving" | "saved" | "syncing" | "offline" | "conflict" | "failed";

export function SaveSyncSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: SaveSyncSectionProps) {
  const comp = system.components;
  const [activeStatus, setActiveStatus] = useState<SyncStatus>("saved");
  const [demoStatus, setDemoStatus] = useState<SyncStatus>("saved");

  useEffect(() => {
    const sequence: SyncStatus[] = ["auto-saving", "syncing", "saved"];
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % sequence.length;
      setDemoStatus(sequence[idx]);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const statusConfig: Record<SyncStatus, {
    dot: string; label: string; icon: string; color: string; timestamp?: string;
  }> = {
    "auto-saving": { dot: palette.warning, label: "Saving...", icon: "●", color: palette.warning, timestamp: "Just now" },
    saved: { dot: palette.success, label: "Saved", icon: "☁", color: palette.success, timestamp: "2 min ago" },
    syncing: { dot: palette.info, label: "Syncing...", icon: "⟳", color: palette.info, timestamp: "Syncing" },
    offline: { dot: palette.textSecondary, label: "Offline – changes pending", icon: "⊘", color: palette.textSecondary, timestamp: "Pending" },
    conflict: { dot: palette.danger, label: "Conflict detected", icon: "⚠", color: palette.danger, timestamp: "Needs review" },
    failed: { dot: palette.danger, label: "Save failed", icon: "✕", color: palette.danger, timestamp: "Failed" },
  };

  const allStatuses: SyncStatus[] = ["auto-saving", "saved", "syncing", "offline", "conflict", "failed"];

  const renderStatusPill = (status: SyncStatus, size: "sm" | "md" = "md") => {
    const cfg = statusConfig[status];
    const isSm = size === "sm";
    return (
      <div style={{
        display: "inline-flex", alignItems: "center", gap: isSm ? 6 : 8,
        padding: isSm ? "4px 10px" : "6px 14px",
        borderRadius: system.spacing.radius.xl,
        backgroundColor: cfg.color + "08",
        border: `1px solid ${cfg.color}20`,
        fontSize: isSm ? 11 : 13, color: cfg.color,
        fontFamily: system.typography.bodyFont, fontWeight: 500,
        transition: "all 0.3s",
      }}>
        <span style={{
          width: isSm ? 6 : 8, height: isSm ? 6 : 8, borderRadius: "50%",
          backgroundColor: cfg.dot, flexShrink: 0,
          animation: status === "auto-saving" || status === "syncing" ? "syncPulse 1.5s ease-in-out infinite" : "none",
        }} />
        <span>{cfg.label}</span>
        {cfg.timestamp && !isSm && (
          <span style={{ fontSize: 11, color: palette.textSecondary, marginLeft: 4 }}>
            · {cfg.timestamp}
          </span>
        )}
      </div>
    );
  };

  const renderCloudIcon = (status: SyncStatus) => {
    const cfg = statusConfig[status];
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        minWidth: 70,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: system.spacing.radius.md,
          backgroundColor: cfg.color + "10",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, color: cfg.color,
          animation: status === "syncing" ? "syncSpin 1.5s linear infinite" : "none",
        }}>
          {cfg.icon}
        </div>
        <span style={{ fontSize: 10, color: cfg.color, fontWeight: 500 }}>{cfg.label}</span>
      </div>
    );
  };

  const keyframes = `
    @keyframes syncPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    @keyframes syncSpin { to { transform: rotate(360deg); } }
  `;

  return (
    <motion.section id="comp-save-sync" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <style>{keyframes}</style>
      <div style={accentBar} />
      <p style={sectionTitle}>Save &amp; Sync Status</p>
      <p style={sectionDesc}>
        Save and sync indicators show users the current state of their data persistence.
        They provide real-time feedback for auto-save, cloud sync, offline, and conflict states.
      </p>

      {/* All States */}
      <div style={subsectionLabel}>All States</div>
      <div style={{ ...previewBox, display: "flex", flexDirection: "column", gap: 12 }}>
        {allStatuses.map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {renderStatusPill(s)}
          </div>
        ))}
      </div>

      {/* Interactive Demo */}
      <div style={subsectionLabel}>Interactive Demo</div>
      <div style={previewBox}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>Document.txt</span>
          {renderStatusPill(demoStatus)}
        </div>
        <div style={{
          padding: 16, borderRadius: system.spacing.radius.md,
          backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
          fontSize: 13, color: palette.textSecondary, lineHeight: 1.7, minHeight: 80,
        }}>
          This demo cycles through auto-save → syncing → saved states automatically every 2 seconds to show the transition between states.
        </div>
      </div>

      {/* Manual Trigger */}
      <div style={subsectionLabel}>Manual Status Selection</div>
      <div style={previewBox}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {allStatuses.map(s => (
            <button key={s} onClick={() => setActiveStatus(s)} style={{
              padding: "5px 12px", fontSize: 11, cursor: "pointer",
              fontWeight: activeStatus === s ? 600 : 400,
              color: activeStatus === s ? statusConfig[s].color : palette.textSecondary,
              backgroundColor: activeStatus === s ? statusConfig[s].color + "10" : palette.surfaceMuted,
              border: `1px solid ${activeStatus === s ? statusConfig[s].color + "30" : palette.border}`,
              borderRadius: system.spacing.radius.md, fontFamily: system.typography.bodyFont,
            }}>
              {statusConfig[s].label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
          {renderStatusPill(activeStatus)}
        </div>
      </div>

      {/* Cloud Icon States */}
      <div style={subsectionLabel}>Cloud Icon States</div>
      <div style={{ ...previewBox, display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {allStatuses.map(s => (
          <div key={s}>{renderCloudIcon(s)}</div>
        ))}
      </div>

      {/* Compact / Header Bar */}
      <div style={subsectionLabel}>Header Bar Integration</div>
      <div style={{
        backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
        borderRadius: system.spacing.radius.lg, overflow: "hidden",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", borderBottom: `1px solid ${palette.border}`,
          backgroundColor: palette.surfaceMuted,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>Project Name</span>
            {renderStatusPill(demoStatus, "sm")}
          </div>
          <div style={{ display: "flex", gap: 8, fontSize: 12, color: palette.textSecondary }}>
            <span>Last edited: 2 min ago</span>
          </div>
        </div>
        <div style={{ padding: 24, fontSize: 13, color: palette.textSecondary }}>
          The save status indicator integrates seamlessly into the header or toolbar area.
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to show sync status" description="Display indicators for:" items={[
          "Auto-saving documents or forms",
          "Cloud synchronization progress",
          "Offline mode with pending changes",
          "Sync conflicts that need resolution",
        ]} />
        <UsageSection palette={palette} title="Placement" description="Where to show sync status:" items={[
          "Header bar — Persistent, always visible",
          "Inline pill — Next to the document title",
          "Status bar — Bottom of the editor",
          "Toast — For state transitions (saved → failed)",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use animated dots or spinners for 'saving' and 'syncing' states to show activity." },
        { type: "dont", text: "Don't show 'saving' for longer than necessary. If it takes too long, show an error." },
        { type: "do", text: "Include a timestamp ('Saved 2 min ago') so users know how fresh the save is." },
        { type: "dont", text: "Don't hide the conflict state. Conflicts need immediate, visible attention." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Status dot", description: "Color-coded circle indicating state", x: 10, y: 40 },
          { id: 2, label: "Label", description: "Text description of the current state", x: 40, y: 40 },
          { id: 3, label: "Timestamp", description: "When the last save occurred", x: 75, y: 40 },
          { id: 4, label: "Container", description: "Pill or inline wrapper with state-colored border", x: 50, y: 80 },
        ]}
        renderPreview={(h) => (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 20,
            backgroundColor: palette.success + "08", border: `1px solid ${palette.success}20`,
            opacity: h === 4 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.success,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }} />
            <span style={{
              fontSize: 12, color: palette.success, fontWeight: 500,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Saved</span>
            <span style={{
              fontSize: 11, color: palette.textSecondary,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>· 2 min ago</span>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Pill Padding", value: "6px 14px" },
        { label: "Dot Size", value: "8px" },
        { label: "Font Size", value: "13px / 500" },
        { label: "Cloud Icon Size", value: "36px" },
        { label: "Border Radius", value: "system.spacing.radius.xl" },
      ]} />
    </motion.section>
  );
}
