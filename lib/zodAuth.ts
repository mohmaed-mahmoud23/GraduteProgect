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


export const updateBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slogan: z.string().min(1, "Slogan is required"),
  attachment: z.instanceof(File).optional(),
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
  slug: z.string().min(1, "slug is required"),
  brand: z.string().min(1, "Brand is required"), // Linked brand
  attachment: z.instanceof(File, {
    message: "Category image is required",
  }),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  originalPrice: z.union([z.number(), z.string()]).refine((val) => !isNaN(Number(val)), "Price must be a number"),
  discountPercent: z.union([z.number(), z.string()]).refine((val) => !isNaN(Number(val)), "Discount must be a number"),
  stock: z.union([z.number(), z.string()]).refine((val) => !isNaN(Number(val)), "Stock must be a number"),
  attachments: z.array(z.instanceof(File))
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  brand: z.string().optional(),
  attachment: z.instanceof(File).optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().optional(),
  category: z.string().optional(),
  originalPrice: z.union([z.number(), z.string()]).refine((val) => !isNaN(Number(val)), "Price must be a number").optional(),
  discountPercent: z.union([z.number(), z.string()]).refine((val) => !isNaN(Number(val)), "Discount must be a number").optional(),
  stock: z.union([z.number(), z.string()]).refine((val) => !isNaN(Number(val)), "Stock must be a number").optional(),
  attachments: z.array(z.instanceof(File)).optional(),
});



export const createOrderSchema = z.object({
  address: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(6, "phone must be at least 12 characters"),
  payment: z.string().min(1, "Please select payment method"),
});











export type createOrderSchemaValues = z.infer<typeof createOrderSchema>;
export type CreateBrandFormValues = z.infer<typeof createBrandSchema>;
export type UpdateBrandFormValues = z.infer<typeof updateBrandSchema>;
export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;
export type CreateProductFormValues = z.infer<typeof createProductSchema>;
export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;

export type LoginSchemaSchemaValues = z.infer<typeof LoginSchema>;
export type ActiveEmailSchemaValues = z.infer<typeof ActiveEmailSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;