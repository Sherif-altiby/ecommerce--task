import { ArrowLeft } from "lucide-react";
import { useLang } from "../store/hooks";
import { useNavigation } from "../hooks/useNavigation";
import { useProductDetail } from "../hooks/Useproductdetail";
import ProductDetailSkeleton from "../skeletons/Productdetailskeleton";
import ImageGallery from "../components/product/Imagegallery";
import ProductInfo from "../components/product/Productinfo";
import ProductTabs from "../components/product/Producttabs";
import ZoomModal from "../components/product/ZoomModel";
import { ROUTES } from "../types";


const ProductDetail = () => {
  const { isAr } = useLang();
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

  // ── Loading ──────────────────────────────────────────
  if (isLoading) return (
    <div className="min-h-screen bg-blue-50">
      <ProductDetailSkeleton />
    </div>
  );

  // ── Error ────────────────────────────────────────────
  if (isError || !product) return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center gap-4 text-center px-4">
      <span className="text-6xl">⚠️</span>
      <p className="text-slate-700 font-bold text-lg">
        {isAr ? "المنتج غير موجود" : "Product not found"}
      </p>
      <button
        onClick={() => goTo('/products')}
        className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all"
        style={{ fontFamily: "inherit" }}
      >
        {isAr ? "تصفح المنتجات" : "Browse Products"}
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-blue-50"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Back button ── */}
        <button
          onClick={() => goTo(ROUTES.PRODUCTS)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-all group"
          style={{ fontFamily: "inherit" }}
        >
          <ArrowLeft
            size={16}
            className={`transition-transform group-hover:-translate-x-1 ${isAr ? "rotate-180" : ""}`}
          />
          {isAr ? "العودة للمتجر" : "Back to catalog"}
        </button>

        {/* ── Main 2-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — Image Gallery */}
          <ImageGallery
            images={product.images ?? [product.image]}
            activeIndex={activeImage}
            badge={product.badge}
            onSelect={setActiveImage}
            onZoom={() => setZoomOpen(true)}
          />

          {/* Right — Product Info */}
          <ProductInfo
            product={product}
            qty={qty}
            onInc={increment}
            onDec={decrement}
          />
        </div>

        {/* ── Tabs: Description / DataSheet / Video ── */}
        <ProductTabs
          product={product}
          activeTab={activeTab}
          onTab={setActiveTab}
        />
      </div>

      {/* ── Zoom Lightbox ── */}
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