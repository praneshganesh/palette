"use client";
import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

/* ─── shared shadow filter (referenced by id) ─────────────────────── */
const Shadow = () => (
  <filter id="sh" x="-10%" y="-10%" width="130%" height="140%">
    <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.18" />
  </filter>
);

/* ─── helper: rounded‑rect base that every icon sits on ───────────── */
const Base = ({ color = "#00000020" }: { color?: string }) => (
  <rect x="2" y="3" width="44" height="44" rx="12" fill={color} />
);

const Highlight = () => (
  <ellipse cx="24" cy="14" rx="14" ry="7" fill="white" opacity="0.18" />
);

/* ═══════════════════════════════════════════════════════════════════ *
 *  FIELD TYPE ICONS (1–26)
 * ═══════════════════════════════════════════════════════════════════ */

export function Icon3dEmail({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_email" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1D4ED820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_email)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="16" width="24" height="16" rx="3" fill="white" opacity="0.92" />
      <path d="M12 17l12 8 12-8" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M13 16.5l11 7.5 11-7.5" stroke="#1D4ED8" strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  );
}

export function Icon3dUser({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_user" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6D28D920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_user)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="19" r="5.5" fill="white" opacity="0.92" />
      <path d="M14.5 34c0-5.25 4.25-9.5 9.5-9.5s9.5 4.25 9.5 9.5" stroke="none" fill="white" opacity="0.92" />
    </svg>
  );
}

export function Icon3dPhone({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_phone" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" /><stop offset="1" stopColor="#059669" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#05966920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_phone)" filter="url(#sh)" />
      <Highlight />
      <rect x="18" y="11" width="12" height="26" rx="3" fill="white" opacity="0.92" />
      <circle cx="24" cy="33" r="1.5" fill="#059669" opacity="0.5" />
      <rect x="21" y="13" width="6" height="1.5" rx="0.75" fill="#059669" opacity="0.3" />
    </svg>
  );
}

export function Icon3dCalendar({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_calendar" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" /><stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#DC262620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_calendar)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="14" width="26" height="22" rx="3" fill="white" opacity="0.92" />
      <rect x="11" y="14" width="26" height="7" rx="3" fill="white" opacity="0.6" />
      <rect x="17" y="11" width="2" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="29" y="11" width="2" height="5" rx="1" fill="white" opacity="0.85" />
      <circle cx="18" cy="28" r="1.5" fill="#DC2626" opacity="0.5" />
      <circle cx="24" cy="28" r="1.5" fill="#DC2626" opacity="0.5" />
      <circle cx="30" cy="28" r="1.5" fill="#DC2626" opacity="0.5" />
      <circle cx="18" cy="33" r="1.5" fill="#DC2626" opacity="0.3" />
      <circle cx="24" cy="33" r="1.5" fill="#DC2626" opacity="0.3" />
    </svg>
  );
}

export function Icon3dCalendarRange({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_calrange" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EA580C20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_calrange)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="14" width="26" height="22" rx="3" fill="white" opacity="0.92" />
      <rect x="11" y="14" width="26" height="7" rx="3" fill="white" opacity="0.6" />
      <rect x="17" y="11" width="2" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="29" y="11" width="2" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="16" y="27" width="16" height="4" rx="2" fill="#EA580C" opacity="0.35" />
      <circle cx="17" cy="29" r="2" fill="#EA580C" opacity="0.6" />
      <circle cx="31" cy="29" r="2" fill="#EA580C" opacity="0.6" />
    </svg>
  );
}

export function Icon3dCurrency({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_currency" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#D9770620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_currency)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="11" fill="white" opacity="0.92" />
      <text x="24" y="29" textAnchor="middle" fontSize="16" fontWeight="700" fill="#D97706" fontFamily="system-ui">$</text>
    </svg>
  );
}

export function Icon3dPercent({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_percent" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" /><stop offset="1" stopColor="#0D9488" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0D948820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_percent)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="11" fill="white" opacity="0.92" />
      <text x="24" y="29" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0D9488" fontFamily="system-ui">%</text>
    </svg>
  );
}

export function Icon3dTextInput({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_textinput" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6B7280" /><stop offset="1" stopColor="#4B5563" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#4B556320" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_textinput)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="17" width="26" height="14" rx="3" fill="white" opacity="0.92" />
      <rect x="15" y="21" width="1.5" height="6" rx="0.75" fill="#4B5563" opacity="0.7" />
      <text x="20" y="27.5" fontSize="9" fill="#4B5563" opacity="0.4" fontFamily="system-ui">Aa</text>
    </svg>
  );
}

export function Icon3dTextArea({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_textarea" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64748B" /><stop offset="1" stopColor="#475569" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#47556920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_textarea)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="12" width="26" height="24" rx="3" fill="white" opacity="0.92" />
      <rect x="15" y="17" width="18" height="2" rx="1" fill="#475569" opacity="0.35" />
      <rect x="15" y="22" width="14" height="2" rx="1" fill="#475569" opacity="0.35" />
      <rect x="15" y="27" width="16" height="2" rx="1" fill="#475569" opacity="0.35" />
      <rect x="15" y="32" width="10" height="2" rx="1" fill="#475569" opacity="0.25" />
    </svg>
  );
}

export function Icon3dLock({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_lock" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#374151" /><stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1F293720" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_lock)" filter="url(#sh)" />
      <Highlight />
      <rect x="15" y="22" width="18" height="14" rx="3" fill="white" opacity="0.92" />
      <path d="M18 22v-4a6 6 0 0 1 12 0v4" stroke="white" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
      <circle cx="24" cy="29" r="2" fill="#1F2937" opacity="0.6" />
      <rect x="23.25" y="29" width="1.5" height="3.5" rx="0.75" fill="#1F2937" opacity="0.5" />
    </svg>
  );
}

export function Icon3dLink({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_link" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#4338CA20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_link)" filter="url(#sh)" />
      <Highlight />
      <path d="M20 28l-2 2a4.24 4.24 0 0 0 6 6l2-2" stroke="white" strokeWidth="2.5" fill="none" opacity="0.9" strokeLinecap="round" />
      <path d="M28 20l2-2a4.24 4.24 0 0 0-6-6l-2 2" stroke="white" strokeWidth="2.5" fill="none" opacity="0.9" strokeLinecap="round" />
      <line x1="20.5" y1="27.5" x2="27.5" y2="20.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

export function Icon3dIdCard({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_idcard" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EA580C20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_idcard)" filter="url(#sh)" />
      <Highlight />
      <rect x="9" y="14" width="30" height="20" rx="3" fill="white" opacity="0.92" />
      <circle cx="18" cy="23" r="3.5" fill="#EA580C" opacity="0.3" />
      <rect x="25" y="20" width="10" height="2" rx="1" fill="#EA580C" opacity="0.35" />
      <rect x="25" y="24.5" width="7" height="2" rx="1" fill="#EA580C" opacity="0.25" />
      <rect x="13" y="29" width="22" height="2" rx="1" fill="#EA580C" opacity="0.15" />
    </svg>
  );
}

export function Icon3dMapPin({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_mappin" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" /><stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#DC262620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_mappin)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 12c-5.52 0-10 4.48-10 10 0 7.5 10 16 10 16s10-8.5 10-16c0-5.52-4.48-10-10-10z" fill="white" opacity="0.92" />
      <circle cx="24" cy="22" r="4" fill="#DC2626" opacity="0.5" />
    </svg>
  );
}

export function Icon3dUpload({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_upload" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" /><stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0EA5E920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_upload)" filter="url(#sh)" />
      <Highlight />
      <path d="M14 28a6 6 0 0 1-.3-12A8 8 0 0 1 29.8 14 6 6 0 0 1 34 28" stroke="white" strokeWidth="2" fill="none" opacity="0.85" strokeLinecap="round" />
      <path d="M20 30l4-4 4 4" stroke="white" strokeWidth="2.5" fill="none" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="24" y1="26" x2="24" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

export function Icon3dDropdown({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_dropdown" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6D28D920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_dropdown)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="17" width="26" height="14" rx="3" fill="white" opacity="0.92" />
      <path d="M28 22l-4 4-4-4" stroke="#6D28D9" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

export function Icon3dCheckbox({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_checkbox" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" /><stop offset="1" stopColor="#059669" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#05966920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_checkbox)" filter="url(#sh)" />
      <Highlight />
      <rect x="14" y="14" width="20" height="20" rx="4" fill="white" opacity="0.92" />
      <path d="M18 24l4 4 8-8" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}

export function Icon3dRadio({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_radio" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1D4ED820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_radio)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="10" fill="white" opacity="0.92" />
      <circle cx="24" cy="24" r="5" fill="#1D4ED8" opacity="0.7" />
    </svg>
  );
}

export function Icon3dToggle({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_toggle" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" /><stop offset="1" stopColor="#047857" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#04785720" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_toggle)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="18" width="26" height="12" rx="6" fill="white" opacity="0.92" />
      <circle cx="31" cy="24" r="5" fill="#047857" opacity="0.7" />
    </svg>
  );
}

export function Icon3dSearch({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_search" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#4338CA20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_search)" filter="url(#sh)" />
      <Highlight />
      <circle cx="22" cy="22" r="7" stroke="white" strokeWidth="2.5" fill="none" opacity="0.92" />
      <line x1="27" y1="27" x2="34" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.92" />
    </svg>
  );
}

export function Icon3dNumber({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_number" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EA580C20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_number)" filter="url(#sh)" />
      <Highlight />
      <text x="24" y="30" textAnchor="middle" fontSize="20" fontWeight="800" fill="white" opacity="0.92" fontFamily="system-ui">#</text>
    </svg>
  );
}

export function Icon3dAddress({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_address" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A16207" /><stop offset="1" stopColor="#854D0E" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#854D0E20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_address)" filter="url(#sh)" />
      <Highlight />
      <path d="M13 34V20l11-7 11 7v14H13z" fill="white" opacity="0.92" />
      <rect x="21" y="26" width="6" height="8" rx="1" fill="#854D0E" opacity="0.35" />
      <rect x="16" y="22" width="4" height="4" rx="1" fill="#854D0E" opacity="0.2" />
      <rect x="28" y="22" width="4" height="4" rx="1" fill="#854D0E" opacity="0.2" />
    </svg>
  );
}

export function Icon3dPalette({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_palette" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" /><stop offset="0.5" stopColor="#8B5CF6" /><stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#8B5CF620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_palette)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 12c-6.63 0-12 5.37-12 12 0 1.1.9 2 2 2h3.5c.83 0 1.5.67 1.5 1.5 0 .39-.15.74-.39 1.01-.23.26-.38.61-.38 1 0 .83.67 1.49 1.5 1.49H24c6.63 0 12-5.37 12-12s-5.37-12-12-12z" fill="white" opacity="0.9" />
      <circle cx="18" cy="20" r="2" fill="#EF4444" /><circle cx="24" cy="17" r="2" fill="#F59E0B" />
      <circle cx="30" cy="20" r="2" fill="#10B981" /><circle cx="32" cy="26" r="2" fill="#3B82F6" />
    </svg>
  );
}

export function Icon3dStar({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_star" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#D9770620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_star)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 14l2.94 5.96 6.58.96-4.76 4.64 1.12 6.56L24 29.24l-5.88 3.88 1.12-6.56-4.76-4.64 6.58-.96L24 14z" fill="white" opacity="0.92" />
    </svg>
  );
}

export function Icon3dSlider({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_slider" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6D28D920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_slider)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="22.5" width="24" height="3" rx="1.5" fill="white" opacity="0.5" />
      <rect x="12" y="22.5" width="16" height="3" rx="1.5" fill="white" opacity="0.92" />
      <circle cx="28" cy="24" r="4.5" fill="white" opacity="0.95" />
      <circle cx="28" cy="24" r="2" fill="#6D28D9" opacity="0.6" />
    </svg>
  );
}

export function Icon3dClock({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_clock" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1D4ED820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_clock)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="11" fill="white" opacity="0.92" />
      <line x1="24" y1="24" x2="24" y2="17" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="24" y1="24" x2="30" y2="24" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="24" cy="24" r="1.5" fill="#1D4ED8" opacity="0.7" />
    </svg>
  );
}

export function Icon3dKey({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_key" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#D9770620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_key)" filter="url(#sh)" />
      <Highlight />
      <circle cx="19" cy="21" r="6" fill="white" opacity="0.92" />
      <circle cx="19" cy="21" r="2.5" fill="#D97706" opacity="0.35" />
      <rect x="23" y="19.5" width="14" height="3" rx="1.5" fill="white" opacity="0.92" />
      <rect x="33" y="22.5" width="3" height="4" rx="1" fill="white" opacity="0.85" />
      <rect x="29" y="22.5" width="3" height="3" rx="1" fill="white" opacity="0.75" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  NEW PROJECT TYPE & INDUSTRY ICONS
 * ═══════════════════════════════════════════════════════════════════ */

export function Icon3dEcommerce({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_ecommerce" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" /><stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#06B6D420" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_ecommerce)" filter="url(#sh)" />
      <Highlight />
      <path d="M16 14h-2l3 16h14l3-12H18" stroke="white" strokeWidth="2" fill="none" opacity="0.92" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="33" r="2" fill="white" opacity="0.85" />
      <circle cx="30" cy="33" r="2" fill="white" opacity="0.85" />
      <path d="M28 20l-3 3-2-2" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icon3dSaas({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_saas" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6366F120" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_saas)" filter="url(#sh)" />
      <Highlight />
      <path d="M15 28a6 6 0 0 1 .5-11.5 8 8 0 0 1 15.5 1A5 5 0 0 1 33 28H15z" fill="white" opacity="0.92" />
      <circle cx="27" cy="30" r="5" fill="white" opacity="0.75" />
      <path d="M27 28v4M25 30h4" stroke="#4F46E5" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

export function Icon3dCrm({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_crm" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" /><stop offset="1" stopColor="#E11D48" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#F43F5E20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_crm)" filter="url(#sh)" />
      <Highlight />
      <rect x="13" y="14" width="22" height="20" rx="3" fill="white" opacity="0.92" />
      <circle cx="24" cy="22" r="4" fill="#E11D48" opacity="0.2" />
      <path d="M18 30c0-3 2.7-5 6-5s6 2 6 5" fill="#E11D48" opacity="0.15" />
      <path d="M30 17l-2.5 2.5L25 17" fill="none" stroke="#E11D48" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icon3dAnalytics({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_analytics" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#8B5CF620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_analytics)" filter="url(#sh)" />
      <Highlight />
      <rect x="13" y="28" width="4" height="7" rx="1" fill="white" opacity="0.85" />
      <rect x="19" y="23" width="4" height="12" rx="1" fill="white" opacity="0.85" />
      <rect x="25" y="18" width="4" height="17" rx="1" fill="white" opacity="0.85" />
      <rect x="31" y="14" width="4" height="21" rx="1" fill="white" opacity="0.92" />
      <circle cx="18" cy="17" r="4" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
      <line x1="21" y1="20" x2="23" y2="22" stroke="white" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
    </svg>
  );
}

export function Icon3dSocialPlatform({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_socialplatform" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" /><stop offset="1" stopColor="#0284C7" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0EA5E920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_socialplatform)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="15" width="18" height="12" rx="4" fill="white" opacity="0.92" />
      <rect x="18" y="22" width="18" height="12" rx="4" fill="white" opacity="0.75" />
      <circle cx="19" cy="20" r="1" fill="#0284C7" opacity="0.4" />
      <circle cx="23" cy="20" r="1" fill="#0284C7" opacity="0.4" />
      <circle cx="27" cy="20" r="1" fill="#0284C7" opacity="0.4" />
    </svg>
  );
}

export function Icon3dContent({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_content" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#F59E0B20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_content)" filter="url(#sh)" />
      <Highlight />
      <rect x="14" y="12" width="16" height="24" rx="2" fill="white" opacity="0.92" />
      <rect x="17" y="17" width="10" height="1.5" rx="0.75" fill="#D97706" opacity="0.3" />
      <rect x="17" y="21" width="8" height="1.5" rx="0.75" fill="#D97706" opacity="0.2" />
      <rect x="17" y="25" width="10" height="1.5" rx="0.75" fill="#D97706" opacity="0.2" />
      <path d="M30 28l4-4 4 4" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="34" y1="24" x2="34" y2="35" stroke="white" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
    </svg>
  );
}

export function Icon3dMobile({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_mobile" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64748B" /><stop offset="1" stopColor="#475569" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#64748B20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_mobile)" filter="url(#sh)" />
      <Highlight />
      <rect x="16" y="10" width="16" height="28" rx="3" fill="white" opacity="0.92" />
      <rect x="18" y="14" width="12" height="18" rx="1" fill="#475569" opacity="0.1" />
      <circle cx="24" cy="35" r="1.5" fill="#475569" opacity="0.25" />
    </svg>
  );
}

export function Icon3dTechnology({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_technology" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#3B82F620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_technology)" filter="url(#sh)" />
      <Highlight />
      <rect x="17" y="17" width="14" height="14" rx="2" fill="white" opacity="0.92" />
      <rect x="20" y="20" width="8" height="8" rx="1" fill="#2563EB" opacity="0.2" />
      <rect x="14" y="21" width="3" height="2" rx="0.5" fill="white" opacity="0.7" />
      <rect x="14" y="25" width="3" height="2" rx="0.5" fill="white" opacity="0.7" />
      <rect x="31" y="21" width="3" height="2" rx="0.5" fill="white" opacity="0.7" />
      <rect x="31" y="25" width="3" height="2" rx="0.5" fill="white" opacity="0.7" />
      <rect x="21" y="14" width="2" height="3" rx="0.5" fill="white" opacity="0.7" />
      <rect x="25" y="14" width="2" height="3" rx="0.5" fill="white" opacity="0.7" />
      <rect x="21" y="31" width="2" height="3" rx="0.5" fill="white" opacity="0.7" />
      <rect x="25" y="31" width="2" height="3" rx="0.5" fill="white" opacity="0.7" />
    </svg>
  );
}

export function Icon3dAiMl({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_aiml" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" /><stop offset="1" stopColor="#9333EA" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#A855F720" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_aiml)" filter="url(#sh)" />
      <Highlight />
      <ellipse cx="24" cy="22" rx="8" ry="7" fill="white" opacity="0.92" />
      <ellipse cx="24" cy="24" rx="5" ry="4" fill="white" opacity="0.6" />
      <circle cx="18" cy="32" r="2.5" fill="white" opacity="0.75" />
      <circle cx="30" cy="32" r="2.5" fill="white" opacity="0.75" />
      <circle cx="24" cy="35" r="2" fill="white" opacity="0.65" />
      <line x1="20" y1="27" x2="18" y2="30" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="28" y1="27" x2="30" y2="30" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="28" x2="24" y2="33" stroke="white" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

export function Icon3dMedia({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_media" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" /><stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EF444420" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_media)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="10" fill="white" opacity="0.92" />
      <path d="M21 19v10l9-5-9-5z" fill="#DC2626" opacity="0.5" />
    </svg>
  );
}

export function Icon3dNonprofit({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_nonprofit" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" /><stop offset="1" stopColor="#059669" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#10B98120" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_nonprofit)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 32s-9-5-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 11-9 11z" fill="white" opacity="0.92" />
      <path d="M16 34c2-1 4 0 5 1s3 2 5 1" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M22 34c2-1 4 0 5 1s3 2 5 1" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

export function Icon3dLegal({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_legal" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64748B" /><stop offset="1" stopColor="#475569" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#64748B20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_legal)" filter="url(#sh)" />
      <Highlight />
      <line x1="24" y1="12" x2="24" y2="30" stroke="white" strokeWidth="2" opacity="0.92" strokeLinecap="round" />
      <line x1="15" y1="18" x2="33" y2="18" stroke="white" strokeWidth="2" opacity="0.85" strokeLinecap="round" />
      <path d="M15 18l-3 8h6l-3-8z" fill="white" opacity="0.75" />
      <path d="M33 18l-3 8h6l-3-8z" fill="white" opacity="0.75" />
      <rect x="18" y="30" width="12" height="3" rx="1" fill="white" opacity="0.8" />
      <rect x="16" y="33" width="16" height="2" rx="1" fill="white" opacity="0.7" />
    </svg>
  );
}

export function Icon3dConstruction({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_construction" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#F9731620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_construction)" filter="url(#sh)" />
      <Highlight />
      <path d="M14 24c0-5.5 4.5-10 10-10s10 4.5 10 10H14z" fill="white" opacity="0.92" />
      <rect x="13" y="24" width="22" height="3" rx="1" fill="white" opacity="0.85" />
      <rect x="22" y="14" width="4" height="3" rx="1" fill="white" opacity="0.7" />
      <rect x="18" y="28" width="12" height="8" rx="1" fill="white" opacity="0.5" />
    </svg>
  );
}

export function Icon3dEnergy({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_energy" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EAB308" /><stop offset="1" stopColor="#CA8A04" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EAB30820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_energy)" filter="url(#sh)" />
      <Highlight />
      <path d="M26 12l-8 14h7l-2 10 8-14h-7l2-10z" fill="white" opacity="0.92" />
    </svg>
  );
}

export function Icon3dTelecom({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_telecom" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" /><stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#06B6D420" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_telecom)" filter="url(#sh)" />
      <Highlight />
      <rect x="22" y="18" width="4" height="18" rx="1" fill="white" opacity="0.92" />
      <rect x="20" y="22" width="8" height="2" rx="0.5" fill="white" opacity="0.75" />
      <path d="M17 17a10 10 0 0 1 14 0" stroke="white" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M14 14a14 14 0 0 1 20 0" stroke="white" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
      <circle cx="24" cy="14" r="2" fill="white" opacity="0.85" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  APP / NAVIGATION ICONS (27–38)
 * ═══════════════════════════════════════════════════════════════════ */

export function Icon3dHome({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_home" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#DC262620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_home)" filter="url(#sh)" />
      <Highlight />
      <path d="M13 25l11-10 11 10v10a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V25z" fill="white" opacity="0.92" />
      <rect x="20" y="28" width="8" height="9" rx="1.5" fill="#DC2626" opacity="0.3" />
    </svg>
  );
}

export function Icon3dSettings({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_settings" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9CA3AF" /><stop offset="1" stopColor="#6B7280" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6B728020" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_settings)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="5" stroke="white" strokeWidth="2.5" fill="none" opacity="0.92" />
      <path d="M24 12v3M24 33v3M12 24h3M33 24h3M15.5 15.5l2.1 2.1M30.4 30.4l2.1 2.1M32.5 15.5l-2.1 2.1M17.6 30.4l-2.1 2.1" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function Icon3dBell({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_bell" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" /><stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#F59E0B20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_bell)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 13c-4.42 0-8 3.58-8 8v5l-2 3h20l-2-3v-5c0-4.42-3.58-8-8-8z" fill="white" opacity="0.92" />
      <path d="M21.5 33a2.5 2.5 0 0 0 5 0" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  );
}

export function Icon3dMail({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_mail" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" /><stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#2563EB20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_mail)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="15" width="28" height="18" rx="3" fill="white" opacity="0.92" />
      <path d="M10 17l14 9 14-9" stroke="#2563EB" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

export function Icon3dChart({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_chart" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" /><stop offset="1" stopColor="#059669" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#05966920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_chart)" filter="url(#sh)" />
      <Highlight />
      <rect x="13" y="26" width="4" height="10" rx="1.5" fill="white" opacity="0.75" />
      <rect x="20" y="20" width="4" height="16" rx="1.5" fill="white" opacity="0.85" />
      <rect x="27" y="16" width="4" height="20" rx="1.5" fill="white" opacity="0.92" />
      <rect x="34" y="22" width="4" height="14" rx="1.5" fill="white" opacity="0.8" />
    </svg>
  );
}

export function Icon3dFolder({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_folder" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#D9770620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_folder)" filter="url(#sh)" />
      <Highlight />
      <path d="M12 18a2 2 0 0 1 2-2h6l3 3h11a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V18z" fill="white" opacity="0.92" />
    </svg>
  );
}

export function Icon3dHeart({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_heart" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" /><stop offset="1" stopColor="#DB2777" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#DB277720" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_heart)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 35s-10-6.5-10-13a6 6 0 0 1 10-4.47A6 6 0 0 1 34 22c0 6.5-10 13-10 13z" fill="white" opacity="0.92" />
    </svg>
  );
}

export function Icon3dShield({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_shield" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" /><stop offset="1" stopColor="#0D9488" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0D948820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_shield)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 11l-10 5v7c0 7.73 4.66 14.35 10 16 5.34-1.65 10-8.27 10-16v-7l-10-5z" fill="white" opacity="0.92" />
      <path d="M20 24l3 3 5-6" stroke="#0D9488" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

export function Icon3dGrid({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_grid" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6D28D920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_grid)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="12" width="9" height="9" rx="2.5" fill="white" opacity="0.92" />
      <rect x="25" y="12" width="9" height="9" rx="2.5" fill="white" opacity="0.75" />
      <rect x="12" y="25" width="9" height="9" rx="2.5" fill="white" opacity="0.75" />
      <rect x="25" y="25" width="9" height="9" rx="2.5" fill="white" opacity="0.6" />
    </svg>
  );
}

export function Icon3dLayers({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_layers" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#4338CA20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_layers)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 14l-12 6 12 6 12-6-12-6z" fill="white" opacity="0.92" />
      <path d="M12 24l12 6 12-6" stroke="white" strokeWidth="2" fill="none" opacity="0.65" />
      <path d="M12 29l12 6 12-6" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  );
}

export function Icon3dCode({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_code" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6B7280" /><stop offset="1" stopColor="#374151" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#37415120" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_code)" filter="url(#sh)" />
      <Highlight />
      <path d="M19 17l-6 7 6 7" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
      <path d="M29 17l6 7-6 7" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
      <line x1="22" y1="33" x2="26" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function Icon3dGlobe({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_globe" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" /><stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0891B220" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_globe)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2" fill="none" opacity="0.92" />
      <ellipse cx="24" cy="24" rx="5" ry="11" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      <line x1="13" y1="24" x2="35" y2="24" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="13" x2="24" y2="35" stroke="white" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  PROJECT TYPE ICONS (39–47)
 * ═══════════════════════════════════════════════════════════════════ */

export function Icon3dMonitor({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_monitor" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#4338CA20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_monitor)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="13" width="28" height="18" rx="3" fill="white" opacity="0.92" />
      <rect x="20" y="31" width="8" height="2" rx="1" fill="white" opacity="0.7" />
      <rect x="17" y="33" width="14" height="2" rx="1" fill="white" opacity="0.55" />
    </svg>
  );
}

export function Icon3dBriefcase({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_briefcase" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A16207" /><stop offset="1" stopColor="#854D0E" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#854D0E20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_briefcase)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="18" width="28" height="18" rx="3" fill="white" opacity="0.92" />
      <path d="M19 18v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
      <rect x="10" y="25" width="28" height="2" fill="white" opacity="0.4" />
    </svg>
  );
}

export function Icon3dUsers({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_users" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1D4ED820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_users)" filter="url(#sh)" />
      <Highlight />
      <circle cx="20" cy="19" r="4.5" fill="white" opacity="0.92" />
      <path d="M11 33c0-5 4-9 9-9s9 4 9 9" fill="white" opacity="0.85" />
      <circle cx="31" cy="17" r="3.5" fill="white" opacity="0.65" />
      <path d="M26 33c0-3.5 2.5-7 5-8.5 3.5 1 6 4.5 6 8.5" fill="white" opacity="0.5" />
    </svg>
  );
}

export function Icon3dGraduation({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_graduation" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#4338CA20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_graduation)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 14l-14 7 14 7 14-7-14-7z" fill="white" opacity="0.92" />
      <path d="M15 24v8c0 2 4 5 9 5s9-3 9-5v-8" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
      <line x1="38" y1="21" x2="38" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function Icon3dWorkflow({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_workflow" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6D28D920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_workflow)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="12" width="10" height="7" rx="2" fill="white" opacity="0.92" />
      <rect x="27" y="12" width="10" height="7" rx="2" fill="white" opacity="0.75" />
      <rect x="19" y="29" width="10" height="7" rx="2" fill="white" opacity="0.92" />
      <line x1="16" y1="19" x2="16" y2="25" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="32" y1="19" x2="32" y2="25" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="16" y1="25" x2="32" y2="25" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="24" y1="25" x2="24" y2="29" stroke="white" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

export function Icon3dDashboard({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_dashboard" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EA580C20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_dashboard)" filter="url(#sh)" />
      <Highlight />
      <path d="M12 30a12 12 0 0 1 24 0" stroke="white" strokeWidth="3" fill="none" opacity="0.92" strokeLinecap="round" />
      <line x1="24" y1="30" x2="30" y2="21" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <circle cx="24" cy="30" r="2.5" fill="white" opacity="0.92" />
      {/* tick marks */}
      <line x1="14" y1="28" x2="14" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="24" y1="18" x2="24" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="34" y1="28" x2="34" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function Icon3dBooking({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_booking" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" /><stop offset="1" stopColor="#0D9488" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0D948820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_booking)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="14" width="26" height="22" rx="3" fill="white" opacity="0.92" />
      <rect x="11" y="14" width="26" height="7" rx="3" fill="white" opacity="0.6" />
      <rect x="17" y="11" width="2" height="5" rx="1" fill="white" opacity="0.85" />
      <rect x="29" y="11" width="2" height="5" rx="1" fill="white" opacity="0.85" />
      <path d="M19 27l3 3 7-7" stroke="#0D9488" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

export function Icon3dStore({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_store" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EA580C20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_store)" filter="url(#sh)" />
      <Highlight />
      <path d="M12 22h24v14a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V22z" fill="white" opacity="0.85" />
      <path d="M12 18l2-6h20l2 6" stroke="white" strokeWidth="2" fill="white" opacity="0.92" strokeLinejoin="round" />
      <path d="M16 18v4M24 18v4M32 18v4" stroke="#EA580C" strokeWidth="1" opacity="0.25" />
      <rect x="20" y="30" width="8" height="8" rx="1.5" fill="#EA580C" opacity="0.25" />
    </svg>
  );
}

export function Icon3dSparkle({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_sparkle" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" /><stop offset="0.5" stopColor="#F59E0B" /><stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#F59E0B20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_sparkle)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 12l2.5 8.5L35 23l-8.5 2.5L24 34l-2.5-8.5L13 23l8.5-2.5L24 12z" fill="white" opacity="0.92" />
      <path d="M34 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="white" opacity="0.6" />
      <path d="M14 30l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2L11 33l2.2-.8.8-2.2z" fill="white" opacity="0.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  INDUSTRY ICONS (48–58)
 * ═══════════════════════════════════════════════════════════════════ */

export function Icon3dGovernment({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_government" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1D4ED820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_government)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 12l-12 7h24l-12-7z" fill="white" opacity="0.92" />
      <rect x="12" y="33" width="24" height="3" rx="1" fill="white" opacity="0.85" />
      <rect x="15" y="20" width="3" height="13" rx="1" fill="white" opacity="0.75" />
      <rect x="22.5" y="20" width="3" height="13" rx="1" fill="white" opacity="0.75" />
      <rect x="30" y="20" width="3" height="13" rx="1" fill="white" opacity="0.75" />
    </svg>
  );
}

export function Icon3dSchool({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_school" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" /><stop offset="1" stopColor="#059669" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#05966920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_school)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="20" width="26" height="16" rx="2" fill="white" opacity="0.85" />
      <path d="M24 12l-13 8h26l-13-8z" fill="white" opacity="0.92" />
      <rect x="21" y="28" width="6" height="8" rx="1" fill="#059669" opacity="0.3" />
      <rect x="14" y="24" width="4" height="4" rx="1" fill="#059669" opacity="0.15" />
      <rect x="30" y="24" width="4" height="4" rx="1" fill="#059669" opacity="0.15" />
    </svg>
  );
}

export function Icon3dHospital({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_hospital" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" /><stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#DC262620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_hospital)" filter="url(#sh)" />
      <Highlight />
      <rect x="14" y="14" width="20" height="22" rx="3" fill="white" opacity="0.92" />
      <rect x="22" y="18" width="4" height="12" rx="1" fill="#DC2626" opacity="0.5" />
      <rect x="18" y="22" width="12" height="4" rx="1" fill="#DC2626" opacity="0.5" />
    </svg>
  );
}

export function Icon3dBuilding({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_building" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" /><stop offset="1" stopColor="#0D9488" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0D948820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_building)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="14" width="14" height="22" rx="2" fill="white" opacity="0.92" />
      <rect x="26" y="22" width="10" height="14" rx="2" fill="white" opacity="0.75" />
      <rect x="15" y="18" width="3" height="3" rx="0.5" fill="#0D9488" opacity="0.25" />
      <rect x="21" y="18" width="3" height="3" rx="0.5" fill="#0D9488" opacity="0.25" />
      <rect x="15" y="24" width="3" height="3" rx="0.5" fill="#0D9488" opacity="0.25" />
      <rect x="21" y="24" width="3" height="3" rx="0.5" fill="#0D9488" opacity="0.25" />
      <rect x="15" y="30" width="3" height="3" rx="0.5" fill="#0D9488" opacity="0.25" />
      <rect x="21" y="30" width="3" height="3" rx="0.5" fill="#0D9488" opacity="0.25" />
      <rect x="29" y="26" width="3" height="3" rx="0.5" fill="#0D9488" opacity="0.2" />
      <rect x="29" y="32" width="3" height="3" rx="0.5" fill="#0D9488" opacity="0.2" />
    </svg>
  );
}

export function Icon3dPeople({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_people" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6D28D920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_people)" filter="url(#sh)" />
      <Highlight />
      <circle cx="17" cy="18" r="4" fill="white" opacity="0.92" />
      <circle cx="31" cy="18" r="4" fill="white" opacity="0.75" />
      <path d="M10 34c0-4.42 3.13-8 7-8s7 3.58 7 8" fill="white" opacity="0.85" />
      <path d="M24 34c0-4.42 3.13-8 7-8s7 3.58 7 8" fill="white" opacity="0.65" />
    </svg>
  );
}

export function Icon3dFactory({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_factory" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9CA3AF" /><stop offset="1" stopColor="#6B7280" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6B728020" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_factory)" filter="url(#sh)" />
      <Highlight />
      <path d="M10 36V22l8 4V18l8 4V14l12 8v14H10z" fill="white" opacity="0.92" />
      <rect x="14" y="30" width="4" height="6" rx="1" fill="#6B7280" opacity="0.25" />
      <rect x="22" y="30" width="4" height="6" rx="1" fill="#6B7280" opacity="0.25" />
      <rect x="30" y="30" width="4" height="6" rx="1" fill="#6B7280" opacity="0.25" />
    </svg>
  );
}

export function Icon3dTruck({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_truck" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1D4ED820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_truck)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="17" width="18" height="14" rx="2" fill="white" opacity="0.92" />
      <path d="M28 22h6l4 5v4a2 2 0 0 1-2 2h-8V22z" fill="white" opacity="0.75" />
      <circle cx="17" cy="33" r="2.5" fill="white" opacity="0.92" />
      <circle cx="17" cy="33" r="1" fill="#1D4ED8" opacity="0.5" />
      <circle cx="33" cy="33" r="2.5" fill="white" opacity="0.92" />
      <circle cx="33" cy="33" r="1" fill="#1D4ED8" opacity="0.5" />
    </svg>
  );
}

export function Icon3dShoppingCart({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_cart" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EA580C20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_cart)" filter="url(#sh)" />
      <Highlight />
      <path d="M12 14h3l3 14h16l3-10H18" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
      <circle cx="19" cy="33" r="2.5" fill="white" opacity="0.92" />
      <circle cx="32" cy="33" r="2.5" fill="white" opacity="0.92" />
    </svg>
  );
}

export function Icon3dBank({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_bank" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#D9770620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_bank)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 12l-13 8h26l-13-8z" fill="white" opacity="0.92" />
      <rect x="12" y="34" width="24" height="2.5" rx="1" fill="white" opacity="0.85" />
      <rect x="14" y="21" width="3" height="13" rx="1" fill="white" opacity="0.7" />
      <rect x="20.5" y="21" width="3" height="13" rx="1" fill="white" opacity="0.7" />
      <rect x="27" y="21" width="3" height="13" rx="1" fill="white" opacity="0.7" />
      <rect x="33" y="21" width="3" height="13" rx="1" fill="white" opacity="0.7" />
    </svg>
  );
}

export function Icon3dHotel({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_hotel" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#DC262620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_hotel)" filter="url(#sh)" />
      <Highlight />
      <rect x="13" y="14" width="22" height="22" rx="3" fill="white" opacity="0.92" />
      <rect x="17" y="18" width="5" height="4" rx="1" fill="#DC2626" opacity="0.2" />
      <rect x="26" y="18" width="5" height="4" rx="1" fill="#DC2626" opacity="0.2" />
      <rect x="17" y="25" width="5" height="4" rx="1" fill="#DC2626" opacity="0.2" />
      <rect x="26" y="25" width="5" height="4" rx="1" fill="#DC2626" opacity="0.2" />
      <rect x="21" y="32" width="6" height="4" rx="1" fill="#DC2626" opacity="0.35" />
    </svg>
  );
}

export function Icon3dPuzzle({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_puzzle" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9CA3AF" /><stop offset="1" stopColor="#6B7280" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6B728020" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_puzzle)" filter="url(#sh)" />
      <Highlight />
      <path d="M22 14h-6a2 2 0 0 0-2 2v5a3 3 0 1 1 0 6v5a2 2 0 0 0 2 2h5a3 3 0 1 1 6 0h5a2 2 0 0 0 2-2v-6a3 3 0 1 1 0-6v-4a2 2 0 0 0-2-2h-4a3 3 0 1 1-6 0z" fill="white" opacity="0.92" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  ADDITIONAL FIELD TYPE ICONS (27–50)
 * ═══════════════════════════════════════════════════════════════════ */

export function Icon3dIban({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_iban" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1D4ED8" /><stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1D4ED820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_iban)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="16" width="24" height="16" rx="3" fill="white" opacity="0.92" />
      <rect x="15" y="20" width="8" height="2" rx="1" fill="#1D4ED8" opacity="0.6" />
      <rect x="25" y="20" width="8" height="2" rx="1" fill="#1D4ED8" opacity="0.4" />
      <rect x="15" y="24" width="5" height="2" rx="1" fill="#1D4ED8" opacity="0.5" />
      <rect x="22" y="24" width="5" height="2" rx="1" fill="#1D4ED8" opacity="0.5" />
      <rect x="29" y="24" width="4" height="2" rx="1" fill="#1D4ED8" opacity="0.5" />
      <rect x="15" y="28" width="6" height="2" rx="1" fill="#1D4ED8" opacity="0.3" />
    </svg>
  );
}

export function Icon3dCreditCard({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_cc" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" /><stop offset="1" stopColor="#5B21B6" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#7C3AED20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_cc)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="15" width="28" height="18" rx="3" fill="white" opacity="0.92" />
      <rect x="10" y="20" width="28" height="4" fill="#7C3AED" opacity="0.35" />
      <rect x="14" y="27" width="6" height="2" rx="1" fill="#7C3AED" opacity="0.5" />
      <rect x="22" y="27" width="6" height="2" rx="1" fill="#7C3AED" opacity="0.5" />
      <rect x="30" y="27" width="4" height="2" rx="1" fill="#7C3AED" opacity="0.5" />
      <circle cx="32" cy="18" r="2.5" fill="#F59E0B" opacity="0.7" />
      <circle cx="35" cy="18" r="2.5" fill="#EF4444" opacity="0.5" />
    </svg>
  );
}

export function Icon3dVat({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_vat" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" /><stop offset="1" stopColor="#047857" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#05966920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_vat)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="14" width="24" height="20" rx="3" fill="white" opacity="0.92" />
      <rect x="16" y="18" width="8" height="2" rx="1" fill="#059669" opacity="0.5" />
      <rect x="16" y="22" width="16" height="2" rx="1" fill="#059669" opacity="0.35" />
      <rect x="16" y="26" width="12" height="2" rx="1" fill="#059669" opacity="0.25" />
      <path d="M28 17l2 4 2-4" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.7" />
      <text x="30" y="30" fontSize="6" fill="#059669" fontWeight="bold" opacity="0.6" textAnchor="middle">%</text>
    </svg>
  );
}

export function Icon3dCR({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_cr" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B45309" /><stop offset="1" stopColor="#92400E" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#B4530920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_cr)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="13" width="26" height="22" rx="3" fill="white" opacity="0.92" />
      <circle cx="18" cy="20" r="3" fill="#B45309" opacity="0.3" />
      <rect x="24" y="18" width="10" height="2" rx="1" fill="#B45309" opacity="0.5" />
      <rect x="24" y="22" width="7" height="2" rx="1" fill="#B45309" opacity="0.3" />
      <rect x="14" y="28" width="20" height="2" rx="1" fill="#B45309" opacity="0.2" />
      <rect x="14" y="32" width="14" height="1.5" rx="0.75" fill="#B45309" opacity="0.15" />
    </svg>
  );
}

export function Icon3dPassport({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_pass" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E3A5F" /><stop offset="1" stopColor="#0F2440" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1E3A5F20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_pass)" filter="url(#sh)" />
      <Highlight />
      <rect x="14" y="10" width="20" height="28" rx="3" fill="white" opacity="0.92" />
      <circle cx="24" cy="22" r="5" fill="#1E3A5F" opacity="0.2" />
      <circle cx="24" cy="21" r="2" fill="#1E3A5F" opacity="0.35" />
      <path d="M20 25c0-2 1.8-3 4-3s4 1 4 3" fill="#1E3A5F" opacity="0.2" />
      <rect x="17" y="30" width="14" height="1.5" rx="0.75" fill="#1E3A5F" opacity="0.3" />
      <rect x="19" y="33" width="10" height="1.5" rx="0.75" fill="#1E3A5F" opacity="0.2" />
    </svg>
  );
}

export function Icon3dBirthday({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_bday" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" /><stop offset="1" stopColor="#BE185D" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EC489920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_bday)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="22" width="24" height="14" rx="3" fill="white" opacity="0.92" />
      <rect x="12" y="22" width="24" height="5" rx="2" fill="#EC4899" opacity="0.25" />
      <rect x="20" y="14" width="2" height="10" rx="1" fill="white" opacity="0.7" />
      <rect x="26" y="16" width="2" height="8" rx="1" fill="white" opacity="0.7" />
      <ellipse cx="21" cy="13" rx="2" ry="2.5" fill="#FDE68A" opacity="0.8" />
      <ellipse cx="27" cy="15" rx="2" ry="2.5" fill="#FDE68A" opacity="0.8" />
    </svg>
  );
}

export function Icon3dGender({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_gender" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#8B5CF620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_gender)" filter="url(#sh)" />
      <Highlight />
      <circle cx="20" cy="24" r="6" stroke="white" strokeWidth="2.5" fill="none" opacity="0.9" />
      <line x1="20" y1="30" x2="20" y2="37" stroke="white" strokeWidth="2.5" opacity="0.9" />
      <line x1="17" y1="34" x2="23" y2="34" stroke="white" strokeWidth="2" opacity="0.7" />
      <circle cx="31" cy="20" r="5" stroke="white" strokeWidth="2.5" fill="none" opacity="0.9" />
      <line x1="34.5" y1="16.5" x2="38" y2="13" stroke="white" strokeWidth="2.5" opacity="0.9" />
      <line x1="35" y1="13" x2="38" y2="13" stroke="white" strokeWidth="2" opacity="0.7" />
      <line x1="38" y1="13" x2="38" y2="16" stroke="white" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

export function Icon3dNationality({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_nat" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" /><stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0EA5E920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_nat)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
      <ellipse cx="24" cy="24" rx="6" ry="12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      <line x1="12" y1="24" x2="36" y2="24" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="14" y1="19" x2="34" y2="19" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="14" y1="29" x2="34" y2="29" stroke="white" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export function Icon3dEmergency({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_emer" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" /><stop offset="1" stopColor="#B91C1C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#EF444420" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_emer)" filter="url(#sh)" />
      <Highlight />
      <rect x="19" y="12" width="10" height="24" rx="2" fill="white" opacity="0.92" />
      <rect x="12" y="19" width="24" height="10" rx="2" fill="white" opacity="0.92" />
      <circle cx="35" cy="14" r="4" fill="#FEE2E2" opacity="0.8" />
      <circle cx="35" cy="14" r="2" fill="#EF4444" opacity="0.6" />
    </svg>
  );
}

export function Icon3dSocial({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_social" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6" /><stop offset="1" stopColor="#DB2777" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#F472B620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_social)" filter="url(#sh)" />
      <Highlight />
      <circle cx="18" cy="18" r="4" fill="white" opacity="0.9" />
      <circle cx="30" cy="18" r="4" fill="white" opacity="0.9" />
      <circle cx="24" cy="30" r="4" fill="white" opacity="0.9" />
      <line x1="21" y1="20" x2="22" y2="28" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="27" y1="20" x2="26" y2="28" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="22" y1="18" x2="26" y2="18" stroke="white" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

export function Icon3dRichText({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_rt" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6366F120" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_rt)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="12" width="26" height="24" rx="3" fill="white" opacity="0.92" />
      <text x="16" y="22" fontSize="8" fill="#6366F1" fontWeight="bold" opacity="0.7">B</text>
      <text x="24" y="22" fontSize="8" fill="#6366F1" fontStyle="italic" opacity="0.5">I</text>
      <text x="30" y="22" fontSize="8" fill="#6366F1" opacity="0.4" textDecoration="underline">U</text>
      <rect x="14" y="26" width="20" height="1.5" rx="0.75" fill="#6366F1" opacity="0.3" />
      <rect x="14" y="29" width="16" height="1.5" rx="0.75" fill="#6366F1" opacity="0.2" />
      <rect x="14" y="32" width="12" height="1.5" rx="0.75" fill="#6366F1" opacity="0.15" />
    </svg>
  );
}

export function Icon3dMultiSelect({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_ms" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" /><stop offset="1" stopColor="#0D9488" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#14B8A620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_ms)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="17" width="12" height="7" rx="3.5" fill="white" opacity="0.92" />
      <rect x="26" y="17" width="12" height="7" rx="3.5" fill="white" opacity="0.92" />
      <rect x="10" y="27" width="14" height="7" rx="3.5" fill="white" opacity="0.92" />
      <rect x="28" y="27" width="10" height="7" rx="3.5" fill="white" opacity="0.92" />
      <circle cx="32" cy="20.5" r="1.5" fill="#14B8A6" opacity="0.5" />
      <circle cx="34" cy="30.5" r="1.5" fill="#14B8A6" opacity="0.5" />
    </svg>
  );
}

export function Icon3dAutocomplete({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_ac" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" /><stop offset="1" stopColor="#C2410C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#F9731620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_ac)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="14" width="28" height="8" rx="3" fill="white" opacity="0.92" />
      <rect x="14" y="17" width="10" height="2" rx="1" fill="#F97316" opacity="0.4" />
      <line x1="32" y1="16" x2="32" y2="20" stroke="#F97316" strokeWidth="1.5" opacity="0.5" />
      <rect x="10" y="24" width="28" height="14" rx="3" fill="white" opacity="0.85" />
      <rect x="14" y="27" width="18" height="2" rx="1" fill="#F97316" opacity="0.3" />
      <rect x="14" y="31" width="14" height="2" rx="1" fill="#F97316" opacity="0.2" />
      <rect x="14" y="35" width="16" height="2" rx="1" fill="#F97316" opacity="0.15" />
    </svg>
  );
}

export function Icon3dDateTime({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_dt" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#8B5CF620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_dt)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="12" width="18" height="18" rx="3" fill="white" opacity="0.92" />
      <rect x="10" y="12" width="18" height="5" rx="2" fill="#8B5CF6" opacity="0.3" />
      <circle cx="32" cy="28" r="8" fill="white" opacity="0.92" />
      <line x1="32" y1="28" x2="32" y2="23" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.7" />
      <line x1="32" y1="28" x2="36" y2="28" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
      <circle cx="32" cy="28" r="1" fill="#8B5CF6" opacity="0.6" />
    </svg>
  );
}

export function Icon3dMapLocation({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_map" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" /><stop offset="1" stopColor="#059669" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#10B98120" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_map)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 10c-5.5 0-10 4.5-10 10 0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10z" fill="white" opacity="0.92" />
      <circle cx="24" cy="20" r="4" fill="#10B981" opacity="0.5" />
      <circle cx="24" cy="20" r="2" fill="#10B981" opacity="0.7" />
    </svg>
  );
}

export function Icon3dSignature({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_sig" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E293B" /><stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1E293B20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_sig)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="14" width="28" height="20" rx="3" fill="white" opacity="0.92" />
      <path d="M14 28c2-4 4-1 6-5s3 2 5-1 3 3 5 0 3-2 4 0" stroke="#1E293B" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
      <line x1="14" y1="31" x2="34" y2="31" stroke="#1E293B" strokeWidth="1" opacity="0.2" strokeDasharray="2 2" />
    </svg>
  );
}

export function Icon3dAvatar({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_avt" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" /><stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#06B6D420" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_avt)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="12" fill="white" opacity="0.92" />
      <circle cx="24" cy="21" r="4.5" fill="#06B6D4" opacity="0.4" />
      <path d="M15.5 34c0-5 3.8-8.5 8.5-8.5s8.5 3.5 8.5 8.5" fill="#06B6D4" opacity="0.25" />
      <circle cx="33" cy="33" r="5" fill="white" opacity="0.95" />
      <line x1="31" y1="33" x2="35" y2="33" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
      <line x1="33" y1="31" x2="33" y2="35" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

export function Icon3dPin({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_pin" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DC2626" /><stop offset="1" stopColor="#991B1B" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#DC262620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_pin)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="18" width="7" height="10" rx="2" fill="white" opacity="0.92" />
      <rect x="20" y="18" width="7" height="10" rx="2" fill="white" opacity="0.92" />
      <rect x="30" y="18" width="7" height="10" rx="2" fill="white" opacity="0.92" />
      <circle cx="13.5" cy="23" r="1.5" fill="#DC2626" opacity="0.5" />
      <circle cx="23.5" cy="23" r="1.5" fill="#DC2626" opacity="0.5" />
      <circle cx="33.5" cy="23" r="1.5" fill="#DC2626" opacity="0.5" />
      <rect x="40" y="18" width="2" height="10" rx="1" fill="white" opacity="0.3" />
    </svg>
  );
}

export function Icon3dLicense({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_lic" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" /><stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0284C720" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_lic)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="14" width="28" height="20" rx="3" fill="white" opacity="0.92" />
      <rect x="14" y="18" width="8" height="8" rx="2" fill="#0284C7" opacity="0.2" />
      <rect x="25" y="18" width="10" height="2" rx="1" fill="#0284C7" opacity="0.5" />
      <rect x="25" y="22" width="7" height="2" rx="1" fill="#0284C7" opacity="0.3" />
      <rect x="14" y="29" width="21" height="2" rx="1" fill="#0284C7" opacity="0.2" />
    </svg>
  );
}

export function Icon3dInvoice({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_inv" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" /><stop offset="1" stopColor="#047857" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#05966920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_inv)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="10" width="24" height="28" rx="3" fill="white" opacity="0.92" />
      <rect x="16" y="15" width="16" height="2" rx="1" fill="#059669" opacity="0.5" />
      <rect x="16" y="20" width="10" height="1.5" rx="0.75" fill="#059669" opacity="0.3" />
      <rect x="28" y="20" width="4" height="1.5" rx="0.75" fill="#059669" opacity="0.3" />
      <rect x="16" y="24" width="10" height="1.5" rx="0.75" fill="#059669" opacity="0.2" />
      <rect x="28" y="24" width="4" height="1.5" rx="0.75" fill="#059669" opacity="0.2" />
      <line x1="16" y1="28" x2="32" y2="28" stroke="#059669" strokeWidth="1" opacity="0.3" />
      <rect x="24" y="30" width="8" height="2" rx="1" fill="#059669" opacity="0.5" />
    </svg>
  );
}

export function Icon3dBarcode({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_bar" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#374151" /><stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#37415120" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_bar)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="14" width="28" height="20" rx="3" fill="white" opacity="0.92" />
      <rect x="14" y="18" width="2" height="12" fill="#374151" opacity="0.8" />
      <rect x="18" y="18" width="1" height="12" fill="#374151" opacity="0.6" />
      <rect x="21" y="18" width="3" height="12" fill="#374151" opacity="0.8" />
      <rect x="26" y="18" width="1" height="12" fill="#374151" opacity="0.5" />
      <rect x="29" y="18" width="2" height="12" fill="#374151" opacity="0.7" />
      <rect x="33" y="18" width="1" height="12" fill="#374151" opacity="0.8" />
    </svg>
  );
}

export function Icon3dPriority({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_pri" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#F59E0B20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_pri)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="30" width="6" height="6" rx="1.5" fill="white" opacity="0.5" />
      <rect x="21" y="24" width="6" height="12" rx="1.5" fill="white" opacity="0.7" />
      <rect x="30" y="16" width="6" height="20" rx="1.5" fill="white" opacity="0.92" />
      <path d="M32 12l1.5-2 1.5 2" fill="white" opacity="0.8" />
    </svg>
  );
}

export function Icon3dStatus({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_stat" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E" /><stop offset="1" stopColor="#16A34A" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#22C55E20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_stat)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="12" fill="white" opacity="0.92" />
      <circle cx="24" cy="24" r="8" fill="#22C55E" opacity="0.2" />
      <circle cx="24" cy="24" r="4" fill="#22C55E" opacity="0.5" />
      <path d="M28 14l4-2v6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

export function Icon3dIpAddress({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_ip" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64748B" /><stop offset="1" stopColor="#475569" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#64748B20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_ip)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="18" width="28" height="12" rx="3" fill="white" opacity="0.92" />
      <text x="14" y="27" fontSize="7" fill="#64748B" fontFamily="monospace" opacity="0.7">192.168</text>
      <circle cx="24" cy="13" r="3" fill="white" opacity="0.7" />
      <circle cx="15" cy="35" r="3" fill="white" opacity="0.7" />
      <circle cx="33" cy="35" r="3" fill="white" opacity="0.7" />
      <line x1="24" y1="16" x2="24" y2="18" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <line x1="17" y1="33" x2="22" y2="30" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="31" y1="33" x2="26" y2="30" stroke="white" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function Icon3dQuantity({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_qty" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#3B82F620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_qty)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="18" width="8" height="12" rx="3" fill="white" opacity="0.92" />
      <line x1="12" y1="24" x2="16" y2="24" stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
      <rect x="20" y="18" width="8" height="12" rx="3" fill="white" opacity="0.92" />
      <text x="24" y="27" fontSize="10" fill="#3B82F6" opacity="0.7" textAnchor="middle">3</text>
      <rect x="30" y="18" width="8" height="12" rx="3" fill="white" opacity="0.92" />
      <line x1="32" y1="24" x2="36" y2="24" stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
      <line x1="34" y1="22" x2="34" y2="26" stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════ *
 *  ADDITIONAL FIELD TYPE ICONS (51–70)
 * ═══════════════════════════════════════════════════════════════════ */

export function Icon3dWhatsapp({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_wa" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#25D366" /><stop offset="1" stopColor="#128C7E" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#25D36620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_wa)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="12" fill="white" opacity="0.92" />
      <path d="M24 14c-5.5 0-10 4.5-10 10 0 1.8.5 3.4 1.3 4.8L14 34l5.4-1.4c1.3.7 2.8 1.1 4.4 1.1h.2c5.5 0 10-4.5 10-10s-4.5-10-10-10z" fill="#25D366" opacity="0.4" />
      <path d="M29 26.5c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.2-.8 0s-1.5-.6-2.9-1.8c-1.1-1-1.8-2.1-2-2.5-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.2-.4.4-.6.1-.2.1-.4 0-.6-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-1 .4-.3.4-1.3 1.3-1.3 3.1s1.4 3.6 1.5 3.8c.2.2 2.7 4.1 6.5 5.7.9.4 1.6.6 2.2.8.9.3 1.7.2 2.4.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5z" fill="white" opacity="0.85" />
    </svg>
  );
}

export function Icon3dMention({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_mention" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" /><stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#6366F120" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_mention)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="2.5" fill="none" opacity="0.9" />
      <circle cx="24" cy="24" r="4" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M28 24c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4h0c1 0 2-.4 2.7-1" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
      <line x1="28" y1="20" x2="28" y2="28" stroke="white" strokeWidth="2" opacity="0.7" />
      <path d="M28 28c1.5 1.5 3.5 1 5-1" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

export function Icon3dMarkdown({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_md" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#374151" /><stop offset="1" stopColor="#111827" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#37415120" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_md)" filter="url(#sh)" />
      <Highlight />
      <rect x="8" y="14" width="32" height="20" rx="3" fill="white" opacity="0.92" />
      <text x="14" y="28" fontSize="10" fill="#374151" fontWeight="bold" opacity="0.7">M↓</text>
      <rect x="28" y="19" width="8" height="2" rx="1" fill="#374151" opacity="0.3" />
      <rect x="28" y="23" width="6" height="2" rx="1" fill="#374151" opacity="0.2" />
      <rect x="28" y="27" width="7" height="2" rx="1" fill="#374151" opacity="0.15" />
    </svg>
  );
}

export function Icon3dCodeEditor({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_code_ed" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" /><stop offset="1" stopColor="#0284C7" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0EA5E920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_code_ed)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="12" width="28" height="24" rx="3" fill="white" opacity="0.92" />
      <rect x="10" y="12" width="28" height="5" rx="2" fill="#0EA5E9" opacity="0.15" />
      <rect x="14" y="21" width="4" height="2" rx="1" fill="#0EA5E9" opacity="0.5" />
      <rect x="20" y="21" width="8" height="2" rx="1" fill="#F59E0B" opacity="0.5" />
      <rect x="17" y="25" width="6" height="2" rx="1" fill="#10B981" opacity="0.5" />
      <rect x="25" y="25" width="4" height="2" rx="1" fill="#0EA5E9" opacity="0.3" />
      <rect x="14" y="29" width="10" height="2" rx="1" fill="#8B5CF6" opacity="0.4" />
      <rect x="26" y="29" width="5" height="2" rx="1" fill="#0EA5E9" opacity="0.3" />
    </svg>
  );
}

export function Icon3dBankAccount({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_ba" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" /><stop offset="1" stopColor="#115E59" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0F766E20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_ba)" filter="url(#sh)" />
      <Highlight />
      <path d="M24 12l-14 8h28l-14-8z" fill="white" opacity="0.92" />
      <rect x="14" y="22" width="3" height="10" rx="1" fill="white" opacity="0.8" />
      <rect x="22" y="22" width="3" height="10" rx="1" fill="white" opacity="0.8" />
      <rect x="30" y="22" width="3" height="10" rx="1" fill="white" opacity="0.8" />
      <rect x="10" y="33" width="28" height="3" rx="1" fill="white" opacity="0.92" />
    </svg>
  );
}

export function Icon3dSalary({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_sal" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" /><stop offset="1" stopColor="#15803D" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#16A34A20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_sal)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="14" width="28" height="20" rx="3" fill="white" opacity="0.92" />
      <circle cx="24" cy="24" r="6" fill="#16A34A" opacity="0.15" />
      <text x="24" y="28" fontSize="10" fill="#16A34A" fontWeight="bold" opacity="0.6" textAnchor="middle">$</text>
      <rect x="14" y="17" width="4" height="2" rx="1" fill="#16A34A" opacity="0.3" />
      <rect x="30" y="17" width="4" height="2" rx="1" fill="#16A34A" opacity="0.3" />
    </svg>
  );
}

export function Icon3dPayment({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_pay" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" /><stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#7C3AED20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_pay)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="17" width="20" height="14" rx="2.5" fill="white" opacity="0.85" />
      <rect x="10" y="21" width="20" height="3" fill="#7C3AED" opacity="0.2" />
      <circle cx="34" cy="28" r="7" fill="white" opacity="0.92" />
      <path d="M32 28l1.5 1.5 3-3" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function Icon3dDuration({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_dur" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D97706" /><stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#D9770620" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_dur)" filter="url(#sh)" />
      <Highlight />
      <path d="M18 14h12v3l-4 5 4 5v3H18v-3l4-5-4-5v-3z" fill="white" opacity="0.92" />
      <path d="M20 30v1l4-4-4-4v1h8" fill="#D97706" opacity="0.25" />
    </svg>
  );
}

export function Icon3dTimezone({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_tz" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" /><stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#2563EB20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_tz)" filter="url(#sh)" />
      <Highlight />
      <circle cx="20" cy="24" r="10" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
      <ellipse cx="20" cy="24" rx="5" ry="10" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
      <line x1="10" y1="24" x2="30" y2="24" stroke="white" strokeWidth="1" opacity="0.4" />
      <circle cx="34" cy="18" r="6" fill="white" opacity="0.92" />
      <line x1="34" y1="18" x2="34" y2="15" stroke="#2563EB" strokeWidth="1.5" opacity="0.7" />
      <line x1="34" y1="18" x2="37" y2="18" stroke="#2563EB" strokeWidth="1.5" opacity="0.5" />
      <circle cx="34" cy="18" r="0.8" fill="#2563EB" opacity="0.6" />
    </svg>
  );
}

export function Icon3dSchedule({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_sched" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" /><stop offset="1" stopColor="#047857" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#05966920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_sched)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="12" width="28" height="24" rx="3" fill="white" opacity="0.92" />
      <rect x="10" y="12" width="28" height="6" rx="2" fill="#059669" opacity="0.2" />
      <circle cx="17" cy="24" r="2" fill="#059669" opacity="0.5" />
      <circle cx="24" cy="24" r="2" fill="#059669" opacity="0.3" />
      <circle cx="31" cy="24" r="2" fill="#059669" opacity="0.5" />
      <circle cx="17" cy="30" r="2" fill="#059669" opacity="0.3" />
      <circle cx="24" cy="30" r="2" fill="#059669" opacity="0.5" />
      <circle cx="31" cy="30" r="2" fill="#059669" opacity="0.3" />
      <path d="M16 23l1 1.5 2.5-2.5" stroke="white" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}

export function Icon3dWeight({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_wt" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#78716C" /><stop offset="1" stopColor="#57534E" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#78716C20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_wt)" filter="url(#sh)" />
      <Highlight />
      <path d="M15 34h18l-3-18h-12l-3 18z" fill="white" opacity="0.92" />
      <circle cx="24" cy="14" r="3" fill="white" opacity="0.8" />
      <text x="24" y="28" fontSize="7" fill="#78716C" fontWeight="bold" opacity="0.5" textAnchor="middle">kg</text>
    </svg>
  );
}

export function Icon3dDimensions({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_dim" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0891B2" /><stop offset="1" stopColor="#0E7490" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#0891B220" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_dim)" filter="url(#sh)" />
      <Highlight />
      <path d="M14 30l10-6 10 6v-10l-10-6-10 6v10z" fill="white" opacity="0.92" />
      <path d="M14 30l10-6 10 6" stroke="#0891B2" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M24 24v10" stroke="#0891B2" strokeWidth="1" opacity="0.3" />
      <line x1="14" y1="20" x2="14" y2="30" stroke="#0891B2" strokeWidth="1" opacity="0.3" />
      <text x="10" y="26" fontSize="5" fill="white" opacity="0.6">H</text>
      <text x="18" y="36" fontSize="5" fill="white" opacity="0.6">W</text>
      <text x="30" y="23" fontSize="5" fill="white" opacity="0.6">L</text>
    </svg>
  );
}

export function Icon3dTreeSelect({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_tree" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" /><stop offset="1" stopColor="#15803D" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#16A34A20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_tree)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="13" width="10" height="5" rx="2" fill="white" opacity="0.92" />
      <line x1="17" y1="18" x2="17" y2="22" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="17" y1="22" x2="13" y2="22" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="17" y1="22" x2="30" y2="22" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <rect x="9" y="24" width="8" height="4" rx="1.5" fill="white" opacity="0.8" />
      <rect x="27" y="24" width="8" height="4" rx="1.5" fill="white" opacity="0.8" />
      <line x1="13" y1="28" x2="13" y2="31" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="31" y1="28" x2="31" y2="31" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <rect x="9" y="32" width="8" height="4" rx="1.5" fill="white" opacity="0.65" />
      <rect x="27" y="32" width="8" height="4" rx="1.5" fill="white" opacity="0.65" />
    </svg>
  );
}

export function Icon3dDynamicList({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_dl" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E11D48" /><stop offset="1" stopColor="#BE123C" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#E11D4820" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_dl)" filter="url(#sh)" />
      <Highlight />
      <rect x="10" y="13" width="22" height="6" rx="2" fill="white" opacity="0.92" />
      <rect x="10" y="21" width="22" height="6" rx="2" fill="white" opacity="0.8" />
      <rect x="10" y="29" width="22" height="6" rx="2" fill="white" opacity="0.65" />
      <circle cx="36" cy="32" r="5" fill="white" opacity="0.92" />
      <line x1="34" y1="32" x2="38" y2="32" stroke="#E11D48" strokeWidth="1.5" opacity="0.7" />
      <line x1="36" y1="30" x2="36" y2="34" stroke="#E11D48" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

export function Icon3dConsent({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_consent" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" /><stop offset="1" stopColor="#3730A3" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#4F46E520" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_consent)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="10" width="24" height="28" rx="3" fill="white" opacity="0.92" />
      <rect x="16" y="15" width="16" height="2" rx="1" fill="#4F46E5" opacity="0.3" />
      <rect x="16" y="19" width="12" height="2" rx="1" fill="#4F46E5" opacity="0.2" />
      <rect x="16" y="23" width="14" height="2" rx="1" fill="#4F46E5" opacity="0.15" />
      <rect x="16" y="30" width="6" height="6" rx="2" fill="#4F46E5" opacity="0.2" />
      <path d="M17.5 33l1.5 1.5 3-3" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <rect x="25" y="32" width="7" height="2" rx="1" fill="#4F46E5" opacity="0.2" />
    </svg>
  );
}

export function Icon3dArabicName({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_arname" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" /><stop offset="1" stopColor="#047857" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#05966920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_arname)" filter="url(#sh)" />
      <Highlight />
      <circle cx="24" cy="18" r="6" fill="white" opacity="0.92" />
      <path d="M16 34c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="white" opacity="0.8" />
      <text x="24" y="35" fontSize="7" fill="#059669" fontWeight="bold" opacity="0.5" textAnchor="middle" fontFamily="serif">ع</text>
    </svg>
  );
}

export function Icon3dPoBox({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_pobox" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B45309" /><stop offset="1" stopColor="#92400E" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#B4530920" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_pobox)" filter="url(#sh)" />
      <Highlight />
      <rect x="11" y="16" width="26" height="18" rx="3" fill="white" opacity="0.92" />
      <path d="M11 22l13 6 13-6" stroke="#B45309" strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="24" cy="24" r="3" fill="#B45309" opacity="0.2" />
      <rect x="22" y="13" width="4" height="5" rx="1" fill="white" opacity="0.7" />
    </svg>
  );
}

export function Icon3dPlateNumber({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_plate" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E40AF" /><stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#1E40AF20" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_plate)" filter="url(#sh)" />
      <Highlight />
      <rect x="8" y="17" width="32" height="14" rx="3" fill="white" opacity="0.92" />
      <rect x="8" y="17" width="8" height="14" rx="2" fill="#1E40AF" opacity="0.15" />
      <text x="12" y="27" fontSize="6" fill="#1E40AF" fontWeight="bold" opacity="0.5" textAnchor="middle">SA</text>
      <rect x="19" y="21" width="18" height="6" rx="1.5" fill="#1E40AF" opacity="0.08" />
      <text x="28" y="26" fontSize="7" fill="#1E40AF" fontWeight="bold" opacity="0.5" textAnchor="middle">1234</text>
    </svg>
  );
}

export function Icon3dHijri({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="grad_hijri" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#047857" /><stop offset="1" stopColor="#065F46" />
        </linearGradient>
        <Shadow />
      </defs>
      <Base color="#04785720" />
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#grad_hijri)" filter="url(#sh)" />
      <Highlight />
      <rect x="12" y="14" width="24" height="22" rx="3" fill="white" opacity="0.92" />
      <rect x="12" y="14" width="24" height="6" rx="2" fill="#047857" opacity="0.2" />
      <path d="M28 28c0-2.2-1.8-4-4-4s-4 1.8-4 4" stroke="#047857" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="28" cy="26" r="1" fill="#047857" opacity="0.6" />
    </svg>
  );
}
