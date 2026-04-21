"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ImageViewerSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const images = [
  { color: "#6366F1", icon: "🏔️", label: "Mountains" },
  { color: "#EC4899", icon: "🌊", label: "Ocean" },
  { color: "#14B8A6", icon: "🌲", label: "Forest" },
  { color: "#F59E0B", icon: "🌅", label: "Sunset" },
  { color: "#8B5CF6", icon: "🏙️", label: "City" },
];

export function ImageViewerSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: ImageViewerSectionProps) {
  const comp = system.components;
  const [currentImage, setCurrentImage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewerOpen, setViewerOpen] = useState(true);

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
    width: 300, height: 480, backgroundColor: "#111",
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const goTo = (idx: number) => { setCurrentImage(Math.max(0, Math.min(images.length - 1, idx))); setZoomLevel(1); };

  const img = images[currentImage];

  return (
    <motion.section id="comp-image-viewer" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Image Viewer</p>
      <p style={sectionDesc}>
        A full-screen image viewer with pinch-to-zoom, swipe between images, close gesture, and a counter — built for immersive mobile photo browsing.
      </p>

      <div style={subsectionLabel}>Full-Screen Viewer</div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10, background: "linear-gradient(rgba(0,0,0,0.6), transparent)" }}>
            <button onClick={() => setViewerOpen(!viewerOpen)} style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{currentImage + 1} / {images.length}</span>
            <button style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>⋯</button>
          </div>

          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 220, height: 220, borderRadius: system.spacing.radius.lg, backgroundColor: img.color + "25", border: `2px solid ${img.color}40`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${zoomLevel})`, transition: "transform 0.3s" }}>
              <div style={{ fontSize: 64 }}>{img.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#ddd", marginTop: 8 }}>{img.label}</div>
            </div>
          </div>

          {currentImage > 0 && (
            <button onClick={() => goTo(currentImage - 1)} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", zIndex: 10 }}>‹</button>
          )}
          {currentImage < images.length - 1 && (
            <button onClick={() => goTo(currentImage + 1)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", zIndex: 10 }}>›</button>
          )}

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px", display: "flex", justifyContent: "center", gap: 6, background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === currentImage ? 20 : 6, height: 6, borderRadius: 3, backgroundColor: i === currentImage ? "#fff" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>Zoom Controls</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[1, 1.5, 2, 3].map(z => (
          <button key={z} onClick={() => setZoomLevel(z)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${zoomLevel === z ? palette.primary : palette.border}`, backgroundColor: zoomLevel === z ? palette.primary + "15" : palette.surface, color: zoomLevel === z ? palette.primary : palette.textSecondary, cursor: "pointer" }}>{z}×</button>
        ))}
      </div>

      <div style={subsectionLabel}>Thumbnail Strip</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", padding: 16 }}>
        {images.map((img, i) => (
          <div key={i} onClick={() => goTo(i)} style={{ width: 56, height: 56, borderRadius: system.spacing.radius.md, backgroundColor: img.color + "20", border: `2px solid ${currentImage === i ? palette.primary : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, cursor: "pointer", transition: "border-color 0.2s" }}>{img.icon}</div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use image viewer" description="Immersive image exploration:" items={[
          "Photo galleries with full-screen preview",
          "Product image zoom on e-commerce detail pages",
          "Document or receipt image inspection",
        ]} />
        <UsageSection palette={palette} title="Gesture support" description="Essential touch gestures:" items={[
          "Pinch — zoom in/out on the current image",
          "Swipe left/right — navigate between images",
          "Swipe down — dismiss the viewer and return",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show an image counter (1/5) so users know their position in the gallery." },
        { type: "dont", text: "Don't lock zoom to only 2× — allow smooth pinch between 1× and 4×." },
        { type: "do", text: "Use a dark background to minimize distraction and improve image contrast." },
        { type: "dont", text: "Don't hide the close button — it must be visible at all zoom levels." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Close button", description: "Dismisses the viewer overlay", x: 10, y: 10 },
        { id: 2, label: "Counter", description: "Current / total image count", x: 50, y: 10 },
        { id: 3, label: "Image area", description: "Zoomable, swipeable image container", x: 50, y: 50 },
        { id: 4, label: "Dot indicators", description: "Navigation dots at the bottom", x: 50, y: 90 },
      ]} renderPreview={(h) => (
        <div style={{ width: 180, height: 100, position: "relative", backgroundColor: "#1a1a1a", borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 4, left: 6, width: 12, height: 12, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#fff", opacity: h === 1 ? 1 : h === null ? 1 : 0.3 }}>✕</div>
          <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", fontSize: 8, color: "#fff", fontWeight: 600, opacity: h === 2 ? 1 : h === null ? 1 : 0.3 }}>1/5</div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <div style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: images[0].color + "30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🏔️</div>
          </div>
          <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 3, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: i === 0 ? 10 : 4, height: 4, borderRadius: 2, backgroundColor: i === 0 ? "#fff" : "rgba(255,255,255,0.3)" }} />)}
          </div>
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Max Zoom Level", value: "4×" },
        { label: "Close Button Size", value: "32×32px" },
        { label: "Counter Font", value: "13px / 600" },
        { label: "Swipe Threshold", value: "30% of image width" },
        { label: "Double-tap Zoom", value: "Toggle 1× ↔ 2×" },
      ]} />
    </motion.section>
  );
}
