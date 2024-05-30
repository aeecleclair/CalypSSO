import { BodyAuthorizeValidationAuthAuthorizationFlowAuthorizeValidationPost } from "@/api/hyperionSchemas";
import axios from "axios";
import { stringify } from "qs";
import { useState } from "react";


const backUrl: string =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://hyperion.myecl.fr";

export const useAuthenticate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function authenticate(
    params: BodyAuthorizeValidationAuthAuthorizationFlowAuthorizeValidationPost,
    callback: () => void,
  ): Promise<void> {
    setIsLoading(true);
    setIsError(false);
    const body = stringify(params);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    try {
      const result = await axios.post(`${backUrl}/auth/token`, body, {
        headers: headers,
      });
      if (result.status != 200) {
        setIsLoading(false);
        setIsError(true);
        return;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }

  return {
    authenticate,
    isLoading,
    isError,
  };
};