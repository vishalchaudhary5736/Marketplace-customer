import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ApiResponse,
  ForgotPasswordResponse,
  LoginData,
  LoginResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  SignupResponse,
  User,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "../types/auth";
import type { LoginFormValues, SignupFormValues } from "../schemas/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
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
    me: builder.query<User, void>({
      query: () => "/auth/me",
      transformResponse: (res: ApiResponse<{ userDetail: User }>) =>
        res.data.userDetail,
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useMeQuery,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
