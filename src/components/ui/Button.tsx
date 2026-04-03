import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "outline" | "ghost" | "success";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm md:text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-sm hover:bg-primary/90 disabled:bg-primary/60",
  outline:
    "border border-slate-300 text-slate-800 hover:border-primary/40 hover:text-primary bg-white disabled:bg-slate-50 disabled:text-slate-400",
  ghost:
    "text-slate-700 hover:bg-slate-100 disabled:text-slate-400 disabled:bg-transparent",
  success:
    "bg-accent text-white shadow-sm hover:bg-emerald-500 disabled:bg-emerald-400",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  leftIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {!loading && leftIcon}
      <span>{children}</span>
    </button>
  );
}

