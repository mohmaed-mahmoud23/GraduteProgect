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

export interface CreateBrandRequest {
  name: string;
  slogan: string;
  attachment: File;
}

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

  brands: string[];

  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  attachment: File;
  brands: string[];
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
    result?: {
      result: Category[];
    };
    [key: string]: any;
  };
}

// ================= PRODUCT =================

// صورة المنتج
export interface ProductImage {
  public_id: string;
  secure_url: string;
  _id: string;
}

// المنتج
export interface Product {
  _id: string;
  name: string;
  description: string;
  slug: string;

  assetFolderId: string;

  images: ProductImage[];

  brand: string;
  category: string;

  discountPercent: number;
  salePrice: number;
  originalPrice: number;

  stock: number;
  soldItems: number;

  createdBy: string;

  createdAt: string;
  updatedAt: string;

  __v: number;
}

// إنشاء منتج
export interface CreateProductRequest {
  name: string;
  description: string;
  brand: string;
  category: string;
  originalPrice: number | string;
  discountPercent: number | string;
  stock: number | string;
  attachments: File;
}

// response إنشاء منتج
export interface CreateProductResponse {
  message: string;
  status: number;
  data: {
    product: Product;
  };
}

// جلب كل المنتجات
export interface GetAllProductsResponse {
  message: string;
  status: number;
  data: {
    result: {
      result: Product[];
    };
    totalCount?: number;
  };
}











export interface GetSingleProductResponse {
  message: string;
  status: number;
  data: {
    product: Product;
  };
}




export interface CartProduct {
  productId: string;
  quantity: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  _id: string;
  createdBy: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AddToCartResponse {
  message: string;
  status: number;
  data: {
    cart: Cart;
  };
}


































//Get data Cart //
export interface CartProductItem {
  _id: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;

  productId: {
    _id: string;
    name: string;
    description: string;
    images: {
      public_id: string;
      secure_url: string;
      _id: string;
    }[];
    brand: string;
    category: string;
    discountPercent: number;
    salePrice: number;
    originalPrice: number;
    stock: number;
    slug: string;
  };
}

export interface Cart {
  _id: string;
  createdBy: string;
  products: CartProductItem[];
  createdAt: string;
  updatedAt: string;
}

export interface GetCartResponse {
  message: string;
  status: number;
  data: {
    cart: Cart;
  };
} 












export interface OrderProduct {
  productId: string;
  quantity: number;
  unitPrice: number;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  orderId: string;
  address: string;
  phone: string;
  discount: number;
  total: number;
  payment: string;
  products: OrderProduct[];
  createdBy: string;
  _id: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  subtotal: number;
  id: string;
}

export interface CreateOrderResponse {
  message: string;
  status: number;
  data: {
    order: Order;
  };
}









export interface CreateOrderPayload {
  address: string;
  phone: string;
  payment: string;
}













///user order 




// ================= IMAGE =================
export interface OrderProductImage {
  public_id: string;
  secure_url: string;
  _id: string;
}

// ================= PRODUCT =================
export interface OrderProductData {
  _id: string;
  name: string;
  description: string;
  assetFolderId: string;

  images: OrderProductImage[];

  brand: string;
  category: string;

  discountPercent: number;
  salePrice: number;
  originalPrice: number;

  stock: number;
  soldItems: number;

  createdBy: string;

  createdAt: string;
  updatedAt: string;

  slug: string;
  __v: number;
  id: string;
}

// ================= USER =================
export interface OrderUser {
  _id: string;

  firstName: string;
  lastName: string;
  username: string;

  email: string;
  password: string;

  provider: string;
  gender: string;
  role: string;

  preferredLanguage: string;

  wishlist: any[];

  createdAt: string;
  updatedAt: string;

  confirmEmail: string;
  __v: number;
  id: string;
}

// ================= ORDER PRODUCT =================
export interface OrderItem {
  productId: OrderProductData; // ✅ object كامل
  quantity: number;
  unitPrice: number;

  _id: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// ================= ORDER =================
export interface OrderData {
  _id: string;
  orderId: string;

  address: string;
  phone: string;

  discount: number;
  subtotal: number;
  total: number;

  payment: string;

  products: OrderItem[];

  createdBy: OrderUser; // ✅ object user كامل

  status: number;

  createdAt: string;
  updatedAt: string;

  __v: number;
  id: string;
}

// ================= RESPONSE =================
export interface OrdersResponse {
  orders: OrderData[];
}