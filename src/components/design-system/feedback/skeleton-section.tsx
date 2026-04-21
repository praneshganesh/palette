"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSSkeleton } from "./skeleton";
import type { SkeletonAnimation } from "./skeleton";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface SkeletonSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function SkeletonSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: SkeletonSectionProps) {
  const [animation, setAnimation] = useState<SkeletonAnimation>("pulse");

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
      id="comp-skeleton"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Skeleton</p>
      <p style={sectionDesc}>
        Skeleton screens provide a low-fidelity preview of content while it loads.
        They reduce perceived latency by showing the structure of the page before
        data arrives, maintaining spatial stability and preventing layout shift.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Base Color", value: "palette.border @ 50% opacity" },
          { label: "Shine Color", value: "palette.border @ 20% opacity" },
          { label: "Animation Duration", value: "1.5s" },
          { label: "Border Radius", value: "4px" },
        ]}
      />

      {/* ──── Animation Toggle ──── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {(["pulse", "wave"] as SkeletonAnimation[]).map((anim) => (
          <button
            key={anim}
            onClick={() => setAnimation(anim)}
            style={{
              padding: "7px 18px",
              fontSize: 12,
              fontWeight: 500,
              color: animation === anim ? palette.background : palette.textPrimary,
              backgroundColor: animation === anim ? palette.primary : palette.surface,
              border: `1px solid ${animation === anim ? palette.primary : palette.border}`,
              borderRadius: system.spacing.radius.md,
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all 0.15s",
            }}
          >
            {anim}
          </button>
        ))}
      </div>

      {/* ──── Text Lines ──── */}
      <div style={subsectionLabel}>Text Lines</div>
      <div style={previewBox}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>3 lines (default)</div>
            <DSSkeleton system={system} palette={palette} animation={animation} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>5 lines</div>
            <DSSkeleton system={system} palette={palette} animation={animation} lines={5} />
          </div>
        </div>
      </div>

      {/* ──── Shapes ──── */}
      <div style={subsectionLabel}>Shapes</div>
      <div style={previewBox}>
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <DSSkeleton system={system} palette={palette} variant="circle" height={48} animation={animation} />
            <div style={{ fontSize: 10, color: palette.textSecondary }}>Circle (48px)</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <DSSkeleton system={system} palette={palette} variant="circle" height={64} animation={animation} />
            <div style={{ fontSize: 10, color: palette.textSecondary }}>Circle (64px)</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 200 }}>
            <DSSkeleton system={system} palette={palette} variant="rectangle" height={80} animation={animation} />
            <div style={{ fontSize: 10, color: palette.textSecondary }}>Rectangle</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 160 }}>
            <DSSkeleton system={system} palette={palette} variant="rectangle" height={40} animation={animation} />
            <div style={{ fontSize: 10, color: palette.textSecondary }}>Rectangle (short)</div>
          </div>
        </div>
      </div>

      {/* ──── Card Skeleton ──── */}
      <div style={subsectionLabel}>Card Skeleton</div>
      <div style={previewBox}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <DSSkeleton system={system} palette={palette} variant="card" animation={animation} />
          <DSSkeleton system={system} palette={palette} variant="card" animation={animation} />
          <DSSkeleton system={system} palette={palette} variant="card" animation={animation} />
        </div>
      </div>

      {/* ──── Composite Patterns ──── */}
      <div style={subsectionLabel}>Composite Patterns</div>
      <div style={previewBox}>
        <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, marginBottom: 16 }}>List item skeleton</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <DSSkeleton system={system} palette={palette} variant="circle" height={40} animation={animation} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <DSSkeleton system={system} palette={palette} variant="rectangle" height={12} width="60%" animation={animation} />
                <DSSkeleton system={system} palette={palette} variant="rectangle" height={10} width="40%" animation={animation} />
              </div>
              <DSSkeleton system={system} palette={palette} variant="rectangle" height={28} width={60} animation={animation} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...previewBox, marginTop: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, marginBottom: 16 }}>Dashboard KPI skeleton</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                padding: 16,
                border: `1px solid ${palette.border}40`,
                borderRadius: system.spacing.radius.md,
              }}
            >
              <DSSkeleton system={system} palette={palette} variant="rectangle" height={10} width="50%" animation={animation} />
              <div style={{ marginTop: 12 }}>
                <DSSkeleton system={system} palette={palette} variant="rectangle" height={24} width="70%" animation={animation} />
              </div>
              <div style={{ marginTop: 8 }}>
                <DSSkeleton system={system} palette={palette} variant="rectangle" height={8} width="40%" animation={animation} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ──── Side-by-Side Comparison ──── */}
      <div style={subsectionLabel}>Loaded vs Skeleton</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={previewBox}>
          <div style={{ fontSize: 11, fontWeight: 600, color: palette.primary, marginBottom: 12, textTransform: "uppercase", letterSpacing: "1px" }}>
            Loading
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <DSSkeleton system={system} palette={palette} variant="circle" height={44} animation={animation} />
            <div style={{ flex: 1 }}>
              <DSSkeleton system={system} palette={palette} variant="rectangle" height={14} width="70%" animation={animation} />
              <div style={{ marginTop: 6 }}>
                <DSSkeleton system={system} palette={palette} variant="rectangle" height={10} width="45%" animation={animation} />
              </div>
            </div>
          </div>
        </div>
        <div style={previewBox}>
          <div style={{ fontSize: 11, fontWeight: 600, color: palette.success, marginBottom: 12, textTransform: "uppercase", letterSpacing: "1px" }}>
            Loaded
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: palette.primary + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: palette.primary }}>
              {content.orgName.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{content.orgName}</div>
              <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 2 }}>{content.orgSubtitle}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ──── Usage ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use skeletons"
          description="Skeleton screens improve perceived performance:"
          items={[
            "Initial page loads with significant content",
            "Data-driven lists and tables",
            "Card grids and media galleries",
            "User profiles and dashboards",
            "Any view where layout is predictable before data arrives",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Pulse vs Wave"
          description="Choose the animation style that fits your brand:"
          items={[
            "Pulse — Subtle opacity fade, calmer and minimal",
            "Wave — Shimmer sweep, more dynamic and modern",
            "Pulse — Works well with minimal/professional themes",
            "Wave — Common in consumer apps and dashboards",
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
            text: "Match skeleton shapes to the actual content layout. Use circles for avatars, rectangles for text.",
          },
          {
            type: "dont",
            text: "Don't use a single generic skeleton for everything. Match the specific UI being loaded.",
          },
          {
            type: "do",
            text: "Transition smoothly from skeleton to loaded content. Avoid jarring layout shifts.",
          },
          {
            type: "dont",
            text: "Don't show skeletons for content that loads in under 300ms. A brief delay feels natural.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Placeholder shape", description: "Mimics the dimensions of the actual content element", x: 10, y: 50 },
          { id: 2, label: "Animation", description: "Pulse (opacity) or wave (shimmer) effect", x: 50, y: 20 },
          { id: 3, label: "Container", description: "Grouping that matches the final component layout", x: 85, y: 80 },
        ]}
        renderPreview={(highlighted) => (
          <div
            style={{
              width: 300,
              padding: 16,
              border: `1px solid ${palette.border}40`,
              borderRadius: system.spacing.radius.md,
              opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.8,
              transition: "opacity 0.2s",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: palette.border + "50",
                  opacity: highlighted === 1 ? 1 : highlighted === null ? 0.7 : 0.3,
                  transition: "opacity 0.2s",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    width: "70%",
                    height: 12,
                    borderRadius: 4,
                    backgroundColor: palette.border + "50",
                    marginBottom: 6,
                    opacity: highlighted === 1 || highlighted === 2 ? 1 : highlighted === null ? 0.7 : 0.3,
                    transition: "opacity 0.2s",
                  }}
                />
                <div
                  style={{
                    width: "45%",
                    height: 10,
                    borderRadius: 4,
                    backgroundColor: palette.border + "40",
                    opacity: highlighted === 1 || highlighted === 2 ? 1 : highlighted === null ? 0.7 : 0.3,
                    transition: "opacity 0.2s",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Text Line Height", value: "12px" },
          { label: "Circle (SM)", value: "40px" },
          { label: "Circle (MD)", value: "48px" },
          { label: "Circle (LG)", value: "64px" },
          { label: "Card Skeleton Width", value: "100%" },
          { label: "Card Skeleton Height", value: "160px" },
        ]}
      />
    </motion.section>
  );
}
