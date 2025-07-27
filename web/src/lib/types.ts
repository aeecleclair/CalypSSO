import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import * as zxcvbnFrPackage from "@zxcvbn-ts/language-fr";
import { z } from "zod/v4";

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
      error: (issue) => issue.input === undefined ? "Le mot de passe n'est pas assez fort" : undefined
})
  .superRefine((value, ctx) => {
    const zxcvbnResult = zxcvbn(value || "");

    if (zxcvbnResult.score >= 4) {
      return;
    }

    if (zxcvbnResult.feedback.warning) {
      ctx.issues.push({
                code: z.ZodIssueCode.custom,
                message: zxcvbnResult.feedback.warning,
                  input: ''
            });
    } else if (zxcvbnResult.feedback.suggestions.length) {
      ctx.issues.push({
                code: z.ZodIssueCode.custom,
                message: zxcvbnResult.feedback.suggestions[0],
                  input: ''
            });
    } else {
      ctx.issues.push({
                code: z.ZodIssueCode.custom,
                  error: "Le mot de passe n'est pas assez fort",
                  input: ''
            });
    }
  });
