"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { PaletteTokenSet, DesignSystem } from "@/types";

export type ArrowPlacement = "inside" | "outside" | "bottom";
export type IndicatorStyle = "dots" | "thumbnails" | "counter";

export interface CarouselProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  items: React.ReactNode[];
  arrowPlacement?: ArrowPlacement;
  indicator?: IndicatorStyle;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  peek?: boolean;
  thumbnails?: React.ReactNode[];
  style?: React.CSSProperties;
}

const ChevronLeft = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function DSCarousel({
  system,
  palette,
  items,
  arrowPlacement = "inside",
  indicator = "dots",
  autoPlay = false,
  autoPlayInterval = 4000,
  peek = false,
  thumbnails,
  style,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = items.length;

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (autoPlay && total > 1) {
      intervalRef.current = setInterval(next, autoPlayInterval);
      return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }
  }, [autoPlay, autoPlayInterval, next, total]);

  const radius = system.spacing.radius.lg;

  const arrowBtn = (direction: "left" | "right", placement: ArrowPlacement) => {
    const isLeft = direction === "left";
    const positionStyles: React.CSSProperties = placement === "inside"
      ? { position: "absolute", top: "50%", transform: "translateY(-50%)", [isLeft ? "left" : "right"]: 12 }
      : placement === "outside"
        ? { position: "absolute", top: "50%", transform: "translateY(-50%)", [isLeft ? "left" : "right"]: -20 }
        : {};

    return (
      <button
        onClick={isLeft ? prev : next}
        style={{
          ...positionStyles,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1px solid ${palette.border}`,
          backgroundColor: palette.surface,
          color: palette.textPrimary,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
          boxShadow: system.spacing.elevation.sm,
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        {isLeft ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>
    );
  };

  const dotsIndicator = (
    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
      {items.map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          style={{
            width: i === current ? 20 : 8,
            height: 8,
            borderRadius: 4,
            border: "none",
            backgroundColor: i === current ? palette.primary : palette.border,
            cursor: "pointer",
            transition: "all 0.2s",
            padding: 0,
          }}
        />
      ))}
    </div>
  );

  const counterIndicator = (
    <div style={{ fontSize: 13, color: palette.textSecondary, textAlign: "center" }}>
      <span style={{ fontWeight: 600, color: palette.textPrimary }}>{current + 1}</span>
      <span> / {total}</span>
    </div>
  );

  const thumbnailIndicator = thumbnails ? (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {thumbnails.map((thumb, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          style={{
            width: 48,
            height: 36,
            borderRadius: 6,
            border: `2px solid ${i === current ? palette.primary : palette.border}`,
            overflow: "hidden",
            cursor: "pointer",
            padding: 0,
            opacity: i === current ? 1 : 0.6,
            transition: "all 0.2s",
            backgroundColor: palette.surfaceMuted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {thumb}
        </button>
      ))}
    </div>
  ) : dotsIndicator;

  const renderIndicator = () => {
    switch (indicator) {
      case "dots": return dotsIndicator;
      case "counter": return counterIndicator;
      case "thumbnails": return thumbnailIndicator;
    }
  };

  return (
    <div style={{ position: "relative", ...style }}>
      <div
        style={{
          position: "relative",
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: palette.surfaceMuted,
          border: `1px solid ${palette.border}`,
          marginLeft: arrowPlacement === "outside" ? 28 : 0,
          marginRight: arrowPlacement === "outside" ? 28 : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                minWidth: peek ? "85%" : "100%",
                marginRight: peek ? "4%" : 0,
                flexShrink: 0,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {arrowPlacement !== "bottom" && total > 1 && (
          <>
            {arrowBtn("left", arrowPlacement)}
            {arrowBtn("right", arrowPlacement)}
          </>
        )}
      </div>

      <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        {arrowPlacement === "bottom" && total > 1 && arrowBtn("left", "bottom")}
        {renderIndicator()}
        {arrowPlacement === "bottom" && total > 1 && arrowBtn("right", "bottom")}
      </div>
    </div>
  );
}
