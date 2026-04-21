"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable, TokensGrid } from "../shared/measurements";

interface TableSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type SortDir = "asc" | "desc" | null;
type TableVariant = "default" | "striped" | "bordered" | "compact";

const ChevronUp = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
);
const ChevronDown = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);
const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

export function TableSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: TableSectionProps) {
  const comp = system.components;
  const radius = comp.table.borderRadius || system.spacing.radius.md;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const rows = content.tableRows.slice(0, 6);
  const columns = ["Title", "Type", "Priority", "Status", "Owner"];

  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [variant, setVariant] = useState<TableVariant>("default");
  const [tableState, setTableState] = useState<"populated" | "loading" | "empty">("populated");
  const [page, setPage] = useState(0);

  const toggleSort = (col: number) => {
    if (sortCol === col) { setSortDir(d => d === "asc" ? "desc" : d === "desc" ? null : "asc"); if (sortDir === "desc") setSortCol(null); }
    else { setSortCol(col); setSortDir("asc"); }
  };
  const toggleSelect = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setSelected(s => s.size === rows.length ? new Set() : new Set(rows.map(r => r.id)));

  const isCompact = variant === "compact";
  const cellPad = isCompact ? "6px 12px" : "10px 16px";
  const headerBg = palette.surfaceMuted;
  const rowBg = (i: number, id: string) => {
    if (selected.has(id)) return palette.primary + "10";
    if (hoveredRow === i) return palette.surfaceMuted;
    if (variant === "striped" && i % 2 === 1) return palette.surfaceMuted;
    return palette.surface;
  };
  const cellBorder = variant === "bordered" ? `1px solid ${palette.border}` : "none";

  const renderTh = (label: string, idx: number) => (
    <th key={idx} onClick={() => toggleSort(idx)} style={{ padding: cellPad, textAlign: "left", fontSize: isCompact ? 11 : 12, fontWeight: 600, color: palette.textSecondary, cursor: "pointer", userSelect: "none", borderRight: cellBorder, whiteSpace: "nowrap", borderBottom: `1px solid ${palette.border}` }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {label}
        <span style={{ opacity: sortCol === idx ? 1 : 0.3 }}>
          {sortCol === idx && sortDir === "desc" ? <ChevronDown /> : <ChevronUp />}
        </span>
      </span>
    </th>
  );

  const getCellValue = (row: typeof rows[0], col: number) => [row.title, row.type, row.priority, row.status, row.owner][col];

  const statusColor = (s: string) => {
    const low = s.toLowerCase();
    if (low.includes("done") || low.includes("complete") || low.includes("active")) return palette.success;
    if (low.includes("pending") || low.includes("review") || low.includes("progress")) return palette.warning;
    if (low.includes("block") || low.includes("cancel") || low.includes("overdue")) return palette.danger;
    return palette.info;
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortCol === null || sortDir === null) return 0;
    const av = getCellValue(a, sortCol) ?? "";
    const bv = getCellValue(b, sortCol) ?? "";
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const pageSize = 3;
  const pagedRows = sortedRows.slice(page * pageSize, page * pageSize + pageSize);
  const totalPages = Math.ceil(sortedRows.length / pageSize);

  const skeletonRow = (i: number) => (
    <tr key={i}>
      <td style={{ padding: cellPad }}><div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: palette.border + "40" }} /></td>
      {columns.map((_, j) => <td key={j} style={{ padding: cellPad }}><div style={{ height: 12, borderRadius: 4, backgroundColor: palette.border + "40", width: `${60 + Math.random() * 40}%` }} /></td>)}
    </tr>
  );

  return (
    <motion.section id="comp-tables" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Tables</p>
      <p style={sectionDesc}>Tables organize structured data into rows and columns for comparison and scanning. They support sorting, selection, pagination, and multiple visual variants.</p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.lg, padding: 24, overflow: "auto" }}>
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: radius, overflow: "hidden", backgroundColor: palette.surface }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: system.typography.bodyFont, fontSize: isCompact ? 12 : 13 }}>
              <thead style={{ backgroundColor: headerBg }}>
                <tr>
                  <th style={{ padding: cellPad, width: 36, borderBottom: `1px solid ${palette.border}` }}>
                    <div onClick={toggleAll} style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${selected.size === rows.length ? palette.primary : palette.border}`, backgroundColor: selected.size === rows.length ? palette.primary : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all .15s" }}>
                      {selected.size === rows.length && <CheckIcon size={10} />}
                    </div>
                  </th>
                  {columns.map(renderTh)}
                </tr>
              </thead>
              <tbody>
                {tableState === "loading" && [0, 1, 2, 3].map(skeletonRow)}
                {tableState === "empty" && (
                  <tr><td colSpan={6} style={{ padding: 48, textAlign: "center", color: palette.textSecondary, fontSize: 13 }}>No data available</td></tr>
                )}
                {tableState === "populated" && sortedRows.map((row, i) => (
                  <tr key={row.id} onMouseEnter={() => setHoveredRow(i)} onMouseLeave={() => setHoveredRow(null)} style={{ backgroundColor: rowBg(i, row.id), transition: "background-color .1s", borderBottom: i < sortedRows.length - 1 ? `1px solid ${palette.border}` : "none" }}>
                    <td style={{ padding: cellPad }}>
                      <div onClick={() => toggleSelect(row.id)} style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${selected.has(row.id) ? palette.primary : palette.border}`, backgroundColor: selected.has(row.id) ? palette.primary : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all .15s" }}>
                        {selected.has(row.id) && <CheckIcon size={10} />}
                      </div>
                    </td>
                    <td style={{ padding: cellPad, color: palette.textPrimary, fontWeight: 500, borderRight: cellBorder }}>{row.title}</td>
                    <td style={{ padding: cellPad, color: palette.textSecondary, borderRight: cellBorder }}>{row.type}</td>
                    <td style={{ padding: cellPad, borderRight: cellBorder }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: statusColor(row.priority), backgroundColor: statusColor(row.priority) + "15", padding: "2px 8px", borderRadius: 99 }}>{row.priority}</span>
                    </td>
                    <td style={{ padding: cellPad, borderRight: cellBorder }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: statusColor(row.status), backgroundColor: statusColor(row.status) + "15", padding: "2px 8px", borderRadius: 99 }}>{row.status}</span>
                    </td>
                    <td style={{ padding: cellPad, color: palette.textSecondary }}>{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <TokensGrid palette={palette} tokens={[
          { label: "Border Radius", value: radius },
          { label: "Header BG", value: palette.surfaceMuted },
          { label: "Row Hover", value: palette.surfaceMuted },
          { label: "Border Color", value: palette.border },
          { label: "Selected BG", value: `${palette.primary}10` },
        ]} />
      </div>

      {/* Variant Switcher */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {(["default", "striped", "bordered", "compact"] as TableVariant[]).map(v => (
          <button key={v} onClick={() => setVariant(v)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${variant === v ? palette.primary : palette.border}`, backgroundColor: variant === v ? palette.primary + "10" : palette.surface, color: variant === v ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{v}</button>
        ))}
      </div>

      {/* State Switcher */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["populated", "loading", "empty"] as const).map(s => (
          <button key={s} onClick={() => setTableState(s)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${tableState === s ? palette.primary : palette.border}`, backgroundColor: tableState === s ? palette.primary + "10" : palette.surface, color: tableState === s ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{s}</button>
        ))}
      </div>

      {/* Pagination */}
      <div style={subsectionLabel}>With Pagination</div>
      <div style={{ border: `1px solid ${palette.border}`, borderRadius: radius, overflow: "hidden", backgroundColor: palette.surface }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: system.typography.bodyFont, fontSize: 13 }}>
          <thead style={{ backgroundColor: headerBg }}>
            <tr>{columns.map((c, i) => <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: palette.textSecondary, borderBottom: `1px solid ${palette.border}` }}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {pagedRows.map((row, i) => (
              <tr key={row.id} style={{ borderBottom: i < pagedRows.length - 1 ? `1px solid ${palette.border}` : "none" }}>
                <td style={{ padding: "10px 16px", color: palette.textPrimary, fontWeight: 500 }}>{row.title}</td>
                <td style={{ padding: "10px 16px", color: palette.textSecondary }}>{row.type}</td>
                <td style={{ padding: "10px 16px" }}><span style={{ fontSize: 11, fontWeight: 600, color: statusColor(row.priority), backgroundColor: statusColor(row.priority) + "15", padding: "2px 8px", borderRadius: 99 }}>{row.priority}</span></td>
                <td style={{ padding: "10px 16px" }}><span style={{ fontSize: 11, fontWeight: 600, color: statusColor(row.status), backgroundColor: statusColor(row.status) + "15", padding: "2px 8px", borderRadius: 99 }}>{row.status}</span></td>
                <td style={{ padding: "10px 16px", color: palette.textSecondary }}>{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted }}>
          <span style={{ fontSize: 12, color: palette.textSecondary }}>Page {page + 1} of {totalPages}</span>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{ padding: "4px 12px", borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: page === 0 ? palette.border : palette.textSecondary, fontSize: 12, cursor: page === 0 ? "default" : "pointer" }}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${page === i ? palette.primary : palette.border}`, backgroundColor: page === i ? palette.primary + "10" : palette.surface, color: page === i ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: page === i ? 600 : 400, cursor: "pointer" }}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{ padding: "4px 12px", borderRadius: 6, border: `1px solid ${palette.border}`, backgroundColor: palette.surface, color: page === totalPages - 1 ? palette.border : palette.textSecondary, fontSize: 12, cursor: page === totalPages - 1 ? "default" : "pointer" }}>Next</button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use tables" description="Tables present structured, comparable data:" items={["Data sets with 3+ attributes per item", "Content that benefits from sorting and filtering", "Admin dashboards and management views", "Financial, inventory, or status tracking"]} />
        <UsageSection palette={palette} title="Choosing a variant" description="Select a variant for the right density and clarity:" items={["Default — Clean and versatile for most use cases", "Striped — Improves readability on wide tables", "Bordered — Maximum cell separation for dense data", "Compact — High-density views for power users"]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Align numbers to the right and text to the left for easy scanning.", visual: <div style={{ display: "flex", gap: 4 }}><div style={{ width: 60, height: 16, borderRadius: 3, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }} /><div style={{ width: 40, height: 16, borderRadius: 3, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }} /></div> },
        { type: "dont", text: "Don't mix too many column widths or cram excessive data into one view.", visual: <div style={{ display: "flex", gap: 2 }}>{[20, 10, 40, 8, 30, 12].map((w, i) => <div key={i} style={{ width: w, height: 20, borderRadius: 2, backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}` }} />)}</div> },
        { type: "do", text: "Provide a clear empty state message when no data matches filters.", visual: <div style={{ fontSize: 10, color: palette.textSecondary, textAlign: "center", padding: 8, border: `1px dashed ${palette.border}`, borderRadius: 6 }}>No results found</div> },
        { type: "dont", text: "Don't use tables for simple key-value pairs — use a description list instead.", visual: <div style={{ width: 100, height: 30, borderRadius: 4, border: `1px solid ${palette.danger}30`, display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 7, padding: 4, color: palette.textSecondary }}><span>Key</span><span>Val</span></div> },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Container", description: "Bordered surface wrapping the entire table", x: 5, y: 50 },
        { id: 2, label: "Header row", description: "Column labels with sort controls", x: 50, y: 8 },
        { id: 3, label: "Data rows", description: "Individual records with cell values", x: 50, y: 50 },
        { id: 4, label: "Selection", description: "Checkbox for multi-row selection", x: 10, y: 30 },
        { id: 5, label: "Pagination", description: "Page controls at the table footer", x: 50, y: 92 },
      ]} renderPreview={(highlighted) => (
        <div style={{ width: 240, border: `1px solid ${palette.border}`, borderRadius: 8, overflow: "hidden", opacity: highlighted === 1 ? 1 : undefined }}>
          <div style={{ display: "flex", gap: 4, padding: "6px 8px", backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}`, opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, border: `1.5px solid ${palette.border}`, opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
            {["Name", "Status", "Date"].map(h => <div key={h} style={{ flex: 1, fontSize: 8, fontWeight: 700, color: palette.textSecondary }}>{h}</div>)}
          </div>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: "flex", gap: 4, padding: "5px 8px", borderBottom: i < 2 ? `1px solid ${palette.border}` : "none", opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, border: `1.5px solid ${palette.border}`, opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }} />
              <div style={{ flex: 1, height: 8, borderRadius: 2, backgroundColor: palette.border + "40" }} />
              <div style={{ flex: 1, height: 8, borderRadius: 2, backgroundColor: palette.border + "40" }} />
              <div style={{ flex: 1, height: 8, borderRadius: 2, backgroundColor: palette.border + "40" }} />
            </div>
          ))}
          <div style={{ padding: "4px 8px", borderTop: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted, display: "flex", justifyContent: "flex-end", gap: 3, opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {[1, 2, 3].map(n => <div key={n} style={{ width: 14, height: 14, borderRadius: 3, border: `1px solid ${palette.border}`, fontSize: 7, display: "flex", alignItems: "center", justifyContent: "center", color: palette.textSecondary }}>{n}</div>)}
          </div>
          {highlighted === 1 && <div style={{ position: "absolute", inset: -3, border: `2px dashed ${palette.primary}`, borderRadius: 10, pointerEvents: "none" }} />}
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Header Cell Padding", value: "10px 16px" },
        { label: "Body Cell Padding", value: "10px 16px" },
        { label: "Compact Cell Padding", value: "6px 12px" },
        { label: "Border Radius", value: radius },
        { label: "Checkbox Size", value: "16 × 16px" },
        { label: "Header Font Size", value: "12px" },
        { label: "Body Font Size", value: "13px" },
        { label: "Pagination Height", value: "40px" },
      ]} />
    </motion.section>
  );
}
