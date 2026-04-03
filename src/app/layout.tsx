import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { createClient } from "@/lib/supabaseServer";
import { AuthNav } from "@/components/AuthNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "I-Listing",
  description:
    "I-Listing connects sellers in China, Japan, UK and US with Kenyan buyers through a trusted cross-border marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 bg-background">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

async function SiteHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white font-semibold">
            IN
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900">
              I-Listing
            </span>
            <span className="text-xs text-slate-500">
              Global sellers · Kenyan buyers
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/catalog" className="hover:text-primary">
            Browse products
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/dashboard" className="hover:text-primary">
            Seller dashboard
          </Link>
          <Link href="/sellers" className="hover:text-primary">
            Sellers
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <AuthNav user={user} />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
        <p>
          © {new Date().getFullYear()} I-Listing. Connecting China,
          Japan, UK &amp; US sellers to Kenyan buyers.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/catalog" className="hover:text-primary">
            Browse catalog
          </Link>
          <Link href="/auth/login" className="hover:text-primary">
            Seller login
          </Link>
          <Link href="/legal/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/legal/terms" className="hover:text-primary">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

