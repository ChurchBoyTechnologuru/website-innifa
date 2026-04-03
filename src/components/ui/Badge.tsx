import type { ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant = "primary" | "accent" | "neutral" | "outline";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-soft text-primary border border-primary/10",
  accent: "bg-emerald-50 text-accent border border-emerald-100",
  neutral: "bg-slate-100 text-slate-700 border border-slate-200",
  outline: "border border-slate-300 text-slate-700",
};

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

