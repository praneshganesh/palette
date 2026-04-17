"use client";

import { motion } from "framer-motion";

interface NavButtonsProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  nextLabel?: string;
  isLastStep?: boolean;
}

export function NavButtons({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  nextLabel,
  isLastStep = false,
}: NavButtonsProps) {
  return (
    <div className="flex items-center justify-between py-5">
      <motion.button
        onClick={onBack}
        disabled={!canGoBack}
        whileHover={canGoBack ? { x: -3 } : undefined}
        whileTap={canGoBack ? { scale: 0.96 } : undefined}
        className={`flex items-center gap-3 rounded-xl border px-7 py-3.5 text-[14px] font-medium transition-all duration-200
          ${
            canGoBack
              ? "border-[#27272A] bg-[#111114] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] hover:bg-[#18181B] cursor-pointer"
              : "border-transparent bg-transparent text-[#27272A] cursor-not-allowed"
          }
        `}
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </motion.button>

      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        whileHover={canGoNext ? { scale: 1.03, y: -1 } : undefined}
        whileTap={canGoNext ? { scale: 0.96 } : undefined}
        className={`relative flex items-center gap-3 rounded-xl px-8 py-3.5 text-[14px] font-semibold transition-all duration-200
          ${
            canGoNext
              ? "bg-[#818CF8] text-white shadow-[0_4px_24px_-2px_rgba(129,140,248,0.4)] hover:shadow-[0_8px_32px_-2px_rgba(129,140,248,0.5)] cursor-pointer"
              : "bg-[#18181B] text-[#3F3F46] border border-[#1E1E24] cursor-not-allowed"
          }
        `}
      >
        {isLastStep ? (nextLabel || "Generate") : (nextLabel || "Continue")}
        {!isLastStep ? (
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
