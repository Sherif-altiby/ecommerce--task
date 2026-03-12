import { ChevronRight, Heart, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { useLang } from '../../store/hooks';
import { useState } from 'react';

const categories = [
  { id: 1, name: "Electronics", nameAr: "إلكترونيات" },
  { id: 2, name: "Fashion",     nameAr: "أزياء"       },
  { id: 3, name: "Home",        nameAr: "المنزل"      },
  { id: 4, name: "Sports",      nameAr: "رياضة"       },
  { id: 5, name: "Beauty",      nameAr: "جمال"        },
  { id: 6, name: "Books",       nameAr: "كتب"         },
];

const products = [
  { id: 1, name: "Wireless Headphones Pro", nameAr: "سماعات لاسلكية برو",  price: 129.99, rating: 4.8, reviews: 2341, category: "Electronics", image: "🎧", badge: "Hot"  },
  { id: 2, name: "Leather Jacket Classic",  nameAr: "جاكيت جلد كلاسيك",   price: 89.99,  rating: 4.6, reviews: 987,  category: "Fashion",     image: "🧥", badge: "Sale" },
  { id: 3, name: "Smart Coffee Maker",      nameAr: "ماكينة قهوة ذكية",    price: 59.99,  rating: 4.7, reviews: 1567, category: "Home",        image: "☕", badge: "New"  },
  { id: 4, name: "Running Shoes Elite",     nameAr: "حذاء ركض إيليت",      price: 99.99,  rating: 4.9, reviews: 3210, category: "Sports",      image: "👟", badge: "Hot"  },
  { id: 5, name: "Vitamin C Serum",         nameAr: "سيروم فيتامين سي",    price: 34.99,  rating: 4.5, reviews: 765,  category: "Beauty",      image: "🧴", badge: null   },
  { id: 6, name: "Design Thinking Book",    nameAr: "كتاب تفكير التصميم",  price: 24.99,  rating: 4.4, reviews: 432,  category: "Books",       image: "📖", badge: "New"  },
  { id: 7, name: "Mechanical Keyboard",     nameAr: "كيبورد ميكانيكي",     price: 149.99, rating: 4.8, reviews: 1890, category: "Electronics", image: "⌨️", badge: null   },
  { id: 8, name: "Yoga Mat Premium",        nameAr: "مات يوغا بريميوم",    price: 44.99,  rating: 4.6, reviews: 654,  category: "Sports",      image: "🧘", badge: "Sale" },
];

const badgeStyles: Record<string, string> = {
  Hot:  "bg-red-500",
  Sale: "bg-emerald-500",
  New:  "bg-violet-500",
};

// Stars Component 
const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={11}
        fill={i < Math.floor(rating) ? "#F59E0B" : "none"}
        stroke={i < Math.floor(rating) ? "#F59E0B" : "#CBD5E1"}
      />
    ))}
  </div>
);

const BestSeller = () => {
  const { isAr, t } = useLang();

  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist]             = useState<number[]>([]);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

      {/* ── Section Header ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <TrendingUp size={15} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t("bestSellers")}{" "}
            <span className="text-blue-600">{t("sellers")}</span>
          </h2>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 border border-blue-100 bg-white rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-300 transition-all">
          {t("seeAll")} <ChevronRight size={13} />
        </button>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...categories.map((c) => c.name)].map((cat) => {
          const isActive = activeCategory === cat;
          const label =
            cat === "All"
              ? t("all")
              : isAr
              ? categories.find((c) => c.name === cat)?.nameAr
              : cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all
                ${isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-300"
                  : "bg-white border-blue-100 text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                }`}
              style={{ fontFamily: "inherit" }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Products Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((p) => {
          const inWishlist = wishlist.includes(p.id);
          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-blue-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-100 hover:border-blue-300 transition-all duration-200 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-6xl">
                {p.badge && (
                  <span className={`absolute top-2.5 start-2.5 px-2.5 py-0.5 rounded-full text-white text-xs font-extrabold uppercase tracking-wide ${badgeStyles[p.badge]}`}>
                    {t(p.badge.toLowerCase())}
                  </span>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                  className={`absolute top-2.5 end-2.5 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-all hover:scale-110 border border-blue-50
                    ${inWishlist ? "text-red-500" : "text-slate-400"}`}
                >
                  <Heart size={14} fill={inWishlist ? "#EF4444" : "none"} />
                </button>
                {p.image}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">
                  {isAr ? categories.find((c) => c.name === p.category)?.nameAr : p.category}
                </p>
                <p className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                  {isAr ? p.nameAr : p.name}
                </p>
                <div className="flex items-center gap-1.5 mb-3">
                  <Stars rating={p.rating} />
                  <span className="text-xs text-slate-400">
                    {p.rating} ({p.reviews.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-blue-600">${p.price}</span>
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-300 transition-all"
                    style={{ fontFamily: "inherit" }}
                  >
                    <ShoppingCart size={12} />
                    {t("addToCart")}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;