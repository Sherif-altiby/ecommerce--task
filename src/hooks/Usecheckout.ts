import { useState, useMemo }              from "react";
import { useNavigate }                    from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ROUTES, SHIPPING_COST, TAX_RATE, type CartItem, type CheckoutStep, type Order, type ShippingAddress } from "../types";
import { clearCart } from "../store/cartSclice";
import { addOrder } from "../store/Ordersslice";


export const useCheckout = () => {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);

  const [step, setStep]               = useState<CheckoutStep>("summary");
  const [shipping, setShipping]       = useState<ShippingAddress | null>(null);
  const [isProcessing, setProcessing] = useState(false);

  const savedUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, []);

  const defaultAddress: ShippingAddress = {
    fullName: savedUser?.name             ?? "",
    phone:    savedUser?.phone            ?? "",
    street:   savedUser?.address?.street  ?? "",
    city:     savedUser?.address?.city    ?? "",
    country:  savedUser?.address?.country ?? "Egypt",
    zip:      savedUser?.address?.zip     ?? "",
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax      = subtotal * TAX_RATE;
  const total    = subtotal + tax + SHIPPING_COST;

  const goTo = (s: CheckoutStep) => setStep(s);

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShipping(data);
    setStep("confirm");
  };

  // ── Click "Confirm & Pay" → just go to payment step ──────
  const handlePlaceOrder = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setProcessing(false);
    setStep("payment");
  };

  // ── Build order object from current state ─────────────────
  const buildOrder = (items: CartItem[], addr: ShippingAddress | null): Order => {
    const now     = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const resolvedAddr = addr ?? {
      street:  savedUser?.address?.street  ?? "",
      city:    savedUser?.address?.city    ?? "",
      country: savedUser?.address?.country ?? "Egypt",
      zip:     savedUser?.address?.zip     ?? "",
    };

    return {
      id:              Date.now(),           // unique numeric id
      orderNumber:     `ORD-${Date.now()}`,
      userId:          savedUser?.id ?? 1,
      date:            dateStr,
      totalAmount:     parseFloat(total.toFixed(2)),
      status:          "Confirmed",
      statusAr:        "تم التأكيد",
      paymentMethod:   "PayMob",
      paymentMethodAr: "باي موب",
      paymentStatus:   "Paid",
      paymentStatusAr: "مدفوع",
      shippingAddress: {
        street:    resolvedAddr.street,
        streetAr:  resolvedAddr.street,
        city:      resolvedAddr.city,
        cityAr:    resolvedAddr.city,
        country:   resolvedAddr.country,
        countryAr: resolvedAddr.country,
        zip:       resolvedAddr.zip,
      },
      items: items.map((item) => ({
        productId: item.productId,
        name:      item.name,
        nameAr:    item.nameAr,
        price:     item.price,
        quantity:  item.quantity,
        image:     item.image,
      })),
      timeline: [
        { status: "Order Placed", statusAr: "تم تقديم الطلب", date: dateStr, time: timeStr, completed: true  },
        { status: "Confirmed",    statusAr: "تم التأكيد",      date: dateStr, time: timeStr, completed: true  },
        { status: "Shipped",          statusAr: "تم الشحن",        date: "", time: "", completed: false },
        { status: "Out for Delivery", statusAr: "في الطريق إليك",  date: "", time: "", completed: false },
        { status: "Delivered",        statusAr: "تم التسليم",       date: "", time: "", completed: false },
      ],
    };
  };

  // ── Payment success → dispatch to Redux → navigate ────────
  const handlePaymentSuccess = () => {
    const order = buildOrder([...cartItems], shipping);

    dispatch(addOrder(order));    // ← save to Redux + localStorage
    dispatch(clearCart());        // ← clear cart
    navigate(ROUTES.ORDERS);      // ← go to orders page
  };

  const handlePaymentFailure = () => {
    setStep("confirm");
  };

  return {
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
  };
};