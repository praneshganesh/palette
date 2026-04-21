"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable, TokensGrid } from "../shared/measurements";

interface PopoverSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type Placement = "top" | "bottom" | "left" | "right";

const ChevronDown = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);
const SettingsIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
);
const UserIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const LogOutIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
);

function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  return { open, setOpen, close, ref };
}

function InlinePopover({ palette, placement, arrow, children, trigger, radius }: {
  palette: PaletteTokenSet; placement: Placement; arrow?: boolean;
  children: React.ReactNode; trigger: React.ReactNode; radius: string;
}) {
  const { open, setOpen, ref } = usePopover();
  const offset = 8;

  const posStyle: React.CSSProperties = (() => {
    switch (placement) {
      case "top": return { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: offset };
      case "bottom": return { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: offset };
      case "left": return { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: offset };
      case "right": return { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: offset };
    }
  })();

  const arrowStyle: React.CSSProperties | null = arrow ? (() => {
    const base: React.CSSProperties = { position: "absolute", width: 8, height: 8, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, transform: "rotate(45deg)" };
    switch (placement) {
      case "top": return { ...base, bottom: -5, left: "50%", marginLeft: -4, borderTop: "none", borderLeft: "none" };
      case "bottom": return { ...base, top: -5, left: "50%", marginLeft: -4, borderBottom: "none", borderRight: "none" };
      case "left": return { ...base, right: -5, top: "50%", marginTop: -4, borderLeft: "none", borderBottom: "none" };
      case "right": return { ...base, left: -5, top: "50%", marginTop: -4, borderRight: "none", borderTop: "none" };
    }
  })() : null;

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <div onClick={() => setOpen(o => !o)} style={{ cursor: "pointer" }}>{trigger}</div>
      {open && (
        <div style={{ position: "absolute", zIndex: 50, ...posStyle, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, boxShadow: "0 8px 30px rgba(0,0,0,.12)", minWidth: 180, padding: 0 }}>
          {arrow && arrowStyle && <div style={arrowStyle} />}
          {children}
        </div>
      )}
    </div>
  );
}

export function PopoverSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: PopoverSectionProps) {
  const comp = system.components;
  const radius = comp.card.borderRadius || system.spacing.radius.md;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const [hoverOpen, setHoverOpen] = useState(false);

  const triggerBtn = (label: string) => (
    <div style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: palette.textPrimary, fontSize: 12, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6, userSelect: "none" }}>
      {label} <ChevronDown />
    </div>
  );

  const menuContent = (
    <div style={{ padding: 4 }}>
      {(content.quickActions.slice(0, 4).length ? content.quickActions.slice(0, 4) : ["View", "Edit", "Duplicate", "Delete"]).map((a, i) => (
        <div key={i} style={{ padding: "8px 12px", fontSize: 12, color: palette.textPrimary, borderRadius: 6, cursor: "pointer" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = palette.surfaceMuted)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
          {a}
        </div>
      ))}
    </div>
  );

  const richContent = (
    <div style={{ width: 260 }}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${palette.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>{content.orgName || "Settings"}</div>
        <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>{content.orgSubtitle || "Manage preferences"}</div>
      </div>
      <div style={{ padding: 8 }}>
        {[{ icon: <UserIcon />, label: "Profile" }, { icon: <SettingsIcon size={14} />, label: "Settings" }, { icon: <LogOutIcon />, label: "Log out" }].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", fontSize: 12, color: i === 2 ? palette.danger : palette.textPrimary, borderRadius: 6, cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = palette.surfaceMuted)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
            <span style={{ display: "flex", color: i === 2 ? palette.danger : palette.textSecondary }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.section id="comp-popover" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Popover</p>
      <p style={sectionDesc}>Popovers display floating content anchored to a trigger element. They support menus, forms, and rich content with auto-close behavior and directional placement.</p>

      {/* Hero + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <InlinePopover palette={palette} placement="bottom" arrow trigger={triggerBtn("Actions")} radius={radius}>
            {menuContent}
          </InlinePopover>
        </div>
        <TokensGrid palette={palette} tokens={[
          { label: "Border Radius", value: radius },
          { label: "Shadow", value: "0 8px 30px rgba(0,0,0,.12)" },
          { label: "Border", value: palette.border },
          { label: "Background", value: palette.surface },
          { label: "Offset", value: "8px" },
          { label: "Arrow Size", value: "8 × 8px" },
        ]} />
      </div>

      {/* Placements */}
      <div style={subsectionLabel}>Placements</div>
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: "60px 40px", display: "flex", gap: 40, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        {(["top", "bottom", "left", "right"] as Placement[]).map(p => (
          <InlinePopover key={p} palette={palette} placement={p} arrow trigger={triggerBtn(p.charAt(0).toUpperCase() + p.slice(1))} radius={radius}>
            <div style={{ padding: 12, fontSize: 12, color: palette.textSecondary, whiteSpace: "nowrap" }}>Popover on {p}</div>
          </InlinePopover>
        ))}
      </div>

      {/* With Arrow vs Without */}
      <div style={subsectionLabel}>Arrow Variants</div>
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: "48px 40px", display: "flex", gap: 32, alignItems: "center", justifyContent: "center" }}>
        <InlinePopover palette={palette} placement="bottom" arrow trigger={triggerBtn("With Arrow")} radius={radius}>
          <div style={{ padding: 12, fontSize: 12, color: palette.textSecondary }}>Arrow points to trigger</div>
        </InlinePopover>
        <InlinePopover palette={palette} placement="bottom" trigger={triggerBtn("No Arrow")} radius={radius}>
          <div style={{ padding: 12, fontSize: 12, color: palette.textSecondary }}>Clean floating panel</div>
        </InlinePopover>
      </div>

      {/* Hover Trigger */}
      <div style={subsectionLabel}>Hover Trigger</div>
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setHoverOpen(true)} onMouseLeave={() => setHoverOpen(false)}>
          {triggerBtn("Hover Me")}
          {hoverOpen && (
            <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8, zIndex: 50, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius, boxShadow: "0 8px 30px rgba(0,0,0,.12)", padding: 12, minWidth: 160 }}>
              <div style={{ fontSize: 12, color: palette.textSecondary }}>Appears on hover, no click needed</div>
            </div>
          )}
        </div>
      </div>

      {/* Rich Content */}
      <div style={subsectionLabel}>Rich Content</div>
      <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: "48px 40px", display: "flex", gap: 32, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        <InlinePopover palette={palette} placement="bottom" arrow trigger={triggerBtn("User Menu")} radius={radius}>
          {richContent}
        </InlinePopover>
        <InlinePopover palette={palette} placement="bottom" arrow trigger={triggerBtn("Quick Form")} radius={radius}>
          <div style={{ padding: 16, width: 240 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Quick Add</div>
            <input placeholder={content.formFields.placeholder || "Enter name..."} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${palette.border}`, fontSize: 12, color: palette.textPrimary, backgroundColor: palette.background, marginBottom: 8, outline: "none", boxSizing: "border-box" }} />
            <select style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${palette.border}`, fontSize: 12, color: palette.textSecondary, backgroundColor: palette.background, marginBottom: 12, outline: "none" }}>
              {(content.formFields.categories.slice(0, 3).length ? content.formFields.categories.slice(0, 3) : ["Option A", "Option B", "Option C"]).map((c, i) => <option key={i}>{c}</option>)}
            </select>
            <button style={{ width: "100%", padding: "8px", borderRadius: 6, border: "none", backgroundColor: palette.primary, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Add</button>
          </div>
        </InlinePopover>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use popovers" description="Popovers display contextual content on demand:" items={["Action menus and dropdown options", "Quick edit or inline forms", "User account menus", "Filter panels and settings", "Rich previews and detail panels"]} />
        <UsageSection palette={palette} title="Behavior" description="Configure popover interaction patterns:" items={["Click trigger — Standard toggle on click", "Hover trigger — Show on mouse enter", "Auto-close — Dismiss on outside click", "Arrow — Visual connection to trigger", "Placement — Anchor to any side of trigger"]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Keep popover content focused — one task or one menu per popover.", visual: <div style={{ width: 80, padding: 6, borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }}>{[1, 2, 3].map(i => <div key={i} style={{ height: 10, borderRadius: 3, backgroundColor: palette.surfaceMuted, marginBottom: i < 3 ? 3 : 0 }} />)}</div> },
        { type: "dont", text: "Don't nest multiple layers of popovers — it creates confusing navigation.", visual: <div style={{ position: "relative" }}><div style={{ width: 60, height: 40, borderRadius: 4, border: `1px solid ${palette.border}`, padding: 4 }}><div style={{ width: 40, height: 28, borderRadius: 3, border: `1px dashed ${palette.danger}`, position: "absolute", top: 8, left: 24 }} /></div></div> },
        { type: "do", text: "Always close popovers on outside click to prevent orphaned panels.", visual: <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 40, height: 24, borderRadius: 4, border: `1px solid ${palette.border}`, backgroundColor: palette.surface }} /><span style={{ fontSize: 10, color: palette.success }}>click outside</span></div> },
        { type: "dont", text: "Don't use popovers for essential content — it may be missed by users.", visual: <div style={{ width: 60, padding: 4, borderRadius: 4, border: `1px solid ${palette.danger}30`, fontSize: 7, color: palette.textSecondary, textAlign: "center" }}>Critical info hidden here!</div> },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Trigger", description: "Button or element that opens the popover", x: 50, y: 80 },
        { id: 2, label: "Container", description: "Floating surface with border and shadow", x: 50, y: 30 },
        { id: 3, label: "Arrow", description: "Pointer connecting popover to trigger", x: 30, y: 55 },
        { id: 4, label: "Content", description: "Menu items, forms, or rich content", x: 75, y: 20 },
      ]} renderPreview={(highlighted) => (
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 20 }}>
          <div style={{ position: "relative" }}>
            <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 8, padding: 8, width: 140, boxShadow: "0 4px 16px rgba(0,0,0,.08)", opacity: highlighted === 2 ? 1 : undefined }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ height: 20, borderRadius: 4, backgroundColor: palette.surfaceMuted, marginBottom: i < 2 ? 3 : 0, opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
              ))}
              <div style={{ position: "absolute", bottom: -5, left: "50%", marginLeft: -4, width: 8, height: 8, backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderTop: "none", borderLeft: "none", transform: "rotate(45deg)", opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
            </div>
            {highlighted === 2 && <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: 10, pointerEvents: "none" }} />}
          </div>
          <div style={{ marginTop: 4, opacity: highlighted === 1 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ height: 28, width: 80, borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: palette.textSecondary }}>Trigger</div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Container Padding", value: "4px (menu) / 16px (rich)" },
        { label: "Border Radius", value: radius },
        { label: "Shadow", value: "0 8px 30px rgba(0,0,0,.12)" },
        { label: "Offset From Trigger", value: "8px" },
        { label: "Arrow Size", value: "8 × 8px" },
        { label: "Min Width", value: "160px" },
        { label: "Menu Item Padding", value: "8px 12px" },
        { label: "Font Size", value: "12px" },
      ]} />
    </motion.section>
  );
}
