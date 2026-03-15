import { CheckCircle, Loader2 } from "lucide-react";
import { useLang } from "../../store/hooks";

const PaymentSuccess = () => {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce">
        <CheckCircle size={40} className="text-emerald-500" />
      </div>
      <h2 className="text-xl font-black text-slate-800">
        {t("payment.successTitle")}
      </h2>
      <p className="text-slate-400 text-sm flex items-center gap-2">
        <Loader2 size={14} className="animate-spin" />
        {t("payment.successSubtitle")}
      </p>
    </div>
  );
};

export default PaymentSuccess;