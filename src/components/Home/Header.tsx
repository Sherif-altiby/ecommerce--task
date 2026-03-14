import { Globe, ShoppingBag, ShoppingCart, User } from 'lucide-react'
import { useLang } from "../../store/hooks"
import { setLanguage } from '../../store/languageSlice'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../types'

const Header = () => {
  const { isAr, t, dispatch } = useLang()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2.5 w-fit group">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-300">
            <ShoppingBag size={17} className="text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Market<span className="text-blue-600">i</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">

          {/* Language Switcher */}
          <button
            onClick={() => dispatch(setLanguage(isAr ? "en" : "ar"))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-100 bg-white text-slate-500 text-xs font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <Globe size={13} />
            {isAr ? "EN" : "عربي"}
          </button>

          {/* Cart */}
          <Link to={"/checkout"}
            title={t("cart", "السلة")}
            className="w-9 h-9 rounded-lg border border-blue-100 bg-white flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <ShoppingCart size={15} />
          </Link>

          {/* Sign In */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300">
            <User size={13} />
            <span className="hidden sm:inline">{t("nav.signIn")}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header