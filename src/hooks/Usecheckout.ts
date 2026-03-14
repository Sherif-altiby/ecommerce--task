import { useState, useMemo }          from "react";
import { useNavigate }                from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ROUTES, SHIPPING_COST, TAX_RATE, type CheckoutStep, type ShippingAddress } from "../types";
import { clearCart } from "../store/cartSclice";

export const useCheckout = () => {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);

  const [step, setStep]               = useState<CheckoutStep>("summary");
  const [shipping, setShipping]       = useState<ShippingAddress | null>(null);
  const [isProcessing, setProcessing] = useState(false);

  console.log("from use check out", cartItems)

  // Pre-fill shipping from saved user address
  const savedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") ?? "null");
    } catch {
      return null;
    }
  }, []);

  const defaultAddress: ShippingAddress = {
    fullName: savedUser?.name ?? "",
    phone:    savedUser?.phone ?? "",
    street:   savedUser?.address?.street ?? "",
    city:     savedUser?.address?.city ?? "",
    country:  savedUser?.address?.country ?? "Egypt",
    zip:      savedUser?.address?.zip ?? "",
  };

  // ── Totals ──────────────────────────────────────────────
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax      = subtotal * TAX_RATE;
  const total    = subtotal + tax + SHIPPING_COST;

  // ── Navigation helpers ──────────────────────────────────
  const goTo = (s: CheckoutStep) => setStep(s);

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShipping(data);
    setStep("confirm");
  };

  // ── Simulate PayMob integration ─────────────────────────
  const handlePlaceOrder = async () => {
    setProcessing(true);

    // Simulate API call to create PayMob order (1.5s delay)
    await new Promise((r) => setTimeout(r, 1500));

    // In real integration:
    // 1. POST /api/orders → get order_id
    // 2. POST to PayMob /auth → get auth_token
    // 3. POST to PayMob /ecommerce/orders → get paymob_order_id
    // 4. POST to PayMob /acceptance/payment_keys → get payment_key
    // 5. Redirect to: https://accept.paymob.com/api/acceptance/iframes/{iframe_id}?payment_token={payment_key}

    setProcessing(false);
    setStep("payment");
  };

  const handlePaymentSuccess = () => {
    dispatch(clearCart());
    navigate(ROUTES.ORDERS);
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