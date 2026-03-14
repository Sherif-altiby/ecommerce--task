import { STATUS_DOT, STATUS_STYLES } from "../../constants";
import { useLang } from "../../store/hooks";

interface StatusBadgeProps {
  status: string;
  statusAr: string;
  size?: "sm" | "md";
}

const StatusBadge = ({ status, statusAr, size = "md" }: StatusBadgeProps) => {
  const { isAr } = useLang();
  const style =
    STATUS_STYLES[status] ?? "bg-slate-50 text-slate-600 border-slate-200";
  const dot = STATUS_DOT[status] ?? "bg-slate-400";
  const textSz = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-bold ${textSz} ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      {isAr ? statusAr : status}
    </span>
  );
};

export default StatusBadge;
