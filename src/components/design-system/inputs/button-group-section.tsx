"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ButtonGroupSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function ButtonGroupSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: ButtonGroupSectionProps) {
  const comp = system.components;
  const [heroActive, setHeroActive] = useState("Day");
  const [segActive, setSegActive] = useState("Monthly");
  const [splitOpen, setSplitOpen] = useState(false);
  const [multiSelect, setMultiSelect] = useState<string[]>(["Bold"]);
  const [toolbarActive, setToolbarActive] = useState("left");
  const [iconGroup, setIconGroup] = useState("grid");
  const [overflowOpen, setOverflowOpen] = useState(false);

  const btnRadius = parseInt(comp.button.borderRadius) || 8;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const renderJoinedGroup = (
    items: string[], active: string, onSelect: (v: string) => void,
    opts: { disabled?: string[] } = {}
  ) => {
    const { disabled = [] } = opts;
    return (
      <div style={{ display: "inline-flex", borderRadius: btnRadius, overflow: "hidden", border: `1px solid ${palette.border}` }}>
        {items.map((item, i) => {
          const isActive = item === active;
          const isDisabled = disabled.includes(item);
          return (
            <button key={item} onClick={() => !isDisabled && onSelect(item)} style={{
              padding: "8px 18px", border: "none",
              borderLeft: i > 0 ? `1px solid ${palette.border}` : "none",
              backgroundColor: isActive ? palette.primary : "transparent",
              color: isActive ? "#fff" : isDisabled ? palette.textSecondary : palette.textPrimary,
              fontSize: 13, fontWeight: 500, cursor: isDisabled ? "not-allowed" : "pointer",
              opacity: isDisabled ? 0.4 : 1, transition: "all 0.15s",
              fontFamily: system.typography.bodyFont,
            }}>{item}</button>
          );
        })}
      </div>
    );
  };

  const renderSegmented = (items: string[], active: string, onSelect: (v: string) => void) => (
    <div style={{
      display: "inline-flex", borderRadius: btnRadius + 4, padding: 3,
      backgroundColor: palette.surfaceMuted, gap: 2,
    }}>
      {items.map((item) => {
        const isActive = item === active;
        return (
          <button key={item} onClick={() => onSelect(item)} style={{
            padding: "7px 20px", border: "none", borderRadius: btnRadius + 1,
            backgroundColor: isActive ? palette.surface : "transparent",
            color: isActive ? palette.textPrimary : palette.textSecondary,
            fontSize: 13, fontWeight: isActive ? 600 : 400, cursor: "pointer",
            boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.2s", fontFamily: system.typography.bodyFont,
          }}>{item}</button>
        );
      })}
    </div>
  );

  const renderSplitButton = () => (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div style={{ display: "inline-flex", borderRadius: btnRadius, overflow: "hidden" }}>
        <button style={{
          padding: "8px 20px", border: "none",
          backgroundColor: palette.primary, color: "#fff",
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          fontFamily: system.typography.bodyFont,
        }}>Save</button>
        <button onClick={() => setSplitOpen(!splitOpen)} style={{
          padding: "8px 10px", border: "none",
          borderLeft: `1px solid rgba(255,255,255,0.2)`,
          backgroundColor: palette.primary, color: "#fff",
          cursor: "pointer", display: "flex", alignItems: "center",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      {splitOpen && (
        <div style={{
          position: "absolute", top: "100%", right: 0, marginTop: 4,
          backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
          borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minWidth: 150, zIndex: 10, overflow: "hidden",
        }}>
          {["Save as draft", "Save & publish", "Save & close"].map((opt) => (
            <div key={opt} onClick={() => setSplitOpen(false)} style={{
              padding: "8px 14px", fontSize: 13, color: palette.textPrimary,
              cursor: "pointer", transition: "background-color 0.1s",
            }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = palette.surfaceMuted)}
               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMultiSelect = (items: { label: string; icon?: React.ReactNode }[], selected: string[], onToggle: (v: string) => void) => (
    <div style={{ display: "inline-flex", borderRadius: btnRadius, overflow: "hidden", border: `1px solid ${palette.border}` }}>
      {items.map((item, i) => {
        const isActive = selected.includes(item.label);
        return (
          <button key={item.label} onClick={() => onToggle(item.label)} style={{
            padding: "8px 14px", border: "none",
            borderLeft: i > 0 ? `1px solid ${palette.border}` : "none",
            backgroundColor: isActive ? palette.primary + "15" : "transparent",
            color: isActive ? palette.primary : palette.textSecondary,
            fontSize: 13, fontWeight: isActive ? 600 : 400, cursor: "pointer",
            transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6,
            fontFamily: system.typography.bodyFont,
          }}>
            {item.icon}{item.label}
          </button>
        );
      })}
    </div>
  );

  const miniIcon = (type: string, color: string) => {
    const props = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round" as const };
    switch (type) {
      case "bold": return <svg {...props}><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" /><path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" /></svg>;
      case "italic": return <svg {...props}><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></svg>;
      case "underline": return <svg {...props}><path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" /><line x1="4" y1="21" x2="20" y2="21" /></svg>;
      case "strikethrough": return <svg {...props}><path d="M16 4H9a3 3 0 00-3 3v0a3 3 0 003 3h6" /><line x1="4" y1="12" x2="20" y2="12" /><path d="M8 20h7a3 3 0 003-3v0a3 3 0 00-3-3H8" /></svg>;
      case "left": return <svg {...props}><line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="17" y1="14" x2="3" y2="14" /><line x1="21" y1="18" x2="3" y2="18" /></svg>;
      case "center": return <svg {...props}><line x1="18" y1="10" x2="6" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="18" y1="14" x2="6" y2="14" /><line x1="21" y1="18" x2="3" y2="18" /></svg>;
      case "right": return <svg {...props}><line x1="21" y1="10" x2="7" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="7" y2="14" /><line x1="21" y1="18" x2="3" y2="18" /></svg>;
      case "grid": return <svg {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
      case "list": return <svg {...props}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>;
      default: return null;
    }
  };

  const renderIconGroup = (items: string[], active: string, onSelect: (v: string) => void) => (
    <div style={{ display: "inline-flex", borderRadius: btnRadius, overflow: "hidden", border: `1px solid ${palette.border}` }}>
      {items.map((item, i) => {
        const isActive = item === active;
        return (
          <button key={item} onClick={() => onSelect(item)} style={{
            width: 36, height: 36, border: "none",
            borderLeft: i > 0 ? `1px solid ${palette.border}` : "none",
            backgroundColor: isActive ? palette.primary + "15" : "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
          }}>{miniIcon(item, isActive ? palette.primary : palette.textSecondary)}</button>
        );
      })}
    </div>
  );

  const renderToolbar = () => (
    <div style={{
      display: "inline-flex", gap: 8, padding: "6px 8px",
      backgroundColor: palette.surfaceMuted, borderRadius: btnRadius + 4,
      border: `1px solid ${palette.border}`,
    }}>
      {renderMultiSelect(
        [{ label: "Bold", icon: miniIcon("bold", multiSelect.includes("Bold") ? palette.primary : palette.textSecondary) },
         { label: "Italic", icon: miniIcon("italic", multiSelect.includes("Italic") ? palette.primary : palette.textSecondary) },
         { label: "Underline", icon: miniIcon("underline", multiSelect.includes("Underline") ? palette.primary : palette.textSecondary) }],
        multiSelect,
        (v) => setMultiSelect(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])
      )}
      <div style={{ width: 1, backgroundColor: palette.border, margin: "4px 0" }} />
      {renderIconGroup(["left", "center", "right"], toolbarActive, setToolbarActive)}
    </div>
  );

  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  return (
    <motion.section id="comp-button-group" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Button Group</p>
      <p style={sectionDesc}>
        Button groups combine related actions into a unified control — supporting single-select, multi-select, segmented, and split-button patterns.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 140 }}>
          {renderSegmented(["Day", "Week", "Month", "Year"], heroActive, setHeroActive)}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Border Radius", comp.button.borderRadius)}
          {tokenRow("Item Padding", "8px 18px")}
          {tokenRow("Active BG", "palette.primary")}
          {tokenRow("Border Color", "palette.border")}
          {tokenRow("Segment BG", "palette.surfaceMuted")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Default (Joined)</div>
          {renderJoinedGroup(["All", "Active", "Archived", "Deleted"], heroActive, setHeroActive)}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Segmented</div>
          {renderSegmented(["Monthly", "Yearly"], segActive, setSegActive)}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Split Button</div>
          {renderSplitButton()}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Icon Group</div>
          {renderIconGroup(["grid", "list"], iconGroup, setIconGroup)}
        </div>
        <div style={{ ...showcaseBox, gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Toolbar</div>
          {renderToolbar()}
        </div>
      </div>

      {/* Features */}
      <div style={subsectionLabel}>Features</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Single Select</div>
          {renderJoinedGroup(["Option A", "Option B", "Option C"], heroActive, setHeroActive)}
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 8 }}>Radio-like behavior</div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Multi Select</div>
          {renderMultiSelect(
            [{ label: "Bold" }, { label: "Italic" }, { label: "Underline" }],
            multiSelect,
            (v) => setMultiSelect(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])
          )}
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 8 }}>Toggle multiple</div>
        </div>
        <div style={{ ...showcaseBox, position: "relative" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Overflow Menu</div>
          <div style={{ display: "inline-flex", borderRadius: btnRadius, overflow: "hidden", border: `1px solid ${palette.border}` }}>
            {["Item 1", "Item 2"].map((item, i) => (
              <button key={item} style={{
                padding: "8px 14px", border: "none",
                borderLeft: i > 0 ? `1px solid ${palette.border}` : "none",
                backgroundColor: "transparent", color: palette.textPrimary,
                fontSize: 13, cursor: "pointer", fontFamily: system.typography.bodyFont,
              }}>{item}</button>
            ))}
            <button onClick={() => setOverflowOpen(!overflowOpen)} style={{
              padding: "8px 10px", border: "none",
              borderLeft: `1px solid ${palette.border}`,
              backgroundColor: overflowOpen ? palette.primary + "10" : "transparent",
              color: palette.textSecondary, cursor: "pointer",
              display: "flex", alignItems: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
              </svg>
            </button>
          </div>
          {overflowOpen && (
            <div style={{
              position: "absolute", top: "80%", left: 24, marginTop: 4,
              backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
              borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10,
              overflow: "hidden",
            }}>
              {["Item 3", "Item 4", "Item 5"].map((opt) => (
                <div key={opt} onClick={() => setOverflowOpen(false)} style={{
                  padding: "8px 14px", fontSize: 13, color: palette.textPrimary,
                  cursor: "pointer", whiteSpace: "nowrap",
                }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = palette.surfaceMuted)}
                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>{opt}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Default</div>
          {renderJoinedGroup(["A", "B", "C"], "B", () => {})}
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Active Segment</div>
          <div style={{ display: "inline-flex", position: "relative" }}>
            {renderSegmented(["On", "Off"], "On", () => {})}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>Disabled Segment</div>
          {renderJoinedGroup(["A", "B", "C"], "A", () => {}, { disabled: ["C"] })}
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <UsageSection palette={palette} title="When to use button groups" description="Button groups organize related choices:" items={[
          "View mode toggles (grid/list, day/week/month)",
          "Text formatting toolbars (bold, italic, underline)",
          "Filter or sort controls with mutual exclusion",
          "Split actions where one is primary and others are secondary",
        ]} />
        <UsageSection palette={palette} title="Button group vs. tabs" description="Choose the right pattern for navigation vs. action:" items={[
          "Button group — filters data in the same view",
          "Tabs — switch between entirely different content panels",
          "Button group — compact, inline with other controls",
          "Tabs — full-width navigation with visible content areas",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Keep groups to 2–5 items. Use overflow menu for more." },
        { type: "dont", text: "Don't mix action types — keep groups thematically consistent." },
        { type: "do", text: "Use the segmented style for mutually exclusive view toggles." },
        { type: "dont", text: "Don't nest button groups inside each other — it creates confusion." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Group Container", description: "Outer wrapper with shared border radius", x: 50, y: 50 },
        { id: 2, label: "Button Segment", description: "Individual clickable segment", x: 25, y: 50 },
        { id: 3, label: "Divider", description: "Visual separator between segments", x: 42, y: 50 },
        { id: 4, label: "Active Indicator", description: "Background highlight for selected item", x: 25, y: 50 },
        { id: 5, label: "Dropdown Arrow", description: "Chevron for split button actions", x: 80, y: 50 },
      ]} renderPreview={(h) => (
        <div style={{
          display: "inline-flex", borderRadius: btnRadius, overflow: "hidden",
          border: `1px solid ${palette.border}`,
          opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
        }}>
          <div style={{
            padding: "8px 18px", fontSize: 13, fontWeight: 500,
            backgroundColor: palette.primary, color: "#fff",
            opacity: (h === 2 || h === 4) ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>Day</div>
          <div style={{
            width: 1, backgroundColor: palette.border,
            opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }} />
          <div style={{
            padding: "8px 18px", fontSize: 13, color: palette.textPrimary,
            opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>Week</div>
          <div style={{ width: 1, backgroundColor: palette.border, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }} />
          <div style={{
            padding: "8px 12px", display: "flex", alignItems: "center",
            opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.textSecondary} strokeWidth="3" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Button Padding", value: "8px 18px" },
        { label: "Border Radius", value: comp.button.borderRadius },
        { label: "Segment BG Padding", value: "3px" },
        { label: "Divider Width", value: "1px" },
        { label: "Icon Button Size", value: "36 × 36 px" },
        { label: "Font Size", value: "13px" },
        { label: "Dropdown Width", value: "150px min" },
      ]} />
    </motion.section>
  );
}
