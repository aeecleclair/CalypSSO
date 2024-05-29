import {
  usePostUsersRecover,
  usePostUsersResetPassword,
} from "../api/hyperionComponents";
import {
  BodyRecoverUserUsersRecoverPost,
  ResetPasswordRequest,
} from "../api/hyperionSchemas";

export const useRecoverPassword = () => {
  const { mutate: mutateRecoverPassword, isPending: isRecoverLoading } =
    usePostUsersRecover();

  const recoverPassword = (email: string, callback: () => void) => {
    const body: BodyRecoverUserUsersRecoverPost = {
      email: email,
    };
    mutateRecoverPassword(
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

  const { mutate: mutateResetPassword, isPending: isResetLoading } =
    usePostUsersResetPassword();

  const resetPassword = (
    password: string,
    code: string,
    callback: () => void,
  ) => {
    const body: ResetPasswordRequest = {
      new_password: password,
      reset_token: code,
    };
    mutateResetPassword(
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

  return { recoverPassword, isRecoverLoading, resetPassword, isResetLoading };
};
