// src/pages/Catalog/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../../store/hooks";

interface PaginationProps {
  page:       number;
  totalPages: number;
  onPage:     (p: number) => void;
}

const Pagination = ({ page, totalPages, onPage }: PaginationProps) => {
  const { isAr } = useLang();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 rounded-xl border border-blue-100 bg-white flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {isAr ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`w-9 h-9 rounded-xl text-sm font-bold transition-all
            ${p === page
              ? "bg-blue-600 text-white shadow-md shadow-blue-300"
              : "border border-blue-100 bg-white text-slate-500 hover:border-blue-400 hover:text-blue-600"
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-xl border border-blue-100 bg-white flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {isAr ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
      </button>
    </div>
  );
};

export default Pagination;