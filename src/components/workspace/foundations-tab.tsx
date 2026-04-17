"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import { useDesignSystemStore } from "@/store/design-system";

interface FoundationsTabProps {
  system: DesignSystem;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s, l };
}

function hslToHex(h: number, s: number, l: number): string {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }
  return (
    "#" +
    [r, g, b]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

function generateShades(
  hex: string
): { name: string; hex: string; lightness: number }[] {
  const { h, s } = hexToHsl(hex);
  const steps = [
    { name: "900", l: 0.12 },
    { name: "800", l: 0.2 },
    { name: "700", l: 0.3 },
    { name: "600", l: 0.4 },
    { name: "500", l: 0.5 },
    { name: "400", l: 0.62 },
    { name: "300", l: 0.74 },
    { name: "200", l: 0.86 },
    { name: "100", l: 0.93 },
    { name: "50", l: 0.97 },
  ];
  return steps.map((step) => ({
    name: step.name,
    hex: hslToHex(h, s, step.l),
    lightness: step.l,
  }));
}

function textColorForBg(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#000000" : "#ffffff";
}

function relativeLuminance(hex: string): number {
  const rgb = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export function FoundationsTab({ system }: FoundationsTabProps) {
  const { previewMode } = useDesignSystemStore();
  const palette: PaletteTokenSet =
    previewMode === "dark" ? system.darkPalette : system.palette;
  const altPalette: PaletteTokenSet =
    previewMode === "dark" ? system.palette : system.darkPalette;
  const altLabel = previewMode === "dark" ? "Light" : "Dark";

  const heroSwatches = [
    { name: "Primary", hex: palette.primary },
    { name: "Secondary", hex: palette.secondary },
    { name: "Accent", hex: palette.accent },
    { name: "Success", hex: palette.success },
    { name: "Warning", hex: palette.warning },
  ];

  const allTokens: { name: string; key: keyof PaletteTokenSet; hex: string }[] = [
    { name: "Primary", key: "primary", hex: palette.primary },
    { name: "Primary Hover", key: "primaryHover", hex: palette.primaryHover },
    { name: "Secondary", key: "secondary", hex: palette.secondary },
    { name: "Accent", key: "accent", hex: palette.accent },
    { name: "Background", key: "background", hex: palette.background },
    { name: "Surface", key: "surface", hex: palette.surface },
    { name: "Muted Surface", key: "surfaceMuted", hex: palette.surfaceMuted },
    { name: "Border", key: "border", hex: palette.border },
    { name: "Text Primary", key: "textPrimary", hex: palette.textPrimary },
    { name: "Text Secondary", key: "textSecondary", hex: palette.textSecondary },
    { name: "Success", key: "success", hex: palette.success },
    { name: "Warning", key: "warning", hex: palette.warning },
    { name: "Danger", key: "danger", hex: palette.danger },
    { name: "Info", key: "info", hex: palette.info },
  ];

  const altTokens: { name: string; hex: string }[] = [
    { name: "Primary", hex: altPalette.primary },
    { name: "Primary Hover", hex: altPalette.primaryHover },
    { name: "Secondary", hex: altPalette.secondary },
    { name: "Accent", hex: altPalette.accent },
    { name: "Background", hex: altPalette.background },
    { name: "Surface", hex: altPalette.surface },
    { name: "Muted Surface", hex: altPalette.surfaceMuted },
    { name: "Border", hex: altPalette.border },
    { name: "Text Primary", hex: altPalette.textPrimary },
    { name: "Text Secondary", hex: altPalette.textSecondary },
    { name: "Success", hex: altPalette.success },
    { name: "Warning", hex: altPalette.warning },
    { name: "Danger", hex: altPalette.danger },
    { name: "Info", hex: altPalette.info },
  ];

  const contrastPairings = [
    { label: "Text Primary on Background", fg: palette.textPrimary, bg: palette.background },
    { label: "Text Secondary on Surface", fg: palette.textSecondary, bg: palette.surface },
    { label: "White on Primary", fg: "#ffffff", bg: palette.primary },
    { label: "White on Danger", fg: "#ffffff", bg: palette.danger },
  ];

  const shades = generateShades(palette.primary);

  const isBilingual =
    system.localization.languages === "en-ar" ||
    system.localization.languages === "en-ar-plus" ||
    system.localization.languages === "ar-only";

  const typeScale = [
    { name: "H1", size: system.typography.scale.h1, weight: system.typography.fontWeight.bold, font: system.typography.headingFont, lh: system.typography.lineHeight.tight },
    { name: "H2", size: system.typography.scale.h2, weight: system.typography.fontWeight.semibold, font: system.typography.headingFont, lh: system.typography.lineHeight.tight },
    { name: "H3", size: system.typography.scale.h3, weight: system.typography.fontWeight.semibold, font: system.typography.headingFont, lh: system.typography.lineHeight.tight },
    { name: "H4", size: system.typography.scale.h4, weight: system.typography.fontWeight.medium, font: system.typography.headingFont, lh: system.typography.lineHeight.normal },
    { name: "H5", size: system.typography.scale.h5, weight: system.typography.fontWeight.medium, font: system.typography.headingFont, lh: system.typography.lineHeight.normal },
    { name: "H6", size: system.typography.scale.h6, weight: system.typography.fontWeight.medium, font: system.typography.headingFont, lh: system.typography.lineHeight.normal },
    { name: "Body", size: system.typography.scale.body, weight: system.typography.fontWeight.regular, font: system.typography.bodyFont, lh: system.typography.lineHeight.normal },
    { name: "Small", size: system.typography.scale.small, weight: system.typography.fontWeight.regular, font: system.typography.bodyFont, lh: system.typography.lineHeight.normal },
    { name: "Caption", size: system.typography.scale.caption, weight: system.typography.fontWeight.regular, font: system.typography.bodyFont, lh: system.typography.lineHeight.relaxed },
  ];

  const sectionHeadingStyle: React.CSSProperties = {
    textTransform: "uppercase",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "2px",
    color: palette.primary,
    marginBottom: 12,
    marginTop: 0,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 15,
    color: palette.textSecondary,
    lineHeight: 1.6,
    marginTop: 0,
    marginBottom: 36,
    maxWidth: 640,
  };

  const sublabelStyle: React.CSSProperties = {
    textTransform: "uppercase",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "1.5px",
    color: palette.textSecondary,
    marginTop: 0,
    marginBottom: 0,
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    padding: 32,
  };

  const annotationStyle: React.CSSProperties = {
    fontSize: 11,
    color: palette.textSecondary,
    fontFamily: "monospace",
    whiteSpace: "nowrap",
    marginLeft: 16,
    flexShrink: 0,
  };

  const fnNavItems = [
    { id: "fn-palette", label: "Colour Palette" },
    { id: "fn-typography", label: "Typography" },
    { id: "fn-spacing", label: "Spacing & Shape" },
  ];

  const [activeSection, setActiveSection] = useState<string>("");

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    const sections = document.querySelectorAll("[data-tab-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const renderNavBtn = (item: { id: string; label: string }) => {
    const isActive = activeSection === item.id;
    return (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "5px 16px 5px 20px",
          fontSize: 12,
          fontWeight: isActive ? 600 : 400,
          color: isActive ? palette.primary : palette.textSecondary,
          backgroundColor: isActive ? palette.primary + "08" : "transparent",
          borderTop: "none",
          borderRight: "none",
          borderBottom: "none",
          borderLeftWidth: 2,
          borderLeftStyle: "solid",
          borderLeftColor: isActive ? palette.primary : "transparent",
          cursor: "pointer",
          transition: "all 0.15s",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.label}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", gap: 0, position: "relative" }}>
      <nav style={{
        width: 200,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        borderRight: `1px solid ${palette.border}`,
        padding: "24px 0",
        backgroundColor: palette.background,
      }}>
        <div style={{ padding: "0 16px 16px", fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Foundations
        </div>
        {fnNavItems.map(renderNavBtn)}
      </nav>
      <div style={{ flex: 1, minWidth: 0, padding: "0 0 0 24px" }}>
      <div style={{ padding: 0 }}>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 8.1 — BRAND TOKENS / COLOUR PALETTE
          ════════════════════════════════════════════════════════════════ */}
      <motion.section id="fn-palette" data-tab-section {...fadeUp} style={{ marginBottom: 72 }}>
        <p style={sectionHeadingStyle}>COLOUR PALETTE</p>
        <p style={descriptionStyle}>
          The core colour tokens used across every surface, component, and
          interaction state in the system. All 14 tokens are shown below with
          their hex values.
        </p>

        {/* ── Hero Swatches (5 large) ── */}
        <motion.div
          style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 48 }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {heroSwatches.map((swatch) => (
            <motion.div
              key={swatch.name}
              variants={fadeUp}
              style={{
                width: 140,
                height: 80,
                borderRadius: system.spacing.radius.md,
                backgroundColor: swatch.hex,
                border: `1px solid ${palette.border}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "12px 14px",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: textColorForBg(swatch.hex),
                  lineHeight: 1.2,
                }}
              >
                {swatch.name}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  color: textColorForBg(swatch.hex),
                  opacity: 0.8,
                  fontFamily: "monospace",
                  marginTop: 3,
                }}
              >
                {swatch.hex.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Full 14-Token Grid (7×2) ── */}
        <p style={{ ...sublabelStyle, marginBottom: 20 }}>ALL 14 TOKENS</p>
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 14,
            marginBottom: 48,
          }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {allTokens.map((token) => (
            <motion.div
              key={token.key}
              variants={fadeUp}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 60,
                  borderRadius: system.spacing.radius.sm,
                  backgroundColor: token.hex,
                  border: `1px solid ${palette.border}`,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: palette.textPrimary,
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {token.name}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: palette.textSecondary,
                  fontFamily: "monospace",
                }}
              >
                {token.hex.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Light vs Dark Side-by-Side ── */}
        <p style={{ ...sublabelStyle, marginBottom: 20 }}>
          {altLabel.toUpperCase()} PALETTE REFERENCE
        </p>
        <div style={{ ...cardStyle, marginBottom: 48, padding: 28 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
            }}
          >
            {/* Current mode */}
            <div>
              <p
                style={{
                  ...sublabelStyle,
                  marginBottom: 16,
                  color: palette.textPrimary,
                  fontSize: 12,
                }}
              >
                CURRENT ({previewMode === "dark" ? "DARK" : "LIGHT"})
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 8,
                }}
              >
                {allTokens.map((token) => (
                  <div
                    key={`current-${token.key}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: 28,
                        borderRadius: system.spacing.radius.sm,
                        backgroundColor: token.hex,
                        border: `1px solid ${palette.border}`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 8,
                        color: palette.textSecondary,
                        fontFamily: "monospace",
                      }}
                    >
                      {token.hex.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alt mode */}
            <div>
              <p
                style={{
                  ...sublabelStyle,
                  marginBottom: 16,
                  color: palette.textPrimary,
                  fontSize: 12,
                }}
              >
                {altLabel.toUpperCase()} MODE
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 8,
                }}
              >
                {altTokens.map((token, i) => (
                  <div
                    key={`alt-${i}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: 28,
                        borderRadius: system.spacing.radius.sm,
                        backgroundColor: token.hex,
                        border: `1px solid ${palette.border}`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 8,
                        color: palette.textSecondary,
                        fontFamily: "monospace",
                      }}
                    >
                      {token.hex.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Primary Shade Scale ── */}
        <p style={{ ...sublabelStyle, marginBottom: 20 }}>PRIMARY SHADE SCALE</p>
        <motion.div
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {shades.map((shade) => (
            <motion.div
              key={shade.name}
              variants={fadeUp}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 44,
                  borderRadius: system.spacing.radius.sm,
                  backgroundColor: shade.hex,
                  border: `1px solid ${palette.border}`,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: palette.textPrimary,
                }}
              >
                {shade.name}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: palette.textSecondary,
                  fontFamily: "monospace",
                }}
              >
                {shade.hex.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Contrast Pairings ── */}
        <p style={{ ...sublabelStyle, marginBottom: 20 }}>CONTRAST PAIRINGS</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {contrastPairings.map((pair) => {
            const ratio = contrastRatio(pair.fg, pair.bg);
            const passAA = ratio >= 4.5;
            const passAAA = ratio >= 7;
            return (
              <div
                key={pair.label}
                style={{
                  ...cardStyle,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    backgroundColor: pair.bg,
                    borderRadius: system.spacing.radius.sm,
                    padding: "16px 20px",
                    border: `1px solid ${palette.border}`,
                  }}
                >
                  <span
                    style={{
                      color: pair.fg,
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  >
                    Sample Text
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: palette.textPrimary,
                      margin: 0,
                      marginBottom: 6,
                    }}
                  >
                    {pair.label}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "monospace",
                        color: palette.textPrimary,
                      }}
                    >
                      {ratio.toFixed(2)}:1
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: system.spacing.radius.sm,
                        backgroundColor: passAA ? palette.success : palette.danger,
                        color: textColorForBg(passAA ? palette.success : palette.danger),
                      }}
                    >
                      AA {passAA ? "PASS" : "FAIL"}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: system.spacing.radius.sm,
                        backgroundColor: passAAA ? palette.success : palette.danger,
                        color: textColorForBg(passAAA ? palette.success : palette.danger),
                      }}
                    >
                      AAA {passAAA ? "PASS" : "FAIL"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 8.2 — TYPOGRAPHY SYSTEM
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="fn-typography"
        data-tab-section
        {...fadeUp}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: 72 }}
      >
        <p style={sectionHeadingStyle}>TYPOGRAPHY</p>
        <p style={descriptionStyle}>
          The complete type scale from H1 through Caption, with heading and body
          font pairings. Each level shows a rendered sample with size and weight
          annotations.
        </p>

        {/* ── Font Info ── */}
        <div
          style={{
            ...cardStyle,
            marginBottom: 36,
            display: "grid",
            gridTemplateColumns: isBilingual ? "1fr 1fr" : "1fr",
            gap: 32,
          }}
        >
          <div>
            <p style={{ ...sublabelStyle, marginBottom: 16 }}>LATIN FONTS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: palette.textSecondary }}>Heading</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>
                  {system.typography.headingFont}
                </span>
              </div>
              <div style={{ height: 1, backgroundColor: palette.border }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: palette.textSecondary }}>Body</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>
                  {system.typography.bodyFont}
                </span>
              </div>
            </div>
          </div>

          {isBilingual && (
            <div>
              <p style={{ ...sublabelStyle, marginBottom: 16 }}>ARABIC FONTS</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: palette.textSecondary }}>Heading</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.arabicHeadingFont }}>
                    {system.typography.arabicHeadingFont}
                  </span>
                </div>
                <div style={{ height: 1, backgroundColor: palette.border }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: palette.textSecondary }}>Body</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.arabicBodyFont }}>
                    {system.typography.arabicBodyFont}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Line Height & Font Weight Reference ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div style={{ ...cardStyle, padding: 24 }}>
            <p style={{ ...sublabelStyle, marginBottom: 16 }}>LINE HEIGHT</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(Object.entries(system.typography.lineHeight) as [string, string][]).map(
                ([key, val]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 13, color: palette.textPrimary, textTransform: "capitalize" }}>
                      {key}
                    </span>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: palette.textSecondary }}>
                      {val}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div style={{ ...cardStyle, padding: 24 }}>
            <p style={{ ...sublabelStyle, marginBottom: 16 }}>FONT WEIGHT</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(Object.entries(system.typography.fontWeight) as [string, number][]).map(
                ([key, val]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: palette.textPrimary,
                        textTransform: "capitalize",
                        fontWeight: val,
                      }}
                    >
                      {key}
                    </span>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: palette.textSecondary }}>
                      {val}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* ── Complete Type Scale ── */}
        <div style={cardStyle}>
          <p style={{ ...sublabelStyle, marginBottom: 24 }}>
            COMPLETE TYPE SCALE
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {typeScale.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${palette.border}`,
                  paddingBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: item.font,
                    fontSize: item.size,
                    fontWeight: item.weight,
                    color: palette.textPrimary,
                    lineHeight: item.lh,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                    marginRight: 24,
                  }}
                >
                  {item.name === "Body" || item.name === "Small" || item.name === "Caption"
                    ? "The quick brown fox jumps over the lazy dog."
                    : "Design foundations"}
                </span>
                <span style={annotationStyle}>
                  {item.name} / {item.size} {item.weight}
                </span>
              </div>
            ))}
          </div>

          {/* ── Arabic Type Scale ── */}
          {isBilingual && (
            <div style={{ marginTop: 40 }}>
              <p style={{ ...sublabelStyle, marginBottom: 24 }}>
                ARABIC TYPE SCALE — {system.typography.arabicHeadingFont}
              </p>
              <div
                dir="rtl"
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {([
                  { label: "عنوان كبير", annotation: "H1", size: system.typography.scale.h1, weight: system.typography.fontWeight.bold, font: system.typography.arabicHeadingFont },
                  { label: "عنوان متوسط", annotation: "H2", size: system.typography.scale.h2, weight: system.typography.fontWeight.semibold, font: system.typography.arabicHeadingFont },
                  { label: "عنوان ثالث", annotation: "H3", size: system.typography.scale.h3, weight: system.typography.fontWeight.semibold, font: system.typography.arabicHeadingFont },
                  { label: "نص أساسي للمحتوى والفقرات الطويلة", annotation: "Body", size: system.typography.scale.body, weight: system.typography.fontWeight.regular, font: system.typography.arabicBodyFont },
                  { label: "نص صغير للتعليقات", annotation: "Caption", size: system.typography.scale.caption, weight: system.typography.fontWeight.regular, font: system.typography.arabicBodyFont },
                ] as const).map((item) => (
                  <div
                    key={item.annotation}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      borderBottom: `1px solid ${palette.border}`,
                      paddingBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: item.font,
                        fontSize: item.size,
                        fontWeight: item.weight,
                        color: palette.textPrimary,
                        lineHeight: system.typography.lineHeight.normal,
                        flex: 1,
                        marginLeft: 24,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      dir="ltr"
                      style={{
                        ...annotationStyle,
                        marginLeft: 0,
                        marginRight: 16,
                      }}
                    >
                      {item.annotation} / {item.size} {item.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 8.3 — SHAPE AND SPACING
          ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="fn-spacing"
        data-tab-section
        {...fadeUp}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: 72 }}
      >
        <p style={sectionHeadingStyle}>SPACING & SHAPE</p>
        <p style={descriptionStyle}>
          Border radii, spacing scale, and elevation tokens that control the
          physical rhythm and depth of the interface.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {/* ── Border Radius ── */}
          <div style={{ ...cardStyle, padding: 32 }}>
            <p style={{ ...sublabelStyle, marginBottom: 24 }}>BORDER RADIUS</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                gap: 20,
              }}
            >
              {(Object.entries(system.spacing.radius) as [string, string][]).map(
                ([key, val]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: val,
                        border: `2px solid ${palette.primary}`,
                        backgroundColor: `${palette.primary}14`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: palette.textPrimary,
                      }}
                    >
                      {key}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        color: palette.textSecondary,
                        fontFamily: "monospace",
                      }}
                    >
                      {val}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ── Spacing Scale (Bar Chart) ── */}
          <div style={{ ...cardStyle, padding: 32 }}>
            <p style={{ ...sublabelStyle, marginBottom: 24 }}>SPACING SCALE</p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 10,
                height: 140,
              }}
            >
              {system.spacing.scale.map((val, i) => {
                const maxVal = Math.max(...system.spacing.scale);
                const barHeight = Math.max(6, (val / maxVal) * 120);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 24,
                        height: barHeight,
                        backgroundColor: palette.primary,
                        borderRadius: system.spacing.radius.sm,
                        opacity: 0.3 + (i / system.spacing.scale.length) * 0.7,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 9,
                        color: palette.textSecondary,
                        fontFamily: "monospace",
                      }}
                    >
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Elevation ── */}
          <div style={{ ...cardStyle, padding: 32 }}>
            <p style={{ ...sublabelStyle, marginBottom: 24 }}>ELEVATION</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 20,
              }}
            >
              {(Object.entries(system.spacing.elevation) as [string, string][]).map(
                ([key, val]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 44,
                        borderRadius: system.spacing.radius.md,
                        backgroundColor: palette.surface,
                        border:
                          key === "none"
                            ? `1px solid ${palette.border}`
                            : "none",
                        boxShadow: val,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: palette.textPrimary,
                      }}
                    >
                      {key}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
    </div>
    </div>
  );
}
