"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface VersionHistorySectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const RestoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const DiffIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

type Version = { id: string; version: string; author: string; initials: string; date: string; time: string; summary: string; current?: boolean; changes: { added: number; removed: number } };

const versions: Version[] = [
  { id: "v6", version: "v2.4.1", author: "Alex Chen", initials: "AC", date: "Apr 20, 2026", time: "3:42 PM", summary: "Updated typography scale and fixed button alignment", current: true, changes: { added: 12, removed: 4 } },
  { id: "v5", version: "v2.4.0", author: "Sara Kim", initials: "SK", date: "Apr 18, 2026", time: "11:15 AM", summary: "Added dark mode support for card components", changes: { added: 45, removed: 8 } },
  { id: "v4", version: "v2.3.2", author: "Jordan Lee", initials: "JL", date: "Apr 15, 2026", time: "9:30 AM", summary: "Refactored spacing tokens for consistency", changes: { added: 22, removed: 18 } },
  { id: "v3", version: "v2.3.1", author: "Dev Patel", initials: "DP", date: "Apr 12, 2026", time: "4:55 PM", summary: "Fixed border radius inheritance in nested cards", changes: { added: 6, removed: 3 } },
  { id: "v2", version: "v2.3.0", author: "Alex Chen", initials: "AC", date: "Apr 8, 2026", time: "2:20 PM", summary: "Major redesign of input components", changes: { added: 89, removed: 52 } },
  { id: "v1", version: "v2.2.0", author: "Sara Kim", initials: "SK", date: "Apr 1, 2026", time: "10:00 AM", summary: "Initial release of v2 design system", changes: { added: 340, removed: 0 } },
];

export function VersionHistorySection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: VersionHistorySectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const btnRadius = comp.button.borderRadius || system.spacing.radius.md;
  const [selectedVersion, setSelectedVersion] = useState("v6");
  const [compareA, setCompareA] = useState<string | null>(null);
  const [compareB, setCompareB] = useState<string | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const Avatar = ({ initials, color, size = 28 }: { initials: string; color: string; size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color + "20", color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
  );

  const authorColor = (initials: string) => {
    const map: Record<string, string> = { AC: palette.primary, SK: palette.success, JL: palette.warning, DP: palette.info };
    return map[initials] || palette.textSecondary;
  };

  return (
    <motion.section id="comp-version-history" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Version History</p>
      <p style={sectionDesc}>
        Version history panels display chronological records of changes with version labels,
        authors, timestamps, change summaries, and restore/compare actions.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>Version History</span>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>{versions.length} versions</span>
          </div>
          {versions.map((v, i) => {
            const isSelected = selectedVersion === v.id;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVersion(v.id)}
                style={{
                  display: "flex", gap: 12, padding: "14px 16px", cursor: "pointer",
                  borderRadius: radius, marginBottom: 4,
                  backgroundColor: isSelected ? palette.primary + "08" : "transparent",
                  border: `1px solid ${isSelected ? palette.primary + "25" : "transparent"}`,
                  transition: "all .15s",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  <Avatar initials={v.initials} color={authorColor(v.initials)} />
                  {i < versions.length - 1 && <div style={{ width: 1.5, flex: 1, backgroundColor: palette.border, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: "monospace" }}>{v.version}</span>
                    {v.current && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, backgroundColor: palette.primary + "15", color: palette.primary, fontWeight: 600 }}>Current</span>}
                  </div>
                  <p style={{ fontSize: 12, color: palette.textSecondary, margin: "0 0 6px", lineHeight: 1.5 }}>{v.summary}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: palette.textSecondary }}>
                    <span>{v.author}</span>
                    <span>{v.date} at {v.time}</span>
                    <span style={{ color: palette.success }}>+{v.changes.added}</span>
                    {v.changes.removed > 0 && <span style={{ color: palette.danger }}>−{v.changes.removed}</span>}
                  </div>
                  {isSelected && !v.current && (
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: btnRadius, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textPrimary, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        <RestoreIcon /> Restore
                      </button>
                      <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: btnRadius, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textPrimary, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        <EyeIcon /> Preview
                      </button>
                      <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: btnRadius, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textPrimary, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        <DiffIcon /> Compare
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Selected BG", `${palette.primary}08`], ["Current Badge", "palette.primary"], ["Version Font", "mono / 700"], ["Added Color", "palette.success"], ["Removed Color", "palette.danger"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compare variant */}
      <div style={subsectionLabel}>Compare Mode</div>
      <div style={showcaseBox}>
        <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Select two versions to compare</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {["A", "B"].map(side => (
            <div key={side}>
              <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 8 }}>Version {side}</div>
              {versions.slice(0, 4).map(v => {
                const sel = side === "A" ? compareA : compareB;
                const active = sel === v.id;
                return (
                  <div key={v.id} onClick={() => side === "A" ? setCompareA(v.id) : setCompareB(v.id)} style={{
                    padding: "8px 12px", borderRadius: system.spacing.radius.sm, marginBottom: 4, cursor: "pointer",
                    backgroundColor: active ? palette.primary + "10" : "transparent",
                    border: `1px solid ${active ? palette.primary : "transparent"}`, transition: "all .15s",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, fontFamily: "monospace" }}>{v.version}</div>
                    <div style={{ fontSize: 11, color: palette.textSecondary }}>{v.date} · {v.author}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {compareA && compareB && (
          <button style={{ marginTop: 16, padding: "8px 20px", borderRadius: btnRadius, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Compare {versions.find(v => v.id === compareA)?.version} ↔ {versions.find(v => v.id === compareB)?.version}
          </button>
        )}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use version history" description="Track and manage content changes:" items={[
          "Document and file revision tracking",
          "Design system changelog displays",
          "Configuration audit trails",
          "Collaborative editing history",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Make history actionable:" items={[
          "Show author avatars for quick identification",
          "Include change statistics (+/- lines)",
          "Offer restore, preview, and compare actions",
          "Mark the current/active version clearly",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Clearly mark the current version with a badge or label." },
        { type: "dont", text: "Don't allow restore without a confirmation step." },
        { type: "do", text: "Show change statistics to help users find significant updates." },
        { type: "dont", text: "Don't load all versions at once — paginate for long histories." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Version label", description: "Semantic version number (monospace)", x: 25, y: 15 },
        { id: 2, label: "Author avatar", description: "Profile picture or initials", x: 8, y: 40 },
        { id: 3, label: "Summary", description: "Brief description of changes", x: 50, y: 40 },
        { id: 4, label: "Metadata", description: "Date, time, and change stats", x: 50, y: 65 },
        { id: 5, label: "Actions", description: "Restore, preview, compare buttons", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 220 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, padding: "6px 8px", borderRadius: 4, border: `1px solid ${i === 0 ? palette.primary + "25" : "transparent"}`, backgroundColor: i === 0 ? palette.primary + "06" : "transparent" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: palette.border + "40", flexShrink: 0, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
              <div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 2 }}>
                  <span style={{ fontSize: 8, fontWeight: 700, fontFamily: "monospace", color: palette.textPrimary, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>v2.{4 - i}.0</span>
                  {i === 0 && <span style={{ fontSize: 6, padding: "1px 4px", borderRadius: 99, backgroundColor: palette.primary + "15", color: palette.primary }}>Current</span>}
                </div>
                <div style={{ fontSize: 7, color: palette.textSecondary, marginBottom: 2, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Change summary here</div>
                <div style={{ fontSize: 6, color: palette.textSecondary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Apr {20 - i} · <span style={{ color: palette.success }}>+{12 * (3 - i)}</span></div>
                {i === 1 && (
                  <div style={{ display: "flex", gap: 3, marginTop: 3, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                    {["Restore", "Preview"].map(a => <span key={a} style={{ padding: "1px 4px", borderRadius: 2, fontSize: 6, border: `1px solid ${palette.border}`, color: palette.textPrimary }}>{a}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Item Padding", value: "14px 16px" },
        { label: "Avatar Size", value: "28px" },
        { label: "Version Font", value: "13px / monospace / 700" },
        { label: "Summary Font", value: "12px" },
        { label: "Action Button Padding", value: "5px 12px" },
        { label: "Item Border Radius", value: radius },
        { label: "Connector Width", value: "1.5px" },
      ]} />
    </motion.section>
  );
}
