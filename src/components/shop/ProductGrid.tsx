import type { ShopProduct } from "@/content/siteContent";
import { ProductCard } from "@/components/shop/ProductCard";

type ProductGridProps = {
  products: ShopProduct[];
  getImageSrc: (product: ShopProduct) => string;
  imageAlt: string;
  addToBagLabel: string;
  onAddToBag: (product: ShopProduct) => void;
  className?: string;
};

export function ProductGrid({
  products,
  getImageSrc,
  imageAlt,
  addToBagLabel,
  onAddToBag,
  className,
}: ProductGridProps) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${className ?? ""}`.trim()}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          imageSrc={getImageSrc(product)}
          imageAlt={imageAlt}
          addToBagLabel={addToBagLabel}
          onAddToBag={onAddToBag}
        />
      ))}
    </div>
  );
}