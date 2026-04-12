// src/interfaces/api.ts

// ================= AUTH =================
export interface Credential {
  access_token: string;
  refresh_token: string;
}

export interface LOGINEmailResponseData {
  credential: Credential;
}

export interface ActiveEmailResponse {
  message?: string;
  status?: number;
  data: LOGINEmailResponseData;
}

// ================= USER =================
export interface User {
  id: string;
  _id: string;

  firstName: string;
  lastName: string;
  username: string;

  email: string;
  role: "admin" | "user";

  gender: string;
  provider: string;

  preferredLanguage: string;

  wishlist: unknown[];

  createdAt: string;
  updatedAt: string;

  confirmEmail: string;
}

export interface UserProfileResponse {
  message: string;
  status: number;
  data: User;
}

// ================= BRAND =================
export interface BrandImage {
  public_id: string;
  secure_url: string;
  _id: string;
}

export interface Brand {
  _id: string;
  name: string;
  slogan: string;
  slug: string;
  image: BrandImage;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ✅ Request
export interface CreateBrandRequest {
  name: string;
  slogan: string;
  attachment: File;
}

// ✅ Response
export interface CreateBrandResponse {
  message: string;
  status: number;
  data: {
    brand: Brand;
  };
}

export interface GetAllBrandsResponse {
  message: string;
  status: number;
  data: {
    result?: {
      result: Brand[];
    };
    [key: string]: any;
  };
}

// ================= CATEGORY =================
export interface CategoryImage {
  public_id: string;
  secure_url: string;
  _id?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: CategoryImage;

  brands: string[]; // ✅ الباك بيستخدم array

  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// ✅ Request (ده أهم جزء اتحل هنا)
export interface CreateCategoryRequest {
  name: string;
  slug: string;
  attachment: File;
  brands: string[]; // ✅ لازم array
}

// ✅ Response
export interface CreateCategoryResponse {
  message: string;
  status: number;
  data: {
    category: Category;
  };
}

export interface GetAllCategoriesResponse {
  message: string;
  status: number;
  data: {
    result?: {
      result: Category[];
    };
    [key: string]: any;
  };
}

// ================= PRODUCT =================
export interface ProductImage {
  public_id: string;
  secure_url: string;
  _id?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  slug: string;
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  stock: number;

  images: ProductImage[];
  attachments: ProductImage[];

  brand: string | Brand;      // ✅ واحدة بس
  category: string | Category; // ✅ واحدة بس

  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// ✅ Request
export interface CreateProductRequest {
  name: string;
  description: string;
  slug: string;
  originalPrice: number;
  discountPercent: number;
  stock: number;

  brand: string;     // ✅ مش array
  category: string;  // ✅ مش array

  attachments: File[]; // أو FileList حسب استخدامك
}

// ✅ Response
export interface CreateProductResponse {
  message: string;
  status: number;
  data: {
    product: Product;
  };
}

export interface GetAllProductsResponse {
  message: string;
  status: number;
  data: {
    result?: {
      result: Product[];
    };
    totalCount?: number;
    [key: string]: any;
  };
}