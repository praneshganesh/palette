"use client";

import { useState, useEffect, useCallback, type CSSProperties } from "react";
import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";
import type { IndustryContent } from "@/lib/content-context";
import { useDesignSystemStore } from "@/store/design-system";

interface LocalizationTabProps {
  system: DesignSystem;
  content: IndustryContent;
}

const EASTERN_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

function toEasternArabicNumerals(value: string): string {
  return value.replace(/\d/g, (ch) => EASTERN_DIGITS[Number(ch)] ?? ch);
}

function formatSampleDate(regionalDate: boolean): { us: string; regional: string } {
  const d = 15;
  const m = 4;
  const y = 2026;
  const us = `${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}/${y}`;
  const reg = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  return { us, regional: reg };
}

const NAV_AR: Record<string, string> = {
  Dashboard: "لوحة التحكم",
  Properties: "العقارات",
  Listings: "القوائم",
  Tenants: "المستأجرون",
  Maintenance: "الصيانة",
  "Rent Collection": "تحصيل الإيجار",
  Expenses: "المصروفات",
  "Service Requests": "طلبات الخدمة",
  Permits: "التصاريح",
  Licenses: "الرخص",
  Approvals: "الموافقات",
  Compliance: "الامتثال",
  "Audit Trail": "سجل التدقيق",
  Courses: "المقررات",
  Students: "الطلاب",
  Faculty: "أعضاء هيئة التدريس",
  Grades: "الدرجات",
  Enrollment: "التسجيل",
  Reports: "التقارير",
  Patients: "المرضى",
  Appointments: "المواعيد",
  Records: "السجلات",
  "Lab Results": "نتائج المختبر",
  Billing: "الفواتير",
  Items: "العناصر",
  Projects: "المشاريع",
  Team: "الفريق",
  Tasks: "المهام",
  Configuration: "الإعدادات",
};

function arNavLabel(en: string): string {
  return NAV_AR[en] ?? en;
}

const AR_FORM: Record<string, { projectTitle: string; ownerLabel: string; descriptionLabel: string }> = {
  government: {
    projectTitle: "عنوان الطلب",
    ownerLabel: "الموظف المسند",
    descriptionLabel: "تفاصيل الطلب",
  },
  education: {
    projectTitle: "اسم المقرر / الوحدة",
    ownerLabel: "عضو هيئة التدريس",
    descriptionLabel: "وصف المقرر",
  },
  healthcare: {
    projectTitle: "المريض / رقم الحالة",
    ownerLabel: "الطبيب المعالج",
    descriptionLabel: "الملاحظات السريرية",
  },
  "real-estate": {
    projectTitle: "اسم العقار",
    ownerLabel: "الوكيل المعين",
    descriptionLabel: "تفاصيل العقار",
  },
};

function getArFormLabels(industry: string): { projectTitle: string; ownerLabel: string; descriptionLabel: string } {
  return AR_FORM[industry] ?? { projectTitle: "العنوان", ownerLabel: "المكلّف", descriptionLabel: "الوصف" };
}

const KPI_AR: Record<string, string> = {
  Properties: "العقارات",
  "Occupancy Rate": "معدل الإشغال",
  "Active Requests": "الطلبات النشطة",
  "Active Students": "الطلاب النشطون",
  "Active Patients": "المرضى النشطون",
  "Total Items": "إجمالي العناصر",
};

function arKpiLabel(label: string): string {
  return KPI_AR[label] ?? "المؤشر";
}

function buildArabicSidebar(content: IndustryContent) {
  return content.sidebarSections.map((section) => ({
    label:
      section.label === "OVERVIEW"
        ? "نظرة عامة"
        : section.label === "MANAGEMENT"
          ? "الإدارة"
          : section.label === "SERVICES"
            ? "الخدمات"
            : section.label === "GOVERNANCE"
              ? "الحوكمة"
              : section.label === "ACADEMIC"
                ? "أكاديمي"
                : section.label === "ADMIN"
                  ? "الإدارة"
                  : section.label === "CLINICAL"
                    ? "سريري"
                    : section.label === "MANAGE"
                      ? "إدارة المحتوى"
                      : section.label === "SETTINGS"
                        ? "الإعدادات"
                        : section.label,
    items: section.items.map((it) => ({ ...it, name: arNavLabel(it.name) })),
  }));
}

export function LocalizationTab({ system, content }: LocalizationTabProps) {
  const { previewMode } = useDesignSystemStore();
  const palette = previewMode === "dark" ? system.darkPalette : system.palette;
  const { languages, rtl, regionalDate, regionalNumber } = system.localization;
  const typo = system.typography;
  const comp = system.components;
  const [interactiveLang, setInteractiveLang] = useState<"en" | "ar">("en");

  const sectionBlock: CSSProperties = { marginBottom: 72 };

  const sectionHeading: CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: palette.primary,
    marginBottom: 12,
  };

  const sectionDesc: CSSProperties = {
    fontSize: 15,
    color: palette.textSecondary,
    lineHeight: 1.6,
    marginBottom: 36,
  };

  const card: CSSProperties = {
    padding: 32,
    backgroundColor: palette.surface,
    border: `1px solid ${palette.border}`,
  };

  const arSidebar = buildArabicSidebar(content);
  const arForm = getArFormLabels(system.meta.industry);
  const firstKpi = content.kpis[0];
  const { us: dateUs, regional: dateRegional } = formatSampleDate(regionalDate);
  const datePrimary = regionalDate ? dateRegional : dateUs;
  const dateAlt = regionalDate ? dateUs : dateRegional;
  const sampleNumberEn = firstKpi?.value ?? "1,284";
  const sampleNumberDisplay = regionalNumber ? toEasternArabicNumerals(sampleNumberEn) : sampleNumberEn;

  const enHeadingStyle: CSSProperties = {
    fontFamily: typo.headingFont,
    fontSize: typo.scale.h3,
    fontWeight: typo.fontWeight.bold,
    lineHeight: typo.lineHeight.tight,
    color: palette.textPrimary,
    margin: 0,
  };

  const arHeadingStyle: CSSProperties = {
    fontFamily: typo.arabicHeadingFont,
    fontSize: `calc(${typo.scale.h3} * 1.06)`,
    fontWeight: typo.fontWeight.bold,
    lineHeight: typo.lineHeight.relaxed,
    color: palette.textPrimary,
    margin: 0,
  };

  if (languages === "en-only") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          padding: 32,
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: system.spacing.radius.lg,
        }}
      >
        <p style={{ ...sectionHeading, marginBottom: 16 }}>Localization</p>
        <p style={{ fontSize: 15, color: palette.textSecondary, lineHeight: 1.65, margin: 0 }}>
          Localization previews and regional UI rules activate when bilingual support (English + Arabic) is selected
          during onboarding. Your current design system is set to English only — switch language support in the
          onboarding flow to explore RTL layout, Arabic typography, and regional formats here.
        </p>
      </motion.div>
    );
  }

  const miniShellSidebar = (isRtl: boolean, sections: typeof content.sidebarSections) => (
    <aside
      style={{
        width: 112,
        flexShrink: 0,
        backgroundColor: comp.sidebar.background,
        borderRight: isRtl ? "none" : `1px solid ${comp.sidebar.border}`,
        borderLeft: isRtl ? `1px solid ${comp.sidebar.border}` : "none",
        padding: "12px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            backgroundColor: palette.primary,
            opacity: 0.85,
            transform: isRtl ? "scaleX(-1)" : undefined,
          }}
        />
        <span style={{ fontSize: 9, fontWeight: 700, color: palette.textPrimary, letterSpacing: "0.04em" }}>
          {isRtl ? "◀" : "▶"}
        </span>
      </div>
      {sections.slice(0, 2).map((sec) => (
        <div key={sec.label} style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: palette.textSecondary, marginBottom: 4 }}>{sec.label}</div>
          {sec.items.slice(0, 2).map((it) => (
            <div
              key={it.name}
              style={{
                fontSize: 10,
                fontWeight: it.active ? 600 : 400,
                color: it.active ? palette.primary : palette.textPrimary,
                padding: "4px 0",
                borderRadius: 4,
                backgroundColor: it.active ? `${palette.primary}14` : "transparent",
              }}
            >
              {it.name}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );

  const previewIsRtl = interactiveLang === "ar";
  const interactiveSections = previewIsRtl ? arSidebar : content.sidebarSections;

  const l10nNavItems = [
    { id: "l10n-rtl", label: "RTL Spacing" },
    { id: "l10n-mirror", label: "Mirrored Navigation" },
    { id: "l10n-arabic", label: "Arabic Headings" },
    { id: "l10n-labels", label: "Label Wrapping" },
    { id: "l10n-tables", label: "Mixed-Language Tables" },
    { id: "l10n-dates", label: "Dates & Numbers" },
    { id: "l10n-preview", label: "Preview" },
  ];

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
    const sections = document.querySelectorAll("[data-tab-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const renderNavBtn = (item: { id: string; label: string }) => {
    const isActive = activeSection === item.id;
    return (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "5px 16px 5px 20px",
          fontSize: 12,
          fontWeight: isActive ? 600 : 400,
          color: isActive ? palette.primary : palette.textSecondary,
          backgroundColor: isActive ? palette.primary + "08" : "transparent",
          borderTop: "none",
          borderRight: "none",
          borderBottom: "none",
          borderLeftWidth: 2,
          borderLeftStyle: "solid",
          borderLeftColor: isActive ? palette.primary : "transparent",
          cursor: "pointer",
          transition: "all 0.15s",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.label}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", gap: 0, position: "relative" }}>
      <nav style={{
        width: 200,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        borderRight: `1px solid ${palette.border}`,
        padding: "24px 0",
        backgroundColor: palette.background,
      }}>
        <div style={{ padding: "0 16px 16px", fontSize: 11, fontWeight: 600, color: palette.textSecondary, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Localization
        </div>
        {l10nNavItems.map(renderNavBtn)}
      </nav>
      <div style={{ flex: 1, minWidth: 0, padding: "0 0 0 24px" }}>
      <div>
      {/* —— 8.7 Regional UI rules —— */}
      <section style={sectionBlock}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <p style={sectionHeading}>Regional UI rules (8.7)</p>
          <p style={sectionDesc}>
            When bilingual mode is on, spacing, navigation, typography, tables, and regional formats follow these
            rules so English and Arabic can coexist without layout breakage.
          </p>

          <div id="l10n-rtl" data-tab-section style={{ ...card, marginBottom: 36 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: palette.textPrimary,
                marginBottom: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              RTL-safe spacing
            </p>
            <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
              Logical &quot;start&quot; padding and margin flip in RTL so content stays aligned to the reading edge.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {(["ltr", "rtl"] as const).map((dir) => (
                <div key={dir} style={{ flex: "1 1 200px", minWidth: 180 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: palette.primary, marginBottom: 10 }}>
                    {dir === "ltr" ? "LTR" : "RTL (mirrored)"}
                  </p>
                  <div
                    dir={dir}
                    style={{
                      border: `1px solid ${palette.border}`,
                      borderRadius: system.spacing.radius.md,
                      backgroundColor: palette.background,
                      paddingInlineStart: 20,
                      paddingInlineEnd: 12,
                      paddingBlock: 14,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        insetInlineStart: 6,
                        top: 10,
                        bottom: 10,
                        width: 4,
                        borderRadius: 2,
                        backgroundColor: palette.accent,
                      }}
                    />
                    <p style={{ margin: 0, fontSize: 13, color: palette.textPrimary, lineHeight: 1.5 }}>
                      Accent bar tracks the <strong>start</strong> edge; padding uses inline-start so it mirrors
                      cleanly.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="l10n-mirror" data-tab-section style={{ ...card, marginBottom: 36 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: palette.textPrimary,
                marginBottom: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Mirrored navigation
            </p>
            <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
              Sidebar swaps to the opposite edge; directional chrome and iconography flip on the horizontal axis.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 240px" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 8 }}>LTR shell</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    border: `1px solid ${palette.border}`,
                    borderRadius: system.spacing.radius.md,
                    overflow: "hidden",
                    minHeight: 120,
                  }}
                >
                  {miniShellSidebar(false, content.sidebarSections)}
                  <main
                    style={{
                      flex: 1,
                      padding: 12,
                      fontSize: 11,
                      color: palette.textSecondary,
                      backgroundColor: palette.surfaceMuted,
                    }}
                  >
                    Main content region
                  </main>
                </div>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 8 }}>RTL shell</p>
                <div
                  dir="rtl"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    border: `1px solid ${palette.border}`,
                    borderRadius: system.spacing.radius.md,
                    overflow: "hidden",
                    minHeight: 120,
                  }}
                >
                  {miniShellSidebar(true, arSidebar)}
                  <main
                    style={{
                      flex: 1,
                      padding: 12,
                      fontSize: 11,
                      color: palette.textSecondary,
                      backgroundColor: palette.surfaceMuted,
                    }}
                  >
                    منطقة المحتوى الرئيسية
                  </main>
                </div>
              </div>
            </div>
          </div>

          <div id="l10n-arabic" data-tab-section style={{ ...card, marginBottom: 36 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: palette.textPrimary,
                marginBottom: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Arabic heading adjustments
            </p>
            <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
              Arabic headings use the Arabic heading family, a slightly larger size, and relaxed line height for
              diacritics and glyph density.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>English (H3 scale)</p>
                <h3 style={enHeadingStyle}>Executive overview</h3>
                <p style={{ fontSize: 12, color: palette.textSecondary, marginTop: 8, marginBottom: 0 }}>
                  {typo.headingFont} · {typo.lineHeight.tight} line-height
                </p>
              </div>
              <div dir="rtl">
                <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>Arabic (adjusted)</p>
                <h3 style={arHeadingStyle}>نظرة تنفيذية على الأداء</h3>
                <p style={{ fontSize: 12, color: palette.textSecondary, marginTop: 8, marginBottom: 0 }}>
                  {typo.arabicHeadingFont} · {typo.lineHeight.relaxed} line-height
                </p>
              </div>
            </div>
          </div>

          <div id="l10n-labels" data-tab-section style={{ ...card, marginBottom: 36 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: palette.textPrimary,
                marginBottom: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Label wrapping
            </p>
            <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
              Arabic labels often wrap in fewer visual lines but wider words; keep min-widths out of narrow columns and
              allow hyphenation off for Arabic.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ width: 120, border: `1px dashed ${palette.border}`, padding: 10, borderRadius: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 6 }}>EN</p>
                <label style={{ fontSize: 12, color: palette.textPrimary, display: "block", lineHeight: 1.4 }}>
                  Assigned portfolio manager (long label)
                </label>
              </div>
              <div
                dir="rtl"
                style={{ width: 120, border: `1px dashed ${palette.border}`, padding: 10, borderRadius: 8 }}
              >
                <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 6 }}>AR</p>
                <label
                  style={{
                    fontFamily: typo.arabicBodyFont,
                    fontSize: 12,
                    color: palette.textPrimary,
                    display: "block",
                    lineHeight: 1.75,
                  }}
                >
                  مدير المحفظة المسؤول عن الاستثمار (تسمية طويلة)
                </label>
              </div>
            </div>
          </div>

          <div id="l10n-tables" data-tab-section style={{ ...card, marginBottom: 36 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: palette.textPrimary,
                marginBottom: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Mixed-language table
            </p>
            <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
              Bilingual tables keep one column per language for scannable alignment; status chips may repeat both
              short codes.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${palette.border}` }}>
                    <th style={{ textAlign: "left", padding: "10px 8px", color: palette.textSecondary, fontWeight: 600 }}>
                      ID
                    </th>
                    <th style={{ textAlign: "left", padding: "10px 8px", color: palette.textSecondary, fontWeight: 600 }}>
                      English
                    </th>
                    <th style={{ textAlign: "right", padding: "10px 8px", color: palette.textSecondary, fontWeight: 600 }}>
                      العربية
                    </th>
                    <th style={{ textAlign: "left", padding: "10px 8px", color: palette.textSecondary, fontWeight: 600 }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.tableRows.slice(0, 3).map((row, i) => (
                    <tr key={row.id} style={{ borderBottom: `1px solid ${palette.border}` }}>
                      <td style={{ padding: "10px 8px", color: palette.textPrimary, fontWeight: 500 }}>{row.id}</td>
                      <td style={{ padding: "10px 8px", color: palette.textPrimary }}>{row.title}</td>
                      <td
                        dir="rtl"
                        style={{
                          padding: "10px 8px",
                          color: palette.textPrimary,
                          fontFamily: typo.arabicBodyFont,
                        }}
                      >
                        {i === 0 && "عنوان السجل بالعربية — يطابق المعنى الإنجليزي"}
                        {i === 1 && "مهمة صيانة / متابعة تشغيلية"}
                        {i === 2 && "طلب أو حالة قيد المراجعة"}
                      </td>
                      <td style={{ padding: "10px 8px", color: palette.textSecondary }}>
                        {row.status} /{" "}
                        <span dir="rtl" style={{ fontFamily: typo.arabicBodyFont }}>
                          {row.status === "Active" ? "نشط" : row.status === "In Progress" ? "قيد التنفيذ" : "قيد المراجعة"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="l10n-dates" data-tab-section style={card}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: palette.textPrimary,
                marginBottom: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Region-friendly dates and numbers
            </p>
            <p style={{ fontSize: 14, color: palette.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>
              Onboarding flags drive default date order and numeral shapes. Sample values reflect your current system
              settings{rtl ? " (RTL enabled)" : ""}.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              <div style={{ padding: 16, backgroundColor: palette.background, borderRadius: system.spacing.radius.md }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 8 }}>
                  Primary format
                </p>
                <p style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, margin: 0 }}>{datePrimary}</p>
                <p style={{ fontSize: 12, color: palette.textSecondary, marginTop: 8, marginBottom: 0 }}>
                  {regionalDate ? "DD/MM/YYYY (regional)" : "MM/DD/YYYY (US-style)"}
                </p>
              </div>
              <div style={{ padding: 16, backgroundColor: palette.background, borderRadius: system.spacing.radius.md }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 8 }}>
                  Alternate
                </p>
                <p style={{ fontSize: 16, color: palette.textPrimary, margin: 0 }}>{dateAlt}</p>
                <p style={{ fontSize: 12, color: palette.textSecondary, marginTop: 8, marginBottom: 0 }}>
                  {regionalDate ? "MM/DD/YYYY comparison" : "DD/MM/YYYY comparison"}
                </p>
              </div>
              <div style={{ padding: 16, backgroundColor: palette.background, borderRadius: system.spacing.radius.md }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: palette.textSecondary, marginBottom: 8 }}>
                  KPI-style number
                </p>
                <p style={{ fontSize: 18, fontWeight: 700, color: palette.textPrimary, margin: 0, direction: "ltr" }}>
                  {sampleNumberDisplay}
                </p>
                <p style={{ fontSize: 12, color: palette.textSecondary, marginTop: 8, marginBottom: 0 }}>
                  {regionalNumber ? "Eastern Arabic numerals" : "Western numerals"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* —— 9.4 Localization preview —— */}
      <section id="l10n-preview" data-tab-section style={{ ...sectionBlock, marginBottom: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.05 }}
        >
          <p style={sectionHeading}>Localization preview (9.4)</p>
          <p style={sectionDesc}>
            Toggle the interactive preview language, compare LTR and RTL shells, and inspect bilingual cards, forms,
            and navigation pulled from your industry content.
          </p>

          <div style={{ ...card, marginBottom: 36 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: palette.textPrimary }}>Preview language</span>
              <div
                style={{
                  display: "inline-flex",
                  borderRadius: 8,
                  border: `1px solid ${palette.border}`,
                  overflow: "hidden",
                }}
              >
                {(["en", "ar"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setInteractiveLang(lang)}
                    style={{
                      padding: "8px 18px",
                      fontSize: 12,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      backgroundColor: interactiveLang === lang ? palette.primary : palette.surface,
                      color: interactiveLang === lang ? "#fff" : palette.textSecondary,
                    }}
                  >
                    {lang === "en" ? "English" : "العربية"}
                  </button>
                ))}
              </div>
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: palette.textSecondary, marginBottom: 12 }}>
              LTR vs RTL (side by side)
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <div style={{ flex: "1 1 260px" }}>
                <div
                  style={{
                    border: `1px solid ${palette.border}`,
                    borderRadius: system.spacing.radius.md,
                    padding: 16,
                    backgroundColor: palette.background,
                  }}
                >
                  <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>LTR</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 8, flexShrink: 0, borderRadius: 4, backgroundColor: palette.primary }} />
                    <p style={{ margin: 0, fontSize: 13, color: palette.textPrimary, lineHeight: 1.55 }}>
                      Title and actions read left-to-right; primary actions sit on the trailing side in forms.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ flex: "1 1 260px" }}>
                <div
                  dir="rtl"
                  style={{
                    border: `1px solid ${palette.border}`,
                    borderRadius: system.spacing.radius.md,
                    padding: 16,
                    backgroundColor: palette.background,
                  }}
                >
                  <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 12 }}>RTL</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 8, flexShrink: 0, borderRadius: 4, backgroundColor: palette.primary }} />
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: palette.textPrimary,
                        lineHeight: 1.75,
                        fontFamily: typo.arabicBodyFont,
                      }}
                    >
                      العناوين والإجراءات تُقرأ من اليمين إلى اليسار؛ الأزرار الأساسية تنعكس مع اتجاه الصفحة.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: palette.textSecondary, marginBottom: 12 }}>
              Sample card (both languages)
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <motion.div
                layout
                style={{
                  flex: "1 1 220px",
                  padding: 24,
                  backgroundColor: palette.background,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.lg,
                }}
              >
                <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>English</p>
                <h4 style={{ margin: "0 0 8px", fontSize: typo.scale.h5, color: palette.textPrimary }}>{firstKpi?.label}</h4>
                <p style={{ fontSize: 28, fontWeight: 700, color: palette.primary, margin: "0 0 6px" }}>
                  {firstKpi?.value}
                </p>
                <p style={{ fontSize: 13, color: palette.textSecondary, margin: 0 }}>{firstKpi?.subtitle}</p>
              </motion.div>
              <motion.div
                layout
                dir="rtl"
                style={{
                  flex: "1 1 220px",
                  padding: 24,
                  backgroundColor: palette.background,
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.lg,
                }}
              >
                <p style={{ fontSize: 11, color: palette.textSecondary, marginBottom: 8 }}>العربية</p>
                <h4
                  style={{
                    margin: "0 0 8px",
                    fontSize: `calc(${typo.scale.h5} * 1.05)`,
                    color: palette.textPrimary,
                    fontFamily: typo.arabicHeadingFont,
                    lineHeight: typo.lineHeight.relaxed,
                  }}
                >
                  {arKpiLabel(firstKpi?.label ?? "")}
                </h4>
                <p style={{ fontSize: 28, fontWeight: 700, color: palette.primary, margin: "0 0 6px" }}>
                  {regionalNumber ? toEasternArabicNumerals(firstKpi?.value ?? "") : firstKpi?.value}
                </p>
                <p style={{ fontSize: 13, color: palette.textSecondary, margin: 0, fontFamily: typo.arabicBodyFont }}>
                  ملخص سريع بنفس البيانات
                </p>
              </motion.div>
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: palette.textSecondary, marginBottom: 12 }}>
              Form labels (EN + AR)
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
              <div style={{ flex: "1 1 240px" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 6 }}>
                  {content.formFields.projectTitle}
                </label>
                <div
                  style={{
                    height: 40,
                    borderRadius: system.spacing.radius.md,
                    border: `1px solid ${comp.input.border}`,
                    backgroundColor: comp.input.background,
                    padding: "0 12px",
                    fontSize: 13,
                    color: palette.textSecondary,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {content.formFields.placeholder}
                </div>
              </div>
              <div dir="rtl" style={{ flex: "1 1 240px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: palette.textPrimary,
                    marginBottom: 6,
                    fontFamily: typo.arabicBodyFont,
                  }}
                >
                  {arForm.projectTitle}
                </label>
                <div
                  style={{
                    height: 40,
                    borderRadius: system.spacing.radius.md,
                    border: `1px solid ${comp.input.border}`,
                    backgroundColor: comp.input.background,
                    padding: "0 12px",
                    fontSize: 13,
                    color: palette.textSecondary,
                    display: "flex",
                    alignItems: "center",
                    fontFamily: typo.arabicBodyFont,
                  }}
                >
                  أدخل النص بالعربية…
                </div>
              </div>
              <div style={{ flex: "1 1 100%" }}>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: palette.textPrimary, marginBottom: 6, display: "block" }}>
                      {content.formFields.ownerLabel}
                    </label>
                    <div
                      style={{
                        height: 40,
                        borderRadius: system.spacing.radius.md,
                        border: `1px solid ${comp.input.border}`,
                        backgroundColor: comp.input.background,
                      }}
                    />
                  </div>
                  <div dir="rtl" style={{ flex: "1 1 200px" }}>
                    <label
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: palette.textPrimary,
                        marginBottom: 6,
                        display: "block",
                        fontFamily: typo.arabicBodyFont,
                      }}
                    >
                      {arForm.ownerLabel}
                    </label>
                    <div
                      style={{
                        height: 40,
                        borderRadius: system.spacing.radius.md,
                        border: `1px solid ${comp.input.border}`,
                        backgroundColor: comp.input.background,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: palette.textSecondary, marginBottom: 12 }}>
              Navigation sidebar (EN | AR)
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <div
                style={{
                  flex: "1 1 200px",
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  overflow: "hidden",
                  display: "flex",
                  minHeight: 200,
                }}
              >
                {miniShellSidebar(false, content.sidebarSections)}
                <main style={{ flex: 1, padding: 12, fontSize: 11, color: palette.textSecondary, backgroundColor: palette.surfaceMuted }}>
                  {content.orgName}
                </main>
              </div>
              <div
                dir="rtl"
                style={{
                  flex: "1 1 200px",
                  border: `1px solid ${palette.border}`,
                  borderRadius: system.spacing.radius.md,
                  overflow: "hidden",
                  display: "flex",
                  minHeight: 200,
                }}
              >
                {miniShellSidebar(true, arSidebar)}
                <main style={{ flex: 1, padding: 12, fontSize: 11, color: palette.textSecondary, backgroundColor: palette.surfaceMuted }}>
                  {content.orgName}
                </main>
              </div>
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: palette.textSecondary, marginBottom: 12 }}>
              Interactive shell ({interactiveLang === "en" ? "English / LTR" : "Arabic / RTL"})
            </p>
            <motion.div
              key={interactiveLang}
              initial={{ opacity: 0.85, x: previewIsRtl ? 8 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              dir={previewIsRtl ? "rtl" : "ltr"}
              style={{
                border: `1px solid ${palette.border}`,
                borderRadius: system.spacing.radius.lg,
                overflow: "hidden",
                display: "flex",
                minHeight: 160,
              }}
            >
              {previewIsRtl ? (
                <>
                  {miniShellSidebar(true, interactiveSections)}
                  <main style={{ flex: 1, padding: 16, backgroundColor: palette.background }}>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: palette.textSecondary, fontFamily: typo.arabicBodyFont }}>
                      صباح الخير
                    </p>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: palette.textPrimary, fontFamily: typo.arabicHeadingFont, lineHeight: typo.lineHeight.relaxed }}>
                      تمت العملية بنجاح
                    </p>
                    <p style={{ margin: "10px 0 0", fontSize: 13, color: palette.textSecondary, fontFamily: typo.arabicBodyFont, lineHeight: 1.7 }}>
                      نفس الحالة المعروضة في الإنجليزية، مع اتجاه RTL وخط عربي للنص الأساسي.
                    </p>
                  </main>
                </>
              ) : (
                <>
                  {miniShellSidebar(false, interactiveSections)}
                  <main style={{ flex: 1, padding: 16, backgroundColor: palette.background }}>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: palette.textSecondary }}>{content.greeting}</p>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: palette.textPrimary }}>{content.alerts.success.title}</p>
                    <p style={{ margin: "10px 0 0", fontSize: 13, color: palette.textSecondary, lineHeight: 1.55 }}>
                      {content.alerts.success.desc}
                    </p>
                  </main>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
    </div>
    </div>
  );
}
