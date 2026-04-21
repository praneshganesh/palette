"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DesignSystem, PaletteTokenSet } from "@/types";

export type NavbarVariant = "solid" | "transparent" | "elevated";

export interface NavbarLink {
  id: string;
  label: string;
  active?: boolean;
}

export interface DSNavbarProps {
  system: DesignSystem;
  palette: PaletteTokenSet;
  brand?: string;
  brandIcon?: React.ReactNode;
  links: NavbarLink[];
  variant?: NavbarVariant;
  showSearch?: boolean;
  showAvatar?: boolean;
  avatarInitials?: string;
  onLinkClick?: (id: string) => void;
  activeLinkId?: string;
}

const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MenuIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BellIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

export function DSNavbar({
  system,
  palette,
  brand = "Brand",
  brandIcon,
  links,
  variant = "solid",
  showSearch = false,
  showAvatar = false,
  avatarInitials = "U",
  onLinkClick,
  activeLinkId: controlledActive,
}: DSNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [internalActive, setInternalActive] = useState(links[0]?.id ?? "");
  const [searchFocused, setSearchFocused] = useState(false);

  const activeLinkId = controlledActive ?? internalActive;

  const handleLinkClick = (id: string) => {
    setInternalActive(id);
    onLinkClick?.(id);
    setMobileOpen(false);
  };

  const radius = system.spacing.radius.md;

  const getContainerStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      height: 56,
      fontFamily: "inherit",
      position: "relative",
    };

    switch (variant) {
      case "transparent":
        return { ...base, backgroundColor: "transparent" };
      case "elevated":
        return {
          ...base,
          backgroundColor: palette.surface,
          boxShadow: system.spacing.elevation.md,
        };
      default:
        return {
          ...base,
          backgroundColor: palette.surface,
          borderBottom: `1px solid ${palette.border}`,
        };
    }
  };

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: 13,
    fontWeight: isActive ? 600 : 500,
    color: isActive ? palette.primary : palette.textSecondary,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: "6px 12px",
    borderRadius: radius,
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ position: "relative" }}>
      <div style={getContainerStyles()}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {brandIcon || (
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: system.spacing.radius.sm,
                backgroundColor: palette.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: palette.background,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {brand.charAt(0)}
            </div>
          )}
          <span style={{ fontSize: 15, fontWeight: 700, color: palette.textPrimary }}>
            {brand}
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              style={linkStyle(activeLinkId === link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {showSearch && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: `1px solid ${searchFocused ? palette.primary : palette.border}`,
                borderRadius: radius,
                padding: "6px 10px",
                transition: "border-color 0.15s",
                backgroundColor: palette.surfaceMuted,
              }}
            >
              <SearchIcon size={14} />
              <input
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  fontSize: 12,
                  color: palette.textPrimary,
                  fontFamily: "inherit",
                  width: 120,
                }}
              />
            </div>
          )}

          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: radius,
              border: "none",
              background: "none",
              color: palette.textSecondary,
              cursor: "pointer",
              position: "relative",
            }}
          >
            <BellIcon />
            <div
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: palette.danger,
                border: `2px solid ${palette.surface}`,
              }}
            />
          </button>

          {showAvatar && (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: palette.primary + "20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: palette.primary,
                cursor: "pointer",
              }}
            >
              {avatarInitials}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              border: "none",
              background: "none",
              color: palette.textPrimary,
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (for demonstration, always rendered but visually toggled) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: palette.surface,
              borderBottom: `1px solid ${palette.border}`,
              overflow: "hidden",
              zIndex: 50,
            }}
          >
            <div style={{ padding: "8px 16px" }}>
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    fontSize: 14,
                    fontWeight: activeLinkId === link.id ? 600 : 400,
                    color: activeLinkId === link.id ? palette.primary : palette.textPrimary,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    borderRadius: radius,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
