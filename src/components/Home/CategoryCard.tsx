import { iconMap } from '../../utils/iconMap';
import { Zap } from 'lucide-react';
import { useLang } from '../../store/hooks';
import type { Category } from '../../types';

interface CategoryCardProps {
  category:        Category;
  isActive:        boolean;
  onSelect:        (name: string) => void;
}

const CategoryCard = ({ category, isActive, onSelect }: CategoryCardProps) => {
  const { isAr, t } = useLang();
  const Icon        = iconMap[category.icon] ?? Zap;

  return (
    <button
      onClick={() => onSelect(category.name)}
      className={`rounded-2xl p-5 text-center transition-all duration-200 border cursor-pointer w-full
        ${isActive
          ? "bg-gradient-to-br from-blue-600 to-indigo-500 border-transparent shadow-lg shadow-blue-300 -translate-y-1"
          : "bg-white border-blue-100 hover:border-blue-400 hover:shadow-md hover:-translate-y-1"
        }`}
      style={{ fontFamily: "inherit" }}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all
        ${isActive ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"}`}
      >
        <Icon size={22} />
      </div>

      {/* Name */}
      <span className={`block text-sm font-bold mb-0.5
        ${isActive ? "text-white" : "text-slate-800"}`}
      >
        {isAr ? category.nameAr : category.name}
      </span>

      {/* Count */}
      <span className={`text-xs ${isActive ? "text-blue-100" : "text-slate-400"}`}>
        {category.productCount?.toLocaleString()} {t("items")}
      </span>
    </button>
  );
};

export default CategoryCard;