import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../services/authApi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCredentials } from "../app/authSlice";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../utils/apiError";
import {
  getNavigationScreen,
  NAVIGATION_KEY,
  NAVIGATION_SCREENS,
} from "../utils/navigationScreens";
import type { ApiFailedResponse } from "../types/auth";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      const data = await login(values).unwrap();
      dispatch(
        setCredentials({
          user: data.userDetail,
          accessToken: data.accessToken,
        }),
      );
      toast.success(data.message);

      navigate(getNavigationScreen(data.nextStep));
    } catch (err: unknown) {
      console.log("Error=>err", err);
      const apiError = err as {
        status: number;
        data: ApiFailedResponse<any>;
      };
      if (
        apiError.status === 403 &&
        apiError.data.details?.nextStep === NAVIGATION_KEY.OTP_SCREEN
      ) {
        toast(apiError.data.message ?? "Please verify your email to continue.");
        navigate(getNavigationScreen(apiError.data.details.nextStep), {
          state: {
            email: apiError.data.details.email,
            expiresInSeconds: apiError.data.details.expiresInSeconds,
            resendAvailableInSeconds:
              apiError.data.details.resendAvailableInSeconds,
          },
          replace: true,
        });
        return;
      }

      const message = getApiErrorMessage(err);
      setServerError(message);
      toast.error(message);
    }
  };
  return (
    <AuthLayout
      heading="Shop from independent sellers, check out once."
      subtext="Track orders, save addresses and reorder favourites from one account."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[34px] font-semibold">
            Welcome back
          </h1>
          <p className="text-muted">Sign in to continue shopping.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <div className="flex flex-col gap-1">
            <TextField
              id="password"
              label="Password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              error={errors.password?.message}
            />
            <Link
              to={NAVIGATION_SCREENS.FORGOT_PASSWORD}
              className="self-end text-sm text-brand-dark"
            >
              Forgot password?
            </Link>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 accent-brand"
              {...register("remember")}
            />
            Keep me signed in
          </label>
          {serverError && (
            <p role="alert" className="text-sm text-red-600">
              {serverError}
            </p>
          )}
          <Button type="submit" disabled={isLoading || isSubmitting}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center gap-3 text-sm text-stone-500">
          <div className="h-px flex-1 bg-stone-200" /> or{" "}
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        <Button variant="outline" type="button">
          Continue with Google
        </Button>

        <p className="text-center text-muted">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-brand-dark">
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
