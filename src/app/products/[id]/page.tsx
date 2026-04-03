import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface ProductDetailProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const { id } = params;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <p className="text-xs text-slate-500">Product ID: {id}</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <section className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <Image
                src="/images/demo/detail-placeholder.jpg"
                alt="Product preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((thumb) => (
                <div
                  key={thumb}
                  className="aspect-square rounded-xl border border-slate-200 bg-slate-50"
                />
              ))}
            </div>
            <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Product description
                </h2>
                <p className="mt-1">
                  Detailed description of the product including materials,
                  compatibility, and what is included in the box. For example:
                  accessories bundle, power cables, user manuals, and Kenyan
                  plug adapters where relevant.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Specifications
                </h2>
                <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                  <div>
                    <dt className="text-slate-500">Origin</dt>
                    <dd className="font-medium text-slate-900">
                      Shenzhen, China
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Estimated delivery</dt>
                    <dd className="font-medium text-slate-900">
                      10–14 days to Nairobi
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Warranty</dt>
                    <dd className="font-medium text-slate-900">
                      6 months (via seller)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Return policy</dt>
                    <dd className="font-medium text-slate-900">
                      7 days on defective items
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          </section>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-base font-semibold text-slate-900 md:text-lg">
                  Demo product name from global seller
                </h1>
                <Badge variant="primary">China seller</Badge>
              </div>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                KES 45,500
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Includes estimated import duties and last-mile delivery to
                Nairobi.
              </p>
              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Delivery window</span>
                  <span className="font-medium text-slate-900">
                    10–14 business days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ships from</span>
                  <span className="font-medium text-slate-900">
                    Shenzhen, China
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <Button className="w-full">Add to cart</Button>
                <Button variant="outline" className="w-full">
                  Chat with seller
                </Button>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                Payments are held in escrow and released to the seller when your
                order passes inspection in Kenya.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Seller information
              </h2>
              <p className="mt-1 text-slate-700">
                Demo Shenzhen Trading Co. · Rating 4.7/5 from Kenyan buyers.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                <li>• Ships to Nairobi, Mombasa, Kisumu and more</li>
                <li>• Experience exporting to East Africa</li>
                <li>• Offers after-sales support by email</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Recent Kenyan reviews
              </h2>
              <div className="mt-2 space-y-3 text-xs text-slate-700">
                <div>
                  <p className="font-medium text-slate-900">
                    “Arrived in 12 days, well packed.”
                  </p>
                  <p className="text-slate-500">Nairobi · Verified buyer</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    “Seller helped me pick the right voltage adapter.”
                  </p>
                  <p className="text-slate-500">Mombasa · Repeat buyer</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

