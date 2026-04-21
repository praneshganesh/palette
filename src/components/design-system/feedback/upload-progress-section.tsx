"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface UploadProgressSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

interface UploadFile {
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "complete" | "error" | "queued";
  type: string;
}

export function UploadProgressSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: UploadProgressSectionProps) {
  const comp = system.components;
  const [singleProgress, setSingleProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [circularProgress, setCircularProgress] = useState(68);

  const [files, setFiles] = useState<UploadFile[]>([
    { name: "hero-image.png", size: "2.4 MB", progress: 100, status: "complete", type: "image" },
    { name: "presentation.pdf", size: "8.1 MB", progress: 67, status: "uploading", type: "pdf" },
    { name: "data-export.csv", size: "1.2 MB", progress: 23, status: "uploading", type: "csv" },
    { name: "backup.zip", size: "45 MB", progress: 0, status: "queued", type: "zip" },
    { name: "report-final.docx", size: "3.5 MB", progress: 0, status: "error", type: "doc" },
  ]);

  useEffect(() => {
    if (!isUploading) return;
    const timer = setInterval(() => {
      setSingleProgress(p => {
        if (p >= 100) { setIsUploading(false); return 100; }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [isUploading]);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const fileIcons: Record<string, string> = {
    image: "🖼", pdf: "📄", csv: "📊", zip: "📦", doc: "📝",
  };

  const statusColors: Record<string, string> = {
    uploading: palette.primary, complete: palette.success,
    error: palette.danger, queued: palette.textSecondary,
  };

  const startUpload = () => {
    setSingleProgress(0);
    setIsUploading(true);
  };

  const retryFile = (idx: number) => {
    setFiles(prev => prev.map((f, i) => i === idx ? { ...f, status: "uploading", progress: 0 } : f));
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (circularProgress / 100) * circumference;

  return (
    <motion.section id="comp-upload-progress" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Upload Progress</p>
      <p style={sectionDesc}>
        Upload progress components show the status of file uploads with progress bars, file
        info, and actions for canceling or retrying. Supports single and multi-file uploads.
      </p>

      {/* Single File */}
      <div style={subsectionLabel}>Single File</div>
      <div style={{ ...previewBox, maxWidth: 420 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: system.spacing.radius.md,
            backgroundColor: palette.primary + "10",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>📄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>design-spec.pdf</div>
            <div style={{ fontSize: 11, color: palette.textSecondary }}>
              {singleProgress < 100 ? `${(4.2 * singleProgress / 100).toFixed(1)} / 4.2 MB` : "4.2 MB · Complete"}
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: singleProgress >= 100 ? palette.success : palette.primary }}>
            {singleProgress >= 100 ? "✓" : `${singleProgress}%`}
          </div>
        </div>
        <div style={{
          height: 6, backgroundColor: palette.border + "40", borderRadius: 3, overflow: "hidden", marginBottom: 12,
        }}>
          <div style={{
            height: "100%", borderRadius: 3, transition: "width 0.1s linear",
            width: `${singleProgress}%`,
            backgroundColor: singleProgress >= 100 ? palette.success : palette.primary,
          }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={startUpload} disabled={isUploading} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: 500, cursor: isUploading ? "not-allowed" : "pointer",
            backgroundColor: palette.primary, color: "#fff", border: "none",
            borderRadius: comp.button.borderRadius || system.spacing.radius.md,
            opacity: isUploading ? 0.6 : 1,
          }}>
            {isUploading ? "Uploading..." : singleProgress >= 100 ? "Upload again" : "Start upload"}
          </button>
          {isUploading && (
            <button onClick={() => { setIsUploading(false); setSingleProgress(0); }} style={{
              padding: "6px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer",
              backgroundColor: "transparent", color: palette.danger,
              border: `1px solid ${palette.danger}30`,
              borderRadius: comp.button.borderRadius || system.spacing.radius.md,
            }}>Cancel</button>
          )}
        </div>
      </div>

      {/* Multiple Files List */}
      <div style={subsectionLabel}>Multiple Files List</div>
      <div style={{ ...previewBox, maxWidth: 480 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary, marginBottom: 4 }}>
          Uploading {files.filter(f => f.status === "uploading").length} of {files.length} files
        </div>
        <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 16 }}>
          {files.filter(f => f.status === "complete").length} complete · {files.filter(f => f.status === "error").length} failed
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {files.map((file, idx) => (
            <div key={idx} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              borderRadius: system.spacing.radius.md,
              backgroundColor: file.status === "error" ? palette.danger + "05" : palette.surfaceMuted,
              border: `1px solid ${file.status === "error" ? palette.danger + "20" : palette.border}`,
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{fileIcons[file.type]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <div style={{ flex: 1, height: 3, backgroundColor: palette.border + "40", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 2, transition: "width 0.3s",
                      width: `${file.progress}%`,
                      backgroundColor: statusColors[file.status],
                    }} />
                  </div>
                  <span style={{ fontSize: 10, color: palette.textSecondary, flexShrink: 0 }}>{file.size}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                {file.status === "error" && (
                  <button onClick={() => retryFile(idx)} style={{
                    padding: "3px 8px", fontSize: 10, cursor: "pointer",
                    backgroundColor: "transparent", color: palette.primary,
                    border: `1px solid ${palette.primary}30`, borderRadius: 4,
                  }}>Retry</button>
                )}
                {file.status === "complete" && (
                  <span style={{ fontSize: 14, color: palette.success }}>✓</span>
                )}
                {file.status === "queued" && (
                  <span style={{ fontSize: 10, color: palette.textSecondary }}>Queued</span>
                )}
                <button onClick={() => removeFile(idx)} style={{
                  width: 20, height: 20, padding: 0, fontSize: 10, cursor: "pointer",
                  backgroundColor: "transparent", color: palette.textSecondary,
                  border: "none", borderRadius: 4, display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Circular Progress */}
      <div style={subsectionLabel}>Circular Progress</div>
      <div style={{ ...previewBox, display: "flex", alignItems: "center", gap: 32 }}>
        <div style={{ position: "relative", width: 96, height: 96 }}>
          <svg width="96" height="96" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="48" cy="48" r="40" fill="none" stroke={palette.border + "40"} strokeWidth="6" />
            <circle cx="48" cy="48" r="40" fill="none" stroke={palette.primary} strokeWidth="6"
              strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.3s" }} />
          </svg>
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: palette.textPrimary }}>{circularProgress}%</span>
            <span style={{ fontSize: 9, color: palette.textSecondary }}>uploading</span>
          </div>
        </div>
        <div>
          <input type="range" min="0" max="100" value={circularProgress}
            onChange={(e) => setCircularProgress(Number(e.target.value))}
            style={{ width: 160, accentColor: palette.primary }}
          />
          <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 4 }}>
            Drag to simulate progress
          </div>
        </div>
      </div>

      {/* With Thumbnail */}
      <div style={subsectionLabel}>With Thumbnail</div>
      <div style={{ ...previewBox, maxWidth: 420 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: system.spacing.radius.md,
            backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, overflow: "hidden",
          }}>🖼</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>photo-vacation.jpg</div>
            <div style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 6 }}>12.4 MB · 4032×3024</div>
            <div style={{ height: 4, backgroundColor: palette.border + "40", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "82%", backgroundColor: palette.primary, borderRadius: 2 }} />
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: palette.primary }}>82%</span>
        </div>
      </div>

      {/* Queue View */}
      <div style={subsectionLabel}>Queue View</div>
      <div style={{ ...previewBox, maxWidth: 360 }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${palette.border}`,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Upload Queue</div>
            <div style={{ fontSize: 11, color: palette.textSecondary }}>3 remaining</div>
          </div>
          <button style={{
            padding: "4px 12px", fontSize: 11, cursor: "pointer",
            backgroundColor: "transparent", color: palette.danger,
            border: `1px solid ${palette.danger}20`, borderRadius: system.spacing.radius.sm,
          }}>Cancel all</button>
        </div>
        {[
          { name: "file-01.png", progress: 100, status: "✓" },
          { name: "file-02.png", progress: 45, status: "45%" },
          { name: "file-03.png", progress: 0, status: "Queued" },
          { name: "file-04.png", progress: 0, status: "Queued" },
        ].map((f, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
            fontSize: 12, color: palette.textPrimary, borderBottom: i < 3 ? `1px solid ${palette.border}40` : "none",
          }}>
            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
            <div style={{ width: 60, height: 3, backgroundColor: palette.border + "40", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${f.progress}%`, backgroundColor: f.progress === 100 ? palette.success : palette.primary, borderRadius: 2 }} />
            </div>
            <span style={{
              fontSize: 10, fontWeight: 500, minWidth: 36, textAlign: "right",
              color: f.progress === 100 ? palette.success : f.progress > 0 ? palette.primary : palette.textSecondary,
            }}>{f.status}</span>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to show upload progress" description="Use for any file upload operation:" items={[
          "Single file uploads (documents, images)",
          "Batch file uploads with queue management",
          "Large file uploads that take more than a few seconds",
          "Background uploads with progress tracking",
        ]} />
        <UsageSection palette={palette} title="Feature checklist" description="Upload UIs should include:" items={[
          "Progress bar with percentage",
          "File name, size, and type",
          "Cancel button during upload",
          "Retry button on failure",
          "Remove/dismiss for completed files",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Show file size and estimated time remaining for large uploads." },
        { type: "dont", text: "Don't auto-dismiss completed uploads immediately. Let users verify success." },
        { type: "do", text: "Allow canceling individual files without affecting the entire batch." },
        { type: "dont", text: "Don't block the UI during upload. Let users continue working while files upload in the background." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "File icon", description: "Type-specific icon or thumbnail", x: 8, y: 35 },
          { id: 2, label: "File info", description: "Name, size, and type metadata", x: 35, y: 15 },
          { id: 3, label: "Progress bar", description: "Horizontal bar showing upload percentage", x: 50, y: 60 },
          { id: 4, label: "Percentage", description: "Numeric progress indicator", x: 85, y: 35 },
          { id: 5, label: "Actions", description: "Cancel, retry, or remove buttons", x: 85, y: 75 },
        ]}
        renderPreview={(h) => (
          <div style={{ display: "flex", alignItems: "center", gap: 10, width: 280 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 6,
              backgroundColor: palette.primary + "10",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>📄</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 11, fontWeight: 500, color: palette.textPrimary,
                opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>file.pdf · 4.2 MB</div>
              <div style={{
                height: 3, backgroundColor: palette.border + "40", borderRadius: 2,
                overflow: "hidden", marginTop: 4,
                opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>
                <div style={{ height: "100%", width: "67%", backgroundColor: palette.primary, borderRadius: 2 }} />
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, color: palette.primary,
              opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>67%</span>
            <span style={{
              fontSize: 9, color: palette.textSecondary, cursor: "pointer",
              opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>✕</span>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "File Icon Size", value: "40px" },
        { label: "Progress Bar Height", value: "6px (single) / 3px (list)" },
        { label: "Circular Size", value: "96px" },
        { label: "File Row Padding", value: "10px 12px" },
        { label: "Thumbnail Size", value: "56px" },
      ]} />
    </motion.section>
  );
}
