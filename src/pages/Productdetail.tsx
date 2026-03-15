// src/pages/ProductDetail/ProductDetail.tsx
import { ArrowLeft }         from "lucide-react";
import { useLang }           from "../store/hooks";
import { useNavigation }     from "../hooks/useNavigation";
import { useProductDetail }  from "../hooks/Useproductdetail";
import ProductDetailSkeleton from "../skeletons/Productdetailskeleton";
import ImageGallery          from "../components/product/Imagegallery";
import ProductInfo           from "../components/product/Productinfo";
import ProductTabs           from "../components/product/Producttabs";
import ZoomModal             from "../components/product/ZoomModel";
import { ROUTES }            from "../types";
import ErrorState from "../errorState/ErrorState";

const ProductDetail = () => {
  const { isAr , t} = useLang();
  const { goTo } = useNavigation();

  const {
    product,
    isLoading,
    isError,
    activeImage, setActiveImage,
    zoomOpen, setZoomOpen,
    activeTab, setActiveTab,
    qty, increment, decrement,
  } = useProductDetail();

  if (isLoading) return (
    <div className="min-h-screen bg-blue-50">
      <ProductDetailSkeleton />
    </div>
  );

  if (isError || !product) return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <ErrorState
        type={isError ? "server" : "general"}
        message={ t("productDetail.notFound") }
        onRetry={() => goTo(ROUTES.PRODUCTS)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Back button */}
        <button
          onClick={() => goTo(ROUTES.PRODUCTS)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-all group"
          style={{ fontFamily: "inherit" }}
        >
          <ArrowLeft
            size={16}
            className={`transition-transform group-hover:-translate-x-1 ${isAr ? "rotate-180" : ""}`}
          />
          {t("common.backToCatalog")}
        </button>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ImageGallery
            images={product.images ?? [product.image]}
            activeIndex={activeImage}
            badge={product.badge}
            onSelect={setActiveImage}
            onZoom={() => setZoomOpen(true)}
          />
          <ProductInfo
            product={product}
            qty={qty}
            onInc={increment}
            onDec={decrement}
          />
        </div>

        <ProductTabs
          product={product}
          activeTab={activeTab}
          onTab={setActiveTab}
        />
      </div>

      {zoomOpen && (
        <ZoomModal
          images={product.images ?? [product.image]}
          activeIndex={activeImage}
          onClose={() => setZoomOpen(false)}
          onSelect={setActiveImage}
        />
      )}
    </div>
  );
};

export default ProductDetail;