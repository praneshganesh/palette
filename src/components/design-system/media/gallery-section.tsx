"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface GallerySectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type GalleryItem = { id: number; color: string; caption: string; aspect: number };

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function GallerySection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: GallerySectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const items: GalleryItem[] = [
    { id: 1, color: palette.primary, caption: "Brand identity concept", aspect: 1.2 },
    { id: 2, color: palette.secondary, caption: "Dashboard wireframe", aspect: 0.8 },
    { id: 3, color: palette.info, caption: "Mobile app mockup", aspect: 1.5 },
    { id: 4, color: palette.success, caption: "Icon set preview", aspect: 1 },
    { id: 5, color: palette.warning, caption: "Typography specimen", aspect: 0.7 },
    { id: 6, color: palette.danger, caption: "Color palette export", aspect: 1.3 },
  ];

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");
  const [loaded, setLoaded] = useState<Set<number>>(new Set([1, 2, 3, 4]));

  const openLightbox = (id: number) => { setLightbox(id); setLoaded(p => new Set([...p, id])); };
  const navigate = (dir: -1 | 1) => { if (lightbox === null) return; const idx = items.findIndex(i => i.id === lightbox); const next = items[(idx + dir + items.length) % items.length]; openLightbox(next.id); };
  const currentItem = items.find(i => i.id === lightbox);

  const ImagePlaceholder = ({ item, height }: { item: GalleryItem; height: number }) => (
    <div style={{ width: "100%", height, backgroundColor: item.color + "15", borderRadius: radius.md, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", overflow: "hidden", position: "relative", border: `1px solid ${item.color}20` }} onClick={() => openLightbox(item.id)}>
      {loaded.has(item.id) ? (
        <>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
          <span style={{ fontSize: 11, color: item.color, fontWeight: 500 }}>{item.caption}</span>
        </>
      ) : (
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: "100%", height: "100%", backgroundColor: palette.surfaceMuted, borderRadius: radius.md }} />
      )}
    </div>
  );

  return (
    <motion.section id="comp-gallery" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Gallery</p>
      <p style={sectionDesc}>
        An image gallery displays a responsive grid or masonry layout with lightbox overlay, captions, lazy-loading placeholders, and keyboard navigation.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: radius.lg }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {(["grid", "masonry"] as const).map(l => (
              <button key={l} onClick={() => setLayout(l)} style={{ padding: "4px 14px", borderRadius: radius.sm, border: `1px solid ${layout === l ? palette.primary : palette.border}`, backgroundColor: layout === l ? palette.primary + "10" : "transparent", color: layout === l ? palette.primary : palette.textSecondary, fontSize: 11, fontWeight: 500, cursor: "pointer", textTransform: "capitalize", fontFamily: "inherit" }}>{l}</button>
            ))}
          </div>
          {layout === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {items.map(item => <ImagePlaceholder key={item.id} item={item} height={100} />)}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {items.map(item => <ImagePlaceholder key={item.id} item={item} height={80 * item.aspect} />)}
            </div>
          )}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Grid Gap", "10px"], ["Border Radius", radius.md], ["Overlay BG", "rgba(0,0,0,0.85)"], ["Caption Size", "11px"], ["Columns (Grid)", "3"], ["Columns (Masonry)", "2"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightbox !== null && currentItem && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} style={{ position: "absolute", top: 20, right: 20, border: "none", background: "none", color: "#fff", cursor: "pointer" }}><XIcon /></button>
          <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} style={{ position: "absolute", left: 20, border: "none", background: "none", color: "#fff", cursor: "pointer" }}><ChevronLeft /></button>
          <div onClick={e => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: 400, height: 300, backgroundColor: currentItem.color + "20", borderRadius: radius.lg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={currentItem.color} strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
            </div>
            <p style={{ color: "#fff", fontSize: 14, margin: 0 }}>{currentItem.caption}</p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>{items.findIndex(i => i.id === lightbox) + 1} / {items.length}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); navigate(1); }} style={{ position: "absolute", right: 20, border: "none", background: "none", color: "#fff", cursor: "pointer" }}><ChevronRight /></button>
        </div>
      )}

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Captions</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {items.slice(0, 2).map(item => (
              <div key={item.id}>
                <div style={{ height: 80, backgroundColor: item.color + "15", borderRadius: radius.sm, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                </div>
                <span style={{ fontSize: 11, color: palette.textSecondary }}>{item.caption}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Lazy Loading</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[true, true, false].map((isLoaded, i) => (
              <div key={i} style={{ height: 60, borderRadius: radius.sm, overflow: "hidden" }}>
                {isLoaded ? (
                  <div style={{ width: "100%", height: "100%", backgroundColor: palette.info + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.info} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "100%", backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "60%", height: 4, borderRadius: 2, backgroundColor: palette.border }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use a gallery" description="Galleries work well for:" items={["Portfolio and showcase pages", "Product image carousels", "Media libraries and asset managers", "Photo albums and social feeds"]} />
        <UsageSection palette={palette} title="Gallery best practices" description="Optimize the viewing experience:" items={["Lazy-load images below the fold", "Support keyboard navigation in lightbox", "Show image count and position indicator", "Preload adjacent images for smooth browsing"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Provide a lightbox for full-size viewing with close and navigation." },
        { type: "dont", text: "Don't display all images at full resolution in the grid — use thumbnails." },
        { type: "do", text: "Show a shimmer or skeleton placeholder while images load." },
        { type: "dont", text: "Don't force a fixed aspect ratio on all images in masonry layout." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Grid container", description: "Responsive layout holding thumbnails", x: 50, y: 40 },
        { id: 2, label: "Thumbnail", description: "Clickable image preview with border radius", x: 25, y: 30 },
        { id: 3, label: "Caption", description: "Text description beneath each image", x: 25, y: 60 },
        { id: 4, label: "Lightbox overlay", description: "Full-screen dark backdrop with image", x: 70, y: 20 },
        { id: 5, label: "Navigation", description: "Prev/next arrows and close button", x: 70, y: 50 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, opacity: h === 1 || h === 2 || h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {[palette.primary, palette.secondary, palette.info].map((c, i) => (
              <div key={i}>
                <div style={{ height: 30, borderRadius: 4, backgroundColor: c + "20", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
                <div style={{ height: 3, borderRadius: 1, backgroundColor: palette.border, marginTop: 3, width: "70%", opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, border: `1px solid ${palette.border}`, borderRadius: 4, padding: 4, backgroundColor: palette.surface + "60", opacity: h === 4 || h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 8, color: palette.textSecondary, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>◀</span>
              <div style={{ width: 40, height: 24, borderRadius: 3, backgroundColor: palette.primary + "20", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
              <span style={{ fontSize: 8, color: palette.textSecondary, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>▶</span>
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Grid Gap", value: "10px" },
        { label: "Grid Columns", value: "3 (default) / 2 (masonry)" },
        { label: "Thumbnail Radius", value: radius.md },
        { label: "Lightbox BG", value: "rgba(0,0,0,0.85)" },
        { label: "Lightbox Image", value: "400×300 max" },
        { label: "Caption Font", value: "11px" },
        { label: "Nav Button Size", value: "20px icon" },
      ]} />
    </motion.section>
  );
}
