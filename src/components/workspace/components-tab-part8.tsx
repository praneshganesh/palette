"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart8Props {
  system: DesignSystem;
  content: IndustryContent;
  activeSection?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

const chatMessages = [
  { id: 1, sender: "them", text: "Hey! Have you seen the new design specs?", time: "10:23 AM" },
  { id: 2, sender: "me", text: "Yes, I reviewed them this morning. Looking great!", time: "10:25 AM" },
  { id: 3, sender: "them", text: "Awesome. Can you share your notes before the sync?", time: "10:26 AM" },
  { id: 4, sender: "me", text: "Sure, sending them over now 👍", time: "10:27 AM" },
];

const presenceUsers = [
  { name: "Sarah Ahmed", status: "online" as const, lastSeen: "Active now" },
  { name: "James Wilson", status: "away" as const, lastSeen: "5 min ago" },
  { name: "Fatima Al-Rashid", status: "dnd" as const, lastSeen: "In a meeting" },
  { name: "Mike Chen", status: "offline" as const, lastSeen: "2 hours ago" },
];

const commonEmojis = ["😀", "😂", "😍", "🤔", "👏", "🔥", "💯", "🙌"];

const notificationsData = [
  { id: 1, name: "Sarah Ahmed", avatar: "SA", title: "Commented on your document", desc: "Looks great! I've added a few suggestions to the…", time: "2 min ago", unread: true, group: "today" },
  { id: 2, name: "James Wilson", avatar: "JW", title: "Shared a file with you", desc: "Q2 Marketing Report.pdf has been shared with you", time: "15 min ago", unread: true, group: "today" },
  { id: 3, name: "System", avatar: "⚙", title: "Deployment completed", desc: "Production v2.4.1 deployed successfully", time: "1 hour ago", unread: false, group: "today" },
  { id: 4, name: "Fatima Al-Rashid", avatar: "FA", title: "Mentioned you in a task", desc: "Can you review the updated wireframes by EOD?", time: "Yesterday", unread: false, group: "earlier" },
  { id: 5, name: "Mike Chen", avatar: "MC", title: "Approved your request", desc: "Budget request for Q3 marketing has been approved", time: "2 days ago", unread: false, group: "earlier" },
];

const fileTypes = [
  { name: "Annual_Report.pdf", ext: "PDF", size: "2.4 MB", color: "#E53E3E", icon: "pdf" },
  { name: "Project_Brief.docx", ext: "DOCX", size: "845 KB", color: "#3182CE", icon: "doc" },
  { name: "Budget_2026.xlsx", ext: "XLSX", size: "1.2 MB", color: "#38A169", icon: "xls" },
  { name: "Hero_Banner.png", ext: "IMG", size: "3.8 MB", color: "#805AD5", icon: "img" },
];

const speedDialItems = [
  { label: "Add", icon: "M12 5v14M5 12h14" },
  { label: "Upload", icon: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12M8 8l4-4 4 4" },
  { label: "Share", icon: "M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v13" },
];

export function ComponentsPart8({ system, content, activeSection }: ComponentsPart8Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  const [showPassword, setShowPassword] = useState(false);
  const [fabOpen, setFabOpen] = useState(true);

  const accentBar: React.CSSProperties = { width: 48, height: 2, backgroundColor: palette.primary, marginBottom: 24, borderRadius: 1 };
  const sectionTitle: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8, margin: 0, lineHeight: 1.2 };
  const sectionDesc: React.CSSProperties = { fontSize: 14, color: palette.textSecondary, lineHeight: 1.8, maxWidth: 600, marginBottom: 32, marginTop: 0 };
  const sectionWrap = (border = true): React.CSSProperties => ({ paddingBottom: 72, marginBottom: 72, borderBottom: border ? `1px solid ${palette.border}` : "none" });

  return (
    <>
      {/* ── 1. Chat Bubble ── */}
      <motion.div id="comp-chat" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-chat" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.05 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Chat Bubble</h3>
        <p style={sectionDesc}>Real-time messaging with sent/received styling, timestamps, and typing indicator.</p>

        <div style={{
          backgroundColor: palette.background,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          padding: 24,
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}>
          {chatMessages.map((msg) => {
            const isMine = msg.sender === "me";
            return (
              <div key={msg.id} style={{
                display: "flex",
                flexDirection: isMine ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: 8,
              }}>
                {!isMine && (
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: withAlpha(palette.primary, 0.15),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: palette.primary,
                    flexShrink: 0,
                    fontFamily: system.typography.bodyFont,
                  }}>
                    AL
                  </div>
                )}
                <div>
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: isMine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    backgroundColor: isMine ? palette.primary : palette.surface,
                    color: isMine ? "#FFFFFF" : palette.textPrimary,
                    fontSize: 13,
                    lineHeight: 1.5,
                    fontFamily: system.typography.bodyFont,
                    maxWidth: 260,
                  }}>
                    {msg.text}
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: palette.textSecondary,
                    marginTop: 4,
                    textAlign: isMine ? "right" : "left",
                    fontFamily: system.typography.bodyFont,
                  }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: withAlpha(palette.primary, 0.15),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 600,
              color: palette.primary,
              flexShrink: 0,
              fontFamily: system.typography.bodyFont,
            }}>
              AL
            </div>
            <div style={{
              padding: "10px 16px",
              borderRadius: "16px 16px 16px 4px",
              backgroundColor: palette.surface,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: palette.textSecondary }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. Message Composer ── */}
      <motion.div id="comp-composer" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-composer" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.1 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Message Composer</h3>
        <p style={sectionDesc}>Rich text input with formatting toolbar, attachments, mentions, and send controls.</p>

        <div style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          maxWidth: 520,
          overflow: "hidden",
        }}>
          {/* Mention suggestion */}
          <div style={{
            padding: "8px 16px",
            backgroundColor: palette.background,
            borderBottom: `1px solid ${palette.border}`,
          }}>
            <div style={{ fontSize: 10, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Suggestions
            </div>
            {["@Sarah Ahmed", "@James Wilson", "@Fatima Al-Rashid"].map((name) => (
              <div key={name} style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 8px",
                borderRadius: system.spacing.radius.sm,
                cursor: "pointer",
                fontSize: 13,
                color: palette.textPrimary,
                fontFamily: system.typography.bodyFont,
              }}>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: withAlpha(palette.primary, 0.12),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 600,
                  color: palette.primary,
                }}>
                  {name.split(" ").slice(0, 2).map(w => w[0]).join("").replace("@", "")}
                </div>
                {name}
              </div>
            ))}
          </div>

          {/* Text area */}
          <div style={{
            padding: "16px",
            minHeight: 72,
            fontSize: 13,
            color: palette.textSecondary,
            fontFamily: system.typography.bodyFont,
            lineHeight: 1.6,
          }}>
            Hey @Sarah, I&apos;ve updated the design tokens for the new palette. Can you take a look?
          </div>

          {/* Formatting toolbar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderTop: `1px solid ${palette.border}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {[
                { label: "Bold", d: "M6 4h5a3 3 0 013 3v0a3 3 0 01-3 3H6V4zM6 10h6a3 3 0 013 3v0a3 3 0 01-3 3H6V10z" },
                { label: "Italic", d: "M10 4h4M8 20h4M14 4l-4 16" },
                { label: "Link", d: "M10 14a3.5 3.5 0 005 0l3-3a3.5 3.5 0 00-5-5l-1 1M14 10a3.5 3.5 0 00-5 0l-3 3a3.5 3.5 0 005 5l1-1" },
                { label: "List", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
                { label: "Code", d: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
              ].map((item) => (
                <div key={item.label} style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: system.spacing.radius.sm,
                  cursor: "pointer",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.d} />
                  </svg>
                </div>
              ))}

              <div style={{ width: 1, height: 20, backgroundColor: palette.border, margin: "0 6px" }} />

              {/* Attachment */}
              <div style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: system.spacing.radius.sm,
                cursor: "pointer",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </div>

              {/* Emoji */}
              <div style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: system.spacing.radius.sm,
                cursor: "pointer",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </svg>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
                Press Enter to send
              </span>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: system.spacing.radius.md,
                backgroundColor: palette.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 3. Presence Indicator ── */}
      <motion.div id="comp-presence" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-presence" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.15 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Presence Indicator</h3>
        <p style={sectionDesc}>User presence states shown as avatar badges and a detailed status list.</p>

        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          {/* Avatar group */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Avatar Group
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {presenceUsers.map((user, i) => {
                const statusColor = user.status === "online" ? palette.success
                  : user.status === "away" ? palette.warning
                  : user.status === "dnd" ? palette.danger
                  : palette.textSecondary;
                const initials = user.name.split(" ").map(w => w[0]).join("");
                return (
                  <div key={user.name} style={{ position: "relative", marginLeft: i > 0 ? -8 : 0, zIndex: presenceUsers.length - i }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: withAlpha(palette.primary, 0.1 + i * 0.08),
                      border: `2px solid ${palette.background}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      color: palette.primary,
                      fontFamily: system.typography.bodyFont,
                    }}>
                      {initials}
                    </div>
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      border: `2px solid ${palette.background}`,
                      backgroundColor: user.status === "offline" ? "transparent" : statusColor,
                      boxSizing: "border-box",
                      ...(user.status === "offline" ? { border: `2px solid ${palette.textSecondary}` } : {}),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {user.status === "dnd" && (
                        <div style={{ width: 6, height: 1.5, backgroundColor: "#FFFFFF", borderRadius: 1 }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status list */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Status List
            </div>
            <div style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              overflow: "hidden",
            }}>
              {presenceUsers.map((user, i) => {
                const statusColor = user.status === "online" ? palette.success
                  : user.status === "away" ? palette.warning
                  : user.status === "dnd" ? palette.danger
                  : palette.textSecondary;
                const statusLabel = user.status === "online" ? "Online"
                  : user.status === "away" ? "Away"
                  : user.status === "dnd" ? "Do Not Disturb"
                  : "Offline";
                const initials = user.name.split(" ").map(w => w[0]).join("");
                return (
                  <div key={user.name} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderTop: i > 0 ? `1px solid ${palette.border}` : "none",
                  }}>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        backgroundColor: withAlpha(palette.primary, 0.12),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 600,
                        color: palette.primary,
                        fontFamily: system.typography.bodyFont,
                      }}>
                        {initials}
                      </div>
                      <div style={{
                        position: "absolute",
                        bottom: -1,
                        right: -1,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        border: `2px solid ${palette.surface}`,
                        backgroundColor: user.status === "offline" ? "transparent" : statusColor,
                        boxSizing: "border-box",
                        ...(user.status === "offline" ? { border: `2px solid ${palette.textSecondary}` } : {}),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {user.status === "dnd" && (
                          <div style={{ width: 5, height: 1.5, backgroundColor: "#FFFFFF", borderRadius: 1 }} />
                        )}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
                        {user.lastSeen}
                      </div>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <div style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: statusColor,
                        ...(user.status === "offline" ? { backgroundColor: "transparent", border: `1.5px solid ${palette.textSecondary}`, boxSizing: "border-box" as const } : {}),
                      }} />
                      <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 4. Reaction Picker ── */}
      <motion.div id="comp-reactions" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-reactions" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.2 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Reaction Picker</h3>
        <p style={sectionDesc}>Message reactions with counts, add button, and emoji picker grid.</p>

        <div style={{ maxWidth: 420 }}>
          {/* Message with reactions */}
          <div style={{
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            padding: 20,
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: withAlpha(palette.primary, 0.15),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: palette.primary,
                flexShrink: 0,
                fontFamily: system.typography.bodyFont,
              }}>
                SA
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>Sarah Ahmed</span>
                  <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>10:32 AM</span>
                </div>
                <div style={{ fontSize: 13, color: palette.textPrimary, lineHeight: 1.6, fontFamily: system.typography.bodyFont, marginBottom: 12 }}>
                  The new dashboard design is ready for review! Let me know your thoughts.
                </div>

                {/* Reaction bubbles */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { emoji: "👍", count: 12, active: true },
                    { emoji: "❤️", count: 5, active: false },
                    { emoji: "🎉", count: 3, active: true },
                  ].map((r) => (
                    <div key={r.emoji} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 10px",
                      borderRadius: system.spacing.radius.full,
                      border: `1px solid ${r.active ? palette.primary : palette.border}`,
                      backgroundColor: r.active ? withAlpha(palette.primary, 0.08) : "transparent",
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: system.typography.bodyFont,
                    }}>
                      <span style={{ fontSize: 14 }}>{r.emoji}</span>
                      <span style={{ color: r.active ? palette.primary : palette.textSecondary, fontWeight: 500 }}>{r.count}</span>
                    </div>
                  ))}
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: system.spacing.radius.full,
                    border: `1px dashed ${palette.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 14,
                    color: palette.textSecondary,
                  }}>
                    +
                  </div>
                </div>

                <div style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginTop: 6 }}>
                  You and 4 others reacted
                </div>
              </div>
            </div>
          </div>

          {/* Picker panel */}
          <div style={{
            marginTop: 12,
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            padding: 16,
            boxShadow: system.spacing.elevation.lg,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Quick Reactions
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
              {commonEmojis.map((emoji) => (
                <div key={emoji} style={{
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: system.spacing.radius.md,
                  cursor: "pointer",
                  fontSize: 20,
                }}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 5. Notification Panel ── */}
      <motion.div id="comp-notifications" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-notifications" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.25 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Notification Panel</h3>
        <p style={sectionDesc}>Grouped notifications dropdown with read/unread states, timestamps, and actions.</p>

        <div style={{
          maxWidth: 400,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          boxShadow: system.spacing.elevation.lg,
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${palette.border}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Notifications</span>
              <div style={{
                padding: "2px 8px",
                borderRadius: system.spacing.radius.full,
                backgroundColor: palette.danger,
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: system.typography.bodyFont,
              }}>
                3
              </div>
            </div>
            <span style={{ fontSize: 12, color: palette.primary, fontFamily: system.typography.bodyFont, cursor: "pointer", fontWeight: 500 }}>
              Mark all read
            </span>
          </div>

          {/* Today */}
          <div style={{ padding: "8px 20px 4px", fontSize: 10, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: system.typography.bodyFont }}>
            Today
          </div>
          {notificationsData.filter(n => n.group === "today").map((n) => (
            <div key={n.id} style={{
              display: "flex",
              gap: 12,
              padding: "12px 20px",
              backgroundColor: n.unread ? withAlpha(palette.primary, 0.04) : "transparent",
              cursor: "pointer",
            }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                backgroundColor: withAlpha(palette.primary, 0.12),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: palette.primary,
                flexShrink: 0,
                fontFamily: system.typography.bodyFont,
              }}>
                {n.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont, marginBottom: 2 }}>
                  {n.title}
                </div>
                <div style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {n.desc}
                </div>
                <div style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginTop: 4 }}>
                  {n.time}
                </div>
              </div>
              {n.unread && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: palette.primary, flexShrink: 0, marginTop: 4 }} />
              )}
            </div>
          ))}

          {/* New separator */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 20px" }}>
            <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: system.typography.bodyFont }}>Earlier</span>
            <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
          </div>

          {notificationsData.filter(n => n.group === "earlier").map((n) => (
            <div key={n.id} style={{
              display: "flex",
              gap: 12,
              padding: "12px 20px",
              cursor: "pointer",
            }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                backgroundColor: withAlpha(palette.primary, 0.08),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: palette.primary,
                flexShrink: 0,
                fontFamily: system.typography.bodyFont,
              }}>
                {n.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont, marginBottom: 2 }}>
                  {n.title}
                </div>
                <div style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {n.desc}
                </div>
                <div style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginTop: 4 }}>
                  {n.time}
                </div>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div style={{
            padding: "14px 20px",
            borderTop: `1px solid ${palette.border}`,
            textAlign: "center",
          }}>
            <span style={{ fontSize: 13, color: palette.primary, fontFamily: system.typography.bodyFont, cursor: "pointer", fontWeight: 500 }}>
              View all notifications
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── 6. Image Gallery / Lightbox ── */}
      <motion.div id="comp-gallery" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-gallery" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.3 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Image Gallery / Lightbox</h3>
        <p style={sectionDesc}>Grid image gallery with gradient placeholders, selection state, and thumbnail strip.</p>

        <div style={{ maxWidth: 520 }}>
          {/* 3x2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const isSelected = idx === 1;
              const isLast = idx === 5;
              const gradients = [
                `linear-gradient(135deg, ${withAlpha(palette.primary, 0.3)}, ${withAlpha(palette.accent, 0.2)})`,
                `linear-gradient(135deg, ${withAlpha(palette.secondary, 0.3)}, ${withAlpha(palette.primary, 0.2)})`,
                `linear-gradient(135deg, ${withAlpha(palette.accent, 0.3)}, ${withAlpha(palette.success, 0.2)})`,
                `linear-gradient(135deg, ${withAlpha(palette.info, 0.3)}, ${withAlpha(palette.primary, 0.2)})`,
                `linear-gradient(135deg, ${withAlpha(palette.success, 0.3)}, ${withAlpha(palette.accent, 0.2)})`,
                `linear-gradient(135deg, ${withAlpha(palette.warning, 0.3)}, ${withAlpha(palette.danger, 0.2)})`,
              ];
              return (
                <div key={idx} style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: system.spacing.radius.md,
                  background: gradients[idx],
                  border: isSelected ? `2px solid ${palette.primary}` : `1px solid ${palette.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  cursor: "pointer",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={withAlpha(palette.textPrimary, 0.3)} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {isSelected && (
                    <div style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      backgroundColor: palette.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  {isLast && (
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: system.spacing.radius.md,
                    }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", fontFamily: system.typography.headingFont }}>+12 more</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Thumbnail strip */}
          <div style={{
            display: "flex",
            gap: 6,
            marginTop: 12,
            padding: "8px 0",
            overflowX: "auto",
          }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
              const isActive = idx === 1;
              return (
                <div key={idx} style={{
                  width: 48,
                  height: 36,
                  borderRadius: system.spacing.radius.sm,
                  background: `linear-gradient(135deg, ${withAlpha(palette.primary, 0.15 + idx * 0.03)}, ${withAlpha(palette.accent, 0.1 + idx * 0.02)})`,
                  border: isActive ? `2px solid ${palette.primary}` : `1px solid ${palette.border}`,
                  flexShrink: 0,
                  cursor: "pointer",
                  opacity: isActive ? 1 : 0.7,
                }} />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── 7. Video Player ── */}
      <motion.div id="comp-video" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-video" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.35 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Video Player</h3>
        <p style={sectionDesc}>Video player frame with controls, progress bar, and title overlay.</p>

        <div style={{
          maxWidth: 520,
          borderRadius: system.spacing.radius.lg,
          overflow: "hidden",
          backgroundColor: "#000000",
          position: "relative",
        }}>
          {/* Title overlay */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "16px 20px",
            background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
            zIndex: 2,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", fontFamily: system.typography.headingFont }}>
              {content.orgName} — Product Overview
            </div>
          </div>

          {/* Video area with play button */}
          <div style={{
            height: 280,
            background: `linear-gradient(135deg, ${withAlpha(palette.primary, 0.3)}, ${withAlpha(palette.accent, 0.15)}, rgba(0,0,0,0.8))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "2px solid rgba(255,255,255,0.3)",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF">
                <polygon points="8,5 20,12 8,19" />
              </svg>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ padding: "0 16px", position: "relative", marginTop: -4 }}>
            <div style={{ height: 4, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 2, position: "relative" }}>
              <div style={{ width: "20%", height: "100%", backgroundColor: palette.primary, borderRadius: 2 }} />
              <div style={{
                position: "absolute",
                top: "50%",
                left: "20%",
                transform: "translate(-50%, -50%)",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: palette.primary,
                border: "2px solid #FFFFFF",
              }} />
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Play/Pause */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" style={{ cursor: "pointer" }}>
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              {/* Skip Forward */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
                <polygon points="5,4 15,12 5,20" />
                <line x1="19" y1="5" x2="19" y2="19" />
              </svg>
              {/* Volume */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
              </svg>
              {/* Time */}
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: system.typography.bodyFont, fontVariantNumeric: "tabular-nums" }}>
                2:34 / 12:45
              </span>
            </div>
            {/* Fullscreen */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
              <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* ── 8. File Preview ── */}
      <motion.div id="comp-file-preview" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-file-preview" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.4 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>File Preview</h3>
        <p style={sectionDesc}>Compact file type cards with icons, metadata, and download actions.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200, 1fr))", gap: 12, maxWidth: 560 }}>
          {fileTypes.map((file) => (
            <div key={file.name} style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.lg,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {file.icon === "img" ? (
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: system.spacing.radius.md,
                    background: `linear-gradient(135deg, ${withAlpha(file.color, 0.3)}, ${withAlpha(file.color, 0.1)})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={file.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                ) : (
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: system.spacing.radius.md,
                    backgroundColor: withAlpha(file.color, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={file.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: palette.textPrimary,
                    fontFamily: system.typography.bodyFont,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {file.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: file.color,
                      backgroundColor: withAlpha(file.color, 0.1),
                      padding: "1px 5px",
                      borderRadius: system.spacing.radius.sm,
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                    }}>
                      {file.ext}
                    </span>
                    <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
                      {file.size}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "7px 0",
                borderRadius: system.spacing.radius.md,
                border: `1px solid ${palette.border}`,
                fontSize: 12,
                fontWeight: 500,
                color: palette.textSecondary,
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── 9. Sign In Form ── */}
      <motion.div id="comp-sign-in" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-sign-in" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.45 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Sign In Form</h3>
        <p style={sectionDesc}>Complete authentication form with SSO options, remember me, and brand elements.</p>

        <div style={{
          maxWidth: 400,
          margin: "0 auto",
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.xl,
          padding: "40px 32px",
          boxShadow: system.spacing.elevation.lg,
        }}>
          {/* Logo area */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: system.spacing.radius.lg,
              backgroundColor: palette.primary,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", fontFamily: system.typography.headingFont }}>
                {content.orgName[0]}
              </span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 4 }}>
              Welcome back
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
              Sign in to {content.orgName}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: palette.textPrimary, fontFamily: system.typography.bodyFont, marginBottom: 6 }}>
              Email address
            </label>
            <div style={{
              padding: "10px 14px",
              borderRadius: system.spacing.radius.md,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
              fontSize: 13,
              color: palette.textSecondary,
              fontFamily: system.typography.bodyFont,
            }}>
              you@example.com
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: palette.textPrimary, fontFamily: system.typography.bodyFont, marginBottom: 6 }}>
              Password
            </label>
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 14px",
              borderRadius: system.spacing.radius.md,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
            }}>
              <span style={{ flex: 1, fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
                {showPassword ? "mysecurepass" : "••••••••••••"}
              </span>
              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 16,
                height: 16,
                borderRadius: system.spacing.radius.sm,
                border: `1.5px solid ${palette.primary}`,
                backgroundColor: palette.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span style={{ fontSize: 13, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>Remember me</span>
            </div>
            <span style={{ fontSize: 13, color: palette.primary, fontFamily: system.typography.bodyFont, cursor: "pointer", fontWeight: 500 }}>
              Forgot password?
            </span>
          </div>

          {/* Sign In button */}
          <div style={{
            padding: "12px 0",
            borderRadius: system.spacing.radius.md,
            backgroundColor: palette.primary,
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 600,
            textAlign: "center",
            cursor: "pointer",
            fontFamily: system.typography.bodyFont,
          }}>
            Sign In
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
            <span style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>OR</span>
            <div style={{ flex: 1, height: 1, backgroundColor: palette.border }} />
          </div>

          {/* SSO buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "Google", d: "M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" },
              { label: "Microsoft", d: "M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" },
              { label: "Apple", d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" },
            ].map((sso) => (
              <div key={sso.label} style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "10px 0",
                borderRadius: system.spacing.radius.md,
                border: `1px solid ${palette.border}`,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 500,
                color: palette.textPrimary,
                fontFamily: system.typography.bodyFont,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={palette.textSecondary}>
                  <path d={sso.d} />
                </svg>
                {sso.label}
              </div>
            ))}
          </div>

          {/* Sign up link */}
          <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
            Don&apos;t have an account?{" "}
            <span style={{ color: palette.primary, fontWeight: 500, cursor: "pointer" }}>Sign up</span>
          </div>
        </div>
      </motion.div>

      {/* ── 10. Profile Card ── */}
      <motion.div id="comp-profile-card" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-profile-card" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.5 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Profile Card</h3>
        <p style={sectionDesc}>Compact and detailed profile card variants with stats, actions, and social links.</p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {/* Compact variant */}
          <div style={{
            width: 240,
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            padding: 24,
            textAlign: "center",
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: withAlpha(palette.primary, 0.15),
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
              color: palette.primary,
              fontFamily: system.typography.headingFont,
              marginBottom: 12,
            }}>
              SA
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 2 }}>
              Sarah Ahmed
            </div>
            <div style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 4 }}>
              Lead Designer at {content.orgName}
            </div>
            <div style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 16 }}>
              sarah@example.com
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: system.spacing.radius.md,
                backgroundColor: palette.primary,
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 600,
                textAlign: "center",
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                Message
              </div>
              <div style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: system.spacing.radius.md,
                border: `1px solid ${palette.border}`,
                color: palette.textPrimary,
                fontSize: 12,
                fontWeight: 600,
                textAlign: "center",
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                Follow
              </div>
            </div>
          </div>

          {/* Detailed variant */}
          <div style={{
            flex: 1,
            minWidth: 300,
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            overflow: "hidden",
          }}>
            {/* Cover gradient */}
            <div style={{
              height: 80,
              background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
              position: "relative",
            }} />

            <div style={{ padding: "0 24px 24px", marginTop: -28 }}>
              {/* Avatar */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: withAlpha(palette.primary, 0.2),
                border: `3px solid ${palette.surface}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                color: palette.primary,
                fontFamily: system.typography.headingFont,
                marginBottom: 12,
              }}>
                SA
              </div>

              <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 2 }}>
                Sarah Ahmed
              </div>
              <div style={{ fontSize: 13, color: palette.primary, fontFamily: system.typography.bodyFont, fontWeight: 500, marginBottom: 8 }}>
                Senior Product Designer at {content.orgName}
              </div>
              <div style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont, lineHeight: 1.6, marginBottom: 16 }}>
                Passionate about creating intuitive digital experiences. Focused on design systems and accessibility.
              </div>

              {/* Stats */}
              <div style={{
                display: "flex",
                gap: 24,
                padding: "16px 0",
                borderTop: `1px solid ${palette.border}`,
                borderBottom: `1px solid ${palette.border}`,
                marginBottom: 16,
              }}>
                {[
                  { label: "Projects", value: "24" },
                  { label: "Followers", value: "1.2k" },
                  { label: "Following", value: "89" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social + Edit */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                    "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
                    "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
                  ].map((d, idx) => (
                    <div key={idx} style={{
                      width: 32,
                      height: 32,
                      borderRadius: system.spacing.radius.md,
                      border: `1px solid ${palette.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={d} />
                      </svg>
                    </div>
                  ))}
                </div>
                <div style={{
                  padding: "8px 20px",
                  borderRadius: system.spacing.radius.md,
                  border: `1px solid ${palette.primary}`,
                  color: palette.primary,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: system.typography.bodyFont,
                }}>
                  Edit Profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 11. Bottom Sheet ── */}
      <motion.div id="comp-bottom-sheet" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-bottom-sheet" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.55 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Bottom Sheet</h3>
        <p style={sectionDesc}>Mobile-style bottom sheet with drag handle, filter content, and sticky actions.</p>

        {/* Phone frame */}
        <div style={{
          width: 320,
          height: 560,
          borderRadius: 32,
          border: `3px solid ${palette.border}`,
          backgroundColor: palette.background,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Status bar */}
          <div style={{
            padding: "8px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            fontWeight: 600,
            color: palette.textPrimary,
            fontFamily: system.typography.bodyFont,
          }}>
            <span>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={palette.textPrimary}>
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <svg width="16" height="14" viewBox="0 0 24 14" fill={palette.textPrimary}>
                <rect x="0" y="10" width="4" height="4" rx="1" />
                <rect x="6" y="6" width="4" height="8" rx="1" />
                <rect x="12" y="2" width="4" height="12" rx="1" />
                <rect x="18" y="0" width="4" height="14" rx="1" />
              </svg>
            </div>
          </div>

          {/* Content behind sheet */}
          <div style={{ padding: "12px 20px" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 4 }}>
              Properties
            </div>
            <div style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
              24 results found
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                marginTop: 12,
                padding: 12,
                borderRadius: system.spacing.radius.md,
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                opacity: 0.4,
              }}>
                <div style={{ width: "70%", height: 8, borderRadius: 4, backgroundColor: palette.border, marginBottom: 6 }} />
                <div style={{ width: "40%", height: 6, borderRadius: 3, backgroundColor: palette.border }} />
              </div>
            ))}
          </div>

          {/* Dimmed overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1,
          }} />

          {/* Bottom sheet */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: palette.surface,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: palette.border }} />
            </div>

            {/* Title */}
            <div style={{ padding: "8px 20px 16px", borderBottom: `1px solid ${palette.border}` }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>
                Filter Properties
              </div>
            </div>

            {/* Filter options */}
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "For Sale", checked: true },
                { label: "For Rent", checked: false },
                { label: "Recently Listed", checked: true },
                { label: "Price: Low to High", checked: false },
              ].map((opt) => (
                <div key={opt.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: system.spacing.radius.sm,
                    border: opt.checked ? `none` : `1.5px solid ${palette.border}`,
                    backgroundColor: opt.checked ? palette.primary : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {opt.checked && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 14, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Sticky actions */}
            <div style={{
              padding: "16px 20px 24px",
              borderTop: `1px solid ${palette.border}`,
              display: "flex",
              gap: 10,
            }}>
              <div style={{
                flex: 1,
                padding: "12px 0",
                borderRadius: system.spacing.radius.md,
                border: `1px solid ${palette.border}`,
                color: palette.textSecondary,
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                Reset
              </div>
              <div style={{
                flex: 2,
                padding: "12px 0",
                borderRadius: system.spacing.radius.md,
                backgroundColor: palette.primary,
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                Apply Filters
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 12. Floating Action Button (FAB) ── */}
      <motion.div id="comp-fab" data-comp-section style={{ ...sectionWrap(false), display: activeSection === "comp-fab" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.6 }}>
        <div style={accentBar} />
        <h3 style={sectionTitle}>Floating Action Button (FAB)</h3>
        <p style={sectionDesc}>Standard, extended, mini, and speed dial FAB variants in a mobile context.</p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* FAB variants row */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Variants
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {/* Standard */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: palette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: system.spacing.elevation.lg,
                  cursor: "pointer",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginTop: 8 }}>Standard</div>
              </div>

              {/* Extended */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 24px",
                  height: 48,
                  borderRadius: system.spacing.radius.full,
                  backgroundColor: palette.primary,
                  boxShadow: system.spacing.elevation.lg,
                  cursor: "pointer",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", fontFamily: system.typography.bodyFont }}>New Listing</span>
                </div>
                <div style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginTop: 8 }}>Extended</div>
              </div>

              {/* Mini */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: palette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: system.spacing.elevation.md,
                  cursor: "pointer",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginTop: 8 }}>Mini</div>
              </div>
            </div>
          </div>

          {/* Speed dial in phone frame */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.textSecondary, fontFamily: system.typography.bodyFont, marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Speed Dial
            </div>
            <div style={{
              width: 260,
              height: 360,
              borderRadius: 28,
              border: `3px solid ${palette.border}`,
              backgroundColor: palette.background,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Mock content */}
              <div style={{ padding: "16px 16px 0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8 }}>
                  Dashboard
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{
                    marginBottom: 8,
                    padding: 10,
                    borderRadius: system.spacing.radius.md,
                    backgroundColor: palette.surface,
                    border: `1px solid ${palette.border}`,
                    opacity: fabOpen ? 0.3 : 0.6,
                  }}>
                    <div style={{ width: "65%", height: 6, borderRadius: 3, backgroundColor: palette.border, marginBottom: 4 }} />
                    <div style={{ width: "40%", height: 5, borderRadius: 2, backgroundColor: palette.border }} />
                  </div>
                ))}
              </div>

              {/* Scrim when open */}
              {fabOpen && (
                <div
                  style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1 }}
                  onClick={() => setFabOpen(false)}
                />
              )}

              {/* Speed dial items */}
              {fabOpen && speedDialItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    position: "absolute",
                    right: 20,
                    bottom: 100 + idx * 56,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    zIndex: 3,
                  }}
                >
                  <div style={{
                    padding: "4px 12px",
                    borderRadius: system.spacing.radius.md,
                    backgroundColor: palette.surface,
                    boxShadow: system.spacing.elevation.md,
                    fontSize: 12,
                    fontWeight: 500,
                    color: palette.textPrimary,
                    fontFamily: system.typography.bodyFont,
                    whiteSpace: "nowrap",
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: palette.surface,
                    boxShadow: system.spacing.elevation.md,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${palette.border}`,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                </motion.div>
              ))}

              {/* Main FAB */}
              <div
                onClick={() => setFabOpen(!fabOpen)}
                style={{
                  position: "absolute",
                  right: 20,
                  bottom: 28,
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: palette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: system.spacing.elevation.lg,
                  cursor: "pointer",
                  zIndex: 4,
                  transition: "transform 0.2s ease",
                  transform: fabOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
