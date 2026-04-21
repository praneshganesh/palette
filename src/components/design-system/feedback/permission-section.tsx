"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface PermissionSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

type PermVariant = "denied" | "login" | "role" | "subscription";

export function PermissionSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: PermissionSectionProps) {
  const comp = system.components;
  const [activeVariant, setActiveVariant] = useState<PermVariant>("denied");
  const [requested, setRequested] = useState(false);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, padding: 24,
  };

  const primaryBtn = (label: string, onClick?: () => void): React.CSSProperties => ({
    padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    backgroundColor: palette.primary, color: "#fff", border: "none",
    borderRadius: comp.button.borderRadius || system.spacing.radius.md,
    fontFamily: system.typography.bodyFont,
  });

  const secondaryBtn = (label: string): React.CSSProperties => ({
    padding: `${comp.button.paddingY || "10px"} ${comp.button.paddingX || "20px"}`,
    fontSize: 13, fontWeight: 500, cursor: "pointer",
    backgroundColor: "transparent", color: palette.textSecondary,
    border: `1px solid ${palette.border}`,
    borderRadius: comp.button.borderRadius || system.spacing.radius.md,
    fontFamily: system.typography.bodyFont,
  });

  const variants: { id: PermVariant; label: string }[] = [
    { id: "denied", label: "Access Denied" },
    { id: "login", label: "Login Required" },
    { id: "role", label: "Role Insufficient" },
    { id: "subscription", label: "Subscription Required" },
  ];

  const renderVariant = () => {
    switch (activeVariant) {
      case "denied":
        return (
          <div style={{ textAlign: "center", padding: "48px 32px" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              backgroundColor: palette.danger + "10",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, margin: "0 auto 20px",
            }}>🔒</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
              Access Denied
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>
              You don&apos;t have permission to access this resource. If you believe this is an error,
              contact your administrator.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <button onClick={() => setRequested(true)} style={primaryBtn("Request access")}>
                {requested ? "✓ Request sent" : "Request access"}
              </button>
              <button style={secondaryBtn("Go back")}>Go back</button>
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: palette.textSecondary }}>
              Need help? <span style={{ color: palette.primary, cursor: "pointer" }}>Contact admin</span>
            </div>
          </div>
        );
      case "login":
        return (
          <div style={{ textAlign: "center", padding: "48px 32px" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              backgroundColor: palette.primary + "10",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, margin: "0 auto 20px",
            }}>👤</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
              Login Required
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>
              You need to be signed in to view this content. Log in with your account or create one to continue.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <button style={primaryBtn("Sign in")}>Sign in</button>
              <button style={secondaryBtn("Create account")}>Create account</button>
            </div>
          </div>
        );
      case "role":
        return (
          <div style={{ textAlign: "center", padding: "48px 32px" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              backgroundColor: palette.warning + "10",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, margin: "0 auto 20px",
            }}>🛡</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
              Insufficient Permissions
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16, maxWidth: 380, margin: "0 auto 16px" }}>
              Your current role doesn&apos;t have access to this section. You need elevated privileges to continue.
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: system.spacing.radius.md,
              backgroundColor: palette.warning + "08", border: `1px solid ${palette.warning}20`,
              fontSize: 12, color: palette.warning, marginBottom: 24,
            }}>
              <span>⚠</span> Required role: <strong>Admin</strong> &middot; Your role: <strong>Viewer</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <button onClick={() => setRequested(true)} style={primaryBtn("Request upgrade")}>
                {requested ? "✓ Requested" : "Request role upgrade"}
              </button>
              <button style={secondaryBtn("Go back")}>Go back</button>
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: palette.textSecondary }}>
              <span style={{ color: palette.primary, cursor: "pointer" }}>Contact admin</span> for role changes
            </div>
          </div>
        );
      case "subscription":
        return (
          <div style={{ textAlign: "center", padding: "48px 32px" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              backgroundColor: palette.secondary + "15",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, margin: "0 auto 20px",
            }}>⭐</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 8, fontFamily: system.typography.headingFont }}>
              Premium Feature
            </div>
            <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>
              This feature is available on our Pro plan. Upgrade your subscription to unlock
              advanced capabilities and premium support.
            </div>
            <div style={{
              backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
              borderRadius: system.spacing.radius.md, padding: 16, marginBottom: 24,
              maxWidth: 280, margin: "0 auto 24px",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, color: palette.primary, letterSpacing: "0.05em", marginBottom: 8 }}>Pro Plan</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: palette.textPrimary, marginBottom: 4 }}>
                $29<span style={{ fontSize: 13, fontWeight: 400, color: palette.textSecondary }}>/mo</span>
              </div>
              <div style={{ fontSize: 12, color: palette.textSecondary }}>Billed annually</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <button style={primaryBtn("Upgrade now")}>Upgrade now</button>
              <button style={secondaryBtn("Compare plans")}>Compare plans</button>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.section id="comp-permission" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Permission States</p>
      <p style={sectionDesc}>
        Permission states inform users when they lack the access rights to view or interact
        with content. They explain why and provide paths to resolution.
      </p>

      {/* Variant Switcher */}
      <div style={subsectionLabel}>Variants</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {variants.map(v => (
          <button key={v.id} onClick={() => { setActiveVariant(v.id); setRequested(false); }} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: activeVariant === v.id ? 600 : 400,
            cursor: "pointer",
            color: activeVariant === v.id ? palette.primary : palette.textSecondary,
            backgroundColor: activeVariant === v.id ? palette.primary + "10" : palette.surfaceMuted,
            border: `1px solid ${activeVariant === v.id ? palette.primary + "30" : palette.border}`,
            borderRadius: system.spacing.radius.md, fontFamily: system.typography.bodyFont,
          }}>
            {v.label}
          </button>
        ))}
      </div>
      <div style={previewBox}>{renderVariant()}</div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to show permission states" description="Use when a user can't access content:" items={[
          "Unauthorized access to a resource",
          "Session expired or user not logged in",
          "Role-based access restrictions",
          "Feature gated behind a paid plan",
        ]} />
        <UsageSection palette={palette} title="Resolution paths" description="Always offer a clear next step:" items={[
          "Access denied — Request access or contact admin",
          "Login required — Sign in or create account",
          "Role insufficient — Request role upgrade",
          "Subscription — Upgrade or compare plans",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Explain clearly why access is denied and who can grant it. Transparency builds trust." },
        { type: "dont", text: "Don't show sensitive information about what the restricted content contains." },
        { type: "do", text: "Provide a 'Request access' action so users can self-serve without manual email." },
        { type: "dont", text: "Don't make the user feel punished. Use neutral, helpful language instead of stern warnings." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Lock icon", description: "Visual indicator of restricted access", x: 50, y: 10 },
          { id: 2, label: "Title", description: "Clear statement about the restriction", x: 50, y: 30 },
          { id: 3, label: "Message", description: "Explanation and guidance for resolution", x: 50, y: 50 },
          { id: 4, label: "Action button", description: "Primary path to resolve the restriction", x: 35, y: 80 },
          { id: 5, label: "Contact link", description: "Secondary help option", x: 70, y: 80 },
        ]}
        renderPreview={(h) => (
          <div style={{ textAlign: "center", width: 220 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              backgroundColor: palette.danger + "10", margin: "0 auto 10px",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
              opacity: h === 1 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>🔒</div>
            <div style={{
              fontSize: 13, fontWeight: 700, color: palette.textPrimary, marginBottom: 4,
              opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>Access Denied</div>
            <div style={{
              fontSize: 11, color: palette.textSecondary, marginBottom: 12, lineHeight: 1.4,
              opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
            }}>You don&apos;t have permission</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <div style={{
                padding: "5px 12px", fontSize: 11, fontWeight: 600,
                backgroundColor: palette.primary, color: "#fff",
                borderRadius: comp.button.borderRadius || system.spacing.radius.md,
                opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>Request</div>
              <div style={{
                fontSize: 11, color: palette.primary, alignSelf: "center",
                opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>Contact</div>
            </div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Icon Container", value: "64px (circle)" },
        { label: "Content Max Width", value: "380px" },
        { label: "Padding", value: "48px 32px" },
        { label: "Title Size", value: "18px / 700 weight" },
        { label: "Description Size", value: "13px" },
      ]} />
    </motion.section>
  );
}
