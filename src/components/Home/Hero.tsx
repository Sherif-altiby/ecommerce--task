// src/components/Home/Hero.tsx
import { useState }                      from "react";
import { Search, Sparkles, ArrowRight }  from "lucide-react";
import { useNavigate }                   from "react-router-dom";
import { useLang }                       from "../../store/hooks";
import { suggestions }                   from "../../constants";
import { ROUTES }                        from "../../types";

const Hero = () => {
  const { t, isAr }                           = useLang();
  const navigate                              = useNavigate();
  const [searchValue, setSearchValue]         = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    const q = searchValue.trim();
    if (!q) {
      navigate(ROUTES.PRODUCTS);
      return;
    }
    navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSuggestion = (value: string) => {
    setSearchValue(value);
    setShowSuggestions(false);
    navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(value)}`);
  };

  return (
    <section
      className="relative bg-slate-950"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
       
      {/* ── Background layers — clipped so they never cause x-scroll ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Scanline */}
        <div className="scanline" />

        {/* Glow orbs */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[80px]" />
        <div className="absolute top-10 -right-24 w-[320px] h-[320px] bg-blue-500/15 rounded-full blur-[72px]" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-28 bg-indigo-500/10 rounded-full blur-3xl" />

        {/* Floating emoji cards */}
        <div className="absolute top-16 xl:left-10 float-a opacity-60 hidden xl:flex items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-2xl shadow-xl">📱</div>
        </div>
        <div className="absolute top-28 right-10 float-b opacity-55 hidden xl:flex items-center justify-center">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg">👟</div>
        </div>
        <div className="absolute bottom-28 left-16 float-b opacity-45 hidden xl:flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-xl shadow-md">🎧</div>
        </div>
        <div className="absolute bottom-20 right-16 float-a opacity-45 hidden xl:flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-xl shadow-lg">💻</div>
        </div>

      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-24 sm:pb-28 text-center">

        {/* Badge */}
        <div className="hero-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-[.15em] mb-6">
          <span
            className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"
            style={{ animation: "pulseDot 2s ease-in-out infinite" }}
          />
          <Sparkles size={11} />
          {t("hero.badge")}
        </div>

        {/* Title */}
        <h1 className="hero-item hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.06] tracking-tight mb-5 break-words">
          {t("hero.title")}
        </h1>

        {/* Description */}
        <p className="hero-item text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10">
          {t("hero.description")}
        </p>

        {/* ── Search bar ── */}
        <div className="hero-item relative w-full">
          <div className="search-glow flex items-center bg-white/[.06] border border-white/[.12] backdrop-blur-md rounded-2xl px-3 sm:px-4 py-1.5 gap-2 sm:gap-3 transition-all duration-300">

            <Search size={16} className="text-slate-500 shrink-0" />

            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 160)}
              className="flex-1 min-w-0 py-2.5 bg-transparent outline-none text-sm text-white placeholder:text-slate-600"
              placeholder={t("hero.searchPlaceholder")}
              style={{ fontFamily: "inherit" }}
            />

            {/* Search button — text hidden on xs, shown from sm */}
            <button
              onClick={handleSearch}
              className="flex items-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold tracking-wide uppercase shrink-0 transition-all hover:shadow-lg hover:shadow-indigo-600/40 active:scale-95"
              style={{ fontFamily: "inherit" }}
            >
              <Search size={13} className="sm:hidden" />
              <span className="hidden sm:inline">{t("hero.searchBtn")}</span>
              <ArrowRight size={13} className={`hidden sm:inline ${isAr ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-3 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[.06]">
                <Search size={11} className="text-slate-600" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  {isAr ? "اقتراحات" : "Trending Searches"}
                </span>
              </div>
              {suggestions.map((s, i) => (
                <button
                  key={s.en}
                  onClick={() => handleSuggestion(isAr ? s.ar : s.en)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/[.05] hover:text-white transition-all text-start
                    ${i < suggestions.length - 1 ? "border-b border-white/[.04]" : ""}`}
                  style={{ fontFamily: "inherit" }}
                >
                  <Search size={12} className="text-slate-600 shrink-0" />
                  {isAr ? s.ar : s.en}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Trust line */}
        <p className="hero-item mt-5 text-xs text-slate-600 tracking-wide">
          {isAr
            ? "✓ شحن مجاني  ·  ✓ إرجاع سهل  ·  ✓ دفع آمن"
            : "✓ Free shipping  ·  ✓ Easy returns  ·  ✓ Secure checkout"}
        </p>
      </div>

      {/* ── Bottom wave transition to page bg ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-14 bg-blue-50"
        style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
      />
    </section>
  );
};

export default Hero;