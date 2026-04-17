"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  "Analyzing your inputs...",
  "Connecting to AI engine...",
  "Generating color palette...",
  "Building typography system...",
  "Mapping component themes...",
  "Selecting relevant components...",
  "Validating accessibility...",
  "Finalizing design system...",
];

export function GeneratingScreen({ status }: { status?: string }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      {/* Animated orb */}
      <motion.div
        className="relative mb-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-palette-accent-1/20 via-palette-accent-2/20 to-palette-accent-3/20 blur-xl" />
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-palette-accent-1 via-palette-accent-2 to-palette-accent-3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-4 rounded-full bg-palette-bg" />
        <motion.div
          className="absolute inset-6 rounded-full bg-gradient-to-br from-palette-accent-1/40 to-palette-accent-3/40"
          animate={{ scale: [1, 0.9, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Step list */}
      <div className="flex flex-col gap-2 max-w-xs w-full">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: i <= currentStep ? 1 : 0.2,
              x: 0,
            }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="relative h-4 w-4 flex items-center justify-center">
              {i < currentStep ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <circle cx="7" cy="7" r="7" fill="#6366F1" fillOpacity="0.15" />
                  <path
                    d="M4 7L6 9L10 5"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              ) : i === currentStep ? (
                <motion.div
                  className="h-2 w-2 rounded-full bg-palette-accent-1"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ) : (
                <div className="h-1.5 w-1.5 rounded-full bg-palette-border" />
              )}
            </div>
            <span
              className={`text-sm ${
                i <= currentStep
                  ? "text-palette-text-secondary"
                  : "text-palette-text-muted"
              }`}
            >
              {step}
            </span>
          </motion.div>
        ))}
      </div>

      {status && (
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-xs text-palette-text-muted tracking-wide"
        >
          {status}
        </motion.p>
      )}
    </div>
  );
}
