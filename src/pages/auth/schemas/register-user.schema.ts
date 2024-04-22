import { z } from "zod";

export const RegisterUserSchema = z.object({
  username: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio" }),
  email: z.string().min(1, { message: "El correo electrónico es obligatorio" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
  passwordConfirmation: z
    .string()
    .min(1, { message: "La confirmación de la contraseña es obligatoria" })
});
