import { Download, ExternalLink } from "lucide-react";
import { TABS, type Product, type TabKey } from "../../types";
import { useLang } from "../../store/hooks";


interface ProductTabsProps {
  product:   Product;
  activeTab: TabKey;
  onTab:     (key: TabKey) => void;
}

const ProductTabs = ({ product: p, activeTab, onTab }: ProductTabsProps) => {
  const { isAr } = useLang();

  // Filter out tabs that have no content
  const availableTabs = TABS.filter((tab) => {
    if (tab.key === "datasheet") return !!p.dataSheet;
    if (tab.key === "video")     return !!p.video;
    return true; // description always shown
  });

  return (
    <div className="mt-10">

      {/* ── Tab bar ── */}
      <div className="flex gap-1 p-1 bg-blue-50 rounded-xl border border-blue-100 w-fit">
        {availableTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all
              ${activeTab === tab.key
                ? "bg-white text-blue-600 shadow-sm border border-blue-100"
                : "text-slate-500 hover:text-slate-700"
              }`}
            style={{ fontFamily: "inherit" }}
          >
            <span>{tab.icon}</span>
            {isAr ? tab.labelAr : tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="mt-5 p-6 bg-white rounded-2xl border border-blue-100 min-h-[200px]">

        {/* Description */}
        {activeTab === "description" && (
          <div className="prose prose-sm max-w-none">
            <p className="text-slate-700 leading-relaxed text-base">
              {isAr ? p.descriptionAr : p.description}
            </p>

            {/* Tags */}
            {p.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Data Sheet */}
        {activeTab === "datasheet" && p.dataSheet && (
          <div className="flex flex-col items-center justify-center gap-5 py-8 text-center">
            <span className="text-6xl">📋</span>
            <div>
              <p className="font-bold text-slate-800 text-lg mb-1">
                {isAr ? "صحيفة البيانات التقنية" : "Technical Data Sheet"}
              </p>
              <p className="text-slate-400 text-sm">
                {isAr ? "قم بتنزيل ملف PDF للمواصفات الكاملة" : "Download the PDF for full specifications"}
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={p.dataSheet}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all"
              >
                <Download size={15} />
                {isAr ? "تنزيل PDF" : "Download PDF"}
              </a>
              <a
                href={p.dataSheet}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all"
              >
                <ExternalLink size={15} />
                {isAr ? "عرض" : "Preview"}
              </a>
            </div>
          </div>
        )}

        {/* Video */}
        {activeTab === "video" && p.video && (
          <div className="flex flex-col gap-4">
            <p className="font-bold text-slate-700 text-sm">
              {isAr ? "فيديو المنتج" : "Product Video"}
            </p>
            <div className="relative w-full rounded-xl overflow-hidden bg-slate-900" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={p.video}
                title="Product video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;