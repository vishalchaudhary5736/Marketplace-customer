import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
  User,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "../types/auth";
import type { LoginFormValues, SignupFormValues } from "../schemas/auth";
import type { RootState } from "../app/store";
import { removeCredentials } from "../app/authSlice";
const publicEntpoints = [
  "login",
  "signup",
  "resendOtp",
  "verifyOtp",
  "forgotPassword",
  "resetPassword",
];

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (!publicEntpoints.includes(endpoint)) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  },
});

const baseQuery: typeof rawBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !publicEntpoints.includes(api.endpoint)) {
    api.dispatch(removeCredentials());
    api.dispatch(authApi.util.resetApiState());
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
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
    logout: builder.mutation<LogoutResponse, LogoutPayload>({
      query: (body) => ({ url: "/auth/logout", method: "POST", body }),
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
  useLogoutMutation,
} = authApi;
