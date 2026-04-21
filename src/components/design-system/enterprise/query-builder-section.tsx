"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface QueryBuilderSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

type Rule = { id: string; field: string; operator: string; value: string };
type Combinator = "AND" | "OR";

const fields = ["Status", "Priority", "Assignee", "Created Date", "Type", "Label"];
const operators: Record<string, string[]> = {
  Status: ["is", "is not", "is any of"],
  Priority: ["is", "is not", "is greater than"],
  Assignee: ["is", "is not", "is unset"],
  "Created Date": ["is before", "is after", "is between"],
  Type: ["is", "is not"],
  Label: ["contains", "does not contain", "is empty"],
};

export function QueryBuilderSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: QueryBuilderSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const inputRadius = comp.input.borderRadius || system.spacing.radius.md;
  const btnRadius = comp.button.borderRadius || system.spacing.radius.md;

  const [rules, setRules] = useState<Rule[]>([
    { id: "r1", field: "Status", operator: "is", value: "Active" },
    { id: "r2", field: "Priority", operator: "is greater than", value: "Medium" },
    { id: "r3", field: "Assignee", operator: "is", value: "Me" },
  ]);
  const [combinator, setCombinator] = useState<Combinator>("AND");
  const [nextId, setNextId] = useState(4);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const addRule = () => { setRules(prev => [...prev, { id: `r${nextId}`, field: "Status", operator: "is", value: "" }]); setNextId(n => n + 1); };
  const removeRule = (id: string) => setRules(prev => prev.filter(r => r.id !== id));
  const updateRule = (id: string, key: keyof Rule, val: string) => setRules(prev => prev.map(r => r.id === id ? { ...r, [key]: val } : r));

  const selectStyle: React.CSSProperties = {
    padding: "6px 10px", borderRadius: inputRadius, border: `1px solid ${palette.border}`,
    backgroundColor: palette.surface, fontSize: 13, color: palette.textPrimary,
    fontFamily: "inherit", cursor: "pointer", outline: "none",
  };
  const inputStyle: React.CSSProperties = {
    padding: "6px 10px", borderRadius: inputRadius, border: `1px solid ${palette.border}`,
    backgroundColor: palette.surface, fontSize: 13, color: palette.textPrimary,
    fontFamily: "inherit", outline: "none", width: 120,
  };

  return (
    <motion.section id="comp-query-builder" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Query Builder</p>
      <p style={sectionDesc}>
        Query builders let users construct complex filters using rule rows with field selectors,
        operators, values, and AND/OR combinators for precise data querying.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary }}>Filter where</span>
            <div style={{ display: "flex", gap: 0, borderRadius: 99, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
              {(["AND", "OR"] as Combinator[]).map(c => (
                <button key={c} onClick={() => setCombinator(c)} style={{ padding: "4px 14px", border: "none", backgroundColor: combinator === c ? palette.primary : "transparent", color: combinator === c ? "#fff" : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rules.map((rule, i) => (
              <div key={rule.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 48, fontSize: 12, fontWeight: 600, color: palette.primary, textAlign: "center" }}>
                  {i === 0 ? "Where" : combinator}
                </div>
                <select value={rule.field} onChange={e => updateRule(rule.id, "field", e.target.value)} style={selectStyle}>
                  {fields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <select value={rule.operator} onChange={e => updateRule(rule.id, "operator", e.target.value)} style={selectStyle}>
                  {(operators[rule.field] || ["is"]).map(op => <option key={op} value={op}>{op}</option>)}
                </select>
                <input value={rule.value} onChange={e => updateRule(rule.id, "value", e.target.value)} placeholder="Value..." style={inputStyle} />
                <button onClick={() => removeRule(rule.id)} style={{ border: "none", background: "none", cursor: "pointer", color: palette.textSecondary, display: "flex", padding: 4 }}><XIcon /></button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button onClick={addRule} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: btnRadius, border: `1px dashed ${palette.border}`, backgroundColor: "transparent", color: palette.primary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              <PlusIcon /> Add rule
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: btnRadius, border: `1px dashed ${palette.border}`, backgroundColor: "transparent", color: palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              <PlusIcon /> Add group
            </button>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Input Radius", inputRadius], ["Button Radius", btnRadius], ["Combinator Active", "palette.primary"], ["Rule Gap", "8px"], ["Add Border", "dashed"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Output preview */}
      <div style={subsectionLabel}>Query Preview</div>
      <div style={{ ...showcaseBox, fontFamily: "monospace", fontSize: 13, color: palette.textPrimary, lineHeight: 1.8 }}>
        {rules.map((r, i) => (
          <span key={r.id}>
            {i > 0 && <span style={{ color: palette.primary, fontWeight: 700 }}> {combinator} </span>}
            <span style={{ color: palette.textSecondary }}>{r.field}</span>{" "}
            <span style={{ color: palette.warning }}>{r.operator}</span>{" "}
            <span style={{ color: palette.success }}>&quot;{r.value}&quot;</span>
          </span>
        ))}
      </div>

      {/* Nested group */}
      <div style={subsectionLabel}>Nested Groups</div>
      <div style={showcaseBox}>
        <div style={{ padding: 16, border: `1px solid ${palette.border}`, borderRadius: radius, borderLeft: `3px solid ${palette.primary}` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.primary, marginBottom: 10 }}>AND</div>
          {["Status is Active", "Priority is High"].map((r, i) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "6px 10px", backgroundColor: palette.surfaceMuted, borderRadius: system.spacing.radius.sm, fontSize: 12, color: palette.textPrimary }}>
              <span style={{ width: 40, fontSize: 11, color: palette.primary, fontWeight: 600 }}>{i === 0 ? "Where" : "AND"}</span>{r}
            </div>
          ))}
          <div style={{ marginTop: 12, marginLeft: 24, padding: 12, border: `1px solid ${palette.border}`, borderRadius: radius, borderLeft: `3px solid ${palette.warning}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: palette.warning, marginBottom: 8 }}>OR</div>
            {["Assignee is Me", "Assignee is Team"].map((r, i) => (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, padding: "6px 10px", backgroundColor: palette.surfaceMuted, borderRadius: system.spacing.radius.sm, fontSize: 12, color: palette.textPrimary }}>
                <span style={{ width: 40, fontSize: 11, color: palette.warning, fontWeight: 600 }}>{i === 0 ? "Where" : "OR"}</span>{r}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use query builders" description="Complex filtering for power users:" items={[
          "Admin dashboards with complex filter needs",
          "Report builders and data analysis tools",
          "Search refinement for large datasets",
          "Automation rule configuration",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Keep queries manageable:" items={[
          "Limit nesting to 2-3 levels deep",
          "Show a preview of the generated query",
          "Allow saving and naming filter presets",
          "Validate rules before applying",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use an AND/OR toggle that's clearly visible between rules." },
        { type: "dont", text: "Don't auto-apply filters on every change — let users commit." },
        { type: "do", text: "Allow removing individual rules with a clear close button." },
        { type: "dont", text: "Don't nest groups more than 3 levels deep." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Combinator", description: "AND/OR toggle between rules", x: 12, y: 25 },
        { id: 2, label: "Field selector", description: "Dropdown to choose the filter field", x: 30, y: 50 },
        { id: 3, label: "Operator", description: "Comparison type (is, contains, etc.)", x: 50, y: 50 },
        { id: 4, label: "Value input", description: "Filter value or dropdown selection", x: 72, y: 50 },
        { id: 5, label: "Add/Remove", description: "Controls to add or remove rules", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 240 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 6, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {["AND", "OR"].map((c, i) => <span key={c} style={{ padding: "2px 8px", borderRadius: 99, fontSize: 8, backgroundColor: i === 0 ? palette.primary : "transparent", color: i === 0 ? "#fff" : palette.textSecondary, border: `1px solid ${palette.border}` }}>{c}</span>)}
          </div>
          {[0, 1].map(i => (
            <div key={i} style={{ display: "flex", gap: 4, marginBottom: 4, alignItems: "center" }}>
              <span style={{ fontSize: 7, color: palette.primary, width: 24, fontWeight: 600 }}>{i === 0 ? "Where" : "AND"}</span>
              <span style={{ padding: "2px 6px", borderRadius: 3, border: `1px solid ${palette.border}`, fontSize: 7, color: palette.textPrimary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>Field</span>
              <span style={{ padding: "2px 6px", borderRadius: 3, border: `1px solid ${palette.border}`, fontSize: 7, color: palette.textPrimary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>is</span>
              <span style={{ padding: "2px 6px", borderRadius: 3, border: `1px solid ${palette.border}`, fontSize: 7, color: palette.textPrimary, flex: 1, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>val</span>
              <span style={{ fontSize: 8, color: palette.textSecondary }}>✕</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 4, marginTop: 6, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <span style={{ padding: "2px 8px", borderRadius: 3, border: `1px dashed ${palette.border}`, fontSize: 7, color: palette.primary }}>+ Rule</span>
            <span style={{ padding: "2px 8px", borderRadius: 3, border: `1px dashed ${palette.border}`, fontSize: 7, color: palette.textSecondary }}>+ Group</span>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Select Padding", value: "6px 10px" },
        { label: "Input Width", value: "120px" },
        { label: "Rule Gap", value: "8px" },
        { label: "Combinator Width", value: "48px" },
        { label: "Nested Indent", value: "24px" },
        { label: "Group Border Left", value: "3px solid palette.primary" },
        { label: "Border Radius", value: inputRadius },
      ]} />
    </motion.section>
  );
}
