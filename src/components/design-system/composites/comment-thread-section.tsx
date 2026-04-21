"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface CommentThreadSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ReplyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" />
  </svg>
);
const MoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

type Comment = { id: string; author: string; initials: string; color: string; text: string; time: string; likes: number; liked: boolean; replies?: Comment[] };

export function CommentThreadSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: CommentThreadSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;

  const initialComments: Comment[] = [
    { id: "1", author: "Alex Chen", initials: "AC", color: palette.primary, text: "This design looks great! I especially like the spacing consistency across all sections.", time: "2h ago", likes: 3, liked: false, replies: [
      { id: "1a", author: "Sara Kim", initials: "SK", color: palette.success, text: "Agreed — the vertical rhythm is really solid here.", time: "1h ago", likes: 1, liked: true },
      { id: "1b", author: "Dev Patel", initials: "DP", color: palette.info, text: "Should we add more padding on mobile?", time: "45m ago", likes: 0, liked: false },
    ]},
    { id: "2", author: "Jordan Lee", initials: "JL", color: palette.warning, text: "Can we explore a darker variant for the card backgrounds? The contrast could be improved.", time: "4h ago", likes: 5, liked: true },
  ];

  const [comments, setComments] = useState(initialComments);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showActions, setShowActions] = useState<string | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const toggleLike = (id: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 };
      if (c.replies) return { ...c, replies: c.replies.map(r => r.id === id ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r) };
      return c;
    }));
  };

  const Avatar = ({ initials, color, size = 32 }: { initials: string; color: string; size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color + "20", color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, flexShrink: 0 }}>
      {initials}
    </div>
  );

  const CommentItem = ({ comment, isReply }: { comment: Comment; isReply?: boolean }) => (
    <div style={{ display: "flex", gap: 12, paddingLeft: isReply ? 44 : 0, marginBottom: 16 }}>
      <Avatar initials={comment.initials} color={comment.color} size={isReply ? 28 : 32} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{comment.author}</span>
          <span style={{ fontSize: 11, color: palette.textSecondary }}>{comment.time}</span>
        </div>
        <p style={{ fontSize: 13, color: palette.textPrimary, lineHeight: 1.6, margin: "0 0 8px" }}>{comment.text}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => toggleLike(comment.id)} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: comment.liked ? palette.danger : palette.textSecondary, fontSize: 12, padding: 0, fontFamily: "inherit" }}>
            <HeartIcon filled={comment.liked} /> {comment.likes > 0 && comment.likes}
          </button>
          {!isReply && (
            <button onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: palette.textSecondary, fontSize: 12, padding: 0, fontFamily: "inherit" }}>
              <ReplyIcon /> Reply
            </button>
          )}
          <button onClick={() => setShowActions(showActions === comment.id ? null : comment.id)} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", color: palette.textSecondary, padding: 0, position: "relative" }}>
            <MoreIcon />
            {showActions === comment.id && (
              <div style={{ position: "absolute", top: "100%", right: 0, zIndex: 10, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflow: "hidden", minWidth: 120 }}>
                {["Edit", "Delete", "Report"].map(a => (
                  <div key={a} style={{ padding: "8px 14px", fontSize: 12, color: a === "Delete" ? palette.danger : palette.textPrimary, cursor: "pointer", whiteSpace: "nowrap" }}>{a}</div>
                ))}
              </div>
            )}
          </button>
        </div>
        {replyTo === comment.id && (
          <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "flex-start" }}>
            <Avatar initials="ME" color={palette.secondary} size={24} />
            <div style={{ flex: 1, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.sm, overflow: "hidden" }}>
              <input
                style={{ width: "100%", border: "none", outline: "none", padding: "8px 12px", fontSize: 13, color: palette.textPrimary, fontFamily: "inherit", backgroundColor: "transparent" }}
                placeholder="Write a reply..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
              />
            </div>
            <button style={{ padding: "6px 14px", borderRadius: system.spacing.radius.sm, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Send</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.section id="comp-comment-thread" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Comment Thread</p>
      <p style={sectionDesc}>
        Threaded comments display conversations with nested replies, user avatars, reactions,
        and contextual actions like edit and delete for collaborative discussions.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg }}>
          {comments.map(c => (
            <div key={c.id}>
              <CommentItem comment={c} />
              {c.replies?.map(r => <CommentItem key={r.id} comment={r} isReply />)}
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Avatar Size", "32px / 28px (reply)"], ["Like Color", "palette.danger"], ["Border Radius", radius], ["Text Size", "13px"], ["Time Color", "palette.textSecondary"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Compact</div>
          {comments[0].replies?.map(r => (
            <div key={r.id} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
              <Avatar initials={r.initials} color={r.color} size={22} />
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>{r.author}</span>
                <span style={{ fontSize: 11, color: palette.textSecondary, marginLeft: 6 }}>{r.time}</span>
                <p style={{ fontSize: 12, color: palette.textPrimary, margin: "2px 0 0", lineHeight: 1.5 }}>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>With Reactions</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "flex-start" }}>
            <Avatar initials="AC" color={palette.primary} size={28} />
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Alex Chen</span>
              <p style={{ fontSize: 13, color: palette.textPrimary, margin: "4px 0 8px", lineHeight: 1.5 }}>Great progress on the components!</p>
              <div style={{ display: "flex", gap: 6 }}>
                {[{ emoji: "👍", count: 4 }, { emoji: "🎉", count: 2 }, { emoji: "❤️", count: 1 }].map(r => (
                  <span key={r.emoji} style={{ padding: "2px 8px", borderRadius: 99, fontSize: 12, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, cursor: "pointer" }}>
                    {r.emoji} {r.count}
                  </span>
                ))}
                <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 12, backgroundColor: palette.surfaceMuted, border: `1px dashed ${palette.border}`, cursor: "pointer", color: palette.textSecondary }}>+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment input */}
      <div style={subsectionLabel}>Comment Input</div>
      <div style={{ ...showcaseBox, maxWidth: 500 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Avatar initials="ME" color={palette.secondary} />
          <div style={{ flex: 1, border: `1px solid ${palette.border}`, borderRadius: radius, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", minHeight: 60 }}>
              <span style={{ fontSize: 13, color: palette.textSecondary }}>Write a comment...</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 12px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted }}>
              <button style={{ padding: "6px 16px", borderRadius: system.spacing.radius.sm, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Comment</button>
            </div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use comment threads" description="Comments enable collaborative discussion:" items={[
          "Document review and feedback",
          "Task or issue discussion",
          "Design critique and annotations",
          "Social and community features",
        ]} />
        <UsageSection palette={palette} title="Threading best practices" description="Keep threads organized:" items={[
          "Limit nesting depth to 2-3 levels",
          "Show reply count and collapse long threads",
          "Highlight new or unread comments",
          "Allow editing within a time window",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show user avatars for visual identification in threads.", visual: <div style={{ display: "flex", gap: -4 }}><Avatar initials="AC" color={palette.primary} size={20} /><Avatar initials="SK" color={palette.success} size={20} /></div> },
        { type: "dont", text: "Don't nest replies deeper than 3 levels — flatten instead." },
        { type: "do", text: "Provide edit and delete actions via a contextual menu." },
        { type: "dont", text: "Don't show all actions at once — use progressive disclosure." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Avatar", description: "User profile image or initials", x: 8, y: 30 },
        { id: 2, label: "Author + time", description: "Name and relative timestamp", x: 40, y: 15 },
        { id: 3, label: "Comment body", description: "Main text content of the comment", x: 40, y: 45 },
        { id: 4, label: "Actions", description: "Like, reply, and more menu buttons", x: 40, y: 70 },
        { id: 5, label: "Replies", description: "Nested child comments indented", x: 60, y: 90 },
      ]} renderPreview={(h) => (
        <div style={{ width: 220 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: palette.primary + "20", flexShrink: 0, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 4, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                <span style={{ fontSize: 9, fontWeight: 600, color: palette.textPrimary }}>User</span>
                <span style={{ fontSize: 8, color: palette.textSecondary }}>2h ago</span>
              </div>
              <div style={{ fontSize: 8, color: palette.textPrimary, marginBottom: 4, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Comment text here...</div>
              <div style={{ display: "flex", gap: 8, fontSize: 7, color: palette.textSecondary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                <span>♥ 3</span><span>↩ Reply</span><span>•••</span>
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: 32, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: palette.success + "20", flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: 8, fontWeight: 600, color: palette.textPrimary }}>Reply</span>
                <div style={{ fontSize: 7, color: palette.textSecondary }}>Nested reply text</div>
              </div>
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Avatar Size", value: "32px (parent) / 28px (reply)" },
        { label: "Reply Indent", value: "44px" },
        { label: "Comment Gap", value: "16px" },
        { label: "Author Font Size", value: "13px / 600" },
        { label: "Body Font Size", value: "13px" },
        { label: "Action Icon Size", value: "14px" },
        { label: "Reaction Pill Radius", value: "99px" },
      ]} />
    </motion.section>
  );
}
