"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface SignInSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const EyeIcon = ({ off }: { off?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    {off && <line x1="1" y1="1" x2="23" y2="23" />}
  </svg>
);
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export function SignInSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: SignInSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email.includes("@")) e.email = "Enter a valid email address";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    if (!e.email && !e.password) setShow2FA(true);
  };

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: "100%", padding: "10px 14px", borderRadius: radius.md, border: `1px solid ${hasError ? palette.danger : palette.border}`,
    fontSize: 13, color: palette.textPrimary, backgroundColor: "transparent", outline: "none", fontFamily: system.typography.bodyFont,
  });
  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" };
  const socialBtn: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "10px 0", borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: "transparent", fontSize: 13, fontWeight: 500, color: palette.textPrimary, cursor: "pointer", fontFamily: system.typography.bodyFont };

  return (
    <motion.section id="comp-sign-in" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Sign In</p>
      <p style={sectionDesc}>
        A sign-in form with email/password fields, social login buttons, forgot password link, sign-up redirect, and two-factor authentication step.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: radius.lg, maxWidth: 400, margin: "0 auto", width: "100%" }}>
          {!show2FA ? (
            <>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: radius.md, backgroundColor: palette.primary + "15", color: palette.primary, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 18 }}><LockIcon /></div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, margin: "0 0 4px", fontFamily: system.typography.headingFont }}>Welcome back</h3>
                <p style={{ fontSize: 13, color: palette.textSecondary, margin: 0 }}>Sign in to your account</p>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle(!!errors.email)} />
                {errors.email && <span style={{ fontSize: 11, color: palette.danger, marginTop: 4, display: "block" }}>{errors.email}</span>}
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle(!!errors.password), paddingRight: 40 }} />
                  <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, display: "flex" }}><EyeIcon off={!showPassword} /></button>
                </div>
                {errors.password && <span style={{ fontSize: 11, color: palette.danger, marginTop: 4, display: "block" }}>{errors.password}</span>}
              </div>
              <div style={{ textAlign: "right", marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: palette.primary, cursor: "pointer" }}>Forgot password?</span>
              </div>
              <button onClick={validate} style={{ width: "100%", padding: "10px 0", borderRadius: radius.md, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: system.typography.bodyFont, marginBottom: 16 }}>Sign in</button>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
                <span style={{ fontSize: 11, color: palette.textSecondary }}>or continue with</span>
                <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={socialBtn}>G</button>
                <button style={socialBtn}>🍎</button>
                <button style={socialBtn}>🔗</button>
              </div>
              <p style={{ textAlign: "center", fontSize: 12, color: palette.textSecondary, marginTop: 20, marginBottom: 0 }}>
                Don&apos;t have an account? <span style={{ color: palette.primary, cursor: "pointer", fontWeight: 600 }}>Sign up</span>
              </p>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: radius.md, backgroundColor: palette.info + "15", color: palette.info, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 18 }}>🔐</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, margin: "0 0 4px", fontFamily: system.typography.headingFont }}>Two-Factor Auth</h3>
              <p style={{ fontSize: 13, color: palette.textSecondary, margin: "0 0 24px" }}>Enter the 6-digit code from your authenticator</p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                {otpValues.map((v, i) => (
                  <input key={i} maxLength={1} value={v} onChange={e => { const arr = [...otpValues]; arr[i] = e.target.value; setOtpValues(arr); }} style={{ width: 40, height: 48, textAlign: "center", fontSize: 20, fontWeight: 700, borderRadius: radius.md, border: `1px solid ${v ? palette.primary : palette.border}`, color: palette.textPrimary, backgroundColor: "transparent", outline: "none", fontFamily: "monospace" }} />
                ))}
              </div>
              <button style={{ width: "100%", padding: "10px 0", borderRadius: radius.md, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: system.typography.bodyFont }}>Verify</button>
              <button onClick={() => setShow2FA(false)} style={{ border: "none", background: "none", fontSize: 12, color: palette.textSecondary, marginTop: 12, cursor: "pointer", fontFamily: "inherit" }}>← Back to sign in</button>
            </div>
          )}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Input Radius", radius.md], ["Button BG", "palette.primary"], ["Error Color", "palette.danger"], ["Social Border", "palette.border"], ["OTP Cell", "40×48px"], ["Font", system.typography.bodyFont]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Social Only</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[{ l: "Continue with Google", i: "G" }, { l: "Continue with Apple", i: "🍎" }, { l: "Continue with SSO", i: "🔗" }].map(s => (
              <button key={s.l} style={socialBtn}><span>{s.i}</span> {s.l}</button>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Magic Link</div>
          <label style={labelStyle}>Email address</label>
          <input type="email" placeholder="you@example.com" style={inputStyle()} />
          <button style={{ width: "100%", padding: "10px 0", borderRadius: radius.md, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: system.typography.bodyFont, marginTop: 12 }}>Send magic link ✨</button>
          <p style={{ fontSize: 11, color: palette.textSecondary, textAlign: "center", marginTop: 10, marginBottom: 0 }}>We&apos;ll email you a login link</p>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use sign in" description="Sign in forms are needed for:" items={["User authentication gateways", "Protected app and dashboard access", "Account settings and profiles", "Subscription-gated content"]} />
        <UsageSection palette={palette} title="Sign in best practices" description="Reduce friction:" items={["Show password toggle for visibility", "Validate inline before submission", "Offer social login for quick access", "Support magic link as passwordless option"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show inline validation errors directly below each field." },
        { type: "dont", text: "Don't require CAPTCHA on every login — use it after failed attempts." },
        { type: "do", text: "Offer a clear 'Forgot password' link near the password field." },
        { type: "dont", text: "Don't auto-submit forms — let users review before submitting." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Logo / header", description: "Brand identity and welcome message", x: 50, y: 8 },
        { id: 2, label: "Email field", description: "Text input with label and validation", x: 50, y: 28 },
        { id: 3, label: "Password field", description: "Masked input with toggle visibility", x: 50, y: 44 },
        { id: 4, label: "Submit button", description: "Primary CTA to authenticate", x: 50, y: 60 },
        { id: 5, label: "Social logins", description: "OAuth provider buttons row", x: 50, y: 78 },
      ]} renderPreview={(h) => (
        <div style={{ width: 140, padding: 10, border: `1px solid ${palette.border}`, borderRadius: 8, backgroundColor: palette.surface }}>
          <div style={{ textAlign: "center", marginBottom: 8, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: palette.primary + "20", margin: "0 auto 4px" }} />
            <div style={{ fontSize: 7, fontWeight: 700, color: palette.textPrimary }}>Sign in</div>
          </div>
          <div style={{ height: 14, borderRadius: 3, border: `1px solid ${palette.border}`, marginBottom: 6, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
          <div style={{ height: 14, borderRadius: 3, border: `1px solid ${palette.border}`, marginBottom: 8, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
          <div style={{ height: 14, borderRadius: 3, backgroundColor: palette.primary, marginBottom: 8, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
          <div style={{ display: "flex", gap: 4, justifyContent: "center", opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {[1, 2, 3].map(i => <div key={i} style={{ width: 20, height: 12, borderRadius: 3, border: `1px solid ${palette.border}` }} />)}
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Form Max Width", value: "400px" },
        { label: "Input Padding", value: "10px 14px" },
        { label: "Input Font", value: "13px" },
        { label: "Button Height", value: "40px (10px padding)" },
        { label: "OTP Cell Size", value: "40×48px" },
        { label: "Social Button", value: "10px padding, full width" },
        { label: "Label Font", value: "12px / 600" },
      ]} />
    </motion.section>
  );
}
