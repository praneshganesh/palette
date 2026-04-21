"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface PresenceSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type Status = "online" | "offline" | "away" | "busy";
type User = { name: string; initials: string; color: string; status: Status; lastSeen?: string; statusText?: string };

export function PresenceSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: PresenceSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const statusColors: Record<Status, string> = { online: palette.success, offline: palette.textSecondary, away: palette.warning, busy: palette.danger };
  const statusLabels: Record<Status, string> = { online: "Online", offline: "Offline", away: "Away", busy: "Do not disturb" };

  const initialUsers: User[] = [
    { name: "Alex Chen", initials: "AC", color: palette.primary, status: "online", statusText: "Working on designs" },
    { name: "Sara Kim", initials: "SK", color: palette.success, status: "away", lastSeen: "5m ago", statusText: "In a meeting" },
    { name: "Dev Patel", initials: "DP", color: palette.info, status: "busy", statusText: "Focus time — no interruptions" },
    { name: "Jordan Lee", initials: "JL", color: palette.warning, status: "offline", lastSeen: "2h ago" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const cycleStatus = (name: string) => {
    const order: Status[] = ["online", "away", "busy", "offline"];
    setUsers(prev => prev.map(u => {
      if (u.name !== name) return u;
      const next = order[(order.indexOf(u.status) + 1) % order.length];
      return { ...u, status: next };
    }));
  };

  const Dot = ({ status, size = 10, border = true }: { status: Status; size?: number; border?: boolean }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: statusColors[status], border: border ? `2px solid ${palette.surface}` : "none", flexShrink: 0 }} />
  );

  const Avatar = ({ initials, color, size = 40, status }: { initials: string; color: string; size?: number; status?: Status }) => (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color + "20", color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 700 }}>{initials}</div>
      {status && <div style={{ position: "absolute", bottom: -1, right: -1 }}><Dot status={status} size={size * 0.3} /></div>}
    </div>
  );

  return (
    <motion.section id="comp-presence" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Presence</p>
      <p style={sectionDesc}>
        Presence indicators show user availability with colored dots, status text, last-seen timestamps, and avatar badges for real-time awareness.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: radius.lg }}>
          {users.map(u => (
            <div key={u.name} onClick={() => setSelectedUser(selectedUser === u.name ? null : u.name)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${palette.border}`, cursor: "pointer" }}>
              <Avatar initials={u.initials} color={u.color} status={u.status} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{u.name}</span>
                  <span style={{ fontSize: 11, color: statusColors[u.status], fontWeight: 500 }}>{statusLabels[u.status]}</span>
                </div>
                {u.statusText && <p style={{ fontSize: 12, color: palette.textSecondary, margin: "2px 0 0" }}>{u.statusText}</p>}
                {u.lastSeen && u.status !== "online" && <p style={{ fontSize: 11, color: palette.textSecondary, margin: "2px 0 0" }}>Last seen {u.lastSeen}</p>}
              </div>
              {selectedUser === u.name && (
                <button onClick={(e) => { e.stopPropagation(); cycleStatus(u.name); }} style={{ padding: "4px 12px", borderRadius: radius.sm, border: `1px solid ${palette.border}`, backgroundColor: "transparent", fontSize: 11, color: palette.textSecondary, cursor: "pointer", fontFamily: "inherit" }}>Change</button>
              )}
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Online", palette.success], ["Away", palette.warning], ["Busy", palette.danger], ["Offline", palette.textSecondary], ["Avatar Size", "40px"], ["Dot Size", "10px"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Dot Only</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {(["online", "away", "busy", "offline"] as Status[]).map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <Dot status={s} size={12} border={false} />
                <span style={{ fontSize: 10, color: palette.textSecondary, textTransform: "capitalize" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Badge on Avatar</div>
          <div style={{ display: "flex", gap: 12 }}>
            {(["online", "away", "busy", "offline"] as Status[]).map((s, i) => (
              <Avatar key={s} initials={initialUsers[i].initials} color={initialUsers[i].color} size={36} status={s} />
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Compact List</div>
          {initialUsers.slice(0, 3).map(u => (
            <div key={u.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Dot status={u.status} size={8} border={false} />
              <span style={{ fontSize: 12, color: palette.textPrimary }}>{u.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to show presence" description="Presence indicators are useful for:" items={["Team chat and collaboration apps", "Contact lists and user directories", "Shared document editing sessions", "Customer support agent dashboards"]} />
        <UsageSection palette={palette} title="Presence best practices" description="Keep status accurate:" items={["Auto-set away after idle timeout", "Let users set custom status text", "Use consistent colors across the app", "Debounce rapid status changes"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use universally recognized colors: green=online, yellow=away, red=busy." },
        { type: "dont", text: "Don't show presence for anonymous or system accounts." },
        { type: "do", text: "Include a border around the dot matching the background for contrast." },
        { type: "dont", text: "Don't update presence too frequently — batch changes to reduce flicker." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Avatar", description: "User profile image or initials circle", x: 12, y: 40 },
        { id: 2, label: "Status dot", description: "Colored indicator on avatar corner", x: 20, y: 65 },
        { id: 3, label: "Name", description: "User display name", x: 40, y: 25 },
        { id: 4, label: "Status label", description: "Text label for current status", x: 65, y: 25 },
        { id: 5, label: "Status text", description: "Custom user-set status message", x: 40, y: 55 },
      ]} renderPreview={(h) => (
        <div style={{ width: 180, display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.primary + "20" }} />
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.success, border: `2px solid ${palette.surface}`, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
          </div>
          <div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: palette.textPrimary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Alex Chen</span>
              <span style={{ fontSize: 7, color: palette.success, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Online</span>
            </div>
            <div style={{ fontSize: 7, color: palette.textSecondary, marginTop: 2, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Working on designs</div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Avatar Size", value: "40px (default) / 36px (compact)" },
        { label: "Status Dot", value: "10px with 2px border" },
        { label: "Dot Offset", value: "bottom: -1px, right: -1px" },
        { label: "Name Font", value: "14px / 600 weight" },
        { label: "Status Font", value: "11px / 500 weight" },
        { label: "Row Padding", value: "12px 0" },
        { label: "Item Gap", value: "14px" },
      ]} />
    </motion.section>
  );
}
