"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { MeasurementsTable } from "../shared/measurements";

interface FooterSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function FooterSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: FooterSectionProps) {
  const comp = system.components;
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: palette.textPrimary,
    marginBottom: 20, marginTop: 56, paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg, overflow: "hidden",
  };

  const footerBase: React.CSSProperties = {
    backgroundColor: palette.surface, padding: "32px 24px",
    fontFamily: system.typography.bodyFont,
  };

  const colTitle: React.CSSProperties = {
    fontSize: 13, fontWeight: 700, color: palette.textPrimary, marginBottom: 12,
  };

  const footerLink = (key: string): React.CSSProperties => ({
    fontSize: 13, color: hoveredLink === key ? palette.primary : palette.textSecondary,
    cursor: "pointer", padding: "3px 0", display: "block",
    transition: "color 0.15s",
  });

  const socialIcon: React.CSSProperties = {
    width: 32, height: 32, borderRadius: "50%",
    backgroundColor: palette.surfaceMuted, border: `1px solid ${palette.border}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 14, cursor: "pointer", transition: "all 0.15s",
  };

  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Support", links: ["Help Center", "Documentation", "API Status", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookie Policy", "Licenses"] },
  ];

  const socialIcons = ["𝕏", "▶", "in", "◉"];

  return (
    <motion.section id="comp-footer" data-comp-section {...fadeUp} transition={{ delay: 0 }} style={sectionWrap(false)}>
      <div style={accentBar} />
      <p style={sectionTitle}>Footer</p>
      <p style={sectionDesc}>
        Footers provide secondary navigation, legal links, contact information, and brand elements.
        They anchor the bottom of every page and vary from minimal to full multi-column layouts.
      </p>

      {/* Simple */}
      <div style={subsectionLabel}>Simple</div>
      <div style={previewBox}>
        <div style={{ ...footerBase, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary }}>
            {content.orgName || "Acme Inc"}
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["About", "Blog", "Contact", "Privacy"].map((l, i) => (
              <span key={i} style={footerLink(`simple-${i}`)}
                onMouseEnter={() => setHoveredLink(`simple-${i}`)}
                onMouseLeave={() => setHoveredLink(null)}
              >{l}</span>
            ))}
          </div>
          <div style={{ fontSize: 12, color: palette.textSecondary }}>
            © 2026 {content.orgName || "Acme Inc"}
          </div>
        </div>
      </div>

      {/* Multi-Column Links */}
      <div style={subsectionLabel}>Multi-Column Links</div>
      <div style={previewBox}>
        <div style={footerBase}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(4, 1fr)", gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, marginBottom: 8 }}>
                {content.orgName || "Acme"}
              </div>
              <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6 }}>
                Building the future of design systems, one component at a time.
              </div>
            </div>
            {columns.map((col, ci) => (
              <div key={ci}>
                <div style={colTitle}>{col.title}</div>
                {col.links.map((link, li) => (
                  <span key={li} style={footerLink(`multi-${ci}-${li}`)}
                    onMouseEnter={() => setHoveredLink(`multi-${ci}-${li}`)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >{link}</span>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: palette.textSecondary }}>
              © 2026 {content.orgName || "Acme Inc"}. All rights reserved.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {socialIcons.map((icon, i) => (
                <div key={i} style={socialIcon}>{icon}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* With Newsletter */}
      <div style={subsectionLabel}>With Newsletter</div>
      <div style={previewBox}>
        <div style={footerBase}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 32 }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {columns.slice(0, 2).map((col, ci) => (
                  <div key={ci}>
                    <div style={colTitle}>{col.title}</div>
                    {col.links.map((link, li) => (
                      <span key={li} style={footerLink(`news-${ci}-${li}`)}
                        onMouseEnter={() => setHoveredLink(`news-${ci}-${li}`)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >{link}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={colTitle}>Stay up to date</div>
              <div style={{ fontSize: 13, color: palette.textSecondary, marginBottom: 12, lineHeight: 1.5 }}>
                Subscribe to our newsletter for product updates and design tips.
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{
                    flex: 1, padding: `${comp.input.paddingY || "8px"} ${comp.input.paddingX || "12px"}`,
                    fontSize: 13, border: `1px solid ${palette.border}`,
                    borderRadius: comp.input.borderRadius || system.spacing.radius.md,
                    backgroundColor: palette.background, color: palette.textPrimary,
                    outline: "none", fontFamily: system.typography.bodyFont,
                  }}
                />
                <button
                  onClick={() => { setSubscribed(true); setEmailInput(""); }}
                  style={{
                    padding: `${comp.button.paddingY || "8px"} ${comp.button.paddingX || "16px"}`,
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    backgroundColor: palette.primary, color: "#fff", border: "none",
                    borderRadius: comp.button.borderRadius || system.spacing.radius.md,
                  }}
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <div style={{ fontSize: 12, color: palette.success, marginTop: 8 }}>
                  ✓ You&apos;re subscribed!
                </div>
              )}
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 16, fontSize: 12, color: palette.textSecondary }}>
            © 2026 {content.orgName || "Acme Inc"}. All rights reserved.
          </div>
        </div>
      </div>

      {/* With Social Icons */}
      <div style={subsectionLabel}>With Social Icons</div>
      <div style={previewBox}>
        <div style={{ ...footerBase, textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: palette.textPrimary, marginBottom: 16 }}>
            {content.orgName || "Acme"}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 20 }}>
            {["About", "Blog", "Careers", "Contact", "Privacy"].map((l, i) => (
              <span key={i} style={footerLink(`social-${i}`)}
                onMouseEnter={() => setHoveredLink(`social-${i}`)}
                onMouseLeave={() => setHoveredLink(null)}
              >{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
            {socialIcons.map((icon, i) => (
              <div key={i} style={socialIcon}>{icon}</div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: palette.textSecondary }}>
            © 2026 {content.orgName || "Acme Inc"}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Minimal */}
      <div style={subsectionLabel}>Minimal (Copyright Only)</div>
      <div style={previewBox}>
        <div style={{ ...footerBase, textAlign: "center", padding: "20px 24px" }}>
          <div style={{ fontSize: 12, color: palette.textSecondary }}>
            © 2026 {content.orgName || "Acme Inc"}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection palette={palette} title="When to use which footer" description="Match footer complexity to site needs:" items={[
          "Minimal — SaaS dashboards, internal tools",
          "Simple — Landing pages, small sites",
          "Multi-column — Marketing sites, product pages",
          "Newsletter — Content-driven sites, blogs",
        ]} />
        <UsageSection palette={palette} title="Content guidelines" description="Keep footer content organized:" items={[
          "Group links into logical categories (Product, Legal, etc.)",
          "Always include copyright and legal links",
          "Place newsletter signup prominently if applicable",
          "Keep social icons in a consistent row with adequate spacing",
        ]} />
      </div>

      {/* Do's and Don'ts */}
      <div style={subsectionLabel}>Do&apos;s and Don&apos;ts</div>
      <Guidelines palette={palette} items={[
        { type: "do", text: "Keep the footer consistent across all pages. It's a site-wide landmark." },
        { type: "dont", text: "Don't overload the footer with too many links. Use a sitemap page for exhaustive navigation." },
        { type: "do", text: "Include accessibility-required links: privacy policy, terms, and contact information." },
        { type: "dont", text: "Don't duplicate the main navigation in the footer verbatim. Offer complementary links." },
      ]} />

      {/* Anatomy */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Full-width wrapper with background", x: 50, y: 85 },
          { id: 2, label: "Brand area", description: "Logo, tagline, or company name", x: 10, y: 15 },
          { id: 3, label: "Link columns", description: "Grouped navigation links", x: 50, y: 25 },
          { id: 4, label: "Social bar", description: "Social media icon links", x: 85, y: 55 },
          { id: 5, label: "Copyright", description: "Legal text and copyright notice", x: 50, y: 55 },
        ]}
        renderPreview={(h) => (
          <div style={{
            width: 340, padding: 16, backgroundColor: palette.surface,
            borderRadius: system.spacing.radius.md, border: `1px solid ${palette.border}`,
            opacity: h === 1 ? 1 : h === null ? 1 : 0.8, transition: "opacity 0.2s",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginBottom: 12 }}>
              <div style={{
                opacity: h === 2 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: palette.textPrimary }}>Acme</div>
                <div style={{ fontSize: 10, color: palette.textSecondary, marginTop: 2 }}>Building the future</div>
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
                opacity: h === 3 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>
                {["Product", "Company"].map((t, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: palette.textSecondary, marginBottom: 4 }}>{t}</div>
                    {["Link 1", "Link 2"].map((l, j) => (
                      <div key={j} style={{ fontSize: 10, color: palette.textSecondary, padding: "1px 0" }}>{l}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{
                fontSize: 9, color: palette.textSecondary,
                opacity: h === 5 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>© 2026 Acme Inc.</div>
              <div style={{
                display: "flex", gap: 4,
                opacity: h === 4 ? 1 : h === null ? 1 : 0.3, transition: "opacity 0.2s",
              }}>
                {["𝕏", "in", "◉"].map((ic, i) => (
                  <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: palette.surfaceMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>{ic}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      />

      {/* Measurements */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable palette={palette} attributes={[
        { label: "Padding", value: "32px 24px" },
        { label: "Column Gap", value: "32px" },
        { label: "Link Font Size", value: "13px" },
        { label: "Copyright Font Size", value: "12px" },
        { label: "Social Icon Size", value: "32px" },
      ]} />
    </motion.section>
  );
}
