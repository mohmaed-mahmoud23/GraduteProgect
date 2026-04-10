import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });




export const ActiveEmailSchema = z
  .object({

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email"),

    code: z
      .string()
      .min(6, "code must be at least 6 characters"),


  })




export const LoginSchema = z
  .object({

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),


  })


export const createBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slogan: z.string().min(1, "Slogan is required"),
  attachment: z.instanceof(File, {
    message: "Brand image is required",
  }),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  attachment: z.instanceof(File, {
    message: "Category image is required",
  }),
});

export type CreateBrandFormValues = z.infer<typeof createBrandSchema>;
export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;

export type LoginSchemaSchemaValues = z.infer<typeof LoginSchema>;
export type ActiveEmailSchemaValues = z.infer<typeof ActiveEmailSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;