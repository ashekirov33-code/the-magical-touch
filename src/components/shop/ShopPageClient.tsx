"use client";

import { Suspense, useMemo, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CustomOrderPanel } from "@/components/shop/CustomOrderPanel";
import { InquiryList } from "@/components/shop/InquiryList";
import { InquiryModal } from "@/components/shop/InquiryModal";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopCategoryTabs } from "@/components/shop/ShopCategoryTabs";
import { GlassCard } from "@/components/ui/GlassCard";
import { ToastViewport, useToast } from "@/components/ui/Toast";
import { siteContent, type ShopCategory, type ShopProduct } from "@/content/siteContent";

const SHOP_PRODUCT_IMAGES = [
  "/gallery/magic1%20(1).png",
  "/gallery/magic1%20(2).png",
  "/gallery/magic1%20(3).png",
  "/gallery/magic1%20(4).png",
  "/gallery/magic3.png",
  "/gallery/magic4.png",
] as const;

function getProductImage(product: ShopProduct, fallbackImage: string) {
  return SHOP_PRODUCT_IMAGES[product.imageIndexHint] ?? fallbackImage;
}

type InquiryState = {
  isOpen: boolean;
  categoryLabel: string;
  item: string;
};

export function ShopPageClient() {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(siteContent.shop.defaultCategoryKey);
  const [inquiryState, setInquiryState] = useState<InquiryState>({
    isOpen: false,
    categoryLabel: "",
    item: "",
  });

  const { toasts, showToast, dismissToast } = useToast();

  const currentCategory = useMemo(() => {
    return (
      siteContent.shop.categories.find((category) => category.key === selectedCategoryKey) ??
      siteContent.shop.categories.find((category) => category.key === siteContent.shop.defaultCategoryKey) ??
      siteContent.shop.categories[0]
    );
  }, [selectedCategoryKey]);

  const primaryFallbackImage = SHOP_PRODUCT_IMAGES[0] ?? siteContent.hero.fallbackPortraitSrc;

  if (!currentCategory) {
    return null;
  }

  const openInquiry = (category: ShopCategory, item: string) => {
    setInquiryState({
      isOpen: true,
      categoryLabel: category.label,
      item,
    });
  };

  const closeInquiry = () => {
    setInquiryState({ isOpen: false, categoryLabel: "", item: "" });
  };

  const currentProducts =
    currentCategory.key === "jewelry"
      ? siteContent.shop.jewelryProducts
      : currentCategory.key === "accessories"
        ? siteContent.shop.accessoriesProducts
        : [];

  const currentInquiryChoices =
    currentCategory.key === "orenda"
      ? siteContent.shop.orendaChoices
      : currentCategory.key === "grids"
        ? siteContent.shop.gridChoices
        : [];

  const onAddToBag = (product: ShopProduct) => {
    showToast(`${siteContent.shop.addToBagToastPrefix}: ${product.title}`);
  };

  return (
    <div className="space-y-8 md:space-y-10">
      <Reveal>
        <GlassCard className="rounded-3xl p-7 md:p-10">
          <h1 className="text-4xl font-semibold md:text-5xl">{siteContent.shop.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">{siteContent.shop.subtitle}</p>
        </GlassCard>
      </Reveal>

      <Reveal inView delay={0.05}>
        <GlassCard className="rounded-3xl p-4 md:p-5">
          <Suspense fallback={<div className="h-10" />}>
            <ShopCategoryTabs selectedKey={selectedCategoryKey} onCategoryChange={setSelectedCategoryKey} />
          </Suspense>
          <p className="mt-4 text-sm text-muted">{currentCategory.description}</p>
        </GlassCard>
      </Reveal>

      <Reveal inView delay={0.1}>
        <section id={`shop-panel-${currentCategory.key}`} role="tabpanel" aria-labelledby={`shop-tab-${currentCategory.key}`}>
          {currentCategory.mode === "products" && (
            <ProductGrid
              products={currentProducts}
              getImageSrc={(product) => getProductImage(product, primaryFallbackImage)}
              imageAlt={siteContent.hero.imageAlt}
              addToBagLabel={siteContent.shop.addToBagLabel}
              onAddToBag={onAddToBag}
            />
          )}

          {currentCategory.mode === "inquiry-list" && (
            <div className="space-y-4">
              <GlassCard className="rounded-2xl p-6">
                <h2 className="text-xl font-medium text-accent-strong">{siteContent.shop.inquiryPanelTitle}</h2>
                <p className="mt-2 text-sm text-muted">{siteContent.shop.inquiryPanelSubtitle}</p>
              </GlassCard>
              <InquiryList
                choices={currentInquiryChoices}
                requestLabel={siteContent.shop.requestLabel}
                onRequest={(item) => openInquiry(currentCategory, item)}
              />
            </div>
          )}

          {currentCategory.mode === "inquiry-custom" && (
            <CustomOrderPanel
              description={siteContent.shop.customPanelDescription}
              ctaLabel={siteContent.shop.requestCustomLabel}
              onRequest={() => openInquiry(currentCategory, siteContent.shop.customItemLabel)}
            />
          )}
        </section>
      </Reveal>

      <InquiryModal
        isOpen={inquiryState.isOpen}
        categoryLabel={inquiryState.categoryLabel}
        selectedItem={inquiryState.item}
        toEmail={siteContent.contact.email}
        labels={siteContent.shop.modal}
        onClose={closeInquiry}
      />

      <ToastViewport toasts={toasts} onDismiss={dismissToast} closeLabel={siteContent.shop.modal.closeLabel} />
    </div>
  );
}
