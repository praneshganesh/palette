"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { OnboardingWizard } from "@/components/onboarding/wizard";

export default function OnboardingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 flex flex-col flex-1">
        <OnboardingWizard />
      </div>
    </div>
  );
}
