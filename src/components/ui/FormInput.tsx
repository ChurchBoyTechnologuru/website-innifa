import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
}

export function FormInput({
  label,
  hint,
  error,
  leftIcon,
  className,
  id,
  ...props
}: FormInputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5 text-left">
      <label
        htmlFor={inputId}
        className="block text-xs font-medium uppercase tracking-wide text-slate-600"
      >
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={clsx(
            "block w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-xs outline-none ring-0 transition-all",
            "placeholder:text-slate-400",
            leftIcon ? "pl-9" : "",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10",
            className,
          )}
          {...props}
        />
      </div>
      {hint && !error && (
        <p className="text-xs text-slate-400">{hint}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

