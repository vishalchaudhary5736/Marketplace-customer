import { AuthLayout } from "../layouts/AuthLayout";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  getNavigationScreen,
  NAVIGATION_SCREENS,
} from "../utils/navigationScreens";
import mailIcon from "../assets/mail.png";
import { ResendTimer } from "../components/ResendTimer";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/authSlice";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../utils/apiError";

export function OtpPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, resendAvailableInSeconds = 60 } = (location.state ?? {}) as {
    email?: string;
    resendAvailableInSeconds?: number;
    expiresInSeconds?: number;
  };

  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const handleChange = (value: string, i: number) => {
    const digit = value.replace(/\D/g, "").slice(-1); // digits only, keep the last one
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    if (digit && i < 4) inputsRef.current[i + 1]?.focus();
  };

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
    inputsRef.current[Math.min(digits.length, 4)]?.focus();
  };

  const handleResend = async () => {
    if (!email) return false;
    try {
      const apiResponse = await resendOtp({
        email,
        otpType: "EMAIL_VERIFICATION",
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
    return <Navigate to={NAVIGATION_SCREENS.SIGN_UP} replace />;
  }

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 4 || !email) return;

    try {
      const apiResponse = await verifyOtp({
        email,
        otp: code,
        otpType: "EMAIL_VERIFICATION",
      }).unwrap();
      dispatch(
        setCredentials({
          user: apiResponse?.userDetail,
          accessToken: apiResponse?.accessToken,
        }),
      );
      toast.success(apiResponse.message);
      navigate(getNavigationScreen(apiResponse.nextStep), { replace: true });
    } catch (err) {
      const message = getApiErrorMessage(err);
      toast.error(message);
      setOtp(Array(4).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <AuthLayout
      heading="One last step before you start shopping."
      subtext="Verifying your email keeps your orders and addresses safe."
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="w-13 h-13 text-[16px] text-[rgb(154,52,18)] bg-[#F6E7DD] rounded-[14px] justify-center items-center ">
            <img
              src={mailIcon}
              alt="Mail"
              className="h-full w-fullobject-contain"
            />
          </div>
          <h1 className="font-display font-semibold text-[rgb(28,25,23)] text-[34px]">
            Verify your email
          </h1>
          <p className="text-[rgb(87,83,78)]">
            We send a 6-digit code to{" "}
            <span className="font-extrabold text-[rgb(28,25,23)]">
              {email || "vishalchaudhary5736@gmail.com"}
            </span>
            . It expires in 5 minutes.
          </p>
        </div>
        <div className="flex flex-col">
          <label className=" text-[rgb(28,25,23)] mb-2 font-bold text-[14px] ">
            Enter code
          </label>

          <div className="flex justify-around gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                value={digit}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                className="w-12 h-12 box-border rounded-[10px] border border-[rgb(214,211,206)] bg-white p-[1px_2px] text-center font-[JetBrains_Mono] text-[22px] font-normal text-[rgb(28,25,23)]"
              />
            ))}
          </div>
        </div>

        <Button
          type="button"
          onClick={handleVerify}
          disabled={otp.join("").length !== 4 || isVerifying}
        >
          Verify and continue
        </Button>

        <ResendTimer
          pHeader="Wrong address?"
          bHeader="Sign in with another email"
          seconds={resendAvailableInSeconds}
          onResend={handleResend}
          isLoading={isResending}
        />
        <p className="text-center text-[rgb(87,83,78)] w-100 h-4.5 pt-4 opacity-100 border-t border-solid border-[#E7E5E4]">
          Wrong address?{" "}
          <Link
            to={NAVIGATION_SCREENS.SIGN_UP}
            className=" text-[rgb(154,52,18)] underline"
          >
            Sign in with another email
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

/**
 * style="text-align: center; border: 1px solid #D6D3CE; border-radius: 10px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 22px; background: #FFFFFF; color: #1C1917;">
 */
