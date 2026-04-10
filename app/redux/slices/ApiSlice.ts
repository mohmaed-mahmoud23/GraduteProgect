/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateBrandResponse, LOGINEmailResponseData, UserProfileResponse, GetAllBrandsResponse, CreateCategoryResponse, GetAllCategoriesResponse } from '@/app/interfaces';
import { ActiveEmailSchemaValues, LoginSchemaSchemaValues, RegisterFormValues, registerSchema } from './../../../lib/zodAuth';
// src/services/apiSlice.ts

import cookieService from "@/lib/cookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/",
  prepareHeaders: (headers) => {
    const token = cookieService.get("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = cookieService.get("refreshToken");

    if (refreshToken) {
      const refreshResult: any = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        cookieService.set("token", refreshResult.data.accessToken, {
          path: "/",
          maxAge: 60 * 60 * 24,
          sameSite: "strict",
        });

        result = await baseQuery(args, api, extraOptions);
      } else {
        cookieService.remove("token", { path: "/" });
        cookieService.remove("refreshToken", { path: "/" });
        toast.error("Session expired, please login again");
      }
    }
  }

  return result;
};




export const ApiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: [
    // "Batch",
    // "BatchStudents",
    // "Track",
    // "Lecture",
    // "Assignment",
    // "Submission",
    // "Dashboard",
    // "my-submission",
    // "Batches",
  ],

  endpoints: (builder) => ({
    // ================= AUTH =================
    login: builder.mutation<RegisterFormValues, RegisterFormValues>({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),



    activeemail: builder.mutation<ActiveEmailSchemaValues, ActiveEmailSchemaValues>({
      query: (credentials) => ({
        url: "auth/confirm-email",
        method: "PATCH", // 
        body: credentials,
      }),
    }),
    Singin: builder.mutation<LOGINEmailResponseData, LoginSchemaSchemaValues>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    postbrand: builder.mutation<
      CreateBrandResponse,
      { name: string; slogan: string; attachment: File }
    >({
      query: ({ name, slogan, attachment }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("slogan", slogan);
        formData.append("attachment", attachment);

        return {
          url: "api/Brands/Create",
          method: "POST",
          body: formData,
        };
      },
    }),

    getBrands: builder.query<GetAllBrandsResponse, void>({
      query: () => ({
        url: "api/Brands/GetAll",
        method: "GET",
      }),
    }),

    postcategory: builder.mutation<
      CreateCategoryResponse,
      { name: string; attachment: File }
    >({
      query: ({ name, attachment }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("attachment", attachment);

        return {
          url: "api/Categories",
          method: "POST",
          body: formData,
        };
      },
    }),

    getCategories: builder.query<GetAllCategoriesResponse, void>({
      query: () => ({
        url: "api/Categories",
        method: "GET",
      }),
    }),

    getProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "user",
        method: "GET",
      }),
    }),

    resendConfirmEmail: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "auth/resend-confirm-email",
        method: "POST",
        body,
      }),
    }),

  }),
});

// ================= AUTH =================





export const {
  useSinginMutation,
  useActiveemailMutation,
  useLoginMutation,
  useGetProfileQuery,
  useResendConfirmEmailMutation,
  usePostbrandMutation,
  useGetBrandsQuery,
  usePostcategoryMutation,
  useGetCategoriesQuery,

} = ApiSlice  