import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { COUNTRY_CODES } from "../constants/countryCode";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupFormValues } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "../services/authApi";
import toast from "react-hot-toast";
import { getNavigationScreen } from "../utils/navigationScreens";
import { getPasswordStrength } from "../utils/commonFunctions";
import type { ApiFailedResponse } from "../types/auth";
import { useState } from "react";
export function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched", // validates a field when the user leaves it: good UX for signup
  });

  const password = watch("password");

  const strength = getPasswordStrength(password);

  const labels = [
    "Too short",
    "Weak",
    "Fair — add a number or symbol",
    "Good",
    "Strong",
  ];
  const colors = [
    "bg-stone-200",
    "bg-red-500",
    "bg-amber-500",
    "bg-lime-500",
    "bg-green-600",
  ];

  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async ({
    agreeTerms,
    mobileNumber,
    countryCode,
    ...rest
  }: SignupFormValues) => {
    setServerError(null);
    try {
      const apiResponse = await signup({
        ...rest,
        agreeTerms,
        mobileNumber,
        countryCode,
      }).unwrap();
      toast.success(apiResponse.message);
      navigate(getNavigationScreen(apiResponse.data.nextStep), {
        state: {
          email: apiResponse.data.email || "vishalchaudhary5736@gmail.com",
          expiresInSeconds: apiResponse.data.expiresInSeconds,
          resendAvailableInSeconds: apiResponse.data.resendAvailableInSeconds,
          replace: true,
        },
      });
    } catch (err) {
      const apiError = err as {
        status: number;
        data: ApiFailedResponse<any>;
      };
      toast.error(apiError.data.message);
      return;
    }
  };

  return (
    <AuthLayout
      heading="One account for every store on the marketplace."
      subtext="Create your account in under a minute. We will send a link to verify your email."
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[34px] font-semibold">
            Create your account
          </h1>
          <p className="text-muted">
            Already have one?{" "}
            <Link to="/login" className="font-semibold text-brand-dark">
              Sign in
            </Link>
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3.5"
        >
          <TextField
            id="firstName"
            label="First name"
            placeholder="John"
            autoComplete="give-name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />

          <TextField
            id="lastName"
            label="Last name"
            placeholder="Doe"
            autoComplete="family-name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />

          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="MobileNumber"
              className="text-sm font-sm font-medium"
            >
              Mobile number
            </label>
            <div className="flex gap-2">
              <select
                aria-label="Country code"
                className="h-12 w-28 rounded-lg border border-line bg-white px-2 outline-none focus:ring-2 focus:ring-brand/40"
                autoComplete="tel-country-code"
                {...register("countryCode")}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>

              <input
                id="mobileNumber"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="7973044217"
                className={`h-12 flex-1 rounded-lg border bg-white px-3.5 outline-none focus:ring-2 focus:ring-brand/40 `}
                {...register("mobileNumber")}
              />
            </div>
            {(errors.mobileNumber || errors.countryCode) && (
              <p className="text-sm text-red-600">
                {errors.countryCode?.message ?? errors.mobileNumber?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <div className="flex gap-1.5 pt-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-sm ${i < strength ? colors[strength] : "bg-stone-200"}`}
                />
              ))}
            </div>
            {password && (
              <span className="text-sm text-muted">{labels[strength]}</span>
            )}
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-brand"
              {...register("agreeTerms")}
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="text-brand-dark">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-brand-dark">
                Privacy Policy
              </Link>
            </span>
          </label>

          {errors.agreeTerms?.message && (
            <p className="text-sm text-red-600">{errors.agreeTerms.message}</p>
          )}

          {serverError && (
            <p role="alert" className="text-sm text-red-600">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={isLoading || isSubmitting}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <Button variant="outline" type="button">
          Sign up with Google
        </Button>
      </div>
    </AuthLayout>
  );
}
