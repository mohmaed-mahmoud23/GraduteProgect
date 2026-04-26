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
    <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-4 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Background glow on hover */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 rounded-full blur-[60px] opacity-0 transition-opacity duration-700 bg-accent/10 group-hover:opacity-100 mix-blend-screen pointer-events-none"></div>

      {/* Image Area */}
      <div className="relative h-[200px] w-full rounded-2xl overflow-hidden bg-secondary/30 mb-4 flex items-center justify-center">
        <Link href={`Proadactpage/${products._id}`} className="block w-full h-full p-6">
          <Image
            src={products.images?.[0]?.secure_url || "/placeholder.png"}
            alt={products.name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-md"
          />
        </Link>
        {/* Quick add / View tag placeholder */}
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[10px] uppercase font-mono tracking-widest text-foreground font-bold">Premium</span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex flex-col flex-1 relative z-10 px-2 pb-2">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-base font-semibold line-clamp-2 leading-tight tracking-tight text-foreground/90">
            {products.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <p className="text-xl font-bold font-mono text-foreground flex items-center gap-1">
            <span className="text-muted-foreground text-sm font-normal">£</span>
            {products.salePrice}
          </p>
          
          <div className="relative z-20">
            <AddToCartButton productId={products._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
