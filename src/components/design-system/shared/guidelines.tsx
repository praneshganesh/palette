"use client";

import type { PaletteTokenSet } from "@/types";

interface GuidelineItem {
  type: "do" | "dont";
  text: string;
  visual?: React.ReactNode;
}

interface GuidelinesProps {
  palette: PaletteTokenSet;
  items: GuidelineItem[];
  columns?: number;
}

export function Guidelines({
  palette,
  items,
  columns = 2,
}: GuidelinesProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 16,
      }}
    >
      {items.map((item, i) => {
        const isDo = item.type === "do";
        const color = isDo ? palette.success : palette.danger;
        return (
          <div
            key={i}
            style={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {item.visual && (
              <div
                style={{
                  padding: "24px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 100,
                  backgroundColor: palette.surfaceMuted,
                }}
              >
                {item.visual}
              </div>
            )}
            <div
              style={{
                borderTop: `3px solid ${color}`,
                padding: "12px 16px",
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: color + "20",
                  color: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {isDo ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: color,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 3,
                  }}
                >
                  {isDo ? "Do" : "Don't"}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: palette.textSecondary,
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface UsageSectionProps {
  palette: PaletteTokenSet;
  title: string;
  description: string;
  items: string[];
  icon?: React.ReactNode;
}

export function UsageSection({
  palette,
  title,
  description,
  items,
}: UsageSectionProps) {
  return (
    <div
      style={{
        backgroundColor: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: 12,
        padding: 24,
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: palette.textPrimary,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: palette.textSecondary,
          lineHeight: 1.6,
          marginBottom: 16,
        }}
      >
        {description}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, listStyleType: "disc" }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: 12,
              color: palette.textSecondary,
              lineHeight: 1.7,
              marginBottom: 4,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
