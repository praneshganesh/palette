"use client";

import { useState } from "react";
import type { DesignSystem, PaletteTokenSet } from "@/types";

export type PaginationVariant = "numbered" | "prev-next" | "load-more" | "compact";

export interface DSPaginationProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  variant?: PaginationVariant;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  showInfo?: boolean;
  totalItems?: number;
}

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronsLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
  </svg>
);

const ChevronsRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
  </svg>
);

export function DSPagination({
  system,
  palette,
  totalPages,
  currentPage: controlledPage,
  onPageChange,
  variant = "numbered",
  showPageSize = false,
  pageSizeOptions = [10, 25, 50, 100],
  pageSize: controlledPageSize,
  onPageSizeChange,
  showInfo = false,
  totalItems,
}: DSPaginationProps) {
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(pageSizeOptions[0]);

  const currentPage = controlledPage ?? internalPage;
  const pageSize = controlledPageSize ?? internalPageSize;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setInternalPage(page);
    onPageChange?.(page);
  };

  const handlePageSizeChange = (size: number) => {
    setInternalPageSize(size);
    onPageSizeChange?.(size);
  };

  const radius = system.spacing.radius.md;

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${palette.border}`,
    background: "none",
    borderRadius: radius,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s",
    fontSize: 13,
    color: palette.textSecondary,
    height: 36,
    minWidth: 36,
    padding: "0 8px",
  };

  const activeBtn: React.CSSProperties = {
    ...btnBase,
    backgroundColor: palette.primary,
    color: palette.background,
    borderColor: palette.primary,
    fontWeight: 600,
  };

  const disabledBtn: React.CSSProperties = {
    ...btnBase,
    opacity: 0.35,
    cursor: "not-allowed",
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  if (variant === "load-more") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        {showInfo && totalItems && (
          <div style={{ fontSize: 12, color: palette.textSecondary }}>
            Showing {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
          </div>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              ...btnBase,
              padding: "8px 24px",
              fontWeight: 500,
              height: 40,
            }}
          >
            Load More
          </button>
        )}
        <div style={{ fontSize: 11, color: palette.textSecondary }}>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  }

  if (variant === "prev-next") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? disabledBtn : { ...btnBase, padding: "0 14px", gap: 6 }}
        >
          <ChevronLeftIcon /> Previous
        </button>
        <div style={{ fontSize: 13, color: palette.textSecondary, minWidth: 80, textAlign: "center" }}>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? disabledBtn : { ...btnBase, padding: "0 14px", gap: 6 }}
        >
          Next <ChevronRightIcon />
        </button>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? disabledBtn : btnBase}
        >
          <ChevronsLeftIcon />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? disabledBtn : btnBase}
        >
          <ChevronLeftIcon />
        </button>
        <div
          style={{
            fontSize: 13,
            color: palette.textPrimary,
            padding: "0 12px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {currentPage} / {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? disabledBtn : btnBase}
        >
          <ChevronRightIcon />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? disabledBtn : btnBase}
        >
          <ChevronsRightIcon />
        </button>
      </div>
    );
  }

  // Default: numbered
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      {showPageSize && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: palette.textSecondary }}>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            style={{
              border: `1px solid ${palette.border}`,
              borderRadius: radius,
              padding: "4px 8px",
              fontSize: 12,
              color: palette.textPrimary,
              backgroundColor: palette.surface,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      {showInfo && totalItems && (
        <div style={{ fontSize: 12, color: palette.textSecondary }}>
          {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: showPageSize || showInfo ? "auto" : 0 }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? disabledBtn : btnBase}
        >
          <ChevronLeftIcon />
        </button>
        {getPageNumbers().map((page, i) =>
          page === "ellipsis" ? (
            <span key={`e-${i}`} style={{ padding: "0 4px", color: palette.textSecondary, fontSize: 13 }}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={currentPage === page ? activeBtn : btnBase}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? disabledBtn : btnBase}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
