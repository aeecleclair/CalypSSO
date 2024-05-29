import {
  usePostUsersCreate,
  usePostUsersActivate,
} from "../api/hyperionComponents";
import {
  CoreUserCreateRequest,
  CoreUserActivateRequest,
} from "../api/hyperionSchemas";

export const useAccountCreation = () => {

  const { mutate: mutateRegister, isPending: isRegisteringLoading } =
    usePostUsersCreate();

  const registerAccount = (email: string, callback: () => void) => {
    const body: CoreUserCreateRequest = {
      email: email,
      accept_external: true,
    };
    mutateRegister(
      {
        body: body,
      },
      {
        onSettled: () => {
          callback();
        },
      },
    );
  };

  const { mutate: mutateActivateAccount, isPending: isActivationLoading } =
    usePostUsersActivate();

  const activateAccount = (
    body: CoreUserActivateRequest,
    callback: () => void,
  ) => {
    mutateActivateAccount(
      {
        body: body,
      },
      {
        onSettled: () => {
          callback();
        },
      },
    );
  };

  return {
    registerAccount,
    isRegisteringLoading,
    activateAccount,
    isActivationLoading,
  };
};
