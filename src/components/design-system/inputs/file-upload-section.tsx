"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface FileUploadSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function FileUploadSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: FileUploadSectionProps) {
  const comp = system.components;
  const [dragHover, setDragHover] = useState(false);
  const radius = comp.input.borderRadius || system.spacing.radius.md;

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };
  const showcaseBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: 12, padding: 24,
  };
  const tokenRow = (label: string, value: string) => (
    <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>
      {label}<br />
      <span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {value}</span>
    </div>
  );

  return (
    <motion.section id="comp-file-upload" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>File Upload</p>
      <p style={sectionDesc}>
        File upload components let users select and submit files from their device.
        They support drag-and-drop, progress indicators, and validation for file types and sizes.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: system.spacing.radius.lg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180 }}>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragHover(true); }}
            onDragLeave={() => setDragHover(false)}
            onDrop={(e) => { e.preventDefault(); setDragHover(false); }}
            style={{
              width: "100%", maxWidth: 400, padding: "40px 32px", textAlign: "center",
              border: `2px dashed ${dragHover ? palette.primary : palette.border}`,
              borderRadius: system.spacing.radius.lg,
              backgroundColor: dragHover ? palette.primary + "08" : palette.surfaceMuted,
              transition: "all 0.2s", cursor: "pointer",
            }}
          >
            <div style={{ color: dragHover ? palette.primary : palette.textSecondary, marginBottom: 12, display: "flex", justifyContent: "center" }}>
              <UploadIcon />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>
              Drag & drop files here
            </div>
            <div style={{ fontSize: 12, color: palette.textSecondary }}>
              or <span style={{ color: palette.primary, fontWeight: 500, cursor: "pointer" }}>browse</span> to upload
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 12 }}>
              PNG, JPG, PDF up to 10MB
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: system.spacing.radius.md, padding: 24, alignSelf: "start" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
          {tokenRow("Border Radius", system.spacing.radius.lg)}
          {tokenRow("Border Style", "2px dashed")}
          {tokenRow("Drag Active", "palette.primary @ 8%")}
          {tokenRow("Icon Size", "24px")}
          {tokenRow("Font Size", comp.input.fontSize || "13px")}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Drag & Drop Zone</div>
          <div style={{ padding: 24, border: `2px dashed ${palette.border}`, borderRadius: radius, textAlign: "center", backgroundColor: palette.surfaceMuted }}>
            <div style={{ color: palette.textSecondary, display: "flex", justifyContent: "center", marginBottom: 8 }}><UploadIcon /></div>
            <div style={{ fontSize: 13, color: palette.textSecondary }}>Drop files here</div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Button Trigger</div>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px",
            backgroundColor: palette.primary, color: "#fff", border: "none",
            borderRadius: comp.button.borderRadius || radius, fontSize: 13,
            fontWeight: Number(comp.button.fontWeight) || 600, cursor: "pointer",
          }}>
            <UploadIcon /> Upload File
          </button>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Avatar Upload</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              backgroundColor: palette.surfaceMuted, border: `2px dashed ${palette.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: palette.textSecondary,
            }}>
              <UploadIcon />
            </div>
            <div>
              <div style={{ fontSize: 13, color: palette.textPrimary, fontWeight: 500 }}>Upload photo</div>
              <div style={{ fontSize: 11, color: palette.textSecondary }}>JPG or PNG, max 2MB</div>
            </div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Multiple Files List</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["document.pdf", "image.png", "data.csv"].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", backgroundColor: palette.surfaceMuted, borderRadius: radius, fontSize: 12, color: palette.textPrimary }}>
                <span style={{ color: palette.primary, display: "flex" }}><FileIcon /></span>
                <span style={{ flex: 1 }}>{f}</span>
                <span style={{ color: palette.success, display: "flex" }}><CheckIcon /></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* States */}
      <div style={subsectionLabel}>States</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>Empty</div>
          <div style={{ padding: 20, border: `2px dashed ${palette.border}`, borderRadius: radius, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: palette.textSecondary }}>No files selected</div>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>Uploading</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", backgroundColor: palette.surfaceMuted, borderRadius: radius }}>
            <span style={{ color: palette.primary, display: "flex" }}><FileIcon /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: palette.textPrimary, marginBottom: 4 }}>report.pdf</div>
              <div style={{ height: 4, borderRadius: 2, backgroundColor: palette.border }}>
                <div style={{ width: "60%", height: "100%", borderRadius: 2, backgroundColor: palette.primary, transition: "width 0.3s" }} />
              </div>
            </div>
            <span style={{ fontSize: 11, color: palette.textSecondary }}>60%</span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>Completed</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", backgroundColor: palette.success + "10", borderRadius: radius, border: `1px solid ${palette.success}30` }}>
            <span style={{ color: palette.success, display: "flex" }}><FileIcon /></span>
            <span style={{ flex: 1, fontSize: 12, color: palette.textPrimary }}>report.pdf</span>
            <span style={{ color: palette.success, display: "flex" }}><CheckIcon /></span>
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 10 }}>Error</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", backgroundColor: palette.danger + "10", borderRadius: radius, border: `1px solid ${palette.danger}30` }}>
            <span style={{ color: palette.danger, display: "flex" }}><FileIcon /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: palette.textPrimary }}>large-video.mp4</div>
              <div style={{ fontSize: 11, color: palette.danger }}>File exceeds 10MB limit</div>
            </div>
          </div>
        </div>
      </div>

      {/* File Type Restrictions */}
      <div style={subsectionLabel}>File Type Restrictions</div>
      <div style={showcaseBox}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["PNG", "JPG", "SVG", "PDF", "CSV"].map((t) => (
            <span key={t} style={{
              padding: "4px 12px", fontSize: 11, fontWeight: 600, borderRadius: 999,
              backgroundColor: palette.primary + "12", color: palette.primary,
            }}>.{t}</span>
          ))}
          <span style={{ padding: "4px 12px", fontSize: 11, borderRadius: 999, backgroundColor: palette.surfaceMuted, color: palette.textSecondary }}>
            Max 10MB
          </span>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use file upload" description="File uploads are needed for submitting documents or media:" items={[
          "Profile photo or avatar selection",
          "Document attachments in forms",
          "Bulk data import via CSV/Excel",
          "Media galleries and content management",
        ]} />
        <UsageSection palette={palette} title="Handling uploads gracefully" description="Ensure a smooth file upload experience:" items={[
          "Validate file types and sizes before upload",
          "Show progress indicators for large files",
          "Allow cancellation of in-progress uploads",
          "Display clear error messages for failures",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show accepted file types and size limits before the user attempts to upload." },
        { type: "dont", text: "Don't silently reject files. Always explain why an upload failed." },
        { type: "do", text: "Provide a progress bar for uploads that take more than a second or two." },
        { type: "dont", text: "Don't allow uploading without any file validation — always check type and size." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "Drop zone", description: "Dashed border area for drag-and-drop", x: 0, y: 30 },
        { id: 2, label: "Icon", description: "Upload cloud/arrow icon", x: 50, y: 15 },
        { id: 3, label: "Primary text", description: "Main instruction (Drag & drop)", x: 50, y: 50 },
        { id: 4, label: "Browse link", description: "Clickable text to open file picker", x: 50, y: 65 },
        { id: 5, label: "Constraints", description: "Accepted file types and size limits", x: 50, y: 85 },
      ]} renderPreview={(h) => (
        <div style={{
          width: 280, padding: "24px 16px", textAlign: "center",
          border: `2px dashed ${palette.border}`, borderRadius: system.spacing.radius.lg,
          backgroundColor: palette.surfaceMuted,
          opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
        }}>
          <div style={{ color: palette.textSecondary, display: "flex", justifyContent: "center", marginBottom: 8, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            <UploadIcon />
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 4, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            Drag & drop files
          </div>
          <div style={{ fontSize: 12, color: palette.textSecondary, opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            or <span style={{ color: palette.primary }}>browse</span>
          </div>
          <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 8, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s" }}>
            PNG, JPG up to 10MB
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Drop Zone Min Height", value: "120px" },
        { label: "Drop Zone Padding", value: "32px" },
        { label: "Border Style", value: "2px dashed" },
        { label: "Border Radius", value: system.spacing.radius.lg },
        { label: "Icon Size", value: "24px" },
        { label: "File Item Height", value: "40px" },
        { label: "Progress Bar Height", value: "4px" },
      ]} />
    </motion.section>
  );
}
