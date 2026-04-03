import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/Badge";

export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  currency: string;
  originCountry: "China" | "Japan" | "UK" | "US";
  thumbnailUrl: string;
  deliveryEstimate: string;
}

const countryColors: Record<ProductSummary["originCountry"], string> = {
  China: "from-china",
  Japan: "from-japan",
  UK: "from-uk",
  US: "from-us",
};

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <Image
          src={product.thumbnailUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          <Badge variant="primary" className={countryColors[product.originCountry]}>
            {product.originCountry} seller
          </Badge>
          <Badge variant="accent">{product.deliveryEstimate}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 py-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-base font-semibold text-slate-900">
            {product.currency} {product.price.toLocaleString()}
          </p>
          <span className="text-xs text-slate-500">View details</span>
        </div>
      </div>
    </Link>
  );
}

