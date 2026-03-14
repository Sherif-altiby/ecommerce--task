import { Check, Clock } from "lucide-react";
import type { TimelineStep } from "../../types";
import { useLang } from "../../store/hooks";


interface OrderTimelineProps {
  timeline: TimelineStep[];
}

const STEP_ICONS: Record<string, string> = {
  "Order Placed":     "🛒",
  "Confirmed":        "✅",
  "Shipped":          "📦",
  "Out for Delivery": "🚚",
  "Delivered":        "🏠",
};

const OrderTimeline = ({ timeline }: OrderTimelineProps) => {
  const { t, isAr } = useLang();

  // Find the last completed step index
  const lastCompleted = timeline.reduce(
    (last, step, i) => (step.completed ? i : last), -1
  );

  return (
    <div className="relative">
      {timeline.map((step, i) => {
        const isCompleted = step.completed;
        const isCurrent   = i === lastCompleted + 1 && !step.completed;
        const isPending   = !isCompleted && !isCurrent;
        const isLast      = i === timeline.length - 1;

        return (
          <div key={i} className="flex gap-4">

            {/* ── Left: icon + connector ── */}
            <div className="flex flex-col items-center">

              {/* Step icon */}
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all shrink-0
                ${isCompleted
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
                  : isCurrent
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 animate-pulse"
                    : "bg-white border-slate-200 text-slate-300"
                }`}
              >
                {isCompleted
                  ? <Check size={16} strokeWidth={3} />
                  : isCurrent
                    ? <Clock size={14} />
                    : <span>{STEP_ICONS[step.status] ?? "○"}</span>
                }
              </div>

              {/* Vertical connector */}
              {!isLast && (
                <div className={`w-0.5 flex-1 my-1 min-h-8 rounded-full transition-all
                  ${isCompleted ? "bg-emerald-300" : "bg-slate-100"}`}
                />
              )}
            </div>

            {/* ── Right: content ── */}
            <div className={`pb-6 flex-1 ${isLast ? "pb-0" : ""}`}>
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <p className={`text-sm font-bold leading-tight
                  ${isCompleted ? "text-slate-800"
                    : isCurrent  ? "text-blue-600"
                    : "text-slate-300"
                  }`}
                >
                  {isAr ? step.statusAr : step.status}
                </p>

                {/* Emoji icon on right */}
                <span className={`text-base transition-all ${isPending ? "grayscale opacity-30" : ""}`}>
                  {STEP_ICONS[step.status]}
                </span>
              </div>

              {/* Date + time */}
              {step.date ? (
                <p className="text-xs text-slate-400 font-medium">
                  {step.date} · {step.time}
                </p>
              ) : (
                <p className="text-xs text-slate-300 font-medium">
                  {t("orders.pendingUpdate")}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;