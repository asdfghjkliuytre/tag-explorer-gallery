
import React from "react";

/**
 * StyleGuide
 * This file contains a reference for core design tokens and component styles.
 * Developers: Refer here for standardized classes for premium, modern, and theme-consistent UI.
 */

export const colors = {
  primary: "var(--primary)",
  foreground: "var(--foreground)",
  card: "var(--card)",
  background: "var(--background)",
  accent: "var(--accent)",
  warning: "#FFB800",
  danger: "#F44336",
  success: "#36CC72",
  info: "#2CAAFA",
};

export const shadows = {
  card: "0 4px 28px 0 rgba(41,54,99,0.12), 0 1.5px 12px 0 rgba(49,53,110,0.08)",
  pop: "0 8px 32px 0 rgba(42,56,100,0.24)",
};

export const fontFamilies = {
  display: "Inter, system-ui, 'Segoe UI', Arial, sans-serif",
  mono: "'Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace"
};

export const layout = {
  borderRadius: "1.2rem",
  sectionGap: "2.5rem",
  cardPadding: "2rem",
  navHeight: "4rem"
};

export default function StyleGuide() {
  return (
    <div className="max-w-4xl mx-auto p-10 space-y-8 font-sans text-foreground bg-background">
      <h1 className="font-black text-3xl mb-2 tracking-tight">Style Guide</h1>
      <section>
        <h2 className="font-bold text-xl">Colors</h2>
        <div className="grid grid-cols-3 gap-6 mt-2">
          {Object.entries(colors).map(([name, value]) => (
            <div key={name} className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border" style={{ background: value }}></span>
              <span className="capitalize">{name}</span>
              <code className="text-xs text-muted-foreground">{value}</code>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-bold text-xl mt-8">Text</h2>
        <p className="text-3xl font-bold">Display Large</p>
        <p className="text-xl font-semibold mt-2">Heading Medium</p>
        <p className="text-base mt-2">Base text</p>
        <div className="mt-2 text-sm text-muted-foreground">Muted</div>
        <p className="font-mono mt-2">Mono text example</p>
      </section>
    </div>
  );
}
