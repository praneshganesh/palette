"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSProgress } from "./progress";
import type { ProgressSize } from "./progress";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface ProgressSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function ProgressSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ProgressSectionProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAnimatedValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 60);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: 12,
    padding: 24,
  };

  return (
    <motion.section
      id="comp-progress"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Progress</p>
      <p style={sectionDesc}>
        Progress indicators show the status of ongoing processes. They reduce uncertainty
        by communicating that the system is working and approximately how long the user
        should expect to wait.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Track Color", value: "palette.border @ 60% opacity" },
          { label: "Fill Color", value: "palette.primary" },
          { label: "Height (Default)", value: "6px" },
        ]}
      />

      {/* ──── Linear Determinate ──── */}
      <div style={subsectionLabel}>Linear — Determinate</div>
      <div style={previewBox}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <DSProgress system={system} palette={palette} value={animatedValue} showLabel />
          <DSProgress system={system} palette={palette} value={25} showLabel />
          <DSProgress system={system} palette={palette} value={50} showLabel />
          <DSProgress system={system} palette={palette} value={75} showLabel />
          <DSProgress system={system} palette={palette} value={100} showLabel />
        </div>
      </div>

      {/* ──── Linear Indeterminate ──── */}
      <div style={subsectionLabel}>Linear — Indeterminate</div>
      <div style={previewBox}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <DSProgress system={system} palette={palette} indeterminate />
          <DSProgress system={system} palette={palette} indeterminate color={palette.success} />
          <DSProgress system={system} palette={palette} indeterminate color={palette.warning} />
        </div>
      </div>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={previewBox}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {(["sm", "md", "lg"] as ProgressSize[]).map((sz) => (
            <div key={sz}>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8, textTransform: "uppercase" }}>{sz}</div>
              <DSProgress system={system} palette={palette} value={65} size={sz} />
            </div>
          ))}
        </div>
      </div>

      {/* ──── Colors ──── */}
      <div style={subsectionLabel}>Colors</div>
      <div style={previewBox}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Primary", color: palette.primary },
            { label: "Success", color: palette.success },
            { label: "Warning", color: palette.warning },
            { label: "Danger", color: palette.danger },
            { label: "Info", color: palette.info },
          ].map(({ label, color }) => (
            <div key={label}>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6 }}>{label}</div>
              <DSProgress system={system} palette={palette} value={60} color={color} />
            </div>
          ))}
        </div>
      </div>

      {/* ──── Circular ──── */}
      <div style={subsectionLabel}>Circular — Determinate</div>
      <div style={previewBox}>
        <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          {(["sm", "md", "lg"] as ProgressSize[]).map((sz) => (
            <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <DSProgress system={system} palette={palette} variant="circular" value={animatedValue} size={sz} showLabel />
              <div style={{ fontSize: 10, color: palette.textSecondary, textTransform: "uppercase" }}>{sz}</div>
            </div>
          ))}
          <div style={{ width: 1, height: 60, backgroundColor: palette.border }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <DSProgress system={system} palette={palette} variant="circular" value={25} size="lg" showLabel color={palette.danger} />
            <div style={{ fontSize: 10, color: palette.textSecondary }}>25%</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <DSProgress system={system} palette={palette} variant="circular" value={75} size="lg" showLabel color={palette.success} />
            <div style={{ fontSize: 10, color: palette.textSecondary }}>75%</div>
          </div>
        </div>
      </div>

      {/* ──── Circular Indeterminate ──── */}
      <div style={subsectionLabel}>Circular — Indeterminate</div>
      <div style={previewBox}>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {(["sm", "md", "lg"] as ProgressSize[]).map((sz) => (
            <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <DSProgress system={system} palette={palette} variant="circular" indeterminate size={sz} />
              <div style={{ fontSize: 10, color: palette.textSecondary, textTransform: "uppercase" }}>{sz}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div style={previewBox}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>
            {content.formFields.projectTitle || "Project"} Progress
          </div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 16 }}>
            Track completion across all categories
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {content.progressItems.map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: palette.textPrimary, fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: palette.textSecondary }}>{item.value}%</span>
                </div>
                <DSProgress
                  system={system}
                  palette={palette}
                  value={item.value}
                  size="sm"
                  color={item.value >= 80 ? palette.success : item.value >= 50 ? palette.primary : palette.warning}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ──── Usage ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use progress indicators"
          description="Progress indicators reduce perceived wait time:"
          items={[
            "File uploads and downloads",
            "Multi-step form completion",
            "Data processing and loading states",
            "Onboarding and setup wizards",
            "Skill levels and completion rates",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Linear vs Circular"
          description="Choose the right variant for the context:"
          items={[
            "Linear — Best for page-level or section loading bars",
            "Circular — Compact, works well inline or in cards",
            "Determinate — When you know the exact progress",
            "Indeterminate — When duration is unknown",
          ]}
        />
      </div>

      {/* ──── Do's and Don'ts ──── */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines
        palette={palette}
        items={[
          {
            type: "do",
            text: "Use determinate progress when you can calculate a percentage. It reduces user anxiety.",
          },
          {
            type: "dont",
            text: "Don't show a progress bar that never reaches 100% or jumps backwards. That erodes trust.",
          },
          {
            type: "do",
            text: "Pair progress bars with a text label or percentage for accessibility and clarity.",
          },
          {
            type: "dont",
            text: "Don't use a spinner when a progress bar would be more informative. Choose the right tool.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Track", description: "The background bar showing total possible progress", x: 10, y: 85 },
          { id: 2, label: "Indicator", description: "The filled portion representing current progress", x: 30, y: 30 },
          { id: 3, label: "Label (optional)", description: "Text showing percentage or status", x: 80, y: 30 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ width: 300, padding: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{
                fontSize: 11, color: palette.textSecondary,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                Progress
              </span>
              <span style={{
                fontSize: 11, fontWeight: 600, color: palette.textPrimary,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                65%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 10,
                backgroundColor: palette.border + "60",
                borderRadius: system.spacing.radius.full,
                overflow: "hidden",
                opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.5,
                transition: "opacity 0.2s",
              }}
            >
              <div
                style={{
                  width: "65%",
                  height: "100%",
                  backgroundColor: palette.primary,
                  borderRadius: system.spacing.radius.full,
                  opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }}
              />
            </div>
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Linear Height (SM)", value: "4px" },
          { label: "Linear Height (MD)", value: "6px" },
          { label: "Linear Height (LG)", value: "8px" },
          { label: "Circular Size (SM)", value: "32px" },
          { label: "Circular Size (MD)", value: "48px" },
          { label: "Circular Size (LG)", value: "64px" },
          { label: "Label Font Size", value: "11px" },
        ]}
      />
    </motion.section>
  );
}
