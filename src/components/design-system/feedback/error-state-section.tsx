"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface ErrorStateSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type ErrorVariant = "404" | "500" | "network" | "timeout" | "generic";

export function ErrorStateSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: ErrorStateSectionProps) {
  const comp = system.components;
  const [activeVariant, setActiveVariant] = useState<ErrorVariant>("404");
  const [retrying, setRetrying] = useState(false);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const actionBtn = (label: string, primary = true, onClick?: () => void): React.CSSProperties => ({
    padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    backgroundColor: primary ? palette.primary : "transparent",
    color: primary ? "#fff" : palette.textSecondary,
    border: primary ? "none" : `1px solid ${palette.border}`,
    borderRadius: comp.button.borderRadius || system.spacing.radius.md,
    fontFamily: system.typography.bodyFont,
  });

  const errorData: Record<ErrorVariant, { code: string; icon: string; title: string; desc: string; actions: string[] }> = {
    "404": {
      code: "404", icon: "🔎", title: "Page not found",
      desc: "The page you're looking for doesn't exist or has been moved. Check the URL or navigate back to the homepage.",
      actions: ["Go home", "Go back"],
    },
    "500": {
      code: "500", icon: "🔧", title: "Server error",
      desc: "Something went wrong on our end. Our team has been notified and is working to fix it.",
      actions: ["Retry", "Contact support"],
    },
    network: {
      code: "NET", icon: "📡", title: "Network error",
      desc: "Unable to reach the server. Please check your internet connection and try again.",
      actions: ["Retry", "Work offline"],
    },
    timeout: {
      code: "TMO", icon: "⏱", title: "Request timed out",
      desc: "The server took too long to respond. This might be due to heavy traffic. Please try again.",
      actions: ["Retry"],
    },
    generic: {
      code: "ERR", icon: "⚠", title: "Something went wrong",
      desc: "An unexpected error occurred. Please try again or contact support if the problem persists.",
      actions: ["Retry", "Contact support"],
    },
  };

  const variants: { id: ErrorVariant; label: string }[] = [
    { id: "404", label: "404 Not Found" },
    { id: "500", label: "500 Server Error" },
    { id: "network", label: "Network Error" },
    { id: "timeout", label: "Timeout" },
    { id: "generic", label: "Generic Error" },
  ];

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 1500);
  };

  const renderError = (variant: ErrorVariant, compact = false) => {
    const data = errorData[variant];
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: compact ? "24px 16px" : "48px 32px", textAlign: "center",
      }}>
        <div style={{
          fontSize: compact ? 28 : 48, fontWeight: 900, color: palette.danger + "25",
          fontFamily: system.typography.headingFont, letterSpacing: "-0.02em",
          marginBottom: compact ? 4 : 8, lineHeight: 1,
        }}>
          {data.code}
        </div>
        <div style={{
          width: compact ? 40 : 56, height: compact ? 40 : 56,
          borderRadius: system.spacing.radius.xl,
          backgroundColor: palette.danger + "10",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: compact ? 18 : 26, marginBottom: compact ? 12 : 20,
        }}>
          {data.icon}
        </div>
        <div style={{
          fontSize: compact ? 14 : 18, fontWeight: 700, color: palette.textPrimary,
          marginBottom: 8, fontFamily: system.typography.headingFont,
        }}>
          {data.title}
        </div>
        {!compact && (
          <div style={{
            fontSize: 13, color: palette.textSecondary, lineHeight: 1.6,
            marginBottom: 24, maxWidth: 400,
          }}>
            {data.desc}
          </div>
        )}
        {!compact && (
          <div style={{ display: "flex", gap: 10 }}>
            {data.actions.map((a, i) => (
              <button key={i} onClick={i === 0 ? handleRetry : undefined} style={actionBtn(a, i === 0)}>
                {retrying && i === 0 ? "Retrying..." : a}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.section id="comp-error-state" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Error States</p>
      <p style={sectionDesc}>
        Error states communicate that something went wrong and guide users toward resolution.
        Different error types require different messaging and available actions.
      </p>

      {/* Variant Switcher */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {variants.map(v => (
          <button key={v.id} onClick={() => setActiveVariant(v.id)} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: activeVariant === v.id ? 600 : 400,
            cursor: "pointer",
            color: activeVariant === v.id ? palette.danger : palette.textSecondary,
            backgroundColor: activeVariant === v.id ? palette.danger + "10" : palette.surfaceMuted,
            border: `1px solid ${activeVariant === v.id ? palette.danger + "30" : palette.border}`,
            borderRadius: system.spacing.radius.md, fontFamily: system.typography.bodyFont,
          }}>
            {v.label}
          </button>
        ))}
      </div>
      <div style={previewBox}>{renderError(activeVariant)}</div>

      {/* All Variants Grid */}
      <div style={subsectionLabel}>All Variants (Compact)</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {(["404", "500", "network", "timeout", "generic"] as ErrorVariant[]).map(v => (
          <div key={v} style={{ ...previewBox, padding: 0 }}>
            {renderError(v, true)}
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use error states" description="Show error states when:" items={[
          "A page or resource can't be found (404)",
          "The server fails to process a request (500)",
          "The user's network connection is lost",
          "A request exceeds the timeout threshold",
        ]} />
        <UsageSection palette={palette} title="Action guidelines" description="Always offer next steps:" items={[
          "Retry — For transient errors (network, timeout)",
          "Go home — For navigation errors (404)",
          "Contact support — For persistent server errors",
          "Work offline — When offline mode is available",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Use friendly, non-technical language. Explain what happened and what the user can do." },
        { type: "dont", text: "Don't show raw error codes or stack traces to end users. Log those separately." },
        { type: "do", text: "Provide a retry action for transient errors. Many errors resolve on a second attempt." },
        { type: "dont", text: "Don't blame the user. Say 'Something went wrong' instead of 'You did something wrong'." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Error code", description: "Large background code for quick identification", x: 50, y: 8 },
          { id: 2, label: "Illustration", description: "Icon or graphic representing the error type", x: 50, y: 28 },
          { id: 3, label: "Title", description: "Human-readable error summary", x: 50, y: 50 },
          { id: 4, label: "Description", description: "Explanation and guidance for the user", x: 50, y: 68 },
          { id: 5, label: "Actions", description: "Retry, navigate, or contact support buttons", x: 50, y: 88 },
        ]}
        renderPreview={(h) => (
          <div style={{ textAlign: "center", width: 220 }}>
            <div style={{
              fontSize: 32, fontWeight: 900, color: palette.danger + "20", lineHeight: 1,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>404</div>
            <div style={{
              width: 36, height: 36, borderRadius: system.spacing.radius.lg,
              backgroundColor: palette.danger + "10", margin: "8px auto",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>🔎</div>
            <div style={{
              fontSize: 13, fontWeight: 700, color: palette.textPrimary, marginBottom: 4,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Page not found</div>
            <div style={{
              fontSize: 11, color: palette.textSecondary, marginBottom: 12, lineHeight: 1.4,
              opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>The page doesn&apos;t exist</div>
            <div style={{
              display: "inline-block", padding: "5px 14px", fontSize: 11, fontWeight: 600,
              backgroundColor: palette.primary, color: "#fff",
              borderRadius: comp.button.borderRadius || system.spacing.radius.md,
              opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Go home</div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Error Code Size", value: "48px / 900 weight" },
        { label: "Icon Container", value: "56px" },
        { label: "Title Size", value: "18px / 700 weight" },
        { label: "Content Max Width", value: "400px" },
        { label: "Padding", value: "48px 32px" },
      ]} />
    </motion.section>
  );
}
