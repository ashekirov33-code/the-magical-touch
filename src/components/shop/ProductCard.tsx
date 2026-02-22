import Image from "next/image";
import type { ShopProduct } from "@/content/siteContent";

type ProductCardProps = {
  product: ShopProduct;
  imageSrc: string;
  imageAlt: string;
  addToBagLabel: string;
  onAddToBag: (product: ShopProduct) => void;
  className?: string;
};

export function ProductCard({
  product,
  imageSrc,
  imageAlt,
  addToBagLabel,
  onAddToBag,
  className,
}: ProductCardProps) {
  return (
    <article className={`group glass-panel flex h-full flex-col overflow-hidden rounded-2xl ${className ?? ""}`.trim()}>
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
      </div>

      <div className="flex h-full flex-col gap-3 p-5">
        <h3 className="text-lg font-medium text-accent-strong">{product.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{product.energyNote}</p>
        <p className="text-xl font-semibold">{product.price}</p>

        <button
          type="button"
          onClick={() => onAddToBag(product)}
          className="cta-glow mt-auto rounded-full border border-accent bg-accent px-5 py-2 text-sm font-medium text-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
        >
          {addToBagLabel}
        </button>
      </div>
    </article>
  );
}