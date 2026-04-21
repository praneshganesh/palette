"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface TimelineSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 12 15 16 10" />
  </svg>
);
const CircleDot = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);
const CircleEmpty = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

type TimelineItem = { title: string; desc: string; date: string; status: "done" | "active" | "pending" };

const items: TimelineItem[] = [
  { title: "Project kickoff", desc: "Initial requirements gathered and team assembled", date: "Jan 15", status: "done" },
  { title: "Design phase", desc: "Wireframes and prototypes created", date: "Feb 3", status: "done" },
  { title: "Development sprint", desc: "Core features implemented and tested", date: "Mar 10", status: "active" },
  { title: "Beta release", desc: "Limited rollout to early users", date: "Apr 1", status: "pending" },
  { title: "GA launch", desc: "Full public release with documentation", date: "May 15", status: "pending" },
];

export function TimelineSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: TimelineSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [activeIdx, setActiveIdx] = useState(2);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const statusColor = (s: TimelineItem["status"]) => s === "done" ? palette.success : s === "active" ? palette.primary : palette.textSecondary + "60";
  const StatusIcon = ({ status }: { status: TimelineItem["status"] }) => (
    <span style={{ color: statusColor(status), display: "flex" }}>
      {status === "done" ? <CheckCircle /> : status === "active" ? <CircleDot /> : <CircleEmpty />}
    </span>
  );

  return (
    <motion.section id="comp-timeline" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Timeline</p>
      <p style={sectionDesc}>
        Timelines display sequential events in vertical or horizontal layouts with connected nodes,
        status icons, and alternating content positioning for clear chronological storytelling.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, minHeight: 200 }}>
          <div style={{ padding: "8px 0" }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: i < items.length - 1 ? 32 : 0 }}>
                {i < items.length - 1 && (
                  <div style={{ position: "absolute", left: 7.5, top: 24, width: 1.5, height: "calc(100% - 16px)", backgroundColor: i < activeIdx ? palette.success + "40" : palette.border }} />
                )}
                <div style={{ flexShrink: 0, paddingTop: 2, zIndex: 1 }}><StatusIcon status={item.status} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{item.title}</span>
                    <span style={{ fontSize: 11, color: palette.textSecondary }}>{item.date}</span>
                  </div>
                  <p style={{ fontSize: 13, color: palette.textSecondary, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Node Size", "16px"], ["Connector Width", "1.5px"], ["Done Color", "palette.success"], ["Active Color", "palette.primary"], ["Pending Color", "palette.textSecondary"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["vertical", "horizontal"] as const).map(v => (
          <button key={v} onClick={() => setOrientation(v)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${orientation === v ? palette.primary : palette.border}`, backgroundColor: orientation === v ? palette.primary + "10" : palette.surface, color: orientation === v ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{v}</button>
        ))}
      </div>
      {orientation === "vertical" ? (
        <div style={{ ...showcaseBox, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Left-aligned</div>
            {items.slice(0, 3).map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, position: "relative", paddingBottom: i < 2 ? 24 : 0 }}>
                {i < 2 && <div style={{ position: "absolute", left: 7.5, top: 20, width: 1.5, height: "calc(100% - 12px)", backgroundColor: palette.border }} />}
                <div style={{ flexShrink: 0, zIndex: 1 }}><StatusIcon status={item.status} /></div>
                <div><span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{item.title}</span><br /><span style={{ fontSize: 11, color: palette.textSecondary }}>{item.date}</span></div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Alternating</div>
            {items.slice(0, 4).map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, position: "relative", paddingBottom: i < 3 ? 20 : 0, flexDirection: i % 2 === 0 ? "row" : "row-reverse", textAlign: i % 2 === 0 ? "left" : "right" }}>
                {i < 3 && <div style={{ position: "absolute", left: "50%", top: 20, width: 1.5, height: "calc(100% - 12px)", backgroundColor: palette.border, transform: "translateX(-50%)" }} />}
                <div style={{ flex: 1, fontSize: 12, color: palette.textPrimary, fontWeight: 500 }}>{item.title}<br /><span style={{ color: palette.textSecondary, fontSize: 10 }}>{item.date}</span></div>
                <div style={{ flexShrink: 0, zIndex: 1 }}><StatusIcon status={item.status} /></div>
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ ...showcaseBox, overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0, minWidth: 600, position: "relative" }}>
            <div style={{ position: "absolute", top: 8, left: 8, right: 8, height: 1.5, backgroundColor: palette.border }} />
            {items.map((item, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                <div style={{ zIndex: 1, backgroundColor: palette.surface, padding: 2 }}><StatusIcon status={item.status} /></div>
                <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginTop: 10 }}>{item.title}</span>
                <span style={{ fontSize: 10, color: palette.textSecondary }}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive */}
      <div style={subsectionLabel}>Interactive Timeline</div>
      <div style={showcaseBox}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: 20, right: 20, height: 2, backgroundColor: palette.border, transform: "translateY(-50%)" }} />
          {items.map((item, i) => (
            <div key={i} onClick={() => setActiveIdx(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: i <= activeIdx ? palette.primary : palette.surface,
                border: `2px solid ${i <= activeIdx ? palette.primary : palette.border}`,
                color: i <= activeIdx ? "#fff" : palette.textSecondary, fontSize: 10, fontWeight: 700, transition: "all .2s",
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 11, fontWeight: i === activeIdx ? 700 : 400, color: i === activeIdx ? palette.primary : palette.textSecondary, marginTop: 8, textAlign: "center" }}>{item.title}</span>
            </div>
          ))}
        </div>
        {activeIdx !== null && (
          <div style={{ marginTop: 24, padding: 16, backgroundColor: palette.surfaceMuted, borderRadius: radius, border: `1px solid ${palette.border}` }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{items[activeIdx].title}</span>
            <p style={{ fontSize: 13, color: palette.textSecondary, margin: "6px 0 0" }}>{items[activeIdx].desc}</p>
          </div>
        )}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use timelines" description="Timelines visualize sequential events:" items={[
          "Project milestones and progress tracking",
          "Activity feeds and audit logs",
          "Multi-step workflows and onboarding",
          "Historical records and changelogs",
        ]} />
        <UsageSection palette={palette} title="Choosing orientation" description="Pick the layout that fits your content:" items={[
          "Vertical — Best for detailed, text-heavy entries",
          "Horizontal — Ideal for compact step indicators",
          "Alternating — Reduces visual monotony for long lists",
          "Interactive — Lets users explore each step",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use status icons to clearly indicate completed, active, and pending states.", visual: <div style={{ display: "flex", gap: 8 }}><span style={{ color: palette.success }}><CheckCircle /></span><span style={{ color: palette.primary }}><CircleDot /></span><span style={{ color: palette.textSecondary + "60" }}><CircleEmpty /></span></div> },
        { type: "dont", text: "Don't use identical styling for all nodes regardless of state." },
        { type: "do", text: "Connect nodes with a visual line to show progression." },
        { type: "dont", text: "Don't display more than 8-10 items without pagination or scrolling." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Node", description: "Status indicator icon or circle", x: 10, y: 50 },
        { id: 2, label: "Connector", description: "Line linking sequential nodes", x: 10, y: 75 },
        { id: 3, label: "Title", description: "Event or step heading", x: 40, y: 30 },
        { id: 4, label: "Description", description: "Supporting text for context", x: 40, y: 55 },
        { id: 5, label: "Timestamp", description: "Date or time of the event", x: 70, y: 30 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: "flex", gap: 10, paddingBottom: i < 2 ? 16 : 0, position: "relative" }}>
              {i < 2 && <div style={{ position: "absolute", left: 7, top: 18, width: 1.5, height: "calc(100% - 8px)", backgroundColor: palette.border, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />}
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${i === 0 ? palette.success : palette.border}`, flexShrink: 0, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: palette.textPrimary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Step {i + 1}</div>
                <div style={{ fontSize: 8, color: palette.textSecondary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Description text</div>
                <div style={{ fontSize: 7, color: palette.textSecondary + "80", opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Jan {i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Node Size", value: "16px" },
        { label: "Interactive Node Size", value: "24px" },
        { label: "Connector Width", value: "1.5px" },
        { label: "Item Gap (vertical)", value: "32px" },
        { label: "Content Gap", value: "16px" },
        { label: "Title Font Size", value: "14px" },
        { label: "Description Font Size", value: "13px" },
      ]} />
    </motion.section>
  );
}
