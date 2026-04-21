"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ReactionsSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type Reaction = { emoji: string; count: number; reacted: boolean };

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export function ReactionsSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ReactionsSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const allEmojis = ["👍", "👎", "❤️", "🎉", "🔥", "💯", "✨", "😂", "🤔", "👀", "🚀", "💬", "😍", "🙌", "💪", "🤝", "🎯", "⭐", "💡", "🙏", "😮", "😢", "👏", "🥳"];
  const popular = ["👍", "❤️", "😂", "🎉", "🔥", "🚀"];

  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: "👍", count: 4, reacted: true },
    { emoji: "❤️", count: 2, reacted: false },
    { emoji: "🎉", count: 1, reacted: false },
  ]);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerFilter, setPickerFilter] = useState("");

  const toggleReaction = (emoji: string) => {
    setReactions(prev => {
      const existing = prev.find(r => r.emoji === emoji);
      if (existing) {
        const updated = { ...existing, reacted: !existing.reacted, count: existing.reacted ? existing.count - 1 : existing.count + 1 };
        return updated.count === 0 ? prev.filter(r => r.emoji !== emoji) : prev.map(r => r.emoji === emoji ? updated : r);
      }
      return [...prev, { emoji, count: 1, reacted: true }];
    });
    setShowPicker(false);
  };

  const filtered = pickerFilter ? allEmojis.filter(e => e.includes(pickerFilter)) : allEmojis;

  return (
    <motion.section id="comp-reactions" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Reactions</p>
      <p style={sectionDesc}>
        Reactions let users respond to messages and content with emoji badges, a picker grid, quick-reaction bar, and interactive counts.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: radius.lg }}>
          <div style={{ padding: "14px 16px", backgroundColor: palette.surfaceMuted, borderRadius: radius.md, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.primary + "20", color: palette.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>AC</div>
              <div>
                <div style={{ display: "flex", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>Alex Chen</span><span style={{ fontSize: 10, color: palette.textSecondary }}>2h ago</span></div>
                <p style={{ fontSize: 13, color: palette.textPrimary, margin: 0, lineHeight: 1.5 }}>The new component library is looking amazing! Great work everyone. 🎨</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginLeft: 36 }}>
              {reactions.map(r => (
                <button key={r.emoji} onClick={() => toggleReaction(r.emoji)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 99, fontSize: 13, backgroundColor: r.reacted ? palette.primary + "15" : palette.surface, border: `1px solid ${r.reacted ? palette.primary + "40" : palette.border}`, cursor: "pointer", color: palette.textPrimary, fontFamily: "inherit" }}>
                  {r.emoji} <span style={{ fontSize: 11, fontWeight: r.reacted ? 600 : 400 }}>{r.count}</span>
                </button>
              ))}
              <div style={{ position: "relative" }}>
                <button onClick={() => setShowPicker(!showPicker)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 99, border: `1px dashed ${palette.border}`, backgroundColor: "transparent", cursor: "pointer", color: palette.textSecondary }}><PlusIcon /></button>
                {showPicker && (
                  <div style={{ position: "absolute", bottom: "100%", left: 0, marginBottom: 8, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 12, boxShadow: system.spacing.elevation.md, zIndex: 10, width: 260 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
                      {popular.map(e => <button key={e} onClick={() => toggleReaction(e)} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", padding: 4, borderRadius: 6 }}>{e}</button>)}
                    </div>
                    <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 8 }}>
                      <input placeholder="Search emoji..." value={pickerFilter} onChange={e => setPickerFilter(e.target.value)} style={{ width: "100%", border: `1px solid ${palette.border}`, borderRadius: radius.sm, padding: "6px 10px", fontSize: 12, marginBottom: 8, color: palette.textPrimary, backgroundColor: "transparent", outline: "none", fontFamily: "inherit" }} />
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 2, maxHeight: 140, overflowY: "auto" }}>
                        {filtered.map(e => <button key={e} onClick={() => toggleReaction(e)} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer", padding: 3, borderRadius: 4 }}>{e}</button>)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Pill Radius", "99px"], ["Active BG", "palette.primary 15%"], ["Active Border", "palette.primary 40%"], ["Picker Width", "260px"], ["Grid Cols", "8"], ["Emoji Size", "18px / 20px"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Compact Badges</div>
          <div style={{ display: "flex", gap: 4 }}>
            {[{ e: "👍", c: 12 }, { e: "❤️", c: 8 }, { e: "🔥", c: 3 }].map(r => (
              <span key={r.e} style={{ padding: "2px 8px", borderRadius: 99, fontSize: 12, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }}>{r.e} {r.c}</span>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Quick Reaction Bar</div>
          <div style={{ display: "flex", gap: 2, padding: "6px 8px", backgroundColor: palette.surfaceMuted, borderRadius: radius.md, width: "fit-content" }}>
            {popular.map(e => <button key={e} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", padding: "4px 6px", borderRadius: 6 }}>{e}</button>)}
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use reactions" description="Reactions work well for:" items={["Lightweight feedback on messages", "Polls and quick voting", "Social engagement on posts", "Acknowledgment without a reply"]} />
        <UsageSection palette={palette} title="Reaction best practices" description="Keep reactions intuitive:" items={["Show popular emojis first for quick access", "Highlight the user's own reactions", "Display count next to each emoji", "Allow removal by clicking again"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Highlight user's own reactions with a distinct border or background." },
        { type: "dont", text: "Don't allow unlimited unique reactions per message — cap at 20+." },
        { type: "do", text: "Provide a search field in the emoji picker for quick discovery." },
        { type: "dont", text: "Don't show the picker inline — use a popover to save space." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Reaction pill", description: "Emoji + count badge button", x: 20, y: 45 },
        { id: 2, label: "Add button", description: "Dashed circle to open picker", x: 55, y: 45 },
        { id: 3, label: "Picker popover", description: "Grid of available emojis", x: 70, y: 20 },
        { id: 4, label: "Quick bar", description: "Row of popular emojis at top", x: 70, y: 10 },
        { id: 5, label: "Search field", description: "Filter emojis by keyword", x: 70, y: 35 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {["👍 4", "❤️ 2"].map(r => (
              <div key={r} style={{ padding: "2px 8px", borderRadius: 99, fontSize: 9, backgroundColor: palette.primary + "15", border: `1px solid ${palette.primary}40`, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>{r}</div>
            ))}
            <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1px dashed ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: palette.textSecondary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>+</div>
          </div>
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: 6, padding: 6, backgroundColor: palette.surface, opacity: h === 3 || h === 4 || h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 4, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
              {popular.slice(0, 4).map(e => <span key={e} style={{ fontSize: 8 }}>{e}</span>)}
            </div>
            <div style={{ height: 10, borderRadius: 3, border: `1px solid ${palette.border}`, marginBottom: 4, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 2 }}>
              {allEmojis.slice(0, 12).map(e => <span key={e} style={{ fontSize: 7, textAlign: "center" }}>{e}</span>)}
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Pill Padding", value: "3px 10px" },
        { label: "Pill Border Radius", value: "99px (full)" },
        { label: "Add Button Size", value: "28px" },
        { label: "Picker Width", value: "260px" },
        { label: "Picker Grid", value: "8 columns" },
        { label: "Emoji Font Size", value: "18px (picker) / 13px (pill)" },
        { label: "Count Font Size", value: "11px" },
      ]} />
    </motion.section>
  );
}
