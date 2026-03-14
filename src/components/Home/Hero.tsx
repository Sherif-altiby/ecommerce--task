import { useState } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import { useLang } from '../../store/hooks'
import { suggestions } from '../../constants'

const Hero = () => {
  const { t , isAr} = useLang()
  const [searchValue, setSearchValue]         = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <section className="relative bg-linear-to-br from-blue-900 via-blue-600 to-sky-400 pt-20 pb-20 text-center px-4">

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-400/25 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      {/* Wave bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-14 bg-blue-50"
        style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/25 text-white text-xs font-semibold uppercase tracking-widest mb-6">
          <TrendingUp size={11} />
          {t("hero.badge")}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-3">
          {t("hero.title")} <br />
          <span className="bg-linear-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
            {t("hero.subtitle")}
          </span>
        </h1>

        {/* Description */}
        <p className="text-white/60 text-base mb-10">
          {t("hero.description")}
        </p>

        {/* Search */}
        <div className="relative">
          <div className="flex items-center bg-white rounded-3xl px-5 py-1.5 gap-3 shadow-2xl border-2 border-transparent focus-within:border-blue-400 transition-all">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="flex-1 py-2.5 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-300"
              placeholder={t("searchPlaceholder")}
              style={{ fontFamily: "inherit" }}
            />
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-500 text-white text-sm font-bold shrink-0 hover:opacity-90 hover:shadow-lg hover:shadow-blue-300 transition-all">
              <Search size={14} />
              {t("hero.searchBtn")}
            </button>
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden z-50">
              {suggestions.map((s, i) => (
                <button
                  key={s.en}
                  onClick={() => setSearchValue(isAr ? s.ar : s.en)}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-start
                    ${i < suggestions.length - 1 ? "border-b border-blue-50" : ""}`}
                  style={{ fontFamily: "inherit" }}
                >
                  <Search size={13} className="text-slate-400 shrink-0" />
                  {isAr ? s.ar : s.en}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default Hero