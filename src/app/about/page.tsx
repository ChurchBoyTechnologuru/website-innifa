import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            About Innifa
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            We connect global sellers with Kenyan buyers through one trusted
            marketplace.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
            Innifa makes it simple for Kenyan buyers to source products from
            China, Japan, the United Kingdom and the United States. We combine
            cross‑border logistics, secure payments and local support so that
            both sides can trade confidently.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-600">
            <span>Based in Kenya with a global network of partners.</span>
            <span>·</span>
            <span>Focused on transparency, speed and reliability.</span>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-lg font-semibold text-slate-900">
                For Kenyan buyers
              </h2>
              <p>
                We help individuals and businesses in Kenya access reliable
                international inventory without worrying about hidden costs or
                unclear shipping routes. Every product listing aims to show
                transparent pricing, estimated duties and realistic delivery
                timelines.
              </p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Discover products curated for the Kenyan market.</li>
                <li>• Track orders from origin to your city.</li>
                <li>• Get help from a support team that understands Kenya.</li>
              </ul>
            </div>
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-lg font-semibold text-slate-900">
                For global sellers
              </h2>
              <p>
                We give exporters in China, Japan, the UK and the US a simple
                way to reach verified Kenyan buyers. Innifa handles localization
                of pricing and shipping expectations so you can focus on
                offering great products.
              </p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• One channel to reach buyers across Kenya.</li>
                <li>• Guidance on customs, documentation and duties.</li>
                <li>• Marketing tools and sponsored placements.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-10 md:flex md:items-center md:justify-between md:px-6 md:py-12">
          <div className="max-w-xl text-sm text-slate-700">
            <h2 className="text-lg font-semibold text-slate-900">
              Our mission
            </h2>
            <p className="mt-2">
              Innifa exists to make cross‑border commerce feel as simple as
              buying from a local shop. That means clear information, reliable
              delivery partners and support in the time zone where our buyers
              live.
            </p>
          </div>
          <div className="mt-6 flex gap-3 md:mt-0">
            <Link href="/catalog">
              <Button>Explore the catalog</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline">Become a seller</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

