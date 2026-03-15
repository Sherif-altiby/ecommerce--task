import { RefreshCw, ServerCrash, WifiOff } from "lucide-react";
import { useLang } from "../store/hooks";

interface ErrorStateProps {
  onRetry?:  () => void;
  type?:     "server" | "network" | "general";
  message?:  string;
}

const ERROR_CONFIG = {
  server: {
    icon:      <ServerCrash size={32} className="text-red-400" />,
    bg:        "from-red-50 to-orange-50",
    border:    "border-red-100",
    dot:       "bg-red-400",
    hint:      { en: "Make sure", ar: "تأكد من تشغيل" },
    hintCode:  "npm run server",
  },
  network: {
    icon:      <WifiOff size={32} className="text-amber-400" />,
    bg:        "from-amber-50 to-yellow-50",
    border:    "border-amber-100",
    dot:       "bg-amber-400",
    hint:      { en: "Check your internet connection", ar: "تحقق من اتصالك بالإنترنت" },
    hintCode:  null,
  },
  general: {
    icon:      <ServerCrash size={32} className="text-slate-400" />,
    bg:        "from-slate-50 to-blue-50",
    border:    "border-slate-100",
    dot:       "bg-slate-400",
    hint:      { en: "Please try again", ar: "يرجى المحاولة مرة أخرى" },
    hintCode:  null,
  },
};

const ErrorState = ({
  onRetry,
  type    = "server",
  message,
}: ErrorStateProps) => {
  const { isAr } = useLang();
  const cfg      = ERROR_CONFIG[type];

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center gap-6">

      {/* Icon card */}
      <div className="relative">
        <div className={`w-24 h-24 rounded-3xl bg-linear-to-br ${cfg.bg} border-2 ${cfg.border} flex items-center justify-center shadow-inner`}>
          {cfg.icon}
        </div>
        {/* Pulsing dot */}
        <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full ${cfg.dot} opacity-70 animate-ping`} />
        <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full ${cfg.dot} opacity-90`} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <p className="text-base font-extrabold text-slate-800">
          {message ?? (isAr ? "فشل تحميل البيانات" : "Failed to load data")}
        </p>

        <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
          {isAr ? cfg.hint.ar : cfg.hint.en}
          {cfg.hintCode && (
            <>
              <code className="bg-white border border-slate-200 px-2 py-0.5 rounded-lg text-blue-600 text-xs font-mono shadow-sm">
                {cfg.hintCode}
              </code>
              {" "}{isAr ? "يعمل" : "is running"}
            </>
          )}
        </p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 transition-all"
          style={{ fontFamily: "inherit" }}
        >
          <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
          {isAr ? "إعادة المحاولة" : "Try Again"}
        </button>
      )}
    </div>
  );
};

export default ErrorState;