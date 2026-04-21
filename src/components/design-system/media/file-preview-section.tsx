"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface FilePreviewSectionProps {
  system: DesignSystem; palette: PaletteTokenSet; content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties; sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties; fadeUp: Record<string, unknown>;
}

type FileItem = { name: string; type: string; size: string; icon: string; color: string; preview?: "image" | "pdf" | "doc" };

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

export function FilePreviewSection({ system, palette, content, sectionWrap, accentBar, sectionTitle, sectionDesc, fadeUp }: FilePreviewSectionProps) {
  const comp = system.components;
  const radius = system.spacing.radius;
  const subsectionLabel: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 20, marginTop: 56, paddingBottom: 12, borderBottom: `2px solid ${palette.primary}20` };
  const showcaseBox: React.CSSProperties = { backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 24 };

  const files: FileItem[] = [
    { name: "brand-guidelines.pdf", type: "PDF", size: "2.4 MB", icon: "📄", color: palette.danger, preview: "pdf" },
    { name: "hero-banner.png", type: "PNG", size: "1.8 MB", icon: "🖼", color: palette.info, preview: "image" },
    { name: "project-brief.docx", type: "DOCX", size: "340 KB", icon: "📝", color: palette.primary, preview: "doc" },
    { name: "data-export.csv", type: "CSV", size: "128 KB", icon: "📊", color: palette.success },
    { name: "design-tokens.json", type: "JSON", size: "12 KB", icon: "⚙", color: palette.warning },
  ];

  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const FileIcon = ({ file, size = 40 }: { file: FileItem; size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: radius.sm, backgroundColor: file.color + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5, flexShrink: 0 }}>{file.icon}</div>
  );

  const actionBtn: React.CSSProperties = { border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 6, borderRadius: radius.sm, color: palette.textSecondary };

  return (
    <motion.section id="comp-file-preview" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>File Preview</p>
      <p style={sectionDesc}>
        File preview cards display document metadata with type-specific icons, download actions, and inline preview panels for images, PDFs, and documents.
      </p>

      {/* Hero Preview + Tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ ...showcaseBox, borderRadius: radius.lg }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {(["list", "grid"] as const).map(m => (
              <button key={m} onClick={() => setViewMode(m)} style={{ padding: "4px 14px", borderRadius: radius.sm, border: `1px solid ${viewMode === m ? palette.primary : palette.border}`, backgroundColor: viewMode === m ? palette.primary + "10" : "transparent", color: viewMode === m ? palette.primary : palette.textSecondary, fontSize: 11, fontWeight: 500, cursor: "pointer", textTransform: "capitalize", fontFamily: "inherit" }}>{m}</button>
            ))}
          </div>
          {viewMode === "list" ? (
            <div>
              {files.map(f => (
                <div key={f.name} onClick={() => setSelectedFile(selectedFile?.name === f.name ? null : f)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${palette.border}`, cursor: "pointer", backgroundColor: selectedFile?.name === f.name ? palette.primary + "05" : "transparent", margin: "0 -8px", paddingLeft: 8, paddingRight: 8, borderRadius: selectedFile?.name === f.name ? radius.sm : 0 }}>
                  <FileIcon file={f} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: palette.textSecondary }}>{f.type} · {f.size}</div>
                  </div>
                  <button style={actionBtn}><EyeIcon /></button>
                  <button style={actionBtn}><DownloadIcon /></button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {files.map(f => (
                <div key={f.name} onClick={() => setSelectedFile(selectedFile?.name === f.name ? null : f)} style={{ padding: 12, border: `1px solid ${selectedFile?.name === f.name ? palette.primary : palette.border}`, borderRadius: radius.md, cursor: "pointer", textAlign: "center" }}>
                  <FileIcon file={f} size={48} />
                  <div style={{ fontSize: 11, fontWeight: 500, color: palette.textPrimary, marginTop: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: palette.textSecondary, marginTop: 2 }}>{f.size}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div style={{ backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 24, marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: palette.primary, marginBottom: 16, marginTop: 0 }}>Design Tokens</p>
            {[["Icon Size", "40px / 48px"], ["Border Radius", radius.md], ["Type Badge", "file color"], ["Text Size", "13px / 11px"], ["Action Btn", "6px padding"], ["Grid Cols", "3"]].map(([l, v]) => (
              <div key={l as string} style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 10 }}>{l}<br /><span style={{ fontFamily: "monospace", fontSize: 12, color: palette.textPrimary }}>→ {v}</span></div>
            ))}
          </div>
          {selectedFile && (
            <div style={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: radius.md, padding: 16, overflow: "hidden" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: palette.textPrimary, marginBottom: 12 }}>Preview</div>
              <div style={{ height: 120, borderRadius: radius.sm, backgroundColor: selectedFile.color + "10", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, border: `1px solid ${selectedFile.color}15` }}>
                {selectedFile.preview === "image" && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={selectedFile.color} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>}
                {selectedFile.preview === "pdf" && <div style={{ fontSize: 11, color: selectedFile.color, textAlign: "center" }}>📄<br />PDF Preview</div>}
                {selectedFile.preview === "doc" && <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "70%" }}>{[80, 60, 75].map((w, i) => <div key={i} style={{ height: 3, borderRadius: 1, backgroundColor: selectedFile.color + "30", width: `${w}%` }} />)}</div>}
                {!selectedFile.preview && <span style={{ fontSize: 11, color: palette.textSecondary }}>No preview</span>}
              </div>
              <div style={{ fontSize: 12, color: palette.textPrimary, fontWeight: 500, marginBottom: 4 }}>{selectedFile.name}</div>
              <div style={{ fontSize: 11, color: palette.textSecondary }}>{selectedFile.type} · {selectedFile.size}</div>
            </div>
          )}
        </div>
      </div>

      {/* Variants */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Compact Chip</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {files.slice(0, 3).map(f => (
              <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: radius.sm, border: `1px solid ${palette.border}`, backgroundColor: palette.surfaceMuted }}>
                <span style={{ fontSize: 14 }}>{f.icon}</span>
                <span style={{ fontSize: 11, color: palette.textPrimary, fontWeight: 500 }}>{f.name.split(".")[0]}</span>
                <span style={{ fontSize: 10, color: palette.textSecondary }}>.{f.name.split(".")[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={showcaseBox}>
          <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 16 }}>Upload Card</div>
          <div style={{ border: `2px dashed ${palette.border}`, borderRadius: radius.md, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📁</div>
            <div style={{ fontSize: 13, color: palette.textPrimary, fontWeight: 500 }}>Drop files here</div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginTop: 4 }}>or <span style={{ color: palette.primary, cursor: "pointer" }}>browse</span></div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use file preview" description="File previews are ideal for:" items={["Document management systems", "Chat attachment cards", "File upload confirmations", "Asset library browsers"]} />
        <UsageSection palette={palette} title="File preview best practices" description="Help users identify files:" items={["Use distinct icons per file type", "Show file size and format metadata", "Provide inline preview for images/PDFs", "Include download and open actions"]} />
      </div>

      {/* Guidelines */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use color-coded icons so users can identify file types at a glance." },
        { type: "dont", text: "Don't show a broken preview — fall back to the file type icon." },
        { type: "do", text: "Display file size to help users gauge download time." },
        { type: "dont", text: "Don't auto-download files on click — show preview first." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram palette={palette} parts={[
        { id: 1, label: "File icon", description: "Type-specific colored icon or emoji", x: 10, y: 40 },
        { id: 2, label: "File name", description: "Name with extension visible", x: 40, y: 30 },
        { id: 3, label: "Metadata", description: "Type, size, and date information", x: 40, y: 55 },
        { id: 4, label: "Actions", description: "Download, preview, and share buttons", x: 80, y: 40 },
        { id: 5, label: "Preview panel", description: "Inline or sidebar content preview", x: 80, y: 75 },
      ]} renderPreview={(h) => (
        <div style={{ width: 200, display: "flex", gap: 8 }}>
          <div style={{ flex: 1, border: `1px solid ${palette.border}`, borderRadius: 6, padding: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, backgroundColor: palette.danger + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>📄</div>
              <div>
                <div style={{ fontSize: 7, fontWeight: 600, color: palette.textPrimary, opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>file.pdf</div>
                <div style={{ fontSize: 6, color: palette.textSecondary, opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>PDF · 2.4 MB</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 6, justifyContent: "flex-end", opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: palette.surfaceMuted }} />
              <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: palette.surfaceMuted }} />
            </div>
          </div>
          <div style={{ width: 60, border: `1px solid ${palette.border}`, borderRadius: 6, padding: 4, opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity .2s" }}>
            <div style={{ width: "100%", height: 40, borderRadius: 3, backgroundColor: palette.danger + "10", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>📄</div>
          </div>
        </div>
      )} />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Icon Size", value: "40px (list) / 48px (grid)" },
        { label: "Row Padding", value: "10px 8px" },
        { label: "Grid Card Padding", value: "12px" },
        { label: "File Name Font", value: "13px / 500" },
        { label: "Metadata Font", value: "11px" },
        { label: "Action Button", value: "6px padding, 14px icon" },
        { label: "Preview Height", value: "120px" },
      ]} />
    </motion.section>
  );
}
