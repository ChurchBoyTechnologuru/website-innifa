import { Badge } from "@/components/ui/Badge";
import { ProductCard, type ProductSummary } from "@/components/ProductCard";

interface SellerProfilePageProps {
  params: { id: string };
}

const demoSellerProducts: ProductSummary[] = [
  {
    id: "seller-demo-1",
    name: "Electronics bundle for Kenyan resellers",
    price: 38500,
    currency: "KES",
    originCountry: "China",
    thumbnailUrl: "/images/demo/cn-bundle.jpg",
    deliveryEstimate: "10–14 days",
  },
  {
    id: "seller-demo-2",
    name: "LED ring lights – Nairobi content creators",
    price: 6500,
    currency: "KES",
    originCountry: "China",
    thumbnailUrl: "/images/demo/cn-light.jpg",
    deliveryEstimate: "9–12 days",
  },
];

export default function SellerProfilePage({ params }: SellerProfilePageProps) {
  const { id } = params;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Badge variant="primary">Verified exporter</Badge>
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              Demo Shenzhen Trading Co.
            </h1>
            <p className="text-sm text-slate-600">
              Specialised in consumer electronics exports from Shenzhen to Kenya
              and East Africa. Experienced with customs, KRA requirements and
              last‑mile delivery partners.
            </p>
            <p className="text-xs text-slate-500">Seller ID: {id}</p>
            <div className="flex flex-wrap gap-3 text-xs text-slate-600">
              <span>Rating 4.7/5 from Kenyan buyers</span>
              <span>·</span>
              <span>1,200+ completed orders</span>
              <span>·</span>
              <span>Based in Shenzhen, China</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
            <p className="font-semibold text-slate-900">Service to Kenya</p>
            <p>Nairobi, Mombasa, Kisumu &amp; other major towns.</p>
            <p className="mt-1">
              Typical delivery: <span className="font-medium">10–14 days</span>.
            </p>
          </div>
        </header>

        <section className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Products for Kenyan buyers
              </h2>
            </div>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              {demoSellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <aside className="space-y-4 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Recent Kenyan reviews
              </h2>
              <ul className="mt-2 space-y-2 text-xs">
                <li>
                  <p className="font-medium text-slate-900">
                    “They understand Kenyan voltage and plug types very well.”
                  </p>
                  <p className="text-slate-500">Nairobi · Electronics reseller</p>
                </li>
                <li>
                  <p className="font-medium text-slate-900">
                    “Good communication on shipping delays.”
                  </p>
                  <p className="text-slate-500">Mombasa · Shop owner</p>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Export capabilities
              </h2>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Consolidated shipments to Nairobi</li>
                <li>• Experience with Kenyan customs</li>
                <li>• Can provide proforma invoices</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

