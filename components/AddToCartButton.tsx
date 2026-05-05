"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "@/app/redux/slices/ApiSlice";
import { toast } from "sonner";
import cookieService from "@/lib/cookieService";

interface AddToCartButtonProps {
  productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [quantity] = useState(1);

  const [addToCart, { isLoading }] = useAddToCartMutation();

  // 👇 نجيب الكارت
  const { data } = useGetCartQuery();

  const products = data?.data?.cart?.products || [];

  // 👇 نجيب التوكين والرول
  const token = cookieService.get("token");
  const role = cookieService.get("role");

  const handleAddToCart = async () => {
    // ❌ مش لوجين
    if (!token) {
      toast.error("لو سمحت سجل الأول 🔐");
      return;
    }

    // ❌ أدمن
    if (role === "admin") {
      toast.error(" admin not cant added to cart ");
      return;
    }

    // ❌ المنتج موجود بالفعل
    const isExist = products.some(
      (item: any) => item.productId?._id === productId,
    );

    if (isExist) {
      toast.error(" item oredy is adedd ");
      return;
    }

    try {
      const res = await addToCart({
        productId,
        quantity,
      }).unwrap();

      toast.success("Item added successfully 🛒");
      console.log("Cart:", res.data.cart);
    } catch (error: any) {
      toast.error("حصل مشكلة حاول تاني");
      console.log(error?.data || error);
    }
  };

  // ❌ نخفي الزر لو Admin
  if (role === "admin") return null;

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleAddToCart} disabled={isLoading}>
        {isLoading ? "Loading..." : "Add To Cart"}
      </Button>
    </div>
  );
}
