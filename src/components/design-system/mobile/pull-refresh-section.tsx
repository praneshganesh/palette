"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface PullRefreshSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type RefreshState = "idle" | "pulling" | "threshold" | "refreshing" | "done";

const feedItems = [
  { avatar: "🟣", name: "Sarah K.", text: "Just shipped v2.0! 🎉", time: "2m" },
  { avatar: "🔵", name: "Mike R.", text: "Great progress on the dashboard", time: "15m" },
  { avatar: "🟢", name: "Lena P.", text: "Code review is done ✅", time: "1h" },
  { avatar: "🟠", name: "Jay T.", text: "Meeting notes attached", time: "3h" },
];

export function PullRefreshSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: PullRefreshSectionProps) {
  const comp = system.components;
  const [refreshState, setRefreshState] = useState<RefreshState>("idle");

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

  const pullOffset = refreshState === "idle" ? 0 : refreshState === "pulling" ? 30 : refreshState === "threshold" ? 56 : refreshState === "refreshing" ? 56 : 0;

  const simulateRefresh = () => {
    setRefreshState("pulling");
    setTimeout(() => setRefreshState("threshold"), 500);
    setTimeout(() => setRefreshState("refreshing"), 1000);
    setTimeout(() => setRefreshState("done"), 2500);
    setTimeout(() => setRefreshState("idle"), 3200);
  };

  const spinnerRotation = refreshState === "refreshing" ? "360deg" : refreshState === "threshold" ? "180deg" : refreshState === "pulling" ? "90deg" : "0deg";

  return (
    <motion.section id="comp-pull-refresh" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Pull to Refresh</p>
      <p style={sectionDesc}>
        A pull-down gesture at the top of a scrollable list triggers a refresh. Visual indicators show the pull progress, threshold, and loading state with custom animations.
      </p>

      <div style={subsectionLabel}>Interactive Demo</div>
      <div style={{ marginBottom: 12 }}>
        <button onClick={simulateRefresh} disabled={refreshState !== "idle"} style={{ padding: "8px 20px", fontSize: 13, fontWeight: 600, backgroundColor: refreshState === "idle" ? palette.primary : palette.surfaceMuted, color: refreshState === "idle" ? "#fff" : palette.textSecondary, border: "none", borderRadius: system.spacing.radius.md, cursor: refreshState === "idle" ? "pointer" : "default" }}>
          {refreshState === "idle" ? "Simulate Pull Refresh" : refreshState === "done" ? "Done!" : "Refreshing…"}
        </button>
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${palette.border}`, backgroundColor: palette.surface }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>Feed</span>
          </div>

          {/* Spinner area */}
          <div style={{ height: pullOffset, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: palette.surfaceMuted, transition: "height 0.3s cubic-bezier(0.32,0.72,0,1)" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${palette.border}`, borderTopColor: refreshState === "refreshing" ? palette.primary : palette.border, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${spinnerRotation})`, transition: refreshState === "refreshing" ? "none" : "transform 0.3s", animation: refreshState === "refreshing" ? "spin 0.8s linear infinite" : "none" }}>
              {refreshState === "done" ? (
                <span style={{ fontSize: 14, color: palette.success }}>✓</span>
              ) : (
                <span style={{ fontSize: 10, color: palette.primary }}>↓</span>
              )}
            </div>
          </div>

          {/* Feed list */}
          <div style={{ transform: `translateY(0)`, transition: "transform 0.3s" }}>
            {feedItems.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderBottom: `1px solid ${palette.border}30` }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{item.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{item.name}</span>
                    <span style={{ fontSize: 11, color: palette.textSecondary }}>{item.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: palette.textSecondary }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {([
          { state: "Idle", desc: "No pull active, list at top", icon: "—" },
          { state: "Pulling", desc: "Finger dragging, arrow rotates", icon: "↓" },
          { state: "Threshold", desc: "Release to refresh", icon: "↑" },
          { state: "Refreshing", desc: "Spinner animating, loading", icon: "⟳" },
        ] as const).map(s => (
          <div key={s.state} style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 16, textAlign: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: palette.primary + "12", color: palette.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, margin: "0 auto 10px" }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>{s.state}</div>
            <div style={{ fontSize: 11, color: palette.textSecondary, lineHeight: 1.4 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use pull to refresh" description="Refresh gestures for mobile lists:" items={[
          "Social feeds and timelines",
          "Email or message inboxes",
          "Dashboard data that updates frequently",
        ]} />
        <UsageSection palette={palette} title="Custom indicators" description="Enhance the refresh experience:" items={[
          "Branded spinner or lottie animation",
          "Progress arc that fills as user pulls",
          "Success checkmark on completion",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show visual feedback immediately on pull — even a slight arrow rotation reassures users." },
        { type: "dont", text: "Don't trigger refresh at the slightest touch — require a clear threshold (50–60px pull)." },
        { type: "do", text: "Display a completion state (checkmark) briefly before hiding the indicator." },
        { type: "dont", text: "Don't use pull-to-refresh on content that never changes or updates in real-time via sockets." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Pull zone", description: "Invisible hit area at the top of the list", x: 50, y: 10 },
        { id: 2, label: "Indicator", description: "Spinner / arrow that shows pull progress", x: 50, y: 25 },
        { id: 3, label: "Threshold line", description: "Point at which release triggers refresh", x: 50, y: 40 },
        { id: 4, label: "Content offset", description: "List pushes down to reveal indicator", x: 50, y: 65 },
      ]} renderPreview={(h) => (
        <div style={{ width: 160, height: 90 }}>
          <div style={{ height: 20, backgroundColor: palette.surfaceMuted, borderRadius: `${system.spacing.radius.sm} ${system.spacing.radius.sm} 0 0`, display: "flex", alignItems: "center", justifyContent: "center", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${palette.primary}40`, borderTopColor: palette.primary, opacity: h === 2 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }} />
          </div>
          <div style={{ height: 1, backgroundColor: palette.warning + "60", opacity: h === 3 ? 1 : h === null ? 0.3 : 0.1, transition: "opacity 0.2s" }} />
          <div style={{ padding: "6px 8px", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: `0 0 ${system.spacing.radius.sm} ${system.spacing.radius.sm}`, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ height: 3, width: `${80 - i * 15}%`, backgroundColor: palette.border, borderRadius: 1, marginBottom: 4 }} />)}
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Pull Threshold", value: "56–64px" },
        { label: "Indicator Size", value: "28–32px" },
        { label: "Max Overscroll", value: "80–100px" },
        { label: "Refresh Duration", value: "1.5–3s typical" },
        { label: "Spring Damping", value: "0.7–0.85" },
      ]} />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.section>
  );
}
