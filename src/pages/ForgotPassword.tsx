import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import LeftArrow from "../assets/LeftArrow.png";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import InfoIcon from "../assets/Info.png";
import {
  getNavigationScreen,
  NAVIGATION_SCREENS,
} from "../utils/navigationScreens";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailFormValues } from "../schemas/auth";
import type { ApiFailedResponse } from "../types/auth";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../services/authApi";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmitForm = async (value: EmailFormValues) => {
    console.log("Value", value);
    try {
      const apiResponse = await forgotPassword(value).unwrap();
      toast.success(apiResponse.message);
      navigate(getNavigationScreen(apiResponse.nextStep), {
        state: {
          email: apiResponse.email,
          expiresInSeconds: apiResponse.expiresInSeconds,
          resendAvailableInSeconds: apiResponse.resendAvailableInSeconds,
          replace: true,
        },
      });
    } catch (err) {
      console.log("Error=>err", err);
      const apiError = err as {
        status: number;
        data: ApiFailedResponse<any>;
      };
      if (apiError?.status === 429) {
        navigate(getNavigationScreen(apiError?.data.details?.nextStep), {
          state: {
            email: value.email,
            expiresInSeconds: apiError?.data.details?.expiresInSeconds,
            resendAvailableInSeconds: apiError?.data.details?.retryAfterSeconds,
            replace: true,
          },
        });
      }
      toast.error(apiError.data.message);
      reset();
      return;
    }
  };

  return (
    <AuthLayout
      heading="Happens to everyone. Let's get you back in."
      subtext="We will send a code to you registered email so you can set a new password."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center text-[#7C2D12] text-[14px]">
          <img src={LeftArrow} />
          <Link to={NAVIGATION_SCREENS.LOGIN_SCREEN}>Back to sign in</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[rgb(28,25,23)] font-semibold text-[34px] font-[Fraunces]">
            Forgot your password?
          </h1>
          <p className=" text-[rgb(87,83,78)] font-[15px] leading-normal">
            Enter the email you signed up with and we will send you a 6-digit
            reset code
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmitForm)}
          className="flex flex-col gap-3.5"
        >
          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="johndoe@gmail.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <Button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting ? "Sending..." : "Send reset code"}
          </Button>
        </form>
        <div className="flex gap-2.5 p-3.5 font-[14px] text-[rgb(87,83,78)] border border-solid border-[#E7E5E4] rounded-[10px]">
          <img src={InfoIcon} className="w-4.5 h-4.5 text-[rgb(87,83,78)]" />
          <p className="text-[rgb(87,83,78)]">
            If an account exits for the email, a code will arrive within a
            minute. Check your spam folder too.
          </p>
        </div>
        <p className="text-center text-[rgb(87,83,78)]">
          No account yet?
          <Link
            to={NAVIGATION_SCREENS.SIGN_UP}
            className="underline pl-2 text-[rgb(154,52,18)] font-semibold"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
