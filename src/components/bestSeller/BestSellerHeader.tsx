import { ChevronRight, TrendingUp } from "lucide-react";
import { useLang } from "../../store/hooks";
import { useNavigation } from "../../hooks/useNavigation";


const BestSellerHeader = () => {
  const { t } = useLang();

  const { goTo } = useNavigation();

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
          <TrendingUp size={15} />
        </div>
     

        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t("home.shopBy")} <span className="text-blue-600">{t("home.bestSellers")}</span>
          </h2>
      </div>
      <button  className="flex items-center gap-1 text-xs font-semibold text-blue-600 border border-blue-100 bg-white rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-300 transition-all"
      onClick={() => goTo('/products')}>
        {t("seeAll")} <ChevronRight size={13} />
      </button>
    </div>
  );
};

export default BestSellerHeader;