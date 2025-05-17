"use client";

import { SuccessCard } from "@/components/custom/SuccessCard";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { HiExclamation } from "react-icons/hi";

const SuccessPageContent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message") || "Une erreur est survenue";

  return (
    <SuccessCard
      title="Erreur"
      description={errorMessage}
      icon={HiExclamation}
    />
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
