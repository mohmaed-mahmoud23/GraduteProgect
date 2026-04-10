// src/interfaces/auth.ts

// ================= AUTH =================
export interface Credential {
  access_token: string;
  refresh_token: string;
}

// بعد unwrap
export interface LOGINEmailResponseData {
  credential: Credential;
}

// response كامل
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

  wishlist: unknown[]; // بدل any

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

// response بتاع create brand
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
    brands?: Brand[];
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
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

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
    categories?: Category[];
    [key: string]: any;
  };
}