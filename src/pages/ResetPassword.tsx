import { useRef, useState } from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import {
  useResendOtpMutation,
  useResetPasswordMutation,
} from "../services/authApi";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../utils/apiError";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/auth";
import {
  getNavigationScreen,
  NAVIGATION_KEY,
  NAVIGATION_SCREENS,
} from "../utils/navigationScreens";
import { ResendTimer } from "../components/ResendTimer";
import { getPasswordStrength } from "../utils/commonFunctions";
export function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, resendAvailableInSeconds } = (location.state || {}) as {
    email: string;
    expiresInSeconds: number;
    resendAvailableInSeconds: number;
  };
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      otp: "",
    },
    mode: "onTouched",
  });

  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [resetPassword, { isLoading: isVerifying }] =
    useResetPasswordMutation();

  const password = watch("password");
  const strength = getPasswordStrength(password);

  const handleChange = (value: string, i: number) => {
    const digit = value.replace(/\D/g, "").slice(-1); // digits only, keep the last one
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    setValue("otp", next.join(""), { shouldValidate: isSubmitted });
    if (digit && i < 4) inputsRef.current[i + 1]?.focus();
  };

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (!digits) return;
    const next = [...otp];
    digits.split("").forEach((d, idx) => (next[idx] = d));
    setOtp(next);
    setValue("otp", next.join(""), { shouldValidate: true });
    inputsRef.current[Math.min(digits.length, 4)]?.focus();
  };

  const handleVerify = async (value: ResetPasswordFormValues) => {
    const code = otp.join("");
    if (code.length !== 4 || !email) return;
    value.otp = code;

    try {
      const body = {
        otp: value.otp,
        email: email,
        newPassword: value.password,
      };
      const apiResponse = await resetPassword(body).unwrap();

      toast.success(apiResponse.message);
      navigate(getNavigationScreen(apiResponse.nextStep), { replace: true });
    } catch (err) {
      const message = getApiErrorMessage(err);
      toast.error(message);
      setOtp(Array(4).fill(""));
      setValue("otp", "", { shouldValidate: true });
      inputsRef.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (!email) return false;
    try {
      const apiResponse = await resendOtp({
        email,
        otpType: NAVIGATION_KEY.PASSWORD_RESET,
      }).unwrap();
      console.log("Resend otp", apiResponse);
      toast.success(apiResponse?.message);
      setOtp(Array(4).fill(""));
      inputsRef.current[0]?.focus();
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      console.log("handleResend Error", error);
      return false;
    }
  };

  if (!email) {
    return <Navigate to={NAVIGATION_SCREENS.LOGIN_SCREEN} replace />;
  }

  return (
    <>
      <AuthLayout
        heading="Choose a password you have not used before"
        subtext="You will be signed out of other devices once the password change"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-[rgb(28,25,23)] font-semibold text-[34px] ">
            Set a new password
          </h1>
          <p className="text-[rgb(87,83,78)] text-[15px] leading-normal ">
            Enter the code send to <span>vishalchaudhary123@gmail.com</span> and
            pick a new password.
          </p>
          <div className="flex flex-col">
            <legend className="mb-2 text-[14px] font-medium">Reset code</legend>
            <div className="flex justify-around gap-2">
              {otp.map((item, i) => (
                <input
                  key={i}
                  ref={(e) => {
                    inputsRef.current[i] = e;
                  }}
                  value={item}
                  inputMode="numeric"
                  onChange={(e) => handleChange(e.target.value, i)}
                  onPaste={handlePaste}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  autoComplete="one-time-code"
                  maxLength={1}
                  className="w-12 h-12 box-border rounded-[10px] border border-[rgb(214,211,206)] bg-white p-[1px_2px] text-center font-[JetBrains_Mono] text-[22px] font-normal text-[rgb(28,25,23)]"
                />
              ))}
            </div>
          </div>
          {errors.otp && (
            <span className="mt-1 text-sm text-red-700">
              {errors.otp.message}
            </span>
          )}

          <form
            noValidate
            onSubmit={handleSubmit(handleVerify, (err) =>
              console.log("validationError", err),
            )}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <TextField
                label="New Password"
                id="password"
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
                    className={`w-24 h-1 flex-1 rounded-xs ${i < strength ? colors[strength] : "bg-stone-200"} `}
                  />
                ))}
                {password && (
                  <span className="text-sm text-muted">{labels[strength]}</span>
                )}
              </div>
              <span className="text-[rgb(87,83,78)] text-[13px]">
                Good — 8+ characters with a number
              </span>
            </div>

            <TextField
              label="Confirm new password"
              id="newPassword"
              type="password"
              placeholder="Re-enter password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <Button type="submit" disabled={isVerifying || isSubmitting}>
              {isVerifying || isSubmitting
                ? "Password reseting"
                : "Reset Password"}
            </Button>
          </form>

          <p className="text-center">
            <ResendTimer
              pHeader="Code expired?"
              bHeader="Request a new one"
              seconds={resendAvailableInSeconds}
              onResend={handleResend}
              isLoading={isResending}
            />
            {/* <button
              className="text-[16px] text-[#B8401D] font-semibold underline pl-2"
              type="button"
              onSubmit={handleResend}
            >
              {isVerifying || isSubmitting
                ? "Requesting..."
                : "Request a new one"}
            </button> */}
          </p>
        </div>
      </AuthLayout>
    </>
  );
}
