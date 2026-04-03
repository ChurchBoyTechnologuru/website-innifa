import type { ReactNode } from "react";
import clsx from "clsx";

type Tone = "neutral" | "success";

interface AuthNoticeProps {
  children: ReactNode;
  tone?: Tone;
}

export function AuthNotice({ children, tone = "neutral" }: AuthNoticeProps) {
  return (
    <p
      role="alert"
      aria-live="polite"
      className={clsx(
        "rounded-xl border px-3 py-2.5 text-sm leading-snug",
        tone === "neutral" &&
          "border-slate-200 bg-slate-50 text-slate-800",
        tone === "success" &&
          "border-emerald-200 bg-emerald-50 text-emerald-900",
      )}
    >
      {children}
    </p>
  );
}
