import Link from "next/link";
import { ProductCard, type ProductSummary } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";

const featuredProducts: ProductSummary[] = [
  {
    id: "cn-1",
    name: "Smartphone accessories bundle – fast shipping from Shenzhen",
    price: 4500,
    currency: "KES",
    originCountry: "China",
    thumbnailUrl: "/images/demo/cn-accessories.jpg",
    deliveryEstimate: "10–14 days to Nairobi",
  },
  {
    id: "jp-1",
    name: "Japanese minimalist desk lamp – warm LED",
    price: 8800,
    currency: "KES",
    originCountry: "Japan",
    thumbnailUrl: "/images/demo/jp-lamp.jpg",
    deliveryEstimate: "14–18 days to Nairobi",
  },
  {
    id: "uk-1",
    name: "UK-certified refurbished laptop – 1 year warranty",
    price: 48500,
    currency: "KES",
    originCountry: "UK",
    thumbnailUrl: "/images/demo/uk-laptop.jpg",
    deliveryEstimate: "9–12 days to Nairobi",
  },
  {
    id: "us-1",
    name: "US sneaker drop – limited release shipped to Kenya",
    price: 16500,
    currency: "KES",
    originCountry: "US",
    thumbnailUrl: "/images/demo/us-sneakers.jpg",
    deliveryEstimate: "12–16 days to Nairobi",
  },
];

const categories = ["Electronics", "Fashion", "Home & Living", "Auto Parts"];

export default function Home() {
  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:px-6 md:py-16 lg:py-20">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Sell from China, Japan, UK &amp; US · Deliver to Kenya
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Sell internationally.
                <br />
                <span className="text-primary">Serve Kenyan buyers locally.</span>
              </h1>
              <p className="max-w-xl text-sm text-slate-600 sm:text-base">
                EastBridge Market connects your global storefront with verified
                Kenyan buyers. Clear pricing, import‑ready logistics and local
                support in Nairobi.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Start selling now
                </Button>
              </Link>
              <Link href="/auth/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Sign in
                </Button>
              </Link>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-xs text-slate-600 sm:grid-cols-4">
              <div>
                <dt className="font-semibold text-slate-900">10,000+</dt>
                <dd>Products available to Kenyan buyers</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">1M+</dt>
                <dd>Items shipped into East Africa</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">50+</dt>
                <dd>Trusted logistics &amp; payment partners</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">4.8/5</dt>
                <dd>Average rating from Kenyan buyers</dd>
              </div>
            </dl>
          </div>
          <div className="flex-1">
            <div className="mx-auto h-64 max-w-md rounded-3xl bg-white shadow-xl shadow-slate-200 md:h-72">
              {/* Placeholder card for hero visual */}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Why choose EastBridge
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 md:text-2xl">
              Everything you need to connect with Kenyan buyers.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-700 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Global reach</p>
              <p className="mt-1 text-xs">
                Reach buyers across Nairobi, Mombasa, Kisumu and more with one
                unified catalog.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-700 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Secure payments
              </p>
              <p className="mt-1 text-xs">
                Escrow‑style flows to protect both Kenyan buyers and
                international sellers.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-700 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Fast shipping
              </p>
              <p className="mt-1 text-xs">
                Optimized routes and vetted partners for predictable delivery
                into Kenya.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-700 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Trusted community
              </p>
              <p className="mt-1 text-xs">
                Ratings, reviews and support to build trust with Kenyan buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Shop by category
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 md:text-xl">
              Discover products tailored for Kenyan buyers.
            </h2>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm hover:border-primary hover:text-primary"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Featured products
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900 md:text-2xl">
                Handpicked for Kenyan buyers.
              </h2>
            </div>
            <Button variant="outline" size="sm">
              View all products
            </Button>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS / BENEFITS BAND */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 md:flex md:items-center md:justify-between md:px-6">
          <div className="max-w-xl space-y-3 text-sm text-slate-700">
            <h2 className="text-xl font-semibold text-slate-900">
              Everything you need to succeed with Kenyan buyers.
            </h2>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• Onboarding support from our Nairobi team.</li>
              <li>• Tools to localize pricing and delivery timelines.</li>
              <li>• Insights into demand across Kenyan cities.</li>
              <li>• Secure payouts in USD or local currency.</li>
            </ul>
            <Button size="md" className="mt-3">
              Get started free
            </Button>
          </div>
          <div className="mt-8 w-full max-w-sm rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-700 shadow-md md:mt-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Seller snapshot
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-900">
              Shenzhen Electronics Co.
            </h3>
            <p className="mt-1 text-xs">
              Increased monthly orders to Kenya by{" "}
              <span className="font-semibold text-primary">+38%</span> after
              joining EastBridge Market.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

