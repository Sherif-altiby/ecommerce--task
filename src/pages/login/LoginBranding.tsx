import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useLang } from "../../store/hooks";

const LoginBranding = () => {
  const { isAr } = useLang();

  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-blue-900 via-blue-700 to-indigo-800 flex-col items-center justify-center p-12">

      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky-400/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

      {/* Floating cards */}
      <div className="float-1 absolute top-16 left-10 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-2xl">🎧</span>
        <div>
          <p className="text-white text-xs font-bold">Wireless Headphones</p>
          <p className="text-blue-200 text-xs">$129.99</p>
        </div>
      </div>

      <div className="float-2 absolute top-32 right-8 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-3">
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-400 text-sm">★★★★★</span>
          <span className="text-white text-xs font-semibold">4.9</span>
        </div>
        <p className="text-blue-200 text-xs mt-0.5">2,341 reviews</p>
      </div>

      <div className="float-3 absolute bottom-24 left-8 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-3 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
          <CheckCircle2 size={12} className="text-white" />
        </div>
        <p className="text-white text-xs font-semibold">Order Delivered!</p>
      </div>

      <div className="float-1 absolute bottom-40 right-6 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3">
        <p className="text-white text-xs font-bold">🛒 1M+ Products</p>
        <p className="text-blue-200 text-xs">Free Returns</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-xl">
            <ShoppingBag size={24} className="text-white" />
          </div>
          <span className="text-3xl font-extrabold text-white tracking-tight">
            Market<span className="text-blue-300">i</span>
          </span>
        </div>

        <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
          {isAr ? "كل ما تحتاجه" : "Everything"} <br />
          <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
            {isAr ? "في مكان واحد" : "in one place"}
          </span>
        </h2>

        <p className="text-blue-200 text-base max-w-xs mx-auto leading-relaxed">
          {isAr
            ? "انضم إلى ملايين المتسوقين واكتشف أفضل العروض"
            : "Join millions of shoppers and discover the best deals."}
        </p>

        <div className="flex justify-center gap-8 mt-10">
          {[
            { num: "1M+",  label: isAr ? "منتج"  : "Products" },
            { num: "50K+", label: isAr ? "بائع"  : "Sellers"  },
            { num: "4.8★", label: isAr ? "تقييم" : "Rating"   },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <span className="block text-2xl font-black text-white">{s.num}</span>
              <span className="block text-xs text-blue-300 mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginBranding;