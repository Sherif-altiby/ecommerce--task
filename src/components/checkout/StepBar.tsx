import { Check } from "lucide-react";
import { useLang } from "../../store/hooks";
import { CHECKOUT_STEPS } from "../../types";

const StepBar = ({ current }: { current: string }) => {
  const { isAr }   = useLang();
  const currentIdx = CHECKOUT_STEPS.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center justify-center mb-8">
      {CHECKOUT_STEPS.map((step, i) => {
        const done   = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all
                ${done   ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : ""}
                ${active ? "bg-blue-600   text-white shadow-md shadow-blue-200 scale-110" : ""}
                ${!done && !active ? "bg-slate-100 text-slate-400" : ""}
              `}>
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold hidden sm:block
                ${active ? "text-blue-600" : done ? "text-emerald-500" : "text-slate-400"}`}>
                {isAr ? step.labelAr : step.label}
              </span>
            </div>
            {i < CHECKOUT_STEPS.length - 1 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-1 mb-4 rounded-full transition-all
                ${i < currentIdx ? "bg-emerald-400" : "bg-slate-100"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepBar