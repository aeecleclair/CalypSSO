import { z } from "zod";

export const zPassword = z
  .string({
    required_error: "Veuillez renseigner un mot de passe",
  })
  .min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  })
  .refine(
    (value) => /^.*[A-Z].*$/.test(value),
    "Le mot de passe doit contenir au moins une majuscule",
  )
  .refine(
    (value) => /^.*[a-z].*$/.test(value),
    "Le mot de passe doit contenir au moins une minucule",
  )
  .refine(
    (value) => /^.*[0-9].*$/.test(value),
    "Le mot de passe doit contenir au moins un chiffre",
  )
  .refine(
    (value) => /^.*[!@#$%^&*(),.?":{}|<>\-_[\]+=;].*$/.test(value),
    'Le mot de passe doit contenir au moins un caractère spécial parmi les suivants [!@#$%^&*(),.?":{}|<>]-_',
  );
