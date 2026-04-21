"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface InvoiceSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type InvStatus = "paid" | "pending" | "overdue";
type LineItem = { description: string; qty: number; rate: number };

const lineItems: LineItem[] = [
  { description: "Design consultation", qty: 4, rate: 150 },
  { description: "UI/UX development", qty: 12, rate: 120 },
  { description: "Brand identity package", qty: 1, rate: 2500 },
  { description: "Quality assurance", qty: 6, rate: 95 },
];

export function InvoiceSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: InvoiceSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius.md;
  const [status, setStatus] = useState<InvStatus>("paid");

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };

  const statusColor = (s: InvStatus) => s === "paid" ? palette.success : s === "pending" ? palette.warning : palette.danger;
  const subtotal = lineItems.reduce((s, it) => s + it.qty * it.rate, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const StatusBadge = ({ s }: { s: InvStatus }) => (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 99,
      fontSize: 12, fontWeight: 600, backgroundColor: statusColor(s) + "15", color: statusColor(s), textTransform: "capitalize",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: statusColor(s) }} />{s}
    </span>
  );

  return (
    <motion.section id="comp-invoice" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Invoice</p>
      <p style={sectionDesc}>
        Invoice components display structured billing documents with headers, line item tables,
        calculated totals, and payment status badges for financial workflows.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: palette.textPrimary }}>INVOICE</div>
              <div style={{ fontSize: 13, color: palette.textSecondary, marginTop: 4 }}>#INV-2026-0042</div>
            </div>
            <StatusBadge s={status} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>From</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Acme Design Co.</div>
              <div style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.6 }}>123 Creative Ave<br />San Francisco, CA 94102</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Bill To</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Globex Corporation</div>
              <div style={{ fontSize: 12, color: palette.textSecondary, lineHeight: 1.6 }}>456 Business Blvd<br />New York, NY 10001</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 24, marginBottom: 28 }}>
            {[["Issue Date", "Apr 1, 2026"], ["Due Date", "Apr 30, 2026"], ["Payment", "Net 30"]].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ border: `1px solid ${palette.border}`, borderRadius: radius, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: palette.surfaceMuted }}>
                  {["Description", "Qty", "Rate", "Amount"].map((h, i) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: i === 0 ? "left" : "right", fontWeight: 600, color: palette.textSecondary, fontSize: 12, borderBottom: `1px solid ${palette.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, i) => (
                  <tr key={item.description} style={{ borderBottom: i < lineItems.length - 1 ? `1px solid ${palette.border}` : "none" }}>
                    <td style={{ padding: "10px 16px", color: palette.textPrimary }}>{item.description}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", color: palette.textSecondary }}>{item.qty}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", color: palette.textSecondary }}>${item.rate.toFixed(2)}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600, color: palette.textPrimary }}>${(item.qty * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
            <div style={{ width: 200 }}>
              {[["Subtotal", subtotal], ["Tax (8%)", tax]].map(([l, v]) => (
                <div key={l as string} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: palette.textSecondary }}>{l}</span>
                  <span style={{ color: palette.textPrimary }}>${(v as number).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: `2px solid ${palette.primary}`, fontSize: 16, fontWeight: 800 }}>
                <span style={{ color: palette.textPrimary }}>Total</span>
                <span style={{ color: palette.textPrimary }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {[["Border Radius", radius], ["Paid Color", "palette.success"], ["Overdue Color", "palette.danger"], ["Total Border", "palette.primary (2px)"], ["Header BG", "palette.surfaceMuted"]].map(([l, v]) => (
            <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
              {l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Variants */}
      <div style={subsectionLabel}>Payment Status</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["paid", "pending", "overdue"] as InvStatus[]).map(s => (
          <button key={s} onClick={() => setStatus(s)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${status === s ? statusColor(s) : palette.border}`, backgroundColor: status === s ? statusColor(s) + "10" : palette.surface, color: status === s ? statusColor(s) : palette.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{s}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {(["paid", "pending", "overdue"] as InvStatus[]).map(s => (
          <div key={s} style={{ ...showcaseBox, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>#INV-2026-00{s === "paid" ? 41 : s === "pending" ? 42 : 38}</div>
              <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 2 }}>${total.toFixed(2)}</div>
            </div>
            <StatusBadge s={s} />
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use invoices" description="Invoices formalize billing:" items={[
          "Client billing and payment tracking",
          "Order confirmation documents",
          "Financial reporting dashboards",
          "PDF generation for records",
        ]} />
        <UsageSection palette={palette} title="Best practices" description="Keep invoices professional:" items={[
          "Include unique invoice numbers and dates",
          "Show clear sender and recipient addresses",
          "Itemize with description, qty, rate, and amount",
          "Use status badges for payment tracking",
        ]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Right-align numeric columns for easy scanning and totaling." },
        { type: "dont", text: "Don't omit tax or fee breakdowns — be transparent." },
        { type: "do", text: "Use color-coded status badges for quick payment recognition.", visual: <div style={{ display: "flex", gap: 6 }}><StatusBadge s="paid" /><StatusBadge s="overdue" /></div> },
        { type: "dont", text: "Don't combine multiple currencies in one invoice without conversion." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Header", description: "Invoice title, number, and status badge", x: 50, y: 5 },
        { id: 2, label: "Addresses", description: "Sender and recipient info blocks", x: 50, y: 22 },
        { id: 3, label: "Meta dates", description: "Issue date, due date, and payment terms", x: 50, y: 38 },
        { id: 4, label: "Line items", description: "Table of services with quantities and rates", x: 50, y: 60 },
        { id: 5, label: "Totals", description: "Subtotal, tax, and final amount", x: 80, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{ width: 220, border: `1px solid ${palette.border}`, borderRadius: 8, padding: 12, backgroundColor: palette.surface }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: palette.textPrimary }}>INVOICE</span>
            <span style={{ fontSize: 7, padding: "2px 6px", borderRadius: 99, backgroundColor: palette.success + "15", color: palette.success }}>Paid</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {["From", "To"].map(l => <div key={l}><div style={{ fontSize: 7, color: palette.textSecondary, fontWeight: 600 }}>{l}</div><div style={{ height: 6, borderRadius: 2, backgroundColor: palette.border + "40", marginTop: 3, width: "70%" }} /></div>)}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {["Issued", "Due"].map(l => <div key={l} style={{ fontSize: 7, color: palette.textSecondary }}>{l}: <span style={{ color: palette.textPrimary }}>Apr 2026</span></div>)}
          </div>
          <div style={{ border: `1px solid ${palette.border}`, borderRadius: 4, overflow: "hidden", marginBottom: 8, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 6px", fontSize: 7, borderBottom: i < 2 ? `1px solid ${palette.border}` : "none", color: palette.textPrimary }}><span>Item {i + 1}</span><span>$XXX</span></div>)}
          </div>
          <div style={{ textAlign: "right", opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ fontSize: 7, color: palette.textSecondary }}>Total</div>
            <div style={{ fontSize: 10, fontWeight: 800, color: palette.textPrimary }}>${total.toFixed(2)}</div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Title Font Size", value: "22px / 800" },
        { label: "Cell Padding", value: "10px 16px" },
        { label: "Table Border Radius", value: radius },
        { label: "Status Badge Padding", value: "4px 12px" },
        { label: "Address Section Gap", value: "24px" },
        { label: "Total Border", value: "2px solid palette.primary" },
        { label: "Total Font Size", value: "16px / 800" },
      ]} />
    </motion.section>
  );
}
