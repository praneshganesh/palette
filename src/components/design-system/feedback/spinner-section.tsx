"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface SpinnerSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type SpinnerSize = "sm" | "md" | "lg" | "xl";

export function SpinnerSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: SpinnerSectionProps) {
  const comp = system.components;
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeSize, setActiveSize] = useState<SpinnerSize>("md");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const sizes: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 36, xl: 48 };
  const borderWidths: Record<SpinnerSize, number> = { sm: 2, md: 3, lg: 4, xl: 5 };

  const circleSpinner = (size: SpinnerSize, color = palette.primary) => (
    <div style={{
      width: sizes[size], height: sizes[size],
      border: `${borderWidths[size]}px solid ${color}20`,
      borderTop: `${borderWidths[size]}px solid ${color}`,
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
  );

  const dotsSpinner = (size: SpinnerSize, color = palette.primary) => {
    const dotSize = Math.max(sizes[size] / 4, 4);
    return (
      <div style={{ display: "flex", gap: dotSize * 0.6, alignItems: "center" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: dotSize, height: dotSize, borderRadius: "50%",
            backgroundColor: color,
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    );
  };

  const pulseSpinner = (size: SpinnerSize, color = palette.primary) => (
    <div style={{
      width: sizes[size], height: sizes[size], borderRadius: "50%",
      backgroundColor: color + "30",
      animation: "pulseScale 1.5s ease-in-out infinite",
    }} />
  );

  const barSpinner = (size: SpinnerSize, color = palette.primary) => (
    <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: sizes[size] }}>
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: Math.max(sizes[size] / 6, 3),
          backgroundColor: color,
          borderRadius: 2,
          animation: `barBounce 1s ease-in-out ${i * 0.1}s infinite`,
          height: "60%",
        }} />
      ))}
    </div>
  );

  const skeletonShimmer = () => (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { width: "40%", height: 14 },
        { width: "100%", height: 10 },
        { width: "80%", height: 10 },
        { width: "60%", height: 10 },
      ].map((line, i) => (
        <div key={i} style={{
          width: line.width, height: line.height,
          backgroundColor: palette.surfaceMuted, borderRadius: 4,
          animation: "shimmer 1.5s ease-in-out infinite",
          opacity: 0.7,
        }} />
      ))}
    </div>
  );

  const brandSpinner = (size: SpinnerSize) => (
    <div style={{
      width: sizes[size], height: sizes[size], position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        border: `${borderWidths[size]}px solid ${palette.primary}15`,
        borderTop: `${borderWidths[size]}px solid ${palette.primary}`,
        borderRight: `${borderWidths[size]}px solid ${palette.secondary}`,
        animation: "spin 1s linear infinite",
        position: "absolute",
      }} />
      <div style={{
        width: sizes[size] * 0.4, height: sizes[size] * 0.4, borderRadius: "50%",
        backgroundColor: palette.primary, animation: "pulseScale 1.5s ease-in-out infinite",
      }} />
    </div>
  );

  const keyframes = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }
    @keyframes pulseScale { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.3); opacity: 1; } }
    @keyframes barBounce { 0%, 100% { height: 30%; } 50% { height: 100%; } }
    @keyframes shimmer { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
  `;

  return (
    <motion.section id="comp-spinner" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <style>{keyframes}</style>
      <div style={accentBar} />
      <p style={sectionTitle}>Spinners &amp; Loaders</p>
      <p style={sectionDesc}>
        Spinners indicate that content is loading or processing. Multiple visual styles and sizes
        allow matching the loading indicator to the context and brand.
      </p>

      {/* Circle Spinner */}
      <div style={subsectionLabel}>Circle Spinner</div>
      <div style={{ ...previewBox, display: "flex", alignItems: "center", gap: 32 }}>
        {(["sm", "md", "lg", "xl"] as SpinnerSize[]).map(size => (
          <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {circleSpinner(size)}
            <span style={{ fontSize: 11, color: palette.textSecondary }}>{size}</span>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={subsectionLabel}>Dots</div>
      <div style={{ ...previewBox, display: "flex", alignItems: "center", gap: 32 }}>
        {(["sm", "md", "lg", "xl"] as SpinnerSize[]).map(size => (
          <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {dotsSpinner(size)}
            <span style={{ fontSize: 11, color: palette.textSecondary }}>{size}</span>
          </div>
        ))}
      </div>

      {/* Pulse */}
      <div style={subsectionLabel}>Pulse</div>
      <div style={{ ...previewBox, display: "flex", alignItems: "center", gap: 32 }}>
        {(["sm", "md", "lg"] as SpinnerSize[]).map(size => (
          <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {pulseSpinner(size)}
            <span style={{ fontSize: 11, color: palette.textSecondary }}>{size}</span>
          </div>
        ))}
      </div>

      {/* Bar */}
      <div style={subsectionLabel}>Bar</div>
      <div style={{ ...previewBox, display: "flex", alignItems: "center", gap: 32 }}>
        {(["sm", "md", "lg"] as SpinnerSize[]).map(size => (
          <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {barSpinner(size)}
            <span style={{ fontSize: 11, color: palette.textSecondary }}>{size}</span>
          </div>
        ))}
      </div>

      {/* Skeleton Shimmer */}
      <div style={subsectionLabel}>Skeleton Shimmer</div>
      <div style={{ ...previewBox, maxWidth: 400 }}>
        {skeletonShimmer()}
      </div>

      {/* Brand Animated */}
      <div style={subsectionLabel}>Brand Animated</div>
      <div style={{ ...previewBox, display: "flex", alignItems: "center", gap: 32 }}>
        {(["md", "lg", "xl"] as SpinnerSize[]).map(size => (
          <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {brandSpinner(size)}
            <span style={{ fontSize: 11, color: palette.textSecondary }}>{size}</span>
          </div>
        ))}
      </div>

      {/* With Label */}
      <div style={subsectionLabel}>With Label</div>
      <div style={{ ...previewBox, display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {circleSpinner("md")}
          <span style={{ fontSize: 13, color: palette.textSecondary }}>Loading...</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          {circleSpinner("lg")}
          <span style={{ fontSize: 12, color: palette.textSecondary }}>Please wait</span>
        </div>
      </div>

      {/* Overlay */}
      <div style={subsectionLabel}>Overlay (Full-Page)</div>
      <div style={{ ...previewBox, position: "relative", minHeight: 200 }}>
        <button onClick={() => { setShowOverlay(true); setTimeout(() => setShowOverlay(false), 2000); }} style={{
          padding: `${comp.button.paddingY || "8px"} ${comp.button.paddingX || "16px"}`,
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          backgroundColor: palette.primary, color: "#fff", border: "none",
          borderRadius: comp.button.borderRadius || system.spacing.radius.md,
        }}>
          Show overlay (2s)
        </button>
        <div style={{ marginTop: 12, fontSize: 12, color: palette.textSecondary }}>
          Sample content that will be covered by the loading overlay.
        </div>
        {showOverlay && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: system.spacing.radius.lg,
            backgroundColor: palette.background + "e0",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
            zIndex: 10,
          }}>
            {circleSpinner("xl")}
            <span style={{ fontSize: 13, color: palette.textSecondary }}>Loading content...</span>
          </div>
        )}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use" description="Use loading indicators when:" items={[
          "Data is being fetched from an API",
          "A file is uploading or processing",
          "A page or section is loading",
          "An action takes more than 300ms to complete",
        ]} />
        <UsageSection palette={palette} title="Choosing a variant" description="Match the spinner to the context:" items={[
          "Circle — Default for most loading states",
          "Dots — Inline loading, chat typing indicators",
          "Skeleton — Replacing content layout during load",
          "Overlay — Blocking the full page during critical operations",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use skeleton loaders for predictable content layouts. They feel faster than spinners." },
        { type: "dont", text: "Don't show a spinner for actions that complete in under 300ms. The flash is distracting." },
        { type: "do", text: "Add a label when the wait might be long, so users know what's happening." },
        { type: "dont", text: "Don't stack multiple spinners in the same view. One loading indicator is enough." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Track", description: "Background circle or container", x: 25, y: 20 },
          { id: 2, label: "Indicator", description: "Animated element (arc, dot, bar)", x: 60, y: 20 },
          { id: 3, label: "Label (optional)", description: "Text description of the loading state", x: 50, y: 75 },
        ]}
        renderPreview={(h) => (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 36, height: 36 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: `3px solid ${palette.primary}20`,
                opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }} />
              <div style={{
                position: "absolute", top: 0, left: 0, width: 36, height: 36, borderRadius: "50%",
                border: `3px solid transparent`,
                borderTop: `3px solid ${palette.primary}`,
                animation: "spin 0.8s linear infinite",
                opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }} />
            </div>
            <span style={{
              fontSize: 12, color: palette.textSecondary,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Loading...</span>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Small (sm)", value: "16px" },
        { label: "Medium (md)", value: "24px" },
        { label: "Large (lg)", value: "36px" },
        { label: "Extra Large (xl)", value: "48px" },
        { label: "Border Width", value: "2–5px (scales with size)" },
      ]} />
    </motion.section>
  );
}
