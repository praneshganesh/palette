import type { Industry, ProjectType } from "@/types";

export interface IndustryContent {
  orgName: string;
  orgSubtitle: string;
  portalTitle: string;
  greeting: string;
  sidebarSections: {
    label: string;
    items: { name: string; badge?: string; active?: boolean }[];
  }[];
  kpis: { label: string; value: string; subtitle: string }[];
  recentItems: { id: string; title: string; author: string; status: string }[];
  risks: { id: string; owner: string; severity: number; title: string; tags: string[] }[];
  decisions: { id: string; title: string; madeBy: string; date: string; impact: string; status: string }[];
  tableRows: { id: string; title: string; type: string; priority: string; status: string; owner: string; due: string }[];
  formFields: { projectTitle: string; placeholder: string; ownerLabel: string; ownerPlaceholder: string; descriptionLabel: string; descriptionPlaceholder: string; categories: string[] };
  alerts: { success: { title: string; desc: string }; warning: { title: string; desc: string }; error: { title: string; desc: string }; info: { title: string; desc: string } };
  quickActions: string[];
  breadcrumb: string[];
  progressItems: { label: string; value: number }[];
}

const industryContentMap: Record<string, IndustryContent> = {
  "real-estate": {
    orgName: "PropVista",
    orgSubtitle: "PROPERTY MANAGEMENT",
    portalTitle: "Property Management Portal",
    greeting: "GOOD MORNING, SARAH",
    sidebarSections: [
      { label: "OVERVIEW", items: [{ name: "Dashboard", active: true }, { name: "Properties", badge: "12" }] },
      { label: "MANAGEMENT", items: [{ name: "Listings" }, { name: "Tenants" }, { name: "Maintenance", badge: "5" }] },
      { label: "FINANCE", items: [{ name: "Rent Collection" }, { name: "Expenses" }] },
    ],
    kpis: [
      { label: "Properties", value: "148", subtitle: "12 vacant" },
      { label: "Occupancy Rate", value: "92%", subtitle: "↑ 3% vs last quarter" },
      { label: "Pending Maintenance", value: "23", subtitle: "8 urgent" },
      { label: "Monthly Revenue", value: "AED 4.2M", subtitle: "↑ 6% vs last month" },
    ],
    recentItems: [
      { id: "LST-041", title: "New listing: 3BR Villa, Dubai Hills", author: "Ahmad Mansoor", status: "Pending" },
      { id: "LST-042", title: "Price update: Marina Tower Unit 1204", author: "Fatima Al-Rashid", status: "Review" },
      { id: "LST-043", title: "Photography scheduled: JBR Penthouse", author: "Sarah Ahmed", status: "Draft" },
    ],
    risks: [
      { id: "MNT-007", owner: "Facilities Team", severity: 5, title: "HVAC system failure in Tower B affecting 14 units", tags: ["Critical", "Urgent"] },
      { id: "MNT-012", owner: "Maintenance Lead", severity: 3, title: "Pool filtration system overdue for replacement", tags: ["Moderate", "Scheduled"] },
      { id: "MNT-018", owner: "Property Manager", severity: 4, title: "Elevator inspection overdue — Building C", tags: ["High", "Compliance"] },
    ],
    decisions: [
      { id: "DEC-001", title: "Approve renovation budget for Al Wasl properties", madeBy: "Investment Board", date: "2026-03-15", impact: "High", status: "Active" },
      { id: "DEC-002", title: "Switch to digital lease signing platform", madeBy: "Operations Head", date: "2026-02-28", impact: "Medium", status: "Active" },
      { id: "DEC-003", title: "Increase marketing budget for Q2 launches", madeBy: "Marketing Lead", date: "2026-02-10", impact: "High", status: "Review" },
      { id: "DEC-004", title: "Outsource landscaping to certified vendor", madeBy: "Facilities Director", date: "2026-01-20", impact: "Medium", status: "Closed" },
    ],
    tableRows: [
      { id: "PRO-1042", title: "Villa 23, Arabian Ranches Phase 3", type: "Listing", priority: "High", status: "Active", owner: "Ahmad Mansoor", due: "2026-04-28" },
      { id: "MNT-0387", title: "AC unit replacement — Tower A, Floor 12", type: "Maintenance", priority: "Critical", status: "In Progress", owner: "Facilities Team", due: "2026-05-02" },
      { id: "TNT-0219", title: "Lease renewal — Unit 804, Marina Gate", type: "Lease", priority: "Medium", status: "Pending", owner: "Fatima Al-Rashid", due: "2026-05-10" },
      { id: "INS-0784", title: "Annual building insurance renewal", type: "Insurance", priority: "High", status: "Review", owner: "Finance Team", due: "2026-04-22" },
      { id: "LST-0156", title: "New development listing — Creek Harbour", type: "Listing", priority: "Low", status: "Draft", owner: "Sarah Ahmed", due: "2026-06-15" },
    ],
    formFields: { projectTitle: "Property Name", placeholder: "e.g. Marina Gate Tower 2", ownerLabel: "Assigned Agent", ownerPlaceholder: "Search agents...", descriptionLabel: "Property Details", descriptionPlaceholder: "Describe the property, features, location details...", categories: ["Residential", "Commercial", "Industrial", "Land", "Mixed-Use"] },
    alerts: {
      success: { title: "Listing published successfully", desc: "Your property is now live on all connected platforms." },
      warning: { title: "Lease expiring soon", desc: "3 tenant leases expire within the next 30 days. Review renewals." },
      error: { title: "Payment processing failed", desc: "Unable to process rent collection for Unit 1204. Check payment details." },
      info: { title: "Market report available", desc: "Q1 2026 Dubai real estate market analysis is now available for download." },
    },
    quickActions: ["+ New Listing", "Log Maintenance", "Add Tenant", "Schedule Viewing"],
    breadcrumb: ["Portal", "Properties", "Overview"],
    progressItems: [{ label: "Occupancy", value: 92 }, { label: "Rent Collection", value: 87 }, { label: "Maintenance Resolved", value: 73 }, { label: "Tenant Satisfaction", value: 89 }],
  },
  government: {
    orgName: "GovPortal",
    orgSubtitle: "PUBLIC SERVICES",
    portalTitle: "Government Services Portal",
    greeting: "GOOD MORNING, AHMED",
    sidebarSections: [
      { label: "OVERVIEW", items: [{ name: "Dashboard", active: true }, { name: "Service Requests", badge: "24" }] },
      { label: "SERVICES", items: [{ name: "Permits" }, { name: "Licenses" }, { name: "Approvals", badge: "7" }] },
      { label: "GOVERNANCE", items: [{ name: "Compliance" }, { name: "Audit Trail" }] },
    ],
    kpis: [
      { label: "Active Requests", value: "847", subtitle: "156 pending review" },
      { label: "Avg. Processing Time", value: "3.2 days", subtitle: "↓ 15% vs last quarter" },
      { label: "Pending Approvals", value: "37", subtitle: "5 overdue" },
      { label: "Citizen Satisfaction", value: "91%", subtitle: "↑ 4% vs last month" },
    ],
    recentItems: [
      { id: "SRV-041", title: "Building permit application — Al Barsha District", author: "Mohammed Al-Farsi", status: "Pending" },
      { id: "SRV-042", title: "Trade license renewal — Media City Zone", author: "Khalid Ibrahim", status: "Review" },
      { id: "SRV-043", title: "Environmental compliance inspection report", author: "Nora Al-Mansoori", status: "Draft" },
    ],
    risks: [
      { id: "AUD-007", owner: "Compliance Team", severity: 5, title: "Data retention policy non-compliance detected", tags: ["Critical", "Regulatory"] },
      { id: "AUD-012", owner: "IT Security", severity: 3, title: "System access audit overdue for 3 departments", tags: ["Moderate", "Scheduled"] },
      { id: "AUD-018", owner: "Legal Affairs", severity: 4, title: "Outdated privacy policy on citizen portal", tags: ["High", "Compliance"] },
    ],
    decisions: [
      { id: "DEC-001", title: "Adopt digital-first permit processing", madeBy: "Secretary General", date: "2026-03-01", impact: "High", status: "Active" },
      { id: "DEC-002", title: "Migrate citizen records to new cloud platform", madeBy: "IT Committee", date: "2026-02-18", impact: "Critical", status: "Active" },
      { id: "DEC-003", title: "Standardize Arabic UI across all portals", madeBy: "Design Authority", date: "2026-01-30", impact: "Medium", status: "Review" },
      { id: "DEC-004", title: "Retire legacy scheduling system by Q3", madeBy: "Operations Director", date: "2026-01-15", impact: "High", status: "Closed" },
    ],
    tableRows: [
      { id: "PRM-1042", title: "Construction permit — Al Barsha Phase 2", type: "Permit", priority: "Critical", status: "Active", owner: "Mohammed Al-Farsi", due: "2026-04-28" },
      { id: "LIC-0387", title: "Trade license renewal — JLT cluster", type: "License", priority: "High", status: "Blocked", owner: "Khalid Ibrahim", due: "2026-05-02" },
      { id: "INS-0219", title: "Environmental inspection — Industrial zone", type: "Inspection", priority: "Medium", status: "Review", owner: "Nora Al-Mansoori", due: "2026-05-10" },
      { id: "APP-0784", title: "Zoning amendment request — Marina District", type: "Approval", priority: "High", status: "Pending", owner: "Ali Rashid", due: "2026-04-22" },
      { id: "CMP-0156", title: "Annual compliance audit — Finance dept", type: "Compliance", priority: "Low", status: "Draft", owner: "Sarah Ahmed", due: "2026-06-15" },
    ],
    formFields: { projectTitle: "Request Title", placeholder: "e.g. Building Permit Application", ownerLabel: "Assigned Officer", ownerPlaceholder: "Search officers...", descriptionLabel: "Request Details", descriptionPlaceholder: "Describe the request, requirements, and supporting documents...", categories: ["Permits", "Licenses", "Inspections", "Approvals", "Compliance"] },
    alerts: {
      success: { title: "Request approved successfully", desc: "Permit PRN-2046 has been approved and notification sent to the applicant." },
      warning: { title: "SLA deadline approaching", desc: "12 service requests are approaching their processing deadline. Review priorities." },
      error: { title: "Submission validation failed", desc: "Required documents are missing. Please check the attached files and resubmit." },
      info: { title: "System maintenance scheduled", desc: "Portal maintenance is planned for Saturday 02:00–04:00 UTC. Expect brief downtime." },
    },
    quickActions: ["+ New Request", "Log Inspection", "Add Decision", "Report Issue"],
    breadcrumb: ["Portal", "Dashboard", "Overview"],
    progressItems: [{ label: "Requests Processed", value: 78 }, { label: "SLA Compliance", value: 91 }, { label: "Approvals Completed", value: 85 }, { label: "Citizen Satisfaction", value: 89 }],
  },
  education: {
    orgName: "EduHub",
    orgSubtitle: "LEARNING MANAGEMENT",
    portalTitle: "Learning Management Portal",
    greeting: "GOOD MORNING, DR. FATIMA",
    sidebarSections: [
      { label: "OVERVIEW", items: [{ name: "Dashboard", active: true }, { name: "Courses", badge: "8" }] },
      { label: "ACADEMIC", items: [{ name: "Students" }, { name: "Faculty" }, { name: "Grades", badge: "14" }] },
      { label: "ADMIN", items: [{ name: "Enrollment" }, { name: "Reports" }] },
    ],
    kpis: [
      { label: "Active Students", value: "2,847", subtitle: "98% enrolled" },
      { label: "Course Completion", value: "87%", subtitle: "↑ 5% vs last semester" },
      { label: "Pending Grades", value: "142", subtitle: "28 overdue" },
      { label: "Student Satisfaction", value: "94%", subtitle: "↑ 2% vs last survey" },
    ],
    recentItems: [
      { id: "CRS-041", title: "New course: Advanced Data Analytics — Fall 2026", author: "Dr. Hassan Ali", status: "Pending" },
      { id: "CRS-042", title: "Curriculum update: Digital Marketing Fundamentals", author: "Prof. Layla Khalid", status: "Review" },
      { id: "CRS-043", title: "Lab schedule: Engineering Workshop Series", author: "Admin Office", status: "Draft" },
    ],
    risks: [
      { id: "ACA-007", owner: "Academic Board", severity: 5, title: "Accreditation documents due in 30 days — incomplete submission", tags: ["Critical", "Deadline"] },
      { id: "ACA-012", owner: "IT Department", severity: 3, title: "LMS server capacity reaching threshold before exam period", tags: ["Moderate", "Infrastructure"] },
      { id: "ACA-018", owner: "Student Affairs", severity: 4, title: "Student housing waitlist exceeds availability by 40%", tags: ["High", "Capacity"] },
    ],
    decisions: [
      { id: "DEC-001", title: "Adopt hybrid learning model for all programs", madeBy: "Academic Council", date: "2026-03-01", impact: "High", status: "Active" },
      { id: "DEC-002", title: "Migrate LMS to cloud-hosted Moodle v4.3", madeBy: "IT Committee", date: "2026-02-14", impact: "Critical", status: "Active" },
      { id: "DEC-003", title: "Standardize Arabic fonts across all materials", madeBy: "Design Lead", date: "2026-01-30", impact: "Medium", status: "Review" },
      { id: "DEC-004", title: "Retire legacy student registration system", madeBy: "PMO Director", date: "2026-01-15", impact: "High", status: "Closed" },
    ],
    tableRows: [
      { id: "STU-1042", title: "Student SSO integration for admin portal", type: "Requirement", priority: "Critical", status: "Active", owner: "Dr. Hassan Ali", due: "2026-04-28" },
      { id: "BUG-0387", title: "Grade submission timeout during peak hours", type: "Issue", priority: "High", status: "Blocked", owner: "IT Support", due: "2026-05-02" },
      { id: "CUR-0219", title: "Migrate course materials to new LMS format", type: "Task", priority: "Medium", status: "Review", owner: "Prof. Layla Khalid", due: "2026-05-10" },
      { id: "ENR-0784", title: "Fall 2026 enrollment system testing", type: "Task", priority: "High", status: "Pending", owner: "Admin Office", due: "2026-04-22" },
      { id: "RPT-0156", title: "Annual academic performance report", type: "Report", priority: "Low", status: "Draft", owner: "Analytics Team", due: "2026-06-15" },
    ],
    formFields: { projectTitle: "Course / Module Name", placeholder: "e.g. Introduction to Machine Learning", ownerLabel: "Instructor", ownerPlaceholder: "Search faculty...", descriptionLabel: "Course Description", descriptionPlaceholder: "Describe the course objectives, learning outcomes, and prerequisites...", categories: ["Undergraduate", "Postgraduate", "Certificate", "Workshop", "Research"] },
    alerts: {
      success: { title: "Grades submitted successfully", desc: "All grades for CSE-301 have been recorded and published to student portals." },
      warning: { title: "Grade submission deadline approaching", desc: "Grades for 8 courses are due within the next 48 hours." },
      error: { title: "Enrollment sync failed", desc: "Unable to sync student records with the registrar system. Contact IT support." },
      info: { title: "Exam period starts Monday", desc: "Final exams begin April 21. All course materials should be finalized by Friday." },
    },
    quickActions: ["+ New Course", "Submit Grades", "Add Student", "Schedule Exam"],
    breadcrumb: ["Portal", "Academic", "Overview"],
    progressItems: [{ label: "Course Completion", value: 87 }, { label: "Grade Submission", value: 62 }, { label: "Enrollment", value: 98 }, { label: "Attendance", value: 91 }],
  },
  healthcare: {
    orgName: "MedCare",
    orgSubtitle: "HEALTHCARE MANAGEMENT",
    portalTitle: "Healthcare Management Portal",
    greeting: "GOOD MORNING, DR. AISHA",
    sidebarSections: [
      { label: "OVERVIEW", items: [{ name: "Dashboard", active: true }, { name: "Patients", badge: "18" }] },
      { label: "CLINICAL", items: [{ name: "Appointments" }, { name: "Records" }, { name: "Lab Results", badge: "6" }] },
      { label: "ADMIN", items: [{ name: "Billing" }, { name: "Compliance" }] },
    ],
    kpis: [
      { label: "Active Patients", value: "3,241", subtitle: "48 admitted today" },
      { label: "Bed Occupancy", value: "84%", subtitle: "↑ 2% vs yesterday" },
      { label: "Pending Results", value: "67", subtitle: "12 critical" },
      { label: "Patient Satisfaction", value: "93%", subtitle: "↑ 1% vs last month" },
    ],
    recentItems: [
      { id: "APT-041", title: "Emergency referral: Cardiac assessment — Ward B", author: "Dr. Aisha Noor", status: "Urgent" },
      { id: "APT-042", title: "Follow-up appointment: Post-surgical review", author: "Dr. Khalid Salem", status: "Scheduled" },
      { id: "APT-043", title: "Lab results pending: Blood work panel — 6 patients", author: "Lab Team", status: "Pending" },
    ],
    risks: [
      { id: "CLN-007", owner: "Chief Medical Officer", severity: 5, title: "Medical supply chain disruption — critical medication shortage", tags: ["Critical", "Urgent"] },
      { id: "CLN-012", owner: "Infection Control", severity: 4, title: "Sterilization audit overdue for surgical wing", tags: ["High", "Compliance"] },
      { id: "CLN-018", owner: "IT Department", severity: 3, title: "Patient records system scheduled for security patch", tags: ["Moderate", "Planned"] },
    ],
    decisions: [
      { id: "DEC-001", title: "Implement AI-assisted diagnostic triage", madeBy: "Medical Board", date: "2026-03-01", impact: "High", status: "Active" },
      { id: "DEC-002", title: "Upgrade patient monitoring systems in ICU", madeBy: "CTO Office", date: "2026-02-18", impact: "Critical", status: "Active" },
      { id: "DEC-003", title: "Standardize electronic health records format", madeBy: "Clinical Lead", date: "2026-01-30", impact: "Medium", status: "Review" },
      { id: "DEC-004", title: "Outsource non-critical laboratory testing", madeBy: "Operations Head", date: "2026-01-15", impact: "High", status: "Closed" },
    ],
    tableRows: [
      { id: "PAT-1042", title: "Cardiac monitoring setup — ICU Ward B", type: "Clinical", priority: "Critical", status: "Active", owner: "Dr. Aisha Noor", due: "2026-04-16" },
      { id: "LAB-0387", title: "Blood panel results — Batch 2026-Q2-14", type: "Lab", priority: "High", status: "In Progress", owner: "Lab Team", due: "2026-04-17" },
      { id: "REC-0219", title: "Patient discharge summary — Ward A", type: "Record", priority: "Medium", status: "Pending", owner: "Dr. Khalid Salem", due: "2026-04-20" },
      { id: "CMP-0784", title: "Annual medical equipment calibration", type: "Compliance", priority: "High", status: "Review", owner: "Biomedical Team", due: "2026-04-22" },
      { id: "BIL-0156", title: "Insurance claim reconciliation — March", type: "Billing", priority: "Low", status: "Draft", owner: "Finance Team", due: "2026-05-01" },
    ],
    formFields: { projectTitle: "Patient / Case ID", placeholder: "e.g. PAT-2026-0487", ownerLabel: "Attending Physician", ownerPlaceholder: "Search doctors...", descriptionLabel: "Clinical Notes", descriptionPlaceholder: "Document observations, diagnosis, treatment plan...", categories: ["Outpatient", "Inpatient", "Emergency", "Surgery", "Lab"] },
    alerts: {
      success: { title: "Patient discharge completed", desc: "All discharge paperwork and prescriptions have been processed successfully." },
      warning: { title: "Critical lab results pending", desc: "12 lab results flagged as urgent are awaiting physician review." },
      error: { title: "Medication interaction detected", desc: "The prescribed combination has a known interaction. Please review and confirm." },
      info: { title: "Staff rotation update", desc: "The updated shift schedule for April has been published. Review your assignments." },
    },
    quickActions: ["+ New Patient", "Order Lab Test", "Schedule Appointment", "File Report"],
    breadcrumb: ["Portal", "Clinical", "Overview"],
    progressItems: [{ label: "Bed Occupancy", value: 84 }, { label: "Lab Turnaround", value: 76 }, { label: "Patient Discharge", value: 91 }, { label: "Compliance", value: 95 }],
  },
};

const defaultContent: IndustryContent = {
  orgName: "AppHub",
  orgSubtitle: "MANAGEMENT PLATFORM",
  portalTitle: "Management Portal",
  greeting: "GOOD MORNING",
  sidebarSections: [
    { label: "OVERVIEW", items: [{ name: "Dashboard", active: true }, { name: "Items", badge: "8" }] },
    { label: "MANAGE", items: [{ name: "Projects" }, { name: "Team" }, { name: "Tasks", badge: "5" }] },
    { label: "SETTINGS", items: [{ name: "Configuration" }, { name: "Reports" }] },
  ],
  kpis: [
    { label: "Total Items", value: "1,284", subtitle: "32 new this week" },
    { label: "Completion Rate", value: "87%", subtitle: "↑ 5% vs last month" },
    { label: "Pending Actions", value: "42", subtitle: "8 overdue" },
    { label: "Team Satisfaction", value: "91%", subtitle: "↑ 3% vs last quarter" },
  ],
  recentItems: [
    { id: "ITM-041", title: "Quarterly planning review document", author: "Team Lead", status: "Pending" },
    { id: "ITM-042", title: "Budget allocation for Q2 projects", author: "Finance Team", status: "Review" },
    { id: "ITM-043", title: "New team member onboarding checklist", author: "HR Manager", status: "Draft" },
  ],
  risks: [
    { id: "RSK-007", owner: "Project Lead", severity: 5, title: "Critical deadline risk — resource allocation gap", tags: ["Critical", "Urgent"] },
    { id: "RSK-012", owner: "QA Team", severity: 3, title: "Testing backlog approaching sprint capacity", tags: ["Moderate", "Planned"] },
    { id: "RSK-018", owner: "Operations", severity: 4, title: "Vendor contract renewal overdue", tags: ["High", "Action Required"] },
  ],
  decisions: [
    { id: "DEC-001", title: "Adopt new project management methodology", madeBy: "Leadership Team", date: "2026-03-01", impact: "High", status: "Active" },
    { id: "DEC-002", title: "Migrate to cloud infrastructure", madeBy: "CTO Office", date: "2026-02-18", impact: "Critical", status: "Active" },
    { id: "DEC-003", title: "Standardize reporting templates across teams", madeBy: "Operations Lead", date: "2026-01-30", impact: "Medium", status: "Review" },
    { id: "DEC-004", title: "Phase out legacy tools by end of Q2", madeBy: "IT Director", date: "2026-01-15", impact: "High", status: "Closed" },
  ],
  tableRows: [
    { id: "PRJ-1042", title: "Platform migration — Phase 2", type: "Project", priority: "Critical", status: "Active", owner: "Team Lead", due: "2026-04-28" },
    { id: "TSK-0387", title: "API integration testing suite", type: "Task", priority: "High", status: "In Progress", owner: "Dev Team", due: "2026-05-02" },
    { id: "REQ-0219", title: "User feedback analysis — Q1 report", type: "Report", priority: "Medium", status: "Review", owner: "Analytics", due: "2026-05-10" },
    { id: "BUG-0784", title: "Performance optimization for dashboard", type: "Issue", priority: "High", status: "Pending", owner: "Backend Team", due: "2026-04-22" },
    { id: "DOC-0156", title: "Technical documentation update", type: "Documentation", priority: "Low", status: "Draft", owner: "Tech Writer", due: "2026-06-15" },
  ],
  formFields: { projectTitle: "Item Title", placeholder: "e.g. Q2 Platform Upgrade", ownerLabel: "Assigned To", ownerPlaceholder: "Search team members...", descriptionLabel: "Description", descriptionPlaceholder: "Provide details, context, and requirements...", categories: ["Project", "Task", "Report", "Request", "Other"] },
  alerts: {
    success: { title: "Changes saved successfully", desc: "All updates have been applied and team members notified." },
    warning: { title: "Approaching deadline", desc: "3 items are due within the next 48 hours. Review priorities." },
    error: { title: "Operation failed", desc: "Unable to save changes. Please check the form and try again." },
    info: { title: "System update scheduled", desc: "Maintenance is planned for Saturday 02:00–04:00 UTC." },
  },
  quickActions: ["+ New Item", "Log Issue", "Add Report", "Create Task"],
  breadcrumb: ["Portal", "Dashboard", "Overview"],
  progressItems: [{ label: "Completion", value: 87 }, { label: "Quality Score", value: 92 }, { label: "On-Time Delivery", value: 78 }, { label: "Team Utilization", value: 85 }],
};

export function getIndustryContent(industry: Industry | string, _projectType?: ProjectType | string): IndustryContent {
  return industryContentMap[industry] || defaultContent;
}
