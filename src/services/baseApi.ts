import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";
import { removeCredentials } from "../app/authSlice";

const publicEndpoints = [
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

    if (accessToken && !publicEndpoints.includes(endpoint)) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  },
});

const baseQuery: typeof rawBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !publicEndpoints.includes(api.endpoint)) {
    api.dispatch(removeCredentials());
    api.dispatch(baseApi.util.resetApiState());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
