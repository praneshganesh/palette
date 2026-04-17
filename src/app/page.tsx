"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

/* ─── constants ─── */
const ACCENT = "#818CF8";
const ACCENT2 = "#A78BFA";
const ACCENT3 = "#22D3EE";
const SURFACE = "#0c0c0f";
const SHELL_BG = "#101014";

const GLASS = {
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.07)",
} as const;

const GLASS_HOVER = {
  border: `1px solid rgba(129,140,248,0.25)`,
};

/* ─── Animated counter ─── */
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

/* ─── Section with scroll-reveal ─── */
function Reveal({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Mono label (system status style) ─── */
function MonoLabel({ children, pulse = false }: { children: React.ReactNode; pulse?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        textTransform: "uppercase" as const,
        letterSpacing: "0.15em",
        fontSize: 10,
        fontWeight: 500,
        color: "rgba(255,255,255,0.4)",
      }}
    >
      {pulse && (
        <span
          className="animate-pulse"
          style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }}
        />
      )}
      {children}
    </span>
  );
}

/* ─── Magnetic card ─── */
function MagneticCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * 0.05);
        y.set((e.clientY - r.top - r.height / 2) * 0.05);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ─── data ─── */
const FEATURES = [
  { icon: "palette", title: "Brand Tokens", desc: "Complete color palettes with light & dark themes, semantic tokens, and contrast-validated pairs.", count: "14+", span: "1x1" },
  { icon: "type", title: "Typography", desc: "Curated font pairings with scale, weights, and bilingual Latin + Arabic support.", count: "6", span: "1x1" },
  { icon: "grid", title: "96+ Components", desc: "Buttons, cards, charts, tables, forms, modals, navigation — all themed to your brand.", count: "96+", span: "2x1" },
  { icon: "layout", title: "App Shell & Templates", desc: "Starter layouts for dashboards, forms, lists, settings, and detail views.", count: "7", span: "1x1" },
  { icon: "file", title: "Field Specifications", desc: "70 field types with validation rules, formats, and regional compliance.", count: "70", span: "1x1" },
  { icon: "globe", title: "Bilingual & RTL", desc: "Arabic + English. RTL mirroring, mixed-script typography, regional formatting.", count: "EN+AR", span: "2x1" },
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
  { num: "01", title: "Answer a few questions", desc: "Project type, industry, visual tone, density — takes under 2 minutes." },
  { num: "02", title: "AI generates your system", desc: "OpenAI builds brand tokens, typography, themes, and field specs." },
  { num: "03", title: "Explore & customize", desc: "Browse 96+ components, templates, specifications — all editable." },
  { num: "04", title: "Export & build", desc: "Download tokens, copy code, integrate into your workflow." },
];

const MARQUEE_LABELS = [
  "Button", "Card", "Input", "Table", "Modal", "Toast", "Badge", "Toggle",
  "Sidebar", "Chart", "Accordion", "Avatar", "Pagination", "Breadcrumbs",
  "File Upload", "Rating", "OTP Input", "Calendar", "Timeline", "Tooltip",
  "Tabs", "Dropdown", "Popover", "Tag Input", "Stepper", "Search Bar",
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {/* Global noise + grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: 0.4,
          }}
        />
        {/* Noise texture */}
        <div
          style={{
            position: "absolute", inset: 0, opacity: 0.15,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Glow spheres */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(129,140,248,0.12), transparent 70%)`, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", top: "40%", right: "-15%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)`, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)`, filter: "blur(120px)" }} />
      </div>

      {/* ── FLOATING SHELL ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1440,
          margin: "0 auto",
          padding: "12px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            background: SHELL_BG,
            borderRadius: "2.5rem",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 0 80px -20px rgba(0,0,0,0.8)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* ── NAV ── */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 32px",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              background: "rgba(16,16,20,0.8)",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" />
                  <circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" />
                </svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "-0.3px" }}>Palette</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <MonoLabel pulse>System Online</MonoLabel>
              <Link href="/onboarding">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#fff", color: "#000",
                    fontSize: 13, fontWeight: 600,
                    padding: "8px 22px", borderRadius: 999,
                    cursor: "pointer",
                  }}
                >
                  Get Started
                </motion.span>
              </Link>
            </div>
          </motion.nav>

          {/* ━━━ HERO ━━━ */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, position: "relative", padding: "120px 48px 100px", overflow: "hidden" }}
          >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
                {/* Left: Copy */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ marginBottom: 24 }}
                  >
                    <MonoLabel pulse>AI Design System Generator</MonoLabel>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontSize: "clamp(40px, 5vw, 72px)",
                      fontWeight: 600,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.95,
                      color: "#ebebeb",
                      marginBottom: 28,
                    }}
                  >
                    Design systems,{" "}
                    <span style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      generated
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 440, marginBottom: 40 }}
                  >
                    Answer 8 questions. Get brand tokens, typography, 96+ component themes, field specifications, and templates — bilingual, RTL-ready, built for the GCC.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <Link href="/onboarding">
                      <motion.span
                        whileHover={{ scale: 1.05, boxShadow: `0 0 40px rgba(129,140,248,0.4)` }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 10,
                          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                          color: "#fff", fontSize: 14, fontWeight: 600,
                          padding: "14px 32px", borderRadius: 999,
                          boxShadow: `0 0 30px rgba(129,140,248,0.3)`,
                          cursor: "pointer",
                        }}
                      >
                        Start Building
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </motion.span>
                    </Link>
                    <MonoLabel>~2 min setup</MonoLabel>
                  </motion.div>
                </div>

                {/* Right: Floating glass mockup */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "relative", height: 420 }}
                >
                  {/* Main glass card */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    style={{
                      ...GLASS,
                      borderRadius: 24,
                      padding: 24,
                      position: "absolute",
                      top: 20, left: 0, right: 0,
                      height: 280,
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                      GENERATED PALETTE
                    </div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 20, height: 44 }}>
                      {["#818CF8", "#A78BFA", "#C084FC", "#22D3EE", "#1E1E2E"].map((c, i) => (
                        <motion.div
                          key={c}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.8 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          style={{ flex: i < 2 ? 3 : i < 4 ? 2 : 1, background: c, borderRadius: 8, transformOrigin: "bottom" }}
                        />
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <div style={{ padding: "6px 16px", borderRadius: 6, background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 600 }}>Primary</div>
                      <div style={{ padding: "6px 16px", borderRadius: 6, border: `1px solid rgba(129,140,248,0.3)`, color: ACCENT, fontSize: 11, fontWeight: 600 }}>Secondary</div>
                      <div style={{ padding: "4px 10px", borderRadius: 99, background: `rgba(34,211,238,0.12)`, color: ACCENT3, fontSize: 10, fontWeight: 600 }}>Active</div>
                    </div>
                    <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                      <div style={{ height: 6, flex: 3, borderRadius: 3, background: "rgba(255,255,255,0.06)" }} />
                      <div style={{ height: 6, flex: 2, borderRadius: 3, background: "rgba(255,255,255,0.04)" }} />
                    </div>
                  </motion.div>

                  {/* Floating AI label */}
                  <motion.div
                    animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    style={{
                      position: "absolute", bottom: 40, right: 20,
                      background: ACCENT, color: "#000",
                      fontSize: 11, fontWeight: 700,
                      padding: "6px 14px", borderRadius: 8,
                      fontFamily: "ui-monospace, monospace",
                      letterSpacing: "0.05em",
                      boxShadow: `0 0 24px rgba(129,140,248,0.4)`,
                    }}
                  >
                    AI Generated ✦
                  </motion.div>

                  {/* Small floating stat card */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
                    style={{
                      ...GLASS,
                      position: "absolute", bottom: 30, left: 20,
                      borderRadius: 16, padding: "14px 20px",
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>96+</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "ui-monospace, monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>Components</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ━━━ STATS BAR ━━━ */}
          <Reveal style={{ padding: "0 48px 80px" }}>
            <div
              style={{
                ...GLASS,
                maxWidth: 900,
                margin: "0 auto",
                borderRadius: 20,
                padding: "28px 48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {[
                { label: "BRAND TOKENS", value: 14, suffix: "+" },
                { label: "COMPONENTS", value: 96, suffix: "+" },
                { label: "FIELD TYPES", value: 70, suffix: "" },
                { label: "TEMPLATES", value: 7, suffix: "" },
                { label: "LANGUAGES", value: 0, suffix: "", display: "EN + AR" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
                    {s.display || <Counter target={s.value} suffix={s.suffix} />}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 4, fontFamily: "ui-monospace, monospace", letterSpacing: "0.15em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ━━━ BENTO FEATURES ━━━ */}
          <div style={{ padding: "80px 48px 100px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
                <MonoLabel>Everything Included</MonoLabel>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#ebebeb", marginTop: 20, marginBottom: 14 }}>
                  Not just colors — a full system
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto" }}>
                  Every piece you need to go from zero to a production-ready design language.
                </p>
              </Reveal>

              {/* Bento grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                }}
              >
                {FEATURES.map((f, i) => (
                  <BentoCard key={f.title} feature={f} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* ━━━ HOW IT WORKS ━━━ */}
          <div style={{ padding: "80px 48px 100px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
                <MonoLabel>Process</MonoLabel>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#ebebeb", marginTop: 20, marginBottom: 14 }}>
                  Four steps. Two minutes.
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 460, margin: "0 auto" }}>
                  From blank canvas to a branded, bilingual design system.
                </p>
              </Reveal>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {STEPS.map((step, i) => (
                  <StepRow key={step.num} step={step} index={i} isLast={i === STEPS.length - 1} />
                ))}
              </div>
            </div>
          </div>

          {/* ━━━ COMPONENT GALLERY ━━━ */}
          <div style={{ padding: "80px 48px 100px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
                <MonoLabel>Component Library</MonoLabel>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#ebebeb", marginTop: 20, marginBottom: 14 }}>
                  96+ themed components
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 500, margin: "0 auto" }}>
                  Every component styled with your generated tokens.
                </p>
              </Reveal>

              <Marquee />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 }}>
                {[
                  { name: "Button", el: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ display: "flex", gap: 6 }}><div style={{ padding: "7px 18px", borderRadius: 8, background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 600 }}>Primary</div><div style={{ padding: "7px 18px", borderRadius: 8, border: `1px solid rgba(129,140,248,0.3)`, color: ACCENT, fontSize: 11, fontWeight: 600 }}>Ghost</div></div><div style={{ display: "flex", gap: 6 }}><div style={{ padding: "5px 14px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 500 }}>Disabled</div><div style={{ padding: "5px 14px", borderRadius: 6, background: `rgba(239,68,68,0.12)`, color: "#EF4444", fontSize: 10, fontWeight: 500 }}>Danger</div></div></div> },
                  { name: "Card", el: <div style={{ ...GLASS, borderRadius: 12, padding: 12, width: "100%" }}><div style={{ height: 36, borderRadius: 8, background: `linear-gradient(135deg, rgba(129,140,248,0.2), rgba(167,139,250,0.12))`, marginBottom: 10 }} /><div style={{ height: 5, width: "80%", borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 6 }} /><div style={{ height: 5, width: "60%", borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 10 }} /><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: ACCENT, fontWeight: 600 }}>Read more →</span><span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>2 min</span></div></div> },
                  { name: "Form", el: <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}><div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Email address</div><div style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>john@example.com</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600, marginTop: 4 }}>Password</div><div style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", fontSize: 10, color: "rgba(255,255,255,0.15)" }}>••••••••</div></div> },
                  { name: "Badge", el: <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><span style={{ padding: "4px 12px", borderRadius: 99, background: `rgba(34,211,238,0.1)`, color: ACCENT3, fontSize: 10, fontWeight: 600 }}>Active</span><span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(250,204,21,0.1)", color: "#FACC15", fontSize: 10, fontWeight: 600 }}>Pending</span><span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(239,68,68,0.1)", color: "#EF4444", fontSize: 10, fontWeight: 600 }}>Error</span><span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(16,185,129,0.1)", color: "#10B981", fontSize: 10, fontWeight: 600 }}>Success</span></div> },
                  { name: "Chart", el: <div><svg width="100%" height="50" viewBox="0 0 140 50"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" /><stop offset="100%" stopColor={ACCENT} stopOpacity="0" /></linearGradient></defs><path d="M0,45 L23,38 L47,25 L70,30 L93,15 L117,20 L140,8 L140,50 L0,50 Z" fill="url(#cg)" /><polyline points="0,45 23,38 47,25 70,30 93,15 117,20 140,8" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />{[0,23,47,70,93,117,140].map((x,i)=><circle key={i} cx={x} cy={[45,38,25,30,15,20,8][i]} r="2.5" fill={ACCENT} />)}</svg><div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>Mon</span><span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>Tue</span><span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>Wed</span><span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>Thu</span><span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>Fri</span></div></div> },
                  { name: "Table", el: <div style={{ width: "100%" }}>{[["Name", "Role", "Status"],["Alice", "Admin", "●"],["Bob", "Editor", "●"],["Clara", "Viewer", "○"]].map((row, r)=><div key={r} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: r<3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>{row.map((cell,c)=><div key={c} style={{ flex: c === 0 ? 2 : 1, fontSize: 9, fontWeight: r===0 ? 600 : 400, color: r===0 ? "rgba(255,255,255,0.5)" : cell === "●" ? "#10B981" : cell === "○" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.35)" }}>{cell}</div>)}</div>)}</div> },
                  { name: "Modal", el: <div style={{ ...GLASS, borderRadius: 12, padding: 14, width: "100%" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span style={{ fontSize: 11, fontWeight: 600, color: "#ebebeb" }}>Confirm</span><span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>✕</span></div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", lineHeight: 1.5, marginBottom: 12 }}>Are you sure you want to proceed?</div><div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}><div style={{ padding: "4px 12px", borderRadius: 6, background: "rgba(255,255,255,0.06)", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Cancel</div><div style={{ padding: "4px 12px", borderRadius: 6, background: ACCENT, fontSize: 9, color: "#fff", fontWeight: 600 }}>Confirm</div></div></div> },
                  { name: "Toast", el: <div style={{ ...GLASS, borderRadius: 10, padding: "10px 14px", width: "100%", display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#10B981", flexShrink: 0 }}>✓</div><div><div style={{ fontSize: 10, fontWeight: 600, color: "#ebebeb" }}>Saved successfully</div><div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Your changes have been saved.</div></div></div> },
                  { name: "Sidebar", el: <div style={{ ...GLASS, borderRadius: 10, padding: 10, width: "100%" }}><div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 6, background: `rgba(129,140,248,0.1)`, marginBottom: 4 }}><div style={{ width: 4, height: 4, borderRadius: 2, background: ACCENT }} /><span style={{ fontSize: 9, color: ACCENT, fontWeight: 600 }}>Dashboard</span></div>{["Projects", "Tasks", "Settings"].map(item => <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", marginBottom: 2 }}><div style={{ width: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} /><span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{item}</span></div>)}</div> },
                  { name: "Toggle", el: <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{[["Dark mode", true], ["Notifications", true], ["Auto-save", false]].map(([label, on]) => <div key={label as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{label as string}</span><div style={{ width: 32, height: 18, borderRadius: 9, background: on ? ACCENT : "rgba(255,255,255,0.08)", position: "relative", transition: "0.2s" }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, ...(on ? { right: 3 } : { left: 3 }) }} /></div></div>)}</div> },
                  { name: "Avatar", el: <div style={{ display: "flex", alignItems: "center", gap: -4 }}>{["#818CF8", "#A78BFA", "#C084FC", "#22D3EE"].map((c, i) => <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: `2px solid ${SHELL_BG}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: "#fff", marginLeft: i > 0 ? -6 : 0, position: "relative", zIndex: 4-i }}>{["A","B","C","D"][i]}</div>)}<div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: `2px solid ${SHELL_BG}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "rgba(255,255,255,0.3)", marginLeft: -6 }}>+3</div></div> },
                  { name: "Tabs", el: <div><div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 }}>{["Overview", "Details", "Settings"].map((t, i) => <div key={t} style={{ padding: "6px 12px", fontSize: 10, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? ACCENT : "rgba(255,255,255,0.3)", borderBottom: i === 0 ? `2px solid ${ACCENT}` : "none" }}>{t}</div>)}</div><div style={{ height: 5, width: "90%", borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 4 }} /><div style={{ height: 5, width: "70%", borderRadius: 3, background: "rgba(255,255,255,0.04)" }} /></div> },
                ].map((c, i) => (
                  <Reveal key={c.name} delay={i * 0.05} style={{ display: "flex" }}>
                    <MagneticCard style={{ flex: 1, display: "flex" }}>
                      <div
                        className="group"
                        style={{
                          ...GLASS,
                          borderRadius: 20,
                          padding: 20,
                          cursor: "pointer",
                          transition: "border-color 0.3s",
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.25)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                      >
                        <div style={{ marginBottom: 14, minHeight: 50, display: "flex", alignItems: "center" }}>{c.el}</div>
                        <div style={{ marginTop: "auto", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", fontFamily: "ui-monospace, monospace", letterSpacing: "0.05em" }}>{c.name}</div>
                      </div>
                    </MagneticCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━ REGION ━━━ */}
          <div style={{ padding: "80px 48px 100px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
              <Reveal style={{ marginBottom: 48 }}>
                <MonoLabel>Regional Focus</MonoLabel>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#ebebeb", marginTop: 20, marginBottom: 14 }}>
                  GCC &amp; MENA first
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 520, margin: "0 auto" }}>
                  Bilingual support, RTL layouts, and regional formatting are core to every generated system.
                </p>
              </Reveal>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  { title: "RTL Layouts", desc: "Full right-to-left mirroring for navigation, forms, and content.", icon: "↔", accent: ACCENT },
                  { title: "Arabic Typography", desc: "Properly paired Arabic headings with Latin body text.", icon: "ع", accent: ACCENT2 },
                  { title: "Regional Formats", desc: "Dates, numbers, currencies, and phone formats for GCC.", icon: "🌍", accent: ACCENT3 },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08} style={{ display: "flex" }}>
                    <MagneticCard style={{ flex: 1, display: "flex" }}>
                      <div
                        style={{
                          ...GLASS,
                          borderRadius: 24,
                          padding: 28,
                          textAlign: "left",
                          transition: "border-color 0.3s",
                          flex: 1,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${item.accent}40`)}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                      >
                        <div
                          style={{
                            width: 44, height: 44, borderRadius: 14,
                            background: `${item.accent}12`,
                            border: `1px solid ${item.accent}20`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 20, marginBottom: 16, color: item.accent,
                          }}
                        >
                          {item.icon}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#ebebeb", marginBottom: 8 }}>{item.title}</div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{item.desc}</div>
                      </div>
                    </MagneticCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━ CTA ━━━ */}
          <div style={{ padding: "80px 48px 120px" }}>
            <Reveal>
              <div
                style={{
                  maxWidth: 800,
                  margin: "0 auto",
                  textAlign: "center",
                  ...GLASS,
                  borderRadius: 32,
                  padding: "72px 56px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400, height: 400, borderRadius: "50%",
                    background: `radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%)`,
                    filter: "blur(60px)", pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#ebebeb", marginBottom: 16 }}>
                    Ready to build your{" "}
                    <span style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      design system
                    </span>
                    ?
                  </h2>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 36 }}>
                    Answer 8 simple questions. Let AI do the rest.
                  </p>
                  <Link href="/onboarding">
                    <motion.span
                      whileHover={{ scale: 1.05, boxShadow: `0 0 50px rgba(129,140,248,0.5)` }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                        color: "#fff", fontSize: 15, fontWeight: 600,
                        padding: "16px 40px", borderRadius: 999,
                        boxShadow: `0 0 30px rgba(129,140,248,0.3)`,
                        cursor: "pointer",
                      }}
                    >
                      Start Building — It&apos;s Free
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </motion.span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Footer */}
          <footer style={{ padding: "24px 48px 32px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        <div
          style={{
            ...GLASS,
            borderRadius: 24,
            padding: 28,
            flex: 1,
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.25)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
        >
          <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: 16 }}>
            <div
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center", color: ACCENT,
              }}
            >
              {FEATURE_ICONS[feature.icon]}
            </div>
            <span style={{ fontSize: 24, fontWeight: 700, color: "rgba(129,140,248,0.2)", letterSpacing: "-0.5px", fontFamily: "ui-monospace, monospace" }}>
              {feature.count}
            </span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#ebebeb", marginBottom: 8 }}>{feature.title}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{feature.desc}</div>
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
        <div
          style={{
            width: 52, height: 52, borderRadius: 16,
            background: gradients[index],
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#fff",
            fontFamily: "ui-monospace, monospace",
            boxShadow: `0 4px 20px -4px rgba(129,140,248,0.3)`,
          }}
        >
          {step.num}
        </div>
        {!isLast && (
          <div style={{ width: 2, height: 48, background: "linear-gradient(to bottom, rgba(129,140,248,0.15), transparent)", borderRadius: 1 }} />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 24, paddingTop: 8 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#ebebeb", marginBottom: 6 }}>{step.title}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{step.desc}</div>
      </div>
    </Reveal>
  );
}

function Marquee() {
  return (
    <div style={{ position: "relative", overflow: "hidden", height: 40 }}>
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: `linear-gradient(to right, ${SHELL_BG}, transparent 15%, transparent 85%, ${SHELL_BG})`,
        }}
      />
      <motion.div
        style={{ display: "flex", gap: 10, alignItems: "center", position: "absolute", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...MARQUEE_LABELS, ...MARQUEE_LABELS].map((l, i) => (
          <span
            key={`${l}-${i}`}
            style={{
              padding: "6px 14px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              fontSize: 11, color: "rgba(255,255,255,0.3)",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.03em",
              whiteSpace: "nowrap",
            }}
          >
            {l}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
