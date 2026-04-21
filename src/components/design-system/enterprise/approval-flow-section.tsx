"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ApprovalFlowSectionProps {
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 12 15 16 10" />
  </svg>
);
const Clock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const XCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
const CircleEmpty = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

type StepStatus = "approved" | "pending" | "rejected" | "waiting";
type Step = { label: string; approver: string; initials: string; status: StepStatus; date?: string };

const steps: Step[] = [
  { label: "Manager Review", approver: "Alex Chen", initials: "AC", status: "approved", date: "Apr 10" },
  { label: "Legal Review", approver: "Sara Kim", initials: "SK", status: "approved", date: "Apr 14" },
  { label: "VP Approval", approver: "Jordan Lee", initials: "JL", status: "pending" },
  { label: "Finance Sign-off", approver: "Dev Patel", initials: "DP", status: "waiting" },
];

export function ApprovalFlowSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ApprovalFlowSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const btnRadius = comp.button.borderRadius || system.spacing.radius.md;
  const [activeStep, setActiveStep] = useState(2);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const statusColor = (s: StepStatus) => s === "approved" ? palette.success : s === "pending" ? palette.warning : s === "rejected" ? palette.danger : palette.textSecondary + "60";
  const StatusIcon = ({ status }: { status: StepStatus }) => (
    <span style={{ color: statusColor(status), display: "flex" }}>
      {status === "approved" ? <CheckCircle /> : status === "pending" ? <Clock /> : status === "rejected" ? <XCircle /> : <CircleEmpty />}
    </span>
  );

  const Avatar = ({ initials, color, size = 28 }: { initials: string; color: string; size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color + "20", color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
  );

  return (
    <motion.section id="comp-approval-flow" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Approval Flow</p>
      <p style={sectionDesc}>
        Approval flows visualize multi-step review processes with status indicators, approver
        information, timeline connections, and action buttons for pending decisions.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary, marginBottom: 24 }}>Purchase Order #PO-2026-104</div>
          <div>
            {steps.map((step, i) => (
              <div key={step.label} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: i < steps.length - 1 ? 28 : 0 }}>
                {i < steps.length - 1 && (
                  <div style={{ position: "absolute", left: 8.5, top: 24, width: 1.5, height: "calc(100% - 16px)", backgroundColor: i < activeStep ? palette.success + "40" : palette.border }} />
                )}
                <div style={{ flexShrink: 0, zIndex: 1 }}><StatusIcon status={step.status} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{step.label}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, backgroundColor: statusColor(step.status) + "15", color: statusColor(step.status), fontWeight: 600, textTransform: "capitalize" }}>{step.status}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: step.status === "pending" ? 12 : 0 }}>
                    <Avatar initials={step.initials} color={statusColor(step.status)} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary }}>{step.approver}</div>
                      {step.date && <div style={{ fontSize: 11, color: palette.textSecondary }}>Completed {step.date}</div>}
                      {step.status === "pending" && <div style={{ fontSize: 11, color: palette.warning }}>Awaiting response</div>}
                    </div>
                  </div>
                  {step.status === "pending" && (
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <button style={{ padding: "6px 16px", borderRadius: btnRadius, border: "none", backgroundColor: palette.success, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Approve</button>
                      <button style={{ padding: "6px 16px", borderRadius: btnRadius, border: `1px solid ${palette.danger}40`, backgroundColor: palette.danger + "08", color: palette.danger, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Reject</button>
                      <button style={{ padding: "6px 16px", borderRadius: btnRadius, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Comment</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Approved Color", "palette.success"], ["Pending Color", "palette.warning"], ["Rejected Color", "palette.danger"], ["Connector Width", "1.5px"], ["Avatar Size", "28px"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal variant */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ ...showcaseBox, overflowX: "auto" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 20 }}>Horizontal Progress</div>
        <div style={{ display: "flex", alignItems: "flex-start", minWidth: 500, position: "relative" }}>
          <div style={{ position: "absolute", top: 9, left: 30, right: 30, height: 2, backgroundColor: palette.border }} />
          <div style={{ position: "absolute", top: 9, left: 30, height: 2, backgroundColor: palette.success, width: `${(activeStep / (steps.length - 1)) * (100 - 12)}%` }} />
          {steps.map((step, i) => (
            <div key={step.label} onClick={() => i <= activeStep && setActiveStep(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1, cursor: i <= activeStep ? "pointer" : "default" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: i < activeStep ? palette.success : i === activeStep ? palette.warning : palette.surface, border: `2px solid ${i < activeStep ? palette.success : i === activeStep ? palette.warning : palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
                {i < activeStep && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: i <= activeStep ? palette.textPrimary : palette.textSecondary, marginTop: 8, textAlign: "center" }}>{step.label}</span>
              <span style={{ fontSize: 10, color: palette.textSecondary, marginTop: 2 }}>{step.approver}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rejection scenario */}
      <div style={subsectionLabel}>With Rejection</div>
      <div style={showcaseBox}>
        {[
          { label: "Initial Review", status: "approved" as StepStatus, approver: "Alex Chen", date: "Apr 10" },
          { label: "Compliance Check", status: "rejected" as StepStatus, approver: "Sara Kim", date: "Apr 12" },
        ].map((step, i) => (
          <div key={step.label} style={{ display: "flex", gap: 12, marginBottom: i === 0 ? 20 : 0 }}>
            <StatusIcon status={step.status} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{step.label}</div>
              <div style={{ fontSize: 12, color: palette.textSecondary }}>{step.approver} · {step.date}</div>
              {step.status === "rejected" && (
                <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: system.spacing.radius.sm, backgroundColor: palette.danger + "08", border: `1px solid ${palette.danger}20`, fontSize: 12, color: palette.danger }}>
                  Rejected: Missing required documentation. Please re-submit with attachments.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use approval flows" description="Multi-step authorization processes:" items={[
          "Purchase order and expense approvals",
          "Document review and sign-off chains",
          "Code review and deployment gates",
          "HR processes like leave and hiring",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Keep flows transparent:" items={[
          "Show who approved and when at each step",
          "Provide action buttons only on the active step",
          "Display rejection reasons with context",
          "Allow comments at any step for discussion",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use distinct colors for approved, pending, rejected, and waiting states." },
        { type: "dont", text: "Don't allow skipping steps in a sequential approval flow." },
        { type: "do", text: "Show rejection reasons inline with the rejected step." },
        { type: "dont", text: "Don't hide the timeline — users need to see the full flow." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Status icon", description: "Visual indicator of step status", x: 8, y: 40 },
        { id: 2, label: "Step label", description: "Name of the approval stage", x: 35, y: 25 },
        { id: 3, label: "Approver info", description: "Avatar, name, and completion date", x: 35, y: 55 },
        { id: 4, label: "Connector line", description: "Visual link between sequential steps", x: 8, y: 70 },
        { id: 5, label: "Action buttons", description: "Approve, reject, comment controls", x: 35, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: "flex", gap: 8, paddingBottom: i < 2 ? 14 : 0, position: "relative" }}>
              {i < 2 && <div style={{ position: "absolute", left: 8, top: 20, width: 1.5, height: "calc(100% - 10px)", backgroundColor: palette.border, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />}
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${i === 0 ? palette.success : i === 1 ? palette.warning : palette.border}`, flexShrink: 0, zIndex: 1, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: palette.textPrimary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Step {i + 1}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: palette.border + "40" }} />
                  <span style={{ fontSize: 7, color: palette.textSecondary }}>Approver</span>
                </div>
                {i === 1 && (
                  <div style={{ display: "flex", gap: 3, marginTop: 4, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                    <span style={{ padding: "1px 4px", borderRadius: 2, fontSize: 6, backgroundColor: palette.success, color: "#fff" }}>Approve</span>
                    <span style={{ padding: "1px 4px", borderRadius: 2, fontSize: 6, border: `1px solid ${palette.danger}40`, color: palette.danger }}>Reject</span>
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
        { label: "Icon Size", value: "18px" },
        { label: "Avatar Size", value: "28px" },
        { label: "Connector Width", value: "1.5px" },
        { label: "Step Gap", value: "28px" },
        { label: "Button Padding", value: "6px 16px" },
        { label: "Status Badge", value: "2px 8px / 99px radius" },
        { label: "Border Radius", value: radius },
      ]} />
    </motion.section>
  );
}
