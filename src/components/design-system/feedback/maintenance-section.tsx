"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface MaintenanceSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type MaintenanceVariant = "scheduled" | "construction" | "coming-soon" | "update-required";

export function MaintenanceSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: MaintenanceSectionProps) {
  const comp = system.components;
  const [activeVariant, setActiveVariant] = useState<MaintenanceVariant>("scheduled");
  const [countdown, setCountdown] = useState({ h: 2, m: 34, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
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

  const countdownBox = (value: number, label: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        width: 56, height: 56, borderRadius: system.spacing.radius.md,
        backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, fontWeight: 700, color: palette.textPrimary,
        fontFamily: "monospace",
      }}>
        {String(value).padStart(2, "0")}
      </div>
      <span style={{ fontSize: 10, color: palette.textSecondary, marginTop: 6, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
        {label}
      </span>
    </div>
  );

  const progressBar = (percent: number, color = palette.primary) => (
    <div style={{ width: "100%", maxWidth: 300 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: palette.textSecondary }}>Progress</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>{percent}%</span>
      </div>
      <div style={{
        height: 6, backgroundColor: palette.border + "40", borderRadius: 3, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${percent}%`, backgroundColor: color,
          borderRadius: 3, transition: "width 0.5s ease",
        }} />
      </div>
    </div>
  );

  const variants: { id: MaintenanceVariant; label: string }[] = [
    { id: "scheduled", label: "Scheduled" },
    { id: "construction", label: "Under Construction" },
    { id: "coming-soon", label: "Coming Soon" },
    { id: "update-required", label: "Update Required" },
  ];

  const renderVariant = () => {
    switch (activeVariant) {
      case "scheduled":
        return (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🔧</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
              Scheduled Maintenance
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
              We&apos;re performing scheduled maintenance to improve your experience.
              We&apos;ll be back shortly.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
              {countdownBox(countdown.h, "Hours")}
              <div style={{ fontSize: 24, fontWeight: 700, color: palette.textSecondary, alignSelf: "center", paddingBottom: 20 }}>:</div>
              {countdownBox(countdown.m, "Minutes")}
              <div style={{ fontSize: 24, fontWeight: 700, color: palette.textSecondary, alignSelf: "center", paddingBottom: 20 }}>:</div>
              {countdownBox(countdown.s, "Seconds")}
            </div>
            <div style={{ fontSize: 12, color: palette.textSecondary }}>
              Maintenance window: 2:00 AM – 5:00 AM UTC
            </div>
          </div>
        );
      case "construction":
        return (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🚧</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
              Under Construction
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
              We&apos;re building something amazing. This section is currently being worked on
              and will be available soon.
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              {progressBar(67, palette.warning)}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, fontSize: 12, color: palette.textSecondary }}>
              <span>📧 updates@{(content.orgName || "acme").toLowerCase()}.com</span>
              <span>•</span>
              <span style={{ color: palette.primary, cursor: "pointer" }}>Get notified</span>
            </div>
          </div>
        );
      case "coming-soon":
        return (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🚀</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
              Coming Soon
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
              A brand new experience is on its way. Be among the first to try it out
              when it launches.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
              {countdownBox(countdown.h, "Hours")}
              <div style={{ fontSize: 24, fontWeight: 700, color: palette.textSecondary, alignSelf: "center", paddingBottom: 20 }}>:</div>
              {countdownBox(countdown.m, "Min")}
              <div style={{ fontSize: 24, fontWeight: 700, color: palette.textSecondary, alignSelf: "center", paddingBottom: 20 }}>:</div>
              {countdownBox(countdown.s, "Sec")}
            </div>
            <button style={{
              padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "24px"}`,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              backgroundColor: palette.primary, color: "#fff", border: "none",
              borderRadius: comp.button.borderRadius || system.spacing.radius.md,
            }}>
              Notify me at launch
            </button>
          </div>
        );
      case "update-required":
        return (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>⬆</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
              Update Required
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
              A new version of the application is available. Please update to continue
              using all features.
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              {progressBar(45)}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <button style={{
                padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                backgroundColor: palette.primary, color: "#fff", border: "none",
                borderRadius: comp.button.borderRadius || system.spacing.radius.md,
              }}>
                Update now
              </button>
              <button style={{
                padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                backgroundColor: "transparent", color: palette.textSecondary,
                border: `1px solid ${palette.border}`,
                borderRadius: comp.button.borderRadius || system.spacing.radius.md,
              }}>
                Release notes
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.section id="comp-maintenance" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Maintenance &amp; Status</p>
      <p style={sectionDesc}>
        Maintenance screens inform users when the application is unavailable, under development,
        or requires an update. They set expectations with countdowns, progress bars, and contact info.
      </p>

      {/* Variant Switcher */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {variants.map(v => (
          <button key={v.id} onClick={() => setActiveVariant(v.id)} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: activeVariant === v.id ? 600 : 400,
            cursor: "pointer",
            color: activeVariant === v.id ? palette.warning : palette.textSecondary,
            backgroundColor: activeVariant === v.id ? palette.warning + "10" : palette.surfaceMuted,
            border: `1px solid ${activeVariant === v.id ? palette.warning + "30" : palette.border}`,
            borderRadius: system.spacing.radius.md, fontFamily: system.typography.bodyFont,
          }}>
            {v.label}
          </button>
        ))}
      </div>
      <div style={previewBox}>{renderVariant()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use maintenance screens" description="Show these when the app is unavailable:" items={[
          "Planned downtime for server upgrades",
          "New features being built (under construction)",
          "Pre-launch landing pages (coming soon)",
          "App version is outdated and must be updated",
        ]} />
        <UsageSection palette={palette} title="Essential elements" description="Every maintenance page needs:" items={[
          "Clear explanation of why it's unavailable",
          "Expected timeline or countdown",
          "Contact info or status page link",
          "Alternative actions when possible",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show a countdown or expected return time so users know when to come back." },
        { type: "dont", text: "Don't leave users with no information. Always explain what's happening and when to expect resolution." },
        { type: "do", text: "Provide a way to get notified when the service is back (email signup, status page)." },
        { type: "dont", text: "Don't show maintenance screens for brief outages under 1 minute. Use a toast or banner instead." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Icon/Illustration", description: "Visual representing maintenance state", x: 50, y: 10 },
          { id: 2, label: "Title", description: "Main heading describing the status", x: 50, y: 30 },
          { id: 3, label: "Description", description: "Context about duration and reason", x: 50, y: 48 },
          { id: 4, label: "Countdown/Progress", description: "Timer or progress indicator", x: 50, y: 68 },
          { id: 5, label: "Contact/Action", description: "Links or buttons for next steps", x: 50, y: 88 },
        ]}
        renderPreview={(h) => (
          <div style={{ textAlign: "center", width: 220 }}>
            <div style={{
              fontSize: 26, marginBottom: 8,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>🔧</div>
            <div style={{
              fontSize: 14, fontWeight: 700, color: palette.textPrimary, marginBottom: 4,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Maintenance</div>
            <div style={{
              fontSize: 11, color: palette.textSecondary, marginBottom: 12, lineHeight: 1.4,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>We&apos;ll be back soon</div>
            <div style={{
              display: "flex", justifyContent: "center", gap: 8, marginBottom: 12,
              opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>
              {["02", "34", "12"].map((v, i) => (
                <div key={i} style={{
                  padding: "4px 8px", fontSize: 13, fontWeight: 700, fontFamily: "monospace",
                  backgroundColor: palette.surfaceMuted, borderRadius: 4, color: palette.textPrimary,
                }}>{v}</div>
              ))}
            </div>
            <div style={{
              fontSize: 10, color: palette.primary,
              opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Status page →</div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Icon Size", value: "36px" },
        { label: "Title Size", value: "20px / 700 weight" },
        { label: "Countdown Box", value: "56 × 56px" },
        { label: "Progress Bar Height", value: "6px" },
        { label: "Content Max Width", value: "400px" },
      ]} />
    </motion.section>
  );
}
