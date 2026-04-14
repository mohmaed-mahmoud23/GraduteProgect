"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAddToCartMutation } from "@/app/redux/slices/ApiSlice";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);

  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
        
      const res = await addToCart({
        productId,
        quantity,
      }).unwrap();
toast.success("Itme Add success")
      console.log("Cart:", res.data.cart);
    } catch (error: any) {
      console.log(error?.data || error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Quantity Controls */}
    
      {/* Add To Cart */}
      <Button onClick={handleAddToCart} disabled={isLoading}>
        {isLoading ? "Loading..." : "Add To Cart"}
      </Button>
    </div>
  );
}
