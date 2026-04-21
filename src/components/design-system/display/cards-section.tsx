"use client";

import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSCard } from "./card";
import type { CardVariant } from "./card";
import { DSBadge } from "./badge";
import { DSButton } from "../buttons/button";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";

interface CardsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const ImageIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const HeartIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const ShareIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const MoreIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

export function CardsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: CardsSectionProps) {
  const comp = system.components;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}
      <br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>
        → {value}
      </span>
    </div>
  );

  const sampleTitle = content.formFields.projectTitle || "Card Title";

  return (
    <motion.section
      id="comp-cards"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Cards</p>
      <p style={sectionDesc}>
        Cards group related information and actions into a contained, scannable
        surface. Use different variants to create visual hierarchy across
        card-based layouts.
      </p>

      {/* ──── Hero Preview + Tokens ──── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div
          style={{
            backgroundColor: palette.surfaceMuted,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.lg,
            padding: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200,
          }}
        >
          <DSCard
            system={system}
            palette={palette}
            variant="elevated"
            media={
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 140, color: palette.textSecondary }}>
                <ImageIcon size={32} />
              </div>
            }
            header={
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: palette.textPrimary }}>{sampleTitle}</div>
                <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 4 }}>Supporting description text</div>
              </div>
            }
            footer={
              <div style={{ display: "flex", gap: 8 }}>
                <DSButton system={system} palette={palette} variant="filled" size="sm">Action</DSButton>
                <DSButton system={system} palette={palette} variant="outlined" size="sm">Secondary</DSButton>
              </div>
            }
            style={{ width: 300 }}
          >
            Brief content that describes the card purpose and provides context for the user.
          </DSCard>
        </div>

        <div
          style={{
            backgroundColor: palette.surfaceMuted,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.md,
            padding: 24,
            alignSelf: "start",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>
            Design Tokens
          </p>
          {tokenRow("Border Radius", comp.card.borderRadius || system.spacing.radius.lg)}
          {tokenRow("Shadow", system.spacing.elevation.md)}
          {tokenRow("Surface BG", palette.surface)}
          {tokenRow("Border", palette.border)}
          {tokenRow("Padding", comp.card.padding || "20px")}
        </div>
      </div>

      {/* ──── Card Variants ──── */}
      <div style={subsectionLabel}>Card Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {(["elevated", "outlined", "filled"] as CardVariant[]).map((v) => (
          <div key={v}>
            <DSCard
              system={system}
              palette={palette}
              variant={v}
              header={
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, textTransform: "capitalize" }}>{v}</div>
                  <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>
                    {v === "elevated" && "Shadow-based depth"}
                    {v === "outlined" && "Border-defined boundary"}
                    {v === "filled" && "Subtle background fill"}
                  </div>
                </div>
              }
            >
              This card uses the {v} variant style to establish its visual presence in the layout.
            </DSCard>
          </div>
        ))}
      </div>

      {/* ──── With Media ──── */}
      <div style={subsectionLabel}>With Media</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {[
          { title: content.recentItems[0]?.title || "Featured Item", status: "Published" },
          { title: content.recentItems[1]?.title || "Recent Update", status: "Draft" },
          { title: content.recentItems[2]?.title || "New Entry", status: "Review" },
        ].map((item, i) => (
          <DSCard
            key={i}
            system={system}
            palette={palette}
            variant="elevated"
            media={
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 140, color: palette.textSecondary, background: `linear-gradient(135deg, ${palette.primary}10, ${palette.primary}05)` }}>
                <ImageIcon size={28} />
              </div>
            }
            header={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{item.title}</div>
                <DSBadge system={system} palette={palette} variant={i === 0 ? "success" : i === 1 ? "warning" : "info"} size="sm">{item.status}</DSBadge>
              </div>
            }
            footer={
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                <DSButton system={system} palette={palette} variant="text" size="sm" leadingIcon={<HeartIcon />}>Like</DSButton>
                <DSButton system={system} palette={palette} variant="text" size="sm" leadingIcon={<ShareIcon />}>Share</DSButton>
                <div style={{ flex: 1 }} />
                <DSButton system={system} palette={palette} variant="text" size="sm" iconOnly leadingIcon={<MoreIcon />} />
              </div>
            }
          >
            Supporting descriptive text that provides additional context about this item.
          </DSCard>
        ))}
      </div>

      {/* ──── Horizontal Card ──── */}
      <div style={subsectionLabel}>Horizontal Layout</div>
      <div style={{ maxWidth: 560 }}>
        <DSCard
          system={system}
          palette={palette}
          variant="outlined"
          horizontal
          media={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 180, color: palette.textSecondary, background: `linear-gradient(135deg, ${palette.primary}10, ${palette.secondary}10)` }}>
              <ImageIcon size={28} />
            </div>
          }
          header={
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>{sampleTitle}</div>
              <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 2 }}>Horizontal cards work well for list layouts</div>
            </div>
          }
          footer={
            <div style={{ display: "flex", gap: 8 }}>
              <DSButton system={system} palette={palette} variant="filled" size="sm">View</DSButton>
              <DSButton system={system} palette={palette} variant="text" size="sm">Dismiss</DSButton>
            </div>
          }
        >
          A horizontal card orients the media to the left, creating a side-by-side layout.
        </DSCard>
      </div>

      {/* ──── Interactive Cards ──── */}
      <div style={subsectionLabel}>Interactive (Clickable) Cards</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {(["elevated", "outlined", "filled"] as CardVariant[]).map((v) => (
          <DSCard
            key={v}
            system={system}
            palette={palette}
            variant={v}
            interactive
            header={
              <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, textTransform: "capitalize" }}>
                Clickable {v}
              </div>
            }
          >
            <div style={{ fontSize: 12 }}>Hover to see the interactive feedback. The entire card is a click target.</div>
          </DSCard>
        ))}
      </div>

      {/* ──── Card Grid ──── */}
      <div style={subsectionLabel}>Card Grid Layout</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {content.kpis.map((kpi, i) => (
          <DSCard
            key={i}
            system={system}
            palette={palette}
            variant="outlined"
            size="sm"
            header={
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.label}</div>
              </div>
            }
          >
            <div style={{ marginTop: -8 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: palette.textPrimary }}>{kpi.value}</div>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>{kpi.subtitle}</div>
            </div>
          </DSCard>
        ))}
      </div>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
        {(["sm", "md", "lg"] as const).map((sz) => (
          <div key={sz}>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8, textTransform: "uppercase", fontWeight: 600 }}>{sz}</div>
            <DSCard system={system} palette={palette} variant="outlined" size={sz} header={<div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary }}>Card — {sz.toUpperCase()}</div>}>
              Padding and spacing adjust to the selected size for appropriate density.
            </DSCard>
          </div>
        ))}
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use cards"
          description="Cards group related content and actions into a single, digestible container:"
          items={[
            "Dashboard KPIs and metrics",
            "Product listings and content feeds",
            "Profile summaries and contact cards",
            "Feature highlights and onboarding steps",
            "Media galleries and portfolio items",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right variant"
          description="Select a variant based on the visual emphasis needed:"
          items={[
            "Elevated — Primary content that needs prominence",
            "Outlined — Neutral containers for lists and grids",
            "Filled — Subtle grouping on lighter backgrounds",
            "Horizontal — Side-by-side for list-style layouts",
            "Interactive — Entire card acts as a navigation target",
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
            text: "Use consistent card variants within the same section or grid. Mix only when creating intentional hierarchy.",
            visual: (
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 80, height: 60, borderRadius: 8, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }} />
                <div style={{ width: 80, height: 60, borderRadius: 8, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }} />
                <div style={{ width: 80, height: 60, borderRadius: 8, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }} />
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't overload cards with too much content. Keep them focused on a single topic or action.",
            visual: (
              <div style={{ width: 160, height: 80, borderRadius: 8, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, padding: 6, overflow: "hidden" }}>
                <div style={{ fontSize: 8, color: palette.textSecondary, lineHeight: 1.2 }}>Title here and lots and lots of text that keeps going and going with many buttons and links and tags...</div>
              </div>
            ),
          },
          {
            type: "do",
            text: "Keep card heights consistent in a grid by aligning content structure.",
            visual: (
              <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                <div style={{ width: 70, height: 60, borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }} />
                <div style={{ width: 70, height: 60, borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }} />
              </div>
            ),
          },
          {
            type: "dont",
            text: "Don't nest cards inside cards. Use flat layouts with clear content sections instead.",
            visual: (
              <div style={{ width: 120, height: 70, borderRadius: 8, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 80, height: 40, borderRadius: 6, border: `1px dashed ${palette.danger}`, backgroundColor: palette.surfaceMuted }} />
              </div>
            ),
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "The card surface with border radius and optional shadow", x: 8, y: 50 },
          { id: 2, label: "Media area", description: "Optional image or visual content at the top", x: 50, y: 8 },
          { id: 3, label: "Header", description: "Title, subtitle, and optional badges or actions", x: 75, y: 35 },
          { id: 4, label: "Body", description: "Main content area with text or custom elements", x: 75, y: 60 },
          { id: 5, label: "Footer", description: "Actions, links, or metadata at the bottom", x: 50, y: 90 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", width: 240 }}>
            <div
              style={{
                borderRadius: comp.card.borderRadius || system.spacing.radius.lg,
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.surface,
                boxShadow: system.spacing.elevation.md,
                opacity: highlighted === 1 ? 1 : undefined,
              }}
            >
              <div
                style={{
                  height: 60,
                  backgroundColor: palette.primary + "10",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                <ImageIcon size={20} />
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                  Card Header
                </div>
                <div style={{ fontSize: 11, color: palette.textSecondary, lineHeight: 1.5, marginBottom: 12, opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                  Body content goes here with supporting text.
                </div>
                <div style={{ display: "flex", gap: 6, opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                  <div style={{ height: 24, width: 60, borderRadius: 6, backgroundColor: palette.primary, opacity: 0.8 }} />
                  <div style={{ height: 24, width: 60, borderRadius: 6, border: `1px solid ${palette.border}` }} />
                </div>
              </div>
            </div>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: comp.card.borderRadius || system.spacing.radius.lg, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />
    </motion.section>
  );
}
