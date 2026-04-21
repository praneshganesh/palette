"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSNavbar } from "./navbar";
import type { NavbarVariant } from "./navbar";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface NavbarSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function NavbarSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: NavbarSectionProps) {
  const [solidActive, setSolidActive] = useState("dashboard");
  const [mobileDemo, setMobileDemo] = useState(false);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    overflow: "hidden",
  };

  const defaultLinks = [
    { id: "dashboard", label: "Dashboard" },
    { id: "projects", label: "Projects" },
    { id: "team", label: "Team" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <motion.section
      id="comp-nav-bars"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Nav Bar</p>
      <p style={sectionDesc}>
        The top navigation bar provides primary app-level navigation, branding, search,
        and user actions in a consistent horizontal strip across the top of the viewport.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Height", value: "56px" },
          { label: "Background", value: "palette.surface" },
          { label: "Shadow", value: "system.spacing.elevation.md (elevated)" },
          { label: "Text Color", value: "palette.textPrimary" },
        ]}
      />

      {/* ──── Solid (Default) ──── */}
      <div style={previewBox}>
        <DSNavbar
          system={system}
          palette={palette}
          brand={content.orgName}
          links={defaultLinks}
          variant="solid"
          showSearch
          showAvatar
          avatarInitials="SA"
          activeLinkId={solidActive}
          onLinkClick={setSolidActive}
        />
        <div style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: palette.textSecondary }}>Page content below the navbar</div>
        </div>
      </div>

      {/* ──── Variant Comparison ──── */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {(["solid", "transparent", "elevated"] as NavbarVariant[]).map((v) => (
          <div key={v} style={previewBox}>
            <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, padding: "10px 16px 0", textTransform: "capitalize" }}>
              {v}
            </div>
            <DSNavbar
              system={system}
              palette={palette}
              brand={content.orgName}
              links={[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "contact", label: "Contact" },
              ]}
              variant={v}
            />
          </div>
        ))}
      </div>

      {/* ──── With Search ──── */}
      <div style={subsectionLabel}>With Search</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        An integrated search field provides quick access to content discovery without leaving the current context.
      </div>
      <div style={previewBox}>
        <DSNavbar
          system={system}
          palette={palette}
          brand={content.orgName}
          links={defaultLinks}
          variant="solid"
          showSearch
        />
      </div>

      {/* ──── With Avatar ──── */}
      <div style={subsectionLabel}>With User Avatar</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        Displaying the user&apos;s avatar provides quick access to profile and account settings.
      </div>
      <div style={previewBox}>
        <DSNavbar
          system={system}
          palette={palette}
          brand={content.orgName}
          links={defaultLinks}
          variant="elevated"
          showAvatar
          avatarInitials="SA"
          showSearch
        />
      </div>

      {/* ──── Mobile Hamburger ──── */}
      <div style={subsectionLabel}>Mobile Menu</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        On smaller viewports, navigation links collapse behind a hamburger menu.
        Click the button below to toggle the mobile menu demo.
      </div>
      <div style={previewBox}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: 56,
            backgroundColor: palette.surface,
            borderBottom: `1px solid ${palette.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: system.spacing.radius.sm,
                backgroundColor: palette.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: palette.background,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {content.orgName.charAt(0)}
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>
              {content.orgName}
            </span>
          </div>
          <button
            onClick={() => setMobileDemo(!mobileDemo)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              border: "none",
              background: "none",
              color: palette.textPrimary,
              cursor: "pointer",
            }}
          >
            {mobileDemo ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
        {mobileDemo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: palette.surface,
              borderBottom: `1px solid ${palette.border}`,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "8px 16px" }}>
              {defaultLinks.map((link) => (
                <div
                  key={link.id}
                  style={{
                    padding: "12px",
                    fontSize: 14,
                    color: palette.textPrimary,
                    borderRadius: system.spacing.radius.md,
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {!mobileDemo && (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: palette.textSecondary }}>Click the hamburger icon to toggle the mobile menu</div>
          </div>
        )}
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use a nav bar"
          description="A top nav bar is the right pattern when:"
          items={[
            "The app has 3–7 top-level sections",
            "You need persistent branding across all pages",
            "Global search is a primary interaction",
            "User profile access should always be visible",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right variant"
          description="Select based on the visual context:"
          items={[
            "Solid — Default with subtle bottom border",
            "Transparent — Over hero images or colored backgrounds",
            "Elevated — Floating effect with shadow, no border",
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
            text: "Keep nav items to 5 or fewer. Group secondary items into dropdowns or move them to a sidebar.",
          },
          {
            type: "dont",
            text: "Don't combine a top nav bar and sidebar for the same navigation level. Choose one primary pattern.",
          },
          {
            type: "do",
            text: "Always provide a mobile-responsive version with a hamburger menu for smaller viewports.",
          },
          {
            type: "dont",
            text: "Don't hide critical actions behind the hamburger on desktop. Reserve it for mobile breakpoints only.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Full-width bar with consistent height", x: 5, y: 50 },
          { id: 2, label: "Brand / Logo", description: "App identity on the leading edge", x: 15, y: 15 },
          { id: 3, label: "Nav links", description: "Primary navigation items in the center", x: 45, y: 85 },
          { id: 4, label: "Search", description: "Global search input (optional)", x: 70, y: 15 },
          { id: 5, label: "User actions", description: "Avatar, notifications, settings", x: 90, y: 50 },
        ]}
        renderPreview={(highlighted) => (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              height: 48,
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 8,
              minWidth: 420,
            }}
          >
            {/* Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  backgroundColor: palette.primary,
                  color: palette.background,
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                A
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary }}>App</span>
            </div>

            {/* Links */}
            <div
              style={{
                display: "flex",
                gap: 8,
                opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              {["Home", "About", "Docs"].map((l, i) => (
                <span
                  key={l}
                  style={{
                    fontSize: 11,
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? palette.primary : palette.textSecondary,
                    padding: "4px 8px",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 4,
                  padding: "3px 8px",
                  fontSize: 10,
                  color: palette.textSecondary,
                  opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                Search
              </div>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: palette.primary + "20",
                  color: palette.primary,
                  fontSize: 9,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                U
              </div>
            </div>

            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: 10, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Navbar Height", value: "56px" },
          { label: "Logo Area Width", value: "120px" },
          { label: "Search Width", value: "200px" },
          { label: "Avatar Size", value: "32px" },
          { label: "Horizontal Padding", value: "24px" },
        ]}
      />
    </motion.section>
  );
}
