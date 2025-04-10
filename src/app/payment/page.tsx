"use client";

import { SuccessCard } from "@/components/custom/SuccessCard";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { HiOutlineBanknotes } from "react-icons/hi2";

const PaymentPageContent = () => {
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get("url");

  const checkoutIntentId = searchParams.get("checkoutIntentId");
  const code = searchParams.get("code");
  const orderId = searchParams.get("orderId");
  const error = searchParams.get("error");

  if (redirectUri !== null) {
    redirect(
      `${redirectUri}?checkoutIntentId=${checkoutIntentId}&code=${code}&orderId=${orderId}&error=${error}`,
    );
  }

  const description = error ? "Le paiement a réussi" : "Le paiement a échoué";

  return (
    <SuccessCard
      title="Paiement"
      description={description}
      icon={HiOutlineBanknotes}
    />
  );
};

const PaymentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
};

export default PaymentPage;
