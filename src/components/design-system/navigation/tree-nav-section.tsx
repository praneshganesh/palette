"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface TreeNavSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
}

export function TreeNavSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: TreeNavSectionProps) {
  const comp = system.components;
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["src", "components", "docs"]));
  const [selected, setSelected] = useState<string>("App.tsx");
  const [checked, setChecked] = useState<Set<string>>(new Set(["README.md"]));
  const [dragOver, setDragOver] = useState<string | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 16,
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleCheck = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const defaultTree: TreeNode[] = [
    { id: "src", label: "src", children: [
      { id: "components", label: "components", children: [
        { id: "App.tsx", label: "App.tsx" },
        { id: "Header.tsx", label: "Header.tsx" },
        { id: "Sidebar.tsx", label: "Sidebar.tsx" },
      ]},
      { id: "utils", label: "utils", children: [
        { id: "helpers.ts", label: "helpers.ts" },
        { id: "api.ts", label: "api.ts" },
      ]},
      { id: "index.ts", label: "index.ts" },
    ]},
    { id: "docs", label: "docs", children: [
      { id: "README.md", label: "README.md" },
      { id: "CHANGELOG.md", label: "CHANGELOG.md" },
    ]},
    { id: "package.json", label: "package.json" },
  ];

  const iconTree: TreeNode[] = [
    { id: "src", label: "src", icon: "📁", children: [
      { id: "components", label: "components", icon: "📁", children: [
        { id: "App.tsx", label: "App.tsx", icon: "⚛" },
        { id: "Header.tsx", label: "Header.tsx", icon: "⚛" },
      ]},
      { id: "styles", label: "styles", icon: "📁", children: [
        { id: "global.css", label: "global.css", icon: "🎨" },
      ]},
    ]},
    { id: "package.json", label: "package.json", icon: "📦" },
    { id: "tsconfig.json", label: "tsconfig.json", icon: "⚙" },
  ];

  const renderTree = (
    nodes: TreeNode[], depth: number,
    options?: { showIcons?: boolean; showCheckboxes?: boolean; showDragHandles?: boolean; fileExplorer?: boolean },
  ): React.ReactNode => {
    return nodes.map(node => {
      const hasChildren = !!node.children?.length;
      const isExpanded = expanded.has(node.id);
      const isSelected = selected === node.id;
      const isChecked = checked.has(node.id);
      const isDragTarget = dragOver === node.id;

      const fileIcon = options?.fileExplorer
        ? (hasChildren ? (isExpanded ? "📂" : "📁") : node.label.endsWith(".tsx") ? "⚛" : node.label.endsWith(".ts") ? "🔷" : node.label.endsWith(".css") ? "🎨" : node.label.endsWith(".md") ? "📝" : node.label.endsWith(".json") ? "⚙" : "📄")
        : node.icon;

      return (
        <div key={node.id}>
          <div
            onClick={() => {
              setSelected(node.id);
              if (hasChildren) toggleExpand(node.id);
            }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(node.id); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => setDragOver(null)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 8px", paddingLeft: depth * 20 + 8,
              fontSize: 13, cursor: "pointer",
              color: isSelected ? palette.primary : palette.textPrimary,
              backgroundColor: isDragTarget ? palette.primary + "10" : isSelected ? palette.primary + "08" : "transparent",
              borderRadius: system.spacing.radius.sm,
              transition: "all 0.15s", fontFamily: system.typography.bodyFont,
              borderLeft: isDragTarget ? `2px solid ${palette.primary}` : "2px solid transparent",
            }}
          >
            {options?.showDragHandles && (
              <span draggable style={{ cursor: "grab", fontSize: 10, color: palette.textSecondary, userSelect: "none" }}>⠿</span>
            )}
            {options?.showCheckboxes && (
              <span
                onClick={(e) => { e.stopPropagation(); toggleCheck(node.id); }}
                style={{
                  width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                  border: `1.5px solid ${isChecked ? palette.primary : palette.border}`,
                  backgroundColor: isChecked ? palette.primary : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: "#fff",
                }}
              >
                {isChecked && "✓"}
              </span>
            )}
            {hasChildren && (
              <span style={{ fontSize: 9, color: palette.textSecondary, width: 12, textAlign: "center", flexShrink: 0 }}>
                {isExpanded ? "▼" : "▶"}
              </span>
            )}
            {!hasChildren && <span style={{ width: 12, flexShrink: 0 }} />}
            {(options?.showIcons || options?.fileExplorer) && fileIcon && (
              <span style={{ fontSize: 13, flexShrink: 0 }}>{fileIcon}</span>
            )}
            <span style={{ fontWeight: isSelected ? 600 : 400 }}>{node.label}</span>
          </div>
          {hasChildren && isExpanded && renderTree(node.children!, depth + 1, options)}
        </div>
      );
    });
  };

  return (
    <motion.section id="comp-tree-nav" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Tree Navigation</p>
      <p style={sectionDesc}>
        Tree navigation displays hierarchical data in an expandable/collapsible structure.
        It supports selection, checkboxes, drag-and-drop, and file-explorer patterns.
      </p>

      {/* Default */}
      <div style={subsectionLabel}>Default</div>
      <div style={{ ...previewBox, maxWidth: 320 }}>
        {renderTree(defaultTree, 0)}
      </div>

      {/* With Icons */}
      <div style={subsectionLabel}>With Icons</div>
      <div style={{ ...previewBox, maxWidth: 320 }}>
        {renderTree(iconTree, 0, { showIcons: true })}
      </div>

      {/* With Checkboxes */}
      <div style={subsectionLabel}>With Checkboxes</div>
      <div style={{ ...previewBox, maxWidth: 320 }}>
        {renderTree(defaultTree, 0, { showCheckboxes: true })}
        <div style={{ marginTop: 12, fontSize: 11, color: palette.textSecondary }}>
          Checked: {checked.size > 0 ? Array.from(checked).join(", ") : "None"}
        </div>
      </div>

      {/* With Drag Handles */}
      <div style={subsectionLabel}>With Drag Handles</div>
      <div style={{ ...previewBox, maxWidth: 320 }}>
        {renderTree(defaultTree, 0, { showDragHandles: true })}
      </div>

      {/* File Explorer Style */}
      <div style={subsectionLabel}>File Explorer Style</div>
      <div style={{
        ...previewBox, maxWidth: 320,
        backgroundColor: palette.surfaceMuted,
        border: `1px solid ${palette.border}`,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.05em", color: palette.textSecondary, padding: "4px 8px 8px", marginBottom: 4 }}>
          Explorer
        </div>
        {renderTree(defaultTree, 0, { fileExplorer: true })}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use tree navigation" description="Trees are ideal for hierarchical data:" items={[
          "File and folder structures in editors",
          "Nested categories or organizational charts",
          "Settings with grouped sub-options",
          "Multi-level navigation sidebars",
        ]} />
        <UsageSection palette={palette} title="Feature selection" description="Enable features based on use case:" items={[
          "Checkboxes — Multi-select for batch actions",
          "Drag handles — Reorder items within the tree",
          "Icons — File type or category indicators",
          "File explorer — Full IDE-like navigation",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Expand the first level by default so users see content immediately." },
        { type: "dont", text: "Don't nest more than 4–5 levels deep. Flatten the hierarchy if possible." },
        { type: "do", text: "Highlight the selected node clearly. Use background color and font weight." },
        { type: "dont", text: "Don't use tree navigation for flat lists. A simple list or menu is better." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Expand toggle", description: "Arrow icon to expand/collapse branches", x: 10, y: 25 },
          { id: 2, label: "Node icon", description: "Optional icon for file type or category", x: 25, y: 25 },
          { id: 3, label: "Node label", description: "Text label for the tree node", x: 55, y: 25 },
          { id: 4, label: "Indent guide", description: "Visual indentation showing depth level", x: 5, y: 65 },
          { id: 5, label: "Selection", description: "Background highlight on the active node", x: 55, y: 65 },
        ]}
        renderPreview={(h) => (
          <div style={{ width: 220, fontSize: 12, fontFamily: system.typography.bodyFont }}>
            {[
              { label: "src", depth: 0, expandable: true, expanded: true },
              { label: "components", depth: 1, expandable: true, expanded: true },
              { label: "App.tsx", depth: 2, expandable: false, selected: true },
              { label: "utils", depth: 1, expandable: true, expanded: false },
            ].map((node, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "4px 6px",
                paddingLeft: node.depth * 18 + 6,
                backgroundColor: node.selected ? palette.primary + "10" : "transparent",
                borderRadius: 4,
                opacity: node.selected && h === 5 ? 1 : h === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}>
                <span style={{
                  fontSize: 8, width: 12, color: palette.textSecondary,
                  opacity: node.expandable ? (h === 1 ? 1 : h === null ? 1 : 0.3) : 0.1,
                  transition: "opacity 0.2s",
                }}>
                  {node.expandable ? (node.expanded ? "▼" : "▶") : ""}
                </span>
                <span style={{
                  fontSize: 12,
                  opacity: h === 2 ? 1 : h === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}>
                  {node.expandable ? "📁" : "⚛"}
                </span>
                <span style={{
                  color: node.selected ? palette.primary : palette.textPrimary,
                  fontWeight: node.selected ? 600 : 400,
                  opacity: h === 3 ? 1 : h === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}>
                  {node.label}
                </span>
              </div>
            ))}
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Node Height", value: "30px" },
        { label: "Indent Per Level", value: "20px" },
        { label: "Icon Size", value: "13px" },
        { label: "Padding", value: "5px 8px" },
        { label: "Border Radius", value: system.spacing.radius.sm },
      ]} />
    </motion.section>
  );
}
