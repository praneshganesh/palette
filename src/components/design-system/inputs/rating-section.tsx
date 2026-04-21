"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface RatingSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const StarIcon = ({ size, filled, half, color, muted }: { size: number; filled: boolean; half?: boolean; color: string; muted: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {half && (
      <defs>
        <linearGradient id={`halfGrad-${size}`}>
          <stop offset="50%" stopColor={color} />
          <stop offset="50%" stopColor={muted} />
        </linearGradient>
      </defs>
    )}
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={half ? `url(#halfGrad-${size})` : filled ? color : muted}
      stroke={filled || half ? color : muted}
      strokeWidth="1"
    />
  </svg>
);

const HeartIcon = ({ size, filled, color, muted }: { size: number; filled: boolean; color: string; muted: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={filled ? color : muted} strokeWidth="2" strokeLinecap="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

export function RatingSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: RatingSectionProps) {
  const comp = system.components;
  const [heroRating, setHeroRating] = useState(3.5);
  const [heroHover, setHeroHover] = useState<number | null>(null);
  const [heartRating, setHeartRating] = useState(4);
  const [numericRating, setNumericRating] = useState(7);
  const [thumbRating, setThumbRating] = useState<"up" | "down" | null>("up");
  const [emojiRating, setEmojiRating] = useState(3);
  const [smRating, setSmRating] = useState(4);
  const [mdRating, setMdRating] = useState(3);
  const [lgRating, setLgRating] = useState(5);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const renderStarRating = (
    value: number, onChange: ((v: number) => void) | null, size: number,
    opts: { half?: boolean; hoverVal?: number | null; onHover?: (v: number | null) => void; color?: string; count?: number; label?: string } = {}
  ) => {
    const { half = false, hoverVal, onHover, color = palette.warning, count = 5, label } = opts;
    const display = hoverVal ?? value;
    const readOnly = !onChange;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ display: "flex", gap: 2 }}>
          {Array.from({ length: count }, (_, i) => {
            const starVal = i + 1;
            const isFull = display >= starVal;
            const isHalf = half && !isFull && display >= starVal - 0.5;
            return (
              <span
                key={i}
                style={{ cursor: readOnly ? "default" : "pointer", transition: "transform 0.1s", display: "inline-flex" }}
                onClick={() => onChange?.(half && value === starVal ? starVal - 0.5 : starVal)}
                onMouseEnter={() => onHover?.(starVal)}
                onMouseLeave={() => onHover?.(null)}
              >
                <StarIcon size={size} filled={isFull} half={isHalf} color={color} muted={palette.border} />
              </span>
            );
          })}
        </div>
        {label && <span style={{ fontSize: 12, color: palette.textSecondary, marginLeft: 4 }}>{label}</span>}
      </div>
    );
  };

  const renderHeartRating = (value: number, onChange: (v: number) => void, size: number) => (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ cursor: "pointer", display: "inline-flex", transition: "transform 0.1s" }}
          onClick={() => onChange(i + 1)}>
          <HeartIcon size={size} filled={i < value} color={palette.danger} muted={palette.border} />
        </span>
      ))}
    </div>
  );

  const renderNumericRating = (value: number, onChange: (v: number) => void, max: number) => (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const active = n <= value;
        return (
          <button key={n} onClick={() => onChange(n)} style={{
            width: 32, height: 32, borderRadius: 6, border: `1.5px solid ${active ? palette.primary : palette.border}`,
            backgroundColor: active ? palette.primary : "transparent",
            color: active ? "#fff" : palette.textSecondary,
            fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
          }}>{n}</button>
        );
      })}
    </div>
  );

  const renderThumbRating = (value: "up" | "down" | null, onChange: (v: "up" | "down" | null) => void) => (
    <div style={{ display: "flex", gap: 8 }}>
      {(["up", "down"] as const).map((dir) => {
        const active = value === dir;
        const color = dir === "up" ? palette.success : palette.danger;
        return (
          <button key={dir} onClick={() => onChange(active ? null : dir)} style={{
            width: 40, height: 40, borderRadius: 8,
            border: `1.5px solid ${active ? color : palette.border}`,
            backgroundColor: active ? color + "15" : "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? color : "none"}
              stroke={active ? color : palette.textSecondary} strokeWidth="2" strokeLinecap="round"
              style={{ transform: dir === "down" ? "rotate(180deg)" : "none" }}>
              <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
            </svg>
          </button>
        );
      })}
    </div>
  );

  const emojis = ["😞", "😕", "😐", "😊", "🤩"];
  const renderEmojiRating = (value: number, onChange: (v: number) => void) => (
    <div style={{ display: "flex", gap: 8 }}>
      {emojis.map((emoji, i) => {
        const active = i + 1 === value;
        return (
          <button key={i} onClick={() => onChange(i + 1)} style={{
            width: 40, height: 40, borderRadius: 8, fontSize: 22, border: `1.5px solid ${active ? palette.primary : palette.border}`,
            backgroundColor: active ? palette.primary + "12" : "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s", transform: active ? "scale(1.15)" : "scale(1)",
          }}>{emoji}</button>
        );
      })}
    </div>
  );

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  return (
    <motion.section id="comp-rating" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Rating</p>
      <p style={sectionDesc}>
        Rating components let users express satisfaction or preference through stars, hearts, numbers, thumbs, or emoji scales with optional half-step precision.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 140, gap: 8 }}>
          {renderStarRating(heroRating, setHeroRating, 32, { half: true, hoverVal: heroHover, onHover: setHeroHover })}
          <span style={{ fontSize: 13, color: palette.textSecondary }}>{heroHover ?? heroRating} out of 5</span>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Active Color", "palette.warning")}
          {tokenRow("Inactive Color", "palette.border")}
          {tokenRow("Icon Sizes", "16 / 24 / 32 px")}
          {tokenRow("Gap", "2–4px")}
          {tokenRow("Transition", "0.15s ease")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Star Rating</div>
          {renderStarRating(heroRating, setHeroRating, 24, { half: true, hoverVal: heroHover, onHover: setHeroHover })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Heart Rating</div>
          {renderHeartRating(heartRating, setHeartRating, 24)}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Numeric (1–10)</div>
          {renderNumericRating(numericRating, setNumericRating, 10)}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Thumbs Up/Down</div>
          {renderThumbRating(thumbRating, setThumbRating)}
        </div>
        <div style={{ ...showcaseBox, gridColumn: "span 2" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Emoji Scale</div>
          {renderEmojiRating(emojiRating, setEmojiRating)}
        </div>
      </div>

      {/* Sizes */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ ...showcaseBox, display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Small (16px)</div>
          {renderStarRating(smRating, setSmRating, 16)}
        </div>
        <div>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Medium (24px)</div>
          {renderStarRating(mdRating, setMdRating, 24)}
        </div>
        <div>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Large (32px)</div>
          {renderStarRating(lgRating, setLgRating, 32)}
        </div>
      </div>

      {/* Features */}
      <div style={subsectionLabel}>Features</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Half-Star Support</div>
          {renderStarRating(3.5, null, 28, { half: true })}
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 6 }}>Click a filled star to toggle half</div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Read-Only with Count</div>
          {renderStarRating(4.2, null, 20, { label: "4.2 (1,284 reviews)" })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Custom Color</div>
          {renderStarRating(4, null, 24, { color: palette.primary })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Disabled</div>
          <div style={{ opacity: 0.4 }}>{renderStarRating(3, null, 24)}</div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use ratings" description="Ratings capture user sentiment or quality perception:" items={[
          "Product reviews in e-commerce",
          "Service feedback after support interactions",
          "Content quality scoring (articles, media)",
          "Quick satisfaction surveys (emoji or thumbs)",
        ]} />
        <UsageSection palette={palette} title="Choosing a rating variant" description="Match the variant to the context:" items={[
          "Stars — standard, most universally understood",
          "Hearts — emotional contexts (favorites, wish lists)",
          "Numeric — when precision matters (1–10 scale)",
          "Thumbs — binary quick feedback (helpful/not helpful)",
          "Emoji — casual, fun surveys and NPS-style feedback",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        {
          type: "do", text: "Show the numeric value alongside stars for clarity.",
          visual: renderStarRating(4, null, 18, { label: "4.0" }),
        },
        {
          type: "dont", text: "Don't use tiny star ratings in dense tables — they become unreadable.",
          visual: <div style={{ opacity: 0.5 }}>{renderStarRating(3, null, 10)}</div>,
        },
        { type: "do", text: "Use read-only mode when displaying aggregate ratings to prevent accidental input." },
        { type: "dont", text: "Don't mix rating styles on the same page — pick one and stay consistent." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Rating Container", description: "Wraps all rating icons in a flex row", x: 50, y: 50 },
        { id: 2, label: "Active Icon", description: "Filled star/heart indicating selected value", x: 20, y: 50 },
        { id: 3, label: "Inactive Icon", description: "Empty outline for unselected positions", x: 70, y: 50 },
        { id: 4, label: "Value Label", description: "Optional numeric display of rating value", x: 90, y: 50 },
      ]} renderPreview={(h) => (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            display: "flex", gap: 3,
            opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
          }}>
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} style={{
                opacity: i <= 3
                  ? (h === 2 ? 1 : h === null ? 1 : 0.3)
                  : (h === 3 ? 1 : h === null ? 1 : 0.3),
                transition: "opacity 0.2s",
              }}>
                <StarIcon size={24} filled={i <= 3} half={false} color={palette.warning} muted={palette.border} />
              </span>
            ))}
          </div>
          <span style={{
            fontSize: 13, color: palette.textSecondary, fontWeight: 500,
            opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>3.0</span>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Icon Size — Small", value: "16px" },
        { label: "Icon Size — Medium", value: "24px" },
        { label: "Icon Size — Large", value: "32px" },
        { label: "Icon Gap", value: "2–4px" },
        { label: "Numeric Button Size", value: "32 × 32 px" },
        { label: "Thumb Button Size", value: "40 × 40 px" },
        { label: "Label Font Size", value: "12–13px" },
      ]} />
    </motion.section>
  );
}
