"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DesignSystem } from "@/types";
import { useDesignSystemStore } from "@/store/design-system";
import {
  getFieldSpecifications,
  type FieldSpecification,
} from "@/lib/field-specifications";
import {
  Icon3dEmail, Icon3dUser, Icon3dPhone, Icon3dCalendar, Icon3dCalendarRange,
  Icon3dCurrency, Icon3dPercent, Icon3dTextInput, Icon3dTextArea, Icon3dLock,
  Icon3dLink, Icon3dIdCard, Icon3dMapPin, Icon3dUpload, Icon3dDropdown,
  Icon3dCheckbox, Icon3dRadio, Icon3dToggle, Icon3dSearch, Icon3dNumber,
  Icon3dAddress, Icon3dPalette, Icon3dStar, Icon3dSlider, Icon3dClock, Icon3dKey,
  Icon3dIban, Icon3dCreditCard, Icon3dVat, Icon3dCR, Icon3dPassport,
  Icon3dBirthday, Icon3dGender, Icon3dNationality, Icon3dEmergency, Icon3dSocial,
  Icon3dRichText, Icon3dMultiSelect, Icon3dAutocomplete, Icon3dDateTime,
  Icon3dMapLocation, Icon3dSignature, Icon3dAvatar, Icon3dPin, Icon3dLicense,
  Icon3dInvoice, Icon3dBarcode, Icon3dPriority, Icon3dStatus, Icon3dIpAddress,
  Icon3dQuantity, Icon3dWhatsapp, Icon3dMention, Icon3dMarkdown, Icon3dCodeEditor,
  Icon3dBankAccount, Icon3dSalary, Icon3dPayment, Icon3dDuration, Icon3dTimezone,
  Icon3dSchedule, Icon3dWeight, Icon3dDimensions, Icon3dTreeSelect, Icon3dDynamicList,
  Icon3dConsent, Icon3dArabicName, Icon3dPoBox, Icon3dPlateNumber, Icon3dHijri,
} from "@/components/ui/icons-3d";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  email: Icon3dEmail, user: Icon3dUser, phone: Icon3dPhone,
  calendar: Icon3dCalendar, calendarRange: Icon3dCalendarRange,
  currency: Icon3dCurrency, percent: Icon3dPercent, textInput: Icon3dTextInput,
  textArea: Icon3dTextArea, lock: Icon3dLock, link: Icon3dLink,
  idCard: Icon3dIdCard, mapPin: Icon3dMapPin, upload: Icon3dUpload,
  dropdown: Icon3dDropdown, checkbox: Icon3dCheckbox, radio: Icon3dRadio,
  toggle: Icon3dToggle, search: Icon3dSearch, number: Icon3dNumber,
  address: Icon3dAddress, palette: Icon3dPalette, star: Icon3dStar,
  slider: Icon3dSlider, clock: Icon3dClock, key: Icon3dKey,
  iban: Icon3dIban, creditCard: Icon3dCreditCard, vat: Icon3dVat,
  cr: Icon3dCR, passport: Icon3dPassport, birthday: Icon3dBirthday,
  gender: Icon3dGender, nationality: Icon3dNationality, emergency: Icon3dEmergency,
  social: Icon3dSocial, richText: Icon3dRichText, multiSelect: Icon3dMultiSelect,
  autocomplete: Icon3dAutocomplete, dateTime: Icon3dDateTime,
  mapLocation: Icon3dMapLocation, signature: Icon3dSignature, avatar: Icon3dAvatar,
  pin: Icon3dPin, license: Icon3dLicense, invoice: Icon3dInvoice,
  barcode: Icon3dBarcode, priority: Icon3dPriority, status: Icon3dStatus,
  ipAddress: Icon3dIpAddress, quantity: Icon3dQuantity, whatsapp: Icon3dWhatsapp,
  mention: Icon3dMention, markdown: Icon3dMarkdown, codeEditor: Icon3dCodeEditor,
  bankAccount: Icon3dBankAccount, salary: Icon3dSalary, payment: Icon3dPayment,
  duration: Icon3dDuration, timezone: Icon3dTimezone, schedule: Icon3dSchedule,
  weight: Icon3dWeight, dimensions: Icon3dDimensions, treeSelect: Icon3dTreeSelect,
  dynamicList: Icon3dDynamicList, consent: Icon3dConsent, arabicName: Icon3dArabicName,
  poBox: Icon3dPoBox, plateNumber: Icon3dPlateNumber, hijri: Icon3dHijri,
};

interface SpecificationsTabProps {
  system: DesignSystem;
}

interface CategoryDef {
  label: string;
  description: string;
  types: string[];
  icon: React.ComponentType<{ size?: number }>;
  accentKey: keyof DesignSystem["palette"];
}

const CATEGORIES: CategoryDef[] = [
  {
    label: "Text & Content",
    description: "Text inputs, rich editors, markdown, code, and search with RTL support",
    types: ["email", "fullName", "arabicName", "textShort", "textArea", "password", "url", "search", "richText", "markdown", "codeEditor", "autocomplete", "mention"],
    icon: Icon3dTextInput,
    accentKey: "primary",
  },
  {
    label: "Selection & Controls",
    description: "Dropdowns, multi-select, toggles, priority, status, consent, and tree hierarchy",
    types: ["select", "checkbox", "radio", "toggle", "multiSelect", "priority", "status", "gender", "nationality", "treeSelect", "consent", "dynamicList"],
    icon: Icon3dCheckbox,
    accentKey: "secondary",
  },
  {
    label: "Date, Time & Scheduling",
    description: "Calendars, Hijri dates, timezones, durations, and recurring schedules",
    types: ["date", "dateRange", "time", "dateTime", "dateOfBirth", "hijriDate", "timezone", "duration", "schedule"],
    icon: Icon3dCalendar,
    accentKey: "danger",
  },
  {
    label: "Numeric & Financial",
    description: "Currency, IBAN, cards, VAT, salary, payments, quantities, and measurements",
    types: ["currency", "percentage", "number", "slider", "rating", "quantityStepper", "iban", "creditCard", "vatNumber", "invoiceNumber", "salary", "paymentMethod", "bankAccount", "weight", "dimensions"],
    icon: Icon3dCurrency,
    accentKey: "warning",
  },
  {
    label: "Identity & Documents",
    description: "National IDs, passports, licenses, vehicle plates, barcodes, and verification",
    types: ["nationalId", "passport", "commercialRegistration", "licenseNumber", "plateNumber", "barcode", "otp", "pinCode"],
    icon: Icon3dIdCard,
    accentKey: "info",
  },
  {
    label: "Contact & Location",
    description: "Phone, WhatsApp, social media, addresses, maps, and P.O. Boxes",
    types: ["phone", "whatsapp", "socialMedia", "address", "postalCode", "poBox", "mapLocation", "emergencyContact"],
    icon: Icon3dMapPin,
    accentKey: "accent",
  },
  {
    label: "Media & Uploads",
    description: "File uploads, avatars, signatures, colour pickers, and image capture",
    types: ["fileUpload", "colorPicker", "avatar", "signature", "ipAddress"],
    icon: Icon3dUpload,
    accentKey: "primary",
  },
];

function categorySlug(label: string): string {
  return "spec-" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const SIDEBAR_ITEMS = [
  { id: "spec-overview", label: "Overview" },
  ...CATEGORIES.map((cat) => ({ id: categorySlug(cat.label), label: cat.label })),
];

// ── Stagger animation variants ─────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35 },
  },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } },
};

// ── Utility: hex to rgba ───────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ── Pill Badge ─────────────────────────────────────────────────────────────

function Pill({
  children,
  color,
  bg,
  palette,
  system,
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  palette: DesignSystem["palette"];
  system: DesignSystem;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: system.typography.bodyFont,
        borderRadius: "9999px",
        backgroundColor: bg || palette.surfaceMuted,
        color: color || palette.textSecondary,
        border: `1px solid ${palette.border}`,
        whiteSpace: "nowrap",
        letterSpacing: "0.2px",
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
}

// ── Visual Input Preview ───────────────────────────────────────────────────

function InputPreview({
  spec,
  palette,
  system,
}: {
  spec: FieldSpecification;
  palette: DesignSystem["palette"];
  system: DesignSystem;
}) {
  const radius = system.spacing.radius;
  const baseInput: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: system.typography.bodyFont,
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: radius.md,
    color: palette.textPrimary,
    outline: "none",
    boxSizing: "border-box",
  };
  const errorInput: React.CSSProperties = { ...baseInput, borderColor: palette.danger };
  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: palette.textPrimary,
    marginBottom: 6, display: "block", fontFamily: system.typography.bodyFont,
  };
  const errorText: React.CSSProperties = {
    fontSize: 12, color: palette.danger, marginTop: 4, fontFamily: system.typography.bodyFont,
  };

  switch (spec.type) {
    case "email": case "fullName": case "phone": case "textShort":
    case "password": case "url": case "nationalId": case "postalCode": case "address":
      return (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span style={labelStyle}>{spec.label}</span>
            <div style={baseInput} role="presentation">
              <span style={{ color: palette.textSecondary, opacity: 0.6 }}>{spec.formatting.placeholder}</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span style={labelStyle}>{spec.label}</span>
            <div style={errorInput} role="presentation">
              <span style={{ color: palette.textSecondary, opacity: 0.6 }}>{spec.formatting.placeholder}</span>
            </div>
            <div style={errorText}>{spec.errorMessages.invalid}</div>
          </div>
        </div>
      );
    case "textArea":
      return (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span style={labelStyle}>{spec.label}</span>
            <div style={{ ...baseInput, height: 80 }} role="presentation">
              <span style={{ color: palette.textSecondary, opacity: 0.6 }}>{spec.formatting.placeholder}</span>
            </div>
            <div style={{ fontSize: 11, color: palette.textSecondary, textAlign: "right", marginTop: 4 }}>0 / 5,000</div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span style={labelStyle}>{spec.label}</span>
            <div style={{ ...errorInput, height: 80 }} role="presentation">
              <span style={{ color: palette.textSecondary, opacity: 0.6 }}>{spec.formatting.placeholder}</span>
            </div>
            <div style={errorText}>{spec.errorMessages.maxLength}</div>
          </div>
        </div>
      );
    case "select":
      return (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[baseInput, errorInput].map((style, idx) => (
            <div key={idx} style={{ flex: 1, minWidth: 200 }}>
              <span style={labelStyle}>{spec.label}</span>
              <div style={{ ...style, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} role="presentation">
                <span style={{ color: palette.textSecondary, opacity: 0.6 }}>Select an option…</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke={idx === 1 ? palette.danger : palette.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              {idx === 1 && <div style={errorText}>{spec.errorMessages.required}</div>}
            </div>
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
          <span style={labelStyle}>States</span>
          {[
            { checked: true, label: "Checked", borderColor: palette.primary, bg: palette.primary },
            { checked: false, label: "Unchecked", borderColor: palette.border, bg: palette.surface },
            { checked: false, label: "Error", borderColor: palette.danger, bg: palette.surface },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: radius.sm, backgroundColor: s.bg, border: s.checked ? "none" : `2px solid ${s.borderColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span style={{ fontSize: 13, color: s.label === "Error" ? palette.danger : palette.textPrimary, fontFamily: system.typography.bodyFont }}>{s.label}</span>
            </div>
          ))}
        </div>
      );
    case "radio":
      return (
        <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
          <span style={labelStyle}>States</span>
          {[{ selected: true, label: "Selected" }, { selected: false, label: "Unselected" }].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${s.selected ? palette.primary : palette.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.selected && <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: palette.primary }} />}
              </div>
              <span style={{ fontSize: 13, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>{s.label}</span>
            </div>
          ))}
        </div>
      );
    case "toggle":
      return (
        <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
          <span style={labelStyle}>States</span>
          {[{ on: true, label: "On" }, { on: false, label: "Off" }].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: s.on ? palette.primary : palette.border, position: "relative" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#fff", position: "absolute", top: 3, ...(s.on ? { right: 3 } : { left: 3 }), boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </div>
              <span style={{ fontSize: 13, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>{s.label}</span>
            </div>
          ))}
        </div>
      );
    case "date":
      return (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[false, true].map((isError) => (
            <div key={String(isError)} style={{ flex: 1, minWidth: 200 }}>
              <span style={labelStyle}>{spec.label}</span>
              <div style={{ ...(isError ? errorInput : baseInput), display: "flex", alignItems: "center", justifyContent: "space-between" }} role="presentation">
                <span style={{ color: palette.textSecondary, opacity: 0.6 }}>DD/MM/YYYY</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke={isError ? palette.danger : palette.textSecondary} strokeWidth="1.2" />
                  <path d="M2 7H14" stroke={isError ? palette.danger : palette.textSecondary} strokeWidth="1.2" />
                  <path d="M5 1.5V4" stroke={isError ? palette.danger : palette.textSecondary} strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M11 1.5V4" stroke={isError ? palette.danger : palette.textSecondary} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              {isError && <div style={errorText}>{spec.errorMessages.invalid}</div>}
            </div>
          ))}
        </div>
      );
    case "dateRange":
      return (
        <div style={{ flex: 1, minWidth: 200 }}>
          <span style={labelStyle}>Date Range</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {["Start date", "End date"].map((ph, idx) => (
              <React.Fragment key={ph}>
                {idx === 1 && <span style={{ color: palette.textSecondary, fontSize: 13, fontFamily: system.typography.bodyFont }}>→</span>}
                <div style={{ ...baseInput, flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }} role="presentation">
                  <span style={{ color: palette.textSecondary, opacity: 0.6 }}>{ph}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="2" stroke={palette.textSecondary} strokeWidth="1.2" /><path d="M2 7H14" stroke={palette.textSecondary} strokeWidth="1.2" /></svg>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    case "time":
      return (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[false, true].map((isError) => (
            <div key={String(isError)} style={{ flex: 1, minWidth: 200 }}>
              <span style={labelStyle}>{spec.label}</span>
              <div style={{ ...(isError ? errorInput : baseInput), display: "flex", alignItems: "center", justifyContent: "space-between" }} role="presentation">
                <span style={{ color: palette.textSecondary, opacity: 0.6 }}>HH:MM</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke={isError ? palette.danger : palette.textSecondary} strokeWidth="1.2" />
                  <path d="M8 4.5V8L10 10" stroke={isError ? palette.danger : palette.textSecondary} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              {isError && <div style={errorText}>{spec.errorMessages.invalid}</div>}
            </div>
          ))}
        </div>
      );
    case "fileUpload":
      return (
        <div style={{ border: `2px dashed ${palette.border}`, borderRadius: radius.lg, padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 6V22M16 6L10 12M16 6L22 12" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 22V24C6 25.1046 6.89543 26 8 26H24C25.1046 26 26 25.1046 26 24V22" stroke={palette.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: palette.textPrimary, fontFamily: system.typography.bodyFont }}>Drag files here or click to browse</span>
          <span style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>PDF, JPG, PNG, DOCX, XLSX — max 10 MB each</span>
        </div>
      );
    case "currency": case "percentage": case "number":
      return (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[baseInput, errorInput].map((style, idx) => (
            <div key={idx} style={{ flex: 1, minWidth: 200 }}>
              <span style={labelStyle}>{spec.label}</span>
              <div style={{ ...style, display: "flex", alignItems: "center", gap: 6 }} role="presentation">
                {spec.formatting.prefix && <span style={{ color: palette.textSecondary, fontFamily: "monospace", fontSize: 13 }}>{spec.formatting.prefix}</span>}
                <span style={{ color: palette.textSecondary, opacity: 0.6, flex: 1 }}>{spec.formatting.placeholder}</span>
                {spec.formatting.suffix && <span style={{ color: palette.textSecondary, fontFamily: "monospace", fontSize: 13 }}>{spec.formatting.suffix}</span>}
              </div>
              {idx === 1 && <div style={errorText}>{spec.errorMessages.invalid}</div>}
            </div>
          ))}
        </div>
      );
    case "slider":
      return (
        <div style={{ padding: "8px 0" }}>
          <span style={labelStyle}>Value: 40</span>
          <div style={{ position: "relative", height: 24, marginTop: 8 }}>
            <div style={{ position: "absolute", top: 10, left: 0, right: 0, height: 4, backgroundColor: palette.border, borderRadius: 2 }} />
            <div style={{ position: "absolute", top: 10, left: 0, width: "40%", height: 4, backgroundColor: palette.primary, borderRadius: 2 }} />
            <div style={{ position: "absolute", top: 4, left: "calc(40% - 8px)", width: 16, height: 16, borderRadius: "50%", backgroundColor: palette.primary, border: `2px solid ${palette.surface}`, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: "monospace" }}>0</span>
            <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: "monospace" }}>100</span>
          </div>
        </div>
      );
    case "rating":
      return (
        <div>
          <span style={labelStyle}>Rating</span>
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} width="28" height="28" viewBox="0 0 24 24" fill={star <= 4 ? palette.warning : "none"} stroke={star <= 4 ? palette.warning : palette.border} strokeWidth="1.5">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ))}
            <span style={{ fontSize: 14, color: palette.textSecondary, marginLeft: 8, alignSelf: "center", fontFamily: system.typography.bodyFont }}>4 / 5</span>
          </div>
        </div>
      );
    case "otp":
      return (
        <div>
          <span style={labelStyle}>Enter verification code</span>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ width: 44, height: 52, borderRadius: radius.md, border: `1.5px solid ${i < 3 ? palette.primary : palette.border}`, backgroundColor: palette.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: palette.textPrimary, fontFamily: "monospace" }}>
                {i < 3 ? ["4", "7", "2"][i] : ""}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: palette.textSecondary, marginTop: 10, fontFamily: system.typography.bodyFont }}>Resend code in 0:45</div>
        </div>
      );
    case "colorPicker":
      return (
        <div>
          <span style={labelStyle}>Brand Color</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            <div style={{ width: 40, height: 40, borderRadius: radius.md, backgroundColor: palette.primary, border: `1px solid ${palette.border}`, flexShrink: 0 }} />
            <div style={{ ...baseInput, width: 130, fontFamily: "monospace", fontSize: 13, color: palette.textPrimary }}>{palette.primary}</div>
          </div>
        </div>
      );
    case "search":
      return (
        <div style={{ flex: 1, minWidth: 260 }}>
          <span style={labelStyle}>Search</span>
          <div style={{ ...baseInput, display: "flex", alignItems: "center", gap: 8 }} role="presentation">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><circle cx="7" cy="7" r="4.5" stroke={palette.textSecondary} strokeWidth="1.2" /><path d="M10.5 10.5L13.5 13.5" stroke={palette.textSecondary} strokeWidth="1.2" strokeLinecap="round" /></svg>
            <span style={{ color: palette.textSecondary, opacity: 0.6, flex: 1 }}>Search…</span>
            <span style={{ fontSize: 10, color: palette.textSecondary, backgroundColor: palette.surfaceMuted, padding: "2px 6px", borderRadius: radius.sm, fontFamily: "monospace", border: `1px solid ${palette.border}` }}>⌘K</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}

// ── Detail sub-section ─────────────────────────────────────────────────────

function DetailCard({
  title,
  accent,
  children,
  palette,
  system,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
  palette: DesignSystem["palette"];
  system: DesignSystem;
}) {
  return (
    <div
      style={{
        backgroundColor: palette.surfaceMuted,
        borderRadius: system.spacing.radius.md,
        padding: 20,
        minWidth: 0,
        borderTop: `2px solid ${accent}`,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase" as const,
          color: accent,
          marginBottom: 12,
          fontFamily: system.typography.bodyFont,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

// ── Field Detail Overlay ───────────────────────────────────────────────────

function FieldDetailView({
  spec,
  accent,
  palette,
  system,
  onClose,
}: {
  spec: FieldSpecification;
  accent: string;
  palette: DesignSystem["palette"];
  system: DesignSystem;
  onClose: () => void;
}) {
  const Icon = iconMap[spec.icon];
  const constraintEntries = Object.entries(spec.constraints).filter(([, v]) => v !== undefined);
  const formattingEntries = Object.entries(spec.formatting).filter(([, v]) => v !== undefined && v !== "");
  const errorEntries = Object.entries(spec.errorMessages).filter(([, v]) => v !== undefined);
  const hasRegional = spec.regionalNotes && spec.regionalNotes.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "48px 24px",
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: palette.background,
          borderRadius: system.spacing.radius.xl,
          border: `1px solid ${palette.border}`,
          boxShadow: system.spacing.elevation.xl,
          overflow: "hidden",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            background: `linear-gradient(135deg, ${hexToRgba(accent, 0.08)} 0%, ${hexToRgba(accent, 0.02)} 100%)`,
            borderBottom: `1px solid ${palette.border}`,
            padding: "28px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {Icon && <Icon size={48} />}
            <div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>{spec.label}</h3>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: palette.textSecondary, marginTop: 2, display: "inline-block", padding: "2px 8px", backgroundColor: palette.surfaceMuted, borderRadius: system.spacing.radius.sm, border: `1px solid ${palette.border}` }}>
                {spec.htmlType}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: system.spacing.radius.md,
              border: `1px solid ${palette.border}`, backgroundColor: palette.surface,
              color: palette.textSecondary, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 18,
              transition: "all 0.2s ease", flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 36 }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: palette.textSecondary, margin: "0 0 32px 0", fontFamily: system.typography.bodyFont, maxWidth: 680 }}>
            {spec.description}
          </p>

          {/* Two-column: Preview + Sidebar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, marginBottom: 32 }}>
            {/* Left: Preview */}
            <div>
              <div style={{ backgroundColor: palette.surface, borderRadius: system.spacing.radius.lg, border: `1px solid ${palette.border}`, overflow: "hidden" }}>
                {/* Browser mockup header */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", backgroundColor: palette.surfaceMuted, borderBottom: `1px solid ${palette.border}` }}>
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c, opacity: 0.8 }} />
                  ))}
                  <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>Preview</span>
                </div>
                <div style={{ padding: 28 }}>
                  <InputPreview spec={spec} palette={palette} system={system} />
                </div>
              </div>

              {/* Formatting rules */}
              {formattingEntries.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: palette.textSecondary, marginBottom: 10, fontFamily: system.typography.bodyFont }}>
                    Formatting
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {formattingEntries.map(([key, value]) => (
                      <span key={key} style={{ fontSize: 12, fontFamily: system.typography.bodyFont, padding: "4px 10px", borderRadius: system.spacing.radius.sm, backgroundColor: palette.surfaceMuted, color: palette.textSecondary, border: `1px solid ${palette.border}` }}>
                        <span style={{ fontWeight: 600, color: palette.textPrimary }}>{key}:</span>{" "}
                        {typeof value === "boolean" ? (value ? "✓" : "✗") : String(value)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Validation + Constraints + Errors */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Validation */}
              <DetailCard title="Validation Rules" accent={accent} palette={palette} system={system}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {spec.validations.map((v) => (
                    <div key={v.name}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.bodyFont, marginBottom: 2 }}>{v.name}</div>
                      <div style={{ fontSize: 11, lineHeight: 1.5, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>{v.description}</div>
                      {v.regex && (
                        <code style={{ display: "block", marginTop: 4, fontSize: 10, fontFamily: "monospace", color: accent, backgroundColor: palette.surface, padding: "3px 8px", borderRadius: system.spacing.radius.sm, border: `1px solid ${palette.border}`, overflowX: "auto", whiteSpace: "nowrap" }}>
                          {v.regex.length > 40 ? v.regex.slice(0, 37) + "…" : v.regex}
                        </code>
                      )}
                    </div>
                  ))}
                </div>
              </DetailCard>

              {/* Constraints */}
              {constraintEntries.length > 0 && (
                <DetailCard title="Constraints" accent={accent} palette={palette} system={system}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {constraintEntries.map(([key, value]) => (
                      <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontFamily: system.typography.bodyFont }}>
                        <span style={{ color: palette.textSecondary }}>{key}</span>
                        <span style={{ fontFamily: "monospace", fontSize: 11, color: palette.textPrimary, fontWeight: 600, backgroundColor: palette.surface, padding: "1px 8px", borderRadius: system.spacing.radius.sm, border: `1px solid ${palette.border}` }}>
                          {typeof value === "boolean" ? (value ? "✓" : "✗") : String(value).length > 28 ? String(value).slice(0, 25) + "…" : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </DetailCard>
              )}

              {/* Error Messages */}
              <DetailCard title="Error Messages" accent={palette.danger} palette={palette} system={system}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {errorEntries.map(([key, msg]) => (
                    <div key={key} style={{ fontSize: 12, lineHeight: 1.5, fontFamily: system.typography.bodyFont }}>
                      <span style={{ fontWeight: 700, color: palette.danger, fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.5px", fontFamily: "monospace", backgroundColor: hexToRgba(palette.danger, 0.08), padding: "1px 6px", borderRadius: system.spacing.radius.sm, marginRight: 6 }}>
                        {key}
                      </span>
                      <span style={{ color: palette.textSecondary }}>{msg}</span>
                    </div>
                  ))}
                </div>
              </DetailCard>
            </div>
          </div>

          {/* Bottom 3-column grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {/* UX Guidelines */}
            <DetailCard title="UX Guidelines" accent={palette.info} palette={palette} system={system}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {spec.uxGuidelines.map((tip, i) => (
                  <div key={i} style={{ fontSize: 12, lineHeight: 1.5, color: palette.textSecondary, display: "flex", gap: 6, fontFamily: system.typography.bodyFont }}>
                    <span style={{ color: palette.info, flexShrink: 0, fontSize: 10, marginTop: 3 }}>●</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </DetailCard>

            {/* Accessibility */}
            <DetailCard title="Accessibility" accent={palette.success} palette={palette} system={system}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {spec.accessibility.map((note, i) => (
                  <div key={i} style={{ fontSize: 12, lineHeight: 1.5, color: palette.textSecondary, display: "flex", gap: 6, fontFamily: system.typography.bodyFont }}>
                    <span style={{ color: palette.success, flexShrink: 0, fontSize: 11, marginTop: 1 }}>✓</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </DetailCard>

            {/* Regional Notes */}
            <DetailCard title={hasRegional ? "Regional · MENA" : "Regional"} accent={palette.warning} palette={palette} system={system}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {hasRegional ? (
                  spec.regionalNotes!.map((note, i) => (
                    <div key={i} style={{ fontSize: 12, lineHeight: 1.5, color: palette.textSecondary, display: "flex", gap: 6, fontFamily: system.typography.bodyFont }}>
                      <span style={{ color: palette.warning, flexShrink: 0, fontSize: 10, marginTop: 3 }}>◆</span>
                      <span>{note}</span>
                    </div>
                  ))
                ) : (
                  <span style={{ fontSize: 12, color: palette.textSecondary, fontFamily: system.typography.bodyFont, opacity: 0.6 }}>
                    No regional notes for this field type.
                  </span>
                )}
              </div>
            </DetailCard>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Field Summary Card (in category grid) ──────────────────────────────────

function FieldSummaryCard({
  spec,
  accent,
  palette,
  system,
  index,
  onViewDetails,
}: {
  spec: FieldSpecification;
  accent: string;
  palette: DesignSystem["palette"];
  system: DesignSystem;
  index: number;
  onViewDetails: () => void;
}) {
  const Icon = iconMap[spec.icon];
  const [hovered, setHovered] = useState(false);

  const pills: string[] = [];
  if (spec.constraints.required) pills.push("Required");
  if (spec.constraints.maxLength) pills.push(`Max ${spec.constraints.maxLength}`);
  else if (spec.constraints.max !== undefined) pills.push(`Max ${spec.constraints.max}`);
  if (spec.constraints.minLength) pills.push(`Min ${spec.constraints.minLength}`);
  else if (spec.constraints.min !== undefined) pills.push(`Min ${spec.constraints.min}`);
  if (spec.validations[0]?.name) pills.push(spec.validations[0].name);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: palette.surface,
        border: `1px solid ${hovered ? accent : palette.border}`,
        borderRadius: system.spacing.radius.lg,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered ? `0 4px 20px ${hexToRgba(accent, 0.12)}` : "none",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={onViewDetails}
    >
      {/* Subtle gradient glow at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${hexToRgba(accent, hovered ? 0.6 : 0.15)}, transparent)`,
          transition: "background 0.3s ease",
        }}
      />

      {Icon && <Icon size={32} />}

      <span style={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont, lineHeight: 1.3 }}>
        {spec.label}
      </span>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {pills.slice(0, 3).map((p) => (
          <span
            key={p}
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "9999px",
              backgroundColor: palette.surfaceMuted,
              color: palette.textSecondary,
              fontFamily: system.typography.bodyFont,
              border: `1px solid ${palette.border}`,
              whiteSpace: "nowrap",
            }}
          >
            {p}
          </span>
        ))}
      </div>

      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: hovered ? accent : palette.textSecondary,
          fontFamily: system.typography.bodyFont,
          transition: "color 0.3s ease",
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        View details
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: hovered ? "translateX(2px)" : "none", transition: "transform 0.2s ease" }}>
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.div>
  );
}

// ── Category Card (hero grid) ──────────────────────────────────────────────

function CategoryCard({
  category,
  fieldCount,
  fieldSpecs,
  accent,
  palette,
  system,
  index,
  onClick,
}: {
  category: CategoryDef;
  fieldCount: number;
  fieldSpecs: FieldSpecification[];
  accent: string;
  palette: DesignSystem["palette"];
  system: DesignSystem;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const CatIcon = category.icon;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        backgroundColor: palette.surface,
        border: `1px solid ${hovered ? accent : palette.border}`,
        borderRadius: system.spacing.radius.lg,
        padding: 28,
        cursor: "pointer",
        transition: "all 0.3s ease",
        background: `linear-gradient(145deg, ${hexToRgba(accent, hovered ? 0.07 : 0.03)} 0%, ${palette.surface} 100%)`,
        boxShadow: hovered ? `0 8px 32px ${hexToRgba(accent, 0.12)}` : system.spacing.elevation.sm,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accent}, ${hexToRgba(accent, 0.3)})`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <CatIcon size={40} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: "9999px",
            backgroundColor: hexToRgba(accent, 0.1),
            color: accent,
            fontFamily: system.typography.bodyFont,
          }}
        >
          {fieldCount} fields
        </span>
      </div>

      <h3 style={{ margin: "0 0 4px 0", fontSize: 18, fontWeight: 700, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>
        {category.label}
      </h3>
      <p style={{ margin: "0 0 16px 0", fontSize: 13, lineHeight: 1.5, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
        {category.description}
      </p>

      {/* Field icons row */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {fieldSpecs.slice(0, 8).map((s) => {
          const Ic = iconMap[s.icon];
          return Ic ? <Ic key={s.type} size={16} /> : null;
        })}
        {fieldSpecs.length > 8 && (
          <span style={{ fontSize: 11, color: palette.textSecondary, fontFamily: system.typography.bodyFont, alignSelf: "center" }}>
            +{fieldSpecs.length - 8}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── Category Section ───────────────────────────────────────────────────────

function CategorySection({
  category,
  fieldSpecs,
  accent,
  palette,
  system,
  sectionRef,
  sectionId,
  expandedField,
  setExpandedField,
}: {
  category: CategoryDef;
  fieldSpecs: FieldSpecification[];
  accent: string;
  palette: DesignSystem["palette"];
  system: DesignSystem;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  sectionId: string;
  expandedField: string | null;
  setExpandedField: (type: string | null) => void;
}) {
  return (
    <motion.div
      ref={sectionRef}
      id={sectionId}
      data-spec-section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 72 }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <div
          style={{
            width: 4,
            height: 40,
            borderRadius: 2,
            backgroundColor: accent,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" as const, color: palette.textPrimary, fontFamily: system.typography.headingFont }}>
            {category.label}
          </h3>
          <p style={{ margin: "2px 0 0 0", fontSize: 13, color: palette.textSecondary, fontFamily: system.typography.bodyFont }}>
            {category.description}
          </p>
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: "9999px",
            backgroundColor: hexToRgba(accent, 0.08),
            color: accent,
            fontFamily: system.typography.bodyFont,
            whiteSpace: "nowrap",
          }}
        >
          {fieldSpecs.length} fields
        </span>
      </div>

      {/* Field cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        <AnimatePresence>
          {fieldSpecs.map((spec, i) => (
            <FieldSummaryCard
              key={spec.type}
              spec={spec}
              accent={accent}
              palette={palette}
              system={system}
              index={i}
              onViewDetails={() => setExpandedField(spec.type)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Detail overlay for this category's fields */}
      <AnimatePresence>
        {expandedField && fieldSpecs.find((s) => s.type === expandedField) && (
          <FieldDetailView
            spec={fieldSpecs.find((s) => s.type === expandedField)!}
            accent={accent}
            palette={palette}
            system={system}
            onClose={() => setExpandedField(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function SpecificationsTab({ system }: SpecificationsTabProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const allSpecs = getFieldSpecifications();
  const [expandedField, setExpandedField] = useState<string | null>(null);

  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});
  CATEGORIES.forEach((cat) => {
    if (!sectionRefs.current[cat.label]) {
      sectionRefs.current[cat.label] = React.createRef<HTMLDivElement>();
    }
  });

  const scrollToCategory = (label: string) => {
    const ref = sectionRefs.current[label];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const categoryData = CATEGORIES.map((cat) => {
    const specs = allSpecs.filter((s) => cat.types.includes(s.type));
    return { category: cat, specs, accent: palette[cat.accentKey] };
  });

  const totalFields = allSpecs.length;
  const totalCategories = CATEGORIES.length;

  const [activeSection, setActiveSection] = useState<string>("");

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    const sections = document.querySelectorAll("[data-spec-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 0, position: "relative" }}>
        {/* Sidebar Index */}
        <nav
          style={{
            width: 200,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            borderRightWidth: 1,
            borderRightStyle: "solid",
            borderRightColor: palette.border,
            padding: "24px 0",
            backgroundColor: palette.background,
          }}
        >
          <div style={{ padding: "0 16px 16px", fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
            Specifications ({totalFields})
          </div>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left" as const,
                  padding: "6px 16px 6px 20px",
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? palette.primary : palette.textSecondary,
                  backgroundColor: isActive ? palette.primary + "08" : "transparent",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  borderLeftWidth: 2,
                  borderLeftStyle: "solid" as const,
                  borderLeftColor: isActive ? palette.primary : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap" as const,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: system.typography.bodyFont,
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0, padding: "0 0 0 24px" }}>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <motion.div
        id="spec-overview"
        data-spec-section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 48 }}
      >
        <div style={{ width: 48, height: 2, backgroundColor: palette.primary, marginBottom: 20, borderRadius: 1 }} />

        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: palette.textPrimary,
            fontFamily: system.typography.headingFont,
            margin: "0 0 8px 0",
            letterSpacing: "-0.3px",
          }}
        >
          Field Specifications
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: palette.textSecondary,
            margin: "0 0 24px 0",
            fontFamily: system.typography.bodyFont,
            maxWidth: 560,
          }}
        >
          Comprehensive technical guidelines covering validation, formatting, accessibility, and GCC/MENA regional considerations for every field type in your design system
        </p>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Pill palette={palette} system={system}>
            <span style={{ fontWeight: 700, color: palette.textPrimary }}>{totalFields}</span> Fields
          </Pill>
          <Pill palette={palette} system={system}>
            <span style={{ fontWeight: 700, color: palette.textPrimary }}>{totalCategories}</span> Categories
          </Pill>
          <Pill color={palette.success} bg={hexToRgba(palette.success, 0.08)} palette={palette} system={system}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke={palette.success} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            WCAG Compliant
          </Pill>
          <Pill color={palette.info} bg={hexToRgba(palette.info, 0.08)} palette={palette} system={system}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6" cy="6" r="4.5" stroke={palette.info} strokeWidth="1.5" fill="none" />
              <path d="M4 6h4M6 4v4" stroke={palette.info} strokeWidth="1" strokeLinecap="round" />
            </svg>
            GCC / MENA Ready
          </Pill>
        </div>
      </motion.div>

      {/* ── Category Grid ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginBottom: 72,
        }}
      >
        {categoryData.map(({ category, specs, accent }, i) => (
          <CategoryCard
            key={category.label}
            category={category}
            fieldCount={specs.length}
            fieldSpecs={specs}
            accent={accent}
            palette={palette}
            system={system}
            index={i}
            onClick={() => scrollToCategory(category.label)}
          />
        ))}
      </div>

      {/* ── Divider ───────────────────────────────────────────────────── */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${palette.border}, transparent)`,
          marginBottom: 72,
        }}
      />

      {/* ── Category Sections ─────────────────────────────────────────── */}
      {categoryData.map(({ category, specs, accent }) => (
        <CategorySection
          key={category.label}
          category={category}
          fieldSpecs={specs}
          accent={accent}
          palette={palette}
          system={system}
          sectionRef={sectionRefs.current[category.label]}
          sectionId={categorySlug(category.label)}
          expandedField={expandedField}
          setExpandedField={setExpandedField}
        />
      ))}

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          padding: "32px 0 64px",
          fontSize: 13,
          color: palette.textSecondary,
          fontFamily: system.typography.bodyFont,
        }}
      >
        {totalFields} field specifications across {totalCategories} categories
      </motion.div>
        </div>
      </div>
    </div>
  );
}
