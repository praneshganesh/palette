"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart6Props {
  system: DesignSystem;
  content: IndustryContent;
  activeSection?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

/* ── SVG icon paths ── */
const icons = {
  pencil: (
    <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  trash: (
    <>
      <polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  plus: (
    <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" strokeWidth="2" fill="none" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001.08 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.77 1.02 1.51 1.08H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1.08z" strokeWidth="2" fill="none" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" strokeWidth="2" fill="none" />
      <circle cx="6" cy="12" r="3" strokeWidth="2" fill="none" />
      <circle cx="18" cy="19" r="3" strokeWidth="2" fill="none" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth="2" fill="none" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth="2" fill="none" />
    </>
  ),
  bookmark: (
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  check: (
    <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  x: (
    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  warning: (
    <>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="12" y1="9" x2="12" y2="13" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  star: (c: string) => (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={c} stroke={c} strokeWidth="1.5" />
  ),
  starHalf: (fill: string, empty: string) => (
    <>
      <defs>
        <clipPath id="halfClip"><rect x="0" y="0" width="12" height="24" /></clipPath>
      </defs>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={empty} stroke={empty} strokeWidth="1.5" />
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={fill} stroke={fill} strokeWidth="1.5" clipPath="url(#halfClip)" />
    </>
  ),
  chevronDown: (
    <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
};

function SvgIcon({ children, size = 24, color = "currentColor" }: { children: React.ReactNode; size?: number; color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" stroke={color} style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}>
      {children}
    </svg>
  );
}

export function ComponentsPart6({ system, content, activeSection }: ComponentsPart6Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  const [tagInputVal, setTagInputVal] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>(content.formFields.categories.slice(0, 3));
  const [textareaVal, setTextareaVal] = useState("");
  const [warnTextVal, setWarnTextVal] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.");
  const [overTextVal, setOverTextVal] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus.");

  const accentBar: React.CSSProperties = { width: 48, height: 2, backgroundColor: palette.primary, marginBottom: 24, borderRadius: 1 };
  const sectionTitle: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8, margin: 0, lineHeight: 1.2 };
  const sectionDesc: React.CSSProperties = { fontSize: 14, color: palette.textSecondary, lineHeight: 1.8, maxWidth: 600, marginBottom: 32, marginTop: 0 };
  const sectionWrap = (border = true): React.CSSProperties => ({ padding: "56px 0", borderTop: border ? `1px solid ${palette.border}` : "none" });

  const inputBase: React.CSSProperties = {
    backgroundColor: comp.input.bg,
    border: `1px solid ${comp.input.border}`,
    borderRadius: system.spacing.radius.md,
    color: comp.input.text,
    fontSize: 14,
    fontFamily: system.typography.bodyFont,
    padding: "10px 14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  };

  const labelBase: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: palette.textPrimary,
    fontFamily: system.typography.bodyFont,
    marginBottom: 6,
    display: "block",
  };

  const cardBox: React.CSSProperties = {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    padding: 28,
  };

  /* ────────────────────────────────────
     1. Icon Button
  ──────────────────────────────────── */
  const iconBtnSection = (() => {
    const sizes = { sm: 32, md: 40, lg: 48 };
    const iconSizes = { sm: 14, md: 18, lg: 22 };
    const iconDefs: { name: string; icon: React.ReactNode }[] = [
      { name: "Edit", icon: icons.pencil },
      { name: "Delete", icon: icons.trash },
      { name: "Add", icon: icons.plus },
      { name: "Settings", icon: icons.gear },
      { name: "Share", icon: icons.share },
      { name: "Bookmark", icon: icons.bookmark },
    ];
    const variants: { label: string; style: (s: number) => React.CSSProperties }[] = [
      {
        label: "Ghost",
        style: (s) => ({
          width: s, height: s, display: "inline-flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "transparent", border: "none", borderRadius: system.spacing.radius.md,
          color: palette.textSecondary, cursor: "pointer",
        }),
      },
      {
        label: "Outlined",
        style: (s) => ({
          width: s, height: s, display: "inline-flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "transparent", border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md,
          color: palette.textPrimary, cursor: "pointer",
        }),
      },
      {
        label: "Filled",
        style: (s) => ({
          width: s, height: s, display: "inline-flex", alignItems: "center", justifyContent: "center",
          backgroundColor: palette.primary, border: "none", borderRadius: system.spacing.radius.md,
          color: "#fff", cursor: "pointer",
        }),
      },
    ];

    return (
      <motion.section id="comp-icon-button" data-comp-section {...fadeUp} transition={{ delay: 0.05 }} style={{ ...sectionWrap(false), display: activeSection === "comp-icon-button" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Icon Button</h3>
        <p style={sectionDesc}>Icon-only action triggers in ghost, outlined, and filled variants across sizes.</p>
        <div style={cardBox}>
          {variants.map((v) => (
            <div key={v.label} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 14, fontFamily: system.typography.bodyFont }}>{v.label}</div>
              {(Object.keys(sizes) as (keyof typeof sizes)[]).map((sz) => (
                <div key={sz} style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 16 }}>
                  {iconDefs.map((ic) => (
                    <div key={ic.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div style={v.style(sizes[sz])}>
                        <SvgIcon size={iconSizes[sz]} color={v.label === "Filled" ? "#fff" : v.label === "Ghost" ? palette.textSecondary : palette.textPrimary}>
                          {ic.icon}
                        </SvgIcon>
                      </div>
                      {sz === "md" && (
                        <span style={{ fontSize: 10, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>{ic.name}</span>
                      )}
                    </div>
                  ))}
                  <span style={{ fontSize: 10, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginLeft: 8, opacity: 0.6 }}>{sz}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     2. Number Input
  ──────────────────────────────────── */
  const numberInputSection = (() => {
    const stepperBtn: React.CSSProperties = {
      width: 40, height: 40, display: "inline-flex", alignItems: "center", justifyContent: "center",
      backgroundColor: palette.surface, border: `1px solid ${comp.input.border}`, color: palette.textPrimary,
      cursor: "pointer", fontSize: 18, fontWeight: 600, fontFamily: system.typography.bodyFont,
    };
    const stepperInput: React.CSSProperties = {
      ...inputBase, width: 72, textAlign: "center" as const, borderRadius: 0,
      borderLeft: "none", borderRight: "none",
    };

    return (
      <motion.section id="comp-number-input" data-comp-section {...fadeUp} transition={{ delay: 0.1 }} style={{ ...sectionWrap(), display: activeSection === "comp-number-input" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Number Input</h3>
        <p style={sectionDesc}>Numeric stepper with increment / decrement controls and optional labels or unit suffixes.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 40, alignItems: "flex-start" }}>
            {/* Default */}
            <div>
              <div style={labelBase}>Quantity</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={{ ...stepperBtn, borderRadius: `${system.spacing.radius.md} 0 0 ${system.spacing.radius.md}` }}>−</button>
                <input style={stepperInput} value="3" readOnly />
                <button style={{ ...stepperBtn, borderRadius: `0 ${system.spacing.radius.md} ${system.spacing.radius.md} 0` }}>+</button>
              </div>
            </div>
            {/* With min/max */}
            <div>
              <div style={labelBase}>Guests</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={{ ...stepperBtn, borderRadius: `${system.spacing.radius.md} 0 0 ${system.spacing.radius.md}` }}>−</button>
                <input style={stepperInput} value="5" readOnly />
                <button style={{ ...stepperBtn, borderRadius: `0 ${system.spacing.radius.md} ${system.spacing.radius.md} 0` }}>+</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: palette.textSecondary, marginTop: 4, fontFamily: system.typography.bodyFont, width: 152 }}>
                <span>Min: 1</span><span>Max: 20</span>
              </div>
            </div>
            {/* With unit */}
            <div>
              <div style={labelBase}>Weight</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={{ ...stepperBtn, borderRadius: `${system.spacing.radius.md} 0 0 ${system.spacing.radius.md}` }}>−</button>
                <input style={stepperInput} value="12" readOnly />
                <button style={{ ...stepperBtn, borderRadius: `0 ${system.spacing.radius.md} ${system.spacing.radius.md} 0` }}>+</button>
                <div style={{ marginLeft: 10, fontSize: 14, fontWeight: 600, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>kg</div>
              </div>
            </div>
            {/* With AED */}
            <div>
              <div style={labelBase}>Price</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={{ ...stepperBtn, borderRadius: `${system.spacing.radius.md} 0 0 ${system.spacing.radius.md}` }}>−</button>
                <input style={stepperInput} value="250" readOnly />
                <button style={{ ...stepperBtn, borderRadius: `0 ${system.spacing.radius.md} ${system.spacing.radius.md} 0` }}>+</button>
                <div style={{ marginLeft: 10, fontSize: 14, fontWeight: 600, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>AED</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     3. Range Slider
  ──────────────────────────────────── */
  const rangeSliderSection = (() => {
    const trackH = 6;
    const handleSize = 20;
    const trackStyle: React.CSSProperties = {
      position: "relative" as const, width: "100%", height: handleSize,
      display: "flex", alignItems: "center",
    };
    const rail: React.CSSProperties = {
      position: "absolute" as const, left: 0, right: 0, top: "50%",
      transform: "translateY(-50%)", height: trackH,
      backgroundColor: palette.border, borderRadius: trackH / 2,
    };
    const filled = (left: number, right: number): React.CSSProperties => ({
      position: "absolute" as const, left: `${left}%`, right: `${100 - right}%`, top: "50%",
      transform: "translateY(-50%)", height: trackH,
      backgroundColor: palette.primary, borderRadius: trackH / 2,
    });
    const handle = (pos: number): React.CSSProperties => ({
      position: "absolute" as const, left: `${pos}%`, top: "50%",
      transform: "translate(-50%, -50%)", width: handleSize, height: handleSize,
      backgroundColor: "#fff", border: `2px solid ${palette.primary}`,
      borderRadius: "50%", cursor: "pointer", boxShadow: system.spacing.elevation.sm,
      zIndex: 2,
    });

    return (
      <motion.section id="comp-range-slider" data-comp-section {...fadeUp} transition={{ delay: 0.15 }} style={{ ...sectionWrap(), display: activeSection === "comp-range-slider" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Range Slider</h3>
        <p style={sectionDesc}>Dual-handle range sliders for selecting value intervals with labeled bounds.</p>
        <div style={cardBox}>
          {/* Price range */}
          <div style={{ marginBottom: 40 }}>
            <div style={labelBase}>Price Range</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
              <span>$500</span><span>$2,000</span>
            </div>
            <div style={trackStyle}>
              <div style={rail} />
              <div style={filled(20, 72)} />
              <div style={handle(20)} />
              <div style={handle(72)} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, fontFamily: system.typography.bodyFont }}>
              <span style={{ color: palette.textSecondary }}>$0</span>
              <span style={{ color: palette.primary, fontWeight: 600 }}>$500 — $2,000</span>
              <span style={{ color: palette.textSecondary }}>$5,000</span>
            </div>
          </div>
          {/* Date range */}
          <div>
            <div style={labelBase}>Date Range</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
              <span>Mar 12</span><span>Apr 28</span>
            </div>
            <div style={trackStyle}>
              <div style={rail} />
              <div style={filled(30, 80)} />
              <div style={handle(30)} />
              <div style={handle(80)} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, fontFamily: system.typography.bodyFont }}>
              <span style={{ color: palette.textSecondary }}>Jan 1</span>
              <span style={{ color: palette.primary, fontWeight: 600 }}>Mar 12 — Apr 28</span>
              <span style={{ color: palette.textSecondary }}>Dec 31</span>
            </div>
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     4. Tag Input
  ──────────────────────────────────── */
  const tagInputSection = (() => {
    const suggestions = content.formFields.categories.filter((c) => !activeTags.includes(c));

    return (
      <motion.section id="comp-tag-input" data-comp-section {...fadeUp} transition={{ delay: 0.2 }} style={{ ...sectionWrap(), display: activeSection === "comp-tag-input" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Tag Input</h3>
        <p style={sectionDesc}>Input field with removable tags for multi-value entry and inline suggestions.</p>
        <div style={cardBox}>
          <div style={labelBase}>Categories</div>
          <div style={{
            ...inputBase, display: "flex", flexWrap: "wrap" as const, gap: 8,
            alignItems: "center", padding: "8px 12px", minHeight: 44,
          }}>
            {activeTags.map((tag) => (
              <span key={tag} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                backgroundColor: comp.badge.bg, color: comp.badge.text,
                borderRadius: system.spacing.radius.sm, padding: "4px 10px",
                fontSize: 12, fontWeight: 500, fontFamily: system.typography.bodyFont,
              }}>
                {tag}
                <span
                  style={{ cursor: "pointer", opacity: 0.6, fontSize: 14, lineHeight: 1 }}
                  onClick={() => setActiveTags((prev) => prev.filter((t) => t !== tag))}
                >×</span>
              </span>
            ))}
            <input
              value={tagInputVal}
              onChange={(e) => setTagInputVal(e.target.value)}
              placeholder="Add tag…"
              style={{
                border: "none", outline: "none", flex: 1, minWidth: 80, backgroundColor: "transparent",
                color: comp.input.text, fontSize: 14, fontFamily: system.typography.bodyFont,
              }}
            />
          </div>
          {suggestions.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" as const }}>
              <span style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>Suggested:</span>
              {suggestions.map((s) => (
                <span
                  key={s}
                  onClick={() => setActiveTags((prev) => [...prev, s])}
                  style={{
                    display: "inline-block", padding: "4px 12px", fontSize: 12,
                    backgroundColor: withAlpha(palette.primary, 0.08),
                    color: palette.primary, borderRadius: system.spacing.radius.full,
                    cursor: "pointer", fontFamily: system.typography.bodyFont, fontWeight: 500,
                  }}
                >{s}</span>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     5. Rating
  ──────────────────────────────────── */
  const ratingSection = (() => {
    const starSize = 22;
    const renderStars = (filled: number, total: number, half: boolean, highlight?: number) => (
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {Array.from({ length: total }).map((_, i) => {
          const isHighlight = highlight !== undefined && i === highlight;
          const isFull = i < Math.floor(filled);
          const isHalf = half && i === Math.floor(filled);
          const fillColor = palette.warning;
          const emptyColor = palette.border;
          return (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" width={starSize} height={starSize} viewBox="0 0 24 24" style={{ filter: isHighlight ? `drop-shadow(0 0 4px ${withAlpha(palette.warning, 0.5)})` : undefined }}>
              {isHalf ? icons.starHalf(fillColor, emptyColor) : icons.star(isFull ? fillColor : emptyColor)}
            </svg>
          );
        })}
      </div>
    );

    return (
      <motion.section id="comp-rating" data-comp-section {...fadeUp} transition={{ delay: 0.25 }} style={{ ...sectionWrap(), display: activeSection === "comp-rating" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Rating</h3>
        <p style={sectionDesc}>Star rating components for display and interactive feedback scenarios.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 32 }}>
            {/* Display only */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10, fontFamily: system.typography.bodyFont }}>Display Only</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {renderStars(4.5, 5, true)}
                <span style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>4.5/5</span>
              </div>
            </div>
            {/* Interactive hover */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10, fontFamily: system.typography.bodyFont }}>Interactive (hover)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {renderStars(2, 5, false, 2)}
                <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>Select rating</span>
              </div>
            </div>
            {/* With count */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10, fontFamily: system.typography.bodyFont }}>With Review Count</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {renderStars(4.5, 5, true)}
                <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>4.5</span>
                <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>(128 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     6. OTP / PIN Input
  ──────────────────────────────────── */
  const otpSection = (() => {
    const digits = ["4", "2", "8", "", "", ""];
    const activeIdx = 3;

    return (
      <motion.section id="comp-otp" data-comp-section {...fadeUp} transition={{ delay: 0.3 }} style={{ ...sectionWrap(), display: activeSection === "comp-otp" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>OTP / PIN Input</h3>
        <p style={sectionDesc}>Segmented digit inputs for verification codes with auto-advance focus.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 6 }}>Enter Verification Code</div>
            <div style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 24 }}>We sent a 6-digit code to your email</div>
            <div style={{ display: "flex", gap: 12 }}>
              {digits.map((d, i) => (
                <div
                  key={i}
                  style={{
                    width: 52, height: 60, display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundColor: comp.input.bg,
                    border: `2px solid ${i === activeIdx ? palette.primary : d ? comp.input.border : palette.border}`,
                    borderRadius: system.spacing.radius.md,
                    fontSize: 24, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.bodyFont,
                    position: "relative" as const,
                  }}
                >
                  {d || (i === activeIdx ? (
                    <div style={{
                      width: 2, height: 24, backgroundColor: palette.primary,
                      animation: "blink 1s step-end infinite",
                    }} />
                  ) : null)}
                </div>
              ))}
            </div>
            <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
            <div style={{ marginTop: 24, fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
              Resend code in <span style={{ fontWeight: 600, color: palette.textPrimary }}>00:47</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, fontFamily: system.typography.bodyFont }}>
              <span style={{ color: palette.textSecondary }}>Didn&apos;t receive code? </span>
              <span style={{ color: palette.primary, fontWeight: 600, cursor: "pointer" }}>Resend</span>
            </div>
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     7. Form Layout
  ──────────────────────────────────── */
  const formLayoutSection = (() => {
    const required: React.CSSProperties = { color: palette.danger, marginLeft: 2 };
    const helperText: React.CSSProperties = { fontSize: 12, color: palette.textSecondary, marginTop: 4, fontFamily: system.typography.bodyFont };

    return (
      <motion.section id="comp-form-layout" data-comp-section {...fadeUp} transition={{ delay: 0.35 }} style={{ ...sectionWrap(), display: activeSection === "comp-form-layout" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Form Layout</h3>
        <p style={sectionDesc}>Structured form sections with multi-column rows, required indicators, and helper text.</p>
        <div style={cardBox}>
          <div style={{ fontSize: 17, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 24 }}>Contact Information</div>
          {/* Two column */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <label style={labelBase}>First Name<span style={required}>*</span></label>
              <input style={inputBase} placeholder="John" readOnly />
            </div>
            <div>
              <label style={labelBase}>Last Name<span style={required}>*</span></label>
              <input style={inputBase} placeholder="Doe" readOnly />
            </div>
          </div>
          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelBase}>{content.formFields.ownerLabel}<span style={required}>*</span></label>
            <input style={inputBase} placeholder={content.formFields.ownerPlaceholder} readOnly />
            <div style={helperText}>We&apos;ll never share your email</div>
          </div>
          {/* Textarea */}
          <div>
            <label style={labelBase}>{content.formFields.descriptionLabel}</label>
            <textarea
              style={{ ...inputBase, minHeight: 100, resize: "vertical" as const }}
              placeholder={content.formFields.descriptionPlaceholder}
              value={textareaVal}
              onChange={(e) => setTextareaVal(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span style={{ ...helperText, marginTop: 6 }}>{textareaVal.length}/500</span>
            </div>
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     8. Multi-step Form / Wizard
  ──────────────────────────────────── */
  const wizardSection = (() => {
    const steps = [
      { label: "Details", status: "completed" },
      { label: "Contact", status: "current" },
      { label: "Payment", status: "upcoming" },
      { label: "Review", status: "upcoming" },
    ];
    const progressPct = 50;

    return (
      <motion.section id="comp-wizard" data-comp-section {...fadeUp} transition={{ delay: 0.4 }} style={{ ...sectionWrap(), display: activeSection === "comp-wizard" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Multi-step Form</h3>
        <p style={sectionDesc}>Wizard pattern with step indicators, progress bar, and contextual form sections.</p>
        <div style={cardBox}>
          {/* Progress bar */}
          <div style={{ height: 4, backgroundColor: palette.border, borderRadius: 2, marginBottom: 32, overflow: "hidden" }}>
            <div style={{ width: `${progressPct}%`, height: "100%", backgroundColor: palette.primary, borderRadius: 2, transition: "width 0.3s ease" }} />
          </div>
          {/* Steps */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40, position: "relative" as const }}>
            <div style={{ position: "absolute" as const, top: 16, left: "12%", right: "12%", height: 2, backgroundColor: palette.border, zIndex: 0 }} />
            {steps.map((step, i) => (
              <div key={step.label} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", zIndex: 1, flex: 1 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, fontFamily: system.typography.bodyFont,
                  backgroundColor: step.status === "completed" ? palette.success : step.status === "current" ? palette.primary : palette.surfaceMuted,
                  color: step.status === "upcoming" ? palette.textSecondary : "#fff",
                  border: step.status === "upcoming" ? `2px solid ${palette.border}` : "none",
                }}>
                  {step.status === "completed" ? (
                    <SvgIcon size={16} color="#fff">{icons.check}</SvgIcon>
                  ) : (
                    i + 1
                  )}
                </div>
                <span style={{
                  fontSize: 12, fontWeight: step.status === "current" ? 700 : 500, marginTop: 8,
                  color: step.status === "current" ? palette.primary : step.status === "completed" ? palette.success : palette.textSecondary,
                  fontFamily: system.typography.bodyFont,
                }}>{step.label}</span>
              </div>
            ))}
          </div>
          {/* Current step form */}
          <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 20 }}>Step 2: Contact Information</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={labelBase}>Email Address</label>
                <input style={inputBase} placeholder="name@example.com" readOnly />
              </div>
              <div>
                <label style={labelBase}>Phone Number</label>
                <input style={inputBase} placeholder="+971 50 123 4567" readOnly />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
              <button style={{
                padding: "10px 24px", fontSize: 14, fontWeight: 600, borderRadius: system.spacing.radius.md,
                border: `1px solid ${palette.border}`, backgroundColor: "transparent", color: palette.textPrimary,
                cursor: "pointer", fontFamily: system.typography.bodyFont,
              }}>Back</button>
              <button style={{
                padding: "10px 24px", fontSize: 14, fontWeight: 600, borderRadius: system.spacing.radius.md,
                border: "none", backgroundColor: palette.primary, color: "#fff",
                cursor: "pointer", fontFamily: system.typography.bodyFont,
              }}>Continue</button>
            </div>
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     9. Inline Validation
  ──────────────────────────────────── */
  const validationSection = (() => {
    const fields = [
      {
        label: "Email", value: "user@example.com", state: "success" as const,
        borderColor: palette.success, message: "Email is available",
        icon: <SvgIcon size={16} color={palette.success}>{icons.check}</SvgIcon>,
      },
      {
        label: "Username", value: "", state: "error" as const,
        borderColor: palette.danger, message: "This field is required",
        icon: <SvgIcon size={16} color={palette.danger}>{icons.x}</SvgIcon>,
      },
      {
        label: "Password", value: "abc123", state: "warning" as const,
        borderColor: palette.warning, message: "Password is weak",
        icon: <SvgIcon size={16} color={palette.warning}>{icons.warning}</SvgIcon>,
      },
    ];

    return (
      <motion.section id="comp-validation" data-comp-section {...fadeUp} transition={{ delay: 0.45 }} style={{ ...sectionWrap(), display: activeSection === "comp-validation" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Inline Validation</h3>
        <p style={sectionDesc}>Input fields with real-time validation feedback using color-coded borders and messages.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 24, maxWidth: 400 }}>
            {fields.map((f) => (
              <div key={f.label}>
                <label style={labelBase}>{f.label}</label>
                <div style={{ position: "relative" as const }}>
                  <input
                    style={{
                      ...inputBase,
                      borderColor: f.borderColor,
                      paddingRight: 38,
                    }}
                    value={f.value}
                    placeholder={f.value ? undefined : `Enter ${f.label.toLowerCase()}`}
                    readOnly
                  />
                  <div style={{ position: "absolute" as const, right: 12, top: "50%", transform: "translateY(-50%)" }}>
                    {f.icon}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: f.borderColor, marginTop: 4, fontFamily: system.typography.bodyFont, display: "flex", alignItems: "center", gap: 4 }}>
                  {f.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     10. Autosave Indicator
  ──────────────────────────────────── */
  const autosaveSection = (() => {
    const rowStyle: React.CSSProperties = {
      display: "flex", alignItems: "center", gap: 10, padding: "12px 20px",
      backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
      borderRadius: system.spacing.radius.md, fontFamily: system.typography.bodyFont, fontSize: 13,
    };

    return (
      <motion.section id="comp-autosave" data-comp-section {...fadeUp} transition={{ delay: 0.5 }} style={{ ...sectionWrap(), display: activeSection === "comp-autosave" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Autosave Indicator</h3>
        <p style={sectionDesc}>Toolbar-style status indicators for autosave feedback in editing contexts.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16, maxWidth: 400 }}>
            {/* Saved */}
            <div style={rowStyle}>
              <SvgIcon size={16} color={palette.success}>{icons.check}</SvgIcon>
              <span style={{ color: palette.success, fontWeight: 600 }}>All changes saved</span>
              <span style={{ color: palette.textSecondary, marginLeft: "auto", fontSize: 12 }}>2 min ago</span>
            </div>
            {/* Saving */}
            <div style={rowStyle}>
              <span style={{ display: "flex", gap: 3, alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: "50%", backgroundColor: palette.textSecondary,
                    display: "inline-block",
                    animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </span>
              <span style={{ color: palette.textSecondary, fontWeight: 500 }}>Saving...</span>
              <style>{`@keyframes dotPulse { 0%,80%,100%{opacity:0.3;transform:scale(0.8)} 40%{opacity:1;transform:scale(1.2)} }`}</style>
            </div>
            {/* Failed */}
            <div style={rowStyle}>
              <SvgIcon size={16} color={palette.danger}>{icons.warning}</SvgIcon>
              <span style={{ color: palette.danger, fontWeight: 600 }}>Failed to save</span>
              <span style={{ color: palette.primary, fontWeight: 600, marginLeft: "auto", cursor: "pointer", fontSize: 13 }}>Retry</span>
            </div>
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     11. Character Counter
  ──────────────────────────────────── */
  const charCounterSection = (() => {
    const maxLen = 500;
    const normalLen = 142;
    const warnLen = warnTextVal.length;
    const overLen = overTextVal.length;

    const counterColor = (len: number) => {
      if (len > maxLen) return palette.danger;
      if (len > maxLen * 0.9) return palette.warning;
      return palette.textSecondary;
    };

    return (
      <motion.section id="comp-char-counter" data-comp-section {...fadeUp} transition={{ delay: 0.55 }} style={{ ...sectionWrap(), display: activeSection === "comp-char-counter" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Character Counter</h3>
        <p style={sectionDesc}>Textarea with live character count feedback in normal, warning, and error states.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 28 }}>
            {/* Normal */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, fontFamily: system.typography.bodyFont }}>Normal</div>
              <div style={{ position: "relative" as const }}>
                <textarea
                  style={{ ...inputBase, minHeight: 80, resize: "vertical" as const }}
                  value="This is a sample text entry for demonstrating the character count feature in the textarea component."
                  readOnly
                />
                <div style={{ textAlign: "right" as const, fontSize: 12, color: palette.textSecondary, marginTop: 4, fontFamily: system.typography.bodyFont }}>
                  {normalLen}/{maxLen}
                </div>
              </div>
            </div>
            {/* Warning */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, fontFamily: system.typography.bodyFont }}>Warning (near limit)</div>
              <div style={{ position: "relative" as const }}>
                <textarea
                  style={{ ...inputBase, minHeight: 80, resize: "vertical" as const, borderColor: warnLen > maxLen * 0.9 ? palette.warning : comp.input.border }}
                  value={warnTextVal}
                  onChange={(e) => setWarnTextVal(e.target.value)}
                />
                <div style={{ textAlign: "right" as const, fontSize: 12, color: counterColor(warnLen), fontWeight: warnLen > maxLen * 0.9 ? 600 : 400, marginTop: 4, fontFamily: system.typography.bodyFont }}>
                  {warnLen}/{maxLen}
                </div>
              </div>
            </div>
            {/* Over limit */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8, fontFamily: system.typography.bodyFont }}>Error (over limit)</div>
              <div style={{ position: "relative" as const }}>
                <textarea
                  style={{ ...inputBase, minHeight: 80, resize: "vertical" as const, borderColor: palette.danger }}
                  value={overTextVal}
                  onChange={(e) => setOverTextVal(e.target.value)}
                />
                <div style={{ textAlign: "right" as const, fontSize: 12, color: palette.danger, fontWeight: 600, marginTop: 4, fontFamily: system.typography.bodyFont }}>
                  {overLen}/{maxLen}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  })();

  /* ────────────────────────────────────
     12. Form Section
  ──────────────────────────────────── */
  const formSectionSection = (() => {
    const [advancedOpen] = useState(true);

    return (
      <motion.section id="comp-form-section" data-comp-section {...fadeUp} transition={{ delay: 0.6 }} style={{ ...sectionWrap(), display: activeSection === "comp-form-section" ? undefined : "none" }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Form Section</h3>
        <p style={sectionDesc}>Grouped form fields with section headings, dividers, and collapsible advanced options.</p>
        <div style={cardBox}>
          {/* Section header */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Personal Information</div>
            <div style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginTop: 4 }}>Fill in your basic contact details below.</div>
          </div>
          <div style={{ height: 1, backgroundColor: palette.border, margin: "16px 0 24px" }} />
          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
            <div>
              <label style={labelBase}>{content.formFields.projectTitle}</label>
              <input style={inputBase} placeholder={content.formFields.placeholder} readOnly />
            </div>
            <div>
              <label style={labelBase}>Email</label>
              <input style={inputBase} placeholder="name@example.com" readOnly />
            </div>
            <div>
              <label style={labelBase}>Phone</label>
              <input style={inputBase} placeholder="+971 50 123 4567" readOnly />
            </div>
          </div>
          {/* Collapsible advanced */}
          <div style={{ marginTop: 28 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
              padding: "12px 0", borderTop: `1px solid ${palette.border}`,
            }}>
              <SvgIcon size={16} color={palette.textSecondary}>
                <polyline
                  points={advancedOpen ? "6 15 12 9 18 15" : "6 9 12 15 18 9"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                />
              </SvgIcon>
              <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>Advanced Options</span>
            </div>
            {advancedOpen && (
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 20, paddingTop: 16, paddingLeft: 24 }}>
                <div>
                  <label style={labelBase}>Company</label>
                  <input style={inputBase} placeholder="Organization name" readOnly />
                </div>
                <div>
                  <label style={labelBase}>Notes</label>
                  <textarea style={{ ...inputBase, minHeight: 72, resize: "vertical" as const }} placeholder="Any additional information…" readOnly />
                </div>
              </div>
            )}
          </div>
          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${palette.border}` }}>
            <button style={{
              padding: "10px 24px", fontSize: 14, fontWeight: 600, borderRadius: system.spacing.radius.md,
              border: `1px solid ${palette.border}`, backgroundColor: "transparent", color: palette.textPrimary,
              cursor: "pointer", fontFamily: system.typography.bodyFont,
            }}>Cancel</button>
            <button style={{
              padding: "10px 24px", fontSize: 14, fontWeight: 600, borderRadius: system.spacing.radius.md,
              border: "none", backgroundColor: palette.primary, color: "#fff",
              cursor: "pointer", fontFamily: system.typography.bodyFont,
            }}>Save Changes</button>
          </div>
        </div>
      </motion.section>
    );
  })();

  return (
    <>
      {iconBtnSection}
      {numberInputSection}
      {rangeSliderSection}
      {tagInputSection}
      {ratingSection}
      {otpSection}
      {formLayoutSection}
      {wizardSection}
      {validationSection}
      {autosaveSection}
      {charCounterSection}
      {formSectionSection}
    </>
  );
}
