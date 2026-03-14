import { useState } from "react";
import { Shield, CreditCard, Lock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useLang } from "../../store/hooks";
import { formatCard, formatExpiry } from "../../utils/payMob";
import type { PayState } from "../../types";

interface PayMobDummyProps {
  total:     number;
  onSuccess: () => void;
  onFailure: () => void;
}  

const PayMobDummy = ({ total, onSuccess, onFailure }: PayMobDummyProps) => {
  const { isAr } = useLang();

  const [card,    setCard]    = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [payState, setPayState] = useState<PayState>("idle");


  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayState("processing");

    // Simulate 2s payment processing
    await new Promise((r) => setTimeout(r, 2000));

    // Use card number ending to simulate success/failure
    // Cards ending in 0000 fail, everything else succeeds
    const digits = card.number.replace(/\s/g, "");
    const success = !digits.endsWith("0000");

    setPayState(success ? "success" : "failure");

    await new Promise((r) => setTimeout(r, 1500));

    if (success) onSuccess();
    else onFailure();
  };

  // ── Success state ─────────────────────────────────────
  if (payState === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-black text-slate-800">
          {isAr ? "تمت عملية الدفع بنجاح! 🎉" : "Payment Successful! 🎉"}
        </h2>
        <p className="text-slate-400 text-sm">
          {isAr ? "جارٍ تحويلك إلى طلباتك..." : "Redirecting to your orders..."}
        </p>
      </div>
    );
  }

  // ── Failure state ─────────────────────────────────────
  if (payState === "failure") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle size={40} className="text-red-500" />
        </div>
        <h2 className="text-xl font-black text-slate-800">
          {isAr ? "فشلت عملية الدفع" : "Payment Failed"}
        </h2>
        <p className="text-slate-400 text-sm">
          {isAr ? "جارٍ العودة لتأكيد الطلب..." : "Returning to order confirmation..."}
        </p>
      </div>
    );
  }

  // ── Payment form ──────────────────────────────────────
  return (
    <div className="max-w-sm mx-auto">

      {/* PayMob header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <CreditCard size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-800">PayMob</p>
            <p className="text-[10px] text-slate-400">{isAr ? "بوابة دفع آمنة" : "Secure Payment Gateway"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <Lock size={11} />
          SSL
        </div>
      </div>

      {/* Amount */}
      <div className="text-center mb-6 py-4 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-xs text-slate-400 mb-1">{isAr ? "المبلغ المطلوب" : "Amount Due"}</p>
        <p className="text-3xl font-black text-blue-600">${total.toFixed(2)}</p>
      </div>

      {/* Test hint */}
      <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 font-medium">
        💡 {isAr
          ? "بيئة اختبار: استخدم 4242 4242 4242 4242 للنجاح، أو 4000 0000 0000 0000 للفشل"
          : "Test mode: Use 4242 4242 4242 4242 to succeed, or 4000 0000 0000 0000 to fail"}
      </div>

      {/* Card form */}
      <form onSubmit={handlePay} className="flex flex-col gap-4">

        {/* Card number */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1.5">
            {isAr ? "رقم البطاقة" : "Card Number"}
          </label>
          <div className="relative">
            <input
              value={card.number}
              onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              required
              className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-blue-50 focus:border-blue-400 focus:bg-white outline-none text-sm font-mono transition-all"
              style={{ fontFamily: "monospace" }}
            />
            <span className="absolute inset-e-3  top-1/2 -translate-y-1/2 text-slate-300 text-lg">
              {card.number.startsWith("5") ? "💳" : "💳"}
            </span>
          </div>
        </div>

        {/* Cardholder */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1.5">
            {isAr ? "اسم حامل البطاقة" : "Cardholder Name"}
          </label>
          <input
            value={card.name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
            placeholder={isAr ? "أحمد حسن" : "Ahmed Hassan"}
            required
            className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-blue-50 focus:border-blue-400 focus:bg-white outline-none text-sm transition-all"
            style={{ fontFamily: "inherit" }}
          />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1.5">
              {isAr ? "تاريخ الانتهاء" : "Expiry"}
            </label>
            <input
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
              placeholder="MM/YY"
              maxLength={5}
              required
              className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-blue-50 focus:border-blue-400 focus:bg-white outline-none text-sm font-mono transition-all"
              style={{ fontFamily: "monospace" }}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1.5">
              CVV
            </label>
            <input
              value={card.cvv}
              onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
              placeholder="123"
              maxLength={4}
              required
              className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-blue-50 focus:border-blue-400 focus:bg-white outline-none text-sm font-mono transition-all"
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
            <>
              <Loader2 size={16} className="animate-spin" />
              {isAr ? "جارٍ معالجة الدفع..." : "Processing payment..."}
            </>
          ) : (
            <>
              <Shield size={16} />
              {isAr ? `ادفع $${total.toFixed(2)} الآن` : `Pay $${total.toFixed(2)} Now`}
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-slate-400">
          {isAr
            ? "🔒 مدفوعاتك محمية بتشفير SSL من PayMob"
            : "🔒 Your payment is secured by PayMob SSL encryption"}
        </p>
      </form>
    </div>
  );
};

export default PayMobDummy;