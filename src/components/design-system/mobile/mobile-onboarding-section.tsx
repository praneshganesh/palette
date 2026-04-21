"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface MobileOnboardingSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const onboardingSlides = [
  { color: "#6366F1", icon: "🎨", title: "Design with Ease", desc: "Create beautiful interfaces with our drag-and-drop builder. No code required." },
  { color: "#EC4899", icon: "🤝", title: "Collaborate Live", desc: "Work together in real-time with your team. Share, comment, and iterate fast." },
  { color: "#14B8A6", icon: "🚀", title: "Ship Faster", desc: "Export production-ready code and assets. Deploy in one click." },
  { color: "#F59E0B", icon: "📊", title: "Track Results", desc: "Built-in analytics to measure engagement and optimize user flows." },
];

export function MobileOnboardingSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: MobileOnboardingSectionProps) {
  const comp = system.components;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completed, setCompleted] = useState(false);
  const total = onboardingSlides.length;

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
    width: 300, height: 520, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
  };

  const slide = onboardingSlides[currentSlide];
  const isLast = currentSlide === total - 1;

  const goNext = () => {
    if (isLast) { setCompleted(true); } else { setCurrentSlide(currentSlide + 1); }
  };
  const goBack = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };
  const restart = () => { setCurrentSlide(0); setCompleted(false); };

  return (
    <motion.section id="comp-mobile-onboarding" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Mobile Onboarding</p>
      <p style={sectionDesc}>
        Swipeable onboarding screens introduce new users to key features with illustration areas, dot indicators, and skip/next actions for a smooth first-run experience.
      </p>

      <div style={subsectionLabel}>Interactive Onboarding Flow</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          {completed ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: palette.success + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 20 }}>✓</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: palette.textPrimary, marginBottom: 8 }}>All Set!</div>
              <div style={{ fontSize: 14, color: palette.textSecondary, textAlign: "center", marginBottom: 24 }}>You&apos;re ready to start. Let&apos;s build something amazing.</div>
              <button onClick={restart} style={{ padding: "12px 32px", backgroundColor: palette.primary, color: "#fff", border: "none", borderRadius: system.spacing.radius.md, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Get Started</button>
            </div>
          ) : (
            <>
              <div style={{ padding: "12px 16px", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => { setCurrentSlide(total - 1); }} style={{ fontSize: 13, fontWeight: 600, color: palette.textSecondary, backgroundColor: "transparent", border: "none", cursor: "pointer", padding: "4px 8px" }}>Skip</button>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px" }}>
                <div style={{ width: 120, height: 120, borderRadius: system.spacing.radius.xl, backgroundColor: slide.color + "15", border: `2px dashed ${slide.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, marginBottom: 32 }}>{slide.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: palette.textPrimary, marginBottom: 10, textAlign: "center" }}>{slide.title}</div>
                <div style={{ fontSize: 14, color: palette.textSecondary, textAlign: "center", lineHeight: 1.5 }}>{slide.desc}</div>
              </div>

              <div style={{ padding: "16px 24px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {onboardingSlides.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: i === currentSlide ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i === currentSlide ? palette.primary : i < currentSlide ? palette.primary + "60" : palette.border, border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, width: "100%" }}>
                  {currentSlide > 0 && (
                    <button onClick={goBack} style={{ flex: 1, padding: "14px 0", backgroundColor: "transparent", border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, fontSize: 15, fontWeight: 600, color: palette.textSecondary, cursor: "pointer" }}>Back</button>
                  )}
                  <button onClick={goNext} style={{ flex: 1, padding: "14px 0", backgroundColor: palette.primary, color: "#fff", border: "none", borderRadius: system.spacing.radius.md, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                    {isLast ? "Get Started" : "Next"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={subsectionLabel}>All Slides Overview</div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${total}, 1fr)`, gap: 12 }}>
        {onboardingSlides.map((s, i) => (
          <div key={i} onClick={() => { setCurrentSlide(i); setCompleted(false); }} style={{ ...previewBox, flexDirection: "column", alignItems: "center", gap: 10, padding: 16, cursor: "pointer", border: `1px solid ${currentSlide === i ? palette.primary : palette.border}` }}>
            <div style={{ width: 48, height: 48, borderRadius: system.spacing.radius.lg, backgroundColor: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{s.icon}</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: palette.textPrimary, textAlign: "center" }}>{s.title}</span>
            <span style={{ fontSize: 10, color: palette.textSecondary, textAlign: "center", lineHeight: 1.3 }}>{s.desc.slice(0, 50)}…</span>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use onboarding" description="First-run user introduction:" items={[
          "Explaining core features to first-time users",
          "Highlighting new features after an app update",
          "Guided setup for configuration-heavy products",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Keep it effective:" items={[
          "Limit to 3–5 slides — users get impatient beyond that",
          "Always provide a 'Skip' option — don't force completion",
          "Use illustrations, not walls of text — visual first",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Let users swipe between slides as well as tap Next — support both gestures." },
        { type: "dont", text: "Don't repeat onboarding on every app launch — show once, then offer in Settings." },
        { type: "do", text: "Make the last slide's CTA clear and action-oriented ('Get Started', not 'Done')." },
        { type: "dont", text: "Don't use onboarding to explain UI that should be self-evident." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Skip button", description: "Skips to the end or last slide", x: 90, y: 8 },
        { id: 2, label: "Illustration area", description: "Visual icon or image for the slide", x: 50, y: 30 },
        { id: 3, label: "Title & description", description: "Feature headline and explanation", x: 50, y: 55 },
        { id: 4, label: "Dot indicators", description: "Current position in the slide deck", x: 50, y: 75 },
        { id: 5, label: "Navigation buttons", description: "Back / Next / Get Started actions", x: 50, y: 88 },
      ]} renderPreview={(h) => (
        <div style={{ width: 160, height: 110, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 6px" }}>
            <span style={{ fontSize: 7, color: palette.textSecondary, opacity: h === 1 ? 1 : h === null ? 1 : 0.3 }}>Skip</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: onboardingSlides[0].color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>🎨</div>
            <div style={{ opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s", textAlign: "center" }}>
              <div style={{ height: 3, width: 50, backgroundColor: palette.textPrimary, borderRadius: 2, margin: "0 auto 3px", opacity: 0.5 }} />
              <div style={{ height: 2, width: 36, backgroundColor: palette.border, borderRadius: 2, margin: "0 auto" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 8px 6px" }}>
            <div style={{ display: "flex", gap: 3, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: i === 0 ? 12 : 4, height: 4, borderRadius: 2, backgroundColor: i === 0 ? palette.primary : palette.border }} />)}
            </div>
            <div style={{ width: "100%", height: 12, backgroundColor: palette.primary, borderRadius: 4, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }} />
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Recommended Slides", value: "3–5" },
        { label: "Illustration Area", value: "120×120px" },
        { label: "Title Font", value: "20–24px / 700" },
        { label: "Description Font", value: "14px / 400" },
        { label: "CTA Button Height", value: "48–52px" },
      ]} />
    </motion.section>
  );
}
