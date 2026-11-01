import type {
  ApiResponse,
  ForgotPasswordResponse,
  LoginData,
  LoginResponse,
  LogoutPayload,
  LogoutResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  SignupResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "../types/auth";
import type { LoginFormValues, SignupFormValues } from "../schemas/auth";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      Pick<LoginFormValues, "email" | "password">
    >({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      transformResponse: (res: ApiResponse<LoginData>) => ({
        ...res.data,
        message: res.message,
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupFormValues>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpPayload>({
      query: (body) => ({ url: "/auth/resend-otp", method: "POST", body }),
      transformResponse: (res: ApiResponse<ResendOtpResponse>) => ({
        ...res.data,
        message: res.message,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
      query: (body) => ({ url: "/auth/verify-otp", method: "POST", body }),
      transformResponse: (res: ApiResponse<LoginData>) => ({
        ...res.data,
        message: res.message,
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, { email: string }>(
      {
        query: (body) => ({
          url: "/auth/forgot-password",
          method: "POST",
          body,
        }),
        transformResponse: (res: ApiResponse<ForgotPasswordResponse>) => ({
          ...res.data,
          message: res.message,
        }),
      },
    ),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordPayload
    >({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
      transformResponse: (res: ApiResponse<ResetPasswordResponse>) => ({
        ...res.data,
        message: res.message,
      }),
    }),
    logout: builder.mutation<LogoutResponse, LogoutPayload>({
      query: (body) => ({ url: "/auth/logout", method: "POST", body }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;
