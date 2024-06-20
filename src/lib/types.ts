import { z } from "zod";
import zxcvbn from "zxcvbn";

export const zPassword = z
  .string({
    required_error: "Le mot de passe n'est pas assez fort",
  })
  .superRefine((value, ctx) => {
    const zxcvbnResult = zxcvbn(value || "");

    if (zxcvbnResult.score >= 6) {
      return;
    }

    if (zxcvbnResult.feedback.warning) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: zxcvbnResult.feedback.warning,
      });
    } else if (zxcvbnResult.feedback.suggestions.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: zxcvbnResult.feedback.suggestions[0],
      });
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le mot de passe n'est pas assez fort",
      });
    }
  });
