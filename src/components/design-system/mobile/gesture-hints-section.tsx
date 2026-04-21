"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface GestureHintsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type GestureType = "swipe" | "tap" | "pinch" | "long-press";

const gestures: { type: GestureType; icon: string; label: string; desc: string; animation: string }[] = [
  { type: "swipe", icon: "👆", label: "Swipe", desc: "Slide left or right to navigate", animation: "← →" },
  { type: "tap", icon: "👇", label: "Tap", desc: "Tap to select or activate", animation: "●" },
  { type: "pinch", icon: "🤏", label: "Pinch", desc: "Pinch to zoom in or out", animation: "↔" },
  { type: "long-press", icon: "✊", label: "Long Press", desc: "Hold to reveal options", animation: "◉" },
];

export function GestureHintsSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: GestureHintsSectionProps) {
  const comp = system.components;
  const [activeGesture, setActiveGesture] = useState<GestureType>("swipe");
  const [showOverlay, setShowOverlay] = useState(true);
  const [animating, setAnimating] = useState(false);

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
    width: 300, height: 460, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const playAnimation = () => { setAnimating(true); setTimeout(() => setAnimating(false), 1500); };

  const currentGesture = gestures.find(g => g.type === activeGesture)!;

  const renderHintOverlay = () => (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.65)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        {activeGesture === "swipe" && (
          <div style={{ position: "relative", width: 40, height: 40 }}>
            <div style={{ position: "absolute", width: 20, height: 20, borderRadius: "50%", backgroundColor: "#fff", top: 10, left: animating ? 20 : 0, transition: "left 0.8s ease-in-out", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }} />
          </div>
        )}
        {activeGesture === "tap" && (
          <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#fff", transform: animating ? "scale(0.8)" : "scale(1)", transition: "transform 0.15s", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
            {animating && <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)" }} />}
          </div>
        )}
        {activeGesture === "pinch" && (
          <div style={{ display: "flex", gap: animating ? 24 : 4, transition: "gap 0.8s ease-in-out" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }} />
          </div>
        )}
        {activeGesture === "long-press" && (
          <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#fff", boxShadow: animating ? "0 0 0 12px rgba(255,255,255,0.2)" : "0 2px 8px rgba(0,0,0,0.3)", transition: "box-shadow 0.6s" }} />
        )}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{currentGesture.label}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textAlign: "center", maxWidth: 200 }}>{currentGesture.desc}</div>
      <button onClick={() => setShowOverlay(false)} style={{ marginTop: 24, padding: "8px 24px", backgroundColor: "rgba(255,255,255,0.15)", border: `1px solid rgba(255,255,255,0.3)`, borderRadius: system.spacing.radius.md, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Got it</button>
    </div>
  );

  const renderTooltipGuide = () => (
    <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", backgroundColor: palette.textPrimary, color: palette.background, padding: "10px 16px", borderRadius: system.spacing.radius.md, fontSize: 12, fontWeight: 600, zIndex: 15, whiteSpace: "nowrap", boxShadow: system.spacing.elevation.lg }}>
      {currentGesture.desc}
      <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 12, height: 12, backgroundColor: palette.textPrimary }} />
    </div>
  );

  return (
    <motion.section id="comp-gesture-hint" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Gesture Hints</p>
      <p style={sectionDesc}>
        Animated gesture hints teach users swipe, tap, pinch, and long-press interactions through overlay guides, tooltip callouts, and first-time-use animations.
      </p>

      <div style={subsectionLabel}>Gesture Types</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {gestures.map(g => (
          <button key={g.type} onClick={() => { setActiveGesture(g.type); setShowOverlay(true); }} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${activeGesture === g.type ? palette.primary : palette.border}`, backgroundColor: activeGesture === g.type ? palette.primary + "15" : palette.surface, color: activeGesture === g.type ? palette.primary : palette.textSecondary, cursor: "pointer" }}>{g.icon} {g.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={playAnimation} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.primary}`, backgroundColor: palette.primary + "15", color: palette.primary, cursor: "pointer" }}>▶ Play Animation</button>
        <button onClick={() => setShowOverlay(!showOverlay)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textSecondary, cursor: "pointer" }}>{showOverlay ? "Hide" : "Show"} Overlay</button>
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: 20, paddingTop: 40, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 24 }}>App content behind the hint</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ height: 80, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: palette.textSecondary }}>Item {i + 1}</div>
              ))}
            </div>
          </div>
          {showOverlay && renderHintOverlay()}
          {!showOverlay && renderTooltipGuide()}
        </div>
      </div>

      <div style={subsectionLabel}>All Gesture Icons</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {gestures.map(g => (
          <div key={g.type} style={{ ...previewBox, flexDirection: "column", alignItems: "center", gap: 8, padding: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: palette.primary + "10", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{g.icon}</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary }}>{g.label}</span>
            <span style={{ fontSize: 10, color: palette.textSecondary, textAlign: "center" }}>{g.desc}</span>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use gesture hints" description="Teaching non-obvious interactions:" items={[
          "First-time use of swipe, pinch, or drag gestures",
          "Complex gesture-heavy interfaces (maps, image editors)",
          "Onboarding new users to navigation patterns",
        ]} />
        <UsageSection palette={palette} title="Hint formats" description="Choose the right format:" items={[
          "Overlay — full-screen dim with animated hand gesture",
          "Tooltip — contextual callout near the gesture target",
          "Inline animation — subtle hint embedded in the UI",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show gesture hints only once per user — persist dismissal in local storage." },
        { type: "dont", text: "Don't interrupt users mid-task with gesture hints — show them on first idle." },
        { type: "do", text: "Animate the gesture clearly — a moving finger icon is better than a static arrow." },
        { type: "dont", text: "Don't show more than one gesture hint at a time — it overwhelms new users." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Scrim overlay", description: "Semi-transparent background dimming", x: 50, y: 50 },
        { id: 2, label: "Gesture animation", description: "Moving hand/finger icon", x: 50, y: 35 },
        { id: 3, label: "Label text", description: "Gesture name and description", x: 50, y: 65 },
        { id: 4, label: "Dismiss button", description: "'Got it' or skip action", x: 50, y: 82 },
      ]} renderPreview={(h) => (
        <div style={{ width: 160, height: 100, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", opacity: h === 1 ? 1 : h === null ? 0.6 : 0.2, transition: "opacity 0.2s" }} />
          <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.8)", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }} />
          <div style={{ position: "absolute", top: "55%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ height: 3, width: 40, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: 2, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }} />
            <div style={{ height: 2, width: 28, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 2, opacity: h === 3 ? 1 : h === null ? 1 : 0.3 }} />
          </div>
          <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", padding: "2px 8px", borderRadius: 4, backgroundColor: "rgba(255,255,255,0.15)", fontSize: 7, color: "rgba(255,255,255,0.7)", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>Got it</div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Overlay Opacity", value: "60–70%" },
        { label: "Gesture Icon Size", value: "64–80px" },
        { label: "Animation Duration", value: "1–2 seconds (loop)" },
        { label: "Dismiss Button Padding", value: "8–12px × 20–24px" },
        { label: "Label Font", value: "13–18px / 600–700" },
      ]} />
    </motion.section>
  );
}
