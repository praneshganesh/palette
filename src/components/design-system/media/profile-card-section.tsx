"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ProfileCardSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type Profile = { name: string; role: string; initials: string; color: string; stats: { label: string; value: string }[]; badges: string[]; following: boolean };

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const MoreIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

export function ProfileCardSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ProfileCardSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const initialProfile: Profile = {
    name: "Alex Chen", role: "Senior Product Designer", initials: "AC", color: palette.primary,
    stats: [{ label: "Projects", value: "24" }, { label: "Followers", value: "1.2K" }, { label: "Following", value: "318" }],
    badges: ["Pro", "Mentor", "Early Access"],
    following: false,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [showActions, setShowActions] = useState(false);

  const toggleFollow = () => setProfile(p => ({ ...p, following: !p.following }));

  const Avatar = ({ initials, color, size = 64 }: { initials: string; color: string; size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color + "20", color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 700, flexShrink: 0, border: `3px solid ${palette.surface}` }}>{initials}</div>
  );

  return (
    <motion.section id="comp-profile-card" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Profile Card</p>
      <p style={sectionDesc}>
        A profile card displays user identity with avatar, name, role, stats, action buttons, cover image, and achievement badges.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ borderRadius: radius.lg, overflow: "hidden", border: `1px solid ${palette.border}`, backgroundColor: palette.surface }}>
          <div style={{ height: 80, background: `linear-gradient(135deg, ${palette.primary}30, ${palette.secondary}30)`, position: "relative" }}>
            <div style={{ position: "absolute", bottom: -32, left: 24 }}>
              <Avatar initials={profile.initials} color={profile.color} />
            </div>
          </div>
          <div style={{ padding: "40px 24px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, margin: "0 0 2px", fontFamily: system.typography.headingFont }}>{profile.name}</h3>
                <p style={{ fontSize: 13, color: palette.textSecondary, margin: 0 }}>{profile.role}</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={toggleFollow} style={{ padding: "6px 18px", borderRadius: radius.md, border: profile.following ? `1px solid ${palette.border}` : "none", backgroundColor: profile.following ? "transparent" : palette.primary, color: profile.following ? palette.textPrimary : "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{profile.following ? "Following" : "Follow"}</button>
                <button style={{ width: 32, height: 32, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: palette.textSecondary, position: "relative" }} onClick={() => setShowActions(!showActions)}>
                  <MailIcon />
                </button>
                <div style={{ position: "relative" }}>
                  <button style={{ width: 32, height: 32, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: palette.textSecondary }} onClick={() => setShowActions(!showActions)}>
                    <MoreIcon />
                  </button>
                  {showActions && (
                    <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius.sm, boxShadow: system.spacing.elevation.md, overflow: "hidden", zIndex: 10, minWidth: 130 }}>
                      {["Share profile", "Block user", "Report"].map(a => (
                        <div key={a} onClick={() => setShowActions(false)} style={{ padding: "8px 14px", fontSize: 12, color: a === "Report" ? palette.danger : palette.textPrimary, cursor: "pointer", whiteSpace: "nowrap" }}>{a}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {profile.badges.map(b => (
                <span key={b} style={{ padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 500, backgroundColor: palette.primary + "12", color: palette.primary, border: `1px solid ${palette.primary}20` }}>{b}</span>
              ))}
            </div>
            <div style={{ display: "flex", borderTop: `1px solid ${palette.border}`, paddingTop: 16 }}>
              {profile.stats.map((s, i) => (
                <div key={s.label} style={{ flex: 1, textAlign: "center", borderRight: i < profile.stats.length - 1 ? `1px solid ${palette.border}` : "none" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Avatar Size", "64px"], ["Cover Height", "80px"], ["Badge Radius", "99px"], ["Follow BG", "palette.primary"], ["Stats Font", "18px / 700"], ["Name Font", "18px heading"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Compact</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials="SK" color={palette.success} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Sara Kim</div>
              <div style={{ fontSize: 11, color: palette.textSecondary }}>Engineering Lead</div>
            </div>
            <button style={{ padding: "4px 12px", borderRadius: radius.sm, border: `1px solid ${palette.border}`, backgroundColor: "transparent", fontSize: 11, color: palette.textSecondary, cursor: "pointer", fontFamily: "inherit" }}>View</button>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Centered</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-block" }}><Avatar initials="DP" color={palette.info} size={48} /></div>
            <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginTop: 8 }}>Dev Patel</div>
            <div style={{ fontSize: 11, color: palette.textSecondary }}>Frontend Dev</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
              {["Pro", "Beta"].map(b => <span key={b} style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10, backgroundColor: palette.info + "12", color: palette.info }}>{b}</span>)}
            </div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Horizontal</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Avatar initials="JL" color={palette.warning} size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Jordan Lee</div>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6 }}>PM · 42 projects</div>
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 10, backgroundColor: palette.warning + "12", color: palette.warning }}>Leader</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use profile cards" description="Profile cards are ideal for:" items={["User directory and team pages", "Social feeds and user mentions", "Account settings and dashboards", "Hover cards and popovers"]} />
        <UsageSection palette={palette} title="Profile card best practices" description="Present user info effectively:" items={["Keep stats to 3-4 key metrics", "Use badges sparingly — max 3 visible", "Provide follow/message as primary actions", "Support cover image or gradient fallback"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use a gradient cover fallback when no cover image is uploaded." },
        { type: "dont", text: "Don't crowd the card with too many actions — use a menu overflow." },
        { type: "do", text: "Show initials when no avatar image is available." },
        { type: "dont", text: "Don't display sensitive info like email without privacy controls." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Cover image", description: "Banner area with gradient or photo", x: 50, y: 10 },
        { id: 2, label: "Avatar", description: "Profile photo overlapping cover", x: 15, y: 30 },
        { id: 3, label: "Name + role", description: "User identity and title", x: 40, y: 40 },
        { id: 4, label: "Actions", description: "Follow, message, and overflow menu", x: 80, y: 40 },
        { id: 5, label: "Stats bar", description: "Metric counts in a divided row", x: 50, y: 80 },
      ]} renderPreview={(h) => (
        <div style={{ width: 180, borderRadius: 8, overflow: "hidden", border: `1px solid ${palette.border}` }}>
          <div style={{ height: 28, background: `linear-gradient(135deg, ${palette.primary}30, ${palette.secondary}30)`, position: "relative", opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ position: "absolute", bottom: -10, left: 10, width: 20, height: 20, borderRadius: "50%", backgroundColor: palette.primary + "20", border: `2px solid ${palette.surface}`, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }} />
          </div>
          <div style={{ padding: "14px 10px 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: palette.textPrimary }}>Alex Chen</div>
                <div style={{ fontSize: 6, color: palette.textSecondary }}>Designer</div>
              </div>
              <div style={{ padding: "2px 8px", borderRadius: 4, backgroundColor: palette.primary, fontSize: 6, color: "#fff", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Follow</div>
            </div>
            <div style={{ display: "flex", borderTop: `1px solid ${palette.border}`, paddingTop: 6, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
              {["24", "1.2K", "318"].map((v, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 8, fontWeight: 700, color: palette.textPrimary }}>{v}</div>
                  <div style={{ fontSize: 5, color: palette.textSecondary }}>{["Proj", "Flw", "Fng"][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Cover Height", value: "80px" },
        { label: "Avatar Size", value: "64px with 3px border" },
        { label: "Avatar Offset", value: "bottom: -32px" },
        { label: "Card Padding", value: "40px 24px 24px (below cover)" },
        { label: "Name Font", value: "18px / 700 heading" },
        { label: "Stats Font", value: "18px / 700 value, 11px label" },
        { label: "Badge Padding", value: "2px 10px, 99px radius" },
      ]} />
    </motion.section>
  );
}
