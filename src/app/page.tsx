"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

/* ─── helpers ─── */
function Section({ children, className = "", id, style = {} }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2"
      style={{
        padding: "5px 14px",
        borderRadius: 99,
        border: "0.5px solid rgba(129,140,248,0.2)",
        background: "rgba(129,140,248,0.06)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: "#818CF8",
      }}
    >
      {children}
    </span>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.25 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(129,140,248,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)",
        }}
      />
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const dur = 1800;
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setVal(Math.round(ease * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function MagneticCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, ...style }}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * 0.06);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.06);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const SAMPLE_PALETTE = [
  { name: "Primary", hex: "#818CF8", w: "flex-[3]" },
  { name: "Secondary", hex: "#A78BFA", w: "flex-[3]" },
  { name: "Accent", hex: "#22D3EE", w: "flex-[2]" },
  { name: "Surface", hex: "#1E1E2E", w: "flex-[1.5]" },
  { name: "Muted", hex: "#2A2A3C", w: "flex-[1]" },
];

const FEATURES = [
  { icon: "palette", title: "Brand Tokens", desc: "Complete color palettes with light & dark themes, semantic tokens, and contrast-validated pairs.", count: "14+" },
  { icon: "type", title: "Typography System", desc: "Curated font pairings with scale, weights, and bilingual support for Latin and Arabic scripts.", count: "6 Packs" },
  { icon: "grid", title: "Component Themes", desc: "Pre-built component previews styled with your tokens — buttons, cards, charts, forms, and more.", count: "96+" },
  { icon: "layout", title: "App Shell & Templates", desc: "Starter layouts for dashboards, forms, lists, settings — ready to build on.", count: "7" },
  { icon: "file", title: "Field Specifications", desc: "Field types with validation rules, formats, and regional compliance. Production-ready.", count: "70" },
  { icon: "globe", title: "Bilingual & RTL", desc: "Full Arabic + English support. RTL mirroring, mixed-script typography, and regional formatting.", count: "EN+AR" },
];

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  palette: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      <circle cx="8" cy="9" r="1.5" fill="currentColor" /><circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="16" cy="9" r="1.5" fill="currentColor" /><circle cx="7" cy="13" r="1.5" fill="currentColor" />
    </svg>
  ),
  type: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  ),
  grid: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  layout: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  ),
  file: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
};

const STEPS = [
  { num: "01", title: "Answer a few questions", desc: "Project type, industry, visual tone, density preference — takes under 2 minutes." },
  { num: "02", title: "AI generates your system", desc: "OpenAI creates brand tokens, typography, component themes, and field specifications." },
  { num: "03", title: "Explore & customize", desc: "Browse your complete design system — 96+ components, templates, specs — all editable." },
  { num: "04", title: "Export & build", desc: "Download tokens, copy code, or integrate directly into your development workflow." },
];

const COMPONENT_SAMPLES = [
  { name: "Button", preview: "primary" },
  { name: "Card", preview: "card" },
  { name: "Input", preview: "input" },
  { name: "Badge", preview: "badge" },
  { name: "Toggle", preview: "toggle" },
  { name: "Chart", preview: "chart" },
  { name: "Table", preview: "table" },
  { name: "Modal", preview: "modal" },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="relative min-h-screen" style={{ background: "#0C0C14" }}>
      {/* Ambient glow blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
        <div className="aurora-blob aurora-blob-1 -top-[300px] -left-[300px]" />
        <div className="aurora-blob aurora-blob-2 top-[20%] -right-[250px]" />
        <div className="aurora-blob aurora-blob-3 -bottom-[200px] left-[25%]" />
      </div>

      {/* ── Sticky nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: "14px 32px",
          backdropFilter: "blur(24px)",
          background: "rgba(12,12,20,0.75)",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #818CF8, #A78BFA)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" />
              <circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "-0.3px" }}>Palette</span>
        </div>
        <Link href="/onboarding">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #818CF8, #A78BFA)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 20px",
              borderRadius: 8,
            }}
          >
            Get Started
          </motion.span>
        </Link>
      </motion.nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6"
      >
        <GridBackground />

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 28 }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "linear-gradient(135deg, #818CF8, #A78BFA)",
              boxShadow: "0 0 80px -10px rgba(129,140,248,0.5), 0 0 160px -30px rgba(167,139,250,0.25)",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" />
              <circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" />
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12a9.97 9.97 0 0 0 2.2 6.3l.8.7a2 2 0 0 0 2.8-.1l.1-.1a2 2 0 0 1 3.2.5A2 2 0 0 0 13 21h-1" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ marginBottom: 36 }}
        >
          <SectionLabel>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22D3EE" }} className="animate-pulse" />
            AI-Powered Design System Generator
          </SectionLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 600,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: 24,
            maxWidth: 740,
          }}
        >
          From a few answers to a{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #818CF8, #C084FC, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            complete design system
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            maxWidth: 540,
            marginBottom: 44,
          }}
        >
          Generate brand tokens, typography, 96+ component themes, field specifications, and starter templates — bilingual and RTL-ready, built for the region.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex items-center gap-5"
          style={{ marginBottom: 80 }}
        >
          <Link href="/onboarding">
            <motion.span
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 60px -10px rgba(129,140,248,0.6), 0 0 0 1px rgba(255,255,255,0.12) inset" }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #818CF8, #A78BFA)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                padding: "14px 36px",
                borderRadius: 12,
                boxShadow: "0 8px 40px -8px rgba(129,140,248,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset",
              }}
            >
              Start Building
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.span>
          </Link>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Takes about 2 minutes</span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap" }}
        >
          {[
            { label: "Brand Tokens", value: 14, suffix: "+" },
            { label: "Components", value: 96, suffix: "+" },
            { label: "Field Types", value: 70, suffix: "" },
            { label: "Templates", value: 7, suffix: "" },
            { label: "Languages", value: 0, suffix: "", display: "EN + AR" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
                {stat.display || <Counter target={stat.value} suffix={stat.suffix} />}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4, letterSpacing: "0.04em" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: 1, height: 24, background: "linear-gradient(to bottom, rgba(129,140,248,0.3), transparent)" }}
          />
        </motion.div>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRODUCT SHOWCASE
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        className="relative z-10"
        id="showcase"
        style={{ background: "linear-gradient(180deg, transparent, rgba(129,140,248,0.03) 50%, transparent)", padding: "128px 40px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Live Preview</SectionLabel>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-1px", color: "#fff", marginTop: 20, marginBottom: 14 }}>
              See what you&apos;ll get
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto" }}>
              A complete, production-ready design system generated from your preferences.
            </p>
          </div>

          <div
            style={{
              borderRadius: 20,
              border: "0.5px solid rgba(129,140,248,0.12)",
              background: "rgba(15,15,25,0.6)",
              overflow: "hidden",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 80px -20px rgba(129,140,248,0.12), 0 0 0 1px rgba(255,255,255,0.03) inset",
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2"
              style={{ padding: "14px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex gap-1.5">
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
              </div>
              <div
                className="flex-1 mx-12"
                style={{
                  height: 28, borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "rgba(255,255,255,0.25)",
                }}
              >
                palette.app/workspace
              </div>
            </div>

            <div style={{ padding: "32px 40px" }}>
              <ShowcasePalette />
              <ShowcaseTypography />
              <ShowcaseComponents />
            </div>
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          WHAT'S INCLUDED
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        className="relative z-10"
        id="features"
        style={{ background: "linear-gradient(180deg, transparent, rgba(167,139,250,0.04) 50%, transparent)", padding: "128px 40px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Everything Included</SectionLabel>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-1px", color: "#fff", marginTop: 20, marginBottom: 14 }}>
              Not just colors — a full system
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 500, margin: "0 auto" }}>
              Every piece you need to go from zero to a production-ready design language.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HOW IT WORKS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        className="relative z-10"
        id="how"
        style={{ background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.03) 50%, transparent)", padding: "128px 40px" }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>How It Works</SectionLabel>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-1px", color: "#fff", marginTop: 20, marginBottom: 14 }}>
              Four steps. Two minutes.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 460, margin: "0 auto" }}>
              From blank canvas to a branded, bilingual design system.
            </p>
          </div>

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <StepRow key={step.num} step={step} index={i} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          COMPONENT GALLERY
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        className="relative z-10"
        id="gallery"
        style={{ background: "linear-gradient(180deg, transparent, rgba(129,140,248,0.04) 50%, transparent)", padding: "128px 40px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>Component Gallery</SectionLabel>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-1px", color: "#fff", marginTop: 20, marginBottom: 14 }}>
              96+ themed components
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 500, margin: "0 auto" }}>
              Every component is styled with your generated tokens — buttons, cards, charts, forms, data tables, and more.
            </p>
          </div>

          <ComponentMarquee />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }}>
            {COMPONENT_SAMPLES.map((c, i) => (
              <ComponentPreviewCard key={c.name} comp={c} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BUILT FOR THE REGION
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        className="relative z-10"
        id="region"
        style={{ background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.04) 50%, transparent)", padding: "128px 40px" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <SectionLabel>Built for the Region</SectionLabel>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-1px", color: "#fff", marginTop: 20, marginBottom: 14 }}>
            GCC &amp; MENA first
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 520, margin: "0 auto 48px" }}>
            Not an afterthought — bilingual support, RTL layouts, and regional formatting are core to every generated system.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { title: "RTL Layouts", desc: "Full right-to-left mirroring for navigation, forms, and content layouts.", gradient: "rgba(129,140,248,0.08)", border: "rgba(129,140,248,0.15)", color: "#818CF8" },
              { title: "Arabic Typography", desc: "Properly paired Arabic headings with Latin body text and correct line heights.", gradient: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.15)", color: "#A78BFA" },
              { title: "Regional Formats", desc: "Dates, numbers, currencies, and phone formats for GCC countries.", gradient: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.15)", color: "#22D3EE" },
            ].map((item, i) => (
              <MagneticCard key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{
                    padding: 28,
                    borderRadius: 16,
                    border: `0.5px solid ${item.border}`,
                    background: item.gradient,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: item.gradient,
                      border: `0.5px solid ${item.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      marginBottom: 16,
                      color: item.color,
                    }}
                  >
                    {i === 0 ? "↔" : i === 1 ? "ع" : "🌍"}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{item.desc}</div>
                </motion.div>
              </MagneticCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section className="relative z-10" id="cta" style={{ padding: "160px 40px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: "64px 48px",
              borderRadius: 24,
              border: "0.5px solid rgba(129,140,248,0.12)",
              background: "linear-gradient(135deg, rgba(129,140,248,0.06), rgba(167,139,250,0.04))",
              backdropFilter: "blur(20px)",
            }}
          >
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.15, color: "#fff", marginBottom: 16 }}>
              Ready to build your{" "}
              <span style={{ background: "linear-gradient(90deg, #818CF8, #C084FC, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                design system
              </span>
              ?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 36 }}>
              Answer 8 simple questions. Let AI do the rest.
            </p>
            <Link href="/onboarding">
              <motion.span
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 16px 60px -10px rgba(129,140,248,0.6), 0 0 0 1px rgba(255,255,255,0.12) inset" }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #818CF8, #A78BFA)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "16px 40px",
                  borderRadius: 14,
                  boxShadow: "0 8px 40px -8px rgba(129,140,248,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset",
                }}
              >
                Start Building — It&apos;s Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative z-10 text-center" style={{ padding: "32px 24px 40px", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
          © 2026 Palette. AI Design System Generator for the GCC &amp; MENA region.
        </p>
      </footer>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SUB-COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ShowcasePalette() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
        COLOR PALETTE
      </div>
      <div className="flex gap-2" style={{ height: 52 }}>
        {SAMPLE_PALETTE.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`${c.w} group relative cursor-pointer`}
            style={{ background: c.hex, borderRadius: 10, transformOrigin: "bottom" }}
          >
            <div
              className="absolute -bottom-6 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ transform: "translateX(-50%)", fontSize: 9, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}
            >
              {c.name} · {c.hex}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ShowcaseTypography() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ marginBottom: 28 }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
        TYPOGRAPHY
      </div>
      <div className="flex items-end gap-8">
        <div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>Aa</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>Inter · Display</div>
        </div>
        <div className="flex gap-5 items-baseline flex-wrap">
          {["Heading 1", "Heading 2", "Body", "Caption"].map((label, i) => (
            <div key={label} style={{ fontSize: [24, 18, 14, 11][i], fontWeight: [700, 600, 400, 400][i], color: `rgba(255,255,255,${[0.9, 0.7, 0.5, 0.3][i]})` }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ShowcaseComponents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
        COMPONENT THEMES
      </div>
      <div className="flex gap-3 items-center flex-wrap">
        <div style={{ padding: "8px 20px", borderRadius: 8, background: "#818CF8", color: "#fff", fontSize: 13, fontWeight: 500 }}>
          Primary Button
        </div>
        <div style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(129,140,248,0.4)", color: "#818CF8", fontSize: 13, fontWeight: 500 }}>
          Secondary
        </div>
        <div style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(34,211,238,0.12)", color: "#22D3EE", fontSize: 11, fontWeight: 600 }}>
          Active
        </div>
        <div style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.25)", fontSize: 13, minWidth: 160 }}>
          Search...
        </div>
        <div style={{ width: 44, height: 24, borderRadius: 12, background: "#818CF8", position: "relative" }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, right: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof FEATURES[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <MagneticCard>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="group"
        style={{
          padding: 28,
          borderRadius: 16,
          border: "0.5px solid rgba(129,140,248,0.08)",
          background: "rgba(129,140,248,0.03)",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(129,140,248,0.08), transparent 60%)" }}
        />

        <div className="relative flex items-start justify-between" style={{ marginBottom: 16 }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(129,140,248,0.1)", border: "0.5px solid rgba(129,140,248,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#818CF8",
            }}
          >
            {FEATURE_ICONS[feature.icon]}
          </div>
          <span style={{ fontSize: 22, fontWeight: 700, color: "rgba(129,140,248,0.25)", letterSpacing: "-0.5px" }}>
            {feature.count}
          </span>
        </div>

        <div className="relative">
          <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{feature.title}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{feature.desc}</div>
        </div>
      </motion.div>
    </MagneticCard>
  );
}

function StepRow({ step, index, isLast }: { step: typeof STEPS[number]; index: number; isLast: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const gradients = [
    "linear-gradient(135deg, #818CF8, #A78BFA)",
    "linear-gradient(135deg, #A78BFA, #C084FC)",
    "linear-gradient(135deg, #C084FC, #22D3EE)",
    "linear-gradient(135deg, #22D3EE, #818CF8)",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-6 items-start"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center" style={{ width: 52, flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.2, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: 52, height: 52, borderRadius: 16,
            background: gradients[index],
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 700, color: "#fff",
            boxShadow: `0 4px 20px -4px rgba(129,140,248,${0.3 - index * 0.05})`,
          }}
        >
          {step.num}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.12 + 0.4, duration: 0.5 }}
            style={{
              width: 2, height: 48,
              background: "linear-gradient(to bottom, rgba(129,140,248,0.2), transparent)",
              transformOrigin: "top", borderRadius: 1,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 32, paddingTop: 6 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{step.title}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{step.desc}</div>
      </div>
    </motion.div>
  );
}

function ComponentMarquee() {
  const labels = [
    "Button", "Card", "Input", "Table", "Modal", "Toast", "Badge", "Toggle",
    "Sidebar", "Chart", "Accordion", "Avatar", "Pagination", "Breadcrumbs",
    "File Upload", "Rating", "OTP Input", "Calendar", "Timeline", "Tooltip",
    "Tabs", "Dropdown", "Popover", "Tag Input", "Stepper", "Search Bar",
  ];

  return (
    <div className="relative overflow-hidden" style={{ height: 40 }}>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0C0C14, transparent 15%, transparent 85%, #0C0C14)" }}
      />
      <motion.div
        className="flex gap-3 items-center absolute whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...labels, ...labels].map((l, i) => (
          <span
            key={`${l}-${i}`}
            style={{
              padding: "6px 16px", borderRadius: 8,
              border: "0.5px solid rgba(129,140,248,0.1)", background: "rgba(129,140,248,0.04)",
              fontSize: 12, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap",
            }}
          >
            {l}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ComponentPreviewCard({ comp, index }: { comp: typeof COMPONENT_SAMPLES[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const previews: Record<string, React.ReactNode> = {
    primary: (
      <div className="flex gap-2">
        <div style={{ padding: "6px 16px", borderRadius: 6, background: "#818CF8", color: "#fff", fontSize: 11, fontWeight: 600 }}>Primary</div>
        <div style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid rgba(129,140,248,0.3)", color: "#818CF8", fontSize: 11, fontWeight: 600 }}>Ghost</div>
      </div>
    ),
    card: (
      <div style={{ borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: 10 }}>
        <div style={{ width: "100%", height: 32, borderRadius: 4, background: "linear-gradient(135deg, rgba(129,140,248,0.2), rgba(167,139,250,0.1))", marginBottom: 8 }} />
        <div style={{ height: 6, width: "70%", borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 4 }} />
        <div style={{ height: 6, width: "50%", borderRadius: 3, background: "rgba(255,255,255,0.06)" }} />
      </div>
    ),
    input: (
      <div style={{ padding: "8px 12px", borderRadius: 6, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
        Enter value...
      </div>
    ),
    badge: (
      <div className="flex gap-2">
        <span style={{ padding: "3px 10px", borderRadius: 99, background: "rgba(34,211,238,0.12)", color: "#22D3EE", fontSize: 10, fontWeight: 600 }}>Active</span>
        <span style={{ padding: "3px 10px", borderRadius: 99, background: "rgba(250,204,21,0.12)", color: "#FACC15", fontSize: 10, fontWeight: 600 }}>Pending</span>
      </div>
    ),
    toggle: (
      <div style={{ width: 36, height: 20, borderRadius: 10, background: "#818CF8", position: "relative" }}>
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, right: 3 }} />
      </div>
    ),
    chart: (
      <svg width="100%" height="40" viewBox="0 0 120 40">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,35 L20,28 L40,18 L60,22 L80,10 L100,14 L120,5 L120,40 L0,40 Z" fill="url(#chartGrad)" />
        <polyline points="0,35 20,28 40,18 60,22 80,10 100,14 120,5" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    table: (
      <div>
        {[0, 1, 2].map((r) => (
          <div key={r} className="flex gap-2" style={{ padding: "3px 0", borderBottom: r < 2 ? "0.5px solid rgba(255,255,255,0.05)" : "none" }}>
            <div style={{ height: 5, flex: 2, borderRadius: 2, background: `rgba(255,255,255,${r === 0 ? 0.12 : 0.05})` }} />
            <div style={{ height: 5, flex: 1, borderRadius: 2, background: `rgba(255,255,255,${r === 0 ? 0.12 : 0.05})` }} />
            <div style={{ height: 5, flex: 1, borderRadius: 2, background: `rgba(255,255,255,${r === 0 ? 0.12 : 0.05})` }} />
          </div>
        ))}
      </div>
    ),
    modal: (
      <div style={{ borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", padding: 8 }}>
        <div style={{ height: 5, width: "60%", borderRadius: 2, background: "rgba(255,255,255,0.12)", marginBottom: 6 }} />
        <div style={{ height: 4, width: "100%", borderRadius: 2, background: "rgba(255,255,255,0.05)", marginBottom: 3 }} />
        <div style={{ height: 4, width: "80%", borderRadius: 2, background: "rgba(255,255,255,0.05)" }} />
      </div>
    ),
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      style={{
        padding: 20, borderRadius: 14,
        border: "0.5px solid rgba(129,140,248,0.08)", background: "rgba(129,140,248,0.03)",
        cursor: "pointer",
        transition: "border-color 0.3s",
      }}
    >
      <div style={{ marginBottom: 14, minHeight: 44 }}>
        {previews[comp.preview]}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>{comp.name}</div>
    </motion.div>
  );
}
