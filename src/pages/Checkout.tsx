import { Check } from "lucide-react";
import { CHECKOUT_STEPS } from "../types";
import { useLang } from "../store/hooks";
import { useCheckout } from "../hooks/Usecheckout";
import OrderSummary from "../components/checkout/Ordersummary";
import ShippingForm from "../components/checkout/Shippingform";
import OrderConfirm from "../components/checkout/OrderConfirm";
import PayMobDummy from "../components/checkout/PayMobDummy";


// ── Progress bar ──────────────────────────────────────────
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

// ── Main page ─────────────────────────────────────────────
const CheckoutPage = () => {
  const { isAr } = useLang();
  const {
    step, goTo,
    cartItems,
    subtotal, tax, total,
    shipping,
    defaultAddress,
    isProcessing,
    handleShippingSubmit,
    handlePlaceOrder,
    handlePaymentSuccess,
    handlePaymentFailure,
  } = useCheckout();

  const stepTitles: Record<string, { en: string; ar: string }> = {
    summary:  { en: "Your Cart",        ar: "سلة التسوق"   },
    shipping: { en: "Shipping Details", ar: "تفاصيل الشحن" },
    confirm:  { en: "Review Order",     ar: "مراجعة الطلب" },
    payment:  { en: "Secure Payment",   ar: "الدفع الآمن"  },
  };

  const renderStep = () => {
    switch (step) {

      case "summary":
        return (
          <OrderSummary
            items={cartItems}
            subtotal={subtotal}
            tax={tax}
            total={total}
            onNext={() => goTo("shipping")}
          />
        );

      case "shipping":
        return (
          <ShippingForm
            defaultValues={defaultAddress}
            onSubmit={handleShippingSubmit}
            onBack={() => goTo("summary")}
          />
        );

      case "confirm":
        if (!shipping) { goTo("shipping"); return null; }
        return (
          <OrderConfirm
            items={cartItems}
            shipping={shipping}
            subtotal={subtotal}
            tax={tax}
            total={total}
            isProcessing={isProcessing}
            onBack={() => goTo("shipping")}
            onPlaceOrder={handlePlaceOrder}
          />
        );

      case "payment":
        return (
          <PayMobDummy
            total={total}
            onSuccess={handlePaymentSuccess}
            onFailure={handlePaymentFailure}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900">
            {isAr ? stepTitles[step].ar : stepTitles[step].en}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isAr ? "تسوق آمن ومضمون مع Marketi" : "Safe & secure shopping with Marketi"}
          </p>
        </div>
        <StepBar current={step} />
        <div>{renderStep()}</div>
      </div>
    </div>
  );
};

export default CheckoutPage;