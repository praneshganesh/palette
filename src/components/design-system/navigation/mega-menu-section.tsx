"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface MegaMenuSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

interface MegaCategory {
  title: string;
  items: { label: string; desc?: string }[];
}

export function MegaMenuSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: MegaMenuSectionProps) {
  const comp = system.components;
  const [openVariant, setOpenVariant] = useState<string | null>(null);
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 0, overflow: "hidden",
  };

  const navBar: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 4, padding: "0 16px",
    borderBottom: `1px solid ${palette.border}`, backgroundColor: palette.surface,
  };

  const navItem = (active: boolean): React.CSSProperties => ({
    padding: "12px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer",
    color: active ? palette.primary : palette.textPrimary,
    borderBottom: `2px solid ${active ? palette.primary : "transparent"}`,
    marginBottom: -1, transition: "all 0.15s", fontFamily: system.typography.bodyFont,
  });

  const megaPanel: React.CSSProperties = {
    backgroundColor: palette.surface, borderTop: `1px solid ${palette.border}`,
    boxShadow: system.spacing.elevation.lg, padding: 24,
  };

  const colTitle: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" as const,
    color: palette.primary, marginBottom: 12,
  };

  const linkStyle = (hovered: boolean): React.CSSProperties => ({
    fontSize: 13, color: hovered ? palette.primary : palette.textPrimary,
    cursor: "pointer", padding: "5px 0", transition: "color 0.15s",
    fontFamily: system.typography.bodyFont,
  });

  const categories: MegaCategory[] = [
    { title: "Products", items: [
      { label: "Analytics", desc: "Track user behavior" },
      { label: "Automation", desc: "Workflow tools" },
      { label: "Integrations", desc: "Connect your stack" },
    ]},
    { title: "Solutions", items: [
      { label: "Enterprise", desc: "For large teams" },
      { label: "Startups", desc: "Scale fast" },
      { label: "Agencies", desc: "Client management" },
    ]},
    { title: "Resources", items: [
      { label: "Documentation" }, { label: "API Reference" },
      { label: "Tutorials" }, { label: "Blog" },
    ]},
  ];

  const catWithImages: MegaCategory[] = [
    { title: "Design", items: [{ label: "Components" }, { label: "Templates" }, { label: "Icons" }] },
    { title: "Develop", items: [{ label: "SDKs" }, { label: "CLI Tools" }, { label: "Plugins" }] },
  ];

  const toggle = (id: string) => setOpenVariant(openVariant === id ? null : id);

  const renderColumnMenu = (cats: MegaCategory[], showDesc = false) => (
    <div style={{ ...megaPanel, display: "grid", gridTemplateColumns: `repeat(${cats.length}, 1fr)`, gap: 32 }}>
      {cats.map((cat, ci) => (
        <div key={ci}>
          <div style={colTitle}>{cat.title}</div>
          {cat.items.map((item, ii) => {
            const key = `${ci}-${ii}`;
            return (
              <div key={ii}
                onMouseEnter={() => setHoveredLink(key)}
                onMouseLeave={() => setHoveredLink(null)}
                style={linkStyle(hoveredLink === key)}
              >
                <div>{item.label}</div>
                {showDesc && item.desc && (
                  <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 1 }}>{item.desc}</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <motion.section id="comp-mega-menu" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Mega Menu</p>
      <p style={sectionDesc}>
        Mega menus expand below the navigation bar to display structured content in columns.
        Ideal for sites with many pages or product categories that need organized discovery.
      </p>

      {/* Column Layout */}
      <div style={subsectionLabel}>Column Layout</div>
      <div style={previewBox}>
        <div style={navBar}>
          {["Products", "Solutions", "Resources", "Pricing"].map((item, i) => (
            <div key={i} style={navItem(openVariant === "col" && i === 0)} onClick={() => i === 0 && toggle("col")}>
              {item} {i === 0 && <span style={{ fontSize: 10 }}>▼</span>}
            </div>
          ))}
        </div>
        {openVariant === "col" && renderColumnMenu(categories, true)}
      </div>

      {/* With Featured Item */}
      <div style={subsectionLabel}>With Featured Item</div>
      <div style={previewBox}>
        <div style={navBar}>
          {["Explore", "Learn", "Community"].map((item, i) => (
            <div key={i} style={navItem(openVariant === "featured" && i === 0)} onClick={() => i === 0 && toggle("featured")}>
              {item} {i === 0 && <span style={{ fontSize: 10 }}>▼</span>}
            </div>
          ))}
        </div>
        {openVariant === "featured" && (
          <div style={{ ...megaPanel, display: "grid", gridTemplateColumns: "1fr 1fr 260px", gap: 32 }}>
            {categories.slice(0, 2).map((cat, ci) => (
              <div key={ci}>
                <div style={colTitle}>{cat.title}</div>
                {cat.items.map((item, ii) => {
                  const key = `f-${ci}-${ii}`;
                  return (
                    <div key={ii} style={linkStyle(hoveredLink === key)}
                      onMouseEnter={() => setHoveredLink(key)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >{item.label}</div>
                  );
                })}
              </div>
            ))}
            <div style={{
              backgroundColor: palette.primary + "08", borderRadius: system.spacing.radius.md,
              padding: 20, border: `1px solid ${palette.primary}15`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: palette.primary, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 8 }}>Featured</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>What&apos;s New in v4.0</div>
              <div style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.5 }}>
                Discover the latest features and improvements in our newest release.
              </div>
              <div style={{
                marginTop: 12, fontSize: 12, fontWeight: 600, color: palette.primary, cursor: "pointer",
              }}>
                Learn more →
              </div>
            </div>
          </div>
        )}
      </div>

      {/* With Categories Sidebar */}
      <div style={subsectionLabel}>With Categories</div>
      <div style={previewBox}>
        <div style={navBar}>
          {["Browse", "Docs", "Blog"].map((item, i) => (
            <div key={i} style={navItem(openVariant === "cats" && i === 0)} onClick={() => i === 0 && toggle("cats")}>
              {item} {i === 0 && <span style={{ fontSize: 10 }}>▼</span>}
            </div>
          ))}
        </div>
        {openVariant === "cats" && (
          <div style={{ ...megaPanel, display: "grid", gridTemplateColumns: "180px 1fr", gap: 0 }}>
            <div style={{ borderRight: `1px solid ${palette.border}`, paddingRight: 20 }}>
              {categories.map((cat, i) => (
                <div key={i}
                  onMouseEnter={() => setHoveredCat(i)}
                  style={{
                    padding: "10px 12px", fontSize: 13, fontWeight: hoveredCat === i ? 600 : 400,
                    color: hoveredCat === i ? palette.primary : palette.textPrimary,
                    backgroundColor: hoveredCat === i ? palette.primary + "08" : "transparent",
                    borderRadius: system.spacing.radius.sm, cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {cat.title}
                </div>
              ))}
            </div>
            <div style={{ paddingLeft: 24 }}>
              <div style={colTitle}>{categories[hoveredCat ?? 0].title}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                {categories[hoveredCat ?? 0].items.map((item, i) => (
                  <div key={i} style={{ fontSize: 13, color: palette.textPrimary, padding: "5px 0" }}>
                    {item.label}
                    {item.desc && <div style={{ fontSize: 11, color: palette.textSecondary }}>{item.desc}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Width */}
      <div style={subsectionLabel}>Full-Width</div>
      <div style={previewBox}>
        <div style={navBar}>
          {["Everything", "About"].map((item, i) => (
            <div key={i} style={navItem(openVariant === "full" && i === 0)} onClick={() => i === 0 && toggle("full")}>
              {item} {i === 0 && <span style={{ fontSize: 10 }}>▼</span>}
            </div>
          ))}
        </div>
        {openVariant === "full" && renderColumnMenu([...categories, { title: "Company", items: [{ label: "About" }, { label: "Careers" }, { label: "Contact" }] }])}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use mega menus" description="Mega menus suit content-rich sites:" items={[
          "E-commerce with many product categories",
          "Enterprise sites with multiple product lines",
          "Documentation sites with many sections",
          "Marketing sites needing organized feature discovery",
        ]} />
        <UsageSection palette={palette} title="Layout guidance" description="Choose a layout that fits your content:" items={[
          "Columns — Even distribution of link groups",
          "Featured — Promote a key piece of content",
          "Categories — Sidebar for browsing hierarchical content",
          "Full-width — Maximum space for dense navigation",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Organize links into clear, labeled columns. Use uppercase section titles for scanability." },
        { type: "dont", text: "Don't put too many items in a single mega menu. Keep it focused and well-grouped." },
        { type: "do", text: "Include a featured section to highlight promotions, new releases, or key content." },
        { type: "dont", text: "Don't open mega menus on click alone for mobile — provide a fallback navigation pattern." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Nav bar", description: "Top-level navigation items that trigger the mega menu", x: 50, y: 8 },
          { id: 2, label: "Panel", description: "Full-width or constrained dropdown panel", x: 10, y: 50 },
          { id: 3, label: "Column", description: "Grouped section of links with a title", x: 35, y: 50 },
          { id: 4, label: "Featured area", description: "Highlighted promotional content", x: 80, y: 50 },
          { id: 5, label: "Link item", description: "Individual navigable item with optional description", x: 35, y: 85 },
        ]}
        renderPreview={(h) => (
          <div style={{ width: 340 }}>
            <div style={{
              display: "flex", gap: 16, padding: "8px 12px", borderBottom: `1px solid ${palette.border}`,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>
              {["Products ▼", "About"].map((t, i) => (
                <span key={i} style={{ fontSize: 12, color: i === 0 ? palette.primary : palette.textSecondary, fontWeight: i === 0 ? 600 : 400 }}>{t}</span>
              ))}
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: 16, padding: 16,
              backgroundColor: palette.surfaceMuted, borderRadius: `0 0 ${system.spacing.radius.md} ${system.spacing.radius.md}`,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
            }}>
              {[["Analytics", "Automation"], ["Enterprise", "Startups"]].map((col, ci) => (
                <div key={ci} style={{ opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: palette.primary, textTransform: "uppercase" as const, marginBottom: 6 }}>Section</div>
                  {col.map((it, ii) => (
                    <div key={ii} style={{
                      fontSize: 11, color: palette.textPrimary, padding: "3px 0",
                      opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
                    }}>{it}</div>
                  ))}
                </div>
              ))}
              <div style={{
                backgroundColor: palette.primary + "08", borderRadius: system.spacing.radius.sm, padding: 10,
                opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: palette.primary }}>NEW</div>
                <div style={{ fontSize: 10, color: palette.textPrimary, marginTop: 4 }}>v4.0</div>
              </div>
            </div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Panel Padding", value: "24px" },
        { label: "Column Gap", value: "32px" },
        { label: "Section Title Size", value: "11px uppercase" },
        { label: "Link Font Size", value: "13px" },
        { label: "Elevation", value: "system.spacing.elevation.lg" },
      ]} />
    </motion.section>
  );
}
