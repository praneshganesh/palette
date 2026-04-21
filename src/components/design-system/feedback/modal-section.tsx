"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSModal, ModalPreviewContainer, ModalTriggerButton } from "./modal";
import type { ModalSize } from "./modal";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface ModalsSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function ModalsSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ModalsSectionProps) {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [sizeDemo, setSizeDemo] = useState<ModalSize | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    fontSize: 13,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.md,
    backgroundColor: palette.background,
    color: palette.textPrimary,
    outline: "none",
    boxSizing: "border-box",
  };

  const btnBase: React.CSSProperties = {
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 500,
    borderRadius: system.spacing.radius.md,
    cursor: "pointer",
    border: "none",
  };

  const primaryBtn: React.CSSProperties = {
    ...btnBase,
    backgroundColor: palette.primary,
    color: palette.background,
  };

  const outlinedBtn: React.CSSProperties = {
    ...btnBase,
    backgroundColor: "transparent",
    color: palette.textPrimary,
    border: `1px solid ${palette.border}`,
  };

  const dangerBtn: React.CSSProperties = {
    ...btnBase,
    backgroundColor: palette.danger,
    color: "#fff",
  };

  return (
    <motion.section
      id="comp-modals"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Modals</p>
      <p style={sectionDesc}>
        Modals focus the user&apos;s attention on a single task or piece of information
        by overlaying content on top of the main interface. Use them sparingly to
        preserve flow and avoid disruption.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Overlay Background", value: "rgba(0, 0, 0, 0.5)" },
          { label: "Container Background", value: "palette.surface" },
          { label: "Border Radius", value: "system.spacing.radius.lg" },
          { label: "Shadow", value: "system.spacing.elevation.lg" },
        ]}
      />

      {/* ──── Basic Modal ──── */}
      <div style={subsectionLabel}>Basic Modal</div>
      <ModalPreviewContainer palette={palette} system={system} height={320}>
        {!basicOpen && (
          <ModalTriggerButton palette={palette} system={system} onClick={() => setBasicOpen(true)}>
            Open Basic Modal
          </ModalTriggerButton>
        )}
        <DSModal
          system={system}
          palette={palette}
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          title={content.formFields.projectTitle || "Project Details"}
          description="Review the details below before proceeding."
          footer={
            <>
              <button style={outlinedBtn} onClick={() => setBasicOpen(false)}>Cancel</button>
              <button style={primaryBtn} onClick={() => setBasicOpen(false)}>Confirm</button>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            This is a basic modal dialog with a header, body content, and a footer with actions.
            It demonstrates the standard layout pattern used across the design system.
          </p>
        </DSModal>
      </ModalPreviewContainer>

      {/* ──── Confirmation Modal ──── */}
      <div style={subsectionLabel}>Confirmation Modal</div>
      <ModalPreviewContainer palette={palette} system={system} height={320}>
        {!confirmOpen && (
          <ModalTriggerButton palette={palette} system={system} onClick={() => setConfirmOpen(true)}>
            Open Confirmation
          </ModalTriggerButton>
        )}
        <DSModal
          system={system}
          palette={palette}
          variant="confirmation"
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Delete this item?"
          description="This action cannot be undone. All associated data will be permanently removed from the system."
          footer={
            <>
              <button style={outlinedBtn} onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button style={dangerBtn} onClick={() => setConfirmOpen(false)}>Delete</button>
            </>
          }
        />
      </ModalPreviewContainer>

      {/* ──── Form Modal ──── */}
      <div style={subsectionLabel}>Form Modal</div>
      <ModalPreviewContainer palette={palette} system={system} height={380}>
        {!formOpen && (
          <ModalTriggerButton palette={palette} system={system} onClick={() => setFormOpen(true)}>
            Open Form Modal
          </ModalTriggerButton>
        )}
        <DSModal
          system={system}
          palette={palette}
          variant="form"
          size="md"
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title={`New ${content.formFields.projectTitle || "Item"}`}
          footer={
            <>
              <button style={outlinedBtn} onClick={() => setFormOpen(false)}>Cancel</button>
              <button style={primaryBtn} onClick={() => setFormOpen(false)}>Create</button>
            </>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, display: "block", marginBottom: 4 }}>
                {content.formFields.ownerLabel || "Name"}
              </label>
              <input style={inputStyle} placeholder={content.formFields.ownerPlaceholder || "Enter name..."} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, display: "block", marginBottom: 4 }}>
                {content.formFields.descriptionLabel || "Description"}
              </label>
              <textarea
                style={{ ...inputStyle, minHeight: 70, resize: "vertical", fontFamily: "inherit" }}
                placeholder={content.formFields.descriptionPlaceholder || "Enter description..."}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: palette.textPrimary, display: "block", marginBottom: 4 }}>
                Category
              </label>
              <select style={inputStyle}>
                {content.formFields.categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </DSModal>
      </ModalPreviewContainer>

      {/* ──── Sizes ──── */}
      <div style={subsectionLabel}>Sizes</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
        {(["sm", "md", "lg", "fullscreen"] as ModalSize[]).map((sz) => (
          <button
            key={sz}
            onClick={() => setSizeDemo(sz)}
            style={{
              padding: "10px 16px",
              fontSize: 12,
              fontWeight: 500,
              color: palette.textPrimary,
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.md,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {sz}
          </button>
        ))}
      </div>
      <ModalPreviewContainer palette={palette} system={system} height={360}>
        {!sizeDemo && (
          <div style={{ fontSize: 12, color: palette.textSecondary }}>
            Click a size above to preview
          </div>
        )}
        {sizeDemo && (
          <DSModal
            system={system}
            palette={palette}
            size={sizeDemo}
            open={!!sizeDemo}
            onClose={() => setSizeDemo(null)}
            title={`${sizeDemo.charAt(0).toUpperCase() + sizeDemo.slice(1)} Modal`}
            description={`This modal uses the "${sizeDemo}" size variant.`}
            footer={
              <button style={primaryBtn} onClick={() => setSizeDemo(null)}>Close</button>
            }
          >
            <p style={{ margin: 0 }}>
              Modal content area. The width adjusts based on the selected size while the height
              is constrained to the preview container.
            </p>
          </DSModal>
        )}
      </ModalPreviewContainer>

      {/* ──── Usage ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use modals"
          description="Modals interrupt the user flow deliberately. Use them when:"
          items={[
            "The task requires focused attention",
            "A confirmation is needed before a destructive action",
            "Collecting a small amount of form data",
            "Displaying critical information that requires acknowledgement",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right size"
          description="Match the modal size to its content complexity:"
          items={[
            "Small — Simple confirmations and alerts",
            "Medium — Standard forms and information (default)",
            "Large — Complex forms, previews, multi-step flows",
            "Fullscreen — Immersive experiences, media, editors",
          ]}
        />
      </div>

      {/* ──── Do's and Don'ts ──── */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines
        palette={palette}
        items={[
          {
            type: "do",
            text: "Keep modals focused on a single task. Provide clear actions in the footer.",
          },
          {
            type: "dont",
            text: "Don't nest modals inside other modals. Use a multi-step flow or navigate instead.",
          },
          {
            type: "do",
            text: "Always provide a way to dismiss — close button, overlay click, or Escape key.",
          },
          {
            type: "dont",
            text: "Don't use modals for content that could live inline. Avoid modal fatigue.",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Overlay", description: "Semi-transparent backdrop that dims the page", x: 5, y: 15 },
          { id: 2, label: "Container", description: "The modal surface with elevation and border radius", x: 15, y: 50 },
          { id: 3, label: "Header", description: "Title, description, and optional close button", x: 40, y: 15 },
          { id: 4, label: "Body", description: "Scrollable content area", x: 60, y: 50 },
          { id: 5, label: "Footer", description: "Action buttons aligned to the end", x: 80, y: 85 },
          { id: 6, label: "Close button", description: "Dismiss control in the header corner", x: 92, y: 15 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ position: "relative", width: 320, height: 180 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.15)",
                borderRadius: system.spacing.radius.md,
                opacity: highlighted === 1 ? 1 : highlighted === null ? 0.5 : 0.2,
                transition: "opacity 0.2s",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 260,
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.lg,
                boxShadow: system.spacing.elevation.lg,
                overflow: "hidden",
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.7,
                transition: "opacity 0.2s",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid ${palette.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: highlighted === 3 || highlighted === 6 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary }}>Modal Title</div>
                <div style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: palette.border + "60" }} />
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  fontSize: 10,
                  color: palette.textSecondary,
                  opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                Body content area
              </div>
              <div
                style={{
                  padding: "8px 14px",
                  borderTop: `1px solid ${palette.border}`,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 6,
                  backgroundColor: palette.surfaceMuted,
                  opacity: highlighted === 5 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                <div style={{ width: 44, height: 20, borderRadius: 4, border: `1px solid ${palette.border}` }} />
                <div style={{ width: 52, height: 20, borderRadius: 4, backgroundColor: palette.primary }} />
              </div>
            </div>
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Small Width", value: "400px" },
          { label: "Medium Width", value: "540px" },
          { label: "Large Width", value: "720px" },
          { label: "Header Padding", value: "20px 24px" },
          { label: "Body Padding", value: "0 24px 20px" },
          { label: "Footer Padding", value: "16px 24px" },
        ]}
      />
    </motion.section>
  );
}
