"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface OtpSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function OtpSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: OtpSectionProps) {
  const comp = system.components;
  const [heroDigits, setHeroDigits] = useState(["3", "8", "2", "", "", ""]);
  const [fourDigits, setFourDigits] = useState(["", "", "", ""]);
  const [alphaDigits, setAlphaDigits] = useState(["A", "7", "", "", "", ""]);
  const [maskedDigits, setMaskedDigits] = useState(["5", "1", "9", "2", "", ""]);
  const [errorDigits] = useState(["4", "2", "1", "8", "0", "7"]);
  const [countdown, setCountdown] = useState(42);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const heroRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fourRefs = useRef<(HTMLInputElement | null)[]>([]);

  const inputRadius = parseInt(comp.input.borderRadius) || 8;

  useEffect(() => {
    const timer = setInterval(() => setCountdown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const handleChange = useCallback((
    digits: string[], setDigits: (d: string[]) => void,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    index: number, value: string, alphanumeric?: boolean,
  ) => {
    const pattern = alphanumeric ? /^[a-zA-Z0-9]$/ : /^[0-9]$/;
    if (value && !pattern.test(value)) return;
    const next = [...digits];
    next[index] = value.toUpperCase();
    setDigits(next);
    if (value && index < digits.length - 1) refs.current[index + 1]?.focus();
  }, []);

  const handleKeyDown = useCallback((
    digits: string[], setDigits: (d: string[]) => void,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    index: number, key: string,
  ) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      refs.current[index - 1]?.focus();
    }
  }, []);

  const handlePaste = useCallback((
    setDigits: (d: string[]) => void, length: number,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    e: React.ClipboardEvent,
  ) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\s/g, "").slice(0, length);
    const next = paste.split("").concat(Array(length - paste.length).fill(""));
    setDigits(next.slice(0, length));
    const focusIdx = Math.min(paste.length, length - 1);
    refs.current[focusIdx]?.focus();
  }, []);

  const renderOtpInput = (
    id: string, digits: string[], setDigits: (d: string[]) => void,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    opts: { separator?: number; masked?: boolean; error?: boolean; disabled?: boolean; alphanumeric?: boolean; expired?: boolean } = {}
  ) => {
    const { separator, masked, error, disabled, alphanumeric, expired } = opts;
    const isComplete = digits.every(d => d !== "");
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {digits.map((d, i) => (
            <div key={i} style={{ display: "contents" }}>
              {separator && i === separator && (
                <span style={{ fontSize: 20, color: palette.textSecondary, margin: "0 4px", fontWeight: 700 }}>—</span>
              )}
              <input
                ref={(el) => { refs.current[i] = el; }}
                type="text" inputMode={alphanumeric ? "text" : "numeric"}
                maxLength={1} value={masked && d ? "●" : d}
                disabled={disabled || expired}
                onChange={(e) => handleChange(digits, setDigits, refs, i, e.target.value, alphanumeric)}
                onKeyDown={(e) => handleKeyDown(digits, setDigits, refs, i, e.key)}
                onPaste={(e) => i === 0 && handlePaste(setDigits, digits.length, refs, e)}
                onFocus={() => setFocusedInput(`${id}-${i}`)}
                onBlur={() => setFocusedInput(null)}
                style={{
                  width: 44, height: 52, borderRadius: inputRadius,
                  border: `1.5px solid ${
                    error ? palette.danger :
                    expired ? palette.warning :
                    focusedInput === `${id}-${i}` ? palette.primary :
                    d ? palette.primary + "50" : palette.border
                  }`,
                  backgroundColor: disabled || expired ? palette.surfaceMuted : palette.background,
                  color: expired ? palette.textSecondary : palette.textPrimary,
                  fontSize: masked && d ? 24 : 20, fontWeight: 700, textAlign: "center",
                  fontFamily: system.typography.bodyFont, outline: "none",
                  transition: "border-color 0.15s, background-color 0.15s",
                  opacity: disabled ? 0.4 : 1,
                  cursor: disabled || expired ? "not-allowed" : "text",
                }}
              />
            </div>
          ))}
        </div>
        {error && <div style={{ fontSize: 11, color: palette.danger, marginTop: 8 }}>Invalid verification code. Please try again.</div>}
        {expired && <div style={{ fontSize: 11, color: palette.warning, marginTop: 8 }}>Code expired. Request a new one.</div>}
        {isComplete && !error && !expired && <div style={{ fontSize: 11, color: palette.success, marginTop: 8 }}>✓ Code complete</div>}
      </div>
    );
  };

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <motion.section id="comp-otp" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>OTP Input</p>
      <p style={sectionDesc}>
        OTP inputs provide individual character fields for verification codes with auto-focus navigation, paste support, and expiry countdown.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 160, gap: 12 }}>
          <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 4 }}>Enter the 6-digit code</div>
          {renderOtpInput("hero", heroDigits, setHeroDigits, heroRefs)}
          <div style={{ fontSize: 12, color: countdown > 0 ? palette.textSecondary : palette.danger, marginTop: 4 }}>
            {countdown > 0 ? `Resend code in ${formatTime(countdown)}` : "Code expired — resend"}
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Cell Size", "44 × 52 px")}
          {tokenRow("Border Radius", comp.input.borderRadius)}
          {tokenRow("Font Size", "20px")}
          {tokenRow("Focus Border", "palette.primary")}
          {tokenRow("Gap", "8px")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>4-Digit</div>
          {renderOtpInput("v-four", fourDigits, setFourDigits, fourRefs)}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>6-Digit</div>
          {renderOtpInput("v-six", heroDigits, setHeroDigits, heroRefs)}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Separator</div>
          {renderOtpInput("v-sep", heroDigits, setHeroDigits, heroRefs, { separator: 3 })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Alphanumeric</div>
          {renderOtpInput("v-alpha", alphaDigits, setAlphaDigits, heroRefs, { alphanumeric: true })}
        </div>
        <div style={{ ...showcaseBox, gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Masked (Dots)</div>
          {renderOtpInput("v-masked", maskedDigits, setMaskedDigits, heroRefs, { masked: true })}
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Empty</div>
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} style={{
                width: 44, height: 52, borderRadius: inputRadius,
                border: `1.5px solid ${palette.border}`, backgroundColor: palette.background,
              }} />
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Filling</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["4", "2", "", ""].map((d, i) => (
              <div key={i} style={{
                width: 44, height: 52, borderRadius: inputRadius,
                border: `1.5px solid ${d ? palette.primary + "50" : i === 2 ? palette.primary : palette.border}`,
                backgroundColor: palette.background, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 700, color: palette.textPrimary,
              }}>{d}{i === 2 && <span style={{ animation: "none", borderLeft: `2px solid ${palette.primary}`, height: 20, display: "inline-block" }} />}</div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Complete</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["4", "2", "1", "8"].map((d, i) => (
              <div key={i} style={{
                width: 44, height: 52, borderRadius: inputRadius,
                border: `1.5px solid ${palette.success}50`,
                backgroundColor: palette.success + "08", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 700, color: palette.textPrimary,
              }}>{d}</div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: palette.success, marginTop: 6 }}>✓ Verified</div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Error</div>
          {renderOtpInput("s-error", errorDigits, () => {}, heroRefs, { error: true })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Expired</div>
          {renderOtpInput("s-expired", ["1", "5", "3", "7", "9", "2"], () => {}, heroRefs, { expired: true })}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Disabled</div>
          {renderOtpInput("s-disabled", ["", "", "", ""], () => {}, fourRefs, { disabled: true })}
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use OTP inputs" description="OTP inputs are designed for verification flows:" items={[
          "Two-factor authentication (2FA) codes",
          "Phone number or email verification",
          "Transaction confirmation codes",
          "Invite or referral code entry",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Make OTP entry as frictionless as possible:" items={[
          "Auto-focus the first field on mount",
          "Support paste to fill all fields at once",
          "Move focus automatically on digit entry",
          "Show a countdown timer and resend option",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Auto-advance focus to the next cell when a digit is entered." },
        { type: "dont", text: "Don't require users to click each cell individually." },
        { type: "do", text: "Support pasting the entire code from SMS or authenticator apps." },
        { type: "dont", text: "Don't mask OTP digits by default — users need to verify what they typed." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Cell", description: "Individual input box for one character", x: 20, y: 50 },
        { id: 2, label: "Cursor", description: "Blinking caret in the active cell", x: 35, y: 50 },
        { id: 3, label: "Separator", description: "Optional dash between cell groups", x: 50, y: 50 },
        { id: 4, label: "Status Text", description: "Error, expiry, or success message", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["3", "8", "2"].map((d, i) => (
              <div key={i} style={{
                width: 40, height: 48, borderRadius: inputRadius,
                border: `1.5px solid ${palette.primary}50`, backgroundColor: palette.background,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 700, color: palette.textPrimary,
                opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>{d}</div>
            ))}
            <span style={{
              fontSize: 18, color: palette.textSecondary, fontWeight: 700,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>—</span>
            <div style={{
              width: 40, height: 48, borderRadius: inputRadius,
              border: `1.5px solid ${palette.primary}`, backgroundColor: palette.background,
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: h === 1 || h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>
              <span style={{
                borderLeft: `2px solid ${palette.primary}`, height: 18, display: "inline-block",
                opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }} />
            </div>
            {["", ""].map((_, i) => (
              <div key={i + 4} style={{
                width: 40, height: 48, borderRadius: inputRadius,
                border: `1.5px solid ${palette.border}`, backgroundColor: palette.background,
                opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }} />
            ))}
          </div>
          <div style={{
            fontSize: 11, color: palette.textSecondary, marginTop: 6,
            opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>Resend code in 0:42</div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Cell Width", value: "44px" },
        { label: "Cell Height", value: "52px" },
        { label: "Cell Border Radius", value: comp.input.borderRadius },
        { label: "Cell Gap", value: "8px" },
        { label: "Separator Width", value: "16px" },
        { label: "Font Size", value: "20px" },
        { label: "Border Width", value: "1.5px" },
      ]} />
    </motion.section>
  );
}
