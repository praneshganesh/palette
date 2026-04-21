"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface FloatingHeaderSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const feedItems = Array.from({ length: 8 }, (_, i) => ({
  title: `Article ${i + 1}`,
  preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit…",
  time: `${(i + 1) * 3}m ago`,
}));

export function FloatingHeaderSection({
  system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp,
}: FloatingHeaderSectionProps) {
  const comp = system.components;
  const [scrollState, setScrollState] = useState<"top" | "scrolling-down" | "scrolling-up">("top");
  const [headerStyle, setHeaderStyle] = useState<"solid" | "blur" | "condensed">("solid");

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
    width: 300, height: 480, backgroundColor: palette.background,
    borderRadius: 24, border: `2px solid ${palette.border}`,
    overflow: "hidden", position: "relative",
  };

  const isHidden = scrollState === "scrolling-down";
  const isCondensed = scrollState === "scrolling-up";

  const headerBg = (): React.CSSProperties => {
    if (headerStyle === "blur") return { backgroundColor: palette.surface + "cc", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" };
    return { backgroundColor: palette.surface };
  };

  return (
    <motion.section id="comp-floating-header" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Floating Header</p>
      <p style={sectionDesc}>
        Floating headers hide on scroll down and reappear on scroll up, maximizing content space. They support blur backgrounds, condensed modes, and smooth transitions.
      </p>

      <div style={subsectionLabel}>Scroll Behavior</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["top", "scrolling-down", "scrolling-up"] as const).map(s => (
          <button key={s} onClick={() => setScrollState(s)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${scrollState === s ? palette.primary : palette.border}`, backgroundColor: scrollState === s ? palette.primary + "15" : palette.surface, color: scrollState === s ? palette.primary : palette.textSecondary, cursor: "pointer" }}>
            {s === "top" ? "At Top" : s === "scrolling-down" ? "Scrolling ↓ (Hidden)" : "Scrolling ↑ (Visible)"}
          </button>
        ))}
      </div>
      <div style={previewBox}>
        <div style={phoneFrame}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, transform: isHidden ? "translateY(-100%)" : "translateY(0)", transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)", ...headerBg(), borderBottom: `1px solid ${palette.border}` }}>
            <div style={{ padding: isCondensed ? "8px 16px" : "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "padding 0.3s" }}>
              <span style={{ fontWeight: 700, fontSize: isCondensed ? 14 : 18, color: palette.textPrimary, transition: "font-size 0.3s" }}>Feed</span>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🔍</div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⋯</div>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: isHidden ? 0 : isCondensed ? 48 : 60, transition: "padding-top 0.3s", height: "100%", overflow: "auto" }}>
            <div style={{ padding: "8px 16px" }}>
              {feedItems.map((item, i) => (
                <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${palette.border}30` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{item.title}</span>
                    <span style={{ fontSize: 11, color: palette.textSecondary }}>{item.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.4 }}>{item.preview}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={subsectionLabel}>Header Styles</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["solid", "blur", "condensed"] as const).map(s => (
          <button key={s} onClick={() => setHeaderStyle(s)} style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, borderRadius: system.spacing.radius.md, border: `1px solid ${headerStyle === s ? palette.primary : palette.border}`, backgroundColor: headerStyle === s ? palette.primary + "15" : palette.surface, color: headerStyle === s ? palette.primary : palette.textSecondary, cursor: "pointer", textTransform: "capitalize" }}>{s} Background</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {(["solid", "blur", "condensed"] as const).map(s => (
          <div key={s}>
            <div style={{ fontSize: 11, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, textAlign: "center" }}>{s}</div>
            <div style={{ ...previewBox, padding: 12 }}>
              <div style={{ width: 200, height: 100, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
                <div style={{ padding: "4px 8px", fontSize: 8, color: palette.textSecondary, lineHeight: 1.8 }}>Content line 1<br />Content line 2<br />Content line 3</div>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: s === "condensed" ? "4px 10px" : "8px 10px", backgroundColor: s === "blur" ? palette.surface + "bb" : palette.surface, borderBottom: `1px solid ${palette.border}`, transition: "all 0.2s" }}>
                  <span style={{ fontSize: s === "condensed" ? 10 : 12, fontWeight: 700, color: palette.textPrimary }}>Header</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use floating headers" description="Content-heavy scrolling views:" items={[
          "Social feeds, news lists, and article readers",
          "Product catalogues where screen real estate matters",
          "Any scrollable page where header can be temporarily hidden",
        ]} />
        <UsageSection palette={palette} title="Style selection" description="Choose the right style:" items={[
          "Solid — clean separator, best for opaque headers",
          "Blur — translucent, modern feel with content peeking through",
          "Condensed — shrinks title/padding on scroll for more space",
        ]} />
      </div>

      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Re-show the header immediately on any upward scroll gesture — don't wait for a threshold." },
        { type: "dont", text: "Don't hide navigation-critical buttons (like back) when the header is hidden." },
        { type: "do", text: "Use a blur background when content diversity (images, colors) makes solid feel heavy." },
        { type: "dont", text: "Don't animate the header jitter on every tiny scroll — use a dead zone of 5–10px." },
      ]} />

      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Header bar", description: "Top-fixed container that slides in/out", x: 50, y: 10 },
        { id: 2, label: "Title", description: "Page title that may condense", x: 20, y: 10 },
        { id: 3, label: "Action icons", description: "Search, menu, or profile icons", x: 85, y: 10 },
        { id: 4, label: "Background", description: "Solid or blur backdrop layer", x: 50, y: 10 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, height: 80, position: "relative", backgroundColor: palette.background, borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
          <div style={{ padding: "4px 8px", marginTop: 24, fontSize: 8, color: palette.textSecondary }}>Content line 1<br />Content line 2</div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "6px 10px", backgroundColor: palette.surface + "dd", borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: palette.textPrimary, opacity: h === 2 ? 1 : h === null ? 1 : 0.4 }}>Title</span>
            <div style={{ display: "flex", gap: 4, opacity: h === 3 ? 1 : h === null ? 1 : 0.3 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: palette.surfaceMuted }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: palette.surfaceMuted }} />
            </div>
          </div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 24, backgroundColor: palette.surface + "44", opacity: h === 4 ? 0.6 : 0, transition: "opacity 0.2s" }} />
        </div>
      )} />

      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Header Height (default)", value: "56–64px" },
        { label: "Header Height (condensed)", value: "44–48px" },
        { label: "Hide/Show Duration", value: "250–350ms" },
        { label: "Scroll Dead Zone", value: "5–10px" },
        { label: "Blur Radius", value: "12–16px" },
      ]} />
    </motion.section>
  );
}
