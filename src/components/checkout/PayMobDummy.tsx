import { useState } from "react";
import type { PayState } from "../../types";
import PaymentForm from "./Paymentform";
import PaymentSuccess from "./Paymentsuccess";
import PaymentFailure from "./Paymentfailure";

interface PayMobDummyProps {
  total: number;
  onSuccess: () => void | Promise<void>;
  onFailure: () => void;
}

const PayMobDummy = ({ total, onSuccess, onFailure }: PayMobDummyProps) => {
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [payState, setPayState] = useState<PayState>("idle");

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayState("processing");
    await new Promise((r) => setTimeout(r, 2000));

    const success = !card.number.replace(/\s/g, "").endsWith("0000");

    if (!success) {
      setPayState("failure");
      await new Promise((r) => setTimeout(r, 1500));
      onFailure();
      return;
    }

    setPayState("saving");
    await onSuccess();
    setPayState("success");
  };

  if (payState === "success" || payState === "saving")
    return <PaymentSuccess />;
  if (payState === "failure") return <PaymentFailure />;

  return (
    <PaymentForm
      total={total}
      card={card}
      payState={payState}
      onChange={setCard}
      onSubmit={handlePay}
    />
  );
};

export default PayMobDummy;
