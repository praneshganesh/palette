"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface NotificationsSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type Notification = { id: string; title: string; desc: string; time: string; read: boolean; type: "info" | "success" | "warning" | "danger"; group: string; action?: string };

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const BellIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export function NotificationsSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: NotificationsSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const typeColors: Record<string, string> = { info: palette.info, success: palette.success, warning: palette.warning, danger: palette.danger };
  const typeIcons: Record<string, string> = { info: "ℹ", success: "✓", warning: "⚠", danger: "✕" };

  const initial: Notification[] = [
    { id: "1", title: "Deployment successful", desc: "Production build v2.4.1 deployed", time: "2m ago", read: false, type: "success", group: "Today", action: "View logs" },
    { id: "2", title: "New comment on PR #142", desc: "Sara Kim left a review comment", time: "15m ago", read: false, type: "info", group: "Today", action: "View" },
    { id: "3", title: "Disk usage warning", desc: "Server storage at 85% capacity", time: "1h ago", read: false, type: "warning", group: "Today" },
    { id: "4", title: "Build failed", desc: "CI pipeline failed for feature/auth", time: "3h ago", read: true, type: "danger", group: "Today", action: "Retry" },
    { id: "5", title: "Team meeting reminder", desc: "Standup in 15 minutes", time: "Yesterday", read: true, type: "info", group: "Yesterday" },
    { id: "6", title: "Access granted", desc: "You were added to the Design team", time: "Yesterday", read: true, type: "success", group: "Yesterday" },
  ];

  const [notifications, setNotifications] = useState(initial);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markRead = (id: string) => setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(p => p.map(n => ({ ...n, read: true })));
  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === "unread" ? notifications.filter(n => !n.read) : notifications;
  const groups = [...new Set(filtered.map(n => n.group))];

  return (
    <motion.section id="comp-notifications" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Notifications</p>
      <p style={sectionDesc}>
        A notification list displays alerts grouped by date with unread badges, type indicators, mark-as-read actions, and contextual action buttons.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: radius.lg, padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${palette.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BellIcon size={18} />
              <span style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary }}>Notifications</span>
              {unreadCount > 0 && <span style={{ padding: "1px 8px", borderRadius: 99, fontSize: 11, fontWeight: 600, backgroundColor: palette.danger, color: "#fff" }}>{unreadCount}</span>}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {(["all", "unread"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding: "4px 12px", borderRadius: radius.sm, border: `1px solid ${filter === f ? palette.primary : palette.border}`, backgroundColor: filter === f ? palette.primary + "10" : "transparent", color: filter === f ? palette.primary : palette.textSecondary, fontSize: 11, fontWeight: 500, cursor: "pointer", textTransform: "capitalize", fontFamily: "inherit" }}>{f}</button>
              ))}
              <button onClick={markAllRead} style={{ border: "none", background: "none", fontSize: 11, color: palette.primary, cursor: "pointer", fontWeight: 500, fontFamily: "inherit" }}>Mark all read</button>
            </div>
          </div>
          <div style={{ maxHeight: 340, overflowY: "auto" }}>
            {groups.map(g => (
              <div key={g}>
                <div style={{ padding: "8px 20px", fontSize: 11, fontWeight: 600, color: palette.textSecondary, backgroundColor: palette.surfaceMuted, textTransform: "uppercase", letterSpacing: 1 }}>{g}</div>
                {filtered.filter(n => n.group === g).map(n => (
                  <div key={n.id} onClick={() => markRead(n.id)} style={{ display: "flex", gap: 12, padding: "14px 20px", borderBottom: `1px solid ${palette.border}`, cursor: "pointer", backgroundColor: n.read ? "transparent" : palette.primary + "05" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: typeColors[n.type] + "15", color: typeColors[n.type], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{typeIcons[n.type]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, color: palette.textPrimary }}>{n.title}</span>
                        {!n.read && <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: palette.primary, flexShrink: 0 }} />}
                      </div>
                      <p style={{ fontSize: 12, color: palette.textSecondary, margin: 0 }}>{n.desc}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
                        <span style={{ fontSize: 11, color: palette.textSecondary }}>{n.time}</span>
                        {n.action && <button style={{ border: "none", background: "none", fontSize: 11, fontWeight: 600, color: palette.primary, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>{n.action}</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Unread Badge", "palette.danger"], ["Icon Size", "32px circle"], ["Unread BG", "palette.primary 5%"], ["Dot Size", "6px"], ["Group Label", "11px uppercase"], ["Time Size", "11px"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Toast Style</div>
          {(["success", "warning", "danger"] as const).map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: radius.md, backgroundColor: typeColors[t] + "10", borderLeft: `3px solid ${typeColors[t]}`, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>{typeIcons[t]}</span>
              <span style={{ fontSize: 12, color: palette.textPrimary }}>{t === "success" ? "Changes saved" : t === "warning" ? "Rate limit approaching" : "Connection lost"}</span>
            </div>
          ))}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Badge Counts</div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {[1, 5, 23, "99+"].map(c => (
              <div key={String(c)} style={{ position: "relative" }}>
                <div style={{ width: 32, height: 32, borderRadius: radius.sm, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center" }}><BellIcon /></div>
                <span style={{ position: "absolute", top: -6, right: -8, padding: "0 5px", minWidth: 16, height: 16, borderRadius: 99, fontSize: 9, fontWeight: 700, backgroundColor: palette.danger, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use notifications" description="Notification lists work for:" items={["App-wide alert and activity feeds", "System status and health alerts", "User mentions and assignments", "Workflow state transitions"]} />
        <UsageSection palette={palette} title="Notification best practices" description="Keep users informed:" items={["Group by date for scanability", "Show unread count in header badge", "Allow batch mark-as-read", "Provide contextual action buttons"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use color-coded type icons to convey severity at a glance." },
        { type: "dont", text: "Don't show more than 50 notifications without pagination or virtualization." },
        { type: "do", text: "Highlight unread items with a subtle background tint and bold text." },
        { type: "dont", text: "Don't auto-dismiss important notifications like errors without user acknowledgment." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Header bar", description: "Title, badge, filter tabs, and mark-all-read", x: 50, y: 8 },
        { id: 2, label: "Group label", description: "Date-based grouping header", x: 15, y: 25 },
        { id: 3, label: "Type icon", description: "Colored circle with status symbol", x: 10, y: 50 },
        { id: 4, label: "Content", description: "Title, description, and timestamp", x: 50, y: 50 },
        { id: 5, label: "Unread dot", description: "Blue indicator for unread items", x: 80, y: 40 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, border: `1px solid ${palette.border}`, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", borderBottom: `1px solid ${palette.border}`, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: palette.textPrimary }}>Notifications</span>
            <span style={{ fontSize: 7, padding: "0 4px", borderRadius: 99, backgroundColor: palette.danger, color: "#fff" }}>3</span>
          </div>
          <div style={{ padding: "4px 10px", fontSize: 6, fontWeight: 600, color: palette.textSecondary, backgroundColor: palette.surfaceMuted, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>TODAY</div>
          <div style={{ display: "flex", gap: 6, padding: "6px 10px", backgroundColor: palette.primary + "05" }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: palette.success + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: palette.success, flexShrink: 0, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>✓</div>
            <div style={{ flex: 1, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
              <div style={{ fontSize: 7, fontWeight: 600, color: palette.textPrimary }}>Deploy success</div>
              <div style={{ fontSize: 6, color: palette.textSecondary }}>v2.4.1 • 2m ago</div>
            </div>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: palette.primary, alignSelf: "center", opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Header Height", value: "52px (16px padding)" },
        { label: "Item Padding", value: "14px 20px" },
        { label: "Icon Circle", value: "32px diameter" },
        { label: "Unread Dot", value: "6px" },
        { label: "Badge Min Width", value: "16px, 99px radius" },
        { label: "Title Font", value: "13px / 600 (unread)" },
        { label: "Max Height", value: "340px (scrollable)" },
      ]} />
    </motion.section>
  );
}
