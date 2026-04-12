/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateBrandResponse, LOGINEmailResponseData, UserProfileResponse, GetAllBrandsResponse, CreateCategoryResponse, GetAllCategoriesResponse, ActiveEmailResponse, CreateProductResponse, GetAllProductsResponse } from '@/app/interfaces';
import { ActiveEmailSchemaValues, LoginSchemaSchemaValues, RegisterFormValues, registerSchema } from './../../../lib/zodAuth';
// src/services/apiSlice.ts

import cookieService from "@/lib/cookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:3001",
  prepareHeaders: (headers) => {
    const token = cookieService.get("token");

    if (token) {
      // Hard clean the token (remove quotes/spaces)
      const cleanToken = token.toString().replace(/^"|"$/g, "").trim();

      let prefix = "Bearer";
      try {
        const decoded: any = jwtDecode(cleanToken);
        // Only use "System" if role is exactly "admin"
        if (decoded?.role === "admin") {
          prefix = "System";
        }
      } catch (error) {
        console.error("Error decoding token in prepareHeaders:", error);
        // Fallback to Bearer if decoding fails
      }

      headers.set("Authorization", `${prefix} ${cleanToken}`);
    }
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
    "Brand",
    "Category",
    "Product",
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
    Singin: builder.mutation<ActiveEmailResponse, LoginSchemaSchemaValues>({
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
        // Critical: append attachment first and normalize filename to avoid signature errors
        formData.append("attachment", attachment, "image.jpg");
        formData.append("name", name);
        formData.append("slogan", slogan);

        return {
          url: "brand",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Brand"],
    }),

    getBrands: builder.query<GetAllBrandsResponse, void>({
      query: () => ({
        url: "brand",
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),
postcategory: builder.mutation<
  CreateCategoryResponse,
  { name: string; brands: string[]; attachment: File; slug: string }
>({
  query: ({ name, brands, attachment, slug }) => {
    const formData = new FormData();

    formData.append("attachment", attachment, "image.jpg");
    formData.append("name", name);
    formData.append("slug", slug);

    // أهم سطر 🔥
    brands.forEach((id, index) => {
      formData.append(`brands[${index}]`, id);
    });

    return {
      url: "category",
      method: "POST",
      body: formData,
    };
  },
  invalidatesTags: ["Category"],
}),

    getProducts: builder.query<GetAllProductsResponse, void>({
      query: () => ({
        url: "product",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    postproduct: builder.mutation<
      CreateProductResponse,
      {
        name: string;
        description: string;
        brand: string;
        category: string;
        originalPrice: number | string;
        discountPercent: number | string;
        stock: number | string;
        attachments: File;
      }
    >({
      query: (data) => {
        const formData = new FormData();
        // Postman shows plural 'attachments' but usually it's one file in 'create product' screenshot
        formData.append("attachments", data.attachments, "product.jpg");
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("brand", data.brand);
        formData.append("category", data.category);
        formData.append("originalPrice", data.originalPrice.toString());
        formData.append("discountPercent", data.discountPercent.toString());
        formData.append("stock", data.stock.toString());

        return {
          url: "product",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    getCategories: builder.query<GetAllCategoriesResponse, void>({
      query: () => ({
        url: "category",
        method: "GET",
      }),
      providesTags: ["Category"],
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
  usePostproductMutation,
  useGetProductsQuery,
} = ApiSlice