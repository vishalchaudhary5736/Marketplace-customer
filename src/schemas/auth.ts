import z from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional(),
  countryCode: z.string().regex(/^\+[1-9]\d{0,2}$/, "Select a country code"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Digit only")
    .min(4, "Enter a valid mobile number")
    .max(15, "Enter a valid mobile number"),
  email: z.email("Enter a valid email").min(10, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Include at least one letter")
    .regex(/[0-9]/, "Include at least one number"),
  agreeTerms: z.boolean({ message: "Please accept the terms" }),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const emailSchema = z.object({
  email: z.email("Enter a valid email").min(10, "Email is required"),
});

export type EmailFormValues = z.infer<typeof emailSchema>;

export const resetPasswordSchema = z
  .object({
    otp: z.string().regex(/^\d{4}$/, "Enter the 4-digit code"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Za-z]/, "Include at least one letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
