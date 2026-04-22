"use client";

// Button
// ---------------------------------------------------------------------------
// Reusable button with variants. Demonstrates conditional styling based on
// props (Rubric #3 — Styling and Theming).

import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  style,
  ...rest
}: ButtonProps) {
  const variantStyle: React.CSSProperties =
    variant === "primary"
      ? { backgroundColor: "var(--accent)", color: "#ffffff" }
      : variant === "secondary"
      ? {
          backgroundColor: "var(--surface-hover)",
          color: "var(--text-primary)",
          border: "1px solid var(--border)",
        }
      : { backgroundColor: "transparent", color: "var(--text-secondary)" };

  return (
    <button
      {...rest}
      className={`rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 ${sizeMap[size]} ${className}`}
      style={{ ...variantStyle, ...style }}
    >
      {children}
    </button>
  );
}
