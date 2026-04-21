"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ChatSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type Message = { id: string; text: string; sender: "me" | "them"; time: string; avatar: string; media?: string };

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export function ChatSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ChatSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const initial: Message[] = [
    { id: "1", text: "Hey! Have you reviewed the latest mockups?", sender: "them", time: "10:32 AM", avatar: "SK" },
    { id: "2", text: "Yes — the layout looks solid. Just a few spacing tweaks needed.", sender: "me", time: "10:33 AM", avatar: "ME" },
    { id: "3", text: "Great, I'll update those now 👍", sender: "them", time: "10:34 AM", avatar: "SK" },
  ];
  const [messages, setMessages] = useState(initial);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { id: Date.now().toString(), text: input, sender: "me", time: "Now", avatar: "ME" }]);
    setInput("");
    setTyping(true);
    setTimeout(() => setTyping(false), 2000);
  };

  const Bubble = ({ msg }: { msg: Message }) => {
    const isMine = msg.sender === "me";
    return (
      <div style={{ display: "flex", justifyContent: isMine ? "flex-end" : "flex-start", gap: 8, marginBottom: 12 }}>
        {!isMine && <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.primary + "20", color: palette.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{msg.avatar}</div>}
        <div style={{ maxWidth: "65%" }}>
          <div style={{ padding: "10px 14px", borderRadius: isMine ? `${radius.lg} ${radius.lg} ${radius.sm} ${radius.lg}` : `${radius.lg} ${radius.lg} ${radius.lg} ${radius.sm}`, backgroundColor: isMine ? palette.primary : palette.surfaceMuted, color: isMine ? "#fff" : palette.textPrimary, fontSize: 13, lineHeight: 1.6 }}>
            {msg.text}
          </div>
          <div style={{ fontSize: 10, color: palette.textSecondary, marginTop: 4, textAlign: isMine ? "right" : "left" }}>{msg.time}</div>
        </div>
      </div>
    );
  };

  return (
    <motion.section id="comp-chat" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Chat</p>
      <p style={sectionDesc}>
        Chat bubbles display conversational messages with sent/received alignment, avatars, timestamps, typing indicators, and media support.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: radius.lg, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, marginBottom: 16 }}>
            {messages.map(m => <Bubble key={m.id} msg={m} />)}
            {typing && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.primary + "20", color: palette.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>SK</div>
                <div style={{ padding: "8px 16px", borderRadius: radius.lg, backgroundColor: palette.surfaceMuted, display: "flex", gap: 4 }}>
                  {[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: palette.textSecondary }} />)}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, borderTop: `1px solid ${palette.border}`, paddingTop: 12 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Type a message..." style={{ flex: 1, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: "8px 14px", fontSize: 13, color: palette.textPrimary, backgroundColor: "transparent", outline: "none", fontFamily: system.typography.bodyFont }} />
            <button onClick={handleSend} style={{ width: 36, height: 36, borderRadius: radius.md, border: "none", backgroundColor: palette.primary, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><SendIcon /></button>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Bubble Radius", radius.lg], ["Avatar Size", "28px"], ["Font Size", "13px"], ["Sent BG", "palette.primary"], ["Received BG", "palette.surfaceMuted"], ["Timestamp", "10px"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Media Message</div>
          <div style={{ display: "flex", justifyContent: "flex-start", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.info + "20", color: palette.info, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>JL</div>
            <div style={{ maxWidth: "70%" }}>
              <div style={{ borderRadius: radius.lg, overflow: "hidden", border: `1px solid ${palette.border}` }}>
                <div style={{ width: "100%", height: 100, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                </div>
                <div style={{ padding: "8px 12px", fontSize: 12, color: palette.textPrimary }}>Check this screenshot</div>
              </div>
              <div style={{ fontSize: 10, color: palette.textSecondary, marginTop: 4 }}>10:45 AM</div>
            </div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Group Chat</div>
          {[{ a: "AC", c: palette.primary, n: "Alex", t: "Let's sync at 3pm" }, { a: "SK", c: palette.success, n: "Sara", t: "Works for me!" }, { a: "DP", c: palette.warning, n: "Dev", t: "I'll be there" }].map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: m.c + "20", color: m.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{m.a}</div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: m.c }}>{m.n}</span>
                <p style={{ fontSize: 12, color: palette.textPrimary, margin: "2px 0 0", lineHeight: 1.5 }}>{m.t}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use chat" description="Chat bubbles are ideal for:" items={["Real-time messaging interfaces", "Customer support conversations", "Team collaboration channels", "In-app direct messaging"]} />
        <UsageSection palette={palette} title="Chat best practices" description="Keep conversations clear:" items={["Align sent messages right, received left", "Show typing indicators for presence", "Group consecutive messages from same sender", "Support media attachments inline"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use distinct bubble colors for sent vs received messages." },
        { type: "dont", text: "Don't hide timestamps — users need time context." },
        { type: "do", text: "Show typing indicator to signal active participants." },
        { type: "dont", text: "Don't auto-scroll when user is reading older messages." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Avatar", description: "Sender profile picture or initials", x: 8, y: 30 },
        { id: 2, label: "Bubble", description: "Message container with directional radius", x: 35, y: 30 },
        { id: 3, label: "Timestamp", description: "Time sent below the bubble", x: 35, y: 65 },
        { id: 4, label: "Typing indicator", description: "Animated dots for composing state", x: 35, y: 85 },
        { id: 5, label: "Input bar", description: "Text field with send action", x: 50, y: 95 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: palette.primary + "20", flexShrink: 0, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
            <div>
              <div style={{ padding: "6px 10px", borderRadius: 8, backgroundColor: palette.surfaceMuted, fontSize: 8, color: palette.textPrimary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Message text</div>
              <div style={{ fontSize: 6, color: palette.textSecondary, marginTop: 2, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>10:32 AM</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: palette.success + "20", flexShrink: 0 }} />
            <div style={{ display: "flex", gap: 3, padding: "6px 10px", borderRadius: 8, backgroundColor: palette.surfaceMuted }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: palette.textSecondary }} />)}</div>
          </div>
          <div style={{ height: 18, borderRadius: 6, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", padding: "0 6px", opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: palette.border }} />
            <div style={{ width: 10, height: 10, borderRadius: 4, backgroundColor: palette.primary, marginLeft: 4 }} />
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Avatar Size", value: "28px" },
        { label: "Bubble Padding", value: "10px 14px" },
        { label: "Bubble Max Width", value: "65%" },
        { label: "Message Font", value: "13px / 1.6 lh" },
        { label: "Timestamp Size", value: "10px" },
        { label: "Input Height", value: "36px" },
        { label: "Typing Dot Size", value: "6px" },
      ]} />
    </motion.section>
  );
}
