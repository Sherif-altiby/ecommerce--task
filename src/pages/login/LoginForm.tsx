import { Link } from "react-router-dom";
import {
  Eye, EyeOff, Mail, Lock, ShoppingBag,
  ArrowRight, AlertCircle, CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { useLang } from "../../store/hooks";
import { useLogin } from "./useLogin";
import { DUMMY_USERS } from "./constants";

const LoginForm = () => {
  const { isAr }                                              = useLang();
  const [showPassword, setShowPassword]                       = useState(false);
  const { register, handleSubmit, errors, touchedFields,
          onSubmit, isLoading, authError, success }           = useLogin();

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center bg-blue-50 px-6 py-12">
      <div className="w-full max-w-md">

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-300">
            <ShoppingBag size={17} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-900">
            Market<span className="text-blue-600">i</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100 border border-blue-100 p-8">

          {/* Header */}
          <div className="fade-up-1 mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              {isAr ? "مرحباً بعودتك 👋" : "Welcome back 👋"}
            </h1>
            <p className="text-slate-400 text-sm">
              {isAr ? "سجّل دخولك للمتابعة" : "Sign in to your account to continue"}
            </p>
          </div>

          {/* Success */}
          {success && (
            <div className="fade-up mb-6 flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <p className="text-emerald-700 text-sm font-semibold">
                {isAr ? "تم تسجيل الدخول! جارٍ التحويل..." : "Logged in! Redirecting..."}
              </p>
            </div>
          )}

          {/* Auth Error */}
          {authError && (
            <div className="fade-up mb-6 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="text-red-600 text-sm font-semibold">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

            {/* Email */}
            <div className="fade-up-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {isAr ? "البريد الإلكتروني" : "Email address"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder={isAr ? "example@email.com" : "you@example.com"}
                  className={`input-field w-full ps-11 pe-4 py-3 rounded-xl border text-sm text-slate-800 bg-slate-50 outline-none placeholder:text-slate-300
                    ${errors.email
                      ? "border-red-300 bg-red-50 focus:border-red-400"
                      : touchedFields.email && !errors.email
                      ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400"
                      : "border-blue-100 focus:border-blue-400 focus:bg-white"
                    }`}
                  style={{ fontFamily: "inherit" }}
                />
                {touchedFields.email && !errors.email && (
                  <div className="absolute inset-y-0 end-0 pe-4 flex items-center">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="fade-up-3">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  {isAr ? "كلمة المرور" : "Password"}
                </label>
                <button type="button" className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input-field w-full ps-11 pe-11 py-3 rounded-xl border text-sm text-slate-800 bg-slate-50 outline-none placeholder:text-slate-300
                    ${errors.password
                      ? "border-red-300 bg-red-50 focus:border-red-400"
                      : touchedFields.password && !errors.password
                      ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400"
                      : "border-blue-100 focus:border-blue-400 focus:bg-white"
                    }`}
                  style={{ fontFamily: "inherit" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 pe-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="fade-up-4 pt-1">
              <button
                type="submit"
                disabled={isLoading || success}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold transition-all
                  ${isLoading || success
                    ? "bg-blue-400 cursor-not-allowed"
                    : "shimmer-btn hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300"
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    {isAr ? "جارٍ تسجيل الدخول..." : "Signing in..."}
                  </>
                ) : success ? (
                  <><CheckCircle2 size={16} /> {isAr ? "تم!" : "Done!"}</>
                ) : (
                  <>{isAr ? "تسجيل الدخول" : "Sign In"} <ArrowRight size={16} /></>
                )}
              </button>
            </div>

          </form>

          {/* Divider */}
          <div className="fade-up-4 flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-blue-100" />
            <span className="text-xs text-slate-400 font-medium">
              {isAr ? "أو استخدم الحساب التجريبي" : "or use demo account"}
            </span>
            <div className="flex-1 h-px bg-blue-100" />
          </div>

          {/* Demo accounts */}
          <div className="fade-up-5 grid grid-cols-2 gap-3">
            {DUMMY_USERS.map((user) => (
              <button
                key={user.email}
                type="button"
                className="flex flex-col items-start px-4 py-3 rounded-xl border border-blue-100 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 transition-all text-start"
              >
                <span className="text-xs font-bold text-slate-700">{user.name}</span>
                <span className="text-xs text-slate-400 truncate w-full">{user.email}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          {isAr ? "ليس لديك حساب؟ " : "Don't have an account? "}
          <Link to="/" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            {isAr ? "تصفح كضيف" : "Browse as guest"}
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;