"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useOnboardingStore } from "@/store/onboarding";
import { OptionCard } from "@/components/ui/option-card";
import type { Industry } from "@/types";
import {
  Icon3dGovernment, Icon3dSchool, Icon3dHospital, Icon3dBuilding,
  Icon3dPeople, Icon3dFactory, Icon3dTruck, Icon3dShoppingCart,
  Icon3dBank, Icon3dHotel, Icon3dPuzzle, Icon3dTechnology,
  Icon3dAiMl, Icon3dMedia, Icon3dNonprofit, Icon3dLegal,
  Icon3dConstruction, Icon3dEnergy, Icon3dTelecom,
} from "@/components/ui/icons-3d";

const industries: { id: Industry; label: string; icon: ReactNode; description: string }[] = [
  { id: "technology", label: "Technology / SaaS", icon: <Icon3dTechnology size={24} />, description: "Software, platforms, startups" },
  { id: "ai-ml", label: "AI / ML / Future Tech", icon: <Icon3dAiMl size={24} />, description: "AI, VR/AR, machine learning" },
  { id: "finance", label: "Finance / Fintech", icon: <Icon3dBank size={24} />, description: "Banking, insurance, payments" },
  { id: "healthcare", label: "Healthcare", icon: <Icon3dHospital size={24} />, description: "Calm, readable, status-driven" },
  { id: "real-estate", label: "Real Estate", icon: <Icon3dBuilding size={24} />, description: "Premium, media-rich, property" },
  { id: "retail", label: "Retail / E-Commerce", icon: <Icon3dShoppingCart size={24} />, description: "Product-focused, conversion" },
  { id: "education", label: "Education", icon: <Icon3dSchool size={24} />, description: "Content-focused, LMS portals" },
  { id: "government", label: "Government / Citizen Services", icon: <Icon3dGovernment size={24} />, description: "Public sector, formal, accessible" },
  { id: "hr", label: "HR / Internal", icon: <Icon3dPeople size={24} />, description: "Self-service, workflow, payroll" },
  { id: "operations", label: "Operations", icon: <Icon3dFactory size={24} />, description: "Dense, action-heavy, KPIs" },
  { id: "logistics", label: "Logistics / Supply Chain", icon: <Icon3dTruck size={24} />, description: "Tracking, maps, status" },
  { id: "hospitality", label: "Hospitality / Travel", icon: <Icon3dHotel size={24} />, description: "Warm, booking-oriented" },
  { id: "media-entertainment", label: "Media / Entertainment", icon: <Icon3dMedia size={24} />, description: "Content, streaming, engagement" },
  { id: "legal", label: "Legal / Compliance", icon: <Icon3dLegal size={24} />, description: "Document-heavy, formal" },
  { id: "construction", label: "Construction / Engineering", icon: <Icon3dConstruction size={24} />, description: "Project management, planning" },
  { id: "energy", label: "Energy / Utilities", icon: <Icon3dEnergy size={24} />, description: "Monitoring, consumption, IoT" },
  { id: "telecom", label: "Telecom", icon: <Icon3dTelecom size={24} />, description: "Networks, accounts, billing" },
  { id: "nonprofit", label: "Non-Profit / NGO", icon: <Icon3dNonprofit size={24} />, description: "Impact, donations, community" },
  { id: "other", label: "Other", icon: <Icon3dPuzzle size={24} />, description: "Custom industry" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function StepIndustry() {
  const { industry, setIndustry } = useOnboardingStore();

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
        Industry
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 8 }}>
        Which industry are you in?
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 36, lineHeight: 1.6 }}>
        This influences tone, trust profile, and template recommendations.
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 32, alignItems: "stretch" }}
      >
        {industries.map((ind) => (
          <motion.div key={ind.id} variants={itemVariants} className="h-full">
            <OptionCard
              selected={industry === ind.id}
              onClick={() => setIndustry(ind.id)}
              icon={ind.icon}
              label={ind.label}
              description={ind.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
