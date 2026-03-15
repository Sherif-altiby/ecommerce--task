import { Shield, CreditCard, Lock, Loader2 } from "lucide-react";
import type { PayState } from "../../types";
import { useLang } from "../../store/hooks";
 import { formatCard, formatExpiry } from "../../utils/Cardformatters";


interface CardState {
  number: string;
  expiry: string;
  cvv:    string;
  name:   string;
}

interface PaymentFormProps {
  total:    number;
  card:     CardState;
  payState: PayState;
  onChange: (card: CardState) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PaymentForm = ({ total, card, payState, onChange, onSubmit }: PaymentFormProps) => {
  const { t, isAr } = useLang();

  const inputClass = "w-full px-4 py-3 rounded-xl border border-blue-100 bg-blue-50 focus:border-blue-400 focus:bg-white outline-none text-sm transition-all";
  const labelClass = "text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1.5";

  return (
    <div className="max-w-sm mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <CreditCard size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-800">PayMob</p>
            <p className="text-[10px] text-slate-400">{t("payment.gateway")}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <Lock size={11} /> SSL
        </div>
      </div>

      {/* ── Amount ── */}
      <div className="text-center mb-6 py-4 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-xs text-slate-400 mb-1">{t("payment.amountDue")}</p>
        <p className="text-3xl font-black text-blue-600">${total.toFixed(2)}</p>
      </div>

      {/* ── Test hint ── */}
      <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 font-medium">
        💡 {t("payment.testHint")}
      </div>

      {/* ── Form ── */}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">

        {/* Card number */}
        <div>
          <label className={labelClass}>{t("payment.cardNumber")}</label>
          <input
            value={card.number}
            onChange={(e) => onChange({ ...card, number: formatCard(e.target.value) })}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            required
            className={`${inputClass} font-mono`}
            style={{ fontFamily: "monospace" }}
          />
        </div>

        {/* Cardholder */}
        <div>
          <label className={labelClass}>{t("payment.cardHolder")}</label>
          <input
            value={card.name}
            onChange={(e) => onChange({ ...card, name: e.target.value })}
            placeholder={t("payment.cardHolderPlaceholder")}
            required
            className={inputClass}
            style={{ fontFamily: "inherit" }}
          />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>{t("payment.expiry")}</label>
            <input
              value={card.expiry}
              onChange={(e) => onChange({ ...card, expiry: formatExpiry(e.target.value) })}
              placeholder="MM/YY"
              maxLength={5}
              required
              className={`${inputClass} font-mono`}
              style={{ fontFamily: "monospace" }}
            />
          </div>
          <div>
            <label className={labelClass}>CVV</label>
            <input
              value={card.cvv}
              onChange={(e) => onChange({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
              placeholder="123"
              maxLength={4}
              required
              className={`${inputClass} font-mono`}
              style={{ fontFamily: "monospace" }}
            />
          </div>
        </div>

        {/* Pay button */}
        <button
          type="submit"
          disabled={payState === "processing"}
          className="w-full flex items-center justify-center gap-2.5 py-4 mt-2 rounded-2xl bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 transition-all disabled:opacity-70"
          style={{ fontFamily: "inherit" }}
        >
          {payState === "processing" ? (
            <><Loader2 size={16} className="animate-spin" />{t("payment.processing")}</>
          ) : (
            <><Shield size={16} />{isAr ? `ادفع $${total.toFixed(2)} الآن` : `Pay $${total.toFixed(2)} Now`}</>
          )}
        </button>

        <p className="text-center text-[10px] text-slate-400">
          {t("payment.secureNote")}
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;