"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface SwipeCarouselSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const slides = [
  { color: "#6366F1", icon: "📱", title: "Smart Layouts", desc: "Adaptive design for every screen" },
  { color: "#EC4899", icon: "🎨", title: "Rich Themes", desc: "Beautiful palettes out of the box" },
  { color: "#14B8A6", icon: "⚡", title: "Fast Rendering", desc: "Optimized for 60fps interactions" },
  { color: "#F59E0B", icon: "🔒", title: "Secure by Default", desc: "Built-in auth and encryption" },
  { color: "#8B5CF6", icon: "📊", title: "Analytics", desc: "Real-time insights dashboard" },
];

export function SwipeCarouselSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: SwipeCarouselSectionProps) {
  const comp = system.components;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [peekMode, setPeekMode] = useState(true);

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
    width: 300, height: 420, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
  };

  const goTo = (idx: number) => setCurrentSlide(Math.max(0, Math.min(slides.length - 1, idx)));

  const renderCarousel = (showPeek: boolean) => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1)", transform: `translateX(-${currentSlide * (showPeek ? 82 : 100)}%)`, height: "100%" }}>
          {slides.map((slide, i) => (
            <div key={i} style={{ minWidth: showPeek ? "82%" : "100%", marginRight: showPeek ? "3%" : 0, padding: showPeek ? "16px 0 16px 16px" : 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: system.spacing.radius.lg, backgroundColor: slide.color + "15", border: `1px solid ${slide.color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, transition: "transform 0.3s", transform: i === currentSlide ? "scale(1)" : "scale(0.95)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{slide.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 6 }}>{slide.title}</div>
                <div style={{ fontSize: 13, color: palette.textSecondary, textAlign: "center" }}>{slide.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {currentSlide > 0 && (
          <button onClick={() => goTo(currentSlide - 1)} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: palette.textSecondary, boxShadow: system.spacing.elevation.sm }}>‹</button>
        )}
        {currentSlide < slides.length - 1 && (
          <button onClick={() => goTo(currentSlide + 1)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: palette.textSecondary, boxShadow: system.spacing.elevation.sm }}>›</button>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "12px 0 20px" }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: i === currentSlide ? 20 : 6, height: 6, borderRadius: 3, backgroundColor: i === currentSlide ? palette.primary : palette.border, border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );

  return (
    <motion.section id="comp-swipe-carousel" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Swipe Carousel</p>
      <p style={sectionDesc}>
        Touch-friendly carousels with smooth swiping, optional peek-next-slide visibility, dot indicators, and lightweight prev/next controls for mobile browsing.
      </p>

      <div style={subsectionLabel}>Carousel with Peek</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setPeekMode(true)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${peekMode ? palette.primary : palette.border}`, backgroundColor: peekMode ? palette.primary + "15" : palette.surface, color: peekMode ? palette.primary : palette.textSecondary, cursor: "pointer" }}>Peek Next Slide</button>
        <button onClick={() => setPeekMode(false)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${!peekMode ? palette.primary : palette.border}`, backgroundColor: !peekMode ? palette.primary + "15" : palette.surface, color: !peekMode ? palette.primary : palette.textSecondary, cursor: "pointer" }}>Full Width</button>
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${palette.border}`, fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>Featured</div>
          {renderCarousel(peekMode)}
        </div>
      </div>

      <div style={subsectionLabel}>Slide Navigation</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
        {slides.map((s, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ padding: "6px 14px", fontSize: 11, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${currentSlide === i ? s.color : palette.border}`, backgroundColor: currentSlide === i ? s.color + "15" : palette.surface, color: currentSlide === i ? s.color : palette.textSecondary, cursor: "pointer" }}>{s.title}</button>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use carousels" description="Horizontal content browsing:" items={[
          "Featured content or promotional banners",
          "Product image galleries on detail pages",
          "Onboarding or intro slides",
        ]} />
        <UsageSection palette={palette} title="Peek vs. full width" description="Choose the right mode:" items={[
          "Peek — hints at more content, encourages swiping",
          "Full width — immersive single-slide focus",
          "Auto-play — only for passive browsing, never forms",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Always show dot indicators or a counter so users know the total slide count." },
        { type: "dont", text: "Don't auto-rotate carousels faster than 5 seconds — users can't read content." },
        { type: "do", text: "Peek the next slide by 15–20% to signal that swiping is possible." },
        { type: "dont", text: "Don't use carousels for critical information — many users never swipe past slide 1." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Slide container", description: "Horizontally scrolling track", x: 50, y: 40 },
        { id: 2, label: "Active slide", description: "Currently visible full-size card", x: 40, y: 40 },
        { id: 3, label: "Peek area", description: "Partial next slide visible on edge", x: 90, y: 40 },
        { id: 4, label: "Dot indicators", description: "Progress dots below the carousel", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, height: 90, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, display: "flex", padding: 6, gap: 4, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <div style={{ flex: "0 0 78%", borderRadius: system.spacing.radius.sm, backgroundColor: slides[0].color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, opacity: h === 2 ? 1 : h === null ? 1 : 0.4, transition: "opacity 0.2s" }}>{slides[0].icon}</div>
            <div style={{ flex: "0 0 18%", borderRadius: system.spacing.radius.sm, backgroundColor: slides[1].color + "15", opacity: h === 3 ? 1 : h === null ? 0.6 : 0.2, transition: "opacity 0.2s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 3, padding: "4px 0 6px", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: i === 0 ? 12 : 4, height: 4, borderRadius: 2, backgroundColor: i === 0 ? palette.primary : palette.border }} />)}
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Slide Gap", value: "8–16px" },
        { label: "Peek Width", value: "15–20% of viewport" },
        { label: "Dot Size (inactive)", value: "6px" },
        { label: "Dot Size (active width)", value: "18–24px" },
        { label: "Swipe Threshold", value: "30% of slide width" },
      ]} />
    </motion.section>
  );
}
