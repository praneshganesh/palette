"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface DiffViewSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type DiffLine = { type: "context" | "added" | "removed"; lineOld?: number; lineNew?: number; text: string };
type DiffMode = "side-by-side" | "inline" | "unified";

const diffLines: DiffLine[] = [
  { type: "context", lineOld: 1, lineNew: 1, text: "import { useState } from 'react';" },
  { type: "context", lineOld: 2, lineNew: 2, text: "import { Button } from './button';" },
  { type: "removed", lineOld: 3, text: "import { OldComponent } from './old';" },
  { type: "added", lineNew: 3, text: "import { NewComponent } from './new';" },
  { type: "added", lineNew: 4, text: "import { utils } from './helpers';" },
  { type: "context", lineOld: 4, lineNew: 5, text: "" },
  { type: "context", lineOld: 5, lineNew: 6, text: "export function App() {" },
  { type: "removed", lineOld: 6, text: "  const data = fetchOld();" },
  { type: "added", lineNew: 7, text: "  const data = fetchNew();" },
  { type: "context", lineOld: 7, lineNew: 8, text: "  const [state, setState] = useState(null);" },
  { type: "context", lineOld: 8, lineNew: 9, text: "" },
  { type: "removed", lineOld: 9, text: "  return <OldComponent data={data} />;" },
  { type: "added", lineNew: 10, text: "  return <NewComponent data={data} enhanced />;" },
  { type: "context", lineOld: 10, lineNew: 11, text: "}" },
];

export function DiffViewSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: DiffViewSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const [mode, setMode] = useState<DiffMode>("side-by-side");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 0,
  };

  const addedBg = palette.success + "12";
  const removedBg = palette.danger + "12";
  const addedGutter = palette.success + "25";
  const removedGutter = palette.danger + "25";
  const lineNum: React.CSSProperties = { width: 40, textAlign: "right", fontSize: 11, color: palette.textSecondary + "80", padding: "2px 8px 2px 4px", userSelect: "none", fontFamily: "monospace", flexShrink: 0 };
  const codeLine: React.CSSProperties = { fontSize: 12, fontFamily: "monospace", whiteSpace: "pre", padding: "2px 12px", flex: 1 };

  const stats = { added: diffLines.filter(l => l.type === "added").length, removed: diffLines.filter(l => l.type === "removed").length };

  const leftLines = diffLines.filter(l => l.type !== "added");
  const rightLines = diffLines.filter(l => l.type !== "removed");

  return (
    <motion.section id="comp-diff-view" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Diff View</p>
      <p style={sectionDesc}>
        Diff views display content changes with side-by-side or inline layouts, color-coded
        additions and removals, line numbers, and unified diff formats.
      </p>

      {/* Mode Switcher + Stats */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {(["side-by-side", "inline", "unified"] as DiffMode[]).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${mode === m ? palette.primary : palette.border}`, backgroundColor: mode === m ? palette.primary + "10" : palette.surface, color: mode === m ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{m.replace("-", " ")}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
          <span style={{ color: palette.success, fontWeight: 600 }}>+{stats.added}</span>
          <span style={{ color: palette.danger, fontWeight: 600 }}>−{stats.removed}</span>
        </div>
      </div>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, overflow: "hidden" }}>
          {mode === "side-by-side" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ borderRight: `1px solid ${palette.border}` }}>
                <div style={{ padding: "8px 12px", fontSize: 12, fontWeight: 600, color: palette.textSecondary, backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}` }}>Before</div>
                {leftLines.map((line, i) => (
                  <div key={i} style={{ display: "flex", backgroundColor: line.type === "removed" ? removedBg : "transparent" }}>
                    <div style={{ ...lineNum, backgroundColor: line.type === "removed" ? removedGutter : "transparent" }}>{line.lineOld ?? ""}</div>
                    <div style={{ ...codeLine, color: line.type === "removed" ? palette.danger : palette.textPrimary }}>{line.type === "removed" && "- "}{line.text}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ padding: "8px 12px", fontSize: 12, fontWeight: 600, color: palette.textSecondary, backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}` }}>After</div>
                {rightLines.map((line, i) => (
                  <div key={i} style={{ display: "flex", backgroundColor: line.type === "added" ? addedBg : "transparent" }}>
                    <div style={{ ...lineNum, backgroundColor: line.type === "added" ? addedGutter : "transparent" }}>{line.lineNew ?? ""}</div>
                    <div style={{ ...codeLine, color: line.type === "added" ? palette.success : palette.textPrimary }}>{line.type === "added" && "+ "}{line.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : mode === "inline" ? (
            <div>
              <div style={{ padding: "8px 12px", fontSize: 12, fontWeight: 600, color: palette.textSecondary, backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}` }}>Changes</div>
              {diffLines.map((line, i) => (
                <div key={i} style={{ display: "flex", backgroundColor: line.type === "added" ? addedBg : line.type === "removed" ? removedBg : "transparent" }}>
                  <div style={{ ...lineNum, backgroundColor: line.type === "added" ? addedGutter : line.type === "removed" ? removedGutter : "transparent" }}>{line.lineOld ?? ""}</div>
                  <div style={{ ...lineNum, backgroundColor: line.type === "added" ? addedGutter : line.type === "removed" ? removedGutter : "transparent" }}>{line.lineNew ?? ""}</div>
                  <div style={{ ...codeLine, color: line.type === "added" ? palette.success : line.type === "removed" ? palette.danger : palette.textPrimary }}>
                    {line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  "}{line.text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ padding: "8px 12px", fontSize: 12, fontWeight: 600, color: palette.textSecondary, backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}`, fontFamily: "monospace" }}>
                @@ -1,10 +1,11 @@
              </div>
              {diffLines.map((line, i) => (
                <div key={i} style={{ display: "flex", backgroundColor: line.type === "added" ? addedBg : line.type === "removed" ? removedBg : "transparent" }}>
                  <div style={{ ...codeLine, color: line.type === "added" ? palette.success : line.type === "removed" ? palette.danger : palette.textPrimary }}>
                    {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "} {line.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Added BG", `${palette.success}12`], ["Removed BG", `${palette.danger}12`], ["Added Text", "palette.success"], ["Removed Text", "palette.danger"], ["Line Num Font", "11px / mono"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use diff views" description="Compare versions of content:" items={[
          "Code review and pull request displays",
          "Document version comparisons",
          "Configuration change auditing",
          "Content editing history review",
        ]} />
        <UsageSection palette={palette} title="Mode selection" description="Choose the right diff mode:" items={[
          "Side-by-side — Clear comparison for wide screens",
          "Inline — Compact, shows changes in sequence",
          "Unified — Minimal, git-style patch format",
          "Consider screen width when choosing defaults",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use green for additions and red for removals — this is universal.", visual: <div style={{ display: "flex", gap: 4 }}><span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 10, backgroundColor: addedBg, color: palette.success }}>+ added</span><span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 10, backgroundColor: removedBg, color: palette.danger }}>- removed</span></div> },
        { type: "dont", text: "Don't hide line numbers — they're essential for code review comments." },
        { type: "do", text: "Show change statistics (lines added/removed) in the header." },
        { type: "dont", text: "Don't render large diffs without collapsible sections." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Header", description: "File name, stats, and mode switcher", x: 50, y: 5 },
        { id: 2, label: "Line numbers", description: "Old and new line number columns", x: 8, y: 50 },
        { id: 3, label: "Diff content", description: "Code text with +/- prefixes", x: 50, y: 50 },
        { id: 4, label: "Added highlight", description: "Green background for new lines", x: 50, y: 35 },
        { id: 5, label: "Removed highlight", description: "Red background for deleted lines", x: 50, y: 65 },
      ]} renderPreview={(h) => (
        <div style={{ width: 220, border: `1px solid ${palette.border}`, borderRadius: 6, overflow: "hidden", fontFamily: "monospace" }}>
          <div style={{ padding: "4px 8px", fontSize: 8, backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}`, color: palette.textSecondary, fontWeight: 600, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>file.tsx · +3 −2</div>
          {[
            { type: "context", num: "1", text: "import React;" },
            { type: "removed", num: "2", text: "- old import;" },
            { type: "added", num: "2", text: "+ new import;" },
            { type: "context", num: "3", text: "function App()" },
          ].map((line, i) => (
            <div key={i} style={{ display: "flex", backgroundColor: line.type === "added" ? addedBg : line.type === "removed" ? removedBg : "transparent", opacity: (line.type === "added" && h === 4) || (line.type === "removed" && h === 5) ? 1 : h === null || h === 3 ? 1 : 0.3, transition: "opacity .2s" }}>
              <span style={{ width: 20, textAlign: "right", fontSize: 7, padding: "2px 4px", color: palette.textSecondary + "60", opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>{line.num}</span>
              <span style={{ fontSize: 7, padding: "2px 4px", color: line.type === "added" ? palette.success : line.type === "removed" ? palette.danger : palette.textPrimary }}>{line.text}</span>
            </div>
          ))}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Line Number Width", value: "40px" },
        { label: "Code Font Size", value: "12px" },
        { label: "Line Number Font", value: "11px / monospace" },
        { label: "Code Padding", value: "2px 12px" },
        { label: "Header Padding", value: "8px 12px" },
        { label: "Added BG Opacity", value: "12% of success" },
        { label: "Removed BG Opacity", value: "12% of danger" },
      ]} />
    </motion.section>
  );
}
