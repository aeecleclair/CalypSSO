"use client";

import { SuccessCard } from "@/components/custom/SuccessCard";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { HiOutlineBanknotes } from "react-icons/hi2";

const PaymentPageContent = () => {
  const searchParams = useSearchParams();
  const wantedRedirectUri = searchParams.get("url");

  const checkoutIntentId = searchParams.get("checkoutIntentId");
  const code = searchParams.get("code");
  const orderId = searchParams.get("orderId");
  const error = searchParams.get("error");

  const redirectUrl = new URL(wantedRedirectUri || "");
  if (checkoutIntentId !== null)
    redirectUrl.searchParams.set("checkoutIntentId", checkoutIntentId);
  if (code !== null) redirectUrl.searchParams.set("code", code);
  if (orderId !== null) redirectUrl.searchParams.set("orderId", orderId);
  if (error !== null) redirectUrl.searchParams.set("error", error);

  if (redirectUrl !== null) {
    redirect(`${redirectUrl}`);
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
