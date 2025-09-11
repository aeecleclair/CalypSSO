"use client";

import { SuccessCard } from "@/components/custom/SuccessCard";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import { IconType } from "react-icons/lib";

export type Type = {
  message: string;
  icon: IconType;
};

const TypeMap: Record<string, Type> = {
  unknown: {
    message: "An unknown error occurred",
    icon: HiExclamation,
  },
  invalid_client_id: {
    message: "Invalid client_id",
    icon: HiExclamation,
  },
  mismatching_redirect_uri: {
    message: "Mismatching redirect_uri",
    icon: HiExclamation,
  },
  user_not_member_of_allowed_group: {
    message: "User is not member of an allowed group",
    icon: HiExclamation,
  },
  user_account_type_not_allowed: {
    message: "User account type is not allowed",
    icon: HiExclamation,
  },
  mypayment_structure_transfer_success: {
    message: "Structure transfer successful",
    icon: HiCheck,
  },
  mypayment_wallet_device_activation_success: {
    message: "Wallet device was successfully activated",
    icon: HiCheck,
  },
  mypayment_wallet_device_already_activated_or_revoked: {
    message: "Wallet device is already activated or revoked",
    icon: HiExclamation,
  },
  token_expired: {
    message: "The token has expired",
    icon: HiExclamation,
  },
  missing_query_param: {
    message: "Missing required query parameter in url",
    icon: HiExclamation,
  },
};

const SuccessPageContent = () => {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "unknown";

  const typeContent = type in TypeMap ? TypeMap[type] : TypeMap["unknown"];

  return (
    <SuccessCard
      title={typeContent.message}
      description={typeContent.message}
      icon={typeContent.icon({ className: "w-32 h-32 m-auto" })}
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
