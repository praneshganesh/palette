"use client";

import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSCarousel } from "./carousel";
import { DSCard } from "./card";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface CarouselSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const ImageIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const QuoteIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export function CarouselSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: CarouselSectionProps) {
  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const makeImageSlide = (label: string, index: number) => (
    <div
      style={{
        height: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: `linear-gradient(135deg, ${palette.primary}${(10 + index * 5).toString(16).padStart(2, "0")}, ${palette.secondary}${(8 + index * 4).toString(16).padStart(2, "0")})`,
        color: palette.textSecondary,
      }}
    >
      <ImageIcon size={36} />
      <div style={{ fontSize: 14, fontWeight: 500, color: palette.textPrimary }}>{label}</div>
    </div>
  );

  const imageSlides = [
    makeImageSlide("Slide 1", 0),
    makeImageSlide("Slide 2", 1),
    makeImageSlide("Slide 3", 2),
    makeImageSlide("Slide 4", 3),
    makeImageSlide("Slide 5", 4),
  ];

  const thumbnailNodes = imageSlides.map((_, i) => (
    <div key={i} style={{ fontSize: 9, fontWeight: 600, color: palette.textSecondary, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      {i + 1}
    </div>
  ));

  const cardSlides = content.kpis.map((kpi, i) => (
    <div key={i} style={{ padding: 16 }}>
      <DSCard
        system={system}
        palette={palette}
        variant="outlined"
        header={
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.label}</div>
          </div>
        }
      >
        <div style={{ marginTop: -8 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: palette.textPrimary }}>{kpi.value}</div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 4 }}>{kpi.subtitle}</div>
        </div>
      </DSCard>
    </div>
  ));

  const testimonialSlides = content.recentItems.slice(0, 4).map((item, i) => (
    <div key={i} style={{ padding: "40px 48px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, color: palette.primary }}>
        <QuoteIcon size={32} />
      </div>
      <div style={{ fontSize: 16, color: palette.textPrimary, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>
        &ldquo;{item.title} has transformed how our team operates. The results speak for themselves.&rdquo;
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{item.author}</div>
      <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 2 }}>{item.status}</div>
    </div>
  ));

  return (
    <motion.section
      id="comp-carousel"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Carousel</p>
      <p style={sectionDesc}>
        Carousels cycle through a set of content panels — images, cards, or
        testimonials — within a fixed viewport. Users navigate via arrows,
        dots, or swipe gestures.
      </p>

      {/* ──── Inside Arrows + Dots ──── */}
      <div style={subsectionLabel}>Arrow Placement: Inside</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <DSCarousel
          system={system}
          palette={palette}
          items={imageSlides}
          arrowPlacement="inside"
          indicator="dots"
        />
        <TokensGrid
          palette={palette}
          tokens={[
            { label: "Border Radius", value: system.spacing.radius.lg },
            { label: "Gap", value: "16px" },
            { label: "Arrow Size", value: "36px" },
            { label: "Indicator Size", value: "6px / 14px active" },
            { label: "Container BG", value: palette.surface },
            { label: "Arrow BG", value: palette.surface },
          ]}
        />
      </div>

      {/* ──── Outside Arrows ──── */}
      <div style={subsectionLabel}>Arrow Placement: Outside</div>
      <DSCarousel
        system={system}
        palette={palette}
        items={imageSlides}
        arrowPlacement="outside"
        indicator="dots"
      />

      {/* ──── Bottom Arrows + Counter ──── */}
      <div style={subsectionLabel}>Arrow Placement: Bottom + Counter</div>
      <DSCarousel
        system={system}
        palette={palette}
        items={imageSlides}
        arrowPlacement="bottom"
        indicator="counter"
      />

      {/* ──── With Thumbnails ──── */}
      <div style={subsectionLabel}>With Thumbnails</div>
      <DSCarousel
        system={system}
        palette={palette}
        items={imageSlides}
        arrowPlacement="inside"
        indicator="thumbnails"
        thumbnails={thumbnailNodes}
      />

      {/* ──── Card Carousel ──── */}
      <div style={subsectionLabel}>Card Carousel</div>
      <DSCarousel
        system={system}
        palette={palette}
        items={cardSlides}
        arrowPlacement="bottom"
        indicator="dots"
      />

      {/* ──── Testimonials ──── */}
      <div style={subsectionLabel}>Testimonial Carousel</div>
      <DSCarousel
        system={system}
        palette={palette}
        items={testimonialSlides}
        arrowPlacement="inside"
        indicator="dots"
        autoPlay
        autoPlayInterval={5000}
      />

      {/* ──── Peek (Partial Next Slide) ──── */}
      <div style={subsectionLabel}>Peek Variant</div>
      <DSCarousel
        system={system}
        palette={palette}
        items={imageSlides}
        arrowPlacement="inside"
        indicator="dots"
        peek
      />

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use carousels"
          description="Carousels are effective when you need to display multiple related items in limited space:"
          items={[
            "Image galleries and product photos",
            "Featured content and hero banners",
            "Testimonials and reviews",
            "Card-based content browsing",
            "Onboarding or tutorial steps",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Configuration options"
          description="Choose the right combination of controls for your use case:"
          items={[
            "Inside arrows — Best for full-width image carousels",
            "Outside arrows — When content needs maximum width",
            "Bottom arrows — Clean layout with counter or dots",
            "Dots — When slide count is manageable (≤ 7)",
            "Counter — When exact position matters",
            "Thumbnails — For image-heavy content",
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
            text: "Keep the number of slides manageable (3-7). Ensure each slide has equal importance.",
            visual: (
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} style={{ width: 32, height: 20, borderRadius: 4, backgroundColor: palette.primary + (n === 1 ? "40" : "15"), border: `1px solid ${palette.border}` }} />
                ))}
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't auto-play carousels with important content. Users may miss critical information.",
            visual: (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 60, height: 24, borderRadius: 4, backgroundColor: palette.danger + "20", border: `1px solid ${palette.danger}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: palette.danger }}>AUTO</div>
                <div style={{ fontSize: 9, color: palette.textSecondary }}>→ missed</div>
              </div>
            ),
          },
          {
            type: "do",
            text: "Always provide clear navigation controls. Users should know there is more content to see.",
            visual: (
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: palette.textSecondary }}>‹</div>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{ width: n === 1 ? 14 : 6, height: 6, borderRadius: 3, backgroundColor: n === 1 ? palette.primary : palette.border }} />
                  ))}
                </div>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: palette.textSecondary }}>›</div>
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't use carousels as the only way to access content. Key information should be visible by default.",
            visual: (
              <div style={{ width: 80, height: 30, borderRadius: 4, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: palette.textSecondary }}>Hidden info →</div>
            ),
          },
        ]}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Slide Width", value: "100% of viewport" },
          { label: "Gap Between Slides", value: "16px" },
          { label: "Arrow Button Size", value: "36 × 36px" },
          { label: "Indicator Dot Size", value: "6px (14px active)" },
          { label: "Container Padding", value: "0px (inside) / 48px (outside)" },
          { label: "Indicator Gap", value: "6px" },
          { label: "Thumbnail Height", value: "48px" },
          { label: "Bottom Arrow Spacing", value: "12px from content" },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Viewport", description: "The visible area that clips the slide content", x: 8, y: 50 },
          { id: 2, label: "Slide track", description: "Horizontal container that holds all slides", x: 50, y: 15 },
          { id: 3, label: "Navigation arrows", description: "Left/right buttons to advance slides", x: 90, y: 40 },
          { id: 4, label: "Indicators", description: "Dots, counter, or thumbnails showing position", x: 50, y: 92 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", width: 320 }}>
            <div
              style={{
                borderRadius: system.spacing.radius.lg,
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.surfaceMuted,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.5,
                transition: "opacity 0.2s",
              }}
            >
              <div style={{ opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s", display: "flex", gap: 8 }}>
                {[1, 2, 3].map((n) => (
                  <div key={n} style={{ width: 90, height: 70, borderRadius: 6, backgroundColor: palette.primary + (n === 1 ? "20" : "08"), border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: palette.textSecondary }}>
                    Slide {n}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s", position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: palette.surface, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: palette.textSecondary, boxShadow: system.spacing.elevation.sm }}>›</div>
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 10, opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
              {[1, 2, 3].map((n) => (
                <div key={n} style={{ width: n === 1 ? 14 : 6, height: 6, borderRadius: 3, backgroundColor: n === 1 ? palette.primary : palette.border }} />
              ))}
            </div>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: "-3px -3px auto -3px", height: "calc(100% - 20px)", border: `2px dashed ${palette.primary}`, borderRadius: system.spacing.radius.lg, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />
    </motion.section>
  );
}
