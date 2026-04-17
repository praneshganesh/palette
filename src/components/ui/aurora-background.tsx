"use client";

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1 -top-[300px] -left-[300px]" />
      <div className="aurora-blob aurora-blob-2 top-[20%] -right-[250px]" />
      <div className="aurora-blob aurora-blob-3 -bottom-[200px] left-[25%]" />
    </div>
  );
}
