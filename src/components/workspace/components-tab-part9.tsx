"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart9Props {
  system: DesignSystem;
  content: IndustryContent;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function ComponentsPart9({ system, content }: ComponentsPart9Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const comp = system.components;

  const [activeTimeSegment, setActiveTimeSegment] = useState(1);
  const [activeViewSegment, setActiveViewSegment] = useState(0);
  const [activeThemeSegment, setActiveThemeSegment] = useState(0);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    content.sidebarSections.forEach((s, i) => {
      init[s.label] = i < 2;
    });
    return init;
  });
  const [activeTocIndex, setActiveTocIndex] = useState(1);
  const [activeBottomTab, setActiveBottomTab] = useState(0);

  const accentBar: React.CSSProperties = {
    width: 48,
    height: 2,
    backgroundColor: palette.primary,
    marginBottom: 24,
    borderRadius: 1,
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    color: palette.textPrimary,
    fontFamily: system.typography.headingFont,
    marginBottom: 8,
  };

  const sectionDesc: React.CSSProperties = {
    fontSize: 14,
    color: palette.textSecondary,
    lineHeight: 1.8,
    maxWidth: 600,
    marginBottom: 32,
  };

  const sectionWrap = (border = true): React.CSSProperties => ({
    padding: "56px 0",
    borderTop: border ? `1px solid ${palette.border}` : "none",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: palette.textSecondary,
    marginBottom: 16,
    fontFamily: system.typography.bodyFont,
  };

  const timeSegments = ["Day", "Week", "Month"];
  const viewSegments = [
    { label: "List", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="1.5" rx="0.5" fill="currentColor"/><rect x="1" y="6" width="12" height="1.5" rx="0.5" fill="currentColor"/><rect x="1" y="10" width="12" height="1.5" rx="0.5" fill="currentColor"/></svg> },
    { label: "Grid", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor"/><rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor"/><rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor"/><rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor"/></svg> },
    { label: "Card", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="5" rx="1" fill="currentColor"/><rect x="1" y="8" width="12" height="5" rx="1" fill="currentColor"/></svg> },
    { label: "Kanban", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="3.5" height="12" rx="0.75" fill="currentColor"/><rect x="5.25" y="1" width="3.5" height="8" rx="0.75" fill="currentColor"/><rect x="9.5" y="1" width="3.5" height="10" rx="0.75" fill="currentColor"/></svg> },
  ];
  const themeSegments = ["Light", "Dark"];

  const megaColumns = content.sidebarSections.slice(0, 3).map((sec) => ({
    heading: sec.label,
    links: sec.items.slice(0, 5).map((item) => ({
      name: item.name,
      desc: `Manage ${item.name.toLowerCase()} and related resources`,
    })),
  }));

  const tocSections = [
    { label: "Getting Started", sub: ["Installation", "Quick Start"] },
    { label: "Configuration", sub: ["Environment", "Options"] },
    { label: "API Reference", sub: ["Endpoints", "Authentication"] },
    { label: "Examples", sub: ["Basic Usage"] },
    { label: "FAQ", sub: [] },
    { label: "Changelog", sub: ["v2.0", "v1.5"] },
  ];

  const bottomTabs = [
    { label: "Home", icon: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { label: "Search", icon: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> },
    { label: "Add", icon: (c: string) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg> },
    { label: "Alerts", icon: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
    { label: "Profile", icon: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <>
      {/* 1 — Segmented Control */}
      <motion.section id="comp-segmented" data-comp-section style={sectionWrap(false)} {...fadeUp} transition={{ delay: 0.05 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Segmented Control</h2>
        <p style={sectionDesc}>
          Toggle-style controls that let users switch between related views or modes with clear visual feedback on the active selection.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {/* 3-segment time */}
          <div>
            <div style={labelStyle}>Time Range</div>
            <div style={{
              display: "inline-flex",
              backgroundColor: palette.surfaceMuted,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.full,
              padding: 3,
            }}>
              {timeSegments.map((seg, i) => (
                <button
                  key={seg}
                  onClick={() => setActiveTimeSegment(i)}
                  style={{
                    padding: "8px 24px",
                    fontSize: 13,
                    fontWeight: activeTimeSegment === i ? 600 : 400,
                    fontFamily: system.typography.bodyFont,
                    color: activeTimeSegment === i ? "#fff" : palette.textSecondary,
                    backgroundColor: activeTimeSegment === i ? palette.primary : "transparent",
                    border: "none",
                    borderRadius: system.spacing.radius.full,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>

          {/* 4-segment view with icons */}
          <div>
            <div style={labelStyle}>View Mode</div>
            <div style={{
              display: "inline-flex",
              backgroundColor: palette.surfaceMuted,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.full,
              padding: 3,
            }}>
              {viewSegments.map((seg, i) => (
                <button
                  key={seg.label}
                  onClick={() => setActiveViewSegment(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 18px",
                    fontSize: 13,
                    fontWeight: activeViewSegment === i ? 600 : 400,
                    fontFamily: system.typography.bodyFont,
                    color: activeViewSegment === i ? "#fff" : palette.textSecondary,
                    backgroundColor: activeViewSegment === i ? palette.primary : "transparent",
                    border: "none",
                    borderRadius: system.spacing.radius.full,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {seg.icon}
                  {seg.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-segment theme */}
          <div>
            <div style={labelStyle}>Theme</div>
            <div style={{
              display: "inline-flex",
              backgroundColor: palette.surfaceMuted,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.full,
              padding: 3,
            }}>
              {themeSegments.map((seg, i) => (
                <button
                  key={seg}
                  onClick={() => setActiveThemeSegment(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 28px",
                    fontSize: 13,
                    fontWeight: activeThemeSegment === i ? 600 : 400,
                    fontFamily: system.typography.bodyFont,
                    color: activeThemeSegment === i ? "#fff" : palette.textSecondary,
                    backgroundColor: activeThemeSegment === i ? palette.primary : "transparent",
                    border: "none",
                    borderRadius: system.spacing.radius.full,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {i === 0 ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  )}
                  {seg}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2 — Mega Menu */}
      <motion.section id="comp-mega-menu" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.1 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Mega Menu</h2>
        <p style={sectionDesc}>
          An expanded navigation panel that reveals grouped links, descriptions, and featured content in a multi-column layout.
        </p>

        <div style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          overflow: "hidden",
        }}>
          {/* Nav bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
            borderBottom: `1px solid ${palette.border}`,
            backgroundColor: palette.surfaceMuted,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: palette.primary, fontFamily: system.typography.headingFont }}>{content.orgName}</span>
              {["Products", "Solutions", "Resources", "Pricing"].map((item) => (
                <span key={item} style={{ fontSize: 13, color: item === "Products" ? palette.primary : palette.textSecondary, fontWeight: item === "Products" ? 600 : 400, cursor: "pointer", fontFamily: system.typography.bodyFont }}>{item}</span>
              ))}
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>

          {/* Dropdown panel */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 240px", gap: 0, padding: 0 }}>
            {megaColumns.map((col, ci) => (
              <div key={col.heading} style={{ padding: "24px 28px", borderRight: ci < 2 ? `1px solid ${palette.border}` : "none" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: palette.primary, marginBottom: 16, fontFamily: system.typography.bodyFont }}>{col.heading}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {col.links.map((link) => (
                    <div key={link.name} style={{ cursor: "pointer" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 2, fontFamily: system.typography.bodyFont }}>{link.name}</div>
                      <div style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.5 }}>{link.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Featured card */}
            <div style={{ padding: 24, borderLeft: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: palette.primary, marginBottom: 16, fontFamily: system.typography.bodyFont }}>Featured</div>
              <div style={{
                borderRadius: system.spacing.radius.md,
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.surface,
              }}>
                <div style={{
                  height: 100,
                  background: `linear-gradient(135deg, ${palette.primary}22, ${palette.accent}22)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>What&apos;s New in v3.0</div>
                  <div style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.5 }}>Explore the latest features and improvements.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3 — Tree Navigation */}
      <motion.section id="comp-tree-nav" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.15 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Tree Navigation</h2>
        <p style={sectionDesc}>
          A hierarchical sidebar tree that organizes content in expandable, nested groups with visual indicators for the active item.
        </p>

        <div style={{
          width: 280,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          padding: "16px 0",
          overflow: "hidden",
        }}>
          {content.sidebarSections.map((section) => {
            const isOpen = expandedNodes[section.label] ?? false;
            return (
              <div key={section.label} style={{ marginBottom: 4 }}>
                <button
                  onClick={() => setExpandedNodes((prev) => ({ ...prev, [section.label]: !prev[section.label] }))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    color: palette.textSecondary,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    fontFamily: system.typography.bodyFont,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                    <path d="M4 2l4 4-4 4" stroke={palette.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                  {section.label}
                </button>

                {isOpen && (
                  <div style={{ paddingLeft: 20 }}>
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "7px 16px 7px 24px",
                          borderRadius: system.spacing.radius.md,
                          marginRight: 8,
                          backgroundColor: item.active ? `${palette.primary}14` : "transparent",
                          cursor: "pointer",
                          transition: "background 0.15s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.active ? palette.primary : palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                          </svg>
                          <span style={{
                            fontSize: 13,
                            fontWeight: item.active ? 600 : 400,
                            color: item.active ? palette.primary : palette.textPrimary,
                            fontFamily: system.typography.bodyFont,
                          }}>
                            {item.name}
                          </span>
                        </div>
                        {item.badge && (
                          <span style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: "2px 7px",
                            borderRadius: system.spacing.radius.full,
                            backgroundColor: `${palette.primary}18`,
                            color: palette.primary,
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 4 — Anchor Navigation / Table of Contents */}
      <motion.section id="comp-anchor-nav" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.2 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Anchor Navigation</h2>
        <p style={sectionDesc}>
          A sticky table-of-contents sidebar that tracks scroll position and highlights the current section with a visual scrollspy indicator.
        </p>

        <div style={{
          width: 260,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          padding: "20px 0",
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: palette.textSecondary,
            padding: "0 20px",
            marginBottom: 16,
            fontFamily: system.typography.bodyFont,
          }}>
            On this page
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {tocSections.map((sec, i) => {
              const isActive = i === activeTocIndex;
              return (
                <React.Fragment key={sec.label}>
                  <button
                    onClick={() => setActiveTocIndex(i)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "6px 20px",
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? palette.primary : palette.textSecondary,
                      backgroundColor: "transparent",
                      border: "none",
                      borderLeft: isActive ? `2px solid ${palette.primary}` : "2px solid transparent",
                      cursor: "pointer",
                      fontFamily: system.typography.bodyFont,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {sec.label}
                  </button>

                  {isActive && sec.sub.length > 0 && sec.sub.map((sub) => (
                    <div key={sub} style={{
                      padding: "4px 20px 4px 34px",
                      fontSize: 12,
                      color: palette.textSecondary,
                      borderLeft: "2px solid transparent",
                      fontFamily: system.typography.bodyFont,
                      cursor: "pointer",
                    }}>
                      {sub}
                    </div>
                  ))}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 5 — Bottom Navigation (Mobile) */}
      <motion.section id="comp-bottom-nav" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.25 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Bottom Navigation</h2>
        <p style={sectionDesc}>
          A mobile tab bar pinned to the bottom of the screen with a prominent center action, icon+label tabs, and notification badge.
        </p>

        {/* Phone frame */}
        <div style={{
          width: 360,
          height: 260,
          backgroundColor: palette.surface,
          border: `2px solid ${palette.border}`,
          borderRadius: 28,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
        }}>
          {/* Mock content area */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>App Content</span>
          </div>

          {/* Tab bar */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            padding: "8px 8px 16px",
            backgroundColor: palette.surface,
            borderTop: `1px solid ${palette.border}`,
          }}>
            {bottomTabs.map((tab, i) => {
              const isCenter = i === 2;
              const isActive = activeBottomTab === i;
              const iconColor = isActive ? palette.primary : palette.textSecondary;

              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveBottomTab(i)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: isCenter ? 4 : 2,
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    position: "relative",
                    marginTop: isCenter ? -20 : 0,
                  }}
                >
                  {isCenter ? (
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: palette.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 12px ${palette.primary}44`,
                    }}>
                      {tab.icon("#fff")}
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      {tab.icon(iconColor)}
                      {tab.label === "Alerts" && (
                        <span style={{
                          position: "absolute",
                          top: -4,
                          right: -8,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: palette.danger,
                          color: "#fff",
                          fontSize: 9,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>3</span>
                      )}
                    </div>
                  )}
                  <span style={{
                    fontSize: 10,
                    fontWeight: isActive ? 600 : 400,
                    color: isCenter ? palette.primary : (isActive ? palette.primary : palette.textSecondary),
                    fontFamily: system.typography.bodyFont,
                  }}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 6 — Spinner / Loading */}
      <motion.section id="comp-spinner" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.3 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Spinner / Loading</h2>
        <p style={sectionDesc}>
          Loading indicators in multiple styles — spinners, bouncing dots, skeleton placeholders, and progress bars for perceived performance.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
            {/* Circular spinner */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={labelStyle}>Spinner</div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="13" stroke={palette.border} strokeWidth="3"/>
                  <path d="M16 3a13 13 0 0 1 13 13" stroke={palette.primary} strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </div>

            {/* Bouncing dots */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={labelStyle}>Dots</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[0, 1, 2].map((d) => (
                  <motion.div
                    key={d}
                    style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: palette.primary }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>

            {/* Skeleton pulse */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={labelStyle}>Skeleton</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 180 }}>
                {[100, 140, 110].map((w, i) => (
                  <motion.div
                    key={i}
                    style={{ width: w, height: 12, borderRadius: 6, backgroundColor: palette.border }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Linear progress bar */}
          <div>
            <div style={labelStyle}>Linear Progress (Indeterminate)</div>
            <div style={{ height: 4, width: 320, borderRadius: 2, backgroundColor: palette.border, overflow: "hidden", position: "relative" }}>
              <motion.div
                style={{ height: "100%", width: "40%", borderRadius: 2, backgroundColor: palette.primary, position: "absolute", top: 0, left: 0 }}
                animate={{ left: ["-40%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Full-page overlay */}
          <div>
            <div style={labelStyle}>Full-page Overlay</div>
            <div style={{
              width: 400,
              height: 180,
              borderRadius: system.spacing.radius.lg,
              border: `1px solid ${palette.border}`,
              backgroundColor: palette.background,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: system.spacing.radius.lg,
                backgroundColor: `${palette.textPrimary}08`,
              }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="15" stroke={palette.border} strokeWidth="3"/>
                  <path d="M18 3a15 15 0 0 1 15 15" stroke={palette.primary} strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <span style={{ fontSize: 14, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>Loading your data...</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7 — Error State */}
      <motion.section id="comp-error-state" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.35 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Error State</h2>
        <p style={sectionDesc}>
          A centered error page with geometric illustration, clear messaging, actionable recovery buttons, and a reference error code.
        </p>

        <div style={{
          width: 480,
          padding: 48,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          {/* Geometric illustration */}
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none" style={{ marginBottom: 24 }}>
            <circle cx="48" cy="48" r="40" fill={`${palette.danger}12`} stroke={`${palette.danger}30`} strokeWidth="2"/>
            <rect x="30" y="30" width="36" height="36" rx="6" fill={`${palette.danger}18`} stroke={palette.danger} strokeWidth="2" transform="rotate(12 48 48)"/>
            <path d="M42 42l12 12M54 42l-12 12" stroke={palette.danger} strokeWidth="3" strokeLinecap="round"/>
          </svg>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont, marginTop: 0 }}>Something went wrong</h3>
          <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, maxWidth: 320, marginBottom: 24, marginTop: 0 }}>
            We encountered an unexpected error while processing your request. Please try again or contact support.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <button style={{
              padding: "10px 24px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              backgroundColor: palette.primary,
              border: "none",
              borderRadius: comp.button.borderRadius || system.spacing.radius.md,
              cursor: "pointer",
              fontFamily: system.typography.bodyFont,
            }}>
              Try Again
            </button>
            <button style={{
              padding: "10px 24px",
              fontSize: 13,
              fontWeight: 600,
              color: palette.textSecondary,
              backgroundColor: "transparent",
              border: `1px solid ${palette.border}`,
              borderRadius: comp.button.borderRadius || system.spacing.radius.md,
              cursor: "pointer",
              fontFamily: system.typography.bodyFont,
            }}>
              Go Back
            </button>
          </div>

          <span style={{ fontSize: 12, color: palette.textSecondary, opacity: 0.6, fontFamily: "monospace" }}>ERR_500</span>
        </div>
      </motion.section>

      {/* 8 — Maintenance State */}
      <motion.section id="comp-maintenance" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.4 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Maintenance State</h2>
        <p style={sectionDesc}>
          A scheduled maintenance page with status information, expected completion time, progress indicator, and opt-in notification.
        </p>

        <div style={{
          width: 480,
          padding: 48,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          {/* Wrench/gear icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: `${palette.warning}14`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={palette.warning} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8, marginTop: 0 }}>Under Maintenance</h3>
          <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, maxWidth: 360, marginBottom: 24, marginTop: 0 }}>
            We&apos;re performing scheduled maintenance. Expected completion: 2:00 PM GST
          </p>

          {/* Progress bar */}
          <div style={{ width: "80%", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: palette.textSecondary }}>Progress</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: palette.warning }}>60%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, backgroundColor: palette.border, overflow: "hidden" }}>
              <div style={{ width: "60%", height: "100%", borderRadius: 3, backgroundColor: palette.warning }} />
            </div>
          </div>

          {/* Email input */}
          <div style={{ display: "flex", gap: 8, width: "80%" }}>
            <input
              type="email"
              placeholder="Enter your email"
              readOnly
              style={{
                flex: 1,
                padding: "10px 14px",
                fontSize: 13,
                color: palette.textPrimary,
                backgroundColor: palette.background,
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.md,
                outline: "none",
                fontFamily: system.typography.bodyFont,
              }}
            />
            <button style={{
              padding: "10px 18px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              backgroundColor: palette.primary,
              border: "none",
              borderRadius: system.spacing.radius.md,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: system.typography.bodyFont,
            }}>
              Notify Me
            </button>
          </div>
        </div>
      </motion.section>

      {/* 9 — No Results State */}
      <motion.section id="comp-no-results" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.45 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>No Results State</h2>
        <p style={sectionDesc}>
          An empty search results page with helpful suggestions, search chips, and a clear call to action for adjusting filters.
        </p>

        <div style={{
          width: 480,
          padding: 48,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          {/* Search icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: palette.surfaceMuted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
              <path d="M8 11h6M11 8v6" stroke={palette.textSecondary} strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8, marginTop: 0 }}>No results found</h3>
          <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, maxWidth: 320, marginBottom: 20, marginTop: 0 }}>
            Try adjusting your search or filter criteria to find what you&apos;re looking for.
          </p>

          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 13, color: palette.textSecondary, marginRight: 8 }}>Try searching for:</span>
            <div style={{ display: "inline-flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {(content.quickActions || ["Reports", "Analytics", "Settings"]).slice(0, 3).map((suggestion) => (
                <span
                  key={suggestion}
                  style={{
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: palette.primary,
                    backgroundColor: `${palette.primary}10`,
                    border: `1px solid ${palette.primary}30`,
                    borderRadius: system.spacing.radius.full,
                    cursor: "pointer",
                    fontFamily: system.typography.bodyFont,
                  }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>

          <button style={{
            padding: "10px 24px",
            fontSize: 13,
            fontWeight: 600,
            color: palette.textSecondary,
            backgroundColor: "transparent",
            border: `1px solid ${palette.border}`,
            borderRadius: comp.button.borderRadius || system.spacing.radius.md,
            cursor: "pointer",
            fontFamily: system.typography.bodyFont,
          }}>
            Clear Filters
          </button>
        </div>
      </motion.section>

      {/* 10 — Permission Denied State */}
      <motion.section id="comp-permission" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.5 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Permission Denied</h2>
        <p style={sectionDesc}>
          An access-restricted page that clearly communicates the denial reason, provides recovery options, and displays the current user role.
        </p>

        <div style={{
          width: 480,
          padding: 48,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          {/* Lock icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: `${palette.danger}12`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={palette.danger} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              <circle cx="12" cy="16" r="1" fill={palette.danger}/>
            </svg>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, marginBottom: 8, marginTop: 0 }}>Access Denied</h3>
          <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, maxWidth: 320, marginBottom: 16, marginTop: 0 }}>
            You don&apos;t have permission to view this resource. Contact your administrator for access.
          </p>

          {/* Current role badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: system.spacing.radius.full,
            backgroundColor: palette.surfaceMuted,
            border: `1px solid ${palette.border}`,
            marginBottom: 24,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>Current role: <strong style={{ color: palette.textPrimary }}>Viewer</strong></span>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{
              padding: "10px 24px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              backgroundColor: palette.primary,
              border: "none",
              borderRadius: comp.button.borderRadius || system.spacing.radius.md,
              cursor: "pointer",
              fontFamily: system.typography.bodyFont,
            }}>
              Request Access
            </button>
            <button style={{
              padding: "10px 24px",
              fontSize: 13,
              fontWeight: 500,
              color: palette.primary,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              fontFamily: system.typography.bodyFont,
            }}>
              Contact Admin
            </button>
          </div>
        </div>
      </motion.section>

      {/* 11 — Save / Sync Status */}
      <motion.section id="comp-save-sync" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.55 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Save / Sync Status</h2>
        <p style={sectionDesc}>
          A toolbar-style status indicator showing save, sync, and conflict states with real-time visual feedback.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Saved */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 20px",
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.md,
            width: 480,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill={`${palette.success}18`}/>
              <path d="M8 12l3 3 5-6" stroke={palette.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 13, fontWeight: 500, color: palette.success, fontFamily: system.typography.bodyFont }}>All changes saved</span>
            <span style={{ fontSize: 12, color: palette.textSecondary, marginLeft: "auto", fontFamily: system.typography.bodyFont }}>Last saved 2 min ago</span>
          </div>

          {/* Syncing */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 20px",
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: system.spacing.radius.md,
            width: 480,
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ display: "flex" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.info} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
            </motion.div>
            <span style={{ fontSize: 13, fontWeight: 500, color: palette.info, fontFamily: system.typography.bodyFont }}>Syncing...</span>
            <div style={{ marginLeft: "auto", width: 80, height: 4, borderRadius: 2, backgroundColor: palette.border, overflow: "hidden" }}>
              <motion.div
                style={{ height: "100%", borderRadius: 2, backgroundColor: palette.info }}
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Conflict */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 20px",
            backgroundColor: palette.surface,
            border: `1px solid ${palette.warning}40`,
            borderRadius: system.spacing.radius.md,
            width: 480,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill={`${palette.warning}18`} stroke={palette.warning} strokeWidth="1.5"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke={palette.warning} strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1" fill={palette.warning}/>
            </svg>
            <span style={{ fontSize: 13, fontWeight: 500, color: palette.warning, fontFamily: system.typography.bodyFont }}>Sync conflict — 2 conflicts found</span>
            <button style={{
              marginLeft: "auto",
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: palette.warning,
              backgroundColor: `${palette.warning}12`,
              border: `1px solid ${palette.warning}30`,
              borderRadius: system.spacing.radius.sm,
              cursor: "pointer",
              fontFamily: system.typography.bodyFont,
            }}>
              Resolve
            </button>
          </div>
        </div>
      </motion.section>

      {/* 12 — Upload / Download Progress */}
      <motion.section id="comp-upload-progress" data-comp-section style={sectionWrap()} {...fadeUp} transition={{ delay: 0.6 }}>
        <div style={accentBar} />
        <h2 style={sectionTitle}>Upload / Download Progress</h2>
        <p style={sectionDesc}>
          A stacked file transfer list showing upload progress, completed downloads, and failed transfers with appropriate actions.
        </p>

        <div style={{
          width: 520,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
          overflow: "hidden",
        }}>
          {/* Upload — in progress */}
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${palette.border}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>quarterly-report.pdf</div>
                  <div style={{ fontSize: 11, color: palette.textSecondary }}>2.4 MB/s · 12s remaining</div>
                </div>
              </div>
              <button style={{
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 600,
                color: palette.textSecondary,
                backgroundColor: "transparent",
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.sm,
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                Cancel
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: palette.border, overflow: "hidden" }}>
                <div style={{ width: "67%", height: "100%", borderRadius: 2, backgroundColor: palette.primary }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: palette.primary, minWidth: 32 }}>67%</span>
            </div>
          </div>

          {/* Download — completed */}
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${palette.border}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill={`${palette.success}18`}/>
                  <path d="M8 12l3 3 5-6" stroke={palette.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>design-assets-v2.zip</div>
                  <div style={{ fontSize: 11, color: palette.success }}>Completed · 48.2 MB</div>
                </div>
              </div>
              <button style={{
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 600,
                color: palette.primary,
                backgroundColor: `${palette.primary}10`,
                border: `1px solid ${palette.primary}25`,
                borderRadius: system.spacing.radius.sm,
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                Open
              </button>
            </div>
          </div>

          {/* Upload — failed */}
          <div style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill={`${palette.danger}18`}/>
                  <path d="M15 9l-6 6M9 9l6 6" stroke={palette.danger} strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>presentation-final.pptx</div>
                  <div style={{ fontSize: 11, color: palette.danger }}>Upload failed — Connection timeout</div>
                </div>
              </div>
              <button style={{
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 600,
                color: palette.danger,
                backgroundColor: `${palette.danger}10`,
                border: `1px solid ${palette.danger}25`,
                borderRadius: system.spacing.radius.sm,
                cursor: "pointer",
                fontFamily: system.typography.bodyFont,
              }}>
                Retry
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
