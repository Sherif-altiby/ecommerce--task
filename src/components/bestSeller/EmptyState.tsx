import { useLang } from "../../store/hooks";

interface EmptyStateProps {
  activeCategory: string;
  onReset?:       () => void;
}

const EmptyState = ({ activeCategory, onReset }: EmptyStateProps) => {
  const { isAr } = useLang();

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center gap-5">

      {/* Icon with floating dots */}
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-blue-50 to-indigo-100 border-2 border-blue-100 flex items-center justify-center text-5xl shadow-inner">
          🛍️
        </div>
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-200 animate-bounce [animation-delay:0s]" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full bg-indigo-200 animate-bounce [animation-delay:0.25s]" />
        <span className="absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-sky-300 animate-bounce [animation-delay:0.5s]" />
      </div>

      <div>
        <p className="text-base font-extrabold text-slate-800 mb-1.5">
          {isAr ? "لا يوجد منتجات في " : "No best sellers in "}
          <span className="text-blue-600">"{activeCategory}"</span>
        </p>
        <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
          {isAr
            ? "جرّب فئة مختلفة أو تحقق لاحقاً للوصول إلى المنتجات الجديدة."
            : "Try a different category or check back later for new arrivals."}
        </p>
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 transition-all"
          style={{ fontFamily: "inherit" }}
        >
          {isAr ? "عرض الكل" : "Show All"}
        </button>
      )}
    </div>
  );
};

export default EmptyState;