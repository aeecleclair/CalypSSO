"use client";

import * as React from "react";
import { AskMail } from "@/components/recoverPassword/AskMail";
import { RecoverPassword } from "@/components/recoverPassword/RecoverPassword";

const RecoverPage = () => {
  const [showRecover, setShowRecover] = React.useState(true);
  return showRecover ? (
    <AskMail onCodeReceived={() => setShowRecover(false)} />
  ) : (
    <RecoverPassword onCodeNotReceived={
      () => setShowRecover(true)
    }/>
  );
};

export default RecoverPage;
