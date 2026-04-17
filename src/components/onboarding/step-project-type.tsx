"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useOnboardingStore } from "@/store/onboarding";
import { OptionCard } from "@/components/ui/option-card";
import type { ProjectType } from "@/types";
import {
  Icon3dMonitor, Icon3dBriefcase, Icon3dUsers, Icon3dGraduation,
  Icon3dWorkflow, Icon3dDashboard, Icon3dBooking, Icon3dStore, Icon3dSparkle,
  Icon3dEcommerce, Icon3dSaas, Icon3dCrm, Icon3dAnalytics,
  Icon3dSocialPlatform, Icon3dContent, Icon3dMobile,
} from "@/components/ui/icons-3d";

const projectTypes: { id: ProjectType; label: string; icon: ReactNode; description: string }[] = [
  { id: "admin-portal", label: "Internal Admin Portal", icon: <Icon3dMonitor size={24} />, description: "Back-office tools, user management" },
  { id: "employee-portal", label: "Employee Self-Service", icon: <Icon3dBriefcase size={24} />, description: "HR requests, leave, payroll" },
  { id: "customer-portal", label: "Customer Portal", icon: <Icon3dUsers size={24} />, description: "Client dashboards, support" },
  { id: "education-portal", label: "Education Portal", icon: <Icon3dGraduation size={24} />, description: "Student portals, LMS" },
  { id: "workflow-app", label: "Approval / Workflow", icon: <Icon3dWorkflow size={24} />, description: "Request routing, approvals" },
  { id: "operations-dashboard", label: "Operations Dashboard", icon: <Icon3dDashboard size={24} />, description: "KPIs, monitoring, data" },
  { id: "booking-app", label: "Booking / Request App", icon: <Icon3dBooking size={24} />, description: "Reservations, scheduling" },
  { id: "marketplace", label: "Marketplace / Directory", icon: <Icon3dStore size={24} />, description: "Listings, search, profiles" },
  { id: "ecommerce-store", label: "E-Commerce Store", icon: <Icon3dEcommerce size={24} />, description: "Product catalog, cart, checkout" },
  { id: "saas-product", label: "SaaS Product", icon: <Icon3dSaas size={24} />, description: "Subscriptions, settings, analytics" },
  { id: "crm", label: "CRM / Sales Platform", icon: <Icon3dCrm size={24} />, description: "Contacts, pipelines, deals" },
  { id: "analytics-platform", label: "Analytics / BI Platform", icon: <Icon3dAnalytics size={24} />, description: "Charts, reports, dashboards" },
  { id: "social-platform", label: "Social / Community", icon: <Icon3dSocialPlatform size={24} />, description: "Feeds, profiles, messaging" },
  { id: "content-platform", label: "CMS / Blog / Content", icon: <Icon3dContent size={24} />, description: "Publishing, content management" },
  { id: "mobile-app", label: "Mobile App", icon: <Icon3dMobile size={24} />, description: "Mobile-first, touch-optimized" },
  { id: "other", label: "Something Else", icon: <Icon3dSparkle size={24} />, description: "Custom project type" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function StepProjectType() {
  const { projectType, setProjectType } = useOnboardingStore();

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
        Project type
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 8 }}>
        What are you building?
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 36, lineHeight: 1.6 }}>
        This shapes your layout defaults, navigation patterns, and component priorities.
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 32, alignItems: "stretch" }}
      >
        {projectTypes.map((type) => (
          <motion.div key={type.id} variants={itemVariants} className="h-full">
            <OptionCard
              selected={projectType === type.id}
              onClick={() => setProjectType(type.id)}
              icon={type.icon}
              label={type.label}
              description={type.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
