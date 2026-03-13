import { useNavigation } from "../hooks/useNavigation";
import { useLang } from "../store/hooks";

const NotFound = () => {
  const { goTo } = useNavigation();
  const { isAr } = useLang();

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center overflow-hidden relative"
      style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes counterSpin {
          from { transform: translateX(-50%) rotate(0deg); }
          to   { transform: translateX(-50%) rotate(-360deg); }
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .nf-entrance { animation: fadeSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .nf-orbit-dot { animation: counterSpin 12s linear infinite; }
        .nf-btn {
          background: linear-gradient(135deg, #2563EB, #6366F1, #0EA5E9);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Glow orbs ── */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl animate-pulse [animation-delay:2s]" />

      {/* ── Floating dots ── */}
      <div className="absolute top-[15%] left-[10%]  w-2   h-2   bg-blue-400   rounded-full animate-bounce [animation-delay:0s]    opacity-50" />
      <div className="absolute top-[25%] left-[80%]  w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.5s]  opacity-50" />
      <div className="absolute top-[70%] left-[15%]  w-2.5 h-2.5 bg-sky-400    rounded-full animate-bounce [animation-delay:1s]    opacity-50" />
      <div className="absolute top-[80%] left-[75%]  w-1.5 h-1.5 bg-blue-300   rounded-full animate-bounce [animation-delay:1.5s]  opacity-50" />
      <div className="absolute top-[40%] left-[5%]   w-1   h-1   bg-indigo-300 rounded-full animate-bounce [animation-delay:0.8s]  opacity-50" />
      <div className="absolute top-[60%] left-[90%]  w-2   h-2   bg-sky-300    rounded-full animate-bounce [animation-delay:2s]    opacity-50" />
      <div className="absolute top-[10%] left-[55%]  w-1.5 h-1.5 bg-blue-400   rounded-full animate-bounce [animation-delay:1.2s]  opacity-50" />
      <div className="absolute top-[90%] left-[40%]  w-2   h-2   bg-indigo-400 rounded-full animate-bounce [animation-delay:0.3s]  opacity-50" />

      {/* ── Star pings ── */}
      {[
        ["top-[8%]",  "left-[20%]", "0s",    "2s"  ],
        ["top-[18%]", "left-[65%]", "0.4s",  "2.3s"],
        ["top-[35%]", "left-[88%]", "0.8s",  "2.6s"],
        ["top-[55%]", "left-[3%]",  "1.2s",  "1.9s"],
        ["top-[75%]", "left-[60%]", "1.6s",  "2.1s"],
        ["top-[88%]", "left-[25%]", "0.2s",  "2.4s"],
        ["top-[48%]", "left-[45%]", "0.6s",  "1.8s"],
        ["top-[22%]", "left-[38%]", "1s",    "2.2s"],
      ].map(([top, left, delay, duration], i) => (
        <div
          key={i}
          className={`absolute ${top} ${left} w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-30`}
          style={{ animationDelay: delay, animationDuration: duration }}
        />
      ))}

      {/* ── Main Content ── */}
      <div className="nf-entrance relative z-10 text-center px-6 max-w-md w-full">

        {/* 404 */}
        <div className="relative mb-1 select-none">
          <span
            className="block text-[clamp(6rem,22vw,10rem)] font-black leading-none tracking-tighter"
            style={{
              backgroundImage: "linear-gradient(135deg, #60A5FA 0%, #818CF8 45%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
          {/* Blur glow behind */}
          <span
            className="absolute inset-0 block text-[clamp(6rem,22vw,10rem)] font-black leading-none tracking-tighter text-blue-400 blur-2xl opacity-20 pointer-events-none animate-pulse select-none"
          >
            404
          </span>
        </div>

        {/* Orbit + Rocket */}
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28">
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30 animate-spin [animation-duration:12s]" />
            {/* Orbit dots (counter-spin via style) */}
            <div
              className="nf-orbit-dot absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_8px_#60A5FA]"
              style={{ top: "-6px", left: "50%", transform: "translateX(-50%)" }}
            />
            <div
              className="nf-orbit-dot absolute w-2 h-2 bg-indigo-400 rounded-full"
              style={{ bottom: "-4px", left: "50%", transform: "translateX(-50%)" }}
            />
            {/* Rocket center */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce [animation-duration:3s]">
              🚀
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
          {isAr ? "عذراً! الصفحة مفقودة" : "Oops! Page not found"}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm sm:text-[0.9375rem] leading-relaxed mb-8 max-w-xs mx-auto">
          {isAr
            ? "يبدو أن هذه الصفحة انطلقت إلى الفضاء. دعنا نعيدك إلى المسار الصحيح!"
            : "This page blasted off into the unknown. Let's get you back on track!"}
        </p>

        {/* Back to home button */}
        <button
          onClick={() => goTo('/')}
          className="nf-btn inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white font-bold text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 border-0 cursor-pointer"
          style={{ fontFamily: "inherit" }}
        >
          <span>🏠</span>
          {isAr ? "العودة للرئيسية" : "Back to Home"}
        </button>

        {/* Divider + error code */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-700" />
          <span className="text-xs text-slate-600 font-mono tracking-widest">
            ERROR · 404 · NOT FOUND
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-700" />
        </div>

      </div>
    </div>
  );
};

export default NotFound;