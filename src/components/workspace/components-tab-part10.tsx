"use client";
import React from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface ComponentsPart10Props {
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

export function ComponentsPart10({ system, content, activeSection }: ComponentsPart10Props) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const radius = system.spacing.radius;

  const sectionWrap = (): React.CSSProperties => ({
    marginBottom: 72,
  });
  const sectionTitle: React.CSSProperties = {
    fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 6,
    fontFamily: system.typography.headingFont,
  };
  const sectionDesc: React.CSSProperties = {
    fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 24,
  };
  const cardBox: React.CSSProperties = {
    padding: 28, backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: radius.lg, overflow: "hidden",
  };
  const labelBadge = (text: string, color: string): React.ReactNode => (
    <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", padding: "2px 8px", borderRadius: 9999, backgroundColor: withAlpha(color, 0.12), color }}>{text}</span>
  );
  const comparisonGrid: React.CSSProperties = {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
  };
  const viewportLabel = (text: string): React.ReactNode => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
      {labelBadge(text, text === "Desktop" ? palette.primary : palette.info)}
    </div>
  );

  const phoneFrame = (children: React.ReactNode): React.ReactNode => (
    <div style={{ width: 220, margin: "0 auto", borderRadius: 24, border: `3px solid ${palette.border}`, backgroundColor: palette.background, overflow: "hidden", position: "relative", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 70, height: 18, backgroundColor: palette.border, borderRadius: "0 0 10px 10px", zIndex: 10 }} />
      {children}
    </div>
  );

  return (
    <>
      {/* 1 — Responsive Table */}
      <motion.section id="comp-responsive-table" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-responsive-table" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.05 }}>
        <p style={sectionTitle}>Responsive Table</p>
        <p style={sectionDesc}>Data tables adapt from full multi-column layout on desktop to stacked card-based rows on mobile.</p>
        <div style={cardBox}>
          <div style={comparisonGrid}>
            <div>
              {viewportLabel("Desktop")}
              <div style={{ borderRadius: radius.md, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px", backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}` }}>
                  {["Name", "Status", "Date", "Action"].map((h) => (
                    <div key={h} style={{ padding: "8px 12px", fontSize: 10, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
                  ))}
                </div>
                {(content.recentItems.slice(0, 3)).map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px", borderBottom: i < 2 ? `1px solid ${palette.border}` : "none" }}>
                    <div style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>{item.title}</div>
                    <div style={{ padding: "10px 12px" }}>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 9999, backgroundColor: i === 0 ? withAlpha(palette.success, 0.12) : withAlpha(palette.warning, 0.12), color: i === 0 ? palette.success : palette.warning }}>{item.status}</span>
                    </div>
                    <div style={{ padding: "10px 12px", fontSize: 11, color: palette.textSecondary }}>{item.author}</div>
                    <div style={{ padding: "10px 12px" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={palette.textSecondary} strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="4" r="1" /><circle cx="8" cy="8" r="1" /><circle cx="8" cy="12" r="1" /></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {viewportLabel("Mobile")}
              {phoneFrame(
                <div style={{ padding: "28px 10px 10px" }}>
                  {(content.recentItems.slice(0, 3)).map((item, i) => (
                    <div key={i} style={{ padding: 10, borderRadius: radius.md, border: `1px solid ${palette.border}`, marginBottom: 8, backgroundColor: palette.surface }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: palette.textPrimary }}>{item.title}</span>
                        <span style={{ fontSize: 8, fontWeight: 600, padding: "1px 6px", borderRadius: 9999, backgroundColor: i === 0 ? withAlpha(palette.success, 0.12) : withAlpha(palette.warning, 0.12), color: i === 0 ? palette.success : palette.warning }}>{item.status}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 9, color: palette.textSecondary }}>{item.author}</span>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={palette.textSecondary} strokeWidth="1.5"><path d="M6 4L10 8L6 12" strokeLinecap="round" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2 — Responsive Navigation Menu */}
      <motion.section id="comp-responsive-menu" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-responsive-menu" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.1 }}>
        <p style={sectionTitle}>Responsive Navigation</p>
        <p style={sectionDesc}>Desktop uses a persistent sidebar; mobile collapses to hamburger menu with slide-out drawer or bottom navigation.</p>
        <div style={cardBox}>
          <div style={comparisonGrid}>
            <div>
              {viewportLabel("Desktop")}
              <div style={{ display: "flex", borderRadius: radius.md, border: `1px solid ${palette.border}`, overflow: "hidden", height: 200 }}>
                <div style={{ width: 160, backgroundColor: palette.surface, borderRight: `1px solid ${palette.border}`, padding: "12px 0" }}>
                  {["Dashboard", "Users", "Reports", "Settings"].map((item, i) => (
                    <div key={item} style={{ padding: "8px 16px", fontSize: 11, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? palette.primary : palette.textSecondary, backgroundColor: i === 0 ? withAlpha(palette.primary, 0.08) : "transparent", borderLeftWidth: 2, borderLeftStyle: "solid", borderLeftColor: i === 0 ? palette.primary : "transparent", display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: i === 0 ? palette.primary : palette.border, opacity: i === 0 ? 1 : 0.5 }} />
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, backgroundColor: palette.background, padding: 16 }}>
                  <div style={{ width: "60%", height: 8, borderRadius: 4, backgroundColor: palette.border, marginBottom: 8 }} />
                  <div style={{ width: "80%", height: 6, borderRadius: 3, backgroundColor: palette.border, marginBottom: 6 }} />
                  <div style={{ width: "40%", height: 6, borderRadius: 3, backgroundColor: palette.border }} />
                </div>
              </div>
            </div>
            <div>
              {viewportLabel("Mobile")}
              {phoneFrame(
                <div style={{ display: "flex", flexDirection: "column", height: 260 }}>
                  <div style={{ height: 40, backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", padding: "0 12px", paddingTop: 20, justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ width: 14, height: 2, backgroundColor: palette.textPrimary, borderRadius: 1 }} />
                      <div style={{ width: 10, height: 2, backgroundColor: palette.textPrimary, borderRadius: 1 }} />
                      <div style={{ width: 14, height: 2, backgroundColor: palette.textPrimary, borderRadius: 1 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>App</span>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: palette.primary + "15" }} />
                  </div>
                  <div style={{ flex: 1, backgroundColor: palette.background, padding: 12 }}>
                    <div style={{ width: "70%", height: 6, borderRadius: 3, backgroundColor: palette.border, marginBottom: 6 }} />
                    <div style={{ width: "50%", height: 6, borderRadius: 3, backgroundColor: palette.border }} />
                  </div>
                  <div style={{ height: 42, backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    {["Home", "Search", "Add", "Profile"].map((tab, i) => (
                      <div key={tab} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <div style={{ width: 14, height: 14, borderRadius: i === 2 ? "50%" : 3, backgroundColor: i === 0 ? palette.primary : palette.border, opacity: i === 0 ? 1 : 0.4 }} />
                        <span style={{ fontSize: 7, color: i === 0 ? palette.primary : palette.textSecondary }}>{tab}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3 — Responsive Dropdown / Select */}
      <motion.section id="comp-responsive-dropdown" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-responsive-dropdown" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.15 }}>
        <p style={sectionTitle}>Responsive Dropdown</p>
        <p style={sectionDesc}>Dropdowns display inline on desktop but transform into full-screen action sheets on mobile for easier touch selection.</p>
        <div style={cardBox}>
          <div style={comparisonGrid}>
            <div>
              {viewportLabel("Desktop")}
              <div style={{ maxWidth: 260 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, margin: "0 0 6px" }}>Category</p>
                <div style={{ padding: "8px 12px", borderRadius: radius.md, border: `1px solid ${palette.primary}`, backgroundColor: palette.surface, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: palette.textPrimary }}>Select category</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
                <div style={{ borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  {["Technology", "Finance", "Healthcare", "Education"].map((opt, i) => (
                    <div key={opt} style={{ padding: "8px 12px", fontSize: 12, color: i === 0 ? palette.primary : palette.textPrimary, backgroundColor: i === 0 ? withAlpha(palette.primary, 0.06) : "transparent", cursor: "pointer" }}>{opt}</div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {viewportLabel("Mobile")}
              {phoneFrame(
                <div style={{ display: "flex", flexDirection: "column", height: 260, position: "relative" }}>
                  <div style={{ flex: 1, backgroundColor: palette.background, opacity: 0.4, paddingTop: 28 }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: palette.surface, borderRadius: `${radius.lg} ${radius.lg} 0 0`, boxShadow: "0 -4px 20px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
                      <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: palette.border }} />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, padding: "0 14px 8px", margin: 0, fontFamily: system.typography.headingFont }}>Select Category</p>
                    {["Technology", "Finance", "Healthcare", "Education"].map((opt, i) => (
                      <div key={opt} style={{ padding: "12px 14px", borderTop: `1px solid ${palette.border}`, fontSize: 12, color: i === 0 ? palette.primary : palette.textPrimary, fontWeight: i === 0 ? 600 : 400, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {opt}
                        {i === 0 && <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                    ))}
                    <div style={{ height: 16 }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4 — Responsive Grid */}
      <motion.section id="comp-responsive-grid" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-responsive-grid" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.2 }}>
        <p style={sectionTitle}>Responsive Grid</p>
        <p style={sectionDesc}>Card grids adapt from 3–4 columns on desktop to a single-column stacked layout on mobile viewports.</p>
        <div style={cardBox}>
          <div style={comparisonGrid}>
            <div>
              {viewportLabel("Desktop")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} style={{ height: 60, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: withAlpha(palette.primary, 0.12) }} />
                    <span style={{ fontSize: 9, color: palette.textSecondary }}>Card {n}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {viewportLabel("Mobile")}
              {phoneFrame(
                <div style={{ padding: "28px 10px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} style={{ height: 44, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: withAlpha(palette.primary, 0.12), flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ width: "50%", height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 4 }} />
                        <div style={{ width: "70%", height: 4, borderRadius: 2, backgroundColor: palette.border, opacity: 0.6 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5 — Responsive Modal / Dialog */}
      <motion.section id="comp-responsive-modal" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-responsive-modal" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.25 }}>
        <p style={sectionTitle}>Responsive Modal</p>
        <p style={sectionDesc}>Desktop modals are centered dialogs; on mobile they expand to full-screen sheets sliding from the bottom.</p>
        <div style={cardBox}>
          <div style={comparisonGrid}>
            <div>
              {viewportLabel("Desktop")}
              <div style={{ position: "relative", height: 200, backgroundColor: palette.surfaceMuted, borderRadius: radius.md, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: radius.md }} />
                <div style={{ position: "relative", width: "70%", backgroundColor: palette.surface, borderRadius: radius.lg, border: `1px solid ${palette.border}`, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Confirm Action</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={palette.textSecondary} strokeWidth="1.5"><path d="M4 4L12 12M12 4L4 12" strokeLinecap="round" /></svg>
                  </div>
                  <p style={{ fontSize: 11, color: palette.textSecondary, margin: "0 0 12px", lineHeight: 1.5 }}>Are you sure you want to proceed?</p>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <div style={{ padding: "5px 12px", borderRadius: radius.md, border: `1px solid ${palette.border}`, fontSize: 10, fontWeight: 600, color: palette.textPrimary }}>Cancel</div>
                    <div style={{ padding: "5px 12px", borderRadius: radius.md, backgroundColor: palette.primary, fontSize: 10, fontWeight: 600, color: "#fff" }}>Confirm</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {viewportLabel("Mobile")}
              {phoneFrame(
                <div style={{ display: "flex", flexDirection: "column", height: 260, position: "relative" }}>
                  <div style={{ flex: 1, backgroundColor: palette.background, opacity: 0.3, paddingTop: 28 }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: palette.surface, borderRadius: `${radius.lg} ${radius.lg} 0 0` }}>
                    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
                      <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: palette.border }} />
                    </div>
                    <div style={{ padding: "0 14px 16px" }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, margin: "0 0 6px", fontFamily: system.typography.headingFont }}>Confirm Action</p>
                      <p style={{ fontSize: 10, color: palette.textSecondary, margin: "0 0 14px", lineHeight: 1.5 }}>Are you sure you want to proceed?</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ height: 36, borderRadius: radius.md, backgroundColor: palette.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Confirm</span>
                        </div>
                        <div style={{ height: 36, borderRadius: radius.md, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>Cancel</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6 — Action Sheet */}
      <motion.section id="comp-action-sheet" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-action-sheet" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.3 }}>
        <p style={sectionTitle}>Action Sheet</p>
        <p style={sectionDesc}>iOS/Android-style action sheet sliding from the bottom with grouped options and a cancel button.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 320, position: "relative" }}>
                <div style={{ flex: 1, backgroundColor: palette.background, opacity: 0.3, paddingTop: 28 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 8px 8px" }}>
                  <div style={{ backgroundColor: palette.surface, borderRadius: radius.lg, overflow: "hidden", marginBottom: 6 }}>
                    <p style={{ fontSize: 9, color: palette.textSecondary, textAlign: "center", padding: "8px 0 4px", margin: 0 }}>Choose an action</p>
                    {["Edit", "Duplicate", "Share", "Delete"].map((action, i) => (
                      <div key={action} style={{ padding: "11px 14px", borderTop: `1px solid ${palette.border}`, fontSize: 12, textAlign: "center", fontWeight: 500, color: action === "Delete" ? palette.danger : palette.primary }}>{action}</div>
                    ))}
                  </div>
                  <div style={{ backgroundColor: palette.surface, borderRadius: radius.lg, padding: "11px 14px" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, textAlign: "center", margin: 0 }}>Cancel</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 7 — Swipe Actions */}
      <motion.section id="comp-swipe-actions" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-swipe-actions" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.35 }}>
        <p style={sectionTitle}>Swipe Actions</p>
        <p style={sectionDesc}>List rows with swipe-to-reveal actions, a common mobile pattern for quick edit, archive, or delete.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ paddingTop: 28 }}>
                <div style={{ height: 40, backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", padding: "0 12px", paddingTop: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Inbox</span>
                </div>
                {["Normal row", "Swiped left", "Swiped right"].map((label, i) => (
                  <div key={label} style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${palette.border}` }}>
                    {i === 1 && (
                      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 120, display: "flex" }}>
                        <div style={{ flex: 1, backgroundColor: palette.warning, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 8, color: "#fff", fontWeight: 600 }}>Archive</span>
                        </div>
                        <div style={{ flex: 1, backgroundColor: palette.danger, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 8, color: "#fff", fontWeight: 600 }}>Delete</span>
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 60, backgroundColor: palette.success, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 8, color: "#fff", fontWeight: 600 }}>Pin</span>
                      </div>
                    )}
                    <div style={{ padding: "12px 12px", backgroundColor: palette.surface, display: "flex", alignItems: "center", gap: 10, transform: i === 1 ? "translateX(-80px)" : i === 2 ? "translateX(40px)" : "none", transition: "transform 0.3s" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: withAlpha(palette.primary, 0.12), flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: palette.textPrimary }}>{["Meeting update", "New comment", "Review request"][i]}</div>
                        <div style={{ fontSize: 9, color: palette.textSecondary }}>2 min ago</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ padding: 10, display: "flex", justifyContent: "center" }}>
                  <span style={{ fontSize: 8, color: palette.textSecondary }}>← Swipe left or right →</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 8 — Pull to Refresh */}
      <motion.section id="comp-pull-refresh" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-pull-refresh" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.4 }}>
        <p style={sectionTitle}>Pull to Refresh</p>
        <p style={sectionDesc}>Native-feel pull-to-refresh indicator that appears at the top of scrollable content on mobile.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 280, paddingTop: 24 }}>
                <div style={{ height: 40, backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Feed</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 0 8px", gap: 4 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  <span style={{ fontSize: 9, color: palette.textSecondary }}>Refreshing…</span>
                </div>
                <div style={{ flex: 1, padding: "0 10px" }}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{ padding: 8, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", gap: 8, opacity: 0.5 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: palette.border }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ width: "60%", height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 4 }} />
                        <div style={{ width: "80%", height: 4, borderRadius: 2, backgroundColor: palette.border }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </motion.section>

      {/* 9 — Mobile Tabs */}
      <motion.section id="comp-mobile-tabs" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-mobile-tabs" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.45 }}>
        <p style={sectionTitle}>Mobile Tabs</p>
        <p style={sectionDesc}>Horizontally scrollable tab bar for mobile, replacing desktop-style full-width tabs.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ paddingTop: 28 }}>
                <div style={{ height: 40, backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", padding: "0 12px" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Projects</span>
                </div>
                <div style={{ display: "flex", gap: 0, overflowX: "auto", borderBottom: `1px solid ${palette.border}`, backgroundColor: palette.surface }}>
                  {["All", "Active", "Pending", "Archived", "Starred"].map((tab, i) => (
                    <div key={tab} style={{ padding: "10px 14px", fontSize: 11, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? palette.primary : palette.textSecondary, borderBottom: i === 0 ? `2px solid ${palette.primary}` : "2px solid transparent", whiteSpace: "nowrap", flexShrink: 0, fontFamily: system.typography.bodyFont }}>{tab}</div>
                  ))}
                </div>
                <div style={{ padding: 12 }}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{ padding: 8, marginBottom: 6, borderRadius: radius.md, backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}>
                      <div style={{ width: "60%", height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 4 }} />
                      <div style={{ width: "40%", height: 4, borderRadius: 2, backgroundColor: palette.border }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 10 — Mobile Search */}
      <motion.section id="comp-mobile-search" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-mobile-search" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.5 }}>
        <p style={sectionTitle}>Mobile Search</p>
        <p style={sectionDesc}>Full-screen expandable search with recent searches, suggestions, and keyboard-aware layout.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 300, paddingTop: 24 }}>
                <div style={{ padding: "8px 12px", backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  <div style={{ flex: 1, height: 32, borderRadius: radius.md, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.primary}`, display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke={palette.primary} strokeWidth="1.2" /><path d="M10.5 10.5L13.5 13.5" stroke={palette.primary} strokeWidth="1.2" strokeLinecap="round" /></svg>
                    <span style={{ fontSize: 11, color: palette.textPrimary }}>report</span>
                  </div>
                  <span style={{ fontSize: 11, color: palette.primary, fontWeight: 600 }}>Cancel</span>
                </div>
                <div style={{ flex: 1, padding: "8px 12px", overflow: "auto" }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px" }}>Recent</p>
                  {["Quarterly report", "User analytics", "Budget review"].map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${palette.border}` }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      <span style={{ fontSize: 11, color: palette.textPrimary }}>{s}</span>
                    </div>
                  ))}
                  <p style={{ fontSize: 9, fontWeight: 700, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em", margin: "14px 0 8px" }}>Suggestions</p>
                  {["Reports dashboard", "Report templates"].map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${palette.border}` }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke={palette.textSecondary} strokeWidth="1.2" /><path d="M10.5 10.5L13.5 13.5" stroke={palette.textSecondary} strokeWidth="1.2" strokeLinecap="round" /></svg>
                      <span style={{ fontSize: 11, color: palette.textPrimary }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 11 — Toast / Snackbar Mobile */}
      <motion.section id="comp-mobile-toast" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-mobile-toast" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.55 }}>
        <p style={sectionTitle}>Mobile Toast / Snackbar</p>
        <p style={sectionDesc}>Full-width toast notifications positioned at the bottom of mobile screens, above the navigation bar.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 260, position: "relative", paddingTop: 24 }}>
                <div style={{ flex: 1, backgroundColor: palette.background, padding: 12, opacity: 0.5 }}>
                  <div style={{ width: "60%", height: 6, borderRadius: 3, backgroundColor: palette.border, marginBottom: 6 }} />
                  <div style={{ width: "80%", height: 5, borderRadius: 3, backgroundColor: palette.border }} />
                </div>
                <div style={{ position: "absolute", bottom: 50, left: 8, right: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ padding: "10px 12px", borderRadius: radius.md, backgroundColor: palette.success, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontSize: 11, color: "#fff", fontWeight: 500, flex: 1 }}>Changes saved</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>Undo</span>
                  </div>
                  <div style={{ padding: "10px 12px", borderRadius: radius.md, backgroundColor: "#1C1917", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                    <span style={{ fontSize: 11, color: "#fff", fontWeight: 500, flex: 1 }}>No internet connection</span>
                    <span style={{ fontSize: 10, color: palette.primary, fontWeight: 600 }}>Retry</span>
                  </div>
                </div>
                <div style={{ height: 42, backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: palette.border, opacity: 0.4 }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 12 — Responsive Form */}
      <motion.section id="comp-responsive-form" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-responsive-form" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.6 }}>
        <p style={sectionTitle}>Responsive Form</p>
        <p style={sectionDesc}>Desktop uses two-column side-by-side fields; mobile stacks to single-column with larger touch-friendly inputs.</p>
        <div style={cardBox}>
          <div style={comparisonGrid}>
            <div>
              {viewportLabel("Desktop")}
              <div style={{ borderRadius: radius.md, border: `1px solid ${palette.border}`, padding: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  {[{ l: "First Name", p: "Ahmed" }, { l: "Last Name", p: "Al-Rashid" }].map((f) => (
                    <div key={f.l}>
                      <p style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary, margin: "0 0 4px" }}>{f.l}</p>
                      <div style={{ height: 32, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, padding: "0 10px", display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: palette.textSecondary, opacity: 0.6 }}>{f.p}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: palette.textSecondary, margin: "0 0 4px" }}>Email</p>
                  <div style={{ height: 32, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, padding: "0 10px", display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: palette.textSecondary, opacity: 0.6 }}>ahmed@example.com</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <div style={{ padding: "6px 16px", borderRadius: radius.md, border: `1px solid ${palette.border}`, fontSize: 11, fontWeight: 600, color: palette.textPrimary }}>Cancel</div>
                  <div style={{ padding: "6px 16px", borderRadius: radius.md, backgroundColor: palette.primary, fontSize: 11, fontWeight: 600, color: "#fff" }}>Save</div>
                </div>
              </div>
            </div>
            <div>
              {viewportLabel("Mobile")}
              {phoneFrame(
                <div style={{ padding: "28px 10px 10px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {[{ l: "First Name", p: "Ahmed" }, { l: "Last Name", p: "Al-Rashid" }, { l: "Email", p: "ahmed@example.com" }].map((f) => (
                    <div key={f.l}>
                      <p style={{ fontSize: 9, fontWeight: 600, color: palette.textSecondary, margin: "0 0 4px" }}>{f.l}</p>
                      <div style={{ height: 40, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, padding: "0 10px", display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: palette.textSecondary, opacity: 0.6 }}>{f.p}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 8 }}>
                    <div style={{ height: 40, borderRadius: radius.md, backgroundColor: palette.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Save</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 13 — Floating Header (Scroll-to-Hide) */}
      <motion.section id="comp-floating-header" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-floating-header" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.65 }}>
        <p style={sectionTitle}>Floating Header</p>
        <p style={sectionDesc}>Mobile header that hides on scroll down and reappears on scroll up, maximizing content viewport.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 280, position: "relative", paddingTop: 24 }}>
                <div style={{ position: "absolute", top: 24, left: 0, right: 0, height: 44, backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", zIndex: 5, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Feed</span>
                  <div style={{ display: "flex", gap: 12 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" /></svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", paddingTop: 48, padding: "48px 10px 10px" }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} style={{ padding: 10, marginBottom: 8, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: withAlpha(palette.primary, 0.12) }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ width: "50%", height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 3 }} />
                          <div style={{ width: "30%", height: 3, borderRadius: 2, backgroundColor: palette.border }} />
                        </div>
                      </div>
                      <div style={{ width: "90%", height: 4, borderRadius: 2, backgroundColor: palette.border, marginBottom: 3 }} />
                      <div style={{ width: "70%", height: 4, borderRadius: 2, backgroundColor: palette.border }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ maxWidth: 200, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
              {[{ label: "Scroll Down", desc: "Header slides up and hides" }, { label: "Scroll Up", desc: "Header slides back into view" }, { label: "Tap Status Bar", desc: "Scrolls to top and shows header" }].map((rule) => (
                <div key={rule.label}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, margin: "0 0 2px", fontFamily: system.typography.headingFont }}>{rule.label}</p>
                  <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0, lineHeight: 1.4 }}>{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 14 — Sticky Bottom CTA Bar */}
      <motion.section id="comp-sticky-bottom" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-sticky-bottom" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.7 }}>
        <p style={sectionTitle}>Sticky Bottom CTA Bar</p>
        <p style={sectionDesc}>Fixed-bottom action bar for mobile checkout, form submission, or primary actions, safe from home indicator.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 280, paddingTop: 24 }}>
                <div style={{ height: 44, backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", padding: "0 12px" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Checkout</span>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
                  {[{ label: "Subtotal", value: "SAR 450.00" }, { label: "Delivery", value: "SAR 25.00" }, { label: "VAT (15%)", value: "SAR 71.25" }].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${palette.border}` }}>
                      <span style={{ fontSize: 11, color: palette.textSecondary }}>{row.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: palette.textPrimary, fontFamily: "monospace" }}>{row.value}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary }}>Total</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: palette.primary, fontFamily: "monospace" }}>SAR 546.25</span>
                  </div>
                </div>
                <div style={{ padding: "10px 12px 16px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surface, boxShadow: "0 -2px 10px rgba(0,0,0,0.06)" }}>
                  <div style={{ height: 44, borderRadius: radius.md, backgroundColor: palette.primary, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="3" /><path d="M1 10h22" /></svg>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Pay SAR 546.25</span>
                  </div>
                  <div style={{ width: 100, height: 4, borderRadius: 2, backgroundColor: palette.textPrimary, margin: "10px auto 0", opacity: 0.2 }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 15 — Mobile Stepper */}
      <motion.section id="comp-mobile-stepper" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-mobile-stepper" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.75 }}>
        <p style={sectionTitle}>Mobile Stepper</p>
        <p style={sectionDesc}>Compact progress stepper for multi-step mobile flows with dots, back/next buttons, and progress bar variants.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 280, paddingTop: 24 }}>
                <div style={{ height: 44, backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textPrimary} strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, flex: 1, fontFamily: system.typography.headingFont }}>Step 2 of 4</span>
                  <span style={{ fontSize: 11, color: palette.primary, fontWeight: 600 }}>Skip</span>
                </div>
                <div style={{ padding: "0 12px", marginTop: 12 }}>
                  <div style={{ height: 4, borderRadius: 2, backgroundColor: palette.border, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: "50%", backgroundColor: palette.primary, borderRadius: 2 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
                    {[0, 1, 2, 3].map((dot) => (
                      <div key={dot} style={{ width: dot <= 1 ? 20 : 8, height: 8, borderRadius: 4, backgroundColor: dot <= 1 ? palette.primary : palette.border, transition: "all 0.3s" }} />
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>Contact Details</p>
                  {["Phone Number", "Email Address"].map((f) => (
                    <div key={f}>
                      <p style={{ fontSize: 9, fontWeight: 600, color: palette.textSecondary, margin: "0 0 4px" }}>{f}</p>
                      <div style={{ height: 40, borderRadius: radius.md, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }} />
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 12px", display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, height: 40, borderRadius: radius.md, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>Back</span>
                  </div>
                  <div style={{ flex: 2, height: 40, borderRadius: radius.md, backgroundColor: palette.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Next</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 16 — Swipe Carousel / Pager */}
      <motion.section id="comp-swipe-carousel" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-swipe-carousel" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.8 }}>
        <p style={sectionTitle}>Swipe Carousel</p>
        <p style={sectionDesc}>Touch-optimized horizontal card carousel with peek-next-card pattern and dot indicators.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ paddingTop: 28, height: 260 }}>
                <div style={{ padding: "8px 12px 6px" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, margin: 0, fontFamily: system.typography.headingFont }}>Featured</p>
                </div>
                <div style={{ display: "flex", gap: 8, padding: "4px 12px", overflowX: "hidden" }}>
                  {[
                    { bg: palette.primary, title: "Card 1", opacity: 1 },
                    { bg: palette.info, title: "Card 2", opacity: 0.7 },
                  ].map((card) => (
                    <div key={card.title} style={{ minWidth: 170, height: 100, borderRadius: radius.md, backgroundColor: withAlpha(card.bg, 0.15), border: `1px solid ${withAlpha(card.bg, 0.3)}`, padding: 12, opacity: card.opacity, flexShrink: 0 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: withAlpha(card.bg, 0.2), marginBottom: 8 }} />
                      <div style={{ width: "70%", height: 5, borderRadius: 3, backgroundColor: withAlpha(card.bg, 0.3), marginBottom: 4 }} />
                      <div style={{ width: "50%", height: 4, borderRadius: 2, backgroundColor: withAlpha(card.bg, 0.2) }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 10 }}>
                  {[0, 1, 2].map((dot) => (
                    <div key={dot} style={{ width: dot === 0 ? 16 : 6, height: 6, borderRadius: 3, backgroundColor: dot === 0 ? palette.primary : palette.border }} />
                  ))}
                </div>
                <div style={{ padding: "12px 12px 0" }}>
                  <p style={{ fontSize: 9, color: palette.textSecondary, textAlign: "center", margin: 0 }}>← Swipe to browse →</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 17 — Mobile Chip Filter Bar */}
      <motion.section id="comp-chip-filter" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-chip-filter" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.85 }}>
        <p style={sectionTitle}>Mobile Chip Filter</p>
        <p style={sectionDesc}>Horizontally scrollable filter chips for mobile, replacing desktop dropdown filter bars.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ paddingTop: 28 }}>
                <div style={{ height: 40, backgroundColor: palette.surface, borderBottom: `1px solid ${palette.border}`, display: "flex", alignItems: "center", padding: "0 12px", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>Results</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>
                </div>
                <div style={{ display: "flex", gap: 6, padding: "8px 12px", overflowX: "auto" }}>
                  {[{ label: "All", active: true }, { label: "Active", active: false }, { label: "Pending", active: false }, { label: "High Priority", active: true }, { label: "This Week", active: false }].map((chip) => (
                    <div key={chip.label} style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: chip.active ? withAlpha(palette.primary, 0.12) : palette.surface, border: `1px solid ${chip.active ? palette.primary : palette.border}`, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: chip.active ? 600 : 400, color: chip.active ? palette.primary : palette.textSecondary }}>{chip.label}</span>
                      {chip.active && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 3L9 9M9 3L3 9" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" /></svg>}
                    </div>
                  ))}
                </div>
                <div style={{ padding: "4px 12px" }}>
                  <span style={{ fontSize: 9, color: palette.textSecondary }}>2 filters applied · 24 results</span>
                </div>
                <div style={{ padding: "0 10px" }}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{ padding: 8, marginBottom: 6, borderRadius: radius.md, backgroundColor: palette.surface, border: `1px solid ${palette.border}` }}>
                      <div style={{ width: "60%", height: 5, borderRadius: 3, backgroundColor: palette.border, marginBottom: 3 }} />
                      <div style={{ width: "40%", height: 4, borderRadius: 2, backgroundColor: palette.border }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 18 — Mobile Image Viewer */}
      <motion.section id="comp-image-viewer" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-image-viewer" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.9 }}>
        <p style={sectionTitle}>Mobile Image Viewer</p>
        <p style={sectionDesc}>Full-screen image viewer with pinch-to-zoom, swipe navigation, and share/download actions.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 280, backgroundColor: "#000", position: "relative" }}>
                <div style={{ position: "absolute", top: 24, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px", zIndex: 5 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>2 / 5</span>
                  <div style={{ display: "flex", gap: 12 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 160, height: 120, borderRadius: radius.md, backgroundColor: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "8px 0" }}>
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <div key={dot} style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: dot === 1 ? "#fff" : "rgba(255,255,255,0.3)" }} />
                  ))}
                </div>
                <div style={{ padding: "4px 12px 8px", display: "flex", justifyContent: "center" }}>
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>Pinch to zoom · Swipe to navigate</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 19 — Gesture Indicator */}
      <motion.section id="comp-gesture-hint" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-gesture-hint" ? undefined : "none" }} {...fadeUp} transition={{ delay: 0.95 }}>
        <p style={sectionTitle}>Gesture Hints</p>
        <p style={sectionDesc}>Visual indicators showing users available touch gestures — swipe, pinch, long-press, and drag.</p>
        <div style={cardBox}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
            {[
              { gesture: "Swipe", icon: "↔", desc: "Swipe left or right to navigate or reveal actions" },
              { gesture: "Pinch", icon: "⤧", desc: "Pinch to zoom in/out on images and maps" },
              { gesture: "Long Press", icon: "⊙", desc: "Long press to access context menu or drag mode" },
              { gesture: "Pull Down", icon: "↓", desc: "Pull down from top to refresh content" },
            ].map((g) => (
              <div key={g.gesture} style={{ textAlign: "center", padding: 16, borderRadius: radius.md, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: withAlpha(palette.primary, 0.1), border: `2px dashed ${withAlpha(palette.primary, 0.3)}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 20 }}>
                  {g.icon}
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, margin: "0 0 4px", fontFamily: system.typography.headingFont }}>{g.gesture}</p>
                <p style={{ fontSize: 10, color: palette.textSecondary, margin: 0, lineHeight: 1.4 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 20 — Mobile Onboarding / Walkthrough */}
      <motion.section id="comp-mobile-onboarding" data-comp-section style={{ ...sectionWrap(), display: activeSection === "comp-mobile-onboarding" ? undefined : "none" }} {...fadeUp} transition={{ delay: 1.0 }}>
        <p style={sectionTitle}>Mobile Onboarding</p>
        <p style={sectionDesc}>Swipeable onboarding walkthrough screens with illustrations, progress dots, and skip/next actions.</p>
        <div style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {phoneFrame(
              <div style={{ display: "flex", flexDirection: "column", height: 300, paddingTop: 24, backgroundColor: palette.background }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 20px", textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: withAlpha(palette.primary, 0.1), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary, margin: "0 0 6px", fontFamily: system.typography.headingFont }}>Welcome</p>
                  <p style={{ fontSize: 11, color: palette.textSecondary, margin: 0, lineHeight: 1.5 }}>Manage your projects, track progress, and collaborate with your team.</p>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "8px 0" }}>
                  {[0, 1, 2].map((dot) => (
                    <div key={dot} style={{ width: dot === 0 ? 20 : 8, height: 8, borderRadius: 4, backgroundColor: dot === 0 ? palette.primary : palette.border }} />
                  ))}
                </div>
                <div style={{ padding: "8px 16px 16px", display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: palette.textSecondary }}>Skip</span>
                  </div>
                  <div style={{ flex: 2, height: 40, borderRadius: radius.md, backgroundColor: palette.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Get Started</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
}
