"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface VideoSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const PlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg>
);
const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
);
const VolumeIcon = ({ muted }: { muted: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    {!muted && <><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></>}
    {muted && <><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>}
  </svg>
);
const MaximizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

export function VideoSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: VideoSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(75);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const formatTime = (pct: number) => { const total = 184; const sec = Math.floor(total * pct / 100); return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; };

  const controlBtn: React.CSSProperties = { border: "none", background: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 };

  return (
    <motion.section id="comp-video" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Video Player</p>
      <p style={sectionDesc}>
        A video player component with play/pause controls, seekable progress bar, volume slider, fullscreen toggle, and thumbnail preview.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ borderRadius: radius.lg, overflow: "hidden", position: "relative", backgroundColor: "#111", cursor: "pointer" }} onMouseEnter={() => setShowControls(true)} onMouseLeave={() => !playing && setShowControls(true)}>
          <div style={{ width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${palette.primary}20, ${palette.secondary}20)` }} onClick={() => setPlaying(!playing)}>
            {!playing && (
              <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><PlayIcon size={24} /></div>
            )}
            {playing && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Playing...</span>}
          </div>
          {showControls && (
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", padding: "24px 16px 12px" }}>
              <div style={{ height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)", marginBottom: 10, cursor: "pointer", position: "relative" }} onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(Math.round((e.clientX - rect.left) / rect.width * 100)); }}>
                <div style={{ height: "100%", borderRadius: 2, backgroundColor: palette.primary, width: `${progress}%`, position: "relative" }}>
                  <div style={{ position: "absolute", right: -6, top: -4, width: 12, height: 12, borderRadius: "50%", backgroundColor: palette.primary, border: "2px solid #fff" }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button onClick={() => setPlaying(!playing)} style={controlBtn}>{playing ? <PauseIcon /> : <PlayIcon />}</button>
                  <button onClick={() => setMuted(!muted)} style={controlBtn}><VolumeIcon muted={muted} /></button>
                  <div style={{ width: 60, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)", cursor: "pointer", position: "relative" }} onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); setVolume(Math.round((e.clientX - rect.left) / rect.width * 100)); }}>
                    <div style={{ height: "100%", borderRadius: 2, backgroundColor: "#fff", width: `${muted ? 0 : volume}%` }} />
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>{formatTime(progress)} / 3:04</span>
                </div>
                <button style={controlBtn}><MaximizeIcon /></button>
              </div>
            </div>
          )}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Progress Color", "palette.primary"], ["Track Height", "4px"], ["Thumb Size", "12px"], ["Control BG", "gradient overlay"], ["Icon Color", "#fff"], ["Time Font", "11px mono"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Thumbnail Preview</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[palette.primary, palette.info, palette.success].map((c, i) => (
              <div key={i} style={{ position: "relative", height: 56, borderRadius: radius.sm, backgroundColor: c + "15", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><PlayIcon size={8} /></div>
                <span style={{ position: "absolute", bottom: 4, right: 4, fontSize: 9, color: "#fff", backgroundColor: "rgba(0,0,0,0.7)", padding: "1px 4px", borderRadius: 3 }}>{["2:15", "1:42", "3:04"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Minimal Controls</div>
          <div style={{ height: 56, borderRadius: radius.md, backgroundColor: "#111", display: "flex", alignItems: "flex-end", padding: "0 12px 8px", position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, backgroundColor: "rgba(255,255,255,0.15)" }}>
              <div style={{ height: "100%", width: "55%", backgroundColor: palette.primary }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ color: "#fff" }}><PlayIcon size={12} /></div>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>1:41 / 3:04</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use a video player" description="Video players are needed for:" items={["Course and tutorial platforms", "Product demo showcases", "Media streaming apps", "Embedded video content"]} />
        <UsageSection palette={palette} title="Video best practices" description="Optimize playback UX:" items={["Show controls on hover, hide during play", "Display elapsed and total time", "Provide keyboard shortcuts (space, ←, →)", "Support playback speed selection"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use a gradient overlay so controls are readable over any content." },
        { type: "dont", text: "Don't autoplay with sound — always start muted or paused." },
        { type: "do", text: "Show a large center play button for clear affordance." },
        { type: "dont", text: "Don't hide the progress bar completely — always show at minimum." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Video area", description: "Main playback region with poster", x: 50, y: 30 },
        { id: 2, label: "Play/pause", description: "Toggle playback state button", x: 10, y: 80 },
        { id: 3, label: "Progress bar", description: "Seekable timeline with thumb", x: 50, y: 70 },
        { id: 4, label: "Volume", description: "Mute toggle and volume slider", x: 30, y: 80 },
        { id: 5, label: "Fullscreen", description: "Expand to full-screen viewing", x: 90, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, backgroundColor: "#111", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${palette.primary}15, ${palette.secondary}15)`, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><PlayIcon size={8} /></div>
          </div>
          <div style={{ padding: "4px 8px 6px" }}>
            <div style={{ height: 2, borderRadius: 1, backgroundColor: "rgba(255,255,255,0.15)", marginBottom: 4, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
              <div style={{ height: "100%", width: "35%", borderRadius: 1, backgroundColor: palette.primary }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, color: "#fff", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>▶</div>
                <div style={{ width: 16, height: 2, borderRadius: 1, backgroundColor: "rgba(255,255,255,0.3)", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
              </div>
              <div style={{ width: 8, height: 8, border: "1px solid rgba(255,255,255,0.4)", borderRadius: 1, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Player Height", value: "260px (16:9 aspect)" },
        { label: "Progress Track", value: "4px height, 2px radius" },
        { label: "Seek Thumb", value: "12px diameter" },
        { label: "Volume Slider", value: "60px width" },
        { label: "Center Play Btn", value: "56px diameter" },
        { label: "Control Padding", value: "24px 16px 12px" },
        { label: "Time Display", value: "11px monospace" },
      ]} />
    </motion.section>
  );
}
