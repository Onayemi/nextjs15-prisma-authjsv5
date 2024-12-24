import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 character long",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Password must be at least 8 character long",
  }),
  // product_plan: z.string({
  //   message: "Choose product plan",
  // }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 character long",
  }),
});

export const ForgotSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 character long",
  }),
  confirm: z.string().min(8, {
    message: "Password must be at least 8 character long",
  }),
});
