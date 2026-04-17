export interface ScreenRecommendation {
  name: string;
  description: string;
  priority: "core" | "recommended" | "optional";
  icon: string;
}

export interface EntityRecommendation {
  name: string;
  description: string;
  fields: string[];
}

export interface NavSection {
  label: string;
  items: string[];
}

export interface InformationArchitecture {
  screens: ScreenRecommendation[];
  entities: EntityRecommendation[];
  navigation: NavSection[];
  features: string[];
}

const industryArchitectures: Record<string, InformationArchitecture> = {
  "real-estate": {
    screens: [
      { name: "Dashboard", description: "Overview of properties, occupancy, revenue, and pending tasks", priority: "core", icon: "dashboard" },
      { name: "Properties", description: "List and manage all properties with search, filters, and map view", priority: "core", icon: "building" },
      { name: "Contacts", description: "Manage tenants, landlords, buyers, sellers, and agents", priority: "core", icon: "users" },
      { name: "Opportunities", description: "Track sales and leasing pipeline with deal stages", priority: "core", icon: "currency" },
      { name: "Proposals", description: "Generate and send proposals, quotes, and offers to clients", priority: "recommended", icon: "textInput" },
      { name: "Viewings / Tours", description: "Schedule and track property viewings and open house events", priority: "recommended", icon: "calendar" },
      { name: "Accounts", description: "Financial accounts, invoices, and payment tracking per entity", priority: "core", icon: "bank" },
      { name: "Lease Management", description: "Full lease lifecycle — creation, renewals, terminations, and amendments", priority: "core", icon: "folder" },
      { name: "Documents", description: "Centralized repository for contracts, deeds, inspection reports, and templates", priority: "recommended", icon: "folder" },
      { name: "Payments", description: "Rent collection, commission payouts, and payment reconciliation", priority: "core", icon: "currency" },
      { name: "Maintenance Requests", description: "Track and assign maintenance issues reported by tenants or inspectors", priority: "recommended", icon: "settings" },
      { name: "Reports", description: "Occupancy rates, revenue analytics, agent performance, and market comparisons", priority: "recommended", icon: "chart" },
      { name: "Calendar", description: "Unified calendar for viewings, lease milestones, and team events", priority: "recommended", icon: "calendar" },
      { name: "Property Map View", description: "Geospatial view of all properties with filtering by status, type, and area", priority: "optional", icon: "mapPin" },
      { name: "Settings", description: "System configuration, user roles, notification preferences, and integrations", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Property", description: "A real estate unit — residential, commercial, or land", fields: ["title", "type", "address", "area_sqft", "bedrooms", "bathrooms", "price", "status", "owner_id", "listed_date", "features"] },
      { name: "Contact", description: "Any person or organization: tenant, landlord, buyer, seller, or agent", fields: ["full_name", "email", "phone", "type", "company", "source", "assigned_agent_id", "notes"] },
      { name: "Opportunity", description: "A tracked sales or leasing deal through pipeline stages", fields: ["title", "contact_id", "property_id", "stage", "value", "probability", "expected_close_date", "assigned_to"] },
      { name: "Lease", description: "A lease agreement tied to a property and tenant", fields: ["lease_number", "property_id", "tenant_id", "start_date", "end_date", "monthly_rent", "deposit", "status", "terms"] },
      { name: "Payment", description: "A financial transaction — rent, deposit, commission, or maintenance fee", fields: ["payment_id", "lease_id", "amount", "due_date", "paid_date", "method", "status", "reference"] },
      { name: "Maintenance Request", description: "A reported issue requiring repair or service at a property", fields: ["request_id", "property_id", "reported_by", "category", "description", "priority", "status", "assigned_to", "resolved_date"] },
      { name: "Document", description: "A file associated with a property, lease, or contact", fields: ["document_id", "title", "type", "associated_entity", "entity_id", "uploaded_by", "upload_date", "file_url"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Calendar", "Notifications"] },
      { label: "Portfolio", items: ["Properties", "Property Map View", "Lease Management"] },
      { label: "CRM", items: ["Contacts", "Opportunities", "Proposals", "Viewings / Tours"] },
      { label: "Finance", items: ["Accounts", "Payments", "Reports"] },
      { label: "Operations", items: ["Maintenance Requests", "Documents"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Property search & filters with map integration",
      "Virtual tour integration",
      "Payment tracking and automated rent reminders",
      "Lease lifecycle management with renewal alerts",
      "Agent performance analytics",
      "Document generation from templates",
      "Multi-currency support",
    ],
  },

  healthcare: {
    screens: [
      { name: "Dashboard", description: "Clinical overview — bed occupancy, pending results, today's appointments", priority: "core", icon: "dashboard" },
      { name: "Patients", description: "Patient registry with demographics, history, and quick-access records", priority: "core", icon: "users" },
      { name: "Appointments", description: "Schedule, reschedule, and manage patient appointments", priority: "core", icon: "calendar" },
      { name: "Medical Records", description: "Electronic health records with visit history, notes, and attachments", priority: "core", icon: "hospital" },
      { name: "Lab Results", description: "View, track, and flag laboratory test results by patient", priority: "core", icon: "search" },
      { name: "Prescriptions", description: "Create, manage, and renew prescriptions with drug interaction checks", priority: "core", icon: "hospital" },
      { name: "Billing", description: "Patient billing, insurance claims, and payment processing", priority: "core", icon: "currency" },
      { name: "Referrals", description: "Manage inter-department and external specialist referrals", priority: "recommended", icon: "workflow" },
      { name: "Staff Schedule", description: "Physician and nursing shift schedules with swap management", priority: "recommended", icon: "calendar" },
      { name: "Ward Management", description: "Bed allocation, patient transfers, and ward-level census", priority: "recommended", icon: "hospital" },
      { name: "Pharmacy", description: "Medication inventory, dispensing records, and stock alerts", priority: "recommended", icon: "hospital" },
      { name: "Reports", description: "Clinical dashboards — patient outcomes, department KPIs, audit reports", priority: "recommended", icon: "chart" },
      { name: "Emergency Queue", description: "Real-time triage queue with severity-based prioritization", priority: "recommended", icon: "bell" },
      { name: "Insurance Claims", description: "Submit, track, and reconcile insurance claims and pre-authorizations", priority: "recommended", icon: "bank" },
      { name: "Settings", description: "Clinic configuration, user roles, compliance settings, and integrations", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Patient", description: "An individual receiving medical care", fields: ["patient_id", "full_name", "date_of_birth", "gender", "blood_type", "contact_phone", "emergency_contact", "insurance_id", "allergies", "medical_history"] },
      { name: "Appointment", description: "A scheduled visit between a patient and healthcare provider", fields: ["appointment_id", "patient_id", "provider_id", "date_time", "type", "department", "status", "notes", "duration_min"] },
      { name: "Medical Record", description: "A clinical record documenting a patient encounter", fields: ["record_id", "patient_id", "provider_id", "date", "chief_complaint", "diagnosis", "treatment_plan", "vitals", "attachments"] },
      { name: "Prescription", description: "A medication order issued by a provider", fields: ["prescription_id", "patient_id", "provider_id", "medication_name", "dosage", "frequency", "duration", "refills", "status"] },
      { name: "Lab Test", description: "A diagnostic test ordered and performed on a patient sample", fields: ["test_id", "patient_id", "ordered_by", "test_type", "sample_type", "results", "reference_range", "status", "completed_date"] },
      { name: "Insurance Claim", description: "A billing claim submitted to an insurance provider", fields: ["claim_id", "patient_id", "policy_number", "provider_name", "amount", "diagnosis_codes", "procedure_codes", "status", "submitted_date"] },
      { name: "Staff", description: "A healthcare professional — doctor, nurse, technician, or administrator", fields: ["staff_id", "full_name", "role", "department", "specialization", "license_number", "shift_pattern", "contact"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Emergency Queue", "Notifications"] },
      { label: "Clinical", items: ["Patients", "Appointments", "Medical Records", "Lab Results", "Prescriptions"] },
      { label: "Operations", items: ["Ward Management", "Staff Schedule", "Pharmacy", "Referrals"] },
      { label: "Finance", items: ["Billing", "Insurance Claims"] },
      { label: "Analytics", items: ["Reports"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Patient timeline with full encounter history",
      "Appointment scheduling with provider availability",
      "E-prescriptions with drug interaction warnings",
      "Lab integration with automatic result flagging",
      "Real-time bed management and ward census",
      "Insurance pre-authorization workflows",
      "Clinical decision support alerts",
    ],
  },

  education: {
    screens: [
      { name: "Dashboard", description: "Academic overview — enrollment stats, upcoming exams, pending grades", priority: "core", icon: "dashboard" },
      { name: "Students", description: "Student registry with enrollment status, academic history, and contacts", priority: "core", icon: "graduation" },
      { name: "Courses", description: "Course catalogue with descriptions, prerequisites, and capacity", priority: "core", icon: "graduation" },
      { name: "Assignments", description: "Create, distribute, and grade assignments and coursework", priority: "core", icon: "textInput" },
      { name: "Grades / Marks", description: "Grade entry, GPA calculation, transcript generation", priority: "core", icon: "star" },
      { name: "Calendar", description: "Academic calendar with terms, exams, holidays, and events", priority: "recommended", icon: "calendar" },
      { name: "Library", description: "Digital and physical library catalogue with check-in/check-out", priority: "optional", icon: "folder" },
      { name: "Fee Management", description: "Tuition fees, payment plans, scholarships, and receipts", priority: "core", icon: "currency" },
      { name: "Attendance", description: "Daily attendance tracking with reporting and alerts for absences", priority: "recommended", icon: "chart" },
      { name: "Parent Portal", description: "Parent access to grades, attendance, fees, and announcements", priority: "recommended", icon: "users" },
      { name: "Teacher Portal", description: "Faculty workspace for lesson planning, grading, and schedules", priority: "recommended", icon: "users" },
      { name: "Exam Schedule", description: "Exam timetables, room assignments, and invigilation planning", priority: "recommended", icon: "calendar" },
      { name: "Certificates", description: "Issue and verify academic certificates and transcripts", priority: "optional", icon: "star" },
      { name: "Reports", description: "Academic performance analytics, cohort analysis, and compliance reports", priority: "recommended", icon: "chart" },
      { name: "Settings", description: "Academic year config, grading scales, user roles, and system preferences", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Student", description: "An enrolled learner in the institution", fields: ["student_id", "full_name", "date_of_birth", "enrollment_date", "program", "year", "section", "guardian_contact", "status", "gpa"] },
      { name: "Course", description: "An academic course or module offered by the institution", fields: ["course_code", "title", "description", "credits", "department", "instructor_id", "prerequisites", "capacity", "schedule"] },
      { name: "Assignment", description: "A piece of assessed coursework or homework", fields: ["assignment_id", "course_id", "title", "description", "due_date", "max_marks", "type", "submission_format"] },
      { name: "Grade", description: "An academic assessment result for a student in a course", fields: ["grade_id", "student_id", "course_id", "assignment_id", "marks_obtained", "max_marks", "grade_letter", "semester", "remarks"] },
      { name: "Teacher", description: "A faculty member who teaches one or more courses", fields: ["teacher_id", "full_name", "department", "specialization", "email", "phone", "qualification", "employment_type"] },
      { name: "Class / Section", description: "A group of students taking a course together", fields: ["section_id", "course_id", "teacher_id", "room", "schedule", "capacity", "enrolled_count"] },
      { name: "Fee Record", description: "A tuition or fee transaction tied to a student", fields: ["fee_id", "student_id", "academic_year", "fee_type", "amount", "due_date", "paid_date", "status", "scholarship_applied"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Calendar", "Notifications"] },
      { label: "Academic", items: ["Students", "Courses", "Assignments", "Grades / Marks", "Exam Schedule"] },
      { label: "People", items: ["Teacher Portal", "Parent Portal"] },
      { label: "Administration", items: ["Fee Management", "Attendance", "Certificates", "Library"] },
      { label: "Analytics", items: ["Reports"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Grade tracking with automatic GPA calculation",
      "Course enrollment with prerequisite validation",
      "Attendance automation with biometric or QR support",
      "Parent communication with real-time notifications",
      "Exam scheduling with conflict detection",
      "Digital certificate generation and verification",
      "Fee payment gateway with installment plans",
    ],
  },

  government: {
    screens: [
      { name: "Dashboard", description: "Agency overview — active requests, SLA compliance, pending approvals", priority: "core", icon: "dashboard" },
      { name: "Service Catalogue", description: "Public-facing catalogue of all available government services", priority: "core", icon: "folder" },
      { name: "Applications", description: "Citizen-submitted applications for permits, licenses, and services", priority: "core", icon: "textInput" },
      { name: "Permits & Licenses", description: "Issue, renew, revoke, and track permits and licenses", priority: "core", icon: "folder" },
      { name: "Citizens / Users", description: "Citizen profiles with interaction history and linked documents", priority: "core", icon: "users" },
      { name: "Approvals Queue", description: "Multi-level approval workflows with delegation and escalation", priority: "core", icon: "workflow" },
      { name: "Documents", description: "Secure document management with digital signatures and verification", priority: "recommended", icon: "folder" },
      { name: "Notifications", description: "Push, SMS, and email notifications for status updates and deadlines", priority: "recommended", icon: "bell" },
      { name: "Audit Trail", description: "Immutable log of all system actions for transparency and compliance", priority: "core", icon: "search" },
      { name: "Compliance", description: "Regulatory compliance tracking, checklists, and reporting", priority: "recommended", icon: "shield" },
      { name: "Reports", description: "Service delivery KPIs, processing times, and departmental analytics", priority: "recommended", icon: "chart" },
      { name: "Knowledge Base", description: "Internal and public FAQs, guides, and policy documents", priority: "optional", icon: "folder" },
      { name: "Staff Directory", description: "Organizational directory with roles, departments, and contact info", priority: "optional", icon: "government" },
      { name: "Settings", description: "System configuration, SLA rules, workflow definitions, and access control", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Service Request", description: "A citizen's request for a government service", fields: ["request_id", "service_type", "citizen_id", "submitted_date", "status", "priority", "assigned_to", "department", "sla_deadline", "notes"] },
      { name: "Citizen", description: "An individual or organization interacting with government services", fields: ["citizen_id", "full_name", "national_id", "email", "phone", "address", "date_of_birth", "organization", "verified"] },
      { name: "Permit", description: "An authorization issued for a specific activity or construction", fields: ["permit_id", "type", "citizen_id", "property_address", "issued_date", "expiry_date", "status", "conditions", "inspections_required"] },
      { name: "License", description: "A certification or license to operate a business or activity", fields: ["license_id", "type", "holder_id", "business_name", "issued_date", "expiry_date", "status", "category", "renewal_due"] },
      { name: "Application", description: "A formal submission for a government service or permit", fields: ["application_id", "type", "citizen_id", "submitted_date", "documents", "status", "reviewer_id", "decision_date", "comments"] },
      { name: "Document", description: "An official document uploaded, generated, or verified by the system", fields: ["document_id", "title", "type", "owner_id", "upload_date", "verified", "verification_method", "expiry_date", "file_url"] },
      { name: "Approval", description: "A decision step in a multi-level review process", fields: ["approval_id", "request_id", "approver_id", "level", "decision", "comments", "decided_date", "delegated_to"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Notifications"] },
      { label: "Services", items: ["Service Catalogue", "Applications", "Permits & Licenses", "Approvals Queue"] },
      { label: "People", items: ["Citizens / Users", "Staff Directory"] },
      { label: "Governance", items: ["Audit Trail", "Compliance", "Documents"] },
      { label: "Resources", items: ["Knowledge Base", "Reports"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Multi-step approval workflows with delegation and escalation",
      "Document verification with digital signatures",
      "Public service catalogue with eligibility checks",
      "Immutable audit trail for all actions",
      "SLA tracking with automated alerts",
      "Citizen self-service portal",
      "Multi-channel notifications (SMS, email, push)",
    ],
  },

  retail: {
    screens: [
      { name: "Dashboard", description: "Sales overview — revenue, orders, top products, and conversion rates", priority: "core", icon: "dashboard" },
      { name: "Product Catalogue", description: "Manage products with images, variants, pricing, and categories", priority: "core", icon: "shoppingCart" },
      { name: "Product Detail", description: "Rich product page with gallery, specs, reviews, and availability", priority: "core", icon: "folder" },
      { name: "Cart", description: "Shopping cart with item management, quantities, and price breakdown", priority: "core", icon: "shoppingCart" },
      { name: "Checkout / Billing", description: "Multi-step checkout with payment gateway, addresses, and confirmation", priority: "core", icon: "currency" },
      { name: "Orders", description: "Order management with status tracking, fulfillment, and history", priority: "core", icon: "folder" },
      { name: "Customers", description: "Customer profiles with purchase history, preferences, and segments", priority: "core", icon: "users" },
      { name: "Reviews", description: "Customer ratings and reviews with moderation tools", priority: "recommended", icon: "star" },
      { name: "Inventory", description: "Stock levels, warehouse allocation, and reorder alerts", priority: "core", icon: "folder" },
      { name: "Categories", description: "Product taxonomy — categories, subcategories, and tags", priority: "recommended", icon: "folder" },
      { name: "Promotions / Discounts", description: "Create and manage coupons, flash sales, and bulk pricing rules", priority: "recommended", icon: "star" },
      { name: "Wishlists / Favourites", description: "Customer saved items with back-in-stock notifications", priority: "optional", icon: "heart" },
      { name: "Search & Filters", description: "Advanced product search with faceted filtering and sorting", priority: "recommended", icon: "search" },
      { name: "Returns / Refunds", description: "RMA management with return reasons, approvals, and refund processing", priority: "recommended", icon: "workflow" },
      { name: "Shipping", description: "Shipping methods, carrier integration, label generation, and tracking", priority: "recommended", icon: "truck" },
      { name: "Reports", description: "Sales analytics, inventory reports, customer cohorts, and forecasting", priority: "recommended", icon: "chart" },
      { name: "Settings", description: "Store configuration, payment providers, tax rules, and notifications", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Product", description: "An item available for sale in the store", fields: ["product_id", "name", "sku", "description", "price", "compare_at_price", "category_id", "images", "variants", "stock_quantity", "status"] },
      { name: "Order", description: "A customer purchase containing one or more items", fields: ["order_id", "customer_id", "items", "subtotal", "tax", "shipping_cost", "total", "payment_status", "fulfillment_status", "placed_at"] },
      { name: "Customer", description: "A registered buyer with profile and purchase history", fields: ["customer_id", "full_name", "email", "phone", "addresses", "total_orders", "total_spent", "segment", "created_at"] },
      { name: "Category", description: "A hierarchical product classification", fields: ["category_id", "name", "slug", "parent_id", "description", "image", "sort_order", "is_active"] },
      { name: "Review", description: "A customer rating and comment on a product", fields: ["review_id", "product_id", "customer_id", "rating", "title", "body", "verified_purchase", "status", "created_at"] },
      { name: "Promotion", description: "A discount rule — coupon, percentage off, or bundle deal", fields: ["promotion_id", "code", "type", "discount_value", "min_order_amount", "applicable_products", "start_date", "end_date", "usage_limit"] },
      { name: "Cart", description: "A temporary collection of items a customer intends to purchase", fields: ["cart_id", "customer_id", "items", "subtotal", "applied_coupons", "created_at", "updated_at"] },
      { name: "Inventory Item", description: "Stock record for a product variant at a specific location", fields: ["inventory_id", "product_id", "variant_id", "warehouse_id", "quantity", "reserved", "reorder_point", "last_restocked"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Notifications"] },
      { label: "Catalogue", items: ["Product Catalogue", "Categories", "Inventory", "Search & Filters"] },
      { label: "Sales", items: ["Orders", "Cart", "Checkout / Billing", "Returns / Refunds"] },
      { label: "Customers", items: ["Customers", "Reviews", "Wishlists / Favourites"] },
      { label: "Marketing", items: ["Promotions / Discounts", "Reports"] },
      { label: "Logistics", items: ["Shipping"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Product search & filters with faceted navigation",
      "Cart management with saved carts and guest checkout",
      "Payment gateway integration (Stripe, PayPal, etc.)",
      "Inventory tracking with low-stock alerts",
      "Coupon and promotion engine",
      "Order fulfillment workflow with carrier integration",
      "Customer segmentation and purchase analytics",
    ],
  },

  hr: {
    screens: [
      { name: "Dashboard", description: "HR overview — headcount, leave balance, open positions, upcoming reviews", priority: "core", icon: "dashboard" },
      { name: "Employees", description: "Employee directory with profiles, contracts, and employment history", priority: "core", icon: "users" },
      { name: "Leave Management", description: "Leave requests, approvals, balances, and public holiday calendar", priority: "core", icon: "calendar" },
      { name: "Payroll", description: "Salary processing, pay slips, deductions, and tax calculations", priority: "core", icon: "currency" },
      { name: "Benefits", description: "Employee benefits enrollment — health insurance, allowances, perks", priority: "recommended", icon: "star" },
      { name: "Performance Reviews", description: "Review cycles, goal setting, 360 feedback, and ratings", priority: "core", icon: "star" },
      { name: "Recruitment", description: "Job postings, applicant tracking, interviews, and offer management", priority: "recommended", icon: "search" },
      { name: "Onboarding", description: "New hire checklists, document collection, and orientation schedules", priority: "recommended", icon: "users" },
      { name: "Training", description: "Learning catalogue, enrollments, certifications, and completion tracking", priority: "recommended", icon: "graduation" },
      { name: "Org Chart", description: "Interactive organizational hierarchy with reporting lines", priority: "optional", icon: "building" },
      { name: "Expense Claims", description: "Submit, approve, and reimburse employee expenses with receipts", priority: "recommended", icon: "currency" },
      { name: "Attendance", description: "Clock in/out, timesheet management, and overtime tracking", priority: "recommended", icon: "calendar" },
      { name: "Documents", description: "Employee document vault — contracts, certificates, policies", priority: "recommended", icon: "folder" },
      { name: "Announcements", description: "Company-wide and team announcements with acknowledgment tracking", priority: "optional", icon: "bell" },
      { name: "Settings", description: "HR policies, approval chains, leave types, and system configuration", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Employee", description: "A person employed by the organization", fields: ["employee_id", "full_name", "email", "department", "position", "manager_id", "hire_date", "employment_type", "salary", "status"] },
      { name: "Leave Request", description: "A request for time off submitted by an employee", fields: ["leave_id", "employee_id", "leave_type", "start_date", "end_date", "days_count", "reason", "status", "approver_id"] },
      { name: "Payroll Record", description: "A monthly or periodic pay record for an employee", fields: ["payroll_id", "employee_id", "period", "basic_salary", "allowances", "deductions", "net_pay", "tax", "status"] },
      { name: "Performance Review", description: "A periodic evaluation of an employee's performance", fields: ["review_id", "employee_id", "reviewer_id", "cycle", "goals", "rating", "feedback", "status", "completed_date"] },
      { name: "Job Opening", description: "A recruitment vacancy posted by a department", fields: ["job_id", "title", "department", "description", "requirements", "salary_range", "posted_date", "status", "applicant_count"] },
      { name: "Training Course", description: "A learning program available for employee development", fields: ["course_id", "title", "provider", "format", "duration_hours", "max_capacity", "enrolled_count", "certification", "status"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Announcements", "Notifications"] },
      { label: "People", items: ["Employees", "Org Chart", "Attendance"] },
      { label: "Time & Pay", items: ["Leave Management", "Payroll", "Expense Claims"] },
      { label: "Talent", items: ["Performance Reviews", "Recruitment", "Onboarding", "Training"] },
      { label: "Administration", items: ["Benefits", "Documents"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Self-service leave requests with automatic balance tracking",
      "Payroll processing with tax and deduction automation",
      "Performance review cycles with configurable workflows",
      "Applicant tracking from posting to offer",
      "Onboarding checklists with task assignment",
      "Org chart with real-time hierarchy updates",
      "Employee self-service portal",
    ],
  },

  finance: {
    screens: [
      { name: "Dashboard", description: "Financial overview — active policies, claims, premiums, and risk exposure", priority: "core", icon: "dashboard" },
      { name: "Clients", description: "Client registry with profiles, policies, claims history, and communications", priority: "core", icon: "users" },
      { name: "Policies", description: "Policy management — issuance, amendments, renewals, and cancellations", priority: "core", icon: "folder" },
      { name: "Claims", description: "Claims submission, assessment, adjudication, and settlement tracking", priority: "core", icon: "folder" },
      { name: "Quotes", description: "Generate and compare insurance quotes with premium calculations", priority: "core", icon: "currency" },
      { name: "Payments", description: "Premium collections, claim payouts, refunds, and reconciliation", priority: "core", icon: "currency" },
      { name: "Risk Assessment", description: "Underwriting risk scoring, actuarial data, and risk factor analysis", priority: "recommended", icon: "shield" },
      { name: "Compliance", description: "Regulatory compliance tracking, AML/KYC checks, and filing deadlines", priority: "core", icon: "shield" },
      { name: "Documents", description: "Policy documents, claim evidence, correspondence, and templates", priority: "recommended", icon: "folder" },
      { name: "Renewals", description: "Upcoming renewals with auto-renewal settings and client notifications", priority: "recommended", icon: "workflow" },
      { name: "Commission Tracking", description: "Agent and broker commission calculations and payout schedules", priority: "recommended", icon: "currency" },
      { name: "Reports", description: "Loss ratios, premium analytics, portfolio performance, and regulatory reports", priority: "recommended", icon: "chart" },
      { name: "Underwriting", description: "Application review, risk evaluation, and policy approval workflows", priority: "recommended", icon: "search" },
      { name: "Portfolio View", description: "Aggregate portfolio analysis by product, region, and risk class", priority: "optional", icon: "chart" },
      { name: "Settings", description: "Product configuration, underwriting rules, premium tables, and user roles", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Client", description: "An individual or organization holding or seeking a policy", fields: ["client_id", "full_name", "type", "email", "phone", "address", "date_of_birth", "kyc_status", "risk_profile", "assigned_agent_id"] },
      { name: "Policy", description: "An insurance contract covering a specific risk", fields: ["policy_id", "client_id", "product_type", "coverage_amount", "premium", "start_date", "end_date", "status", "underwriter_id", "terms"] },
      { name: "Claim", description: "A request from a policyholder for coverage of a loss", fields: ["claim_id", "policy_id", "client_id", "incident_date", "description", "claimed_amount", "assessed_amount", "status", "adjuster_id", "settlement_date"] },
      { name: "Quote", description: "A premium estimate for a prospective policy", fields: ["quote_id", "client_id", "product_type", "coverage_amount", "premium_estimate", "risk_factors", "valid_until", "status", "created_by"] },
      { name: "Payment", description: "A financial transaction — premium payment, claim payout, or refund", fields: ["payment_id", "type", "policy_id", "claim_id", "amount", "method", "status", "processed_date", "reference"] },
      { name: "Risk Assessment", description: "An evaluation of risk factors for underwriting decisions", fields: ["assessment_id", "client_id", "policy_id", "risk_score", "factors", "recommendation", "assessor_id", "date", "notes"] },
      { name: "Commission", description: "A commission record for an agent or broker", fields: ["commission_id", "agent_id", "policy_id", "rate", "amount", "period", "status", "paid_date"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Notifications"] },
      { label: "Business", items: ["Clients", "Policies", "Quotes", "Renewals"] },
      { label: "Claims", items: ["Claims", "Underwriting", "Risk Assessment"] },
      { label: "Finance", items: ["Payments", "Commission Tracking", "Reports"] },
      { label: "Governance", items: ["Compliance", "Documents", "Portfolio View"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Policy lifecycle management from quote to renewal",
      "Claims processing with adjudication workflows",
      "Compliance tracking with AML/KYC integration",
      "Risk-based underwriting with scoring models",
      "Commission calculation and agent payouts",
      "Premium analytics and loss ratio dashboards",
      "Document generation with e-signature support",
    ],
  },

  operations: {
    screens: [
      { name: "Dashboard", description: "Operations overview — active shipments, delivery rates, fleet status", priority: "core", icon: "dashboard" },
      { name: "Shipments", description: "Manage outbound and inbound shipments with status tracking", priority: "core", icon: "folder" },
      { name: "Tracking", description: "Real-time shipment tracking with map visualization and ETAs", priority: "core", icon: "mapPin" },
      { name: "Warehouses", description: "Warehouse profiles, capacity planning, and zone management", priority: "core", icon: "factory" },
      { name: "Inventory", description: "Stock levels across warehouses with bin-level tracking", priority: "core", icon: "folder" },
      { name: "Routes", description: "Delivery route planning, optimization, and scheduling", priority: "recommended", icon: "mapPin" },
      { name: "Fleet Management", description: "Vehicle registry, maintenance schedules, and utilization tracking", priority: "recommended", icon: "truck" },
      { name: "Delivery Schedule", description: "Daily/weekly delivery planning with driver assignments", priority: "recommended", icon: "calendar" },
      { name: "Returns", description: "Reverse logistics — return pickups, inspections, and restocking", priority: "recommended", icon: "workflow" },
      { name: "Vendors", description: "Vendor directory with contracts, performance ratings, and contacts", priority: "core", icon: "users" },
      { name: "Purchase Orders", description: "Create, approve, and track purchase orders with vendors", priority: "core", icon: "folder" },
      { name: "Quality Control", description: "Inspection checklists, defect tracking, and compliance logs", priority: "recommended", icon: "search" },
      { name: "Reports", description: "Delivery KPIs, inventory turnover, vendor scorecards, and cost analysis", priority: "recommended", icon: "chart" },
      { name: "Alerts", description: "Automated alerts for delays, stock-outs, and SLA breaches", priority: "recommended", icon: "bell" },
      { name: "Settings", description: "Warehouse zones, shipping methods, vendor terms, and system config", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Shipment", description: "A consignment of goods in transit between locations", fields: ["shipment_id", "origin", "destination", "items", "weight", "carrier", "tracking_number", "status", "estimated_delivery", "actual_delivery"] },
      { name: "Warehouse", description: "A storage facility with zones, docks, and capacity metrics", fields: ["warehouse_id", "name", "address", "capacity_sqft", "utilization_pct", "zones", "dock_count", "manager_id", "status"] },
      { name: "Inventory Item", description: "A stock-keeping record for a specific product in a warehouse", fields: ["inventory_id", "product_id", "warehouse_id", "bin_location", "quantity", "reserved", "reorder_point", "last_counted", "status"] },
      { name: "Route", description: "A planned delivery path with waypoints and schedule", fields: ["route_id", "name", "origin", "stops", "distance_km", "estimated_duration", "assigned_vehicle_id", "driver_id", "status"] },
      { name: "Vehicle", description: "A fleet vehicle used for deliveries or pickups", fields: ["vehicle_id", "type", "license_plate", "capacity_kg", "mileage", "last_maintenance", "next_maintenance", "status", "assigned_driver_id"] },
      { name: "Purchase Order", description: "A formal order placed with a vendor for goods or materials", fields: ["po_id", "vendor_id", "items", "total_amount", "order_date", "expected_delivery", "status", "approved_by", "received_date"] },
      { name: "Vendor", description: "A supplier or service provider in the supply chain", fields: ["vendor_id", "company_name", "contact_person", "email", "phone", "category", "rating", "contract_end", "payment_terms"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Alerts", "Notifications"] },
      { label: "Logistics", items: ["Shipments", "Tracking", "Routes", "Delivery Schedule"] },
      { label: "Warehousing", items: ["Warehouses", "Inventory", "Quality Control"] },
      { label: "Fleet", items: ["Fleet Management", "Returns"] },
      { label: "Procurement", items: ["Vendors", "Purchase Orders"] },
      { label: "Analytics", items: ["Reports"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Real-time shipment tracking with map visualization",
      "Route optimization with multi-stop planning",
      "Warehouse management with bin-level inventory",
      "Fleet tracking and maintenance scheduling",
      "Purchase order lifecycle management",
      "Vendor performance scorecards",
      "Automated low-stock and delay alerts",
    ],
  },

  logistics: {
    screens: [
      { name: "Dashboard", description: "Operations overview — active shipments, delivery rates, fleet status", priority: "core", icon: "dashboard" },
      { name: "Shipments", description: "Manage outbound and inbound shipments with status tracking", priority: "core", icon: "folder" },
      { name: "Tracking", description: "Real-time shipment tracking with map visualization and ETAs", priority: "core", icon: "mapPin" },
      { name: "Warehouses", description: "Warehouse profiles, capacity planning, and zone management", priority: "core", icon: "factory" },
      { name: "Inventory", description: "Stock levels across warehouses with bin-level tracking", priority: "core", icon: "folder" },
      { name: "Routes", description: "Delivery route planning, optimization, and scheduling", priority: "recommended", icon: "mapPin" },
      { name: "Fleet Management", description: "Vehicle registry, maintenance schedules, and utilization tracking", priority: "recommended", icon: "truck" },
      { name: "Delivery Schedule", description: "Daily/weekly delivery planning with driver assignments", priority: "recommended", icon: "calendar" },
      { name: "Returns", description: "Reverse logistics — return pickups, inspections, and restocking", priority: "recommended", icon: "workflow" },
      { name: "Vendors", description: "Vendor directory with contracts, performance ratings, and contacts", priority: "core", icon: "users" },
      { name: "Purchase Orders", description: "Create, approve, and track purchase orders with vendors", priority: "core", icon: "folder" },
      { name: "Quality Control", description: "Inspection checklists, defect tracking, and compliance logs", priority: "recommended", icon: "search" },
      { name: "Reports", description: "Delivery KPIs, inventory turnover, vendor scorecards, and cost analysis", priority: "recommended", icon: "chart" },
      { name: "Alerts", description: "Automated alerts for delays, stock-outs, and SLA breaches", priority: "recommended", icon: "bell" },
      { name: "Settings", description: "Warehouse zones, shipping methods, vendor terms, and system config", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Shipment", description: "A consignment of goods in transit between locations", fields: ["shipment_id", "origin", "destination", "items", "weight", "carrier", "tracking_number", "status", "estimated_delivery", "actual_delivery"] },
      { name: "Warehouse", description: "A storage facility with zones, docks, and capacity metrics", fields: ["warehouse_id", "name", "address", "capacity_sqft", "utilization_pct", "zones", "dock_count", "manager_id", "status"] },
      { name: "Inventory Item", description: "A stock-keeping record for a specific product in a warehouse", fields: ["inventory_id", "product_id", "warehouse_id", "bin_location", "quantity", "reserved", "reorder_point", "last_counted", "status"] },
      { name: "Route", description: "A planned delivery path with waypoints and schedule", fields: ["route_id", "name", "origin", "stops", "distance_km", "estimated_duration", "assigned_vehicle_id", "driver_id", "status"] },
      { name: "Vehicle", description: "A fleet vehicle used for deliveries or pickups", fields: ["vehicle_id", "type", "license_plate", "capacity_kg", "mileage", "last_maintenance", "next_maintenance", "status", "assigned_driver_id"] },
      { name: "Purchase Order", description: "A formal order placed with a vendor for goods or materials", fields: ["po_id", "vendor_id", "items", "total_amount", "order_date", "expected_delivery", "status", "approved_by", "received_date"] },
      { name: "Vendor", description: "A supplier or service provider in the supply chain", fields: ["vendor_id", "company_name", "contact_person", "email", "phone", "category", "rating", "contract_end", "payment_terms"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Alerts", "Notifications"] },
      { label: "Logistics", items: ["Shipments", "Tracking", "Routes", "Delivery Schedule"] },
      { label: "Warehousing", items: ["Warehouses", "Inventory", "Quality Control"] },
      { label: "Fleet", items: ["Fleet Management", "Returns"] },
      { label: "Procurement", items: ["Vendors", "Purchase Orders"] },
      { label: "Analytics", items: ["Reports"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Real-time shipment tracking with map visualization",
      "Route optimization with multi-stop planning",
      "Warehouse management with bin-level inventory",
      "Fleet tracking and maintenance scheduling",
      "Purchase order lifecycle management",
      "Vendor performance scorecards",
      "Automated low-stock and delay alerts",
    ],
  },

  hospitality: {
    screens: [
      { name: "Dashboard", description: "Property overview — occupancy rates, arrivals, departures, revenue", priority: "core", icon: "dashboard" },
      { name: "Reservations", description: "Create, modify, and cancel reservations with rate management", priority: "core", icon: "calendar" },
      { name: "Rooms / Properties", description: "Room inventory with types, amenities, pricing, and availability", priority: "core", icon: "hotel" },
      { name: "Guests", description: "Guest profiles with stay history, preferences, and loyalty status", priority: "core", icon: "users" },
      { name: "Check-in / Check-out", description: "Streamlined arrival and departure processing with ID verification", priority: "core", icon: "lock" },
      { name: "Housekeeping", description: "Room cleaning schedules, status updates, and task assignment", priority: "core", icon: "settings" },
      { name: "F&B Orders", description: "Restaurant and room service orders with kitchen ticket management", priority: "recommended", icon: "store" },
      { name: "Events", description: "Conference rooms, banquets, and event space booking and coordination", priority: "recommended", icon: "calendar" },
      { name: "Reviews", description: "Guest reviews and feedback with response management", priority: "recommended", icon: "star" },
      { name: "Billing", description: "Guest folios, charges, payment processing, and invoicing", priority: "core", icon: "currency" },
      { name: "Loyalty Program", description: "Points management, tier tracking, and reward redemption", priority: "optional", icon: "star" },
      { name: "Amenities", description: "Spa, gym, pool, and activity booking and availability", priority: "optional", icon: "heart" },
      { name: "Staff Schedule", description: "Shift management across departments with availability tracking", priority: "recommended", icon: "calendar" },
      { name: "Reports", description: "RevPAR, ADR, occupancy analytics, guest satisfaction, and revenue reports", priority: "recommended", icon: "chart" },
      { name: "Settings", description: "Rate plans, room types, tax configuration, and channel management", priority: "core", icon: "settings" },
    ],
    entities: [
      { name: "Reservation", description: "A booking for one or more rooms over a date range", fields: ["reservation_id", "guest_id", "room_ids", "check_in", "check_out", "rate_plan", "total_amount", "status", "source", "special_requests"] },
      { name: "Guest", description: "A person who stays at or visits the property", fields: ["guest_id", "full_name", "email", "phone", "nationality", "id_document", "loyalty_tier", "preferences", "total_stays", "notes"] },
      { name: "Room", description: "An individual accommodation unit within the property", fields: ["room_id", "number", "type", "floor", "capacity", "amenities", "base_rate", "status", "last_cleaned", "condition"] },
      { name: "Housekeeping Task", description: "A cleaning or maintenance task assigned for a room", fields: ["task_id", "room_id", "type", "assigned_to", "priority", "status", "scheduled_time", "completed_time", "notes"] },
      { name: "F&B Order", description: "A food and beverage order from a restaurant or room service", fields: ["order_id", "guest_id", "room_id", "outlet", "items", "subtotal", "tax", "total", "status", "placed_at"] },
      { name: "Event", description: "A booked event or function at the property", fields: ["event_id", "name", "organizer", "venue", "date", "start_time", "end_time", "attendees", "setup_type", "total_cost", "status"] },
      { name: "Invoice", description: "A billing document for a guest's stay and charges", fields: ["invoice_id", "reservation_id", "guest_id", "line_items", "subtotal", "tax", "total", "payment_method", "status", "issued_date"] },
    ],
    navigation: [
      { label: "Overview", items: ["Dashboard", "Notifications"] },
      { label: "Front Desk", items: ["Reservations", "Check-in / Check-out", "Guests"] },
      { label: "Property", items: ["Rooms / Properties", "Housekeeping", "Amenities"] },
      { label: "Services", items: ["F&B Orders", "Events", "Loyalty Program"] },
      { label: "Finance", items: ["Billing", "Reports"] },
      { label: "Operations", items: ["Staff Schedule", "Reviews"] },
      { label: "System", items: ["Settings"] },
    ],
    features: [
      "Reservation management with channel integration",
      "Guest experience personalization with preference tracking",
      "Housekeeping coordination with real-time room status",
      "Dynamic rate management and revenue optimization",
      "Event and banquet booking with resource planning",
      "Loyalty program with tier-based benefits",
      "Multi-department billing and folio management",
    ],
  },
};

const defaultArchitecture: InformationArchitecture = {
  screens: [
    { name: "Dashboard", description: "Application overview with key metrics and recent activity", priority: "core", icon: "dashboard" },
    { name: "List View", description: "Searchable, filterable list of primary items", priority: "core", icon: "folder" },
    { name: "Detail Page", description: "Full detail view for a single item with related data", priority: "core", icon: "folder" },
    { name: "Form Page", description: "Create and edit forms for primary entities", priority: "core", icon: "textInput" },
    { name: "Settings", description: "Application settings, preferences, and configurations", priority: "core", icon: "settings" },
    { name: "Users", description: "User management with roles, permissions, and profiles", priority: "core", icon: "users" },
    { name: "Reports", description: "Data analytics, charts, and exportable reports", priority: "recommended", icon: "chart" },
    { name: "Notifications", description: "Activity feed and notification preferences", priority: "recommended", icon: "bell" },
    { name: "Search", description: "Global search with filters and saved queries", priority: "recommended", icon: "search" },
    { name: "Profile", description: "User profile and account settings", priority: "recommended", icon: "users" },
    { name: "Help", description: "Help center, documentation, and support contact", priority: "optional", icon: "search" },
  ],
  entities: [
    { name: "User", description: "An application user with credentials and profile", fields: ["user_id", "full_name", "email", "role", "status", "created_at", "last_login"] },
    { name: "Item", description: "A primary data record in the application", fields: ["item_id", "title", "description", "type", "status", "owner_id", "created_at", "updated_at"] },
    { name: "Category", description: "A classification or grouping for items", fields: ["category_id", "name", "description", "parent_id", "sort_order"] },
    { name: "Report", description: "A generated analytical report or export", fields: ["report_id", "title", "type", "generated_by", "date_range", "created_at", "file_url"] },
    { name: "Notification", description: "A system or user-generated notification", fields: ["notification_id", "user_id", "type", "title", "message", "read", "created_at"] },
  ],
  navigation: [
    { label: "Overview", items: ["Dashboard", "Notifications"] },
    { label: "Content", items: ["List View", "Search"] },
    { label: "Management", items: ["Users", "Reports"] },
    { label: "System", items: ["Settings", "Help"] },
  ],
  features: [
    "CRUD operations for primary entities",
    "Search & filter with saved queries",
    "User management with role-based access",
    "Notification system",
    "Data export and reporting",
  ],
};

const projectTypeOverlays: Record<string, { screens: ScreenRecommendation[]; features: string[] }> = {
  "admin-portal": {
    screens: [
      { name: "Admin Users", description: "Manage administrator accounts, roles, and permissions", priority: "core", icon: "lock" },
      { name: "Roles & Permissions", description: "Define roles with granular permission sets and access policies", priority: "core", icon: "shield" },
      { name: "System Logs", description: "Audit logs, error logs, and access history with filtering", priority: "recommended", icon: "folder" },
      { name: "Configuration", description: "Feature flags, environment settings, and system parameters", priority: "recommended", icon: "settings" },
    ],
    features: [
      "Role-based access control (RBAC)",
      "Audit logging with tamper-proof records",
      "Feature flag management",
      "System health monitoring",
    ],
  },
  "employee-portal": {
    screens: [
      { name: "My Profile", description: "Personal information, employment details, and document vault", priority: "core", icon: "users" },
      { name: "My Requests", description: "Track submitted requests — leave, expenses, IT, facilities", priority: "core", icon: "folder" },
      { name: "My Approvals", description: "Items awaiting your review and approval decision", priority: "core", icon: "workflow" },
      { name: "Directory", description: "Searchable employee directory with org structure", priority: "recommended", icon: "users" },
    ],
    features: [
      "Self-service request submission",
      "Approval workflow with delegation",
      "Employee directory with org chart",
      "Personal document management",
    ],
  },
  "customer-portal": {
    screens: [
      { name: "My Account", description: "Account overview, subscription details, and billing history", priority: "core", icon: "users" },
      { name: "Support Tickets", description: "Submit and track support requests with conversation threads", priority: "core", icon: "textInput" },
      { name: "Knowledge Base", description: "Self-service help articles, guides, and FAQs", priority: "recommended", icon: "folder" },
      { name: "Downloads", description: "Access purchased content, invoices, and exported data", priority: "optional", icon: "folder" },
    ],
    features: [
      "Customer self-service portal",
      "Support ticket lifecycle management",
      "Knowledge base with search",
      "Downloadable invoices and documents",
    ],
  },
  "booking-app": {
    screens: [
      { name: "Bookings", description: "View, create, and manage bookings with status tracking", priority: "core", icon: "calendar" },
      { name: "Schedule", description: "Provider or resource schedule view with availability slots", priority: "core", icon: "calendar" },
      { name: "Availability Calendar", description: "Visual calendar showing open, booked, and blocked time slots", priority: "core", icon: "calendar" },
      { name: "Cancellations", description: "Cancellation requests, refund processing, and rebooking", priority: "recommended", icon: "workflow" },
    ],
    features: [
      "Real-time availability checking",
      "Booking confirmation with notifications",
      "Cancellation and rescheduling flows",
      "Calendar sync integration",
    ],
  },
  marketplace: {
    screens: [
      { name: "Listings", description: "Browse and search marketplace listings with advanced filters", priority: "core", icon: "store" },
      { name: "Sellers / Vendors", description: "Vendor profiles, store pages, and performance metrics", priority: "core", icon: "store" },
      { name: "Reviews", description: "Buyer reviews and ratings for listings and sellers", priority: "recommended", icon: "star" },
      { name: "Categories", description: "Marketplace taxonomy with featured and trending sections", priority: "recommended", icon: "folder" },
      { name: "Verification", description: "Identity and business verification workflows for sellers", priority: "recommended", icon: "lock" },
    ],
    features: [
      "Multi-vendor listing management",
      "Seller verification and onboarding",
      "Review and rating system",
      "Category-based discovery with search",
      "Commission and payout management",
    ],
  },
  "operations-dashboard": {
    screens: [
      { name: "KPIs", description: "Key performance indicators with real-time and historical views", priority: "core", icon: "dashboard" },
      { name: "Monitoring", description: "Live system and process monitoring with health checks", priority: "core", icon: "monitor" },
      { name: "Alerts", description: "Alert rules, active incidents, and notification routing", priority: "core", icon: "bell" },
      { name: "SLA Tracking", description: "Service level agreement compliance with breach detection", priority: "recommended", icon: "chart" },
    ],
    features: [
      "Real-time KPI dashboards with drill-down",
      "Alerting with escalation rules",
      "SLA compliance monitoring",
      "System health and uptime tracking",
    ],
  },
};

function mergeArchitecture(
  base: InformationArchitecture,
  overlay: { screens: ScreenRecommendation[]; features: string[] }
): InformationArchitecture {
  const existingScreenNames = new Set(base.screens.map((s) => s.name.toLowerCase()));
  const newScreens = overlay.screens.filter(
    (s) => !existingScreenNames.has(s.name.toLowerCase())
  );

  const existingFeatures = new Set(base.features.map((f) => f.toLowerCase()));
  const newFeatures = overlay.features.filter(
    (f) => !existingFeatures.has(f.toLowerCase())
  );

  return {
    ...base,
    screens: [...base.screens, ...newScreens],
    features: [...base.features, ...newFeatures],
  };
}

export function getInformationArchitecture(
  industry: string,
  projectType: string
): InformationArchitecture {
  const base =
    industryArchitectures[industry] ??
    industryArchitectures[industry.toLowerCase()] ??
    defaultArchitecture;

  const overlay = projectTypeOverlays[projectType];
  if (!overlay) return { ...base };

  return mergeArchitecture(base, overlay);
}
