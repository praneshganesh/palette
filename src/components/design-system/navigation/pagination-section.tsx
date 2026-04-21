"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { DSPagination } from "./pagination";
import { AnatomyDiagram } from "../shared/anatomy-diagram";
import { Guidelines, UsageSection } from "../shared/guidelines";
import { TokensGrid, MeasurementsTable } from "../shared/measurements";

interface PaginationSectionProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  content: IndustryContent;
  sectionWrap: (isLast: boolean) => React.CSSProperties;
  accentBar: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  sectionDesc: React.CSSProperties;
  fadeUp: Record<string, unknown>;
}

export function PaginationSection({
  system,
  palette,
  content,
  sectionWrap,
  accentBar,
  sectionTitle,
  sectionDesc,
  fadeUp,
}: PaginationSectionProps) {
  const [numberedPage, setNumberedPage] = useState(1);
  const [prevNextPage, setPrevNextPage] = useState(1);
  const [loadMorePage, setLoadMorePage] = useState(1);
  const [compactPage, setCompactPage] = useState(5);
  const [infoPage, setInfoPage] = useState(1);

  const subsectionLabel: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: palette.textPrimary,
    marginBottom: 20,
    marginTop: 56,
    paddingBottom: 12,
    borderBottom: `2px solid ${palette.primary}20`,
  };

  const previewBox: React.CSSProperties = {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: system.spacing.radius.lg,
    padding: 24,
  };

  return (
    <motion.section
      id="comp-pagination"
      data-comp-section
      {...fadeUp}
      transition={{ delay: 0 }}
      style={sectionWrap(false)}
    >
      <div style={accentBar} />
      <p style={sectionTitle}>Pagination</p>
      <p style={sectionDesc}>
        Pagination divides content into discrete pages, allowing users to navigate through large
        datasets or lists without overwhelming the interface.
      </p>

      {/* ──── Design Tokens ──── */}
      <div style={subsectionLabel}>Design Tokens</div>
      <TokensGrid
        palette={palette}
        tokens={[
          { label: "Active Background", value: "palette.primary" },
          { label: "Inactive Background", value: "transparent" },
          { label: "Border Radius", value: "system.spacing.radius.md" },
        ]}
      />

      {/* ──── Numbered ──── */}
      <div style={subsectionLabel}>Numbered</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        The default pagination style with page numbers, ellipsis for large ranges, and prev/next arrows.
      </div>
      <div style={previewBox}>
        <DSPagination
          system={system}
          palette={palette}
          totalPages={20}
          currentPage={numberedPage}
          onPageChange={setNumberedPage}
          variant="numbered"
        />
      </div>

      {/* ──── Previous / Next ──── */}
      <div style={subsectionLabel}>Previous / Next</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        A simpler variant showing only directional navigation with the current page indicator.
      </div>
      <div style={previewBox}>
        <DSPagination
          system={system}
          palette={palette}
          totalPages={10}
          currentPage={prevNextPage}
          onPageChange={setPrevNextPage}
          variant="prev-next"
        />
      </div>

      {/* ──── Load More ──── */}
      <div style={subsectionLabel}>Load More</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        An infinite-scroll-friendly pattern. Users click to append more items to the current view.
      </div>
      <div style={previewBox}>
        <DSPagination
          system={system}
          palette={palette}
          totalPages={8}
          currentPage={loadMorePage}
          onPageChange={setLoadMorePage}
          variant="load-more"
          showInfo
          totalItems={120}
          pageSize={15}
        />
      </div>

      {/* ──── Compact ──── */}
      <div style={subsectionLabel}>Compact</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        A minimal variant with first/last and prev/next navigation. Good for tight spaces.
      </div>
      <div style={previewBox}>
        <DSPagination
          system={system}
          palette={palette}
          totalPages={50}
          currentPage={compactPage}
          onPageChange={setCompactPage}
          variant="compact"
        />
      </div>

      {/* ──── With Page Size & Info ──── */}
      <div style={subsectionLabel}>With Page Size Selector</div>
      <div style={{ fontSize: 13, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        Shows a rows-per-page dropdown and item count alongside numbered pagination.
        Typical in data tables.
      </div>
      <div style={previewBox}>
        <DSPagination
          system={system}
          palette={palette}
          totalPages={12}
          currentPage={infoPage}
          onPageChange={setInfoPage}
          variant="numbered"
          showPageSize
          showInfo
          totalItems={287}
          pageSize={25}
        />
      </div>

      {/* ──── In Context ──── */}
      <div style={subsectionLabel}>In Context</div>
      <div
        style={{
          ...previewBox,
          padding: 0,
        }}
      >
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${palette.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: palette.textPrimary }}>
            {content.formFields.projectTitle || "Items"}
          </div>
        </div>
        <div style={{ padding: "12px 24px" }}>
          {content.tableRows.slice(0, 3).map((row, i) => (
            <div
              key={row.id}
              style={{
                padding: "12px 0",
                borderBottom: i < 2 ? `1px solid ${palette.border}` : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: palette.textPrimary }}>{row.title}</div>
                <div style={{ fontSize: 11, color: palette.textSecondary }}>{row.owner} · {row.due}</div>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 99,
                  backgroundColor: row.status === "Active" ? palette.success + "18" : palette.warning + "18",
                  color: row.status === "Active" ? palette.success : palette.warning,
                }}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 24px", borderTop: `1px solid ${palette.border}` }}>
          <DSPagination
            system={system}
            palette={palette}
            totalPages={8}
            variant="numbered"
            showInfo
            totalItems={content.tableRows.length * 8}
            pageSize={3}
          />
        </div>
      </div>

      {/* ──── Usage Guidelines ──── */}
      <div style={subsectionLabel}>Usage</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <UsageSection
          palette={palette}
          title="When to use pagination"
          description="Pagination is appropriate when:"
          items={[
            "Displaying lists with more than 20–50 items",
            "Users need random access to a specific page",
            "Data is fetched in pages from an API",
            "The list content has a clear sort order",
          ]}
        />
        <UsageSection
          palette={palette}
          title="Choosing the right variant"
          description="Match the variant to your UX needs:"
          items={[
            "Numbered — Best for tables and data-heavy views",
            "Prev/Next — Simpler navigation, fewer cognitive demands",
            "Load more — Feeds, timelines, infinite scroll patterns",
            "Compact — Tight spaces, toolbars, image galleries",
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
            text: "Clearly indicate the current page and total pages. Disable prev/next buttons at boundaries.",
            visual: (
              <DSPagination system={system} palette={palette} totalPages={10} currentPage={1} variant="numbered" />
            ),
          },
          {
            type: "dont",
            text: "Don't show too many page numbers. Use ellipsis for ranges larger than 7 pages.",
          },
          {
            type: "do",
            text: "Include a page size selector in data tables to let users control how many items they see.",
            visual: (
              <DSPagination system={system} palette={palette} totalPages={5} variant="numbered" showPageSize pageSize={25} />
            ),
          },
          {
            type: "dont",
            text: "Don't use numbered pagination for content that doesn't have a meaningful page order (feeds, social timelines).",
          },
        ]}
      />

      {/* ──── Anatomy ──── */}
      <div style={subsectionLabel}>Anatomy</div>
      <AnatomyDiagram
        palette={palette}
        parts={[
          { id: 1, label: "Container", description: "Flex wrapper with alignment and spacing", x: 10, y: 50 },
          { id: 2, label: "Previous button", description: "Navigates to the previous page", x: 25, y: 15 },
          { id: 3, label: "Page numbers", description: "Clickable page buttons with active indicator", x: 55, y: 85 },
          { id: 4, label: "Next button", description: "Navigates to the next page", x: 85, y: 15 },
        ]}
        renderPreview={(highlighted) => (
          <div style={{ display: "flex", alignItems: "center", gap: 4, position: "relative", padding: 8 }}>
            <button
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.md,
                background: "none",
                color: palette.textSecondary,
                opacity: highlighted === 2 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: system.spacing.radius.md,
                  fontSize: 12,
                  fontWeight: n === 1 ? 600 : 400,
                  backgroundColor: n === 1 ? palette.primary : "transparent",
                  color: n === 1 ? palette.background : palette.textSecondary,
                  border: n === 1 ? "none" : `1px solid ${palette.border}`,
                  opacity: highlighted === 3 ? 1 : highlighted === null ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }}
              >
                {n}
              </div>
            ))}
            <button
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.md,
                background: "none",
                color: palette.textSecondary,
                opacity: highlighted === 4 ? 1 : highlighted === null ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            {highlighted === 1 && (
              <div style={{ position: "absolute", inset: 0, border: `2px dashed ${palette.primary}`, borderRadius: 8, pointerEvents: "none" }} />
            )}
          </div>
        )}
      />

      {/* ──── Measurements ──── */}
      <div style={subsectionLabel}>Measurements</div>
      <MeasurementsTable
        palette={palette}
        attributes={[
          { label: "Button Size", value: "32 × 32px" },
          { label: "Gap", value: "4px" },
          { label: "Font Size", value: "12px" },
        ]}
      />
    </motion.section>
  );
}
