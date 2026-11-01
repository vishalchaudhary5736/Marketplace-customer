import type { ApiResponse, User } from "../types/auth";
import type {
  PresignedUrlPayload,
  PresignedUrlResponse,
} from "../types/userTypes";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<User, void>({
      query: () => "/auth/me",
      transformResponse: (res: ApiResponse<{ userDetail: User }>) =>
        res.data.userDetail,
      providesTags: ["User"],
    }),
    preSignedUrl: builder.mutation<PresignedUrlResponse, PresignedUrlPayload>({
      query: (body) => ({
        method: "POST",
        url: "/users/generate-presigned-url",
        body,
      }),
    }),
  }),
});

export const { useMeQuery, usePreSignedUrlMutation } = userApi;
