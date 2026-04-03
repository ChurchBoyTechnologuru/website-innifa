"use client";

import { useState } from "react";
import { ProductCard, type ProductSummary } from "@/components/ProductCard";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

const demoProducts: ProductSummary[] = [
  {
    id: "cn-2",
    name: "Wholesale smartphone cases (50 pcs) – Shenzhen",
    price: 19500,
    currency: "KES",
    originCountry: "China",
    thumbnailUrl: "/images/demo/cn-cases.jpg",
    deliveryEstimate: "10–14 days",
  },
  {
    id: "jp-2",
    name: "Japanese ergonomic office chair – Osaka",
    price: 32500,
    currency: "KES",
    originCountry: "Japan",
    thumbnailUrl: "/images/demo/jp-chair.jpg",
    deliveryEstimate: "18–22 days",
  },
  {
    id: "uk-2",
    name: "UK refurbished iPhone – Grade A",
    price: 54500,
    currency: "KES",
    originCountry: "UK",
    thumbnailUrl: "/images/demo/uk-iphone.jpg",
    deliveryEstimate: "9–12 days",
  },
  {
    id: "us-2",
    name: "US gaming console bundle",
    price: 82500,
    currency: "KES",
    originCountry: "US",
    thumbnailUrl: "/images/demo/us-console.jpg",
    deliveryEstimate: "14–18 days",
  },
];

export default function CatalogPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              Product catalog
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Filter by origin country, category and delivery time to Kenya.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                window.location.href = "/dashboard/products/new";
              }}
            >
              Start Selling
            </Button>
            <div className="mx-2 h-6 w-px bg-slate-200" />
            <Button
              variant={view === "grid" ? "primary" : "outline"}
              size="sm"
              onClick={() => setView("grid")}
            >
              Grid view
            </Button>
            <Button
              variant={view === "list" ? "primary" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              List view
            </Button>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Filters
            </h2>
            <FormInput
              label="Search"
              placeholder="Search product name"
              type="search"
            />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Origin country
              </p>
              <div className="space-y-1.5">
                {["China", "Japan", "UK", "US"].map((country) => (
                  <label
                    key={country}
                    className="flex cursor-pointer items-center gap-2 text-xs text-slate-700"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/60"
                    />
                    {country}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Delivery to Kenya
              </p>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40">
                <option>Any time</option>
                <option>{"≤ 10 days"}</option>
                <option>10–14 days</option>
                <option>15–21 days</option>
              </select>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sort by
              </p>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40">
                <option>Relevance</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
                <option>Fastest delivery</option>
              </select>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Clear filters
            </Button>
          </aside>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{demoProducts.length} products (demo data)</span>
              <span>Prices shown in Kenyan Shillings (KES)</span>
            </div>

            {view === "grid" ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {demoProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {demoProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-slate-200 bg-white p-3"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

