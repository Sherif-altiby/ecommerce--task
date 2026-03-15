import { XCircle } from "lucide-react";
import { useLang } from "../../store/hooks";

const PaymentFailure = () => {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
        <XCircle size={40} className="text-red-500" />
      </div>
      <h2 className="text-xl font-black text-slate-800">
        {t("payment.failTitle")}
      </h2>
      <p className="text-slate-400 text-sm">
        {t("payment.failSubtitle")}
      </p>
    </div>
  );
};

export default PaymentFailure;