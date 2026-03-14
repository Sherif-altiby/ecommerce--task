import { Check } from "lucide-react";
import { useLang } from "../store/hooks";
import { CHECKOUT_STEPS } from "../types";
import { useCheckout } from "../hooks/Usecheckout";
import OrderSummary from "../components/checkout/Ordersummary";
import ShippingForm from "../components/checkout/Shippingform";
import OrderConfirm from "../components/checkout/OrderConfirm";
import PayMobDummy from "../components/checkout/PayMobDummy";
import { stepTitles } from "../constants";


// ── Step progress bar ─────────────────────────────────────
const StepBar = ({ current }: { current: string }) => {
  const { isAr } = useLang();
  const currentIdx = CHECKOUT_STEPS.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {CHECKOUT_STEPS.map((step, i) => {
        const done   = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center">
            {/* Step dot */}
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all
                ${done   ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : ""}
                ${active ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-110" : ""}
                ${!done && !active ? "bg-slate-100 text-slate-400" : ""}
              `}>
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold hidden sm:block ${active ? "text-blue-600" : done ? "text-emerald-500" : "text-slate-400"}`}>
                {isAr ? step.labelAr : step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < CHECKOUT_STEPS.length - 1 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-1 mb-4 rounded-full transition-all ${i < currentIdx ? "bg-emerald-400" : "bg-slate-100"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

//   Main page  
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

  
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* ── Title ── */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900">
            {isAr ? stepTitles[step].ar : stepTitles[step].en}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isAr ? "تسوق آمن ومضمون مع Marketi" : "Safe & secure shopping with Marketi"}
          </p>
        </div>

        {/* ── Step bar ── */}
        <StepBar current={step} />

        {/* ── Step content ── */}
        <div className="bg-blue-50">
          {step === "summary" && (
            <OrderSummary
              items={cartItems}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onNext={() => goTo("shipping")}
            />
          )}

          {step === "shipping" && (
            <ShippingForm
              defaultValues={defaultAddress}
              onSubmit={handleShippingSubmit}
              onBack={() => goTo("summary")}
            />
          )}

          {step === "confirm" && shipping && (
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
          )}

          {step === "payment" && (
            <PayMobDummy
              total={total}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;