import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import * as zxcvbnFrPackage from "@zxcvbn-ts/language-fr";
import { z } from "zod";

const options = {
  translations: zxcvbnFrPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
    ...zxcvbnFrPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

export const zPassword = z
  .string({
    required_error: "Le mot de passe n'est pas assez fort",
  })
  .superRefine((value, ctx) => {
    const zxcvbnResult = zxcvbn(value || "");

    if (zxcvbnResult.score >= 4) {
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
