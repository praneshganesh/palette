"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { useOnboardingStore } from "@/store/onboarding";
import { curatedPalettes } from "@/lib/palettes";
import { extractColorsFromImageData } from "@/lib/color-utils";

type Mode = "choose" | "logo" | "palette";

export function StepLogoPalette() {
  const { logoPreviewUrl, setLogoFile, extractedColors, setExtractedColors, selectedPalette, setSelectedPalette } = useOnboardingStore();
  const [mode, setMode] = useState<Mode>(logoPreviewUrl ? "logo" : selectedPalette ? "palette" : "choose");
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setLogoFile(file, url);
    setIsExtracting(true);
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setExtractedColors(extractColorsFromImageData(imageData));
        setIsExtracting(false);
      };
      img.src = url;
    } catch { setIsExtracting(false); }
  }, [setLogoFile, setExtractedColors]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) { setMode("logo"); handleFileUpload(file); }
  }, [handleFileUpload]);

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16 }}>
        Brand colors
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 8 }}>
        How should we source your colors?
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 36, lineHeight: 1.6 }}>
        Upload a logo to extract colors, or choose from curated palettes.
      </div>

      <AnimatePresence mode="wait">
        {mode === "choose" && (
          <motion.div key="choose" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-2 gap-3" style={{ marginBottom: 32 }}>
            <button onClick={() => setMode("logo")} className="cursor-pointer transition-all duration-200 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(167,139,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" /><polyline points="17,8 12,3 7,8" strokeLinecap="round" strokeLinejoin="round" /><line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" /></svg>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>Upload Logo</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>Extract colors from your brand</div>
            </button>
            <button onClick={() => setMode("palette")} className="cursor-pointer transition-all duration-200 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(167,139,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" /><circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12a9.97 9.97 0 0 0 2.2 6.3l.8.7a2 2 0 0 0 2.8-.1l.1-.1a2 2 0 0 1 3.2.5A2 2 0 0 0 13 21h-1" /></svg>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>Choose Palette</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>Pick from curated families</div>
            </button>
          </motion.div>
        )}

        {mode === "logo" && (
          <motion.div key="logo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <button onClick={() => setMode("choose")} className="cursor-pointer transition-colors" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 16, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", fontFamily: "inherit" }}>
              ← Back to options
            </button>
            <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center cursor-pointer transition-all"
              style={{ border: isDragging ? "1px dashed rgba(167,139,250,0.6)" : "1px dashed rgba(255,255,255,0.12)", borderRadius: 12, padding: "48px 32px", background: isDragging ? "rgba(167,139,250,0.04)" : "transparent", marginBottom: 32 }}>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }} />
              {logoPreviewUrl ? (
                <div className="flex flex-col items-center gap-5">
                  <img src={logoPreviewUrl} alt="Logo" style={{ maxHeight: 80, maxWidth: 200, objectFit: "contain" }} />
                  {isExtracting ? (
                    <div className="flex items-center gap-2" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}><div className="h-4 w-4 animate-spin rounded-full" style={{ border: "2px solid #a78bfa", borderTopColor: "transparent" }} />Extracting...</div>
                  ) : extractedColors.length > 0 ? (
                    <div className="flex flex-col items-center gap-3">
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Extracted colors</div>
                      <div className="flex gap-2">{extractedColors.slice(0, 6).map((color, i) => (
                        <motion.div key={color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06 }} style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: color, border: "0.5px solid rgba(255,255,255,0.15)" }} title={color} />
                      ))}</div>
                    </div>
                  ) : null}
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>Click to replace</div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" /><polyline points="17,8 12,3 7,8" strokeLinecap="round" strokeLinejoin="round" /><line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" /></svg>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Drop your logo or click to browse</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>PNG, SVG, or JPG</div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {mode === "palette" && (
          <motion.div key="palette" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <button onClick={() => setMode("choose")} className="cursor-pointer transition-colors" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 16, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", fontFamily: "inherit" }}>
              ← Back to options
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginBottom: 32 }}>
              {curatedPalettes.map((palette) => (
                <motion.button key={palette.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedPalette(palette.id)}
                  className="cursor-pointer text-left transition-all duration-200 overflow-hidden"
                  style={{
                    background: selectedPalette === palette.id ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.04)",
                    border: selectedPalette === palette.id ? "0.5px solid rgba(167,139,250,0.6)" : "0.5px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}>
                  <div className="flex" style={{ height: 48 }}>{palette.colors.map((color, i) => (<div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />))}</div>
                  <div style={{ padding: "12px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: selectedPalette === palette.id ? "#fff" : "rgba(255,255,255,0.85)", marginBottom: 4 }}>{palette.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{palette.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
