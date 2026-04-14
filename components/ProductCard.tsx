"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Product } from "@/app/interfaces";
import { Button } from "./ui/button";
import { useAddToCartMutation } from "@/app/redux/slices/ApiSlice";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  products: Product;
}




export default function ProductCard({ products }: ProductCardProps) {




 const [addToCart, { isLoading }] = useAddToCartMutation();

const handleAddToCart = async () => {
  try {
    const res = await addToCart({
      productId: products._id ,
      quantity : 1
    }).unwrap();

    console.log("Cart:", res.data.cart);
  } catch (error) {
    console.log(error);
  }
};

  
  return (
    <Card className="rounded-xl overflow-hidden border  shadow hover:shadow-md transition">
      {/* Image */}
      <div className="relative h-[200px] ">
        <Link href={`Proadactpage/${products._id}`}>
          <Image
            src={products.images?.[0]?.secure_url || "/placeholder.png"}
            alt={products.name}
            fill
            className="object-contain p-4"
          />
        </Link>
      </div>
      {/* Content */}
      <CardContent className="p-3">
        {/* Name */}
        <h3 className="text-sm font-semibold line-clamp-1">{products.name}</h3>

        {/* Price */}
        <p className="text-sm font-bold mt-1">£{products.salePrice}</p>
      </CardContent>
      <AddToCartButton productId={products._id} />
    </Card>
  );
}
