"use client";

import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSAvatar, DSAvatarGroup } from "./avatar";
import type { AvatarSize } from "./avatar";
import { DSBadge } from "./badge";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface AvatarSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const CameraIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
  </svg>
);

const BellIcon = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export function AvatarSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: AvatarSectionProps) {
  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const initialsData = [
    { initials: "AB", name: "Anna Brown" },
    { initials: "CD", name: "Chris Davis" },
    { initials: "EF", name: "Eve Foster" },
    { initials: "GH", name: "Gina Hall" },
    { initials: "JK", name: "John Kim" },
  ];

  return (
    <motion.section
      id="comp-avatar"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Avatar</p>
      <p style={sectionDesc}>
        Avatars represent people or entities using images, initials, or icons.
        They provide quick visual identification in lists, headers, comments,
        and messaging interfaces.
      </p>

      {/* ──── Hero Preview + Tokens ──── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div
          style={{
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            padding: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            minHeight: 140,
          }}
        >
          <DSAvatar system={system} palette={palette} size="xl" initials="JD" online />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: palette.textPrimary }}>John Doe</div>
            <div style={{ fontSize: 13, color: palette.textSecondary, marginTop: 2 }}>Senior Designer • Online</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <DSBadge system={system} palette={palette} variant="success" size="sm" dot>Active</DSBadge>
              <DSBadge system={system} palette={palette} variant="info" size="sm">Pro</DSBadge>
            </div>
          </div>
        </div>
        <TokensGrid
          palette={palette}
          tokens={[
            { label: "Size SM", value: "32px" },
            { label: "Size MD", value: "40px" },
            { label: "Size LG", value: "48px" },
            { label: "Border Radius", value: "50% (circle)" },
            { label: "Border Color", value: palette.border },
            { label: "Status Color", value: palette.success },
          ]}
        />
      </div>

      {/* ──── Image vs Initials vs Icon ──── */}
      <div style={subsectionLabel}>Fallback Types</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <DSAvatar system={system} palette={palette} size="lg" initials="AB" />
          <div style={{ fontSize: 11, color: palette.textSecondary }}>Initials</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <DSAvatar system={system} palette={palette} size="lg" />
          <div style={{ fontSize: 11, color: palette.textSecondary }}>Default Icon</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <DSAvatar system={system} palette={palette} size="lg" icon={<CameraIcon size={22} />} />
          <div style={{ fontSize: 11, color: palette.textSecondary }}>Custom Icon</div>
        </div>
      </div>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {(["xs", "sm", "md", "lg", "xl"] as AvatarSize[]).map((sz) => (
          <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <DSAvatar system={system} palette={palette} size={sz} initials="AZ" />
            <div style={{ fontSize: 10, color: palette.textSecondary }}>{sz}</div>
          </div>
        ))}
      </div>

      {/* ──── With Online Status ──── */}
      <div style={subsectionLabel}>With Status Indicator</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DSAvatar system={system} palette={palette} size="lg" initials="ON" online={true} />
          <div style={{ fontSize: 11, color: palette.textSecondary }}>Online</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DSAvatar system={system} palette={palette} size="lg" initials="OF" online={false} />
          <div style={{ fontSize: 11, color: palette.textSecondary }}>Offline</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <DSAvatar system={system} palette={palette} size="lg" initials="NB" />
          <div style={{ fontSize: 11, color: palette.textSecondary }}>No status</div>
        </div>
      </div>

      {/* ──── With Badge ──── */}
      <div style={subsectionLabel}>With Badge</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        <DSAvatar
          system={system}
          palette={palette}
          size="lg"
          initials="NB"
          badge={
            <span style={{
              width: 18, height: 18, borderRadius: "50%", backgroundColor: palette.danger,
              color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center",
              justifyContent: "center", border: `2px solid ${palette.surface}`,
            }}>3</span>
          }
        />
        <DSAvatar
          system={system}
          palette={palette}
          size="lg"
          initials="PR"
          badge={
            <span style={{
              width: 18, height: 18, borderRadius: "50%", backgroundColor: palette.warning,
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              border: `2px solid ${palette.surface}`,
            }}>
              <BellIcon />
            </span>
          }
        />
        <DSAvatar
          system={system}
          palette={palette}
          size="lg"
          initials="VIP"
          badge={
            <span style={{
              color: palette.warning, display: "flex",
            }}>
              <StarIcon />
            </span>
          }
        />
      </div>

      {/* ──── Avatar Group ──── */}
      <div style={subsectionLabel}>Avatar Group</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 12 }}>Default group</div>
          <DSAvatarGroup system={system} palette={palette} size="md">
            {initialsData.map((d) => (
              <DSAvatar key={d.initials} system={system} palette={palette} size="md" initials={d.initials} />
            ))}
          </DSAvatarGroup>
        </div>
        <div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 12 }}>With max and overflow count</div>
          <DSAvatarGroup system={system} palette={palette} size="md" max={3} total={12}>
            {initialsData.map((d) => (
              <DSAvatar key={d.initials} system={system} palette={palette} size="md" initials={d.initials} />
            ))}
          </DSAvatarGroup>
        </div>
        <div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginBottom: 12 }}>Large size</div>
          <DSAvatarGroup system={system} palette={palette} size="lg" max={4} total={8}>
            {initialsData.map((d) => (
              <DSAvatar key={d.initials} system={system} palette={palette} size="lg" initials={d.initials} />
            ))}
          </DSAvatarGroup>
        </div>
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          padding: 0,
          overflow: "hidden",
        }}
      >
        {content.recentItems.slice(0, 4).map((item, i) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              borderBottom: i < 3 ? `1px solid ${palette.border}` : "none",
            }}
          >
            <DSAvatar
              system={system}
              palette={palette}
              size="sm"
              initials={item.author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              online={i % 2 === 0}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>{item.author}</div>
              <div style={{ fontSize: 11, color: palette.textSecondary }}>{item.title}</div>
            </div>
            <DSBadge
              system={system}
              palette={palette}
              variant={item.status === "Done" || item.status === "Active" ? "success" : item.status === "In Progress" ? "info" : "neutral"}
              size="sm"
            >
              {item.status}
            </DSBadge>
          </div>
        ))}
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use avatars"
          description="Avatars provide visual identity for people or entities:"
          items={[
            "User profiles and account menus",
            "Comment threads and messaging",
            "Team member lists and assignments",
            "Activity feeds and notifications",
            "Contact cards and directories",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Fallback strategy"
          description="When an image isn't available, use these fallbacks:"
          items={[
            "Image — Preferred when available",
            "Initials — First + last initial from the name",
            "Icon — Generic user icon as last resort",
            "Online indicator — Show real-time presence",
            "Group — Stack overlapping avatars for teams",
          ]}
        />
      </div>

      {/* ──── Do's and Don'ts ──── */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines
        palette={palette}
        items={[
          {
            type: "do",
            text: "Use consistent sizes within the same context (e.g., all avatars in a list should be the same size).",
            visual: (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {["A", "B", "C"].map((c) => (
                  <div key={c} style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.primary + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: palette.primary }}>{c}</div>
                ))}
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't mix avatar sizes within the same row or list. It creates visual inconsistency.",
            visual: (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: palette.primary + "18" }} />
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: palette.primary + "18" }} />
                <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: palette.primary + "18" }} />
              </div>
            ),
          },
          {
            type: "do",
            text: "Provide meaningful initials — use first letters of first and last name.",
            visual: (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: palette.primary + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: palette.primary }}>JD</div>
                <div style={{ fontSize: 11, color: palette.textSecondary }}>John Doe</div>
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't show more than 3 characters as initials. Long text overflows the circular shape.",
            visual: (
              <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: palette.primary + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 600, color: palette.primary, overflow: "hidden" }}>JOHN</div>
            ),
          },
        ]}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Avatar XS", value: "24 × 24px" },
          { label: "Avatar SM", value: "32 × 32px" },
          { label: "Avatar MD", value: "40 × 40px" },
          { label: "Avatar LG", value: "48 × 48px" },
          { label: "Avatar XL", value: "64 × 64px" },
          { label: "Badge Position Offset", value: "-4px top / -4px right" },
          { label: "Group Overlap", value: "-8px margin-left" },
          { label: "Status Dot Size", value: "14px (LG) / 10px (SM)" },
          { label: "Border Width", value: "2px" },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Circular container with consistent dimensions", x: 10, y: 50 },
          { id: 2, label: "Content", description: "Image, initials, or icon inside the circle", x: 50, y: 15 },
          { id: 3, label: "Status indicator", description: "Online/offline dot at the bottom-right", x: 80, y: 85 },
          { id: 4, label: "Badge (optional)", description: "Count or icon overlay at the top-right", x: 85, y: 15 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: palette.primary + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${palette.border}`,
                opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : undefined,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 600, color: palette.primary, opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>JD</span>
            </div>
            <span
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: palette.success,
                border: `2px solid ${palette.surface}`,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: palette.danger,
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${palette.surface}`,
                opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              3
            </span>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: -5, border: `2px dashed ${palette.primary}`, borderRadius: "50%", pointerEvents: "none" }} />
            )}
          </div>
        )}
      />
    </motion.section>
  );
}
