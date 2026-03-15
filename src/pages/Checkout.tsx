import { useLang } from "../store/hooks";
import { useCheckout } from "../hooks/Usecheckout";
import OrderSummary from "../components/checkout/Ordersummary";
import ShippingForm from "../components/checkout/Shippingform";
import OrderConfirm from "../components/checkout/OrderConfirm";
import PayMobDummy from "../components/checkout/PayMobDummy";
import StepBar from "../components/checkout/StepBar";


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