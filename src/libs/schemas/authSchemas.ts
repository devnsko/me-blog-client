import * as z from 'zod';

const passwordValidation = z.string()
  .min(8, { message: "Hasło musi mieć co najmniej 8 znaków." })
  .regex(/[a-zA-Z]/, { message: "Hasło musi zawierać co najmniej jedną literę." })
  .regex(/[0-9]/, { message: "Hasło musi zawierać co najmniej jedną cyfrę." });


const repeatPasswordValidation = z.string()
  .min(8, { message: "Potwierdzenie hasła jest wymagane." })
  .regex(/[a-zA-Z]/, { message: "Hasło musi zawierać co najmniej jedną literę." })
  .regex(/[0-9]/, { message: "Hasło musi zawierać co najmniej jedną cyfrę." });

export const signUpSchema = z.object({
    username: z.string().min(1, { message: "Nazwa użytkownika jest wymagana." }),
    email: z.string().email({ message: "Niepoprawny adres email." }),
    password: passwordValidation,
    repeatPassword: repeatPasswordValidation,
}).refine((data) => data.password === data.repeatPassword, {
  path: ["repeatPassword"],
  message: "Hasła nie są takie same.",
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    username: z.string().min(1, { message: "Email lub nazwa użytkownika jest wymagana." }),
    password: z.string().min(1, { message: "Hasło jest wymagane." }), // No complexity check on sign-in, just presence
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Niepoprawny adres email." }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: passwordValidation,
  // code: z.string().min(1, { message: "Kod jest wymagany." }), // Assuming code comes from URL, not form
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;