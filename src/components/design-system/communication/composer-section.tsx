"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ComposerSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

const PaperclipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);
const SmileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function ComposerSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ComposerSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>("Great progress on the design!");
  const [mentioning, setMentioning] = useState(false);

  const emojis = ["😀", "👍", "❤️", "🎉", "🔥", "💯", "✨", "😂", "🤔", "👀", "🚀", "💬"];
  const mentions = ["Alex Chen", "Sara Kim", "Dev Patel", "Jordan Lee"];

  const addAttachment = () => setAttachments(p => [...p, `file-${p.length + 1}.pdf`]);

  const toolBtn: React.CSSProperties = { width: 32, height: 32, borderRadius: radius.sm, border: "none", backgroundColor: "transparent", color: palette.textSecondary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };

  return (
    <motion.section id="comp-composer" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Composer</p>
      <p style={sectionDesc}>
        The message composer provides a rich input area with attachments, emoji picker, mentions, reply-to context, and send actions for composing messages.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: radius.lg }}>
          {replyTo && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", marginBottom: 12, borderRadius: radius.sm, backgroundColor: palette.surfaceMuted, borderLeft: `3px solid ${palette.primary}` }}>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: palette.primary }}>Replying to</span><p style={{ fontSize: 12, color: palette.textSecondary, margin: "2px 0 0" }}>{replyTo}</p></div>
              <button onClick={() => setReplyTo(null)} style={{ ...toolBtn, width: 20, height: 20 }}><XIcon /></button>
            </div>
          )}
          {attachments.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              {attachments.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: radius.sm, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, fontSize: 11, color: palette.textPrimary }}>
                  📎 {f} <button onClick={() => setAttachments(p => p.filter((_, j) => j !== i))} style={{ border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, padding: 0, display: "flex" }}><XIcon /></button>
                </div>
              ))}
            </div>
          )}
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: radius.md, overflow: "hidden" }}>
            <textarea value={text} onChange={e => { setText(e.target.value); setMentioning(e.target.value.endsWith("@")); }} placeholder="Write a message..." rows={3} style={{ width: "100%", border: "none", outline: "none", padding: "12px 14px", fontSize: 13, color: palette.textPrimary, fontFamily: system.typography.bodyFont, backgroundColor: "transparent", resize: "none" }} />
            {mentioning && (
              <div style={{ borderTop: `1px solid ${palette.border}`, padding: 8, backgroundColor: palette.surfaceMuted }}>
                {mentions.map(m => <div key={m} onClick={() => { setText(t => t.slice(0, -1) + `@${m} `); setMentioning(false); }} style={{ padding: "6px 10px", fontSize: 12, color: palette.textPrimary, cursor: "pointer", borderRadius: radius.sm }}>{m}</div>)}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted }}>
              <div style={{ display: "flex", gap: 4, position: "relative" }}>
                <button onClick={addAttachment} style={toolBtn}><PaperclipIcon /></button>
                <button onClick={() => setShowEmoji(!showEmoji)} style={toolBtn}><SmileIcon /></button>
                {showEmoji && (
                  <div style={{ position: "absolute", bottom: "100%", left: 32, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 8, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, boxShadow: system.spacing.elevation.md, zIndex: 10 }}>
                    {emojis.map(e => <button key={e} onClick={() => { setText(t => t + e); setShowEmoji(false); }} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer", padding: 4, borderRadius: 4 }}>{e}</button>)}
                  </div>
                )}
              </div>
              <button style={{ padding: "6px 18px", borderRadius: radius.sm, border: "none", backgroundColor: text.trim() ? palette.primary : palette.border, color: text.trim() ? "#fff" : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><SendIcon /> Send</button>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Border Radius", radius.md], ["Tool Btn Size", "32px"], ["Font Size", "13px"], ["Send BG", "palette.primary"], ["Toolbar BG", "palette.surfaceMuted"], ["Emoji Grid", "6 cols"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Minimal</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input placeholder="Type a message..." style={{ flex: 1, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: "8px 14px", fontSize: 13, color: palette.textPrimary, backgroundColor: "transparent", outline: "none", fontFamily: system.typography.bodyFont }} />
            <button style={{ width: 36, height: 36, borderRadius: radius.md, border: "none", backgroundColor: palette.primary, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><SendIcon /></button>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Mention Tag</div>
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: "10px 14px", fontSize: 13, color: palette.textPrimary }}>
            Hey <span style={{ backgroundColor: palette.primary + "15", color: palette.primary, padding: "2px 6px", borderRadius: 4, fontWeight: 600, fontSize: 12 }}>@Alex Chen</span> can you review this?
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use a composer" description="Composer is ideal for:" items={["Chat and messaging apps", "Comment/reply inputs", "Email compose fields", "Collaborative editing tools"]} />
        <UsageSection palette={palette} title="Composer best practices" description="Keep input intuitive:" items={["Show send button state based on input", "Auto-expand textarea with content", "Display reply context above the input", "Support keyboard shortcuts (⌘ Enter)"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Disable the send button when input is empty." },
        { type: "dont", text: "Don't lose draft text on accidental navigation." },
        { type: "do", text: "Show attachment previews before sending." },
        { type: "dont", text: "Don't auto-focus the composer on mobile — it triggers the keyboard." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Reply context", description: "Shows the message being replied to", x: 50, y: 10 },
        { id: 2, label: "Text area", description: "Multi-line editable input field", x: 50, y: 40 },
        { id: 3, label: "Toolbar", description: "Attachment, emoji, and formatting actions", x: 20, y: 75 },
        { id: 4, label: "Send button", description: "Primary action to submit message", x: 80, y: 75 },
        { id: 5, label: "Attachments", description: "File chips displayed above input", x: 50, y: 25 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200 }}>
          <div style={{ padding: "4px 8px", marginBottom: 6, borderRadius: 4, backgroundColor: palette.surfaceMuted, borderLeft: `2px solid ${palette.primary}`, fontSize: 7, color: palette.textSecondary, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Replying to...</div>
          <div style={{ display: "flex", gap: 4, marginBottom: 6, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ padding: "2px 6px", borderRadius: 3, backgroundColor: palette.surfaceMuted, fontSize: 6, color: palette.textPrimary }}>📎 file.pdf</div>
          </div>
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: 28, padding: "4px 8px", fontSize: 7, color: palette.textSecondary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Write a message...</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 6px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted }}>
              <div style={{ display: "flex", gap: 4, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: palette.border }} />
                <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: palette.border }} />
              </div>
              <div style={{ padding: "2px 8px", borderRadius: 3, backgroundColor: palette.primary, fontSize: 6, color: "#fff", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Send</div>
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Textarea Padding", value: "12px 14px" },
        { label: "Toolbar Height", value: "44px" },
        { label: "Tool Button Size", value: "32px" },
        { label: "Emoji Grid Cell", value: "32px" },
        { label: "Attachment Chip", value: "4px 10px padding" },
        { label: "Send Button", value: "6px 18px padding" },
        { label: "Reply Bar Left", value: "3px solid primary" },
      ]} />
    </motion.section>
  );
}
