"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const ACCENT = "#818CF8";
const ACCENT2 = "#A78BFA";
const ACCENT3 = "#22D3EE";
const SHELL_BG = "#0c0c10";
const SURFACE_ALT = "#141420";
const SURFACE_RAISED = "#1a1a28";

const GLASS = {
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.07)",
} as const;

const GLASS_BRIGHT = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.1)",
} as const;

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const dur = 1600;
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - t, 4)) * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Reveal({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function MonoLabel({ children, pulse = false }: { children: React.ReactNode; pulse?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", textTransform: "uppercase" as const, letterSpacing: "0.15em", fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>
      {pulse && <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />}
      {children}
    </span>
  );
}

function MagneticCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, ...style }} onMouseMove={(e) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; x.set((e.clientX - r.left - r.width / 2) * 0.05); y.set((e.clientY - r.top - r.height / 2) * 0.05); }} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

const FEATURES = [
  { icon: "palette", title: "Brand Tokens", desc: "Generate semantic color tokens, contrast-safe pairings, and reusable foundations for light and dark themes.", count: "14+", span: "1x1" },
  { icon: "type", title: "Typography", desc: "Choose from curated bilingual-ready type styles with English and Arabic previews.", count: "6", span: "1x1" },
  { icon: "grid", title: "Themed Components", desc: "Buttons, inputs, cards, tables, badges, navigation, and more — all styled from your generated system.", count: "96+", span: "2x1" },
  { icon: "layout", title: "App Shell & Templates", desc: "Get starter structures for dashboards, forms, lists, settings, and portal-style layouts.", count: "7", span: "1x1" },
  { icon: "file", title: "Field Specifications", desc: "Spacing, radius, density, hierarchy, and component behavior generated as a usable system.", count: "70", span: "1x1" },
  { icon: "globe", title: "Bilingual & RTL Rules", desc: "Arabic support, mirrored layout logic, and regional formatting built into the system from the start.", count: "EN+AR", span: "2x1" },
];

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  palette: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /><circle cx="8" cy="9" r="1.5" fill="currentColor" /><circle cx="12" cy="7" r="1.5" fill="currentColor" /><circle cx="16" cy="9" r="1.5" fill="currentColor" /><circle cx="7" cy="13" r="1.5" fill="currentColor" /></svg>,
  type: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><path d="M4 7V4h16v3M9 20h6M12 4v16" /></svg>,
  grid: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
  layout: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
  file: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></svg>,
  globe: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
};

const STEPS = [
  { num: "01", title: "Answer a few guided questions", desc: "Tell us what you're building, your industry, preferred visual tone, and language needs." },
  { num: "02", title: "We generate your system foundations", desc: "We turn your inputs into tokens, typography, density rules, and layout direction." },
  { num: "03", title: "Components and screens are themed automatically", desc: "Your design system is applied across core UI components and starter templates." },
  { num: "04", title: "Review, edit, and apply", desc: "Preview the result, compare English and Arabic modes, and save or export your system." },
];

const MARQUEE_LABELS = [
  "Button", "Card", "Input", "Table", "Modal", "Toast", "Badge", "Toggle",
  "Sidebar", "Chart", "Accordion", "Avatar", "Pagination", "Breadcrumbs",
  "File Upload", "Rating", "OTP Input", "Calendar", "Timeline", "Tooltip",
  "Tabs", "Dropdown", "Popover", "Tag Input", "Stepper", "Search Bar",
];

const DELIVERABLES = [
  { icon: "◆", label: "Semantic color tokens" },
  { icon: "Aa", label: "Typography system" },
  { icon: "⊞", label: "Spacing and radius rules" },
  { icon: "▣", label: "Themed core components" },
  { icon: "⊡", label: "Starter screen templates" },
  { icon: "عA", label: "Bilingual and RTL-ready logic" },
  { icon: "◐", label: "Light and dark theme support" },
  { icon: "✎", label: "Editable design system output" },
];

const PIPELINE = ["Inputs", "Inference", "Tokens", "Components", "Screens"];

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(129,140,248,0.12), transparent 70%)`, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", top: "40%", right: "-15%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)`, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)`, filter: "blur(120px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1680, margin: "0 auto", padding: "12px", minHeight: "100vh" }}>
        <div style={{ background: SHELL_BG, borderRadius: "2.5rem", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 0 80px -20px rgba(0,0,0,0.8)", overflow: "hidden", position: "relative" }}>

          {/* NAV */}
          <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 56px", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", background: "rgba(12,12,16,0.85)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" /><circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" /></svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "-0.3px" }}>Palette</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <MonoLabel pulse>System Online</MonoLabel>
              <Link href="/onboarding">
                <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#000", fontSize: 13, fontWeight: 600, padding: "8px 22px", borderRadius: 999, cursor: "pointer" }}>
                  Get Started
                </motion.span>
              </Link>
            </div>
          </motion.nav>

          {/* ━━━ HERO ━━━ */}
          <motion.div style={{ y: heroY, opacity: heroOpacity, position: "relative", padding: "100px 64px 80px", overflow: "hidden" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
                <div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} style={{ marginBottom: 24 }}>
                    <MonoLabel pulse>AI design system generator for GCC &amp; MENA teams</MonoLabel>
                  </motion.div>

                  <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#ebebeb", marginBottom: 24 }}>
                    Generate a complete
                    <br />
                    <span style={{ fontStyle: "italic", color: ACCENT }}>design system,</span>
                    <br />
                    not just a color palette
                  </motion.h1>

                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
                    Answer a short onboarding flow and generate tokens, typography, themed components, starter screens, and bilingual RTL-ready rules — in minutes.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.5 }} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                    <Link href="/onboarding">
                      <motion.span whileHover={{ scale: 1.05, boxShadow: `0 0 40px rgba(129,140,248,0.4)` }} whileTap={{ scale: 0.96 }} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: "#fff", fontSize: 14, fontWeight: 600, padding: "14px 32px", borderRadius: 999, boxShadow: `0 0 30px rgba(129,140,248,0.3)`, cursor: "pointer" }}>
                        Start building for free
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </motion.span>
                    </Link>
                    <Link href="#showcase" style={{ textDecoration: "none" }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.45)", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2, cursor: "pointer" }}>See what gets generated</span>
                    </Link>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} style={{ display: "flex", gap: 20 }}>
                    {["Editable tokens and components", "Bilingual English + Arabic support", "RTL-ready by default"].map((b) => (
                      <div key={b} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT }} />
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{b}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right: System preview mockup */}
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ position: "relative", height: 440 }}>
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} style={{ ...GLASS_BRIGHT, borderRadius: 24, padding: 20, position: "absolute", top: 10, left: 0, right: 0, height: 340, boxShadow: `0 8px 40px rgba(129,140,248,0.08)` }}>
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>GENERATED SYSTEM PREVIEW</div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                      <div style={{ padding: 10, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 6, fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>TOKENS</div>
                        <div style={{ display: "flex", gap: 3 }}>
                          {["#818CF8", "#A78BFA", "#C084FC", "#22D3EE", "#1E1E2E"].map((c) => (
                            <div key={c} style={{ width: 16, height: 16, borderRadius: 4, background: c }} />
                          ))}
                        </div>
                      </div>
                      <div style={{ padding: 10, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 6, fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>TYPOGRAPHY</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#ebebeb", lineHeight: 1.2 }}>Aa</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Inter · 6 scales</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                      <div style={{ padding: "6px 14px", borderRadius: 6, background: ACCENT, color: "#fff", fontSize: 10, fontWeight: 600 }}>Primary</div>
                      <div style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid rgba(129,140,248,0.3)`, color: ACCENT, fontSize: 10, fontWeight: 600 }}>Outlined</div>
                      <div style={{ padding: "4px 10px", borderRadius: 99, background: `rgba(34,211,238,0.12)`, color: ACCENT3, fontSize: 9, fontWeight: 600 }}>Badge</div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                      <div style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", fontSize: 9, color: "rgba(255,255,255,0.25)" }}>Search...</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 18, height: 10, borderRadius: 5, background: ACCENT, position: "relative" }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", position: "absolute", top: 1.5, right: 1.5 }} />
                        </div>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>Toggle</span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div style={{ padding: 8, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                        <div style={{ height: 24, borderRadius: 4, background: `linear-gradient(135deg, rgba(129,140,248,0.15), rgba(167,139,250,0.08))`, marginBottom: 6 }} />
                        <div style={{ height: 3, width: "80%", borderRadius: 2, background: "rgba(255,255,255,0.08)", marginBottom: 3 }} />
                        <div style={{ height: 3, width: "55%", borderRadius: 2, background: "rgba(255,255,255,0.05)" }} />
                      </div>
                      <div style={{ padding: 8, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>RTL Preview</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'Noto Sans Arabic', sans-serif", direction: "rtl" }}>مرحبا ←</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div animate={{ y: [0, -6, 0], x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} style={{ position: "absolute", bottom: 50, right: 12, background: ACCENT, color: "#000", fontSize: 10, fontWeight: 700, padding: "5px 12px", borderRadius: 8, fontFamily: "ui-monospace, monospace", letterSpacing: "0.05em", boxShadow: `0 0 24px rgba(129,140,248,0.4)` }}>
                    AI Generated ✦
                  </motion.div>

                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }} style={{ ...GLASS_BRIGHT, position: "absolute", bottom: 40, left: 12, borderRadius: 14, padding: "12px 16px" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>96+</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "ui-monospace, monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>Components</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ━━━ METRICS STRIP ━━━ */}
          <Reveal style={{ padding: "0 64px 64px" }}>
            <div style={{ ...GLASS_BRIGHT, maxWidth: 1100, margin: "0 auto", borderRadius: 20, padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {[
                { label: "THEMED COMPONENTS", value: 96, suffix: "+" },
                { label: "TOKEN GROUPS", value: 14, suffix: "+" },
                { label: "STARTER TEMPLATES", value: 7, suffix: "" },
                { label: "THEME MODES", value: 2, suffix: "" },
                { label: "BILINGUAL + RTL", value: 0, suffix: "", display: "EN + AR" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
                    {s.display || <Counter target={s.value} suffix={s.suffix} />}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 4, fontFamily: "ui-monospace, monospace", letterSpacing: "0.12em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ━━━ WHAT YOU GET (new section with distinct surface) ━━━ */}
          <div style={{ padding: "64px 64px 72px", background: `linear-gradient(180deg, ${SURFACE_ALT}, rgba(129,140,248,0.02) 50%, ${SURFACE_ALT})`, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
                <MonoLabel>What You Get</MonoLabel>
                <h2 style={{ fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#f0f0f0", marginTop: 18, marginBottom: 12 }}>
                  A reusable system you can actually work with
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 540, margin: "0 auto" }}>
                  Each generation includes structured foundations and applied UI output — ready to review, edit, save, or export.
                </p>
              </Reveal>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {DELIVERABLES.map((d, i) => (
                  <Reveal key={d.label} delay={i * 0.04}>
                    <div style={{ background: SURFACE_RAISED, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 16px", textAlign: "center", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(129,140,248,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{ fontSize: 20, marginBottom: 10, color: ACCENT, fontWeight: 600 }}>{d.icon}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500, lineHeight: 1.4 }}>{d.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━ FULL SYSTEM (stronger card contrast) ━━━ */}
          <div style={{ padding: "72px 64px 80px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
                <MonoLabel>Everything Included</MonoLabel>
                <h2 style={{ fontSize: "clamp(26px, 3.5vw, 46px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#f0f0f0", marginTop: 18, marginBottom: 12 }}>
                  Not just colors — a full system
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto" }}>
                  Everything you need to go from brand direction to a production-ready UI language.
                </p>
              </Reveal>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {FEATURES.map((f, i) => (
                  <BentoCard key={f.title} feature={f} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* ━━━ HOW IT WORKS (cleaner, less dense) ━━━ */}
          <div style={{ padding: "64px 64px 72px", background: `linear-gradient(180deg, ${SURFACE_ALT}, #0f0f18 50%, ${SURFACE_ALT})`, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
                <MonoLabel>Process</MonoLabel>
                <h2 style={{ fontSize: "clamp(26px, 3.5vw, 46px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#f0f0f0", marginTop: 18, marginBottom: 12 }}>
                  Guided in minutes. Structured for real products.
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>
                  A short onboarding flow becomes a reusable design system through layered generation.
                </p>
              </Reveal>

              <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 48 }}>
                {STEPS.map((step, i) => (
                  <StepRow key={step.num} step={step} index={i} isLast={i === STEPS.length - 1} />
                ))}
              </div>

              {/* Pipeline row */}
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 12 }}>
                  {PIPELINE.map((p, i) => (
                    <div key={p} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ padding: "6px 16px", borderRadius: 8, background: `rgba(129,140,248,${0.08 + i * 0.03})`, border: `1px solid rgba(129,140,248,${0.1 + i * 0.04})`, fontSize: 11, fontWeight: 600, color: ACCENT, fontFamily: "ui-monospace, monospace", letterSpacing: "0.05em" }}>{p}</div>
                      {i < PIPELINE.length - 1 && <div style={{ width: 20, height: 1, background: `rgba(129,140,248,0.2)` }} />}
                    </div>
                  ))}
                </div>
                <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
                  Structured generation makes the output reusable, editable, and consistent.
                </p>
              </Reveal>
            </div>
          </div>

          {/* ━━━ COMPONENT SHOWCASE (high-contrast proof section) ━━━ */}
          <div id="showcase" style={{ padding: "72px 64px 80px", background: `linear-gradient(180deg, transparent, rgba(129,140,248,0.03) 30%, rgba(129,140,248,0.03) 70%, transparent)` }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <Reveal style={{ textAlign: "center", marginBottom: 32 }}>
                <MonoLabel>Component Library</MonoLabel>
                <h2 style={{ fontSize: "clamp(26px, 3.5vw, 46px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#f0f0f0", marginTop: 18, marginBottom: 12 }}>
                  96+ themed components
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto" }}>
                  Every component is styled from the same generated tokens, typography, and interaction rules.
                </p>
              </Reveal>

              {/* Filter pills */}
              <Reveal style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
                {["Light / Dark", "Comfortable / Dense", "EN / AR", "LTR / RTL"].map((pill) => (
                  <div key={pill} style={{ padding: "6px 16px", borderRadius: 99, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.5)", cursor: "default" }}>{pill}</div>
                ))}
              </Reveal>

              <Marquee />

              <div style={{ ...GLASS_BRIGHT, borderRadius: 24, padding: 20, marginTop: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                  {[
                    { name: "Button", el: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ display: "flex", gap: 6 }}><div style={{ padding: "7px 18px", borderRadius: 8, background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 600 }}>Primary</div><div style={{ padding: "7px 18px", borderRadius: 8, border: `1px solid rgba(129,140,248,0.3)`, color: ACCENT, fontSize: 11, fontWeight: 600 }}>Ghost</div></div><div style={{ display: "flex", gap: 6 }}><div style={{ padding: "5px 14px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 500 }}>Disabled</div><div style={{ padding: "5px 14px", borderRadius: 6, background: `rgba(239,68,68,0.12)`, color: "#EF4444", fontSize: 10, fontWeight: 500 }}>Danger</div></div></div> },
                    { name: "Card", el: <div style={{ ...GLASS, borderRadius: 12, padding: 12, width: "100%" }}><div style={{ height: 36, borderRadius: 8, background: `linear-gradient(135deg, rgba(129,140,248,0.2), rgba(167,139,250,0.12))`, marginBottom: 10 }} /><div style={{ height: 5, width: "80%", borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 6 }} /><div style={{ height: 5, width: "60%", borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 10 }} /><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: ACCENT, fontWeight: 600 }}>Read more →</span><span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>2 min</span></div></div> },
                    { name: "Form", el: <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}><div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Email address</div><div style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>john@example.com</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600, marginTop: 4 }}>Password</div><div style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", fontSize: 10, color: "rgba(255,255,255,0.15)" }}>••••••••</div></div> },
                    { name: "Badge", el: <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><span style={{ padding: "4px 12px", borderRadius: 99, background: `rgba(34,211,238,0.1)`, color: ACCENT3, fontSize: 10, fontWeight: 600 }}>Active</span><span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(250,204,21,0.1)", color: "#FACC15", fontSize: 10, fontWeight: 600 }}>Pending</span><span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(239,68,68,0.1)", color: "#EF4444", fontSize: 10, fontWeight: 600 }}>Error</span><span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(16,185,129,0.1)", color: "#10B981", fontSize: 10, fontWeight: 600 }}>Done</span></div> },
                    { name: "Chart", el: <div><svg width="100%" height="50" viewBox="0 0 140 50"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" /><stop offset="100%" stopColor={ACCENT} stopOpacity="0" /></linearGradient></defs><path d="M0,45 L23,38 L47,25 L70,30 L93,15 L117,20 L140,8 L140,50 L0,50 Z" fill="url(#cg)" /><polyline points="0,45 23,38 47,25 70,30 93,15 117,20 140,8" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />{[0,23,47,70,93,117,140].map((x,i)=><circle key={i} cx={x} cy={[45,38,25,30,15,20,8][i]} r="2.5" fill={ACCENT} />)}</svg></div> },
                    { name: "Table", el: <div style={{ width: "100%" }}>{[["Name","Role","Status"],["Alice","Admin","●"],["Bob","Editor","●"],["Clara","Viewer","○"]].map((row, r)=><div key={r} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: r<3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>{row.map((cell,c)=><div key={c} style={{ flex: c === 0 ? 2 : 1, fontSize: 9, fontWeight: r===0 ? 600 : 400, color: r===0 ? "rgba(255,255,255,0.5)" : cell === "●" ? "#10B981" : cell === "○" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.35)" }}>{cell}</div>)}</div>)}</div> },
                    { name: "Modal", el: <div style={{ ...GLASS, borderRadius: 12, padding: 14, width: "100%" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span style={{ fontSize: 11, fontWeight: 600, color: "#ebebeb" }}>Confirm</span><span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>✕</span></div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", lineHeight: 1.5, marginBottom: 12 }}>Are you sure you want to proceed?</div><div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><div style={{ padding: "4px 12px", borderRadius: 6, background: "rgba(255,255,255,0.06)", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Cancel</div><div style={{ padding: "4px 12px", borderRadius: 6, background: ACCENT, fontSize: 9, color: "#fff", fontWeight: 600 }}>Confirm</div></div></div> },
                    { name: "Toast", el: <div style={{ ...GLASS, borderRadius: 10, padding: "10px 14px", width: "100%", display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#10B981", flexShrink: 0 }}>✓</div><div><div style={{ fontSize: 10, fontWeight: 600, color: "#ebebeb" }}>Saved</div><div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Changes applied.</div></div></div> },
                    { name: "Sidebar", el: <div style={{ ...GLASS, borderRadius: 10, padding: 10, width: "100%" }}><div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 6, background: `rgba(129,140,248,0.1)`, marginBottom: 4 }}><div style={{ width: 4, height: 4, borderRadius: 2, background: ACCENT }} /><span style={{ fontSize: 9, color: ACCENT, fontWeight: 600 }}>Dashboard</span></div>{["Projects", "Tasks", "Settings"].map(item => <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", marginBottom: 2 }}><div style={{ width: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} /><span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{item}</span></div>)}</div> },
                    { name: "Toggle", el: <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{[["Dark mode", true], ["Notifications", true], ["Auto-save", false]].map(([label, on]) => <div key={label as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{label as string}</span><div style={{ width: 32, height: 18, borderRadius: 9, background: on ? ACCENT : "rgba(255,255,255,0.08)", position: "relative" }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, ...(on ? { right: 3 } : { left: 3 }) }} /></div></div>)}</div> },
                    { name: "Avatar", el: <div style={{ display: "flex", alignItems: "center" }}>{["#818CF8", "#A78BFA", "#C084FC", "#22D3EE"].map((c, i) => <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: `2px solid ${SURFACE_RAISED}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: "#fff", marginLeft: i > 0 ? -6 : 0, position: "relative", zIndex: 4-i }}>{["A","B","C","D"][i]}</div>)}<div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: `2px solid ${SURFACE_RAISED}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "rgba(255,255,255,0.3)", marginLeft: -6 }}>+3</div></div> },
                    { name: "Tabs", el: <div><div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 }}>{["Overview", "Details", "Settings"].map((t, i) => <div key={t} style={{ padding: "6px 12px", fontSize: 10, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? ACCENT : "rgba(255,255,255,0.3)", borderBottom: i === 0 ? `2px solid ${ACCENT}` : "none" }}>{t}</div>)}</div><div style={{ height: 5, width: "90%", borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 4 }} /><div style={{ height: 5, width: "70%", borderRadius: 3, background: "rgba(255,255,255,0.04)" }} /></div> },
                  ].map((c, i) => (
                    <Reveal key={c.name} delay={i * 0.04} style={{ display: "flex" }}>
                      <div style={{ background: "#1e1e2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 16, cursor: "default", flex: 1, display: "flex", flexDirection: "column", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ marginBottom: 12, minHeight: 50, display: "flex", alignItems: "center" }}>{c.el}</div>
                        <div style={{ marginTop: "auto", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", fontFamily: "ui-monospace, monospace", letterSpacing: "0.05em" }}>{c.name}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ━━━ GCC & MENA (tinted accent section) ━━━ */}
          <div style={{ padding: "72px 64px 80px", background: `linear-gradient(180deg, ${SURFACE_ALT}, rgba(167,139,250,0.04) 40%, ${SURFACE_ALT})`, borderTop: "1px solid rgba(167,139,250,0.08)", borderBottom: "1px solid rgba(167,139,250,0.08)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
              <Reveal style={{ marginBottom: 48 }}>
                <MonoLabel>Regional Focus</MonoLabel>
                <h2 style={{ fontSize: "clamp(26px, 3.5vw, 46px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#f0f0f0", marginTop: 18, marginBottom: 12 }}>
                  GCC &amp; MENA first
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 540, margin: "0 auto" }}>
                  Bilingual support, RTL behavior, and regional formatting are built into the system — not added later.
                </p>
              </Reveal>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {[
                  {
                    title: "RTL Layout Rules", desc: "Navigation, spacing, alignment, and layout flow adapt cleanly for right-to-left interfaces.",
                    icon: "↔", accent: ACCENT,
                    proof: <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <div style={{ flex: 1, padding: 6, borderRadius: 6, background: "rgba(129,140,248,0.06)", border: "1px solid rgba(129,140,248,0.1)", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>LTR →</div>
                      <div style={{ flex: 1, padding: 6, borderRadius: 6, background: "rgba(129,140,248,0.06)", border: "1px solid rgba(129,140,248,0.1)", fontSize: 9, color: "rgba(255,255,255,0.35)", direction: "rtl" }}>← RTL</div>
                    </div>
                  },
                  {
                    title: "Arabic Typography", desc: "Curated bilingual type styles are selected for clarity, hierarchy, and balanced English-Arabic pairing.",
                    icon: "ع", accent: ACCENT2,
                    proof: <div style={{ marginTop: 12, padding: 8, borderRadius: 6, background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.1)" }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Dashboard</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", direction: "rtl", fontFamily: "'Noto Sans Arabic', sans-serif" }}>لوحة التحكم</div>
                    </div>
                  },
                  {
                    title: "Regional Formatting", desc: "Prepare for localized dates, numerals, currency, and mixed-language interface patterns.",
                    icon: "🌍", accent: ACCENT3,
                    proof: <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.35)", padding: "4px 6px", borderRadius: 4, background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.1)" }}>
                        <span>Date</span><span>٢١ أبريل ٢٠٢٦</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.35)", padding: "4px 6px", borderRadius: 4, background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.1)" }}>
                        <span>Currency</span><span>١٬٢٥٠٫٠٠ د.إ</span>
                      </div>
                    </div>
                  },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08} style={{ display: "flex" }}>
                    <MagneticCard style={{ flex: 1, display: "flex" }}>
                      <div style={{ background: SURFACE_RAISED, border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 24, padding: 24, textAlign: "left", transition: "border-color 0.3s", flex: 1 }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${item.accent}40`)} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: `${item.accent}12`, border: `1px solid ${item.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 14, color: item.accent }}>{item.icon}</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#ebebeb", marginBottom: 6 }}>{item.title}</div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{item.desc}</div>
                        {item.proof}
                      </div>
                    </MagneticCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━ CTA (strongest contrast moment) ━━━ */}
          <div style={{ padding: "72px 64px 100px" }}>
            <Reveal>
              <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center", background: SURFACE_RAISED, border: "1px solid rgba(129,140,248,0.12)", borderRadius: 32, padding: "64px 56px", position: "relative", overflow: "hidden", boxShadow: `0 0 60px -10px rgba(129,140,248,0.1)` }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(129,140,248,0.1), transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
                <div style={{ position: "relative" }}>
                  <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.15, color: "#f0f0f0", marginBottom: 14 }}>
                    Ready to generate your{" "}
                    <span style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap" }}>design{"\u00A0"}system</span>?
                  </h2>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 32, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
                    Start with your brand, your product type, and your language needs — and get a reusable system built for real UI work.
                  </p>
                  <Link href="/onboarding">
                    <motion.span whileHover={{ scale: 1.05, boxShadow: `0 0 50px rgba(129,140,248,0.5)` }} whileTap={{ scale: 0.96 }} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: "#fff", fontSize: 15, fontWeight: 600, padding: "16px 40px", borderRadius: 999, boxShadow: `0 0 30px rgba(129,140,248,0.3)`, cursor: "pointer" }}>
                      Start building for free
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </motion.span>
                  </Link>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 16 }}>No design system setup required</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Footer */}
          <footer style={{ padding: "24px 64px 28px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <MonoLabel>© 2026 Palette</MonoLabel>
            <MonoLabel>AI Design System Generator · GCC &amp; MENA</MonoLabel>
          </footer>
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SUB-COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function BentoCard({ feature, index }: { feature: typeof FEATURES[number]; index: number }) {
  const isWide = feature.span === "2x1";
  return (
    <Reveal delay={index * 0.06} style={{ gridColumn: isWide ? "span 2" : "span 1", display: "flex" }}>
      <MagneticCard style={{ flex: 1, display: "flex" }}>
        <div style={{ background: SURFACE_RAISED, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28, flex: 1, position: "relative", overflow: "hidden", transition: "all 0.3s", boxShadow: "0 4px 24px -8px rgba(0,0,0,0.4)" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)"; e.currentTarget.style.boxShadow = "0 8px 32px -8px rgba(129,140,248,0.12)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "0 4px 24px -8px rgba(0,0,0,0.4)"; }}>
          <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: ACCENT }}>{FEATURE_ICONS[feature.icon]}</div>
            <span style={{ fontSize: 22, fontWeight: 700, color: "rgba(129,140,248,0.25)", letterSpacing: "-0.5px", fontFamily: "ui-monospace, monospace" }}>{feature.count}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#ebebeb", marginBottom: 6 }}>{feature.title}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{feature.desc}</div>
        </div>
      </MagneticCard>
    </Reveal>
  );
}

function StepRow({ step, index, isLast }: { step: typeof STEPS[number]; index: number; isLast: boolean }) {
  const gradients = [
    `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
    `linear-gradient(135deg, ${ACCENT2}, #C084FC)`,
    `linear-gradient(135deg, #C084FC, ${ACCENT3})`,
    `linear-gradient(135deg, ${ACCENT3}, ${ACCENT})`,
  ];
  return (
    <Reveal delay={index * 0.1} style={{ display: "flex", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 52, flexShrink: 0 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: gradients[index], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "ui-monospace, monospace", boxShadow: `0 4px 20px -4px rgba(129,140,248,0.3)` }}>{step.num}</div>
        {!isLast && <div style={{ width: 2, height: 48, background: "linear-gradient(to bottom, rgba(129,140,248,0.15), transparent)", borderRadius: 1 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 24, paddingTop: 8 }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#ebebeb", marginBottom: 6 }}>{step.title}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{step.desc}</div>
      </div>
    </Reveal>
  );
}

function Marquee() {
  return (
    <div style={{ position: "relative", overflow: "hidden", height: 40 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: `linear-gradient(to right, ${SHELL_BG}, transparent 20%, transparent 80%, ${SHELL_BG})` }} />
      <motion.div style={{ display: "flex", gap: 10, alignItems: "center", position: "absolute", whiteSpace: "nowrap" }} animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
        {[...MARQUEE_LABELS, ...MARQUEE_LABELS].map((l, i) => (
          <span key={`${l}-${i}`} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "ui-monospace, monospace", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{l}</span>
        ))}
      </motion.div>
    </div>
  );
}
