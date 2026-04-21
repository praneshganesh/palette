"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSDrawer, DrawerPreviewContainer, DrawerTriggerButton } from "./drawer";
import type { DrawerPosition, DrawerSize } from "./drawer";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface DrawersSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const MenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export function DrawersSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: DrawersSectionProps) {
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [sizeDrawer, setSizeDrawer] = useState<DrawerSize | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const navItem = (label: string, active?: boolean) => (
    <div
      key={label}
      style={{
        padding: "8px 12px",
        fontSize: 12,
        color: active ? palette.primary : palette.textSecondary,
        backgroundColor: active ? palette.primary + "10" : "transparent",
        borderRadius: system.spacing.radius.sm,
        fontWeight: active ? 600 : 400,
        marginBottom: 2,
      }}
    >
      {label}
    </div>
  );

  const drawerNav = (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {content.sidebarSections.slice(0, 2).map((section) => (
        <div key={section.label}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: palette.textSecondary, padding: "8px 12px 4px", marginTop: 8 }}>
            {section.label}
          </div>
          {section.items.map((item) => navItem(item.name, item.active))}
        </div>
      ))}
    </div>
  );

  return (
    <motion.section
      id="comp-drawers"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Drawers</p>
      <p style={sectionDesc}>
        Drawers are panels that slide in from the edge of a container to reveal
        supplementary content. They maintain context while providing access to
        navigation, filters, or detail views.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Overlay Background", value: "rgba(0, 0, 0, 0.3)" },
          { label: "Container Background", value: "palette.surface" },
          { label: "Shadow", value: "system.spacing.elevation.lg" },
          { label: "Width (Default)", value: "320px" },
        ]}
      />

      {/* ──── Position Variants ──── */}
      <div style={subsectionLabel}>Position Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Right Drawer */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, marginBottom: 8 }}>Right (default)</div>
          <DrawerPreviewContainer palette={palette} system={system} height={280}>
            {!rightOpen && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DrawerTriggerButton palette={palette} system={system} onClick={() => setRightOpen(true)}>
                  Open Right
                </DrawerTriggerButton>
              </div>
            )}
            <DSDrawer
              system={system}
              palette={palette}
              position="right"
              open={rightOpen}
              onClose={() => setRightOpen(false)}
              title="Details"
            >
              {drawerNav}
            </DSDrawer>
          </DrawerPreviewContainer>
        </div>

        {/* Left Drawer */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, marginBottom: 8 }}>Left</div>
          <DrawerPreviewContainer palette={palette} system={system} height={280}>
            {!leftOpen && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DrawerTriggerButton palette={palette} system={system} onClick={() => setLeftOpen(true)}>
                  Open Left
                </DrawerTriggerButton>
              </div>
            )}
            <DSDrawer
              system={system}
              palette={palette}
              position="left"
              open={leftOpen}
              onClose={() => setLeftOpen(false)}
              title="Navigation"
            >
              {drawerNav}
            </DSDrawer>
          </DrawerPreviewContainer>
        </div>

        {/* Top Drawer */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, marginBottom: 8 }}>Top</div>
          <DrawerPreviewContainer palette={palette} system={system} height={280}>
            {!topOpen && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DrawerTriggerButton palette={palette} system={system} onClick={() => setTopOpen(true)}>
                  Open Top
                </DrawerTriggerButton>
              </div>
            )}
            <DSDrawer
              system={system}
              palette={palette}
              position="top"
              size="sm"
              open={topOpen}
              onClose={() => setTopOpen(false)}
              title="Notifications"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {content.recentItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: palette.surfaceMuted,
                      borderRadius: system.spacing.radius.sm,
                      fontSize: 12,
                    }}
                  >
                    <div style={{ fontWeight: 500, color: palette.textPrimary }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>{item.author}</div>
                  </div>
                ))}
              </div>
            </DSDrawer>
          </DrawerPreviewContainer>
        </div>

        {/* Bottom Drawer */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, marginBottom: 8 }}>Bottom</div>
          <DrawerPreviewContainer palette={palette} system={system} height={280}>
            {!bottomOpen && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DrawerTriggerButton palette={palette} system={system} onClick={() => setBottomOpen(true)}>
                  Open Bottom
                </DrawerTriggerButton>
              </div>
            )}
            <DSDrawer
              system={system}
              palette={palette}
              position="bottom"
              size="sm"
              open={bottomOpen}
              onClose={() => setBottomOpen(false)}
              title="Quick Actions"
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {content.quickActions.map((action) => (
                  <div
                    key={action}
                    style={{
                      padding: "6px 14px",
                      fontSize: 12,
                      borderRadius: system.spacing.radius.md,
                      border: `1px solid ${palette.border}`,
                      color: palette.textPrimary,
                    }}
                  >
                    {action}
                  </div>
                ))}
              </div>
            </DSDrawer>
          </DrawerPreviewContainer>
        </div>
      </div>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {(["sm", "md", "lg"] as DrawerSize[]).map((sz) => (
          <button
            key={sz}
            onClick={() => setSizeDrawer(sz)}
            style={{
              padding: "8px 18px",
              fontSize: 12,
              fontWeight: 500,
              color: palette.textPrimary,
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.md,
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            {sz}
          </button>
        ))}
      </div>
      <DrawerPreviewContainer palette={palette} system={system} height={300}>
        {!sizeDrawer && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, color: palette.textSecondary }}>Select a size above to preview</span>
          </div>
        )}
        {sizeDrawer && (
          <DSDrawer
            system={system}
            palette={palette}
            position="right"
            size={sizeDrawer}
            open={!!sizeDrawer}
            onClose={() => setSizeDrawer(null)}
            title={`${sizeDrawer.toUpperCase()} Drawer`}
          >
            <p style={{ margin: 0 }}>
              This drawer uses the &ldquo;{sizeDrawer}&rdquo; size variant, which sets the panel width
              to {sizeDrawer === "sm" ? "260px" : sizeDrawer === "md" ? "340px" : "440px"}.
            </p>
          </DSDrawer>
        )}
      </DrawerPreviewContainer>

      {/* ──── Usage ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use drawers"
          description="Drawers slide in without navigating away from the current view:"
          items={[
            "Mobile navigation menus",
            "Filter and sort panels",
            "Detail views for list items",
            "Settings and preference panels",
            "Shopping carts and quick-add forms",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Drawers vs Modals"
          description="Choose the right overlay pattern:"
          items={[
            "Drawers — Supplementary content, maintain context",
            "Modals — Focused tasks requiring commitment",
            "Drawers — Can remain open during interaction",
            "Modals — Close on completion or cancellation",
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
            text: "Use left drawers for navigation menus and right drawers for detail panels and filters.",
          },
          {
            type: "dont",
            text: "Don't place critical workflow steps in a drawer. Use a dedicated page or modal instead.",
          },
          {
            type: "do",
            text: "Include a visible close button and allow overlay-click dismissal for easy escape.",
          },
          {
            type: "dont",
            text: "Don't make drawers so wide they obscure the entire page. Keep them as side panels.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Overlay", description: "Semi-transparent backdrop behind the drawer", x: 5, y: 50 },
          { id: 2, label: "Panel", description: "The drawer surface sliding from the edge", x: 70, y: 20 },
          { id: 3, label: "Header", description: "Title and close button area", x: 75, y: 10 },
          { id: 4, label: "Content", description: "Scrollable content area within the drawer", x: 82, y: 60 },
          { id: 5, label: "Close button", description: "Button to dismiss the drawer", x: 95, y: 10 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", width: 360, height: 180, borderRadius: system.spacing.radius.md, overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: palette.surfaceMuted,
                opacity: highlighted === 1 ? 0.8 : highlighted === null ? 0.4 : 0.15,
                transition: "opacity 0.2s",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: 160,
                backgroundColor: palette.surface,
                borderLeft: `1px solid ${palette.border}`,
                boxShadow: system.spacing.elevation.lg,
                display: "flex",
                flexDirection: "column",
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.7,
                transition: "opacity 0.2s",
              }}
            >
              <div
                style={{
                  padding: "10px 12px",
                  borderBottom: `1px solid ${palette.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: highlighted === 3 || highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 600, color: palette.textPrimary }}>Title</div>
                <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: palette.border + "60" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                <div style={{ width: "80%", height: 8, borderRadius: 4, backgroundColor: palette.border + "40" }} />
                <div style={{ width: "100%", height: 8, borderRadius: 4, backgroundColor: palette.border + "40" }} />
                <div style={{ width: "60%", height: 8, borderRadius: 4, backgroundColor: palette.border + "40" }} />
              </div>
            </div>
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Default Width", value: "320px" },
          { label: "Header Height", value: "56px" },
          { label: "Content Padding", value: "16px" },
        ]}
      />
    </motion.section>
  );
}
