"use client";

import { useState } from "react";
import type { PaletteTokenSet } from "@/types";

export interface AnatomyPart {
  id: number;
  label: string;
  description?: string;
  x: number;
  y: number;
}

interface AnatomyDiagramProps {
  palette: PaletteTokenSet;
  parts: AnatomyPart[];
  renderPreview: (highlightedPart: number | null) => React.ReactNode;
  width?: number;
  height?: number;
}

export function AnatomyDiagram({
  palette,
  parts,
  renderPreview,
  height = 160,
}: AnatomyDiagramProps) {
  const [hoveredPart, setHoveredPart] = useState<number | null>(null);

  return (
    <div
      style={{
        backgroundColor: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Two-column layout: preview left, legend right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          minHeight: height,
        }}
      >
        {/* Preview area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 32px",
            backgroundImage: `radial-gradient(circle, ${palette.border}40 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        >
          {renderPreview(hoveredPart)}
        </div>

        {/* Legend panel */}
        <div
          style={{
            borderLeft: `1px solid ${palette.border}`,
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            backgroundColor: palette.surfaceMuted,
            justifyContent: "center",
          }}
        >
          {parts.map((part) => {
            const isActive = hoveredPart === part.id;
            return (
              <div
                key={part.id}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                  padding: "8px 10px",
                  borderRadius: 8,
                  backgroundColor: isActive ? palette.primary + "10" : "transparent",
                  transition: "background-color 0.15s",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: isActive ? palette.primary : palette.primary + "20",
                    color: isActive ? "#fff" : palette.primary,
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                    transition: "all 0.15s",
                  }}
                >
                  {part.id}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: isActive ? palette.textPrimary : palette.textSecondary,
                      lineHeight: 1.3,
                      transition: "color 0.15s",
                    }}
                  >
                    {part.label}
                  </div>
                  {part.description && (
                    <div
                      style={{
                        fontSize: 11,
                        color: palette.textSecondary,
                        lineHeight: 1.3,
                        marginTop: 2,
                        opacity: 0.8,
                      }}
                    >
                      {part.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
