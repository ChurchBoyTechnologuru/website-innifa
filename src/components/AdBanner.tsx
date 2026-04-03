import Image from "next/image";

interface AdBannerProps {
  title: string;
  imageUrl: string;
  href?: string;
  label?: string;
}

export function AdBanner({ title, imageUrl, href, label }: AdBannerProps) {
  const content = (
    <div className="relative flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-sm">
      <div className="flex flex-1 flex-col gap-2 px-5 py-4">
        <span className="inline-flex w-fit rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-300">
          {label ?? "Sponsored"}
        </span>
        <p className="max-w-md text-sm font-semibold leading-snug md:text-base">
          {title}
        </p>
        <p className="text-xs text-slate-200/80">
          Ads are reviewed to keep Kenyan buyers safe and compliant with import
          regulations.
        </p>
      </div>
      <div className="relative hidden h-full min-h-[120px] w-40 overflow-hidden md:block">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

